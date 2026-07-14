import { NextRequest, NextResponse } from "next/server";
import { queryFirst } from "@/lib/db/queries";
import { getDB } from "@/lib/db";
import { SslcommerzService } from "@/lib/payment/sslcommerz";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get("orderId");
    const transactionId = searchParams.get("transactionId");

    if (!orderId && !transactionId) {
      return NextResponse.json({ error: "orderId or transactionId required" }, { status: 400 });
    }

    const field = orderId ? "order_id" : "transaction_id";
    const value = orderId || transactionId;

    const order = await queryFirst<{
      order_id: string;
      payment_status: string;
      transaction_id: string;
      total_amount: number;
      currency: string;
      order_status: string;
    }>(
      await getDB(),
      `SELECT order_id, payment_status, transaction_id, total_amount, currency, order_status FROM orders WHERE ${field} = ?`,
      [value]
    );

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({
      orderId: order.order_id,
      paymentStatus: order.payment_status,
      transactionId: order.transaction_id,
      amount: order.total_amount,
      currency: order.currency,
      orderStatus: order.order_status,
    });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
