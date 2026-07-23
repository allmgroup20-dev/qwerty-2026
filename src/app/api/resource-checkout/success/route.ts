import { NextRequest, NextResponse } from "next/server";
import { execute, queryFirst, query } from "@/lib/db/queries";
import { getDB } from "@/lib/db";
import { SslcommerzService } from "@/lib/payment/sslcommerz";

export async function GET(request: NextRequest) {
  try {
    const params = Object.fromEntries(request.nextUrl.searchParams.entries());
    const orderId = params.tran_id;
    const status = params.status || params.Status || "VALID";
    const valId = params.val_id;
    const transactionId = params.bank_tran_id || params.tran_id || "";

    if (!orderId) {
      return NextResponse.redirect(new URL("/courses?payment=error", request.url));
    }

    const db = await getDB();
    const purchase = await queryFirst<any>(
      db, "SELECT * FROM resource_purchases WHERE order_id = ?", [orderId]
    );
    if (!purchase) {
      return NextResponse.redirect(new URL("/courses?payment=error", request.url));
    }

    if (purchase.payment_status === "completed") {
      return NextResponse.redirect(new URL("/courses?payment=success", request.url));
    }

    if (status !== "VALID" && status !== "VALIDATED") {
      await execute(db, "UPDATE resource_purchases SET payment_status = 'failed' WHERE order_id = ?", [orderId]);
      return NextResponse.redirect(new URL(`/courses?payment=failed&order=${orderId}`, request.url));
    }

    if (valId) {
      const service = await SslcommerzService.fromDB(db);
      const validation = await service.validatePayment(valId);
      if (!validation.validated) {
        await execute(db, "UPDATE resource_purchases SET payment_status = 'failed' WHERE order_id = ?", [orderId]);
        return NextResponse.redirect(new URL(`/courses?payment=failed&order=${orderId}`, request.url));
      }
    }

    await execute(db,
      `UPDATE resource_purchases SET payment_status = 'completed', transaction_id = ?, completed_at = datetime('now') WHERE order_id = ?`,
      [transactionId, orderId]
    );

    const workerId = purchase.worker_id;
    const resourceCount = purchase.resource_count;

    const existingLimit = await queryFirst<any>(
      db, "SELECT max_unlocks FROM unlock_limits WHERE worker_id = ?", [workerId]
    );
    const currentMax = existingLimit?.max_unlocks || 0;
    const newMax = currentMax + resourceCount;

    await execute(db,
      `INSERT INTO unlock_limits (worker_id, max_unlocks, set_by, set_at, updated_at)
       VALUES (?, ?, 'payment', datetime('now'), datetime('now'))
       ON CONFLICT(worker_id) DO UPDATE SET max_unlocks = excluded.max_unlocks, updated_at = datetime('now')`,
      [workerId, newMax]
    );

    const worker = await queryFirst<any>(db, "SELECT membership_status FROM workers WHERE worker_id = ?", [workerId]);
    if (worker && worker.membership_status !== "premium") {
      await execute(db, "UPDATE workers SET membership_status = 'premium' WHERE worker_id = ?", [workerId]);
      await execute(db, "UPDATE resource_purchases SET premium_upgraded = 1 WHERE order_id = ?", [orderId]);
    }

    return NextResponse.redirect(new URL("/courses?payment=success", request.url));
  } catch (error) {
    return NextResponse.redirect(new URL("/courses?payment=error", request.url));
  }
}
