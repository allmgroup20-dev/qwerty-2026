"use client";

import { useEffect, useRef } from "react";

const sections = [
  { id: "home", icon: "🏠", label: "হোম", scrollTo: () => window.scrollTo({ top: 0, behavior: "smooth" }) },
  { id: "courses", icon: "📚", label: "কোর্স", el: "courses" },
  { id: "earnings", icon: "💰", label: "লাইভ আয়", el: "earnings" },
  { id: "reviewSection", icon: "⭐", label: "মতামত", el: "reviewSection" },
];

export default function BottomStickyNav() {
  const navRef = useRef<HTMLDivElement>(null);
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
    <div ref={navRef} className="fixed bottom-0 left-0 right-0 z-[9998] md:hidden bg-white/95 backdrop-blur-md border-t border-[#E2E8F0] shadow-[0_-4px_20px_rgba(0,0,0,.08)]">
      <div className="flex items-center">
        {sections.map((s, i) => (
          <button
            key={s.id}
            ref={(el) => { btnsRef.current[i] = el; }}
            onClick={() => handleClick(s)}
            className="flex-1 flex flex-col items-center gap-0.5 py-2.5 border-none bg-transparent text-[#94A3B8] font-bold text-[10px] cursor-pointer transition-all active"
          >
            <span className="text-lg">{s.icon}</span>
            <span>{s.label}</span>
          </button>
        ))}
        <a
          href="/register"
          className="flex flex-col items-center gap-0.5 py-2.5 px-4 bg-gradient-to-r from-[#FF6B35] to-[#E85D2C] text-white font-extrabold text-[10px] no-underline cursor-pointer"
        >
          <span className="text-lg">🔥</span>
          <span>শুরু করুন</span>
        </a>
      </div>
    </div>
  );
}