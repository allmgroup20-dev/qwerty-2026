import { NextRequest, NextResponse } from "next/server";
import { execute, queryFirst, batch } from "@/lib/db/queries";
import { getDB } from "@/lib/db";
import { invalidateCache } from "@/lib/cache";

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json() as {
      title?: string; titleBn?: string; description?: string; descriptionBn?: string;
      categoryIds?: number[]; isNew?: number; isVisible?: number; icon?: string;
      price?: number; isPremium?: number;
    };
    const db = await getDB();

    const existing = await queryFirst<{ id: number }>(db, "SELECT id FROM courses WHERE id = ?", [parseInt(id)]);
    if (!existing) return NextResponse.json({ error: "Course not found" }, { status: 404 });

    await invalidateCache("courses");
    await execute(db,
      `UPDATE courses SET title=COALESCE(?,title), title_bn=COALESCE(?,title_bn),
       description=COALESCE(?,description), description_bn=COALESCE(?,description_bn),
       is_new=COALESCE(?,is_new),
       is_visible=COALESCE(?,is_visible), icon=COALESCE(?,icon),
       price=COALESCE(?,price), is_premium=COALESCE(?,is_premium),
       updated_at=datetime('now')
       WHERE id=?`,
      [
        body.title ?? null, body.titleBn ?? null, body.description ?? null, body.descriptionBn ?? null,
        body.isNew ?? null, body.isVisible ?? null,
        body.icon ?? null, body.price ?? null, body.isPremium ?? null, parseInt(id)
      ]
    );

    if (body.categoryIds !== undefined) {
      await execute(db, "DELETE FROM course_category_map WHERE course_id = ?", [parseInt(id)]);
      if (body.categoryIds.length > 0) {
        const catStmts = body.categoryIds.map((catId: number) => ({
          sql: "INSERT INTO course_category_map (course_id, category_id) VALUES (?, ?)",
          params: [parseInt(id), catId],
        }));
        await batch(db, catStmts);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const db = await getDB();
    await invalidateCache("courses");
    await execute(db, "DELETE FROM course_category_map WHERE course_id = ?", [parseInt(id)]);
    await execute(db, "DELETE FROM course_files WHERE course_id = ?", [parseInt(id)]);
    await execute(db, "DELETE FROM courses WHERE id = ?", [parseInt(id)]);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
