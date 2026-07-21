"use client";

import { useLanguageStore } from "@/lib/store";
import { Card } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { useSWRFetch } from "@/lib/use-swr-fetch";

interface LiveWorker {
  worker_id: string;
  device_type: string | null;
  browser: string | null;
  os: string | null;
  last_active: string;
}

interface SegmentRow {
  segment: string;
  count: number;
}

interface InterestRow {
  category: string;
  avgScore: number;
  workerCount: number;
}

interface EventBreakdownRow {
  event_type: string;
  count: number;
}

interface RecentEvent {
  id: number;
  worker_id: string;
  event_type: string;
  page_url: string | null;
  page_category: string | null;
  created_at: string;
}

interface ApiHealthRow {
  endpoint: string;
  status: string;
  lastCheck: string | null;
}

interface MonitorData {
  live: { count: number; workers: LiveWorker[] };
  todayStats: { sessions: number; events: number; devices: number; searches: number };
  segments: SegmentRow[];
  topInterests: InterestRow[];
  eventBreakdown: EventBreakdownRow[];
  recentEvents: RecentEvent[];
  apiHealth: ApiHealthRow[];
}

interface HealthData {
  status: string;
  timestamp: string;
  checks: Record<string, unknown>;
  healthy: boolean;
  unhealthyChecks: string[];
}

const EVENT_COLORS: Record<string, string> = {
  page_view: "bg-blue-500",
  click: "bg-green-500",
  search: "bg-purple-500",
  add_to_cart: "bg-amber-500",
  purchase: "bg-emerald-500",
  login: "bg-cyan-500",
  signup: "bg-pink-500",
};

const EVENT_ICONS: Record<string, string> = {
  page_view: "👁️",
  click: "👆",
  search: "🔍",
  add_to_cart: "🛒",
  purchase: "✅",
  login: "🔑",
  signup: "📝",
};

const SEGMENT_COLORS: Record<string, string> = {
  vip: "bg-purple-500",
  active: "bg-emerald-500",
  at_risk: "bg-amber-500",
  churned: "bg-red-500",
  new: "bg-blue-500",
  unscored: "bg-gray-400",
};

