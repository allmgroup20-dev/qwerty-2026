import { getCloudflareContext } from "@opennextjs/cloudflare";

async function getLocalDB() {
  const g = globalThis as any;
  if (!g.__localD1Instance) {
    try {
      const mod = await import("./local-d1");
      g.__localD1Instance = mod.createLocalDB();
    } catch (e) {
      console.warn("Local D1 not available:", (e as Error)?.message);
    }
  }
  return g.__localD1Instance || null;
}

export async function getDB(): Promise<{ DB: D1Database }> {
  try {
    const { env } = getCloudflareContext();
    const db = (env as any).DB as D1Database | undefined;
    if (db) return { DB: db };
  } catch {}
  const db = process.env.DB as unknown as D1Database | undefined;
  if (db) return { DB: db };
  try {
    const local = await getLocalDB();
    if (local) return { DB: local as unknown as D1Database };
  } catch (e) {
    console.warn("Local D1 fallback failed:", (e as Error)?.message);
  }
  throw new Error("D1 Database not available - run migrations first");
}

export async function ensureDB(): Promise<D1Database> {
  const { DB } = await getDB();
  return DB;
}
