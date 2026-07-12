"use client";

import { useState, useEffect, useCallback } from "react";

const sliderReviews = [
  {
    name: "মিতা ইসলাম",
    label: "ফ্রিল্যান্সার, সিলেট",
    text: "আমি আগে কখনো অনলাইনে কাজ করিনি। জোবায়ের গ্রুপের নির্দেশিকা আর সহায়তার কারণে আজ আমি নিজের ল্যাপটপ থেকে মাসে ২৫,০০০+ টাকা ইনকাম করছি। শুরুটা ছিল ৯৯ টাকা, কিন্তু ভ্যালু পেয়েছি লক্ষ টাকার বেশি!",
    rating: "5.0/5",
  },
  {
    name: "নীলা হোসেন",
    label: "ডিজিটাল মার্কেটার, ঢাকা",
    text: "ইউটিউবে অনেক কিছু ফ্রিতে পাওয়া যায়, কিন্তু স্ট্রাকচার আর দিকনির্দেশনা ছাড়া শেখা অসম্পূর্ণ। এই কোর্সটা আমাকে রিয়েল মার্কেটের জন্য প্রস্তুত করেছে। এখন নিয়মিত ক্লায়েন্ট পাচ্ছি। সবার কাছে রেকমেন্ড করব!",
    rating: "4.9/5",
  },
  {
    name: "রাফসান জামান",
    label: "ই-কমার্স আর্নার, চট্টগ্রাম",
    text: "শুরুতে ভেবেছিলাম এটা আর দশটা অনলাইন স্ক্যাম হবে। কিন্তু জোবায়ের গ্রুপের ট্রান্সপারেন্সি আর রিয়েল শিক্ষার্থী ফলাফল দেখে কনফিডেন্ট হলাম। ৭ মাসে এখন মাসিক আয় ৪০,০০০+। সবচেয়ে বড় কথা, একটা সহায়ক কমিউনিটি পেয়েছি।",
    rating: "5.0/5",
  },
];

const chatTestimonials = [
  {
    emoji: "🌸",
    name: "রোজিনা আক্তার",
    platform: "ফেসবুক গ্রুপ · ২ সপ্তাহ আগে",
    text: "প্রথম বোনাস পাওয়ার দিনটা এখনো মনে আছে। নিজের চেষ্টায় কিছু অর্জনের অনুভূতি অসাধারণ! মাত্র ৯৯ টাকা দিয়ে শুরু করে আজ মাসে ২৫,০০০+ টাকা আয় করছি। যারা দ্বিধায় আছেন, তাদের বলব—শুরু করে দেখুন!",
  },
  {
    emoji: "🌿",
    name: "পূর্ণিমা বেগম",
    platform: "হোয়াটসঅ্যাপ গ্রুপ · ১ মাস আগে",
    text: "আমি গ্রামের মেয়ে। আগে ভাবতাম অনলাইনে কাজ করা শুধু শহরের ছেলেমেয়েদের জন্য। কিন্তু এই প্ল্যাটফর্মে যুক্ত হওয়ার পর আমার চোখ খুলে গেছে। এখন ঘরে বসে কাজ করি আর পরিবারকে সাহায্য করি।",
  },
  {
    emoji: "💪",
    name: "ফারিয়া ইসলাম",
    platform: "ফেসবুক মেসেঞ্জার · ৩ সপ্তাহ আগে",
    text: "শেখার সুযোগ আর আয়—দুটোই পাচ্ছি এখান থেকে। সঠিক নির্দেশিকা আর সহায়তা পেলে যে কেউ সফল হতে পারে। আমি এখন ৬ মাস ধরে যুক্ত আর প্রতিদিন নতুন কিছু শিখছি। ধন্যবাদ জোবায়ের গ্রুপ টিমকে!",
  },
  {
    emoji: "🔥",
    name: "তামান্না হাসান",
    platform: "হোয়াটসঅ্যাপ · ৫ দিন আগে",
    text: "আমার জন্য এটি নতুন দিগন্ত খুলে দিয়েছে। প্রথমে ভয় ছিল, কিন্তু টিমের সহায়তায় সব ভয় কেটে গেছে। এখন ইনকাম শুরু করেছি, খুব ভালো লাগছে। এখন আমি অনলাইন জগত নিয়ে অনেক বেশি আত্মবিশ্বাসী!",
  },
];

