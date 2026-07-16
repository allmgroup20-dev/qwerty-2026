export interface ProductPricing {
  price: number;
  minPrice: number;
  maxPrice: number;
  aiPriceEnabled: boolean;
}

export interface CustomerProfile {
  totalOrders: number;
  totalSpent: number;
  referralCount: number;
  avgResponseTimeMs: number;
  previousBargainRounds: number;
  sentiment: "cold" | "neutral" | "interested" | "high_interest";
  isReturningCustomer: boolean;
  lastPurchaseDays?: number;
}

export interface BargainState {
  rounds: number;
  lastOffer: number;
  conversationId: string;
}

const INTEREST_THRESHOLD_MS = 30000;
const LOYAL_ORDER_THRESHOLD = 3;
const REFERRAL_THRESHOLD = 2;

export function analyzeCustomerSentiment(profile: CustomerProfile): CustomerProfile["sentiment"] {
  if (profile.totalOrders >= LOYAL_ORDER_THRESHOLD && profile.lastPurchaseDays && profile.lastPurchaseDays < 30) {
    return "high_interest";
  }
  if (profile.avgResponseTimeMs < INTEREST_THRESHOLD_MS && profile.totalOrders > 0) {
    return "interested";
  }
  if (profile.avgResponseTimeMs < INTEREST_THRESHOLD_MS * 2) {
    return "neutral";
  }
  return "cold";
}

export function getPriceForCustomer(
  product: ProductPricing,
  customer: CustomerProfile,
  bargainState?: BargainState,
): { offeredPrice: number; message: string } {
  if (!product.aiPriceEnabled || product.minPrice <= 0) {
    return { offeredPrice: product.price, message: `মূল্য: ৳${product.price.toLocaleString()}` };
  }

  const effectiveMin = product.minPrice || product.price * 0.6;
  const effectiveMax = product.maxPrice || product.price * 1.2;

  const sentiment = customer.sentiment || analyzeCustomerSentiment(customer);
  let baseOffer: number;

  if (sentiment === "high_interest") {
    baseOffer = product.price;
  } else if (customer.totalOrders >= LOYAL_ORDER_THRESHOLD) {
    baseOffer = effectiveMin + (product.price - effectiveMin) * 0.3;
  } else if (customer.referralCount >= REFERRAL_THRESHOLD) {
    baseOffer = product.price - (product.price - effectiveMin) * 0.4;
  } else if (customer.isReturningCustomer) {
    baseOffer = product.price - (product.price - effectiveMin) * 0.15;
  } else {
    baseOffer = effectiveMax;
  }

  let finalPrice = baseOffer;

  if (bargainState) {
    const reductionPerRound = (product.price - effectiveMin) / 4;
    finalPrice = product.price - reductionPerRound * (bargainState.rounds + 1);
    finalPrice = Math.max(effectiveMin, finalPrice);
  }

  finalPrice = Math.round(Math.max(effectiveMin, Math.min(effectiveMax, finalPrice)));

  if (bargainState) {
    return { offeredPrice: finalPrice, message: generateBargainMessage(finalPrice, product.price, bargainState.rounds) };
  }

  if (finalPrice < product.price) {
    return { offeredPrice: finalPrice, message: `আপনার জন্য বিশেষ মূল্য: ৳${finalPrice.toLocaleString()} (সাধারণ মূল্য ৳${product.price.toLocaleString()})` };
  }

  return { offeredPrice: finalPrice, message: `মূল্য: ৳${finalPrice.toLocaleString()}` };
}

function generateBargainMessage(offer: number, original: number, round: number): string {
  if (round === 0) {
    return `আপনার জন্য বিশেষ অফার: ৳${offer.toLocaleString()} (আসল দাম ৳${original.toLocaleString()})`;
  }
  if (round === 1) {
    return `ঠিক আছে, সর্বনিম্ন ৳${offer.toLocaleString()} দিতে পারছি।`;
  }
  if (round === 2) {
    return `আপনার জন্যই শেষ বার ৳${offer.toLocaleString()} বললাম।`;
  }
  return `দুঃখিত, ৳${offer.toLocaleString()} এর কমে সম্ভব নয়।`;
}

export function canContinueBargaining(
  bargainState: BargainState,
  product: ProductPricing,
): boolean {
  const effectiveMin = product.minPrice || product.price * 0.6;
  return bargainState.rounds < 4 && bargainState.lastOffer > effectiveMin;
}
