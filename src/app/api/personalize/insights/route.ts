import { NextRequest, NextResponse } from "next/server";
import { getPersonalizedInsights } from "@/lib/recommendations/personalizer";

export async function GET(request: NextRequest) {
  try {
    const workerId = request.nextUrl.searchParams.get("workerId");
    if (!workerId) {
      return NextResponse.json({ error: "workerId query parameter is required" }, { status: 400 });
    }

    const insights = await getPersonalizedInsights(workerId);
    return NextResponse.json({ insights });
  } catch (err) {
    console.error("Personalized insights error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
