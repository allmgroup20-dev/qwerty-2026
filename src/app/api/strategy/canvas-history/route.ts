import { NextResponse } from "next/server"
import { getDB } from "@/lib/db"
import { query } from "@/lib/db/queries"
import { execute } from "@/lib/db/queries"

export async function GET() {
  try {
    const env = await getDB()
    const rows = await query<any>(env, "SELECT * FROM canvas_history ORDER BY created_at DESC LIMIT 50")
    return NextResponse.json({ history: rows })
  } catch {
    return NextResponse.json({ history: [] })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as { factorName: string; oldScore: number | null; newScore: number; action?: string }
    const { factorName, oldScore, newScore, action } = body
    const env = await getDB()
    await execute(env,
      "INSERT INTO canvas_history (factor_name, old_score, new_score, action) VALUES (?, ?, ?, ?)",
      [factorName, oldScore ?? null, newScore, action ?? "update"]
    )
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ success: false })
  }
}
