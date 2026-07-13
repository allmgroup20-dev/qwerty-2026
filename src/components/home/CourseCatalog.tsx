"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguageStore } from "@/lib/store";
import { courseCategories, trainers, platforms, platformPrices, trainerPrices } from "@/data/landing-page-data";

function getCategoryValue(trainerNames: string[]): number {
  return trainerNames.reduce((sum, name) => sum + (trainerPrices[name] || 0), 0);
}

function formatPrice(amount: number): string {
  if (amount >= 100000) return `${(amount / 100000).toFixed(1)}L`;
  if (amount >= 1000) return `${(amount / 1000).toFixed(0)}K`;
  return amount.toString();
}

export default function CourseCatalog() {
  const { lang } = useLanguageStore();
  const [activeTab, setActiveTab] = useState(courseCategories[0]?.id || "");

  const activeCategory = courseCategories.find((c) => c.id === activeTab);

  return (
    <div className="rounded-2xl p-5 md:p-6 bg-gradient-to-br from-primary/5 to-primary/5 border border-primary/20">
      <div className="section-header">
        <div className="badge mx-auto mb-3">
          {lang === "bn" ? "দেখুন — ২৩০+ কোর্সে আপনি কী পাচ্ছেন" : "See What You Get with 230+ Courses"}
        </div>
        <h3 className="text-lg md:text-xl font-black text-text">
          {lang === "bn"
            ? `২৩০+ প্রিমিয়াম কোর্স — ${courseCategories.length}টি বিভাগে`
            : `230+ Premium Courses in ${courseCategories.length} Categories`}
        </h3>
        <p className="text-sm font-semibold text-text-secondary mt-1">
          {lang === "bn"
            ? `দেশের সেরা ${trainers.length} জন প্রশিক্ষকের কোর্স`
            : `Courses from Bangladesh's top ${trainers.length} trainers`}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mt-6 mb-6">
        {courseCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveTab(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === cat.id
                ? "bg-primary text-white shadow-lg shadow-primary/30"
                : "bg-white border border-border text-text-secondary hover:border-primary/30 hover:text-text"
            }`}
          >
            {cat.icon} {lang === "bn" ? cat.titleBn : cat.titleEn}
          </button>
        ))}
      </div>

      {activeCategory && (
        <div className="rounded-xl bg-white border border-border p-5 md:p-6 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-black text-lg text-text">
                {activeCategory.icon} {lang === "bn" ? activeCategory.titleBn : activeCategory.titleEn}
              </h4>
              <p className="text-xs font-semibold text-text-secondary mt-0.5">
                {activeCategory.courses.length} {lang === "bn" ? "টি কোর্স" : "Courses"}
                {" — "}
                <span className="text-success font-extrabold">
                  {lang === "bn" ? "মোট ভ্যালু: " : "Total Value: "}৳{formatPrice(getCategoryValue(activeCategory.trainers))}+
                </span>
              </p>
            </div>
          </div>

          <div className="space-y-2">
            {activeCategory.courses.map((course, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-primary/[0.03] to-transparent border border-border"
              >
                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-primary/10 text-primary font-black text-xs shrink-0">
                  {idx + 1}
                </span>
                <span className="font-semibold text-sm text-text">
                  {lang === "bn" ? course.nameBn : course.nameEn}
                </span>
              </div>
            ))}
          </div>

          <div>
            <h5 className="font-black text-sm text-text mb-3">
              👨‍🏫 {lang === "bn" ? "প্রশিক্ষকবৃন্দ" : "Trainers"}
            </h5>
            <div className="flex flex-wrap gap-2">
              {activeCategory.trainers.map((tName) => {
                const trainer = trainers.find((t) => t.name === tName);
                const price = trainerPrices[tName] || 0;
                if (!trainer) return null;
                return (
                  <div
                    key={tName}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-border"
                  >
                    <div className="w-8 h-8 rounded-lg overflow-hidden bg-gradient-to-br from-info to-orange relative shrink-0">
                      <Image src={trainer.image} alt={trainer.nameBn} fill className="object-cover" sizes="32px" />
                    </div>
                    <div>
                      <span className="font-bold text-xs text-text block leading-tight">
                        {lang === "bn" ? trainer.nameBn : trainer.name}
                      </span>
                      <span className="font-bold text-[10px] text-success leading-tight">৳{formatPrice(price)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <h5 className="font-black text-sm text-text mb-3">
              🏛️ {lang === "bn" ? "প্ল্যাটফর্ম" : "Platforms"}
            </h5>
            <div className="flex flex-wrap gap-2">
              {activeCategory.platformLogos.map((logoPath) => {
                const platform = platforms.find((p) => p.logo === logoPath);
                if (!platform) return null;
                const price = platformPrices[platform.name] || 0;
                return (
                  <div
                    key={logoPath}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-border"
                  >
                    <div className="w-8 h-8 rounded-lg overflow-hidden bg-gray-100 relative shrink-0">
                      <Image src={platform.logo} alt={platform.nameBn} fill className="object-contain p-1" sizes="32px" />
                    </div>
                    <div>
                      <span className="font-bold text-xs text-text block leading-tight">
                        {lang === "bn" ? platform.nameBn : platform.name}
                      </span>
                      <span className="font-bold text-[10px] text-success leading-tight">৳{formatPrice(price)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <div className="text-center mt-5">
        <Link
          href="/courses"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-orange to-orange-dark text-white font-black text-sm no-underline shadow-lg shadow-orange/30 hover:-translate-y-0.5 transition-all cursor-pointer"
        >
          📚 {lang === "bn" ? "সম্পূর্ণ ক্যাটালগ দেখুন →" : "View Full Catalog →"}
        </Link>
      </div>
    </div>
  );
}
