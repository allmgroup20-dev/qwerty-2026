"use client";

import { useLanguageStore } from "@/lib/store";

const stats = [
  { key: "members", en: "Active Members", bn: "সক্রিয় সদস্য", value: "10K+", suffix: "" },
  { key: "orders", en: "Orders Completed", bn: "অর্ডার সম্পন্ন", value: "50K+", suffix: "" },
  { key: "earnings", en: "Total Payout", bn: "মোট পেআউট", value: "৳5Cr+", suffix: "" },
  { key: "satisfaction", en: "Satisfaction", bn: "সন্তুষ্টি", value: "99%", suffix: "" },
];

export default function StatsCounter() {
  const { lang } = useLanguageStore();

  return (
    <section className="py-16 gradient-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center text-white animate-fade-up" style={{ animationDelay: `${i * 0.15}s` }}>
              <p className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</p>
              <p className="text-sm text-white/60">{lang === "bn" ? stat.bn : stat.en}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