export default function TrackingMonitorPage() {
  const { lang } = useLanguageStore();
  const isBn = lang === "bn";

  const { data: monitorData, loading: monitorLoading, error: monitorError } = useSWRFetch<MonitorData>("/api/tracking/monitor", { ttlMs: 30000 });
  const { data: healthData, loading: healthLoading } = useSWRFetch<HealthData>("/api/system/health", { ttlMs: 30000 });

  const loading = monitorLoading && healthLoading;
  const md = monitorData;
  const hd = healthData;

  if (loading && !md) return (
    <div className="min-h-screen py-24 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto space-y-4">
        <Skeleton className="h-8 w-64" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-24 rounded-2xl" />)}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Skeleton className="h-64 rounded-2xl" />
          <Skeleton className="h-64 rounded-2xl" />
        </div>
      </div>
    </div>
  );

  if (monitorError && !md) return (
    <div className="min-h-screen py-24 px-4 bg-gray-50 flex items-center justify-center">
      <p className="text-red-500">{isBn ? "ডেটা লোড করতে ব্যর্থ" : "Failed to load data"}</p>
    </div>
  );

  const totalSegmentCount = md?.segments?.reduce((s, r) => s + r.count, 0) || 1;

  return (
    <div className="min-h-screen py-24 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-2 mb-1">
          <h1 className="text-2xl font-bold text-primary">
            {isBn ? "📡 ট্র্যাকিং মনিটর" : "📡 Tracking Monitor"}
          </h1>
          {md?.live && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              {md.live.count} {isBn ? "সক্রিয়" : "Live"}
            </span>
          )}
        </div>
        <p className="text-sm text-text-secondary mt-1">
          {isBn ? "রিয়েল-টাইম ইউজার ট্র্যাকিং ও অ্যানালিটিক্স ড্যাশবোর্ড" : "Real-time user tracking & analytics dashboard"}
        </p>

        {/* Live Users Bar */}
        {md?.live && md.live.workers.length > 0 && (
          <Card className="!p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm font-bold text-text">
                {isBn ? "সাম্প্রতিক সক্রিয় ইউজার" : "Recently Active Users"}
              </span>
              <span className="text-xs text-text-secondary">({md.live.count})</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {md.live.workers.slice(0, 10).map((w) => (
                <div key={w.worker_id} className="flex items-center gap-1.5 px-2.5 py-1.5 bg-gray-50 rounded-lg border border-border/60 text-xs">
                  <span className="text-base">{w.device_type === "mobile" ? "📱" : w.device_type === "tablet" ? "📟" : "💻"}</span>
                  <span className="font-mono font-medium text-primary truncate max-w-[100px]">{w.worker_id}</span>
                  <span className="text-text-secondary">{w.browser || "—"}</span>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Today Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: isBn ? "সেশন" : "Sessions", value: md?.todayStats.sessions ?? 0, color: "from-blue-500 to-blue-600", icon: "🔄" },
            { label: isBn ? "ইভেন্ট" : "Events", value: md?.todayStats.events ?? 0, color: "from-purple-500 to-purple-600", icon: "⚡" },
            { label: isBn ? "ডিভাইস" : "Devices", value: md?.todayStats.devices ?? 0, color: "from-emerald-500 to-emerald-600", icon: "📱" },
            { label: isBn ? "সার্চ" : "Searches", value: md?.todayStats.searches ?? 0, color: "from-amber-500 to-amber-600", icon: "🔍" },
          ].map((stat) => (
            <Card key={stat.label} className={`bg-gradient-to-br ${stat.color} !p-4`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-white/80 font-medium uppercase tracking-wider">{stat.label}</p>
                  <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                </div>
                <span className="text-2xl opacity-60">{stat.icon}</span>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Segment Distribution */}
          <Card>
            <h3 className="text-sm font-bold text-text mb-4">
              {isBn ? "সেগমেন্ট ডিস্ট্রিবিউশন" : "Segment Distribution"}
            </h3>
            {md?.segments && md.segments.length > 0 ? (
              <div className="space-y-3">
                {md.segments.map((seg) => {
                  const pct = Math.round((seg.count / totalSegmentCount) * 100);
                  return (
                    <div key={seg.segment}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium text-text capitalize">{seg.segment}</span>
                        <span className="text-text-secondary text-xs">{seg.count} ({pct}%)</span>
                      </div>
                      <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${SEGMENT_COLORS[seg.segment] || "bg-gray-500"}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-sm text-text-secondary">{isBn ? "কোনো ডাটা নেই" : "No data"}</p>
            )}
          </Card>

          {/* Top Interest Categories */}
          <Card>
            <h3 className="text-sm font-bold text-text mb-4">
              {isBn ? "শীর্ষ আগ্রহের ক্যাটাগরি" : "Top Interest Categories"}
            </h3>
            {md?.topInterests && md.topInterests.length > 0 ? (
              <div className="space-y-2.5">
                {md.topInterests.map((int, i) => {
                  const maxScore = md.topInterests[0]?.avgScore || 1;
                  const barW = Math.max(5, (int.avgScore / maxScore) * 100);
                  return (
                    <div key={int.category} className="flex items-center gap-3">
                      <span className="w-5 text-xs font-bold text-text-secondary text-right shrink-0">{i + 1}</span>
                      <div className="flex-1">
                        <div className="flex justify-between text-xs mb-0.5">
                          <span className="font-medium text-text truncate">{int.category.replace(/_/g, " ")}</span>
                          <span className="text-text-secondary">{int.avgScore}%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full rounded-full bg-gradient-to-r from-primary to-accent" style={{ width: `${barW}%` }} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-sm text-text-secondary">{isBn ? "কোনো ডাটা নেই" : "No data"}</p>
            )}
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Event Type Breakdown */}
          <Card>
            <h3 className="text-sm font-bold text-text mb-4">
              {isBn ? "ইভেন্ট টাইপ (৭ দিন)" : "Event Breakdown (7 days)"}
            </h3>
            {md?.eventBreakdown && md.eventBreakdown.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {md.eventBreakdown.map((ev) => {
                  const maxCount = md.eventBreakdown[0]?.count || 1;
                  const pct = Math.round((ev.count / maxCount) * 100);
                  return (
                    <div key={ev.event_type} className="bg-gray-50 rounded-xl p-3 text-center border border-border/40">
                      <div className="text-xl mb-1">{EVENT_ICONS[ev.event_type] || "•"}</div>
                      <div className="text-lg font-bold text-text">{ev.count}</div>
                      <div className="text-[10px] text-text-secondary font-medium capitalize">{ev.event_type.replace(/_/g, " ")}</div>
                      <div className="mt-1.5 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${EVENT_COLORS[ev.event_type] || "bg-gray-500"}`} style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-sm text-text-secondary">{isBn ? "কোনো ইভেন্ট নেই" : "No events"}</p>
            )}
          </Card>

          {/* Recent Events Feed */}
          <Card>
            <h3 className="text-sm font-bold text-text mb-4">
              {isBn ? "সাম্প্রতিক ইভেন্ট" : "Recent Events"}
              <span className="text-xs text-text-secondary font-normal ml-2">({md?.recentEvents?.length || 0})</span>
            </h3>
            {md?.recentEvents && md.recentEvents.length > 0 ? (
              <div className="space-y-1 max-h-[400px] overflow-y-auto">
                {md.recentEvents.map((ev) => (
                  <div key={ev.id} className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition-all">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm shrink-0 ${EVENT_COLORS[ev.event_type] || "bg-gray-500"} bg-opacity-20`}>
                      <span className="opacity-80">{EVENT_ICONS[ev.event_type] || "•"}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-medium text-primary truncate">{ev.worker_id}</span>
                        <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold capitalize ${EVENT_COLORS[ev.event_type] ? "text-white " + EVENT_COLORS[ev.event_type] : "bg-gray-200 text-gray-700"}`}>
                          {ev.event_type.replace(/_/g, " ")}
                        </span>
                      </div>
                      {ev.page_url && <p className="text-[11px] text-text-secondary truncate mt-0.5">{ev.page_url}</p>}
                      <p className="text-[10px] text-gray-400 mt-0.5">
                        {new Date(ev.created_at).toLocaleString(isBn ? "bn-BD" : "en-US")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-text-secondary">{isBn ? "কোনো ইভেন্ট নেই" : "No events"}</p>
            )}
          </Card>
        </div>

        {/* API Health Status */}
        <Card>
          <h3 className="text-sm font-bold text-text mb-4">
            {isBn ? "এপিআই হেলথ স্ট্যাটাস" : "API Health Status"}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { endpoint: "/api/track/event", label: isBn ? "ইভেন্ট ট্র্যাকিং" : "Event Tracking" },
              { endpoint: "/api/track/session", label: isBn ? "সেশন ট্র্যাকিং" : "Session Tracking" },
              { endpoint: "/api/track/device", label: isBn ? "ডিভাইস ট্র্যাকিং" : "Device Tracking" },
              { endpoint: "/api/track/search", label: isBn ? "সার্চ ট্র্যাকিং" : "Search Tracking" },
              { endpoint: "/api/track/score", label: isBn ? "স্কোরিং" : "Scoring" },
              { endpoint: "/api/system/health", label: isBn ? "সিস্টেম হেলথ" : "System Health" },
            ].map((ep) => {
              const health = md?.apiHealth?.find((h) => h.endpoint === ep.endpoint);
              const isHealthy = hd?.status === "healthy";
              const status = health?.status || "unknown";
              return (
                <div key={ep.endpoint} className="flex items-center gap-3 p-3 rounded-xl border border-border/60 bg-gray-50/50">
                  <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${status === "active" ? "bg-green-500" : status === "no_data" ? "bg-amber-400" : "bg-red-400"}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-text truncate">{ep.label}</p>
                    <p className="text-[10px] text-text-secondary font-mono">{ep.endpoint}</p>
                    {health?.lastCheck && (
                      <p className="text-[10px] text-gray-400 mt-0.5">
                        {new Date(health.lastCheck).toLocaleString(isBn ? "bn-BD" : "en-US")}
                      </p>
                    )}
                  </div>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full capitalize ${
                    status === "active" ? "bg-green-100 text-green-700" :
                    status === "no_data" ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"
                  }`}>
                    {status === "active" ? (isBn ? "সক্রিয়" : "Active") :
                     status === "no_data" ? (isBn ? "কোনো ডাটা নেই" : "No Data") : "Unknown"}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-xs text-text-secondary">
            <span>
              {isBn ? "সিস্টেম স্ট্যাটাস" : "System Status"}: {" "}
              <span className={`font-bold ${hd?.status === "healthy" ? "text-green-600" : hd?.status === "degraded" ? "text-amber-600" : "text-red-600"}`}>
                {hd?.status === "healthy" ? (isBn ? "সুস্থ" : "Healthy") :
                 hd?.status === "degraded" ? (isBn ? "দুর্বল" : "Degraded") :
                 hd?.status === "down" ? (isBn ? "ডাউন" : "Down") : "—"}
              </span>
            </span>
            <span>{hd?.timestamp ? new Date(hd.timestamp).toLocaleString(isBn ? "bn-BD" : "en-US") : "—"}</span>
          </div>
        </Card>
      </div>
    </div>
  );
}
