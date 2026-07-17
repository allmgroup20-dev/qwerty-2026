"use client";

import { useState, useEffect } from "react";
import { useLanguageStore } from "@/lib/store";
import { Card } from "@/components/ui/Card";

interface TriggerItem {
  workerId: string; name: string; phone: string; trigger: string; detail: string; segment: string;
}

export default function CompanyAutomationPage() {
  const { lang } = useLanguageStore();
  const [triggers, setTriggers] = useState<TriggerItem[]>([]);
  const [byType, setByType] = useState<Record<string, number>>({});
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/company/automation")
      .then(r => r.json())
      .then((d: any) => {
        if (d.triggers) { setTriggers(d.triggers); setByType(d.byType || {}); setTotal(d.total || 0); }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const triggerLabels: Record<string, string> = {
    browse_abandon: lang === "bn" ? "ব্রাউজ abandoned" : "Browse Abandon",
    inactive_14d: lang === "bn" ? "১৪ দিন নিষ্ক্রিয়" : "Inactive 14d",
    inactive_30d: lang === "bn" ? "৩০+ দিন নিষ্ক্রিয়" : "Inactive 30d+",
    churn_risk: lang === "bn" ? "চার্ন রিস্ক" : "Churn Risk",
  };

  const triggerColors: Record<string, string> = {
    browse_abandon: "bg-blue-100 text-blue-700",
    inactive_14d: "bg-yellow-100 text-yellow-700",
    inactive_30d: "bg-orange-100 text-orange-700",
    churn_risk: "bg-red-100 text-red-700",
  };

  return (
    <div className="min-h-screen py-24 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-primary">{lang === "bn" ? "অটোমেশন ট্রিগার" : "Automation Triggers"}</h1>
          <p className="text-sm text-text-secondary mt-1">{total} {lang === "bn" ? "টি সক্রিয় ট্রিগার" : "active triggers"}</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {Object.entries(triggerLabels).map(([key, label]) => (
            <Card key={key} className="text-center">
              <p className={`text-2xl font-bold ${key === "churn_risk" ? "text-red-600" : key === "inactive_30d" ? "text-orange-600" : key === "inactive_14d" ? "text-yellow-600" : "text-blue-600"}`}>
                {byType[key] || 0}
              </p>
              <p className="text-xs text-text-secondary mt-1">{label}</p>
            </Card>
          ))}
        </div>

        {/* Trigger List */}
        <Card>
          <h3 className="font-bold text-primary mb-4">{lang === "bn" ? "ট্রিগার লিস্ট" : "Trigger List"}</h3>
          {loading ? (
            <div className="text-center py-8 text-text-secondary text-sm">{lang === "bn" ? "লোড হচ্ছে..." : "Loading..."}</div>
          ) : triggers.length === 0 ? (
            <div className="text-center py-8 text-text-secondary text-sm">{lang === "bn" ? "কোন ট্রিগার নেই" : "No triggers"}</div>
          ) : (
            <div className="space-y-2">
              {triggers.map((t, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm text-primary">{t.name}</span>
                      <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${triggerColors[t.trigger] || "bg-gray-100"}`}>{triggerLabels[t.trigger] || t.trigger}</span>
                    </div>
                    <p className="text-xs text-text-secondary mt-0.5">{t.detail} · {t.phone}</p>
                  </div>
                  <span className="text-xs text-text-secondary">{t.segment || "—"}</span>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
