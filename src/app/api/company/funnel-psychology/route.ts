import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import { query, queryFirst } from "@/lib/db/queries";

export async function GET() {
  try {
    const db = await getDB();

    const funnel = await queryFirst<Record<string, number>>(db, `SELECT
      SUM(CASE WHEN event_type = 'page_view' THEN 1 ELSE 0 END) as visits,
      SUM(CASE WHEN event_type IN ('search', 'product_view') THEN 1 ELSE 0 END) as interest,
      SUM(CASE WHEN event_type = 'product_view' THEN 1 ELSE 0 END) as product_views,
      SUM(CASE WHEN event_type = 'add_to_cart' THEN 1 ELSE 0 END) as add_to_cart
    FROM user_events`);

    const psych = await queryFirst<Record<string, number>>(db, `SELECT
      ROUND(AVG(CASE WHEN trust_score IS NOT NULL THEN trust_score END), 1) as avg_trust,
      ROUND(AVG(CASE WHEN control_sensitivity = 'high' THEN 1.0 END), 3) as high_control_pct,
      ROUND(AVG(CASE WHEN manipulation_risk = 'high' THEN 1.0 END), 3) as high_manip_pct,
      COUNT(*) as total
    FROM ai_phone_profiles`);

    const fearDist = await queryFirst<Record<string, number>>(db, `SELECT
      SUM(CASE WHEN trust_score >= 7 THEN 1 ELSE 0 END) as trusting,
      SUM(CASE WHEN trust_score >= 4 AND trust_score < 7 THEN 1 ELSE 0 END) as neutral,
      SUM(CASE WHEN trust_score < 4 AND trust_score IS NOT NULL THEN 1 ELSE 0 END) as defensive
    FROM ai_phone_profiles`);

    const atRisk = await query<{
      phone: string; trust_score: number; control_sensitivity: string;
      manipulation_risk: string; pain_points: string;
    }>(db, `SELECT phone, trust_score, control_sensitivity, manipulation_risk, pain_points
      FROM ai_phone_profiles
      WHERE trust_score IS NOT NULL AND trust_score < 4
      ORDER BY trust_score ASC LIMIT 10`);

    const commStyleDist = await queryFirst<Record<string, number>>(db, `SELECT
      SUM(CASE WHEN communication_style IS NOT NULL AND communication_style != '' THEN 1 ELSE 0 END) as tracked,
      SUM(CASE WHEN communication_style = 'emotional' THEN 1 ELSE 0 END) as emotional,
      SUM(CASE WHEN communication_style = 'analytical' THEN 1 ELSE 0 END) as analytical,
      SUM(CASE WHEN communication_style = 'direct' THEN 1 ELSE 0 END) as direct,
      SUM(CASE WHEN communication_style = 'warm' THEN 1 ELSE 0 END) as warm
    FROM ai_phone_profiles`);

    const f = funnel || { visits: 0, interest: 0, product_views: 0, add_to_cart: 0 };
    const counts = [f.visits, f.interest, f.product_views, f.add_to_cart];

    const TECHNIQUES: Record<string, { en: string; bn: string }> = {
      visit: { en: "Golden Rule — Build trust first. No offers. Listen and understand their world.", bn: "গোল্ডেন রুল — প্রথমে বিশ্বাস তৈরি করুন। কোনো অফার নয়। তার জগত শুনুন ও বুঝুন।" },
      interest: { en: "Give First — Provide free value. Tips, insights, encouragement before any ask.", bn: "গিভ ফার্স্ট — বিনামূল্যে মূল্য দিন। কোনো অনুরোধের আগে টিপস, অন্তর্দৃষ্টি ও উৎসাহ দিন।" },
      product_view: { en: "Speak Their Language — Frame products in their context. Show transformation, not features.", bn: "স্পিক দেয়ার ল্যাঙ্গুয়েজ — পণ্যটি তাদের প্রেক্ষাপটে ফ্রেম করুন। ফিচার নয়, পরিবর্তন দেখান।" },
      add_to_cart: { en: "Law of Value + We Together — Show value first. 'We'll find the best solution together.'", bn: "ল অফ ভ্যালু + উই টুগেদার — আগে মূল্য দেখান। 'আমরা একসাথে সেরা সমাধান খুঁজব।'" },
    };

    const funnelStages = [
      { stage: "visit", label: "Visit", labelBn: "ভিজিট", users: counts[0], color: "#3b82f6" },
      { stage: "interest", label: "Interest", labelBn: "আগ্রহ", users: counts[1], color: "#8b5cf6" },
      { stage: "product_view", label: "Product View", labelBn: "পণ্য দেখা", users: counts[2], color: "#f59e0b" },
      { stage: "add_to_cart", label: "Add to Cart", labelBn: "কার্টে যোগ", users: counts[3], color: "#f97316" },
    ].map((s, i) => ({
      ...s,
      dropOff: i > 0 ? counts[i - 1] - counts[i] : 0,
      conversionRate: i === 0 ? 100 : (counts[i - 1] > 0 ? Math.round((counts[i] / counts[i - 1]) * 100) : 0),
      persuasionTechnique: TECHNIQUES[s.stage] || { en: "", bn: "" },
    }));

    const p = psych || { avg_trust: 0, high_control_pct: 0, high_manip_pct: 0, total: 0 };

    return NextResponse.json({
      success: true,
      data: {
        funnelStages,
        psychology: {
          totalProfiles: p.total,
          averageTrust: p.avg_trust,
          highControlPercent: Math.round((p.high_control_pct || 0) * 100),
          highManipulationPercent: Math.round((p.high_manip_pct || 0) * 100),
          trustDistribution: fearDist || { trusting: 0, neutral: 0, defensive: 0 },
        },
        atRiskProfiles: atRisk || [],
        commStyleDistribution: commStyleDist || { tracked: 0, emotional: 0, analytical: 0, direct: 0, warm: 0 },
      },
    });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Failed to fetch" }, { status: 500 });
  }
}
