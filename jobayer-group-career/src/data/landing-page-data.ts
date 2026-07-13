export interface Testimonial {
  stars: string;
  rating: string;
  quoteBn: string;
  quoteEn: string;
  authorBn: string;
  authorEn: string;
  labelBn: string;
  labelEn: string;
}

export interface FaqItem {
  qBn: string;
  qEn: string;
  aBn: string;
  aEn: string;
}

export interface Trainer {
  name: string;
  nameBn: string;
  specialtyBn: string;
  specialtyEn: string;
  credentialBn: string;
  credentialEn: string;
  coursesBn: string[];
  coursesEn: string[];
  image: string;
  bioBn: string;
  bioEn: string;
}

export interface PlatformItem {
  name: string;
  nameBn: string;
  logo: string;
}

export interface CourseItem {
  nameBn: string;
  nameEn: string;
  originalPrice?: number;
}

export interface CourseCategory {
  id: string;
  icon: string;
  titleBn: string;
  titleEn: string;
  platformLogos: string[];
  trainers: string[];
  courses: CourseItem[];
}

export interface GalleryImage {
  src: string;
  alt: string;
}

export interface StatItem {
  num?: string;
  labelBn?: string;
  labelEn?: string;
  chipBn?: string;
  chipEn?: string;
  separator?: boolean;
}

export const siteName = "Jobayer Group Career";

export const heroData = {
  headlineBn: "⏳ শেষবারের মতো অফার: ১০ লক্ষ টাকার ২৩০+ কোর্স আজ মাত্র ৯৯ টাকায়!",
  headlineEn: "⏳ Last Chance: 230+ Premium Courses Worth ৳10,00,000+ — Today Only ৳99!",
  subheadBn: "আগামী ২৪ ঘণ্টা পর দাম বেড়ে হবে ১,৪৯৯ টাকা। এই মুহূর্তে যুক্ত হলে পাচ্ছেন দেশের সেরা ১২ জন প্রশিক্ষকের ২৩০টির বেশি কোর্স — আজীবনের জন্য। পছন্দ না হলে ২৪ ঘণ্টায় টাকা ফেরত।",
  subheadEn: "After 24 hours the price will rise to ৳1,499. Join now and get 230+ courses from Bangladesh's top 12 trainers — lifetime access. Not satisfied? 24-hour money-back guarantee.",
  badges: [
    { icon: "🏆", textBn: "২৩০+ প্রিমিয়াম কোর্স (উপহার)", textEn: "230+ Premium Courses (Gift)" },
    { icon: "💰", textBn: "লাইভ আয়ের প্রমাণ", textEn: "Live Income Proof" },
    { icon: "💳", textBn: "বাস্তব পেমেন্ট প্রমাণ", textEn: "Real Payment Proof" },
    { icon: "🛡️", textBn: "২৪ ঘণ্টা টাকা ফেরত গ্যারান্টি", textEn: "24-hour Money-Back Guarantee" },
  ],
  problemBn: "প্রিমিয়াম কোর্সের দাম ১০,০০০-৮৫,০০০+ টাকা — সবার জন্য affordable না। ইউটিউবে ভালো কন্টেন্ট আছে কিন্তু স্ট্রাকচারড গাইডেন্স ও রোডম্যাপ নেই। বিভিন্ন প্ল্যাটফর্মে ছড়িয়ে থাকা কোর্স — এক জায়গায় পাবেন না।",
  problemEn: "Premium courses cost ৳10,000-85,000+ — not affordable for everyone. YouTube has good content but no structured guidance or roadmap. Courses scattered across platforms — not all in one place.",
  solutionBn: "২৩০+ প্রিমিয়াম কোর্স মাত্র ৯৯ টাকায় — ১০ লক্ষ টাকার কন্টেন্ট! ১০টি বিভাগে A-Z স্ট্রাকচারড কোর্স, বিগিনার থেকে প্রো গাইডেন্স। লাইফটাইম অ্যাক্সেস + ফ্রি আপডেট।",
  solutionEn: "230+ premium courses for only ৳99 — content worth ৳10,00,000+! 10 categories of A-Z structured courses, beginner to pro guidance. Lifetime access + free updates.",
  ctaBn: "🔥 হ্যাঁ, দাম বাড়ার আগে মাত্র ৯৯ টাকায় আজীবন অ্যাক্সেস নিন →",
  ctaEn: "🔥 Yes, Get Lifetime Access for Only 99 BDT Before Price Hike →",
  ctaHref: "/register",
  liveCountLabelBn: "সক্রিয় শিক্ষার্থী",
  liveCountLabelEn: "Active Students",
};

export const stats: StatItem[] = [
  { num: "৮৬৬+", labelBn: "সক্রিয় শিক্ষার্থী", labelEn: "Active Professionals" },
  { separator: true },
  { num: "২৩০+", labelBn: "প্রিমিয়াম কোর্স", labelEn: "Premium Courses" },
  { separator: true },
  { num: "১২", labelBn: "এক্সপার্ট ট্রেইনার", labelEn: "Expert Trainers" },
  { separator: true },
  { num: "৳৯৯", labelBn: "শুধু আজ", labelEn: "Only Today" },
];

export const platforms: PlatformItem[] = [
  { name: "Upwork", nameBn: "আপওয়ার্ক", logo: "/images/platforms/upwork.png" },
  { name: "Fiverr", nameBn: "ফাইভার", logo: "/images/platforms/fiverr.png" },
  { name: "Shopify", nameBn: "শপিফাই", logo: "/images/platforms/shopify.png" },
  { name: "WordPress", nameBn: "ওয়ার্ডপ্রেস", logo: "/images/platforms/wordpress.png" },
  { name: "Amazon", nameBn: "অ্যামাজন", logo: "/images/platforms/amazon.png" },
  { name: "YouTube", nameBn: "ইউটিউব", logo: "/images/platforms/youtube.png" },
  { name: "Freelancer", nameBn: "ফ্রিল্যান্সার", logo: "/images/platforms/freelancer.png" },
  { name: "Figma", nameBn: "ফিগমা", logo: "/images/platforms/figma.png" },
];

export const trainers: Trainer[] = [
  { name: "Tanvirul Islam", nameBn: "তানভিরুল ইসলাম", specialtyBn: "ইংরেজি ও নেতৃত্ব", specialtyEn: "English & Leadership", credentialBn: "ইংরেজি, মানসিক স্বাস্থ্য ও নেতৃত্বে বিশেষজ্ঞ", credentialEn: "Expert in English, Mental Health & Leadership", coursesBn: [], coursesEn: [], image: "/images/trainers/tanvirul-islam.jpg", bioBn: "ইংরেজি, মানসিক স্বাস্থ্য ও নেতৃত্বে বিশেষজ্ঞ।", bioEn: "Expert in English, Mental Health & Leadership." },
  { name: "Shariful Islam", nameBn: "শরিফুল ইসলাম", specialtyBn: "ইংরেজি ও ভর্তি", specialtyEn: "English & Admission", credentialBn: "ইংরেজি ও বিশ্ববিদ্যালয় ভর্তিতে বিশেষজ্ঞ", credentialEn: "Expert in English & University Admission", coursesBn: [], coursesEn: [], image: "/images/trainers/shariful-islam.jpg", bioBn: "ইংরেজি ও বিশ্ববিদ্যালয় ভর্তিতে বিশেষজ্ঞ।", bioEn: "Expert in English & University Admission." },
  { name: "Md. Rashed", nameBn: "মোঃ রাশেদ", specialtyBn: "ফ্রিল্যান্সিং ও ডেভেলপমেন্ট", specialtyEn: "Freelancing & Development", credentialBn: "ফ্রিল্যান্সিং ও ডেভেলপমেন্টে বিশেষজ্ঞ", credentialEn: "Expert in Freelancing & Development", coursesBn: [], coursesEn: [], image: "/images/trainers/md-rashed.jpg", bioBn: "ফ্রিল্যান্সিং ও ডেভেলপমেন্টে বিশেষজ্ঞ।", bioEn: "Expert in Freelancing & Development." },
  { name: "Md. Hasan", nameBn: "মোঃ হাসান", specialtyBn: "ই-কমার্স ও ডিজিটাল মার্কেটিং", specialtyEn: "E-Commerce & Digital Marketing", credentialBn: "ই-কমার্স ও ডিজিটাল মার্কেটিং এ বিশেষজ্ঞ", credentialEn: "Expert in E-Commerce & Digital Marketing", coursesBn: [], coursesEn: [], image: "/images/trainers/md-hasan.jpg", bioBn: "ই-কমার্স ও ডিজিটাল মার্কেটিং এ বিশেষজ্ঞ।", bioEn: "Expert in E-Commerce & Digital Marketing." },
  { name: "Abdullah Al Mamun", nameBn: "আব্দুল্লাহ আল মামুন", specialtyBn: "UI/UX ও ডিজাইন", specialtyEn: "UI/UX & Design", credentialBn: "UI/UX ও ডিজাইনে বিশেষজ্ঞ", credentialEn: "Expert in UI/UX & Design", coursesBn: [], coursesEn: [], image: "/images/trainers/abdullah-al-mamun.jpg", bioBn: "UI/UX ও ডিজাইনে বিশেষজ্ঞ।", bioEn: "Expert in UI/UX & Design." },
  { name: "Sajib Das", nameBn: "সাজিব দাস", specialtyBn: "ডেভেলপমেন্ট ও সফটওয়্যার টুলস", specialtyEn: "Development & Software Tools", credentialBn: "ডেভেলপমেন্ট ও সফটওয়্যার টুলসে বিশেষজ্ঞ", credentialEn: "Expert in Development & Software Tools", coursesBn: [], coursesEn: [], image: "/images/trainers/sajib-das.jpg", bioBn: "ডেভেলপমেন্ট ও সফটওয়্যার টুলসে বিশেষজ্ঞ।", bioEn: "Expert in Development & Software Tools." },
  { name: "Jakir Hossain", nameBn: "জাকির হোসেন", specialtyBn: "ডিজিটাল মার্কেটিং ও ই-কমার্স", specialtyEn: "Digital Marketing & E-Commerce", credentialBn: "ডিজিটাল মার্কেটিং ও ই-কমার্সে বিশেষজ্ঞ", credentialEn: "Expert in Digital Marketing & E-Commerce", coursesBn: [], coursesEn: [], image: "/images/trainers/jakir-hossain.jpg", bioBn: "ডিজিটাল মার্কেটিং ও ই-কমার্সে বিশেষজ্ঞ।", bioEn: "Expert in Digital Marketing & E-Commerce." },
  { name: "Mahmud Hasan", nameBn: "মাহমুদ হাসান", specialtyBn: "ফ্রিল্যান্সিং ও ক্যারিয়ার ডেভেলপমেন্ট", specialtyEn: "Freelancing & Career Development", credentialBn: "ফ্রিল্যান্সিং ও ক্যারিয়ার ডেভেলপমেন্টে বিশেষজ্ঞ", credentialEn: "Expert in Freelancing & Career Development", coursesBn: [], coursesEn: [], image: "/images/trainers/mahmud-hasan.jpg", bioBn: "ফ্রিল্যান্সিং ও ক্যারিয়ার ডেভেলপমেন্টে বিশেষজ্ঞ।", bioEn: "Expert in Freelancing & Career Development." },
  { name: "Rafiqul Islam", nameBn: "রফিকুল ইসলাম", specialtyBn: "ভাষা ও পেশা", specialtyEn: "Language & Job Preparation", credentialBn: "ভাষা ও পেশা প্রস্তুতিতে বিশেষজ্ঞ", credentialEn: "Expert in Language & Job Preparation", coursesBn: [], coursesEn: [], image: "/images/trainers/rafiqul-islam.jpg", bioBn: "ভাষা ও পেশা প্রস্তুতিতে বিশেষজ্ঞ।", bioEn: "Expert in Language & Job Preparation." },
  { name: "Sharmin Akhter", nameBn: "শারমিন আখতার", specialtyBn: "মাল্টিমিডিয়া ও কন্টেন্ট ক্রিয়েশন", specialtyEn: "Multimedia & Content Creation", credentialBn: "মাল্টিমিডিয়া ও কন্টেন্ট ক্রিয়েশনে বিশেষজ্ঞ", credentialEn: "Expert in Multimedia & Content Creation", coursesBn: [], coursesEn: [], image: "/images/trainers/sharmin-akhter.jpg", bioBn: "মাল্টিমিডিয়া ও কন্টেন্ট ক্রিয়েশনে বিশেষজ্ঞ।", bioEn: "Expert in Multimedia & Content Creation." },
  { name: "Nusrat Jahan", nameBn: "নুসরাত জাহান", specialtyBn: "UI/UX ও গ্রাফিক ডিজাইন", specialtyEn: "UI/UX & Graphic Design", credentialBn: "UI/UX ও গ্রাফিক ডিজাইনে বিশেষজ্ঞ", credentialEn: "Expert in UI/UX & Graphic Design", coursesBn: [], coursesEn: [], image: "/images/trainers/nusrat-jahan.jpg", bioBn: "UI/UX ও গ্রাফিক ডিজাইনে বিশেষজ্ঞ।", bioEn: "Expert in UI/UX & Graphic Design." },
  { name: "Imran Hossain", nameBn: "ইমরান হোসেন", specialtyBn: "সফটওয়্যার টুলস ও ডেভেলপমেন্ট", specialtyEn: "Software Tools & Development", credentialBn: "সফটওয়্যার টুলস ও ডেভেলপমেন্টে বিশেষজ্ঞ", credentialEn: "Expert in Software Tools & Development", coursesBn: [], coursesEn: [], image: "/images/trainers/imran-hossain.jpg", bioBn: "সফটওয়্যার টুলস ও ডেভেলপমেন্টে বিশেষজ্ঞ।", bioEn: "Expert in Software Tools & Development." },
  { name: "Farzana Yesmin", nameBn: "ফারজানা ইয়াসমিন", specialtyBn: "ভাষা ও যোগাযোগ", specialtyEn: "Language & Communication", credentialBn: "ভাষা ও যোগাযোগে বিশেষজ্ঞ", credentialEn: "Expert in Language & Communication", coursesBn: [], coursesEn: [], image: "/images/trainers/farzana-yesmin.jpg", bioBn: "ভাষা ও যোগাযোগে বিশেষজ্ঞ।", bioEn: "Expert in Language & Communication." },
  { name: "Anisur Rahman", nameBn: "আনিসুর রহমান", specialtyBn: "ই-কমার্স ও ডিজিটাল ব্যবসা", specialtyEn: "E-Commerce & Digital Business", credentialBn: "ই-কমার্স ও ডিজিটাল ব্যবসায় বিশেষজ্ঞ", credentialEn: "Expert in E-Commerce & Digital Business", coursesBn: [], coursesEn: [], image: "/images/trainers/anisur-rahman.jpg", bioBn: "ই-কমার্স ও ডিজিটাল ব্যবসায় বিশেষজ্ঞ।", bioEn: "Expert in E-Commerce & Digital Business." },
];

