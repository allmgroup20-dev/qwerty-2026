export type Mood = "enthusiastic" | "neutral" | "skeptical" | "bored" | "distracted";
export type Dialect = "dhaka" | "chittagong" | "sylhet" | "rural" | "standard";
export type Religion = "muslim" | "hindu" | "christian" | "unknown";

const MOOD_PATTERNS: Record<Mood, RegExp[]> = {
  enthusiastic: [
    /\b(?:great|excellent|wonder|amazing|awesome|fantastic|thank|thanks|dhan|ধন্যবাদ|চমৎকার|দারুন|ভাল)\b/i,
    /(?:interested|আগ্রহী|চাই|চায়)\b.{0,30}(?:join|যোগ|করব|start|শুরু)/i,
    /(?:tell me more|আরও বলুন|বিস্তারিত|details?|how to join)/i,
  ],
  neutral: [
    /\b(?:ok|okay|ঠিক আছে|হ্যা|হ্যাঁ|ji|জি|ki|কি|accha|আচ্ছা)\b/i,
    /^.{1,30}\?$/,
    /(?:what is|কি|কী|who|কে|where|কোথায়|when|কখন)/i,
  ],
  skeptical: [
    /\b(?:really|সত্যি|সত্যিই|নিশ্চিত|true|จริง)\b/i,
    /(?:scam|fraud|প্রতারণা|ভুয়া|ঠকা|cheat|fake)/i,
    /(?:doubt|সন্দেহ|কনফিউজড|confus)/i,
    /(?:prove|প্রমাণ|show me|দেখান|example|উদাহরণ)/i,
    /(?:too good|এত ভাল|suspicious|সন্দেহজনক)/i,
  ],
  bored: [
    /\b(?:hmm|হুম|hm|ok ok|tell me|bolen|বলেন|shune|শুনে)\b/i,
    /^.{1,10}$/,  // very short replies
    /(?:later|পরে|after|after|time|সময়).{0,20}(?:no|nι|না|নাই)/i,
  ],
  distracted: [
    /\b(?:busy|ব্যস্ত|later|পরে|call me|ফোন|phone|time|সময়|now|এখন|নাই)\b/i,
    /(?:no time|সময় নেই|free নাই|later|পরে বলবেন)/i,
    /(?:work|কাজ|job|চাকরি).{0,20}(?:doing|করছি|busy|ব্যস্ত)/i,
  ],
};

const DIALECT_PATTERNS: Record<Dialect, RegExp[]> = {
  dhaka: [/\b(?:আইচ্ছা|কইত|কইলাম|বইলা|মইন্যা|হইবো|খাইত|যাইত|কইতাছ)\b/i],
  chittagong: [/\b(?:হুনি|হুনছ|হুনবা|কিতা|গরর|ঘুরর|মারে|তুইলা|ফাটায়|নিগর|বাইয়া)\b/i],
  sylhet: [/\b(?:বেরা|বেরি|হেলা|হেলি|হেইতা|খালি|খন|বাইরে|গরিব|হইবো|মারি)\b/i],
  rural: [/\b(?:গাঁও|গেরাম|মফস্বল|বিলাত|গিরিব|গিরিব|ন rid)\b/i],
  standard: [],
};

const RELIGION_PATTERNS: Record<Religion, RegExp[]> = {
  muslim: [
    /\b(?:allah|আল্লাহ|inshaallah|ইনশাআল্লাহ|mashaallah|মাশাআল্লাহ|alhamdulillah|আলহামদুলিল্লাহ|assalamu|আসসালামু)\b/i,
    /\b(?:namaz|নামাজ|roja|রোজা|kuran|কুরআন|masjid|মসজিদ|eid|ঈদ)\b/i,
    /\b(?:muhammad|মুহাম্মদ|s|স:)|\b(?:sal allahu)\b/i,
  ],
  hindu: [
    /\b(?:nomoskar|নমস্কার|hari|হরি|krishna|কৃষ্ণ|shiva|শিব|durga|দুর্গা)\b/i,
    /\b(?:mandir|মন্দির|puja|পূজা|durgapuja|দুর্গাপূজা)\b/i,
  ],
  christian: [
    /\b(?:jesus|যীশু|christ|খ্রিস্ট|church|গির্জা|bible|বাইবেল)\b/i,
    /\b(?:easter|ইস্টার|christmas|ক্রিসমাস)\b/i,
  ],
  unknown: [],
};

