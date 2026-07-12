"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

const steps = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    title: "Create Account",
    titleBn: "অ্যাকাউন্ট খুলুন",
    desc: "Sign up in 30 seconds. Get instant access to all 230+ courses and tools.",
    descBn: "৩০ সেকেন্ডে নিবন্ধন করুন। সাথে সাথেই সব কোর্স ও টুলস অ্যাক্সেস করুন।",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
      </svg>
    ),
    title: "Share Your Link",
    titleBn: "লিংক শেয়ার করুন",
    desc: "Share your referral link on Facebook, WhatsApp, and more. Everything is ready-made for you.",
    descBn: "আপনার রেফারেল লিংক ফেসবুক, হোয়াটসঅ্যাপে শেয়ার করুন। সবকিছু রেডিমেড দেওয়া আছে।",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Earn Money",
    titleBn: "টাকা উপার্জন করুন",
    desc: "Get commissions directly to your bKash/Nagad as your network grows. Withdraw anytime.",
    descBn: "আপনার নেটওয়ার্ক বাড়ার সাথে সাথে সরাসরি বিকাশ/নগদে কমিশন পান। যেকোনো সময় তুলুন।",
  },
];

function StepCard({ step, index }: { step: typeof steps[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add("is-visible"); },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="animate-on-scroll relative flex items-start gap-5 group" style={{ transitionDelay: `${index * 150}ms` }}>
      <div className="relative flex flex-col items-center">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#7C3AED] flex items-center justify-center text-white font-black text-lg shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-300">
          {index + 1}
        </div>
        {index < 2 && <div className="w-0.5 h-full min-h-[40px] bg-gradient-to-b from-[#2563EB]/30 to-transparent mt-2" />}
      </div>
      <div className="flex-1 pb-12">
        <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] hover:border-[#2563EB]/20 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-[#2563EB]/10 text-[#2563EB] flex items-center justify-center">
              {step.icon}
            </div>
            <h3 className="text-lg font-bold text-[#1E293B]">{step.title}</h3>
          </div>
          <p className="text-sm text-[#64748B] leading-relaxed">{step.desc}</p>
        </div>
      </div>
    </div>
  );
}

export default function HowItWorks() {
  return (
    <section className="py-24 md:py-32 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#7C3AED]/10 text-[#7C3AED] text-sm font-semibold mb-4">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            How It Works
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1E293B] mb-4">
            Start Earning in 3 Simple Steps
          </h2>
          <p className="text-lg text-[#64748B] max-w-2xl mx-auto">
            No experience needed. Everything is ready — just follow the steps and start building your income.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {steps.map((step, i) => (
            <StepCard key={i} step={step} index={i} />
          ))}
        </div>

        <div className="text-center mt-12 animate-fade-up">
          <Link
            href="/register"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white font-bold text-lg shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 hover:-translate-y-0.5"
          >
            Get Started Now
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
