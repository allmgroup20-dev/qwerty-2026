"use client"

import { useState, useEffect } from "react"
import { useLanguageStore } from "@/lib/store"
import { Skeleton } from "@/components/ui/Skeleton"

interface Step {
  id: number; key: string; nameEn: string; nameBn: string; emoji: string; descEn: string; descBn: string; checklist: string[]; successCriteria: string
}

export default function StrategicSequencingPage() {
  const { lang } = useLanguageStore()
  const isBn = lang === "bn"
  const [steps, setSteps] = useState<Step[]>([])
  const [loading, setLoading] = useState(true)
  const [completed, setCompleted] = useState<Record<number, boolean>>({})

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/strategy/strategic-sequencing")
        if (res.ok) {
          const json = await res.json() as { steps: Step[] }
          setSteps(json.steps ?? [])
        }
      } catch {} finally {
        setLoading(false)
      }
    })()
  }, [])

  if (loading) return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto space-y-4">
      <Skeleton className="h-8 w-80" />
      <Skeleton className="h-64 rounded-2xl" />
      <Skeleton className="h-48 rounded-2xl" />
    </div>
  )

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl font-black text-text">{isBn ? "কৌশলগত অনুক্রম" : "Strategic Sequencing"}</h1>
        <p className="text-xs text-text-secondary/70 mt-1">
          {isBn ? "ক্রমানুসারে আপনার ব্লু ওশান বৈধতা নিশ্চিত করুন — প্রতিটি ধাপ নিশ্চিত হলেই পরবর্তী ধাপে যান" : "Validate Your Blue Ocean in Sequence — Only Proceed When Each Step Is Confirmed"}
        </p>
      </div>

      <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl border border-border p-5 mb-6">
        <div className="flex items-center gap-4 mb-2">
          {steps.map((s) => (
            <div key={s.id} className="flex-1 text-center">
              <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center text-lg border-2 transition ${
                completed[s.id] ? "bg-success/10 border-success" : "bg-white border-border"
              }`}>{s.emoji}</div>
              <p className="text-[9px] text-text-secondary/70 mt-1">{isBn ? s.nameBn : s.nameEn}</p>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-1 mt-1">
          {steps.map((s, i) => (
            <div key={s.id} className="flex-1 flex items-center">
              <div className={`h-1 flex-1 rounded-full ${completed[s.id] ? "bg-success" : "bg-border"}`} />
              {i < steps.length - 1 && <div className={`h-1 flex-1 rounded-full ${completed[s.id + 1] ? "bg-success" : "bg-border"}`} />}
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3 mb-6">
        {steps.map((s, i) => {
          const prevDone = i === 0 || completed[steps[i - 1].id]
          return (
            <div key={s.id} className={`bg-white rounded-xl border p-4 transition ${prevDone ? "border-border" : "border-border/40 opacity-50"}`}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">{s.emoji}</span>
                <h3 className="text-sm font-bold text-text">{isBn ? s.nameBn : s.nameEn}</h3>
                {completed[s.id] && <span className="text-[10px] px-1.5 py-0.5 bg-success/10 text-success rounded-full">{isBn ? "সম্পন্ন" : "Done"}</span>}
              </div>
              <p className="text-xs text-text-secondary/80 mb-3">{isBn ? s.descBn : s.descEn}</p>
              <div className="space-y-1.5 mb-3">
                {s.checklist.map((c) => (
                  <label key={c} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={!!completed[`${s.id}_${c}` as any]}
                      onChange={() => setCompleted((prev) => ({ ...prev, [`${s.id}_${c}` as any]: !prev[`${s.id}_${c}` as any] }))}
                      disabled={!prevDone}
                      className="w-3.5 h-3.5 rounded border-border text-primary" />
                    <span className={`text-[11px] ${completed[`${s.id}_${c}` as any] ? "text-text-secondary/50 line-through" : "text-text-secondary/90"}`}>{c}</span>
                  </label>
                ))}
              </div>
              <div className="p-2.5 bg-primary/5 rounded-lg">
                <p className="text-[10px] font-bold text-text-secondary/70 uppercase tracking-wider mb-0.5">
                  {isBn ? "সাফল্যের মানদণ্ড" : "Success Criteria"}
                </p>
                <p className="text-[11px] text-text-secondary/80">{s.successCriteria}</p>
              </div>
              {!prevDone && (
                <div className="mt-2 p-2 bg-warning/5 rounded-lg">
                  <p className="text-[10px] text-warning font-bold">⚠ {isBn ? `প্রথমে "${isBn ? steps[i - 1].nameBn : steps[i - 1].nameEn}" সম্পন্ন করুন` : `Complete "${steps[i - 1].nameEn}" first`}</p>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
