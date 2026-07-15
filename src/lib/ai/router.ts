import { query, queryFirst, execute } from "@/lib/db/queries";
import { ensureDB } from "@/lib/db";

interface AIRequest {
  messages: { role: string; content: string }[];
  maxTokens?: number;
  temperature?: number;
}

interface AIResponse {
  text: string;
  model: string;
  tokens: number;
}

interface ApiKey {
  id: number;
  key_value: string;
  provider: string;
}

interface FailoverState {
  total_responses: number;
  today_responses: number;
  exhausted_models: string;
  last_reset_date: string;
}

const PROVIDER_ENDPOINTS: Record<string, string> = {
  openrouter: "https://openrouter.ai/api/v1/chat/completions",
  opencode: "https://opencode.ai/zen/v1/chat/completions",
};

const FREE_MODEL_ORDER: Record<string, string[]> = {
  // OpenRouter free models — verified working as of July 2026
  // Ordered by capability (best first), auto-failover on exhaustion
  openrouter: [
    "openrouter/free",
    "meta-llama/llama-3.3-70b-instruct:free",
    "nousresearch/hermes-3-llama-3.1-405b:free",
    "nvidia/nemotron-3-ultra-550b-a55b:free",
    "google/gemma-4-31b-it:free",
    "qwen/qwen3-next-80b-a3b-instruct:free",
    "nvidia/nemotron-3-super-120b-a12b:free",
    "google/gemma-4-26b-a4b-it:free",
    "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free",
    "nvidia/nemotron-3-nano-30b-a3b:free",
    "meta-llama/llama-3.2-3b-instruct:free",
    "nvidia/nemotron-nano-12b-v2-vl:free",
    "nvidia/nemotron-nano-9b-v2:free",
    "tencent/hy3:free",
  ],
  // OpenCode Zen free models — verified via live API testing (July 2026)
  // Ordered by reliability; models 2-5 need ~500 tokens, deepseek needs ~2000
  opencode: [
    "nemotron-3-ultra-free",       // ✅ Best: normal content, fast, any token count
    "mimo-v2.5-free",              // ✅ Verified: works with 500+ tokens
    "north-mini-code-free",        // ✅ Verified: works with 500+ tokens
    "big-pickle",                  // ✅ Verified: works with 500+ tokens
    "hy3-free",                    // ✅ Verified: works with 500+ tokens
    "deepseek-v4-flash-free",      // ✅ Verified: works but needs 2000+ tokens (reasoning model)
  ],
};

// ─── DB Helpers ─────────────────────────────────────────

async function getState(db: D1Database): Promise<FailoverState> {
  let s = await queryFirst<FailoverState>({ DB: db },
    "SELECT * FROM ai_model_failover_state WHERE id = 1"
  );
  if (!s) {
    await execute({ DB: db },
      "INSERT INTO ai_model_failover_state (id, total_responses, today_responses, exhausted_models, last_reset_date) VALUES (1, 0, 0, '', datetime('now'))"
    );
    s = { total_responses: 0, today_responses: 0, exhausted_models: "", last_reset_date: "" };
  }
  return s;
}

async function dailyReset(db: D1Database, state: FailoverState): Promise<FailoverState> {
  const today = new Date().toISOString().split("T")[0];
  if (state.last_reset_date !== today) {
    await execute({ DB: db },
      "UPDATE ai_model_failover_state SET exhausted_models = '', today_responses = 0, last_reset_date = ? WHERE id = 1",
      [today]
    );
    return { ...state, exhausted_models: "", today_responses: 0, last_reset_date: today };
  }
  return state;
}

async function getAllKeys(db: D1Database): Promise<ApiKey[]> {
  return query<ApiKey>({ DB: db },
    "SELECT id, key_value, provider FROM ai_api_keys WHERE is_active = 1 ORDER BY id ASC"
  );
}

async function recordSuccess(db: D1Database): Promise<void> {
  await execute({ DB: db },
    "UPDATE ai_model_failover_state SET total_responses = total_responses + 1, today_responses = today_responses + 1 WHERE id = 1"
  );
}

async function recordExhaustion(db: D1Database, modelKey: string, exhaustedSet: Set<string>): Promise<void> {
  exhaustedSet.add(modelKey);
  await execute({ DB: db },
    "UPDATE ai_model_failover_state SET exhausted_models = ? WHERE id = 1",
    [Array.from(exhaustedSet).join(",")]
  );
}

// ─── Model Caller ───────────────────────────────────────

