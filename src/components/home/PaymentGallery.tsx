"use client";

export default function PaymentGallery() {
  return (
    <section className="max-w-[1120px] mx-auto mt-6 md:mt-8 px-3.5 md:px-5" id="payment-gallery">
      <div className="rounded-[20px] p-[18px_16px_16px] md:p-[20px] bg-[linear-gradient(135deg,rgba(29,78,216,.06),rgba(29,78,216,.02))] border border-[rgba(29,78,216,.14)] text-center">
        <h3 className="text-lg md:text-xl font-black text-[#1E293B] mb-2.5">🖼️ আমাদের পেমেন্ট গ্যালারি</h3>
        <p className="text-sm font-semibold text-[#64748B] mb-5">
          আমরা প্রতিদিন শত শত শিক্ষার্থীর জন্য কোর্স অ্যাক্টিভ করে থাকি — নিচে দেখুন আমাদের কিছু পেমেন্ট স্ক্রিনশট
        </p>

        <div className="overflow-x-auto pb-2 scrollbar-none">
          <div className="flex gap-3.5" style={{ width: "max-content" }}>
            {[1, 2, 3, 4, 5].map((n) => (
              <div key={n} className="flex-shrink-0 w-[240px] md:w-[280px] rounded-[16px] overflow-hidden border border-[#E2E8F0] shadow-[0_6px_20px_rgba(0,0,0,.08)] bg-white">
                <div className="aspect-[4/3] bg-gradient-to-br from-[rgba(29,78,216,.06)] to-[rgba(255,107,53,.06)] flex items-center justify-center">
                  <span className="text-3xl">💳</span>
                </div>
                <div className="p-3.5">
                  <span className="font-black text-sm text-[#1E293B]">পেমেন্ট #{n}</span>
                  <div className="text-xs text-[#64748B] mt-0.5">জুলাই ২০২৬</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
