export function getDB(): { DB: D1Database } {
  return { DB: process.env.DB as unknown as D1Database };
}

export function ensureDB(): D1Database {
  const db = process.env.DB as unknown as D1Database | undefined;
  if (!db) throw new Error("D1 Database not bound - check your Cloudflare settings");
  return db;
}
