"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguageStore } from "@/lib/store";
import { salaryNames } from "@/data/landing-page-data";

type RowData = { name: string; amount: number; status: string; success: boolean };

function seededRandom(seed: number) {
  return Math.abs(Math.sin(seed) * 10000) % 1;
}

function generateRow(index: number): RowData {
  const seed = index * 999;
  const name = salaryNames[Math.floor(seededRandom(seed) * salaryNames.length)];
  const success = [7, 12, 22, 29, 38, 46, 55, 68, 79, 89].includes(index % 100);
  const amount = success
    ? Math.floor(seededRandom(seed + 2) * 1501) + 1000
    : Math.floor(seededRandom(seed + 3) * 136) + 15;
  const status = success ? "নগদে ট্রান্সফার হয়েছে" : "বোনাস দেওয়া হয়েছে";
  return { name, amount, status, success };
}

function toBn(v: number) {
  return String(v).replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[parseInt(d, 10)]);
}

export default function SalaryTable() {
  const { lang } = useLanguageStore();
  const [rows, setRows] = useState<RowData[]>([]);
  const ref = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const baseRef = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const parent = el.parentElement!;
    let lastTop = -1;

    const scroll = () => {
      const top = parent.scrollTop;
      if (top === lastTop) { rafRef.current = requestAnimationFrame(scroll); return; }
      lastTop = top;
      const itemH = 58;
      const startIdx = Math.floor(top / itemH);
      if (startIdx !== baseRef.current) {
        baseRef.current = startIdx;
        setRows(Array.from({ length: 14 }, (_, i) => generateRow(startIdx + i)));
      }
      rafRef.current = requestAnimationFrame(scroll);
    };
    rafRef.current = requestAnimationFrame(scroll);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  return (
    <div className="rounded-2xl p-5 md:p-6 bg-white border border-border">
      <div className="section-header">
        <div className="badge mx-auto mb-3 border-success/20 bg-success/10 text-success">📊 {lang === "bn" ? "লাইভ আপডেট" : "Live Updates"}</div>
        <h3 className="text-lg md:text-xl font-black text-text">{lang === "bn" ? "শিক্ষার্থীদের আয়ের তালিকা" : "Student Earnings Table"}</h3>
        <p className="text-sm font-semibold text-text-secondary mt-1">{lang === "bn" ? "প্রতি মুহূর্তে আপডেট হচ্ছে" : "Updating in real-time"}</p>
      </div>

      <div className="rounded-xl bg-bg border border-border overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-border">
          <span className="font-black text-xs text-text-secondary">{lang === "bn" ? "শিক্ষার্থী" : "Student"}</span>
          <span className="font-black text-xs text-text-secondary">{lang === "bn" ? "আয় (টাকা)" : "Earning (BDT)"}</span>
          <span className="font-black text-xs text-text-secondary">{lang === "bn" ? "স্ট্যাটাস" : "Status"}</span>
        </div>
        <div ref={ref} className="overflow-hidden" style={{ height: 812 }}>
          {rows.map((row, i) => (
            <div key={i} className="flex items-center justify-between px-4 py-3 border-b border-border/50 last:border-none" style={{ height: 58 }}>
              <span className="font-bold text-xs text-text truncate max-w-[120px]">{row.name}</span>
              <span className="font-black text-sm text-success">{toBn(row.amount)}৳</span>
              <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${row.success ? "bg-success/10 text-success" : "bg-info/10 text-info"}`}>
                {row.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