const reviewGrid = [
  { name: "নীলা হোসেন", rating: "4.9/5", text: "আমি শুরুতে ভেবেছিলাম এটা হয়তো অন্য অনেক অনলাইন সুযোগের মতোই হবে। কিন্তু কাজ শুরু করার পর বুঝলাম এখানে নিয়মিত নির্দেশিকা দেওয়া হয় এবং নতুনদের শেখানোর জন্য আলাদা সহায়তা রয়েছে। এখন প্রতি মাসে নিয়মিত কাজ করছি এবং সময়মতো পেমেন্ট পাচ্ছি।" },
  { name: "মিতা ইসলাম", rating: "5.0/5", text: "আমি আগে কোনো অনলাইন কাজ করিনি। এখানে যোগ দেওয়ার পর ধাপে ধাপে কাজ শিখেছি। কাজের পাশাপাশি অনেক স্কিল ডেভেলপমেন্ট রিসোর্সও পেয়েছি। পরিবারের পাশে থেকে কাজ করতে পারছি, এটা আমার জন্য সবচেয়ে বড় সুবিধা।" },
  { name: "রাফসান জামান", rating: "5.0/5", text: "ই-কমার্সে কাজ করে মাসে ৪০,০০০+ ইনকাম করছি। শুরুতে কেউ বিশ্বাস করেনি, কিন্তু আজ আমি প্রমাণ করেছি। সবার দোয়া চাই।" },
  { name: "সাবরিনা খান", rating: "4.9/5", text: "ডিজিটাল মার্কেটিং শিখে এখন নিজেই ক্লায়েন্ট ম্যানেজ করি। এটা শুধু আয়ের জায়গা না, এটি পেশা গড়ার জায়গা।" },
  { name: "রেহানা বেগম", rating: "4.8/5", text: "গৃহিণী হয়েও অনলাইনে কাজ করা সম্ভব—এটা প্রমাণ করেছি নিজেই। মাসে ভালো ইনকাম করছি।" },
  { name: "নাদিয়া সুলতানা", rating: "4.9/5", text: "প্রথম প্রথম কাজ পেতে সময় লেগেছে, কিন্তু এখন নিয়মিত আয়। সবার ধৈর্য ধরাটা জরুরি।" },
  { name: "নাজনীন আক্তার", rating: "5.0/5", text: "যারা শুরু করতে চান তাদের বলব—ভয় না করে শুরু করুন। সঠিক নির্দেশিকা পেলে সফলতা আসবেই।" },
  { name: "তামান্না হাসান", rating: "5.0/5", text: "আমার জন্য এটি নতুন দিগন্ত খুলে দিয়েছে। এখন আমি অনলাইন জগত নিয়ে অনেক বেশি আত্মবিশ্বাসী।" },
  { name: "মর্জিনা খাতুন", rating: "4.9/5", text: "প্রথমে ভয় ছিল, কিন্তু টিমের সহায়তায় সব ভয় কেটে গেছে। এখন ইনকাম শুরু করেছি, খুব ভালো লাগছে।" },
  { name: "শামীমা আক্তার", rating: "5.0/5", text: "যারা এখনো শুরু করেননি, তাদের বলব—সময় নষ্ট না করে শুরু করুন। সঠিক নির্দেশিকা পেতে দেরি করবেন না।" },
  { name: "ফারিয়া ইসলাম", rating: "4.9/5", text: "শেখার সুযোগ আর আয়—দুটোই পাচ্ছি। যারা শুরু করবেন, তাদের জন্য এটি সেরা জায়গা।" },
  { name: "আনিকা ইসলাম", rating: "5.0/5", text: "ই-কমার্সে কাজ করে মাসে ৪০,০০০+ ইনকাম করছি। শুরুতে কেউ বিশ্বাস করেনি, কিন্তু আজ আমি প্রমাণ করেছি।" },
  { name: "সাবিকুন নাহার", rating: "4.9/5", text: "সঠিক নির্দেশিকা এবং সহায়তা পেলে যে কেউ সফল হতে পারে। আমি তার উদাহরণ।" },
  { name: "নুসরাত জাহান", rating: "5.0/5", text: "নতুনদের ছোট করে দেখা হয় না, যে কোনো প্রশ্নের উত্তর ধৈর্য সহকারে দেওয়া হয়। এটাই আমার সবচেয়ে পছন্দের দিক।" },
  { name: "ইভা রহমান", rating: "4.8/5", text: "শুরুতে ধৈর্য ধরে কাজ করতে হবে, কিন্তু ফলাফল ভালো। আমি এখন সন্তুষ্ট।" },
  { name: "মামুন মিয়া", rating: "4.9/5", text: "যারা দ্বিধায় আছেন তাদের বলব, শুরু করে দিন। এখানে সঠিক দিকনির্দেশনা পাবেন।" },
  { name: "মোর্শেদ মিয়া", rating: "5.0/5", text: "পেশাদার পরিবেশ আর নিয়মিত কাজ — এটাই সবার জন্য দরকার।" },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [showAll, setShowAll] = useState(false);

  const next = useCallback(() => setCurrent((p) => (p + 1) % sliderReviews.length), []);
  const prev = useCallback(() => setCurrent((p) => (p - 1 + sliderReviews.length) % sliderReviews.length), []);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [playing, next]);

  return (
    <section id="reviewSection" className="max-w-[1120px] mx-auto mt-6 md:mt-8 px-3.5 md:px-5">
      <div className="rounded-[20px] p-[18px_16px_16px] md:p-[20px] bg-[linear-gradient(135deg,rgba(29,78,216,.06),rgba(29,78,216,.02))] border border-[rgba(29,78,216,.14)]">
        <div className="flex w-fit gap-2 px-4 py-2.5 mx-auto mb-3.5 rounded-full bg-[rgba(29,78,216,.08)] border border-[rgba(29,78,216,.15)] font-extrabold text-sm text-[#1E3A8A]">
          💬 আগে সন্দেহ ছিল, আজ মাসে ২৫,০০০-৫০,০০০+ টাকা আয় করছেন!
        </div>

        {/* Slider */}
        <div className="relative max-w-3xl mx-auto mb-6">
          <div className="p-6 md:p-8 rounded-[20px] bg-white border border-[#E2E8F0] shadow-[0_8px_24px_rgba(0,0,0,.06)]">
            <div className="flex items-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-[#F59E0B] text-lg">★</span>
              ))}
              <span className="text-sm font-bold text-[#64748B] ml-1">{sliderReviews[current].rating || "5.0/5"}</span>
            </div>
            <p className="text-sm md:text-base text-[#1E293B] leading-relaxed font-medium mb-4">
              &ldquo;{sliderReviews[current].text}&rdquo;
            </p>
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <div className="font-bold text-sm text-[#1E293B]">{sliderReviews[current].name}</div>
                <div className="text-xs text-[#64748B]">{sliderReviews[current].label}</div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3 mt-4">
            <button onClick={prev} className="w-9 h-9 rounded-xl border border-[#E2E8F0] bg-white flex items-center justify-center text-sm hover:border-[#1D4ED8] hover:text-[#1D4ED8] transition-all">←</button>
            {sliderReviews.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)} className={`w-2 h-2 rounded-full transition-all ${i === current ? "bg-[#1D4ED8] w-5" : "bg-[#CBD5E1]"}`} />
            ))}
            <button onClick={next} className="w-9 h-9 rounded-xl border border-[#E2E8F0] bg-white flex items-center justify-center text-sm hover:border-[#1D4ED8] hover:text-[#1D4ED8] transition-all">→</button>
          </div>
        </div>

        {/* Chat-style cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
          {chatTestimonials.map((t, i) => (
            <div key={i} className="rounded-[16px] p-4 bg-white border border-[#E2E8F0] shadow-[0_4px_12px_rgba(0,0,0,.04)]">
              <div className="flex items-center gap-2.5 mb-2.5">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#1D4ED8] to-[#FF6B35] flex items-center justify-center text-sm flex-shrink-0">{t.emoji}</div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-sm text-[#1E293B] truncate">{t.name}</div>
                  <div className="text-[10px] text-[#64748B] font-semibold">{t.platform}</div>
                </div>
                <div className="text-[#F59E0B] text-xs flex-shrink-0">★★★★★</div>
              </div>
              <p className="text-xs text-[#475569] leading-[1.7]">{t.text}</p>
            </div>
          ))}
        </div>

        {/* Review grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {(showAll ? reviewGrid : reviewGrid.slice(0, 4)).map((r, i) => (
            <div key={i} className={`rounded-[14px] p-4 bg-white border border-[#E2E8F0] ${!showAll && i >= 4 ? "hidden" : ""}`}>
              <div className="flex items-center gap-1 mb-1">
                <span className="text-[#F59E0B] text-sm">★★★★★</span>
                <span className="text-[10px] font-extrabold text-[#64748B]">{r.rating}</span>
              </div>
              <div className="font-bold text-sm text-[#1E293B] mb-1">{r.name}</div>
              <p className="text-xs text-[#475569] leading-[1.6]">{r.text}</p>
            </div>
          ))}
        </div>

        {!showAll && reviewGrid.length > 4 && (
          <button onClick={() => setShowAll(true)} className="w-full mt-3 py-3.5 rounded-[14px] border-2 border-[#1D4ED8] bg-transparent text-[#1D4ED8] font-extrabold text-sm cursor-pointer transition-all hover:bg-[rgba(29,78,216,.04)]">
            📢 আরো মতামত দেখুন ({reviewGrid.length - 4}টি)
          </button>
        )}
      </div>
    </section>
  );
}