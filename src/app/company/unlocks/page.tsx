"use client";

import { useState } from "react";
import { useLanguageStore } from "@/lib/store";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useSWRFetch } from "@/lib/use-swr-fetch";

interface UnlockLimit {
  workerId: string;
  maxUnlocks: number;
  setBy: string;
}

export default function UnlockManagementPage() {
  const { lang } = useLanguageStore();
  const { data, loading, refresh } = useSWRFetch<{ limits?: UnlockLimit[] }>(
    "/api/unlocks/limits",
    { ttlMs: 30_000 }
  );
  const limits = data?.limits ?? [];

  const [workerId, setWorkerId] = useState("");
  const [maxUnlocks, setMaxUnlocks] = useState(10);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Manual unlock
  const [unlockWorkerId, setUnlockWorkerId] = useState("");
  const [unlockCourseId, setUnlockCourseId] = useState("");
  const [unlocking, setUnlocking] = useState(false);

  const handleSetLimit = async () => {
    if (!workerId) return;
    setSaving(true); setError(""); setSuccess("");
    try {
      const res = await fetch("/api/unlocks/limits", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ workerId, maxUnlocks, setBy: "admin" }),
      });
      const data = await res.json() as { error?: string };
      if (!res.ok) throw new Error(data.error || "Failed");
      setSuccess(lang === "bn" ? "লিমিট সেট করা হয়েছে" : "Limit set");
      refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed");
    } finally { setSaving(false); }
  };

  const handleManualUnlock = async () => {
    if (!unlockWorkerId || !unlockCourseId) return;
    setUnlocking(true); setError(""); setSuccess("");
    try {
      const res = await fetch("/api/unlocks", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ workerId: unlockWorkerId, courseId: parseInt(unlockCourseId), unlockedBy: "admin" }),
      });
      const data = await res.json() as { error?: string };
      if (!res.ok) throw new Error(data.error || "Failed");
      setSuccess(lang === "bn" ? "আনলক করা হয়েছে" : "Unlocked");
      setUnlockCourseId("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed");
    } finally { setUnlocking(false); }
  };

  return (
    <div className="min-h-screen py-24 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-primary mb-8">{lang === "bn" ? "আনলক ব্যবস্থাপনা" : "Unlock Management"}</h1>

        {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">{error}</div>}
        {success && <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-xl text-sm text-green-600">{success}</div>}

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <h3 className="font-bold text-primary mb-4">{lang === "bn" ? "আনলক লিমিট সেট করুন" : "Set Unlock Limit"}</h3>
            <div className="space-y-3">
              <input type="text" placeholder={lang === "bn" ? "ওয়ার্কার আইডি" : "Worker ID"} value={workerId}
                onChange={(e) => setWorkerId(e.target.value)} className="input-field" />
              <input type="number" placeholder={lang === "bn" ? "সর্বোচ্চ আনলক সংখ্যা" : "Max unlocks"} value={maxUnlocks}
                onChange={(e) => setMaxUnlocks(parseInt(e.target.value) || 0)} className="input-field" />
              <Button onClick={handleSetLimit} disabled={saving || !workerId}>
                {saving ? "..." : (lang === "bn" ? "সেট করুন" : "Set Limit")}
              </Button>
            </div>
          </Card>

          <Card>
            <h3 className="font-bold text-primary mb-4">{lang === "bn" ? "ম্যানুয়ালি আনলক" : "Manual Unlock"}</h3>
            <div className="space-y-3">
              <input type="text" placeholder={lang === "bn" ? "ওয়ার্কার আইডি" : "Worker ID"} value={unlockWorkerId}
                onChange={(e) => setUnlockWorkerId(e.target.value)} className="input-field" />
              <input type="number" placeholder={lang === "bn" ? "রিসোর্স আইডি" : "Course ID"} value={unlockCourseId}
                onChange={(e) => setUnlockCourseId(e.target.value)} className="input-field" />
              <Button onClick={handleManualUnlock} disabled={unlocking || !unlockWorkerId || !unlockCourseId}>
                {unlocking ? "..." : (lang === "bn" ? "আনলক করুন" : "Unlock")}
              </Button>
            </div>
          </Card>
        </div>

        <Card className="overflow-hidden !p-0">
          <h3 className="font-bold text-primary p-4 border-b border-border">
            {lang === "bn" ? "বর্তমান লিমিট সমূহ" : "Current Limits"}
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-border">
                  <th className="text-left p-4 text-sm font-semibold text-primary">{lang === "bn" ? "ওয়ার্কার আইডি" : "Worker ID"}</th>
                  <th className="text-center p-4 text-sm font-semibold text-primary">{lang === "bn" ? "সর্বোচ্চ আনলক" : "Max Unlocks"}</th>
                  <th className="text-center p-4 text-sm font-semibold text-primary">{lang === "bn" ? "সেট করেছেন" : "Set By"}</th>
                </tr>
              </thead>
              <tbody>
                {limits.map((l) => (
                  <tr key={l.workerId} className="border-b border-border last:border-0">
                    <td className="p-4 text-sm font-medium text-primary">{l.workerId}</td>
                    <td className="p-4 text-center text-sm font-bold text-primary">{l.maxUnlocks}</td>
                    <td className="p-4 text-center text-sm text-text-secondary">{l.setBy}</td>
                  </tr>
                ))}
                {limits.length === 0 && (
                  <tr><td colSpan={3} className="p-8 text-center text-text-secondary text-sm">
                    {lang === "bn" ? "কোনো লিমিট সেট করা হয়নি।" : "No limits set yet."}
                  </td></tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
