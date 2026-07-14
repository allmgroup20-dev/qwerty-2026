"use client";

import Image from "next/image";
import { useLanguageStore } from "@/lib/store";
import { platforms } from "@/data/landing-page-data";

export default function PlatformLogoGrid() {
  const { lang } = useLanguageStore();

  return (
    <div className="rounded-2xl p-5 md:p-6 bg-white border border-border">
      <div className="section-header">
        <div className="badge mx-auto mb-3">🌐 {lang === "bn" ? "ফ্রিল্যান্সিং মার্কেটপ্লেস" : "Freelance Marketplaces"}</div>
        <h3 className="text-lg md:text-xl font-black text-text">
          {lang === "bn" ? "যেসব প্ল্যাটফর্মে কাজ শেখানো হয়" : "Platforms We Teach On"}
        </h3>
        <p className="text-sm font-semibold text-text-secondary mt-1">
          {lang === "bn"
            ? `${platforms.length} টি জনপ্রিয় অনলাইন মার্কেটপ্লেস — কোর্স শেষেই সরাসরি কাজ শুরু করুন`
            : `${platforms.length} popular online marketplaces — start working right after the course`}
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
        {platforms.map((p, i) => (
          <div
            key={i}
            className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-primary/[0.03] to-transparent border border-border hover:border-primary/30 transition-all"
          >
            <div className="w-10 h-10 rounded-lg bg-white border border-border overflow-hidden relative flex items-center justify-center shrink-0 shadow-sm">
              <Image src={p.logo} alt={lang === "bn" ? p.nameBn : p.name} width={40} height={40} className="object-contain" />
            </div>
            <span className="text-sm font-bold text-text">
              {lang === "bn" ? p.nameBn : p.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
