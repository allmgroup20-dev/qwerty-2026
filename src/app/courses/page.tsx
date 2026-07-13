"use client";

import { useState } from "react";
import Image from "next/image";
import { useLanguageStore } from "@/lib/store";
import { courseCategories, trainers, platforms } from "@/data/landing-page-data";

function getTrainer(name: string) {
  return trainers.find((t) => t.name === name);
}

export default function CoursesPage() {
  const { lang } = useLanguageStore();
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="min-h-screen bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        <div className="text-center mb-8">
          <div className="badge mx-auto mb-3">📚 {lang === "bn" ? "আমাদের কোর্স সমূহ" : "Our Courses"}</div>
          <h1 className="text-2xl md:text-3xl font-black text-text">{lang === "bn" ? `২৩০টির বেশি কোর্স — ${courseCategories.length}টি ক্যাটাগরিতে` : `230+ Courses in ${courseCategories.length} Categories`}</h1>
          <p className="text-text-secondary font-semibold mt-2 max-w-2xl mx-auto">
            {lang === "bn"
              ? "দেশের সেরা ১২ জন প্রশিক্ষকের কোর্স। সব কোর্সে আজীবন অ্যাক্সেস। পছন্দ না হলে ২৪ ঘণ্টায় টাকা ফেরত।"
              : "Courses from Bangladesh's top 12 trainers. Lifetime access. 24h money-back guarantee."}
          </p>
        </div>

        <div className="mb-8 rounded-2xl p-5 bg-white border border-border">
          <h3 className="font-black text-sm text-text mb-3 text-center">{lang === "bn" ? "🏛️ অংশগ্রহণকারী প্ল্যাটফর্মসমূহ" : "🏛️ Participating Platforms"}</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {platforms.map((p) => (
              <div key={p.name} className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-bg border border-border min-w-[80px]">
                <div className="w-10 h-10 rounded-lg overflow-hidden bg-white relative flex items-center justify-center">
                  <Image src={p.logo} alt={p.nameBn} width={36} height={36} className="object-contain" />
                </div>
                <span className="text-[10px] font-bold text-text text-center leading-tight">{lang === "bn" ? p.nameBn : p.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex overflow-x-auto gap-2 pb-2 mb-6 scrollbar-hide">
          {courseCategories.map((cat, i) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(i)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap border transition-all ${
                activeTab === i
                  ? "bg-primary/10 border-primary/30 text-primary shadow-sm"
                  : "bg-white border-border text-text-secondary hover:border-primary/20"
              }`}
            >
              <span>{cat.icon}</span>
              <span>{lang === "bn" ? cat.titleBn : cat.titleEn}</span>
            </button>
          ))}
        </div>

        {courseCategories.map((cat, i) => (
          <div key={cat.id} className={i === activeTab ? "block" : "hidden"}>
            <div className="rounded-2xl p-5 md:p-6 bg-white border border-border">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl">{cat.icon}</div>
                <div>
                  <h2 className="text-lg font-black text-text">{lang === "bn" ? cat.titleBn : cat.titleEn}</h2>
                </div>
              </div>

              <div className="grid gap-2 mb-5">
                {cat.courses.map((course, ci) => (
                  <div key={ci} className="flex items-center justify-between p-3.5 rounded-xl bg-bg border border-border">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-sm font-black text-primary">{ci + 1}</div>
                      <span className="font-bold text-sm text-text">{lang === "bn" ? course.nameBn : course.nameEn}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-info/5 border border-info/10">
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <span className="text-sm font-bold text-text">👨‍🏫 {lang === "bn" ? "প্রশিক্ষক:" : "Trainers:"}</span>
                  {cat.trainers.map((tname) => {
                    const t = getTrainer(tname);
                    return t ? (
                      <div key={t.name} className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-border">
                        <div className="w-7 h-7 rounded-full overflow-hidden relative flex-shrink-0">
                          <Image src={t.image} alt={t.nameBn} fill className="object-cover" sizes="28px" />
                        </div>
                        <span className="font-bold text-xs text-text">{t.nameBn}</span>
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
