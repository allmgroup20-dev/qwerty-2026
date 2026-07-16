"use client";

import { useState, useEffect } from "react";
import { useLanguageStore } from "@/lib/store";

export default function SmartInstall() {
  const { lang } = useLanguageStore();
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isDismissed, setIsDismissed] = useState(true);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
      return;
    }

    // iOS detection
    const iOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
    setIsIOS(iOS);

    // Check dismiss cookie
    try {
      const dismissed = localStorage.getItem("pwa_dismissed");
      if (dismissed) {
        const daysAgo = (Date.now() - parseInt(dismissed)) / 86400000;
        if (daysAgo < 7) return;
        localStorage.removeItem("pwa_dismissed");
      }
    } catch {}
    setIsDismissed(false);

    // Listen for beforeinstallprompt (Chrome/Edge/Android)
    const handlePrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    // Listen for app installed
    const handleInstalled = () => {
      setIsInstalled(true);
      setShowPrompt(false);
      try { localStorage.setItem("pwa_installed", "1"); } catch {}
    };

    window.addEventListener("beforeinstallprompt", handlePrompt);
    window.addEventListener("appinstalled", handleInstalled);

    // For iOS and desktop, show after a delay if no beforeinstallprompt
    if (!window.matchMedia("(display-mode: browser)").matches) return;
    
    const timer = setTimeout(() => {
      if (!deferredPrompt && !isInstalled && !isIOS) {
        // Desktop Chrome shows install icon in address bar automatically
        // Just show the guide banner
      }
      if (isIOS) {
        setShowPrompt(true); // Show iOS guide
      }
    }, 5000);

    return () => {
      window.removeEventListener("beforeinstallprompt", handlePrompt);
      window.removeEventListener("appinstalled", handleInstalled);
      clearTimeout(timer);
    };
  }, [deferredPrompt, isInstalled, isIOS]);

  function handleInstall() {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choice: { outcome: string }) => {
        if (choice.outcome === "accepted") {
          setIsInstalled(true);
        }
        setDeferredPrompt(null);
        setShowPrompt(false);
      });
    }
  }

  function handleDismiss() {
    setShowPrompt(false);
    setDeferredPrompt(null);
    try { localStorage.setItem("pwa_dismissed", String(Date.now())); } catch {}
  }

  if (isInstalled || !showPrompt) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 z-50 md:bottom-8 md:left-auto md:right-8 md:w-80 animate-slide-up">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 relative">
        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 w-6 h-6 flex items-center justify-center rounded-full bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600 transition-all"
          aria-label="Close"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF6B35] to-[#FFD700] flex items-center justify-center text-white font-bold text-sm">
            JG
          </div>
          <div>
            <div className="text-sm font-bold text-primary">JG Career</div>
            <div className="text-[10px] text-text-secondary">
              {lang === "bn" ? "অ্যাপ হিসেবে ব্যবহার করুন" : "Use as App"}
            </div>
          </div>
        </div>

        {isIOS ? (
          <div className="text-xs text-text-secondary leading-relaxed">
            {lang === "bn"
              ? "iOS এ Safari → শেয়ার বাটন → হোম স্ক্রিনে যোগ করুন"
              : "iOS: Safari → Share button → Add to Home Screen"}
          </div>
        ) : (
          <button
            onClick={handleInstall}
            className="w-full py-2.5 bg-gradient-to-r from-[#FF6B35] to-[#FF8C00] text-white text-sm font-bold rounded-xl hover:from-[#e55a2b] hover:to-[#e67e00] transition-all shadow-lg shadow-orange-200 active:scale-95"
          >
            {lang === "bn" ? "⚡ এখনই ইনস্টল করুন" : "⚡ Install Now"}
          </button>
        )}
      </div>
    </div>
  );
}
