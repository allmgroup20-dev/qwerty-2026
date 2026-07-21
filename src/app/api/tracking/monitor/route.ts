import { NextRequest, NextResponse } from "next/server";
import { ensureDB } from "@/lib/db";
import { getKV } from "@/lib/cache";

export async function GET() {
  try {
    const db = await ensureDB();

    // Live workers (active in last 5 minutes)
    const live = await db.prepare(
      `SELECT DISTINCT worker_id, device_type, browser, os,
       MAX(created_at) as last_active
       FROM user_sessions
       WHERE created_at >= datetime('now', '-5 minutes')
       GROUP BY worker_id
       ORDER BY last_active DESC`
    ).bind().all<{ worker_id: string; device_type: string | null; browser: string | null; os: string | null; last_active: string }>();
    const liveWorkers = live.results || [];

    // Today stats
    const todaySessions = await db.prepare(
      "SELECT COUNT(*) as count FROM user_sessions WHERE created_at >= datetime('now', '-24 hours')"
    ).bind().first<{ count: number }>();
    const todayEvents = await db.prepare(
      "SELECT COUNT(*) as count FROM user_events WHERE created_at >= datetime('now', '-24 hours')"
    ).bind().first<{ count: number }>();
    const todayDevices = await db.prepare(
      "SELECT COUNT(DISTINCT worker_id || '-' || COALESCE(device_type, 'unknown')) as count FROM user_sessions WHERE created_at >= datetime('now', '-24 hours')"
    ).bind().first<{ count: number }>();
    const todaySearches = await db.prepare(
      "SELECT COUNT(*) as count FROM user_searches WHERE created_at >= datetime('now', '-24 hours')"
    ).bind().first<{ count: number }>();

    // Segment distribution
    const segments = await db.prepare(
      "SELECT segment, COUNT(*) as count FROM user_behavior_scores GROUP BY segment ORDER BY count DESC"
    ).bind().all<{ segment: string; count: number }>();

    // Top interests (top 10)
    const interests = await db.prepare(
      "SELECT category_scores FROM user_interests WHERE category_scores IS NOT NULL AND category_scores != '{}' LIMIT 500"
    ).bind().all<{ category_scores: string }>();

    const interestAgg: Record<string, { total: number; count: number }> = {};
    for (const row of interests.results || []) {
      try {
        const scores = JSON.parse(row.category_scores) as Record<string, number>;
        for (const [cat, score] of Object.entries(scores)) {
          if (!interestAgg[cat]) interestAgg[cat] = { total: 0, count: 0 };
          interestAgg[cat].total += score;
          interestAgg[cat].count++;
        }
      } catch {}
    }
    const topInterests = Object.entries(interestAgg)
      .map(([cat, data]) => ({ category: cat, avgScore: Math.round(data.total / data.count), workerCount: data.count }))
      .sort((a, b) => b.avgScore - a.avgScore)
      .slice(0, 10);

    // Event breakdown (last 7 days)
    const eventBreakdown = await db.prepare(
      "SELECT event_type, COUNT(*) as count FROM user_events WHERE created_at >= datetime('now', '-7 days') GROUP BY event_type ORDER BY count DESC"
    ).bind().all<{ event_type: string; count: number }>();

    // Recent events (last 20)
    const recentEvents = await db.prepare(
      "SELECT id, worker_id, event_type, page_url, page_category, created_at FROM user_events ORDER BY created_at DESC LIMIT 20"
    ).bind().all<{ id: number; worker_id: string; event_type: string; page_url: string | null; page_category: string | null; created_at: string }>();

    // API health
    const endpoints = ["/api/track/event", "/api/track/session", "/api/track/device", "/api/track/search", "/api/track/score"];
    const apiHealth: { endpoint: string; status: string; lastCheck: string | null }[] = [];
    for (const ep of endpoints) {
      try {
        const lastHit = await db.prepare(
          "SELECT created_at FROM system_logs WHERE route = ? ORDER BY created_at DESC LIMIT 1"
        ).bind(ep).first<{ created_at: string }>();
        apiHealth.push({
          endpoint: ep,
          status: lastHit ? "active" : "no_data",
          lastCheck: lastHit?.created_at || null,
        });
      } catch {
        apiHealth.push({ endpoint: ep, status: "unknown", lastCheck: null });
      }
    }

    return NextResponse.json({
      live: {
        count: liveWorkers.length,
        workers: liveWorkers,
      },
      todayStats: {
        sessions: todaySessions?.count ?? 0,
        events: todayEvents?.count ?? 0,
        devices: todayDevices?.count ?? 0,
        searches: todaySearches?.count ?? 0,
      },
      segments: segments.results || [],
      topInterests,
      eventBreakdown: eventBreakdown.results || [],
      recentEvents: recentEvents.results || [],
      apiHealth,
    });
  } catch (err) {
    console.error("Tracking monitor error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
