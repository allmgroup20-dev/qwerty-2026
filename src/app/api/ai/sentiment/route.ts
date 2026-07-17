import { NextRequest, NextResponse } from "next/server";
import { ensureDB } from "@/lib/db";

const POSITIVE_WORDS = [
  "good", "great", "excellent", "amazing", "awesome", "fantastic", "wonderful", "best",
  "love", "loved", "helpful", "thanks", "thank you", "perfect", "nice", "super",
  "outstanding", "brilliant", "awesome", "beautiful", "happy", "satisfied", "recommend",
  "ভালো", "দারুণ", "চমৎকার", "অসাধারণ", "সুন্দর", "মজার", "আশ্চর্যজনক", "সেরা",
  "ধন্যবাদ", "পারফেক্ট", "খুশি", "সন্তুষ্ট", "সহায়ক", "উপকারী",
];

const NEGATIVE_WORDS = [
  "bad", "worst", "terrible", "horrible", "awful", "poor", "hate", "dislike",
  "useless", "waste", "boring", "difficult", "hard", "confusing", "frustrating",
  "slow", "broken", "error", "problem", "issue", "complaint", "disappointed",
  "খারাপ", "ভয়ংকর", "বাজে", "অপয়া", "অকেজো", "নষ্ট", "বিরক্ত", "সমস্যা",
  "কঠিন", "বৃথা", "হতাশ", "ঠিক নেই", "ভুল",
];

function analyzeSentiment(text: string) {
  const lower = text.toLowerCase();
  let positiveScore = 0;
  let negativeScore = 0;
  const posMatches: string[] = [];
  const negMatches: string[] = [];

  for (const word of POSITIVE_WORDS) {
    if (lower.includes(word)) {
      positiveScore++;
      posMatches.push(word);
    }
  }

  for (const word of NEGATIVE_WORDS) {
    if (lower.includes(word)) {
      negativeScore++;
      negMatches.push(word);
    }
  }

  const total = positiveScore + negativeScore;
  const netScore = total > 0 ? Math.round(((positiveScore - negativeScore) / total) * 100) : 0;

  let label: string;
  if (netScore >= 40) label = "very_positive";
  else if (netScore >= 10) label = "positive";
  else if (netScore > -10) label = "neutral";
  else if (netScore > -40) label = "negative";
  else label = "very_negative";

  return {
    score: netScore,
    label,
    positiveCount: positiveScore,
    negativeCount: negativeScore,
    positiveWords: posMatches.slice(0, 5),
    negativeWords: negMatches.slice(0, 5),
  };
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") || "reviews";

  try {
    const db = await ensureDB();
    let items: any[] = [];
    let totalPos = 0, totalNeg = 0, totalNeu = 0;

    if (type === "reviews" || type === "all") {
      const reviews = await db.prepare(
        "SELECT r.id, r.worker_id, r.review_text, r.rating, r.created_at, w.name as worker_name FROM product_reviews r LEFT JOIN workers w ON r.worker_id = w.worker_id WHERE r.review_text IS NOT NULL AND r.review_text != '' ORDER BY r.created_at DESC LIMIT 100"
      ).bind().all() as { results: any[] };
      for (const r of reviews.results) {
        const sentiment = analyzeSentiment(r.review_text);
        items.push({ id: r.id, workerId: r.worker_id, workerName: r.worker_name, text: r.review_text, rating: r.rating, source: "review", sentiment, createdAt: r.created_at });
        if (sentiment.label.includes("positive")) totalPos++;
        else if (sentiment.label.includes("negative")) totalNeg++;
        else totalNeu++;
      }
    }

    if (type === "communication" || type === "all") {
      const comms = await db.prepare(
        "SELECT c.id, c.worker_id, c.message, c.channel, c.direction, c.created_at, w.name as worker_name FROM communication_history c LEFT JOIN workers w ON c.worker_id = w.worker_id WHERE c.message IS NOT NULL AND c.message != '' ORDER BY c.created_at DESC LIMIT 100"
      ).bind().all() as { results: any[] };
      for (const c of comms.results) {
        const sentiment = analyzeSentiment(c.message);
        items.push({ id: c.id, workerId: c.worker_id, workerName: c.worker_name, text: c.message, channel: c.channel, direction: c.direction, source: "communication", sentiment, createdAt: c.created_at });
        if (sentiment.label.includes("positive")) totalPos++;
        else if (sentiment.label.includes("negative")) totalNeg++;
        else totalNeu++;
      }
    }

    return NextResponse.json({
      success: true,
      total: items.length,
      positive: totalPos,
      negative: totalNeg,
      neutral: totalNeu,
      items: items.slice(0, 50),
    });
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json() as { text: string };
    if (!text) return NextResponse.json({ success: false, error: "text required" }, { status: 400 });
    return NextResponse.json({ success: true, ...analyzeSentiment(text) });
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}
