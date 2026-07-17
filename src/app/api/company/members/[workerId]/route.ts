import { NextRequest, NextResponse } from "next/server";
import { queryFirst, execute } from "@/lib/db/queries";
import { getDB } from "@/lib/db";
import { verifyCompanyPassword as verifyPassword, hashCompanyPassword as hashPassword } from "@/lib/auth";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ workerId: string }> }
) {
  try {
    const { workerId } = await params;
    const db = await getDB();
    const worker = await queryFirst<any>(
      db,
      `SELECT w.worker_id as workerId, w.name, w.phone, w.email, w.password,
              w.avatar_url as avatarUrl, w.sponsor_id as sponsorId,
              w.sponsor_name as sponsorName, w.level, w.join_date as joinDate,
              w.currency, w.balance, w.total_earned as totalEarned,
              w.total_spent as totalSpent,
              w.total_team_members as totalTeamMembers,
              w.membership_status as membershipStatus,
              w.is_test_account as isTestAccount,
              w.created_at as createdAt, w.updated_at as updatedAt
       FROM workers w WHERE w.worker_id = ?`,
      [workerId]
    );
    if (!worker) {
      return NextResponse.json({ error: "Member not found" }, { status: 404 });
    }
    const { password: _, ...safe } = worker;
    return NextResponse.json(safe);
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ workerId: string }> }
) {
  try {
    const { workerId } = await params;
    const body = await request.json() as {
      name?: string; phone?: string; email?: string; password?: string;
      level?: number; sponsorId?: string; membershipStatus?: string;
      balance?: number;
    };

    const db = await getDB();
    const updates: string[] = [];
    const values: unknown[] = [];

    if (body.name !== undefined) { updates.push("name = ?"); values.push(body.name); }
    if (body.phone !== undefined) { updates.push("phone = ?"); values.push(body.phone); }
    if (body.email !== undefined) { updates.push("email = ?"); values.push(body.email || null); }
    if (body.level !== undefined) { updates.push("level = ?"); values.push(body.level); }
    if (body.membershipStatus !== undefined) { updates.push("membership_status = ?"); values.push(body.membershipStatus); }
    if (body.balance !== undefined) { updates.push("balance = ?"); values.push(body.balance); }
    if (body.sponsorId !== undefined) { updates.push("sponsor_id = ?"); values.push(body.sponsorId || null); }
    if (body.password) {
      const hashed = await hashPassword(body.password);
      updates.push("password = ?");
      values.push(hashed);
    }

    if (updates.length === 0) {
      return NextResponse.json({ error: "Nothing to update" }, { status: 400 });
    }

    updates.push("updated_at = datetime('now')");
    values.push(workerId);

    await execute(db, `UPDATE workers SET ${updates.join(", ")} WHERE worker_id = ?`, values);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ workerId: string }> }
) {
  try {
    const { workerId } = await params;
    const { password, username } = await request.json() as { password: string; username: string };

    if (!password || !username) {
      return NextResponse.json({ error: "Password and username required" }, { status: 400 });
    }

    const db = await getDB();

    const admin = await queryFirst<{ password: string }>(
      db, "SELECT password FROM company_users WHERE LOWER(username) = LOWER(?)",
      [username]
    );
    if (!admin) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const valid = await verifyPassword(password, admin.password);
    if (!valid) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    await execute(db, "DELETE FROM workers WHERE worker_id = ?", [workerId]);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
