import { NextRequest, NextResponse } from "next/server";
import { execute } from "@/lib/db/queries";
import { getDB } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const orderId = request.nextUrl.searchParams.get("tran_id");

    if (orderId) {
      await execute(await getDB(),
        "UPDATE orders SET order_status = 'cancelled' WHERE order_id = ?",
        [orderId]
      );
    }

    return NextResponse.redirect(new URL(`/checkout?payment=cancelled${orderId ? `&order=${orderId}` : ""}`, request.url));
  } catch (error) {
    console.error("Payment cancel error:", error);
    return NextResponse.redirect(new URL("/checkout?payment=error", request.url));
  }
}
