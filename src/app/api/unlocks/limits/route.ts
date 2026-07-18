import { NextRequest, NextResponse } from "next/server";
import { query, execute, queryFirst } from "@/lib/db/queries";
import { getDB } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const workerId = searchParams.get("workerId");

    let sql = `SELECT id, worker_id as workerId, max_unlocks as maxUnlocks, set_by as setBy,
               set_at as setAt, updated_at as updatedAt FROM unlock_limits`;
    const params: unknown[] = [];
    if (workerId) { sql += " WHERE worker_id = ?"; params.push(workerId); }
    sql += " ORDER BY worker_id ASC";

    const limits = await query<any>(await getDB(), sql, params);
    return NextResponse.json({ limits });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as {
      workerId: string; maxUnlocks: number; setBy?: string;
    };
    if (!body.workerId || body.maxUnlocks === undefined) {
      return NextResponse.json({ error: "workerId and maxUnlocks required" }, { status: 400 });
    }

    const db = await getDB();

    // Delete existing unlocks if reducing limit
    const existing = await queryFirst<{ maxUnlocks: number }>(
      db, "SELECT max_unlocks FROM unlock_limits WHERE worker_id = ?", [body.workerId]
    );

    await execute(db,
      `INSERT INTO unlock_limits (worker_id, max_unlocks, set_by, set_at, updated_at)
       VALUES (?, ?, ?, datetime('now'), datetime('now'))
       ON CONFLICT(worker_id) DO UPDATE SET max_unlocks=?, set_by=?, updated_at=datetime('now')`,
      [body.workerId, body.maxUnlocks, body.setBy || "admin", body.maxUnlocks, body.setBy || "admin"]
    );

    // If user already has more unlocks than new limit, trim extras (keep oldest)
    if (existing && body.maxUnlocks < existing.maxUnlocks) {
      await execute(db,
        `DELETE FROM user_unlocks WHERE worker_id = ? AND id NOT IN (
          SELECT id FROM user_unlocks WHERE worker_id = ? ORDER BY unlocked_at ASC LIMIT ?
        )`,
        [body.workerId, body.workerId, body.maxUnlocks]
      );
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : "Internal server error"
    }, { status: 500 });
  }
}
