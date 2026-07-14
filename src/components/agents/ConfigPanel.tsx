"use client";

import { useState } from "react";
import { useLanguageStore } from "@/lib/store";
import type { Agent } from "@/lib/ai/agents";

export default function ConfigPanel({
  agents,
  onUpdate,
}: {
  agents: Agent[];
  onUpdate: (id: string, config: any) => Promise<void>;
}) {
  const { lang } = useLanguageStore();
  const [saving, setSaving] = useState<string | null>(null);

  const handleUpdate = async (agentId: string, field: string, value: string | number) => {
    setSaving(agentId);
    try {
      const config: any = {};
      config[field] = value;
      await onUpdate(agentId, config);
    } finally {
      setSaving(null);
    }
  };

  return (
    <div className="space-y-4">
      {agents.map((agent) => (
        <div key={agent.agent_id} className="bg-white rounded-2xl border border-border p-4">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-lg">{agent.level === 3 ? "👑" : agent.level === 2 ? "📊" : "🔍"}</span>
            <div>
              <span className="text-sm font-semibold text-text">
                {lang === "bn" ? agent.name_bn : agent.name_en}
              </span>
              <span className="text-xs text-text-secondary ml-2">({agent.agent_id})</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-medium text-text-secondary block mb-1">
                {lang === "bn" ? "মডেল" : "Model"}
              </label>
              <select
                defaultValue={agent.model_id || ""}
                onChange={(e) => handleUpdate(agent.agent_id, "model_id", e.target.value)}
                className="w-full px-3 py-1.5 text-sm border border-border rounded-lg bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
              >
                <option value="">{lang === "bn" ? "ডিফল্ট" : "Default"}</option>
                <option value="google/gemini-2.0-flash-001:free">Gemini 2.0 Flash</option>
                <option value="deepseek/deepseek-chat-v3-0324">DeepSeek V3</option>
                <option value="meta-llama/llama-4-scout-17b-16e-instruct">Llama 4 Scout</option>
                <option value="mistralai/mistral-small-24b-instruct-2501">Mistral Small 24B</option>
                <option value="qwen/qwen2.5-32b-instruct">Qwen 2.5 32B</option>
                <option value="openrouter/free">Free Router</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-text-secondary block mb-1">
                {lang === "bn" ? "প্রোভাইডার" : "Provider"}
              </label>
              <select
                value={agent.provider}
                onChange={(e) => handleUpdate(agent.agent_id, "provider", e.target.value)}
                className="w-full px-3 py-1.5 text-sm border border-border rounded-lg bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
              >
                <option value="openrouter">OpenRouter</option>
                <option value="opencode">OpenCode</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-text-secondary block mb-1">
                {lang === "bn" ? "ক্রন (মিনিট)" : "Cron (minutes)"}
              </label>
              <select
                value={agent.cron_interval}
                onChange={(e) => handleUpdate(agent.agent_id, "cron_interval", parseInt(e.target.value))}
                className="w-full px-3 py-1.5 text-sm border border-border rounded-lg bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
              >
                <option value={60}>{lang === "bn" ? "প্রতি ১ ঘণ্টা" : "Every 1 hour"}</option>
                <option value={360}>{lang === "bn" ? "প্রতি ৬ ঘণ্টা" : "Every 6 hours"}</option>
                <option value={720}>{lang === "bn" ? "প্রতি ১২ ঘণ্টা" : "Every 12 hours"}</option>
                <option value={1440}>{lang === "bn" ? "প্রতিদিন" : "Daily"}</option>
                <option value={10080}>{lang === "bn" ? "সাপ্তাহিক" : "Weekly"}</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={agent.status !== "disabled"}
                onChange={(e) => handleUpdate(agent.agent_id, "status", e.target.checked ? "idle" : "disabled")}
                className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span className="text-xs text-text-secondary">
                {lang === "bn" ? "সক্রিয়" : "Enabled"}
              </span>
            </label>
            {saving === agent.agent_id && (
              <span className="text-xs text-text-secondary/60">
                {lang === "bn" ? "সংরক্ষণ হচ্ছে..." : "Saving..."}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
