"use client";

import { useLanguageStore } from "@/lib/store";
import type { AgentTreeNode } from "@/lib/ai/agents";

const LEVEL_ICONS: Record<number, string> = {
  3: "👑",
  2: "📊",
  1: "🔍",
};

const STATUS_COLORS: Record<string, string> = {
  active: "bg-green-500",
  idle: "bg-yellow-400",
  error: "bg-red-500",
  disabled: "bg-gray-400",
};

const STATUS_TEXT: Record<string, { bn: string; en: string }> = {
  active: { bn: "সক্রিয়", en: "Active" },
  idle: { bn: "নিষ্ক্রিয়", en: "Idle" },
  error: { bn: "ত্রুটি", en: "Error" },
  disabled: { bn: "বন্ধ", en: "Disabled" },
};

export default function AgentTree({ tree }: { tree: AgentTreeNode[] }) {
  const { lang } = useLanguageStore();

  if (!tree.length) {
    return (
      <div className="text-center py-8 text-text-secondary">
        {lang === "bn" ? "কোনো এজেন্ট পাওয়া যায়নি" : "No agents found"}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {tree.map((node) => (
        <TreeNode key={node.agent.agent_id} node={node} depth={0} lang={lang} />
      ))}
    </div>
  );
}

function TreeNode({ node, depth, lang }: { node: AgentTreeNode; depth: number; lang: "bn" | "en" }) {
  const statusColor = STATUS_COLORS[node.agent.status] || STATUS_COLORS.idle;
  const statusText = STATUS_TEXT[node.agent.status] || STATUS_TEXT.idle;
  const icon = LEVEL_ICONS[node.agent.level] || "🤖";
  const lastRun = node.agent.last_run_at
    ? new Date(node.agent.last_run_at).toLocaleString(lang === "bn" ? "bn-BD" : "en-US")
    : (lang === "bn" ? "কখনো নয়" : "Never");

  return (
    <div className="ml-0">
      <div className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
        depth === 0 ? "bg-primary/5 border border-primary/20" :
        depth === 1 ? "bg-blue-50 border border-blue-100" :
        "bg-white border border-border"
      }`}>
        <span className="text-lg">{icon}</span>
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <span className="text-sm font-semibold text-text truncate">
            {lang === "bn" ? node.agent.name_bn : node.agent.name_en}
          </span>
          <span className="text-xs text-text-secondary hidden sm:inline">
            ({node.agent.agent_id})
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <div className={`w-2.5 h-2.5 rounded-full ${statusColor}`} title={statusText[lang]} />
          <span className="text-xs font-medium text-text-secondary hidden sm:inline">
            {statusText[lang]}
          </span>
          <span className="text-xs text-text-secondary/60 hidden md:inline">
            {lang === "bn" ? "শেষ:" : "Last:"} {lastRun}
          </span>
        </div>
      </div>
      {node.children.length > 0 && (
        <div className="ml-6 pl-4 border-l-2 border-border space-y-2 mt-2">
          {node.children.map((child) => (
            <TreeNode key={child.agent.agent_id} node={child} depth={depth + 1} lang={lang} />
          ))}
        </div>
      )}
    </div>
  );
}
