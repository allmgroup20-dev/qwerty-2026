import { NextRequest, NextResponse } from "next/server";
import { query, execute } from "@/lib/db/queries";
import { getDB } from "@/lib/db";

export async function GET() {
  try {
    const rows = await query<{ setting_key: string; setting_value: string }>(
      await getDB(),
      "SELECT setting_key, setting_value FROM company_settings WHERE setting_key IN ('maintenance_auto_enabled', 'maintenance_retention_days', 'maintenance_schedule_hour')"
    );
    const settings: Record<string, string> = {};
    for (const row of rows) settings[row.setting_key] = row.setting_value;
    return NextResponse.json({
      enabled: settings.maintenance_auto_enabled === "1",
      retentionDays: parseInt(settings.maintenance_retention_days || "90"),
      scheduleHour: parseInt(settings.maintenance_schedule_hour || "3"),
    });
  } catch {
    return NextResponse.json({ enabled: false, retentionDays: 90, scheduleHour: 3 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { enabled, retentionDays, scheduleHour } = await request.json() as {
      enabled: boolean; retentionDays: number; scheduleHour: number;
    };
    const db = await getDB();
    const entries = [
      { key: "maintenance_auto_enabled", value: enabled ? "1" : "0" },
      { key: "maintenance_retention_days", value: String(retentionDays || 90) },
      { key: "maintenance_schedule_hour", value: String(scheduleHour || 3) },
    ];
    for (const entry of entries) {
      await execute(db, "DELETE FROM company_settings WHERE setting_key = ?", [entry.key]);
      await execute(db,
        "INSERT INTO company_settings (setting_key, setting_value, setting_type, updated_at) VALUES (?, ?, 'text', datetime('now'))",
        [entry.key, entry.value]
      );
    }
    return NextResponse.json({ success: true, enabled, retentionDays, scheduleHour });
  } catch (error) {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
