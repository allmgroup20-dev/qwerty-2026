"use client";

export function reportClientError(
  error: unknown,
  source: string = "client",
  extra?: Record<string, unknown>
) {
  const err = error instanceof Error ? error : new Error(String(error));
  const payload: Record<string, unknown> = {
    logType: "error",
    source,
    message: err.message,
    stackTrace: err.stack || "",
    route: window.location.pathname,
    details: extra ? JSON.stringify(extra) : undefined,
    method: "client",
  };
  try {
    navigator.sendBeacon("/api/system/logs", JSON.stringify(payload));
  } catch {
    fetch("/api/system/logs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {});
  }
}

export function initGlobalErrorReporter() {
  if (typeof window === "undefined") return;

  window.addEventListener("error", (event) => {
    reportClientError(event.error || event.message, "window.onerror", {
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
    });
  });

  window.addEventListener("unhandledrejection", (event) => {
    reportClientError(event.reason, "unhandledrejection");
  });
}
