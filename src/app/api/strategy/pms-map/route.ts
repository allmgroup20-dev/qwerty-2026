import { NextRequest, NextResponse } from "next/server"
import { getDB } from "@/lib/db"
import { query } from "@/lib/db/queries"

export async function GET() {
  try {
    const env = await getDB()
    const saved = await query<any>(env, "SELECT * FROM ai_knowledge_distribution WHERE source_id = 'blue_ocean_strategy' AND (knowledge_title LIKE '%PMS Map%' OR knowledge_title LIKE '%Pioneer-Migrator%') LIMIT 1")
    return NextResponse.json({
      tiers: [
        { key: "settler", name: "Settlers", nameBn: "সেটলার", color: "#ef4444", targetPct: 20, emoji: "🏘️",
          desc: "Me-too offerings that compete on price in red oceans. Minimize investment; consider phasing out.",
          descBn: "মি-টু অফার যা রেড ওশানে দামে প্রতিযোগিতা করে। বিনিয়োগ ন্যূনতম করুন; পর্যায়ক্রমে বাদ দেওয়ার কথা বিবেচনা করুন।" },
        { key: "migrator", name: "Migrators", nameBn: "মাইগ্রেটর", color: "#f59e0b", targetPct: 60, emoji: "🚀",
          desc: "Better than average but not truly unique. Invest to upgrade to pioneer status.",
          descBn: "গড়ের চেয়ে ভালো কিন্তু সত্যিই অনন্য নয়। পাইওনিয়ার স্ট্যাটাসে আপগ্রেড করতে বিনিয়োগ করুন।" },
        { key: "pioneer", name: "Pioneers", nameBn: "পাইওনিয়ার", color: "#10b981", targetPct: 20, emoji: "🌟",
          desc: "Unprecedented value creating blue oceans. Invest heavily, protect fiercely, scale globally.",
          descBn: "অভূতপূর্ব মান যা ব্লু ওশান তৈরি করে। ভারী বিনিয়োগ করুন, কঠোরভাবে রক্ষা করুন, বিশ্বব্যাপী স্কেল করুন।" },
      ],
      offers: [
        { name: "Free Membership", category: "settler", investment: "Low", action: "Minimize — auto-upgrade path to migrator" },
        { name: "Active Earner", category: "migrator", investment: "Medium", action: "Invest to upgrade — add coaching & bonuses" },
        { name: "Premium Member", category: "pioneer", investment: "High", action: "Protect & scale — our blue ocean offering" },
        { name: "Team Leader", category: "migrator", investment: "Medium", action: "Invest to upgrade — add leadership tools" },
        { name: "Global Partner", category: "pioneer", investment: "High", action: "Protect & scale — next-gen blue ocean" },
      ],
      knowledge: saved.length > 0 ? { title: saved[0].knowledge_title, content: saved[0].knowledge_content } : null,
    })
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as { offerName: string; category: string }
    const { offerName, category } = body
    return NextResponse.json({
      recommendation: category === "settler"
        ? "Minimize investment. Consider phasing out or creating an auto-upgrade path."
        : category === "migrator"
          ? "Invest to upgrade to pioneer. Focus on differentiation and unique value."
          : "Protect and scale. This is your blue ocean. Invest heavily and defend fiercely.",
    })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