const PAIN_POINT_PATTERNS: Record<string, RegExp[]> = {
  no_income: [
    /(?:income|money|earn|income|টাকা|আয়|রোজগার).{0,30}(?:no|not|none|নাই|না|নেই)/i,
    /(?:no|not|none|নাই|না).{0,30}(?:income|money|work|job|চাকরি|কাজ)/i,
    /(?:unemployed|বেকার|কাজ নেই)/i,
    /(?:struggling|স্ট্রাগল|কষ্ট).{0,20}(?:financially|money|টাকা)/i,
  ],
  scam_fear: [
    /(?:scam|fraud|fake|cheat|প্রতারণা|ভুয়া|ঠক)/i,
    /(?:trust|বিশ্বাস).{0,20}(?:not|no|নাই)/i,
    /(?:suspicious|সন্দেহজনক|সন্দেহ)/i,
    /(?:legit|real?.{0,10}(?:program|business|কাজ|বিজনেস))/i,
  ],
  pricing: [
    /(?:price|cost|fee|charge|মূল্য|দাম|খরচ|টাকা).{0,20}(?:high|more|বেশি|ঢের)/i,
    /(?:how much|কত টাকা)/i,
    /(?:expensive|দামী|ব্যয়বহুল)/i,
    /(?:money back| refund|টাকা ফেরত)/i,
  ],
  no_skill: [
    /(?:no|don't|can't|নাই|পারি না|না জানি).{0,30}(?:skill|expert|experience|experience|দক্ষতা|অভিজ্ঞতা)/i,
    /(?:teach?|training|প্রশিক্ষণ|শিখতে)/i,
    /(?:beginner|new|start|শুরু|নতুন)/i,
    /(?:computer|tech|টেক).{0,20}(?:no|not|নাই)/i,
  ],
  no_time: [
    /(?:no|not|busy|free|সময়|time|ব্যস্ত).{0,20}(?:time|সময়)/i,
    /(?:full time|full-time|whole day|সারাদিন)/i,
    /(?:job|চাকরি).{0,20}(?:time|সময়)/i,
    /(?:family|পরিবার|kids|ছেলে|মেয়ে).{0,20}(?:time|সময়)/i,
  ],
};

const INTEREST_PATTERNS: Record<string, RegExp[]> = {
  freelancing: [
    /(?:freelanc|ফ্রিল্যান্স)/i,
    /(?:online.{0,10}(?:work|job|earn|income|কাজ|আয়))/i,
    /(?:fiverr|upwork|freelancer)/i,
    /(?:remote.{0,10}(?:work|job))/i,
  ],
  digital_marketing: [
    /(?:marketing|মার্কেটিং)/i,
    /(?:social media|সোশ্যাল মিডিয়া|facebook|youtube)/i,
    /(?:ads?|advertise|প্রচার|বিজ্ঞাপন)/i,
    /(?:seo|digital)/i,
  ],
  web_design: [
    /(?:web|website|ওয়েবসাইট|ওয়েব)/i,
    /(?:design|ডিজাইন)/i,
    /(?:wordpress|shopify)/i,
    /(?:developer|ডেভেলপার)/i,
  ],
  video_editing: [
    /(?:video|ভিডিও)/i,
    /(?:edit|এডিট)/i,
    /(?:youtube|টিউব)/i,
    /(?:content.{0,10}(?:create|make))/i,
  ],
  programming: [
    /(?:program|code|coding|প্রোগ্রাম|কোড)/i,
    /(?:app|application|mobile.{0,10}(?:dev|app))/i,
    /(?:software|সফটওয়্যার)/i,
    /(?:python|javascript|php|react)/i,
  ],
  spoken_english: [
    /(?:english|ইংরেজি|ইংলিশ)/i,
    /(?:spoken|speaking|বলা)/i,
    /(?:language|ভাষা|ল্যাঙ্গুয়েজ)/i,
    /(?:communication|কমিউনিকেশন)/i,
  ],
};

