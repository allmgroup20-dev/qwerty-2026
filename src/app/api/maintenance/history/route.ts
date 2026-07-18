import { NextResponse } from "next/server";
import { query } from "@/lib/db/queries";
import { getDB } from "@/lib/db";

export async function GET() {
  try {
    const logs = await query<Record<string, any>>(
      await getDB(),
      "SELECT id, action, table_name, rows_deleted, status, details, created_at FROM maintenance_log ORDER BY created_at DESC LIMIT 20"
    );
    return NextResponse.json({ logs });
  } catch (error) {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
