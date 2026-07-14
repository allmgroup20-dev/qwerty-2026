import { NextRequest, NextResponse } from "next/server";
import { getAllReports, getAgentReports } from "@/lib/ai/agents";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const agentId = url.searchParams.get("agent_id");

    if (agentId) {
      const reports = await getAgentReports(agentId);
      return NextResponse.json({ reports });
    }
    const reports = await getAllReports();
    return NextResponse.json({ reports });
  } catch (e) {
    return NextResponse.json({ error: (e as Error)?.message }, { status: 500 });
  }
}
