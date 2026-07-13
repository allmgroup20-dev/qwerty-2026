"use client";

import Image from "next/image";
import { useLanguageStore } from "@/lib/store";
import { trainerPhotoGrid } from "@/data/landing-page-data";

export default function TrainerPhotoGrid() {
  const { lang } = useLanguageStore();

  return (
    <div className="rounded-2xl p-5 md:p-6 bg-white border border-border">
      <div className="section-header">
        <div className="badge mx-auto mb-3">👨‍🏫 {lang === "bn" ? "শীর্ষ প্রশিক্ষকবৃন্দ" : "Top Trainers"}</div>
        <h3 className="text-lg md:text-xl font-black text-text">
          {lang === "bn" ? `যেসব তারকা প্রশিক্ষকের কোর্স আপনি ফ্রিতে পাচ্ছেন` : `Star trainers whose courses you get for free`}
        </h3>
        <p className="text-sm font-semibold text-text-secondary mt-1">
          {lang === "bn"
            ? `${trainerPhotoGrid.length} জন তারকা প্রশিক্ষকবৃন্দের কোর্স — সব একসাথে`
            : `Courses from ${trainerPhotoGrid.length} star trainers — all in one place`}
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mt-6">
        {trainerPhotoGrid.map((t, i) => (
          <div
            key={i}
            className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gradient-to-b from-primary/[0.03] to-transparent border border-border hover:border-primary/30 transition-all"
          >
            <div className="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-primary to-orange flex items-center justify-center shadow-md relative">
              {t.image ? (
                <Image src={t.image} alt={lang === "bn" ? t.nameBn : t.nameEn} fill className="object-cover" sizes="64px" />
              ) : (
                <span className="text-2xl font-bold text-white">{(lang === "bn" ? t.nameBn : t.nameEn).charAt(0)}</span>
              )}
            </div>
            <span className="text-xs font-bold text-text text-center leading-tight">
              {lang === "bn" ? t.nameBn : t.nameEn}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
