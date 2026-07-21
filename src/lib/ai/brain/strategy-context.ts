import { getDB } from "@/lib/db"
import { query } from "@/lib/db/queries"

export interface StrategyContext {
  canvas: { factorName: string; ourScore: number; competitorScore: number | null }[]
  errc: { quadrant: string; content: string }[]
  blueOceanKnowledge: { title: string; content: string }[]
  summary: string
}

export async function loadStrategyContext(): Promise<StrategyContext> {
  try {
    const env = await getDB()
    const [canvasRows, errcRows, knowledgeRows] = await Promise.all([
      query<any>(env, "SELECT factor_name, our_score, competitor_score FROM strategy_canvas WHERE is_active = 1 ORDER BY sort_order ASC"),
      query<any>(env, "SELECT quadrant, content FROM errc_saved ORDER BY quadrant ASC"),
      query<any>(env, "SELECT knowledge_title, knowledge_content FROM ai_knowledge_distribution WHERE origin = 'blue_ocean' AND target_type = 'agent' LIMIT 5"),
    ])
    const canvas = canvasRows.map((r: any) => ({ factorName: r.factor_name, ourScore: r.our_score, competitorScore: r.competitor_score }))
    const errc = errcRows.map((r: any) => ({ quadrant: r.quadrant, content: r.content }))
    const blueOceanKnowledge = knowledgeRows.map((r: any) => ({ title: r.knowledge_title, content: r.knowledge_content }))
    const topGaps = canvas.filter((r: any) => r.ourScore >= 8 && (r.competitorScore ?? 0) < 6).map((r: any) => r.factorName)
    const needsWork = canvas.filter((r: any) => r.ourScore < 6).map((r: any) => r.factorName)
    const parts: string[] = []
    if (topGaps.length > 0) parts.push(`Blue Ocean strengths (we lead): ${topGaps.join(", ")}`)
    if (needsWork.length > 0) parts.push(`Areas needing improvement: ${needsWork.join(", ")}`)
    if (errc.length > 0) {
      const elim = errc.find((r: any) => r.quadrant === "eliminate")?.content
      const create = errc.find((r: any) => r.quadrant === "create")?.content
      if (elim) parts.push(`What we eliminate: ${elim}`)
      if (create) parts.push(`What we create (unique value): ${create}`)
    }
    return { canvas, errc, blueOceanKnowledge, summary: parts.join(". ") || "No strategy data configured yet." }
  } catch {
    return { canvas: [], errc: [], blueOceanKnowledge: [], summary: "No strategy data available." }
  }
}
