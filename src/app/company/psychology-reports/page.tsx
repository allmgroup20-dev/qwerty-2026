"use client";

import { useState, useEffect } from "react";
import { useLanguageStore } from "@/lib/store";
import { Skeleton } from "@/components/ui/Skeleton";

interface Snapshot {
  snapshot_date: string;
  total_profiles: number;
  avg_trust: number;
  trust_high: number; trust_medium: number; trust_low: number; trust_critical: number;
  fear_financial: number; fear_social: number; fear_deceived: number; fear_autonomy: number; fear_unknown: number;
  control_low: number; control_medium: number; control_high: number;
  manip_low: number; manip_medium: number; manip_high: number;
  high_lead_count: number; churn_risk_count: number;
}

interface TrendsData {
  snapshots: Snapshot[];
  latest: Snapshot | null;
  trustTrend: "up" | "down" | "stable";
  days: number;
}

interface SegmentData {
  segment: string; count: number; avg_trust: number;
}

interface ChurnProfile {
  phone: string; trust_score: number; control_sensitivity: string;
  manipulation_risk: string; priority_score: number; pain_points: string;
}

export default function PsychologyReportsPage() {
  const { lang } = useLanguageStore();
  const isBn = lang === "bn";
  const [tab, setTab] = useState<"trends" | "segments" | "churn">("trends");
  const [trends, setTrends] = useState<TrendsData | null>(null);
  const [segments, setSegments] = useState<SegmentData[]>([]);
  const [churn, setChurn] = useState<{ totalAtRisk: number; profiles: ChurnProfile[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState(14);

  const fetchTrends = async (d: number) => {
    setLoading(true);
    try {
      const [trendsRes, segmentsRes, churnRes] = await Promise.all([
        fetch(`/api/company/psychology-reports?view=trends&days=${d}`),
        fetch("/api/company/psychology-reports?view=segments"),
        fetch("/api/company/psychology-reports?view=churn"),
      ]);
      if (trendsRes.ok) { const data: any = await trendsRes.json(); setTrends(data.trends || null); }
      if (segmentsRes.ok) { const data: any = await segmentsRes.json(); setSegments(data.segments || []); }
      if (churnRes.ok) { const data: any = await churnRes.json(); setChurn(data.churn || null); }
    } catch {} finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTrends(days); }, [days]);

  const handleSnapshot = async () => {
    try {
      await fetch("/api/company/psychology-reports", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "snapshot" }),
      });
      fetchTrends(days);
    } catch {}
  };

  const TrendChart = ({ data, label, labelBn, color, keyFn }: {
    data: Snapshot[]; label: string; labelBn: string; color: string; keyFn: (s: Snapshot) => number;
  }) => {
    const reversed = [...data].reverse();
    const values = reversed.map(keyFn);
    const max = Math.max(...values, 1);
    return (
      <div className="bg-white rounded-2xl border border-border p-4">
        <p className="text-xs font-bold text-text mb-3">{isBn ? labelBn : label}</p>
        <div className="flex items-end gap-1 h-24">
          {values.map((v, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-[9px] text-text-secondary/50 font-bold">{v}</span>
              <div
                className="w-full rounded-t transition-all duration-300 hover:opacity-80"
                style={{ height: `${(v / max) * 100}%`, background: color, minHeight: v > 0 ? "4px" : "0" }}
              />
            </div>
          ))}
        </div>
        {reversed.length > 0 && (
          <div className="flex justify-between mt-2 text-[8px] text-text-secondary/40">
            <span>{reversed[0]?.snapshot_date?.slice(5)}</span>
            <span>{reversed[reversed.length - 1]?.snapshot_date?.slice(5)}</span>
          </div>
        )}
      </div>
    );
  };

  const renderTrends = () => {
    if (loading) return <Skeleton className="h-96 w-full rounded-2xl" />;
    if (!trends || !trends.snapshots || trends.snapshots.length === 0) {
      return <div className="text-center py-12 text-text-secondary text-sm">{isBn ? "কোনো ট্রেন্ড ডেটা নেই। প্রথম স্ন্যাপশট নিন।" : "No trend data yet. Take your first snapshot."}</div>;
    }
    const s = trends.snapshots;

    return (
      <div>
        {/* Summary cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
          <div className="bg-gradient-to-br from-primary/5 to-info/5 rounded-2xl border border-border p-4 text-center">
            <p className="text-xl font-black text-primary">{trends.latest?.total_profiles || 0}</p>
            <p className="text-[10px] text-text-secondary/70">{isBn ? "মোট প্রোফাইল" : "Total Profiles"}</p>
          </div>
          <div className="bg-gradient-to-br from-success/5 to-info/5 rounded-2xl border border-border p-4 text-center">
            <p className="text-xl font-black text-success">{trends.latest?.avg_trust || 0}/10</p>
            <p className="text-[10px] text-text-secondary/70">{isBn ? "গড় বিশ্বাস" : "Avg Trust"}</p>
          </div>
          <div className="bg-gradient-to-br from-warning/5 to-error/5 rounded-2xl border border-border p-4 text-center">
            <p className="text-xl font-black text-warning">{trends.latest?.churn_risk_count || 0}</p>
            <p className="text-[10px] text-text-secondary/70">{isBn ? "চার্ন ঝুঁকি" : "Churn Risk"}</p>
          </div>
          <div className="bg-gradient-to-br from-info/5 to-primary/5 rounded-2xl border border-border p-4 text-center">
            <p className="text-xl font-black text-info">{trends.latest?.high_lead_count || 0}</p>
            <p className="text-[10px] text-text-secondary/70">{isBn ? "উচ্চ লিড" : "High Leads"}</p>
          </div>
          <div className={`rounded-2xl border border-border p-4 text-center bg-gradient-to-br ${
            trends.trustTrend === "up" ? "from-success/5 to-info/5" :
            trends.trustTrend === "down" ? "from-error/5 to-warning/5" :
            "from-primary/5 to-info/5"
          }`}>
            <p className={`text-xl font-black ${
              trends.trustTrend === "up" ? "text-success" :
              trends.trustTrend === "down" ? "text-error" : "text-primary"
            }`}>{trends.trustTrend === "up" ? "↑" : trends.trustTrend === "down" ? "↓" : "→"}</p>
            <p className="text-[10px] text-text-secondary/70">{isBn ? "বিশ্বাস প্রবণতা" : "Trust Trend"}</p>
          </div>
        </div>

        {/* Trend charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <TrendChart data={s} label="Avg Trust Score" labelBn="গড় বিশ্বাস স্কোর" color="#3b82f6" keyFn={sn => sn.avg_trust} />
          <TrendChart data={s} label="High Control Sensitivity" labelBn="উচ্চ নিয়ন্ত্রণ সংবেদনশীলতা" color="#f97316" keyFn={sn => sn.control_high} />
          <TrendChart data={s} label="High Manipulation Risk" labelBn="উচ্চ ম্যানিপুলেশন ঝুঁকি" color="#ef4444" keyFn={sn => sn.manip_high} />
          <TrendChart data={s} label="Trusting Profiles (8-10)" labelBn="বিশ্বাসী প্রোফাইল (৮-১০)" color="#22c55e" keyFn={sn => sn.trust_high} />
          <TrendChart data={s} label="Critical Trust (0-3)" labelBn="সমালোচনামূলক বিশ্বাস (০-৩)" color="#ef4444" keyFn={sn => sn.trust_critical} />
          <TrendChart data={s} label="Churn Risk Count" labelBn="চার্ন ঝুঁকি সংখ্যা" color="#f97316" keyFn={sn => sn.churn_risk_count} />
        </div>

        {/* Detailed table */}
        <div className="bg-white rounded-2xl border border-border overflow-hidden">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <p className="text-xs font-bold text-text">{isBn ? "স্ন্যাপশট ইতিহাস" : "Snapshot History"}</p>
            <button onClick={handleSnapshot}
              className="text-[10px] bg-primary text-white px-3 py-1.5 rounded-xl font-bold hover:bg-primary/90 transition-colors">
              {isBn ? "📸 নতুন স্ন্যাপশট" : "📸 New Snapshot"}
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-[10px]">
              <thead>
                <tr className="bg-primary/5">
                  <th className="text-left p-2 font-semibold text-text-secondary/60">{isBn ? "তারিখ" : "Date"}</th>
                  <th className="text-right p-2 font-semibold text-text-secondary/60">{isBn ? "প্রোফাইল" : "Profiles"}</th>
                  <th className="text-right p-2 font-semibold text-text-secondary/60">{isBn ? "বিশ্বাস" : "Trust"}</th>
                  <th className="text-right p-2 font-semibold text-text-secondary/60">{isBn ? "বিশ্বাসী" : "High T"}</th>
                  <th className="text-right p-2 font-semibold text-text-secondary/60">{isBn ? "সমালোচনামূলক" : "Critical"}</th>
                  <th className="text-right p-2 font-semibold text-text-secondary/60">{isBn ? "নিয়ন্ত্রণ (উচ্চ)" : "Ctrl(H)"}</th>
                  <th className="text-right p-2 font-semibold text-text-secondary/60">{isBn ? "ম্যানিপুলেশন (উচ্চ)" : "Manip(H)"}</th>
                  <th className="text-right p-2 font-semibold text-text-secondary/60">{isBn ? "চার্ন" : "Churn"}</th>
                  <th className="text-right p-2 font-semibold text-text-secondary/60">{isBn ? "লিড" : "Leads"}</th>
                </tr>
              </thead>
              <tbody>
                {s.map(snap => (
                  <tr key={snap.snapshot_date} className="border-t border-border/30 hover:bg-primary/5">
                    <td className="p-2 font-medium text-text">{snap.snapshot_date}</td>
                    <td className="p-2 text-right text-text-secondary">{snap.total_profiles}</td>
                    <td className="p-2 text-right">
                      <span className={`font-bold ${snap.avg_trust >= 7 ? "text-success" : snap.avg_trust >= 4 ? "text-warning" : "text-error"}`}>{snap.avg_trust}</span>
                    </td>
                    <td className="p-2 text-right text-success font-bold">{snap.trust_high}</td>
                    <td className="p-2 text-right text-error font-bold">{snap.trust_critical}</td>
                    <td className="p-2 text-right text-warning font-bold">{snap.control_high}</td>
                    <td className="p-2 text-right text-error font-bold">{snap.manip_high}</td>
                    <td className="p-2 text-right text-error font-bold">{snap.churn_risk_count}</td>
                    <td className="p-2 text-right text-info font-bold">{snap.high_lead_count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const renderSegments = () => {
    if (loading) return <Skeleton className="h-60 w-full rounded-2xl" />;
    const maxCount = Math.max(...segments.map(s => s.count), 1);
    return (
      <div>
        <div className="bg-white rounded-2xl border border-border p-5 mb-4">
          <h2 className="text-sm font-bold text-text mb-4">{isBn ? "সেগমেন্ট অনুযায়ী মনস্তাত্ত্বিক বিশ্লেষণ" : "Psychology by Segment"}</h2>
          {segments.length === 0 ? (
            <p className="text-xs text-text-secondary/60 text-center py-6">{isBn ? "কোনো সেগমেন্ট ডেটা নেই" : "No segment data"}</p>
          ) : (
            <div className="space-y-3">
              {segments.map(seg => (
                <div key={seg.segment}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-text capitalize">{seg.segment}</span>
                      <span className="text-[10px] text-text-secondary/50">({seg.count})</span>
                    </div>
                    <span className={`text-xs font-bold ${
                      seg.avg_trust >= 7 ? "text-success" : seg.avg_trust >= 4 ? "text-warning" : "text-error"
                    }`}>{seg.avg_trust}/10</span>
                  </div>
                  <div className="flex gap-1 h-4">
                    <div className="bg-primary/10 rounded-l-full transition-all" style={{ width: `${(seg.count / maxCount) * 100}%` }} />
                    <div className={`h-full rounded-r-full transition-all ${
                      seg.avg_trust >= 7 ? "bg-success/30" : seg.avg_trust >= 4 ? "bg-warning/30" : "bg-error/30"
                    }`} style={{ width: `${(seg.avg_trust / 10) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="p-4 bg-primary/5 rounded-2xl border border-border">
          <p className="text-xs text-text-secondary/80 leading-relaxed">
            {isBn
              ? "💡 সেগমেন্ট বিশ্লেষণ: প্রতিটি গ্রাহক সেগমেন্টের গড় বিশ্বাস স্কোর দেখায়। নিম্ন বিশ্বাসের সেগমেন্টগুলিতে বেশি মনোযোগ দিন এবং তাদের জন্য বিশেষ কৌশল প্রয়োগ করুন।"
              : "💡 Segment analysis shows average trust per segment. Focus on low-trust segments with targeted psychology strategies."}
          </p>
        </div>
      </div>
    );
  };

  const renderChurn = () => {
    if (loading) return <Skeleton className="h-60 w-full rounded-2xl" />;
    return (
      <div>
        <div className="bg-gradient-to-br from-error/5 to-warning/5 rounded-2xl border border-border p-5 mb-4 text-center">
          <p className="text-3xl font-black text-error">{churn?.totalAtRisk || 0}</p>
          <p className="text-xs text-text-secondary/70 mt-1">
            {isBn ? "গ্রাহক চার্নের ঝুঁকিতে (বিশ্বাস স্কোর < ৪)" : "Customers at risk of churn (trust score < 4)"}
          </p>
        </div>

        {(!churn?.profiles || churn.profiles.length === 0) ? (
          <div className="bg-white rounded-2xl border border-border p-6 text-center">
            <p className="text-sm text-text-secondary/60">{isBn ? "কোনো চার্ন ঝুঁকি নেই" : "No churn risk profiles"}</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-border overflow-hidden">
            <div className="p-4 border-b border-border">
              <p className="text-xs font-bold text-text">{isBn ? "চার্ন ঝুঁকিপূর্ণ প্রোফাইল" : "At-Risk Profiles"}</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-[10px]">
                <thead>
                  <tr className="bg-primary/5">
                    <th className="text-left p-2 font-semibold text-text-secondary/60">{isBn ? "ফোন" : "Phone"}</th>
                    <th className="text-right p-2 font-semibold text-text-secondary/60">{isBn ? "বিশ্বাস" : "Trust"}</th>
                    <th className="text-center p-2 font-semibold text-text-secondary/60">{isBn ? "নিয়ন্ত্রণ" : "Control"}</th>
                    <th className="text-center p-2 font-semibold text-text-secondary/60">{isBn ? "ম্যানিপুলেশন" : "Manip"}</th>
                    <th className="text-right p-2 font-semibold text-text-secondary/60">{isBn ? "প্রাধান্য" : "Priority"}</th>
                    <th className="text-left p-2 font-semibold text-text-secondary/60">{isBn ? "পেইন পয়েন্ট" : "Pain Points"}</th>
                  </tr>
                </thead>
                <tbody>
                  {churn.profiles.map((p, i) => (
                    <tr key={i} className="border-t border-border/30 hover:bg-error/5">
                      <td className="p-2 font-medium text-text">{p.phone}</td>
                      <td className="p-2 text-right">
                        <span className="px-1.5 py-0.5 rounded bg-error/10 text-error font-bold">{p.trust_score}/10</span>
                      </td>
                      <td className="p-2 text-center">
                        <span className={`${p.control_sensitivity === "high" ? "text-error" : p.control_sensitivity === "medium" ? "text-warning" : "text-success"}`}>{p.control_sensitivity?.[0]?.toUpperCase() || "—"}</span>
                      </td>
                      <td className="p-2 text-center">
                        <span className={`${p.manipulation_risk === "high" ? "text-error" : p.manipulation_risk === "medium" ? "text-warning" : "text-success"}`}>{p.manipulation_risk?.[0]?.toUpperCase() || "—"}</span>
                      </td>
                      <td className="p-2 text-right text-text-secondary">{p.priority_score}</td>
                      <td className="p-2 text-text-secondary/60 truncate max-w-[150px]">{p.pain_points?.slice(0, 50) || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="mt-4 p-4 bg-warning/5 rounded-2xl border border-border">
          <p className="text-xs text-text-secondary/80 leading-relaxed">
            {isBn
              ? "⚠️ চার্ন প্রতিরোধ কৌশল: কম বিশ্বাস + উচ্চ নিয়ন্ত্রণ সংবেদনশীলতা = স্বাধীনতার প্রয়োজন। কম বিশ্বাস + উচ্চ ম্যানিপুলেশন ঝুঁকি = অতিরিক্ত সুরক্ষা ও স্বচ্ছতা প্রয়োজন। এই গ্রাহকদের জন্য বিশেষ ফলো-আপ এবং স্বায়ত্তশাসন-ভিত্তিক যোগাযোগ ব্যবহার করুন।"
              : "⚠️ Churn prevention: Low trust + high control sensitivity = needs autonomy. Low trust + high manipulation risk = needs transparency. Use autonomy-based communication."}
          </p>
        </div>
      </div>
    );
  };

  const dayOptions = [
    { label: isBn ? "৭ দিন" : "7 Days", value: 7 },
    { label: isBn ? "১৪ দিন" : "14 Days", value: 14 },
    { label: isBn ? "৩০ দিন" : "30 Days", value: 30 },
    { label: isBn ? "৯০ দিন" : "90 Days", value: 90 },
  ];

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl font-black text-text">{isBn ? "📊 সাইকোলজি রিপোর্টস" : "📊 Psychology Reports"}</h1>
        <p className="text-xs text-text-secondary/70 mt-1">
          {isBn ? "মনস্তাত্ত্বিক বিশ্লেষণ রিপোর্ট, ট্রেন্ড এবং পূর্বাভাস" : "Psychology analytics reports, trends, and predictions"}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-border pb-3 overflow-x-auto">
        {(["trends", "segments", "churn"] as const).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-colors ${tab === t ? "bg-primary text-white" : "bg-primary/5 text-text-secondary hover:bg-primary/10"}`}>
            {t === "trends" ? (isBn ? "📈 ট্রেন্ডস" : "📈 Trends") : t === "segments" ? (isBn ? "👥 সেগমেন্ট" : "👥 Segments") : (isBn ? "⚠️ চার্ন" : "⚠️ Churn")}
          </button>
        ))}
        {tab === "trends" && (
          <div className="flex gap-1 ml-auto">
            {dayOptions.map(opt => (
              <button key={opt.value} onClick={() => setDays(opt.value)}
                className={`px-3 py-1.5 rounded-xl text-[10px] font-bold transition-colors ${days === opt.value ? "bg-primary/20 text-primary" : "bg-primary/5 text-text-secondary/60 hover:bg-primary/10"}`}>
                {opt.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {tab === "trends" && renderTrends()}
      {tab === "segments" && renderSegments()}
      {tab === "churn" && renderChurn()}
    </div>
  );
}
