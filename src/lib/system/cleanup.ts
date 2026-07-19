import { ensureDB } from "@/lib/db";

export async function cleanupOldLogs(retentionDays = 7): Promise<{ deleted: number }> {
  try {
    const db = await ensureDB();
    const result = await db.prepare(
      `DELETE FROM system_logs WHERE created_at < datetime('now', ? || ' days')`
    ).bind(-retentionDays).run();
    const deleted = (result as any)?.meta?.changes || 0;

    // Also cleanup old health history (keep 90 days)
    await db.prepare(
      `DELETE FROM health_history WHERE created_at < datetime('now', '-90 days')`
    ).bind().run().catch(() => {});

    return { deleted };
  } catch (err) {
    console.error("Cleanup old logs error:", err);
    return { deleted: 0 };
  }
}

export async function recordHealthCheck(): Promise<void> {
  try {
    const db = await ensureDB();
    let dbOk = 1;
    try {
      await db.prepare("SELECT 1").bind().run();
    } catch { dbOk = 0; }

    const mem = (process as any)?.memoryUsage?.()?.heapUsed
      ? Math.round((process as any).memoryUsage().heapUsed / 1024 / 1024 * 10) / 10
      : null;

    const uptime = process?.uptime ? Math.round(process.uptime()) : 0;
    const status = dbOk ? "ok" : "error";

    await db.prepare(
      `INSERT INTO health_history (status, db_ok, cache_ok, memory_mb, uptime_seconds)
       VALUES (?, ?, 1, ?, ?)`
    ).bind(status, dbOk, mem, uptime).run();
  } catch {}
}
