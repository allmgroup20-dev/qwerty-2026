import { NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import { getKV } from "@/lib/cache";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function GET() {
  const results: Record<string, unknown> = {};

  // 1. Test getCloudflareContext
  const t0 = Date.now();
  try {
    const ctx = await getCloudflareContext({ async: true });
    results.getCloudflareContext = { ok: true, ms: Date.now() - t0, hasEnv: !!ctx.env };
  } catch (e) {
    results.getCloudflareContext = { ok: false, ms: Date.now() - t0, error: String(e) };
  }

  // 2. Test initEnv (via getDB)
  const t1 = Date.now();
  try {
    const db = await getDB();
    results.getDB = { ok: true, ms: Date.now() - t1 };
  } catch (e) {
    results.getDB = { ok: false, ms: Date.now() - t1, error: String(e) };
  }

  // 3. Test D1 simple query
  const t2 = Date.now();
  try {
    const db = await getDB();
    const r = await db.DB.prepare("SELECT 1 as val").all<{ val: number }>();
    results.d1Ping = { ok: true, ms: Date.now() - t2, val: r.results?.[0]?.val };
  } catch (e) {
    results.d1Ping = { ok: false, ms: Date.now() - t2, error: String(e) };
  }

  // 4. Test D1 workers count
  const t3 = Date.now();
  try {
    const db = await getDB();
    const r = await db.DB.prepare("SELECT COUNT(*) as cnt FROM workers").all<{ cnt: number }>();
    results.d1WorkersCount = { ok: true, ms: Date.now() - t3, count: r.results?.[0]?.cnt };
  } catch (e) {
    results.d1WorkersCount = { ok: false, ms: Date.now() - t3, error: String(e) };
  }

  // 5. Test D1 query with index (login simulation)
  const t4 = Date.now();
  try {
    const db = await getDB();
    const r = await db.DB.prepare("SELECT worker_id FROM workers WHERE phone = '00000000000'").all();
    results.d1IndexQuery = { ok: true, ms: Date.now() - t4 };
  } catch (e) {
    results.d1IndexQuery = { ok: false, ms: Date.now() - t4, error: String(e) };
  }

  // 6. Test KV
  const t5 = Date.now();
  try {
    const kv = await getKV();
    if (kv) {
      await kv.get("__diag_test__");
      results.kvPing = { ok: true, ms: Date.now() - t5 };
    } else {
      results.kvPing = { ok: false, ms: Date.now() - t5, error: "KV not available" };
    }
  } catch (e) {
    results.kvPing = { ok: false, ms: Date.now() - t5, error: String(e) };
  }

  return NextResponse.json(results);
}
