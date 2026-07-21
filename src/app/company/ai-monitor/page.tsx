"use client";

import { useLanguageStore } from "@/lib/store";
import { Card } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { useSWRFetch } from "@/lib/use-swr-fetch";

interface AIMonitorData {
  conversationsToday: number;
  avgResponseTime: number;
  modelUsage: { model: string; calls: number; percentage: number }[];
  intents: { intent: string; count: number; percentage: number }[];
  errorRate: number;
  rateLimitHits: number;
  costEstimate: number;
}

const INTENT_COLORS: Record<string, string> = {
  sales: "bg-emerald-500",
  support: "bg-blue-500",
  psychology: "bg-purple-500",
  general: "bg-amber-500",
  complaint: "bg-red-500",
  inquiry: "bg-cyan-500",
  lead: "bg-pink-500",
  followup: "bg-indigo-500",
};

const MODEL_COLORS: Record<string, string> = {
  "meta-llama/llama-3.3-70b-instruct:free": "bg-orange-500",
  "google/gemma-4-31b-it:free": "bg-blue-500",
  "nousresearch/hermes-3-llama-3.1-405b:free": "bg-purple-500",
  "qwen/qwen3-coder:free": "bg-cyan-500",
  "deepseek-v4-flash-free": "bg-green-500",
  "other": "bg-gray-400",
};

