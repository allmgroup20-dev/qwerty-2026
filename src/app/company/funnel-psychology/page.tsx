"use client";

import { useState, useEffect } from "react";
import { useLanguageStore } from "@/lib/store";
import { Skeleton } from "@/components/ui/Skeleton";

interface FunnelStage {
  stage: string; label: string; labelBn: string; users: number;
  dropOff: number; conversionRate: number; color: string;
}

interface PsychData {
  totalProfiles: number; averageTrust: number;
  highControlPercent: number; highManipulationPercent: number;
  trustDistribution: { trusting: number; neutral: number; defensive: number };
}

interface AtRiskProfile {
  phone: string; trust_score: number; control_sensitivity: string;
  manipulation_risk: string; pain_points: string;
}

export default function FunnelPsychologyPage() {
  const { lang } = useLanguageStore();
  const isBn = lang === "bn";
  const [data, setData] = useState<{ funnelStages: FunnelStage[]; psychology: PsychData; atRiskProfiles: AtRiskProfile[] } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/company/funnel-psychology");
        if (res.ok) {
          const json: any = await res.json();
          setData(json.data || null);
        }
      } catch {} finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto space-y-4">
      <Skeleton className="h-8 w-64" />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4"><Skeleton className="h-28 rounded-2xl" /><Skeleton className="h-28 rounded-2xl" /><Skeleton className="h-28 rounded-2xl" /><Skeleton className="h-28 rounded-2xl" /></div>
    </div>
  );

  if (!data) return <div className="p-6 text-text-secondary">No data</div>;

  const { funnelStages, psychology: psych, atRiskProfiles } = data;
  const maxUsers = Math.max(...funnelStages.map(s => s.users), 1);

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl font-black text-text">{isBn ? "🔮 ফানেল সাইকোলজি ডিপ ডাইভ" : "🔮 Funnel Psychology Deep Dive"}</h1>
        <p className="text-xs text-text-secondary/70 mt-1">{isBn ? "প্রতিটি ফানেল ধাপে গ্রাহকের মনস্তাত্ত্বিক অবস্থা বিশ্লেষণ" : "Analyze customer psychological state at every funnel stage"}</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="bg-gradient-to-br from-primary/5 to-info/5 rounded-2xl border border-border p-4 text-center">
          <p className="text-2xl font-black text-primary">{psych.totalProfiles}</p>
          <p className="text-xs text-text-secondary/70 mt-1">{isBn ? "মোট প্রোফাইল" : "Total Profiles"}</p>
        </div>
        <div className="bg-gradient-to-br from-success/5 to-info/5 rounded-2xl border border-border p-4 text-center">
          <p className="text-2xl font-black text-success">{psych.averageTrust}/10</p>
          <p className="text-xs text-text-secondary/70 mt-1">{isBn ? "গড় বিশ্বাস" : "Avg Trust"}</p>
        </div>
        <div className="bg-gradient-to-br from-warning/5 to-error/5 rounded-2xl border border-border p-4 text-center">
          <p className="text-2xl font-black text-warning">{psych.highControlPercent}%</p>
          <p className="text-xs text-text-secondary/70 mt-1">{isBn ? "উচ্চ নিয়ন্ত্রণ সংবেদনশীলতা" : "High Control Sensitivity"}</p>
        </div>
        <div className="bg-gradient-to-br from-error/5 to-warning/5 rounded-2xl border border-border p-4 text-center">
          <p className="text-2xl font-black text-error">{psych.highManipulationPercent}%</p>
          <p className="text-xs text-text-secondary/70 mt-1">{isBn ? "উচ্চ ম্যানিপুলেশন ঝুঁকি" : "High Manipulation Risk"}</p>
        </div>
      </div>

      {/* Funnel Stages */}
      <div className="bg-white rounded-2xl border border-border p-5 mb-6">
        <h2 className="text-sm font-bold text-text mb-4">{isBn ? "ফানেল স্টেজ" : "Funnel Stages"}</h2>
        <div className="space-y-4">
          {funnelStages.map((stage, i) => (
            <div key={stage.stage}>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: stage.color }}>{i + 1}</span>
                  <span className="text-sm font-semibold text-text">{isBn ? stage.labelBn : stage.label}</span>
                </div>
                <div className="flex items-center gap-4 text-xs">
                  <span className="text-text-secondary">{isBn ? "ব্যবহারকারী" : "Users"}: <strong className="text-text">{stage.users}</strong></span>
                  {i > 0 && (
                    <span className={stage.dropOff > 0 ? "text-error" : "text-success"}>
                      {isBn ? "ড্রপ" : "Drop"}: {stage.dropOff}
                    </span>
                  )}
                  <span className="text-text-secondary">{isBn ? "রূপান্তর" : "Conv"}: <strong>{stage.conversionRate}%</strong></span>
                </div>
              </div>
              <div className="h-7 bg-primary/5 rounded-full overflow-hidden flex">
                <div className="h-full transition-all duration-500" style={{ width: `${(stage.users / maxUsers) * 100}%`, background: stage.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trust Distribution + Psychology Impact */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-2xl border border-border p-5">
          <h2 className="text-sm font-bold text-text mb-4">{isBn ? "বিশ্বাস বিতরণ (ফানেল স্টেজ)" : "Trust Distribution across Funnel"}</h2>
          <div className="space-y-2.5">
            {[
              { label: isBn ? "বিশ্বাসী (৭-১০)" : "Trusting (7-10)", value: psych.trustDistribution.trusting, color: "#22c55e" },
              { label: isBn ? "নিরপেক্ষ (৪-৬)" : "Neutral (4-6)", value: psych.trustDistribution.neutral, color: "#eab308" },
              { label: isBn ? "প্রতিরক্ষামূলক (০-৩)" : "Defensive (0-3)", value: psych.trustDistribution.defensive, color: "#ef4444" },
            ].map((t, i) => {
              const total = psych.trustDistribution.trusting + psych.trustDistribution.neutral + psych.trustDistribution.defensive;
              return (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-xs text-text-secondary w-32 shrink-0">{t.label}</span>
                  <div className="flex-1 h-5 bg-primary/5 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-500" style={{ width: `${total > 0 ? (t.value / total) * 100 : 0}%`, background: t.color }} />
                  </div>
                  <span className="text-xs font-bold text-text w-8 text-right">{t.value}</span>
                </div>
              );
            })}
          </div>
          <div className="mt-4 p-3 bg-primary/5 rounded-xl">
            <p className="text-xs text-text-secondary/80 leading-relaxed">
              {isBn
                ? "💡 টিপ: বিশ্বাসী গ্রাহকরা সাধারণত কার্টে পণ্য যোগ করে এবং কেনাকাটা সম্পন্ন করে। প্রতিরক্ষামূলক গ্রাহকদের বেশি বিশ্বাস তৈরি করতে অতিরিক্ত ধাপ এবং স্বাধীনতার আশ্বাস প্রয়োজন।"
                : "💡 Insight: Trusting users typically add to cart and purchase. Defensive users need extra trust-building steps and autonomy reassurance."}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-border p-5">
          <h2 className="text-sm font-bold text-text mb-4">{isBn ? "বিপদজনক প্রোফাইল" : "At-Risk Profiles"}</h2>
          {atRiskProfiles.length === 0 ? (
            <p className="text-xs text-text-secondary/60 text-center py-6">{isBn ? "কোনো বিপদজনক প্রোফাইল নেই" : "No at-risk profiles found"}</p>
          ) : (
            <div className="space-y-2">
              {atRiskProfiles.map((p, i) => (
                <div key={i} className="flex items-center justify-between p-2.5 bg-error/5 rounded-xl">
                  <div>
                    <p className="text-xs font-bold text-text">{p.phone}</p>
                    <p className="text-[10px] text-text-secondary/60 line-clamp-1">{p.pain_points?.slice(0, 60) || isBn ? "কোন তথ্য নেই" : "No data"}</p>
                  </div>
                  <div className="flex gap-1.5">
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                      p.trust_score < 4 ? "bg-error/10 text-error" : "bg-success/10 text-success"
                    }`}>{p.trust_score}/10</span>
                    {p.control_sensitivity === "high" && <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-warning/10 text-warning">C</span>}
                    {p.manipulation_risk === "high" && <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-error/10 text-error">M</span>}
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="mt-3 p-3 bg-warning/5 rounded-xl">
            <p className="text-xs text-text-secondary/80 leading-relaxed">
              {isBn
                ? "⚠️ কম বিশ্বাস + উচ্চ নিয়ন্ত্রণ সংবেদনশীলতা + উচ্চ ম্যানিপুলেশন ঝুঁকি = ফানেলে ড্রপ-অফের উচ্চ সম্ভাবনা। এসব গ্রাহকদের জন্য স্বায়ত্তশাসন নিশ্চিত করা এবং চাপমুক্ত পরিবেশ তৈরি করা জরুরি।"
                : "⚠️ Low trust + high control sensitivity + high manipulation risk = high funnel drop-off. Give these users autonomy and pressure-free space."}
            </p>
          </div>
        </div>
      </div>

      {/* Funnel Psychology Guide */}
      <div className="bg-white rounded-2xl border border-border p-5">
        <h2 className="text-sm font-bold text-text mb-4">{isBn ? "📖 ফানেল সাইকোলজি গাইড" : "📖 Funnel Psychology Guide"}</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {[
            { stage: "Visit", stageBn: "ভিজিট", psych: isBn ? "কৌতূহল + সতর্কতা" : "Curiosity + Caution", advice: isBn ? "প্রথম ইমপ্রেশন তৈরি করুন। বিশ্বাসের ভিত্তি স্থাপন করুন।" : "Create first impression. Build trust foundation.", color: "#3b82f6" },
            { stage: "Interest", stageBn: "আগ্রহ", psych: isBn ? "প্রয়োজন অনুসন্ধান + তুলনা" : "Need discovery + Comparison", advice: isBn ? "গভীর প্রয়োজন বোঝান। ভয় চিহ্নিত করুন।" : "Understand deep needs. Identify fears.", color: "#8b5cf6" },
            { stage: "Product View", stageBn: "পণ্য দেখা", psych: isBn ? "মূল্যায়ন + সন্দেহ" : "Evaluation + Skepticism", advice: isBn ? "সামাজিক প্রমাণ দিন। স্বাধীনতা নিশ্চিত করুন।" : "Provide social proof. Ensure autonomy.", color: "#f59e0b" },
            { stage: "Add to Cart", stageBn: "কার্টে যোগ", psych: isBn ? "প্রতিশ্রুতি + দ্বিধা" : "Commitment + Hesitation", advice: isBn ? "ঝুঁকি দূর করুন। গ্যারান্টি দিন। আশ্বস্ত করুন।" : "Remove risk. Guarantee. Reassure.", color: "#f97316" },
          ].map((g, i) => (
            <div key={i} className="border border-border/60 rounded-xl p-4" style={{ borderTopColor: g.color, borderTopWidth: 3 }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white" style={{ background: g.color }}>{i + 1}</span>
                <span className="text-xs font-bold text-text">{isBn ? g.stageBn : g.stage}</span>
              </div>
              <p className="text-[11px] text-text-secondary/80 mb-1.5"><strong>{isBn ? "মনস্তত্ত্ব" : "Psychology"}:</strong> {g.psych}</p>
              <p className="text-[11px] text-text-secondary/60">{g.advice}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
