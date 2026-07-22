import { NextResponse } from "next/server";
import { execute, batch } from "@/lib/db/queries";
import { getDB } from "@/lib/db";
import { invalidateCache } from "@/lib/cache";

export async function GET() {
  try {
    const db = await getDB();
    const results: string[] = [];

    // Check existing data
    const courseCount = await db.DB.prepare("SELECT COUNT(*) as c FROM courses").all<{ c: number }>();
    const instCount = await db.DB.prepare("SELECT COUNT(*) as c FROM institutions").all<{ c: number }>();
    const trainerCount = await db.DB.prepare("SELECT COUNT(*) as c FROM trainers").all<{ c: number }>();
    const catCount = await db.DB.prepare("SELECT COUNT(*) as c FROM course_categories").all<{ c: number }>();

    results.push(`Courses: ${courseCount.results?.[0]?.c ?? 0}, Institutions: ${instCount.results?.[0]?.c ?? 0}, Trainers: ${trainerCount.results?.[0]?.c ?? 0}, Categories: ${catCount.results?.[0]?.c ?? 0}`);

    if ((courseCount.results?.[0]?.c ?? 0) > 0) {
      return NextResponse.json({ message: "Data already exists", results });
    }

    // Seed categories
    const catStmts = [
      { sql: "INSERT OR IGNORE INTO course_categories (id, name, name_bn, icon) VALUES (1, 'Web Development', 'ওয়েব ডেভেলপমেন্ট', '🌐')" },
      { sql: "INSERT OR IGNORE INTO course_categories (id, name, name_bn, icon) VALUES (2, 'Mobile Apps', 'মোবাইল অ্যাপ', '📱')" },
      { sql: "INSERT OR IGNORE INTO course_categories (id, name, name_bn, icon) VALUES (3, 'Graphic Design', 'গ্রাফিক ডিজাইন', '🎨')" },
      { sql: "INSERT OR IGNORE INTO course_categories (id, name, name_bn, icon) VALUES (4, 'Digital Marketing', 'ডিজিটাল মার্কেটিং', '📢')" },
      { sql: "INSERT OR IGNORE INTO course_categories (id, name, name_bn, icon) VALUES (5, 'English Language', 'ইংরেজি ভাষা', '📖')" },
    ];
    await batch(db, catStmts);
    results.push("Categories seeded");

    // Seed institutions
    await execute(db, "INSERT OR IGNORE INTO institutions (id, name, name_bn, sort_order) VALUES (1, 'Jobayer IT', 'জোবায়ের আইটি', 1)");
    await execute(db, "INSERT OR IGNORE INTO institutions (id, name, name_bn, sort_order) VALUES (2, 'BD Skills', 'বিডি স্কিলস', 2)");
    results.push("Institutions seeded");

    // Seed trainers
    await execute(db, `INSERT OR IGNORE INTO trainers (id, name, name_bn, specialty_en, specialty_bn, institution_id, sort_order, is_active)
      VALUES (1, 'Jobayer Hossain', 'জোবায়ের হোসেন', 'Full-Stack Developer & Entrepreneur', 'ফুল-স্ট্যাক ডেভেলপার ও উদ্যোক্তা', 1, 1, 1)`);
    await execute(db, `INSERT OR IGNORE INTO trainers (id, name, name_bn, specialty_en, specialty_bn, institution_id, sort_order, is_active)
      VALUES (2, 'Rafi Mahbub', 'রাফি মাহবুব', 'MERN Stack Developer', 'মার্ন স্ট্যাক ডেভেলপার', 1, 2, 1)`);
    results.push("Trainers seeded");

    // Seed courses
    await execute(db, `INSERT OR IGNORE INTO courses (id, title, title_bn, description, description_bn, category_id, is_new, is_visible, price, is_premium, trainer_id, institution_id, image_url)
      VALUES (1, 'Complete Web Development Bootcamp', 'কমপ্লিট ওয়েব ডেভেলপমেন্ট বুটক্যাম্প',
        'Learn HTML, CSS, JavaScript, React, Node.js and become a full-stack developer',
        'এইচটিএমএল, সিএসএস, জাভাস্ক্রিপ্ট, রিঅ্যাক্ট, নোড.জেএস শিখে ফুল-স্ট্যাক ডেভেলপার হোন',
        1, 1, 1, 990, 1, 1, 1, NULL)`);
    await execute(db, `INSERT OR IGNORE INTO courses (id, title, title_bn, description, description_bn, category_id, is_new, is_visible, price, is_premium, trainer_id, institution_id, image_url)
      VALUES (2, 'Python for Beginners', 'পাইথন ফর বিগিনার্স',
        'Start your programming journey with Python - the most popular language',
        'পাইথন দিয়ে প্রোগ্রামিং যাত্রা শুরু করুন - সবচেয়ে জনপ্রিয় ভাষা',
        1, 1, 1, 499, 0, 1, 1, NULL)`);
    await execute(db, `INSERT OR IGNORE INTO courses (id, title, title_bn, description, description_bn, category_id, is_new, is_visible, price, is_premium, trainer_id, institution_id, image_url)
      VALUES (3, 'Digital Marketing Masterclass', 'ডিজিটাল মার্কেটিং মাস্টারক্লাস',
        'Master SEO, Social Media Marketing, Google Ads & more',
        'এসইও, সোশ্যাল মিডিয়া মার্কেটিং, গুগল অ্যাডস সহ আরও অনেক কিছু শিখুন',
        4, 1, 1, 1490, 1, 2, 1, NULL)`);
    results.push("Courses seeded");

    // Map courses to categories
    await batch(db, [
      { sql: "INSERT OR IGNORE INTO course_category_map (course_id, category_id) VALUES (1, 1)" },
      { sql: "INSERT OR IGNORE INTO course_category_map (course_id, category_id) VALUES (2, 1)" },
      { sql: "INSERT OR IGNORE INTO course_category_map (course_id, category_id) VALUES (3, 4)" },
    ]);
    results.push("Category mappings seeded");

    await invalidateCache("courses:*");
    await invalidateCache("trainers:*");
    await invalidateCache("institutions:*");

    return NextResponse.json({ success: true, message: "Seed data created", results });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Seed failed" }, { status: 500 });
  }
}
