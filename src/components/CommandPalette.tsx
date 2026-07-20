"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useLang } from "@/lib/store";

interface CmdItem {
  href: string;
  en: string;
  bn: string;
  icon: string;
}

interface CmdGroup {
  icon: string;
  en: string;
  bn: string;
  items: CmdItem[];
}

const groups: CmdGroup[] = [
  {
    icon: "👥", en: "People", bn: "সদস্য",
    items: [
      { href: "/company/members", en: "Members", bn: "সদস্য", icon: "👥" },
      { href: "/company/customers", en: "Customers", bn: "গ্রাহক", icon: "👤" },
      { href: "/company/users", en: "Users", bn: "ব্যবহারকারী", icon: "🔐" },
      { href: "/company/notifications", en: "Notifications", bn: "বিজ্ঞপ্তি", icon: "🔔" },
    ],
  },
  {
    icon: "📦", en: "Products & Sales", bn: "পণ্য ও বিক্রয়",
    items: [
      { href: "/company/products", en: "Products", bn: "পণ্য", icon: "📦" },
      { href: "/company/courses", en: "Resources", bn: "রিসোর্স", icon: "🎓" },
      { href: "/company/courses/categories", en: "Resource Categories", bn: "রিসোর্স ক্যাটাগরি", icon: "📂" },
      { href: "/company/course-stats", en: "Course Stats", bn: "রিসোর্স পরিসংখ্যান", icon: "📊" },
      { href: "/company/orders", en: "Orders", bn: "অর্ডার", icon: "📋" },
      { href: "/company/reviews", en: "Reviews", bn: "রিভিউ", icon: "⭐" },
      { href: "/company/levels", en: "Commission Levels", bn: "আয় লেভেল", icon: "📊" },
      { href: "/company/finance", en: "Finance", bn: "অর্থ", icon: "💰" },
      { href: "/company/withdrawals", en: "Withdrawals", bn: "উত্তোলন", icon: "💸" },
      { href: "/company/currencies", en: "Currencies", bn: "মুদ্রা", icon: "💵" },
      { href: "/company/payment-gateway", en: "Payment Gateway", bn: "পেমেন্ট", icon: "💳" },
      { href: "/company/unlocks", en: "Unlock Management", bn: "আনলক ব্যবস্থাপনা", icon: "🔓" },
      { href: "/company/complaints", en: "Complaints", bn: "কমপ্লেইন", icon: "⚠️" },
      { href: "/company/trainers", en: "Trainers", bn: "প্রশিক্ষক", icon: "👨‍🏫" },
      { href: "/company/institutions", en: "Institutions", bn: "প্রতিষ্ঠান", icon: "🏛️" },
    ],
  },
  {
    icon: "📊", en: "Analytics", bn: "বিশ্লেষণ",
    items: [
      { href: "/company/analytics", en: "Analytics", bn: "অ্যানালিটিক্স", icon: "📊" },
      { href: "/company/psychology-reports", en: "Psych Reports", bn: "সাইকোলজি রিপোর্ট", icon: "📊" },
      { href: "/company/events", en: "Events", bn: "ইভেন্ট", icon: "📋" },
      { href: "/company/sessions", en: "Sessions", bn: "সেশন", icon: "🕒" },
      { href: "/company/funnel", en: "Funnel", bn: "ফানেল", icon: "🔄" },
      { href: "/company/funnel-psychology", en: "Funnel Psychology", bn: "ফানেল সাইকোলজি", icon: "🔮" },
      { href: "/company/segments", en: "Segments", bn: "সেগমেন্ট", icon: "🎯" },
    ],
  },
  {
    icon: "🤖", en: "AI & Automation", bn: "এআই ও অটোমেশন",
    items: [
      { href: "/company/ai", en: "AI Hub", bn: "এআই হাব", icon: "🤖" },
      { href: "/company/automation", en: "Automation", bn: "অটোমেশন", icon: "⚡" },
      { href: "/company/sentiment", en: "Sentiment", bn: "সেন্টিমেন্ট", icon: "📈" },
      { href: "/company/skills", en: "Skills", bn: "দক্ষতা", icon: "🧠" },
      { href: "/company/ai-distribution", en: "AI Distribution", bn: "এআই বিতরণ", icon: "📚" },
      { href: "/company/ai-conversations", en: "Conversations", bn: "কথোপকথন", icon: "💬" },
      { href: "/company/psychology-insights", en: "Psychology Insights", bn: "সাইকোলজি ইনসাইটস", icon: "🧠" },
      { href: "/company/psychology-profiles", en: "Psych Profiles", bn: "সাইকোলজি প্রোফাইল", icon: "🔍" },
      { href: "/company/psychologist-dashboard", en: "Psychologist Dashboard", bn: "সাইকোলজিস্ট ড্যাশবোর্ড", icon: "🩺" },
      { href: "/company/employee-persuasion", en: "Employee Persuasion", bn: "কর্মচারী পারসুয়েশন", icon: "📋" },
      { href: "/company/daily-habits", en: "Daily Habits", bn: "দৈনিক অভ্যাস", icon: "🌅" },
      { href: "/company/ai-training", en: "AI Training", bn: "এআই প্রশিক্ষণ", icon: "📚" },
      { href: "/company/courses/ai-pricing", en: "AI Pricing", bn: "এআই প্রাইসিং", icon: "💰" },
    ],
  },
  {
    icon: "💬", en: "Communication", bn: "যোগাযোগ",
    items: [
      { href: "/dashboard/platforms", en: "Platforms", bn: "প্ল্যাটফর্ম", icon: "🔄" },
      { href: "/company/translations", en: "Translations", bn: "অনুবাদ", icon: "🌐" },
    ],
  },
  {
    icon: "⚙️", en: "System", bn: "সিস্টেম",
    items: [
      { href: "/company/settings", en: "Settings", bn: "সেটিংস", icon: "⚙️" },
      { href: "/company/maintenance", en: "Maintenance", bn: "রক্ষণাবেক্ষণ", icon: "🔧" },
      { href: "/company/fingerprint", en: "Fingerprint", bn: "ফিঙ্গারপ্রিন্ট", icon: "🔐" },
      { href: "/company/privacy", en: "Privacy", bn: "প্রাইভেসি", icon: "🔒" },
      { href: "/company/test-mode", en: "Test Mode", bn: "টেস্ট মোড", icon: "🧪" },
      { href: "/company/updates", en: "Updates", bn: "আপডেট", icon: "🔄" },
      { href: "/system", en: "System Monitor", bn: "সিস্টেম মনিটর", icon: "📡" },
    ],
  },
];

