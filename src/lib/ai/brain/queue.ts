import { execute, query } from "@/lib/db/queries";

interface QueueItem {
  id: number;
  phone: string;
  text: string;
  status: string;
  priority: number;
  retries: number;
  error_message: string;
  created_at: string;
}

const BATCH_SIZE = 10;
const MAX_RETRIES = 3;

export async function enqueueBrainRequest(db: any, phone: string, text: string, priority = 0): Promise<number> {
  // Dedup: skip if identical request is already pending
  const existing = await query<QueueItem>(
    db,
    `SELECT id FROM brain_queue WHERE phone = ? AND text = ? AND status = 'pending' LIMIT 1`,
    [phone, text],
  );
  if (existing.length > 0) return existing[0].id;

  const result = await execute(
    db,
    `INSERT INTO brain_queue (phone, text, priority) VALUES (?, ?, ?)`,
    [phone, text.slice(0, 1000), priority],
  );
  return 0;
}

export async function dequeueBrainRequests(db: any): Promise<QueueItem[]> {
  // Get highest priority pending items, oldest first
  const items = await query<QueueItem>(
    db,
    `UPDATE brain_queue SET status = 'processing' WHERE id IN (
      SELECT id FROM brain_queue 
      WHERE status = 'pending' AND retries < ?
      ORDER BY priority DESC, created_at ASC
      LIMIT ?
    ) RETURNING *`,
    [MAX_RETRIES, BATCH_SIZE],
  );
  return items;
}

export async function markQueueDone(db: any, id: number): Promise<void> {
  await execute(
    db,
    `UPDATE brain_queue SET status = 'done', processed_at = datetime('now') WHERE id = ?`,
    [id],
  );
}

export async function markQueueFailed(db: any, id: number, error: string): Promise<void> {
  await execute(
    db,
    `UPDATE brain_queue SET status = 'failed', retries = retries + 1, error_message = ?, processed_at = datetime('now') WHERE id = ?`,
    [error.slice(0, 500), id],
  );
}

export async function getQueueStats(db: any): Promise<{
  pending: number;
  processing: number;
  done: number;
  failed: number;
}> {
  const rows = await query<{ status: string; count: number }>(
    db,
    `SELECT status, COUNT(*) as count FROM brain_queue GROUP BY status`,
  );
  const stats = { pending: 0, processing: 0, done: 0, failed: 0 };
  for (const row of rows) {
    if (row.status in stats) (stats as any)[row.status] = row.count;
  }
  return stats;
}
