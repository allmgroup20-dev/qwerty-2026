import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import { query, queryFirst, execute } from "@/lib/db/queries";

export async function GET(request: NextRequest) {
  try {
    const db = await getDB();
    const { searchParams } = new URL(request.url);
    const action = searchParams.get("action") || "list";
    const phone = searchParams.get("phone");

    if (action === "list") {
      const employees = await query<{
        phone: string; employee_name: string;
        avg_trust: number; avg_listening: number;
        avg_value: number; avg_resistance: number;
        total_records: number; last_recorded: string;
      }>(
        db,
        `SELECT
          phone, MAX(employee_name) as employee_name,
          ROUND(AVG(CASE WHEN metric_type = 'trust_building' THEN score ELSE NULL END), 2) as avg_trust,
          ROUND(AVG(CASE WHEN metric_type = 'listening_quality' THEN score ELSE NULL END), 2) as avg_listening,
          ROUND(AVG(CASE WHEN metric_type = 'value_delivery' THEN score ELSE NULL END), 2) as avg_value,
          ROUND(AVG(CASE WHEN metric_type = 'resistance_handling' THEN score ELSE NULL END), 2) as avg_resistance,
          COUNT(*) as total_records,
          MAX(recorded_at) as last_recorded
        FROM employee_persuasion_scores
        GROUP BY phone
        ORDER BY last_recorded DESC
        LIMIT 100`
      );
      return NextResponse.json({ employees });
    }

    if (action === "detail" && phone) {
      const scores = await query<{
        metric_type: string; score: number; recorded_at: string; notes: string; recorded_by: string;
      }>(
        db,
        "SELECT metric_type, score, recorded_at, notes, recorded_by FROM employee_persuasion_scores WHERE phone = ? ORDER BY recorded_at DESC LIMIT 50",
        [phone]
      );
      const profile = await queryFirst<{ employee_name: string }>(
        db,
        "SELECT employee_name FROM employee_persuasion_scores WHERE phone = ? LIMIT 1",
        [phone]
      );
      return NextResponse.json({ scores, employeeName: profile?.employee_name || "" });
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : "Failed to load data",
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as {
      action: string;
      phone: string;
      employeeName?: string;
      metricType: string;
      score: number;
      recordedBy?: string;
      notes?: string;
    };
    const db = await getDB();

    if (body.action === "record") {
      if (!body.phone || !body.metricType || body.score === undefined) {
        return NextResponse.json({ error: "phone, metricType, score required" }, { status: 400 });
      }
      if (!["trust_building", "listening_quality", "value_delivery", "resistance_handling"].includes(body.metricType)) {
        return NextResponse.json({ error: "Invalid metricType" }, { status: 400 });
      }
      await execute(
        db,
        `INSERT INTO employee_persuasion_scores (phone, employee_name, metric_type, score, recorded_by, notes, recorded_at)
         VALUES (?, ?, ?, ?, ?, ?, datetime('now'))`,
        [body.phone, body.employeeName || "", body.metricType, String(body.score), body.recordedBy || "", body.notes || ""]
      );
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : "Action failed",
    }, { status: 500 });
  }
}
