import { NextRequest, NextResponse } from "next/server";
import { query, execute } from "@/lib/db/queries";
import { getDB } from "@/lib/db";
import { getCached, setCached, invalidateCache } from "@/lib/cache";

export async function GET() {
  const cached = await getCached<Record<string, string>>("company_settings", 60);
  if (cached) return NextResponse.json({ settings: cached });

  try {
    const rows = await query<{ setting_key: string; setting_value: string }>(
      await getDB(),
      "SELECT setting_key, setting_value FROM company_settings"
    );
    const settings: Record<string, string> = {};
    for (const row of rows) {
      settings[row.setting_key] = row.setting_value;
    }
    await setCached("company_settings", settings);
    return NextResponse.json({ settings });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as { key: string; value: string } | { settings: { key: string; value: string }[] };

    await invalidateCache("company_settings");
    const env = await getDB();
    const entries = "settings" in body ? body.settings : [body];

    for (const entry of entries) {
      await execute(env,
        "DELETE FROM company_settings WHERE setting_key = ?",
        [entry.key]
      );
      await execute(env,
        "INSERT INTO company_settings (setting_key, setting_value, setting_type, updated_at) VALUES (?, ?, 'text', datetime('now'))",
        [entry.key, entry.value]
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
