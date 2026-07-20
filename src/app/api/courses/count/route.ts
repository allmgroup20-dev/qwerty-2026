import { NextResponse } from "next/server";
import { query } from "@/lib/db/queries";
import { getDB } from "@/lib/db";
import { getCached, setCached } from "@/lib/cache";

export async function GET() {
  try {
    const cached = await getCached<number>("courses:count", 300);
    if (cached !== null) {
      return NextResponse.json({ count: cached });
    }
    const rows = await query<{ count: number }>(await getDB(), "SELECT COUNT(*) as count FROM courses WHERE is_visible = 1");
    const count = rows[0]?.count ?? 0;
    await setCached("courses:count", count);
    return NextResponse.json({ count });
  } catch {
    return NextResponse.json({ count: 230 }, { status: 200 });
  }
}
