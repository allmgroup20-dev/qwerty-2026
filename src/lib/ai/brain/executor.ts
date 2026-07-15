import { callAI } from "../router";
import type { AgentDef, AgentOutput } from "./types";

const FREE_MODEL_TIERS: Record<number, { models: string[]; provider: string }> = {
  // Tier 1: Best free — for complex reasoning, objection handling, psychology
  1: {
    models: [
      "meta-llama/llama-3.3-70b-instruct:free",
      "nousresearch/hermes-3-llama-3.1-405b:free",
      "nvidia/nemotron-3-ultra-550b-a55b:free",
      "google/gemma-4-31b-it:free",
    ],
    provider: "openrouter",
  },
  // Tier 2: Strong general-purpose — analysis, content creation
  2: {
    models: [
      "qwen/qwen3-next-80b-a3b-instruct:free",
      "nvidia/nemotron-3-super-120b-a12b:free",
      "deepseek-v4-flash-free",
      "gemini-3.5-flash",
    ],
    provider: "openrouter",
  },
  // Tier 3: Fast & capable — classifications, detection, greetings
  3: {
    models: [
      "google/gemma-4-26b-a4b-it:free",
      "nvidia/nemotron-3-nano-30b-a3b:free",
      "meta-llama/llama-3.2-3b-instruct:free",
      "gpt-5.4-mini",
    ],
    provider: "openrouter",
  },
  // Tier 4: Lightweight — simple formatting, logging, notifications
  4: {
    models: [
      "tencent/hy3:free",
      "nvidia/nemotron-nano-9b-v2:free",
      "mimo-v2.5-free",
      "gpt-5.4-nano",
    ],
    provider: "openrouter",
  },
};

export async function executeAgent(
  agent: AgentDef,
  systemPrompt: string,
  userMessage: string,
): Promise<AgentOutput> {
  const tierConfig = FREE_MODEL_TIERS[agent.tier] || FREE_MODEL_TIERS[3];
  const messages = [
    { role: "system" as const, content: systemPrompt },
    { role: "user" as const, content: userMessage },
  ];

  let lastError = "";

  for (const modelId of tierConfig.models) {
    try {
      const result = await callAI({ messages }, 300, modelId, tierConfig.provider);
      return {
        agentId: agent.id,
        text: result.text,
        model: result.model,
        tokens: result.tokens,
      };
    } catch (e) {
      lastError = `${modelId} failed: ${(e as Error).message}`;
    }
  }

  // Fallback: try openrouter/free (catch-all)
  try {
    const result = await callAI({ messages }, 300, "openrouter/free", "openrouter");
    return { agentId: agent.id, text: result.text, model: result.model, tokens: result.tokens };
  } catch (e) {
    lastError = `openrouter/free also failed: ${(e as Error).message}`;
  }

  throw new Error(`All free models exhausted for agent ${agent.id}: ${lastError}`);
}

export function buildAgentPrompt(agent: AgentDef, ctx: Record<string, any>): string {
  let prompt = agent.promptTemplate;
  for (const [key, val] of Object.entries(ctx)) {
    prompt = prompt.replace(`{{${key}}}`, String(val ?? ""));
  }
  return prompt;
}
