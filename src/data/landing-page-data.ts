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

export interface CourseCategory {
  id: string;
  icon: string;
  titleBn: string;
  titleEn: string;
  platformLogos: string[];
  trainers: string[];
  courses: { nameBn: string; nameEn: string }[];
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
  headlineBn: "ঘরে বসে ইনকাম শুরু করুন — কোনো অভিজ্ঞতা লাগবে না!",
  headlineEn: "Start Earning from Home — No Experience Needed!",
  subheadBn: "৮৬৬+ শিক্ষার্থী ইতিমধ্যেই আয় শুরু করেছেন। দেশের সেরা ১২ জন প্রশিক্ষকের ২৩০টির বেশি কোর্স — আজীবনের জন্য। পছন্দ না হলে ২৪ ঘণ্টায় টাকা ফেরত।",
  subheadEn: "866+ students already earning. 230+ courses from Bangladesh's top 12 trainers — lifetime access. 24h money-back guarantee.",
  badges: [
    { icon: "🎯", textBn: "রিয়েল মার্কেট প্রজেক্ট", textEn: "Real Market Projects" },
    { icon: "📚", textBn: "২৩০+ কোর্স", textEn: "230+ Courses" },
    { icon: "👨‍🏫", textBn: "১২ জন বিশেষজ্ঞ", textEn: "12 Expert Trainers" },
    { icon: "💼", textBn: "জব প্লেসমেন্ট", textEn: "Job Placement" },
  ],
  problemBn: "অনলাইনে আয় করতে চান কিন্তু বুঝতে পারছেন না কোথা থেকে শুরু করবেন? বেশিরভাগ কোর্স শুধু থিওরি দেয় — রিয়েল মার্কেটের জন্য তৈরি করে না।",
  problemEn: "Want to earn online but don't know where to start? Most courses teach theory — not real market skills.",
  solutionBn: "জোবায়ের গ্রুপ ক্যারিয়ার আপনাকে দেয় রিয়েল মার্কেট প্রজেক্ট, সরাসরি ক্লায়েন্ট এক্সপোজার, এবং কাজ শেখার পর ইন্টার্নশিপের সুযোগ — সব একসাথে।",
  solutionEn: "Jobayer Group Career gives you real market projects, direct client exposure, and internship opportunities — all in one place.",
  ctaBn: "🚀 আপনার অ্যাকাউন্ট খুলুন এখনই →",
  ctaEn: "🚀 Create Your Account Now →",
  ctaHref: "/register",
  liveCountLabelBn: "সক্রিয় শিক্ষার্থী",
  liveCountLabelEn: "Active Students",
};

export const stats: StatItem[] = [
  { num: "৮৬৬+", labelBn: "সক্রিয় শিক্ষার্থী", labelEn: "Active Students" },
  { separator: true },
  { num: "৪.৯★", labelBn: "ফেসবুক মূল্যায়ন", labelEn: "Facebook Rating" },
  { separator: true },
  { num: "৮+ বছর", labelBn: "পেশাদার অভিজ্ঞতা", labelEn: "Years Experience" },
  { separator: true },
  { num: "৫০,০০০+", labelBn: "সর্বোচ্চ মাসিক আয়", labelEn: "Max Monthly Earning" },
  { separator: true },
  { chipBn: "⚡ সাথে সাথে অ্যাক্সেস", chipEn: "⚡ Instant Access" },
  { separator: true },
  { chipBn: "📚 লাইফটাইম আপডেট", chipEn: "📚 Lifetime Updates" },
  { separator: true },
  { chipBn: "✅ ২৪ ঘণ্টা ফেরত", chipEn: "✅ 24h Money Back" },
];

export const platforms: PlatformItem[] = [
  { name: "10 Minute School", nameBn: "টেন মিনিট স্কুল", logo: "/images/platforms/10-minute-school.jpg" },
  { name: "Ghoori Learning", nameBn: "ঘুড়ি লার্নিং", logo: "/images/platforms/ghoori-learning.jpeg" },
  { name: "Skill Up", nameBn: "স্কিল আপ", logo: "/images/platforms/skill-up.png" },
  { name: "eShikhon", nameBn: "ইশিখন", logo: "/images/platforms/eshikhon.webp" },
  { name: "Mayajal", nameBn: "মায়াজাল", logo: "/images/platforms/mayajal.jpg" },
  { name: "MSB Academy", nameBn: "MSB Academy", logo: "/images/platforms/msb-academy.png" },
  { name: "Creative IT", nameBn: "ক্রিয়েটিভ আইটি", logo: "/images/platforms/creative-it.jpg" },
  { name: "Problem KI", nameBn: "প্রব্লেম কেআই", logo: "/images/platforms/problem-ki.png" },
  { name: "REPTO", nameBn: "রেপটো", logo: "/images/platforms/repto.jpg" },
];

