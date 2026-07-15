"use client";

import { useState, useEffect } from "react";
import { useLanguageStore } from "@/lib/store";

export default function WhatsAppDashboardPage() {
  const { lang } = useLanguageStore();
  const [accounts, setAccounts] = useState<any[]>([]);
  const [warmups, setWarmups] = useState<any[]>([]);
  const [queueStats, setQueueStats] = useState({ queued: 0, sent: 0, failed: 0, pending: 0 });
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const [accRes, queueRes] = await Promise.all([
        fetch("/api/whatsapp/accounts"),
        fetch("/api/whatsapp/queue"),
      ]);
      const accData = await accRes.json() as { accounts?: any[]; warmups?: any[] };
      const queueData = await queueRes.json() as { queued?: number; sent?: number; failed?: number; pending?: number };
      if (accData.accounts) setAccounts(accData.accounts);
      if (accData.warmups) setWarmups(accData.warmups);
      const webAccount = (accData.accounts || []).find((a: any) => a.provider === "web");
      let pendingCount = 0;
      if (webAccount) {
        try {
          const pRes = await fetch(`/api/whatsapp/queue?account_id=${webAccount.account_id}`);
          const pData = await pRes.json() as { pending?: unknown[] };
          pendingCount = (pData.pending || []).length;
        } catch {}
      }
      setQueueStats({
        queued: queueData.queued ?? 0,
        sent: queueData.sent ?? 0,
        failed: queueData.failed ?? 0,
        pending: pendingCount,
      });
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const handleAction = async (action: string, accountId?: string, extra?: any) => {
    await fetch("/api/whatsapp/accounts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, accountId, ...extra }),
    });
    loadData();
  };

  const handleQueueAction = async (action: string) => {
    await fetch("/api/whatsapp/queue", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action }),
    });
    loadData();
  };

  const webAccount = accounts.find((a: any) => a.provider === "web");

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-text-secondary text-sm">Loading...</div>
    </div>
  );

  return (
    <div className="py-24 px-4 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-primary">
          {lang === "bn" ? "হোয়াটসঅ্যাপ ড্যাশবোর্ড" : "WhatsApp Dashboard"}
        </h1>
        <p className="text-sm text-text-secondary mt-1">
          {lang === "bn" ? "হোয়াটসঅ্যাপ ম্যানেজমেন্ট সিস্টেম" : "WhatsApp management system"}
        </p>
      </div>

      {/* Web Connector Card */}
      <div className="card p-6 mb-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📱</span>
            <div>
              <h2 className="font-bold text-base text-primary">
                {lang === "bn" ? "WhatsApp Web Connector" : "WhatsApp Web Connector"}
              </h2>
              <p className="text-xs text-text-secondary mt-0.5">
                {lang === "bn"
                  ? "কোনো API কী লাগবে না — শুধু QR স্ক্যান করে কানেক্ট করুন"
                  : "No API key needed — just scan QR to connect"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {webAccount ? (
              <>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                  webAccount.has_session ? "bg-green-50 text-green-700" : "bg-yellow-50 text-yellow-700"
                }`}>
                  {webAccount.has_session
                    ? (lang === "bn" ? "✅ সেশন আছে" : "✅ Session saved")
                    : (lang === "bn" ? "⚪ কানেক্ট করা হয়নি" : "⚪ Not connected")}
                </span>
                <a
                  href={`/company/whatsapp/connect?account=${webAccount.account_id}`}
                  className="px-4 py-2 text-sm font-medium bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors"
                >
                  {lang === "bn" ? "🔗 কানেক্ট" : "🔗 Connect"}
                </a>
                <button
                  onClick={() => handleAction("remove", webAccount.account_id)}
                  className="px-3 py-2 text-xs font-medium text-red-600 bg-red-50 rounded-xl hover:bg-red-100 transition-colors"
                >
                  {lang === "bn" ? "মুছুন" : "Remove"}
                </button>
              </>
            ) : (
              <>
                <span className="text-xs text-text-secondary">
                  {lang === "bn" ? "কোনো Web অ্যাকাউন্ট নেই" : "No web account"}
                </span>
                <button
                  onClick={() => handleAction("add", undefined, { provider: "web", accountId: "web_main" })}
                  className="px-4 py-2 text-sm font-medium bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors"
                >
                  + {lang === "bn" ? "অ্যাকাউন্ট তৈরি" : "Create Account"}
                </button>
              </>
            )}
          </div>
        </div>
        {webAccount && (
          <div className="mt-4 grid grid-cols-3 gap-3 text-center text-sm">
            <div className="bg-gray-50 rounded-xl p-3">
              <div className="text-lg font-bold text-primary">{queueStats.pending}</div>
              <div className="text-xs text-text-secondary">{lang === "bn" ? "অপেক্ষমান" : "Pending"}</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <div className="text-lg font-bold text-green-600">{webAccount.total_sent || 0}</div>
              <div className="text-xs text-text-secondary">{lang === "bn" ? "পাঠানো" : "Sent"}</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <div className="text-lg font-bold text-purple-600">{webAccount.has_session ? "🟢" : "⚪"}</div>
              <div className="text-xs text-text-secondary">{lang === "bn" ? "স্ট্যাটাস" : "Status"}</div>
            </div>
          </div>
        )}
      </div>

      {/* Queue Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="card p-5">
          <div className="text-sm text-text-secondary">{lang === "bn" ? "কিউতে" : "Queued"}</div>
          <div className="text-2xl font-bold text-primary mt-1">{queueStats.queued}</div>
        </div>
        <div className="card p-5">
          <div className="text-sm text-text-secondary">{lang === "bn" ? "পাঠানো" : "Sent"}</div>
          <div className="text-2xl font-bold text-action mt-1">{queueStats.sent}</div>
        </div>
        <div className="card p-5">
          <div className="text-sm text-text-secondary">{lang === "bn" ? "ব্যর্থ" : "Failed"}</div>
          <div className="text-2xl font-bold text-red-600 mt-1">{queueStats.failed}</div>
        </div>
      </div>

      {/* Accounts + Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="card p-6">
          <h2 className="font-bold text-lg text-primary mb-4">
            {lang === "bn" ? "অ্যাকাউন্টসমূহ" : "Accounts"}
          </h2>
          {accounts.length === 0 ? (
            <div className="text-sm text-text-secondary py-8 text-center">
              {lang === "bn" ? "কোনো অ্যাকাউন্ট নেই" : "No accounts configured"}
            </div>
          ) : (
            <div className="space-y-3">
              {accounts.map((acc: any) => {
                const warmup = warmups.find((w: any) => w.account_id === acc.account_id);
                return (
                  <div key={acc.id} className="p-4 rounded-xl border border-border">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-primary">{acc.account_id}</span>
                          {acc.provider === "web" && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-50 text-blue-600 font-medium">
                              Web
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-text-secondary">{acc.phone || "No phone"} · {acc.provider}</div>
                        <div className="text-xs text-text-secondary mt-1">
                          {warmup ? `${lang === "bn" ? "দিন" : "Day"} ${warmup.day_count} · ${lang === "bn" ? "লিমিট" : "Limit"}: ${acc.daily_sent}/${acc.daily_limit}` : ""}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${acc.status === 'connected' ? 'bg-action' : acc.status === 'disconnected' ? 'bg-red-400' : 'bg-yellow-400'}`} />
                        <span className="text-xs text-text-secondary">{acc.status}</span>
                        {acc.provider !== "web" && (
                          <button onClick={() => handleAction(acc.status === 'connected' ? 'disconnect' : 'connect', acc.account_id)} className="text-xs text-primary underline">
                            {acc.status === 'connected' ? (lang === "bn" ? "বন্ধ" : "Disconnect") : (lang === "bn" ? "চালু" : "Connect")}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-lg text-primary">{lang === "bn" ? "মেসেজ কিউ" : "Message Queue"}</h2>
            <div className="flex gap-2">
              <button onClick={() => handleQueueAction("flush")} className="px-3 py-1.5 text-xs font-medium bg-action/10 text-action rounded-xl hover:bg-action/20">
                {lang === "bn" ? "পাঠাও" : "Flush"}
              </button>
              <button onClick={() => handleQueueAction("retry_failed")} className="px-3 py-1.5 text-xs font-medium bg-orange-50 text-orange-600 rounded-xl hover:bg-orange-100">
                {lang === "bn" ? "পুনরায়" : "Retry"}
              </button>
              <button onClick={() => handleQueueAction("clear_failed")} className="px-3 py-1.5 text-xs font-medium bg-red-50 text-red-600 rounded-xl hover:bg-red-100">
                {lang === "bn" ? "মুছুন" : "Clear"}
              </button>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 rounded-xl bg-gray-50">
              <span className="text-sm text-primary">{lang === "bn" ? "কিউতে অপেক্ষমান" : "Waiting in queue"}</span>
              <span className="font-bold text-lg text-primary">{queueStats.queued}</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-xl bg-gray-50">
              <span className="text-sm text-primary">{lang === "bn" ? "পাঠানো হয়েছে" : "Successfully sent"}</span>
              <span className="font-bold text-lg text-action">{queueStats.sent}</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-xl bg-gray-50">
              <span className="text-sm text-primary">{lang === "bn" ? "ব্যর্থ হয়েছে" : "Failed"}</span>
              <span className="font-bold text-lg text-red-600">{queueStats.failed}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card p-6">
        <h2 className="font-bold text-lg text-primary mb-4">
          {lang === "bn" ? "কুইক অ্যাকশন" : "Quick Actions"}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <a href="/company/whatsapp-contacts" className="p-4 rounded-xl bg-blue-50 text-blue-700 text-sm font-medium text-center hover:bg-blue-100 transition-colors">
            📇 {lang === "bn" ? "কন্ট্যাক্ট" : "Contacts"}
          </a>
          <a href="/company/whatsapp-campaigns" className="p-4 rounded-xl bg-green-50 text-green-700 text-sm font-medium text-center hover:bg-green-100 transition-colors">
            📢 {lang === "bn" ? "ক্যাম্পেইন" : "Campaigns"}
          </a>
          <a href="/company/whatsapp-numbers" className="p-4 rounded-xl bg-purple-50 text-purple-700 text-sm font-medium text-center hover:bg-purple-100 transition-colors">
            🔢 {lang === "bn" ? "নাম্বার জেনারেটর" : "Number Tools"}
          </a>
          <a href="/company/ai-settings" className="p-4 rounded-xl bg-indigo-50 text-indigo-700 text-sm font-medium text-center hover:bg-indigo-100 transition-colors">
            🤖 {lang === "bn" ? "এআই সেটিংস" : "AI Settings"}
          </a>
        </div>
      </div>
    </div>
  );
}
