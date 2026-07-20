"use client";

import { useState } from "react";
import { useLanguageStore } from "@/lib/store";
import OverviewTab from "@/components/analytics/OverviewTab";
import EventsTab from "@/components/analytics/EventsTab";
import SessionsTab from "@/components/analytics/SessionsTab";
import FunnelTab from "@/components/analytics/FunnelTab";
import SegmentsTab from "@/components/analytics/SegmentsTab";

const TABS = ["Overview", "Events", "Sessions", "Funnel", "Segments"] as const;
type Tab = (typeof TABS)[number];

export default function CompanyAnalyticsPage() {
  const { lang } = useLanguageStore();
  const [activeTab, setActiveTab] = useState<Tab>("Overview");

  return (
    <div className="min-h-screen py-24 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-primary">{lang === "bn" ? "অ্যানালিটিক্স" : "Analytics"}</h1>
          <p className="text-sm text-text-secondary mt-1">
            {lang === "bn" ? "ব্যবহারকারীর আচরণ, ইভেন্ট লগ, সেশন, ফানেল বিশ্লেষণ ও সেগমেন্ট" : "User behavior, event logs, sessions, funnel analysis & segments"}
          </p>
        </div>

        <div className="bg-gray-100 p-1 rounded-xl flex gap-1 mb-8 overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all whitespace-nowrap ${
                activeTab === tab
                  ? "bg-white text-primary shadow-sm"
                  : "text-text-secondary hover:text-primary"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "Overview" && <OverviewTab />}
        {activeTab === "Events" && <EventsTab />}
        {activeTab === "Sessions" && <SessionsTab />}
        {activeTab === "Funnel" && <FunnelTab />}
        {activeTab === "Segments" && <SegmentsTab />}
      </div>
    </div>
  );
}
