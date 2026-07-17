"use client";

import { useEffect } from "react";

export function CookieConsentBanner() {
  useEffect(() => {
    const consented = localStorage.getItem("cookie_consent");
    if (!consented) {
      localStorage.setItem("cookie_consent", "accepted");
      const workerId = localStorage.getItem("worker_id");
      if (workerId) {
        fetch("/api/privacy/consent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ workerId, consentType: "cookies", isGranted: true }),
        }).catch(() => {});
      }
    }
  }, []);

  return null;
}
