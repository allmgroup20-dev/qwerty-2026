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
    const allKeys = await query<{ key_slot: number; is_active: number; provider: string }>(
      { DB: db },
      "SELECT key_slot, is_active, provider FROM ai_api_keys ORDER BY provider ASC, key_slot ASC"
    );

    const exhaustedSet = new Set(
      state?.exhausted_models ? state.exhausted_models.split(",").filter(Boolean) : []
    );

    const openrouterKeys = allKeys.filter((k) => k.provider === "openrouter");
    const opencodeKeys = allKeys.filter((k) => k.provider === "opencode");

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
      openrouterKeys: { total: openrouterKeys.length, active: openrouterKeys.filter((k) => k.is_active).length },
      opencodeKeys: { total: opencodeKeys.length, active: opencodeKeys.filter((k) => k.is_active).length },
    });
  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : "Failed to load models",
    }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as { action: string; modelId?: string; keySlot?: number; keyValue?: string; provider?: string };
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
      const { execute } = await import("@/lib/db/queries");
      await execute(
        { DB: db },
        "INSERT OR REPLACE INTO ai_api_keys (key_slot, key_value, provider, is_active, created_at) VALUES (?, ?, ?, 1, datetime('now'))",
        [body.keySlot, body.keyValue, provider]
      );
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
