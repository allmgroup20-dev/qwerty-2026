import { NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import { query } from "@/lib/db/queries";

export async function GET() {
  const results: Record<string, unknown> = {};

  try {
    const env = await getDB();
    results.step1_getDB = "OK";

    const tables = ["workers", "commission_levels", "saved_accounts", "company_settings", "commissions", "user_events"];
    for (const table of tables) {
      try {
        const rows = await query<Record<string, unknown>>(env, `SELECT COUNT(*) as cnt FROM ${table}`);
        results[`table_${table}`] = (rows[0] as { cnt: number })?.cnt ?? "error";
      } catch (e) {
        results[`table_${table}`] = `ERROR: ${(e as Error)?.message}`;
      }
    }
  } catch (e) {
    results.error = String(e);
    results.message = (e as Error)?.message;
    results.stack = (e as Error)?.stack;
  }

  return NextResponse.json(results);
}
