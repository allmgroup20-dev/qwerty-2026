import { NextRequest, NextResponse } from "next/server";
import { queryFirst, execute } from "@/lib/db/queries";
import { getDB } from "@/lib/db";
import { SslcommerzService } from "@/lib/payment/sslcommerz";
import { distributeCommissions } from "@/lib/mlm/commission";
import { sendWhatsAppMessage, generateWhatsAppTemplate } from "@/lib/whatsapp";

export async function GET(request: NextRequest) {
  try {
    const params = Object.fromEntries(request.nextUrl.searchParams.entries());

    const orderId = params.tran_id;
    const status = params.status;
    const valId = params.val_id;
    const transactionId = params.bank_tran_id || params.tran_id;

    if (!orderId) {
      return NextResponse.redirect(new URL("/checkout?payment=error", request.url));
    }

    if (status !== "VALID" && status !== "VALIDATED") {
      await execute(await getDB(), "UPDATE orders SET order_status = 'failed' WHERE order_id = ?", [orderId]);
      return NextResponse.redirect(new URL(`/checkout?payment=failed&order=${orderId}`, request.url));
    }

    const service = new SslcommerzService();
    if (valId) {
      const validation = await service.validatePayment(valId);
      if (!validation.validated) {
        await execute(await getDB(), "UPDATE orders SET order_status = 'failed' WHERE order_id = ?", [orderId]);
        return NextResponse.redirect(new URL(`/checkout?payment=failed&order=${orderId}`, request.url));
      }
    }

    const env = await getDB();
    const existing = await queryFirst<{ payment_status: string; worker_id: string; total_amount: number; currency: string }>(
      env, "SELECT payment_status, worker_id, total_amount, currency FROM orders WHERE order_id = ?", [orderId]
    );

    if (!existing) {
      return NextResponse.redirect(new URL("/checkout?payment=error", request.url));
    }

    if (existing.payment_status === "paid") {
      return NextResponse.redirect(new URL("/dashboard/orders?payment=success", request.url));
    }

    await execute(env,
      `UPDATE orders SET payment_status = 'paid', transaction_id = ?, order_status = 'confirmed' WHERE order_id = ?`,
      [transactionId, orderId]
    );

    const worker = await queryFirst<{ name: string; phone: string }>(
      env, "SELECT name, phone FROM workers WHERE worker_id = ?", [existing.worker_id]
    );

    if (worker) {
      const sponsorChain = await getSponsorUpline(env, existing.worker_id);
      await distributeCommissions(env, orderId, existing.worker_id, existing.total_amount, existing.currency, sponsorChain);

      try {
        const apiKey = process.env.WHATSAPP_API_KEY || "";
        if (apiKey) {
          const message = generateWhatsAppTemplate(worker.name, "order");
          await sendWhatsAppMessage({ to: worker.phone, text: message }, apiKey);
        }
      } catch {}
    }

    return NextResponse.redirect(new URL("/dashboard/orders?payment=success", request.url));
  } catch (error) {
    console.error("Payment success error:", error);
    return NextResponse.redirect(new URL("/checkout?payment=error", request.url));
  }
}

interface SponsorRow { sponsor_id: string; }

async function getSponsorUpline(env: { DB: D1Database }, workerId: string): Promise<{ workerId: string; level: number }[]> {
  const chain: { workerId: string; level: number }[] = [];
  let currentId: string | null = workerId;
  let lvl = 1;

  while (currentId && lvl <= 10) {
    const sponsorRow: SponsorRow | null = await queryFirst<SponsorRow>(
      env, "SELECT sponsor_id FROM workers WHERE worker_id = ?", [currentId]
    );
    if (!sponsorRow?.sponsor_id) break;

    const exists = await queryFirst<{ worker_id: string }>(
      env, "SELECT worker_id FROM workers WHERE worker_id = ?", [sponsorRow.sponsor_id]
    );
    if (!exists) break;

    chain.push({ workerId: sponsorRow.sponsor_id, level: lvl });
    currentId = sponsorRow.sponsor_id;
    lvl++;
  }

  return chain;
}
