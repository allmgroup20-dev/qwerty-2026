"use client"

import { useState, useEffect } from "react"
import { useLanguageStore } from "@/lib/store"
import { Skeleton } from "@/components/ui/Skeleton"

interface HistoryEntry {
  id: number; factorName: string; oldScore: number | null; newScore: number; action: string; createdAt: string
}

export default function CanvasHistoryPage() {
  const { lang } = useLanguageStore()
  const isBn = lang === "bn"
  const [history, setHistory] = useState<HistoryEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>("all")

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/strategy/canvas-history")
        if (res.ok) {
          const json = await res.json() as { history: HistoryEntry[] }
          setHistory(json.history ?? [])
        }
      } catch {} finally { setLoading(false) }
    })()
  }, [])

  if (loading) return <div className="p-4 sm:p-6 max-w-6xl mx-auto space-y-4"><Skeleton className="h-8 w-80" /><Skeleton className="h-64 rounded-2xl" /></div>

  const factorNames = [...new Set(history.map((h) => h.factorName))]
  const filtered = filter === "all" ? history : history.filter((h) => h.factorName === filter)

  const grouped: Record<string, HistoryEntry[]> = {}
  for (const entry of filtered) {
    const date = entry.createdAt?.split(" ")[0] ?? "unknown"
    if (!grouped[date]) grouped[date] = []
    grouped[date].push(entry)
  }

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-black text-text">{isBn ? "ক্যানভাস ইতিহাস" : "Canvas History"}</h1>
          <p className="text-xs text-text-secondary/70 mt-1">{isBn ? "স্ট্র্যাটেজি ক্যানভাসে স্কোর পরিবর্তনের টাইমলাইন" : "Timeline of Strategy Canvas score changes"}</p>
        </div>
        <select className="text-xs border border-border rounded-lg px-3 py-2 outline-none" value={filter}
          onChange={(e) => setFilter(e.target.value)}>
          <option value="all">{isBn ? "সব ফ্যাক্টর" : "All Factors"}</option>
          {factorNames.map((n) => <option key={n} value={n}>{n}</option>)}
        </select>
      </div>

      {Object.keys(grouped).length === 0 && (
        <div className="bg-white rounded-2xl border border-border p-8 text-center">
          <p className="text-sm text-text-secondary/60">{isBn ? "এখনো কোনো পরিবর্তন রেকর্ড করা হয়নি" : "No changes recorded yet"}</p>
        </div>
      )}

      <div className="space-y-4">
        {Object.entries(grouped).sort(([a], [b]) => b.localeCompare(a)).map(([date, entries]) => (
          <div key={date}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-bold text-text-secondary/70 bg-primary/5 px-2 py-0.5 rounded-full">{date}</span>
              <div className="flex-1 h-px bg-border" />
              <span className="text-[9px] text-text-secondary/50">{entries.length} {isBn ? "টি পরিবর্তন" : "changes"}</span>
            </div>
            <div className="space-y-1.5">
              {entries.map((e) => {
                const diff = e.oldScore != null ? e.newScore - e.oldScore : 0
                return (
                  <div key={e.id} className="bg-white rounded-xl border border-border p-3 flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs">
                      <span className="text-text font-medium">{e.factorName}</span>
                      {e.oldScore != null && (
                        <span className="text-text-secondary/60">{e.oldScore}</span>
                      )}
                      <span className="text-text-secondary/40">→</span>
                      <span className="font-bold text-primary">{e.newScore}</span>
                      {diff !== 0 && (
                        <span className={`text-[10px] font-bold ${diff > 0 ? "text-success" : "text-error"}`}>
                          {diff > 0 ? "↑" : "↓"} {Math.abs(diff)}
                        </span>
                      )}
                    </div>
                    <span className="text-[9px] text-text-secondary/40">{e.createdAt?.split(" ")[1] ?? ""}</span>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
