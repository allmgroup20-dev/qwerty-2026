"use client";

import { useState, useEffect, useRef } from "react";

const slides = [
  {
    stars: "★★★★★",
    rating: "5.0/5",
    quote: "আমি আগে কখনো অনলাইনে কাজ করিনি। জোবায়ের গ্রুপের নির্দেশিকা আর সহায়তার কারণে আজ আমি নিজের ল্যাপটপ থেকে মাসে ২৫,০০০+ টাকা ইনকাম করছি। শুরুটা ছিল ৯৯ টাকা, কিন্তু ভ্যালু পেয়েছি লক্ষ টাকার বেশি!",
    author: "মিতা ইসলাম",
    label: "ফ্রিল্যান্সার, সিলেট",
  },
  {
    stars: "★★★★★",
    rating: "4.9/5",
    quote: "ইউটিউবে অনেক কিছু ফ্রিতে পাওয়া যায়, কিন্তু স্ট্রাকচার আর দিকনির্দেশনা ছাড়া শেখা অসম্পূর্ণ। এই কোর্সটা আমাকে রিয়েল মার্কেটের জন্য প্রস্তুত করেছে। এখন নিয়মিত ক্লায়েন্ট পাচ্ছি। সবার কাছে রেকমেন্ড করব!",
    author: "নীলা হোসেন",
    label: "ডিজিটাল মার্কেটার, ঢাকা",
  },
  {
    stars: "★★★★★",
    rating: "5.0/5",
    quote: "শুরুতে ভেবেছিলাম এটা আর দশটা অনলাইন স্ক্যাম হবে। কিন্তু জোবায়ের গ্রুপের ট্রান্সপারেন্সি আর রিয়েল শিক্ষার্থী ফলাফল দেখে কনফিডেন্ট হলাম। ৭ মাসে এখন মাসিক আয় ৪০,০০০+। সবচেয়ে বড় কথা, একটা সহায়ক কমিউনিটি পেয়েছি।",
    author: "রাফসান জามান",
    label: "ই-কমার্স আর্নার, চট্টগ্রাম",
  },
];

const chatCards = [
  {
    avatar: "🌸",
    gradient: "from-[#1D4ED8] to-[#FF6B35]",
    name: "রোজিনা আক্তার",
    platform: "ফেসবুক গ্রুপ · ২ সপ্তাহ আগে",
    stars: "★★★★★",
    msg: "প্রথম বোনাস পাওয়ার দিনটা এখনো মনে আছে। নিজের চেষ্টায় কিছু অর্জনের অনুভূতি অসাধারণ! মাত্র ৯৯ টাকা দিয়ে শুরু করে আজ মাসে ২৫,০০০+ টাকা আয় করছি। যারা দ্বিধায় আছেন, তাদের বলব—শুরু করে দেখুন!",
    time: "গতকাল ৩:৪২ PM",
  },
  {
    avatar: "🌿",
    gradient: "from-[#1D4ED8] to-[#FF6B35]",
    name: "পূর্ণিমা বেগম",
    platform: "হোয়াটসঅ্যাপ গ্রুপ · ১ মাস আগে",
    stars: "★★★★★",
    msg: "আমি গ্রামের মেয়ে। আগে ভাবতাম অনলাইনে কাজ করা শুধু শহরের ছেলেমেয়েদের জন্য। কিন্তু এই প্ল্যাটফর্মে যুক্ত হওয়ার পর আমার চোখ খুলে গেছে। এখন ঘরে বসে কাজ করি আর পরিবারকে সাহায্য করি।",
    time: "গত সপ্তাহে ১১:১৫ AM",
  },
  {
    avatar: "💪",
    gradient: "from-[#1D4ED8] to-[#FF6B35]",
    name: "ফারিয়া ইসলাম",
    platform: "ফেসবুক মেসেঞ্জার · ৩ সপ্তাহ আগে",
    stars: "★★★★★",
    msg: "শেখার সুযোগ আর আয়—দুটোই পাচ্ছি এখান থেকে। সঠিক নির্দেশিকা আর সহায়তা পেলে যে কেউ সফল হতে পারে। আমি এখন ৬ মাস ধরে যুক্ত আর প্রতিদিন নতুন কিছু শিখছি। ধন্যবাদ জোবায়ের গ্রুপ টিমকে!",
    time: "গতকাল ৭:০৮ PM",
  },
  {
    avatar: "🔥",
    gradient: "from-[#1D4ED8] to-[#FF6B35]",
    name: "তামান্না হাসান",
    platform: "হোয়াটসঅ্যাপ · ৫ দিন আগে",
    stars: "★★★★★",
    msg: "আমার জন্য এটি নতুন দিগন্ত খুলে দিয়েছে। প্রথমে ভয় ছিল, কিন্তু টিমের সহায়তায় সব ভয় কেটে গেছে। এখন ইনকাম শুরু করেছি, খুব ভালো লাগছে। এখন আমি অনলাইন জগত নিয়ে অনেক বেশি আত্মবিশ্বাসী!",
    time: "গতকাল ৯:২২ PM",
  },
];

