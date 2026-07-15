"use client";

import { useState, useEffect } from "react";
import { useLanguageStore } from "@/lib/store";

interface Stats {
  responses: { total: number; today: number };
  models: { active: number; total: number };
  keys: { active: number };
  conversations: number;
  profiles: number;
  skills: number;
  painPointFrequency: Record<string, number>;
}

interface ConsolidationResult {
  faqs: number;
  shortcuts: number;
}

export default function SkillsPage() {
  const { lang } = useLanguageStore();
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [consolidating, setConsolidating] = useState(false);
  const [result, setResult] = useState<ConsolidationResult | null>(null);

  async function loadStats() {
    setLoading(true);
    try {
      const res = await fetch("/api/ai/stats");
      const data: Stats = await res.json();
      if (data.responses) setStats(data);
    } catch {}
    setLoading(false);
  }

  useEffect(() => { loadStats(); }, []);

  async function runConsolidation() {
    setConsolidating(true);
    setResult(null);
    try {
      const res = await fetch("/api/ai/skills/consolidate", { method: "POST" });
      const data = await res.json();
      if (data.ok) setResult(data as ConsolidationResult);
    } catch {}
    setConsolidating(false);
    loadStats();
  }

  const topPainPoints = stats ? Object.entries(stats.painPointFrequency).sort(([, a], [, b]) => b - a).slice(0, 10) : [];

  return (
    <div className="min-h-screen py-24 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 animate-fade-up">
          <h1 className="text-2xl font-bold text-primary">
            {lang === "bn" ? "স্কিল ও অ্যানালিটিক্স" : "Skills & Analytics"}
          </h1>
          <p className="text-sm text-text-secondary mt-1">
            {lang === "bn" ? "এআই স্কিল কনসলিডেশন ও সিস্টেম অ্যানালিটিক্স" : "AI skill consolidation & system analytics"}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {[
            { label: lang === "bn" ? "মোট রেসপন্স" : "Total Responses", value: stats?.responses.total || 0, color: "text-primary" },
            { label: lang === "bn" ? "আজকের রেসপন্স" : "Today", value: stats?.responses.today || 0, color: "text-green-600" },
            { label: lang === "bn" ? "কনভারসেশন" : "Conversations", value: stats?.conversations || 0, color: "text-blue-600" },
            { label: lang === "bn" ? "প্রোফাইল" : "Profiles", value: stats?.profiles || 0, color: "text-purple-600" },
            { label: lang === "bn" ? "স্কিল" : "Skills Learned", value: stats?.skills || 0, color: "text-amber-600" },
            { label: lang === "bn" ? "একটিভ মডেল" : "Active Models", value: stats?.models.active || 0, color: "text-indigo-600" },
            { label: lang === "bn" ? "একটিভ কী" : "Active API Keys", value: stats?.keys.active || 0, color: "text-teal-600" },
            { label: "AI Models", value: `${stats?.models.active || 0}/${stats?.models.total || 26}`, color: "text-rose-600" },
          ].map((s) => (
            <div key={s.label} className="card p-4 text-center">
              <div className={`text-xl font-bold ${s.color}`}>{s.value}</div>
              <div className="text-xs text-text-secondary mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          <div className="card p-5">
            <h3 className="font-bold text-primary text-sm mb-3">
              {lang === "bn" ? "স্কিল কনসলিডেশন" : "Skill Consolidation"}
            </h3>
            <p className="text-xs text-text-secondary mb-4">
              {lang === "bn"
                ? "স্বয়ংক্রিয়ভাবে WhatsApp কথোপকথন বিশ্লেষণ করে বারবার আসা প্রশ্নগুলোকে স্কিল হিসেবে সংরক্ষণ করে। ৩+ বার আসা প্রশ্ন জিরো-টোকেন শর্টকাট হয়, ২+ বার FAQ হয়।"
                : "Automatically analyzes WhatsApp conversations and saves repeated questions as skills. 3+ occurrences become zero-token shortcuts, 2+ become FAQs."}
            </p>
            {result && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-3 mb-3 text-xs text-green-800">
                {lang === "bn"
                  ? `${result.shortcuts}টি শর্টকাট + ${result.faqs}টি FAQ তৈরি হয়েছে`
                  : `${result.shortcuts} shortcuts + ${result.faqs} FAQs created`}
              </div>
            )}
            <button onClick={runConsolidation} disabled={consolidating} className="px-4 py-2 text-xs font-medium bg-primary text-white rounded-xl hover:bg-primary/90 disabled:opacity-50 transition-all">
              {consolidating
                ? (lang === "bn" ? "কনসলিডেট হচ্ছে..." : "Consolidating...")
                : (lang === "bn" ? "🔍 স্কিল কনসলিডেট করুন" : "🔍 Consolidate Skills Now")}
            </button>
          </div>

          <div className="card p-5">
            <h3 className="font-bold text-primary text-sm mb-3">
              {lang === "bn" ? "শীর্ষ পেইন পয়েন্ট" : "Top Pain Points"}
            </h3>
            {topPainPoints.length === 0 ? (
              <p className="text-xs text-text-secondary">{lang === "bn" ? "কোনো পেইন পয়েন্ট নেই" : "No pain points recorded yet"}</p>
            ) : (
              <div className="space-y-2">
                {topPainPoints.map(([point, count], i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-xs font-medium text-primary">{point}</span>
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 bg-primary/20 rounded-full" style={{ width: `${Math.min(100, (count / topPainPoints[0][1]) * 100)}px` }} />
                      <span className="text-xs font-bold text-text-secondary">{count}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="card p-5">
          <h3 className="font-bold text-primary text-sm mb-3">
            {lang === "bn" ? "সিস্টেম হেলথ" : "System Health"}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <div>
                <div className="text-xs font-medium text-green-800">
                  {lang === "bn" ? "ওয়েবহুক" : "Webhook"}
                </div>
                <div className="text-xs text-green-600">
                  {lang === "bn" ? "কানেক্টেড" : "Connected"}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-xl">
              <div className="w-2 h-2 rounded-full bg-amber-500" />
              <div>
                <div className="text-xs font-medium text-amber-800">
                  {lang === "bn" ? "ক্যাশে" : "Cache"}
                </div>
                <div className="text-xs text-amber-600">{stats?.skills || 0} {lang === "bn" ? "স্কিল" : "skills"}</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <div>
                <div className="text-xs font-medium text-blue-800">
                  {lang === "bn" ? "ডাটাবেস" : "Database"}
                </div>
                <div className="text-xs text-blue-600">{stats?.profiles || 0} {lang === "bn" ? "প্রোফাইল" : "profiles"}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
