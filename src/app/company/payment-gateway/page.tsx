"use client";

import { useState, useEffect } from "react";
import { useLanguageStore } from "@/lib/store";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

function PasswordInput({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="input-field w-full pr-11"
        placeholder={placeholder || "••••••••"}
      />
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 border-none bg-transparent cursor-pointer text-[#94A3B8] hover:text-[#64748B] transition-colors"
      >
        {show ? (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        )}
      </button>
    </div>
  );
}

export default function PaymentGatewayPage() {
  const { lang } = useLanguageStore();
  const [testId, setTestId] = useState("");
  const [testPassword, setTestPassword] = useState("");
  const [liveId, setLiveId] = useState("");
  const [livePassword, setLivePassword] = useState("");
  const [mode, setMode] = useState<"test" | "live">("test");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/company/settings")
      .then((r) => r.json() as Promise<{ settings?: Record<string, string> }>)
      .then((data) => {
        if (data.settings) {
          setTestId(data.settings.sslcommerz_test_store_id || "");
          setTestPassword(data.settings.sslcommerz_test_store_password || "");
          setLiveId(data.settings.sslcommerz_live_store_id || "");
          setLivePassword(data.settings.sslcommerz_live_store_password || "");
          setMode((data.settings.sslcommerz_mode as "test" | "live") || "test");
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/company/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          settings: [
            { key: "sslcommerz_test_store_id", value: testId },
            { key: "sslcommerz_test_store_password", value: testPassword },
            { key: "sslcommerz_live_store_id", value: liveId },
            { key: "sslcommerz_live_store_password", value: livePassword },
            { key: "sslcommerz_mode", value: mode },
          ],
        }),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
      }
    } catch {}
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen py-24 px-4 bg-gray-50 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-action border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-24 px-4 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 animate-fade-up">
          <h1 className="text-2xl font-bold text-primary">
            {lang === "bn" ? "পেমেন্ট গেটওয়ে" : "Payment Gateway"}
          </h1>
          <p className="text-sm text-text-secondary mt-1">
            {lang === "bn" ? "SSLCommerz ক্রেডেন্সিয়াল এবং মোড কনফিগার করুন" : "Configure SSLCommerz credentials and mode"}
          </p>
        </div>

        <div className="space-y-6">
          <Card className={`border-2 transition-all ${mode === "test" ? "border-yellow-400 shadow-lg shadow-yellow-100" : "border-border"}`}>
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${mode === "test" ? "bg-yellow-400 animate-pulse" : "bg-gray-300"}`} />
                <h3 className="font-bold text-primary">{lang === "bn" ? "টেস্ট মোড (স্যান্ডবক্স)" : "Test Mode (Sandbox)"}</h3>
              </div>
              <button
                onClick={() => setMode("test")}
                className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-all ${mode === "test" ? "bg-yellow-400 text-white shadow-sm" : "bg-gray-100 text-text-secondary hover:bg-gray-200"}`}
              >
                {mode === "test" ? (lang === "bn" ? "✓ সক্রিয়" : "✓ Active") : (lang === "bn" ? "একটিভ করুন" : "Activate")}
              </button>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Test Store ID</label>
                <input type="text" value={testId} onChange={(e) => setTestId(e.target.value)} className="input-field" placeholder="e.g. jobay64c8b4e5d2f7" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Test Store Password</label>
                <PasswordInput value={testPassword} onChange={setTestPassword} />
              </div>
            </div>
            <p className="text-xs text-text-secondary mt-3">
              {lang === "bn"
                ? "স্যান্ডবক্স ক্রেডেন্সিয়াল SSLCommerz ড্যাশবোর্ড থেকে নিন"
                : "Get sandbox credentials from SSLCommerz developer dashboard"}
            </p>
          </Card>

          <Card className={`border-2 transition-all ${mode === "live" ? "border-action shadow-lg shadow-action/10" : "border-border"}`}>
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${mode === "live" ? "bg-action animate-pulse" : "bg-gray-300"}`} />
                <h3 className="font-bold text-primary">{lang === "bn" ? "লাইভ মোড (রিয়েল)" : "Live Mode (Real)"}</h3>
              </div>
              <button
                onClick={() => setMode("live")}
                className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-all ${mode === "live" ? "bg-action text-white shadow-sm" : "bg-gray-100 text-text-secondary hover:bg-gray-200"}`}
              >
                {mode === "live" ? (lang === "bn" ? "✓ সক্রিয়" : "✓ Active") : (lang === "bn" ? "একটিভ করুন" : "Activate")}
              </button>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Live Store ID</label>
                <input type="text" value={liveId} onChange={(e) => setLiveId(e.target.value)} className="input-field" placeholder="e.g. jobayLIVE12345" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Live Store Password</label>
                <PasswordInput value={livePassword} onChange={setLivePassword} />
              </div>
            </div>
            <p className="text-xs text-text-secondary mt-3">
              {lang === "bn"
                ? "লাইভ ক্রেডেন্সিয়াল SSLCommerz মার্চেন্ট অ্যাকাউন্ট থেকে নিন"
                : "Get live credentials from your SSLCommerz merchant account"}
            </p>
          </Card>

          <div className="flex items-center gap-4 p-4 bg-blue-50 border border-blue-200 rounded-xl text-sm text-blue-700">
            <span className="text-lg">ℹ️</span>
            <span>
              {lang === "bn"
                ? `বর্তমানে "${mode === "test" ? "টেস্ট (স্যান্ডবক্স)" : "লাইভ (রিয়েল)"}" মোড সক্রিয়। সেভ করলেই পরিবর্তন কার্যকর হবে।`
                : `Currently "${mode === "test" ? "Test (Sandbox)" : "Live (Real)"}" mode is active. Save to apply changes.`}
            </span>
          </div>

          <Button onClick={handleSave} loading={saving} className="w-full !py-4">
            {saved
              ? (lang === "bn" ? "✓ সংরক্ষিত হয়েছে" : "✓ Saved Successfully")
              : (lang === "bn" ? "সেটিংস সেভ করুন" : "Save Settings")}
          </Button>
        </div>
      </div>
    </div>
  );
}