const hiddenReviews = [
  { stars: "★★★★★", rating: "4.9/5", name: "নীলা হোসেন", text: "আমি শুরুতে ভেবেছিলাম এটা হয়তো অন্য অনেক অনলাইন সুযোগের মতোই হবে। কিন্তু কাজ শুরু করার পর বুঝলাম এখানে নিয়মিত নির্দেশিকা দেওয়া হয় এবং নতুনদের শেখানোর জন্য আলাদা সহায়তা রয়েছে। এখন প্রতি মাসে নিয়মিত কাজ করছি এবং সময়মতো পেমেন্ট পাচ্ছি। সবচেয়ে ভালো লেগেছে শেখার সুযোগগুলো।" },
  { stars: "★★★★★", rating: "5.0/5", name: "মিতা ইসলাম", text: "আমি আগে কোনো অনলাইন কাজ করিনি। এখানে যোগ দেওয়ার পর ধাপে ধাপে কাজ শিখেছি। কাজের পাশাপাশি অনেক স্কিল ডেভেলপমেন্ট রিসোর্সও পেয়েছি। পরিবারের পাশে থেকে কাজ করতে পারছি, এটা আমার জন্য সবচেয়ে বড় সুবিধা।" },
  { stars: "★★★★★", rating: "5.0/5", name: "রাফসান জামান", text: "ই-কমার্সে কাজ করে মাসে ৪০,০০০+ ইনকাম করছি। শুরুতে কেউ বিশ্বাস করেনি, কিন্তু আজ আমি প্রমাণ করেছি। সবার দোয়া চাই।" },
  { stars: "★★★★★", rating: "4.9/5", name: "সাবরিনা খান", text: "ডিজিটাল মার্কেটিং শিখে এখন নিজেই ক্লায়েন্ট ম্যানেজ করি। এটা শুধু আয়ের জায়গা না, এটি পেশা গড়ার জায়গা।" },
  { stars: "★★★★★", rating: "4.8/5", name: "রেহানা বেগম", text: "গৃহিণী হয়েও অনলাইনে কাজ করা সম্ভব—এটা প্রমাণ করেছি নিজেই। মাসে ভালো ইনকাম করছি।" },
  { stars: "★★★★★", rating: "4.9/5", name: "নাদিয়া সুলতানা", text: "প্রথম প্রথম কাজ পেতে সময় লেগেছে, কিন্তু এখন নিয়মিত আয়। সবার ধৈর্য ধরাটা জরুরি।" },
  { stars: "★★★★★", rating: "5.0/5", name: "নাজনীন আক্তার", text: "যারা শুরু করতে চান তাদের বলব—ভয় না করে শুরু করুন। সঠিক নির্দেশিকা পেলে সফলতা আসবেই।" },
  { stars: "★★★★★", rating: "5.0/5", name: "তামান্না হাসান", text: "আমার জন্য এটি নতুন দিগন্ত খুলে দিয়েছে। এখন আমি অনলাইন জগত নিয়ে অনেক বেশি আত্মবিশ্বাসী।" },
  { stars: "★★★★★", rating: "4.9/5", name: "মর্জিনা খাতুন", text: "প্রথমে ভয় ছিল, কিন্তু টিমের সহায়তায় সব ভয় কেটে গেছে। এখন ইনকাম শুরু করেছি, খুব ভালো লাগছে।" },
  { stars: "★★★★★", rating: "5.0/5", name: "শামীমা আক্তার", text: "যারা এখনো শুরু করেননি, তাদের বলব—সময় নষ্ট না করে শুরু করুন। সঠিক নির্দেশিকা পেতে দেরি করবেন না।" },
  { stars: "★★★★★", rating: "4.9/5", name: "ফারিয়া ইসলাম", text: "শেখার সুযোগ আর আয়—দুটোই পাচ্ছি। যারা শুরু করবেন, তাদের জন্য এটি সেরা জায়গা।" },
  { stars: "★★★★★", rating: "5.0/5", name: "আনিকা ইসলাম", text: "ই-কমার্সে কাজ করে মাসে ৪০,০০০+ ইনকাম করছি। শুরুতে কেউ বিশ্বাস করেনি, কিন্তু আজ আমি প্রমাণ করেছি।" },
  { stars: "★★★★★", rating: "4.9/5", name: "সাবিকুন নাহার", text: "সঠিক নির্দেশিকা এবং সহায়তা পেলে যে কেউ সফল হতে পারে। আমি তার উদাহরণ।" },
  { stars: "★★★★★", rating: "5.0/5", name: "নুসরাত জাহান", text: "নতুনদের ছোট করে দেখা হয় না, যে কোনো প্রশ্নের উত্তর ধৈর্য সহকারে দেওয়া হয়। এটাই আমার সবচেয়ে পছন্দের দিক।" },
  { stars: "★★★★★", rating: "4.8/5", name: "ইভা রহমান", text: "শুরুতে ধৈর্য ধরে কাজ করতে হবে, কিন্তু ফলাফল ভালো। আমি এখন সন্তুষ্ট।" },
  { stars: "★★★★★", rating: "4.9/5", name: "মামুন মিয়া", text: "যারা দ্বিধায় আছেন তাদের বলব, শুরু করে দিন। এখানে সঠিক দিকনির্দেশনা পাবেন।" },
  { stars: "★★★★★", rating: "5.0/5", name: "মোর্শেদ মিয়া", text: "পেশাদার পরিবেশ আর নিয়মিত কাজ — এটাই সবার জন্য দরকার।" },
];

