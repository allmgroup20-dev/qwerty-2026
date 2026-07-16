import { NextRequest, NextResponse } from "next/server";
import { query, execute } from "@/lib/db/queries";
import { getDB } from "@/lib/db";

interface LevelRow {
  levelNumber: number;
  levelName: string;
  percentage: number;
  fixedAmount: number;
  currency: string;
  isActive: number;
}

export async function GET() {
  try {
    const levels = await query<LevelRow>(
      await getDB(),
      "SELECT level_number as levelNumber, level_name as levelName, percentage, fixed_amount as fixedAmount, currency, is_active as isActive FROM commission_levels ORDER BY level_number ASC"
    );
    return NextResponse.json({ levels });
  } catch (error) {
    console.error("GET levels error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { levels } = await request.json() as {
      levels: { levelNumber: number; levelName: string; percentage: number; fixedAmount: number }[];
    };

    if (!levels || !Array.isArray(levels)) {
      return NextResponse.json({ error: "Invalid levels data" }, { status: 400 });
    }

    const db = await getDB();

    // Delete all existing levels first, then re-insert
    await execute(db, "DELETE FROM commission_levels");

    for (const l of levels) {
      await execute(
        db,
        `INSERT INTO commission_levels (level_number, level_name, percentage, fixed_amount, currency, is_active)
         VALUES (?, ?, ?, ?, 'BDT', 1)`,
        [l.levelNumber, l.levelName, l.percentage, l.fixedAmount]
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Save levels error:", error);
    return NextResponse.json({
      error: error instanceof Error ? error.message : "Internal server error"
    }, { status: 500 });
  }
}
