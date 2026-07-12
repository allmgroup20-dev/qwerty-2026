"use client";

import { useState } from "react";

const images = [
  "https://jobayergroup.com/wp-content/uploads/2026/04/image.jpg",
  "https://jobayergroup.com/wp-content/uploads/2026/04/image-1.jpg",
  "https://jobayergroup.com/wp-content/uploads/2026/04/image-2.jpg",
  "https://jobayergroup.com/wp-content/uploads/2026/04/image-3.jpg",
  "https://jobayergroup.com/wp-content/uploads/2026/04/image-4.jpg",
  "https://jobayergroup.com/wp-content/uploads/2026/04/image-5.jpg",
  "https://jobayergroup.com/wp-content/uploads/2026/04/image-6.jpg",
  "https://jobayergroup.com/wp-content/uploads/2026/04/image-7.jpg",
  "https://jobayergroup.com/wp-content/uploads/2026/04/image-8.jpg",
  "https://jobayergroup.com/wp-content/uploads/2026/04/image-9.jpg",
];

export default function PaymentGallery() {
  const [open, setOpen] = useState(false);

  return (
    <section className="max-w-[1120px] mx-auto mt-6 md:mt-8 px-3.5 md:px-5">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-center gap-2 p-3.5 rounded-[14px] border-2 border-dashed border-[#E2E8F0] bg-white text-[#1D4ED8] font-extrabold text-sm cursor-pointer transition-all hover:border-[#1D4ED8] hover:bg-[rgba(29,78,216,.04)]"
      >
        🧾 {open ? "সংকুচিত করুন" : "পেমেন্ট স্ক্রিনশট দেখুন (১০টি)"}
        <span className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}>▼</span>
      </button>
      {open && (
        <div className="mt-3">
          <div className="flex w-fit gap-2 px-4 py-2.5 mx-auto mb-3.5 rounded-full bg-[rgba(29,78,216,.08)] border border-[rgba(29,78,216,.15)] font-extrabold text-sm text-[#1E3A8A]">
            💰 ব্যাংক, বিকাশ ও নগদে পেমেন্টের বাস্তব ছবি — দেখুন!
          </div>
          <h3 className="text-lg md:text-xl font-black text-[#1E293B] mb-1 text-center">📸 রিয়েল পার্টনার — রিয়েল পেমেন্ট প্রমাণ</h3>
          <p className="text-sm font-semibold text-[#64748B] mb-5 text-center">
            নিচে আমাদের সফল শিক্ষার্থীদের ব্যাংক, বিকাশ ও নগদে টাকা পাওয়ার বাস্তব ছবি — আপনার চোখের সামনে প্রমাণ।
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 md:gap-3">
            {images.map((src, i) => (
              <div key={i} className="rounded-lg overflow-hidden">
                <img src={src} alt={`Payment proof ${i + 1}`} loading="lazy" className="w-full h-[200px] sm:h-[280px] md:h-[320px] object-cover rounded-lg" />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
