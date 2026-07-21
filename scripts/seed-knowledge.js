// Seed Knowledge Brain from existing ai_knowledge_distribution + books + training modules
// Run: node scripts/seed-knowledge.js
// Copies all existing knowledge into the new knowledge_entries table for structured retrieval

const { createLocalDB } = require("../src/lib/db/local-d1");
const DB = createLocalDB();

async function main() {
  console.log("Seeding Knowledge Brain...");

  // Migrate from ai_knowledge_distribution
  const rows = DB.prepare("SELECT DISTINCT knowledge_title, knowledge_content, knowledge_category, source_type, source_name, confidence FROM ai_knowledge_distribution WHERE knowledge_title != '' AND knowledge_content != ''").all();

  if (!rows.results) {
    console.log("No existing knowledge found");
    return;
  }

  let inserted = 0;
  let skipped = 0;

  for (const row of rows.results) {
    const cat = row.knowledge_category || "general";
    const catMap = { psychology: "psychology", sales: "sales", communication: "communication", trust: "trust", strategy: "strategy", safety: "safety" };
    const category = catMap[cat] || cat;

    // Skip duplicates
    const exists = DB.prepare("SELECT id FROM knowledge_entries WHERE title = ? AND content = ?").get(row.knowledge_title, row.knowledge_content);

    if (exists.results && exists.results.length > 0) {
      skipped++;
      continue;
    }

    const tags = JSON.stringify([category, row.source_type || "unknown"]);
    DB.prepare(
      "INSERT INTO knowledge_entries (category, title, content, source_type, source_name, confidence, tags, version) VALUES (?, ?, ?, ?, ?, ?, ?, 1)"
    ).run(category, row.knowledge_title, row.knowledge_content, row.source_type || null, row.source_name || null, row.confidence || 1.0, tags);
    inserted++;
  }

  console.log(`Done: ${inserted} inserted, ${skipped} skipped`);
  console.log("Total knowledge entries:", DB.prepare("SELECT COUNT(*) as c FROM knowledge_entries").get()?.results?.[0]?.c || 0);
}

main().catch(console.error);
