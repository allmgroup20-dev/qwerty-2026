// ── Sliding window rate limiter per phone ──
const requestLogs = new Map<string, number[]>();
const WINDOW_MS = 60_000; // 1 minute
const MAX_REQUESTS = 10;   // 10 requests per minute per phone
const CLEANUP_INTERVAL = 120_000;

let lastCleanup = Date.now();

export function checkRateLimit(phone: string): { allowed: boolean; remaining: number; resetMs: number } {
  // Periodic cleanup
  const now = Date.now();
  if (now - lastCleanup > CLEANUP_INTERVAL) {
    for (const [key, timestamps] of requestLogs) {
      const valid = timestamps.filter(t => now - t < WINDOW_MS);
      if (valid.length === 0) requestLogs.delete(key);
      else requestLogs.set(key, valid);
    }
    lastCleanup = now;
  }

  const timestamps = requestLogs.get(phone) || [];
  const valid = timestamps.filter(t => now - t < WINDOW_MS);
  requestLogs.set(phone, valid);

  const oldest = valid.length > 0 ? valid[0] : now;
  const resetMs = WINDOW_MS - (now - oldest);

  if (valid.length >= MAX_REQUESTS) {
    return { allowed: false, remaining: 0, resetMs: Math.max(0, resetMs) };
  }

  valid.push(now);
  requestLogs.set(phone, valid);
  return { allowed: true, remaining: MAX_REQUESTS - valid.length, resetMs: 0 };
}

export function getRateLimitStats(): { totalTracked: number } {
  return { totalTracked: requestLogs.size };
}
