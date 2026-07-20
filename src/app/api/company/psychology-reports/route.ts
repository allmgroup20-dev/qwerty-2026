import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import { query, queryFirst, execute } from "@/lib/db/queries";

async function takeSnapshot(db: { DB: D1Database }) {
  const today = new Date().toISOString().split("T")[0];

  const existing = await queryFirst<{ id: number }>(db, "SELECT id FROM psychology_snapshots WHERE snapshot_date = ?", [today]);
  if (existing) return existing;

  const total = await queryFirst<{ total: number }>(db, "SELECT COUNT(*) as total FROM ai_phone_profiles");
  const avgTrust = await queryFirst<{ avg: number }>(db, "SELECT ROUND(AVG(trust_score), 1) as avg FROM ai_phone_profiles WHERE trust_score IS NOT NULL");
  const trustDist = await queryFirst<Record<string, number>>(db, `SELECT
    SUM(CASE WHEN trust_score >= 8 THEN 1 ELSE 0 END) as trust_high,
    SUM(CASE WHEN trust_score >= 5 AND trust_score < 8 THEN 1 ELSE 0 END) as trust_medium,
    SUM(CASE WHEN trust_score >= 3 AND trust_score < 5 THEN 1 ELSE 0 END) as trust_low,
    SUM(CASE WHEN trust_score < 3 AND trust_score IS NOT NULL THEN 1 ELSE 0 END) as trust_critical
  FROM ai_phone_profiles`);
  const fear = await queryFirst<Record<string, number>>(db, `SELECT
    SUM(CASE WHEN pain_points LIKE '%financial_loss%' OR pain_points LIKE '%loss%' OR pain_points LIKE '%money%' THEN 1 ELSE 0 END) as fear_financial,
    SUM(CASE WHEN pain_points LIKE '%social%' OR pain_points LIKE '%status%' OR pain_points LIKE '%reputation%' THEN 1 ELSE 0 END) as fear_social,
    SUM(CASE WHEN pain_points LIKE '%deceived%' OR pain_points LIKE '%scam%' OR pain_points LIKE '%cheat%' OR pain_points LIKE '%fraud%' THEN 1 ELSE 0 END) as fear_deceived,
    SUM(CASE WHEN pain_points LIKE '%control%' OR pain_points LIKE '%autonomy%' OR pain_points LIKE '%freedom%' OR pain_points LIKE '%trap%' THEN 1 ELSE 0 END) as fear_autonomy,
    SUM(CASE WHEN pain_points IS NULL OR pain_points = '' THEN 1 ELSE 0 END) as fear_unknown
  FROM ai_phone_profiles`);
  const control = await queryFirst<Record<string, number>>(db, `SELECT
    SUM(CASE WHEN control_sensitivity = 'low' THEN 1 ELSE 0 END) as control_low,
    SUM(CASE WHEN control_sensitivity = 'medium' THEN 1 ELSE 0 END) as control_medium,
    SUM(CASE WHEN control_sensitivity = 'high' THEN 1 ELSE 0 END) as control_high
  FROM ai_phone_profiles`);
  const manip = await queryFirst<Record<string, number>>(db, `SELECT
    SUM(CASE WHEN manipulation_risk = 'low' THEN 1 ELSE 0 END) as manip_low,
    SUM(CASE WHEN manipulation_risk = 'medium' THEN 1 ELSE 0 END) as manip_medium,
    SUM(CASE WHEN manipulation_risk = 'high' THEN 1 ELSE 0 END) as manip_high
  FROM ai_phone_profiles`);

  const highLeadRes = await queryFirst<{ c: number }>(db, "SELECT COUNT(*) as c FROM ai_phone_profiles WHERE priority_score >= 8");
  const churnRes = await queryFirst<{ c: number }>(db, "SELECT COUNT(*) as c FROM ai_phone_profiles WHERE trust_score < 4 AND trust_score IS NOT NULL");

  const vals = [
    String(today),
    String(total?.total || 0),
    String(avgTrust?.avg || 0),
    String(trustDist?.trust_high || 0),
    String(trustDist?.trust_medium || 0),
    String(trustDist?.trust_low || 0),
    String(trustDist?.trust_critical || 0),
    String(fear?.fear_financial || 0),
    String(fear?.fear_social || 0),
    String(fear?.fear_deceived || 0),
    String(fear?.fear_autonomy || 0),
    String(fear?.fear_unknown || 0),
    String(control?.control_low || 0),
    String(control?.control_medium || 0),
    String(control?.control_high || 0),
    String(manip?.manip_low || 0),
    String(manip?.manip_medium || 0),
    String(manip?.manip_high || 0),
    String(highLeadRes?.c || 0),
    String(churnRes?.c || 0),
  ];

  const stmt = db.DB.prepare(`INSERT OR REPLACE INTO psychology_snapshots
    (snapshot_date, total_profiles, avg_trust, trust_high, trust_medium, trust_low, trust_critical,
     fear_financial, fear_social, fear_deceived, fear_autonomy, fear_unknown,
     control_low, control_medium, control_high, manip_low, manip_medium, manip_high,
     high_lead_count, churn_risk_count, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))`);
  await stmt.bind(...vals).run();

  return { snapshot_date: today };
}

