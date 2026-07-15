"use client";

import { useEffect } from "react";
import { useLanguageStore } from "@/lib/store";

export default function WhatsAppConnectPage() {
  const { lang } = useLanguageStore();

  useEffect(() => {
    const accountId = new URLSearchParams(window.location.search).get("account") || "web_main";
    localStorage.setItem("wa_account_id", accountId);
    window.location.href = "/wa-connector/";
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="text-4xl mb-4 animate-bounce">📱</div>
        <div className="text-text-secondary text-sm">
          {lang === "bn" ? "কানেক্টর পেজে রিডাইরেক্ট হচ্ছে..." : "Redirecting to connector..."}
        </div>
      </div>
    </div>
  );
}
