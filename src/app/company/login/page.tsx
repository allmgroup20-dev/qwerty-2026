"use client";

import { useState } from "react";
import { useLanguageStore } from "@/lib/store";

export default function CompanyLoginPage() {
  const { lang } = useLanguageStore();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");
      window.location.href = "/company";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-20 px-4 bg-gray-50">
      <div className="w-full max-w-sm animate-fade-up">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl">
            <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-primary">
            {lang === "bn" ? "কোম্পানি লগইন" : "Company Login"}
          </h1>
          <p className="text-sm text-text-secondary mt-1">Jobayer Group Career</p>
        </div>

        <form onSubmit={handleSubmit} className="card shadow-xl border-0 space-y-4">
          {error && <div className="p-3 bg-red-50 rounded-xl text-sm text-red-600">{error}</div>}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              {lang === "bn" ? "ইউজারনেম" : "Username"}
            </label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="input-field" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              {lang === "bn" ? "পাসওয়ার্ড" : "Password"}
            </label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input-field" required />
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full text-base !py-3.5">
            {loading ? (lang === "bn" ? "লগইন হচ্ছে..." : "Logging in...") : (lang === "bn" ? "লগইন" : "Login")}
          </button>
          <p className="text-xs text-text-secondary text-center">
            {lang === "bn" ? "শুধুমাত্র কোম্পানি অনুমোদিত ব্যক্তির জন্য" : "For authorized company personnel only"}
          </p>
        </form>
      </div>
    </div>
  );
}
