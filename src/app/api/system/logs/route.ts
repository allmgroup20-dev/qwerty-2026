import { NextRequest, NextResponse } from "next/server";
import { ensureDB } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const sp = req.nextUrl.searchParams;
    const logType = sp.get("logType");
    const source = sp.get("source");
    const search = sp.get("search");
    const page = Math.max(1, parseInt(sp.get("page") || "1"));
    const limit = Math.min(100, parseInt(sp.get("limit") || "50"));
    const offset = (page - 1) * limit;

    const db = await ensureDB();
    const conditions: string[] = [];
    const params: unknown[] = [];

    if (logType) { conditions.push("log_type = ?"); params.push(logType); }
    if (source) { conditions.push("source = ?"); params.push(source); }
    if (search) {
      conditions.push("(message LIKE ? OR source LIKE ?)");
      const p = `%${search}%`;
      params.push(p, p);
    }

    const where = conditions.length > 0 ? "WHERE " + conditions.join(" AND ") : "";
    const [rows, countResult] = await Promise.all([
      db.prepare(`SELECT id, log_type, source, message, status_code, duration_ms, route, method, is_ai_analyzed, created_at FROM system_logs ${where} ORDER BY created_at DESC LIMIT ? OFFSET ?`).bind(...params, limit, offset).all() as Promise<{ results: Record<string, unknown>[] }>,
      db.prepare(`SELECT COUNT(*) as count FROM system_logs ${where}`).bind(...params).first() as Promise<{ count: number } | undefined>,
    ]);

    return NextResponse.json({
      logs: rows.results || [],
      total: countResult?.count || 0,
      page, limit,
    });
  } catch (err) {
    console.error("System logs error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as {
      logType: string;
      source: string;
      message: string;
      stackTrace?: string;
      details?: string;
      route?: string;
      method?: string;
      statusCode?: number;
    };

    if (!body.logType || !body.message) {
      return NextResponse.json({ error: "logType and message required" }, { status: 400 });
    }

    const db = await ensureDB();
    await db.prepare(
      `INSERT INTO system_logs (log_type, source, message, details, stack_trace, route, method, status_code, user_agent)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(
      body.logType,
      body.source || "client",
      body.message,
      body.details || null,
      body.stackTrace || null,
      body.route || null,
      body.method || null,
      body.statusCode || null,
      req.headers.get("user-agent") || null
    ).run();

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("System log POST error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
