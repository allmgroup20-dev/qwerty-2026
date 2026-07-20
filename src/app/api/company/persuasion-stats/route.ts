import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import { query, queryFirst } from "@/lib/db/queries";

export async function GET() {
  try {
    const db = await getDB();

    const totalApplied = await queryFirst<{ c: number }>(db, "SELECT COUNT(*) as c FROM persuasion_tracking");
    const avgEffectiveness = await queryFirst<{ avg: number }>(db, "SELECT ROUND(AVG(COALESCE(effectiveness_score, 0)), 2) as avg FROM persuasion_tracking");
    const topTechniques = await query<{ technique_used: string; count: number; avg_score: number }>(
      db,
      `SELECT technique_used, COUNT(*) as count, ROUND(AVG(COALESCE(effectiveness_score, 0)), 2) as avg_score
       FROM persuasion_tracking
       GROUP BY technique_used
       ORDER BY count DESC`
    );
    const trending = await query<{ technique_used: string; count: number; date: string }>(
      db,
      `SELECT technique_used, DATE(created_at) as date, COUNT(*) as count
       FROM persuasion_tracking
       WHERE created_at >= datetime('now', '-14 days')
       GROUP BY technique_used, DATE(created_at)
       ORDER BY date DESC, count DESC`
    );

    return NextResponse.json({
      total: totalApplied?.c || 0,
      avgEffectiveness: avgEffectiveness?.avg || 0,
      topTechniques: topTechniques || [],
      trending: trending || [],
    });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Failed" }, { status: 500 });
  }
}
