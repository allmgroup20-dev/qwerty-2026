import { query, execute } from "@/lib/db/queries";
import { ensureDB } from "@/lib/db";

const BD_PREFIXES = ["013", "014", "015", "016", "017", "018", "019"];

const OPERATORS: Record<string, string> = {
  "013": "Grameenphone",
  "014": "Banglalink",
  "015": "TeleTalk",
  "016": "Robi",
  "017": "Grameenphone",
  "018": "Robi",
  "019": "Banglalink",
};

export function generateNumbers(count: number): string[] {
  const numbers: string[] = [];
  for (let i = 0; i < count; i++) {
    const prefix = BD_PREFIXES[Math.floor(Math.random() * BD_PREFIXES.length)];
    const suffix = String(Math.floor(10000000 + Math.random() * 90000000));
    numbers.push(prefix + suffix);
  }
  return numbers;
}

export async function saveGeneratedNumbers(numbers: string[]): Promise<void> {
  const db = await ensureDB();
  for (const phone of numbers) {
    await execute(
      { DB: db },
      "INSERT OR IGNORE INTO wa_scanned_numbers (phone, status, source, created_at) VALUES (?, 'generated', 'generator', datetime('now'))",
      [phone]
    );
  }
}

export async function getScannedNumbers(
  limit = 50,
  offset = 0
): Promise<{ phone: string; status: string; created_at: string }[]> {
  const db = await ensureDB();
  return query<{ phone: string; status: string; created_at: string }>(
    { DB: db },
    "SELECT phone, status, created_at FROM wa_scanned_numbers ORDER BY created_at DESC LIMIT ? OFFSET ?",
    [limit, offset]
  );
}

export async function validateNumber(
  phone: string
): Promise<{ valid: boolean; operator?: string; message: string }> {
  const cleaned = phone.replace(/[^0-9]/g, "");
  if (cleaned.length === 11 && BD_PREFIXES.includes(cleaned.slice(0, 3))) {
    const prefix = cleaned.slice(0, 3);
    await execute(
      { DB: await ensureDB() },
      "INSERT OR IGNORE INTO wa_scanned_numbers (phone, status, source, created_at) VALUES (?, 'validated', 'validator', datetime('now'))",
      [cleaned]
    );
    return {
      valid: true,
      operator: OPERATORS[prefix] || "Unknown",
      message: `Valid BD number (${OPERATORS[prefix] || "Unknown operator"})`,
    };
  }
  return { valid: false, message: "Invalid Bangladesh phone number" };
}

export function calculatePriorityScore(profile: {
  gender_guess?: string | null;
  age_group_guess?: string | null;
  sector?: string | null;
}): number {
  let score = 0;

  if (profile.age_group_guess === "15-20") score += 30;
  else if (profile.age_group_guess === "21-29") score += 20;
  else if (profile.age_group_guess === "30-39") score += 15;
  else if (profile.age_group_guess === "40-49") score += 10;
  else if (profile.age_group_guess === "50+") score += 5;

  if (profile.gender_guess === "female") score += 25;
  else if (profile.gender_guess === "male") score += 15;

  if (profile.sector === "student") score += 10;
  else if (profile.sector === "unemployed") score += 15;
  else if (profile.sector === "homemaker") score += 10;

  return score;
}
