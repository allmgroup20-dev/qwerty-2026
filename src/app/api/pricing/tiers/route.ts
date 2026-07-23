import { NextRequest, NextResponse } from "next/server";

const TIERS = [
  { id: "try", credits: 1, retailPrice: 149, offerPrice: 99, floor: 89, savings: 0, popular: false },
  { id: "mini", credits: 5, retailPrice: 549, offerPrice: 399, floor: 349, savings: 27, popular: false },
  { id: "value", credits: 15, retailPrice: 1299, offerPrice: 899, floor: 749, savings: 31, popular: true },
  { id: "pro", credits: 35, retailPrice: 2499, offerPrice: 1599, floor: 1299, savings: 36, popular: false },
  { id: "mega", credits: 75, retailPrice: 4299, offerPrice: 2499, floor: 1999, savings: 42, popular: false },
];

export async function GET() {
  const publicTiers = TIERS.map(t => ({
    id: t.id, credits: t.credits, retailPrice: t.retailPrice,
    offerPrice: t.offerPrice, savings: t.savings, popular: t.popular,
    pricePerCredit: Math.round(t.offerPrice / t.credits),
    floor: t.floor,
  }));
  return NextResponse.json({ tiers: publicTiers });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as {
      tierId: string; desiredPrice: number; round?: number;
    };
    const tier = TIERS.find(t => t.id === body.tierId);
    if (!tier) return NextResponse.json({ error: "Invalid tier" }, { status: 400 });

    const round = body.round || 1;
    const maxBargainRounds = 3;

    if (round > maxBargainRounds) {
      return NextResponse.json({
        accepted: false, final: true,
        message: "আমরা সর্বোচ্চ চেষ্টা করেছি। শেষ অফারটি বিবেচনা করুন।",
        counterOffer: null,
      });
    }

    if (body.desiredPrice < tier.floor) {
      const gap = Math.round((tier.floor - body.desiredPrice) / 2);
      const counterOffer = Math.min(tier.offerPrice, tier.floor + gap + Math.round(Math.random() * 30));
      return NextResponse.json({
        accepted: false, final: round >= maxBargainRounds,
        message: round === 1
          ? `😅 আপনি অনেক কম বলেছেন! ${tier.credits}টি রিসোর্সের জন্য আমরা ৳${counterOffer} দিতে পারি। একটু বেশি ধরুন।`
          : `🤝 আমরা আরেকটু এগিয়ে এসেছি। ${tier.credits}টি রিসোর্সের জন্য ৳${counterOffer} — কি বলেন?`,
        counterOffer, round: round + 1,
      });
    }

    const finalPrice = Math.max(tier.floor, body.desiredPrice);
    return NextResponse.json({
      accepted: true, final: true,
      message: `🎉 ডিল হয়েছে! ${tier.credits}টি রিসোর্স = ৳${finalPrice.toLocaleString()}। আপনি একজন সত্যিকারের দরদামি!`,
      finalPrice, credits: tier.credits, tierId: tier.id,
    });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
