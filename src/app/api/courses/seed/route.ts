import { NextResponse } from "next/server";
import { execute, query } from "@/lib/db/queries";
import { getDB } from "@/lib/db";
import { courses, categoryOrder, categoryNames } from "@/data/courses-data";
import { invalidateCache } from "@/lib/cache";

export async function POST() {
  try {
    const db = await getDB();

    const existing = await query<{ cnt: number }>(db, "SELECT COUNT(*) as cnt FROM courses");
    if (existing[0]?.cnt > 0) {
      return NextResponse.json({ error: "Courses already exist. Delete all first if you want to re-seed." }, { status: 400 });
    }

    // Normalize category names: lowercase variants -> canonical
    const catCanon = new Map<string, string>();
    catCanon.set("eshikhon", "E-Shikhon");
    catCanon.set("10ms pdf", "10MS PDF");
    catCanon.set("youtube marketing", "YouTube Marketing");
    catCanon.set("spoken english", "Spoken English");

    const getCanon = (name: string) => catCanon.get(name.toLowerCase()) || name;

    const catMap = new Map<string, number>();
    const seenCats = new Set<string>();

    for (const rawCat of categoryOrder) {
      const cat = getCanon(rawCat);
      const key = cat.toLowerCase();
      if (seenCats.has(key)) continue;
      seenCats.add(key);

      const bn = categoryNames[rawCat] || categoryNames[cat] || cat;
      const existingCat = await query<{ id: number }>(db, "SELECT id FROM course_categories WHERE LOWER(name) = ?", [key]);
      if (existingCat.length > 0) {
        catMap.set(cat, existingCat[0].id);
      } else {
        await execute(db, "INSERT INTO course_categories (name, name_bn, is_visible) VALUES (?, ?, 1)", [cat, bn]);
        const result = await query<{ id: number }>(db, "SELECT id FROM course_categories WHERE name = ?", [cat]);
        if (result.length > 0) catMap.set(cat, result[0].id);
      }
    }

    let catCount = catMap.size;
    let courseCount = 0;

    for (const course of courses) {
      const canonCat = getCanon(course.cat);
      const catId = catMap.get(canonCat) || null;

      const result = await execute(db,
        `INSERT INTO courses (title, title_bn, description, description_bn, category_id, is_new, is_visible, icon, price, is_premium)
         VALUES (?, ?, ?, ?, ?, 0, 1, ?, 0, 0)`,
        [course.title, null, course.desc, null, catId, course.icon || "📌"]
      );
      const courseId = result.meta?.last_row_id;
      if (!courseId) continue;

      await execute(db,
        `INSERT INTO course_files (course_id, label, label_bn, url, file_type, sort_order)
         VALUES (?, ?, ?, ?, 'link', 0)`,
        [courseId, "Course Link", "কোর্স লিংক", course.url]
      );
      courseCount++;
    }

    await invalidateCache("courses");
    await invalidateCache("course_categories");
    return NextResponse.json({ success: true, categoriesSeeded: catCount, coursesSeeded: courseCount });
  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : "Internal server error"
    }, { status: 500 });
  }
}
