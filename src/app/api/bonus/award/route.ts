import { NextRequest, NextResponse } from "next/server";
import { query, execute } from "@/lib/db/queries";
import { getDB } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const { workerId, amount, reason } = await request.json() as {
      workerId: string; amount: number; reason?: string;
    };
    if (!workerId || !amount || amount <= 0) {
      return NextResponse.json({ error: "Invalid workerId or amount" }, { status: 400 });
    }

    const env = await getDB();
    await execute(env,
      `UPDATE workers SET demo_bonus = demo_bonus + ?, demo_bonus_original = demo_bonus_original + ? WHERE worker_id = ?`,
      [amount, amount, workerId]
    );

    return NextResponse.json({ success: true, awarded: amount });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
