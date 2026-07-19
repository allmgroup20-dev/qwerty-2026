"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useLanguageStore } from "@/lib/store";

interface PlatformLink {
  id: number; platform: string; platformId: string; verified: number; linkedAt: string;
}

const PLATFORM_INFO: Record<string, { label: string; labelBn: string; icon: string; hint: string; hintBn: string }> = {
  whatsapp: { label: "WhatsApp", labelBn: "হোয়াটসঅ্যাপ", icon: "💬", hint: "ফোন নম্বর (যেমন: 01712345678)", hintBn: "Phone number (e.g.: 01712345678)" },
  messenger: { label: "Messenger", labelBn: "মেসেঞ্জার", icon: "💭", hint: "Facebook PSID", hintBn: "Facebook PSID" },
  telegram: { label: "Telegram", labelBn: "টেলিগ্রাম", icon: "✈️", hint: "Telegram Chat ID", hintBn: "Telegram Chat ID" },
};

export default function LinkedPlatformsSection() {
  const { lang } = useLanguageStore();
  const workerId = typeof window !== "undefined" ? localStorage.getItem("worker_id") : null;
  const [links, setLinks] = useState<PlatformLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [newPlatform, setNewPlatform] = useState("telegram");
  const [newPlatformId, setNewPlatformId] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!workerId) return;
    fetch(`/api/platforms/links?workerId=${encodeURIComponent(workerId)}`)
      .then(r => r.json() as Promise<{ links?: PlatformLink[] }>)
      .then(d => { setLinks(d.links || []); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [workerId]);

  const handleAdd = async () => {
    if (!workerId || !newPlatformId.trim()) return;
    setSaving(true);
    try {
      const res = await fetch("/api/platforms/links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ workerId, platform: newPlatform, platformId: newPlatformId.trim() }),
      });
      if (!res.ok) return;
      setLinks(prev => [...prev, { id: Date.now(), platform: newPlatform, platformId: newPlatformId.trim(), verified: 0, linkedAt: new Date().toISOString() }]);
      setShowAdd(false);
      setNewPlatformId("");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!workerId) return;
    if (!confirm(lang === "bn" ? "লিংক মুছে ফেলবেন?" : "Remove this link?")) return;
    await fetch(`/api/platforms/links?workerId=${encodeURIComponent(workerId)}&id=${id}`, { method: "DELETE" });
    setLinks(prev => prev.filter(l => l.id !== id));
  };

  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-primary">
          {lang === "bn" ? "🔗 সংযুক্ত প্ল্যাটফর্ম" : "🔗 Linked Platforms"}
        </h3>
        <button onClick={() => setShowAdd(!showAdd)} className="text-sm text-primary hover:underline font-medium">
          {lang === "bn" ? "+ যুক্ত করুন" : "+ Add"}
        </button>
      </div>
      <p className="text-sm text-text-secondary mb-4">
        {lang === "bn"
          ? "আপনার টেলিগ্রাম/মেসেঞ্জার অ্যাকাউন্ট লিংক করুন যাতে সব প্ল্যাটফর্মে একই আইডি ব্যবহার করতে পারেন"
          : "Link your Telegram/Messenger accounts to use the same identity across all platforms"}
      </p>

      {loading ? (
        <p className="text-sm text-text-secondary">{lang === "bn" ? "লোড হচ্ছে..." : "Loading..."}</p>
      ) : links.length === 0 ? (
        <p className="text-sm text-text-secondary italic">
          {lang === "bn" ? "কোন প্ল্যাটফর্ম সংযুক্ত নেই" : "No platforms linked yet"}
        </p>
      ) : (
        <div className="space-y-2 mb-4">
          {links.map(link => {
            const info = PLATFORM_INFO[link.platform];
            return (
              <div key={link.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{info?.icon || "📱"}</span>
                  <div>
                    <p className="text-sm font-medium text-text">{info?.label || link.platform}</p>
                    <p className="text-xs text-text-secondary font-mono">{link.platformId}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {link.verified ? (
                    <span className="text-xs text-green-600 font-medium">✓</span>
                  ) : (
                    <span className="text-xs text-amber-600">{lang === "bn" ? "যাচাই হয়নি" : "Unverified"}</span>
                  )}
                  <button onClick={() => handleDelete(link.id)} className="text-xs text-red-500 hover:underline">
                    {lang === "bn" ? "মুছুন" : "Remove"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {showAdd && (
        <div className="border-t border-border pt-4 mt-2 space-y-3">
          <select
            value={newPlatform}
            onChange={e => setNewPlatform(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-sm"
          >
            {Object.entries(PLATFORM_INFO).map(([key, info]) => (
              <option key={key} value={key}>{info.icon} {info.label} / {info.labelBn}</option>
            ))}
          </select>
          <input
            type="text"
            value={newPlatformId}
            onChange={e => setNewPlatformId(e.target.value)}
            placeholder={PLATFORM_INFO[newPlatform]?.[lang === "bn" ? "hintBn" : "hint"] || "Platform ID"}
            className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-sm outline-none focus:border-primary"
          />
          <div className="flex gap-2">
            <Button onClick={handleAdd} disabled={saving || !newPlatformId.trim()} variant="primary" size="sm" className="flex-1">
              {saving ? (lang === "bn" ? "সংরক্ষণ..." : "Saving...") : (lang === "bn" ? "যুক্ত করুন" : "Link")}
            </Button>
            <Button onClick={() => setShowAdd(false)} variant="outline" size="sm" className="flex-1">
              {lang === "bn" ? "বাতিল" : "Cancel"}
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}