export const courseCategories: CourseCategory[] = [
  {
    id: "knowledge-skills", icon: "🧠",
    titleBn: "নলেজ ও স্কিলস", titleEn: "Knowledge & Skills",
    platformLogos: ["/images/platforms/fiverr.png", "/images/platforms/upwork.png"],
    trainers: ["Tanvirul Islam", "Shariful Islam"],
    courses: [
      { nameBn: "ইংরেজি ভাষা কোর্স (HSC থেকে মাস্টার্স)", nameEn: "English Language Course (HSC to Masters)", originalPrice: 2500 },
      { nameBn: "IELTS ক্র্যাশ কোর্স", nameEn: "IELTS Crash Course", originalPrice: 2000 },
      { nameBn: "বিশ্ববিদ্যালয় ভর্তির জন্য ইংরেজি", nameEn: "English for University Admission", originalPrice: 2000 },
      { nameBn: "মানসিক স্বাস্থ্য ও সুখ", nameEn: "Mental Health & Happiness", originalPrice: 1500 },
      { nameBn: "পাবলিক স্পিকিং: ভয় থেকে সুপারস্টার", nameEn: "Public Speaking: From Scared to Superstar", originalPrice: 2000 },
      { nameBn: "কার্যকরী যোগাযোগ কোর্স", nameEn: "Effective Communication Course", originalPrice: 1500 },
      { nameBn: "ফান ও স্পোকেন ইংলিশ", nameEn: "Fun & Spoken English", originalPrice: 2000 },
      { nameBn: "শারীরিক স্বাস্থ্য ও জিম", nameEn: "Physical Health & GYM", originalPrice: 1500 },
      { nameBn: "নেতৃত্ব ও ব্যবস্থাপনা", nameEn: "Leadership & Management", originalPrice: 2000 },
      { nameBn: "সাফল্যের মনোবিজ্ঞান", nameEn: "Psychology of Success", originalPrice: 1500 },
      { nameBn: "ইংরেজি স্পিকিং বুটক্যাম্প", nameEn: "English Speaking Bootcamp", originalPrice: 2500 },
      { nameBn: "দ্রুত ও স্মার্ট ইংরেজি", nameEn: "Quick & Smart English", originalPrice: 2000 },
      { nameBn: "স্পোকেন ইংলিশ ও কথোপকথন", nameEn: "Spoken English & Conversation", originalPrice: 1500 },
      { nameBn: "ভালো পিতা-মাতা হওয়া", nameEn: "Become a Better Parent", originalPrice: 1000 },
      { nameBn: "সময় ব্যবস্থাপনা ও উৎপাদনশীলতা", nameEn: "Time Management & Productivity", originalPrice: 1500 },
      { nameBn: "বিশ্লেষণী ও সমালোচনামূলক চিন্তা", nameEn: "Analytical & Critical Thinking", originalPrice: 1500 },
      { nameBn: "লক্ষ্য নির্ধারণ ও পরিকল্পনা", nameEn: "Goal Setting & Planning", originalPrice: 1500 },
      { nameBn: "ব্যক্তিত্ব বিকাশ", nameEn: "Personality Development", originalPrice: 1500 },
    ],
  },
  {
    id: "institutions", icon: "🏛️",
    titleBn: "ইনস্টিটিউশন", titleEn: "Institutions",
    platformLogos: ["/images/platforms/fiverr.png", "/images/platforms/freelancer.png"],
    trainers: ["Tanvirul Islam", "Shariful Islam"],
    courses: [
      { nameBn: "Duolingo ইংলিশ টেস্ট ক্র্যাশ কোর্স", nameEn: "Duolingo English Test Crash Course", originalPrice: 2000 },
      { nameBn: "SAT পরীক্ষা ক্র্যাশ কোর্স", nameEn: "SAT Exam Crash Course", originalPrice: 2500 },
      { nameBn: "TOEFL পরীক্ষা ক্র্যাশ কোর্স", nameEn: "TOEFL Exam Crash Course", originalPrice: 2500 },
      { nameBn: "BCS প্রস্তুতি কোর্স", nameEn: "BCS Preparation Course", originalPrice: 3000 },
      { nameBn: "বিশ্ববিদ্যালয় ভর্তি গাইড", nameEn: "University Admission Guide", originalPrice: 2000 },
      { nameBn: "PSC/JSC/SSC/HSC ইংরেজি", nameEn: "PSC / JSC / SSC / HSC English", originalPrice: 2000 },
      { nameBn: "মেডিকেল ভর্তি গাইড", nameEn: "Medical Admission Guide", originalPrice: 2500 },
      { nameBn: "ইঞ্জিনিয়ারিং ভর্তি গাইড", nameEn: "Engineering Admission Guide", originalPrice: 2500 },
    ],
  },
  {
    id: "trainers-tab", icon: "👨‍🏫",
    titleBn: "ট্রেইনার", titleEn: "Trainers",
    platformLogos: ["/images/platforms/shopify.png", "/images/platforms/wordpress.png"],
    trainers: ["Tanvirul Islam", "Shariful Islam", "Md. Rashed", "Md. Hasan", "Abdullah Al Mamun", "Sajib Das", "Jakir Hossain", "Mahmud Hasan", "Rafiqul Islam", "Sharmin Akhter", "Nusrat Jahan", "Imran Hossain", "Farzana Yesmin", "Anisur Rahman"],
    courses: [
      { nameBn: "ট্রেইনার: তানভিরুল ইসলাম (সম্পূর্ণ প্রোফাইল)", nameEn: "Trainer: Tanvirul Islam (Complete Profile)", originalPrice: 5000 },
      { nameBn: "ট্রেইনার: শরিফুল ইসলাম (সম্পূর্ণ প্রোফাইল)", nameEn: "Trainer: Shariful Islam (Complete Profile)", originalPrice: 5000 },
      { nameBn: "ট্রেইনার: মোঃ রাশেদ (সম্পূর্ণ প্রোফাইল)", nameEn: "Trainer: Md. Rashed (Complete Profile)", originalPrice: 5000 },
      { nameBn: "ট্রেইনার: মোঃ হাসান (সম্পূর্ণ প্রোফাইল)", nameEn: "Trainer: Md. Hasan (Complete Profile)", originalPrice: 5000 },
      { nameBn: "ট্রেইনার: আব্দুল্লাহ আল মামুন (সম্পূর্ণ প্রোফাইল)", nameEn: "Trainer: Abdullah Al Mamun (Complete Profile)", originalPrice: 5000 },
      { nameBn: "ট্রেইনার: সাজিব দাস (সম্পূর্ণ প্রোফাইল)", nameEn: "Trainer: Sajib Das (Complete Profile)", originalPrice: 5000 },
      { nameBn: "ট্রেইনার: জাকির হোসেন (সম্পূর্ণ প্রোফাইল)", nameEn: "Trainer: Jakir Hossain (Complete Profile)", originalPrice: 5000 },
      { nameBn: "ট্রেইনার: মাহমুদ হাসান (সম্পূর্ণ প্রোফাইল)", nameEn: "Trainer: Mahmud Hasan (Complete Profile)", originalPrice: 5000 },
      { nameBn: "ট্রেইনার: রফিকুল ইসলাম (সম্পূর্ণ প্রোফাইল)", nameEn: "Trainer: Rafiqul Islam (Complete Profile)", originalPrice: 5000 },
      { nameBn: "ট্রেইনার: শারমিন আখতার (সম্পূর্ণ প্রোফাইল)", nameEn: "Trainer: Sharmin Akhter (Complete Profile)", originalPrice: 5000 },
      { nameBn: "ট্রেইনার: নুসরাত জাহান (সম্পূর্ণ প্রোফাইল)", nameEn: "Trainer: Nusrat Jahan (Complete Profile)", originalPrice: 5000 },
      { nameBn: "ট্রেইনার: ইমরান হোসেন (সম্পূর্ণ প্রোফাইল)", nameEn: "Trainer: Imran Hossain (Complete Profile)", originalPrice: 5000 },
      { nameBn: "ট্রেইনার: ফারজানা ইয়াসমিন (সম্পূর্ণ প্রোফাইল)", nameEn: "Trainer: Farzana Yesmin (Complete Profile)", originalPrice: 5000 },
      { nameBn: "ট্রেইনার: আনিসুর রহমান (সম্পূর্ণ প্রোফাইল)", nameEn: "Trainer: Anisur Rahman (Complete Profile)", originalPrice: 5000 },
    ],
  },
  {
    id: "freelancing-tab", icon: "💻",
    titleBn: "ফ্রিল্যান্সিং", titleEn: "Freelancing",
    platformLogos: ["/images/platforms/upwork.png", "/images/platforms/fiverr.png"],
    trainers: ["Md. Rashed", "Mahmud Hasan", "Tanvirul Islam", "Abdullah Al Mamun", "Sajib Das", "Jakir Hossain"],
    courses: [
      { nameBn: "ফ্রিল্যান্সিং বিগিনার থেকে অ্যাডভান্সড", nameEn: "Freelancing Beginner to Advanced", originalPrice: 3000 },
      { nameBn: "Upwork প্রোফাইল ও প্রপোজাল মাস্টারি", nameEn: "Upwork Profile & Proposal Mastery", originalPrice: 2500 },
      { nameBn: "Fiverr Gig অপটিমাইজেশন", nameEn: "Fiverr Gig Optimization", originalPrice: 2500 },
      { nameBn: "PeoplePerHour এ ফ্রিল্যান্সিং", nameEn: "Freelancing on PeoplePerHour", originalPrice: 2000 },
      { nameBn: "Freelancer.com সম্পূর্ণ গাইড", nameEn: "Freelancer.com Complete Guide", originalPrice: 2000 },
      { nameBn: "LinkedIn ফ্রিল্যান্সিং ও নেটওয়ার্কিং", nameEn: "LinkedIn Freelancing & Networking", originalPrice: 2000 },
      { nameBn: "কন্টেন্ট রাইটিং ও কপিরাইটিং", nameEn: "Content Writing & Copywriting", originalPrice: 2000 },
      { nameBn: "ভার্চুয়াল অ্যাসিস্ট্যান্ট মাস্টারি", nameEn: "Virtual Assistant Mastery", originalPrice: 2500 },
      { nameBn: "ডাটা এন্ট্রি ও অনলাইন রিসার্চ", nameEn: "Data Entry & Online Research", originalPrice: 1500 },
      { nameBn: "ফ্রিল্যান্সিং ক্লায়েন্ট কমিউনিকেশন", nameEn: "Freelancing Client Communication", originalPrice: 1500 },
      { nameBn: "নিশ ফ্রিল্যান্সিং: গ্রাফিক্স ও ডিজাইন", nameEn: "Niche Freelancing: Graphics & Design", originalPrice: 2500 },
      { nameBn: "নিশ ফ্রিল্যান্সিং: ওয়েব ডেভেলপমেন্ট", nameEn: "Niche Freelancing: Web Development", originalPrice: 2500 },
      { nameBn: "নিশ ফ্রিল্যান্সিং: SEO ও মার্কেটিং", nameEn: "Niche Freelancing: SEO & Marketing", originalPrice: 2500 },
      { nameBn: "নিশ ফ্রিল্যান্সিং: মোবাইল অ্যাপ ডেভেলপমেন্ট", nameEn: "Niche Freelancing: Mobile App Dev", originalPrice: 3000 },
    ],
  },
  {
    id: "ecommerce-tab", icon: "🛒",
    titleBn: "ই-কমার্স", titleEn: "E-Commerce",
    platformLogos: ["/images/platforms/shopify.png", "/images/platforms/amazon.png"],
    trainers: ["Md. Hasan", "Anisur Rahman", "Jakir Hossain"],
    courses: [
      { nameBn: "ই-কমার্স বিগিনার থেকে প্রো", nameEn: "E-Commerce Beginner to Pro", originalPrice: 3000 },
      { nameBn: "Shopify স্টোর সেটআপ ও গ্রোথ", nameEn: "Shopify Store Setup & Growth", originalPrice: 2500 },
      { nameBn: "WooCommerce মাস্টারি", nameEn: "WooCommerce Mastery", originalPrice: 2500 },
      { nameBn: "Amazon FBA বিগিনার গাইড", nameEn: "Amazon FBA Beginner Guide", originalPrice: 3000 },
      { nameBn: "ডিজিটাল প্রোডাক্ট ক্রিয়েশন ও সেলস", nameEn: "Digital Product Creation & Sales", originalPrice: 2000 },
      { nameBn: "Facebook ও Instagram Shops", nameEn: "Facebook & Instagram Shops", originalPrice: 1500 },
      { nameBn: "ড্রপশিপিং সম্পূর্ণ কোর্স", nameEn: "Dropshipping Complete Course", originalPrice: 3000 },
      { nameBn: "ই-কমার্স SEO ও মার্কেটিং", nameEn: "E-Commerce SEO & Marketing", originalPrice: 2500 },
      { nameBn: "পেমেন্ট গেটওয়ে ইন্টিগ্রেশন", nameEn: "Payment Gateway Integration", originalPrice: 1500 },
      { nameBn: "ই-কমার্স অ্যানালিটিক্স ও গ্রোথ", nameEn: "E-Commerce Analytics & Growth", originalPrice: 2000 },
      { nameBn: "অ্যাফিলিয়েট মার্কেটিং মাস্টারি", nameEn: "Affiliate Marketing Mastery", originalPrice: 2500 },
    ],
  },
  {
    id: "development-tab", icon: "⚙️",
    titleBn: "ডেভেলপমেন্ট", titleEn: "Development",
    platformLogos: ["/images/platforms/wordpress.png", "/images/platforms/figma.png"],
    trainers: ["Sajib Das", "Imran Hossain"],
    courses: [
      { nameBn: "HTML ও CSS বিগিনার থেকে অ্যাডভান্সড", nameEn: "HTML & CSS Beginner to Advanced", originalPrice: 2000 },
      { nameBn: "JavaScript মাস্টারি", nameEn: "JavaScript Mastery", originalPrice: 2500 },
      { nameBn: "React.js সম্পূর্ণ কোর্স", nameEn: "React.js Complete Course", originalPrice: 3000 },
      { nameBn: "Node.js ও Express ব্যাকএন্ড", nameEn: "Node.js & Express Backend", originalPrice: 2500 },
      { nameBn: "Python প্রোগ্রামিং", nameEn: "Python Programming", originalPrice: 2500 },
      { nameBn: "PHP ও MySQL ওয়েব ডেভেলপমেন্ট", nameEn: "PHP & MySQL Web Development", originalPrice: 2500 },
      { nameBn: "WordPress থিম ও প্লাগইন ডেভেলপমেন্ট", nameEn: "WordPress Theme & Plugin Dev", originalPrice: 3000 },
      { nameBn: "Flutter দিয়ে মোবাইল অ্যাপ ডেভেলপমেন্ট", nameEn: "Mobile App Development with Flutter", originalPrice: 3500 },
      { nameBn: "Git ও GitHub ভার্সন কন্ট্রোল", nameEn: "Git & GitHub Version Control", originalPrice: 1500 },
      { nameBn: "API ডেভেলপমেন্ট ও ইন্টিগ্রেশন", nameEn: "API Development & Integration", originalPrice: 2500 },
      { nameBn: "ডাটাবেজ ডিজাইন ও SQL", nameEn: "Database Design & SQL", originalPrice: 2000 },
      { nameBn: "কম্পিউটার সায়েন্স ফান্ডামেন্টালস", nameEn: "Computer Science Fundamentals", originalPrice: 2000 },
    ],
  },
  {
    id: "language-jobs", icon: "🗣️",
    titleBn: "ভাষা ও পেশা", titleEn: "Language & Jobs",
    platformLogos: ["/images/platforms/youtube.png", "/images/platforms/fiverr.png"],
    trainers: ["Tanvirul Islam", "Rafiqul Islam", "Farzana Yesmin", "Mahmud Hasan"],
    courses: [
      { nameBn: "চাকরির ইন্টারভিউয়ের জন্য ইংরেজি", nameEn: "English for Job Interview", originalPrice: 2000 },
      { nameBn: "CV ও রেজিউম রাইটিং", nameEn: "CV & Resume Writing", originalPrice: 1500 },
      { nameBn: "পেশাদার ইমেল রাইটিং", nameEn: "Professional Email Writing", originalPrice: 1500 },
      { nameBn: "ব্যবসায়িক ইংরেজি যোগাযোগ", nameEn: "Business English Communication", originalPrice: 2000 },
      { nameBn: "আরবি ভাষা কোর্স", nameEn: "Arabic Language Course", originalPrice: 2000 },
      { nameBn: "জাপানি ভাষা বিগিনারদের জন্য", nameEn: "Japanese Language for Beginners", originalPrice: 2500 },
      { nameBn: "কোরিয়ান ভাষা কোর্স", nameEn: "Korean Language Course", originalPrice: 2500 },
      { nameBn: "চাইনিজ (ম্যান্ডারিন) বেসিক", nameEn: "Chinese (Mandarin) Basics", originalPrice: 2000 },
      { nameBn: "চাকরির ইন্টারভিউ প্রস্তুতি", nameEn: "Job Interview Preparation", originalPrice: 2000 },
      { nameBn: "সরকারি চাকরি প্রস্তুতি", nameEn: "Government Job Preparation", originalPrice: 3000 },
      { nameBn: "ব্যাংক জব প্রস্তুতি", nameEn: "Bank Job Preparation", originalPrice: 3000 },
      { nameBn: "এনজিও জব প্রস্তুতি", nameEn: "NGO Job Preparation", originalPrice: 2000 },
      { nameBn: "ফ্রিল্যান্সিং বনাম চাকরি: ক্যারিয়ার প্ল্যানিং", nameEn: "Freelancing vs Job: Career Planning", originalPrice: 1500 },
      { nameBn: "LinkedIn প্রোফাইল অপটিমাইজেশন", nameEn: "LinkedIn Profile Optimization", originalPrice: 1500 },
      { nameBn: "কর্মক্ষেত্রের জন্য সফট স্কিল", nameEn: "Soft Skills for Workplace", originalPrice: 1500 },
      { nameBn: "কর্পোরেট কমিউনিকেশন", nameEn: "Corporate Communication", originalPrice: 2000 },
      { nameBn: "পেশাদার প্রেজেন্টেশন স্কিল", nameEn: "Professional Presentation Skills", originalPrice: 1500 },
      { nameBn: "নেগোশিয়েশন স্কিল", nameEn: "Negotiation Skills", originalPrice: 1500 },
    ],
  },
  {
    id: "uiux-multimedia", icon: "🎨",
    titleBn: "UI/UX ও মাল্টিমিডিয়া", titleEn: "UI/UX & Multimedia",
    platformLogos: ["/images/platforms/figma.png", "/images/platforms/youtube.png"],
    trainers: ["Abdullah Al Mamun", "Nusrat Jahan", "Sharmin Akhter"],
    courses: [
      { nameBn: "UI/UX ডিজাইন ফান্ডামেন্টালস", nameEn: "UI/UX Design Fundamentals", originalPrice: 2500 },
      { nameBn: "Figma মাস্টারি", nameEn: "Figma Mastery", originalPrice: 2000 },
      { nameBn: "Adobe Photoshop সম্পূর্ণ", nameEn: "Adobe Photoshop Complete", originalPrice: 2500 },
      { nameBn: "Adobe Illustrator মাস্টারি", nameEn: "Adobe Illustrator Mastery", originalPrice: 2500 },
      { nameBn: "Premiere Pro দিয়ে ভিডিও এডিটিং", nameEn: "Video Editing with Premiere Pro", originalPrice: 3000 },
      { nameBn: "After Effects দিয়ে মোশন গ্রাফিক্স", nameEn: "Motion Graphics with After Effects", originalPrice: 3000 },
      { nameBn: "Canva বিগিনার থেকে প্রো", nameEn: "Canva for Beginners to Pro", originalPrice: 1500 },
      { nameBn: "গ্রাফিক ডিজাইন প্রিন্সিপলস", nameEn: "Graphic Design Principles", originalPrice: 2000 },
      { nameBn: "মোবাইল অ্যাপের জন্য UI ডিজাইন", nameEn: "UI Design for Mobile Apps", originalPrice: 2500 },
      { nameBn: "UX রিসার্চ ও টেস্টিং", nameEn: "UX Research & Testing", originalPrice: 2000 },
      { nameBn: "Blender দিয়ে 3D মডেলিং", nameEn: "3D Modeling with Blender", originalPrice: 3500 },
      { nameBn: "কালার থিওরি ও টাইপোগ্রাফি", nameEn: "Color Theory & Typography", originalPrice: 1500 },
    ],
  },
  {
    id: "software-tools", icon: "🛠️",
    titleBn: "সফটওয়্যার টুলস", titleEn: "Software Tools",
    platformLogos: ["/images/platforms/wordpress.png", "/images/platforms/shopify.png"],
    trainers: ["Imran Hossain", "Sajib Das", "Mahmud Hasan", "Jakir Hossain", "Nusrat Jahan"],
    courses: [
      { nameBn: "মাইক্রোসফট অফিস স্যুট (Word, Excel, PPT)", nameEn: "Microsoft Office Suite (Word, Excel, PPT)", originalPrice: 2000 },
      { nameBn: "গুগল ওয়ার্কস্পেস (Docs, Sheets, Drive)", nameEn: "Google Workspace (Docs, Sheets, Drive)", originalPrice: 1500 },
      { nameBn: "VS Code ও প্রোডাক্টিভিটি টুলস", nameEn: "VS Code & Productivity Tools", originalPrice: 1500 },
      { nameBn: "Trello, Asana ও প্রজেক্ট ম্যানেজমেন্ট", nameEn: "Trello, Asana & Project Management", originalPrice: 1500 },
      { nameBn: "Slack, Zoom ও কমিউনিকেশন টুলস", nameEn: "Slack, Zoom & Communication Tools", originalPrice: 1500 },
      { nameBn: "SEO টুলস: Ahrefs, SEMrush, Yoast", nameEn: "SEO Tools: Ahrefs, SEMrush, Yoast", originalPrice: 2000 },
      { nameBn: "ডিজাইন টুলস: Figma, Canva, Adobe XD", nameEn: "Design Tools: Figma, Canva, Adobe XD", originalPrice: 2000 },
      { nameBn: "Mailchimp ও ইমেল মার্কেটিং টুলস", nameEn: "Mailchimp & Email Marketing Tools", originalPrice: 1500 },
      { nameBn: "অ্যানালিটিক্স: Google Analytics ও Meta Business", nameEn: "Analytics: Google Analytics & Meta Business", originalPrice: 2000 },
    ],
  },
  {
    id: "notes", icon: "📝",
    titleBn: "নোট", titleEn: "Notes",
    platformLogos: ["/images/platforms/figma.png", "/images/platforms/freelancer.png"],
    trainers: [],
    courses: [
      { nameBn: "সব কোর্সের নোট ও চিটশিট", nameEn: "All Course Notes & Cheatsheets", originalPrice: 1000 },
      { nameBn: "ফ্রিল্যান্সিং কন্ট্রাক্ট টেমপ্লেট", nameEn: "Freelancing Contract Templates", originalPrice: 1000 },
      { nameBn: "CV ও রেজিউম টেমপ্লেট", nameEn: "CV & Resume Templates", originalPrice: 1000 },
      { nameBn: "ক্লায়েন্ট প্রপোজাল টেমপ্লেট", nameEn: "Client Proposal Templates", originalPrice: 1000 },
      { nameBn: "স্টাডি নোট ও রিভিশন গাইড", nameEn: "Study Notes & Revision Guides", originalPrice: 1000 },
      { nameBn: "রিসোর্স লাইব্রেরি অ্যাক্সেস", nameEn: "Resource Library Access", originalPrice: 2000 },
    ],
  },
];

