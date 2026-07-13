"use client";

import { useState, useEffect, useRef } from "react";
import { testimonials } from "@/data/landing-page-data";

export default function Testimonials() {
  const [slideIdx, setSlideIdx] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => setSlideIdx((p) => (p + 1) % testimonials.length), 4000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  const goTo = (n: number) => {
    setSlideIdx(n);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => setSlideIdx((p) => (p + 1) % testimonials.length), 4000);
  };

  return (
    <div className="rounded-2xl p-5 md:p-6 bg-white border border-border">
      <div className="section-header">
        <div className="badge mx-auto mb-3 border-info/20 bg-info/10 text-info">💬 শিক্ষার্থীদের মতামত</div>
        <h3 className="text-lg md:text-xl font-black text-text">যারা ইতিমধ্যেই সফল হয়েছেন</h3>
        <p className="text-sm font-semibold text-text-secondary mt-1">{testimonials.length} জন শিক্ষার্থীর সাফল্যের গল্প</p>
      </div>

      <div className="overflow-hidden relative">
        <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${slideIdx * 100}%)` }}>
          {testimonials.map((t, i) => (
            <div key={i} className="min-w-full px-2 box-border">
              <div className="p-6 md:p-7 rounded-xl bg-bg border border-border text-center">
                <div className="text-info text-xl mb-2.5">{t.stars} <span className="text-text-secondary text-sm font-bold">{t.rating}</span></div>
                <p className="text-sm text-text leading-relaxed mb-3.5 italic">&ldquo;{t.quote}&rdquo;</p>
                <div className="font-bold text-sm text-info">{t.author}</div>
                <div className="text-xs text-text-secondary font-semibold">{t.label}</div>
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
    </div>
  );
}
