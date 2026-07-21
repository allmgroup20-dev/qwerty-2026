import { NextResponse } from "next/server"
import { getDB } from "@/lib/db"
import { query } from "@/lib/db/queries"

export async function GET() {
  try {
    const env = await getDB()
    const [canvas, errc, knowledge, settings] = await Promise.all([
      query<any>(env, "SELECT * FROM strategy_canvas WHERE is_active = 1 ORDER BY sort_order ASC"),
      query<any>(env, "SELECT * FROM errc_saved ORDER BY quadrant ASC"),
      query<any>(env, "SELECT knowledge_title, knowledge_content FROM ai_knowledge_distribution WHERE origin = 'blue_ocean' ORDER BY knowledge_category"),
      query<any>(env, "SELECT setting_key, setting_value FROM company_settings WHERE setting_key LIKE 'strategy_%'"),
    ])
    const avgOur = canvas.length > 0 ? (canvas.reduce((s: number, r: any) => s + r.our_score, 0) / canvas.length).toFixed(1) : "0"
    const avgComp = canvas.length > 0 ? (canvas.reduce((s: number, r: any) => s + (r.competitor_score ?? 0), 0) / canvas.length).toFixed(1) : "0"
    const totalSettings: Record<string, string> = {}
    for (const s of settings) totalSettings[s.setting_key] = s.setting_value

    const sections = [
      { title: "Strategy Canvas Summary", lines: [`Factors: ${canvas.length}`, `Avg Our Score: ${avgOur}/10`, `Avg Competitor Score: ${avgComp}/10`, `Blueprint Gap: ${(parseFloat(avgOur) - parseFloat(avgComp)).toFixed(1)} points`] },
      { title: `ERRC Grid (${errc.length} quadrants)`, lines: errc.map((r: any) => `${r.quadrant.toUpperCase()}: ${r.content}`) },
      { title: `Blue Ocean Knowledge (${knowledge.length} entries)`, lines: knowledge.map((r: any) => `${r.knowledge_title}: ${r.knowledge_content.slice(0, 120)}...`) },
    ]
    if (canvas.length > 0) {
      const topFactors = canvas.filter((r: any) => r.our_score >= 8).map((r: any) => `${r.factor_name} (${r.our_score})`)
      const weakFactors = canvas.filter((r: any) => r.our_score < 6).map((r: any) => `${r.factor_name} (${r.our_score})`)
      if (topFactors.length > 0) sections.push({ title: "Top Performing Factors", lines: topFactors })
      if (weakFactors.length > 0) sections.push({ title: "Factors Needing Improvement", lines: weakFactors })
    }

    return NextResponse.json({
      generatedAt: new Date().toISOString(),
      sections,
      settings: totalSettings,
    })
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
