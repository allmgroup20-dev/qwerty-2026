"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguageStore } from "@/lib/store";
import { heroData, testimonials, heroSectionBadgeBn, heroSectionBadgeEn, heroFeatureGridItems } from "@/data/landing-page-data";

function toBn(v: number) {
  return String(v).replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[parseInt(d, 10)]);
}

export default function HeroSection() {
  const { lang } = useLanguageStore();
  const [liveCount, setLiveCount] = useState(866);

  useEffect(() => {
    const id = setInterval(() => setLiveCount((p) => p + Math.floor(Math.random() * 3) + 1), 15000);
    return () => clearInterval(id);
  }, []);

  const h = heroData;

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0B1121] via-[#111B33] to-[#0F1A2E]">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-info/10 blur-[120px] animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-warning/10 blur-[100px] animate-blob" style={{ animationDelay: "-3s" }} />
        <div className="absolute top-1/3 left-1/2 w-[300px] h-[300px] rounded-full bg-success/10 blur-[80px] animate-blob" style={{ animationDelay: "-6s" }} />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 md:pt-12 md:pb-24">
        <div className="text-center animate-fade-up">
          <div className="flex flex-wrap gap-2 justify-center mb-4">
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm text-white text-sm font-bold">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
              {toBn(liveCount)}+ {lang === "bn" ? h.liveCountLabelBn : h.liveCountLabelEn}
            </span>
            {h.badges.map((badge, i) => (
              <span key={i} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-white/80 text-xs font-bold">
                {badge.icon} {lang === "bn" ? badge.textBn : badge.textEn}
              </span>
            ))}
          </div>

          <div className="inline-flex gap-2 px-4 py-2.5 mx-auto mb-3.5 rounded-full bg-primary/10 border border-primary/20 font-extrabold text-sm text-primary">
            {lang === "bn" ? heroSectionBadgeBn : heroSectionBadgeEn}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight mb-4">
            <span className="text-white">{lang === "bn" ? h.headlineBn : h.headlineEn}</span>
          </h1>

          <p className="text-base md:text-lg text-white/60 max-w-3xl mx-auto mb-6 leading-relaxed">
            {lang === "bn" ? h.subheadBn : h.subheadEn}
          </p>

          <div className="max-w-3xl mx-auto mb-8 grid gap-4 md:grid-cols-2">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-left">
              <p className="text-warning font-bold text-sm mb-1">⚡ {lang === "bn" ? "সমস্যা:" : "Problem:"}</p>
              <p className="text-white/70 text-sm leading-relaxed">{lang === "bn" ? h.problemBn : h.problemEn}</p>
            </div>
            <div className="p-4 rounded-xl bg-success/10 border border-success/20 text-left">
              <p className="text-success font-bold text-sm mb-1">✅ {lang === "bn" ? "সমাধান:" : "Solution:"}</p>
              <p className="text-white/70 text-sm leading-relaxed">{lang === "bn" ? h.solutionBn : h.solutionEn}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 max-w-xl mx-auto mb-6">
            {heroFeatureGridItems.map((item, i) => (
              <div key={i} className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10">
                <span className="text-base">{item.icon}</span>
                <span className="text-xs font-bold text-white/80">{lang === "bn" ? item.textBn : item.textEn}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 justify-center mb-6">
            <Link href={h.ctaHref} className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-orange to-orange-dark text-white font-bold text-lg shadow-xl shadow-orange/30 hover:shadow-orange/40 hover:-translate-y-0.5 transition-all duration-300">
              {lang === "bn" ? h.ctaBn : h.ctaEn} →
            </Link>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 max-w-2xl mx-auto">
            <p className="text-white/80 text-sm leading-relaxed font-bold">
              {lang === "bn"
                ? `🏆 ${testimonials.length} জন শিক্ষার্থী ইতিমধ্যেই সফল হয়েছেন! তাদের গড় মাসিক আয় ২৫,০০০+ টাকা`
                : `🏆 ${testimonials.length} students have already succeeded! Their average monthly income is 25,000+ BDT`}
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg to-transparent pointer-events-none" />
    </section>
  );
}
