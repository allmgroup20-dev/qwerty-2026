"use client";

import { useState, useEffect, useRef } from "react";
import { useLanguageStore } from "@/lib/store";

export default function AppsPage() {
  const { lang } = useLanguageStore();
  const deferredPrompt = useRef<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [installing, setInstalling] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
      return;
    }

    setIsIOS(/iphone|ipad|ipod/i.test(navigator.userAgent));

    const handlePrompt = (e: Event) => {
      e.preventDefault();
      deferredPrompt.current = e;
    };

    const handleInstalled = () => {
      setIsInstalled(true);
    };

    window.addEventListener("beforeinstallprompt", handlePrompt);
    window.addEventListener("appinstalled", handleInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", handlePrompt);
      window.removeEventListener("appinstalled", handleInstalled);
    };
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt.current) {
      setInstalling(true);
      deferredPrompt.current.prompt();
      const choice = await deferredPrompt.current.userChoice;
      deferredPrompt.current = null;
      setInstalling(false);
      if (choice.outcome === "accepted") setIsInstalled(true);
      return;
    }

    if (navigator.share) {
      try {
        setInstalling(true);
        await navigator.share({
          title: "JG Career",
          text: "Jobayer Group Career — Install the app",
          url: window.location.origin,
        });
      } catch {}
      setInstalling(false);
    }
  };

  return (
    <div className="py-24 px-4 min-h-screen">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-20 h-20 gradient-premium rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-orange-200">
            <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
              <line x1="12" y1="18" x2="12.01" y2="18" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-primary mb-3">
            {lang === "bn" ? "অ্যাপ" : "App"}
          </h1>
          <p className="text-text-secondary">
            {lang === "bn" ? "ওয়েবসাইটটি অ্যাপ হিসেবে ব্যবহার করুন। এক ক্লিকেই ইনস্টল করুন।" : "Use this website as an app. Install with one click."}
          </p>
        </div>

        {/* ── Sticky Install Card ── */}
        <div className="sticky top-24 z-40">
          {isInstalled ? (
            <div className="card p-8 text-center border-2 border-green-200 bg-green-50/50">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-primary mb-2">
                {lang === "bn" ? "✅ ইনস্টল করা হয়েছে" : "✅ Installed"}
              </h2>
              <p className="text-text-secondary text-sm">
                {lang === "bn" ? "অ্যাপটি আপনার ডিভাইসে ইনস্টল হয়েছে। হোম স্ক্রিন থেকে খুলুন।" : "The app is installed on your device. Open from your home screen."}
              </p>
            </div>
          ) : (
            <div className="card p-8 text-center border-2 border-orange-200 bg-gradient-to-b from-white to-orange-50/30">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-primary mb-2">
                {lang === "bn" ? "ইনস্টল করার জন্য প্রস্তুত" : "Ready to Install"}
              </h2>
              <p className="text-text-secondary text-sm mb-6">
                {lang === "bn"
                  ? "নিচের বাটনে ক্লিক করুন। আপনার ডিভাইসে অ্যাপটি ইনস্টল হয়ে যাবে।"
                  : "Click the button below. The app will be installed on your device."}
              </p>

              {installing ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-orange-600 border-t-transparent rounded-full animate-spin" />
                  <span className="text-sm font-medium text-primary">
                    {lang === "bn" ? "ইনস্টল হচ্ছে..." : "Installing..."}
                  </span>
                </div>
              ) : (
                <button
                  onClick={handleInstall}
                  className="px-10 py-3.5 gradient-premium text-white text-base font-bold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-orange-200 active:scale-95"
                >
                  {lang === "bn" ? "⚡ এখনই ইনস্টল করুন" : "⚡ Install Now"}
                </button>
              )}

              <div className="mt-6 p-4 bg-blue-50/80 border border-blue-100 rounded-xl text-left">
                <div className="flex items-start gap-3">
                  <span className="text-blue-500 text-lg shrink-0">&#x2139;&#xFE0F;</span>
                  <p className="text-xs text-blue-700">
                    {lang === "bn"
                      ? "ইনস্টল করার পর আপনার হোম স্ক্রিনে অ্যাপ আইকন যুক্ত হবে। যেকোনো সময় এক ক্লিকে খুলতে পারবেন। কোনো ডাউনলোড বা আপডেটের প্রয়োজন নেই।"
                      : "After installation, an app icon will be added to your home screen. Open anytime with one click. No downloads or updates needed."}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── Info section below sticky card ── */}
        <div className="mt-8 space-y-4 text-sm text-text-secondary">
          <div className="card p-4">
            <h3 className="font-semibold text-primary mb-2">
              {lang === "bn" ? "🔹 অ্যাপ ব্যবহারের সুবিধা" : "App Features"}
            </h3>
            <ul className="space-y-1.5">
              <li>{lang === "bn" ? "অফলাইনেও দেখা যাবে" : "Works offline"}</li>
              <li>{lang === "bn" ? "দ্রুত লোড হয়" : "Faster loading"}</li>
              <li>{lang === "bn" ? "হোম স্ক্রিন থেকে সরাসরি খোলা যায়" : "Open directly from home screen"}</li>
              <li>{lang === "bn" ? "কোনো আপডেটের প্রয়োজন নেই — সবসময় আপডেটেড" : "No updates needed — always up to date"}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
