"use client";

import { useEffect, useRef } from "react";
import { useLanguageStore } from "@/lib/store";

const features = [
  {
    en: "Unilevel MLM",
    bn: "ইউনিলেভেল এমএলএম",
    enDesc: "Powerful unilevel compensation plan with flexible level settings and automated commission distribution.",
    bnDesc: "নমনীয় লেভেল সেটিংস সহ শক্তিশালী ইউনিলেভেল কমপেনসেশন প্ল্যান এবং স্বয়ংক্রিয় কমিশন বিতরণ।",
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    gradient: "from-[#2563EB] to-[#7C3AED]",
  },
  {
    en: "E-Commerce",
    bn: "ই-কমার্স",
    enDesc: "Buy products, manage orders, and earn commissions from every purchase in your network.",
    bnDesc: "পণ্য কিনুন, অর্ডার পরিচালনা করুন এবং আপনার নেটওয়ার্কের প্রতিটি ক্রয় থেকে কমিশন উপার্জন করুন।",
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>
    ),
    gradient: "from-[#059669] to-[#10B981]",
  },
  {
    en: "Multi-Currency",
    bn: "মাল্টি-কারেন্সি",
    enDesc: "Support for BDT, USD, INR and many more currencies with real-time exchange rates.",
    bnDesc: "বিডিটি, ইউএসডি, আইএনআর এবং আরও অনেক কারেন্সির সাপোর্ট রিয়েল-টাইম এক্সচেঞ্জ রেট সহ।",
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    gradient: "from-[#D97706] to-[#F59E0B]",
  },
  {
    en: "AI Powered",
    bn: "এআই সমৃদ্ধ",
    enDesc: "Smart automation with AI chatbot, WhatsApp integration, and intelligent analytics.",
    bnDesc: "এআই চ্যাটবট, হোয়াটসঅ্যাপ ইন্টিগ্রেশন এবং বুদ্ধিমান বিশ্লেষণ সহ স্মার্ট অটোমেশন।",
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z" />
        <path d="M20 12v2a8 8 0 0 1-16 0v-2" />
        <line x1="12" y1="18" x2="12" y2="22" />
      </svg>
    ),
    gradient: "from-[#DC2626] to-[#F59E0B]",
  },
];

function FeatureCard({ feature, index, lang }: { feature: typeof features[0]; index: number; lang: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add("is-visible"); },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="animate-on-scroll group relative p-8 rounded-2xl bg-white border border-[#E2E8F0] hover:border-[#2563EB]/20 hover:shadow-xl transition-all duration-500"
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} p-0.5 mb-6 group-hover:scale-110 transition-transform duration-500`}>
        <div className="w-full h-full rounded-2xl bg-white flex items-center justify-center text-[#1E293B] group-hover:text-transparent group-hover:bg-clip-text transition-all duration-500">
          {feature.icon}
        </div>
      </div>
      <h3 className="text-lg font-bold text-[#1E293B] mb-3">{lang === "bn" ? feature.bn : feature.en}</h3>
      <p className="text-sm text-[#64748B] leading-relaxed">{lang === "bn" ? feature.bnDesc : feature.enDesc}</p>
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#2563EB]/0 via-transparent to-[#7C3AED]/0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none" />
    </div>
  );
}

export default function FeaturesSection() {
  const { lang } = useLanguageStore();

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2563EB]/10 text-[#2563EB] text-sm font-semibold mb-4">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            {lang === "bn" ? "কেন আমাদের বেছে নেবেন" : "Why Choose Us"}
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1E293B] mb-4">
            {lang === "bn" ? "একটি সফল ক্যারিয়ার গড়তে আপনার যা কিছু দরকার" : "Everything You Need to Succeed"}
          </h2>
          <p className="text-lg text-[#64748B] max-w-2xl mx-auto">
            {lang === "bn"
              ? "শক্তিশালী টুলস, স্বয়ংক্রিয় সিস্টেম এবং একটি ডেডিকেটেড প্ল্যাটফর্ম — সবকিছু এক জায়গায়"
              : "Powerful tools, automated systems, and a dedicated platform — all in one place"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <FeatureCard key={i} feature={feature} index={i} lang={lang} />
          ))}
        </div>
      </div>
    </section>
  );
}
