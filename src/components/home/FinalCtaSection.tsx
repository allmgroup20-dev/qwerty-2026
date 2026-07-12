"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

function formatTime(ms: number) {
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function toBnNum(v: number) {
  return String(v).replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[parseInt(d, 10)]);
}

export default function FinalCtaSection() {
  const [timeLeft, setTimeLeft] = useState(1800000);
  const [quota, setQuota] = useState(5);

  useEffect(() => {
    const key = "jg_final_timer_epoch";
    let epoch: number;
    try {
      const stored = parseInt(localStorage.getItem(key) || "", 10);
      epoch = stored && !isNaN(stored) ? stored : Date.now();
      if (!stored) localStorage.setItem(key, String(epoch));
    } catch {
      epoch = Date.now();
    }
    const cycle = 1800;
    const tick = () => {
      const elapsed = Math.floor((Date.now() - epoch) / 1000) % cycle;
      const remaining = Math.max(0, cycle - elapsed);
      setTimeLeft(remaining * 1000);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const qKey = "jg_final_quota";
    const qTimeKey = "jg_final_quota_time";
    const updateQuota = () => {
      try {
        const stored = parseInt(localStorage.getItem(qKey) || "", 10);
        const storedTime = parseInt(localStorage.getItem(qTimeKey) || "", 10);
        const now = Date.now();
        if (stored && storedTime && now - storedTime < 1800000 && stored >= 3 && stored <= 7) {
          setQuota(stored);
        } else {
          const val = Math.floor(Math.random() * 5) + 3;
          localStorage.setItem(qKey, String(val));
          localStorage.setItem(qTimeKey, String(now));
          setQuota(val);
        }
      } catch {
        setQuota(Math.floor(Math.random() * 5) + 3);
      }
    };
    updateQuota();
    const id = setInterval(updateQuota, 60000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="checkoutCtaSection" className="max-w-[1120px] mx-auto mt-6 md:mt-8 px-3.5 md:px-5">
      <div className="rounded-[20px] p-[18px_16px_16px] md:p-[24px_20px] bg-[linear-gradient(135deg,rgba(29,78,216,.06),rgba(29,78,216,.02))] border border-[rgba(29,78,216,.14)] text-center">
        <div className="flex flex-wrap gap-2 justify-center mb-3">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(220,38,38,.08)] border border-[rgba(220,38,38,.15)] font-extrabold text-sm text-[#DC2626]">
            ⏰ অফার শেষ হতে <span id="finalTimer" className="text-base">{formatTime(timeLeft).split("").map(c => "০১২৩৪৫৬৭৮৯"["0123456789".indexOf(c)] || c).join("")}</span>
          </div>
        </div>

        <h2 className="text-lg md:text-xl font-black text-[#1E293B] mb-2 leading-[1.3]">৩০ সেকেন্ডেই শুরু করুন আপনার আয়ের যাত্রা!</h2>
        <p className="text-sm font-semibold text-[#64748B] mb-4">নিচে আপনার নাম-ফোন দিন, পেমেন্ট করুন। সাথে সাথেই সব কোর্স ও অ্যাক্সেস চলে আসবে!</p>

        <div className="flex flex-wrap gap-2 justify-center mb-3">
          <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[rgba(29,78,216,.1)] text-[#1D4ED8] text-xs font-extrabold">⚡ ইতিমধ্যে ৮৬৬+ সক্রিয় শিক্ষার্থী যুক্ত</span>
        </div>

        <div className="mb-4">
          <span className="text-base font-extrabold text-[#64748B] line-through mr-2">১০,০০,০০০+ টাকা</span>
          <span className="text-3xl font-black text-[#16A34A] mr-2">৯৯ টাকা</span>
          <span className="inline-block px-2.5 py-1 rounded-lg bg-[#FFBF00] text-[#1E293B] text-xs font-extrabold">৯৯.৯৯% ছাড়</span>
        </div>

        <div className="flex flex-wrap gap-1.5 justify-center mb-4 p-3 rounded-[14px] bg-white/80 border border-[#E2E8F0] max-w-[650px] mx-auto">
          {["✅ ২৩০+ প্রিমিয়াম কোর্স", "✅ লাইফটাইম অ্যাক্সেস", "✅ ২৪ ঘণ্টা নিঃশর্ত ফেরত", "✅ SSL সুরক্ষিত পেমেন্ট", "✅ সাথে সাথে এক্সেস"].map((tag, i) => (
            <span key={i} className="px-3 py-1 rounded-full bg-[rgba(29,78,216,.1)] text-xs font-extrabold text-[#1D4ED8]">{tag}</span>
          ))}
        </div>

        <div className="mb-3 text-sm font-bold text-[#64748B]">
          👥 আর মাত্র <strong className="text-lg text-[#DC2626]">{toBnNum(quota)}</strong> জন পাচ্ছেন ৯৯ টাকায় — এরপর <strong>মূল্য ১,৪৯৯ টাকা</strong>
        </div>

        <Link href="/register" className="group inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#FF6B35] to-[#E85D2C] text-white font-bold text-lg shadow-xl shadow-orange-500/30 hover:shadow-orange-500/40 hover:-translate-y-0.5 transition-all duration-300">
          🔥 হ্যাঁ, দাম বাড়ার আগে মাত্র ৯৯ টাকায় আজীবন অ্যাক্সেস নিন →
        </Link>

        <p className="text-xs font-semibold text-[#64748B] mt-3">🔒 SSL সুরক্ষিত পেমেন্ট — আপনার তথ্য নিরাপদ</p>
      </div>
    </section>
  );
}