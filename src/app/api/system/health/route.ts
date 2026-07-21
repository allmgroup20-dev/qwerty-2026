import { NextRequest, NextResponse } from "next/server";
import { ensureDB } from "@/lib/db";
import { getKV } from "@/lib/cache";

export async function GET() {
  const checks: Record<string, unknown> = {};
  const errors: string[] = [];
  let overallStatus = "healthy";

  // Database check
  try {
    const t0 = performance.now();
    const db = await ensureDB();
    const { results: workers } = await db.prepare(
      "SELECT COUNT(*) as count FROM workers"
    ).bind().all<{ count: number }>();
    const latency = Math.round(performance.now() - t0);
    checks.database = {
      status: "healthy",
      workerCount: workers?.[0]?.count ?? 0,
      latencyMs: latency,
    };
  } catch (err) {
    checks.database = { status: "down", error: String(err) };
    errors.push("database");
    overallStatus = "degraded";
  }

  // Cache check (KV or in-memory)
  try {
    const t0 = performance.now();
    const kv = await getKV();
    if (kv) {
      await kv.get("health:ping", "text");
      checks.cache = {
        status: "healthy",
        type: "kv",
        latencyMs: Math.round(performance.now() - t0),
      };
    } else {
      checks.cache = { status: "healthy", type: "memory" };
    }
  } catch (err) {
    checks.cache = { status: "degraded", error: String(err) };
    errors.push("cache");
  }

  // AI check — last successful call time
  try {
    const db = await ensureDB();
    const lastAi = await db.prepare(
      "SELECT created_at FROM ai_conversations ORDER BY created_at DESC LIMIT 1"
    ).bind().first<{ created_at: string }>();
    const todayCount = await db.prepare(
      "SELECT COUNT(*) as count FROM ai_conversations WHERE created_at >= datetime('now', '-24 hours')"
    ).bind().first<{ count: number }>();
    checks.ai = {
      status: lastAi ? "healthy" : "no_data",
      lastCallAt: lastAi?.created_at || null,
      conversations24h: todayCount?.count ?? 0,
    };
  } catch (err) {
    checks.ai = { status: "degraded", error: String(err) };
    errors.push("ai");
  }

  // WhatsApp status
  try {
    const db = await ensureDB();
    const pendingMessages = await db.prepare(
      "SELECT COUNT(*) as count FROM wa_message_queue WHERE status = 'queued'"
    ).bind().first<{ count: number }>();
    const totalSent = await db.prepare(
      "SELECT COUNT(*) as count FROM wa_logs WHERE direction = 'outbound'"
    ).bind().first<{ count: number }>();
    const lastSent = await db.prepare(
      "SELECT created_at FROM wa_logs WHERE direction = 'outbound' ORDER BY created_at DESC LIMIT 1"
    ).bind().first<{ created_at: string }>();
    checks.whatsapp = {
      status: "connected",
      pendingQueue: pendingMessages?.count ?? 0,
      totalSent: totalSent?.count ?? 0,
      lastSentAt: lastSent?.created_at || null,
      uptime: "active",
    };
  } catch (err) {
    checks.whatsapp = { status: "disconnected", error: String(err) };
    errors.push("whatsapp");
  }

  // Tracking stats
  try {
    const db = await ensureDB();
    const [eventsToday, sessionsToday, errors24h] = await Promise.all([
      db.prepare(
        "SELECT COUNT(*) as count FROM user_events WHERE created_at >= datetime('now', '-24 hours')"
      ).bind().first<{ count: number }>(),
      db.prepare(
        "SELECT COUNT(*) as count FROM user_sessions WHERE created_at >= datetime('now', '-24 hours')"
      ).bind().first<{ count: number }>(),
      db.prepare(
        "SELECT COUNT(*) as count FROM system_logs WHERE log_type = 'error' AND created_at >= datetime('now', '-24 hours')"
      ).bind().first<{ count: number }>(),
    ]);
    const totalRequests = await db.prepare(
      "SELECT COUNT(*) as count FROM system_logs WHERE created_at >= datetime('now', '-24 hours')"
    ).bind().first<{ count: number }>();
    const errorRate = totalRequests?.count && totalRequests.count > 0
      ? Math.round(((errors24h?.count ?? 0) / totalRequests.count) * 100)
      : 0;
    checks.tracking = {
      status: "healthy",
      eventsToday: eventsToday?.count ?? 0,
      sessionsToday: sessionsToday?.count ?? 0,
      errors24h: errors24h?.count ?? 0,
      errorRatePct: errorRate,
    };
  } catch (err) {
    checks.tracking = { status: "degraded", error: String(err) };
    errors.push("tracking");
  }

  // Payments status
  try {
    const db = await ensureDB();
    const [pendingPayments, successRate] = await Promise.all([
      db.prepare(
        "SELECT COUNT(*) as count FROM orders WHERE payment_status = 'pending'"
      ).bind().first<{ count: number }>(),
      db.prepare(
        "SELECT COUNT(*) as total, SUM(CASE WHEN payment_status = 'paid' THEN 1 ELSE 0 END) as paid FROM orders"
      ).bind().first<{ total: number; paid: number }>(),
    ]);
    const rate = successRate?.total && successRate.total > 0
      ? Math.round(((successRate.paid ?? 0) / successRate.total) * 100)
      : 100;
    checks.payments = {
      status: rate >= 50 ? "healthy" : "degraded",
      pendingOrders: pendingPayments?.count ?? 0,
      successRatePct: rate,
      totalOrders: successRate?.total ?? 0,
    };
  } catch (err) {
    checks.payments = { status: "degraded", error: String(err) };
    errors.push("payments");
  }

  if (errors.length > 2) overallStatus = "down";
  else if (errors.length > 0) overallStatus = "degraded";

  return NextResponse.json({
    status: overallStatus,
    timestamp: new Date().toISOString(),
    checks,
    healthy: errors.length === 0,
    unhealthyChecks: errors,
  });
}
