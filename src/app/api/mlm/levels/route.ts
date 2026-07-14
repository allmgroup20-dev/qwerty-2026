import { NextRequest, NextResponse } from "next/server";
import { query, batch } from "@/lib/db/queries";
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

    const ops = levels.map((l) => ({
      sql: `INSERT OR REPLACE INTO commission_levels (level_number, level_name, percentage, fixed_amount, currency, is_active)
            VALUES (?, ?, ?, ?, 'BDT', 1)`,
      params: [l.levelNumber, l.levelName, l.percentage, l.fixedAmount],
    }));

    const activeNumbers = levels.map((l) => l.levelNumber);
    if (activeNumbers.length > 0) {
      const placeholders = activeNumbers.map(() => "?").join(",");
      ops.push({
        sql: `UPDATE commission_levels SET is_active = 0 WHERE level_number NOT IN (${placeholders})`,
        params: activeNumbers,
      });
    }

    await batch(db, ops);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Save levels error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