export const testimonials: Testimonial[] = [
  { stars: "★★★★★", rating: "5.0/5",
    quoteBn: "জোবায়ের গ্রুপের নির্দেশিকা আর সহায়তার কারণে আজ আমি নিজের ল্যাপটপ থেকে মাসে ২৫,০০০+ টাকা ইনকাম করছি।",
    quoteEn: "With Jobayer Group's guidance, I now earn 25,000+ BDT monthly from my laptop.",
    authorBn: "মিতা ইসলাম", authorEn: "Mita Islam",
    labelBn: "ফ্রিল্যান্সার, সিলেট", labelEn: "Freelancer, Sylhet" },
  { stars: "★★★★★", rating: "4.9/5",
    quoteBn: "এই কোর্সটা আমাকে রিয়েল মার্কেটের জন্য প্রস্তুত করেছে। এখন নিয়মিত ক্লায়েন্ট পাচ্ছি। সবার কাছে রেকমেন্ড করব!",
    quoteEn: "This course prepared me for the real market. I'm getting regular clients now. Highly recommended!",
    authorBn: "নীলা হোসেন", authorEn: "Neela Hossain",
    labelBn: "ডিজিটাল মার্কেটার, ঢাকা", labelEn: "Digital Marketer, Dhaka" },
  { stars: "★★★★★", rating: "5.0/5",
    quoteBn: "৭ মাসে এখন মাসিক আয় ৪০,০০০+। সবচেয়ে বড় কথা, একটা সহায়ক কমিউনিটি পেয়েছি।",
    quoteEn: "Now earning 40,000+ monthly in 7 months. Most importantly, I found a supportive community.",
    authorBn: "রাফসান জামান", authorEn: "Rafsan Zaman",
    labelBn: "ই-কমার্স আর্নার, চট্টগ্রাম", labelEn: "E-commerce Earner, Chittagong" },
  { stars: "★★★★★", rating: "4.9/5",
    quoteBn: "শুধু কোর্স না — রিয়েল প্রজেক্ট ও জব সাপোর্ট পেয়েছি। যারা সিরিয়াস তাদের জন্য এটি পারফেক্ট!",
    quoteEn: "Not just courses — I got real projects and job support. Perfect for serious learners!",
    authorBn: "আতিকুর রহমান", authorEn: "Atiqur Rahman",
    labelBn: "ওয়েব ডেভেলপার, রাজশাহী", labelEn: "Web Developer, Rajshahi" },
  { stars: "★★★★★", rating: "5.0/5",
    quoteBn: "ফাইভারে এখন মাসে ৩০,০০০+ টাকা আয় করছি। জোবায়ের গ্রুপের ফ্রিল্যান্সিং কোর্স আমার জীবন বদলে দিয়েছে।",
    quoteEn: "I now earn 30,000+ BDT monthly on Fiverr. The freelancing course changed my life.",
    authorBn: "শারমিন জাহান", authorEn: "Sharmin Jahan",
    labelBn: "ফাইভার ফ্রিল্যান্সার, খুলনা", labelEn: "Fiverr Freelancer, Khulna" },
  { stars: "★★★★★", rating: "4.8/5",
    quoteBn: "একদম শূন্য থেকে শুরু করেছি। আজ ১৫,০০০+ মাসিক আয়। ধন্যবাদ জোবায়ের গ্রুপ টিমকে।",
    quoteEn: "Started from absolute zero. Today I earn 15,000+ monthly. Thank you Jobayer Group team!",
    authorBn: "রেজাউল করিম", authorEn: "Rezaul Karim",
    labelBn: "ডিজিটাল মার্কেটার, বগুড়া", labelEn: "Digital Marketer, Bogura" },
  { stars: "★★★★★", rating: "5.0/5",
    quoteBn: "যতগুলো কোর্স করেছি, জোবায়ের গ্রুপের কোর্স সবচেয়ে প্রাক্টিক্যাল। সরাসরি মার্কেটে কাজে লাগাতে পেরেছি।",
    quoteEn: "Among all courses I've taken, Jobayer Group's are the most practical. I applied them directly in the market.",
    authorBn: "সানজিদা করিম", authorEn: "Sanjida Karim",
    labelBn: "গ্রাফিক্স ডিজাইনার, কুমিল্লা", labelEn: "Graphics Designer, Cumilla" },
];

