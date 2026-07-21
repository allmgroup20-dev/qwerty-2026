import { NextRequest, NextResponse } from "next/server"
import { getDB } from "@/lib/db"
import { query } from "@/lib/db/queries"

const STEPS = [
  { id: 1, key: "buyer_utility", nameEn: "Buyer Utility", nameBn: "ক্রেতার উপযোগিতা", emoji: "💡",
    descEn: "Does the offering unlock extraordinary utility? Is there a compelling reason for customers to buy?",
    descBn: "অফার কি অসাধারণ উপযোগিতা আনলক করে? গ্রাহকদের কেনার জন্য কি বাধ্যতামূলক কারণ আছে?",
    checklist: ["Is the customer experience dramatically better?", "Does it solve a real pain point?", "Is the utility easy to understand?", "Does it pass the 'wow' test?"],
    successCriteria: "Clear YES on all 4 questions. If not, go back to value innovation." },
  { id: 2, key: "price", nameEn: "Price", nameBn: "মূল্য", emoji: "💎",
    descEn: "Is the price easily accessible to the mass of target buyers? Use Price Corridor of the Mass.",
    descBn: "দাম কি লক্ষ্য ক্রেতাদের জন্য সহজে অ্যাক্সেসযোগ্য? Price Corridor of the Mass ব্যবহার করুন।",
    checklist: ["Is the price within the mass corridor?", "Is it irresistible to target buyers?", "Does the price reflect value, not cost?", "Can we communicate the price clearly?"],
    successCriteria: "Price sits within corridor and passes 3 reference point check." },
  { id: 3, key: "cost", nameEn: "Cost", nameBn: "খরচ", emoji: "📊",
    descEn: "Can we deliver at this price and still profit? Use target costing — set cost structure to meet the price.",
    descBn: "আমরা কি এই দামে সরবরাহ করতে এবং এখনও লাভ করতে পারি? টার্গেট কস্টিং ব্যবহার করুন।",
    checklist: ["Can we hit target cost within 6 months?", "Is the margin 30%+?", "Are there partnership opportunities to reduce cost?", "Does the cost model scale?"],
    successCriteria: "Target cost achieved with minimum 30% margin. Scalable." },
  { id: 4, key: "adoption", nameEn: "Adoption", nameBn: "গ্রহণ", emoji: "🤝",
    descEn: "Are there adoption barriers? Partners, channels, education, trust — overcome them in order.",
    descBn: "গ্রহণের ক্ষেত্রে কি বাধা আছে? অংশীদার, চ্যানেল, শিক্ষা, বিশ্বাস — ক্রমানুসারে সেগুলো কাটিয়ে উঠুন।",
    checklist: ["Are partners aligned?", "Are distribution channels ready?", "Is customer education needed?", "Are there trust or cultural barriers?"],
    successCriteria: "Adoption barriers identified and addressed. Partners and channels ready." },
]

export async function GET() {
  try {
    const env = await getDB()
    const saved = await query<any>(env, "SELECT * FROM ai_knowledge_distribution WHERE source_id = 'blue_ocean_strategy' AND knowledge_title LIKE '%Strategic Sequencing%' LIMIT 1")
    return NextResponse.json({
      steps: STEPS,
      knowledge: saved.length > 0 ? { title: saved[0].knowledge_title, content: saved[0].knowledge_content } : null,
    })
  } catch {
    return NextResponse.json({ steps: STEPS, knowledge: null })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as { offering: string; stepId?: number }
    const { offering, stepId } = body
    const stepsToAnalyze = stepId ? STEPS.filter((s) => s.id === stepId) : STEPS
    return NextResponse.json({
      query: { offering, stepId },
      analysis: stepsToAnalyze.map((s) => ({
        step: s,
        prompt: `Validate "${offering}" through Strategic Sequencing Step ${s.id}: ${s.nameEn}. ${s.descEn} Checklist:\n${s.checklist.map((c) => `☐ ${c}`).join("\n")}\nSuccess criteria: ${s.successCriteria}`,
      })),
      order: stepId
        ? `Skipping earlier steps. Warning: must validate steps before ${stepId} first.`
        : "Validate in order: 1→2→3→4. Only proceed when each step is confirmed.",
    })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
