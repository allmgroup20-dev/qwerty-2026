"use client";

export default function GoogleDrivePreview() {
  return (
    <section className="max-w-[1120px] mx-auto mt-6 md:mt-8 px-3.5 md:px-5" id="drive-preview">
      <div className="rounded-[20px] p-[18px_16px_16px] md:p-[20px] bg-[linear-gradient(135deg,rgba(29,78,216,.06),rgba(29,78,216,.02))] border border-[rgba(29,78,216,.14)]">
        <h3 className="text-lg md:text-xl font-black text-[#1E293B] mb-1 text-center">📁 গুগল ড্রাইভে কি আছে — এক নজরে দেখুন</h3>
        <p className="text-sm font-semibold text-[#64748B] mb-5 text-center">
          অ্যাক্টিভ হওয়ার পর আপনার গুগল ড্রাইভে ঠিক কেমন ফোল্ডার দেখতে পাবেন — তার একটি প্রিভিউ
        </p>

        <div className="rounded-[20px] p-5 bg-white border border-[#E2E8F0] shadow-[0_6px_20px_rgba(0,0,0,.06)] max-w-[600px] mx-auto">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#E2E8F0]">
            <span className="text-lg">📂</span>
            <span className="font-black text-sm text-[#1E293B]">My Drive &gt; Jobayer Group &gt; 99 Taka Bundle</span>
          </div>
          <div className="space-y-2">
            {[
              ["📁", "💼 ফ্রিল্যান্সিং ও অনলাইন আর্নিং", "৩২টি কোর্স"],
              ["📁", "🌍 ই-কমার্স ও অনলাইন ব্যবসা", "১৮টি কোর্স"],
              ["📁", "💻 প্রোগ্রামিং ও আইটি ডেভেলপমেন্ট", "২৫টি কোর্স"],
              ["📁", "📚 ভাষা শিক্ষা ও চাকরি প্রস্তুতি", "২৮টি কোর্স"],
              ["📁", "🎨 UI/UX, মাল্টিমিডিয়া ও থ্রিডি", "২২টি কোর্স"],
              ["📁", "🏛️ প্রতিষ্ঠানের কোর্সসমূহ", "৩৫টি কোর্স"],
              ["📁", "🛠️ সফটওয়্যার টুলস", "৪০টি কোর্স"],
              ["📁", "🔐 নোটস ও সুরক্ষা", "৫টি কোর্স"],
            ].map(([icon, name, count], i) => (
              <div key={i} className="flex items-center justify-between p-2.5 rounded-[10px] bg-[#F8FAFC] border border-[#E2E8F0]">
                <span className="flex items-center gap-2 text-sm font-semibold text-[#1E293B]">
                  <span>{icon}</span> {name}
                </span>
                <span className="text-xs text-[#64748B] bg-white px-2.5 py-1 rounded-full border border-[#E2E8F0]">{count}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-[#94A3B8] mt-3 text-center font-semibold">
          ⚡ কিনতেই অটোমেটিক গুগল ড্রাইভ এক্সেস পেয়ে যাবেন — কোনো ঝামেলা নেই!
        </p>
      </div>
    </section>
  );
}
