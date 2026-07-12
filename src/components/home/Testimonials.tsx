"use client";

import { useState, useEffect, useCallback } from "react";

const testimonials = [
  {
    name: "আরিফুল ইসলাম",
    text: "আমি আগে কোথাও কিছু শিখতে পারতাম না। এই কোর্সের পর ফাইভারে কাজ শুরু করি। প্রথম মাসেই ১৫,০০০ টাকা আয় করেছি! ধন্যবাদ Jobayer Group টিমকে ❤️",
    badge: "১৫,০০০+ টাকা/মাস",
    gradient: "from-[#2563EB] to-[#7C3AED]",
  },
  {
    name: "নুসরাত জাহান",
    text: "UI/UX কোর্সটা অসাধারণ! ফিগমা শিখে আপওয়ার্কে প্রথম ক্লায়েন্ট পাই ২৫,০০০ টাকায়। এখন রেগুলার কাজ করি। অবশ্যই রেকমেন্ড করছি!",
    badge: "২৫,০০০+ টাকা/প্রজেক্ট",
    gradient: "from-[#059669] to-[#10B981]",
  },
  {
    name: "মো. সাজিদ হোসেন",
    text: "৯৯ টাকায় এত কিছু! আমি ভাবতেই পারিনি। ১০টা কোর্স শেষ করেছি। এখন শপিফাই ড্রপশিপিং শিখছি। দারুণ এক্সপিরিয়েন্স!",
    badge: "১০+ কোর্স সম্পন্ন",
    gradient: "from-[#D97706] to-[#F59E0B]",
  },
  {
    name: "তানিয়া বেগম",
    text: "ছেলে ঘুমালে সময় পাই। মোবাইল দিয়েই কোর্স দেখি। এখন ফেসবুক মার্কেটিং করে মাসে ৮-১০ হাজার বাড়তি আয় করছি। আল্লাহ আপনাদের উত্তম বিনিময় দিন! 🤲",
    badge: "মোবাইল থেকে শিখে আয়",
    gradient: "from-[#DC2626] to-[#F59E0B]",
  },
  {
    name: "রবিউল আলম",
    text: "ভাইজান, একদম অসাম! এত কষ্ট করে সব কোর্স দিয়েছেন। আপনার কারণে আমার ইংলিশে ভীষণ উন্নতি হয়েছে। স্টুডেন্টদের জন্য দোয়া করবেন 🙏",
    badge: "ইংলিশ স্পিকিং ইমপ্রুভড",
    gradient: "from-[#2563EB] to-[#06B6D4]",
  },
  {
    name: "ফারহানা ইয়াসমিন",
    text: "আমি এই কোর্সের মাধ্যমেই ফ্রিল্যান্সিং শুরু করি। এখন মাসে ২০,০০০+ টাকা আয় করি। ৯৯ টাকা দিয়ে জীবন বদলে গেছে। আপনার টিমের জন্য দোয়া করছি!",
    badge: "২০,০০০+ টাকা/মাস",
    gradient: "from-[#7C3AED] to-[#EC4899]",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(true);

  const next = useCallback(() => setCurrent((p) => (p + 1) % testimonials.length), []);
  const prev = useCallback(() => setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length), []);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [playing, next]);

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F59E0B]/10 text-[#F59E0B] text-sm font-semibold mb-4">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            Testimonials
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1E293B] mb-4">
            What Our Students Say
          </h2>
          <p className="text-lg text-[#64748B] max-w-2xl mx-auto">
            Join 866+ successful learners who have transformed their careers with us.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="relative p-8 md:p-10 rounded-3xl bg-gradient-to-br from-[#F8FAFC] to-white border border-[#E2E8F0] shadow-lg">
            <div className={`absolute top-0 left-0 right-0 h-1.5 rounded-t-3xl bg-gradient-to-r ${testimonials[current].gradient}`} />
            <div className="relative z-10">
              <svg className="w-10 h-10 text-[#2563EB]/20 mb-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151C7.563 6.068 6 8.789 6 11h4v10H0z" />
              </svg>
              <p className="text-lg md:text-xl text-[#1E293B] leading-relaxed font-medium mb-6">
                &ldquo;{testimonials[current].text}&rdquo;
              </p>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <div className="font-bold text-[#1E293B]">{testimonials[current].name}</div>
                  <div className="flex gap-1 mt-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <svg key={s} className="w-4 h-4 text-[#F59E0B]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <span className={`px-4 py-2 rounded-xl bg-gradient-to-r ${testimonials[current].gradient} text-white text-sm font-bold`}>
                  {testimonials[current].badge}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button onClick={prev} className="w-12 h-12 rounded-2xl border-2 border-[#E2E8F0] bg-white flex items-center justify-center hover:border-[#2563EB] hover:text-[#2563EB] transition-all duration-200">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    i === current ? "bg-[#2563EB] w-6" : "bg-[#CBD5E1] hover:bg-[#94A3B8]"
                  }`}
                />
              ))}
            </div>
            <button onClick={next} className="w-12 h-12 rounded-2xl border-2 border-[#E2E8F0] bg-white flex items-center justify-center hover:border-[#2563EB] hover:text-[#2563EB] transition-all duration-200">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
