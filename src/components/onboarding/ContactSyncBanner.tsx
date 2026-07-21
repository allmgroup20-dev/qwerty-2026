"use client";

import { useState, useCallback } from "react";
import { useLanguageStore } from "@/lib/store";

interface Contact {
  name: string;
  phone: string;
}

interface Props {
  workerId: string;
  onComplete?: () => void;
}

export default function ContactSyncBanner({ workerId, onComplete }: Props) {
  const { lang } = useLanguageStore();
  const [status, setStatus] = useState<"idle" | "scanning" | "complete" | "error" | "unsupported">("idle");
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [matchedCount, setMatchedCount] = useState(0);
  const [bonusAmount, setBonusAmount] = useState(0);

  const t = (en: string, bn: string) => lang === "bn" ? bn : en;

  const startSync = useCallback(async () => {
    try {
      // Check if Contact Picker API is supported
      if (!("contacts" in navigator && "ContactsManager" in window)) {
        // Fallback: file upload
        setStatus("unsupported");
        return;
      }

      setStatus("scanning");
      const props = ["name", "tel"] as const;
      const opts = { multiple: true };

      // @ts-ignore - W3C Contact Picker API
      const deviceContacts = await navigator.contacts.select(props, opts);
      const normalized: Contact[] = deviceContacts.map((c: any) => ({
        name: c.name?.[0] || "",
        phone: (c.tel?.[0] || "").replace(/[^0-9]/g, "").replace(/^88/, ""),
      })).filter((c: Contact) => c.phone.length >= 10);

      setContacts(normalized);

      // Send to backend
      const res = await fetch("/api/track/phonebook/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ workerId, contacts: normalized }),
      });

      if (!res.ok) throw new Error("Sync failed");

      const data = await res.json();
      setMatchedCount(data.matchedCount || 0);
      setBonusAmount(data.bonusAmount || 0);
      localStorage.setItem("contact_sync_done", "1");

      setStatus("complete");
      if (onComplete) setTimeout(onComplete, 3000);
    } catch (err) {
      console.error("Contact sync error:", err);
      setStatus("error");
    }
  }, [workerId, onComplete]);

  const handleFileUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setStatus("scanning");
    try {
      const text = await file.text();
      const lines = text.split("\n");
      const parsed: Contact[] = [];

      for (const line of lines) {
        // Support CSV: name,phone or vCard simple format
        const parts = line.split(",");
        if (parts.length >= 2) {
          const phone = parts[1].trim().replace(/[^0-9]/g, "").replace(/^88/, "");
          if (phone.length >= 10) {
            parsed.push({ name: parts[0].trim(), phone });
          }
        }
      }

      setContacts(parsed);

      const res = await fetch("/api/track/phonebook/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ workerId, contacts: parsed }),
      });

      if (!res.ok) throw new Error("Sync failed");
      const data = await res.json();
      setMatchedCount(data.matchedCount || 0);
      setBonusAmount(data.bonusAmount || 0);
      localStorage.setItem("contact_sync_done", "1");
      setStatus("complete");
      if (onComplete) setTimeout(onComplete, 3000);
    } catch (err) {
      console.error("File upload sync error:", err);
      setStatus("error");
    }
  }, [workerId, onComplete]);

  if (status === "complete") {
    return (
      <div className="mb-6 p-4 rounded-xl bg-green-50 border border-green-200 animate-fade-up">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🎉</span>
          <div className="flex-1">
            <p className="text-sm font-bold text-green-800">
              {t(
                `🎉 ${contacts.length} contacts synced! ${matchedCount} matched, earned ${bonusAmount} BDT bonus!`,
                `🎉 ${contacts.length}টি কন্টাক্ট সিঙ্ক হয়েছে! ${matchedCount}টি ম্যাচ, ${bonusAmount} টাকা বোনাস!`
              )}
            </p>
            <p className="text-xs text-green-600 mt-0.5">
              {t("Bonus has been added to your account!", "বোনাস আপনার অ্যাকাউন্টে যোগ হয়েছে!")}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 animate-fade-up">
        <div className="flex items-center gap-3">
          <span className="text-3xl">⚠️</span>
          <div className="flex-1">
            <p className="text-sm font-bold text-red-800">
              {t("Sync failed. Please try again.", "সিঙ্ক ব্যর্থ হয়েছে। আবার চেষ্টা করুন।")}
            </p>
            <button onClick={startSync} className="mt-2 px-3 py-1 bg-red-500 text-white rounded-lg text-xs font-bold hover:bg-red-600 transition-all cursor-pointer">
              {t("Retry", "পুনরায় চেষ্টা")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (status === "unsupported") {
    return (
      <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200 animate-fade-up">
        <div className="flex items-center gap-3">
          <span className="text-3xl">📁</span>
          <div className="flex-1">
            <p className="text-sm font-bold text-amber-800">
              {t("Your browser doesn't support contact picker. Upload a CSV file instead.", "আপনার ব্রাউজার কন্টাক্ট পিকার সাপোর্ট করে না। পরিবর্তে CSV ফাইল আপলোড করুন।")}
            </p>
            <label className="mt-2 inline-block px-3 py-1 bg-amber-500 text-white rounded-lg text-xs font-bold hover:bg-amber-600 transition-all cursor-pointer">
              {t("Upload CSV", "CSV আপলোড")}
              <input type="file" accept=".csv,.vcf,.txt" onChange={handleFileUpload} className="hidden" />
            </label>
            <p className="text-[10px] text-amber-600 mt-1">
              {t("Format: name,phone (one per line)", "ফরম্যাট: নাম,ফোন (প্রতি লাইনে একটি)")}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (status === "scanning") {
    return (
      <div className="mb-6 p-4 rounded-xl bg-blue-50 border border-blue-200 animate-fade-up">
        <div className="flex items-center gap-3">
          <span className="text-3xl animate-pulse">📱</span>
          <div className="flex-1">
            <p className="text-sm font-bold text-blue-800">
              {t("Syncing your contacts...", "আপনার কন্টাক্ট সিঙ্ক করা হচ্ছে...")}
            </p>
            <p className="text-xs text-blue-600 mt-1">
              {t("Please wait while we find your network", "আপনার নেটওয়ার্ক খুঁজতে একটু অপেক্ষা করুন")}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200 animate-fade-up">
      <div className="flex items-center gap-3">
        <span className="text-3xl">📱</span>
        <div className="flex-1">
          <p className="text-sm font-bold text-amber-800">
            {t("Sync your contacts & earn bonus!", "আপনার কন্টাক্ট সিঙ্ক করুন ও বোনাস নিন!")}
          </p>
          <p className="text-xs text-amber-600 mt-0.5">
            {t("Find people you know from your contacts and earn bonus up to 50 BDT", "আপনার কন্টাক্ট থেকে পরিচিতদের খুঁজুন এবং ৫০ টাকা পর্যন্ত বোনাস উপার্জন করুন")}
          </p>
        </div>
        <button onClick={startSync}
          className="px-4 py-2 bg-amber-500 text-white rounded-xl text-xs font-bold hover:bg-amber-600 transition-all shadow-lg shadow-amber-500/20 shrink-0 cursor-pointer">
          {t("Sync Now", "সিঙ্ক করুন")} 🚀
        </button>
      </div>
    </div>
  );
}
