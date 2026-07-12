"use client";

import Link from "next/link";

const chips = [
  "✅ ২৩০+ প্রিমিয়াম কোর্স",
  "✅ লাইফটাইম অ্যাক্সেস",
  "✅ ২৪ ঘণ্টা নিঃশর্ত ফেরত",
  "✅ SSL সুরক্ষিত",
  "✅ সাথে সাথে এক্সেস",
];

export default function FinalCtaSection() {
  return (
    <section className="max-w-[820px] mx-auto mt-8 md:mt-10 px-3.5 md:px-5">
      <div className="rounded-[20px] p-6 md:p-7 text-center bg-[linear-gradient(135deg,rgba(29,78,216,.06),rgba(234,88,12,.10),rgba(29,78,216,.06))] border border-[#E2E8F0] shadow-lg">
        <h2 className="text-xl md:text-2xl font-black text-text mb-2 leading-tight">
          ৩০ সেকেন্ডেই শুরু করুন আপনার আয়ের যাত্রা!
        </h2>
        <p className="text-sm md:text-base font-semibold text-text-secondary max-w-[650px] mx-auto mb-4 leading-relaxed">
          নিচে আপনার নাম-ফোন দিন, সাথে সাথেই সব কোর্স ও অ্যাক্সেস চলে আসবে!
        </p>

        <div className="flex flex-wrap gap-2 justify-center mb-4">
          <span className="px-3 py-1.5 rounded-full bg-[rgba(30,58,90,.1)] text-[#1D4ED8] text-[12px] font-extrabold">
            ⚡ ইতিমধ্যে ৮৬৬+ সক্রিয় শিক্ষার্থী যুক্ত
          </span>
        </div>

        <div className="flex flex-wrap gap-2 justify-center mb-5">
          {chips.map((chip) => (
            <span key={chip} className="px-3 py-1.5 rounded-full bg-[rgba(30,58,90,.1)] text-[#1D4ED8] text-[11px] font-extrabold">
              {chip}
            </span>
          ))}
        </div>

        <Link href="/register" className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#FF6B35] to-[#E85D2C] text-white font-bold text-lg shadow-xl shadow-orange-500/30 hover:shadow-orange-500/40 hover:-translate-y-0.5 transition-all duration-300 animate-pulse">
          🚀 এখনই রেজিস্টার করুন →
        </Link>
      </div>
    </section>
  );
}
