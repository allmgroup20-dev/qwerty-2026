"use client";

import { useState } from "react";

export default function GoogleDrivePreview() {
  const [open, setOpen] = useState(false);

  const chips = [
    "💼 ফ্রিল্যান্সিং ও আয়",
    "🌐 ওয়েব ডেভেলপমেন্ট",
    "🎨 গ্রাফিক্স ও ভিডিও",
    "🛒 ই-কমার্স",
    "🗣️ ভাষা ও চাকরি",
    "📱 অ্যাপ ও গেম",
    "🔐 সাইবার সিকিউরিটি",
    "📒 নোটস",
  ];

  return (
    <section className="max-w-[1120px] mx-auto mt-6 md:mt-8 px-3.5 md:px-5">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-center gap-2 p-3.5 rounded-[14px] border-2 border-dashed border-border bg-white text-[#1D4ED8] font-extrabold text-sm cursor-pointer transition-all hover:border-[#1D4ED8] hover:bg-[rgba(30,58,90,.04)]"
      >
        📂 {open ? "সংকুচিত করুন" : "প্রিভিউ দেখুন — গুগল ড্রাইভে কী আছে"}
        <span className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}>▼</span>
      </button>
      {open && (
        <div className="mt-3 rounded-[18px] bg-white border border-border shadow-lg overflow-hidden">
          <div className="flex items-center gap-2.5 p-3.5 border-b border-border">
            <span className="text-xl">📁</span>
            <span className="font-extrabold text-sm text-[#1E293B]">জোবায়ের গ্রুপ পেশা — মাস্টার বান্ডেল (২৩০+ কোর্স)</span>
            <span className="ml-auto px-3 py-1 rounded-full bg-primary/10 text-[#1D4ED8] text-[11px] font-extrabold animate-pulse">🟢 লাইভ</span>
          </div>
          <div className="p-3.5">
            <div className="flex items-center gap-2 p-2.5 rounded-[10px] bg-primary/5 border border-[rgba(29,78,216,.12)] mb-2 font-bold text-xs text-[#1E293B]">
              <span className="text-lg">📂</span>
              ✅ রেজিস্টার করলেই সব খুলে যাবে — সাথে সাথে!
              <span className="ml-auto text-[11px] text-[#64748B] font-semibold">⚡ ১ সেকেন্ড</span>
            </div>
            <div className="flex flex-wrap gap-2 p-3">
              {chips.map((chip) => (
                <span key={chip} className="px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-[12px] font-bold text-[#1E293B]">{chip}</span>
              ))}
            </div>
          </div>
          <div className="p-3.5 border-t border-border text-center bg-[linear-gradient(135deg,rgba(29,78,216,.06),rgba(234,88,12,.04))]">
            <span className="text-sm font-bold text-[#64748B]">
              ⚡ এখনই রেজিস্টার করলে সঙ্গে সঙ্গে গুগল ড্রাইভে <strong className="text-[#1D4ED8]">সব খুলে যাবে!</strong> 🚀
            </span>
          </div>
        </div>
      )}
    </section>
  );
}
