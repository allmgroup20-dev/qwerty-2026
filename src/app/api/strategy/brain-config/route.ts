import { NextRequest, NextResponse } from "next/server"
import { getDB } from "@/lib/db"
import { query, execute } from "@/lib/db/queries"
import { loadStrategyContext } from "@/lib/ai/brain/strategy-context"

export async function GET() {
  try {
    const env = await getDB()
    const settings = await query<any>(env, "SELECT setting_key, setting_value FROM company_settings WHERE setting_key LIKE 'strategy_brain_%'")
    const strCtx = await loadStrategyContext()
    const settingsMap: Record<string, string> = {}
    for (const s of settings) settingsMap[s.setting_key] = s.setting_value
    return NextResponse.json({
      enabled: settingsMap["strategy_brain_enabled"] !== "0",
      injectCanvas: settingsMap["strategy_brain_inject_canvas"] !== "0",
      injectERRC: settingsMap["strategy_brain_inject_errc"] !== "0",
      injectKnowledge: settingsMap["strategy_brain_inject_knowledge"] !== "0",
      strategy: {
        canvasCount: strCtx.canvas.length,
        errcCount: strCtx.errc.length,
        knowledgeCount: strCtx.blueOceanKnowledge.length,
        summary: strCtx.summary,
      },
    })
  } catch {
    return NextResponse.json({
      enabled: true, injectCanvas: true, injectERRC: true, injectKnowledge: true,
      strategy: { canvasCount: 0, errcCount: 0, knowledgeCount: 0, summary: "" },
    })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as { enabled?: boolean; injectCanvas?: boolean; injectERRC?: boolean; injectKnowledge?: boolean }
    const env = await getDB()
    for (const [key, val] of Object.entries(body)) {
      const sk = `strategy_brain_${key}`
      await execute(env, "DELETE FROM company_settings WHERE setting_key = ?", [sk])
      await execute(env, "INSERT INTO company_settings (setting_key, setting_value, setting_type, updated_at) VALUES (?, ?, 'boolean', datetime('now'))", [sk, val ? "1" : "0"])
    }
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
