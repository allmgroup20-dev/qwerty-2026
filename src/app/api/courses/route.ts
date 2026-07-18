import { NextRequest, NextResponse } from "next/server";
import { query, execute } from "@/lib/db/queries";
import { getDB } from "@/lib/db";
import { getCached, setCached, invalidateCache } from "@/lib/cache";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get("categoryId");
    const isNew = searchParams.get("isNew");
    const visibleOnly = searchParams.get("visibleOnly");

    const cacheKey = `courses:c:${categoryId || ""}:n:${isNew ?? ""}:v:${visibleOnly || ""}`;
    const cached = await getCached<any[]>(cacheKey, 30);
    if (cached) {
      const resp = NextResponse.json({ courses: cached });
      resp.headers.set("Cache-Control", "public, s-maxage=30, stale-while-revalidate=120");
      return resp;
    }

    let sql = `SELECT c.id, c.title, c.title_bn as titleBn, c.description, c.description_bn as descriptionBn,
              c.category_id as categoryId, c.is_new as isNew, c.is_visible as isVisible,
              c.icon, c.price, c.is_premium as isPremium, c.created_at as createdAt, c.updated_at as updatedAt,
              cat.name as categoryName, cat.name_bn as categoryNameBn,
              (SELECT cf.url FROM course_files cf WHERE cf.course_id = c.id ORDER BY cf.sort_order ASC, cf.id ASC LIMIT 1) as fileUrl,
              (SELECT COUNT(*) FROM course_files cf WHERE cf.course_id = c.id) as fileCount
              FROM courses c LEFT JOIN course_categories cat ON c.category_id = cat.id WHERE 1=1`;
    const params: unknown[] = [];

    if (categoryId) { sql += " AND c.category_id = ?"; params.push(parseInt(categoryId)); }
    if (isNew === "0" || isNew === "1") { sql += " AND c.is_new = ?"; params.push(parseInt(isNew)); }
    if (visibleOnly === "1") { sql += " AND c.is_visible = 1"; }

    sql += " ORDER BY c.is_new DESC, c.created_at DESC";

    const courses = await query<any>(await getDB(), sql, params);
    await setCached(cacheKey, courses);
    const resp = NextResponse.json({ courses });
    resp.headers.set("Cache-Control", "public, s-maxage=30, stale-while-revalidate=120");
    return resp;
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as {
      title: string; titleBn?: string; description?: string; descriptionBn?: string;
      categoryId?: number; isNew?: number; isVisible?: number; icon?: string;
      price?: number; isPremium?: number;
    };

    if (!body.title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const db = await getDB();
    await invalidateCache("courses");
    const result = await execute(db,
      `INSERT INTO courses (title, title_bn, description, description_bn, category_id,
        is_new, is_visible, icon, price, is_premium)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        body.title, body.titleBn || null, body.description || null, body.descriptionBn || null,
        body.categoryId || null, body.isNew ?? 1, body.isVisible ?? 1,
        body.icon || "📌", body.price || 0, body.isPremium ?? 0,
      ]
    );

    return NextResponse.json({ success: true, id: result.meta?.last_row_id }, { status: 201 });
  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : "Internal server error"
    }, { status: 500 });
  }
}
