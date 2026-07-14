import { NextRequest, NextResponse } from "next/server";
import { getAllSubmissions, getAgentSubmissions, createSubmission } from "@/lib/ai/agents";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const agentId = url.searchParams.get("agent_id");
    const direction = url.searchParams.get("direction") as "from" | "to" | null;

    if (agentId && direction) {
      const submissions = await getAgentSubmissions(agentId, direction);
      return NextResponse.json({ submissions });
    }
    const submissions = await getAllSubmissions();
    return NextResponse.json({ submissions });
  } catch (e) {
    return NextResponse.json({ error: (e as Error)?.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as { from_agent_id?: string; to_agent_id?: string; submission_type?: string; title_bn?: string; content?: string };
    const { from_agent_id, to_agent_id, submission_type, title_bn, content } = body;
    if (!from_agent_id || !to_agent_id) {
      return NextResponse.json({ error: "from_agent_id and to_agent_id required" }, { status: 400 });
    }
    const id = await createSubmission(from_agent_id, to_agent_id, submission_type || "research", title_bn || "", content || "");
    return NextResponse.json({ success: true, id });
  } catch (e) {
    return NextResponse.json({ error: (e as Error)?.message }, { status: 500 });
  }
}
