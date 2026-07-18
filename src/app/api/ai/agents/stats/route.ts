import { NextResponse } from "next/server";
import { getAgentStats } from "@/lib/ai/agents";
import { getCached, setCached } from "@/lib/cache";

export async function GET() {
  try {
    const cached = await getCached<any>("ai:agents:stats", 60);
    if (cached) {
      const resp = NextResponse.json(cached);
      resp.headers.set("Cache-Control", "public, s-maxage=30, stale-while-revalidate=120");
      return resp;
    }

    const stats = await getAgentStats();
    await setCached("ai:agents:stats", stats);
    const resp = NextResponse.json(stats);
    resp.headers.set("Cache-Control", "public, s-maxage=30, stale-while-revalidate=120");
    return resp;
  } catch (e) {
    return NextResponse.json({ error: (e as Error)?.message }, { status: 500 });
  }
}
