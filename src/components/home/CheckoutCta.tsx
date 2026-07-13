"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguageStore } from "@/lib/store";
import { checkoutCtaData } from "@/data/landing-page-data";

export default function CheckoutCta() {
  const { lang } = useLanguageStore();
  const d = checkoutCtaData;
  const [timeLeft, setTimeLeft] = useState(d.timerDuration);

  useEffect(() => {
    const id = setInterval(
      () => setTimeLeft((p) => (p <= d.timerMin ? d.timerDuration : p - 1)),
      1000,
    );
    return () => clearInterval(id);
  }, [d.timerDuration, d.timerMin]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="rounded-2xl p-5 md:p-7 bg-gradient-to-br from-[#0B1121] via-[#111B33] to-[#0F1A2E] border border-white/10 text-center shadow-2xl">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-warning/10 border-2 border-warning/20 text-warning font-black text-sm mb-4">
        <span className="text-base">⏳</span>
        <span>0{minutes}:{seconds.toString().padStart(2, "0")}</span>
      </div>

      <h2 className="text-xl md:text-2xl font-black text-white mb-3 leading-tight">
        {lang === "bn" ? d.headlineBn : d.headlineEn}
      </h2>

      <p className="text-sm md:text-base font-semibold text-white/70 max-w-xl mx-auto mb-5 leading-relaxed">
        {lang === "bn" ? d.descBn : d.descEn}
      </p>

      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-success/10 border border-success/20 text-success text-xs font-bold mb-6">
        🎯 {lang === "bn" ? "ইতিমধ্যে ৮৬৬+ সক্রিয় শিক্ষার্থী যুক্ত" : "866+ Active Students Already Joined"}
      </div>

      <div className="flex items-center justify-center gap-3 mb-6">
        <span className="text-lg md:text-xl font-bold text-white/50 line-through">
          {lang === "bn" ? d.priceOriginalBn : d.priceOriginalEn}
        </span>
        <span className="text-3xl md:text-4xl font-black text-success">
          {lang === "bn" ? d.priceOfferBn : d.priceOfferEn}
        </span>
        <span className="px-3 py-1.5 rounded-lg bg-warning/20 text-warning text-xs font-black">
          {lang === "bn" ? d.discountLabelBn : d.discountLabelEn}
        </span>
      </div>

      <div className="flex flex-wrap gap-2 justify-center mb-6">
        {d.badges.map((b, i) => (
          <span key={i} className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-bold">
            {b.icon} {lang === "bn" ? b.textBn : b.textEn}
          </span>
        ))}
      </div>

      <Link
        href="/register"
        className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-orange to-orange-dark text-white font-bold text-lg shadow-xl shadow-orange/30 hover:shadow-orange/40 hover:-translate-y-0.5 transition-all duration-300"
      >
        {lang === "bn" ? d.ctaBn : d.ctaEn}
      </Link>

      <div className="flex flex-wrap gap-3 justify-center mt-6">
        {d.paymentBrands.map((b, i) => (
          <span
            key={i}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold border ${
              b.style === "bkash"
                ? "bg-[#E2136E]/10 border-[#E2136E]/30 text-[#E2136E]"
                : b.style === "nagad"
                  ? "bg-[#ED8B00]/10 border-[#ED8B00]/30 text-[#ED8B00]"
                  : b.style === "rocket"
                    ? "bg-[#CE1126]/10 border-[#CE1126]/30 text-[#CE1126]"
                    : "bg-white/5 border-white/10 text-white"
            }`}
          >
            {lang === "bn" ? b.name : b.nameEn}
          </span>
        ))}
      </div>
    </div>
  );
}
