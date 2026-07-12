"use client";

import { useState, useEffect, useCallback } from "react";

const testimonials = [
  {
    name: "আরিফুল ইসলাম",
    role: "ডিজিটাল মার্কেটার",
    text: "আমি আগে কোথাও কিছু শিখতে পারতাম না। এই কোর্সের পর ফাইভারে কাজ শুরু করি। প্রথম মাসেই ১৫,০০০ টাকা আয় করেছি! ধন্যবাদ Jobayer Group টিমকে ❤️",
    rating: 5,
    emoji: "🔥",
    badge: "মাসে ১৫,০০০+ টাকা আয়",
  },
  {
    name: "নুসরাত জাহান",
    role: "UI/UX ডিজাইনার",
    text: "UI/UX কোর্সটা অসাধারণ! ফিগমা শিখে আপওয়ার্কে প্রথম ক্লায়েন্ট পাই ২৫,০০০ টাকায়। এখন রেগুলার কাজ করি। অবশ্যই রেকমেন্ড করছি!",
    rating: 5,
    emoji: "🎨",
    badge: "আপওয়ার্কে ২৫,০০০+ টাকা",
  },
  {
    name: "মো. সাজিদ হোসেন",
    role: "ফ্রিল্যান্সার",
    text: "৯৯ টাকায় এত কিছু! আমি ভাবতেই পারিনি। ১০টা কোর্স শেষ করেছি। এখন শপিফাই ড্রপশিপিং শিখছি। দারুণ এক্সপিরিয়েন্স!",
    rating: 5,
    emoji: "🚀",
    badge: "১০+ কোর্স সম্পন্ন",
  },
  {
    name: "তানিয়া বেগম",
    role: "হোম মেকার টার্নড ফ্রিল্যান্সার",
    text: "ছেলে ঘুমালে সময় পাই। মোবাইল দিয়েই কোর্স দেখি। এখন ফেসবুক মার্কেটিং করে মাসে ৮-১০ হাজার বাড়তি আয় করছি। আল্লাহ আপনাদের উত্তম বিনিময় দিন! 🤲",
    rating: 5,
    emoji: "💪",
    badge: "মোবাইল থেকে শিখে আয়",
  },
  {
    name: "রবিউল আলম",
    role: "স্টুডেন্ট",
    text: "ভাইজান, একদম অসাম! এত কষ্ট করে সব কোর্স দিয়েছেন। আপনার কারণে আমার ইংলিশে ভীষণ উন্নতি হয়েছে। স্টুডেন্টদের জন্য দোয়া করবেন 🙏",
    rating: 5,
    emoji: "📚",
    badge: "ইংলিশ স্পিকিং ইমপ্রুভড",
  },
  {
    name: "ফারহানা ইয়াসমিন",
    role: "ফ্রিল্যান্সার",
    text: "আমি এই কোর্সের মাধ্যমেই ফ্রিল্যান্সিং শুরু করি। এখন মাসে ২০,০০০+ টাকা আয় করি। ৯৯ টাকা দিয়ে জীবন বদলে গেছে। আপনার টিমের জন্য দোয়া করছি!",
    rating: 5,
    emoji: "💖",
    badge: "মাসে ২০,০০০+ টাকা আয়",
  },
  {
    name: "সোহেল রানা",
    role: "ফাইভার ফ্রিল্যান্সার",
    text: "বাংলাদেশের সবচেয়ে সাশ্রয়ী মূল্যের কোর্স! আমি ফাইভারে SEO পরিষেবা দিই। এই কোর্স না করলে আজ আমি এখানে থাকতাম না। অসংখ্য ধন্যবাদ!",
    rating: 5,
    emoji: "⭐",
    badge: "SEO সার্ভিস প্রোভাইডার",
  },
  {
    name: "মারিয়া আক্তার",
    role: "হাউসওয়াইফ টার্নড অনলাইন উদ্যোক্তা",
    text: "আমার স্বামী আমাকে কোর্স কিনে দিয়েছিলেন। এখন আমি ফেসবুকে পেইজ খুলে ঘরে বসে অর্ডার নিচ্ছি। বাসায় বসে বাচ্চা দেখি আর ব্যবসা করি — স্বপ্নের মতো! 🌸",
    rating: 5,
    emoji: "🌸",
    badge: "ফেসবুক পেইজ উদ্যোক্তা",
  },
  {
    name: "শুভ অধিকারী",
    role: "ফ্রিল্যান্সার",
    text: "এত কম দামে এত প্রিমিয়াম কোর্স? আমি তো প্রথমে বিশ্বাসই করিনি। এখন আমি গ্রাফিক্স ডিজাইন শিখে ফাইভারে রেগুলার ক্লায়েন্ট পাচ্ছি। সবার জন্য দোয়া করি!",
    rating: 5,
    emoji: "🎯",
    badge: "গ্রাফিক্স ডিজাইনার",
  },
  {
    name: "আমিনা খাতুন",
    role: "মাদ্রাসা শিক্ষার্থী",
    text: "আমি মাদ্রাসায় পড়ি কিন্তু ইংলিশ শেখার খুব ইচ্ছা ছিল। এই কোর্সে ভর্তি হয়ে এখন আমি মৌলিক ইংলিশ বলতে পারি। অনেক বড় হয়ে গেলাম! আল্লাহ আপনাকে উত্তম প্রতিদান দিন 🤲",
    rating: 5,
    emoji: "🤲",
    badge: "মাদ্রাসা থেকে ইংলিশ শিখলাম",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(true);

  const next = useCallback(() => setCurrent((p) => (p + 1) % testimonials.length), []);
  const prev = useCallback(() => setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length), []);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(next, 4000);
    return () => clearInterval(id);
  }, [playing, next]);

  return (
    <section className="max-w-[1120px] mx-auto mt-6 md:mt-8 px-3.5 md:px-5" id="testimonials">
      <div className="rounded-[20px] p-[18px_16px_16px] md:p-[20px] bg-[linear-gradient(135deg,rgba(29,78,216,.06),rgba(29,78,216,.02))] border border-[rgba(29,78,216,.14)]">
        <h3 className="text-lg md:text-xl font-black text-[#1E293B] mb-1 text-center">💬 আমাদের শিক্ষার্থীরা কী বলছেন?</h3>
        <p className="text-sm font-semibold text-[#64748B] mb-5 text-center">
          ইতিমধ্যে ৮৬৬+ শিক্ষার্থী সফল — এদেরই কিছু অভিজ্ঞতা
        </p>

        <div className="rounded-[20px] p-5 md:p-6 bg-white border border-[#E2E8F0] max-w-[720px] mx-auto">
          <div className="text-3xl mb-3">{testimonials[current].emoji}</div>
          <p className="text-sm md:text-base text-[#1E293B] leading-[1.8] font-semibold mb-4">
            &ldquo;{testimonials[current].text}&rdquo;
          </p>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <div className="font-black text-sm text-[#1E293B]">{testimonials[current].name}</div>
              <div className="text-xs text-[#64748B]">{testimonials[current].role}</div>
              <div className="text-yellow-500 text-sm mt-0.5">{'★'.repeat(testimonials[current].rating)}</div>
            </div>
            <span className="px-3 py-1.5 rounded-[8px] bg-gradient-to-r from-[rgba(29,78,216,.1)] to-[rgba(255,107,53,.1)] text-xs font-extrabold text-[#1D4ED8]">
              {testimonials[current].badge}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3.5 mt-5">
          <button onClick={prev} className="w-[44px] h-[44px] rounded-full border-2 border-[#E2E8F0] bg-white text-[#64748B] font-bold flex items-center justify-center cursor-pointer transition-all hover:border-[#1D4ED8] hover:text-[#1D4ED8]">◀</button>
          <div className="flex gap-1.5">
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)} className={`w-2 h-2 rounded-full border-none cursor-pointer transition-all ${i === current ? "bg-[#1D4ED8] w-5" : "bg-[#CBD5E1]"}`} />
            ))}
          </div>
          <button onClick={next} className="w-[44px] h-[44px] rounded-full border-2 border-[#E2E8F0] bg-white text-[#64748B] font-bold flex items-center justify-center cursor-pointer transition-all hover:border-[#1D4ED8] hover:text-[#1D4ED8]">▶</button>
        </div>

        <div className="mt-6">
          <div className="rounded-[20px] p-5 bg-white border border-[#E2E8F0]">
            <h4 className="text-sm font-black text-[#1E293B] mb-3 text-center">📱 রিয়েল স্টুডেন্ট রিভিউ (চ্যাট স্টাইল)</h4>
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1 scrollbar-thin">
              {testimonials.slice(0, 6).map((t, i) => (
                <div key={i} className={`flex ${i % 2 === 0 ? "justify-start" : "justify-end"}`}>
                  <div className={`max-w-[85%] p-3.5 rounded-[16px] text-sm leading-[1.7] font-semibold shadow-[0_2px_8px_rgba(0,0,0,.06)] ${i % 2 === 0 ? "bg-[rgba(29,78,216,.08)] rounded-bl-[4px]" : "bg-[rgba(255,107,53,.08)] rounded-br-[4px]"}`}>
                    <strong className="text-xs block mb-1 text-[#1D4ED8]">{t.name}</strong>
                    <span className="text-[#1E293B]">{t.text}</span>
                    <div className="flex items-center gap-1 mt-1.5">
                      <span className="text-yellow-500 text-xs">{'★'.repeat(t.rating)}</span>
                      <span className="text-xs text-[#64748B]">{t.role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-6">
          <a href="#" onClick={(e) => { e.preventDefault(); document.getElementById("checkout")?.scrollIntoView({ behavior: "smooth" }); }} className="inline-flex items-center gap-2 px-6 py-3.5 rounded-[14px] bg-gradient-to-r from-[#FF6B35] to-[#E85D2C] text-white font-black text-sm md:text-base no-underline shadow-[0_12px_28px_rgba(234,88,12,.35)] hover:-translate-y-0.5 transition-all cursor-pointer">
            💬 হ্যাঁ, আমারও এই ফলাফল চাই ➔
          </a>
        </div>
      </div>
    </section>
  );
}
