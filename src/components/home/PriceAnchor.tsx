"use client";

export default function PriceAnchor() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 my-8 animate-fade-up">
      <div className="p-8 md:p-10 rounded-3xl bg-gradient-to-br from-[#F8FAFC] to-white border-2 border-[#2563EB]/20 text-center shadow-[0_8px_32px_rgba(37,99,235,0.1)]">
        <div className="text-xs md:text-sm font-semibold text-[#64748B] mb-2 tracking-widest uppercase">
          🔥 Value Shock — Compare Yourself
        </div>
        <div className="text-sm md:text-base font-semibold text-[#64748B] mb-3">
          230+ Courses Market Value:{" "}
          <s className="text-xl md:text-3xl font-black text-[#94A3B8]">৳১০,০০,০০০+</s>
        </div>
        <div className="text-2xl md:text-4xl font-black text-[#1E293B] mb-4">
          Today Only:{" "}
          <span className="text-[#059669] text-3xl md:text-5xl">৳৯৯</span>
        </div>
        <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-[#F59E0B]/10 border-2 border-[#F59E0B]/20">
          <span className="text-[#F59E0B] font-black text-lg">You Save:</span>
          <span className="text-[#D97706] font-black text-2xl md:text-3xl">৳৯৯,৯৯,৯০১</span>
        </div>
        <div className="mt-6 p-4 rounded-2xl bg-[#2563EB]/5 border border-[#2563EB]/10">
          <p className="text-sm text-[#64748B] font-semibold leading-relaxed">
            📊 <strong>১০ লক্ষ টাকার কোর্স মাত্র ৯৯ টাকায়!</strong> কোর্স পছন্দ না হলে ২৪ ঘণ্টার মধ্যে টাকা ফেরত — আপনার কোনো ঝুঁকি নেই, শুধু লাভ!
          </p>
        </div>
      </div>
    </div>
  );
}
