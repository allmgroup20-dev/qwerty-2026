import { NextResponse } from "next/server";
import { getAllAgents, getAgentTree, getAgentStats } from "@/lib/ai/agents";

export async function GET() {
  try {
    const agents = await getAllAgents();
    const tree = await getAgentTree();
    const stats = await getAgentStats();
    return NextResponse.json({ agents, tree, stats });
  } catch (e) {
    return NextResponse.json({ error: (e as Error)?.message }, { status: 500 });
  }
}
