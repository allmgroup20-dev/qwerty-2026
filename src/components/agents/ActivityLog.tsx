"use client";

import { useLanguageStore } from "@/lib/store";
import type { AgentLog } from "@/lib/ai/agents";

const ACTION_ICONS: Record<string, string> = {
  started: "▶️",
  completed: "✅",
  error: "❌",
  synthesized: "🔄",
  reported: "📋",
};

export default function ActivityLog({ logs }: { logs: AgentLog[] }) {
  const { lang } = useLanguageStore();

  if (!logs.length) {
    return (
      <div className="text-center py-8 text-text-secondary">
        {lang === "bn" ? "কোনো কার্যকলাপ নেই" : "No activity yet"}
      </div>
    );
  }

  return (
    <div className="space-y-1.5">
      {logs.map((log) => {
        const icon = ACTION_ICONS[log.action] || "📌";
        const time = log.created_at
          ? new Date(log.created_at).toLocaleString(lang === "bn" ? "bn-BD" : "en-US", {
              hour: "2-digit",
              minute: "2-digit",
              month: "short",
              day: "numeric",
            })
          : "";
        return (
          <div key={log.id} className="flex items-start gap-3 p-2.5 rounded-lg bg-white border border-border hover:bg-gray-50 transition-colors">
            <span className="text-base shrink-0">{icon}</span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-semibold text-text">{log.agent_id}</span>
                <span className="text-xs text-text-secondary/60">{time}</span>
              </div>
              <p className="text-sm text-text-secondary mt-0.5">
                {log.detail_bn || log.action}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
