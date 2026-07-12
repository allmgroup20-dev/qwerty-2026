"use client";
import React from "react";

const stats = [
  { value: "৮৬৬+", label: "সক্রিয় শিক্ষার্থী" },
  { value: "৪.৯★", label: "ফেসবুক মূল্যায়ন" },
  { value: "৮+ বছর", label: "পেশাদার অভিজ্ঞতা" },
  { value: "৫০,০০০+", label: "সর্বোচ্চ মাসিক আয়" },
];

export default function StatsCounter() {
  return (
    <div className="bg-white border-y border-[#E2E8F0] py-3.5 md:py-[18px] w-full">
      <div className="max-w-[1100px] mx-auto flex justify-center items-center flex-wrap gap-[10px_14px] md:gap-4">
        {stats.map((s, i) => (
          <React.Fragment key={s.label}>
            <div className="flex flex-col items-center gap-0.5">
              <span className="text-base md:text-xl font-black text-[#1E293B]">{s.value}</span>
              <span className="text-[10px] md:text-[11px] font-semibold text-[#64748B] tracking-[0.3px]">{s.label}</span>
            </div>
            {i !== stats.length - 1 && <div className="w-px h-6 bg-[#E2E8F0]" />}
          </React.Fragment>
        ))}
        {[
          { icon: "⚡", label: "সাথে সাথে অ্যাক্সেস" },
          { icon: "📚", label: "লাইফটাইম আপডেট" },
          { icon: "✅", label: "২৪ ঘণ্টা ফেরত" },
        ].map((s) => (
          <div key={s.label} className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 border border-white/12 text-[10px] font-semibold text-[#64748B]">
            {s.icon} {s.label}
          </div>
        ))}
      </div>
    </div>
  );
}