export const faqs: FaqItem[] = [
  { qBn: "৯৯ টাকায় আমি কী পাচ্ছি?", qEn: "What will I get for ৳99?",
    aBn: "আপনি ১২ জন এক্সপার্ট ট্রেইনারের ১০টি ক্যাটাগরির ২৩০+ প্রিমিয়াম কোর্সে আজীবন অ্যাক্সেস পাচ্ছেন। মোট মূল্য ১০ লক্ষ+ টাকা কিন্তু আপনি দিচ্ছেন মাত্র ৯৯ টাকা। এর মধ্যে সব কোর্স ম্যাটেরিয়াল, ভবিষ্যতের আপডেট এবং ক্লায়েন্ট ফাইন্ডিং গাইড অন্তর্ভুক্ত।",
    aEn: "You get lifetime access to 230+ premium courses across 10 categories, taught by 12 expert trainers. The total value is ৳10,00,000+ but you pay only ৳99. This includes all course materials, future updates, and the client-finding guide." },
  { qBn: "টাকা ফেরতের গ্যারান্টি আছে কি?", qEn: "Is there a money-back guarantee?",
    aBn: "হ্যাঁ! আমরা ২৪ ঘণ্টার টাকা ফেরত গ্যারান্টি দিচ্ছি। যদি কোনো কারণে আপনি কোর্সগুলো নিয়ে সন্তুষ্ট না হন, তাহলে কেনার ২৪ ঘণ্টার মধ্যে আমাদের জানান — আমরা আপনার সম্পূর্ণ ৯৯ টাকা ফেরত দেব। কোনো প্রশ্ন জিজ্ঞেস করা হবে না।",
    aEn: "Yes! We offer a 24-hour money-back guarantee. If you are not satisfied with the courses for any reason, simply contact us within 24 hours of purchase and we will refund your full ৳99. No questions asked." },
  { qBn: "৯৯ টাকার দাম কতদিন থাকবে?", qEn: "How long will the ৳99 price last?",
    aBn: "৯৯ টাকার দামটি একটি লঞ্চ স্পেশাল অফার এবং সীমিত সময়ের জন্যই পাওয়া যাবে। ২৪ ঘণ্টা পর (অথবা কোর্সের সীমা পূর্ণ হলে) দাম বেড়ে ১,৪৯৯ টাকা হবে এবং বোনাস কোর্সগুলো সরিয়ে নেওয়া হবে। আমরা এখনই এই অফারটি নেওয়ার পরামর্শ দিচ্ছি।",
    aEn: "The ৳99 price is a launch special and will only be available for a limited time. After 24 hours (or when the course limit is reached), the price will increase to ৳1,499 and the bonus courses will be removed." },
  { qBn: "আমার কি আগের কোনো অভিজ্ঞতা দরকার?", qEn: "Do I need any prior experience?",
    aBn: "একদমই না! কোর্সগুলি বিগিনারদের জন্য ডিজাইন করা হয়েছে। প্রতিটি ক্যাটাগরি বেসিক কনসেপ্ট দিয়ে শুরু হয়ে ধীরে ধীরে অ্যাডভান্সড টপিকে যায়। স্টেপ-বাই-স্টেপ গাইডেন্স নিশ্চিত করে যে কেউই, তাদের ব্যাকগ্রাউন্ড যাই হোক, ফলো করতে পারবেন।",
    aEn: "Not at all! The courses are designed for beginners. Each category starts with foundational concepts and gradually moves to advanced topics. The step-by-step guidance ensures that anyone can follow along." },
  { qBn: "কেনার পর কিভাবে কোর্স অ্যাক্সেস করব?", qEn: "How do I access the courses after purchase?",
    aBn: "পেমেন্ট কনফার্ম হওয়ার পর আপনি আপনার অ্যাকাউন্ট ড্যাশবোর্ড থেকে সব কোর্সে তাৎক্ষণিক অ্যাক্সেস পাবেন। আপনি যেকোনো ডিভাইস থেকে অ্যাক্সেস করতে পারবেন — কম্পিউটার, ট্যাবলেট বা স্মার্টফোন। সব কন্টেন্ট ২৪/৭ পাওয়া যাবে।",
    aEn: "After your payment is confirmed, you will get instant access to all courses through your account dashboard. You can access them from any device — computer, tablet, or smartphone." },
  { qBn: "আসলেই কি অনলাইনে আয় করা সম্ভব?", qEn: "Can I really earn online?",
    aBn: "হ্যাঁ, সম্ভব। আমাদের শিক্ষার্থীরা মাসে ১১,০০০ থেকে ৯২,০০০ টাকা পর্যন্ত আয় করছেন। সঠিক গাইড এবং দক্ষতা অর্জন করলে আপনি নিজেও তা করতে পারবেন। রিয়াল ইনকাম প্রুফ আমাদের ওয়েবসাইটে প্রদর্শিত আছে।",
    aEn: "Yes. Our students earn from ৳11,000 to ৳92,000/month. With the right guidance and skills, you can too. Real income proofs are displayed on our website." },
  { qBn: "একবার পেমেন্ট করলেই হবে নাকি মাসিক ফি আছে?", qEn: "Is it a one-time payment or monthly fee?",
    aBn: "একবার মাত্র ৯৯ টাকা পেমেন্ট করলেই আপনি আজীবন অ্যাক্সেস পাবেন। কোনো মাসিক ফি নেই, কোনো লুকানো চার্জ নেই। এটি একটি এককালীন পেমেন্ট।",
    aEn: "Pay just ৳99 once and you get lifetime access. No monthly fees, no hidden charges. It's a one-time payment." },
];

