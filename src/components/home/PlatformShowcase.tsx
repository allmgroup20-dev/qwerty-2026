"use client";

import Image from "next/image";
import { platforms } from "@/data/landing-page-data";

export default function PlatformShowcase() {
  return (
    <div className="rounded-2xl p-5 md:p-6 bg-white border border-border">
      <div className="section-header">
        <div className="badge mx-auto mb-3 border-primary/20 bg-primary/10 text-primary">🏛️ প্ল্যাটফর্মসমূহ</div>
        <h3 className="text-lg md:text-xl font-black text-text">যেসব প্ল্যাটফর্মের কোর্স আপনি পাচ্ছেন</h3>
        <p className="text-sm font-semibold text-text-secondary mt-1">মোট {platforms.length}টি প্রতিষ্ঠানের কোর্স — সব একসাথে</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {platforms.map((p) => (
          <div key={p.name} className="flex flex-col items-center gap-2 p-4 rounded-xl bg-bg border border-border hover:shadow-md hover:-translate-y-0.5 transition-all">
            <div className="w-16 h-16 rounded-xl overflow-hidden bg-white relative flex items-center justify-center">
              <Image src={p.logo} alt={p.nameBn} width={56} height={56} className="object-contain" />
            </div>
            <span className="font-bold text-xs text-text text-center leading-tight">{p.nameBn}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
