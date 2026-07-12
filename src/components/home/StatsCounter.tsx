"use client";

export default function StatsCounter() {
  const items = [
    { num: "৮৬৬+", label: "সক্রিয় শিক্ষার্থী" },
    { separator: true },
    { num: "৪.৯★", label: "ফেসবুক মূল্যায়ন" },
    { separator: true },
    { num: "৮+ বছর", label: "পেশাদার অভিজ্ঞতা" },
    { separator: true },
    { num: "৫০,০০০+", label: "সর্বোচ্চ মাসিক আয়" },
    { separator: true },
    { chip: "⚡ সাথে সাথে অ্যাক্সেস" },
    { separator: true },
    { chip: "📚 লাইফটাইম আপডেট" },
    { separator: true },
    { chip: "✅ ২৪ ঘণ্টা ফেরত" },
  ];

  return (
    <div className="bg-white border-t border-b border-[#E2E8F0] py-3.5 px-3 w-full">
      <div className="max-w-[1100px] mx-auto flex justify-center items-center flex-wrap gap-x-4 gap-y-2">
        {items.map((item, i) => {
          if (item.separator) return <div key={i} className="w-px h-6 bg-[#E2E8F0]" />;
          if (item.chip) {
            return (
              <span key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-[#E2E8F0] text-[10px] sm:text-[11px] font-semibold text-text-secondary leading-none">
                {item.chip}
              </span>
            );
          }
          return (
            <div key={i} className="flex flex-col items-center gap-0.5">
              <span className="text-sm sm:text-base font-black text-text leading-tight">{item.num}</span>
              <span className="text-[10px] sm:text-[11px] font-semibold text-text-secondary leading-tight">{item.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
