"use client"

import { useState } from "react"
import { useLanguageStore } from "@/lib/store"
import { Skeleton } from "@/components/ui/Skeleton"

interface Section {
  title: string; lines: string[]
}

export default function StrategyReportPage() {
  const { lang } = useLanguageStore()
  const isBn = lang === "bn"
  const [report, setReport] = useState<{ generatedAt: string; sections: Section[]; settings: Record<string, string> } | null>(null)
  const [loading, setLoading] = useState(false)

  const generate = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/strategy/report")
      if (res.ok) setReport(await res.json() as any)
    } catch {} finally { setLoading(false) }
  }

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-black text-text">{isBn ? "কৌশল রিপোর্ট" : "Strategy Report"}</h1>
          <p className="text-xs text-text-secondary/70 mt-1">{isBn ? "সব কৌশল ফ্রেমওয়ার্কের সমন্বিত রিপোর্ট" : "Consolidated Report of All Strategy Frameworks"}</p>
        </div>
        <button onClick={generate} disabled={loading}
          className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl hover:opacity-80 transition disabled:opacity-50">
          {loading ? "..." : isBn ? "রিপোর্ট জেনারেট করুন" : "Generate Report"}
        </button>
      </div>

      {report && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-border p-4">
            <p className="text-[10px] text-text-secondary/70">{isBn ? "জেনারেটেড" : "Generated"}: {new Date(report.generatedAt).toLocaleString()}</p>
          </div>
          {report.sections.map((s, i) => (
            <div key={i} className="bg-white rounded-xl border border-border p-4">
              <h3 className="text-sm font-bold text-text mb-2">{s.title}</h3>
              <div className="space-y-1">
                {s.lines.map((line, j) => (
                  <p key={j} className="text-[11px] text-text-secondary/80 pl-2 border-l-2 border-primary/30">{line}</p>
                ))}
              </div>
            </div>
          ))}
          <div className="bg-white rounded-xl border border-border p-4">
            <h3 className="text-sm font-bold text-text mb-2">{isBn ? "সেটিংস" : "Settings"}</h3>
            <div className="grid grid-cols-2 gap-1">
              {Object.entries(report.settings).map(([k, v]) => (
                <p key={k} className="text-[10px] text-text-secondary/80"><span className="font-medium">{k}:</span> {v}</p>
              ))}
            </div>
          </div>
        </div>
      )}

      {!report && !loading && (
        <div className="bg-white rounded-2xl border border-border p-8 text-center">
          <p className="text-sm text-text-secondary/60">{isBn ? "রিপোর্ট জেনারেট করতে বাটনে ক্লিক করুন" : "Click 'Generate Report' to create a consolidated strategy report"}</p>
        </div>
      )}
    </div>
  )
}
