import { ensureDB } from "@/lib/db";

export async function syncPhonebookContact(
  phone: string,
  name?: string | null,
  source?: string
): Promise<void> {
  const db = await ensureDB();
  const clean = phone.replace(/[^0-9]/g, "").replace(/^88/, "");
  if (!clean || clean.length < 10) return;

  const now = new Date().toISOString();

  const workers = await db.prepare(
    "SELECT worker_id FROM workers WHERE membership_status = 'active'"
  ).bind().all() as { results: { worker_id: string }[] };

  for (const w of workers.results) {
    const existing = await db.prepare(
      "SELECT id FROM user_phonebooks WHERE worker_id = ? AND contact_phone = ?"
    ).bind(w.worker_id, clean).first() as { id: number } | undefined;

    if (existing) {
      await db.prepare(
        "UPDATE user_phonebooks SET has_whatsapp = 1, last_checked_at = ?, source = COALESCE(?, source) WHERE id = ?"
      ).bind(now, source || "whatsapp_sync", existing.id).run();
    }
  }
}
