import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import { query, execute } from "@/lib/db/queries";

export async function GET(request: NextRequest) {
  try {
    const db = await getDB();
    const { searchParams } = new URL(request.url);
    const view = searchParams.get("view") || "list";
    const category = searchParams.get("category") || undefined;
    const sourceType = searchParams.get("source_type") || undefined;

    if (view === "summary") {
      const byCategory = await query<{ knowledge_category: string; count: number }>(db,
        "SELECT knowledge_category, COUNT(*) as count FROM ai_knowledge_distribution GROUP BY knowledge_category ORDER BY count DESC");
      const totalArr = await query<{ total: number }>(db, "SELECT COUNT(*) as total FROM ai_knowledge_distribution");
      const bySource = await query<{ source_name: string; count: number }>(db,
        "SELECT source_name, COUNT(*) as count FROM ai_knowledge_distribution WHERE source_name IS NOT NULL AND source_name != '' GROUP BY source_name ORDER BY count DESC");

      return NextResponse.json({
        success: true,
        summary: { total: totalArr[0]?.total || 0, byCategory: byCategory || [], bySource: bySource || [] },
      });
    }

    let sql = "SELECT * FROM ai_knowledge_distribution WHERE 1=1";
    const params: string[] = [];

    if (category) { sql += " AND knowledge_category = ?"; params.push(category); }
    if (sourceType) { sql += " AND source_type = ?"; params.push(sourceType); }
    sql += " ORDER BY created_at DESC LIMIT 100";

    const entries = await query<any>(db, sql, params.length ? params : undefined);

    return NextResponse.json({ success: true, entries: entries || [] });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Failed to fetch" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const db = await getDB();
    const body = await request.json() as {
      sourceType?: string;
      sourceId?: string;
      sourceName?: string;
      targetType?: string;
      targetId?: string;
      targetName?: string;
      knowledgeTitle: string;
      knowledgeContent: string;
      knowledgeCategory?: string;
      origin?: string;
      confidence?: number;
    };

    if (!body.knowledgeTitle || !body.knowledgeContent) {
      return NextResponse.json({ error: "Missing required fields: knowledgeTitle, knowledgeContent" }, { status: 400 });
    }

    await execute(db,
      `INSERT INTO ai_knowledge_distribution (source_type, source_id, source_name, target_type, target_id, target_name, knowledge_title, knowledge_content, knowledge_category, origin, confidence, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))`,
      [
        body.sourceType || "training",
        body.sourceId || "manual",
        body.sourceName || null,
        body.targetType || "agent",
        body.targetId || "all",
        body.targetName || null,
        body.knowledgeTitle,
        body.knowledgeContent,
        body.knowledgeCategory || "general",
        body.origin || "manual",
        body.confidence ?? 1.0,
      ]
    );

    return NextResponse.json({ success: true, message: "Training module created" });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Failed to create" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const db = await getDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing id parameter" }, { status: 400 });
    }

    await execute(db, "DELETE FROM ai_knowledge_distribution WHERE id = ?", [id]);
    return NextResponse.json({ success: true, message: "Training module deleted" });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Failed to delete" }, { status: 500 });
  }
}
