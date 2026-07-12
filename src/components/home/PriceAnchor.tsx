"use client";

export default function PriceAnchor() {
  return (
    <div className="max-w-[1100px] w-[92%] mx-auto my-8 p-[24px_20px_22px] md:p-[24px_20px_22px] rounded-[20px] bg-[linear-gradient(135deg,rgba(29,78,216,.1),rgba(29,78,216,.06))] border-2 border-[rgba(29,78,216,.25)] text-center shadow-[0_8px_24px_rgba(29,78,216,.15)]">
      <div className="text-xs md:text-sm font-semibold text-[#64748B] mb-1 tracking-[0.4px]">🔥 ভ্যালু শক — নিজেই তুলনা করে দেখুন</div>
      <div className="text-sm md:text-base font-semibold text-[#64748B] mb-1">
        ২৩০+ কোর্সের বাজারমূল্য: <s className="text-lg md:text-2xl font-black">১০,০০,০০০+ টাকা</s>
      </div>
      <div className="text-[22px] md:text-[28px] font-black text-[#1E293B] my-1.5">
        আজকের অফার মূল্য: <span className="text-[28px] md:text-[36px] text-[#16A34A]">মাত্র ৯৯ টাকা</span>
      </div>
      <div className="inline-flex items-center gap-2 mt-2.5 px-4 py-3 md:px-6 md:py-3 rounded-[12px] bg-[rgba(255,191,0,.12)] border-2 border-[rgba(255,191,0,.28)] text-[#FFBF00] font-black text-[15px] md:text-[18px] shadow-[0_4px_12px_rgba(29,78,216,.15)]">
        🟢 আপনি বাঁচাচ্ছেন: <strong className="text-[18px] md:text-2xl text-[#FFBF00]">৯,৯৯,৯০১+ টাকা!</strong>
      </div>
      <div className="flex flex-wrap gap-2 justify-center mt-3.5">
        <span className="px-3 py-1 rounded-md bg-[rgba(255,191,0,.08)] text-[10px] md:text-[11px] font-bold text-[#FFBF00]">টেন মিনিট স্কুল: ৮৫,০০০+ টাকা</span>
        <span className="px-3 py-1 rounded-md bg-[rgba(255,191,0,.08)] text-[10px] md:text-[11px] font-bold text-[#FFBF00]">ঘুড়ি লার্নিং: ৫৫,০০০+ টাকা</span>
        <span className="px-3 py-1 rounded-md bg-[rgba(255,191,0,.1)] text-[10px] md:text-[11px] font-bold text-[#FFBF00]">আমাদের অফার: মাত্র ৯৯ টাকা</span>
      </div>
    </div>
  );
}
