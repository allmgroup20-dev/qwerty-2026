"use client"

import { useState, useEffect } from "react"
import { useLanguageStore } from "@/lib/store"
import { Skeleton } from "@/components/ui/Skeleton"

interface Tier {
  key: string; name: string; nameBn: string; color: string; targetPct: number; emoji: string; desc: string; descBn: string
}

interface Offer {
  name: string; category: string; investment: string; action: string
}

export default function PMSMapPage() {
  const { lang } = useLanguageStore()
  const isBn = lang === "bn"
  const [tiers, setTiers] = useState<Tier[]>([])
  const [offers, setOffers] = useState<Offer[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/strategy/pms-map")
        if (res.ok) {
          const json = await res.json() as { tiers: Tier[]; offers: Offer[] }
          setTiers(json.tiers ?? [])
          setOffers(json.offers ?? [])
        }
      } catch {} finally {
        setLoading(false)
      }
    })()
  }, [])

  if (loading) return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto space-y-4">
      <Skeleton className="h-8 w-80" />
      <Skeleton className="h-48 rounded-2xl" />
      <Skeleton className="h-64 rounded-2xl" />
    </div>
  )

  const currentPct = { settler: 30, migrator: 45, pioneer: 25 }

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl font-black text-text">{isBn ? "PMS ম্যাপ" : "Pioneer-Migrator-Settler Map"}</h1>
        <p className="text-xs text-text-secondary/70 mt-1">
          {isBn ? "আপনার পোর্টফোলিও ব্যালেন্স করুন — ব্লু ওশান তৈরি করুন, রেড ওশান থেকে বেরিয়ে আসুন" : "Balance Your Portfolio — Create Blue Oceans, Escape Red Oceans"}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mb-6">
        {tiers.map((t) => (
          <div key={t.key} className="bg-white rounded-2xl border border-border p-4 hover:shadow-sm transition"
            style={{ borderTopColor: t.color, borderTopWidth: 3 }}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">{t.emoji}</span>
              <h3 className="text-sm font-bold text-text">{isBn ? t.nameBn : t.name}</h3>
            </div>
            <p className="text-xs text-text-secondary/80 mb-3">{isBn ? t.descBn : t.desc}</p>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-text-secondary">{isBn ? "লক্ষ্য" : "Target"}</span>
                <span className="font-bold" style={{ color: t.color }}>{t.targetPct}%</span>
              </div>
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-text-secondary">{isBn ? "বর্তমান" : "Current"}</span>
                <span className="font-bold">{currentPct[t.key as keyof typeof currentPct]}%</span>
              </div>
              <div className="w-full h-2 bg-border rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${currentPct[t.key as keyof typeof currentPct]}%`, backgroundColor: t.color, opacity: 0.7 }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-border p-5 mb-6">
        <h2 className="text-sm font-bold text-text mb-3">{isBn ? "আমাদের অফারসমূহ" : "Our Offerings"}</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 text-text-secondary font-medium">{isBn ? "অফার" : "Offer"}</th>
                <th className="text-left py-2 text-text-secondary font-medium">{isBn ? "ক্যাটাগরি" : "Category"}</th>
                <th className="text-left py-2 text-text-secondary font-medium">{isBn ? "বিনিয়োগ" : "Investment"}</th>
                <th className="text-left py-2 text-text-secondary font-medium">{isBn ? "কর্ম" : "Action"}</th>
              </tr>
            </thead>
            <tbody>
              {offers.map((o) => {
                const tier = tiers.find((t) => t.key === o.category)
                return (
                  <tr key={o.name} className="border-b border-border/50">
                    <td className="py-2.5 text-text font-medium">{o.name}</td>
                    <td className="py-2.5">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold"
                        style={{ backgroundColor: `${tier?.color}15`, color: tier?.color }}>
                        {isBn ? tier?.nameBn : tier?.name}
                      </span>
                    </td>
                    <td className="py-2.5 text-text-secondary">{o.investment}</td>
                    <td className="py-2.5 text-text-secondary/80">{o.action}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
