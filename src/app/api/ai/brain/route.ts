import { NextRequest, NextResponse } from "next/server";
import {
  processMessage,
  detectLanguage, detectMood, detectDialect, detectReligion,
  analyzePainPoints, analyzeInterests,
  getOrCreateProfile, isWorkerPhone, getWorkerByPhone,
  getOrCreateLead,
} from "@/lib/ai";
import type { MessageCtx } from "@/lib/ai/brain/types";
import { execute } from "@/lib/db/queries";
import { getDB } from "@/lib/db";
import { getCached, setCache } from "@/lib/ai/brain/cache";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as {
      phone: string;
      text: string;
      name?: string;
      role?: string;
    };

    if (!body.phone || !body.text) {
      return NextResponse.json({ error: "phone and text required" }, { status: 400 });
    }

    const { phone, text, name } = body;

    const isWorker = await isWorkerPhone(phone);
    const role = body.role === "admin" ? "admin" : isWorker ? "worker" : "customer";

    const profile = await getOrCreateProfile(phone);
    const lang = detectLanguage(text);
    const mood = detectMood(text);
    const dialect = detectDialect(text);
    const religion = detectReligion(text);
    const painPoints = analyzePainPoints(text);
    const interests = analyzeInterests(text);

    await getOrCreateLead(phone);

    const ctx: MessageCtx = {
      phone,
      text,
      name: name || profile?.name_guess || undefined,
      role,
      language: lang,
      mood,
      dialect,
      religion,
      totalChats: profile?.total_chats || 0,
      painPoints,
      interests,
      isWorker,
    };

    // ── Check cache — skip processing if cached ──
    const cached = getCached(text, lang, mood);
    let result: Awaited<ReturnType<typeof processMessage>>;

    if (cached && cached.response.length > 10) {
      result = {
        text: cached.response,
        model: cached.model,
        tokens: cached.tokens,
        agentsUsed: cached.agentsUsed,
        departmentsUsed: cached.departmentsUsed as any,
        department: cached.department as any,
        intent: cached.intent as any,
        ms: 0,
        chainType: cached.chainType as any,
      };
    } else {
      result = await processMessage(ctx);
      setCache(text, lang, mood, {
        response: result.text, model: result.model, tokens: result.tokens,
        agentsUsed: result.agentsUsed, departmentsUsed: result.departmentsUsed,
        department: result.department, intent: result.intent,
        chainType: result.chainType || "single",
      });
    }

    // ── Log usage to D1 ──
    try {
      const db = await getDB();
      await execute(
        db,
        `INSERT INTO brain_usage (phone, text, intent, primary_department, departments_used, agents_used, chain_type, model_used, tokens_used, processing_ms, success) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          phone, text.slice(0, 500), result.intent,
          result.department, result.departmentsUsed?.join(",") || result.department,
          result.agentsUsed?.join(",") || "",
          result.chainType || "single", result.model, result.tokens,
          result.ms, 1,
        ],
      );
    } catch {}

    return NextResponse.json({
      success: true,
      reply: result.text,
      model: result.model,
      tokens: result.tokens,
      agentsUsed: result.agentsUsed,
      departmentsUsed: result.departmentsUsed,
      department: result.department,
      intent: result.intent,
      processingMs: result.ms,
      chainType: result.chainType,
      seniorReview: result.seniorReview,
    });
  } catch (error) {
    console.error("Brain chat error:", error);
    return NextResponse.json({
      error: error instanceof Error ? error.message : "Brain chat failed",
    }, { status: 500 });
  }
}
