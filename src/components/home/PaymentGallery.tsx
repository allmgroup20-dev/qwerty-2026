"use client";

import { useState } from "react";
import Image from "next/image";
import { useLanguageStore } from "@/lib/store";
import { galleryImages, paymentGalleryText } from "@/data/landing-page-data";

export default function PaymentGallery() {
  const { lang } = useLanguageStore();
  const [lightbox, setLightbox] = useState<number | null>(null);
  const t = paymentGalleryText;

  return (
    <div className="rounded-2xl p-5 md:p-6 bg-white border border-border">
      <div className="section-header">
        <div className="badge mx-auto mb-3 border-success/20 bg-success/10 text-success">{lang === "bn" ? t.badgeBn : t.badgeEn}</div>
        <h3 className="text-lg md:text-xl font-black text-text">{lang === "bn" ? t.titleBn : t.titleEn}</h3>
        <p className="text-sm font-semibold text-text-secondary mt-1">{lang === "bn" ? t.descBn : t.descEn}</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {galleryImages.map((img, i) => (
          <button
            key={i}
            onClick={() => setLightbox(i)}
            className="group relative aspect-[3/4] rounded-xl overflow-hidden bg-bg border border-border cursor-pointer p-0 hover:shadow-lg transition-all"
          >
            <Image src={img.src} alt={img.alt} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 20vw" />
          </button>
        ))}
      </div>

      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[99999] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button onClick={() => setLightbox(null)} className="absolute top-4 right-4 text-white text-2xl border-none bg-transparent cursor-pointer z-10 w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded-full">✕</button>
          <div className="relative max-w-3xl max-h-[90vh] w-full h-full" onClick={(e) => e.stopPropagation()}>
            <Image src={galleryImages[lightbox].src} alt={galleryImages[lightbox].alt} fill className="object-contain" sizes="(max-width: 768px) 100vw, 800px" />
          </div>
          <div className="absolute bottom-4 left-4 right-4 flex justify-center gap-2">
            {galleryImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setLightbox(i)}
                className={`w-2 h-2 rounded-full border-none cursor-pointer transition-all ${i === lightbox ? "bg-white scale-125" : "bg-white/40"}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
