import { NextResponse } from "next/server";
import { ensureDB } from "@/lib/db";

export const runtime = "edge";

export async function GET() {
  try {
    const db = await ensureDB();
    await db.prepare("SELECT 1").run();
    return NextResponse.json({ ok: true, ts: Date.now() });
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}
