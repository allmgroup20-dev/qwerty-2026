import { NextRequest, NextResponse } from "next/server";
import { verifyWorkerPassword, generateToken, getJwtSecret } from "@/lib/auth";
import { getCached, setCached } from "@/lib/cache";
import { initEnv } from "@/lib/env";

const MEMO = "__workerAuthMemo";
const D1_TIMEOUT_MS = 8000;
const HANDLER_TIMEOUT_MS = 15000;

function getMemo(): Map<string, { worker_id: string; name: string; password: string }> {
  const g = globalThis as any;
  if (!g[MEMO]) g[MEMO] = new Map();
  return g[MEMO];
}

async function queryDB(phone: string): Promise<{ worker_id: string; name: string; password: string } | null> {
  try {
    const ctx = await initEnv();
    if (!ctx?.DB) return null;
    const row = await ctx.DB.prepare(
      "SELECT worker_id, name, password FROM workers WHERE phone = ? AND membership_status IN ('general', 'premium')"
    ).bind(phone).first() as { worker_id: string; name: string; password: string } | undefined;
    return row || null;
  } catch {
    return null;
  }
}

export async function POST(request: NextRequest) {
  return await Promise.race([
    handleLogin(request),
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Handler timed out")), HANDLER_TIMEOUT_MS)
    ),
  ]).catch((err) => {
    console.error("Login handler error:", err);
    return NextResponse.json({ error: "Server timeout, please refresh and try again" }, { status: 503 });
  });
}

async function handleLogin(request: NextRequest): Promise<NextResponse> {
  try {
    const { phone, password } = await request.json() as { phone: string; password: string };
    if (!phone || !password) {
      return NextResponse.json({ error: "Phone and password required" }, { status: 400 });
    }

    const cleanPhone = phone.replace(/\D/g, "");
    const phoneHash = Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(cleanPhone))))
      .map(b => b.toString(16).padStart(2, "0")).join("");

    const memo = getMemo();

    // 1. In-memory cache (0ms)
    const memoized = memo.get(phoneHash);
    if (memoized) {
      const valid = await verifyWorkerPassword(password, memoized.password);
      if (!valid) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
      const token = await generateToken(memoized.worker_id, getJwtSecret());
      return NextResponse.json({ token, workerId: memoized.worker_id, name: memoized.name });
    }

    // 2. KV cache (~20ms)
    const cached = await getCached<{ worker_id: string; name: string; password: string }>(`auth:worker:${phoneHash}`, 1800);
    if (cached) {
      const valid = await verifyWorkerPassword(password, cached.password);
      if (!valid) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
      memo.set(phoneHash, cached);
      const token = await generateToken(cached.worker_id, getJwtSecret());
      return NextResponse.json({ token, workerId: cached.worker_id, name: cached.name });
    }

    // 3. Direct D1 query (bypasses schema init lock)
    let timedOut = false;
    const worker = await Promise.race([
      queryDB(cleanPhone),
      new Promise<null>((_, reject) =>
        setTimeout(() => { timedOut = true; reject(new Error("D1 query timed out")); }, D1_TIMEOUT_MS)
      ),
    ]).catch(() => null);

    if (!worker) {
      if (timedOut) {
        return NextResponse.json({ error: "Server busy, please try again", retryable: true }, { status: 503 });
      }
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const valid = await verifyWorkerPassword(password, worker.password);
    if (!valid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    setCached(`auth:worker:${phoneHash}`, { worker_id: worker.worker_id, name: worker.name, password: worker.password }).catch(() => {});
    memo.set(phoneHash, { worker_id: worker.worker_id, name: worker.name, password: worker.password });

    const token = await generateToken(worker.worker_id, getJwtSecret());
    return NextResponse.json({ token, workerId: worker.worker_id, name: worker.name });
  } catch (error) {
    console.error("Worker login error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
