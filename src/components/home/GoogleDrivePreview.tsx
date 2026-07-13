"use client";

import { useLanguageStore } from "@/lib/store";
import { googleDriveData } from "@/data/landing-page-data";

export default function GoogleDrivePreview() {
  const { lang } = useLanguageStore();
  const d = googleDriveData;

  return (
    <div className="rounded-2xl p-5 md:p-6 bg-white border border-border shadow-lg">
      <div className="badge mx-auto mb-5 border-[#4285F4]/20 bg-[#4285F4]/10 text-[#4285F4]">
        {lang === "bn" ? d.badgeBn : d.badgeEn}
      </div>

      <div className="rounded-2xl border border-border bg-white overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-gray-50 to-white border-b border-border">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-[#4285F4]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            <span className="text-sm font-bold text-text">{lang === "bn" ? d.titleBn : d.titleEn}</span>
          </div>
          <span className="text-[11px] font-extrabold px-2.5 py-1 rounded-full bg-success/10 text-success border border-success/20">
            {lang === "bn" ? d.statusBn : d.statusEn}
          </span>
        </div>

        <div className="p-4 md:p-5">
          <div className="flex flex-wrap gap-2.5">
            {d.folders.map((f, i) => (
              <span key={i} className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-2xl bg-blue-50 border border-blue-100 text-sm font-bold text-text shadow-sm">
                {f.icon} {lang === "bn" ? f.nameBn : f.nameEn}
              </span>
            ))}
          </div>
        </div>

        <div className="px-4 py-3 bg-gradient-to-r from-primary/5 to-primary/10 border-t border-border text-center">
          <span className="text-xs font-bold text-text-secondary">
            {lang === "bn" ? d.footerBn : d.footerEn}
          </span>
        </div>
      </div>
    </div>
  );
}
