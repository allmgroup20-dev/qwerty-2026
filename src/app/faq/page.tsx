"use client";

import { useState } from "react";
import { useLanguageStore } from "@/lib/store";
import { faqs } from "@/data/landing-page-data";

export default function FAQPage() {
  const { lang } = useLanguageStore();
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-bg">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        <div className="text-center mb-8">
          <div className="badge mx-auto mb-3">🤔 {lang === "bn" ? "আপনার মনে কি প্রশ্ন আছে?" : "Have Questions?"}</div>
          <h1 className="text-2xl md:text-3xl font-black text-text">{lang === "bn" ? "সচরাচর জিজ্ঞাসা" : "Frequently Asked Questions"}</h1>
          <p className="text-text-secondary font-semibold mt-2">
            {lang === "bn" ? "আপনার মনে প্রশ্ন আসা স্বাভাবিক। নিচের উত্তরগুলো দেখে নিন।" : "Questions are natural. Check the answers below."}
          </p>
        </div>

        <div className="grid gap-3">
          {faqs.map((faq, i) => (
            <div key={i} className="rounded-xl bg-white border border-border overflow-hidden">
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                aria-expanded={openIdx === i}
                className="w-full flex items-center justify-between p-4 md:p-5 text-sm font-bold text-text bg-transparent border-none cursor-pointer text-left font-[inherit] hover:bg-primary/5 transition-colors"
              >
                <span>{lang === "bn" ? faq.qBn : faq.qEn}</span>
                <span className={`text-text-secondary text-xs transition-transform duration-200 flex-shrink-0 ml-3 ${openIdx === i ? "rotate-180" : ""}`}>▼</span>
              </button>
              <div
                className="overflow-hidden transition-all duration-300 ease-in-out"
                style={{ maxHeight: openIdx === i ? "300px" : "0px", padding: openIdx === i ? "0 16px 16px" : "0 16px" }}
              >
                <p className="text-sm text-text-secondary leading-relaxed m-0">{lang === "bn" ? faq.aBn : faq.aEn}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
