import { NextRequest, NextResponse } from "next/server";
import { ensureDB } from "@/lib/db";

const GOAL_MESSAGES: Record<string, { title: string; message: string }> = {
  career: { title: "Career Tips", message: "Check our career-building courses designed for professionals like you." },
  freelancing: { title: "Freelancing Guide", message: "Ready to start freelancing? Explore our freelancing courses today." },
  business: { title: "Business Growth", message: "Grow your business with our expert-led business courses." },
  skill: { title: "Skill Development", message: "New skill development content is available based on your interests." },
  job: { title: "Job Preparation", message: "Prepare for your dream job with our job-oriented training programs." },
};

const INTEREST_COURSE_MAP: Record<string, string> = {
  "Web Development": "Web development skills are in high demand. Check our latest course!",
  "Programming": "Programming courses updated with new content just for you.",
  "Graphics Design": "New graphic design techniques — learn and create better designs.",
  "Digital Marketing": "Digital marketing is evolving fast. Stay ahead with our courses.",
  "Video Editing": "Video editing tips and tricks — new module added!",
  "Freelancing": "Freelancing marketplace tips to help you earn more.",
  "English Learning": "English communication skills — practice with our guided lessons.",
  "Cyber Security": "Cyber security awareness course now available.",
  "AI & ChatGPT": "AI & ChatGPT advanced techniques — learn the future today.",
  "Business": "Business strategy and management tips for entrepreneurs.",
};

export async function POST(request: NextRequest) {
  try {
    const { workerId } = await request.json() as { workerId?: string };
    if (!workerId) return NextResponse.json({ error: "workerId required" }, { status: 400 });

    const db = await ensureDB();
    const worker = await db.prepare(
      "SELECT worker_id, name, goal, preferred_learning_time FROM workers WHERE worker_id = ?"
    ).bind(workerId).first() as { worker_id: string; name: string; goal?: string; preferred_learning_time?: string } | undefined;

    if (!worker) return NextResponse.json({ error: "Worker not found" }, { status: 404 });

    let sent = 0;

    // 1. Goal-based notification
    if (worker.goal && GOAL_MESSAGES[worker.goal]) {
      const msg = GOAL_MESSAGES[worker.goal];
      await db.prepare(
        "INSERT INTO notifications (worker_id, title, message, type) VALUES (?, ?, ?, 'personalized')"
      ).bind(worker.worker_id, msg.title, msg.message).run();
      sent++;
    }

    // 2. Interest-based notification (from user_behavior_scores or onboarding events)
    const interests = await db.prepare(
      "SELECT search_keyword FROM user_events WHERE worker_id = ? AND event_type = 'search' AND search_keyword IS NOT NULL GROUP BY search_keyword ORDER BY COUNT(*) DESC LIMIT 3"
    ).bind(workerId).all() as { results: { search_keyword: string }[] };

    for (const ev of interests.results) {
      const kw = ev.search_keyword;
      if (INTEREST_COURSE_MAP[kw]) {
        await db.prepare(
          "INSERT INTO notifications (worker_id, title, message, type) VALUES (?, ?, ?, 'personalized')"
        ).bind(worker.worker_id, `Based on your interest in ${kw}`, INTEREST_COURSE_MAP[kw]).run();
        sent++;
      }
    }

    // 3. Preferred learning time reminder
    if (worker.preferred_learning_time) {
      const timeLabels: Record<string, string> = { morning: "Morning", afternoon: "Afternoon", evening: "Evening", night: "Night" };
      const label = timeLabels[worker.preferred_learning_time] || worker.preferred_learning_time;
      await db.prepare(
        "INSERT INTO notifications (worker_id, title, message, type) VALUES (?, ?, ?, 'reminder')"
      ).bind(worker.worker_id, "Learning Time", `Your preferred ${label} time — time to learn! Check your courses.`).run();
      sent++;
    }

    return NextResponse.json({ success: true, sent });
  } catch (err) {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
