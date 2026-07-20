"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguageStore } from "@/lib/store";
import { LoadingDots } from "@/components/ui/LoadingDots";

export default function RegisterPage() {
  const { lang } = useLanguageStore();
  const router = useRouter();

  const [form, setForm] = useState({ name: "", phone: "", email: "", password: "", confirmPassword: "", referralCode: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [success, setSuccess] = useState(false);

  const [utmParams, setUtmParams] = useState({ utmSource: "", utmMedium: "", utmCampaign: "" });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref") || localStorage.getItem("referral_code") || "";
    if (ref) {
      localStorage.setItem("referral_code", ref);
      setForm((prev) => ({ ...prev, referralCode: ref }));
    }
    const us = params.get("utm_source") || "";
    const um = params.get("utm_medium") || "";
    const uc = params.get("utm_campaign") || "";
    if (us || um || uc) {
      setUtmParams({ utmSource: us, utmMedium: um, utmCampaign: uc });
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (form.password !== form.confirmPassword) {
      setError(lang === "bn" ? "পাসওয়ার্ড মিলছে না" : "Passwords do not match");
      setLoading(false);
      return;
    }

    const payload: Record<string, unknown> = {
      name: form.name || undefined,
      phone: form.phone,
      email: form.email || undefined,
      password: form.password,
      referralCode: form.referralCode || undefined,
      ...utmParams,
    };

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json() as { error?: string; token?: string; workerId?: string; name?: string };
      if (!res.ok) throw new Error(data.error || "Registration failed");
      if (data.token) {
        localStorage.setItem("worker_token", data.token);
        localStorage.setItem("worker_id", data.workerId || "");
        localStorage.setItem("worker_name", data.name || "");
      }
      setSuccess(true);
      setTimeout(() => router.push("/onboarding"), 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const update = (k: keyof typeof form, v: string) => setForm((prev) => ({ ...prev, [k]: v }));

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-bg via-success/5 to-accent/5 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6 animate-scale">
            <span className="text-4xl">✅</span>
          </div>
          <h1 className="text-2xl font-black text-primary mb-2">
            {lang === "bn" ? "নিবন্ধন সফল হয়েছে!" : "Registration Successful!"}
          </h1>
          <p className="text-text-secondary">{lang === "bn" ? "অনবোর্ডিং এ নিয়ে যাওয়া হচ্ছে..." : "Redirecting to onboarding..."}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg via-accent/5 to-primary/5 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-2xl mx-auto mb-4 shadow-xl shadow-primary/20">
            🚀
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-primary">
            {lang === "bn" ? "নিবন্ধন" : "Create Account"}
          </h1>
          <p className="text-sm text-text-secondary mt-1">
            {lang === "bn" ? "আপনার যাত্রা শুরু করুন" : "Start Your Journey"}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-danger/5 border border-danger/20 text-sm text-danger font-medium flex items-center gap-2">
            <span>⚠️</span> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-sm border border-border/80 space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-xs font-bold text-text-secondary mb-1.5 uppercase tracking-wider">{lang === "bn" ? "নাম" : "Name"}</label>
              <input type="text" value={form.name} onChange={(e) => update("name", e.target.value)} placeholder={lang === "bn" ? "আপনার নাম" : "Your Name"} className="input-field" />
            </div>
            <div>
              <label className="block text-xs font-bold text-text-secondary mb-1.5 uppercase tracking-wider">{lang === "bn" ? "ফোন নম্বর" : "Phone Number"}</label>
              <input type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="০১XXX-XXXXXX" className="input-field" required />
            </div>
            <div>
              <label className="block text-xs font-bold text-text-secondary mb-1.5 uppercase tracking-wider">Email</label>
              <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="email@example.com" className="input-field" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-text-secondary mb-1.5 uppercase tracking-wider">{lang === "bn" ? "পাসওয়ার্ড" : "Password"}</label>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} value={form.password} onChange={(e) => update("password", e.target.value)} placeholder="••••••" className="input-field pr-10" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-primary text-sm">{showPassword ? "🙈" : "👁️"}</button>
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-text-secondary mb-1.5 uppercase tracking-wider">{lang === "bn" ? "নিশ্চিত করুন" : "Confirm"}</label>
              <div className="relative">
                <input type={showConfirm ? "text" : "password"} value={form.confirmPassword} onChange={(e) => update("confirmPassword", e.target.value)} placeholder="••••••" className="input-field pr-10" required />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-primary text-sm">{showConfirm ? "🙈" : "👁️"}</button>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-text-secondary mb-1.5 uppercase tracking-wider">{lang === "bn" ? "রেফারেল কোড" : "Referral Code"}</label>
            <input type="text" value={form.referralCode} onChange={(e) => update("referralCode", e.target.value)} placeholder={lang === "bn" ? "ঐচ্ছিক" : "Optional"} className="input-field" />
          </div>

          <button type="submit" disabled={loading}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-accent to-accent-light text-white font-bold text-base shadow-lg shadow-accent/25 hover:shadow-accent/40 hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-h-[48px]">
            {loading ? (
              <span className="flex items-center gap-2">
                <LoadingDots />
                <span className="text-sm font-medium animate-loading-pulse">{lang === "bn" ? "নিবন্ধন হচ্ছে..." : "Registering..."}</span>
              </span>
            ) : (lang === "bn" ? "নিবন্ধন করুন" : "Register")}
          </button>

          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border/60" /></div>
            <div className="relative flex justify-center"><span className="px-3 text-xs font-bold text-text-secondary bg-white">{lang === "bn" ? "অথবা" : "OR"}</span></div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button type="button" onClick={() => { const email = prompt("Enter Google email:"); if (email) fetch("/api/auth/google", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) }).then(r => r.json() as Promise<Record<string, unknown>>).then(d => { if (d.token) { localStorage.setItem("worker_token", d.token as string); window.location.href = "/dashboard"; } }).catch(() => setError("Google login failed")); }} className="flex items-center justify-center gap-2 py-3 rounded-xl border border-border/80 text-sm font-bold text-text-secondary hover:bg-primary/5 hover:border-primary/30 transition-all"><span>🔵</span> Google</button>
            <button type="button" onClick={() => { const email = prompt("Enter Facebook email:"); if (email) fetch("/api/auth/facebook", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) }).then(r => r.json() as Promise<Record<string, unknown>>).then(d => { if (d.token) { localStorage.setItem("worker_token", d.token as string); window.location.href = "/dashboard"; } }).catch(() => setError("Facebook login failed")); }} className="flex items-center justify-center gap-2 py-3 rounded-xl border border-border/80 text-sm font-bold text-text-secondary hover:bg-primary/5 hover:border-primary/30 transition-all"><span>🔷</span> Facebook</button>
          </div>
        </form>

        <p className="text-center text-sm text-text-secondary mt-6">
          {lang === "bn" ? "ইতিমধ্যে অ্যাকাউন্ট আছে?" : "Already have an account?"}{" "}
          <Link href="/login" className="font-bold text-accent hover:text-accent-light transition-colors">{lang === "bn" ? "লগইন করুন" : "Login"}</Link>
        </p>
      </div>
    </div>
  );
}
