"use client"

import { useState, useEffect, useCallback } from "react"
import { useLanguageStore } from "@/lib/store"
import { Skeleton } from "@/components/ui/Skeleton"
import { StrategyCanvasChart, type CanvasFactor } from "@/components/strategy/StrategyCanvasChart"

interface HistoryEntry {
  id: number; factorName: string; oldScore: number | null; newScore: number; createdAt: string
}

export default function StrategyCanvasPage() {
  const { lang } = useLanguageStore()
  const isBn = lang === "bn"
  const [factors, setFactors] = useState<CanvasFactor[]>([])
  const [history, setHistory] = useState<HistoryEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<CanvasFactor | null>(null)
  const [showAdd, setShowAdd] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [form, setForm] = useState({ factorName: "", factorNameBn: "", ourScore: 5, competitorScore: 5, competitorName: "Competitor", category: "core", sortOrder: 0 })

  const fetchFactors = useCallback(async () => {
    try {
      const [caRes, hiRes] = await Promise.all([
        fetch("/api/strategy/canvas"),
        fetch("/api/strategy/canvas-history"),
      ])
      if (caRes.ok) {
        const json = await caRes.json() as { factors: CanvasFactor[] }
        setFactors(json.factors ?? [])
      }
      if (hiRes.ok) {
        const json = await hiRes.json() as { history: HistoryEntry[] }
        setHistory(json.history ?? [])
      }
    } catch {} finally { setLoading(false) }
  }, [])

  useEffect(() => { fetchFactors() }, [fetchFactors])

  const saveFactor = async (f: CanvasFactor) => {
    await fetch("/api/strategy/canvas", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(f),
    })
    setEditing(null)
    fetchFactors()
  }

  const addFactor = async () => {
    await fetch("/api/strategy/canvas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
    setShowAdd(false)
    setForm({ factorName: "", factorNameBn: "", ourScore: 5, competitorScore: 5, competitorName: "Competitor", category: "core", sortOrder: 0 })
    fetchFactors()
  }

  const deleteFactor = async (id: number) => {
    await fetch(`/api/strategy/canvas?id=${id}`, { method: "DELETE" })
    fetchFactors()
  }

  const getTrend = (name: string): { diff: number; direction: "up" | "down" | "same" } | null => {
    const entry = history.find((h) => h.factorName === name)
    if (!entry || entry.oldScore == null) return null
    const diff = entry.newScore - entry.oldScore
    return { diff: Math.abs(diff), direction: diff > 0 ? "up" : diff < 0 ? "down" : "same" }
  }

  if (loading) return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto space-y-4">
      <Skeleton className="h-8 w-80" />
      <Skeleton className="h-72 rounded-2xl" />
      <Skeleton className="h-40 rounded-2xl" />
    </div>
  )

  const recentHistory = history.slice(0, 5)

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-black text-text">{isBn ? "স্ট্র্যাটেজি ক্যানভাস" : "Strategy Canvas"}</h1>
          <p className="text-xs text-text-secondary/70 mt-1">
            {isBn ? "মূল্য বক্ররেখা — আপনার ব্লু ওশান কৌশল ম্যাপ করুন" : "Value Curve — Map Your Blue Ocean Strategy"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setShowHistory(!showHistory)}
            className="px-3 py-2 border border-border text-text-secondary text-[10px] font-bold rounded-xl hover:bg-primary/5 transition">
            {isBn ? "ইতিহাস" : "History"} ({history.length})
          </button>
          <button onClick={() => setShowAdd(true)}
            className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl hover:opacity-80 transition">
            + {isBn ? "ফ্যাক্টর যোগ করুন" : "Add Factor"}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-border p-5 mb-6">
        <StrategyCanvasChart factors={factors} />
      </div>

      {showHistory && (
        <div className="bg-white rounded-2xl border border-border p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xs font-bold text-text">{isBn ? "সাম্প্রতিক পরিবর্তন" : "Recent Changes"}</h2>
            <a href="/company/canvas-history" className="text-[10px] text-primary hover:underline">{isBn ? "সব দেখুন" : "View all"}</a>
          </div>
          <div className="space-y-1">
            {recentHistory.map((e) => {
              const diff = e.oldScore != null ? e.newScore - e.oldScore : 0
              return (
                <div key={e.id} className="flex items-center gap-2 text-[11px] text-text-secondary/80">
                  <span className="font-medium text-text">{e.factorName}</span>
                  {e.oldScore != null && <span className="text-text-secondary/50">{e.oldScore}</span>}
                  <span className="text-text-secondary/30">→</span>
                  <span className="font-bold text-primary">{e.newScore}</span>
                  {diff !== 0 && <span className={diff > 0 ? "text-success" : "text-error"}>{diff > 0 ? "↑" : "↓"} {Math.abs(diff)}</span>}
                  <span className="text-[9px] text-text-secondary/40 ml-auto">{e.createdAt?.split(" ")[1] ?? ""}</span>
                </div>
              )
            })}
          </div>
        </div>
      )}

      <div className="space-y-2">
        <h2 className="text-sm font-bold text-text mb-3">{isBn ? "ফ্যাক্টর ব্যবস্থাপনা" : "Factor Management"}</h2>
        {factors.map((f) => {
          const trend = getTrend(f.factorName)
          return (
            <div key={f.id} className="bg-white rounded-xl border border-border p-3 flex items-center justify-between">
              {editing?.id === f.id ? (
                <div className="flex flex-wrap items-center gap-2 w-full">
                  <input className="text-xs border border-border rounded-lg px-2 py-1.5 w-32" value={editing.factorName}
                    onChange={(e) => setEditing({ ...editing, factorName: e.target.value })} />
                  <input className="text-xs border border-border rounded-lg px-2 py-1.5 w-32" value={editing.factorNameBn ?? ""}
                    onChange={(e) => setEditing({ ...editing, factorNameBn: e.target.value })} />
                  <input className="text-xs border border-border rounded-lg px-2 py-1.5 w-14" type="number" min={1} max={10}
                    value={editing.ourScore} onChange={(e) => setEditing({ ...editing, ourScore: +e.target.value })} />
                  <input className="text-xs border border-border rounded-lg px-2 py-1.5 w-14" type="number" min={1} max={10}
                    value={editing.competitorScore ?? 0} onChange={(e) => setEditing({ ...editing, competitorScore: +e.target.value })} />
                  <button onClick={() => saveFactor(editing)}
                    className="px-3 py-1.5 bg-success/10 text-success text-[10px] font-bold rounded-lg">{isBn ? "সংরক্ষণ" : "Save"}</button>
                  <button onClick={() => setEditing(null)}
                    className="px-3 py-1.5 bg-border/30 text-text-secondary text-[10px] font-bold rounded-lg">{isBn ? "বাতিল" : "Cancel"}</button>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="w-2 h-2 rounded-full" style={{
                      backgroundColor: { core: "#6366f1", create: "#10b981", reduce: "#f59e0b", eliminate: "#ef4444" }[f.category ?? "core"] ?? "#6366f1"
                    }} />
                    <span className="text-text font-medium">{f.factorName}</span>
                    {f.factorNameBn && <span className="text-text-secondary">({f.factorNameBn})</span>}
                    <span className="text-text-secondary">|</span>
                    <span className="text-text">{isBn ? "আমরা" : "Us"}: <strong>{f.ourScore}</strong>
                      {trend && trend.direction !== "same" && (
                        <span className={`ml-1 text-[10px] ${trend.direction === "up" ? "text-success" : "text-error"}`}>
                          {trend.direction === "up" ? "↑" : "↓"}{trend.diff}
                        </span>
                      )}
                    </span>
                    <span className="text-text-secondary">/10</span>
                    {f.competitorScore != null && (
                      <><span className="text-text-secondary">|</span>
                        <span className="text-text">{f.competitorName ?? "Competitor"}: <strong>{f.competitorScore}</strong></span>
                        <span className="text-text-secondary">/10</span></>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => setEditing(f)}
                      className="px-2.5 py-1.5 bg-primary/5 text-primary text-[10px] font-bold rounded-lg">{isBn ? "সম্পাদনা" : "Edit"}</button>
                    <button onClick={() => deleteFactor(f.id)}
                      className="px-2.5 py-1.5 bg-error/5 text-error text-[10px] font-bold rounded-lg">{isBn ? "মুছুন" : "Delete"}</button>
                  </div>
                </>
              )}
            </div>
          )
        })}
      </div>

      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30" onClick={() => setShowAdd(false)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-sm font-bold text-text mb-4">{isBn ? "নতুন ফ্যাক্টর" : "New Factor"}</h3>
            <div className="space-y-3">
              <input className="text-xs border border-border rounded-lg px-3 py-2 w-full" placeholder={isBn ? "ফ্যাক্টর নাম" : "Factor Name"}
                value={form.factorName} onChange={(e) => setForm({ ...form, factorName: e.target.value })} />
              <input className="text-xs border border-border rounded-lg px-3 py-2 w-full" placeholder={isBn ? "বাংলা নাম" : "Bangla Name"}
                value={form.factorNameBn} onChange={(e) => setForm({ ...form, factorNameBn: e.target.value })} />
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] text-text-secondary block mb-1">{isBn ? "আমাদের স্কোর" : "Our Score"}</label>
                  <input className="text-xs border border-border rounded-lg px-3 py-2 w-full" type="number" min={1} max={10}
                    value={form.ourScore} onChange={(e) => setForm({ ...form, ourScore: +e.target.value })} />
                </div>
                <div>
                  <label className="text-[10px] text-text-secondary block mb-1">{isBn ? "প্রতিযোগী স্কোর" : "Competitor Score"}</label>
                  <input className="text-xs border border-border rounded-lg px-3 py-2 w-full" type="number" min={1} max={10}
                    value={form.competitorScore} onChange={(e) => setForm({ ...form, competitorScore: +e.target.value })} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] text-text-secondary block mb-1">{isBn ? "প্রতিযোগী নাম" : "Competitor Name"}</label>
                  <input className="text-xs border border-border rounded-lg px-3 py-2 w-full" value={form.competitorName}
                    onChange={(e) => setForm({ ...form, competitorName: e.target.value })} />
                </div>
                <div>
                  <label className="text-[10px] text-text-secondary block mb-1">{isBn ? "ক্যাটাগরি" : "Category"}</label>
                  <select className="text-xs border border-border rounded-lg px-3 py-2 w-full" value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}>
                    <option value="core">Core</option>
                    <option value="create">Create</option>
                    <option value="reduce">Reduce</option>
                    <option value="eliminate">Eliminate</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <button onClick={addFactor}
                  className="flex-1 px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl">{isBn ? "যোগ করুন" : "Add"}</button>
                <button onClick={() => setShowAdd(false)}
                  className="px-4 py-2 bg-border/30 text-text-secondary text-xs font-bold rounded-xl">{isBn ? "বাতিল" : "Cancel"}</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
