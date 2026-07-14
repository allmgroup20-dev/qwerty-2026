import { NextResponse } from "next/server";
import { getAgentStats } from "@/lib/ai/agents";

export async function GET() {
  try {
    const stats = await getAgentStats();
    return NextResponse.json(stats);
  } catch (e) {
    return NextResponse.json({ error: (e as Error)?.message }, { status: 500 });
  }
}