export const galleryImages: GalleryImage[] = [
  { src: "/images/payments/payment-1.jpg", alt: "bKash payment" },
  { src: "/images/payments/payment-2.jpg", alt: "Nagad payment" },
  { src: "/images/payments/payment-3.jpg", alt: "Bank transfer" },
  { src: "/images/payments/payment-4.jpg", alt: "Rocket payment" },
  { src: "/images/payments/payment-5.jpg", alt: "Upwork payment" },
  { src: "/images/payments/payment-6.jpg", alt: "Fiverr payment" },
  { src: "/images/payments/payment-7.jpg", alt: "Freelancer payment" },
  { src: "/images/payments/payment-8.jpg", alt: "bKash large payment" },
  { src: "/images/payments/payment-9.jpg", alt: "Nagad large payment" },
  { src: "/images/payments/payment-10.jpg", alt: "Bank salary" },
];

export const trustBadges = [
  { icon: "🔒", textBn: "SSL সুরক্ষিত", textEn: "SSL Secured" },
  { icon: "✅", textBn: "২৪ ঘণ্টা টাকা ফেরত", textEn: "24h Money Back" },
  { icon: "⚡", textBn: "সাথে সাথে এক্সেস", textEn: "Instant Access" },
  { icon: "📞", textBn: "২৪/৭ সাপোর্ট", textEn: "24/7 Support" },
];

export const howItWorksSteps = [
  {
    num: "১", numEn: "1", icon: "⚡",
    titleBn: "ধাপ ১: আজীবন অ্যাক্সেস নিন মাত্র ৯৯ টাকায়",
    titleEn: "Step 1: Get Lifetime Access at ৳99",
    descBn: "নিচের বাটনে ক্লিক করুন এবং মাত্র ৯৯ টাকা এককালীন মূল্যে ২৩০+ প্রিমিয়াম কোর্স (মূল্য ১০ লক্ষ+) কিনে নিন। কোনো মাসিক ফি নেই, কোনো লুকানো চার্জ নেই।",
    descEn: "Click the button below and grab 230+ premium courses (worth ৳10,00,000+) at a one-time price of just ৳99. No monthly fees, no hidden charges.",
    highlightBn: "⚡ এককালীন পেমেন্ট, আজীবন ভ্যালু",
    highlightEn: "⚡ One-time payment, lifetime value",
  },
  {
    num: "২", numEn: "2", icon: "📚",
    titleBn: "ধাপ ২: A-Z গাইডেন্স নিয়ে শুরু করুন শেখা",
    titleEn: "Step 2: Start Learning with A-Z Guidance",
    descBn: "১০টি বিভাগের স্ট্রাকচারড কোর্সে অ্যাক্সেস নিন — নলেজ ও স্কিলস থেকে ফ্রিল্যান্সিং ও ই-কমার্স পর্যন্ত। বিগিনার-ফ্রেন্ডলি রোডম্যাপ অনুসরণ করুন।",
    descEn: "Access 10 categories of structured courses — from Knowledge & Skills to Freelancing & E-Commerce. Follow the step-by-step roadmaps designed for beginners.",
    highlightBn: "📚 ১০ বিভাগ, ২৩০+ কোর্স, ১২ ট্রেইনার",
    highlightEn: "📚 10 categories, 230+ courses, 12 trainers",
  },
  {
    num: "৩", numEn: "3", icon: "💰",
    titleBn: "ধাপ ৩: ক্লায়েন্ট খোঁজার গাইড নিয়ে আয় শুরু করুন",
    titleEn: "Step 3: Start Earning with Client-Finding Guide",
    descBn: "এক্সক্লুসিভ ক্লায়েন্ট ফাইন্ডিং গাইড অ্যাক্সেস করুন — ফ্রিল্যান্স প্রজেক্ট পাবেন কীভাবে, ব্র্যান্ড বিল্ড করবেন, এবং মাসে ১১,০০০ থেকে ৯২,০০০ টাকা আয় করবেন তা শিখুন।",
    descEn: "Get access to our exclusive client-finding guide — learn how to get freelance projects, build your brand, and earn from ৳11,000 to ৳92,000/month.",
    highlightBn: "💰 ঘন্টার মধ্যে আপনার ইনভেস্টমেন্ট ফেরত পান",
    highlightEn: "💰 Earn your investment back in hours",
  },
];

export const howItWorksFooterNoteBn = "💡 আমাদের ৮৬৬+ শিক্ষার্থীর ৭২% ই প্রথম মাসেই আয় শুরু করেছেন! 🚀 আপনার পালা এখনই!";
export const howItWorksFooterNoteEn = "💡 72% of our 866+ students started earning in the first month! 🚀 Your turn now!";

