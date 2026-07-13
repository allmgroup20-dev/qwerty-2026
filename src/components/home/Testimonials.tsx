"use client";

import { useState, useEffect, useRef } from "react";
import { useLanguageStore } from "@/lib/store";
import { testimonials, chatTestimonials, gridTestimonials } from "@/data/landing-page-data";

export default function Testimonials() {
  const { lang } = useLanguageStore();
  const [slideIdx, setSlideIdx] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [showAllGrid, setShowAllGrid] = useState(false);

  useEffect(() => {
    intervalRef.current = setInterval(() => setSlideIdx((p) => (p + 1) % testimonials.length), 4000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  const goTo = (n: number) => {
    setSlideIdx(n);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => setSlideIdx((p) => (p + 1) % testimonials.length), 4000);
  };

  const visibleGrid = showAllGrid ? gridTestimonials : gridTestimonials.slice(0, 4);

  return (
    <div className="rounded-2xl p-5 md:p-6 bg-white border border-border">
      {/* Carousel */}
      <div className="section-header">
        <div className="badge mx-auto mb-3 border-info/20 bg-info/10 text-info">
          💬 {lang === "bn" ? "শিক্ষার্থীদের মতামত" : "Student Testimonials"}
        </div>
        <h3 className="text-lg md:text-xl font-black text-text">
          {lang === "bn" ? "যারা ইতিমধ্যেই সফল হয়েছেন" : "Those Who Have Already Succeeded"}
        </h3>
        <p className="text-sm font-semibold text-text-secondary mt-1">
          {testimonials.length + chatTestimonials.length + gridTestimonials.length}{" "}
          {lang === "bn" ? "জন শিক্ষার্থীর সাফল্যের গল্প" : "success stories of our students"}
        </p>
      </div>

      <div className="overflow-hidden relative">
        <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${slideIdx * 100}%)` }}>
          {testimonials.map((t, i) => (
            <div key={i} className="min-w-full px-2 box-border">
              <div className="p-6 md:p-7 rounded-xl bg-bg border border-border text-center">
                <div className="text-info text-xl mb-2.5">{t.stars} <span className="text-text-secondary text-sm font-bold">{t.rating}</span></div>
                <p className="text-sm text-text leading-relaxed mb-3.5 italic">&ldquo;{lang === "bn" ? t.quoteBn : t.quoteEn}&rdquo;</p>
                <div className="font-bold text-sm text-info">{lang === "bn" ? t.authorBn : t.authorEn}</div>
                <div className="text-xs text-text-secondary font-semibold">{lang === "bn" ? t.labelBn : t.labelEn}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-2 mt-3.5">
          {testimonials.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} className={`w-2.5 h-2.5 rounded-full border-none p-0 cursor-pointer transition-all ${i === slideIdx ? "bg-info scale-125" : "bg-border"}`} />
          ))}
        </div>
      </div>

      {/* Chat-style testimonials */}
      <div className="mt-8 space-y-4">
        {chatTestimonials.map((t, i) => (
          <div key={i} className="bg-white border border-border rounded-2xl p-4 md:p-5 flex gap-3.5 relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-info to-orange-400" />
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-info to-orange-400 flex items-center justify-center text-lg shrink-0 mt-0.5">
              {t.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className="font-bold text-sm text-text">
                  {lang === "bn" ? t.nameBn : t.nameEn}
                </span>
                <span className="text-[10px] font-semibold text-text-secondary whitespace-nowrap">
                  {lang === "bn" ? t.platformBn : t.platformEn}
                </span>
              </div>
              <div className="text-[#f59e0b] text-xs mt-0.5">{t.stars}</div>
              <p className="text-sm text-text leading-relaxed mt-1.5">
                &ldquo;{lang === "bn" ? t.msgBn : t.msgEn}&rdquo;
              </p>
              <span className="text-[10px] font-semibold text-text-secondary mt-1.5 block">
                {lang === "bn" ? t.timeBn : t.timeEn}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Grid testimonials */}
      <div className="mt-8">
        <h4 className="text-base md:text-lg font-bold text-text mb-4 text-center">
          {lang === "bn" ? "আরও সফল শিক্ষার্থীদের মতামত" : "More Success Stories"}
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {gridTestimonials.map((t, i) => (
            <div
              key={i}
              className={`bg-white border border-border rounded-xl p-4 ${!showAllGrid && i >= 4 ? "hidden" : ""}`}
            >
              <div className="text-[#f59e0b] text-xs">{t.stars}</div>
              <span className="text-text-secondary text-xs font-bold ml-1">{t.rating}</span>
              <div className="font-bold text-sm text-text mt-1.5">
                {lang === "bn" ? t.nameBn : t.nameEn}
              </div>
              <p className="text-sm text-text leading-relaxed mt-1.5">
                &ldquo;{lang === "bn" ? t.textBn : t.textEn}&rdquo;
              </p>
            </div>
          ))}
        </div>
        {!showAllGrid && gridTestimonials.length > 4 && (
          <div className="text-center mt-4">
            <button
              onClick={() => setShowAllGrid(true)}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-info text-white text-sm font-bold border-none cursor-pointer hover:bg-info/90 transition-colors"
            >
              {lang === "bn" ? "আরো মতামত দেখুন" : "Show More Testimonials"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