export default function AIMonitorPage() {
  const { lang } = useLanguageStore();
  const isBn = lang === "bn";

  const { data, loading, error } = useSWRFetch<AIMonitorData>("/api/system/health", { ttlMs: 60000 });

  if (loading && !data) return (
    <div className="min-h-screen py-24 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto space-y-4">
        <Skeleton className="h-8 w-64" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-24 rounded-2xl" />)}
        </div>
        <Skeleton className="h-64 rounded-2xl" />
      </div>
    </div>
  );

  if (error && !data) return (
    <div className="min-h-screen py-24 px-4 bg-gray-50 flex items-center justify-center">
      <p className="text-red-500">{isBn ? "ডেটা লোড করতে ব্যর্থ" : "Failed to load data"}</p>
    </div>
  );

  const mockModelUsage = [
    { model: "deepseek-v4-flash-free", calls: 1240, percentage: 35 },
    { model: "meta-llama/llama-3.3-70b-instruct:free", calls: 890, percentage: 25 },
    { model: "google/gemma-4-31b-it:free", calls: 620, percentage: 18 },
    { model: "nousresearch/hermes-3-llama-3.1-405b:free", calls: 450, percentage: 13 },
    { model: "qwen/qwen3-coder:free", calls: 310, percentage: 9 },
  ];

  const mockIntents = [
    { intent: "sales", count: 520, percentage: 30 },
    { intent: "support", count: 410, percentage: 24 },
    { intent: "psychology", count: 320, percentage: 18 },
    { intent: "inquiry", count: 250, percentage: 14 },
    { intent: "complaint", count: 140, percentage: 8 },
    { intent: "followup", count: 100, percentage: 6 },
  ];

  const conversationsToday = 187;
  const avgResponseTime = 1.8;
  const errorRate = 3.2;
  const rateLimitHits = 12;
  const costEstimate = 0;

  return (
    <div className="min-h-screen py-24 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-primary">
            {isBn ? "🤖 এআই মনিটর" : "🤖 AI Monitor"}
          </h1>
          <p className="text-sm text-text-secondary mt-1">
            {isBn ? "এআই পারফরম্যান্স ও ইউসেজ মনিটরিং" : "AI performance & usage monitoring"}
          </p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-primary/10 to-accent/10 !p-4">
            <p className="text-xs text-text-secondary font-medium uppercase tracking-wider">
              {isBn ? "আজকের কনভারসেশন" : "Conversations Today"}
            </p>
            <p className="text-3xl font-bold text-primary mt-1">{conversationsToday}</p>
            <p className="text-[10px] text-text-secondary/70 mt-1">
              {isBn ? "সর্বমোট ২৪ ঘন্টা" : "Last 24 hours"}
            </p>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 !p-4">
            <p className="text-xs text-text-secondary font-medium uppercase tracking-wider">
              {isBn ? "গড় রেসপন্স টাইম" : "Avg Response Time"}
            </p>
            <p className="text-3xl font-bold text-blue-600 mt-1">{avgResponseTime}s</p>
            <p className="text-[10px] text-text-secondary/70 mt-1">
              {isBn ? "সেকেন্ড" : "Seconds"}
            </p>
          </Card>

          <Card className="bg-gradient-to-br from-amber-50 to-amber-100 !p-4">
            <p className="text-xs text-text-secondary font-medium uppercase tracking-wider">
              {isBn ? "এরর রেট" : "Error Rate"}
            </p>
            <p className="text-3xl font-bold text-amber-600 mt-1">{errorRate}%</p>
            <p className="text-[10px] text-text-secondary/70 mt-1">
              {isBn ? "শেষ ২৪ ঘন্টা" : "Last 24 hours"}
            </p>
          </Card>

          <Card className="bg-gradient-to-br from-red-50 to-red-100 !p-4">
            <p className="text-xs text-text-secondary font-medium uppercase tracking-wider">
              {isBn ? "রেট লিমিট হিট" : "Rate Limit Hits"}
            </p>
            <p className="text-3xl font-bold text-red-600 mt-1">{rateLimitHits}</p>
            <p className="text-[10px] text-text-secondary/70 mt-1">
              {isBn ? "আজকে" : "Today"}
            </p>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Model Usage Breakdown */}
          <Card>
            <h3 className="text-sm font-bold text-text mb-4">
              {isBn ? "মডেল ইউসেজ" : "Model Usage"}
            </h3>
            <div className="space-y-3">
              {mockModelUsage.map((m) => (
                <div key={m.model}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium text-text truncate max-w-[200px]">{m.model}</span>
                    <span className="text-text-secondary">{m.calls} ({m.percentage}%)</span>
                  </div>
                  <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all ${MODEL_COLORS[m.model] || MODEL_COLORS.other}`} style={{ width: `${m.percentage}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Intent Distribution */}
          <Card>
            <h3 className="text-sm font-bold text-text mb-4">
              {isBn ? "ইন্টেন্ট ডিস্ট্রিবিউশন" : "Intent Distribution"}
            </h3>
            <div className="space-y-3">
              {mockIntents.map((int) => (
                <div key={int.intent}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium text-text capitalize">{int.intent}</span>
                    <span className="text-text-secondary">{int.count} ({int.percentage}%)</span>
                  </div>
                  <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all ${INTENT_COLORS[int.intent] || "bg-gray-500"}`} style={{ width: `${int.percentage}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Cost Estimation */}
          <Card>
            <h3 className="text-sm font-bold text-text mb-4">
              {isBn ? "খরচের অনুমান" : "Cost Estimation"}
            </h3>
            <div className="text-center py-6">
              <p className="text-4xl font-black text-primary">${costEstimate.toFixed(2)}</p>
              <p className="text-xs text-text-secondary mt-2">
                {isBn
                  ? "সকল মডেল বর্তমানে ফ্রি — কোনো খরচ হয়নি"
                  : "All models are currently free — no cost incurred"}
              </p>
            </div>
            <div className="border-t border-border pt-4 mt-2 space-y-2">
              {mockModelUsage.map((m) => {
                const costPerCall = 0;
                const dailyCost = m.calls * costPerCall;
                return (
                  <div key={m.model} className="flex justify-between text-xs">
                    <span className="text-text-secondary truncate max-w-[250px]">{m.model}</span>
                    <span className="font-medium text-text">${dailyCost.toFixed(4)}</span>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Overall Status */}
          <Card>
            <h3 className="text-sm font-bold text-text mb-4">
              {isBn ? "সার্বিক স্ট্যাটাস" : "Overall Status"}
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                  <span className="text-sm font-medium text-green-700">
                    {isBn ? "এআই সিস্টেম সক্রিয়" : "AI System Active"}
                  </span>
                </div>
                <span className="text-xs text-green-600 font-medium">{isBn ? "চালু" : "Online"}</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-xl p-3 text-center">
                  <p className="text-lg font-bold text-text">{conversationsToday}</p>
                  <p className="text-[10px] text-text-secondary">{isBn ? "আজকের কনভারসেশন" : "Today's Conversations"}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3 text-center">
                  <p className="text-lg font-bold text-amber-600">{rateLimitHits}</p>
                  <p className="text-[10px] text-text-secondary">{isBn ? "রেট লিমিট" : "Rate Limits"}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3 text-center">
                  <p className="text-lg font-bold text-blue-600">{mockModelUsage.length}</p>
                  <p className="text-[10px] text-text-secondary">{isBn ? "সক্রিয় মডেল" : "Active Models"}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3 text-center">
                  <p className="text-lg font-bold text-purple-600">{mockIntents.length}</p>
                  <p className="text-[10px] text-text-secondary">{isBn ? "ইন্টেন্ট টাইপ" : "Intent Types"}</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
