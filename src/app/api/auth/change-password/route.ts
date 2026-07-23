import { NextRequest, NextResponse } from "next/server";
import { hashWorkerPassword, verifyWorkerPassword, getJwtSecret } from "@/lib/auth";
import { initEnv } from "@/lib/env";
import { getCached, setCached, invalidateCache } from "@/lib/cache";

export async function POST(request: NextRequest) {
  try {
    const { workerId, oldPassword, newPassword } = await request.json() as { workerId: string; oldPassword: string; newPassword: string };
    if (!workerId || !oldPassword || !newPassword) {
      return NextResponse.json({ error: "workerId, oldPassword, newPassword required" }, { status: 400 });
    }
    if (newPassword.length < 4) {
      return NextResponse.json({ error: "Password must be at least 4 characters" }, { status: 400 });
    }

    const ctx = await initEnv();
    if (!ctx?.DB) {
      return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
    }

    const worker = await ctx.DB.prepare(
      "SELECT worker_id, phone, password FROM workers WHERE worker_id = ?"
    ).bind(workerId).first() as { worker_id: string; phone: string; password: string } | undefined;

    if (!worker) {
      return NextResponse.json({ error: "Worker not found" }, { status: 404 });
    }

    const valid = await verifyWorkerPassword(oldPassword, worker.password);
    if (!valid) {
      return NextResponse.json({ error: "Current password is incorrect" }, { status: 401 });
    }

    const hashedPassword = await hashWorkerPassword(newPassword);
    await ctx.DB.prepare("UPDATE workers SET password = ? WHERE worker_id = ?").bind(hashedPassword, workerId).run();

    // Invalidate all caches for this user
    const phoneHash = Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(worker.phone))))
      .map(b => b.toString(16).padStart(2, "0")).join("");
    await invalidateCache(`auth:worker:${phoneHash}`);

    const g = globalThis as any;
    if (g.__workerAuthMemo) g.__workerAuthMemo.delete(phoneHash);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Change password error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
