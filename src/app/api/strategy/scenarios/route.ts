import { NextRequest, NextResponse } from "next/server"
import { getDB } from "@/lib/db"
import { query, execute } from "@/lib/db/queries"

export async function GET() {
  try {
    const env = await getDB()
    const rows = await query<any>(env, "SELECT * FROM strategy_scenarios ORDER BY updated_at DESC")
    return NextResponse.json({ scenarios: rows })
  } catch {
    return NextResponse.json({ scenarios: [] })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as { name: string; description?: string; canvasScores?: string }
    const { name, description, canvasScores } = body
    const env = await getDB()
    const result = await execute(env,
      "INSERT INTO strategy_scenarios (name, description, canvas_scores) VALUES (?, ?, ?)",
      [name, description ?? "", canvasScores ?? "[]"]
    )
    return NextResponse.json({ success: true, id: (result as any)?.id ?? 0 })
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json() as { id: number; name?: string; description?: string; canvasScores?: string }
    const { id, name, description, canvasScores } = body
    const env = await getDB()
    if (canvasScores) {
      await execute(env, "UPDATE strategy_scenarios SET canvas_scores = ?, updated_at = datetime('now') WHERE id = ?", [canvasScores, id])
    }
    if (name || description !== undefined) {
      await execute(env, "UPDATE strategy_scenarios SET name = COALESCE(?, name), description = COALESCE(?, description), updated_at = datetime('now') WHERE id = ?",
        [name ?? null, description ?? null, id])
    }
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 })
    const env = await getDB()
    await execute(env, "DELETE FROM strategy_scenarios WHERE id = ?", [id])
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