async function tryModel(
  apiKey: string,
  provider: string,
  modelId: string,
  messages: { role: string; content: string }[],
  maxTokens: number,
  temperature?: number
): Promise<{ text: string; tokens: number } | null> {
  const endpoint = PROVIDER_ENDPOINTS[provider];
  if (!endpoint) return null;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  };
  if (provider === "openrouter") {
    headers["HTTP-Referer"] = "https://jobayer-group-career.workers.dev";
  }

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify({ model: modelId, messages, max_tokens: maxTokens, ...(temperature !== undefined && { temperature }) }),
    });

    if (res.status === 429 || res.status === 500 || res.status === 503) return null;
    if (!res.ok) {
      const err = await res.text().catch(() => "");
      console.error(`[${provider}] ${modelId} (${res.status}): ${err.slice(0, 200)}`);
      return null;
    }

    const data = await res.json() as {
      choices?: { message: { content: string | null; reasoning_content?: string; reasoning?: string } }[];
      usage?: { total_tokens: number };
    };
    const msg = data.choices?.[0]?.message;
    let text = msg?.content || msg?.reasoning || msg?.reasoning_content || "";
    if (text.length === 0) return null;
    return { text, tokens: data.usage?.total_tokens || 0 };
  } catch (e) {
    console.error(`[${provider}] ${modelId} error:`, (e as Error)?.message);
    return null;
  }
}

// ─── Core Failover Logic ────────────────────────────────
//
// Chain of execution:
//   API Key 1 (OpenRouter)
//     → Model 1 (openrouter/free)
//     → Model 2 (llama-3.3-70b)
//     → ... all OpenRouter free models
//   API Key 2 (OpenCode)
//     → Model 1 (nemotron-3-ultra-free)
//     → ... all OpenCode free models
//   API Key 3+ (if more keys added)
//     → ... same pattern
//   If ALL exhausted → Error

export async function callAI(
  request: AIRequest,
  maxTokens = 500,
  preferredModel?: string,
  preferredProvider?: string
): Promise<AIResponse> {
  const db = await ensureDB();
  const env = { DB: db };

  const state = await getState(db);
  const resetState = await dailyReset(db, state);
  const exhaustedSet = new Set<string>(
    resetState.exhausted_models ? resetState.exhausted_models.split(",").filter(Boolean) : []
  );

  const allKeys = await getAllKeys(db);
  if (allKeys.length === 0) {
    throw new Error("No API keys configured. Add at least one key in AI Settings.");
  }

  const messages = request.messages;

  // Determine provider order
  const providerOrder = preferredProvider
    ? [preferredProvider, ...["openrouter", "opencode"].filter((p) => p !== preferredProvider)]
    : ["openrouter", "opencode"];

  // KEY-BY-KEY: Iterate through each API key
  for (const key of allKeys) {
    const { id: keyId, key_value: apiKey, provider } = key;

    // Skip if this provider is not in our order
    if (!providerOrder.includes(provider)) continue;

    // Get the model list for this provider
    const modelList = FREE_MODEL_ORDER[provider] || [];
    if (modelList.length === 0) continue;

    // If preferredModel is given, try it first within this key
    const modelsToTry = preferredModel && providerOrder.indexOf(provider) === 0
      ? [preferredModel, ...modelList.filter((m) => m !== preferredModel)]
      : modelList;

    // MODEL-BY-MODEL: Try each model in this key
    for (const modelId of modelsToTry) {
      const modelKey = `k${keyId}|${provider}|${modelId}`;

      // Skip if this (key, provider, model) combination is exhausted
      if (exhaustedSet.has(modelKey)) continue;

      const result = await tryModel(apiKey, provider, modelId, messages, maxTokens, request.temperature);
      if (result) {
        await recordSuccess(db);
        return {
          text: result.text,
          model: `${provider}:${modelId}`,
          tokens: result.tokens,
        };
      }

      // This (key + model) exhausted — record it
      await recordExhaustion(db, modelKey, exhaustedSet);
      console.warn(`[FAILOVER] ${provider} key#${keyId} model ${modelId} — exhausted, trying next`);
    }

    console.warn(`[FAILOVER] ${provider} key#${keyId} — ALL models exhausted, moving to next key`);
  }

  throw new Error(
    `All models exhausted across ${allKeys.length} API key(s). ` +
    `Exhausted: ${Array.from(exhaustedSet).join(", ")}. ` +
    `Reset happens daily at midnight UTC.`
  );
}
