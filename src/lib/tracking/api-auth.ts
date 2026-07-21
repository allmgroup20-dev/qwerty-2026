const ipRequestCounts = new Map<string, { count: number; resetAt: number }>();
const IP_WINDOW_MS = 60_000;
const IP_MAX_REQUESTS = 100;

export function validateTrackingRequest(headers: Headers, workerId: string): { valid: boolean; error?: string } {
  const token = headers.get("x-tracking-token");
  if (!token) return { valid: false, error: "Missing tracking token" };

  const ip = headers.get("x-forwarded-for") || headers.get("x-real-ip") || "unknown";
  const now = Date.now();
  let entry = ipRequestCounts.get(ip);
  if (!entry || now >= entry.resetAt) {
    entry = { count: 0, resetAt: now + IP_WINDOW_MS };
  }
  entry.count++;
  ipRequestCounts.set(ip, entry);

  if (entry.count > IP_MAX_REQUESTS) {
    return { valid: false, error: "Rate limit exceeded per IP" };
  }

  return { valid: true };
}

export async function validateAndLogTrackingRequest(headers: Headers, workerId: string): Promise<{ valid: boolean; error?: string }> {
  const basic = validateTrackingRequest(headers, workerId);
  if (!basic.valid) return basic;

  try {
    if (typeof process !== "undefined" && process.env?.DB) {
      const { execute } = await import("@/lib/db/queries");
      const env = { DB: process.env.DB as any };
      await execute(
        env,
        "INSERT INTO tracking_api_logs (worker_id, ip, method, endpoint, created_at) VALUES (?, ?, ?, ?, datetime('now'))",
        [workerId, headers.get("x-forwarded-for") || "unknown", "POST", "/api/track"]
      ).catch(() => {});
    }
  } catch {}

  return { valid: true };
}
