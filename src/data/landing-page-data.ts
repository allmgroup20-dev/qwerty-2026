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
      { nameBn: "কমপ্লিট অ্যাফিলিয়েট মার্কেটিং", nameEn: "Complete Affiliate Marketing" },
      { nameBn: "অ্যামাজন অ্যাফিলিয়েট উইথ ইউটিউব", nameEn: "Amazon Affiliate With YouTube" },
      { nameBn: "অ্যালিএক্সপ্রেস অ্যাফিলিয়েট", nameEn: "AliExpress Affiliate" },
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
      { nameBn: "এসইও ফর বিগিনার্স", nameEn: "SEO For Beginners" },
      { nameBn: "ফেসবুক অ্যাডস মাস্টারি", nameEn: "Facebook Ads Mastery" },
      { nameBn: "গুগল অ্যানালিটিক্স ৪", nameEn: "Google Analytics 4" },
      { nameBn: "ইউটিউব মার্কেটিং", nameEn: "YouTube Marketing" },
      { nameBn: "লিঙ্কডইন মার্কেটিং", nameEn: "LinkedIn Marketing" },
      { nameBn: "ইনস্টাগ্রাম মার্কেটিং মাস্টারক্লাস", nameEn: "Instagram Marketing Masterclass" },
      { nameBn: "সিপিএ মার্কেটিং", nameEn: "CPA Marketing" },
      { nameBn: "ফেসবুক পিক্সেল ও কনভার্সন API", nameEn: "Facebook Pixel & Conversion API" },
      { nameBn: "ডিজিটাল মার্কেটিং অল-ইন-ওয়ান", nameEn: "Digital Marketing All-In-One" },
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
      { nameBn: "ই-কমার্স স্টার্টআপ", nameEn: "E-Commerce Startup" },
      { nameBn: "শপিফাই ড্রপশিপিং", nameEn: "Shopify Dropshipping" },
      { nameBn: "শপিফাই থিম ডেভেলপমেন্ট", nameEn: "Shopify Theme Development" },
      { nameBn: "সোর্সিং এজেন্ট বিজনেস", nameEn: "Sourcing Agent Business" },
      { nameBn: "এক্সপোর্ট ফ্রম বাংলাদেশ", nameEn: "Export From Bangladesh" },
      { nameBn: "মার্চ বাই অ্যামাজন", nameEn: "Merch By Amazon" },
      { nameBn: "গুগল শপিং অ্যাডস", nameEn: "Google Shopping Ads" },
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
      { nameBn: "মোশন গ্রাফিক্স ইন আফটার ইফেক্টস", nameEn: "Motion Graphics In After Effects" },
      { nameBn: "লোগো ডিজাইন করে ফ্রিল্যান্সিং", nameEn: "Logo Design Freelancing" },
      { nameBn: "টি-শার্ট ডিজাইন মাস্টারক্লাস", nameEn: "T-Shirt Design Masterclass" },
      { nameBn: "ফ্লায়ার ডিজাইন মাস্টারক্লাস", nameEn: "Flyer Design Masterclass" },
      { nameBn: "ভিডিও এডিটিং উইথ প্রিমিয়ার প্রো", nameEn: "Video Editing With Premiere Pro" },
      { nameBn: "মোবাইল ফটোগ্রাফি", nameEn: "Mobile Photography" },
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
      { nameBn: "MERN স্ট্যাক ওয়েব ডেভেলপমেন্ট", nameEn: "MERN Stack Web Development" },
      { nameBn: "অ্যান্ড্রয়েড অ্যাপ ডেভেলপমেন্ট", nameEn: "Android App Development" },
      { nameBn: "পিএইচপি ও মাইএসকিউএল", nameEn: "PHP & MySQL" },
      { nameBn: "ডার্ট অ্যান্ড ফ্লাটার", nameEn: "Dart And Flutter" },
      { nameBn: "C প্রোগ্রাম", nameEn: "C Program" },
      { nameBn: "ASP.NET", nameEn: "ASP.NET" },
      { nameBn: "গেম ডেভেলপমেন্ট", nameEn: "Game Development" },
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
      { nameBn: "ফাইভার মার্কেটপ্লেস A-Z", nameEn: "Fiverr Marketplace A-Z" },
      { nameBn: "ভার্চুয়াল অ্যাসিস্ট্যান্ট", nameEn: "Virtual Assistant" },
      { nameBn: "ডাটা এন্ট্রি ফ্রিল্যান্সিং", nameEn: "Data Entry Freelancing" },
      { nameBn: "ইংলিশ ফর ফ্রিল্যান্সিং", nameEn: "English For Freelancing" },
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
      { nameBn: "মোশন গ্রাফিক্স 2D ও 3D", nameEn: "Motion Graphics 2D & 3D" },
      { nameBn: "বাংলা টাইপোগ্রাফি অ্যান্ড ক্যালিগ্রাফি", nameEn: "Bangla Typography & Calligraphy" },
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
      { nameBn: "আর্টিকেল রাইটিং", nameEn: "Article Writing" },
      { nameBn: "প্রোডাক্ট ডিসক্রিপশন রাইটিং", nameEn: "Product Description Writing" },
      { nameBn: "সিভি রাইটিং", nameEn: "CV Writing" },
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
      { nameBn: "স্পোকেন ইংলিশ ফর কিডস", nameEn: "Spoken English For Kids" },
      { nameBn: "ইংলিশ ফর পেশাদার", nameEn: "English For Professional" },
      { nameBn: "ইংলিশ গ্রামার ১০১", nameEn: "English Grammar 101" },
      { nameBn: "অ্যাডভান্স ইংলিশ স্পিকিং", nameEn: "Advanced English Speaking" },
      { nameBn: "ভোকাবুলারি ফর অল", nameEn: "Vocabulary For All" },
      { nameBn: "কম্পিউটার বেসিক কোর্স", nameEn: "Computer Basic Course" },
      { nameBn: "মাইক্রোসফট এক্সেল", nameEn: "Microsoft Excel" },
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
      { nameBn: "পাইথন বেসিক", nameEn: "Python Basic" },
      { nameBn: "ইথিক্যাল হ্যাকিং", nameEn: "Ethical Hacking" },
      { nameBn: "সার্টিফাইড এথিক্যাল হ্যাকিং", nameEn: "Certified Ethical Hacking" },
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
  { icon: "🎯+", textBn: "২৩০+ প্রিমিয়াম কোর্স (উপহার)", textEn: "230+ Premium Courses (Gift)" },
  { icon: "📊", textBn: "লাইভ ইনকাম প্রুফ", textEn: "Live Income Proof" },
  { icon: "💳", textBn: "রিয়েল পেমেন্ট প্রুফ", textEn: "Real Payment Proof" },
  { icon: "🔄", textBn: "২৪ ঘন্টা মানি ব্যাক গ্যারান্টি", textEn: "24h Money Back Guarantee" },
];

