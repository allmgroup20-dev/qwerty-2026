"use client";

export default function SalaryTable() {
  return (
    <section className="max-w-[1120px] mx-auto mt-6 md:mt-8 px-3.5 md:px-5" id="earnings">
      <div className="rounded-[20px] p-[18px_16px_16px] md:p-[20px] bg-[linear-gradient(135deg,rgba(29,78,216,.06),rgba(29,78,216,.02))] border border-[rgba(29,78,216,.14)]">
        <h3 className="text-lg md:text-xl font-black text-[#1E293B] mb-2.5 flex items-center gap-2">
          📊 শুধু কোর্স না — রিয়েল টাকা আয়ের ড্যাশবোর্ড
        </h3>
        <p className="text-sm font-semibold text-[#64748B] mb-5">
          এই শিক্ষার্থীরা আমাদের কোর্স করেই ঘরে বসে মাসে আয় করছেন — আপনার পালা কখন?
        </p>

        <div className="overflow-x-auto pb-2 scrollbar-thin">
          <table className="w-full min-w-[680px] border-collapse rounded-[14px] overflow-hidden shadow-[0_6px_20px_rgba(0,0,0,.06)]">
            <thead>
              <tr className="bg-gradient-to-r from-[#1D4ED8] to-[#FF6B35] text-white">
                {["শিক্ষার্থী", "কোর্স", "প্ল্যাটফর্ম", "মাসিক আয়", "বৃদ্ধি"].map((h) => (
                  <th key={h} className="p-3.5 text-left text-xs font-extrabold tracking-[0.3px]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["রাজিব হাসান", "ডিজিটাল মার্কেটিং", "Fiverr", "৳৪৫,০০০", "↑ ১৮০%"],
                ["সাদিয়া ইসলাম", "UI/UX ডিজাইন", "Upwork", "৳৫২,০০০", "↑ ২১০%"],
                ["করিম মিয়া", "ফুল স্ট্যাক ডেভ", "Freelancer.com", "৳৬৮,০০০", "↑ ৩২০%"],
                ["নাহিদা বেগম", "ই-কমার্স", "Shopify", "৳৫৫,০০০", "↑ ২৫০%"],
                ["ফয়সাল আহমেদ", "SEO মার্কেটিং", "Upwork", "৳৩৮,০০০", "↑ ১৫০%"],
              ].map((row, i) => (
                <tr key={i} className="border-b border-[#E2E8F0] hover:bg-[rgba(29,78,216,.04)] transition-colors" style={{ background: i % 2 === 0 ? "#ffffff" : "#F8FAFC" }}>
                  {row.map((cell, j) => (
                    <td key={j} className={`p-3.5 text-sm ${j === 0 ? "font-bold text-[#1E293B]" : j === 1 ? "font-semibold text-[#475569]" : j === 4 ? "font-extrabold text-[#16A34A]" : "font-semibold text-[#64748B]"}`}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-xs font-semibold text-[#94A3B8] mt-3 text-center">
          *গড় আয়ের তথ্য — শিক্ষার্থীদের প্রকৃত সাফল্যের ভিত্তিতে
        </p>
      </div>
    </section>
  );
}
