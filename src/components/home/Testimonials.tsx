"use client";

import { useLanguageStore } from "@/lib/store";

const testimonials = [
  {
    enName: "Rahim Mia",
    bnName: "রহিম মিয়া",
    enRole: "Top Earner",
    bnRole: "টপ আর্নার",
    enText: "Jobayer Group completely changed my life. I started with zero investment and now I earn 6 figures monthly from my team commissions.",
    bnText: "জোবায়ের গ্রুপ আমার জীবন সম্পূর্ণ বদলে দিয়েছে। আমি শূন্য বিনিয়োগে শুরু করেছি এবং এখন আমি আমার টিম কমিশন থেকে মাসে ৬ ফিগার আয় করি।",
    avatar: "RM",
    color: "bg-primary/10 text-primary",
  },
  {
    enName: "Fatima Begum",
    bnName: "ফাতিমা বেগম",
    enRole: "Team Leader",
    bnRole: "টিম লিডার",
    enText: "The e-commerce integration is amazing! I can sell products and earn commissions while building my team. Highly recommended.",
    bnText: "ই-কমার্স ইন্টিগ্রেশনটি চমৎকার! আমি আমার টিম বিল্ডিং করার সময় পণ্য বিক্রি করতে পারি এবং কমিশন উপার্জন করতে পারি। অত্যন্ত সুপারিশ করছি।",
    avatar: "FB",
    color: "bg-secondary/10 text-secondary-dark",
  },
  {
    enName: "Karim Hossain",
    bnName: "করিম হোসেন",
    enRole: "Distributor",
    bnRole: "ডিস্ট্রিবিউটর",
    enText: "The platform is super fast and the AI automation saves me hours every day. Best decision I ever made for my career.",
    bnText: "প্ল্যাটফর্মটি অত্যন্ত দ্রুত এবং এআই অটোমেশন প্রতিদিন আমার ঘন্টার পর ঘন্টা বাঁচায়। আমার ক্যারিয়ারের জন্য নেওয়া সেরা সিদ্ধান্ত।",
    avatar: "KH",
    color: "bg-accent/10 text-accent",
  },
];

export default function Testimonials() {
  const { lang } = useLanguageStore();

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="section-title">
            {lang === "bn" ? "সাফল্যের গল্প" : "Success Stories"}
          </h2>
          <p className="section-subtitle">
            {lang === "bn"
              ? "আমাদের সফল সদস্যদের কাছ থেকে শুনুন"
              : "Hear from our successful members"}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="card animate-fade-up" style={{ animationDelay: `${i * 0.2}s` }}>
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-12 h-12 rounded-full ${t.color} flex items-center justify-center font-bold text-sm`}>
                  {t.avatar}
                </div>
                <div>
                  <h4 className="font-semibold text-primary text-sm">{lang === "bn" ? t.bnName : t.enName}</h4>
                  <p className="text-xs text-text-secondary">{lang === "bn" ? t.bnRole : t.enRole}</p>
                </div>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed italic">
                &ldquo;{lang === "bn" ? t.bnText : t.enText}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
