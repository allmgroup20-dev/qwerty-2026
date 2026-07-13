"use client";

import { useLanguageStore } from "@/lib/store";
import { stats } from "@/data/landing-page-data";

export default function StatsCounter() {
  const { lang } = useLanguageStore();

  return (
    <div className="bg-white rounded-2xl border border-border py-4 px-4">
      <div className="flex justify-center items-center flex-wrap gap-x-4 gap-y-2">
        {stats.map((item, i) => {
          if (item.separator) return <div key={i} className="w-px h-6 bg-border" />;
          if (item.chipBn || item.chipEn) {
            return (
              <span key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border text-xs font-semibold text-text-secondary leading-none">
                {lang === "bn" ? item.chipBn : item.chipEn}
              </span>
            );
          }
          return (
            <div key={i} className="flex flex-col items-center gap-0.5">
              <span className="text-sm sm:text-base font-black text-text leading-tight">{item.num}</span>
              <span className="text-xs sm:text-xs font-semibold text-text-secondary leading-tight">{lang === "bn" ? item.labelBn : item.labelEn}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
