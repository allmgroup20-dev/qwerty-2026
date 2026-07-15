import { NextRequest, NextResponse } from "next/server";
import { query, execute } from "@/lib/db/queries";
import { ensureDB } from "@/lib/db";

export async function GET() {
  try {
    const db = await ensureDB();
    const keys = await query<{ id: number; key_value: string; provider: string; is_active: number }>(
      { DB: db },
      "SELECT id, key_value, provider, is_active FROM ai_api_keys ORDER BY id ASC"
    );
    const models = await query<{ id: number; model_id: string; name: string; tier: number; provider: string; is_active: number }>(
      { DB: db },
      "SELECT id, model_id, name, tier, provider, is_active FROM ai_models ORDER BY tier ASC, name ASC"
    );
    const failover = await query(
      { DB: db },
      "SELECT * FROM ai_model_failover_state WHERE id = 1"
    );
    return NextResponse.json({ keys: keys.map(k => ({ ...k, key_value: k.key_value ? k.key_value.substring(0, 8) + "..." : "" })), models, failover: failover[0] || null });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Failed" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as {
      action: string;
      key_value?: string;
      provider?: string;
      key_id?: number;
      model_id?: string;
      is_active?: number;
    };
    const db = await ensureDB();

    switch (body.action) {
      case "add_key":
        if (!body.key_value) return NextResponse.json({ error: "key_value required" }, { status: 400 });
        await execute({ DB: db },
          "INSERT INTO ai_api_keys (key_value, provider, is_active) VALUES (?, ?, 1)",
          [body.key_value, body.provider || "openrouter"]
        );
        return NextResponse.json({ ok: true });

      case "toggle_key":
        if (!body.key_id) return NextResponse.json({ error: "key_id required" }, { status: 400 });
        await execute({ DB: db },
          "UPDATE ai_api_keys SET is_active = CASE WHEN is_active = 1 THEN 0 ELSE 1 END WHERE id = ?",
          [body.key_id]
        );
        return NextResponse.json({ ok: true });

      case "delete_key":
        if (!body.key_id) return NextResponse.json({ error: "key_id required" }, { status: 400 });
        await execute({ DB: db }, "DELETE FROM ai_api_keys WHERE id = ?", [body.key_id]);
        return NextResponse.json({ ok: true });

      case "toggle_model":
        if (!body.model_id) return NextResponse.json({ error: "model_id required" }, { status: 400 });
        await execute({ DB: db },
          "UPDATE ai_models SET is_active = CASE WHEN is_active = 1 THEN 0 ELSE 1 END WHERE model_id = ?",
          [body.model_id]
        );
        return NextResponse.json({ ok: true });

      case "reset_failover":
        await execute({ DB: db },
          "UPDATE ai_model_failover_state SET exhausted_models = '', current_key_slot = 1, current_model_index = 0, today_responses = 0, last_reset_date = datetime('now'), updated_at = datetime('now') WHERE id = 1"
        );
        return NextResponse.json({ ok: true });

      default:
        return NextResponse.json({ error: "Unknown action" }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Failed" }, { status: 500 });
  }
}
