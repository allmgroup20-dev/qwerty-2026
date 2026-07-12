"use client";

export default function ProblemSolutionCards() {
  return (
    <section className="max-w-[1120px] mx-auto mt-6 md:mt-8 px-3.5 md:px-5">
      <div className="flex w-fit gap-2 px-4 py-2.5 mx-auto mb-4 rounded-full bg-[rgba(29,78,216,.08)] border border-[rgba(29,78,216,.15)] font-extrabold text-sm text-[#1E3A8A]">
        🤔 আপনি কি এই সমস্যাগুলোর মুখোমুখি?
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        <div className="rounded-[20px] p-[18px_16px] md:p-[20px] bg-[linear-gradient(135deg,rgba(220,38,38,.04),rgba(220,38,38,.02))] border border-[rgba(220,38,38,.12)]">
          <h3 className="text-[#DC2626] font-black text-base md:text-lg mb-3">❌ আজকের অনলাইন লার্নিং এর বড় বড় সমস্যা</h3>
          <ul className="list-none p-0 m-0 grid gap-2">
            {[
              "প্রিমিয়াম কোর্সের দাম ১০,০০০-৮৫,০০০+ টাকা — সবার জন্য affordable না",
              "ইউটিউবে ভালো কন্টেন্ট আছে কিন্তু স্ট্রাকচারড গাইডেন্স ও রোডম্যাপ নেই",
              "বিভিন্ন প্ল্যাটফর্মে ছড়িয়ে ছিটিয়ে থাকা কোর্স — এক জায়গায় পাবেন না",
              "কোন স্কিল প্রথমে শিখবেন, কীভাবে শুরু করবেন — সঠিক দিকনির্দেশনা নেই",
              "শেখার পর কীভাবে ইনকাম শুরু করবেন — সেই পথ দেখায় না অধিকাংশ কোর্স",
            ].map((item) => (
              <li key={item} className="flex gap-2.5 items-start text-sm font-bold text-[#1E293B] leading-[1.65]">
                <span className="w-6 h-6 rounded-full flex items-center justify-center bg-[rgba(220,38,38,.12)] text-[#DC2626] font-black text-xs mt-0.5 shrink-0">⚠️</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-[20px] p-[18px_16px] md:p-[20px] bg-[linear-gradient(135deg,rgba(22,163,74,.04),rgba(22,163,74,.02))] border border-[rgba(22,163,74,.12)]">
          <h3 className="text-[#16A34A] font-black text-base md:text-lg mb-3">✅ জোবায়ের গ্রুপ পেশা — সম্পূর্ণ সমাধান</h3>
          <ul className="list-none p-0 m-0 grid gap-2">
            {[
              "২৩০+ প্রিমিয়াম কোর্স — ১০ লক্ষ টাকার কন্টেন্ট!",
              "১০টি বিভাগে A-Z স্ট্রাকচারড কোর্স — এক জায়গায় সম্পূর্ণ সিলেবাস",
              "বিগিনার থেকে পেশাদার — প্রতিটি ধাপে স্টেপ-বাই-স্টেপ গাইডেন্স",
              "ক্লায়েন্ট খোঁজার গাইড — শেখার পরপরই আয় শুরু করুন",
              "লাইফটাইম অ্যাক্সেস + ফ্রি আপডেট — আজীবনের জন্য আপনার সম্পদ",
            ].map((item) => (
              <li key={item} className="flex gap-2.5 items-start text-sm font-bold text-[#1E293B] leading-[1.65]">
                <span className="w-6 h-6 rounded-full flex items-center justify-center bg-[rgba(22,163,74,.12)] text-[#16A34A] font-black text-xs mt-0.5 shrink-0">✅</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
