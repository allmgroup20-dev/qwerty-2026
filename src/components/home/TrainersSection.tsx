"use client";

import { useEffect, useRef } from "react";

const trainers = [
  { name: "আয়মান সাদিক", en: "Ayman Sadiq", org: "10 Minute School", price: "৪৫,০০০" },
  { name: "ঝংকার মাহবুব", en: "Jhankar Mahbub", org: "Programming Hero", price: "৫৫,০০০" },
  { name: "মুনজারিন শহীদ", en: "Munzarin Shahid", org: "10 Minute School", price: "২৫,০০০" },
  { name: "খালিদ ফারহান", en: "Khalid Farhan", org: "eShikhon", price: "৩০,০০০" },
  { name: "ফ্রিল্যান্সার নাসিম", en: "Freelancer Nasim", org: "Freelancing Care", price: "২৮,০০০" },
  { name: "তাহসান খান", en: "Tahsan Khan", org: "Tahsan Khan IT", price: "৩৫,০০০" },
  { name: "সাদমান সাদিক", en: "Sadman Sadik", org: "Creative Hub", price: "২০,০০০" },
  { name: "জুবায়ের হোসাইন", en: "Jubayer Hossain", org: "MSB Academy", price: "২৫,০০০" },
  { name: "আবতাহি ইপ্তেসাম", en: "Abtahi Iptesam", org: "Skill Up", price: "১৮,০০০" },
  { name: "মাহাদে হাসান", en: "Mahade Hasan", org: "Ghoori Learning", price: "১৫,০০০" },
  { name: "ভৈভব সিসিনিটি", en: "Vaibhav Sisinity", org: "Digital marketing", price: "৩২,০০০" },
  { name: "সোবান তারিক", en: "Soban Tariq", org: "Soban Tariq", price: "২২,০০০" },
];

const gradients = [
  "from-[#2563EB] to-[#7C3AED]", "from-[#059669] to-[#10B981]", "from-[#D97706] to-[#F59E0B]",
  "from-[#DC2626] to-[#F97316]", "from-[#7C3AED] to-[#EC4899]", "from-[#0891B2] to-[#06B6D4]",
  "from-[#4F46E5] to-[#6366F1]", "from-[#BE185D] to-[#DB2777]", "from-[#115E59] to-[#14B8A6]",
  "from-[#92400E] to-[#D97706]", "from-[#1E40AF] to-[#3B82F6]", "from-[#6D28D9] to-[#8B5CF6]",
];

function TrainerCard({ trainer, index }: { trainer: typeof trainers[0]; index: number }) {
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
    <div ref={ref} className="animate-on-scroll group relative p-5 rounded-2xl bg-white border border-[#E2E8F0] hover:border-[#2563EB]/20 hover:shadow-xl transition-all duration-500 text-center" style={{ transitionDelay: `${index * 60}ms` }}>
      <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${gradients[index % gradients.length]} flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
        <span className="text-xl font-black text-white">{trainer.name[0]}</span>
      </div>
      <h3 className="text-sm font-bold text-text mb-1">{trainer.name}</h3>
      <p className="text-xs text-text-secondary mb-3">{trainer.org}</p>
      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F59E0B]/10 text-[#D97706] text-xs font-bold">
        <s className="text-[#94A3B8]">৳{trainer.price}</s>
        <span className="bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white px-2 py-0.5 rounded-full text-[10px]">ফ্রি</span>
      </div>
    </div>
  );
}

export default function TrainersSection() {
  return (
    <section className="py-24 md:py-32 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#7C3AED]/10 text-[#7C3AED] text-sm font-semibold mb-4">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            Top Trainers
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-text mb-4">আমাদের শীর্ষ ১২ প্রশিক্ষক</h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            দেশের সেরা ১২ জন প্রশিক্ষকের ২৩০টির বেশি কোর্স — সবকিছু একসাথে, আজীবনের জন্য।
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {trainers.map((t, i) => <TrainerCard key={i} trainer={t} index={i} />)}
        </div>
      </div>
    </section>
  );
}
