import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import { query, execute } from "@/lib/db/queries";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as {
      phone: string;
      technique?: string;
      moduleIds?: number[];
      allBooks?: boolean;
    };
    const db = await getDB();

    if (!body.phone) {
      return NextResponse.json({ error: "phone required" }, { status: 400 });
    }

    if (body.allBooks) {
      const books = await query<{ id: number; knowledge_title: string; knowledge_content: string; source_name: string }>(
        db,
        `SELECT id, knowledge_title, knowledge_content, source_name
         FROM ai_knowledge_distribution
         WHERE origin = 'book'
         ORDER BY source_id`
      );
      let assigned = 0;
      for (const b of books) {
        const exists = await query(db, "SELECT id FROM worker_agent_knowledge WHERE phone = ? AND knowledge = ? LIMIT 1", [body.phone, b.knowledge_content]);
        if (exists.length > 0) continue;
        await execute(
          db,
          `INSERT INTO worker_agent_knowledge (phone, agent_id, agent_name, knowledge, source, version, updated_by, psychologist_notes, created_at)
           VALUES (?, 'training', ?, ?, 'persuasion_training', 1, 'admin', ?, datetime('now'))`,
          [body.phone, b.source_name, b.knowledge_content, `Training: ${b.knowledge_title}`]
        );
        assigned++;
      }
      return NextResponse.json({ success: true, assigned, total: books.length });
    }

    if (body.moduleIds && body.moduleIds.length > 0) {
      const modules = await query<{ id: number; knowledge_title: string; knowledge_content: string; source_name: string }>(
        db,
        `SELECT id, knowledge_title, knowledge_content, source_name
         FROM ai_knowledge_distribution WHERE id IN (${body.moduleIds.map(() => "?").join(",")})`,
        body.moduleIds.map(String)
      );
      let assigned = 0;
      for (const m of modules) {
        const exists = await query(db, "SELECT id FROM worker_agent_knowledge WHERE phone = ? AND knowledge = ? LIMIT 1", [body.phone, m.knowledge_content]);
        if (exists.length > 0) continue;
        await execute(
          db,
          `INSERT INTO worker_agent_knowledge (phone, agent_id, agent_name, knowledge, source, version, updated_by, psychologist_notes, created_at)
           VALUES (?, 'training', ?, ?, 'persuasion_training', 1, 'admin', ?, datetime('now'))`,
          [body.phone, m.source_name, m.knowledge_content, `Training: ${m.knowledge_title}`]
        );
        assigned++;
      }
      return NextResponse.json({ success: true, assigned });
    }

    return NextResponse.json({ error: "Provide moduleIds, allBooks, or technique" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Failed" }, { status: 500 });
  }
}
