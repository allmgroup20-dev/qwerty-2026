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

interface FailoverState {
  exhausted_models: string;
  total_responses: number;
  today_responses: number;
}

export default function AISettingsPage() {
  const { lang } = useLanguageStore();
  const [models, setModels] = useState<Model[]>([]);
  const [state, setState] = useState<FailoverState | null>(null);
  const [orKeys, setOrKeys] = useState({ total: 0, active: 0 });
  const [ocKeys, setOcKeys] = useState({ total: 0, active: 0 });
  const [loading, setLoading] = useState(true);
  const [newOrKey, setNewOrKey] = useState({ slot: 1, value: "" });
  const [newOcKey, setNewOcKey] = useState({ slot: 1, value: "" });
  const [msg, setMsg] = useState("");

  const loadData = async () => {
    try {
      const res = await fetch("/api/ai/models");
      const data = await res.json() as {
        models?: Model[]; failoverState?: FailoverState;
        openrouterKeys?: { total: number; active: number };
        opencodeKeys?: { total: number; active: number };
      };
      if (data.models) setModels(data.models);
      if (data.failoverState) setState(data.failoverState);
      if (data.openrouterKeys) setOrKeys(data.openrouterKeys);
      if (data.opencodeKeys) setOcKeys(data.opencodeKeys);
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

  const addOrKey = async () => {
    if (!newOrKey.value.trim()) return;
    setMsg("");
    try {
      const res = await fetch("/api/ai/models", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "add_key", keySlot: newOrKey.slot, keyValue: newOrKey.value, provider: "openrouter" }),
      });
      if (res.ok) {
        setNewOrKey({ slot: newOrKey.slot + 1, value: "" });
        loadData();
        setMsg(lang === "bn" ? "OpenRouter কী যোগ করা হয়েছে" : "OpenRouter key added");
      } else setMsg("Failed to add key");
    } catch { setMsg("Error adding key"); }
  };

  const addOcKey = async () => {
    if (!newOcKey.value.trim()) return;
    setMsg("");
    try {
      const res = await fetch("/api/ai/models", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "add_key", keySlot: newOcKey.slot, keyValue: newOcKey.value, provider: "opencode" }),
      });
      if (res.ok) {
        setNewOcKey({ slot: newOcKey.slot + 1, value: "" });
        loadData();
        setMsg(lang === "bn" ? "OpenCode কী যোগ করা হয়েছে" : "OpenCode key added");
      } else setMsg("Failed to add key");
    } catch { setMsg("Error adding key"); }
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

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        <div className="card p-6">
          <div className="text-2xl font-bold text-primary">{state?.total_responses || 0}</div>
          <div className="text-sm text-text-secondary">{lang === "bn" ? "মোট রেসপন্স" : "Total Responses"}</div>
        </div>
        <div className="card p-6">
          <div className="text-2xl font-bold text-action">{state?.today_responses || 0}</div>
          <div className="text-sm text-text-secondary">{lang === "bn" ? "আজকের রেসপন্স" : "Today's Responses"}</div>
        </div>
        <div className="card p-6">
          <div className="text-2xl font-bold text-accent">{orKeys.active}/5</div>
          <div className="text-sm text-text-secondary">{lang === "bn" ? "OpenRouter কী" : "OpenRouter Keys"}</div>
        </div>
        <div className="card p-6">
          <div className="text-2xl font-bold text-purple-600">{ocKeys.active}/3</div>
          <div className="text-sm text-text-secondary">{lang === "bn" ? "OpenCode কী" : "OpenCode Keys"}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-lg text-primary">
              {lang === "bn" ? "OpenRouter কী" : "OpenRouter Key"}
            </h2>
            <button onClick={resetFailover} className="px-4 py-2 text-sm font-medium text-orange-600 bg-orange-50 rounded-xl hover:bg-orange-100 transition-colors">
              {lang === "bn" ? "ফেইলওভার রিসেট" : "Reset Failover"}
            </button>
          </div>
          <div className="flex gap-2">
            <input
              type="number" min={1} max={5}
              value={newOrKey.slot}
              onChange={(e) => setNewOrKey({ ...newOrKey, slot: parseInt(e.target.value) || 1 })}
              className="w-16 px-3 py-2 rounded-xl border border-border bg-white text-sm text-primary"
            />
            <input
              type="text"
              placeholder={lang === "bn" ? "OpenRouter API কী" : "OpenRouter API Key"}
              value={newOrKey.value}
              onChange={(e) => setNewOrKey({ ...newOrKey, value: e.target.value })}
              className="flex-1 px-4 py-2 rounded-xl border border-border bg-white text-sm text-primary"
            />
            <button onClick={addOrKey} className="px-4 py-2 gradient-premium text-white text-sm font-medium rounded-xl hover:opacity-90 transition-opacity whitespace-nowrap">
              {lang === "bn" ? "যোগ করুন" : "Add"}
            </button>
          </div>
        </div>

        <div className="card p-6 border-purple-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-lg text-purple-700">
              {lang === "bn" ? "OpenCode কী" : "OpenCode Key"}
            </h2>
            <a href="https://opencode.ai/auth" target="_blank" rel="noopener noreferrer" className="px-4 py-2 text-sm font-medium text-purple-600 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors">
              {lang === "bn" ? "কী নিন" : "Get Key"}
            </a>
          </div>
          <div className="flex gap-2">
            <input
              type="number" min={1} max={3}
              value={newOcKey.slot}
              onChange={(e) => setNewOcKey({ ...newOcKey, slot: parseInt(e.target.value) || 1 })}
              className="w-16 px-3 py-2 rounded-xl border border-border bg-white text-sm text-primary"
            />
            <input
              type="text"
              placeholder={lang === "bn" ? "OpenCode API কী" : "OpenCode API Key"}
              value={newOcKey.value}
              onChange={(e) => setNewOcKey({ ...newOcKey, value: e.target.value })}
              className="flex-1 px-4 py-2 rounded-xl border border-border bg-white text-sm text-primary"
            />
            <button onClick={addOcKey} className="px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-xl hover:bg-purple-700 transition-colors whitespace-nowrap">
              {lang === "bn" ? "যোগ করুন" : "Add"}
            </button>
          </div>
          <p className="text-xs text-text-secondary mt-2">
            {lang === "bn" ? "OpenCode ফলেরব্যাক হিসেবে কাজ করবে যখন সব OpenRouter মডেল নিঃশেষ হবে" : "OpenCode acts as fallback when all OpenRouter models are exhausted"}
          </p>
        </div>
      </div>

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
