"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { useDebounce } from "@/lib/use-debounce";

interface CourseCategory {
  id: number; name: string; nameBn: string | null; icon: string; parentId: number | null;
}

interface Course {
  id: number; title: string; titleBn: string | null;
  description: string | null; descriptionBn: string | null;
  categoryId: number | null; isNew: number; isVisible: number;
  icon: string; price: number; isPremium: number;
  categoryName: string | null; categoryNameBn: string | null;
  fileUrl: string | null; fileCount: number;
}

function getCourseEmoji(icon: string, catName?: string): string {
  if (icon && icon !== "📌") return icon;
  const m: Record<string, string> = {
    "Platform": "📱", "10MS": "🎓", "Ghoori": "🏫", "SkillUper": "📈",
    "E-Shikhon": "🎬", "MSB": "🏛️", "Creative IT": "💻", "Hacking": "🛡️",
    "File Collection": "📁", "ChatGPT": "🤖", "Graphics Design": "🎨",
    "Digital Marketing": "📊", "SEO": "🔍", "YouTube": "🎥", "Data Entry": "⌨️",
    "Video Editing": "✂️", "Software": "📦", "WordPress": "🌐",
    "Ethical Hacking": "🔒", "Cyber Security": "🛡️", "MS Office": "📋",
    "Quran": "🕋", "English": "🇬🇧", "Web Development": "🌐",
  };
  if (catName && m[catName]) return m[catName];
  return "📌";
}

function getEmojiBg(emoji: string): string {
  const m: Record<string, string> = {
    "🎓": "from-purple-500/10 to-purple-600/5 text-purple-600",
    "📱": "from-orange-500/10 to-orange-600/5 text-orange-600",
    "🔒": "from-red-500/10 to-red-600/5 text-red-600",
    "🎨": "from-pink-500/10 to-pink-600/5 text-pink-600",
    "🎬": "from-rose-500/10 to-rose-600/5 text-rose-600",
    "🌐": "from-teal-500/10 to-teal-600/5 text-teal-600",
    "📊": "from-emerald-500/10 to-emerald-600/5 text-emerald-600",
    "👑": "from-amber-500/10 to-amber-600/5 text-amber-600",
    "⭐": "from-yellow-500/10 to-yellow-600/5 text-yellow-600",
    "📖": "from-amber-500/10 to-amber-600/5 text-amber-600",
    "💼": "from-blue-500/10 to-blue-600/5 text-blue-600",
    "🗣️": "from-green-500/10 to-green-600/5 text-green-600",
    "🛡️": "from-red-500/10 to-red-600/5 text-red-600",
    "📁": "from-slate-500/10 to-slate-600/5 text-slate-600",
    "🤖": "from-purple-500/10 to-purple-600/5 text-purple-600",
    "🏫": "from-indigo-500/10 to-indigo-600/5 text-indigo-600",
  };
  return m[emoji] || "from-blue-500/10 to-blue-600/5 text-blue-600";
}

