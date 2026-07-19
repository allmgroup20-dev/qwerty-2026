import { NextRequest, NextResponse } from "next/server";
import { execute, queryFirst } from "@/lib/db/queries";
import { getDB } from "@/lib/db";

const BASE_PRICE_PER_RESOURCE = 99;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as { workerId: string; resourceCount: number };
    if (!body.workerId || !body.resourceCount) {
      return NextResponse.json({ error: "workerId and resourceCount required" }, { status: 400 });
    }

    const db = await getDB();
    const basePrice = body.resourceCount * BASE_PRICE_PER_RESOURCE;

    const worker = await queryFirst<{ referral_source: string | null; total_spent: number }>(
      db, "SELECT referral_source, total_spent FROM workers WHERE worker_id = ?", [body.workerId]
    );

    let initialOffer = basePrice;
    let message = `🛒 ${body.resourceCount}টি রিসোর্স = ৳${basePrice.toLocaleString()} (প্রতিটি ৳${BASE_PRICE_PER_RESOURCE})`;

    const isHighValue = (worker?.total_spent || 0) > 5000;
    if (!isHighValue && body.resourceCount < 5) {
      const suggestedCount = body.resourceCount + 1;
      const bundlePrice = suggestedCount * BASE_PRICE_PER_RESOURCE;
      initialOffer = bundlePrice;
      message = `আমি ${suggestedCount}টি রিসোর্স দিচ্ছি মাত্র ৳${bundlePrice.toLocaleString()} এ!`;
    }

    const result = await execute(db,
      `INSERT INTO bargain_sessions (worker_id, resource_count, base_price, current_offer, rounds) VALUES (?, ?, ?, ?, 0)`,
      [body.workerId, body.resourceCount, basePrice, initialOffer]
    );
    const sessionId = result.meta.last_row_id;

    return NextResponse.json({
      sessionId,
      resourceCount: body.resourceCount,
      basePrice,
      currentOffer: initialOffer,
      round: 0,
      message,
      canBargain: initialOffer > BASE_PRICE_PER_RESOURCE,
    });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Internal error" }, { status: 500 });
  }
}
