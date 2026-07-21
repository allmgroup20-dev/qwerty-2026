"use client";

import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/Skeleton";

interface Target {
  id: number;
  type: string;
  period: string;
  target_sales: number;
  target_revenue: number;
  base_amount: number | null;
  current_day: number;
  current_sales: number;
  current_revenue: number;
  start_date: string;
  end_date: string;
  status: string;
  report_generated: number;
  report_content: string | null;
  priority: number;
  dayTarget: number | null;
}

export default function TargetsTab({ lang }: { lang: string }) {
  const [targets, setTargets] = useState<Target[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [targetType, setTargetType] = useState<"fixed" | "geometric">("fixed");
  const [period, setPeriod] = useState("days");
  const [targetSales, setTargetSales] = useState("");
  const [targetRevenue, setTargetRevenue] = useState("");
  const [baseAmount, setBaseAmount] = useState("");
  const [duration, setDuration] = useState("7");
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [tab, setTab] = useState<"active" | "history" | "create">("active");

  const loadTargets = async (status = "active") => {
    setLoading(true);
    try {
      const res = await fetch(`/api/ai/targets?status=${status}&sortBy=priority`);
      const d: { targets?: Target[] } = await res.json();
      setTargets(d.targets || []);
    } catch {}
    setLoading(false);
  };

  useEffect(() => { loadTargets(tab === "history" ? "completed,missed" : "active"); }, [tab]);

  const createTarget = async () => {
    setError("");
    setSuccessMsg("");
    if (targetType === "fixed") {
      if (!targetSales || !duration) { setError(lang === "bn" ? "সব ফিল্ড পূরণ করুন" : "Fill all fields"); return; }
    } else {
      if (!baseAmount || !duration) { setError(lang === "bn" ? "সব ফিল্ড পূরণ করুন" : "Fill all fields"); return; }
    }

    setCreating(true);
    try {
      const now = /* @__PURE__ */ new Date();
      const startDate = now.toISOString().split("T")[0];
      const endDate = new Date(now.getTime() + parseInt(duration) * (period === "minutes" ? 60000 : period === "hours" ? 3600000 : period === "days" ? 86400000 : period === "weeks" ? 604800000 : 2592000000)).toISOString().split("T")[0];

      const body: any = { type: targetType, period, startDate, endDate };
      if (targetType === "fixed") {
        body.targetSales = parseInt(targetSales);
        body.targetRevenue = targetRevenue ? parseFloat(targetRevenue) : 0;
      } else {
        body.baseAmount = parseFloat(baseAmount);
        body.targetRevenue = targetRevenue ? parseFloat(targetRevenue) : 0;
        body.period = "days";
      }

      const res = await fetch("/api/ai/targets", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      const d: { error?: string; success?: boolean } = await res.json();
      if (d.error) { setError(d.error); } else {
        setSuccessMsg(lang === "bn" ? "✅ টার্গেট তৈরি হয়েছে!" : "✅ Target created!");
        setShowForm(false);
        setTargetSales("");
        setTargetRevenue("");
        setBaseAmount("");
        setTab("active");
        loadTargets("active");
      }
    } catch { setError(lang === "bn" ? "সার্ভার ত্রুটি" : "Server error"); }
    setCreating(false);
  };

  const b = (en: string, bn: string) => lang === "bn" ? bn : en;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-primary">{b("🎯 Sales Targets", "🎯 সেলস টার্গেট")}</h2>
          <p className="text-sm text-text-secondary">{b("Set fixed or geometric targets. AI prioritizes the highest-value target.", "ফিক্সড বা জিওমেট্রিক টার্গেট সেট করুন। AI সবচেয়ে বড় টার্গেটে প্রাধান্য দেয়।")}</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary/90 transition-all">
          {showForm ? b("✕ Close", "✕ বন্ধ") : b("➕ New Target", "➕ নতুন টার্গেট")}
        </button>
      </div>

      {error && <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-4 text-sm text-red-700">{error}</div>}
      {successMsg && <div className="bg-green-50 border border-green-200 rounded-xl p-3 mb-4 text-sm text-green-700">{successMsg}</div>}

      {showForm && (
        <div className="card p-6 mb-6 border-2 border-primary/20">
          <h3 className="font-bold text-primary text-sm mb-4">{b("Create New Target", "নতুন টার্গেট তৈরি")}</h3>

          <div className="flex gap-2 mb-5">
            <button onClick={() => setTargetType("fixed")} className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${targetType === "fixed" ? "bg-primary text-white shadow-sm" : "bg-gray-100 text-text-secondary hover:bg-gray-200"}`}>
              {b("🎯 Fixed", "🎯 ফিক্সড")}
            </button>
            <button onClick={() => setTargetType("geometric")} className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${targetType === "geometric" ? "bg-primary text-white shadow-sm" : "bg-gray-100 text-text-secondary hover:bg-gray-200"}`}>
              {b("📈 Geometric (Doubles Daily)", "📈 জিওমেট্রিক (দৈনিক ডাবল)")}
            </button>
          </div>

          {targetType === "geometric" && (
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4 mb-5 border border-purple-200">
              <p className="text-xs text-purple-700 font-medium">{b(
                "Each day the target doubles: Day 1 = base, Day 2 = base×2, Day 3 = base×4, Day N = base×2^(N-1)",
                "প্রতিদিন টার্গেট দ্বিগুণ হয়: দিন ১ = বেস, দিন ২ = বেস×২, দিন ৩ = বেস×৪, দিন N = বেস×২^(N-১)"
              )}</p>
              {baseAmount && duration && (
                <div className="mt-2 flex gap-1.5 flex-wrap">
                  {Array.from({ length: Math.min(7, parseInt(duration) || 7) }, (_, i) => (
                    <span key={i} className="text-[10px] bg-white/80 px-2 py-1 rounded-lg font-mono font-bold text-purple-600">
                      D{i + 1}: ৳{Math.round(parseFloat(baseAmount) * Math.pow(2, i))}
                    </span>
                  ))}
                  {parseInt(duration) > 7 && <span className="text-[10px] text-purple-400 font-bold self-center">...</span>}
                </div>
              )}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
            {targetType === "fixed" && (
              <>
                <div>
                  <label className="block text-xs font-medium text-text-secondary mb-1">{b("Amount (BDT)", "পরিমাণ (বিডিটি)")}</label>
                  <input type="number" value={targetSales} onChange={e => setTargetSales(e.target.value)} placeholder={b("e.g. 50000", "যেমন: ৫০০০০")} className="w-full px-3 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-text-secondary mb-1">{b("Period", "সময়")}</label>
                  <select value={period} onChange={e => setPeriod(e.target.value)} className="w-full px-3 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
                    <option value="minutes">{b("Minutes", "মিনিট")}</option>
                    <option value="hours">{b("Hours", "ঘন্টা")}</option>
                    <option value="days">{b("Days", "দিন")}</option>
                    <option value="weeks">{b("Weeks", "সপ্তাহ")}</option>
                    <option value="months">{b("Months", "মাস")}</option>
                  </select>
                </div>
              </>
            )}
            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1">
                {targetType === "geometric" ? b("Base Amount (BDT)", "বেস পরিমাণ (বিডিটি)") : b("Duration", "সময়কাল")}
              </label>
              {targetType === "geometric" ? (
                <input type="number" value={baseAmount} onChange={e => setBaseAmount(e.target.value)} placeholder={b("e.g. 99", "যেমন: ৯৯")} className="w-full px-3 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
              ) : null}
            </div>
            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1">{b("Duration", "সময়কাল")}</label>
              <div className="flex gap-2">
                <input type="number" value={duration} onChange={e => setDuration(e.target.value)} className="flex-1 px-3 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                {targetType !== "geometric" && (
                  <span className="px-3 py-2.5 bg-gray-50 border border-border rounded-xl text-sm text-text-secondary">
                    {period === "minutes" ? b("min", "মি") : period === "hours" ? b("hr", "ঘ") : period === "days" ? b("day", "দি") : period === "weeks" ? b("wk", "সপ্তা") : b("mo", "মা")}
                  </span>
                )}
                {targetType === "geometric" && <span className="px-3 py-2.5 bg-gray-50 border border-border rounded-xl text-sm text-text-secondary">{b("days", "দিন")}</span>}
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1">{b("Revenue Target (optional)", "রেভিনিউ টার্গেট (ঐচ্ছিক)")}</label>
              <input type="number" value={targetRevenue} onChange={e => setTargetRevenue(e.target.value)} placeholder={b("e.g. 100000", "যেমন: ১০০০০০")} className="w-full px-3 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
            </div>
          </div>

          <button onClick={createTarget} disabled={creating} className="w-full py-3 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary/90 disabled:opacity-50 transition-all">
            {creating ? b("Creating...", "তৈরি হচ্ছে...") : b("🎯 Create Target", "🎯 টার্গেট তৈরি করুন")}
          </button>
        </div>
      )}

      <div className="flex gap-2 mb-5">
        <button onClick={() => { setTab("active"); loadTargets("active"); }} className={`px-4 py-2 text-sm font-medium rounded-xl transition-all ${tab === "active" ? "bg-primary text-white shadow-sm" : "bg-gray-100 text-text-secondary hover:bg-gray-200"}`}>
          {b("🔥 Active", "🔥 সক্রিয়")}
        </button>
        <button onClick={() => { setTab("history"); loadTargets("completed,missed"); }} className={`px-4 py-2 text-sm font-medium rounded-xl transition-all ${tab === "history" ? "bg-primary text-white shadow-sm" : "bg-gray-100 text-text-secondary hover:bg-gray-200"}`}>
          {b("📜 History", "📜 ইতিহাস")}
        </button>
      </div>

      {loading ? (
        <div className="space-y-3"><Skeleton className="h-20 w-full" /><Skeleton className="h-20 w-full" /><Skeleton className="h-20 w-full" /></div>
      ) : targets.length === 0 ? (
        <div className="card p-10 text-center">
          <div className="text-4xl mb-3">{tab === "active" ? "🎯" : "📭"}</div>
          <p className="text-text-secondary text-sm">{tab === "active" ? b("No active targets. Create one to start tracking!", "কোনো সক্রিয় টার্গেট নেই। ট্র্যাকিং শুরু করতে একটি তৈরি করুন!") : b("No completed or missed targets yet.", "কোনো সম্পন্ন বা মিসড টার্গেট নেই।")}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {targets.map((t, i) => {
            const effectiveTarget = t.type === "geometric" && t.dayTarget ? t.dayTarget : t.target_sales;
            const progress = effectiveTarget > 0 ? Math.min(100, (t.current_sales / effectiveTarget) * 100) : 0;
            const isTop = i === 0 && t.status === "active";
            const isGeometric = t.type === "geometric";

            return (
              <div key={t.id} className={`card p-5 border-l-4 ${t.status === "active" ? (isTop ? "border-l-red-500" : "border-l-amber-400") : t.status === "completed" ? "border-l-green-500" : "border-l-gray-300"}`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {isGeometric ? <span className="text-lg">📈</span> : <span className="text-lg">🎯</span>}
                    <div>
                      <span className="font-bold text-sm text-primary">
                        {isGeometric
                          ? b(`Geometric Day ${t.current_day}`, `জিওমেট্রিক দিন ${t.current_day}`)
                          : b(`${t.period.charAt(0).toUpperCase() + t.period.slice(1)} Target`, `${t.period === "minutes" ? "মিনিট" : t.period === "hours" ? "ঘন্টা" : t.period === "days" ? "দৈনিক" : t.period === "weeks" ? "সাপ্তাহিক" : "মাসিক"} টার্গেট`)}
                      </span>
                      {isGeometric && (
                        <span className="ml-2 text-[10px] bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-medium">{b("Doubles Daily", "দৈনিক ডাবল")}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {t.status === "active" && (
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${isTop ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"}`}>
                        {isTop ? b("🔴 AI Priority #1", "🔴 এআই প্রাধান্য #১") : b(`🟡 Priority #${i + 1}`, `🟡 প্রাধান্য #${i + 1}`)}
                      </span>
                    )}
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${t.status === "active" ? "bg-blue-100 text-blue-700" : t.status === "completed" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                      {t.status === "active" ? b("Active", "সক্রিয়") : t.status === "completed" ? b("✅ Achieved", "✅ অর্জিত") : b("❌ Missed", "❌ মিসড")}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-2 flex-wrap">
                  <div>
                    <span className="text-xs text-text-secondary">{b("Target", "টার্গেট")}: </span>
                    <span className="font-bold text-sm">৳{effectiveTarget.toLocaleString()}</span>
                    {isGeometric && t.base_amount && (
                      <span className="text-[10px] text-purple-500 ml-2">({b("base", "বেস")} ৳{t.base_amount} × 2^{t.current_day - 1})</span>
                    )}
                  </div>
                  <div><span className="text-xs text-text-secondary">{b("Achieved", "অর্জিত")}: </span><span className="font-bold text-sm">৳{t.current_sales.toLocaleString()}</span></div>
                  {t.current_revenue > 0 && <div><span className="text-xs text-text-secondary">{b("Revenue", "রেভিনিউ")}: </span><span className="font-bold text-sm">৳{t.current_revenue.toLocaleString()}</span></div>}
                  <div className="text-[10px] text-text-secondary">{t.start_date} → {t.end_date}</div>
                </div>

                <div className="relative h-2.5 bg-gray-100 rounded-full overflow-hidden mb-1">
                  <div className={`absolute inset-y-0 left-0 rounded-full transition-all ${progress >= 100 ? "bg-green-500" : isTop ? "bg-red-500" : "bg-amber-400"}`} style={{ width: `${progress}%` }} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold">{progress.toFixed(1)}%</span>
                  {isTop && t.status === "active" && (
                    <span className="text-[10px] text-red-600 font-medium">{b("🔥 AI is actively working on this target", "🔥 AI এই টার্গেটে সক্রিয়ভাবে কাজ করছে")}</span>
                  )}
                  {!isTop && t.status === "active" && (
                    <span className="text-[10px] text-amber-600 font-medium">{b("⏳ AI will focus after higher target completes", "⏳ বড় টার্গেট শেষ হলে AI ফোকাস করবে")}</span>
                  )}
                </div>

                {t.report_content && (
                  <div className={`mt-3 p-3 rounded-xl text-xs ${t.status === "completed" ? "bg-green-50 text-green-800" : "bg-red-50 text-red-700"}`}>
                    {t.report_content}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
