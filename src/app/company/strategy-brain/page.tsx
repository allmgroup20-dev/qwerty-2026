"use client"

import { useState, useEffect } from "react"
import { useLanguageStore } from "@/lib/store"
import { Skeleton } from "@/components/ui/Skeleton"

export default function StrategyBrainPage() {
  const { lang } = useLanguageStore()
  const isBn = lang === "bn"
  const [config, setConfig] = useState<{
    enabled: boolean; injectCanvas: boolean; injectERRC: boolean; injectKnowledge: boolean
    strategy: { canvasCount: number; errcCount: number; knowledgeCount: number; summary: string }
  } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/strategy/brain-config")
        if (res.ok) setConfig(await res.json() as any)
      } catch {} finally { setLoading(false) }
    })()
  }, [])

  const toggle = async (key: string, val: boolean) => {
    await fetch("/api/strategy/brain-config", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [key]: val }),
    })
    const res = await fetch("/api/strategy/brain-config")
    if (res.ok) setConfig(await res.json() as any)
  }

  if (loading) return <div className="p-4 sm:p-6 max-w-6xl mx-auto space-y-4"><Skeleton className="h-8 w-80" /><Skeleton className="h-48 rounded-2xl" /></div>
  if (!config) return <div className="p-6 text-text-secondary">{isBn ? "কোনো তথ্য নেই" : "No data"}</div>

  const toggles = [
    { key: "enabled", label: isBn ? "কৌশল-ব্রেইন সংযোগ সক্রিয়" : "Strategy-Brain Integration Active", desc: isBn ? "AI এজেন্টরা কৌশল ডেটা রেফারেন্স করতে পারবে" : "AI agents can reference live strategy data during execution" },
    { key: "injectCanvas", label: isBn ? "স্ট্র্যাটেজি ক্যানভাস ইনজেক্ট" : "Inject Strategy Canvas", desc: isBn ? "এজেন্টদের ক্যানভাস ফ্যাক্টর ও স্কোর পাঠানো হবে" : "Agents receive canvas factors and scores as context" },
    { key: "injectERRC", label: isBn ? "ERRC গ্রিড ইনজেক্ট" : "Inject ERRC Grid", desc: isBn ? "এজেন্টদের ERRC কোয়াড্রেন্ট ডেটা পাঠানো হবে" : "Agents receive ERRC quadrant data as context" },
    { key: "injectKnowledge", label: isBn ? "ব্লু ওশান নলেজ ইনজেক্ট" : "Inject Blue Ocean Knowledge", desc: isBn ? "এজেন্টরা ব্লু ওশান নলেজ রেফারেন্স করতে পারবে" : "Agents can reference Blue Ocean knowledge entries" },
  ]

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl font-black text-text">{isBn ? "কৌশল-ব্রেইন কনফিগ" : "Strategy-Brain Config"}</h1>
        <p className="text-xs text-text-secondary/70 mt-1">{isBn ? "AI অরকেস্ট্রেটরে কৌশল ফ্রেমওয়ার্কের ডেটা কীভাবে ইনজেক্ট হবে তা নিয়ন্ত্রণ করুন" : "Control how strategy framework data is injected into the AI Orchestrator"}</p>
      </div>

      <div className="bg-white rounded-2xl border border-border p-5 mb-6">
        <h2 className="text-sm font-bold text-text mb-3">{isBn ? "ইন্টিগ্রেশন টগল" : "Integration Toggles"}</h2>
        <div className="space-y-3">
          {toggles.map((t) => (
            <div key={t.key} className="flex items-center justify-between p-3 rounded-xl border border-border">
              <div>
                <p className="text-xs font-bold text-text">{t.label}</p>
                <p className="text-[10px] text-text-secondary/70">{t.desc}</p>
              </div>
              <button onClick={() => toggle(t.key, !(config as any)[t.key])}
                className={`w-12 h-6 rounded-full transition relative ${(config as any)[t.key] ? "bg-primary" : "bg-border/50"}`}>
                <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition ${(config as any)[t.key] ? "left-6" : "left-0.5"}`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-border p-5">
        <h2 className="text-sm font-bold text-text mb-3">{isBn ? "বর্তমান কৌশল ডেটা (AI-তে যা যাবে)" : "Current Strategy Data (What Gets Injected)"}</h2>
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="text-center p-3 bg-primary/5 rounded-xl">
            <p className="text-lg font-black text-primary">{config.strategy.canvasCount}</p>
            <p className="text-[9px] text-text-secondary/70">{isBn ? "ক্যানভাস ফ্যাক্টর" : "Canvas Factors"}</p>
          </div>
          <div className="text-center p-3 bg-accent/5 rounded-xl">
            <p className="text-lg font-black text-accent">{config.strategy.errcCount}</p>
            <p className="text-[9px] text-text-secondary/70">{isBn ? "ERRC কোয়াড্রেন্ট" : "ERRC Quadrants"}</p>
          </div>
          <div className="text-center p-3 bg-success/5 rounded-xl">
            <p className="text-lg font-black text-success">{config.strategy.knowledgeCount}</p>
            <p className="text-[9px] text-text-secondary/70">{isBn ? "নলেজ এন্ট্রি" : "Knowledge Entries"}</p>
          </div>
        </div>
        {config.strategy.summary && (
          <div className="p-3 bg-primary/5 rounded-xl">
            <p className="text-[10px] font-bold text-text-secondary/70 uppercase mb-1">{isBn ? "সারাংশ" : "Summary"}</p>
            <p className="text-[11px] text-text-secondary/80">{config.strategy.summary}</p>
          </div>
        )}
      </div>
    </div>
  )
}
