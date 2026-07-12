"use client";

import Link from "next/link";

const steps = [
  {
    icon: "📝",
    title: "অ্যাকাউন্ট খুলুন",
    desc: "মাত্র ৯৯ টাকা দিন। সাথে সাথেই সব কোর্স ও টুলস খুলে যাবে!",
    badge: "⏱ ৩০ সেকেন্ড",
    gradient: "from-[#1D4ED8] to-[#FF6B35]",
  },
  {
    icon: "📢",
    title: "লিংক শেয়ার করুন",
    desc: "আপনার লিংক ফেসবুক ও হোয়াটসঅ্যাপে শেয়ার করুন। কোনো অভিজ্ঞতা লাগে না — সবকিছু রেডিমেড দেওয়া আছে!",
    badge: "🎯 শুরু করুন আজই",
    gradient: "from-[#FF6B35] to-[#1D4ED8]",
  },
  {
    icon: "💰",
    title: "টাকা তুলুন",
    desc: "আপনার লিংকে যতজন যুক্ত হবে, তত আয় সরাসরি বিকাশ/নগদে চলে আসবে!",
    badge: "🟢 সরাসরি পেমেন্ট",
    gradient: "from-[#1D4ED8] to-[#FF6B35]",
  },
];

export default function HowItWorks() {
  return (
    <section className="max-w-[1100px] mx-auto mt-10 md:mt-12 px-3.5 md:px-5">
      <div className="flex w-fit gap-2 px-4 py-2.5 mx-auto mb-3.5 rounded-full bg-[rgba(29,78,216,.08)] border border-[rgba(29,78,216,.15)] font-extrabold text-sm text-[#1E3A8A]">
        ⚙️ আয়ের সহজ ৩টি ধাপ
      </div>
      <h2 className="text-center text-2xl md:text-[24px] font-black text-[#1E293B] mb-5 max-w-[820px] mx-auto">
        আপনার আয়ের সহজ ৩টি উপায়:
      </h2>
      <div className="grid grid-cols-1 gap-3.5 md:gap-[18px] max-w-[820px] mx-auto">
        {steps.map((step, i) => (
          <div key={i} className="flex items-start gap-3.5 md:gap-4 p-[18px_16px] md:p-[20px_18px] rounded-[16px] bg-white border border-[#E2E8F0] shadow-[0_6px_14px_rgba(0,0,0,.2)] hover:-translate-y-0.5 transition-transform">
            <div className={`flex-none w-11 h-11 md:w-[50px] md:h-[50px] rounded-[12px] md:rounded-[14px] bg-gradient-to-br ${step.gradient} flex items-center justify-center text-lg md:text-xl font-black text-white`}>
              {i + 1}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm md:text-base font-black text-[#1E293B] mb-1">{step.icon} {step.title}</h3>
              <p className="text-xs md:text-sm font-semibold text-[#64748B] leading-[1.6]">{step.desc}</p>
              <span className="inline-block mt-1.5 px-2.5 py-0.5 rounded-full bg-[rgba(29,78,216,.1)] text-[#1D4ED8] text-[11px] font-extrabold">{step.badge}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="max-w-[820px] mx-auto mt-4 px-4 py-3.5 rounded-[14px] bg-[rgba(29,78,216,.06)] border border-[rgba(29,78,216,.12)] text-center text-xs md:text-sm font-bold text-[#1E293B] leading-[1.7]">
        💡 আমাদের ৮৬৬+ শিক্ষার্থীর ৭২% ই প্রথম মাসেই আয় শুরু করেছেন! 🚀 আপনার পালা এখনই!
      </div>
      <div className="text-center mt-8">
        <Link href="/register" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-[14px] bg-gradient-to-r from-[#FF6B35] to-[#E85D2C] text-white font-black text-sm md:text-base no-underline shadow-[0_12px_28px_rgba(234,88,12,.35)] hover:-translate-y-0.5 hover:shadow-[0_16px_32px_rgba(234,88,12,.4)] transition-all cursor-pointer">
          🔥 হ্যাঁ, আমি ৯৯ টাকায় পুরো বান্ডেল নিচ্ছি ➔
        </Link>
      </div>
    </section>
  );
}