export default function CoursesPage() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);
  const [activeCat, setActiveCat] = useState("all");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPremium, setIsPremium] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<CourseCategory[]>([]);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 600);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const [coursesRes, catsRes, profileRes] = await Promise.all([
          fetch("/api/courses?visibleOnly=1"),
          fetch("/api/courses/categories"),
          fetch("/api/auth/me").catch(() => new Response("{}")),
        ]);
        const coursesData = await coursesRes.json() as { courses?: Course[] };
        const catsData = await catsRes.json() as { categories?: CourseCategory[] };
        const profile: any = await profileRes.json().catch(() => ({}));

        setCourses(coursesData.courses ?? []);
        setCategories(catsData.categories?.filter(c => c.icon) ?? catsData.categories ?? []);

        if (profile.workerId || profile.username) {
          setIsLoggedIn(true);
          if (profile.membershipStatus === "premium" || profile.role === "premium") {
            setIsPremium(true);
          }
        }

        const wid = typeof window !== "undefined" ? localStorage.getItem("worker_id") : null;
        if (wid && !profile.workerId) {
          setIsLoggedIn(true);
          try {
            const pRes = await fetch(`/api/workers/profile?workerId=${wid}`);
            const pData = await pRes.json() as Record<string, any>;
            if (pData.membershipStatus === "premium") setIsPremium(true);
          } catch {}
        }
      } catch (e) {
        console.error("Failed to load courses", e);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const catNameMap = useMemo(() => {
    const map: Record<number, { name: string; nameBn: string | null; parentId: number | null }> = {};
    for (const cat of categories) map[cat.id] = cat;
    return map;
  }, [categories]);

  const catPathMap = useMemo(() => {
    const map = new Map<number, CourseCategory>();
    for (const c of categories) map.set(c.id, c);
    const path = (id: number): string => {
      const parts: string[] = [];
      let cur = map.get(id);
      while (cur) { parts.unshift(cur.name); cur = cur.parentId ? map.get(cur.parentId) : undefined; }
      return parts.join(" > ");
    };
    const pathBn = (id: number): string => {
      const parts: string[] = [];
      let cur = map.get(id);
      while (cur) { parts.unshift(cur.nameBn || cur.name); cur = cur.parentId ? map.get(cur.parentId) : undefined; }
      return parts.join(" > ");
    };
    const r: Record<number, { name: string; nameBn: string | null }> = {};
    for (const c of categories) {
      r[c.id] = { name: path(c.id), nameBn: pathBn(c.id) };
    }
    return r;
  }, [categories]);

  const categoryOrder = useMemo(() => {
    const seen = new Set<number>();
    const order: { id: number; name: string; nameBn: string | null; icon: string }[] = [];
    for (const c of courses) {
      if (c.categoryId && !seen.has(c.categoryId)) {
        seen.add(c.categoryId);
        const cat = catNameMap[c.categoryId];
        if (cat) {
          order.push({
            id: c.categoryId,
            name: cat.name,
            nameBn: cat.nameBn,
            icon: getCourseEmoji(c.icon, cat.name),
          });
        }
      }
    }
    return order;
  }, [courses, catNameMap]);

  const countsByCat = useMemo(() => {
    const map: Record<string, number> = {};
    for (const c of courses) {
      map[String(c.categoryId || "uncategorized")] = (map[String(c.categoryId || "uncategorized")] || 0) + 1;
    }
    return map;
  }, [courses]);

  const filtered = useMemo(() => {
    let result = [...courses];
    if (activeCat !== "all") {
      result = result.filter((c) => String(c.categoryId) === activeCat);
    }
    if (debouncedSearch.trim()) {
      const q = debouncedSearch.toLowerCase();
      result = result.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          (c.titleBn || "").toLowerCase().includes(q) ||
          (c.description || "").toLowerCase().includes(q) ||
          (catNameMap[c.categoryId || -1]?.name || "").toLowerCase().includes(q)
      );
    }
    return result;
  }, [debouncedSearch, activeCat, courses, catPathMap]);

  const canAccess = (course: Course) => {
    if (!isLoggedIn) return false;
    if (isPremium) return true;
    return course.isPremium === 0;
  };

  const freeCount = courses.filter(c => c.isPremium === 0).length;
  const premiumCount = courses.length - freeCount;

  return (
    <div className="min-h-screen bg-bg">
      <div className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-16">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-sm text-white/90 text-xs font-bold mb-4 border border-white/10">
              {loading ? (
                <span>⏳ লোড হচ্ছে...</span>
              ) : !isLoggedIn ? (
                <span>📚 মোট {courses.length}টি রিসোর্স — লগইন করে এক্সেস করুন</span>
              ) : isPremium ? (
                <span>👑 মোট {courses.length}টি রিসোর্স — প্রিমিয়াম এক্সেস</span>
              ) : (
                <span>🎁 {freeCount}টি ফ্রি + {premiumCount}টি প্রিমিয়াম — লগইন করেছেন</span>
              )}
            </div>
            <h1 className="text-2xl md:text-4xl font-black text-white leading-tight">
              {isPremium ? "👑 সকল রিসোর্স, সফটওয়্যার &amp; কোর্স" : !isLoggedIn ? "📚 রিসোর্স, সফটওয়্যার &amp; কোর্স" : "🎁 রিসোর্স সমূহ"}
            </h1>
            <p className="text-white/80 font-semibold mt-3 max-w-xl mx-auto text-sm md:text-base">
              {loading ? "তথ্য লোড হচ্ছে..." : !isLoggedIn ? `লগইন করে ${courses.length}টি রিসোর্স এক্সেস করুন` : isPremium ? `প্রিমিয়াম সদস্য হিসাবে ${courses.length}টি রিসোর্স এক্সেস করুন` : `${freeCount}টি ফ্রি রিসোর্স এক্সেস করুন, প্রিমিয়ামে আপগ্রেড হয়ে ${premiumCount}টি প্রিমিয়াম রিসোর্স আনলক করুন`}
            </p>

            <div className="mt-6 max-w-lg mx-auto relative">
              <div className="flex items-center bg-white rounded-2xl shadow-2xl shadow-primary/20 border border-white/20 overflow-hidden transition-all focus-within:shadow-primary/40">
                <span className="pl-5 text-primary/60 text-lg">🔍</span>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="সার্চ করুন রিসোর্স, ক্যাটাগরি..."
                  className="w-full px-4 py-3.5 text-sm font-semibold text-text bg-transparent border-none outline-none placeholder:text-text-secondary/50"
                />
                {search && (
                  <button onClick={() => setSearch("")} className="pr-5 text-text-secondary/50 hover:text-text transition-colors text-lg">✕</button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <div ref={scrollRef} className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
            <button
              onClick={() => setActiveCat("all")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap border transition-all shrink-0 cursor-pointer ${
                activeCat === "all"
                  ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                  : "bg-white border-border text-text-secondary hover:border-primary/30 hover:text-text"
              }`}
            >
                <span>🏠</span>
              <span>সব ({courses.length})</span>
            </button>
            {categoryOrder.map((cat) => {
              const count = countsByCat[String(cat.id)] || 0;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCat(String(cat.id))}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap border transition-all shrink-0 cursor-pointer ${
                    activeCat === String(cat.id)
                      ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                      : "bg-white border-border text-text-secondary hover:border-primary/30 hover:text-text"
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.nameBn || cat.name}</span>
                  <span className="opacity-60">({count})</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-8">
        <div className="text-center mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-primary font-bold text-xs">
            {activeCat === "all" ? `মোট ${filtered.length} টি রিসোর্স` : `${catPathMap[Number(activeCat)]?.nameBn || catPathMap[Number(activeCat)]?.name || ''} — ${filtered.length} টি রিসোর্স`}
          </span>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4 opacity-30">🔍</div>
            <p className="text-text-secondary font-bold text-lg">কোনো রিসোর্স পাওয়া যায়নি</p>
            <p className="text-text-secondary/60 text-sm mt-2">অন্য কীওয়ার্ড দিয়ে সার্চ করুন</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
            {filtered.map((item) => {
              const emoji = getCourseEmoji(item.icon, item.categoryName || undefined);
              const bgColor = getEmojiBg(emoji);
              const url = item.fileUrl || "#";
              const access = canAccess(item);
              const catDisplay = (item.categoryId ? catPathMap[item.categoryId] : null)?.nameBn
                || (item.categoryId ? catPathMap[item.categoryId]?.name : "")
                || "";

              return (
                <div key={item.id} className="relative">
                  <a
                    href={access ? url : "#"}
                    target={access ? "_blank" : undefined}
                    rel={access ? "noopener noreferrer" : undefined}
                    className={`block bg-white rounded-2xl border p-4 transition-all duration-200 ${
                      access
                        ? "border-border hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-0.5 hover:border-primary/20 active:scale-[0.98] group cursor-pointer"
                        : "border-border/60 opacity-75"
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${bgColor} flex items-center justify-center text-lg shrink-0 transition-transform ${access ? "group-hover:scale-110 group-hover:rotate-3" : ""}`}>
                        <span>{emoji}</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-text-secondary/60">{catDisplay}</span>
                          {item.isNew === 1 && (
                            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full bg-green-50 border border-green-200 text-green-700 text-[9px] font-bold">🆕 NEW</span>
                          )}
                          {item.isPremium === 1 && (
                            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-[9px] font-bold">👑 PREMIUM</span>
                          )}
                        </div>
                        <h3 className={`font-bold text-sm leading-snug line-clamp-2 ${access ? "text-text group-hover:text-primary transition-colors" : "text-text"}`}>
                          {item.titleBn || item.title}
                        </h3>
                        {item.description && (
                          <p className="text-xs text-text-secondary/70 mt-1 line-clamp-2 leading-relaxed">
                            {item.descriptionBn || item.description}
                          </p>
                        )}
                        {item.fileCount > 1 && (
                          <p className="text-xs text-text-secondary/50 mt-1">+{item.fileCount - 1} more files</p>
                        )}
                      </div>
                    </div>
                  </a>
                  {!access && isLoggedIn && item.isPremium === 1 && (
                    <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] rounded-2xl flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <a href="/dashboard/profile" className="px-4 py-2 bg-amber-500 text-white rounded-xl text-xs font-bold shadow-lg hover:bg-amber-600 transition-all">
                        👑 প্রিমিয়াম হোন
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {isLoggedIn && !isPremium && premiumCount > 0 && (
          <div className="text-center mt-8 mb-4 p-6 rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/10">
            <p className="text-lg font-bold text-primary mb-2">👑 প্রিমিয়াম মেম্বারশিপ নিন</p>
            <p className="text-sm text-text-secondary mb-4">প্রিমিয়াম মেম্বার হয়ে {premiumCount}টি প্রিমিয়াম রিসোর্স এক্সেস করুন</p>
            <a href="/dashboard/profile" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-bold text-sm hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
              👑 প্রিমিয়াম হোন এখনই
            </a>
          </div>
        )}
      </div>

      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-2xl bg-primary text-white shadow-xl shadow-primary/30 flex items-center justify-center text-xl transition-all hover:scale-110 active:scale-95 cursor-pointer"
        >↑</button>
      )}
    </div>
  );
}
