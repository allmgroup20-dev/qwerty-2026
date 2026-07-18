export async function query<T>(env: { DB: D1Database }, query: string, params?: unknown[]): Promise<T[]> {
  const stmt = params ? env.DB.prepare(query).bind(...params) : env.DB.prepare(query);
  const result = await stmt.all();
  return result.results as T[];
}

export async function queryFirst<T>(env: { DB: D1Database }, sql: string, params?: unknown[]): Promise<T | null> {
  const results = await query<T>(env, sql, params);
  return results.length > 0 ? results[0] : null;
}

export async function execute(env: { DB: D1Database }, query: string, params?: unknown[]): Promise<D1Result> {
  const stmt = params ? env.DB.prepare(query).bind(...params) : env.DB.prepare(query);
  return stmt.run();
}

export async function batch(env: { DB: D1Database }, queries: { sql: string; params?: unknown[] }[]) {
  const stmts = queries.map((q) =>
    q.params ? env.DB.prepare(q.sql).bind(...q.params) : env.DB.prepare(q.sql)
  );
  return env.DB.batch(stmts);
}

export async function querySafe<T>(env: { DB: D1Database }, sql: string, params?: unknown[], timeoutMs = 8000): Promise<T[]> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
    const result = await query<T>(env, sql, params);
    clearTimeout(timeoutId);
    return result;
  } catch {
    return [];
  }
}

export async function queryFirstSafe<T>(env: { DB: D1Database }, sql: string, params?: unknown[], timeoutMs = 8000): Promise<T | null> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
    const result = await queryFirst<T>(env, sql, params);
    clearTimeout(timeoutId);
    return result;
  } catch {
    return null;
  }
}