export const trustSectionData = {
  badgeBn: "🛡️ বিশ্বাসযোগ্যতা ও নিরাপত্তা",
  badgeEn: "🛡️ Trust & Security",
  titleBn: "৩০ সেকেন্ডেই শুরু করুন আপনার আয়ের যাত্রা!",
  titleEn: "Start Your Earning Journey in 30 Seconds!",
  descBn: "নিচে আপনার নাম-ফোন দিন, সাথে সাথেই সব কোর্স ও অ্যাক্সেস চলে আসবে!",
  descEn: "Enter your name & phone below to get instant access to all courses!",
  ctaBn: "🚀 এখনই রেজিস্টার করুন →",
  ctaEn: "🚀 Register Now →",
  footerBn: "🔒 আপনার তথ্য SSL সুরক্ষিত। কোনো স্প্যাম ইমেইল নয়।",
  footerEn: "🔒 Your data is SSL secured. No spam emails.",
};

export const platformShowcaseText = {
  badgeBn: "🏛️ প্ল্যাটফর্মসমূহ",
  badgeEn: "🏛️ Platforms",
  titleBn: "যেসব প্ল্যাটফর্মের কোর্স আপনি পাচ্ছেন",
  titleEn: "Platforms Whose Courses You Get",
  subtitleBn: (n: number) => `মোট ${n}টি প্রতিষ্ঠানের কোর্স — সব একসাথে`,
  subtitleEn: (n: number) => `Courses from ${n} platforms — all in one place`,
};

export const paymentGalleryText = {
  badgeBn: "💰 আয়ের প্রমাণ",
  badgeEn: "💰 Proof of Earnings",
  titleBn: "শিক্ষার্থীদের আয়ের বাস্তব চিত্র",
  titleEn: "Real Earnings of Our Students",
  descBn: "নিয়মিত পেমেন্ট পাচ্ছেন আমাদের শিক্ষার্থীরা",
  descEn: "Our students receive payments regularly",
};

export const statsSectionText = {
  badgeBn: "📊 আমাদের পরিসংখ্যান",
  badgeEn: "📊 Our Statistics",
};

export const heroSectionBadgeBn = "💰 সরাসরি কাজ শিখে প্রথম মাসেই ১১,০০০ থেকে ৯২,০০০ টাকা পর্যন্ত উপার্জনের বাস্তবমুখী সুযোগ!";
export const heroSectionBadgeEn = "💰 Earn from ৳11,000 to ৳92,000/month — real opportunity, real results!";

export const salaryNames = [
  "Ayan Rahman","সুমন দাস","Maria Gomes","Ratan Marma","উদয় বড়ুয়া",
  "Nusrat Jahan","অনিক পাল","Rakib Hasan","Bimal Tripura","তানিয়া সুলতানা",
  "Sabbir Hossain","Mithila Roy","Farhan Ahmed","Riya Chakma","Tanvir Islam",
  "Lima Das","Omar Faruk","Puja Rani","Hasan Mahmud","Nabila Noor",
];

export const liveNotifText = {
  joinedRecent: "থেকে সদ্য যুক্ত হলেন!",
  joinedRecentEn: "just joined!",
};

export const platformPrices: Record<string, number> = {
  "10 Minute School": 85000,
  "Ghoori Learning": 55000,
  "Skill Up": 35000,
  "eShikhon": 65000,
  "Mayajal": 40000,
  "MSB Academy": 75000,
  "Creative IT": 90000,
  "Problem KI": 30000,
  "REPTO": 12000,
};

export const trainerPrices: Record<string, number> = {
  "Ayman Sadiq": 45000,
  "Munzereen Shahid": 25000,
  "Jhankar Mahbub": 55000,
  "Khalid Farhan": 30000,
  "Sadman Sadik": 20000,
  "Freelancer Nasim": 28000,
  "Tahsan Khan": 35000,
  "Jubayer Hossain": 25000,
  "Abtahi Iptesam": 18000,
  "Mahade Hasan": 15000,
  "Vaibhav Sisinity": 32000,
  "Soban Tariq": 22000,
};

export const priceAnchorData = {
  marketValueBn: "১০,০০,০০০+ টাকা",
  marketValueEn: "10,00,000+ BDT",
  offerPriceBn: "মাত্র ৯৯ টাকা",
  offerPriceEn: "Only 99 BDT",
  savingsBn: "৯,৯৯,৯০১+ টাকা",
  savingsEn: "9,99,901+ BDT",
  discountPercent: 99.99,
  headlineBn: "⏳ শেষবারের মতো অফার: ১০ লক্ষ টাকার ২৩০+ কোর্স আজ মাত্র ৯৯ টাকায়!",
  headlineEn: "⏳ Last Chance: 230+ courses worth 10 Lakh BDT for only 99 BDT!",
  subheadBn: "আগামী ২৪ ঘণ্টা পর দাম বেড়ে হবে ১,৪৯৯ টাকা। এই মুহূর্তে যুক্ত হলে পাচ্ছেন দেশের সেরা ১২ জন প্রশিক্ষকের ২৩০টির বেশি কোর্স — আজীবনের জন্য। পছন্দ না হলে ২৪ ঘণ্টায় টাকা ফেরত।",
  subheadEn: "After 24 hours, the price will increase to 1,499 BDT. Join now to get 230+ courses from Bangladesh's top 12 trainers — for life. 24h money-back guarantee.",
  ctaBn: "🔥 হ্যাঁ, দাম বাড়ার আগে মাত্র ৯৯ টাকায় আজীবন অ্যাক্সেস নিন →",
  ctaEn: "🔥 Yes, Get Lifetime Access for Only 99 BDT Before Price Hike →",
  timerShow: true,
};

export const sectionText = {
  problem: {
    badgeBn: "🤔 আপনি কি এই সমস্যাগুলোর মুখোমুখি?",
    badgeEn: "🤔 Facing These Problems?",
    items: [
      {
        icon: "⚠️",
        titleBn: "প্রিমিয়াম কোর্সের দাম ১০,০০০-৮৫,০০০+ টাকা",
        titleEn: "Premium courses cost 10,000-85,000+ BDT",
        descBn: "সবার জন্য affordable না",
        descEn: "Not affordable for everyone",
      },
      {
        icon: "⚠️",
        titleBn: "ইউটিউবে ভালো কন্টেন্ট আছে কিন্তু স্ট্রাকচারড গাইডেন্স নেই",
        titleEn: "YouTube has good content but lacks structured guidance",
        descBn: "রোডম্যাপ নেই",
        descEn: "No roadmap",
      },
      {
        icon: "⚠️",
        titleBn: "বিভিন্ন প্ল্যাটফর্মে ছড়িয়ে থাকা কোর্স",
        titleEn: "Courses scattered across platforms",
        descBn: "এক জায়গায় পাবেন না",
        descEn: "Not in one place",
      },
      {
        icon: "⚠️",
        titleBn: "কোন স্কিল প্রথমে শিখবেন — সঠিক দিকনির্দেশনা নেই",
        titleEn: "Which skill to learn first — no proper guidance",
        descBn: "কীভাবে শুরু করবেন",
        descEn: "How to start",
      },
      {
        icon: "⚠️",
        titleBn: "শেখার পর কীভাবে ইনকাম শুরু করবেন — সেই পথ দেখায় না",
        titleEn: "After learning, how to start earning — courses don't show this",
        descBn: "অধিকাংশ কোর্স অসম্পূর্ণ",
        descEn: "Most courses are incomplete",
      },
    ],
  },
  solution: {
    items: [
      {
        icon: "✅",
        titleBn: "মাত্র ৯৯ টাকায় ২৩০+ প্রিমিয়াম কোর্স",
        titleEn: "230+ premium courses for only 99 BDT",
        descBn: "১০ লক্ষ টাকার কন্টেন্ট!",
        descEn: "10 Lakh BDT worth of content!",
      },
      {
        icon: "✅",
        titleBn: "১০টি বিভাগে A-Z স্ট্রাকচারড কোর্স",
        titleEn: "A-Z structured courses in 10 categories",
        descBn: "এক জায়গায় সম্পূর্ণ সিলেবাস",
        descEn: "Complete syllabus in one place",
      },
      {
        icon: "✅",
        titleBn: "বিগিনার থেকে পেশাদার — প্রতিটি ধাপে গাইডেন্স",
        titleEn: "Beginner to professional — step-by-step guidance",
        descBn: "স্টেপ-বাই-স্টেপ গাইড",
        descEn: "Step-by-step guide",
      },
      {
        icon: "✅",
        titleBn: "ক্লায়েন্ট খোঁজার গাইড — শেখার পরপরই আয় শুরু করুন",
        titleEn: "Client-finding guide — start earning right after learning",
        descBn: "রিয়েল প্রজেক্ট ও ইন্টার্নশিপ",
        descEn: "Real projects & internships",
      },
      {
        icon: "✅",
        titleBn: "লাইফটাইম অ্যাক্সেস + ফ্রি আপডেট",
        titleEn: "Lifetime access + free updates",
        descBn: "আজীবনের জন্য আপনার সম্পদ",
        descEn: "Your asset for life",
      },
    ],
  },
};

