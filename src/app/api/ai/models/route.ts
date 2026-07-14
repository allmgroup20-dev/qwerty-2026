import { NextResponse } from "next/server";
import { query, queryFirst } from "@/lib/db/queries";
import { ensureDB } from "@/lib/db";

export async function GET() {
  try {
    const db = await ensureDB();
    const models = await query<{ model_id: string; name: string; tier: number; is_active: number; provider: string }>(
      { DB: db },
      "SELECT model_id, name, tier, is_active, provider FROM ai_models ORDER BY provider ASC, tier ASC, model_id ASC"
    );
    const state = await queryFirst<{ exhausted_models: string; total_responses: number; today_responses: number }>(
      { DB: db },
      "SELECT exhausted_models, total_responses, today_responses FROM ai_model_failover_state WHERE id = 1"
    );
    const keys = await query<{ id: number; key_value: string; provider: string; is_active: number; created_at: string }>(
      { DB: db },
      "SELECT id, key_value, provider, is_active, created_at FROM ai_api_keys ORDER BY provider ASC, id ASC"
    );

    const exhaustedSet = new Set(
      state?.exhausted_models ? state.exhausted_models.split(",").filter(Boolean) : []
    );

    return NextResponse.json({
      models: models.map((m) => ({
        model_id: m.model_id,
        name: m.name,
        tier: m.tier,
        is_active: m.is_active,
        provider: m.provider,
        exhausted: exhaustedSet.has(m.model_id) || [...exhaustedSet].some((e) => e.includes(m.model_id)),
      })),
      failoverState: state || { exhausted_models: "", total_responses: 0, today_responses: 0 },
      keys: keys.map((k) => ({ ...k, is_active: !!k.is_active })),
    });
  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : "Failed to load models",
    }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as { action: string; modelId?: string; keyValue?: string; provider?: string; keyId?: number };
    const db = await ensureDB();

    if (body.action === "toggle_model") {
      const model = await queryFirst<{ is_active: number }>(
        { DB: db },
        "SELECT is_active FROM ai_models WHERE model_id = ?",
        [body.modelId]
      );
      if (model) {
        const { execute } = await import("@/lib/db/queries");
        await execute(
          { DB: db },
          "UPDATE ai_models SET is_active = ? WHERE model_id = ?",
          [model.is_active ? 0 : 1, body.modelId]
        );
      }
      return NextResponse.json({ success: true });
    }

    if (body.action === "add_key") {
      const provider = body.provider || "openrouter";
      if (!body.keyValue?.trim()) {
        return NextResponse.json({ error: "Key value is required" }, { status: 400 });
      }
      const { execute } = await import("@/lib/db/queries");
      await execute(
        { DB: db },
        "INSERT INTO ai_api_keys (key_value, provider, is_active, created_at) VALUES (?, ?, 1, datetime('now'))",
        [body.keyValue.trim(), provider]
      );
      return NextResponse.json({ success: true });
    }

    if (body.action === "delete_key") {
      if (!body.keyId) {
        return NextResponse.json({ error: "keyId is required" }, { status: 400 });
      }
      const { execute } = await import("@/lib/db/queries");
      await execute(
        { DB: db },
        "DELETE FROM ai_api_keys WHERE id = ?",
        [body.keyId]
      );
      return NextResponse.json({ success: true });
    }

    if (body.action === "toggle_key") {
      if (!body.keyId) {
        return NextResponse.json({ error: "keyId is required" }, { status: 400 });
      }
      const key = await queryFirst<{ is_active: number }>(
        { DB: db },
        "SELECT is_active FROM ai_api_keys WHERE id = ?",
        [body.keyId]
      );
      if (key) {
        const { execute } = await import("@/lib/db/queries");
        await execute(
          { DB: db },
          "UPDATE ai_api_keys SET is_active = ? WHERE id = ?",
          [key.is_active ? 0 : 1, body.keyId]
        );
      }
      return NextResponse.json({ success: true });
    }

    if (body.action === "reset_failover") {
      const { execute } = await import("@/lib/db/queries");
      await execute(
        { DB: db },
        "UPDATE ai_model_failover_state SET exhausted_models = '', updated_at = datetime('now') WHERE id = 1"
      );
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : "Action failed",
    }, { status: 500 });
  }
}
