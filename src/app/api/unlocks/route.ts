import { NextRequest, NextResponse } from "next/server";
import { query, execute, queryFirst } from "@/lib/db/queries";
import { getDB } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const workerId = searchParams.get("workerId");
    if (!workerId) return NextResponse.json({ error: "workerId required" }, { status: 400 });

    const unlocks = await query<any>(
      await getDB(),
      `SELECT u.id, u.worker_id as workerId, u.course_id as courseId, u.unlocked_at as unlockedAt, u.unlocked_by as unlockedBy
       FROM user_unlocks u WHERE u.worker_id = ?`,
      [workerId]
    );
    return NextResponse.json({ unlocks });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as {
      workerId: string; courseId: number; unlockedBy?: string;
    };
    if (!body.workerId || !body.courseId) {
      return NextResponse.json({ error: "workerId and courseId required" }, { status: 400 });
    }

    const db = await getDB();

    // Check unlock limit
    const limit = await queryFirst<{ maxUnlocks: number }>(
      db, "SELECT max_unlocks as maxUnlocks FROM unlock_limits WHERE worker_id = ?", [body.workerId]
    );
    if (limit && limit.maxUnlocks > 0) {
      const count = await queryFirst<{ cnt: number }>(
        db, "SELECT COUNT(*) as cnt FROM user_unlocks WHERE worker_id = ?", [body.workerId]
      );
      if (count && count.cnt >= limit.maxUnlocks) {
        return NextResponse.json({ error: "Unlock limit reached" }, { status: 403 });
      }
    }

    await execute(db,
      `INSERT OR IGNORE INTO user_unlocks (worker_id, course_id, unlocked_by) VALUES (?, ?, ?)`,
      [body.workerId, body.courseId, body.unlockedBy || "user"]
    );

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : "Internal server error"
    }, { status: 500 });
  }
}
