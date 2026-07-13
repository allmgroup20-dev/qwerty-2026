"use client";

import Link from "next/link";
import { useLanguageStore } from "@/lib/store";
import { howItWorksSteps, howItWorksFooterNoteBn, howItWorksFooterNoteEn } from "@/data/landing-page-data";

export default function HowItWorks() {
  const { lang } = useLanguageStore();

  return (
    <div className="rounded-2xl p-5 md:p-6 bg-gradient-to-br from-primary/5 to-primary/5 border border-primary/20">
      <div className="section-header">
        <div className="badge mx-auto mb-3">🚀 {lang === "bn" ? "কিভাবে কাজ করে" : "How It Works"}</div>
        <h3 className="text-lg md:text-xl font-black text-text">{lang === "bn" ? "আপনার নতুন ডিজিটাল ক্যারিয়ারে ৩টি ধাপ" : "Your 3-Step Path to a New Digital Career"}</h3>
      </div>

      <div className="grid gap-3 md:gap-4 mb-4">
        {howItWorksSteps.map((step, i) => (
          <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-white border border-border shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-info to-orange flex items-center justify-center text-white font-black text-base flex-shrink-0">
              {lang === "bn" ? step.num : step.numEn}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-sm text-text mb-1">{step.icon} {lang === "bn" ? step.titleBn : step.titleEn}</h4>
              <p className="text-xs text-text-secondary leading-relaxed">
                {lang === "bn" ? step.descBn : step.descEn} <span className="font-bold text-info">{lang === "bn" ? step.highlightBn : step.highlightEn}</span>
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center p-3.5 rounded-xl bg-warning/10 border border-warning/20 font-bold text-sm text-warning leading-relaxed">
        {lang === "bn" ? howItWorksFooterNoteBn : howItWorksFooterNoteEn}
      </div>

      <div className="text-center mt-4">
        <Link href="/register" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-orange to-orange-dark text-white font-black text-sm no-underline shadow-lg shadow-orange/30 hover:-translate-y-0.5 transition-all cursor-pointer">
          {lang === "bn" ? "🚀 এখনই রেজিস্টার করুন →" : "🚀 Register Now →"}
        </Link>
      </div>
    </div>
  );
}
