import { NextRequest, NextResponse } from "next/server";
import { execute, query } from "@/lib/db/queries";
import { getDB } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const workerId = request.nextUrl.searchParams.get("workerId");
    if (!workerId) {
      return NextResponse.json({ error: "workerId required" }, { status: 400 });
    }
    const db = await getDB();
    const links = await query<any>(
      db, "SELECT id, platform, platform_id, verified, linked_at FROM user_platform_links WHERE worker_id = ? ORDER BY platform", [workerId]
    );
    return NextResponse.json({ links });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Internal error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as { workerId: string; platform: string; platformId: string };
    if (!body.workerId || !body.platform || !body.platformId) {
      return NextResponse.json({ error: "workerId, platform, platformId required" }, { status: 400 });
    }
    const db = await getDB();
    await execute(db,
      `INSERT OR REPLACE INTO user_platform_links (worker_id, platform, platform_id, linked_at)
       VALUES (?, ?, ?, datetime('now'))`,
      [body.workerId, body.platform, body.platformId]
    );
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Internal error" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const workerId = request.nextUrl.searchParams.get("workerId");
    const id = request.nextUrl.searchParams.get("id");
    if (!workerId || !id) {
      return NextResponse.json({ error: "workerId and id required" }, { status: 400 });
    }
    const db = await getDB();
    await execute(db, "DELETE FROM user_platform_links WHERE id = ? AND worker_id = ?", [id, workerId]);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Internal error" }, { status: 500 });
  }
}