export function detectLanguage(text: string): "bn" | "en" | "mixed" {
  const bengaliChars = text.match(/[\u0980-\u09FF]/g);
  if (!bengaliChars) return "en";
  const ratio = bengaliChars.length / text.length;
  if (ratio > 0.3) return "bn";
  if (ratio > 0.05) return "mixed";
  return "en";
}

export function analyzePainPoints(text: string): string[] {
  const found: string[] = [];
  for (const [pain, patterns] of Object.entries(PAIN_POINT_PATTERNS)) {
    for (const pattern of patterns) {
      if (pattern.test(text)) {
        found.push(pain);
        break;
      }
    }
  }
  return found;
}

export function analyzeInterests(text: string): string[] {
  const found: string[] = [];
  for (const [interest, patterns] of Object.entries(INTEREST_PATTERNS)) {
    for (const pattern of patterns) {
      if (pattern.test(text)) {
        found.push(interest);
        break;
      }
    }
  }
  return found;
}

export function detectMood(text: string): Mood {
  const scores: Record<Mood, number> = { enthusiastic: 0, neutral: 0, skeptical: 0, bored: 0, distracted: 0 };
  for (const [mood, patterns] of Object.entries(MOOD_PATTERNS)) {
    for (const pattern of patterns) {
      if (pattern.test(text)) scores[mood as Mood] += 1.5;
    }
  }
  const len = text.length;
  if (len < 15) scores.bored += 1;
  if (text.includes("?")) scores.neutral += 0.5;
  if (text.includes("!")) scores.enthusiastic += 1;
  if (/\b(?:no|na|nah|ন|না)\b/i.test(text) && /\b(?:but|kintu|কিন্তু|তবে)\b/i.test(text)) scores.skeptical += 2;
  let best: Mood = "neutral";
  let bestScore = 0;
  for (const [mood, score] of Object.entries(scores)) {
    if (score > bestScore) { bestScore = score; best = mood as Mood; }
  }
  return best;
}

export function detectDialect(text: string): Dialect {
  for (const [dialect, patterns] of Object.entries(DIALECT_PATTERNS)) {
    if (dialect === "standard") continue;
    for (const pattern of patterns) {
      if (pattern.test(text)) return dialect as Dialect;
    }
  }
  return "standard";
}

export function detectReligion(text: string): Religion {
  for (const [religion, patterns] of Object.entries(RELIGION_PATTERNS)) {
    if (religion === "unknown") continue;
    for (const pattern of patterns) {
      if (pattern.test(text)) return religion as Religion;
    }
  }
  return "unknown";
}

export function extractKeywords(text: string): string[] {
  const stopWords = new Set(["the","a","an","is","are","was","were","be","been","being","have","has","had","do","does","did","will","would","can","could","shall","should","may","might","must","i","you","he","she","it","we","they","me","him","her","us","them","my","your","his","its","our","their","this","that","these","those","and","or","but","if","because","as","until","while","of","at","by","for","with","about","against","between","into","through","during","before","after","above","below","from","up","down","to","in","out","on","off","over","under","again","further","then","once","here","there","when","where","why","how","all","each","every","both","few","more","most","other","some","such","no","nor","not","only","own","same","so","than","too","very","am", "এবং", "এই", "ও", "করা", "করে", "কাছে", "কিন্তু", "কেউ", "কোন", "তা", "থেকে", "দেওয়া", "দিয়ে", "দ্বারা", "ধরন", "না", "নিয়ে", "পরে", "প্রতি", "বলে", "বহু", "বা", "বিনা", " মধ্যে", "ভিতর", "মতো", "যখন", "যা", "যে", "সঙ্গে", "সব", "সহ", "সে"]);
  const words = text.toLowerCase().split(/[\s,;:.!?()\[\]{}""'']+/).filter(w => w.length > 2 && !stopWords.has(w));
  const freq = new Map<string, number>();
  for (const w of words) freq.set(w, (freq.get(w) || 0) + 1);
  return [...freq.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10).map(([w]) => w);
}
