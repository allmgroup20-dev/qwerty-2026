import type { ResearchResult } from "./types";

export function buildResearchPrompt(params: {
  agentName: string;
  sector: string;
  conversationCount: number;
  painPoints: string[];
  interests: string[];
  whatWorked: string[];
  recentMessages: { role: string; content: string }[];
}): string {
  const sectorLabel = params.sector || params.agentName;

  return `আপনি "${sectorLabel}" সেক্টরের একজন এআই রিসার্চ এনালিস্ট। নিচের তথ্য বিশ্লেষণ করে একটি পূর্ণাঙ্গ রিসার্চ রিপোর্ট তৈরি করুন।

## সেক্টর তথ্য
- সেক্টর: ${sectorLabel}
- মোট কনভারসেশন: ${params.conversationCount}
- পেইন পয়েন্ট: ${params.painPoints.join(", ") || "কোনোটি নাই"}
- ইন্টারেস্ট: ${params.interests.join(", ") || "কোনোটি নাই"}
- যা কাজ করেছে: ${params.whatWorked.join(", ") || "এখনও ডাটা নাই"}

## সর্বশেষ কনভারসেশন
${params.recentMessages.slice(-5).map((m) => `${m.role === "user" ? "ব্যবহারকারী" : "এআই"}: ${m.content.slice(0, 200)}`).join("\n")}

## আপনার রিপোর্ট JSON আকারে দিন (শুধু JSON, কোনো অতিরিক্ত টেক্সট নয়):
{
  "summary": "সংক্ষিপ্ত সারাংশ (২-৩ লাইন)",
  "challenges": ["প্রধান চ্যালেঞ্জ ১", "প্রধান চ্যালেঞ্জ ২", "প্রধান চ্যালেঞ্জ ৩"],
  "whats_working": ["যা কাজ করছে ১", "যা কাজ করছে ২", "যা কাজ করছে ৩"],
  "recommendations": ["উন্নতির সুপারিশ ১", "উন্নতির সুপারিশ ২", "উন্নতির সুপারিশ ৩"],
  "urgent_action": "সবচেয়ে জরুরি পদক্ষেপ",
  "metrics": {
    "total_conversations": ${params.conversationCount},
    "pain_point_count": ${params.painPoints.length},
    "interest_count": ${params.interests.length}
  }
}`;
}

export function buildSynthesisPrompt(params: {
  domainName: string;
  childReports: { agentName: string; summary: string; recommendations: string[]; challenges: string[] }[];
}): string {
  const childrenText = params.childReports
    .map(
      (r) =>
        `--- ${r.agentName} ---\nসারাংশ: ${r.summary}\nচ্যালেঞ্জ: ${r.challenges.join(", ")}\nসুপারিশ: ${r.recommendations.join(", ")}`
    )
    .join("\n\n");

  return `আপনি "${params.domainName}" ডোমেইনের একজন সিনিয়র এনালিস্ট। নিচের সেক্টর এজেন্টদের রিপোর্ট বিশ্লেষণ করে একটি সমন্বিত রিপোর্ট তৈরি করুন।

## চাইল্ড এজেন্ট রিপোর্টসমূহ
${childrenText}

## আপনার রিপোর্ট JSON আকারে দিন (শুধু JSON):
{
  "summary": "সমন্বিত সারাংশ (৩-৪ লাইন)",
  "cross_sector_patterns": ["ক্রস-সেক্টর প্যাটার্ন ১", "ক্রস-সেক্টর প্যাটার্ন ২"],
  "top_recommendations": ["সর্বোচ্চ অগ্রাধিকারের সুপারিশ ১", "সুপারিশ ২", "সুপারিশ ৩"],
  "metrics": {
    "reports_analyzed": ${params.childReports.length},
    "total_challenges": ${params.childReports.reduce((s, r) => s + r.challenges.length, 0)},
    "total_recommendations": ${params.childReports.reduce((s, r) => s + r.recommendations.length, 0)}
  }
}`;
}

export function buildSeniorPrompt(params: {
  domainReports: { domainName: string; summary: string; topRecommendations: string[]; metrics: Record<string, number> }[];
}): string {
  const domainText = params.domainReports
    .map(
      (r) =>
        `--- ${r.domainName} ---\nসারাংশ: ${r.summary}\nসুপারিশ: ${r.topRecommendations.join(", ")}\nমেট্রিক্স: ${JSON.stringify(r.metrics)}`
    )
    .join("\n\n");

  return `আপনি কোম্পানির প্রধান এজেন্ট। নিচের ডোমেইন এজেন্টদের রিপোর্ট বিশ্লেষণ করে একটি কোম্পানি-ব্যাপী ফাইনাল রিসার্চ রিপোর্ট তৈরি করুন।

## ডোমেইন এজেন্ট রিপোর্টসমূহ
${domainText}

## আপনার রিপোর্ট JSON আকারে দিন (শুধু JSON):
{
  "summary": "কোম্পানি-ব্যাপী সারাংশ (৪-৫ লাইন)",
  "key_findings": ["গুরুত্বপূর্ণ ফলাফল ১", "ফলাফল ২", "ফলাফল ৩"],
  "company_wide_recommendations": ["কোম্পানি-ব্যাপী সুপারিশ ১", "সুপারিশ ২", "সুপারিশ ৩"],
  "sector_priorities": [
    {"sector": "সেক্টরের নাম", "action": "প্রস্তাবিত পদক্ষেপ", "urgency": "high/medium/low"}
  ],
  "metrics": {
    "domains_analyzed": ${params.domainReports.length},
    "total_recommendations": ${params.domainReports.reduce((s, r) => s + r.topRecommendations.length, 0)}
  }
}`;
}

export function parseResearchResponse(text: string): ResearchResult | null {
  try {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return null;
    return JSON.parse(jsonMatch[0]) as ResearchResult;
  } catch {
    return null;
  }
}
