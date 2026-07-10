"use client";

import Link from "next/link";
import { useLanguageStore } from "@/lib/store";

const steps = [
  {
    en: "Sign Up Free",
    bn: "বিনামূল্যে নিবন্ধন করুন",
    enDesc: "Create your account and join our growing community of successful entrepreneurs",
    bnDesc: "আপনার অ্যাকাউন্ট তৈরি করুন এবং সফল উদ্যোক্তাদের আমাদের ক্রমবর্ধমান কমিউনিটিতে যোগ দিন",
    icon: "1",
  },
  {
    en: "Invite Your Team",
    bn: "আপনার টিমকে আমন্ত্রণ জানান",
    enDesc: "Share your unique referral link with friends and family to grow your network",
    bnDesc: "আপনার নেটওয়ার্ক বাড়াতে বন্ধু এবং পরিবারের সাথে আপনার অনন্য রেফারেল লিঙ্ক শেয়ার করুন",
    icon: "2",
  },
  {
    en: "Earn Rewards",
    bn: "পুরস্কার অর্জন করুন",
    enDesc: "Get commissions from your team purchases and build a sustainable income",
    bnDesc: "আপনার টিমের কেনাকাটা থেকে কমিশন পান এবং একটি টেকসই আয় গড়ে তুলুন",
    icon: "3",
  },
];

export default function HowItWorks() {
  const { lang } = useLanguageStore();

  return (
    <section className="py-20 md:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="section-title">
            {lang === "bn" ? "এটি কিভাবে কাজ করে" : "How It Works"}
          </h2>
          <p className="section-subtitle">
            {lang === "bn"
              ? "মাত্র তিনটি সহজ ধাপে আপনার যাত্রা শুরু করুন"
              : "Start your journey in three simple steps"}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {steps.map((step, i) => (
            <div key={i} className="relative animate-fade-up" style={{ animationDelay: `${i * 0.2}s` }}>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-0.5 border-t-2 border-dashed border-secondary/30" />
              )}
              <div className="card text-center relative z-10 hover:shadow-xl transition-all">
                <div className="w-16 h-16 gradient-gold rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg text-2xl font-bold text-primary-dark">
                  {step.icon}
                </div>
                <h3 className="font-bold text-lg text-primary mb-3">
                  {lang === "bn" ? step.bn : step.en}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {lang === "bn" ? step.bnDesc : step.enDesc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/register" className="btn-primary text-base !px-10 !py-4 shadow-xl shadow-action/30">
            {lang === "bn" ? "এখনই শুরু করুন" : "Get Started Now"}
          </Link>
        </div>
      </div>
    </section>
  );
}
