import { NextRequest, NextResponse } from "next/server";
import { execute } from "@/lib/db/queries";
import { getDB } from "@/lib/db";
import { SslcommerzService } from "@/lib/payment/sslcommerz";

const siteUrl = process.env.SITE_URL || "http://localhost:3000";

export async function POST(request: NextRequest) {
  try {
    const { workerId, productId, productName, quantity, totalAmount, currency, shippingAddress, cusName, cusPhone, cusEmail } = await request.json() as {
      workerId: string;
      productId?: number;
      productName?: string;
      quantity?: number;
      totalAmount: number;
      currency?: string;
      shippingAddress?: string;
      cusName: string;
      cusPhone: string;
      cusEmail?: string;
    };

    if (!workerId || !cusName || !cusPhone || !totalAmount) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const env = await getDB();
    const service = await SslcommerzService.fromDB(env);
    const orderId = `ORD${Date.now().toString(36).toUpperCase()}${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    await execute(env,
      `INSERT INTO orders (order_id, worker_id, product_id, product_name, quantity, total_amount, currency, payment_method, payment_status, order_status, shipping_address)
       VALUES (?, ?, ?, ?, ?, ?, ?, 'sslcommerz', 'pending', 'pending', ?)`,
      [orderId, workerId, productId || null, productName || null, quantity || 1, totalAmount, currency || "BDT", shippingAddress || null]
    );

    const gatewayUrl = await service.initPayment({
      total_amount: totalAmount,
      currency: currency || "BDT",
      tran_id: orderId,
      success_url: `${siteUrl}/api/payment/success`,
      fail_url: `${siteUrl}/api/payment/fail`,
      cancel_url: `${siteUrl}/api/payment/cancel`,
      cus_name: cusName,
      cus_phone: cusPhone,
      cus_email: cusEmail || "",
      cus_add1: shippingAddress || "",
      cus_city: "Dhaka",
      cus_country: "Bangladesh",
      product_name: productName || "Product",
      product_category: "general",
      product_profile: "general",
    });

    return NextResponse.json({ gatewayUrl, orderId }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Payment initialization failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
