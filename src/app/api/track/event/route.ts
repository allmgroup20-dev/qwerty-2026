import { NextRequest, NextResponse } from "next/server";
import { ensureDB } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as Record<string, unknown>;
    const { eventType, pageUrl, pageCategory, searchKeyword, productId, productCategory, timeSpentSeconds, deviceInfo, sessionId, metadata, workerId } = body;

    if (!eventType) {
      return NextResponse.json({ error: "eventType is required" }, { status: 400 });
    }

    const db = await ensureDB();

    await db.prepare(
      `INSERT INTO user_events (worker_id, event_type, page_url, page_category, search_keyword, product_id, product_category, time_spent_seconds, device_info, session_id, metadata)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(
      workerId || "",
      eventType,
      pageUrl || null,
      pageCategory || null,
      searchKeyword || null,
      productId || null,
      productCategory || null,
      timeSpentSeconds || null,
      deviceInfo || null,
      sessionId || null,
      metadata ? JSON.stringify(metadata) : null
    ).run();

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Track event error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
