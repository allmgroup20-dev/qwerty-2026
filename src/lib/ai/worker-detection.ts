import { queryFirst } from "@/lib/db/queries";
import { ensureDB } from "@/lib/db";

export async function isWorkerPhone(phone: string): Promise<boolean> {
  const db = await ensureDB();
  const clean = phone.replace(/[^0-9]/g, "");
  const worker = await queryFirst<{ id: number }>(
    { DB: db },
    "SELECT id FROM workers WHERE REPLACE(REPLACE(phone, ' ', ''), '+', '') LIKE ?",
    [`%${clean.slice(-11)}%`]
  );
  return !!worker;
}

export async function getWorkerByPhone(phone: string): Promise<{
  workerId: string; name: string; level: number; sponsorId: string | null;
} | null> {
  const db = await ensureDB();
  const clean = phone.replace(/[^0-9]/g, "");
  return queryFirst(
    { DB: db },
    "SELECT worker_id, name, level, sponsor_id FROM workers WHERE REPLACE(REPLACE(phone, ' ', ''), '+', '') LIKE ?",
    [`%${clean.slice(-11)}%`]
  );
}
