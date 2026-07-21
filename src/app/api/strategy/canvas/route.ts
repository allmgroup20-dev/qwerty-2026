import { NextRequest, NextResponse } from "next/server"
import { getDB } from "@/lib/db"
import { query, execute } from "@/lib/db/queries"

export async function GET() {
  try {
    const rows = await query<any>(await getDB(),
      "SELECT * FROM strategy_canvas WHERE is_active = 1 ORDER BY sort_order ASC"
    )
    return NextResponse.json({ factors: rows })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as { factorName: string; factorNameBn?: string; ourScore?: number; competitorScore?: number; competitorName?: string; category?: string; sortOrder?: number }
    const { factorName, factorNameBn, ourScore, competitorScore, competitorName, category, sortOrder } = body
    const env = await getDB()
    const result = await execute(env,
      "INSERT INTO strategy_canvas (factor_name, factor_name_bn, our_score, competitor_score, competitor_name, category, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [factorName, factorNameBn ?? null, ourScore ?? 5, competitorScore ?? 5, competitorName ?? "Competitor", category ?? "core", sortOrder ?? 0]
    )
    return NextResponse.json({ success: true, id: (result as any)?.id ?? 0 })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json() as { id: number; factorName: string; factorNameBn?: string; ourScore?: number; competitorScore?: number; competitorName?: string; category?: string; sortOrder?: number; isActive?: number }
    const { id, factorName, factorNameBn, ourScore, competitorScore, competitorName, category, sortOrder, isActive } = body
    const env = await getDB()
    const old = await query<any>(env, "SELECT our_score, factor_name FROM strategy_canvas WHERE id = ?", [id])
    const oldScore = old.length > 0 ? old[0].our_score : null
    await execute(env,
      `UPDATE strategy_canvas SET factor_name = ?, factor_name_bn = ?, our_score = ?, competitor_score = ?, competitor_name = ?, category = ?, sort_order = ?, is_active = ?, updated_at = datetime('now') WHERE id = ?`,
      [factorName, factorNameBn, ourScore, competitorScore, competitorName, category, sortOrder, isActive ?? 1, id]
    )
    if (ourScore != null && oldScore != null && ourScore !== oldScore) {
      execute(env, "INSERT INTO canvas_history (factor_name, old_score, new_score) VALUES (?, ?, ?)", [factorName, oldScore, ourScore]).catch(() => {})
    }
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 })
    const env = await getDB()
    await execute(env, "DELETE FROM strategy_canvas WHERE id = ?", [id])
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