function allItems(): CmdItem[] {
  const items: CmdItem[] = [];
  for (const g of groups) for (const i of g.items) items.push(i);
  return items;
}

export default function CommandPalette() {
  const lang = useLang();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [idx, setIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const flatItems = allItems();

  const filtered = query
    ? flatItems.filter((l) => {
        const q = query.toLowerCase();
        return l.en.toLowerCase().includes(q) || l.bn.includes(q) || l.href.includes(q);
      })
    : [];

  const visible = query ? filtered.slice(0, 50) : [];

  const go = useCallback((href: string) => {
    setOpen(false);
    setQuery("");
    router.push(href);
  }, [router]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((p) => !p);
      }
      if (e.key === "Escape" && open) {
        setOpen(false);
        setQuery("");
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  useEffect(() => {
    if (open) { setQuery(""); setIdx(0); setTimeout(() => inputRef.current?.focus(), 50); }
  }, [open]);

  useEffect(() => {
    setIdx(0);
  }, [query]);

  const scrollToItem = (i: number) => {
    const container = inputRef.current?.closest(".modal-content")?.querySelector(".list-container");
    if (!container) return;
    const el = container.children[i] as HTMLElement | undefined;
    el?.scrollIntoView({ block: "nearest" });
  };

  const onKey = (e: React.KeyboardEvent) => {
    const len = visible.length;
    if (e.key === "ArrowDown") { e.preventDefault(); setIdx((i) => Math.min(i + 1, len - 1)); setTimeout(() => scrollToItem(Math.min(idx + 1, len - 1)), 0); }
    if (e.key === "ArrowUp") { e.preventDefault(); setIdx((i) => Math.max(i - 1, 0)); setTimeout(() => scrollToItem(Math.max(idx - 1, 0)), 0); }
    if (e.key === "Enter" && visible[idx]) { go(visible[idx].href); }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh]" onClick={() => { setOpen(false); setQuery(""); }}>
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={() => { setOpen(false); setQuery(""); }} />
      <div className="modal-content relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-border/60 overflow-hidden animate-fade-up">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border/60">
          <svg className="w-5 h-5 text-text-secondary shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKey}
            placeholder={lang === "bn" ? "পৃষ্ঠা খুঁজুন..." : "Search pages..."}
            className="flex-1 text-sm bg-transparent border-none outline-none text-primary placeholder:text-text-secondary/50"
          />
          <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-[10px] font-medium text-text-secondary bg-gray-100 rounded-md border border-border/40">
            <span className="text-xs">⌘</span>K
          </kbd>
        </div>

        <div className="list-container max-h-80 overflow-y-auto p-2">
          {query ? (
            // Search mode: flat list
            visible.length === 0 ? (
              <p className="text-center text-xs text-text-secondary py-6">{lang === "bn" ? "কিছু পাওয়া যায়নি" : "No results found"}</p>
            ) : (
              <div className="space-y-0.5">
                <div className="px-3 py-1.5 text-[10px] font-semibold text-text-secondary/50 uppercase tracking-wider">
                  {lang === "bn" ? "ফলাফল" : "Results"} ({visible.length})
                </div>
                {visible.map((item, i) => (
                  <button
                    key={item.href}
                    onMouseEnter={() => setIdx(i)}
                    onClick={() => go(item.href)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-left transition-all ${
                      i === idx ? "bg-primary/10 text-primary font-semibold" : "text-text-secondary hover:bg-primary/5"
                    }`}
                  >
                    <span className="text-sm">{item.icon}</span>
                    <span className="truncate">{lang === "bn" ? item.bn : item.en}</span>
                    <span className="ml-auto text-[10px] text-text-secondary/40 truncate max-w-[100px]">{item.href}</span>
                  </button>
                ))}
              </div>
            )
          ) : (
            // Browse mode: grouped
            <div className="space-y-1">
              <button
                onMouseEnter={() => setIdx(-1)}
                onClick={() => go("/company")}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold text-left transition-all ${
                  false ? "bg-primary/10 text-primary" : "text-primary hover:bg-primary/5"
                }`}
              >
                <span className="text-base">📊</span>
                <span>{lang === "bn" ? "ড্যাশবোর্ড" : "Dashboard"}</span>
              </button>
              <div className="h-px bg-border/40 my-1" />
              {groups.map((g) => (
                <div key={g.en}>
                  <div className="flex items-center gap-2 px-3 py-1.5 text-[10px] font-bold text-text-secondary/50 uppercase tracking-wider">
                    <span>{g.icon}</span>
                    <span>{lang === "bn" ? g.bn : g.en}</span>
                  </div>
                  {g.items.map((item) => (
                    <button
                      key={item.href}
                      onClick={() => go(item.href)}
                      className={`w-full flex items-center gap-3 px-3 py-1.5 rounded-lg text-xs text-left transition-all text-text-secondary hover:bg-primary/5 hover:text-primary ml-2`}
                    >
                      <span className="text-sm">{item.icon}</span>
                      <span className="truncate">{lang === "bn" ? item.bn : item.en}</span>
                    </button>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-4 px-4 py-2 border-t border-border/40 text-[10px] text-text-secondary/60">
          <span>↑↓ <span className="text-text-secondary/40">{lang === "bn" ? "নেভিগেট" : "Navigate"}</span></span>
          <span>↵ <span className="text-text-secondary/40">{lang === "bn" ? "যান" : "Go"}</span></span>
          <span>Esc <span className="text-text-secondary/40">{lang === "bn" ? "বন্ধ" : "Close"}</span></span>
          {!query && <span className="ml-auto text-text-secondary/30">{lang === "bn" ? "টাইপ করে সার্চ করুন" : "Type to search"}</span>}
        </div>
      </div>
    </div>
  );
}
