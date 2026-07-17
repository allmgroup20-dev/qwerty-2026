import { NextRequest, NextResponse } from "next/server";
import { ensureDB } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as Record<string, unknown>;
    const { action, sessionId, workerId, deviceType, browser, os, userAgent, screenResolution, referrer, ipAddress, city, country, timezone, language, utmSource, utmCampaign } = body;

    if (!sessionId || !workerId) {
      return NextResponse.json({ error: "sessionId and workerId required" }, { status: 400 });
    }

    const db = await ensureDB();
    const now = new Date().toISOString();

    if (action === "start") {
      const existing = await db.prepare("SELECT id FROM user_sessions WHERE session_start = ? AND worker_id = ?").bind(sessionId, workerId).first();
      if (!existing) {
        await db.prepare(
          `INSERT INTO user_sessions (worker_id, session_start, ip_address, user_agent, device_type, browser, os, screen_resolution, referrer, city, country, timezone, language, utm_source, utm_campaign, created_at)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
        ).bind(workerId, sessionId, ipAddress || null, userAgent || null, deviceType || null, browser || null, os || null, screenResolution || null, referrer || null, city || null, country || null, timezone || null, language || null, utmSource || null, utmCampaign || null, now).run();
      }
    } else if (action === "end") {
      const session = await db.prepare("SELECT id, session_start FROM user_sessions WHERE worker_id = ? AND session_start = ?").bind(workerId, sessionId).first() as { id: number; session_start: string } | undefined;
      if (session) {
        const startMs = new Date(session.session_start).getTime();
        const duration = Math.round((Date.now() - startMs) / 1000);
        await db.prepare(
          "UPDATE user_sessions SET session_end = ?, duration_seconds = ? WHERE id = ?"
        ).bind(now, Math.max(duration, 0), session.id).run();
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Session track error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
