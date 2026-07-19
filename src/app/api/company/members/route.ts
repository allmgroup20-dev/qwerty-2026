import { NextRequest, NextResponse } from "next/server";
import { query, execute, queryFirst } from "@/lib/db/queries";
import { getDB } from "@/lib/db";
import { hashWorkerPassword as hashPassword, generateWorkerId } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") || "";
  const page = parseInt(searchParams.get("page") || "1");
  const limit = Math.min(parseInt(searchParams.get("limit") || "50"), 100);
  const offset = (page - 1) * limit;

  try {
    const db = await getDB();
    const where = search
      ? "WHERE w.created_at > datetime('now', '-3 months') AND (w.name LIKE ? OR w.worker_id LIKE ? OR w.phone LIKE ?)"
      : "";
    const params = search ? [`%${search}%`, `%${search}%`, `%${search}%`] : [];

    const countResult = await queryFirst<{ total: number }>(
      db, `SELECT COUNT(*) as total FROM workers w ${where}`, params.length ? params : undefined
    );
    const total = countResult?.total || 0;

    const members = await query<any>(
      db,
      `SELECT w.worker_id as workerId, w.name, w.phone, w.email, w.level,
              w.sponsor_id as sponsorId, w.sponsor_name as sponsorName,
              w.join_date as joinDate, w.balance, w.total_earned as totalEarned,
              w.total_team_members as totalTeamMembers,
              w.membership_status as membershipStatus,
              w.is_test_account as isTestAccount,
              w.created_at as createdAt
       FROM workers w ${where}
       ORDER BY w.created_at DESC
       LIMIT ? OFFSET ?`,
      search
        ? [...params.map((p) => p as string), String(limit), String(offset)]
        : [String(limit), String(offset)]
    );

    return NextResponse.json({ members, total, page, limit });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, phone, password, sponsorId } = await request.json() as {
      name?: string; phone: string; password: string; sponsorId?: string;
    };
    if (!phone || !password) {
      return NextResponse.json({ error: "Phone and password required" }, { status: 400 });
    }
    const displayName = name || `User${phone.slice(-6)}`;

    const db = await getDB();

    const existing = await queryFirst<{ worker_id: string }>(
      db, "SELECT worker_id FROM workers WHERE phone = ?", [phone]
    );
    if (existing) {
      return NextResponse.json({ error: "Phone already registered" }, { status: 409 });
    }

    let sponsorName: string | null = null;
    if (sponsorId) {
      const sponsor = await queryFirst<{ name: string }>(
        db, "SELECT name FROM workers WHERE worker_id = ?", [sponsorId]
      );
      if (sponsor) sponsorName = sponsor.name;
    }

    const workerId = generateWorkerId(displayName, phone);
    const hashed = await hashPassword(password);

    await execute(db,
       `INSERT INTO workers (worker_id, name, phone, password, sponsor_id, sponsor_name, level, join_date, membership_status)
       VALUES (?, ?, ?, ?, ?, ?, 1, datetime('now'), 'general')`,
      [workerId, displayName, phone, hashed, sponsorId || null, sponsorName]
    );

    if (sponsorId) {
      await execute(db,
        "UPDATE workers SET total_team_members = total_team_members + 1 WHERE worker_id = ?",
        [sponsorId]
      );
    }

    return NextResponse.json({ workerId, name: displayName }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
