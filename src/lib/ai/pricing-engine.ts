export interface PriceOffer {
  productId: number;
  productName: string;
  originalPrice: number;
  discountedPrice: number;
  discountPercent: number;
  couponCode: string;
  reason: string;
  expiresIn: string;
}

export function generateDynamicPrice(
  originalPrice: number,
  leadScore: number,
  isPremium: boolean,
  totalOrders: number,
  totalSpent: number
): { discountedPrice: number; discountPercent: number } {
  let discountPercent = 0;

  // VIP/high-score members get better discounts
  if (leadScore >= 80) discountPercent = isPremium ? 25 : 20;
  else if (leadScore >= 60) discountPercent = isPremium ? 20 : 15;
  else if (leadScore >= 40) discountPercent = 10;
  else if (leadScore >= 20) discountPercent = 5;

  // Loyalty bonus: repeat buyers
  if (totalOrders >= 5) discountPercent += 5;
  else if (totalOrders >= 3) discountPercent += 3;

  // High spender bonus
  if (totalSpent >= 50000) discountPercent += 5;

  discountPercent = Math.min(discountPercent, 50);

  const discountedPrice = Math.round(originalPrice * (1 - discountPercent / 100));
  return { discountedPrice, discountPercent };
}

export function generateCouponCode(workerId: string): string {
  const hash = workerId.slice(-4).toUpperCase();
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `AI${rand}${hash}`;
}

export function buildOfferMessage(
  offer: PriceOffer,
  lang: string
): string {
  if (lang === "bn") {
    return [
      `## 🎉 বিশেষ অফার: ${offer.productName}`,
      `মূল মূল্য: ৳${offer.originalPrice}`,
      `ছাড়後的 মূল্য: ৳${offer.discountedPrice} (${offer.discountPercent}% ছাড়)`,
      `কুপন কোড: \`${offer.couponCode}\``,
      `অফারটি ${offer.expiresIn} এর মধ্যে ব্যবহার করুন!`,
      ``,
      offer.reason,
    ].join("\n");
  }

  return [
    `## 🎉 Special Offer: ${offer.productName}`,
    `Original: ৳${offer.originalPrice}`,
    `Discounted: ৳${offer.discountedPrice} (${offer.discountPercent}% off)`,
    `Coupon: \`${offer.couponCode}\``,
    `Valid for ${offer.expiresIn}!`,
    ``,
    offer.reason,
  ].join("\n");
}
