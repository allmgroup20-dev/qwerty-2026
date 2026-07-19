"use client";

import Link from "next/link";
import { useLanguageStore } from "@/lib/store";

interface MenuPreview {
  href: string;
  icon: string;
  titleBn: string;
  titleEn: string;
  descBn: string;
  descEn: string;
  gradient: string;
}

const previews: MenuPreview[] = [
  {
    href: "/courses",
    icon: "📚",
    titleBn: "কোর্স সমূহ",
    titleEn: "Courses",
    descBn: "২৩০+ প্রিমিয়াম কোর্স ৯টি ক্যাটাগরিতে। টেন মিনিট স্কুল, ঘুড়ি লার্নিং, ক্রিয়েটিভ আইটি সহ শীর্ষ প্রতিষ্ঠানের কোর্স একসাথে।",
    descEn: "230+ premium courses across 9 categories. Courses from 10 Minute School, Ghoori Learning, Creative IT and more.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    href: "/reviews",
    icon: "💬",
    titleBn: "মতামত",
    titleEn: "Reviews",
    descBn: "৪২+ শিক্ষার্থীর সাফল্যের গল্প। রিভিউ, সাক্ষাৎকার ও মতামত — সব এক জায়গায়। দেখুন কেমন আয় করছেন অন্যরা।",
    descEn: "42+ success stories. Reviews, testimonials & feedback — all in one place. See how others are earning.",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    href: "/live-updates",
    icon: "📊",
    titleBn: "লাইভ",
    titleEn: "Live Updates",
    descBn: "রিয়েল-টাইম স্যালারি আপডেট ও আয়ের প্রমাণপত্র। লাইভ দেখুন কে কত আয় করছেন — প্রতি মুহূর্তে আপডেট!",
    descEn: "Real-time salary updates & earning proofs. Watch live who's earning what — updated every second!",
    gradient: "from-emerald-500 to-green-500",
  },
  {
    href: "/courses",
    icon: "👨‍🏫",
    titleBn: "প্রশিক্ষক ও প্রতিষ্ঠান",
    titleEn: "Trainers & Institutions",
    descBn: "দেশের সেরা প্রশিক্ষক ও প্রতিষ্ঠানসমূহের সাথে পরিচিত হোন। সব কোর্স ও রিসোর্স এক জায়গায়।",
    descEn: "Meet Bangladesh's top trainers and institutions. All courses & resources in one place.",
    gradient: "from-purple-500 to-violet-500",
  },
  {
    href: "/faq",
    icon: "❓",
    titleBn: "FAQ",
    titleEn: "FAQ",
    descBn: "সাধারণ জিজ্ঞাসা ও উত্তর। আয়, কোর্স, রেজিস্ট্রেশন, পেমেন্ট — সব বিষয়ে আপনার প্রশ্নের উত্তর।",
    descEn: "Frequently asked questions. Answers about earning, courses, registration, payment & more.",
    gradient: "from-rose-500 to-pink-500",
  },
  {
    href: "/company/apps",
    icon: "📱",
    titleBn: "অ্যাপ",
    titleEn: "App",
    descBn: "এক ক্লিকেই অ্যাপ ইনস্টল করুন। কোনো ঝামেলা ছাড়াই সরাসরি হোম স্ক্রিনে যুক্ত হবে।",
    descEn: "Install the app with one click. Added directly to your home screen without hassle.",
    gradient: "from-indigo-500 to-purple-500",
  },
];

export default function MenuPreviewSection() {
  const { lang } = useLanguageStore();

  return (
    <section>
      <div className="section-header">
        <div className="badge mx-auto mb-3 border-primary/20 bg-primary/10 text-primary">
          🎯 {lang === "bn" ? "এক নজরে সবকিছু" : "Everything at a Glance"}
        </div>
        <h3 className="text-lg md:text-xl font-black text-text">
          {lang === "bn" ? "আপনার জন্য যা অপেক্ষা করছে" : "What Awaits You"}
        </h3>
        <p className="text-sm font-semibold text-text-secondary mt-1">
          {lang === "bn"
            ? "নিচের প্রতিটি কার্ডে ক্লিক করে বিস্তারিত দেখুন"
            : "Click on each card below to explore more"}
        </p>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {previews.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group relative overflow-hidden rounded-2xl bg-white border border-border p-5 md:p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            {/* Gradient accent bar — visible on hover */}
            <div
              className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
            />

            {/* Subtle background glow on hover */}
            <div
              className={`absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-[0.06] blur-3xl transition-opacity duration-500`}
            />

            <div className="relative z-10">
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-2xl mb-4 shadow-sm`}
              >
                <span className="drop-shadow-sm">{item.icon}</span>
              </div>

              <h4 className="font-black text-text mb-1.5">
                {lang === "bn" ? item.titleBn : item.titleEn}
              </h4>

              <p className="text-sm text-text-secondary font-medium leading-relaxed line-clamp-3">
                {lang === "bn" ? item.descBn : item.descEn}
              </p>

              <div className="mt-4 flex items-center gap-1 text-sm font-bold text-primary group-hover:gap-2 transition-all duration-300">
                <span>{lang === "bn" ? "আরো দেখুন" : "Explore"}</span>
                <span className="text-lg leading-none transition-transform duration-300 group-hover:translate-x-0.5">→</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
