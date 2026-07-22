import { NextRequest, NextResponse } from "next/server";
import { updateContactStatus, createContact } from "@/lib/whatsapp/contacts";
import { sendMessage, enqueueMessage } from "@/lib/whatsapp";
import { execute } from "@/lib/db/queries";
import { getDB } from "@/lib/db";
import {
  processMessage,
  analyzePainPoints,
  analyzeInterests,
  detectLanguage,
  detectMood,
  detectDialect,
  detectReligion,
  getOrCreateProfile,
  updateProfileFromChat,
  updateProfileScore,
  saveMessage,
  saveSkill,
  extractKeywords,
  isWorkerPhone,
  getWorkerByPhone,
  getWorkerPremiumStatus,
  getOrCreateLead,
  updateLeadStatus,
} from "@/lib/ai";
import { recordPlatformActivity } from "@/lib/platform-router";
import { linkWorkerToAgent, saveAgentKnowledge } from "@/lib/ai/brain/employee-link";
import type { MessageCtx } from "@/lib/ai/brain/types";
import type { MediaResult } from "@/lib/whatsapp/media";

function parseIncomingMessage(body: any): { phone: string; text: string; name?: string; mediaId?: string; mediaType?: string; mimeType?: string } | null {
  const entry = body?.entry?.[0];
  const change = entry?.changes?.[0];
  const value = change?.value;
  const messages = value?.messages;
  if (messages?.length) {
    const msg = messages[0];
    if (msg.from) {
      const name = value?.contacts?.[0]?.profile?.name;
      // Voice message
      if (msg.type === "voice" || msg.type === "audio") {
        const id = msg.voice?.id || msg.audio?.id;
        if (id) return { phone: msg.from, text: "[Voice Message]", name, mediaId: id, mediaType: "voice", mimeType: msg.voice?.mime_type || msg.audio?.mime_type || "audio/ogg" };
      }
      // Image message
      if (msg.type === "image") {
        const id = msg.image?.id;
        if (id) return { phone: msg.from, text: "[Image]", name, mediaId: id, mediaType: "image", mimeType: msg.image?.mime_type || "image/jpeg" };
      }
      // Text message
      if (msg.type === "text" && msg.text?.body) {
        return { phone: msg.from, text: msg.text.body, name };
      }
    }
  }
  const phone = body.phone || body.from;
  const text = body.text || body.message;
  if (phone && text) {
    return { phone, text, name: body.name };
  }
  return null;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as Record<string, unknown>;

    const parsed = parseIncomingMessage(body);
    if (!parsed) {
      return NextResponse.json({ received: false });
    }

    let { phone, text, name, mediaId, mediaType, mimeType } = parsed;

    const env = await getDB();

    // ── Process media (voice/image) if present ──
    let mediaDescription = "";
    let mediaLogText = text;
    if (mediaId && mediaType === "voice") {
      const { downloadMedia, transcribeAudio } = await import("@/lib/whatsapp/media");
      const media = await downloadMedia(mediaId);
      if (media) {
        const sttResult = await transcribeAudio(media.buffer, env);
        if (sttResult) {
          text = `[Voice: ${sttResult}]`;
          mediaDescription = `Customer sent a voice message. Transcription: "${sttResult}"`;
          mediaLogText = sttResult;
        }
      }
      await execute(env,
        "INSERT INTO wa_logs (phone, message, direction, status, message_type, created_at) VALUES (?, ?, 'inbound', 'received', 'voice', datetime('now'))",
        [phone, mediaLogText]
      );
    } else if (mediaId && mediaType === "image") {
      const { downloadMedia, analyzeImage } = await import("@/lib/whatsapp/media");
      const media = await downloadMedia(mediaId);
      if (media) {
        const imageDesc = await analyzeImage(media.buffer, mimeType || "image/jpeg", env);
        if (imageDesc) {
          text = `[Image: ${imageDesc.slice(0, 200)}]`;
          mediaDescription = `Customer sent an image. Description: "${imageDesc}"`;
          mediaLogText = imageDesc.slice(0, 100);
        }
      }
      await execute(env,
        "INSERT INTO wa_logs (phone, message, direction, status, message_type, created_at) VALUES (?, ?, 'inbound', 'received', 'image', datetime('now'))",
        [phone, mediaLogText]
      );
    } else {
      await execute(env,
        "INSERT INTO wa_logs (phone, message, direction, status, message_type, created_at) VALUES (?, ?, 'inbound', 'received', 'text', datetime('now'))",
        [phone, text]
      );
    }

    // Update or create contact
    if (name) {
      await createContact(phone, { name, source: "whatsapp_inbound" });
    } else {
      await createContact(phone, { source: "whatsapp_inbound" });
    }

    // Detect role: is this a worker or a customer?
    const isWorker = await isWorkerPhone(phone);
    const role = isWorker ? "worker" : "customer";

    // Get or create lead record
    await getOrCreateLead(phone);

    // Detect language, mood, dialect, religion
    const profile = await getOrCreateProfile(phone);
    const lang = detectLanguage(text);
    const mood = detectMood(text);
    const dialect = detectDialect(text);
    const religion = detectReligion(text);
    const painPoints = analyzePainPoints(text);
    const interests = analyzeInterests(text);

    await updateProfileFromChat(phone, text);

    // Priority scoring
    const score = calculateSimpleScore(profile);
    if (score > 0) {
      await updateProfileScore(phone, score);
    }

    // Track funnel stage based on conversation count
    const totalMessages = (profile?.total_chats || 0) + 1;
    let funnelStage: string | undefined;
    if (role === "customer") {
      if (totalMessages <= 4) funnelStage = "1-4";
      else if (totalMessages <= 6) funnelStage = "5-6";
      else if (totalMessages <= 8) funnelStage = "7-8";
      else if (totalMessages <= 10) funnelStage = "9-10";
      else funnelStage = "11-12";
    }

    const isPremium = isWorker ? await getWorkerPremiumStatus(phone) : false;
    const brainCtx: MessageCtx = {
      phone,
      text,
      name,
      role,
      language: lang,
      mood,
      dialect,
      religion,
      funnelStage,
      totalChats: profile?.total_chats || 0,
      painPoints,
      interests,
      isWorker,
      isPremium,
    };

    const brainResult = await processMessage(brainCtx);
    let reply = brainResult.text;

    if (isWorker && brainResult.agentsUsed.length > 0) {
      const agentName = brainResult.agentsUsed[0];
      await linkWorkerToAgent(env.DB, phone, agentName, agentName);
      await saveAgentKnowledge(env.DB, phone, agentName, agentName, reply.slice(0, 1000));
    }

    if (!reply || reply.trim().length === 0) {
      console.warn(`[WhatsApp Webhook] Brain returned empty reply for ${phone} — using persistent fallback`);
      reply = lang === "en"
        ? `I understand you might not be ready yet. But let me ask you this — what if you're missing out on something that could truly change your life? Many of our members felt the same way at first. Let me share just one quick story...`
        : `আমি বুঝতে পারছি আপনি এখনই আগ্রহী নন। কিন্তু একটা কথা বলি — যদি আপনি সত্যিই এমন কিছু মিস করছেন যা আপনার জীবন বদলে দিতে পারে? আমাদের অনেক মেম্বার প্রথমে আপনার মতই অনুভব করেছিলেন। শুধু একটা ছোট গল্প বলি...`;
    }

    // Auto-save to skills — so brain learns from this Q&A (with validation)
    try {
      const keywords = extractKeywords(text);
      const replyTrimmed = reply.trim();
      const systemMarkers = /(We need to respond|You are (a|an)|Respond as|your task|Review criteria|Keep responses|NEVER|IMPORTANT|test answer|debug|System instructions)/i;
      if (
        keywords.length >= 2 &&
        replyTrimmed.length > 10 &&
        replyTrimmed.length < 2000 &&
        !systemMarkers.test(replyTrimmed) &&
        !replyTrimmed.startsWith("[") &&
        !replyTrimmed.startsWith("{")
      ) {
        await saveSkill(keywords, text, replyTrimmed, "auto_learned");
      }
    } catch (e) {
      console.error("[Skills] Failed to auto-save:", (e as Error)?.message);
    }

    // Record platform preference — user replied on WhatsApp
    await recordPlatformActivity(phone, "whatsapp");

    // Save conversation
    await saveMessage(phone, "user", text, {
      language: lang,
      painPoints,
      interests,
    });

    await saveMessage(phone, "assistant", reply, {
      language: lang,
    });

    // Update lead status
    await updateLeadStatus(phone, "replied");

    const fromBrowser = body.fromBrowser === true;

    if (!fromBrowser) {
      const sendResult = await sendMessage(phone, reply);
      if (!sendResult.success) {
        console.error(`[WhatsApp Webhook] Reply send failed for ${phone}: ${sendResult.error}`);
      } else {
        await updateContactStatus(phone, "replied", reply);
      }
      return NextResponse.json({
        received: true,
        replied: sendResult.success,
        messageId: sendResult.messageId,
        phone, text: reply,
      });
    }

    // fromBrowser = relay (Baileys) mode → also enqueue as pending_web for reliability
    await enqueueMessage(phone, reply, 2, {
      accountId: "web_main",
      messageType: "reply",
      viaRelay: true,
    });
    await updateContactStatus(phone, "replied", reply);
    return NextResponse.json({
      received: true,
      replied: true,
      phone, reply,
      mood, dialect, role,
    });
  } catch (error) {
    console.error("WhatsApp webhook error:", error);
    return NextResponse.json({
      error: error instanceof Error ? error.message : "Webhook failed",
    }, { status: 500 });
  }
}

function calculateSimpleScore(profile: any): number {
  let score = 0;
  if (profile?.gender_guess === "female") score += 5;
  if (profile?.age_group_guess === "18-25") score += 3;
  else if (profile?.age_group_guess === "26-35") score += 2;
  if (profile?.sector) score += 2;
  return score;
}

export async function GET(request: NextRequest) {
  const mode = request.nextUrl.searchParams.get("hub.mode");
  const token = request.nextUrl.searchParams.get("hub.verify_token");
  const challenge = request.nextUrl.searchParams.get("hub.challenge");

  if (mode === "subscribe") {
    if (token === process.env.WHATSAPP_VERIFY_TOKEN) {
      return new NextResponse(challenge, { status: 200 });
    }
    console.error(`[WhatsApp Webhook] Verify token mismatch: received "${token}", expected "${process.env.WHATSAPP_VERIFY_TOKEN}"`);
  }
  return NextResponse.json({ error: "Verification failed" }, { status: 403 });
}
