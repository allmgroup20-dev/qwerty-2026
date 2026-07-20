"use client";

import { useState, useEffect } from "react";
import { useLanguageStore } from "@/lib/store";
import { Skeleton } from "@/components/ui/Skeleton";

interface PsychStats {
  totalProfiles: number;
  averageTrust: number;
  trustDistribution: { high: number; medium: number; low: number; critical: number };
  fearProfile: { financial_loss: number; social_status: number; being_deceived: number; losing_autonomy: number; unknown: number };
  controlSensitivity: { low: number; medium: number; high: number };
  manipulationRisk: { low: number; medium: number; high: number };
  recentProfiles: { phone: string; trust_score: number; control_sensitivity: string; manipulation_risk: string; updated_at: string }[];
}

export default function PsychologyInsightsPage() {
  const { lang } = useLanguageStore();
  const isBn = lang === "bn";
  const [stats, setStats] = useState<PsychStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/company/psychology-stats");
        if (res.ok) {
          const data: any = await res.json();
          setStats(data.stats || null);
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
      <Skeleton className="h-80 rounded-2xl" />
    </div>
  );

  const s = stats || {
    totalProfiles: 0, averageTrust: 0,
    trustDistribution: { high: 0, medium: 0, low: 0, critical: 0 },
    fearProfile: { financial_loss: 0, social_status: 0, being_deceived: 0, losing_autonomy: 0, unknown: 0 },
    controlSensitivity: { low: 0, medium: 0, high: 0 },
    manipulationRisk: { low: 0, medium: 0, high: 0 },
    recentProfiles: [],
  };

  const trustTotal = s.trustDistribution.high + s.trustDistribution.medium + s.trustDistribution.low + s.trustDistribution.critical;

  const Bar = ({ label, labelBn, value, max, color }: { label: string; labelBn: string; value: number; max: number; color: string }) => (
    <div className="flex items-center gap-3">
      <span className="text-xs text-text-secondary w-28 shrink-0">{isBn ? labelBn : label}</span>
      <div className="flex-1 h-5 bg-primary/5 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${max > 0 ? (value / max) * 100 : 0}%`, background: color }} />
      </div>
      <span className="text-xs font-bold text-text w-8 text-right">{value}</span>
    </div>
  );

  const fearTotal = Object.values(s.fearProfile).reduce((a, b) => a + b, 0);

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl font-black text-text">{isBn ? "🧠 সাইকোলজি ইনসাইটস" : "🧠 Psychology Insights"}</h1>
        <p className="text-xs text-text-secondary/70 mt-1">{isBn ? "গ্রাহক মনস্তাত্ত্বিক প্রোফাইল ড্যাশবোর্ড" : "Customer psychological profile dashboard"}</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {[
          { label: isBn ? "মোট প্রোফাইল" : "Total Profiles", labelBn: "মোট প্রোফাইল", value: s.totalProfiles, color: "from-primary/5 to-info/5", textColor: "text-primary" },
          { label: isBn ? "গড় বিশ্বাস" : "Avg Trust Score", labelBn: "গড় বিশ্বাস", value: `${s.averageTrust}/10`, color: "from-success/5 to-info/5", textColor: "text-success" },
          { label: isBn ? "উচ্চ নিয়ন্ত্রণ" : "High Control %", labelBn: "উচ্চ নিয়ন্ত্রণ", value: `${s.controlSensitivity.high}`, color: "from-warning/5 to-error/5", textColor: "text-warning" },
          { label: isBn ? "উচ্চ ম্যানিপুলেশন" : "High Manipulation Risk", labelBn: "উচ্চ ম্যানিপুলেশন", value: `${s.manipulationRisk.high}`, color: "from-error/5 to-warning/5", textColor: "text-error" },
        ].map((card, i) => (
          <div key={i} className={`bg-gradient-to-br ${card.color} rounded-2xl border border-border p-4 text-center`}>
            <p className={`text-2xl font-black ${card.textColor}`}>{card.value}</p>
            <p className="text-xs text-text-secondary/70 mt-1">{card.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Trust Distribution */}
        <div className="bg-white rounded-2xl border border-border p-5">
          <h2 className="text-sm font-bold text-text mb-4">{isBn ? "বিশ্বাস বিতরণ" : "Trust Distribution"}</h2>
          <div className="space-y-2.5">
            <Bar label="High (8-10)" labelBn="উচ্চ (৮-১০)" value={s.trustDistribution.high} max={trustTotal} color="#22c55e" />
            <Bar label="Medium (5-7)" labelBn="মাঝারি (৫-৭)" value={s.trustDistribution.medium} max={trustTotal} color="#eab308" />
            <Bar label="Low (3-4)" labelBn="নিম্ন (৩-৪)" value={s.trustDistribution.low} max={trustTotal} color="#f97316" />
            <Bar label="Critical (0-2)" labelBn="সমালোচনামূলক (০-২)" value={s.trustDistribution.critical} max={trustTotal} color="#ef4444" />
          </div>
          <p className="text-xs text-text-secondary/50 mt-3">{isBn ? "গড় বিশ্বাস স্কোর" : "Average Trust Score"}: <span className="font-bold text-text">{s.averageTrust}/10</span></p>
        </div>

        {/* Fear Profile */}
        <div className="bg-white rounded-2xl border border-border p-5">
          <h2 className="text-sm font-bold text-text mb-4">{isBn ? "ভয় প্রোফাইল" : "Fear Profile"}</h2>
          <div className="space-y-2.5">
            <Bar label="Financial Loss" labelBn="আর্থিক ক্ষতি" value={s.fearProfile.financial_loss} max={fearTotal} color="#ef4444" />
            <Bar label="Social Status" labelBn="সামাজিক মর্যাদা" value={s.fearProfile.social_status} max={fearTotal} color="#f97316" />
            <Bar label="Being Deceived" labelBn="প্রতারিত হওয়া" value={s.fearProfile.being_deceived} max={fearTotal} color="#eab308" />
            <Bar label="Losing Autonomy" labelBn="স্বায়ত্তশাসন হারানো" value={s.fearProfile.losing_autonomy} max={fearTotal} color="#8b5cf6" />
            <Bar label="Unknown" labelBn="অজানা" value={s.fearProfile.unknown} max={fearTotal} color="#6b7280" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Control Sensitivity */}
        <div className="bg-white rounded-2xl border border-border p-5">
          <h2 className="text-sm font-bold text-text mb-4">{isBn ? "নিয়ন্ত্রণ সংবেদনশীলতা" : "Control Sensitivity"}</h2>
          <div className="space-y-2.5">
            <Bar label="Low" labelBn="নিম্ন" value={s.controlSensitivity.low} max={Math.max(s.controlSensitivity.low, s.controlSensitivity.medium, s.controlSensitivity.high, 1)} color="#22c55e" />
            <Bar label="Medium" labelBn="মাঝারি" value={s.controlSensitivity.medium} max={Math.max(s.controlSensitivity.low, s.controlSensitivity.medium, s.controlSensitivity.high, 1)} color="#eab308" />
            <Bar label="High" labelBn="উচ্চ" value={s.controlSensitivity.high} max={Math.max(s.controlSensitivity.low, s.controlSensitivity.medium, s.controlSensitivity.high, 1)} color="#ef4444" />
          </div>
          <p className="text-xs text-text-secondary/50 mt-3">{isBn ? "উচ্চ নিয়ন্ত্রণ সংবেদনশীলতা = স্বাধীনতার প্রয়োজন" : "High control sensitivity = needs autonomy"}</p>
        </div>

        {/* Manipulation Risk */}
        <div className="bg-white rounded-2xl border border-border p-5">
          <h2 className="text-sm font-bold text-text mb-4">{isBn ? "ম্যানিপুলেশন ঝুঁকি" : "Manipulation Risk"}</h2>
          <div className="space-y-2.5">
            <Bar label="Low" labelBn="নিম্ন" value={s.manipulationRisk.low} max={Math.max(s.manipulationRisk.low, s.manipulationRisk.medium, s.manipulationRisk.high, 1)} color="#22c55e" />
            <Bar label="Medium" labelBn="মাঝারি" value={s.manipulationRisk.medium} max={Math.max(s.manipulationRisk.low, s.manipulationRisk.medium, s.manipulationRisk.high, 1)} color="#eab308" />
            <Bar label="High" labelBn="উচ্চ" value={s.manipulationRisk.high} max={Math.max(s.manipulationRisk.low, s.manipulationRisk.medium, s.manipulationRisk.high, 1)} color="#ef4444" />
          </div>
          <p className="text-xs text-text-secondary/50 mt-3">{isBn ? "উচ্চ ম্যানিপুলেশন ঝুঁকি = অতিরিক্ত সাবধানতা প্রয়োজন" : "High manipulation risk = extra caution needed"}</p>
        </div>
      </div>

      {/* Recent Profiles */}
      <div className="bg-white rounded-2xl border border-border p-5">
        <h2 className="text-sm font-bold text-text mb-4">{isBn ? "সাম্প্রতিক প্রোফাইল আপডেট" : "Recent Profile Updates"}</h2>
        {s.recentProfiles.length === 0 ? (
          <p className="text-xs text-text-secondary/60 text-center py-6">{isBn ? "কোনো প্রোফাইল পাওয়া যায়নি" : "No profiles found"}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border/40">
                  <th className="text-left py-2 pr-4 text-text-secondary/60 font-semibold">{isBn ? "ফোন" : "Phone"}</th>
                  <th className="text-left py-2 pr-4 text-text-secondary/60 font-semibold">{isBn ? "বিশ্বাস" : "Trust"}</th>
                  <th className="text-left py-2 pr-4 text-text-secondary/60 font-semibold">{isBn ? "নিয়ন্ত্রণ সংবেদনশীলতা" : "Control"}</th>
                  <th className="text-left py-2 pr-4 text-text-secondary/60 font-semibold">{isBn ? "ম্যানিপুলেশন ঝুঁকি" : "Manipulation"}</th>
                  <th className="text-left py-2 text-text-secondary/60 font-semibold">{isBn ? "আপডেট" : "Updated"}</th>
                </tr>
              </thead>
              <tbody>
                {s.recentProfiles.map((p, i) => (
                  <tr key={i} className="border-b border-border/20 hover:bg-primary/5">
                    <td className="py-2.5 pr-4 font-medium text-text">{p.phone}</td>
                    <td className="py-2.5 pr-4">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                        p.trust_score >= 7 ? "bg-success/10 text-success" :
                        p.trust_score >= 4 ? "bg-warning/10 text-warning" :
                        "bg-error/10 text-error"
                      }`}>{p.trust_score}/10</span>
                    </td>
                    <td className="py-2.5 pr-4">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                        p.control_sensitivity === "high" ? "bg-error/10 text-error" :
                        p.control_sensitivity === "medium" ? "bg-warning/10 text-warning" :
                        "bg-success/10 text-success"
                      }`}>{p.control_sensitivity}</span>
                    </td>
                    <td className="py-2.5 pr-4">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                        p.manipulation_risk === "high" ? "bg-error/10 text-error" :
                        p.manipulation_risk === "medium" ? "bg-warning/10 text-warning" :
                        "bg-success/10 text-success"
                      }`}>{p.manipulation_risk}</span>
                    </td>
                    <td className="py-2.5 text-text-secondary/60">{p.updated_at?.split("T")[0] || p.updated_at?.slice(0, 10)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
