"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function OfflinePage() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    setIsOnline(navigator.onLine);
    const onl = () => setIsOnline(true);
    const off = () => setIsOnline(false);
    window.addEventListener("online", onl);
    window.addEventListener("offline", off);
    return () => {
      window.removeEventListener("online", onl);
      window.removeEventListener("offline", off);
    };
  }, []);

  if (isOnline && typeof window !== "undefined") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">📶</div>
          <h1 className="text-2xl font-bold text-primary mb-2">You&apos;re Back Online!</h1>
          <p className="text-text-secondary mb-6">Your connection has been restored.</p>
          <Link href="/" className="px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-all">
            Go to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-4">📵</div>
        <h1 className="text-2xl font-bold text-primary mb-2">You&apos;re Offline</h1>
        <p className="text-text-secondary mb-2">Please check your internet connection and try again.</p>
        <p className="text-sm text-text-secondary mb-6">Some pages may still be available from cache.</p>
        <Link href="/" className="px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-all">
          Try Home Page
        </Link>
      </div>
    </div>
  );
}
