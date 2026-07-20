import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import { query, queryFirst } from "@/lib/db/queries";

function getRecommendations(profile: {
  trust_score: number; control_sensitivity: string | null;
  manipulation_risk: string | null; pain_points: string | null;
  sector: string | null; status: string;
}) {
  const tips: string[] = [];
  let approach = "standard";

  if (profile.trust_score < 4) {
    tips.push("Trust is critically low. Do NOT push for sales. Focus on rebuilding trust through transparency and patience.");
    tips.push("Use 'I understand your caution' validation. Provide guarantees and risk-free trials.");
    approach = "trust_repair";
  } else if (profile.trust_score < 7) {
    tips.push("Trust is developing. Provide social proof, testimonials, and case studies to build confidence.");
    tips.push("Avoid hard selling. Use consultative approach — ask questions, listen deeply.");
    approach = "trust_building";
  } else {
    tips.push("Trust is high. You can move toward commitment, but maintain authenticity.");
    approach = "direct";
  }

  if (profile.control_sensitivity === "high") {
    tips.push("This person values autonomy. Always frame choices as their decision. Use 'you decide', 'your choice', 'only if it feels right'.");
    tips.push("Avoid urgency tactics or pressure. Give them space to think.");
  }

  if (profile.manipulation_risk === "high") {
    tips.push("This person is vulnerable to manipulation. Be extra transparent. Explain terms clearly. Get explicit consent.");
    tips.push("Do NOT use scarcity or high-pressure tactics. They may feel trapped and shut down.");
  }

  if (profile.pain_points) {
    const pp = profile.pain_points.toLowerCase();
    if (pp.includes("financial") || pp.includes("loss") || pp.includes("money")) {
      tips.push("Financial fear detected. Focus on ROI, guarantees, and risk reversal. Show how investment pays for itself.");
    }
    if (pp.includes("deceived") || pp.includes("scam") || pp.includes("fraud") || pp.includes("cheat")) {
      tips.push("Fear of being deceived. Be hyper-transparent. Share credentials, testimonials, and third-party validation.");
    }
    if (pp.includes("control") || pp.includes("autonomy") || pp.includes("freedom") || pp.includes("trap")) {
      tips.push("Fear of losing freedom. Emphasize flexibility, no long-term commitment, easy exit options.");
    }
    if (pp.includes("social") || pp.includes("status") || pp.includes("reputation") || pp.includes("shame")) {
      tips.push("Social status concern. Frame as 'people like you choose this'. Avoid anything that could be embarrassing.");
    }
  }

  if (profile.sector === "student") {
    tips.push("Student audience — emphasize affordability, educational value, and future benefits.");
  } else if (profile.sector === "homemaker") {
    tips.push("Homemaker — emphasize family benefits, security, and ease of use.");
  } else if (profile.sector === "business_owner") {
    tips.push("Business owner — emphasize ROI, efficiency, and competitive advantage.");
  }

  return { approach, tips };
}

export async function GET(request: NextRequest) {
  try {
    const db = await getDB();
    const { searchParams } = new URL(request.url);
    const phone = searchParams.get("phone");
    const search = searchParams.get("search");

    // If no phone or search, return recent profiles list
    if (!phone && !search) {
      const recent = await query<{
        phone: string; name_guess: string | null; trust_score: number;
        control_sensitivity: string | null; manipulation_risk: string | null;
        sector: string | null; status: string; total_chats: number;
        last_chat_at: string | null; updated_at: string;
      }>(db, `SELECT phone, name_guess, trust_score, control_sensitivity, manipulation_risk,
        sector, status, total_chats, last_chat_at, updated_at
      FROM ai_phone_profiles
      WHERE trust_score IS NOT NULL
      ORDER BY updated_at DESC LIMIT 30`);

      return NextResponse.json({ success: true, profiles: recent || [] });
    }

    // Search by phone or name
    let profile: any = null;
    if (phone) {
      profile = await queryFirst<any>(db, "SELECT * FROM ai_phone_profiles WHERE phone = ?", [phone]);
    } else if (search) {
      profile = await queryFirst<any>(db,
        `SELECT * FROM ai_phone_profiles WHERE phone LIKE ? OR name_guess LIKE ? ORDER BY updated_at DESC`,
        [`%${search}%`, `%${search}%`]);
    }

    if (!profile) {
      return NextResponse.json({ success: false, error: "Profile not found" }, { status: 404 });
    }

    // Get conversation history
    const conversations = await query<any>(db,
      `SELECT id, summary, key_points, messages, language, source, created_at, updated_at
      FROM ai_conversations WHERE phone = ? ORDER BY created_at DESC LIMIT 10`, [phone]);

    // Get training modules relevant to this profile's psychology
    const modules = await query<any>(db,
      `SELECT id, knowledge_title, knowledge_content, knowledge_category
      FROM ai_knowledge_distribution WHERE target_id = 'all' AND knowledge_category IN ('psychology', 'sales', 'communication')
      ORDER BY created_at DESC LIMIT 5`);

    // Get recommendations
    const recs = getRecommendations(profile);

    // Parse key_points from conversations
    const convWithPsych = (conversations || []).map((c: any) => ({
      id: c.id, summary: c.summary,
      keyPoints: c.key_points ? (() => { try { return JSON.parse(c.key_points); } catch { return {}; } })() : {},
      messages: c.messages ? (() => { try { return JSON.parse(c.messages).slice(-2); } catch { return []; } })() : [],
      language: c.language, source: c.source, created_at: c.created_at, updated_at: c.updated_at,
    }));

    return NextResponse.json({
      success: true,
      profile: {
        phone: profile.phone,
        name: profile.name_guess,
        gender: profile.gender_guess,
        ageGroup: profile.age_group_guess,
        sector: profile.sector,
        language: profile.language,
        painPoints: profile.pain_points ? (() => { try { return JSON.parse(profile.pain_points); } catch { return []; } })() : [],
        interests: profile.interests ? (() => { try { return JSON.parse(profile.interests); } catch { return []; } })() : [],
        priorityScore: profile.priority_score,
        totalChats: profile.total_chats,
        lastChatAt: profile.last_chat_at,
        status: profile.status,
        notes: profile.notes,
        trustScore: profile.trust_score,
        controlSensitivity: profile.control_sensitivity,
        manipulationRisk: profile.manipulation_risk,
        communicationStyle: profile.communication_style || "standard",
        trustReadiness: profile.trust_readiness || "needs_time",
      },
      conversations: convWithPsych,
      recommendations: recs,
      trainingModules: modules || [],
    });

  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Failed to fetch" }, { status: 500 });
  }
}
