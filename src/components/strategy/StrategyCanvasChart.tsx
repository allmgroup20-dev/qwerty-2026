"use client"

import { useLanguageStore } from "@/lib/store"

export interface CanvasFactor {
  id: number
  factorName: string
  factorNameBn: string | null
  ourScore: number
  competitorScore: number | null
  competitorName: string | null
  category: string | null
  sortOrder: number
}

interface Props {
  factors: CanvasFactor[]
  competitorLabel?: string
  ourLabel?: string
  height?: number
}

export function StrategyCanvasChart({ factors, competitorLabel, ourLabel, height = 320 }: Props) {
  const { lang } = useLanguageStore()
  const isBn = lang === "bn"
  const sorted = [...factors].sort((a, b) => a.sortOrder - b.sortOrder)
  if (sorted.length === 0) return null

  const W = 800
  const H = height
  const pad = { top: 30, right: 30, bottom: 80, left: 40 }
  const cw = W - pad.left - pad.right
  const ch = H - pad.top - pad.bottom
  const xStep = cw / (sorted.length - 1 || 1)

  const scaleY = (v: number) => pad.top + ch - (v / 10) * ch

  const pathOur = sorted.map((f, i) => `${i === 0 ? "M" : "L"}${pad.left + i * xStep},${scaleY(f.ourScore)}`).join(" ")
  const pathComp = sorted.map((f, i) => `${i === 0 ? "M" : "L"}${pad.left + i * xStep},${scaleY(f.competitorScore ?? 0)}`).join(" ")

  const catColors: Record<string, string> = { core: "#6366f1", create: "#10b981", reduce: "#f59e0b", eliminate: "#ef4444" }

  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full min-w-[600px]" style={{ maxHeight: height }}>
        <defs>
          <linearGradient id="ourGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0.01" />
          </linearGradient>
          <linearGradient id="compGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.01" />
          </linearGradient>
        </defs>

        <rect x={pad.left} y={pad.top} width={cw} height={ch} fill="#f8fafc" rx={8} />

        {[2, 4, 6, 8].map((v) => (
          <g key={v}>
            <line x1={pad.left} y1={scaleY(v)} x2={pad.left + cw} y2={scaleY(v)} stroke="#e2e8f0" strokeWidth={1} />
            <text x={pad.left - 8} y={scaleY(v) + 4} textAnchor="end" className="text-[10px]" fill="#94a3b8">{v}</text>
          </g>
        ))}

        <path d={pathOur} fill="none" stroke="#6366f1" strokeWidth={2.5} strokeLinejoin="round" />
        <path d={pathOur} fill="url(#ourGrad)" stroke="none" />

        <path d={pathComp} fill="none" stroke="#f43f5e" strokeWidth={2.5} strokeLinejoin="round" strokeDasharray="6 3" />
        <path d={pathComp} fill="url(#compGrad)" stroke="none" />

        {sorted.map((f, i) => {
          const cx = pad.left + i * xStep
          const cy = scaleY(f.ourScore)
          return (
            <g key={f.id}>
              <circle cx={cx} cy={cy} r={4} fill="#6366f1" stroke="white" strokeWidth={2} />
              <text x={cx} y={pad.top + ch + 14} textAnchor="end" transform={`rotate(-35, ${cx}, ${pad.top + ch + 14})`}
                className="text-[9px]" fill="#64748b">
                {isBn && f.factorNameBn ? f.factorNameBn : f.factorName}
              </text>
            </g>
          )
        })}

        <text x={pad.left + 8} y={pad.top + 14} className="text-[11px] font-bold" fill="#6366f1">
          {ourLabel ?? (isBn ? "আমাদের মান" : "Our Value Curve")}
        </text>
        <text x={pad.left + 8} y={pad.top + 28} className="text-[11px] font-bold" fill="#f43f5e">
          {competitorLabel ?? (isBn ? "প্রতিযোগী" : "Competitor")}
        </text>

        {sorted.map((f, i) => {
          if (f.competitorScore == null) return null
          const cx = pad.left + i * xStep
          const cy = scaleY(f.competitorScore)
          return (
            <circle key={`comp-${f.id}`} cx={cx} cy={cy} r={4} fill="#f43f5e" stroke="white" strokeWidth={2} />
          )
        })}
      </svg>

      <div className="flex flex-wrap gap-2 mt-3">
        {Object.entries(catColors).map(([k, c]) => (
          <span key={k} className="inline-flex items-center gap-1 text-[10px] text-text-secondary">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c }} />
            {isBn
              ? { core: "মূল", create: "সৃষ্টি", reduce: "হ্রাস", eliminate: "বাদ" }[k] ?? k
              : { core: "Core", create: "Create", reduce: "Reduce", eliminate: "Eliminate" }[k] ?? k}
          </span>
        ))}
      </div>
    </div>
  )
}
