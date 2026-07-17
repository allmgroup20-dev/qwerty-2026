import { NextRequest, NextResponse } from "next/server";
import { ensureDB } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as Record<string, unknown>;
    const { workerId, deviceType, browser, os, userAgent, screenResolution, ipAddress, city, country, timezone, language } = body;

    if (!workerId) {
      return NextResponse.json({ error: "workerId required" }, { status: 400 });
    }

    const db = await ensureDB();
    const now = new Date().toISOString();

    const existing = await db.prepare(
      "SELECT id FROM user_devices WHERE worker_id = ? AND device_type = ? AND browser = ? AND os = ?"
    ).bind(workerId, deviceType || null, browser || null, os || null).first() as { id: number } | undefined;

    if (existing) {
      await db.prepare(
        "UPDATE user_devices SET is_active = 1, last_seen_at = ?, ip_address = ?, city = ?, country = ?, timezone = ?, language = ?, user_agent = ?, screen_resolution = ? WHERE id = ?"
      ).bind(now, ipAddress || null, city || null, country || null, timezone || null, language || null, userAgent || null, screenResolution || null, existing.id).run();
    } else {
      await db.prepare(
        `INSERT INTO user_devices (worker_id, device_type, browser, os, user_agent, screen_resolution, ip_address, city, country, timezone, language, is_active, last_seen_at, first_seen_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?, ?)`
      ).bind(workerId, deviceType || null, browser || null, os || null, userAgent || null, screenResolution || null, ipAddress || null, city || null, country || null, timezone || null, language || null, now, now).run();
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Device track error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
