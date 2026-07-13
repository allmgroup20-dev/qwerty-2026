"use client";

import { trustBadges, trustSectionData } from "@/data/landing-page-data";
import { useLanguageStore } from "@/lib/store";
import Link from "next/link";

export default function TrustSection() {
  const { lang } = useLanguageStore();
  const t = trustSectionData;

  return (
    <div className="rounded-2xl p-6 md:p-8 text-center bg-gradient-to-br from-primary/5 via-orange-500/5 to-primary/5 border border-border shadow-lg">
      <div className="badge mx-auto mb-3 border-action/20 bg-action/10 text-action">{lang === "bn" ? t.badgeBn : t.badgeEn}</div>

      <h2 className="text-xl md:text-2xl font-black text-text mb-2 leading-tight">
        {lang === "bn" ? t.titleBn : t.titleEn}
      </h2>
      <p className="text-sm md:text-base font-semibold text-text-secondary max-w-xl mx-auto mb-6 leading-relaxed">
        {lang === "bn" ? t.descBn : t.descEn}
      </p>

      <div className="flex flex-wrap gap-3 justify-center mb-6">
        {trustBadges.map((badge) => (
          <span key={badge.textBn} className="flex items-center gap-1.5 px-4 py-3 rounded-xl bg-white border border-border font-extrabold text-sm shadow-sm text-text">
            {badge.icon} {lang === "bn" ? badge.textBn : badge.textEn}
          </span>
        ))}
      </div>

      <Link href="/register" className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-orange to-orange-dark text-white font-bold text-lg shadow-xl shadow-orange/30 hover:shadow-orange/40 hover:-translate-y-0.5 transition-all duration-300">
        {lang === "bn" ? t.ctaBn : t.ctaEn}
      </Link>

      <p className="text-xs text-text-secondary font-medium mt-4">
        {lang === "bn" ? t.footerBn : t.footerEn}
      </p>
    </div>
  );
}
