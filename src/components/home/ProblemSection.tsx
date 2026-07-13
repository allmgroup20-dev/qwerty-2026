"use client";

import { useLanguageStore } from "@/lib/store";
import { sectionText } from "@/data/landing-page-data";

export default function ProblemSection() {
  const { lang } = useLanguageStore();
  const s = sectionText;

  return (
    <div className="rounded-2xl p-5 md:p-6 bg-white border border-border shadow-lg">
      <div className="badge mx-auto mb-5 border-action/20 bg-action/10 text-action">
        {lang === "bn" ? s.problem.badgeBn : s.problem.badgeEn}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-4">
          {s.problem.items.map((item, i) => (
            <div key={i} className="rounded-2xl p-4 md:p-5 bg-[#FEF2F2] border border-[#FECACA]">
              <div className="flex items-start gap-3">
                <span className="text-xl shrink-0">{item.icon}</span>
                <div>
                  <h3 className="text-sm font-extrabold text-text">{lang === "bn" ? item.titleBn : item.titleEn}</h3>
                  <p className="text-xs font-semibold text-text-secondary mt-0.5">{lang === "bn" ? item.descBn : item.descEn}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          {s.solution.items.map((item, i) => (
            <div key={i} className="rounded-2xl p-4 md:p-5 bg-[#F0FDF4] border border-[#BBF7D0]">
              <div className="flex items-start gap-3">
                <span className="text-xl shrink-0">{item.icon}</span>
                <div>
                  <h3 className="text-sm font-extrabold text-text">{lang === "bn" ? item.titleBn : item.titleEn}</h3>
                  <p className="text-xs font-semibold text-text-secondary mt-0.5">{lang === "bn" ? item.descBn : item.descEn}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
