"use client"

import { useState, useEffect, useCallback } from "react"
import { useLanguageStore } from "@/lib/store"
import { Skeleton } from "@/components/ui/Skeleton"
import { StrategyCanvasChart, type CanvasFactor } from "@/components/strategy/StrategyCanvasChart"

interface Scenario {
  id: number; name: string; description: string; canvas_scores: string; created_at: string
}

export default function ScenariosPage() {
  const { lang } = useLanguageStore()
  const isBn = lang === "bn"
  const [scenarios, setScenarios] = useState<Scenario[]>([])
  const [baseFactors, setBaseFactors] = useState<CanvasFactor[]>([])
  const [loading, setLoading] = useState(true)
  const [activeScenario, setActiveScenario] = useState<Scenario | null>(null)
  const [editScores, setEditScores] = useState<Record<number, number>>({})
  const [newName, setNewName] = useState("")
  const [newDesc, setNewDesc] = useState("")

  const fetchData = useCallback(async () => {
    try {
      const [scRes, caRes] = await Promise.all([
        fetch("/api/strategy/scenarios"),
        fetch("/api/strategy/canvas"),
      ])
      if (scRes.ok) {
        const json = await scRes.json() as { scenarios: Scenario[] }
        setScenarios(json.scenarios ?? [])
      }
      if (caRes.ok) {
        const json = await caRes.json() as { factors: CanvasFactor[] }
        setBaseFactors(json.factors ?? [])
      }
    } catch {} finally { setLoading(false) }
  }, [])

  useEffect(() => { fetchData() }, [fetchData])

  const createScenario = async () => {
    if (!newName.trim()) return
    const scores: Record<string, number> = {}
    for (const f of baseFactors) scores[f.id] = f.ourScore
    const res = await fetch("/api/strategy/scenarios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName, description: newDesc, canvasScores: JSON.stringify(scores) }),
    })
    if (res.ok) {
      setNewName(""); setNewDesc("")
      fetchData()
    }
  }

  const deleteScenario = async (id: number) => {
    await fetch(`/api/strategy/scenarios?id=${id}`, { method: "DELETE" })
    if (activeScenario?.id === id) setActiveScenario(null)
    fetchData()
  }

  const loadScenario = (sc: Scenario) => {
    setActiveScenario(sc)
    try { setEditScores(JSON.parse(sc.canvas_scores)) } catch { setEditScores({}) }
  }

  const updateScore = (factorId: number, val: number) => {
    setEditScores((prev) => ({ ...prev, [factorId]: val }))
  }

  const saveScores = async () => {
    if (!activeScenario) return
    await fetch("/api/strategy/scenarios", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: activeScenario.id, canvasScores: JSON.stringify(editScores) }),
    })
    fetchData()
  }

  const scenarioFactors: CanvasFactor[] = baseFactors.map((f) => ({
    ...f,
    ourScore: editScores[f.id] ?? f.ourScore,
  }))

  if (loading) return <div className="p-4 sm:p-6 max-w-6xl mx-auto space-y-4"><Skeleton className="h-8 w-80" /><Skeleton className="h-64 rounded-2xl" /></div>

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl font-black text-text">{isBn ? "কৌশল দৃশ্যকল্প পরিকল্পক" : "Strategy Scenario Planner"}</h1>
        <p className="text-xs text-text-secondary/70 mt-1">{isBn ? "বিভিন্ন 'what-if' দৃশ্যকল্প তৈরি করুন এবং ক্যানভাসে প্রভাব দেখুন" : "Create 'what-if' scenarios and visualize the impact on your Strategy Canvas"}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="lg:col-span-1 space-y-3">
          <div className="bg-white rounded-xl border border-border p-4">
            <h2 className="text-xs font-bold text-text mb-3">{isBn ? "নতুন দৃশ্যকল্প" : "New Scenario"}</h2>
            <input className="text-xs border border-border rounded-lg px-3 py-2 w-full mb-2" placeholder={isBn ? "নাম" : "Name"}
              value={newName} onChange={(e) => setNewName(e.target.value)} />
            <input className="text-xs border border-border rounded-lg px-3 py-2 w-full mb-2" placeholder={isBn ? "বিবরণ" : "Description"}
              value={newDesc} onChange={(e) => setNewDesc(e.target.value)} />
            <button onClick={createScenario}
              className="w-full px-3 py-2 bg-primary text-white text-[11px] font-bold rounded-xl hover:opacity-80 transition">
              + {isBn ? "তৈরি করুন" : "Create"}
            </button>
          </div>

          <div className="bg-white rounded-xl border border-border p-4">
            <h2 className="text-xs font-bold text-text mb-3">{isBn ? "সংরক্ষিত দৃশ্যকল্প" : "Saved Scenarios"}</h2>
            {scenarios.length === 0 && <p className="text-[11px] text-text-secondary/60">{isBn ? "কোনো দৃশ্যকল্প নেই" : "No scenarios yet"}</p>}
            <div className="space-y-1.5">
              {scenarios.map((sc) => (
                <div key={sc.id} className={`p-2 rounded-lg cursor-pointer text-xs flex items-center justify-between transition ${
                  activeScenario?.id === sc.id ? "bg-primary/10 text-primary" : "bg-primary/5 text-text-secondary hover:bg-primary/10"
                }`} onClick={() => loadScenario(sc)}>
                  <span className="font-medium truncate">{sc.name}</span>
                  <button onClick={(e) => { e.stopPropagation(); deleteScenario(sc.id) }}
                    className="text-error/60 hover:text-error text-[10px]">✕</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          {activeScenario && (
            <div className="bg-white rounded-2xl border border-border p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h2 className="text-sm font-bold text-text">{activeScenario.name}</h2>
                  {activeScenario.description && <p className="text-[10px] text-text-secondary/70">{activeScenario.description}</p>}
                </div>
                <button onClick={saveScores}
                  className="px-3 py-1.5 bg-success/10 text-success text-[10px] font-bold rounded-lg hover:opacity-80 transition">
                  {isBn ? "সংরক্ষণ" : "Save"}
                </button>
              </div>

              <StrategyCanvasChart factors={scenarioFactors} height={260} />

              <div className="space-y-1.5 mt-3">
                {baseFactors.map((f) => (
                  <div key={f.id} className="flex items-center gap-2 text-xs">
                    <span className="w-28 text-text-secondary truncate">{f.factorName}</span>
                    <span className="text-text-secondary/60">{isBn ? "বেস" : "Base"}: {f.ourScore}</span>
                    <input type="range" min={1} max={10} value={editScores[f.id] ?? f.ourScore}
                      onChange={(e) => updateScore(f.id, +e.target.value)}
                      className="flex-1 h-1 accent-primary" />
                    <span className="w-6 text-right font-bold text-primary">{editScores[f.id] ?? f.ourScore}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!activeScenario && (
            <div className="bg-white rounded-2xl border border-border p-8 text-center">
              <p className="text-sm text-text-secondary/60">{isBn ? "বামে একটি দৃশ্যকল্প নির্বাচন বা তৈরি করুন" : "Select or create a scenario from the left panel"}</p>
              <StrategyCanvasChart factors={baseFactors} height={260} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
