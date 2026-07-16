import { query, queryFirst, execute } from "@/lib/db/queries";
import { ensureDB } from "@/lib/db";

interface Skill {
  id: number;
  keywords: string;
  question: string;
  answer: string;
  usage_count: number;
  category: string;
}

export async function findSkill(text: string): Promise<string | null> {
  try {
    const db = await ensureDB();
    const skills = await query<Skill>(
      { DB: db },
      "SELECT * FROM ai_skills ORDER BY usage_count DESC"
    );
    if (skills.length === 0) return null;

    const normalizedText = text.toLowerCase();
    const words = normalizedText.split(/[\s,;:.!?()\[\]{}""'']+/).filter((w) => w.length > 2);

    for (const skill of skills) {
      const keywords = skill.keywords.split(",").map((k) => k.trim().toLowerCase());
      let matchCount = 0;
      for (const keyword of keywords) {
        if (normalizedText.includes(keyword)) matchCount++;
        else if (words.some((w) => w.includes(keyword) || keyword.includes(w))) matchCount++;
      }
      if (matchCount >= 2) {
        await execute(
          { DB: db },
          "UPDATE ai_skills SET usage_count = usage_count + 1, updated_at = datetime('now') WHERE id = ?",
          [skill.id]
        );
        return skill.answer;
      }
    }
    return null;
  } catch (e) {
    console.error("[Skills] findSkill error:", (e as Error)?.message);
    return null;
  }
}

export async function saveSkill(
  keywords: string[],
  question: string,
  answer: string,
  category = "general"
): Promise<void> {
  try {
    const db = await ensureDB();
    const normalizedQuestion = question.toLowerCase().trim();

    const existing = await queryFirst<Skill>(
      { DB: db },
      "SELECT id FROM ai_skills WHERE LOWER(question) = ?",
      [normalizedQuestion]
    );

    if (existing) {
      await execute(
        { DB: db },
        "UPDATE ai_skills SET keywords = ?, answer = ?, usage_count = usage_count + 1, updated_at = datetime('now') WHERE id = ?",
        [keywords.join(","), answer, existing.id]
      );
    } else {
      await execute(
        { DB: db },
        "INSERT INTO ai_skills (keywords, question, answer, category, created_at, updated_at) VALUES (?, ?, ?, ?, datetime('now'), datetime('now'))",
        [keywords.join(","), question, answer, category]
      );
    }
  } catch (e) {
    console.error("[Skills] saveSkill error:", (e as Error)?.message);
  }
}
