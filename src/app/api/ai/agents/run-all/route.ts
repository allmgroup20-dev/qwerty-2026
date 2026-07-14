import { NextResponse } from "next/server";
import { runAllAgents } from "@/lib/ai/agents";

export async function POST() {
  try {
    const result = await runAllAgents();
    return NextResponse.json(result);
  } catch (e) {
    return NextResponse.json({ error: (e as Error)?.message }, { status: 500 });
  }
}
