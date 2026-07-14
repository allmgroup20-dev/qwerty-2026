import { NextRequest, NextResponse } from "next/server";
import { runAgent } from "@/lib/ai/agents/executor";
import { synthesizeDomain } from "@/lib/ai/agents/synthesizer";
import { synthesizeSenior } from "@/lib/ai/agents/synthesizer";
import { getAgent } from "@/lib/ai/agents";

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const agent = await getAgent(id);
    if (!agent) return NextResponse.json({ error: "Agent not found" }, { status: 404 });

    let result;
    if (agent.level === 1) {
      result = await runAgent(id);
    } else if (agent.level === 2) {
      result = await synthesizeDomain(id);
    } else if (agent.level === 3) {
      result = await synthesizeSenior();
    } else {
      return NextResponse.json({ error: "Unknown agent level" }, { status: 400 });
    }

    return NextResponse.json(result);
  } catch (e) {
    return NextResponse.json({ error: (e as Error)?.message }, { status: 500 });
  }
}