export const trainers: Trainer[] = [
  {
    name: "Ayman Sadiq", nameBn: "আয়মান সাদিক",
    specialtyBn: "এডুকেশন & কন্টেন্ট ক্রিয়েশন", specialtyEn: "Education & Content Creation",
    credentialBn: "১০ মিনিট স্কুলের প্রতিষ্ঠাতা, ৫০০০০+ শিক্ষার্থী", credentialEn: "Founder of 10 Minute School, 50000+ students",
    coursesBn: ["কন্টেন্ট ক্রিয়েশন মাস্টারক্লাস", "ডিজিটাল এডুকেশন স্ট্র্যাটেজি"],
    coursesEn: ["Content Creation Masterclass", "Digital Education Strategy"],
    image: "/images/trainers/ayman-sadiq.jpg",
    bioBn: "দেশের সর্ববৃহৎ এডটেক প্ল্যাটফর্ম ১০ মিনিট স্কুলের প্রতিষ্ঠাতা।",
    bioEn: "Founder of the largest edtech platform in Bangladesh — 10 Minute School."
  },
  {
    name: "Munzereen Shahid", nameBn: "মুনজারিন শহীদ",
    specialtyBn: "স্পোকেন ইংলিশ & কমিউনিকেশন", specialtyEn: "Spoken English & Communication",
    credentialBn: "১০ মিনিট স্কুলের স্পোকেন ইংলিশ টিচার, ২০০০০+ শিক্ষার্থী", credentialEn: "Spoken English Teacher at 10 Minute School, 20000+ students",
    coursesBn: ["স্পোকেন ইংলিশ মাস্টারি", "ইংলিশ কমিউনিকেশন কোর্স"],
    coursesEn: ["Spoken English Mastery", "English Communication Course"],
    image: "/images/trainers/munzereen-shahid.jpg",
    bioBn: "স্পোকেন ইংলিশে দেশের শীর্ষ প্রশিক্ষকদের একজন।",
    bioEn: "One of the top spoken English trainers in the country."
  },
  {
    name: "Jhankar Mahbub", nameBn: "ঝংকার মাহবুব",
    specialtyBn: "ওয়েব ডেভেলপমেন্ট & প্রোগ্রামিং", specialtyEn: "Web Development & Programming",
    credentialBn: "সিনিয়র সফটওয়্যার ইঞ্জিনিয়ার, bestselling author", credentialEn: "Senior Software Engineer, bestselling author",
    coursesBn: ["ওয়েব ডেভেলপমেন্ট বুটক্যাম্প", "প্রোগ্রামিং বেসিক"],
    coursesEn: ["Web Development Bootcamp", "Programming Basics"],
    image: "/images/trainers/jhankar-mahbub.jpg",
    bioBn: "আমেরিকান টেক কোম্পানির সিনিয়র ইঞ্জিনিয়ার ও প্রোগ্রামিং বইয়ের লেখক।",
    bioEn: "Senior Engineer at a US tech company and bestselling programming author."
  },
  {
    name: "Khalid Farhan", nameBn: "খালিদ ফারহান",
    specialtyBn: "ডিজিটাল মার্কেটিং", specialtyEn: "Digital Marketing",
    credentialBn: "ডিজিটাল মার্কেটিং স্পেশালিস্ট, ৮+ বছর", credentialEn: "Digital Marketing Specialist, 8+ years",
    coursesBn: ["ফেসবুক & ইনস্টাগ্রাম মার্কেটিং", "গুগল অ্যাডস মাস্টারি"],
    coursesEn: ["Facebook & Instagram Marketing", "Google Ads Mastery"],
    image: "/images/trainers/khalid-farhan.jpg",
    bioBn: "ডিজিটাল মার্কেটিংয়ে ৮ বছরের অভিজ্ঞতা।",
    bioEn: "8+ years of experience in digital marketing."
  },
  {
    name: "Sadman Sadik", nameBn: "সাদমান সাদিক",
    specialtyBn: "UI/UX ডিজাইন", specialtyEn: "UI/UX Design",
    credentialBn: "প্রিমিয়ার UI/UX ডিজাইনার, ৬+ বছর", credentialEn: "Premier UI/UX Designer, 6+ years",
    coursesBn: ["UI/UX ডিজাইন ফান্ডামেন্টাল", "ফিগমা মাস্টারক্লাস"],
    coursesEn: ["UI/UX Design Fundamentals", "Figma Masterclass"],
    image: "/images/trainers/sadman-sadik.jpg",
    bioBn: "UI/UX ডিজাইনে দেশের শীর্ষ ডিজাইনারদের একজন।",
    bioEn: "One of the top UI/UX designers in the country."
  },
  {
    name: "Freelancer Nasim", nameBn: "ফ্রিল্যান্সার নাসিম",
    specialtyBn: "ফ্রিল্যান্সিং & আউটসোর্সিং", specialtyEn: "Freelancing & Outsourcing",
    credentialBn: "ফাইভার টপ-রেটেড ফ্রিল্যান্সার, ৭+ বছর", credentialEn: "Fiverr Top-Rated Freelancer, 7+ years",
    coursesBn: ["ফাইভার ফ্রিল্যান্সিং মাস্টারি", "আপওয়ার্ক প্রোফাইল অপটিমাইজেশন"],
    coursesEn: ["Fiverr Freelancing Mastery", "Upwork Profile Optimization"],
    image: "/images/trainers/freelancer-nasim.jpg",
    bioBn: "ফ্রিল্যান্সিংয়ে হাজারো শিক্ষার্থী তৈরি করেছেন।",
    bioEn: "Has trained thousands of students in freelancing."
  },
  {
    name: "Tahsan Khan", nameBn: "তাহসান খান",
    specialtyBn: "ডিজিটাল মার্কেটিং & ব্র্যান্ডিং", specialtyEn: "Digital Marketing & Branding",
    credentialBn: "ডিজিটাল মার্কেটিং এক্সপার্ট, ৬+ বছর", credentialEn: "Digital Marketing Expert, 6+ years",
    coursesBn: ["SEO মাস্টারি কোর্স", "কন্টেন্ট মার্কেটিং স্ট্র্যাটেজি"],
    coursesEn: ["SEO Mastery Course", "Content Marketing Strategy"],
    image: "/images/trainers/tahsan-khan.jpg",
    bioBn: "ব্র্যান্ডিং ও ডিজিটাল মার্কেটিং স্পেশালিস্ট।",
    bioEn: "Branding and digital marketing specialist."
  },
  {
    name: "Jubayer Hossain", nameBn: "জুবায়ের হোসাইন",
    specialtyBn: "গ্রাফিক্স ডিজাইন & ভিডিও এডিটিং", specialtyEn: "Graphics Design & Video Editing",
    credentialBn: "প্রিমিয়ার প্রো & ফটোশপ এক্সপার্ট, ৫+ বছর", credentialEn: "Premiere Pro & Photoshop Expert, 5+ years",
    coursesBn: ["ফটোশপ মাস্টারক্লাস", "প্রিমিয়ার প্রো বেসিক টু অ্যাডভান্সড"],
    coursesEn: ["Photoshop Masterclass", "Premiere Pro Basic to Advanced"],
    image: "/images/trainers/jubayer-hossain.jpg",
    bioBn: "গ্রাফিক্স ডিজাইন ও ভিডিও এডিটিং প্রশিক্ষক।",
    bioEn: "Graphics design and video editing trainer."
  },
  {
    name: "Abtahi Iptesam", nameBn: "আবতাহি ইপ্তেসাম",
    specialtyBn: "ডেটা সায়েন্স & এআই", specialtyEn: "Data Science & AI",
    credentialBn: "ডেটা সায়েন্টিস্ট, ৫+ বছর", credentialEn: "Data Scientist, 5+ years",
    coursesBn: ["ডেটা সায়েন্স ফান্ডামেন্টাল", "পাইথন ফর ডেটা সায়েন্স"],
    coursesEn: ["Data Science Fundamentals", "Python for Data Science"],
    image: "/images/trainers/abtahi-iptesam.jpg",
    bioBn: "ডেটা সায়েন্স ও মেশিন লার্নিং বিশেষজ্ঞ।",
    bioEn: "Data science and machine learning expert."
  },
  {
    name: "Mahade Hasan", nameBn: "মাহাদে হাসান",
    specialtyBn: "ই-কমার্স & শপিফাই", specialtyEn: "E-commerce & Shopify",
    credentialBn: "শপিফাই এক্সপার্ট, ৫+ বছর", credentialEn: "Shopify Expert, 5+ years",
    coursesBn: ["শপিফাই স্টোর ডেভেলপমেন্ট", "ড্রপশিপিং মাস্টারি"],
    coursesEn: ["Shopify Store Development", "Dropshipping Mastery"],
    image: "/images/trainers/mahade-hasan.jpg",
    bioBn: "ই-কমার্স ও শপিফাই বিশেষজ্ঞ।",
    bioEn: "E-commerce and Shopify expert."
  },
  {
    name: "Vaibhav Sisinity", nameBn: "ভৈভব সিসিনিটি",
    specialtyBn: "ডিজিটাল মার্কেটিং & অ্যাফিলিয়েট", specialtyEn: "Digital Marketing & Affiliate",
    credentialBn: "অ্যাফিলিয়েট মার্কেটিং এক্সপার্ট, ৬+ বছর", credentialEn: "Affiliate Marketing Expert, 6+ years",
    coursesBn: ["অ্যাফিলিয়েট মার্কেটিং মাস্টারক্লাস", "ই-কমার্স অ্যাফিলিয়েট স্ট্র্যাটেজি"],
    coursesEn: ["Affiliate Marketing Masterclass", "E-commerce Affiliate Strategy"],
    image: "/images/trainers/vaibhav-sisinity.jpg",
    bioBn: "অ্যাফিলিয়েট মার্কেটিংয়ে আন্তর্জাতিক খ্যাতিসম্পন্ন প্রশিক্ষক।",
    bioEn: "Internationally renowned affiliate marketing trainer."
  },
  {
    name: "Soban Tariq", nameBn: "সোবান তারিক",
    specialtyBn: "অ্যাফিলিয়েট মার্কেটিং & ফানেল", specialtyEn: "Affiliate Marketing & Funnel",
    credentialBn: "ফানেল বিল্ডিং এক্সপার্ট, ৫+ বছর", credentialEn: "Funnel Building Expert, 5+ years",
    coursesBn: ["ফানেল বিল্ডিং কোর্স", "ক্লিকফানেল মাস্টারি"],
    coursesEn: ["Funnel Building Course", "ClickFunnels Mastery"],
    image: "/images/trainers/soban-tariq.jpg",
    bioBn: "ফানেল বিল্ডিং ও অ্যাফিলিয়েট মার্কেটিং বিশেষজ্ঞ।",
    bioEn: "Funnel building and affiliate marketing expert."
  },
];

