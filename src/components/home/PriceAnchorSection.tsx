"use client";

import { useLanguageStore } from "@/lib/store";
import { priceAnchorData } from "@/data/landing-page-data";

export default function PriceAnchorSection() {
  const { lang } = useLanguageStore();
  const d = priceAnchorData;

  return (
    <div className="rounded-2xl p-5 md:p-6 bg-gradient-to-br from-primary/5 to-primary/10 border-2 border-primary/20 text-center">
      <div className="text-xs font-semibold text-text-secondary mb-1 tracking-wider uppercase">
        {lang === "bn" ? "🔥 ভ্যালু শক — নিজেই তুলনা করে দেখুন" : "🔥 Value Shock — Compare Yourself"}
      </div>
      <div className="text-sm font-semibold text-text-secondary mb-2">
        ২৩০+ কোর্সের বাজারমূল্য: <span className="line-through text-text-secondary">{lang === "bn" ? d.marketValueBn : d.marketValueEn}</span>
      </div>
      <div className="text-xl md:text-2xl font-black text-text my-3">
        {lang === "bn" ? "আজকের অফার মূল্য:" : "Today's Offer Price:"} <span className="text-success text-3xl md:text-4xl">{lang === "bn" ? d.offerPriceBn : d.offerPriceEn}</span>
      </div>
      <div className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-warning/10 border-2 border-warning/20 text-warning font-black text-base md:text-lg">
        🟢 {lang === "bn" ? "আপনি বাঁচাচ্ছেন:" : "You Save:"} <strong>{lang === "bn" ? d.savingsBn : d.savingsEn}</strong>
      </div>
      <div className="flex flex-wrap gap-2 justify-center mt-4">
        <span className="px-3 py-1.5 rounded-lg bg-warning/5 text-warning text-xs font-bold">টেন মিনিট স্কুল: ৮৫,০০০+ টাকা</span>
        <span className="px-3 py-1.5 rounded-lg bg-warning/5 text-warning text-xs font-bold">ঘুড়ি লার্নিং: ৫৫,০০০+ টাকা</span>
        <span className="px-3 py-1.5 rounded-lg bg-warning/10 text-warning text-xs font-bold">আমাদের অফার: মাত্র ৯৯ টাকা</span>
      </div>
    </div>
  );
}
