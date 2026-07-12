"use client";

import { useState } from "react";

export default function SmartInstall() {
  const [installed, setInstalled] = useState(false);
  const [showIOS, setShowIOS] = useState(false);
  const isIOS = /iPad|iPhone|iPod/.test(
    typeof navigator !== "undefined" ? navigator.userAgent : ""
  );

  const handleInstall = async () => {
    if (isIOS) {
      setShowIOS(true);
      return;
    }
    try {
      const dp = (window as any).__openCodePWAInstalled;
      if (dp) {
        dp.prompt();
        const result = await dp.userChoice;
        if (result.outcome === "accepted") setInstalled(true);
      } else {
        setShowIOS(true);
      }
    } catch {
      setShowIOS(true);
    }
  };

  return (
    <div className="fixed bottom-[72px] left-1/2 -translate-x-1/2 z-[9999] w-[92%] max-w-[380px]">
      {!installed && !showIOS && (
        <div className="flex items-center gap-3 p-3.5 rounded-[16px] bg-[rgba(15,23,42,.92)] backdrop-blur-[12px] border border-[rgba(255,255,255,.12)] shadow-[0_12px_28px_rgba(0,0,0,.35)]">
          <div className="w-[42px] h-[42px] rounded-[10px] bg-gradient-to-br from-[#1D4ED8] to-[#FF6B35] flex items-center justify-center text-white font-black text-sm flex-shrink-0">
            JG
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-white text-xs font-extrabold truncate">Jobayer Group Career</div>
            <div className="text-[#94A3B8] text-[10px] font-semibold">PWA &bull; অফলাইনেও চলবে</div>
          </div>
          <button onClick={handleInstall} className="px-4 py-2 rounded-[10px] bg-gradient-to-r from-[#1D4ED8] to-[#2563EB] text-white text-xs font-extrabold border-none cursor-pointer shadow-[0_4px_12px_rgba(29,78,216,.3)] hover:brightness-110 transition-all">
            ⚡ ইনস্টল
          </button>
          <button onClick={() => setInstalled(true)} className="text-[#64748B] text-sm border-none bg-transparent cursor-pointer hover:text-white transition-colors">✕</button>
        </div>
      )}

      {showIOS && (
        <div className="p-4 rounded-[16px] bg-[rgba(15,23,42,.95)] backdrop-blur-[12px] border border-[rgba(255,255,255,.12)] shadow-[0_12px_28px_rgba(0,0,0,.35)]">
          <div className="flex items-start justify-between mb-2.5">
            <h4 className="text-white font-extrabold text-sm">📱 কিভাবে ইনস্টল করবেন</h4>
            <button onClick={() => setShowIOS(false)} className="text-[#64748B] text-sm border-none bg-transparent cursor-pointer hover:text-white">✕</button>
          </div>
          <p className="text-[#CBD5E1] text-xs font-semibold mb-3 leading-[1.5]">
            আপনার ব্রাউজারে নিচের ধাপগুলো ফলো করুন:
          </p>
          <div className="space-y-2">
            <div className="flex items-center gap-2.5 text-xs text-[#CBD5E1]">
              <span className="w-[26px] h-[26px] rounded-full bg-[rgba(29,78,216,.2)] flex items-center justify-center text-[#60A5FA] font-black flex-shrink-0">১</span>
              <span>শেয়ার আইকন <span className="inline-block px-2 py-0.5 rounded bg-[rgba(255,255,255,.08)] text-white font-bold">⎙</span> ট্যাপ করুন</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-[#CBD5E1]">
              <span className="w-[26px] h-[26px] rounded-full bg-[rgba(29,78,216,.2)] flex items-center justify-center text-[#60A5FA] font-black flex-shrink-0">২</span>
              <span>&ldquo;হোম স্ক্রিনে যোগ করুন&rdquo; নির্বাচন করুন</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-[#CBD5E1]">
              <span className="w-[26px] h-[26px] rounded-full bg-[rgba(29,78,216,.2)] flex items-center justify-center text-[#60A5FA] font-black flex-shrink-0">৩</span>
              <span>&ldquo;যোগ করুন&rdquo; বাটনে ক্লিক করুন ✅</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
