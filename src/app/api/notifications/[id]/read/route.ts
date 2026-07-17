import { NextRequest, NextResponse } from "next/server";
import { ensureDB } from "@/lib/db";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const db = await ensureDB();
    await db.prepare("UPDATE notifications SET is_read = 1 WHERE id = ?").bind(id).run();
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Notification read error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
