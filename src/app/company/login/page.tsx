"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguageStore } from "@/lib/store";
import { LoadingDots } from "@/components/ui/LoadingDots";

export default function CompanyLoginPage() {
  const { lang } = useLanguageStore();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/company-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json() as { error?: string };
      if (!res.ok) throw new Error(data.error || "Login failed");
      window.location.href = "/company";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg via-primary/5 to-accent/5 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-2xl mx-auto mb-4 shadow-xl shadow-primary/20">
            🏢
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-primary">
            {lang === "bn" ? "কোম্পানি লগইন" : "Company Login"}
          </h1>
          <p className="text-sm text-text-secondary mt-1">
            {lang === "bn" ? "আপনার কোম্পানি অ্যাকাউন্টে লগইন করুন" : "Login to your company account"}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-danger/5 border border-danger/20 text-sm text-danger font-medium flex items-center gap-2">
            <span>⚠️</span> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-sm border border-border/80 space-y-4">
          <div>
            <label className="block text-xs font-bold text-text-secondary mb-1.5 uppercase tracking-wider">
              {lang === "bn" ? "ইউজারনেম" : "Username"}
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="company@email.com"
              className="input-field"
              required
              autoComplete="username"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-text-secondary mb-1.5 uppercase tracking-wider">
              {lang === "bn" ? "পাসওয়ার্ড" : "Password"}
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="input-field pr-10"
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-primary transition-colors"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-accent to-accent-light text-white font-bold text-base shadow-lg shadow-accent/25 hover:shadow-accent/40 hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-h-[48px]"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <LoadingDots />
                <span className="text-sm font-medium animate-loading-pulse">
                  {lang === "bn" ? "লগইন হচ্ছে..." : "Logging in..."}
                </span>
              </span>
            ) : (lang === "bn" ? "লগইন করুন" : "Login")}
          </button>

          <div className="text-center pt-2">
            <Link href="/login" className="text-xs font-medium text-text-secondary hover:text-accent transition-colors">
              ← {lang === "bn" ? "মেম্বর লগইন" : "Member Login"}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
