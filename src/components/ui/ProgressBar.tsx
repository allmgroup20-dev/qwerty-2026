"use client";
import { useEffect, useState } from "react";

export function ProgressBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const show = () => { setVisible(true); clearTimeout(timer); };
    const hide = () => { timer = setTimeout(() => setVisible(false), 300); };

    const originalFetch = window.fetch;
    window.fetch = function (...args) {
      show();
      return originalFetch.apply(this, args).finally(hide);
    };

    const originalPushState = history.pushState;
    history.pushState = function (...args) {
      show();
      const result = originalPushState.apply(this, args);
      setTimeout(hide, 500);
      return result;
    };

    return () => {
      window.fetch = originalFetch;
      history.pushState = originalPushState;
      clearTimeout(timer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-[9999] bg-gray-200 overflow-hidden">
      <div className="h-full w-full bg-gradient-to-r from-action via-accent to-secondary animate-progress" />
    </div>
  );
}
