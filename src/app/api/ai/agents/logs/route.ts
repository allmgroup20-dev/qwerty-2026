import { NextRequest, NextResponse } from "next/server";
import { getActivityLogs, getAgentActivityLogs } from "@/lib/ai/agents";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const agentId = url.searchParams.get("agent_id");
    const limit = parseInt(url.searchParams.get("limit") || "100");

    if (agentId) {
      const logs = await getAgentActivityLogs(agentId, limit);
      return NextResponse.json({ logs });
    }
    const logs = await getActivityLogs(limit);
    return NextResponse.json({ logs });
  } catch (e) {
    return NextResponse.json({ error: (e as Error)?.message }, { status: 500 });
  }
}