export default function Testimonials() {
  const [slideIdx, setSlideIdx] = useState(0);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const intervalRef = useRef<any>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => setSlideIdx((p) => (p + 1) % slides.length), 4000);
    return () => clearInterval(intervalRef.current);
  }, []);

  const goTo = (n: number) => {
    setSlideIdx(n);
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => setSlideIdx((p) => (p + 1) % slides.length), 4000);
  };

  return (
    <section className="max-w-[1120px] mx-auto mt-6 md:mt-8 px-3.5 md:px-5" id="reviewSection">
      <div className="flex w-fit gap-2 px-4 py-2.5 mx-auto mb-4 rounded-full bg-primary/10 border border-primary/20 font-extrabold text-sm text-[#1E3A8A]">
        💬 আগে সন্দেহ ছিল, আজ মাসে ২৫,০০০-৫০,০০০+ টাকা আয় করছেন!
      </div>

      <div className="overflow-hidden relative mt-4">
        <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${slideIdx * 100}%)` }}>
          {slides.map((slide, i) => (
            <div key={i} className="min-w-full px-2.5 box-border">
              <div className="p-6 md:p-7 rounded-[16px] bg-white border border-border shadow-md text-center">
                <div className="text-[#1D4ED8] text-xl mb-2.5">{slide.stars} <span className="text-text-secondary text-sm font-bold">{slide.rating}</span></div>
                <p className="text-sm text-text leading-relaxed mb-3.5 italic">&ldquo;{slide.quote}&rdquo;</p>
                <div className="font-bold text-sm text-[#1D4ED8]">{slide.author}</div>
                <div className="text-xs text-text-secondary font-semibold">{slide.label}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-2 mt-3.5">
          {slides.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} className={`w-2.5 h-2.5 rounded-full border-none p-0 cursor-pointer transition-all ${i === slideIdx ? "bg-[#1D4ED8] scale-125" : "bg-[#E2E8F0]"}`} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-5">
        {chatCards.map((card, i) => (
          <div key={i} className="relative p-4 rounded-[16px] bg-white border border-border shadow-sm">
            <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-[4px]" style={{ background: "linear-gradient(180deg,#1D4ED8,#FF6B35)" }} />
            <div className="flex items-center gap-2.5 mb-2">
              <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${card.gradient} flex items-center justify-center text-base font-black text-white shrink-0`}>
                {card.avatar}
              </div>
              <div>
                <div className="font-extrabold text-sm text-text">{card.name}</div>
                <div className="text-[11px] text-text-secondary font-semibold">{card.platform}</div>
              </div>
              <div className="ml-auto text-[#1D4ED8] text-xs">{card.stars}</div>
            </div>
            <div className="ml-2 p-3 rounded-xl bg-[rgba(255,255,255,.06)] text-[13px] text-text leading-relaxed relative">
              {card.msg}
            </div>
            <div className="text-[11px] text-text-secondary font-semibold text-right mt-1.5">{card.time}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
        {(showAllReviews ? hiddenReviews : hiddenReviews.slice(0, 4)).map((review, i) => (
          <div key={i} className="p-4 rounded-[16px] bg-white border border-border shadow-sm">
            <div className="text-[#1D4ED8] text-sm mb-1.5">{review.stars} <span className="text-text-secondary text-xs font-bold">{review.rating}</span></div>
            <div className="font-bold text-sm text-text mb-1.5 pl-2 border-l-[3px] border-[#1D4ED8]">{review.name}</div>
            <div className="text-[13px] text-text leading-relaxed">{review.text}</div>
          </div>
        ))}
        {!showAllReviews && (
          <button onClick={() => setShowAllReviews(true)} className="col-span-1 md:col-span-2 p-3.5 rounded-xl border-2 border-[#1D4ED8] bg-transparent text-[#1D4ED8] font-extrabold text-sm cursor-pointer transition-all hover:bg-[rgba(30,58,90,.04)]">
            📢 আরো মতামত দেখুন ({hiddenReviews.length}টি)
          </button>
        )}
      </div>
    </section>
  );
}
