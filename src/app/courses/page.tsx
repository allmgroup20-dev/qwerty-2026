"use client";

import { useState } from "react";
import Image from "next/image";
import { useLanguageStore } from "@/lib/store";
import { courseCategories, trainers, platforms, bundlePricingData, tab0OverviewItems, googleDriveData } from "@/data/landing-page-data";
import TrainerPhotoGrid from "@/components/home/TrainerPhotoGrid";

function getTrainer(name: string) {
  return trainers.find((t) => t.name === name);
}

export default function CoursesPage() {
  const { lang } = useLanguageStore();
  const [activeTab, setActiveTab] = useState(0);

  const activeCat = courseCategories[activeTab];

  return (
    <div className="min-h-screen bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12 space-y-6">
        {/* Header */}
        <div className="text-center mb-4">
          <div className="badge mx-auto mb-3">📚 {lang === "bn" ? "আমাদের কোর্স সমূহ" : "Our Courses"}</div>
          <h1 className="text-2xl md:text-3xl font-black text-text">{lang === "bn" ? `২৩০টির বেশি কোর্স — ${courseCategories.length}টি ক্যাটাগরিতে` : `230+ Courses in ${courseCategories.length} Categories`}</h1>
          <p className="text-text-secondary font-semibold mt-2 max-w-2xl mx-auto">
            {lang === "bn"
              ? "দেশের সেরা ১২ জন প্রশিক্ষকের কোর্স। সব কোর্সে আজীবন অ্যাক্সেস। পছন্দ না হলে ২৪ ঘণ্টায় টাকা ফেরত।"
              : "Courses from Bangladesh's top 12 trainers. Lifetime access. 24h money-back guarantee."}
          </p>
        </div>

        {/* Participating Platforms */}
        <div className="rounded-2xl p-5 bg-white border border-border">
          <div className="badge mx-auto mb-3">🏛️ {lang === "bn" ? "আমাদের প্রতিষ্ঠানসমূহ" : "Our Institutions"}</div>
          <p className="text-sm font-bold text-text-secondary text-center -mt-2 mb-4">
            {lang === "bn"
              ? "যেসব প্ল্যাটফর্ম ও প্রতিষ্ঠানের কোর্স আপনি ফ্রিতে পাচ্ছেন"
              : "Courses you get for free from these platforms & institutions"}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
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

        {/* Tab Buttons */}
        <div className="rounded-2xl pt-5 pb-2 px-5 bg-gradient-to-br from-primary/5 to-primary/5 border border-primary/20">
          <div className="section-header mb-4">
            <div className="badge mx-auto mb-3">
              📚 {lang === "bn" ? "৯৯ টাকায় আপনি কী পাচ্ছেন" : "What You Get at ৳99"}
            </div>
            <h3 className="text-lg md:text-xl font-black text-text">
              {lang === "bn" ? `১০টি বিভাগ — ২৩০+ প্রিমিয়াম কোর্স` : `10 Categories — 230+ Premium Courses`}
            </h3>
            <p className="text-sm font-semibold text-text-secondary mt-1">
              {lang === "bn" ? "প্রতিটি ট্যাবে ক্লিক করে সব ক্যাটাগরির কোর্সের সম্পূর্ণ তালিকা দেখুন" : "Click on each tab to explore the full list of courses in every category"}
            </p>
          </div>

          <div className="flex overflow-x-auto gap-2 pb-2 mb-2 scrollbar-hide">
            {courseCategories.map((cat, i) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(i)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap border transition-all shrink-0 cursor-pointer ${
                  activeTab === i
                    ? "bg-primary text-white shadow-lg shadow-primary/30"
                    : "bg-white border-border text-text-secondary hover:border-primary/30 hover:text-text"
                }`}
              >
                <span>{cat.icon}</span>
                <span>{lang === "bn" ? cat.titleBn : cat.titleEn}</span>
              </button>
            ))}
          </div>

          {/* Active Tab Content */}
          {activeCat && (
            <div className="rounded-xl bg-white border border-border p-5 md:p-6 space-y-4 mb-5">
              <h4 className="font-black text-lg text-text">
                {activeCat.icon} {lang === "bn" ? activeCat.titleBn : activeCat.titleEn}
              </h4>

              {activeCat.id !== "knowledge-skills" && activeCat.priceBn && (
                <div className="flex items-center justify-center gap-2 text-sm">
                  <span className="font-bold text-text-secondary line-through">
                    {lang === "bn" ? activeCat.priceBn : activeCat.priceEn}৳
                  </span>
                  <span className="text-text-secondary font-bold text-xs">→</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-primary to-orange text-white text-xs font-extrabold">৳৯৯</span>
                </div>
              )}

              {activeCat.descriptionBn && activeCat.id === "knowledge-skills" ? (
                <p className="text-xs font-semibold text-text-secondary -mt-2">
                  {lang === "bn" ? activeCat.descriptionBn : activeCat.descriptionEn}
                </p>
              ) : activeCat.id !== "knowledge-skills" ? (
                <>
                  {activeCat.descriptionBn && (
                    <p className="text-xs font-semibold text-text-secondary -mt-2">
                      {lang === "bn" ? activeCat.descriptionBn : activeCat.descriptionEn}
                    </p>
                  )}
                  <p className="text-xs font-semibold text-text-secondary -mt-2">
                    {activeCat.courses.length} {lang === "bn" ? "টি কোর্স" : "Courses"}
                  </p>
                </>
              ) : null}

              {/* Tab 0: জ্ঞান — Overview items */}
              {activeCat.id === "knowledge-skills" && (
                <div className="grid gap-3 sm:grid-cols-2 mt-4">
                  {tab0OverviewItems.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-r from-primary/[0.03] to-transparent border border-border">
                      <span className="text-lg shrink-0 mt-0.5">{item.icon}</span>
                      <div>
                        <span className="font-bold text-sm text-text leading-tight block">
                          {lang === "bn" ? item.titleBn : item.titleEn}
                        </span>
                        <span className="text-xs text-text-secondary font-semibold mt-1 block">
                          {lang === "bn" ? item.descBn : item.descEn}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* All other tabs: course list */}
              {activeCat.id !== "knowledge-skills" && (
                <>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {activeCat.courses.map((course, ci) => (
                      <div key={ci} className="flex items-center justify-between p-3.5 rounded-xl bg-bg border border-border">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-sm font-black text-primary shrink-0">{ci + 1}</div>
                          <span className="font-bold text-sm text-text leading-tight">{lang === "bn" ? course.nameBn : course.nameEn}</span>
                        </div>
                        <span className="ml-2 px-2 py-0.5 rounded-full bg-gradient-to-r from-primary to-orange text-white text-[10px] font-extrabold shrink-0">৳৯৯</span>
                      </div>
                    ))}
                  </div>

                  {activeCat.trainers.length > 0 && (
                    <div className="p-4 rounded-xl bg-info/5 border border-info/10">
                      <div className="flex flex-wrap items-center justify-center gap-3">
                        <span className="text-sm font-bold text-text">👨‍🏫 {lang === "bn" ? "প্রশিক্ষক:" : "Trainers:"}</span>
                        {activeCat.trainers.map((tname) => {
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
                  )}
                </>
              )}
            </div>
          )}

          {/* Bundle Pricing Row */}
          <div className="p-5 rounded-xl bg-gradient-to-br from-primary/10 to-orange/5 border-2 border-primary/20 text-center mb-5">
            <div className="text-sm font-bold text-text-secondary">
              {lang === "bn" ? "মোট বান্ডেল মূল্য:" : "Total Bundle Value:"}
            </div>
            <div className="flex items-center justify-center gap-3 mt-2">
              <span className="text-lg font-bold text-text-secondary line-through">
                {lang === "bn" ? bundlePricingData.totalValueBn : bundlePricingData.totalValueEn}
              </span>
              <span className="text-3xl font-black text-warning">
                {lang === "bn" ? bundlePricingData.offerPriceBn : bundlePricingData.offerPriceEn}
              </span>
            </div>
            <div className="mt-2 text-sm font-bold text-warning">
              🎉 {lang === "bn" ? bundlePricingData.savingsTextBn : bundlePricingData.savingsTextEn}
            </div>
          </div>
        </div>

        {/* Google Drive Preview */}
        <div className="rounded-2xl p-5 md:p-6 bg-white border border-border">
          <div className="section-header">
            <div className="badge mx-auto mb-3">📁 {lang === "bn" ? googleDriveData.badgeBn : googleDriveData.badgeEn}</div>
            <h3 className="text-lg md:text-xl font-black text-text">{lang === "bn" ? googleDriveData.titleBn : googleDriveData.titleEn}</h3>
          </div>
          <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {googleDriveData.folders.map((f, i) => (
              <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-primary/[0.03] to-transparent border border-border hover:border-primary/30 transition-all">
                <span className="text-xl">{f.icon}</span>
                <span className="font-bold text-sm text-text leading-tight">
                  {lang === "bn" ? f.nameBn : f.nameEn}
                </span>
              </div>
            ))}
          </div>
          <p className="text-center text-xs font-bold text-text-secondary mt-4">
            {lang === "bn" ? googleDriveData.footerBn : googleDriveData.footerEn}
          </p>
        </div>

        {/* Trainer Photo Grid */}
        <TrainerPhotoGrid />
      </div>
    </div>
  );
}