export const chatTestimonials = [
  {
    avatar: "🌸",
    nameBn: "রোজিনা আক্তার",
    nameEn: "Rozina Akter",
    platformBn: "ফেসবুক গ্রুপ · ২ সপ্তাহ আগে",
    platformEn: "Facebook Group · 2 weeks ago",
    msgBn: "প্রথম বোনাস পাওয়ার দিনটা এখনো মনে আছে। নিজের চেষ্টায় কিছু অর্জনের অনুভূতি অসাধারণ! মাত্র ৯৯ টাকা দিয়ে শুরু করে আজ মাসে ২৫,০০০+ টাকা আয় করছি। যারা দ্বিধায় আছেন, তাদের বলব—শুরু করে দেখুন!",
    msgEn: "I still remember the day I got my first bonus. The feeling of achieving something through my own effort is incredible! Started with just 99 BDT and now earning 25,000+ BDT monthly. To those hesitating — just start!",
    stars: "★★★★★",
    timeBn: "গতকাল ৩:৪২ PM",
    timeEn: "Yesterday 3:42 PM",
  },
  {
    avatar: "🌿",
    nameBn: "পূর্ণিমা বেগম",
    nameEn: "Purnima Begum",
    platformBn: "হোয়াটসঅ্যাপ গ্রুপ · ১ মাস আগে",
    platformEn: "WhatsApp Group · 1 month ago",
    msgBn: "আমি গ্রামের মেয়ে। আগে ভাবতাম অনলাইনে কাজ করা শুধু শহরের ছেলেমেয়েদের জন্য। কিন্তু এই প্ল্যাটফর্মে যুক্ত হওয়ার পর আমার চোখ খুলে গেছে। এখন ঘরে বসে কাজ করি আর পরিবারকে সাহায্য করি।",
    msgEn: "I'm a village girl. I used to think online work was only for city people. But joining this platform opened my eyes. Now I work from home and support my family.",
    stars: "★★★★★",
    timeBn: "গত সপ্তাহে ১১:১৫ AM",
    timeEn: "Last week 11:15 AM",
  },
  {
    avatar: "💪",
    nameBn: "ফারিয়া ইসলাম",
    nameEn: "Faria Islam",
    platformBn: "ফেসবুক মেসেঞ্জার · ৩ সপ্তাহ আগে",
    platformEn: "Facebook Messenger · 3 weeks ago",
    msgBn: "শেখার সুযোগ আর আয়—দুটোই পাচ্ছি এখান থেকে। সঠিক নির্দেশিকা আর সহায়তা পেলে যে কেউ সফল হতে পারে। আমি এখন ৬ মাস ধরে যুক্ত আর প্রতিদিন নতুন কিছু শিখছি। ধন্যবাদ জোবায়ের গ্রুপ টিমকে!",
    msgEn: "I'm getting both learning opportunities and income here. With proper guidance and support, anyone can succeed. I've been here for 6 months and learn something new every day. Thank you Jobayer Group team!",
    stars: "★★★★★",
    timeBn: "গতকাল ৭:০৮ PM",
    timeEn: "Yesterday 7:08 PM",
  },
  {
    avatar: "🔥",
    nameBn: "তামান্না হাসান",
    nameEn: "Tamanna Hasan",
    platformBn: "হোয়াটসঅ্যাপ · ৫ দিন আগে",
    platformEn: "WhatsApp · 5 days ago",
    msgBn: "আমার জন্য এটি নতুন দিগন্ত খুলে দিয়েছে। প্রথমে ভয় ছিল, কিন্তু টিমের সহায়তায় সব ভয় কেটে গেছে। এখন ইনকাম শুরু করেছি, খুব ভালো লাগছে। এখন আমি অনলাইন জগত নিয়ে অনেক বেশি আত্মবিশ্বাসী!",
    msgEn: "This has opened new horizons for me. I was scared at first, but the team's support eliminated all fears. I've started earning now and feeling great. I'm much more confident about the online world now!",
    stars: "★★★★★",
    timeBn: "গতকাল ৯:২২ PM",
    timeEn: "Yesterday 9:22 PM",
  },
];

export const gridTestimonials = [
  { stars: "★★★★★", rating: "4.9/5", nameBn: "নীলা হোসেন", nameEn: "Neela Hossain", textBn: "আমি শুরুতে ভেবেছিলাম এটা হয়তো অন্য অনেক অনলাইন সুযোগের মতোই হবে। কিন্তু কাজ শুরু করার পর বুঝলাম এখানে নিয়মিত নির্দেশিকা দেওয়া হয় এবং নতুনদের শেখানোর জন্য আলাদা সহায়তা রয়েছে। এখন প্রতি মাসে নিয়মিত কাজ করছি এবং সময়মতো পেমেন্ট পাচ্ছি।", textEn: "I initially thought this would be like other online opportunities. But after starting, I realized regular guidance and dedicated support is provided. Now I work regularly and get paid on time." },
  { stars: "★★★★★", rating: "5.0/5", nameBn: "মিতা ইসলাম", nameEn: "Mita Islam", textBn: "আমি আগে কোনো অনলাইন কাজ করিনি। এখানে যোগ দেওয়ার পর ধাপে ধাপে কাজ শিখেছি। পরিবারের পাশে থেকে কাজ করতে পারছি, এটা আমার জন্য সবচেয়ে বড় সুবিধা।", textEn: "I never did online work before. After joining, I learned step by step. Working while being with family is the biggest advantage for me." },
  { stars: "★★★★★", rating: "5.0/5", nameBn: "রাফসান জামান", nameEn: "Rafsan Zaman", textBn: "ই-কমার্সে কাজ করে মাসে ৪০,০০০+ ইনকাম করছি। শুরুতে কেউ বিশ্বাস করেনি, কিন্তু আজ আমি প্রমাণ করেছি। সবার দোয়া চাই।", textEn: "Earning 40,000+ monthly from e-commerce. No one believed at first, but today I proved them wrong." },
  { stars: "★★★★★", rating: "4.9/5", nameBn: "সাবরিনা খান", nameEn: "Sabrina Khan", textBn: "ডিজিটাল মার্কেটিং শিখে এখন নিজেই ক্লায়েন্ট ম্যানেজ করি। এটা শুধু আয়ের জায়গা না, এটি পেশা গড়ার জায়গা।", textEn: "After learning digital marketing, I now manage my own clients. This isn't just an earning opportunity — it's a career builder." },
  { stars: "★★★★★", rating: "4.8/5", nameBn: "রেহানা বেগম", nameEn: "Rehana Begum", textBn: "গৃহিণী হয়েও অনলাইনে কাজ করা সম্ভব—এটা প্রমাণ করেছি নিজেই। মাসে ভালো ইনকাম করছি।", textEn: "Being a homemaker, I proved that online work is possible. I earn well monthly." },
  { stars: "★★★★★", rating: "4.9/5", nameBn: "নাদিয়া সুলতানা", nameEn: "Nadia Sultana", textBn: "প্রথম প্রথম কাজ পেতে সময় লেগেছে, কিন্তু এখন নিয়মিত আয়। সবার ধৈর্য ধরাটা জরুরি।", textEn: "It took time to get work initially, but now I earn regularly. Patience is key." },
  { stars: "★★★★★", rating: "5.0/5", nameBn: "নাজনীন আক্তার", nameEn: "Naznin Akter", textBn: "যারা শুরু করতে চান তাদের বলব—ভয় না করে শুরু করুন। সঠিক নির্দেশিকা পেলে সফলতা আসবেই।", textEn: "To those wanting to start — don't be afraid, just start. With proper guidance, success will follow." },
  { stars: "★★★★★", rating: "5.0/5", nameBn: "তামান্না হাসান", nameEn: "Tamanna Hasan", textBn: "আমার জন্য এটি নতুন দিগন্ত খুলে দিয়েছে। এখন আমি অনলাইন জগত নিয়ে অনেক বেশি আত্মবিশ্বাসী।", textEn: "This has opened new horizons for me. I'm much more confident about the online world now." },
  { stars: "★★★★★", rating: "4.9/5", nameBn: "মর্জিনা খাতুন", nameEn: "Morjina Khatun", textBn: "প্রথমে ভয় ছিল, কিন্তু টিমের সহায়তায় সব ভয় কেটে গেছে। এখন ইনকাম শুরু করেছি, খুব ভালো লাগছে।", textEn: "I was scared at first, but the team's support eliminated all fears. I've started earning now." },
  { stars: "★★★★★", rating: "5.0/5", nameBn: "শামীমা আক্তার", nameEn: "Shamima Akter", textBn: "যারা এখনো শুরু করেননি, তাদের বলব—সময় নষ্ট না করে শুরু করুন। সঠিক নির্দেশিকা পেতে দেরি করবেন না।", textEn: "To those who haven't started yet — don't waste time, just begin. Don't delay getting proper guidance." },
  { stars: "★★★★★", rating: "4.9/5", nameBn: "ফারিয়া ইসলাম", nameEn: "Faria Islam", textBn: "শেখার সুযোগ আর আয়—দুটোই পাচ্ছি। যারা শুরু করবেন, তাদের জন্য এটি সেরা জায়গা।", textEn: "I'm getting both learning and earning. This is the best place for starters." },
  { stars: "★★★★★", rating: "5.0/5", nameBn: "সাবিকুন নাহার", nameEn: "Sabikun Nahar", textBn: "সঠিক নির্দেশিকা এবং সহায়তা পেলে যে কেউ সফল হতে পারে। আমি তার উদাহরণ।", textEn: "With proper guidance and support, anyone can succeed. I'm living proof." },
  { stars: "★★★★★", rating: "5.0/5", nameBn: "নুসরাত জাহান", nameEn: "Nusrat Jahan", textBn: "নতুনদের ছোট করে দেখা হয় না, যে কোনো প্রশ্নের উত্তর ধৈর্য সহকারে দেওয়া হয়। এটাই আমার সবচেয়ে পছন্দের দিক।", textEn: "Newcomers are never looked down upon. Every question is answered patiently. That's what I like most." },
  { stars: "★★★★★", rating: "4.8/5", nameBn: "ইভা রহমান", nameEn: "Eva Rahman", textBn: "শুরুতে ধৈর্য ধরে কাজ করতে হবে, কিন্তু ফলাফল ভালো। আমি এখন সন্তুষ্ট।", textEn: "Need patience initially, but the results are good. I'm satisfied now." },
  { stars: "★★★★★", rating: "4.9/5", nameBn: "মামুন মিয়া", nameEn: "Mamun Mia", textBn: "যারা দ্বিধায় আছেন তাদের বলব, শুরু করে দিন। এখানে সঠিক দিকনির্দেশনা পাবেন।", textEn: "To those who are hesitant — just start. You'll get proper guidance here." },
  { stars: "★★★★★", rating: "5.0/5", nameBn: "মোর্শেদ মিয়া", nameEn: "Morshed Mia", textBn: "পেশাদার পরিবেশ আর নিয়মিত কাজ — এটাই সবার জন্য দরকার।", textEn: "Professional environment and regular work — that's what everyone needs." },
  { stars: "★★★★★", rating: "5.0/5", nameBn: "আনিকা ইসলাম", nameEn: "Anika Islam", textBn: "ই-কমার্সে কাজ করে মাসে ৪০,০০০+ ইনকাম করছি। শুরুতে কেউ বিশ্বাস করেনি, কিন্তু আজ আমি প্রমাণ করেছি।", textEn: "Earning 40,000+ monthly from e-commerce. No one believed at first, but I proved them wrong today." },
];

