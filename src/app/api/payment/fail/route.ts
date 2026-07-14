import { NextRequest, NextResponse } from "next/server";
import { execute } from "@/lib/db/queries";
import { getDB } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const orderId = request.nextUrl.searchParams.get("tran_id");

    if (orderId) {
      await execute(await getDB(),
        "UPDATE orders SET order_status = 'failed' WHERE order_id = ?",
        [orderId]
      );
    }

    return NextResponse.redirect(new URL(`/checkout?payment=failed${orderId ? `&order=${orderId}` : ""}`, request.url));
  } catch {
    return NextResponse.redirect(new URL("/checkout?payment=error", request.url));
  }
}
