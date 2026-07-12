"use client";

import { useState, useEffect } from "react";

export default function SmartInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [installed, setInstalled] = useState(false);
  const [showIOS, setShowIOS] = useState(false);
  const isIOS = typeof navigator !== "undefined" && /iPad|iPhone|iPod/.test(navigator.userAgent);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    window.addEventListener("appinstalled", () => setInstalled(true));
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (isIOS) { setShowIOS(true); return; }
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const result = await deferredPrompt.userChoice;
      if (result.outcome === "accepted") {
        setInstalled(true);
        setShowPrompt(false);
      }
      setDeferredPrompt(null);
    } else {
      setShowIOS(true);
    }
  };

  if (installed || (!showPrompt && !showIOS)) return null;

  return (
    <div className="fixed bottom-[72px] left-1/2 -translate-x-1/2 z-[9999] w-[92%] max-w-[380px]">
      {showPrompt && (
        <div className="flex items-center gap-3 p-3.5 rounded-[16px] bg-[rgba(15,23,42,.92)] backdrop-blur-[12px] border border-[rgba(255,255,255,.12)] shadow-[0_12px_28px_rgba(0,0,0,.35)]">
          <div className="w-[42px] h-[42px] rounded-[10px] bg-gradient-to-br from-[#2563EB] to-[#7C3AED] flex items-center justify-center text-white font-black text-sm flex-shrink-0">JG</div>
          <div className="flex-1 min-w-0">
            <div className="text-white text-xs font-extrabold truncate">Jobayer Group Career</div>
            <div className="text-[#94A3B8] text-[10px] font-semibold">অ্যাপ হিসেবে ইনস্টল করুন</div>
          </div>
          <button onClick={handleInstall} className="px-4 py-2 rounded-[10px] bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white text-xs font-extrabold border-none cursor-pointer shadow-md hover:brightness-110 transition-all">⚡ ইনস্টল</button>
          <button onClick={() => setShowPrompt(false)} className="text-[#64748B] text-sm border-none bg-transparent cursor-pointer hover:text-white transition-colors">✕</button>
        </div>
      )}
      {showIOS && (
        <div className="p-4 rounded-[16px] bg-[rgba(15,23,42,.95)] backdrop-blur-[12px] border border-[rgba(255,255,255,.12)] shadow-[0_12px_28px_rgba(0,0,0,.35)]">
          <div className="flex items-start justify-between mb-2.5">
            <h4 className="text-white font-extrabold text-sm">📱 ইনস্টল করার নিয়ম</h4>
            <button onClick={() => setShowIOS(false)} className="text-[#64748B] text-sm border-none bg-transparent cursor-pointer hover:text-white">✕</button>
          </div>
          <p className="text-[#CBD5E1] text-xs font-semibold mb-3 leading-[1.5]">
            আপনার ব্রাউজারে নিচের ধাপগুলো ফলো করুন:
          </p>
          <div className="space-y-2">
            <div className="flex items-center gap-2.5 text-xs text-[#CBD5E1]">
              <span className="w-[26px] h-[26px] rounded-full bg-[rgba(37,99,235,.2)] flex items-center justify-center text-[#60A5FA] font-black flex-shrink-0">১</span>
              <span>শেয়ার আইকন <span className="inline-block px-2 py-0.5 rounded bg-[rgba(255,255,255,.08)] text-white font-bold">⎙</span> ট্যাপ করুন</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-[#CBD5E1]">
              <span className="w-[26px] h-[26px] rounded-full bg-[rgba(37,99,235,.2)] flex items-center justify-center text-[#60A5FA] font-black flex-shrink-0">২</span>
              <span>&ldquo;হোম স্ক্রিনে যোগ করুন&rdquo; নির্বাচন করুন</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-[#CBD5E1]">
              <span className="w-[26px] h-[26px] rounded-full bg-[rgba(37,99,235,.2)] flex items-center justify-center text-[#60A5FA] font-black flex-shrink-0">৩</span>
              <span>&ldquo;যোগ করুন&rdquo; বাটনে ক্লিক করুন ✅</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