export const googleDriveData = {
  badgeBn: "📁 কেনার পর পাবেন — ২৩০+ কোর্সের গুগল ড্রাইভ!",
  badgeEn: "📁 What You Get After Purchase — Google Drive with 230+ Courses!",
  titleBn: "জোবায়ের গ্রুপ পেশা — মাস্টার বান্ডেল (২৩০+ কোর্স)",
  titleEn: "Jobayer Group Career — Master Bundle (230+ Courses)",
  statusBn: "🟢 লাইভ",
  statusEn: "🟢 Live",
  folders: [
    { icon: "💼", nameBn: "ফ্রিল্যান্সিং ও আয়", nameEn: "Freelancing & Income" },
    { icon: "🌐", nameBn: "ওয়েব ডেভেলপমেন্ট", nameEn: "Web Development" },
    { icon: "🎨", nameBn: "গ্রাফিক্স ও ভিডিও", nameEn: "Graphics & Video" },
    { icon: "🛒", nameBn: "ই-কমার্স", nameEn: "E-commerce" },
    { icon: "🗣️", nameBn: "ভাষা ও চাকরি", nameEn: "Language & Jobs" },
    { icon: "📱", nameBn: "অ্যাপ ও গেম", nameEn: "App & Game" },
    { icon: "🔐", nameBn: "সাইবার সিকিউরিটি", nameEn: "Cyber Security" },
    { icon: "📒", nameBn: "নোটস", nameEn: "Notes" },
  ],
  footerBn: "⚡ এখনই কিনলে সঙ্গে সঙ্গে গুগল ড্রাইভে সব খুলে যাবে!",
  footerEn: "⚡ Buy now and everything on Google Drive unlocks instantly!",
};

export const checkoutCtaData = {
  headlineBn: "৩০ সেকেন্ডেই শুরু করুন আপনার আয়ের যাত্রা!",
  headlineEn: "Start Your Earning Journey in 30 Seconds!",
  descBn: "নিচে আপনার নাম-ফোন দিন, পেমেন্ট করুন। সাথে সাথেই সব কোর্স ও অ্যাক্সেস চলে আসবে!",
  descEn: "Enter your name & phone, make payment. All courses unlock instantly!",
  ctaBn: "🔥 হ্যাঁ, দাম বাড়ার আগে মাত্র ৯৯ টাকায় আজীবন অ্যাক্সেস নিন →",
  ctaEn: "🔥 Yes, Get Lifetime Access for Only 99 BDT Before Price Hike →",
  timerDuration: 1800,
  timerMin: 300,
  initialQuota: 87,
  badges: [
    { icon: "✅", textBn: "২৩০+ প্রিমিয়াম কোর্স", textEn: "230+ Premium Courses" },
    { icon: "✅", textBn: "লাইফটাইম অ্যাক্সেস", textEn: "Lifetime Access" },
    { icon: "✅", textBn: "২৪ ঘণ্টা নিঃশর্ত ফেরত", textEn: "24h Unconditional Refund" },
    { icon: "✅", textBn: "SSL সুরক্ষিত পেমেন্ট", textEn: "SSL Secured Payment" },
    { icon: "✅", textBn: "সাথে সাথে এক্সেস", textEn: "Instant Access" },
  ],
  paymentBrands: [
    { name: "বিকাশ", nameEn: "bKash", style: "bkash" },
    { name: "নগদ", nameEn: "Nagad", style: "nagad" },
    { name: "রকেট", nameEn: "Rocket", style: "rocket" },
    { name: "SSL কমার্জ", nameEn: "SSL Commerce", style: "ssl" },
  ],
  priceOriginalBn: "১০,০০,০০০+ টাকা",
  priceOriginalEn: "10,00,000+ BDT",
  priceOfferBn: "৯৯ টাকা",
  priceOfferEn: "99 BDT",
  discountLabelBn: "৯৯.৯৯% ছাড়",
  discountLabelEn: "99.99% OFF",
};

export const heroFeatureGridItems = [
  { icon: "🏆", textBn: "২৩০+ প্রিমিয়াম কোর্স (উপহার)", textEn: "230+ Premium Courses (Gift)" },
  { icon: "💰", textBn: "লাইভ আয়ের প্রমাণ", textEn: "Live Income Proof" },
  { icon: "💳", textBn: "বাস্তব পেমেন্ট প্রমাণ", textEn: "Real Payment Proof" },
  { icon: "🛡️", textBn: "২৪ ঘণ্টা টাকা ফেরত গ্যারান্টি", textEn: "24h Money Back Guarantee" },
];

export const phpSliderTestimonials: Testimonial[] = [
  { stars: "★★★★★", rating: "5.0/5", quoteBn: '"প্রথমে আমার সন্দেহ ছিল, কিন্তু যোগ দেওয়ার পর প্রথম মাসেই ৪৫,০০০ টাকা আয় করেছি। ট্রেইনাররা অসাধারণ!"', quoteEn: '"I was skeptical at first, but after joining I earned ৳45,000 in my first month. The trainers are amazing!"', authorBn: "রাকিব এইচ", authorEn: "Rakib H.", labelBn: "ফ্রিল্যান্সার, ঢাকা", labelEn: "Freelancer, Dhaka" },
  { stars: "★★★★★", rating: "5.0/5", quoteBn: '"২৩০+ কোর্স মাত্র ৯৯ টাকায় দারুণ ব্যাপার। কোর্সের মান চমৎকার। সবার জন্য রেকমেন্ডেড!"', quoteEn: '"230+ courses for only ৳99 is a steal. The course quality is top-notch. Highly recommend!"', authorBn: "ফাতিমা কে", authorEn: "Fatima K.", labelBn: "শিক্ষার্থী, চট্টগ্রাম", labelEn: "Student, Chattogram" },
  { stars: "★★★★★", rating: "4.9/5", quoteBn: '"ক্লায়েন্ট ফাইন্ডিং গাইড একাই দামের ১০ গুণ মূল্যবান। আমি ৩ দিনের মধ্যেই প্রথম প্রজেক্ট পেয়ে গিয়েছি!"', quoteEn: '"The client-finding guide alone is worth 10x the price. I landed my first project in 3 days!"', authorBn: "শাহিন এ", authorEn: "Shahin A.", labelBn: "ওয়েব ডেভেলপার, সিলেট", labelEn: "Web Developer, Sylhet" },
  { stars: "★★★★★", rating: "5.0/5", quoteBn: '"আগে কিছুই আয় করতাম না। এখন ফ্রিল্যান্সিং থেকে মাসে ২৫,০০০+ টাকা আয় করি। জোবায়ের গ্রুপকে ধন্যবাদ!"', quoteEn: '"I was earning nothing before. Now I make ৳25,000+ monthly from freelancing. Thank you Jobayer Group!"', authorBn: "নুসরাত জে", authorEn: "Nusrat J.", labelBn: "ভার্চুয়াল অ্যাসিস্ট্যান্ট, রাজশাহী", labelEn: "Virtual Assistant, Rajshahi" },
  { stars: "★★★★★", rating: "4.9/5", quoteBn: '"শুধু ইংরেজি কোর্সগুলিই ৯৯ টাকার চেয়ে অনেক বেশি মূল্যবান। মাত্র ২ সপ্তাহে আমার স্পিকিং স্কিল নাটকীয়ভাবে উন্নত হয়েছে।"', quoteEn: '"The English courses alone are worth ৳99. I improved my speaking skills dramatically in just 2 weeks."', authorBn: "আরিফ এম", authorEn: "Arif M.", labelBn: "চাকরিপ্রার্থী, খুলনা", labelEn: "Job Seeker, Khulna" },
];

export const trainerPhotoGrid = [
  { nameBn: "তানভিরুল ইসলাম", nameEn: "Tanvirul Islam", specialtyBn: "ইংরেজি ও নেতৃত্ব", specialtyEn: "English & Leadership" },
  { nameBn: "শরিফুল ইসলাম", nameEn: "Shariful Islam", specialtyBn: "ইংরেজি ও ভর্তি", specialtyEn: "English & Admission" },
  { nameBn: "মোঃ রাশেদ", nameEn: "Md. Rashed", specialtyBn: "ফ্রিল্যান্সিং ও ডেভ", specialtyEn: "Freelancing & Dev" },
  { nameBn: "মোঃ হাসান", nameEn: "Md. Hasan", specialtyBn: "ই-কমার্স ও মার্কেটিং", specialtyEn: "E-Commerce & Marketing" },
  { nameBn: "আব্দুল্লাহ আল মামুন", nameEn: "Abdullah Al Mamun", specialtyBn: "UI/UX ও ডিজাইন", specialtyEn: "UI/UX & Design" },
  { nameBn: "সাজিব দাস", nameEn: "Sajib Das", specialtyBn: "ডেভ ও সফটওয়্যার টুলস", specialtyEn: "Dev & Software Tools" },
  { nameBn: "জাকির হোসেন", nameEn: "Jakir Hossain", specialtyBn: "ডিজিটাল মার্কেটিং", specialtyEn: "Digital Marketing" },
  { nameBn: "মাহমুদ হাসান", nameEn: "Mahmud Hasan", specialtyBn: "ফ্রিল্যান্সিং ও ক্যারিয়ার", specialtyEn: "Freelancing & Career" },
  { nameBn: "রফিকুল ইসলাম", nameEn: "Rafiqul Islam", specialtyBn: "ভাষা ও পেশা", specialtyEn: "Language & Jobs" },
  { nameBn: "শারমিন আখতার", nameEn: "Sharmin Akhter", specialtyBn: "মাল্টিমিডিয়া ও কন্টেন্ট", specialtyEn: "Multimedia & Content" },
  { nameBn: "নুসরাত জাহান", nameEn: "Nusrat Jahan", specialtyBn: "UI/UX ও গ্রাফিক্স", specialtyEn: "UI/UX & Graphics" },
  { nameBn: "ইমরান হোসেন", nameEn: "Imran Hossain", specialtyBn: "সফটওয়্যার ও ডেভেলপমেন্ট", specialtyEn: "Software & Development" },
];

export const bundlePricingData = {
  totalValueBn: "১০,০০,০০০+ টাকা",
  totalValueEn: "৳10,00,000+",
  offerPriceBn: "৯৯ টাকা",
  offerPriceEn: "৳99",
  savingsTextBn: "আপনি ৯৯.৯% সাশ্রয় করছেন — মাত্র এক বেলা খাবারের দামে ২৩০+ কোর্স!",
  savingsTextEn: "You save 99.9% — 230+ courses for the price of a lunch!",
  platformLogos: [
    { nameBn: "আপওয়ার্ক", nameEn: "Upwork", color: "#2E7D32" },
    { nameBn: "ফাইভার", nameEn: "Fiverr", color: "#1565C0" },
    { nameBn: "শপিফাই", nameEn: "Shopify", color: "#E65100" },
    { nameBn: "ওয়ার্ডপ্রেস", nameEn: "WordPress", color: "#6A1B9A" },
    { nameBn: "অ্যামাজন", nameEn: "Amazon", color: "#283593" },
    { nameBn: "ইউটিউব", nameEn: "YouTube", color: "#00695C" },
    { nameBn: "ফ্রিল্যান্সার", nameEn: "Freelancer", color: "#880E4F" },
    { nameBn: "ফিগমা", nameEn: "Figma", color: "#F57F17" },
  ],
};
