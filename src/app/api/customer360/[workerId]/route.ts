import { NextRequest, NextResponse } from "next/server";
import { ensureDB } from "@/lib/db";

export async function GET(req: NextRequest, { params }: { params: Promise<{ workerId: string }> }) {
  try {
    const { workerId } = await params;
    if (!workerId) return NextResponse.json({ error: "workerId required" }, { status: 400 });

    const db = await ensureDB();

    const [worker, interests, behavior, sessions, events, searches, orders, devices, reviews, comms, attributions] = await Promise.all([
      db.prepare("SELECT * FROM workers WHERE worker_id = ?").bind(workerId).first() as Promise<any>,
      db.prepare("SELECT category_scores, top_categories, last_calculated_at FROM user_interests WHERE worker_id = ?").bind(workerId).first() as Promise<any>,
      db.prepare("SELECT * FROM user_behavior_scores WHERE worker_id = ?").bind(workerId).first() as Promise<any>,
      db.prepare("SELECT * FROM user_sessions WHERE worker_id = ? ORDER BY created_at DESC LIMIT 20").bind(workerId).all() as Promise<any>,
      db.prepare("SELECT event_type, page_category, page_url, product_category, created_at FROM user_events WHERE worker_id = ? ORDER BY created_at DESC LIMIT 50").bind(workerId).all() as Promise<any>,
      db.prepare("SELECT search_query, search_type, result_count, created_at FROM user_searches WHERE worker_id = ? ORDER BY created_at DESC LIMIT 20").bind(workerId).all() as Promise<any>,
      db.prepare("SELECT * FROM orders WHERE worker_id = ? ORDER BY created_at DESC LIMIT 20").bind(workerId).all() as Promise<any>,
      db.prepare("SELECT * FROM user_devices WHERE worker_id = ? ORDER BY last_seen_at DESC").bind(workerId).all() as Promise<any>,
      db.prepare("SELECT * FROM product_reviews WHERE worker_id = ? ORDER BY created_at DESC LIMIT 20").bind(workerId).all() as Promise<any>,
      db.prepare("SELECT * FROM communication_history WHERE worker_id = ? ORDER BY created_at DESC LIMIT 50").bind(workerId).all() as Promise<any>,
      db.prepare("SELECT * FROM attribution_log WHERE worker_id = ? ORDER BY created_at DESC").bind(workerId).all() as Promise<any>,
    ]);

    return NextResponse.json({
      worker: worker || null,
      interests: interests ? { categoryScores: JSON.parse(interests.category_scores || "{}"), topCategories: JSON.parse(interests.top_categories || "[]"), lastCalculatedAt: interests.last_calculated_at } : null,
      behavior: behavior || null,
      sessions: (sessions.results || []).slice(0, 20),
      recentEvents: (events.results || []).slice(0, 50),
      searches: (searches.results || []).slice(0, 20),
      orders: (orders.results || []).slice(0, 20),
      devices: (devices.results || []),
      reviews: (reviews.results || []).slice(0, 20),
      communications: (comms.results || []).slice(0, 50),
      attributions: (attributions.results || []),
    });
  } catch (err) {
    console.error("Customer360 error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
