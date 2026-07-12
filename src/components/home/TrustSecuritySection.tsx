"use client";

export default function TrustSecuritySection() {
  const badges = [
    { icon: "🔒", text: "SSL সুরক্ষিত", color: "bg-white border-border text-[#1E293B]" },
    { icon: "✅", text: "২৪ ঘণ্টা — কোনো শর্ত ছাড়াই টাকা ফেরত", color: "bg-[rgba(16,185,129,.1)] border-[rgba(16,185,129,.3)] text-[#10B981]" },
    { icon: "⚡", text: "সাথে সাথে এক্সেস", color: "bg-white border-border text-[#1E293B]" },
    { icon: "📞", text: "২৪/৭ কাস্টমার সাপোর্ট", color: "bg-white border-border text-[#1E293B]" },
  ];

  return (
    <section className="max-w-[900px] mx-auto mt-6 md:mt-8 px-3.5 md:px-5">
      <div className="flex w-fit gap-2 px-4 py-2.5 mx-auto mb-4 rounded-full bg-primary/10 border border-primary/20 font-extrabold text-sm text-[#1E3A8A]">
        🔒 বিশ্বাসযোগ্যতা ও নিরাপত্তা
      </div>

      <div className="flex flex-wrap gap-3 justify-center mb-4">
        {badges.map((badge) => (
          <span key={badge.text} className={`flex items-center gap-1.5 px-4 py-3 rounded-[14px] border font-extrabold text-sm shadow-sm ${badge.color}`}>
            {badge.icon} {badge.text}
          </span>
        ))}
      </div>

      <div className="p-4 rounded-[14px] bg-[rgba(16,185,129,.12)] border-2 border-[rgba(16,185,129,.35)] text-center text-sm font-bold text-[#10B981] leading-relaxed">
        🔑 বিনিময়ে পাচ্ছেন <strong>১০ লক্ষ টাকার কোর্স বান্ডেল</strong> — আপনার কোনো ঝুঁকি নেই!
      </div>
    </section>
  );
}
