"use client";

import Link from "next/link";
import { useLanguageStore } from "@/lib/store";

export default function HeroSection() {
  const { lang } = useLanguageStore();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      <div className="absolute inset-0 gradient-premium opacity-5" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,215,0,0.1),transparent_50%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-32 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 bg-action/10 text-action text-sm font-medium px-4 py-2 rounded-full mb-6">
              <span className="w-2 h-2 bg-action rounded-full animate-pulse" />
              {lang === "bn" ? "আপনার ক্যারিয়ার শুরু হোক এখানে" : "Your Career Starts Here"}
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight mb-6">
              {lang === "bn" ? (
                <>
                  জোবায়ের গ্রুপের সাথে
                  <br />
                  <span className="text-secondary">আপনার ক্যারিয়ার</span> গড়ুন
                </>
              ) : (
                <>
                  Build Your Career
                  <br />
                  With <span className="text-secondary">Jobayer Group</span>
                </>
              )}
            </h1>

            <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-8 max-w-lg">
              {lang === "bn"
                ? "একটি প্রিমিয়াম অ্যাফিলিয়েট মার্কেটিং এবং ই-কমার্স প্ল্যাটফর্ম যা আপনার সাফল্যের জন্য ডিজাইন করা হয়েছে। আজই আপনার যাত্রা শুরু করুন।"
                : "A premium affiliate marketing and e-commerce platform designed for your success. Start your journey today."}
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/register" className="btn-primary text-base !px-8 !py-4 shadow-xl shadow-action/30 animate-pulse-glow">
                {lang === "bn" ? "আপনার যাত্রা শুরু করুন" : "Start Your Journey"}
              </Link>
              <Link href="/app-install" className="btn-secondary text-base !px-8 !py-4">
                {lang === "bn" ? "মোবাইল অ্যাপ নিন" : "Get Mobile App"}
              </Link>
            </div>

            <div className="flex items-center gap-6 mt-10 pt-8 border-t border-border">
              <div>
                <p className="text-2xl font-bold text-primary">10K+</p>
                <p className="text-xs text-text-secondary">{lang === "bn" ? "সক্রিয় সদস্য" : "Active Members"}</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">৳5Cr+</p>
                <p className="text-xs text-text-secondary">{lang === "bn" ? "মোট পেআউট" : "Total Payout"}</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">99.9%</p>
                <p className="text-xs text-text-secondary">{lang === "bn" ? "আপটাইম" : "Uptime"}</p>
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center justify-center animate-float">
            <div className="relative">
              <div className="w-80 h-80 rounded-full gradient-premium opacity-20 blur-3xl absolute -top-20 -right-20" />
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 border border-border/50">
                <div className="w-64 h-80 flex flex-col items-center justify-center">
                  <div className="w-20 h-20 gradient-premium rounded-2xl flex items-center justify-center mb-6 shadow-xl">
                    <span className="text-3xl text-white font-bold">JG</span>
                  </div>
                  <h3 className="text-xl font-bold text-primary text-center mb-2">Jobayer Group</h3>
                  <p className="text-sm text-text-secondary text-center mb-6">
                    {lang === "bn" ? "আপনার সাফল্যের অংশীদার" : "Your Success Partner"}
                  </p>
                  <div className="flex gap-2 w-full">
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full w-3/4 gradient-gold rounded-full" />
                    </div>
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full w-1/2 bg-action rounded-full" />
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mt-6 w-full">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">U1</div>
                    <div className="flex-1">
                      <div className="h-2 w-full bg-gray-100 rounded-full" />
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mt-2 w-full ml-6">
                    <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-xs font-bold text-secondary-dark">U2</div>
                    <div className="flex-1">
                      <div className="h-2 w-3/4 bg-gray-100 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
