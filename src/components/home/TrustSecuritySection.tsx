"use client";

export default function TrustSecuritySection() {
  return (
    <section className="max-w-[1120px] mx-auto mt-6 md:mt-8 px-3.5 md:px-5">
      <div className="rounded-[20px] p-[18px_16px_16px] md:p-[20px] bg-[linear-gradient(135deg,rgba(29,78,216,.06),rgba(29,78,216,.02))] border border-[rgba(29,78,216,.14)]">
        <div className="flex w-fit gap-2 px-4 py-2.5 mx-auto mb-4 rounded-full bg-[rgba(29,78,216,.08)] border border-[rgba(29,78,216,.15)] font-extrabold text-sm text-[#1E3A8A]">
          🔒 বিশ্বাসযোগ্যতা ও নিরাপত্তা
        </div>

        <div className="flex flex-wrap gap-2.5 justify-center mb-4">
          {[
            { icon: "🔒", label: "SSL সুরক্ষিত পেমেন্ট", color: "var(--card)" },
            { icon: "✅", label: "২৪ ঘণ্টা — কোনো শর্ত ছাড়াই টাকা ফেরত", color: "rgba(16,185,129,.1)" },
            { icon: "⚡", label: "পেমেন্টের সাথে সাথে এক্সেস", color: "var(--card)" },
            { icon: "📞", label: "২৪/৭ কাস্টমার সাপোর্ট", color: "var(--card)" },
          ].map((badge, i) => (
            <span key={i} className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-[14px] border font-extrabold text-xs text-[#1E293B] shadow-[0_4px_12px_rgba(0,0,0,.04)]" style={{ background: badge.color, borderColor: "var(--border)" }}>
              {badge.icon} {badge.label}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 justify-center mb-3 p-3.5 rounded-[16px] bg-[linear-gradient(135deg,rgba(29,78,216,.06),rgba(234,88,12,.05))] border border-[rgba(29,78,216,.12)] text-center">
          <span className="font-bold text-sm text-[#1E293B] leading-[1.7]">
            💳 আমরা গ্রহণ করি:{' '}
            <span className="inline-flex items-center gap-1 ml-1.5 px-3 py-1 rounded-full bg-[rgba(209,32,83,.08)] text-[#d12053] font-extrabold text-xs">বিকাশ</span>
            <span className="inline-flex items-center gap-1 ml-1 px-3 py-1 rounded-full bg-[rgba(246,146,30,.08)] text-[#e8731a] font-extrabold text-xs">নগদ</span>
            <span className="inline-flex items-center gap-1 ml-1 px-3 py-1 rounded-full bg-[rgba(226,19,110,.08)] text-[#e2136e] font-extrabold text-xs">রকেট</span>
            <span className="inline-flex items-center gap-1 ml-1 px-3 py-1 rounded-full bg-[rgba(29,78,216,.08)] text-[#1D4ED8] font-extrabold text-xs">SSL কমার্জ</span>
          </span>
        </div>

        <div className="text-center p-3.5 rounded-[14px] bg-[rgba(16,185,129,.12)] border-2 border-[rgba(16,185,129,.35)] font-bold text-sm text-[#16A34A] leading-[1.7]">
          🔑 এটি কোনো ফি নয় — শুধু আপনার আগ্রহ যাচাইয়ের জন্য ৯৯ টাকা। বিনিময়ে পাচ্ছেন <strong>১০ লক্ষ টাকার কোর্স বান্ডেল</strong> — আপনার কোনো ঝুঁকি নেই!
        </div>
      </div>
    </section>
  );
}