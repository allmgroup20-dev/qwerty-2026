import { NextRequest, NextResponse } from "next/server";
import { ensureDB } from "@/lib/db";

const GOAL_MESSAGES: Record<string, { title: string; message: string }> = {
  career: { title: "ক্যারিয়ার টিপস", message: "আপনার মতো পেশাদারদের জন্য ডিজাইন করা ক্যারিয়ার-বিল্ডিং কোর্স দেখুন।" },
  freelancing: { title: "ফ্রিল্যান্সিং গাইড", message: "ফ্রিল্যান্সিং শুরু করতে প্রস্তুত? আজই আমাদের ফ্রিল্যান্সিং কোর্স দেখুন।" },
  business: { title: "ব্যবসা বৃদ্ধি", message: "আমাদের বিশেষজ্ঞ-পরিচালিত ব্যবসায়িক কোর্সের মাধ্যমে আপনার ব্যবসা বাড়ান।" },
  skill: { title: "স্কিল ডেভেলপমেন্ট", message: "আপনার আগ্রহ অনুযায়ী নতুন স্কিল ডেভেলপমেন্ট কন্টেন্ট উপলব্ধ।" },
  job: { title: "চাকরির প্রস্তুতি", message: "আমাদের জব-ওরিয়েন্টেড ট্রেনিং প্রোগ্রামের মাধ্যমে আপনার স্বপ্নের চাকরির জন্য প্রস্তুত হন।" },
};

const INTEREST_COURSE_MAP: Record<string, string> = {
  "Web Development": "ওয়েব ডেভেলপমেন্ট স্কিলের চাহিদা অনেক বেশি। আমাদের লেটেস্ট কোর্স দেখুন!",
  "Programming": "প্রোগ্রামিং কোর্স আপনার জন্য নতুন কন্টেন্ট দিয়ে আপডেট করা হয়েছে।",
  "Graphics Design": "নতুন গ্রাফিক ডিজাইন টেকনিক — শিখুন এবং আরও ভাল ডিজাইন তৈরি করুন।",
  "Digital Marketing": "ডিজিটাল মার্কেটিং দ্রুত পরিবর্তন হচ্ছে। আমাদের কোর্সের সাথে এগিয়ে থাকুন।",
  "Video Editing": "ভিডিও এডিটিং টিপস ও ট্রিকস — নতুন মডিউল যুক্ত হয়েছে!",
  "Freelancing": "ফ্রিল্যান্সিং মার্কেটপ্লেস টিপস যা আপনাকে আরও আয় করতে সাহায্য করবে।",
  "English Learning": "ইংরেজি কমিউনিকেশন স্কিল — আমাদের গাইডেড লেসনের সাথে অনুশীলন করুন।",
  "Cyber Security": "সাইবার সিকিউরিটি সচেতনতা কোর্স এখন উপলব্ধ।",
  "AI & ChatGPT": "এআই ও চ্যাটজিপিটি অ্যাডভান্সড টেকনিক — আজই ভবিষ্যৎ শিখুন।",
  "Business": "উদ্যোক্তাদের জন্য ব্যবসায়িক কৌশল ও ম্যানেজমেন্ট টিপস।",
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
        ).bind(worker.worker_id, `"${kw}"-এ আপনার আগ্রহের ভিত্তিতে`, INTEREST_COURSE_MAP[kw]).run();
        sent++;
      }
    }

    // 3. Preferred learning time reminder
    if (worker.preferred_learning_time) {
      const timeLabels: Record<string, string> = { morning: "সকাল", afternoon: "দুপুর", evening: "সন্ধ্যা", night: "রাত" };
      const label = timeLabels[worker.preferred_learning_time] || worker.preferred_learning_time;
      await db.prepare(
        "INSERT INTO notifications (worker_id, title, message, type) VALUES (?, ?, ?, 'reminder')"
      ).bind(worker.worker_id, "শেখার সময়", `আপনার পছন্দের ${label} সময় — শেখার সময়! আপনার কোর্স দেখুন।`).run();
      sent++;
    }

    return NextResponse.json({ success: true, sent });
  } catch (err) {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
