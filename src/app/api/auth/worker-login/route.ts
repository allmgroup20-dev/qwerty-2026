import { NextRequest, NextResponse } from "next/server";
import { queryFirst } from "@/lib/db/queries";
import { getDB } from "@/lib/db";
import { verifyWorkerPassword, generateToken, getJwtSecret } from "@/lib/auth";
import { getCached, setCached } from "@/lib/cache";

export async function POST(request: NextRequest) {
  try {
    const { phone, password } = await request.json() as { phone: string; password: string };
    if (!phone || !password) {
      return NextResponse.json({ error: "Phone and password required" }, { status: 400 });
    }

    const cleanPhone = phone.replace(/\D/g, "");
    const phoneHash = Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(cleanPhone))))
      .map(b => b.toString(16).padStart(2, "0")).join("");

    const cached = await getCached<{ worker_id: string; name: string; password: string }>(`auth:worker:${phoneHash}`, 1800);
    if (cached) {
      const valid = await verifyWorkerPassword(password, cached.password);
      if (!valid) {
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
      }
      const token = await generateToken(cached.worker_id, getJwtSecret());
      return NextResponse.json({ token, workerId: cached.worker_id, name: cached.name });
    }

    const worker = await queryFirst<{ worker_id: string; name: string; password: string }>(
      await getDB(),
      "SELECT worker_id, name, password FROM workers WHERE REPLACE(REPLACE(phone, ' ', ''), '+', '') = ? AND membership_status IN ('general', 'premium')",
      [cleanPhone]
    );

    if (!worker) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const valid = await verifyWorkerPassword(password, worker.password);
    if (!valid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    setCached(`auth:worker:${phoneHash}`, { worker_id: worker.worker_id, name: worker.name, password: worker.password }).catch(() => {});

    const token = await generateToken(worker.worker_id, getJwtSecret());
    return NextResponse.json({ token, workerId: worker.worker_id, name: worker.name });
  } catch (error) {
    console.error("Worker login error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
