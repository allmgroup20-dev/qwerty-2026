import { NextRequest, NextResponse } from "next/server";
import { ensureDB } from "@/lib/db";
import { recordHealthCheck, cleanupOldLogs } from "@/lib/system/cleanup";

export async function GET(req: NextRequest) {
  try {
    const sp = req.nextUrl.searchParams;
    const action = sp.get("action");
    const page = Math.max(1, parseInt(sp.get("page") || "1"));
    const limit = Math.min(100, parseInt(sp.get("limit") || "30"));
    const offset = (page - 1) * limit;

    if (action === "check") {
      await recordHealthCheck();
      return NextResponse.json({ ok: true });
    }

    if (action === "cleanup") {
      const days = parseInt(sp.get("days") || "7");
      const result = await cleanupOldLogs(days);
      return NextResponse.json(result);
    }

    const db = await ensureDB();
    const [rows, countResult] = await Promise.all([
      db.prepare("SELECT id, status, db_ok, cache_ok, memory_mb, uptime_seconds, created_at FROM health_history ORDER BY created_at DESC LIMIT ? OFFSET ?").bind(limit, offset).all() as Promise<{ results: Record<string, unknown>[] }>,
      db.prepare("SELECT COUNT(*) as count FROM health_history").bind().first() as Promise<{ count: number } | undefined>,
    ]);

    // Latest status
    const latest = rows.results?.[0] || null;

    return NextResponse.json({
      checks: rows.results || [],
      latest,
      total: countResult?.count || 0,
      page, limit,
    });
  } catch (err) {
    console.error("System health error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
