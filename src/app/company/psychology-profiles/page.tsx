"use client";

import { useState, useEffect } from "react";
import { useLanguageStore } from "@/lib/store";
import { Skeleton } from "@/components/ui/Skeleton";

interface Profile {
  phone: string; name: string | null; gender: string | null; ageGroup: string | null;
  sector: string | null; language: string; painPoints: string[]; interests: string[];
  priorityScore: number; totalChats: number; lastChatAt: string | null;
  status: string; notes: string | null;
  trustScore: number; controlSensitivity: string | null; manipulationRisk: string | null;
}

interface Conversation {
  id: number; summary: string; keyPoints: Record<string, any>;
  messages: { role: string; content: string }[];
  language: string; source: string; created_at: string;
}

interface Recommendation {
  approach: string; tips: string[];
}

interface TrainingModule {
  id: number; knowledge_title: string; knowledge_content: string; knowledge_category: string;
}

interface RecentProfile {
  phone: string; name_guess: string | null; trust_score: number;
  control_sensitivity: string | null; manipulation_risk: string | null;
  sector: string | null; status: string; total_chats: number; last_chat_at: string | null;
}

export default function PsychologyProfilesPage() {
  const { lang } = useLanguageStore();
  const isBn = lang === "bn";
  const [searchQuery, setSearchQuery] = useState("");
  const [profile, setProfile] = useState<Profile | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation | null>(null);
  const [trainingModules, setTrainingModules] = useState<TrainingModule[]>([]);
  const [recentProfiles, setRecentProfiles] = useState<RecentProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [expandedConv, setExpandedConv] = useState<number | null>(null);
  const [searchMode, setSearchMode] = useState<"phone" | "name">("phone");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/company/psychology-profile");
        if (res.ok) { const data: any = await res.json(); setRecentProfiles(data.profiles || []); }
      } catch {}
    })();
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setLoading(true); setError(""); setProfile(null); setConversations([]); setRecommendations(null); setTrainingModules([]);
    try {
      const param = searchMode === "phone" ? `phone=${encodeURIComponent(searchQuery.trim())}` : `search=${encodeURIComponent(searchQuery.trim())}`;
      const res = await fetch(`/api/company/psychology-profile?${param}`);
      if (!res.ok) { setError(isBn ? "প্রোফাইল পাওয়া যায়নি" : "Profile not found"); return; }
      const data: any = await res.json();
      setProfile(data.profile || null);
      setConversations(data.conversations || []);
      setRecommendations(data.recommendations || null);
      setTrainingModules(data.trainingModules || []);
    } catch { setError(isBn ? "সার্ভার ত্রুটি" : "Server error"); }
    finally { setLoading(false); }
  };

  const handleSelectRecent = (phone: string) => {
    setSearchQuery(phone);
    setSearchMode("phone");
    setTimeout(() => handleSearch(), 0);
  };

  const TrustBadge = ({ score }: { score: number }) => {
    const color = score >= 7 ? "bg-success/10 text-success" : score >= 4 ? "bg-warning/10 text-warning" : "bg-error/10 text-error";
    return <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${color}`}>{score}/10</span>;
  };

  const renderProfileCard = () => {
    if (!profile) return null;
    const p = profile;

    return (
      <div className="bg-white rounded-2xl border border-border overflow-hidden mb-6">
        <div className="bg-gradient-to-r from-primary/5 to-info/5 p-5 border-b border-border">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-black text-text">{p.name || p.phone}</h2>
              {p.name && <p className="text-xs text-text-secondary/60">{p.phone}</p>}
              <div className="flex gap-2 mt-2 flex-wrap">
                <TrustBadge score={p.trustScore} />
                {p.controlSensitivity && (
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                    p.controlSensitivity === "high" ? "bg-error/10 text-error" :
                    p.controlSensitivity === "medium" ? "bg-warning/10 text-warning" : "bg-success/10 text-success"
                  }`}>{isBn ? "নিয়ন্ত্রণ" : "Ctrl"}: {p.controlSensitivity}</span>
                )}
                {p.manipulationRisk && (
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                    p.manipulationRisk === "high" ? "bg-error/10 text-error" :
                    p.manipulationRisk === "medium" ? "bg-warning/10 text-warning" : "bg-success/10 text-success"
                  }`}>{isBn ? "ম্যানিপুলেশন" : "Manip"}: {p.manipulationRisk}</span>
                )}
                <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                  p.status === "converted" ? "bg-success/10 text-success" :
                  p.status === "blocked" ? "bg-error/10 text-error" :
                  p.status === "new" ? "bg-info/10 text-info" : "bg-primary/10 text-primary"
                }`}>{p.status}</span>
              </div>
            </div>
            <div className="text-right text-[10px] text-text-secondary/50">
              <div>{isBn ? "চ্যাট" : "Chats"}: <strong>{p.totalChats}</strong></div>
              <div>{isBn ? "প্রাধান্য" : "Priority"}: <strong>{p.priorityScore}</strong></div>
              {p.lastChatAt && <div>{p.lastChatAt?.split("T")[0]}</div>}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border/30">
          {[
            { label: isBn ? "লিঙ্গ" : "Gender", value: p.gender || "—" },
            { label: isBn ? "বয়স" : "Age", value: p.ageGroup || "—" },
            { label: isBn ? "সেক্টর" : "Sector", value: p.sector || "—" },
            { label: isBn ? "ভাষা" : "Language", value: p.language },
          ].map((item, i) => (
            <div key={i} className="bg-white p-3">
              <p className="text-[10px] text-text-secondary/50">{item.label}</p>
              <p className="text-xs font-bold text-text mt-0.5">{item.value}</p>
            </div>
          ))}
        </div>

        {p.painPoints && p.painPoints.length > 0 && (
          <div className="p-4 border-t border-border/40">
            <p className="text-[10px] font-bold text-text mb-2">{isBn ? "পেইন পয়েন্টস" : "Pain Points"}</p>
            <div className="flex gap-1.5 flex-wrap">
              {p.painPoints.map((pp, i) => (
                <span key={i} className="text-[10px] bg-error/5 text-error px-2 py-0.5 rounded-full font-medium">{pp}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderRecommendations = () => {
    if (!recommendations) return null;
    return (
      <div className="bg-white rounded-2xl border border-border overflow-hidden mb-6">
        <div className="p-4 border-b border-border bg-gradient-to-r from-primary/5 to-info/5">
          <h3 className="text-sm font-bold text-text">{isBn ? "🎯 প্রস্তাবিত কৌশল" : "🎯 Recommended Approach"}</h3>
          <span className={`inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold ${
            recommendations.approach === "trust_repair" ? "bg-error/10 text-error" :
            recommendations.approach === "trust_building" ? "bg-warning/10 text-warning" :
            "bg-success/10 text-success"
          }`}>{recommendations.approach}</span>
        </div>
        <div className="p-4 space-y-2">
          {recommendations.tips.map((tip, i) => (
            <div key={i} className="flex gap-2 text-xs text-text-secondary leading-relaxed">
              <span className="text-primary shrink-0 mt-0.5">💡</span>
              <span>{tip}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderConversations = () => {
    if (conversations.length === 0) return null;
    return (
      <div className="bg-white rounded-2xl border border-border overflow-hidden mb-6">
        <div className="p-4 border-b border-border">
          <h3 className="text-sm font-bold text-text">{isBn ? "💬 সাম্প্রতিক কথোপকথন" : "💬 Recent Conversations"}</h3>
        </div>
        <div className="divide-y divide-border/30">
          {conversations.map(conv => {
            const kp = conv.keyPoints;
            return (
              <div key={conv.id}>
                <button
                  onClick={() => setExpandedConv(expandedConv === conv.id ? null : conv.id)}
                  className="w-full flex items-center justify-between p-3 hover:bg-primary/5 transition-colors text-left"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-text-secondary/50">{conv.created_at?.split("T")[0]}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/5 text-primary font-medium">{conv.source}</span>
                      {kp?.trustLevel && (
                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                          kp.trustLevel === "trusting" ? "bg-success/10 text-success" :
                          kp.trustLevel === "defensive" ? "bg-error/10 text-error" : "bg-warning/10 text-warning"
                        }`}>{kp.trustLevel}</span>
                      )}
                      {kp?.maskStatus && (
                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                          kp.maskStatus === "open" ? "bg-success/10 text-success" :
                          kp.maskStatus === "masked" ? "bg-error/10 text-error" : "bg-warning/10 text-warning"
                        }`}>mask: {kp.maskStatus}</span>
                      )}
                    </div>
                    <p className="text-xs text-text-secondary mt-0.5 line-clamp-1">{conv.summary || (kp?.painPoints ? `Pain: ${kp.painPoints}` : "") || "—"}</p>
                  </div>
                  <span className="text-text-secondary/40 ml-2">{expandedConv === conv.id ? "−" : "+"}</span>
                </button>
                {expandedConv === conv.id && (
                  <div className="px-3 pb-3">
                    {kp && Object.keys(kp).length > 0 && (
                      <div className="flex gap-1.5 flex-wrap mb-2">
                        {Object.entries(kp).filter(([k]) => !["lastMessageCount", "painPoints", "interests"].includes(k)).map(([k, v]) => (
                          <span key={k} className="text-[9px] bg-primary/5 px-1.5 py-0.5 rounded text-text-secondary/70">{k}: <strong>{String(v)}</strong></span>
                        ))}
                      </div>
                    )}
                    {conv.messages && conv.messages.length > 0 && (
                      <div className="space-y-1.5">
                        {conv.messages.map((msg, mi) => (
                          <div key={mi} className={`p-2 rounded-xl text-xs ${
                            msg.role === "user" ? "bg-primary/5 ml-4" : "bg-primary/10 mr-4"
                          }`}>
                            <span className="text-[9px] font-bold text-text-secondary/40 block mb-0.5">{msg.role}</span>
                            <span className="text-text-secondary">{msg.content?.slice(0, 200)}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderTrainingModules = () => {
    if (trainingModules.length === 0) return null;
    return (
      <div className="bg-white rounded-2xl border border-border overflow-hidden mb-6">
        <div className="p-4 border-b border-border">
          <h3 className="text-sm font-bold text-text">{isBn ? "📚 প্রাসঙ্গিক প্রশিক্ষণ" : "📚 Related Training Modules"}</h3>
        </div>
        <div className="divide-y divide-border/30">
          {trainingModules.map(mod => (
            <div key={mod.id} className="p-3 hover:bg-primary/5">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/5 text-primary font-medium">{mod.knowledge_category}</span>
              </div>
              <p className="text-xs font-bold text-text">{mod.knowledge_title}</p>
              <p className="text-[10px] text-text-secondary/70 mt-0.5 line-clamp-2">{mod.knowledge_content?.slice(0, 150)}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl font-black text-text">{isBn ? "🔍 সাইকোলজি প্রোফাইল কনসোল" : "🔍 Psychology Profile Console"}</h1>
        <p className="text-xs text-text-secondary/70 mt-1">
          {isBn ? "গ্রাহকের মনস্তাত্ত্বিক প্রোফাইল দেখুন, বুঝুন এবং সঠিক কৌশল নির্ধারণ করুন" : "View customer psychology profiles, understand their mindset, and get actionable strategies"}
        </p>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl border border-border p-4 mb-6">
        <div className="flex gap-2 items-center">
          <div className="flex gap-1 bg-primary/5 rounded-xl p-0.5">
            {(["phone", "name"] as const).map(m => (
              <button key={m} onClick={() => setSearchMode(m)}
                className={`px-3 py-1.5 rounded-xl text-[10px] font-bold transition-colors ${
                  searchMode === m ? "bg-primary text-white" : "text-text-secondary/60 hover:text-text"
                }`}>
                {m === "phone" ? (isBn ? "ফোন" : "Phone") : (isBn ? "নাম" : "Name")}
              </button>
            ))}
          </div>
          <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSearch()}
            className="flex-1 border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 bg-white"
            placeholder={isBn ? "ফোন নম্বর বা নাম লিখুন..." : "Enter phone number or name..."} />
          <button onClick={handleSearch}
            className="bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-primary/90 transition-colors">
            {isBn ? "🔍 খুঁজুন" : "🔍 Search"}
          </button>
        </div>
        {error && <p className="text-xs text-error mt-2">{error}</p>}
      </div>

      {loading ? (
        <div className="space-y-4"><Skeleton className="h-48 rounded-2xl" /><Skeleton className="h-32 rounded-2xl" /></div>
      ) : (
        <>
          {profile && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                {renderProfileCard()}
                {renderConversations()}
              </div>
              <div className="lg:col-span-1">
                {renderRecommendations()}
                {renderTrainingModules()}
              </div>
            </div>
          )}

          {!profile && !loading && (
            <div className="bg-white rounded-2xl border border-border p-5">
              <h3 className="text-sm font-bold text-text mb-4">
                {isBn ? "সাম্প্রতিক প্রোফাইল" : "Recent Profiles"}
              </h3>
              {recentProfiles.length === 0 ? (
                <p className="text-xs text-text-secondary/60 text-center py-6">{isBn ? "কোনো প্রোফাইল নেই" : "No profiles yet"}</p>
              ) : (
                <div className="space-y-1.5">
                  {recentProfiles.map(rp => (
                    <button key={rp.phone} onClick={() => handleSelectRecent(rp.phone)}
                      className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-primary/5 transition-colors text-left">
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-text">{rp.name_guess || rp.phone}</p>
                        <p className="text-[10px] text-text-secondary/50">{rp.phone} · {rp.sector || "—"} · {rp.total_chats} chats</p>
                      </div>
                      <TrustBadge score={rp.trust_score} />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
