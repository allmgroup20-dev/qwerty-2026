"use client";

import { useEffect, useRef, useCallback } from "react";

let sessionId = "";
let pageEnterTime = 0;
let currentPath = "";

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function getDeviceInfo(): string {
  if (typeof window === "undefined") return "{}";
  return JSON.stringify({
    w: window.innerWidth,
    h: window.innerHeight,
    dt: /Mobi|Android/i.test(navigator.userAgent) ? "m" : /Tablet|iPad/i.test(navigator.userAgent) ? "t" : "d",
    la: navigator.language,
    tz: Intl.DateTimeFormat().resolvedOptions().timeZone,
  });
}

function getWorkerId(): string {
  try {
    return localStorage.getItem("worker_id") || "";
  } catch {
    return "";
  }
}

async function sendEvent(data: Record<string, unknown>) {
  try {
    const payload: Record<string, unknown> = {
      ...data,
      deviceInfo: getDeviceInfo(),
      sessionId,
      workerId: getWorkerId(),
    };
    fetch("/api/track/event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {});
  } catch {}
}

export function trackEvent(
  eventType: string,
  extra?: Record<string, unknown>
) {
  const timeOnPage = pageEnterTime > 0 ? Math.round((Date.now() - pageEnterTime) / 1000) : 0;
  sendEvent({ eventType, timeSpentSeconds: timeOnPage, ...extra });
}

export function useTracker() {
  const pathRef = useRef(currentPath);

  const trackPageView = useCallback(() => {
    const path = window.location.pathname + window.location.search;
    if (path === pathRef.current) return;
    pathRef.current = path;
    currentPath = path;
    pageEnterTime = Date.now();

    let pageCategory = "";
    const segments = path.split("/").filter(Boolean);
    if (segments.length > 0) {
      const first = segments[0];
      pageCategory = ["courses", "products", "product-list"].includes(first)
        ? first
        : ["dashboard", "company"].includes(first)
        ? "app"
        : first;
    }

    sendEvent({
      eventType: "page_view",
      pageUrl: path,
      pageCategory,
      timeSpentSeconds: 0,
    });
  }, []);

  useEffect(() => {
    const stored = sessionStorage.getItem("tsid");
    if (stored) {
      sessionId = stored;
    } else {
      sessionId = generateId();
      sessionStorage.setItem("tsid", sessionId);
    }
    pageEnterTime = Date.now();
    currentPath = window.location.pathname;

    trackPageView();

    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        pageEnterTime = Date.now();
        trackPageView();
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [trackPageView]);

  useEffect(() => {
    const origPushState = history.pushState.bind(history);
    const origReplaceState = history.replaceState.bind(history);

    history.pushState = function (data: unknown, unused: string, url?: string | URL | null) {
      origPushState(data, unused, url);
      trackPageView();
    };
    history.replaceState = function (data: unknown, unused: string, url?: string | URL | null) {
      origReplaceState(data, unused, url);
      trackPageView();
    };

    window.addEventListener("popstate", trackPageView);

    return () => {
      window.removeEventListener("popstate", trackPageView);
    };
  }, [trackPageView]);
}