export const phpSliderTestimonials: Testimonial[] = [
  { stars: "★★★★★", rating: "5.0/5", quoteBn: "\"প্রথমে আমার সন্দেহ ছিল, কিন্তু যোগ দেওয়ার পর প্রথম মাসেই ৪৫,০০০ টাকা আয় করেছি। ট্রেইনাররা অসাধারণ!\"", quoteEn: "\"I was skeptical at first, but after joining I earned ৳45,000 in my first month. The trainers are amazing!\"", authorBn: "রাকিব এইচ", authorEn: "Rakib H.", labelBn: "ফ্রিল্যান্সার, ঢাকা", labelEn: "Freelancer, Dhaka" },
  { stars: "★★★★★", rating: "5.0/5", quoteBn: "\"২৩০+ কোর্স মাত্র ৯৯ টাকায় দারুণ ব্যাপার। কোর্সের মান চমৎকার। সবার জন্য রেকমেন্ডেড!\"", quoteEn: "\"230+ courses for only ৳99 is a steal. The course quality is top-notch. Highly recommend!\"", authorBn: "ফাতিমা কে", authorEn: "Fatima K.", labelBn: "শিক্ষার্থী, চট্টগ্রাম", labelEn: "Student, Chattogram" },
  { stars: "★★★★★", rating: "4.9/5", quoteBn: "\"ক্লায়েন্ট ফাইন্ডিং গাইড একাই দামের ১০ গুণ মূল্যবান। আমি ৩ দিনের মধ্যেই প্রথম প্রজেক্ট পেয়ে গিয়েছি!\"", quoteEn: "\"The client-finding guide alone is worth 10x the price. I landed my first project in 3 days!\"", authorBn: "শাহিন এ", authorEn: "Shahin A.", labelBn: "ওয়েব ডেভেলপার, সিলেট", labelEn: "Web Developer, Sylhet" },
  { stars: "★★★★★", rating: "5.0/5", quoteBn: "\"আগে কিছুই আয় করতাম না। এখন ফ্রিল্যান্সিং থেকে মাসে ২৫,০০০+ টাকা আয় করি। জোবায়ের গ্রুপকে ধন্যবাদ!\"", quoteEn: "\"I was earning nothing before. Now I make ৳25,000+ monthly from freelancing. Thank you Jobayer Group!\"", authorBn: "নুসরাত জে", authorEn: "Nusrat J.", labelBn: "ভার্চুয়াল অ্যাসিস্ট্যান্ট, রাজশাহী", labelEn: "Virtual Assistant, Rajshahi" },
  { stars: "★★★★★", rating: "4.9/5", quoteBn: "\"শুধু ইংরেজি কোর্সগুলিই ৯৯ টাকার চেয়ে অনেক বেশি মূল্যবান। মাত্র ২ সপ্তাহে আমার স্পিকিং স্কিল নাটকীয়ভাবে উন্নত হয়েছে।\"", quoteEn: "\"The English courses alone are worth ৳99. I improved my speaking skills dramatically in just 2 weeks.\"", authorBn: "আরিফ এম", authorEn: "Arif M.", labelBn: "চাকরিপ্রার্থী, খুলনা", labelEn: "Job Seeker, Khulna" },
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
    { name: "Upwork", icon: "U" },
    { name: "Fiverr", icon: "F" },
    { name: "Shopify", icon: "S" },
    { name: "WordPress", icon: "W" },
    { name: "Amazon", icon: "A" },
    { name: "YouTube", icon: "Y" },
    { name: "Freelancer", icon: "Fr" },
    { name: "Figma", icon: "Fi" },
  ],
};
