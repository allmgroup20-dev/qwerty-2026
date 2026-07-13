"use client";

import Link from "next/link";
import { useLanguageStore } from "@/lib/store";
import { howItWorksSteps } from "@/data/landing-page-data";

export default function HowItWorks() {
  const { lang } = useLanguageStore();

  return (
    <div className="rounded-2xl p-5 md:p-6 bg-white border border-border">
      <div className="section-header">
        <div className="badge mx-auto mb-3">🚀 {lang === "bn" ? "কিভাবে কাজ করে" : "How It Works"}</div>
        <h3 className="text-lg md:text-xl font-black text-text">
          {lang === "bn" ? "আপনার নতুন ডিজিটাল ক্যারিয়ারে ৩টি ধাপ" : "Your 3-Step Path to a New Digital Career"}
        </h3>
      </div>

      <div className="grid gap-4 mt-6 sm:grid-cols-3">
        {howItWorksSteps.map((s, i) => (
          <div key={i} className="flex flex-col items-center text-center gap-3 p-5 rounded-xl bg-gradient-to-b from-primary/[0.03] to-bg border border-border">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-orange flex items-center justify-center text-2xl shadow-md">{s.icon}</div>
            <div>
              <h4 className="font-black text-sm text-text">{lang === "bn" ? s.titleBn : s.titleEn}</h4>
              <p className="text-xs text-text-secondary font-semibold mt-1 leading-relaxed">{lang === "bn" ? s.descBn : s.descEn}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-5">
        <Link href="/login" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-info to-info/80 text-white font-black text-sm no-underline shadow-lg shadow-info/30 hover:-translate-y-0.5 transition-all cursor-pointer">
          ✅ {lang === "bn" ? "এখনই শুরু করুন →" : "Start Now →"}
        </Link>
      </div>
    </div>
  );
}
