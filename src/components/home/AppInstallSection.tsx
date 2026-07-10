"use client";

import Link from "next/link";
import { useLanguageStore } from "@/lib/store";

export default function AppInstallSection() {
  const { lang } = useLanguageStore();

  return (
    <section className="py-20 md:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="card-glass text-center max-w-3xl mx-auto animate-fade-up">
          <div className="w-16 h-16 gradient-premium rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
            <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
              <line x1="12" y1="18" x2="12.01" y2="18" />
            </svg>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            {lang === "bn" ? "যেকোনো ডিভাইস থেকে অ্যাপের মতো ব্যবহার করুন" : "Use Like an App on Any Device"}
          </h2>

          <p className="text-text-secondary text-base mb-8 max-w-lg mx-auto">
            {lang === "bn"
              ? "আপনার ফোন বা কম্পিউটারে আমাদের ওয়েবসাইটটি অ্যাপের মতো করে ব্যবহার করুন। কোন ডাউনলোডের প্রয়োজন নেই!"
              : "Use our website like a native app on your phone or computer. No download required!"}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-xl mx-auto">
            <Link
              href="/app-install"
              className="card hover:shadow-xl hover:-translate-y-1 text-center group cursor-pointer"
            >
              <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                </svg>
              </div>
              <h3 className="font-semibold text-sm text-primary">iPhone</h3>
              <p className="text-xs text-text-secondary mt-1">
                {lang === "bn" ? "সাফারি থেকে যোগ করুন" : "Add from Safari"}
              </p>
            </Link>

            <Link
              href="/app-install"
              className="card hover:shadow-xl hover:-translate-y-1 text-center group cursor-pointer"
            >
              <div className="w-12 h-12 bg-green-600 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 4v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2zm7 2h4v2h-4V6zm0 4h4v2h-4v-2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-sm text-primary">Android</h3>
              <p className="text-xs text-text-secondary mt-1">
                {lang === "bn" ? "ক্রোম থেকে যোগ করুন" : "Add from Chrome"}
              </p>
            </Link>

            <Link
              href="/app-install"
              className="card hover:shadow-xl hover:-translate-y-1 text-center group cursor-pointer"
            >
              <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
              </div>
              <h3 className="font-semibold text-sm text-primary">Desktop</h3>
              <p className="text-xs text-text-secondary mt-1">
                {lang === "bn" ? "ব্রাউজার থেকে ইনস্টল" : "Install from Browser"}
              </p>
            </Link>
          </div>

          <div className="mt-8 p-4 bg-primary/5 rounded-xl">
            <p className="text-xs text-text-secondary">
              {lang === "bn"
                ? "⚡ কোনো অ্যাপ স্টোরে যাওয়ার প্রয়োজন নেই। সরাসরি আপনার ব্রাউজার থেকে ইনস্টল করুন!"
                : "⚡ No need to visit any app store. Install directly from your browser!"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