export const courseCategories: CourseCategory[] = [
  {
    id: "affiliate-marketing", icon: "📢",
    titleBn: "অ্যাফিলিয়েট মার্কেটিং", titleEn: "Affiliate Marketing",
    platformLogos: ["/images/platforms/10-minute-school.jpg", "/images/platforms/problem-ki.png"],
    trainers: ["Vaibhav Sisinity", "Soban Tariq"],
    courses: [
      { nameBn: "অ্যাফিলিয়েট মার্কেটিং মাস্টারক্লাস", nameEn: "Affiliate Marketing Masterclass" },
      { nameBn: "ফেসবুক অ্যাফিলিয়েট কোর্স", nameEn: "Facebook Affiliate Course" },
      { nameBn: "ই-কমার্স অ্যাফিলিয়েট স্ট্র্যাটেজি", nameEn: "E-commerce Affiliate Strategy" },
      { nameBn: "ক্লিকফানেল মাস্টারি", nameEn: "ClickFunnels Mastery" },
    ],
  },
  {
    id: "digital-marketing", icon: "📱",
    titleBn: "ডিজিটাল মার্কেটিং", titleEn: "Digital Marketing",
    platformLogos: ["/images/platforms/creative-it.jpg", "/images/platforms/10-minute-school.jpg"],
    trainers: ["Khalid Farhan", "Tahsan Khan"],
    courses: [
      { nameBn: "ফেসবুক & ইনস্টাগ্রাম মার্কেটিং", nameEn: "Facebook & Instagram Marketing" },
      { nameBn: "গুগল অ্যাডস মাস্টারি", nameEn: "Google Ads Mastery" },
      { nameBn: "SEO & কন্টেন্ট মার্কেটিং", nameEn: "SEO & Content Marketing" },
      { nameBn: "ইমেইল মার্কেটিং স্ট্র্যাটেজি", nameEn: "Email Marketing Strategy" },
    ],
  },
  {
    id: "ecommerce", icon: "🛒",
    titleBn: "ই-কমার্স", titleEn: "E-commerce",
    platformLogos: ["/images/platforms/ghoori-learning.jpeg", "/images/platforms/mayajal.jpg"],
    trainers: ["Mahade Hasan", "Freelancer Nasim"],
    courses: [
      { nameBn: "শপিফাই স্টোর তৈরি ও মার্কেটিং", nameEn: "Shopify Store & Marketing" },
      { nameBn: "ড্রপশিপিং মাস্টারি", nameEn: "Dropshipping Mastery" },
      { nameBn: "ওয়াকমার্স স্টোর ডেভেলপমেন্ট", nameEn: "WooCommerce Store Development" },
      { nameBn: "ফেসবুক শপ সেটআপ", nameEn: "Facebook Shop Setup" },
    ],
  },
  {
    id: "graphics-design", icon: "🎨",
    titleBn: "গ্রাফিক্স ডিজাইন", titleEn: "Graphics Design",
    platformLogos: ["/images/platforms/msb-academy.png", "/images/platforms/repto.jpg"],
    trainers: ["Jubayer Hossain", "Sadman Sadik"],
    courses: [
      { nameBn: "ফটোশপ মাস্টারক্লাস", nameEn: "Photoshop Masterclass" },
      { nameBn: "ইলাস্ট্রেটর প্রো কোর্স", nameEn: "Illustrator Pro Course" },
      { nameBn: "UI/UX ডিজাইন ফান্ডামেন্টাল", nameEn: "UI/UX Design Fundamentals" },
      { nameBn: "ফিগমা মাস্টারক্লাস", nameEn: "Figma Masterclass" },
    ],
  },
  {
    id: "web-development", icon: "💻",
    titleBn: "ওয়েব ডেভেলপমেন্ট", titleEn: "Web Development",
    platformLogos: ["/images/platforms/skill-up.png", "/images/platforms/eshikhon.webp"],
    trainers: ["Jhankar Mahbub", "Abtahi Iptesam"],
    courses: [
      { nameBn: "ওয়েব ডিজাইন বেসিক", nameEn: "Web Design Basics" },
      { nameBn: "ফুল স্ট্যাক ওয়েব ডেভেলপমেন্ট", nameEn: "Full Stack Web Development" },
      { nameBn: "ওয়ার্ডপ্রেস থিম ডেভেলপমেন্ট", nameEn: "WordPress Theme Development" },
      { nameBn: "পাইথন ফর ডেটা সায়েন্স", nameEn: "Python for Data Science" },
    ],
  },
  {
    id: "freelancing", icon: "🌍",
    titleBn: "ফ্রিল্যান্সিং", titleEn: "Freelancing",
    platformLogos: ["/images/platforms/repto.jpg", "/images/platforms/ghoori-learning.jpeg"],
    trainers: ["Freelancer Nasim", "Tahsan Khan"],
    courses: [
      { nameBn: "ফাইভার ফ্রিল্যান্সিং মাস্টারি", nameEn: "Fiverr Freelancing Mastery" },
      { nameBn: "আপওয়ার্ক প্রোফাইল অপটিমাইজেশন", nameEn: "Upwork Profile Optimization" },
      { nameBn: "লিংকডইন ফ্রিল্যান্সিং গাইড", nameEn: "LinkedIn Freelancing Guide" },
    ],
  },
  {
    id: "video-editing", icon: "🎬",
    titleBn: "ভিডিও এডিটিং", titleEn: "Video Editing",
    platformLogos: ["/images/platforms/creative-it.jpg", "/images/platforms/msb-academy.png"],
    trainers: ["Jubayer Hossain", "Ayman Sadiq"],
    courses: [
      { nameBn: "প্রিমিয়ার প্রো বেসিক টু অ্যাডভান্সড", nameEn: "Premiere Pro Basic to Advanced" },
      { nameBn: "ক্যাপকাট মোবাইল এডিটিং", nameEn: "CapCut Mobile Editing" },
      { nameBn: "ইউটিউব কন্টেন্ট ক্রিয়েশন", nameEn: "YouTube Content Creation" },
    ],
  },
  {
    id: "content-writing", icon: "✍️",
    titleBn: "কন্টেন্ট রাইটিং", titleEn: "Content Writing",
    platformLogos: ["/images/platforms/10-minute-school.jpg", "/images/platforms/eshikhon.webp"],
    trainers: ["Ayman Sadiq", "Tahsan Khan"],
    courses: [
      { nameBn: "প্রফেশনাল কন্টেন্ট রাইটিং", nameEn: "Professional Content Writing" },
      { nameBn: "কপিরাইটিং মাস্টারি", nameEn: "Copywriting Mastery" },
      { nameBn: "ব্লগিং ও এসইও রাইটিং", nameEn: "Blogging & SEO Writing" },
    ],
  },
  {
    id: "spoken-english", icon: "🗣️",
    titleBn: "স্পোকেন ইংলিশ", titleEn: "Spoken English",
    platformLogos: ["/images/platforms/10-minute-school.jpg", "/images/platforms/skill-up.png"],
    trainers: ["Munzereen Shahid", "Khalid Farhan"],
    courses: [
      { nameBn: "স্পোকেন ইংলিশ ফর ফ্রিল্যান্সিং", nameEn: "Spoken English for Freelancing" },
      { nameBn: "ইংলিশ কমিউনিকেশন মাস্টারি", nameEn: "English Communication Mastery" },
      { nameBn: "আইইএলটিএস প্রিপারেশন", nameEn: "IELTS Preparation" },
    ],
  },
  {
    id: "data-science", icon: "🤖",
    titleBn: "ডেটা সায়েন্স & এআই", titleEn: "Data Science & AI",
    platformLogos: ["/images/platforms/skill-up.png", "/images/platforms/mayajal.jpg"],
    trainers: ["Abtahi Iptesam", "Jhankar Mahbub"],
    courses: [
      { nameBn: "ডেটা সায়েন্স ফান্ডামেন্টাল", nameEn: "Data Science Fundamentals" },
      { nameBn: "মেশিন লার্নিং বেসিক", nameEn: "Machine Learning Basics" },
      { nameBn: "পাইথন ফর ডেটা সায়েন্স", nameEn: "Python for Data Science" },
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
  { qBn: "💵 বিনামূল্যে রেজিস্টার করে কি সত্যিই অনলাইনে আয় করা সম্ভব?", qEn: "💵 Can I really earn online by registering for free?",
    aBn: "হ্যাঁ, সম্ভব। আমাদের ৮৬৬+ শিক্ষার্থী প্রমাণ করে সঠিক গাইড পেলে যে কেউ আয় করতে পারেন। মাসে ৫০,০০০+ টাকা আয় করা সম্ভব।",
    aEn: "Yes. Our 866+ students prove that with the right guidance, anyone can earn. 50,000+ BDT monthly is achievable." },
  { qBn: "🛡️ এটি কি কোনো স্ক্যাম বা ফেক প্রোগ্রাম?", qEn: "🛡️ Is this a scam or fake program?",
    aBn: "একেবারেই না। জোবায়ের গ্রুপ ৮+ বছর ধরে কাজ করছে। আমরা ২৪ ঘণ্টায় টাকা ফেরত দিই — কোনো প্রতারক কোম্পানি টাকা ফেরত দেয় না।",
    aEn: "Absolutely not. Jobayer Group has been operating for 8+ years. We offer 24h money back — no scam company does that." },
  { qBn: "📱 আমার কোনো পূর্ব অভিজ্ঞতা নেই — তবু কি পারব?", qEn: "📱 I have no prior experience — can I still do it?",
    aBn: "অবশ্যই। আপনার শুধু দরকার একটি স্মার্টফোন বা ল্যাপটপ আর শেখার ইচ্ছা। বাকি সব — আমরা দিচ্ছি।",
    aEn: "Of course. All you need is a smartphone or laptop and the desire to learn. We provide the rest." },
  { qBn: "💰 কত তাড়াতাড়ি আমি প্রথম পেমেন্ট পাব?", qEn: "💰 How soon will I get my first payment?",
    aBn: "বেশিরভাগ শিক্ষার্থী প্রথম মাসেই ১,১০০ - ৫,০০০+ টাকা আয় শুরু করেন। মাসে ৫০,০০০+ টাকা আয় করতে ৩-৬ মাস লাগতে পারে।",
    aEn: "Most students start earning 1,100 - 5,000+ BDT in the first month. 50,000+ BDT monthly takes 3-6 months." },
  { qBn: "🔄 কি মাসিক ফি দিতে হবে? নাকি একবারই দিলেই হবে?", qEn: "🔄 Is there a monthly fee or one-time payment?",
    aBn: "একবার রেজিস্টার করলেই আজীবন অ্যাক্সেস! কোনো মাসিক ফি নেই, কোনো লুকানো চার্জ নেই।",
    aEn: "Register once and get lifetime access! No monthly fees, no hidden charges." },
  { qBn: "📥 রেজিস্টার করার পর কীভাবে কোর্স অ্যাক্সেস পাব?", qEn: "📥 How do I access courses after registration?",
    aBn: "রেজিস্টার করার ১ মিনিটের মধ্যে আপনার ইমেইলে ও হোয়াটসঅ্যাপে গুগল ড্রাইভ লিংক চলে যাবে।",
    aEn: "Within 1 minute of registration, a Google Drive link will be sent to your email and WhatsApp." },
  { qBn: "🎓 আমি কি একসাথে সব কোর্স করতে পারব?", qEn: "🎓 Can I take all courses at once?",
    aBn: "হ্যাঁ, আপনি যেকোনো সময় যেকোনো কোর্স শুরু করতে পারেন। সব কোর্স আপনার জন্য উন্মুক্ত থাকবে আজীবনের জন্য।",
    aEn: "Yes, you can start any course at any time. All courses remain open to you for life." },
  { qBn: "📞 রেজিস্টার করতে সমস্যা হলে কী করব?", qEn: "📞 What if I face issues registering?",
    aBn: "আমাদের ২৪/৭ সাপোর্ট টিম সবসময় আপনার জন্য প্রস্তুত। ফোন, ইমেইল বা হোয়াটসঅ্যাপে যোগাযোগ করতে পারেন।",
    aEn: "Our 24/7 support team is always ready to help. Contact us by phone, email, or WhatsApp." },
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
    num: "১", numEn: "1", icon: "📝",
    titleBn: "বিনামূল্যে রেজিস্টার করুন",
    titleEn: "Register for Free",
    descBn: "আপনার অ্যাকাউন্ট খুলুন। সাথে সাথেই সব কোর্স ও টুলস খুলে যাবে!",
    descEn: "Create your account. All courses and tools unlock immediately!",
    highlightBn: "⏱ ৩০ সেকেন্ড",
    highlightEn: "⏱ 30 Seconds",
  },
  {
    num: "২", numEn: "2", icon: "📢",
    titleBn: "লিংক শেয়ার করুন",
    titleEn: "Share Your Link",
    descBn: "আপনার লিংক ফেসবুক ও হোয়াটসঅ্যাপে শেয়ার করুন। কোনো অভিজ্ঞতা লাগে না — সবকিছু রেডিমেড দেওয়া আছে!",
    descEn: "Share your link on Facebook & WhatsApp. No experience needed — everything is ready-made!",
    highlightBn: "🎯 শুরু করুন আজই",
    highlightEn: "🎯 Start Today",
  },
  {
    num: "৩", numEn: "3", icon: "💰",
    titleBn: "টাকা তুলুন",
    titleEn: "Withdraw Money",
    descBn: "আপনার লিংকে যতজন যুক্ত হবে, তত আয় সরাসরি বিকাশ/নগদে চলে আসবে!",
    descEn: "The more people join through your link, the more you earn directly to bKash/Nagad!",
    highlightBn: "🟢 সরাসরি পেমেন্ট",
    highlightEn: "🟢 Direct Payment",
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
export const heroSectionBadgeEn = "💰 Learn directly and earn 11,000 to 92,000 BDT from your first month!";

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
