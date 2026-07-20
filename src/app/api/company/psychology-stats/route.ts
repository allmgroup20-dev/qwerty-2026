import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import { query, queryFirst, execute } from "@/lib/db/queries";

export async function GET() {
  try {
    const db = await getDB();

    const total = await queryFirst<{ total: number }>(db, "SELECT COUNT(*) as total FROM ai_phone_profiles");
    const avgTrust = await queryFirst<{ avg: number }>(db, "SELECT ROUND(AVG(trust_score), 1) as avg FROM ai_phone_profiles WHERE trust_score IS NOT NULL");

    const fear = await queryFirst<Record<string, number>>(db, `SELECT
      SUM(CASE WHEN pain_points LIKE '%financial_loss%' OR pain_points LIKE '%loss%' OR pain_points LIKE '%money%' THEN 1 ELSE 0 END) as financial_loss,
      SUM(CASE WHEN pain_points LIKE '%social%' OR pain_points LIKE '%status%' OR pain_points LIKE '%reputation%' THEN 1 ELSE 0 END) as social_status,
      SUM(CASE WHEN pain_points LIKE '%deceived%' OR pain_points LIKE '%scam%' OR pain_points LIKE '%cheat%' OR pain_points LIKE '%fraud%' THEN 1 ELSE 0 END) as being_deceived,
      SUM(CASE WHEN pain_points LIKE '%control%' OR pain_points LIKE '%autonomy%' OR pain_points LIKE '%freedom%' OR pain_points LIKE '%trap%' THEN 1 ELSE 0 END) as losing_autonomy,
      SUM(CASE WHEN pain_points IS NULL OR pain_points = '' THEN 1 ELSE 0 END) as unknown
    FROM ai_phone_profiles`);

    const trustDist = await queryFirst<Record<string, number>>(db, `SELECT
      SUM(CASE WHEN trust_score >= 8 THEN 1 ELSE 0 END) as high,
      SUM(CASE WHEN trust_score >= 5 AND trust_score < 8 THEN 1 ELSE 0 END) as medium,
      SUM(CASE WHEN trust_score >= 3 AND trust_score < 5 THEN 1 ELSE 0 END) as low,
      SUM(CASE WHEN trust_score < 3 AND trust_score IS NOT NULL THEN 1 ELSE 0 END) as critical
    FROM ai_phone_profiles`);

    const control = await queryFirst<Record<string, number>>(db, `SELECT
      SUM(CASE WHEN control_sensitivity = 'low' THEN 1 ELSE 0 END) as low,
      SUM(CASE WHEN control_sensitivity = 'medium' THEN 1 ELSE 0 END) as medium,
      SUM(CASE WHEN control_sensitivity = 'high' THEN 1 ELSE 0 END) as high
    FROM ai_phone_profiles`);

    const manip = await queryFirst<Record<string, number>>(db, `SELECT
      SUM(CASE WHEN manipulation_risk = 'low' THEN 1 ELSE 0 END) as low,
      SUM(CASE WHEN manipulation_risk = 'medium' THEN 1 ELSE 0 END) as medium,
      SUM(CASE WHEN manipulation_risk = 'high' THEN 1 ELSE 0 END) as high
    FROM ai_phone_profiles`);

    const recent = await query<{
      phone: string; trust_score: number; control_sensitivity: string;
      manipulation_risk: string; updated_at: string;
    }>(db, `SELECT phone, trust_score, control_sensitivity, manipulation_risk, updated_at
      FROM ai_phone_profiles
      WHERE trust_score IS NOT NULL
      ORDER BY updated_at DESC LIMIT 20`);

    return NextResponse.json({
      success: true,
      stats: {
        totalProfiles: total?.total || 0,
        averageTrust: avgTrust?.avg || 0,
        trustDistribution: trustDist || { high: 0, medium: 0, low: 0, critical: 0 },
        fearProfile: fear || { financial_loss: 0, social_status: 0, being_deceived: 0, losing_autonomy: 0, unknown: 0 },
        controlSensitivity: control || { low: 0, medium: 0, high: 0 },
        manipulationRisk: manip || { low: 0, medium: 0, high: 0 },
        recentProfiles: recent || [],
      },
    });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Failed to fetch" }, { status: 500 });
  }
}
