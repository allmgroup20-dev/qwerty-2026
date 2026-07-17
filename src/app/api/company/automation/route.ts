import { NextRequest, NextResponse } from "next/server";
import { query, execute, queryFirst } from "@/lib/db/queries";
import { getDB } from "@/lib/db";

export async function GET() {
  try {
    const db = await getDB();

    const pendingTriggers = await query<any>(
      db,
      `SELECT w.worker_id, w.name, w.phone, ube.churn_probability, ube.segment,
              (SELECT MAX(created_at) FROM user_events WHERE worker_id = w.worker_id) as last_activity,
              (SELECT COUNT(*) FROM user_events WHERE worker_id = w.worker_id AND event_type = 'product_view') as product_views,
              (SELECT COUNT(*) FROM orders WHERE worker_id = w.worker_id AND payment_status = 'completed') as total_orders,
              (SELECT MAX(created_at) FROM orders WHERE worker_id = w.worker_id) as last_purchase
       FROM workers w
       LEFT JOIN user_behavior_scores ube ON ube.worker_id = w.worker_id
       WHERE w.membership_status = 'active'
       ORDER BY last_activity DESC
       LIMIT 100`
    );

    const now = Date.now();
    const triggers: any[] = [];
    const workers = pendingTriggers as any[] || [];

    for (const w of workers) {
      const lastAct = w.last_activity ? new Date(w.last_activity).getTime() : 0;
      const daysSinceActivity = (now - lastAct) / 86400000;
      const lastPurchase = w.last_purchase ? new Date(w.last_purchase).getTime() : 0;
      const daysSincePurchase = (now - lastPurchase) / 86400000;

      // Browse abandon (has product views but no orders)
      if ((w.product_views || 0) >= 3 && (w.total_orders || 0) === 0) {
        triggers.push({
          workerId: w.worker_id, name: w.name, phone: w.phone, trigger: "browse_abandon",
          detail: `${w.product_views} product views, no purchase`, segment: w.segment,
        });
      }

      // Inactive 14 days
      if (daysSinceActivity > 14 && daysSinceActivity <= 30) {
        triggers.push({
          workerId: w.worker_id, name: w.name, phone: w.phone, trigger: "inactive_14d",
          detail: `${Math.round(daysSinceActivity)} days since last activity`, segment: w.segment,
        });
      }

      // Inactive 30+ days (at risk)
      if (daysSinceActivity > 30) {
        triggers.push({
          workerId: w.worker_id, name: w.name, phone: w.phone, trigger: "inactive_30d",
          detail: `${Math.round(daysSinceActivity)} days inactive`, segment: w.segment,
        });
      }

      // Churn risk
      if ((w.churn_probability || 0) >= 50) {
        triggers.push({
          workerId: w.worker_id, name: w.name, phone: w.phone, trigger: "churn_risk",
          detail: `Churn probability: ${w.churn_probability}%`, segment: w.segment,
        });
      }
    }

    return NextResponse.json({
      total: triggers.length,
      triggers: triggers.slice(0, 50),
      byType: {
        browse_abandon: triggers.filter(t => t.trigger === "browse_abandon").length,
        inactive_14d: triggers.filter(t => t.trigger === "inactive_14d").length,
        inactive_30d: triggers.filter(t => t.trigger === "inactive_30d").length,
        churn_risk: triggers.filter(t => t.trigger === "churn_risk").length,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
