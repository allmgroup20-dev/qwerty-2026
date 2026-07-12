"use client";

import { useEffect, useRef } from "react";

const features = [
  {
    icon: "🏆",
    title: "২৩০+ প্রিমিয়াম কোর্স",
    desc: "১০টি বিভাগে ২৩০টির বেশি কোর্স — ফ্রিল্যান্সিং, ডেভেলপমেন্ট, ই-কমার্স, ডিজাইন, ভাষা ও আরও অনেক কিছু। বাজারমূল্য ১০ লক্ষ টাকার বেশি!",
    gradient: "from-[#2563EB] to-[#7C3AED]",
  },
  {
    icon: "📋",
    title: "A-Z স্ট্রাকচারড কারিকুলাম",
    desc: "বিগিনার থেকে পেশাদার — প্রতিটি ধাপে স্টেপ-বাই-স্টেপ গাইডেন্স। কোথা থেকে শুরু করবেন, কীভাবে এগোবেন — সবকিছু সাজানো গোছানো।",
    gradient: "from-[#059669] to-[#10B981]",
  },
  {
    icon: "💼",
    title: "ক্লায়েন্ট খোঁজার গাইড",
    desc: "শেখা শেষ? এখনই আয় শুরু করুন! ফাইভার, আপওয়ার্ক, ফেসবুক মার্কেটিং — কোথায় কীভাবে ক্লায়েন্ট পাবেন তার সম্পূর্ণ গাইড।",
    gradient: "from-[#D97706] to-[#F59E0B]",
  },
  {
    icon: "♾️",
    title: "লাইফটাইম অ্যাক্সেস + ফ্রি আপডেট",
    desc: "একবার কিনলে আজীবনের জন্য। নতুন কোর্স এলে ফ্রি আপডেট। কোনো মাসিক ফি নেই, কোনো লুকানো চার্জ নেই।",
    gradient: "from-[#DC2626] to-[#F59E0B]",
  },
];

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
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
    <div
      ref={ref}
      className="animate-on-scroll group relative p-6 rounded-2xl bg-white border border-[#E2E8F0] hover:border-[#2563EB]/20 hover:shadow-xl transition-all duration-500"
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-500`}>
        {feature.icon}
      </div>
      <h3 className="text-base font-bold text-text mb-2.5">{feature.title}</h3>
      <p className="text-sm text-text-secondary leading-relaxed">{feature.desc}</p>
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#2563EB]/0 via-transparent to-[#7C3AED]/0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none" />
    </div>
  );
}

export default function FeaturesSection() {
  return (
    <section className="py-10 md:py-14 bg-white">
      <div className="max-w-[1120px] mx-auto px-3.5 md:px-5">
        <div className="text-center mb-8 animate-fade-up">
          <div className="inline-flex gap-2 px-4 py-2.5 mx-auto mb-3.5 rounded-full bg-primary/10 border border-primary/20 font-extrabold text-sm text-[#1E3A8A]">
            ✨ কেন এই বান্ডেল সবার থেকে আলাদা?
          </div>
          <h2 className="text-xl md:text-2xl font-black text-text mb-2">একটি সফল ক্যারিয়ার গড়তে আপনার যা কিছু দরকার</h2>
          <p className="text-sm font-semibold text-text-secondary max-w-xl mx-auto">
            শুধু কোর্স নয় — সম্পূর্ণ ক্যারিয়ার গাইডেন্স, ক্লায়েন্ট খোঁজা এবং আজীবন সাপোর্ট — সবকিছু এক প্যাকেজে
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {features.map((feature, i) => (
            <FeatureCard key={i} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
