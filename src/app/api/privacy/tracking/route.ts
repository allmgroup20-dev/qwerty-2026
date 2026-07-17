import { NextRequest, NextResponse } from "next/server";
import { ensureDB } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const workerId = req.nextUrl.searchParams.get("workerId");
    if (!workerId) return NextResponse.json({ error: "workerId required" }, { status: 400 });

    const db = await ensureDB();
    const pref = await db.prepare(
      "SELECT tracking_enabled, updated_at FROM user_tracking_prefs WHERE worker_id = ?"
    ).bind(workerId).first() as { tracking_enabled: number; updated_at: string } | undefined;

    return NextResponse.json({
      trackingEnabled: pref ? pref.tracking_enabled === 1 : true,
      updatedAt: pref?.updated_at || null,
    });
  } catch (err) {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as { workerId?: string; trackingEnabled?: boolean };
    const { workerId, trackingEnabled } = body;
    if (!workerId || trackingEnabled === undefined) {
      return NextResponse.json({ error: "workerId and trackingEnabled required" }, { status: 400 });
    }

    const db = await ensureDB();
    await db.prepare(
      "INSERT INTO user_tracking_prefs (worker_id, tracking_enabled, updated_at) VALUES (?, ?, datetime('now')) ON CONFLICT(worker_id) DO UPDATE SET tracking_enabled = ?, updated_at = datetime('now')"
    ).bind(workerId, trackingEnabled ? 1 : 0, trackingEnabled ? 1 : 0).run();

    return NextResponse.json({ success: true, trackingEnabled });
  } catch (err) {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
