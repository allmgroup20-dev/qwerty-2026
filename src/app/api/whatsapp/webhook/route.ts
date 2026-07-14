import { NextRequest, NextResponse } from "next/server";
import { updateContactStatus, createContact } from "@/lib/whatsapp/contacts";
import { sendMessage } from "@/lib/whatsapp/sender";
import { calculatePriorityScore } from "@/lib/whatsapp/numbers";
import { execute } from "@/lib/db/queries";
import { getDB } from "@/lib/db";
import {
  callAI,
  buildSystemPrompt,
  getPersona,
  analyzePainPoints,
  analyzeInterests,
  detectLanguage,
  getOrCreateProfile,
  updateProfileFromChat,
  updateProfileScore,
  saveMessage,
  findSkill,
} from "@/lib/ai";

function parseIncomingMessage(body: any): { phone: string; text: string; name?: string } | null {
  const entry = body?.entry?.[0];
  const change = entry?.changes?.[0];
  const value = change?.value;
  const messages = value?.messages;
  if (messages?.length) {
    const msg = messages[0];
    if (msg.type === "text" && msg.from && msg.text?.body) {
      return { phone: msg.from, text: msg.text.body, name: value?.contacts?.[0]?.profile?.name };
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
    const body = await request.json();

    const parsed = parseIncomingMessage(body);
    if (!parsed) {
      return NextResponse.json({ error: "Unrecognized message format" }, { status: 400 });
    }

    const { phone, text, name } = parsed;

    const env = await getDB();
    await execute(env,
      "INSERT INTO wa_logs (phone, message, direction, status, message_type, created_at) VALUES (?, ?, 'inbound', 'received', 'text', datetime('now'))",
      [phone, text]
    );

    if (name) {
      await createContact(phone, { name, source: "whatsapp_inbound" });
    } else {
      await createContact(phone, { source: "whatsapp_inbound" });
    }

    const profile = await getOrCreateProfile(phone);
    const persona = getPersona(phone);
    const lang = detectLanguage(text);
    const painPoints = analyzePainPoints(text);
    const interests = analyzeInterests(text);

    await updateProfileFromChat(phone, text);

    const score = calculatePriorityScore({
      gender_guess: profile?.gender_guess,
      age_group_guess: profile?.age_group_guess,
      sector: profile?.sector,
    });
    if (score > 0) {
      await updateProfileScore(phone, score);
    }

    let reply: string | null = null;
    const cachedSkill = await findSkill(text);
    if (cachedSkill) {
      reply = cachedSkill;
    }

    if (!reply) {
      const systemPrompt = await buildSystemPrompt({
        role: "customer",
        persona,
        profile,
        painPoints,
        interests,
        language: lang,
        phone,
      });

      const result = await callAI({
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: text },
        ],
        maxTokens: 600,
      });

      reply = result.text;
    }

    await saveMessage(phone, "user", text, {
      personaName: persona.name,
      personaGender: persona.gender,
      language: lang,
      painPoints,
      interests,
    });

    await saveMessage(phone, "assistant", reply, {
      personaName: persona.name,
      personaGender: persona.gender,
      language: lang,
    });

    const sendResult = await sendMessage(phone, reply);
    await updateContactStatus(phone, "replied", reply);

    return NextResponse.json({
      received: true,
      replied: sendResult.success,
      messageId: sendResult.messageId,
      phone,
      text: reply,
    });
  } catch (error) {
    console.error("WhatsApp webhook error:", error);
    return NextResponse.json({
      error: error instanceof Error ? error.message : "Webhook failed",
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const mode = request.nextUrl.searchParams.get("hub.mode");
  const token = request.nextUrl.searchParams.get("hub.verify_token");
  const challenge = request.nextUrl.searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === process.env.WHATSAPP_VERIFY_TOKEN) {
    return new NextResponse(challenge, { status: 200 });
  }

  return NextResponse.json({ error: "Verification failed" }, { status: 403 });
}