export async function GET(request: NextRequest) {
  try {
    const db = await getDB();
    const { searchParams } = new URL(request.url);
    const view = searchParams.get("view") || "trends";
    const days = parseInt(searchParams.get("days") || "30");

    // Auto-snapshot if today's doesn't exist
    await takeSnapshot(db).catch(() => {});

    if (view === "segments") {
      const segmentData = await query<{ segment: string; count: number; avg_trust: number }>(db,
        `SELECT ubs.segment, COUNT(*) as count, ROUND(AVG(COALESCE(ap.trust_score, 0)), 1) as avg_trust
        FROM user_behavior_scores ubs
        LEFT JOIN ai_phone_profiles ap ON ubs.worker_id = ap.phone
        GROUP BY ubs.segment ORDER BY count DESC`);
      return NextResponse.json({ success: true, segments: segmentData || [] });
    }

    if (view === "churn") {
      const churnProfiles = await query<{
        phone: string; trust_score: number; control_sensitivity: string;
        manipulation_risk: string; priority_score: number; pain_points: string;
      }>(db, `SELECT phone, trust_score, control_sensitivity, manipulation_risk, priority_score, pain_points
        FROM ai_phone_profiles
        WHERE trust_score < 4 AND trust_score IS NOT NULL
        ORDER BY trust_score ASC LIMIT 50`);

      const churnRiskCount = await queryFirst<{ c: number }>(db,
        "SELECT COUNT(*) as c FROM ai_phone_profiles WHERE trust_score < 4 AND trust_score IS NOT NULL");

      return NextResponse.json({
        success: true,
        churn: {
          totalAtRisk: churnRiskCount?.c || 0,
          profiles: churnProfiles || [],
        },
      });
    }

    // Default: trends
    const snapshots = await query<Record<string, number | string>>(db,
      `SELECT * FROM psychology_snapshots ORDER BY snapshot_date DESC LIMIT ?`, [String(days)]);

    const latest = snapshots && snapshots.length > 0 ? snapshots[0] : null;
    const previous = snapshots && snapshots.length > 1 ? snapshots[1] : null;

    let trustTrend: "up" | "down" | "stable" = "stable";
    if (latest && previous) {
      const latestTrust = Number(latest.avg_trust) || 0;
      const prevTrust = Number(previous.avg_trust) || 0;
      trustTrend = latestTrust > prevTrust ? "up" : latestTrust < prevTrust ? "down" : "stable";
    }

    return NextResponse.json({
      success: true,
      trends: {
        snapshots: snapshots || [],
        latest,
        trustTrend,
        days,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Failed to fetch" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const db = await getDB();
    const body = await request.json() as { action?: string };

    if (body.action === "snapshot") {
      const result = await takeSnapshot(db);
      return NextResponse.json({ success: true, message: "Snapshot taken", snapshot: result });
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Failed" }, { status: 500 });
  }
}
