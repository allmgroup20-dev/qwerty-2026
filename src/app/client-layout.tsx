"use client";

import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import BottomNav from "@/components/layout/BottomNav";
import Footer from "@/components/layout/Footer";
import SmartInstall from "@/components/home/SmartInstall";
import { useLanguageStore } from "@/lib/store";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const { lang } = useLanguageStore();

  useEffect(() => {
    document.documentElement.lang = lang;
    document.cookie = `lang=${lang};path=/;max-age=31536000`;
  }, [lang]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <BottomNav />
      <SmartInstall />
    </>
  );
}
