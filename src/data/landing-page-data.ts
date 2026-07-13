export interface Testimonial {
  stars: string;
  rating: string;
  quote: string;
  author: string;
  label: string;
  platform?: string;
  image?: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface Trainer {
  name: string;
  specialty: string;
  credential: string;
  courses: string[];
  image?: string;
}

export interface CourseCategory {
  id: string;
  icon: string;
  title: string;
  institutions: string[];
  trainers: string[];
  courses: { name: string; price?: string }[];
}

export interface GalleryImage {
  src: string;
  alt: string;
  label: string;
  amount?: string;
}

export interface SalaryRow {
  name: string;
  amount: number;
  status: string;
  success: boolean;
}

export interface StatItem {
  num?: string;
  label?: string;
  chip?: string;
  separator?: boolean;
}

export const siteName = "Jobayer Group Career";

export const heroData = {
  headlineBn: "ঘরে বসে ইনকাম শুরু করুন — কোনো অভিজ্ঞতা লাগবে না!",
  headlineEn: "Start Earning from Home — No Experience Needed!",
  subheadBn: "৮৬৬+ শিক্ষার্থী ইতিমধ্যেই আয় শুরু করেছেন। দেশের সেরা ১২ জন প্রশিক্ষকের ২৩০টির বেশি কোর্স — আজীবনের জন্য। পছন্দ না হলে ২৪ ঘণ্টায় টাকা ফেরত।",
  subheadEn: "866+ students already earning. 230+ courses from Bangladesh's top 12 trainers — lifetime access. 24h money-back guarantee.",
  badges: [
    { icon: "🎯", text: "রিয়েল মার্কেট প্রজেক্ট" },
    { icon: "📚", text: "২৩০+ কোর্স" },
    { icon: "👨‍🏫", text: "১২ জন বিশেষজ্ঞ" },
    { icon: "💼", text: "জব প্লেসমেন্ট" },
  ],
  problemBn: "অনলাইনে আয় করতে চান কিন্তু বুঝতে পারছেন না কোথা থেকে শুরু করবেন? বেশিরভাগ কোর্স শুধু থিওরি দেয় — রিয়েল মার্কেটের জন্য তৈরি করে না।",
  problemEn: "Want to earn online but don't know where to start? Most courses teach theory — not real market skills.",
  solutionBn: "জোবায়ের গ্রুপ ক্যারিয়ার আপনাকে দেয় রিয়েল মার্কেট প্রজেক্ট, সরাসরি ক্লায়েন্ট এক্সপোজার, এবং কাজ শেখার পর ইন্টার্নশিপের সুযোগ — সব একসাথে।",
  solutionEn: "Jobayer Group Career gives you real market projects, direct client exposure, and internship opportunities — all in one place.",
  ctaBn: "🚀 আপনার অ্যাকাউন্ট খুলুন এখনই →",
  ctaEn: "🚀 Create Your Account Now →",
  ctaHref: "/register",
};

export const stats: StatItem[] = [
  { num: "৮৬৬+", label: "সক্রিয় শিক্ষার্থী" },
  { separator: true },
  { num: "৪.৯★", label: "ফেসবুক মূল্যায়ন" },
  { separator: true },
  { num: "৮+ বছর", label: "পেশাদার অভিজ্ঞতা" },
  { separator: true },
  { num: "৫০,০০০+", label: "সর্বোচ্চ মাসিক আয়" },
  { separator: true },
  { chip: "⚡ সাথে সাথে অ্যাক্সেস" },
  { separator: true },
  { chip: "📚 লাইফটাইম আপডেট" },
  { separator: true },
  { chip: "✅ ২৪ ঘণ্টা ফেরত" },
];

export const howItWorksSteps = [
  {
    num: "১", icon: "📝",
    title: "বিনামূল্যে রেজিস্টার করুন",
    desc: "আপনার অ্যাকাউন্ট খুলুন। সাথে সাথেই সব কোর্স ও টুলস খুলে যাবে!",
    highlight: "⏱ ৩০ সেকেন্ড",
  },
  {
    num: "২", icon: "📢",
    title: "লিংক শেয়ার করুন",
    desc: "আপনার লিংক ফেসবুক ও হোয়াটসঅ্যাপে শেয়ার করুন। কোনো অভিজ্ঞতা লাগে না — সবকিছু রেডিমেড দেওয়া আছে!",
    highlight: "🎯 শুরু করুন আজই",
  },
  {
    num: "৩", icon: "💰",
    title: "টাকা তুলুন",
    desc: "আপনার লিংকে যতজন যুক্ত হবে, তত আয় সরাসরি বিকাশ/নগদে চলে আসবে!",
    highlight: "🟢 সরাসরি পেমেন্ট",
  },
];

export const courseCategories: CourseCategory[] = [
  {
    id: "affiliate-marketing",
    icon: "📢",
    title: "অ্যাফিলিয়েট মার্কেটিং",
    institutions: ["Jobayer Group Academy", "Digital Marketing Institute"],
    trainers: ["জোবায়ের আহমেদ", "রাফি হাসান"],
    courses: [
      { name: "অ্যাফিলিয়েট মার্কেটিং মাস্টারক্লাস", price: "৫,০০০ টাকা" },
      { name: "ফেসবুক অ্যাফিলিয়েট কোর্স", price: "৩,৫০০ টাকা" },
      { name: "ই-কমার্স অ্যাফিলিয়েট স্ট্র্যাটেজি", price: "৪,২০০ টাকা" },
    ],
  },
  {
    id: "digital-marketing",
    icon: "📱",
    title: "ডিজিটাল মার্কেটিং",
    institutions: ["Jobayer Group Academy", "BD Digital Pro"],
    trainers: ["সাকিব আল হাসান", "নাদিয়া ইসলাম"],
    courses: [
      { name: "ফেসবুক & ইনস্টাগ্রাম মার্কেটিং", price: "৪,৫০০ টাকা" },
      { name: "গুগল অ্যাডস মাস্টারি", price: "৫,৫০০ টাকা" },
      { name: "SEO & কন্টেন্ট মার্কেটিং", price: "৩,৮০০ টাকা" },
      { name: "ইমেইল মার্কেটিং স্ট্র্যাটেজি", price: "২,৯০০ টাকা" },
    ],
  },
  {
    id: "ecommerce",
    icon: "🛒",
    title: "ই-কমার্স",
    institutions: ["Jobayer Group Academy", "Ecom Success BD"],
    trainers: ["আমিনুল ইসলাম", "ফারিহা তাবাসসুম"],
    courses: [
      { name: "শপিফাই স্টোর তৈরি ও মার্কেটিং", price: "৪,৮০০ টাকা" },
      { name: "ড্রপশিপিং মাস্টারি", price: "৫,২০০ টাকা" },
      { name: "ওয়াকমার্স স্টোর ডেভেলপমেন্ট", price: "৩,৫০০ টাকা" },
      { name: "ফেসবুক শপ সেটআপ", price: "২,৫০০ টাকা" },
    ],
  },
  {
    id: "graphics-design",
    icon: "🎨",
    title: "গ্রাফিক্স ডিজাইন",
    institutions: ["Design Studio BD", "Jobayer Group Academy"],
    trainers: ["তানভীর আহমেদ", "সাজিয়া ইসলাম"],
    courses: [
      { name: "ফটোশপ মাস্টারক্লাস", price: "৩,২০০ টাকা" },
      { name: "ইলাস্ট্রেটর প্রো কোর্স", price: "৩,৫০০ টাকা" },
      { name: "ক্যানভা ডিজাইন গাইড", price: "১,৮০০ টাকা" },
    ],
  },
  {
    id: "web-development",
    icon: "💻",
    title: "ওয়েব ডেভেলপমেন্ট",
    institutions: ["CodeLab BD", "Jobayer Group Academy"],
    trainers: ["হাসান মাহমুদ", "নাজমুল হাসান"],
    courses: [
      { name: "ওয়েব ডিজাইন বেসিক", price: "৩,০০০ টাকা" },
      { name: "ফুল স্ট্যাক ওয়েব ডেভেলপমেন্ট", price: "১২,০০০ টাকা" },
      { name: "ওয়ার্ডপ্রেস থিম ডেভেলপমেন্ট", price: "৪,৫০০ টাকা" },
    ],
  },
  {
    id: "freelancing",
    icon: "🌍",
    title: "ফ্রিল্যান্সিং",
    institutions: ["Jobayer Group Academy", "Freelancer Hub BD"],
    trainers: ["রাশেদুল ইসলাম", "তানিয়া সুলতানা"],
    courses: [
      { name: "ফাইভার ফ্রিল্যান্সিং মাস্টারি", price: "৪,০০০ টাকা" },
      { name: "আপওয়ার্ক প্রোফাইল অপটিমাইজেশন", price: "৩,২০০ টাকা" },
      { name: "লিংকডইন ফ্রিল্যান্সিং গাইড", price: "২,৫০০ টাকা" },
    ],
  },
  {
    id: "video-editing",
    icon: "🎬",
    title: "ভিডিও এডিটিং",
    institutions: ["Creative Studio BD", "Jobayer Group Academy"],
    trainers: ["কামরুল হাসান", "ঈশিতা রহমান"],
    courses: [
      { name: "প্রিমিয়ার প্রো বেসিক টু অ্যাডভান্সড", price: "৪,৩০০ টাকা" },
      { name: "ক্যাপকাট মোবাইল এডিটিং", price: "১,৫০০ টাকা" },
      { name: "ইউটিউব কন্টেন্ট ক্রিয়েশন", price: "৩,৮০০ টাকা" },
    ],
  },
  {
    id: "content-writing",
    icon: "✍️",
    title: "কন্টেন্ট রাইটিং",
    institutions: ["Content Studio BD", "Jobayer Group Academy"],
    trainers: ["শারমিন আক্তার", "ইমরান হোসেন"],
    courses: [
      { name: "প্রফেশনাল কন্টেন্ট রাইটিং", price: "২,৮০০ টাকা" },
      { name: "কপিরাইটিং মাস্টারি", price: "৩,২০০ টাকা" },
      { name: "ব্লগিং ও এসইও রাইটিং", price: "২,৫০০ টাকা" },
    ],
  },
  {
    id: "virtual-assistant",
    icon: "🤝",
    title: "ভার্চুয়াল অ্যাসিস্ট্যান্ট",
    institutions: ["VATrain BD", "Jobayer Group Academy"],
    trainers: ["নুসরাত জাহান", "রবিউল ইসলাম"],
    courses: [
      { name: "ভার্চুয়াল অ্যাসিস্ট্যান্ট ট্রেনিং", price: "৩,০০০ টাকা" },
      { name: "এডমিন সাপোর্ট কোর্স", price: "২,২০০ টাকা" },
    ],
  },
  {
    id: "spoken-english",
    icon: "🗣️",
    title: "স্পোকেন ইংলিশ",
    institutions: ["English Pro BD", "Jobayer Group Academy"],
    trainers: ["মিসেস রেবেকা সুলতানা", "জনি হাসান"],
    courses: [
      { name: "স্পোকেন ইংলিশ ফর ফ্রিল্যান্সিং", price: "২,৫০০ টাকা" },
      { name: "ইংলিশ কমিউনিকেশন মাস্টারি", price: "৩,৫০০ টাকা" },
      { name: "আইইএলটিএস প্রিপারেশন", price: "৫,০০০ টাকা" },
    ],
  },
];

export const trainers: Trainer[] = [
  { name: "জোবায়ের আহমেদ", specialty: "অ্যাফিলিয়েট মার্কেটিং", credential: "৮+ বছর অভিজ্ঞতা, ৫০০০+ শিক্ষার্থী", courses: ["অ্যাফিলিয়েট মার্কেটিং মাস্টারক্লাস", "ই-কমার্স অ্যাফিলিয়েট স্ট্র্যাটেজি"] },
  { name: "সাকিব আল হাসান", specialty: "ডিজিটাল মার্কেটিং", credential: "গুগল সার্টিফাইড, ৬+ বছর", courses: ["ফেসবুক & ইনস্টাগ্রাম মার্কেটিং", "গুগল অ্যাডস মাস্টারি"] },
  { name: "আমিনুল ইসলাম", specialty: "ই-কমার্স", credential: "শপিফাই এক্সপার্ট, ৫+ বছর", courses: ["শপিফাই স্টোর তৈরি ও মার্কেটিং", "ড্রপশিপিং মাস্টারি"] },
  { name: "তানভীর আহমেদ", specialty: "গ্রাফিক্স ডিজাইন", credential: "প্রিমিয়ার ডিজাইনার, ৭+ বছর", courses: ["ফটোশপ মাস্টারক্লাস", "ইলাস্ট্রেটর প্রো কোর্স"] },
  { name: "হাসান মাহমুদ", specialty: "ওয়েব ডেভেলপমেন্ট", credential: "সিনিয়র ডেভেলপার, ৮+ বছর", courses: ["ফুল স্ট্যাক ওয়েব ডেভেলপমেন্ট", "ওয়ার্ডপ্রেস থিম ডেভেলপমেন্ট"] },
  { name: "রাশেদুল ইসলাম", specialty: "ফ্রিল্যান্সিং", credential: "ফাইভার টপ-রেটেড, ৬+ বছর", courses: ["ফাইভার ফ্রিল্যান্সিং মাস্টারি", "আপওয়ার্ক প্রোফাইল অপটিমাইজেশন"] },
  { name: "কামরুল হাসান", specialty: "ভিডিও এডিটিং", credential: "প্রিমিয়ার প্রো এক্সপার্ট, ৫+ বছর", courses: ["প্রিমিয়ার প্রো বেসিক টু অ্যাডভান্সড", "ইউটিউব কন্টেন্ট ক্রিয়েশন"] },
  { name: "শারমিন আক্তার", specialty: "কন্টেন্ট রাইটিং", credential: "প্রকাশিত লেখক, ৪+ বছর", courses: ["প্রফেশনাল কন্টেন্ট রাইটিং", "কপিরাইটিং মাস্টারি"] },
  { name: "নুসরাত জাহান", specialty: "ভার্চুয়াল অ্যাসিস্ট্যান্ট", credential: "ভিএ ট্রেইনার, ৪+ বছর", courses: ["ভার্চুয়াল অ্যাসিস্ট্যান্ট ট্রেনিং"] },
  { name: "রাফি হাসান", specialty: "অ্যাফিলিয়েট মার্কেটিং", credential: "৫+ বছর কোর্স সম্পন্ন", courses: ["অ্যাফিলিয়েট মার্কেটিং মাস্টারক্লাস", "ফেসবুক অ্যাফিলিয়েট কোর্স"] },
  { name: "নাদিয়া ইসলাম", specialty: "ডিজিটাল মার্কেটিং", credential: "ডিজিটাল মার্কেটিং স্পেশালিস্ট", courses: ["SEO & কন্টেন্ট মার্কেটিং", "ইমেইল মার্কেটিং স্ট্র্যাটেজি"] },
  { name: "ফারিহা তাবাসসুম", specialty: "ই-কমার্স", credential: "ই-কমার্স কনসালট্যান্ট, ৫+ বছর", courses: ["ওয়াকমার্স স্টোর ডেভেলপমেন্ট", "ফেসবুক শপ সেটআপ"] },
];

export const testimonials: Testimonial[] = [
  { stars: "★★★★★", rating: "5.0/5", quote: "জোবায়ের গ্রুপের নির্দেশিকা আর সহায়তার কারণে আজ আমি নিজের ল্যাপটপ থেকে মাসে ২৫,০০০+ টাকা ইনকাম করছি।", author: "মিতা ইসলাম", label: "ফ্রিল্যান্সার, সিলেট" },
  { stars: "★★★★★", rating: "4.9/5", quote: "এই কোর্সটা আমাকে রিয়েল মার্কেটের জন্য প্রস্তুত করেছে। এখন নিয়মিত ক্লায়েন্ট পাচ্ছি। সবার কাছে রেকমেন্ড করব!", author: "নীলা হোসেন", label: "ডিজিটাল মার্কেটার, ঢাকা" },
  { stars: "★★★★★", rating: "5.0/5", quote: "৭ মাসে এখন মাসিক আয় ৪০,০০০+। সবচেয়ে বড় কথা, একটা সহায়ক কমিউনিটি পেয়েছি।", author: "রাফসান জামান", label: "ই-কমার্স আর্নার, চট্টগ্রাম" },
  { stars: "★★★★★", rating: "4.9/5", quote: "শুধু কোর্স না — রিয়েল প্রজেক্ট ও জব সাপোর্ট পেয়েছি। যারা সিরিয়াস তাদের জন্য এটি পারফেক্ট!", author: "আতিকুর রহমান", label: "ওয়েব ডেভেলপার, রাজশাহী" },
  { stars: "★★★★★", rating: "5.0/5", quote: "ফাইভারে এখন মাসে ৩০,০০০+ টাকা আয় করছি। জোবায়ের গ্রুপের ফ্রিল্যান্সিং কোর্স আমার জীবন বদলে দিয়েছে।", author: "শারমিন জাহান", label: "ফাইভার ফ্রিল্যান্সার, খুলনা" },
  { stars: "★★★★★", rating: "4.8/5", quote: "একদম শূন্য থেকে শুরু করেছি। আজ ১৫,০০০+ মাসিক আয়। ধন্যবাদ জোবায়ের গ্রুপ টিমকে।", author: "রেজাউল করিম", label: "ডিজিটাল মার্কেটার, বগুড়া" },
  { stars: "★★★★★", rating: "5.0/5", quote: "যতগুলো কোর্স করেছি, জোবায়ের গ্রুপের কোর্স সবচেয়ে প্রাক্টিক্যাল। সরাসরি মার্কেটে কাজে লাগাতে পেরেছি।", author: "সানজিদা করিম", label: "গ্রাফিক্স ডিজাইনার, কুমিল্লা" },
];

export const faqs: FaqItem[] = [
  { q: "💵 বিনামূল্যে রেজিস্টার করে কি সত্যিই অনলাইনে আয় করা সম্ভব?", a: "হ্যাঁ, সম্ভব। আমাদের ৮৬৬+ শিক্ষার্থী প্রমাণ করে সঠিক গাইড পেলে যে কেউ আয় করতে পারেন। মাসে ৫০,০০০+ টাকা আয় করা সম্ভব।" },
  { q: "🛡️ এটি কি কোনো স্ক্যাম বা ফেক প্রোগ্রাম?", a: "একেবারেই না। জোবায়ের গ্রুপ ৮+ বছর ধরে কাজ করছে। আমরা ২৪ ঘণ্টায় টাকা ফেরত দিই — কোনো প্রতারক কোম্পানি টাকা ফেরত দেয় না।" },
  { q: "📱 আমার কোনো পূর্ব অভিজ্ঞতা নেই — তবু কি পারব?", a: "অবশ্যই। আপনার শুধু দরকার একটি স্মার্টফোন বা ল্যাপটপ আর শেখার ইচ্ছা। বাকি সব — আমরা দিচ্ছি।" },
  { q: "💰 কত তাড়াতাড়ি আমি প্রথম পেমেন্ট পাব?", a: "বেশিরভাগ শিক্ষার্থী প্রথম মাসেই ১,১০০ - ৫,০০০+ টাকা আয় শুরু করেন। মাসে ৫০,০০০+ টাকা আয় করতে ৩-৬ মাস লাগতে পারে।" },
  { q: "🔄 কি মাসিক ফি দিতে হবে? নাকি একবারই দিলেই হবে?", a: "একবার রেজিস্টার করলেই আজীবন অ্যাক্সেস! কোনো মাসিক ফি নেই, কোনো লুকানো চার্জ নেই।" },
  { q: "📥 রেজিস্টার করার পর কীভাবে কোর্স অ্যাক্সেস পাব?", a: "রেজিস্টার করার ১ মিনিটের মধ্যে আপনার ইমেইলে ও হোয়াটসঅ্যাপে গুগল ড্রাইভ লিংক চলে যাবে।" },
  { q: "🎓 আমি কি একসাথে সব কোর্স করতে পারব?", a: "হ্যাঁ, আপনি যেকোনো সময় যেকোনো কোর্স শুরু করতে পারেন। সব কোর্স আপনার জন্য উন্মুক্ত থাকবে আজীবনের জন্য।" },
  { q: "📞 রেজিস্টার করতে সমস্যা হলে কী করব?", a: "আমাদের ২৪/৭ সাপোর্ট টিম সবসময় আপনার জন্য প্রস্তুত। ফোন, ইমেইল বা হোয়াটসঅ্যাপে যোগাযোগ করতে পারেন।" },
];

export const galleryImages: GalleryImage[] = [
  { src: "/images/payment-1.jpg", alt: "bKash payment", label: "বিকাশ পেমেন্ট", amount: "১,২০০ টাকা" },
  { src: "/images/payment-2.jpg", alt: "Nagad payment", label: "নগদ পেমেন্ট", amount: "২,৫০০ টাকা" },
  { src: "/images/payment-3.jpg", alt: "Bank transfer", label: "ব্যাংক ট্রান্সফার", amount: "৫,০০০ টাকা" },
  { src: "/images/payment-4.jpg", alt: "Rocket payment", label: "রকেট পেমেন্ট", amount: "৮০০ টাকা" },
  { src: "/images/payment-5.jpg", alt: "Upwork payment", label: "আপওয়ার্ক পেমেন্ট", amount: "$১৫০" },
  { src: "/images/payment-6.jpg", alt: "Fiverr payment", label: "ফাইভার পেমেন্ট", amount: "$২০০" },
  { src: "/images/payment-7.jpg", alt: "Freelancer payment", label: "ফ্রিল্যান্সার পেমেন্ট", amount: "$১৮০" },
  { src: "/images/payment-8.jpg", alt: "bKash large payment", label: "বিকাশ বড় পেমেন্ট", amount: "১৫,০০০ টাকা" },
  { src: "/images/payment-9.jpg", alt: "Nagad large payment", label: "নগদ বড় পেমেন্ট", amount: "১২,০০০ টাকা" },
  { src: "/images/payment-10.jpg", alt: "Bank salary", label: "ব্যাংক বেতন", amount: "২৫,০০০ টাকা" },
];

export const trustBadges = [
  { icon: "🔒", text: "SSL সুরক্ষিত" },
  { icon: "✅", text: "২৪ ঘণ্টা টাকা ফেরত" },
  { icon: "⚡", text: "সাথে সাথে এক্সেস" },
  { icon: "📞", text: "২৪/৭ সাপোর্ট" },
];

export const salaryNames = [
  "Ayan Rahman","সুমন দাস","Maria Gomes","Ratan Marma","উদয় বড়ুয়া",
  "Nusrat Jahan","অনিক পাল","Rakib Hasan","Bimal Tripura","তানিয়া সুলতানা",
  "Sabbir Hossain","Mithila Roy","Farhan Ahmed","Riya Chakma","Tanvir Islam",
  "Lima Das","Omar Faruk","Puja Rani","Hasan Mahmud","Nabila Noor",
];
