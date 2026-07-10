"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguageStore } from "@/lib/store";

export default function LoginPage() {
  const { lang } = useLanguageStore();
  const [activeTab, setActiveTab] = useState<"worker" | "company">("worker");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const endpoint = activeTab === "worker" ? "/api/auth/worker-login" : "/api/auth/company-login";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(activeTab === "worker" ? { phone, password } : { username: phone, password }),
      });
      const data = await res.json() as { error?: string };
      if (!res.ok) throw new Error(data.error || "Login failed");
      window.location.href = activeTab === "worker" ? "/dashboard" : "/company";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-20 px-4">
      <div className="w-full max-w-md animate-fade-up">
        <div className="text-center mb-8">
          <div className="w-16 h-16 gradient-premium rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl">
            <span className="text-2xl text-white font-bold">JG</span>
          </div>
          <h1 className="text-2xl font-bold text-primary">
            {lang === "bn" ? "স্বাগতম" : "Welcome Back"}
          </h1>
          <p className="text-sm text-text-secondary mt-2">
            {lang === "bn" ? "আপনার অ্যাকাউন্টে লগইন করুন" : "Login to your account"}
          </p>
        </div>

        <div className="card shadow-xl border-0">
          <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
            <button
              onClick={() => { setActiveTab("worker"); setError(""); }}
              className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all ${
                activeTab === "worker" ? "bg-white shadow-sm text-primary" : "text-text-secondary"
              }`}
            >
              {lang === "bn" ? "সদস্য লগইন" : "Member Login"}
            </button>
            <button
              onClick={() => { setActiveTab("company"); setError(""); }}
              className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all ${
                activeTab === "company" ? "bg-white shadow-sm text-primary" : "text-text-secondary"
              }`}
            >
              {lang === "bn" ? "কোম্পানি লগইন" : "Company Login"}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                {activeTab === "worker"
                  ? (lang === "bn" ? "মোবাইল নম্বর" : "Phone Number")
                  : (lang === "bn" ? "ইউজারনেম" : "Username")}
              </label>
              <input
                type={activeTab === "worker" ? "tel" : "text"}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="input-field"
                placeholder={activeTab === "worker" ? "01XXXXXXXXX" : "Enter username"}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                {lang === "bn" ? "পাসওয়ার্ড" : "Password"}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-border text-action focus:ring-action/20" />
                <span className="text-text-secondary">{lang === "bn" ? "মনে রাখুন" : "Remember Me"}</span>
              </label>
              <button type="button" className="text-action hover:underline">
                {lang === "bn" ? "পাসওয়ার্ড ভুলে গেছেন?" : "Forgot Password?"}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full text-base !py-3.5"
            >
              {loading
                ? (lang === "bn" ? "লগইন হচ্ছে..." : "Logging in...")
                : (lang === "bn" ? "লগইন করুন" : "Login")}
            </button>
          </form>

          {activeTab === "worker" && (
            <div className="mt-6 text-center text-sm">
              <span className="text-text-secondary">
                {lang === "bn" ? "একাউন্ট নেই?" : "Don't have an account?"}
              </span>
              <Link href="/register" className="text-action font-medium hover:underline ml-1">
                {lang === "bn" ? "এখন নিবন্ধন করুন" : "Register Now"}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
