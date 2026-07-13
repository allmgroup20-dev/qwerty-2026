"use client";

import { useLanguageStore } from "@/lib/store";
import { trainerPhotoGrid } from "@/data/landing-page-data";

export default function TrainerPhotoGrid() {
  const { lang } = useLanguageStore();

  return (
    <div className="rounded-2xl p-5 md:p-6 bg-white border border-border">
      <div className="section-header">
        <div className="badge mx-auto mb-3">👨‍🏫 {lang === "bn" ? "আমাদের ট্রেইনার" : "Our Trainers"}</div>
        <h3 className="text-lg md:text-xl font-black text-text">
          {lang === "bn" ? "এক্সপার্ট ট্রেইনার টিম" : "Expert Trainer Team"}
        </h3>
        <p className="text-sm font-semibold text-text-secondary mt-1">
          {lang === "bn"
            ? `${trainerPhotoGrid.length} জন অভিজ্ঞ মেন্টর — প্রতিটি কোর্সই হাতে-কলমে শেখানো হয়`
            : `${trainerPhotoGrid.length} experienced mentors — every course is hands-on`}
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mt-6">
        {trainerPhotoGrid.map((t, i) => (
          <div
            key={i}
            className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gradient-to-b from-primary/[0.03] to-transparent border border-border hover:border-primary/30 transition-all"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-orange flex items-center justify-center text-2xl shadow-md">
              {(lang === "bn" ? t.nameBn : t.nameEn).charAt(0)}
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
