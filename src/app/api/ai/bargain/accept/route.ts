import { NextRequest, NextResponse } from "next/server";
import { execute, queryFirst } from "@/lib/db/queries";
import { getDB } from "@/lib/db";

const MIN_PRICE_FLOOR = 99;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as { sessionId: number };
    if (!body.sessionId) {
      return NextResponse.json({ error: "sessionId required" }, { status: 400 });
    }

    const db = await getDB();
    const session = await queryFirst<any>(
      db, "SELECT * FROM bargain_sessions WHERE id = ? AND status IN ('active', 'accepted')", [body.sessionId]
    );
    if (!session) {
      return NextResponse.json({ error: "Session not found or expired" }, { status: 404 });
    }

    await execute(db,
      "UPDATE bargain_sessions SET status = 'accepted', updated_at = datetime('now') WHERE id = ?",
      [session.id]
    );

    return NextResponse.json({
      resourceCount: session.resource_count,
      amount: Math.max(session.current_offer, MIN_PRICE_FLOOR),
      message: `ডিল পাকাপোক্ত! ${session.resource_count}টি রিসোর্স = ৳${Math.max(session.current_offer, 99).toLocaleString()}`,
    });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Internal error" }, { status: 500 });
  }
}
