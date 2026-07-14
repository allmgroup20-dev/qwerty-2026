import { NextRequest, NextResponse } from "next/server";
import { getAgent, updateAgentConfig, getLatestReport, getAgentSubmissions, getAgentActivityLogs } from "@/lib/ai/agents";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const agent = await getAgent(id);
    if (!agent) return NextResponse.json({ error: "Agent not found" }, { status: 404 });

    const report = await getLatestReport(id);
    const submissions = await getAgentSubmissions(id, "from");
    const logs = await getAgentActivityLogs(id);

    return NextResponse.json({ agent, latestReport: report, submissions, logs });
  } catch (e) {
    return NextResponse.json({ error: (e as Error)?.message }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const body = await req.json() as Record<string, unknown>;
    await updateAgentConfig(id, body as { model_id?: string; provider?: string; cron_interval?: number; status?: string; last_run_at?: string; next_run_at?: string });

    if (typeof body.status === "string" && ["disabled", "idle", "active", "error"].includes(body.status)) {
      await updateAgentConfig(id, { status: body.status });
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: (e as Error)?.message }, { status: 500 });
  }
}
