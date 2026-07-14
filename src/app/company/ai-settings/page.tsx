"use client";

import { useState, useEffect } from "react";
import { useLanguageStore } from "@/lib/store";

interface Model {
  model_id: string;
  name: string;
  tier: number;
  is_active: number;
  provider: string;
  exhausted: boolean;
}

interface ApiKey {
  id: number;
  key_value: string;
  provider: string;
  is_active: boolean;
  created_at: string;
}

interface FailoverState {
  exhausted_models: string;
  total_responses: number;
  today_responses: number;
}

export default function AISettingsPage() {
  const { lang } = useLanguageStore();
  const [models, setModels] = useState<Model[]>([]);
  const [state, setState] = useState<FailoverState | null>(null);
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [newKeyValue, setNewKeyValue] = useState("");
  const [newKeyProvider, setNewKeyProvider] = useState<"openrouter" | "opencode">("openrouter");
  const [msg, setMsg] = useState("");

  const loadData = async () => {
    try {
      const res = await fetch("/api/ai/models");
      const data = await res.json() as {
        models?: Model[]; failoverState?: FailoverState;
        keys?: ApiKey[];
      };
      if (data.models) setModels(data.models);
      if (data.failoverState) setState(data.failoverState);
      if (data.keys) setKeys(data.keys);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const toggleModel = async (modelId: string) => {
    setMsg("");
    try {
      const res = await fetch("/api/ai/models", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "toggle_model", modelId }),
      });
      if (res.ok) loadData();
      else setMsg("Failed to toggle model");
    } catch { setMsg("Error toggling model"); }
  };

  const addKey = async () => {
    if (!newKeyValue.trim()) return;
    setMsg("");
    try {
      const res = await fetch("/api/ai/models", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "add_key", keyValue: newKeyValue.trim(), provider: newKeyProvider }),
      });
      if (res.ok) {
        setNewKeyValue("");
        loadData();
        setMsg(lang === "bn" ? "API কী যোগ করা হয়েছে" : "API key added");
      } else {
        const err = await res.json().catch(() => ({}));
        setMsg((err as any).error || "Failed to add key");
      }
    } catch { setMsg("Error adding key"); }
  };

  const deleteKey = async (keyId: number) => {
    setMsg("");
    try {
      const res = await fetch("/api/ai/models", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete_key", keyId }),
      });
      if (res.ok) {
        loadData();
        setMsg(lang === "bn" ? "কী মুছে ফেলা হয়েছে" : "Key deleted");
      } else setMsg("Failed to delete key");
    } catch { setMsg("Error deleting key"); }
  };

  const toggleKey = async (keyId: number) => {
    setMsg("");
    try {
      await fetch("/api/ai/models", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "toggle_key", keyId }),
      });
      loadData();
    } catch { setMsg("Error toggling key"); }
  };

  const resetFailover = async () => {
    setMsg("");
    try {
      await fetch("/api/ai/models", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reset_failover" }),
      });
      loadData();
      setMsg(lang === "bn" ? "ফেইলওভার রিসেট করা হয়েছে" : "Failover reset");
    } catch { setMsg("Error resetting"); }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-text-secondary text-sm">Loading...</div>
    </div>
  );

  const tierLabels = ["", "Best", "Great", "Good", "Basic", "Free"];
  const openrouterModels = models.filter((m) => m.provider === "openrouter");
  const opencodeModels = models.filter((m) => m.provider === "opencode");
  const orKeys = keys.filter((k) => k.provider === "openrouter");
  const ocKeys = keys.filter((k) => k.provider === "opencode");

  return (
    <div className="py-24 px-4 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-primary">
          {lang === "bn" ? "এআই সেটিংস" : "AI Settings"}
        </h1>
        <p className="text-sm text-text-secondary mt-1">
          {lang === "bn" ? "OpenRouter → OpenCode (ফলব্যাক)" : "OpenRouter → OpenCode (fallback)"}
        </p>
      </div>

      {msg && (
        <div className="mb-6 p-4 rounded-xl bg-action/10 text-action text-sm font-medium">
          {msg}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="card p-6">
          <div className="text-2xl font-bold text-primary">{state?.total_responses || 0}</div>
          <div className="text-sm text-text-secondary">{lang === "bn" ? "মোট রেসপন্স" : "Total Responses"}</div>
        </div>
        <div className="card p-6">
          <div className="text-2xl font-bold text-action">{state?.today_responses || 0}</div>
          <div className="text-sm text-text-secondary">{lang === "bn" ? "আজকের রেসপন্স" : "Today's Responses"}</div>
        </div>
        <div className="card p-6">
          <div className="flex items-center gap-4">
            <div className="text-2xl font-bold text-accent">{orKeys.filter(k=>k.is_active).length}</div>
            <div className="text-sm text-text-secondary">
              <div>{lang === "bn" ? "OpenRouter কী" : "OpenRouter Keys"}</div>
              <div className="text-xs">{lang === "bn" ? "সর্বমোট" : "Total"}: {orKeys.length}</div>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="text-2xl font-bold text-purple-600">{ocKeys.filter(k=>k.is_active).length}</div>
            <div className="text-sm text-text-secondary">
              <div>{lang === "bn" ? "OpenCode কী" : "OpenCode Keys"}</div>
              <div className="text-xs">{lang === "bn" ? "সর্বমোট" : "Total"}: {ocKeys.length}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="card p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-lg text-primary">
            {lang === "bn" ? "API কী যোগ করুন" : "Add API Key"}
          </h2>
          <button onClick={resetFailover} className="px-4 py-2 text-sm font-medium text-orange-600 bg-orange-50 rounded-xl hover:bg-orange-100 transition-colors">
            {lang === "bn" ? "ফেইলওভার রিসেট" : "Reset Failover"}
          </button>
        </div>
        <div className="flex gap-2">
          <select
            value={newKeyProvider}
            onChange={(e) => setNewKeyProvider(e.target.value as "openrouter" | "opencode")}
            className="px-3 py-2 rounded-xl border border-border bg-white text-sm text-primary"
          >
            <option value="openrouter">OpenRouter</option>
            <option value="opencode">OpenCode</option>
          </select>
          <input
            type="text"
            placeholder={lang === "bn" ? "API কী পেস্ট করুন" : "Paste API key"}
            value={newKeyValue}
            onChange={(e) => setNewKeyValue(e.target.value)}
            className="flex-1 px-4 py-2 rounded-xl border border-border bg-white text-sm font-mono text-primary"
          />
          <button onClick={addKey} className="px-6 py-2 gradient-premium text-white text-sm font-medium rounded-xl hover:opacity-90 transition-opacity whitespace-nowrap">
            {lang === "bn" ? "যোগ করুন" : "Add Key"}
          </button>
        </div>
        <p className="text-xs text-text-secondary mt-2">
          {lang === "bn" ? "যত ইচ্ছা তত API কী যোগ করতে পারেন। OpenRouter প্রথমে try করবে, সব exhausted হলে OpenCode try করবে।" : "Add unlimited API keys. OpenRouter is tried first; OpenCode acts as fallback when all OpenRouter models are exhausted."}
        </p>
      </div>

      {keys.length > 0 && (
        <div className="card p-6 mb-8">
          <h2 className="font-bold text-lg text-primary mb-4">
            {lang === "bn" ? "সংরক্ষিত API কী" : "Saved API Keys"} ({keys.length})
          </h2>
          <div className="space-y-2">
            {orKeys.map((key) => (
              <div key={key.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <span className="text-base">🔑</span>
                  <code className="text-sm font-mono text-primary truncate">{key.key_value}</code>
                  <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-blue-50 text-blue-700 shrink-0">OpenRouter</span>
                </div>
                <div className="flex items-center gap-2 shrink-0 ml-3">
                  <button
                    onClick={() => toggleKey(key.id)}
                    className={`w-9 h-5 rounded-full relative transition-colors ${key.is_active ? "bg-action" : "bg-gray-300"}`}
                    title={key.is_active ? (lang === "bn" ? "সক্রিয়" : "Active") : (lang === "bn" ? "নিষ্ক্রিয়" : "Inactive")}
                  >
                    <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${key.is_active ? "translate-x-4" : "translate-x-0.5"}`} />
                  </button>
                  <button
                    onClick={() => deleteKey(key.id)}
                    className="px-2 py-1 text-xs font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    {lang === "bn" ? "মুছুন" : "Delete"}
                  </button>
                </div>
              </div>
            ))}
            {ocKeys.map((key) => (
              <div key={key.id} className="flex items-center justify-between p-3 bg-purple-50 rounded-xl">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <span className="text-base">🔑</span>
                  <code className="text-sm font-mono text-primary truncate">{key.key_value}</code>
                  <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-purple-50 text-purple-700 shrink-0">OpenCode</span>
                </div>
                <div className="flex items-center gap-2 shrink-0 ml-3">
                  <button
                    onClick={() => toggleKey(key.id)}
                    className={`w-9 h-5 rounded-full relative transition-colors ${key.is_active ? "bg-purple-500" : "bg-gray-300"}`}
                    title={key.is_active ? (lang === "bn" ? "সক্রিয়" : "Active") : (lang === "bn" ? "নিষ্ক্রিয়" : "Inactive")}
                  >
                    <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${key.is_active ? "translate-x-4" : "translate-x-0.5"}`} />
                  </button>
                  <button
                    onClick={() => deleteKey(key.id)}
                    className="px-2 py-1 text-xs font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    {lang === "bn" ? "মুছুন" : "Delete"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="card p-6 mb-6">
        <h2 className="font-bold text-lg text-primary mb-4">
          {lang === "bn" ? "OpenRouter মডেল" : "OpenRouter Models"} ({openrouterModels.length})
        </h2>
        <div className="space-y-2">
          {openrouterModels.map((model) => (
            <div key={model.model_id} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleModel(model.model_id)}
                  className={`w-10 h-6 rounded-full relative transition-colors ${model.is_active ? "bg-action" : "bg-gray-200"}`}
                >
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${model.is_active ? "translate-x-5" : "translate-x-1"}`} />
                </button>
                <div>
                  <div className="text-sm font-medium text-primary">{model.name}</div>
                  <div className="text-xs text-text-secondary">{model.model_id}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                  model.tier <= 1 ? "bg-green-50 text-green-700" :
                  model.tier <= 3 ? "bg-blue-50 text-blue-700" :
                  "bg-gray-50 text-gray-600"
                }`}>
                  Tier {model.tier} - {tierLabels[model.tier] || "Free"}
                </span>
                {model.exhausted && (
                  <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-red-50 text-red-600">
                    {lang === "bn" ? "নিঃশেষ" : "Exhausted"}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card p-6 border-purple-200">
        <h2 className="font-bold text-lg text-purple-700 mb-4">
          {lang === "bn" ? "OpenCode মডেল" : "OpenCode Models"} ({opencodeModels.length})
        </h2>
        <p className="text-xs text-text-secondary mb-4">
          {lang === "bn" ? "এই মডেলগুলো OpenCode Zen API-এর মাধ্যমে চলে। OpenRouter সব মডেল নিঃশেষ হলেই এগুলো ব্যবহার হবে।" : "These models run via OpenCode Zen API. Used as fallback when all OpenRouter models are exhausted."}
        </p>
        <div className="space-y-2">
          {opencodeModels.map((model) => (
            <div key={model.model_id} className="flex items-center justify-between p-3 rounded-xl hover:bg-purple-50 transition-colors">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleModel(model.model_id)}
                  className={`w-10 h-6 rounded-full relative transition-colors ${model.is_active ? "bg-purple-500" : "bg-gray-200"}`}
                >
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${model.is_active ? "translate-x-5" : "translate-x-1"}`} />
                </button>
                <div>
                  <div className="text-sm font-medium text-primary">{model.name}</div>
                  <div className="text-xs text-text-secondary">{model.model_id}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-purple-50 text-purple-700">
                  OpenCode
                </span>
                {model.exhausted && (
                  <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-red-50 text-red-600">
                    {lang === "bn" ? "নিঃশেষ" : "Exhausted"}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
