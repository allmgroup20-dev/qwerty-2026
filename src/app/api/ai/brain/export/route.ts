import { NextResponse } from "next/server";
import { query } from "@/lib/db/queries";
import { getDB } from "@/lib/db";

export async function GET() {
  try {
    const db = await getDB();

    const [brainUsage, feedback, flows, memory, schedules] = await Promise.all([
      query<Record<string, any>>(db, `SELECT * FROM brain_usage ORDER BY created_at DESC LIMIT 100`),
      query<Record<string, any>>(db, `SELECT * FROM agent_feedback ORDER BY created_at DESC LIMIT 100`),
      query<Record<string, any>>(db, `SELECT * FROM custom_flows ORDER BY created_at DESC`),
      query<Record<string, any>>(db, `SELECT * FROM agent_memory ORDER BY updated_at DESC LIMIT 200`),
      query<Record<string, any>>(db, `SELECT * FROM agent_schedule ORDER BY created_at DESC`),
    ]);

    const report = {
      exported_at: new Date().toISOString(),
      summary: {
        total_requests: brainUsage.length,
        total_feedback: feedback.length,
        total_flows: flows.length,
        total_memory_entries: memory.length,
        total_schedules: schedules.length,
      },
      data: {
        brain_usage: brainUsage,
        feedback,
        flows,
        memory,
        schedules,
      },
    };

    return NextResponse.json(report);
  } catch (error) {
    return NextResponse.json({ error: "Export failed" }, { status: 500 });
  }
}
