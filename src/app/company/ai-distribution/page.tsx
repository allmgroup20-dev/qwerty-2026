"use client";

import { useState, useEffect } from "react";
import { useLanguageStore } from "@/lib/store";
import { Skeleton } from "@/components/ui/Skeleton";

interface KnowledgeEntry {
  id: number;
  sourceType: string;
  sourceId: string;
  sourceName: string | null;
  targetType: string;
  targetId: string;
  targetName: string | null;
  knowledgeTitle: string;
  knowledgeContent: string;
  knowledgeCategory: string;
  origin: string;
  confidence: number;
  createdAt: string;
}

interface Summary {
  totalEntries: number;
  bySource: { sourceType: string; count: number }[];
  byTarget: { targetType: string; count: number }[];
  byCategory: { category: string; count: number }[];
}

const SOURCE_TYPES = ["book", "training", "agent", "system", "manual"];
const TARGET_TYPES = ["agent", "employee", "department", "all"];
const CATEGORIES = ["general", "psychology", "sales", "communication", "safety", "strategy"];

export default function AIDistributionPage() {
  const { lang } = useLanguageStore();
  const isBn = lang === "bn";
  const [entries, setEntries] = useState<KnowledgeEntry[]>([]);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"list" | "add" | "summary">("summary");
  const [form, setForm] = useState({
    sourceType: "book", sourceId: "", sourceName: "",
    targetType: "all", targetId: "all", targetName: "",
    knowledgeTitle: "", knowledgeContent: "", knowledgeCategory: "general",
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [entriesRes, summaryRes] = await Promise.all([
        fetch("/api/company/ai-distribution?limit=100"),
        fetch("/api/company/ai-distribution?view=summary"),
      ]);
      if (entriesRes.ok) {
        const data: any = await entriesRes.json();
        setEntries(data.entries || []);
      }
      if (summaryRes.ok) {
        const data: any = await summaryRes.json();
        setSummary(data.summary || null);
      }
    } catch {} finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/company/ai-distribution", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setForm({ sourceType: "book", sourceId: "", sourceName: "", targetType: "all", targetId: "all", targetName: "", knowledgeTitle: "", knowledgeContent: "", knowledgeCategory: "general" });
        fetchData();
        setTab("list");
      } else {
        const dataRes: any = await res.json();
        alert(dataRes.error || "Failed to add");
      }
    } catch {
      alert("Failed to add knowledge entry");
    }
  };

  const [expandedId, setExpandedId] = useState<number | null>(null);

  const renderSummary = () => {
    if (loading) return <Skeleton className="h-40 w-full rounded-xl" />;
    if (!summary) return <p className="text-text-secondary text-sm">{isBn ? "কোনো তথ্য নেই" : "No data"}</p>;

    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-primary/5 to-info/5 rounded-2xl border border-border p-6 text-center">
          <p className="text-3xl font-black text-primary">{summary.totalEntries}</p>
          <p className="text-sm text-text-secondary mt-1">{isBn ? "মোট জ্ঞান বিতরণ" : "Total Knowledge Distributions"}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl border border-border p-5">
            <h3 className="text-xs font-bold text-text mb-3">{isBn ? "উৎস অনুযায়ী" : "By Source"}</h3>
            {summary.bySource.map(s => (
              <div key={s.sourceType} className="flex justify-between items-center py-1.5 border-b border-border/40 last:border-0">
                <span className="text-sm capitalize text-text-secondary">{s.sourceType}</span>
                <span className="text-sm font-bold text-primary">{s.count}</span>
              </div>
            ))}
            {summary.bySource.length === 0 && <p className="text-xs text-text-secondary/60">{isBn ? "কোনো তথ্য নেই" : "No entries"}</p>}
          </div>

          <div className="bg-white rounded-2xl border border-border p-5">
            <h3 className="text-xs font-bold text-text mb-3">{isBn ? "লক্ষ্য অনুযায়ী" : "By Target"}</h3>
            {summary.byTarget.map(t => (
              <div key={t.targetType} className="flex justify-between items-center py-1.5 border-b border-border/40 last:border-0">
                <span className="text-sm capitalize text-text-secondary">{t.targetType}</span>
                <span className="text-sm font-bold text-primary">{t.count}</span>
              </div>
            ))}
            {summary.byTarget.length === 0 && <p className="text-xs text-text-secondary/60">{isBn ? "কোনো তথ্য নেই" : "No entries"}</p>}
          </div>

          <div className="bg-white rounded-2xl border border-border p-5">
            <h3 className="text-xs font-bold text-text mb-3">{isBn ? "বিভাগ অনুযায়ী" : "By Category"}</h3>
            {summary.byCategory.map(c => (
              <div key={c.category} className="flex justify-between items-center py-1.5 border-b border-border/40 last:border-0">
                <span className="text-sm capitalize text-text-secondary">{c.category}</span>
                <span className="text-sm font-bold text-primary">{c.count}</span>
              </div>
            ))}
            {summary.byCategory.length === 0 && <p className="text-xs text-text-secondary/60">{isBn ? "কোনো তথ্য নেই" : "No entries"}</p>}
          </div>
        </div>
      </div>
    );
  };

  const renderList = () => {
    if (loading) return <Skeleton className="h-60 w-full rounded-xl" />;

    return (
      <div className="space-y-3">
        {entries.length === 0 && (
          <div className="text-center py-12">
            <p className="text-3xl mb-2">📚</p>
            <p className="text-sm text-text-secondary">{isBn ? "কোনো জ্ঞান বিতরণ তথ্য নেই। নতুন জ্ঞান যোগ করুন।" : "No knowledge distribution entries yet. Add your first one."}</p>
          </div>
        )}
        {entries.map(entry => (
          <div key={entry.id} className="bg-white rounded-2xl border border-border overflow-hidden">
            <button
              onClick={() => setExpandedId(expandedId === entry.id ? null : entry.id)}
              className="w-full flex items-center justify-between p-4 hover:bg-primary/5 transition-colors text-left"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">{entry.sourceType}</span>
                  <span className="text-xs font-bold text-info bg-info/10 px-2 py-0.5 rounded-full">{entry.knowledgeCategory}</span>
                  <span className="text-xs text-text-secondary/60">{entry.createdAt?.split("T")[0] || entry.createdAt?.slice(0, 10)}</span>
                </div>
                <p className="text-sm font-bold text-text mt-1">{entry.knowledgeTitle}</p>
                <p className="text-xs text-text-secondary/70 line-clamp-1">{entry.sourceName || entry.sourceId} → {entry.targetName || entry.targetId}</p>
              </div>
              <span className="text-text-secondary/40 text-lg ml-2">{expandedId === entry.id ? "−" : "+"}</span>
            </button>
            {expandedId === entry.id && (
              <div className="px-4 pb-4 pt-0 border-t border-border/40 mt-0">
                <div className="mt-3 space-y-2">
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div><span className="text-text-secondary/60">{isBn ? "উৎস আইডি" : "Source ID"}:</span> <span className="font-medium">{entry.sourceId}</span></div>
                    <div><span className="text-text-secondary/60">{isBn ? "লক্ষ্য আইডি" : "Target ID"}:</span> <span className="font-medium">{entry.targetId}</span></div>
                    <div><span className="text-text-secondary/60">{isBn ? "উৎসের নাম" : "Source Name"}:</span> <span className="font-medium">{entry.sourceName || "—"}</span></div>
                    <div><span className="text-text-secondary/60">{isBn ? "লক্ষ্যের নাম" : "Target Name"}:</span> <span className="font-medium">{entry.targetName || "—"}</span></div>
                    <div><span className="text-text-secondary/60">{isBn ? "উৎপত্তি" : "Origin"}:</span> <span className="font-medium">{entry.origin}</span></div>
                    <div><span className="text-text-secondary/60">{isBn ? "আত্মবিশ্বাস" : "Confidence"}:</span> <span className="font-medium">{(entry.confidence * 100).toFixed(0)}%</span></div>
                  </div>
                  <div className="bg-primary/5 rounded-xl p-3 mt-2">
                    <p className="text-xs font-bold text-text mb-1">{isBn ? "জ্ঞানের বিষয়বস্তু" : "Knowledge Content"}:</p>
                    <p className="text-xs text-text-secondary leading-relaxed whitespace-pre-wrap">{entry.knowledgeContent}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderAddForm = () => (
    <form onSubmit={handleAdd} className="space-y-4 max-w-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold text-text mb-1.5 block">{isBn ? "উৎসের ধরন" : "Source Type"}</label>
          <select value={form.sourceType} onChange={e => setForm(f => ({ ...f, sourceType: e.target.value }))}
            className="w-full border border-border rounded-xl px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/30">
            {SOURCE_TYPES.map(st => <option key={st} value={st}>{st}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs font-bold text-text mb-1.5 block">{isBn ? "উৎস আইডি" : "Source ID"}</label>
          <input value={form.sourceId} onChange={e => setForm(f => ({ ...f, sourceId: e.target.value }))} required
            className="w-full border border-border rounded-xl px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/30"
            placeholder={isBn ? "যেমন: talking_with_psychopaths" : "e.g. talking_with_psychopaths"} />
        </div>
      </div>
      <div>
        <label className="text-xs font-bold text-text mb-1.5 block">{isBn ? "উৎসের নাম" : "Source Name"}</label>
        <input value={form.sourceName} onChange={e => setForm(f => ({ ...f, sourceName: e.target.value }))}
          className="w-full border border-border rounded-xl px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/30"
          placeholder={isBn ? "যেমন: টকিং উইথ সাইকোপ্যাথ এন্ড স্যাভেজেস" : "e.g. Talking with Psychopaths and Savages"} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold text-text mb-1.5 block">{isBn ? "লক্ষ্যের ধরন" : "Target Type"}</label>
          <select value={form.targetType} onChange={e => setForm(f => ({ ...f, targetType: e.target.value }))}
            className="w-full border border-border rounded-xl px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/30">
            {TARGET_TYPES.map(tt => <option key={tt} value={tt}>{tt}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs font-bold text-text mb-1.5 block">{isBn ? "লক্ষ্য আইডি" : "Target ID"}</label>
          <input value={form.targetId} onChange={e => setForm(f => ({ ...f, targetId: e.target.value }))} required
            className="w-full border border-border rounded-xl px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/30"
            placeholder={isBn ? "যেমন: all / vulnerability_detector" : "e.g. all / vulnerability_detector"} />
        </div>
      </div>
      <div>
        <label className="text-xs font-bold text-text mb-1.5 block">{isBn ? "লক্ষ্যের নাম" : "Target Name"}</label>
        <input value={form.targetName} onChange={e => setForm(f => ({ ...f, targetName: e.target.value }))}
          className="w-full border border-border rounded-xl px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/30"
          placeholder={isBn ? "যেমন: সকল AI এজেন্ট" : "e.g. All AI Agents"} />
      </div>
      <div>
        <label className="text-xs font-bold text-text mb-1.5 block">{isBn ? "জ্ঞানের শিরোনাম" : "Knowledge Title"} *</label>
        <input value={form.knowledgeTitle} onChange={e => setForm(f => ({ ...f, knowledgeTitle: e.target.value }))} required
          className="w-full border border-border rounded-xl px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/30"
          placeholder={isBn ? "যেমন: Vulnerability Mirroring Technique" : "e.g. Vulnerability Mirroring Technique"} />
      </div>
      <div>
        <label className="text-xs font-bold text-text mb-1.5 block">{isBn ? "জ্ঞানের বিষয়বস্তু" : "Knowledge Content"} *</label>
        <textarea value={form.knowledgeContent} onChange={e => setForm(f => ({ ...f, knowledgeContent: e.target.value }))} required rows={4}
          className="w-full border border-border rounded-xl px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 resize-y"
          placeholder={isBn ? "বই থেকে নেওয়া জ্ঞান বিস্তারিত লিখুন..." : "Enter the detailed knowledge from this source..."} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold text-text mb-1.5 block">{isBn ? "বিভাগ" : "Category"}</label>
          <select value={form.knowledgeCategory} onChange={e => setForm(f => ({ ...f, knowledgeCategory: e.target.value }))}
            className="w-full border border-border rounded-xl px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/30">
            {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>
      </div>
      <button type="submit"
        className="bg-primary text-white text-sm font-bold px-6 py-3 rounded-xl hover:bg-primary/90 transition-colors w-full md:w-auto">
        {isBn ? "✅ জ্ঞান বিতরণ যোগ করুন" : "✅ Add Knowledge Distribution"}
      </button>
    </form>
  );

  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-black text-text">{isBn ? "🧠 AI জ্ঞান বিতরণ" : "🧠 AI Knowledge Distribution"}</h1>
          <p className="text-xs text-text-secondary/70 mt-1">
            {isBn ? "ট্র্যাক করুন কোন AI এজেন্ট/কর্মচারীর কি জ্ঞান আছে এবং তা কোথা থেকে এসেছে" : "Track which AI agents/employees have what knowledge and where it came from"}
          </p>
        </div>
      </div>

      <div className="flex gap-2 mb-6 border-b border-border pb-3 overflow-x-auto">
        {(["summary", "list", "add"] as const).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-colors ${tab === t ? "bg-primary text-white" : "bg-primary/5 text-text-secondary hover:bg-primary/10"}`}>
            {t === "summary" ? (isBn ? "সারসংক্ষেপ" : "Summary") : t === "list" ? (isBn ? "তালিকা" : "List") : (isBn ? "যোগ করুন" : "Add")}
          </button>
        ))}
      </div>

      {tab === "summary" && renderSummary()}
      {tab === "list" && renderList()}
      {tab === "add" && renderAddForm()}
    </div>
  );
}
