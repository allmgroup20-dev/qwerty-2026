import { NextRequest, NextResponse } from "next/server";
import { getSegmentStats, sendToSegment, automatedReEngagement, scheduleAutomatedCampaigns } from "@/lib/tracking/marketing";

export async function GET() {
  try {
    const stats = await getSegmentStats();
    return NextResponse.json({ segments: stats });
  } catch (err) {
    console.error("Marketing stats error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as {
      action: "send_to_segment" | "re_engagement" | "auto_campaigns";
      segment?: string;
      message?: string;
      campaignId?: string;
      limit?: number;
      lang?: "en" | "bn";
    };

    switch (body.action) {
      case "send_to_segment": {
        if (!body.segment || !body.message) {
          return NextResponse.json({ error: "segment and message required" }, { status: 400 });
        }
        const result = await sendToSegment(body.segment, body.message, {
          campaignId: body.campaignId,
          limit: body.limit,
        });
        return NextResponse.json(result);
      }

      case "re_engagement": {
        const segment = body.segment === "churned" ? "churned" : "at_risk";
        const result = await automatedReEngagement(segment, body.lang || "bn");
        return NextResponse.json(result);
      }

      case "auto_campaigns": {
        const result = await scheduleAutomatedCampaigns();
        return NextResponse.json(result);
      }

      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }
  } catch (err) {
    console.error("Marketing action error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
