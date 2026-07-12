"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

const sections = [
  { id: "home", icon: "🏠", label: "হোম", scrollTo: () => window.scrollTo({ top: 0, behavior: "smooth" }) },
  { id: "courses", icon: "📚", label: "কোর্স", el: "courses" },
  { id: "earnings", icon: "💰", label: "লাইভ আয়", el: "earnings" },
  { id: "reviewSection", icon: "⭐", label: "মতামত", el: "reviewSection" },
];

export default function BottomStickyNav() {
  const btnsRef = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const btns = btnsRef.current;
    const updateActive = () => {
      const scrollY = window.scrollY;
      const viewH = window.innerHeight;
      let bestIdx = 0;
      let bestScore = -Infinity;
      sections.forEach((s, i) => {
        if (s.id === "home") {
          if (scrollY < viewH * 0.5) { bestIdx = i; bestScore = viewH; }
          return;
        }
        const el = document.getElementById(s.id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const visible = Math.min(rect.bottom, viewH) - Math.max(rect.top, 0);
        if (visible > bestScore) { bestScore = visible; bestIdx = i; }
      });
      btns.forEach((btn, i) => btn?.classList.toggle("active", i === bestIdx));
    };
    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, []);

  const handleClick = (s: typeof sections[0]) => {
    if (s.scrollTo) { s.scrollTo(); return; }
    const el = document.getElementById(s.id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-[9999] bg-white/95 backdrop-blur-md border-t border-[#E2E8F0] shadow-[0_-4px_24px_rgba(0,0,0,.06)]">
      <div className="flex items-center gap-0 px-2 py-1">
        <div className="flex flex-1 gap-0 justify-around min-w-0">
          {sections.map((s, i) => (
            <button
              key={s.id}
              ref={(el) => { btnsRef.current[i] = el; }}
              onClick={() => handleClick(s)}
              className="flex flex-col items-center justify-center gap-0 flex-1 min-w-0 border-none bg-transparent text-[#94A3B8] font-bold text-[10px] cursor-pointer transition-all min-h-[44px] relative"
            >
              <span className="text-[17px] leading-tight">{s.icon}</span>
              <span className="text-[10px] leading-tight mt-0.5">{s.label}</span>
            </button>
          ))}
        </div>
        <Link
          href="/register"
          className="flex items-center justify-center gap-1 px-3 py-2 min-h-[44px] rounded-[10px] bg-gradient-to-r from-[#FF6B35] to-[#E85D2C] text-white font-extrabold text-xs no-underline shadow-[0_6px_20px_rgba(234,88,12,.35)] shrink-0"
        >
          🚀 শুরু করুন
        </Link>
      </div>
    </nav>
  );
}
