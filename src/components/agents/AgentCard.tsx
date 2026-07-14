"use client";

import { useLanguageStore } from "@/lib/store";
import type { Agent, AgentReport, AgentSubmission, AgentLog } from "@/lib/ai/agents";

const LEVEL_LABELS: Record<number, { bn: string; en: string }> = {
  1: { bn: "সেক্টর এজেন্ট", en: "Sector Agent" },
  2: { bn: "ডোমেইন এজেন্ট", en: "Domain Agent" },
  3: { bn: "প্রধান এজেন্ট", en: "Senior Agent" },
};

const STATUS_COLORS: Record<string, string> = {
  active: "text-green-600 bg-green-50",
  idle: "text-yellow-600 bg-yellow-50",
  error: "text-red-600 bg-red-50",
  disabled: "text-gray-600 bg-gray-50",
};

const STATUS_TEXT: Record<string, { bn: string; en: string }> = {
  active: { bn: "সক্রিয়", en: "Active" },
  idle: { bn: "নিষ্ক্রিয়", en: "Idle" },
  error: { bn: "ত্রুটি", en: "Error" },
  disabled: { bn: "বন্ধ", en: "Disabled" },
};

export default function AgentCard({
  agent,
  report,
  submissions,
  logs,
  onRun,
  onConfig,
}: {
  agent: Agent;
  report?: AgentReport | null;
  submissions?: AgentSubmission[];
  logs?: AgentLog[];
  onRun?: () => void;
  onConfig?: () => void;
}) {
  const { lang } = useLanguageStore();
  const statusStyle = STATUS_COLORS[agent.status] || STATUS_COLORS.idle;
  const statusText = STATUS_TEXT[agent.status] || STATUS_TEXT.idle;
  const levelLabel = LEVEL_LABELS[agent.level] || { bn: "এজেন্ট", en: "Agent" };
  const lastRun = agent.last_run_at
    ? new Date(agent.last_run_at).toLocaleString(lang === "bn" ? "bn-BD" : "en-US")
    : (lang === "bn" ? "কখনো চালানো হয়নি" : "Never run");

  let reportContent: any = null;
  if (report) {
    try { reportContent = JSON.parse(report.recommendations || "[]"); } catch {}
  }

  return (
    <div className="bg-white rounded-2xl border border-border p-5 space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-lg">{agent.level === 3 ? "👑" : agent.level === 2 ? "📊" : "🔍"}</span>
            <h2 className="text-lg font-bold text-text">
              {lang === "bn" ? agent.name_bn : agent.name_en}
            </h2>
            <span className="text-xs text-text-secondary">({agent.agent_id})</span>
          </div>
          <div className="flex items-center gap-3 mt-1">
            <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${statusStyle}`}>
              {statusText[lang]}
            </span>
            <span className="text-xs text-text-secondary">
              {levelLabel[lang]}
            </span>
            {agent.model_id && (
              <span className="text-xs text-text-secondary/60">
                {agent.model_id}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onRun}
            className="px-3 py-1.5 text-xs font-medium bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            {lang === "bn" ? "⚡ চালান" : "⚡ Run"}
          </button>
          <button
            onClick={onConfig}
            className="px-3 py-1.5 text-xs font-medium bg-gray-100 text-text-secondary rounded-lg hover:bg-gray-200 transition-colors"
          >
            {lang === "bn" ? "⚙️ সেটিংস" : "⚙️ Config"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-gray-50 rounded-xl p-3 text-center">
          <div className="text-xs text-text-secondary">{lang === "bn" ? "সর্বশেষ রান" : "Last Run"}</div>
          <div className="text-sm font-semibold text-text mt-0.5">{lastRun}</div>
        </div>
        <div className="bg-gray-50 rounded-xl p-3 text-center">
          <div className="text-xs text-text-secondary">{lang === "bn" ? "ক্রন" : "Cron"}</div>
          <div className="text-sm font-semibold text-text mt-0.5">
            {lang === "bn" ? `প্রতি ${agent.cron_interval / 60} ঘণ্টা` : `Every ${agent.cron_interval / 60}h`}
          </div>
        </div>
        <div className="bg-gray-50 rounded-xl p-3 text-center">
          <div className="text-xs text-text-secondary">{lang === "bn" ? "সাবমিশন" : "Submissions"}</div>
          <div className="text-sm font-semibold text-text mt-0.5">
            {submissions?.length || 0}
          </div>
        </div>
        <div className="bg-gray-50 rounded-xl p-3 text-center">
          <div className="text-xs text-text-secondary">{lang === "bn" ? "রিপোর্ট" : "Reports"}</div>
          <div className="text-sm font-semibold text-text mt-0.5">
            {report ? 1 : 0}
          </div>
        </div>
      </div>

      {report && reportContent && Array.isArray(reportContent) && reportContent.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-text mb-2">
            {lang === "bn" ? "📋 সর্বশেষ সুপারিশ" : "📋 Latest Recommendations"}
          </h3>
          <div className="space-y-1.5">
            {reportContent.map((rec: string, i: number) => (
              <div key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                <span className="text-primary font-medium shrink-0">{i + 1}.</span>
                <span>{rec}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {logs && logs.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-text mb-2">
            {lang === "bn" ? "📋 সাম্প্রতিক কার্যকলাপ" : "📋 Recent Activity"}
          </h3>
          <div className="space-y-1 max-h-32 overflow-y-auto">
            {logs.slice(0, 5).map((log) => (
              <div key={log.id} className="flex items-start gap-2 text-xs text-text-secondary">
                <span className="text-text-secondary/60 shrink-0">
                  {log.created_at ? new Date(log.created_at).toLocaleTimeString(lang === "bn" ? "bn-BD" : "en-US", { hour: "2-digit", minute: "2-digit" }) : ""}
                </span>
                <span>{log.detail_bn || log.action}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
