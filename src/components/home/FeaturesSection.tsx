"use client";

import { useLanguageStore } from "@/lib/store";

const features = [
  {
    en: "Unilevel MLM",
    bn: "ইউনিলেভেল এমএলএম",
    enDesc: "Powerful unilevel compensation plan with flexible level settings",
    bnDesc: "নমনীয় লেভেল সেটিংস সহ শক্তিশালী ইউনিলেভেল কমপেনসেশন প্ল্যান",
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    color: "text-primary",
    bgColor: "bg-primary/5",
  },
  {
    en: "E-Commerce",
    bn: "ই-কমার্স",
    enDesc: "Buy products and earn commissions from every purchase",
    bnDesc: "পণ্য কিনুন এবং প্রতিটি ক্রয় থেকে কমিশন উপার্জন করুন",
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>
    ),
    color: "text-action",
    bgColor: "bg-action/5",
  },
  {
    en: "Multi-Currency",
    bn: "মাল্টি-কারেন্সি",
    enDesc: "Support for BDT, USD, INR and many more currencies",
    bnDesc: "বিডিটি, ইউএসডি, আইএনআর এবং আরও অনেক কারেন্সির সাপোর্ট",
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    color: "text-secondary-dark",
    bgColor: "bg-yellow-50",
  },
  {
    en: "AI Powered",
    bn: "এআই সমৃদ্ধ",
    enDesc: "Smart automation with AI and WhatsApp integration",
    bnDesc: "এআই এবং হোয়াটসঅ্যাপ ইন্টিগ্রেশন সহ স্মার্ট অটোমেশন",
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z" />
        <path d="M20 12v2a8 8 0 0 1-16 0v-2" />
        <line x1="12" y1="18" x2="12" y2="22" />
      </svg>
    ),
    color: "text-accent",
    bgColor: "bg-accent/5",
  },
];

export default function FeaturesSection() {
  const { lang } = useLanguageStore();

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="section-title">
            {lang === "bn" ? "কেন আমাদের বেছে নেবেন" : "Why Choose Us"}
          </h2>
          <p className="section-subtitle">
            {lang === "bn"
              ? "একটি সফল ক্যারিয়ার গড়তে আপনার যা কিছু দরকার"
              : "Everything you need to build a successful career"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <div
              key={i}
              className="card hover:shadow-xl hover:-translate-y-1 text-center group"
            >
              <div className={`w-14 h-14 rounded-2xl ${feature.bgColor} ${feature.color} flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform`}>
                {feature.icon}
              </div>
              <h3 className="font-bold text-lg text-primary mb-3">
                {lang === "bn" ? feature.bn : feature.en}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {lang === "bn" ? feature.bnDesc : feature.enDesc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
