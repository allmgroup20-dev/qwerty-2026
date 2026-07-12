"use client";

import { useState } from "react";
import Link from "next/link";

const tabs = [
  { id: "overview", label: "🎓 জ্ঞান" },
  { id: "institutions", label: "🏛️ প্রতিষ্ঠানসমূহ" },
  { id: "trainers", label: "👨‍🏫 প্রশিক্ষকবৃন্দ" },
  { id: "freelancing", label: "💼 ফ্রিল্যান্সিং" },
  { id: "ecommerce", label: "🌍 ই-কমার্স" },
  { id: "development", label: "👨‍💻 ডেভেলপমেন্ট" },
  { id: "language", label: "📚 ভাষা ও চাকরি" },
  { id: "design", label: "🎨 UI/UX ও মাল্টিমিডিয়া" },
  { id: "tools", label: "🛠️ সফটওয়্যার টুলস" },
  { id: "notes", label: "🔐 নোটস" },
];

const institutions = [
  "📘 টেন মিনিট স্কুল (10MS)",
  "📗 ঘুড়ি লার্নিং (Ghoori Learning)",
  "📙 স্কিল আপ (Skill Up)",
  "📕 ইশিখন (eShikhon.com)",
  "📊 মায়াজাল (Mayajal)",
  "🖥️ MSB Academy (মাসুক সরকারের MSB)",
  "⚙️ ক্রিয়েটিভ আইটি (Creative IT)",
  "🧩 প্রব্লেম কেআই (Problem KI)",
  "📖 রেপটো (REPTO)",
];

const trainers = [
  "👑 আয়মান সাদিক (Ayman Sadiq)",
  "🎯 মুনজারিন শহীদ (Munzarin Shahid)",
  "💻 ঝংকার মাহবুব — Jhankar Mahbub",
  "🚀 খালিদ ফারহান (Khalid Farhan)",
  "🎨 সাদমান সাদিক — Sadman Sadik",
  "🌍 ফ্রিল্যান্সার নাসিম — Freelancer Nasim",
  "🎤 তাহসান খান — Tahsan Khan",
  "📱 জুবায়ের হোসাইন — Jubayer Hossain",
  "📊 আবতাহি ইপ্তেসাম — Abtahi Iptesam",
  "🕌 মাহাদে হাসান — Mahade Hasan",
  "💼 ভৈভব সিসিনিটি — Vaibhav Sisinity",
  "🔍 সোবান তারিক — Soban Tariq",
];

const freelancing = [
  "ঘরে বসে ফ্রিল্যান্সিং — Freelancing From Home",
  "ডাটা এন্ট্রি ফ্রিল্যান্সিং — Data Entry Freelancing",
  "ফেসবুক মার্কেটিং — Facebook Marketing",
  "গ্রাফিক্স ডিজাইন — Graphics Design",
  "ডিজিটাল মার্কেটিং — Digital Marketing",
  "এসইও ফর বিগিনার্স — SEO For Beginners",
  "এসইও বেসিক — SEO Basic",
  "আইটি বাড়ি SEO পার্ট ১ ও ২ — IT Bari SEO",
  "গুগল অ্যাডস মাস্টারি — Google Ads Mastery",
  "ফেসবুক অ্যাডস মাস্টারি — Facebook Ads Mastery",
  "ফেসবুক পিক্সেল ও কনভার্সন API — Facebook Pixel & API",
  "গুগল অ্যানালিটিক্স ৪ — Google Analytics 4",
  "গুগল ট্যাগ ম্যানেজার ফর শপিফাই — GTM For Shopify",
  "ওয়েব অ্যানালিটিক্স মাস্টারি — Web Analytics Mastery",
  "অ্যাডভান্সড গুগল ট্যাগ ম্যানেজার — Advanced GTM",
  "GA4 সার্ভার-সাইড ট্র্যাকিং — GA4 Server Side",
  "গুগল অ্যাডস ম্যানেজমেন্ট — Google Ads Management",
  "গুগল অ্যানালিটিক্স ফর ই-কমার্স — GA For E-Commerce",
  "গুগল শপিং অ্যাডস — Google Shopping Ads",
  "ফেসবুক অ্যাডস ফানেল — Facebook Ads Funnel",
  "অ্যাডভান্স ইউটিউব বুস্টিং — Advanced YouTube Boosting",
  "লিঙ্কডইন মার্কেটিং — LinkedIn Marketing",
  "ইনস্টাগ্রাম মার্কেটিং — Instagram Marketing",
  "ইনস্টাগ্রাম মার্কেটিং মাস্টারক্লাস — Instagram Masterclass",
  "সিপিএ মার্কেটিং — CPA Marketing",
  "ডিজিটাল মার্কেটিং অল-ইন-ওয়ান — Digital Marketing All-In-One",
  "বেসিক ডিজিটাল মার্কেটিং — Basic Digital Marketing",
  "ফেসবুক কনটেন্ট ডিজাইন — Facebook Content Design",
  "ইউটিউব মার্কেটিং — YouTube Marketing",
  "রয় ডিজিটাল মার্কেটিং — RoY Digital Marketing",
  "ওয়েবকোডার আইটি ডিজিটাল মার্কেটিং — Webcoder IT Digital Marketing",
];

const ecommerce = [
  "ই-কমার্স স্টার্টআপ — E-Commerce Startup",
  "ই-কমার্স স্টার্টআপ ২ — E-Commerce Startup 2",
  "শপিফাই ড্রপশিপিং — Shopify Dropshipping",
  "শপিফাই থিম ডেভেলপমেন্ট — Shopify Theme Development",
  "অ্যাফিলিয়েট মার্কেটিং ফর বিগিনার্স — Affiliate Marketing For Beginners",
  "কমপ্লিট অ্যাফিলিয়েট মার্কেটিং — Complete Affiliate Marketing",
  "সোর্সিং এজেন্ট বিজনেস — Sourcing Agent Business",
  "এক্সপোর্ট ফ্রম বাংলাদেশ — Export From Bangladesh",
  "মার্চ বাই অ্যামাজন — Merch By Amazon",
  "অ্যামাজন অ্যাফিলিয়েট উইথ ইউটিউব — Amazon Affiliate With YouTube",
  "অ্যালিএক্সপ্রেস অ্যাফিলিয়েট — AliExpress Affiliate",
  "ফাইভার মাস্টারক্লাস — Fiverr Masterclass",
  "ফাইভার মার্কেটপ্লেস A-Z — Fiverr Marketplace A-Z",
  "ফাইভার অ্যাকাউন্ট সাকসেস — Fiverr Account Success",
  "ভার্চুয়াল অ্যাসিস্ট্যান্ট — Virtual Assistant",
  "কমপ্লিট গুগল অ্যাডসেন্স — Complete Google AdSense",
  "কনটেন্ট রাইটিং — Content Writing",
  "আর্টিকেল রাইটিং — Article Writing",
  "প্রোডাক্ট ডিসক্রিপশন রাইটিং — Product Description Writing",
  "ওয়েব কনটেন্ট ক্রিয়েশন — Web Content Creation",
  "সিভি রাইটিং — CV Writing",
  "চাকরি জীবনের প্রস্তুতি — Career Preparation",
  "প্রথম ৯০ দিনের প্ল্যান — First 90 Days Plan",
  "কমুনিকেশন মাস্টারক্লাস — Communication Masterclass",
  "পেশা গাইডেন্স — Career Guidance",
  "ইংলিশ ফর ফ্রিল্যান্সিং — English For Freelancing",
  "ক্রিয়েটিভ কনটেন্ট ডিজাইন টেকনিকস — Creative Content Design",
  "ই-বিজনেস আইডিয়া — E-Business Idea",
  "২৪ ঘণ্টায় কোরআন শিক্ষা — Quran Learning in 24 Hours",
  "কোরআন লার্নিং — Quran Learning",
  "সহজে স্পোকেন আরবি — Spoken Arabic Easily",
  "সুন্দর ও দ্রুত বাংলা হাতের লেখা — Bangla Handwriting",
  "দ্রুত ইংরেজি হাতের লেখা — Fast English Handwriting",
  "রোবোটিক্স ফর বিগিনার্স — Robotics For Beginners",
  "পার্সোনাল ফিটনেস — Personal Fitness",
  "সেলফ ডিফেন্স — Self Defense",
  "বেসিক কার মেইনটেন্যান্স — Basic Car Maintenance",
  "পেশাদার ব্লক প্রিন্ট ডিজাইন — Professional Block Print Design",
  "ম্যাজিক অফ মিউচুয়াল ফান্ডস — Magic Of Mutual Funds",
  "Nutrition And Good Health",
  "ইথিক্যাল হ্যাকিং — Ethical Hacking",
  "সার্টিফাইড এথিক্যাল হ্যাকিং — Certified Ethical Hacking",
  "সাইবার ৭১ — Cyber 71",
  "রুট ফোন — Root Phone",
  "গুগল ড্রাইভ আনলিমিটেড স্টোরেজ — Google Drive Unlimited",
  "ব্ল্যাকহ্যাট মানি মেকিং — Blackhat Money Making",
  "ভিডিওস্ক্রাইব সফটওয়্যার — VideoScribe Software",
  "গ্রাফিক স্কুল — Graphic School",
  "আইটি ফার্ম বিডি ক্লাস — IT Firm BD Class",
];

const development = [
  "ওয়েব ডিজাইন — Web Design",
  "ওয়ার্ডপ্রেস — WordPress",
  "ফুল স্ট্যাক ওয়েব ডেভেলপমেন্ট — Full Stack Web Development",
  "MERN স্ট্যাক ওয়েব ডেভেলপমেন্ট — MERN Stack",
  "অ্যাপ ডেভেলপমেন্ট — App Development",
  "অ্যান্ড্রয়েড অ্যাপ ডেভেলপমেন্ট — Android App Development",
  "জাভা — Java",
  "পাইথন বেসিক — Python Basic",
  "সি প্রোগ্রাম — C Program",
  "পিএইচপি ও মাইএসকিউএল — PHP & MySQL",
  "ডার্ট অ্যান্ড ফ্লাটার — Dart And Flutter",
  "কমপ্লিট জাভা কোর্স — Complete Java Course",
  "অ্যান্ড্রয়েড বাই কটলিন — Android By Kotlin",
  "জিরো টু হিরো ইন অ্যান্ড্রয়েড — Zero To Hero In Android",
  "ডেভেলপ পেশাদার ওয়েবসাইট — Professional Websites",
  "বেসিক ওয়ার্ডপ্রেস — Basic WordPress",
  "ওয়ার্ডপ্রেস থিম ডেভেলপমেন্ট — WordPress Theme Development",
  "ওয়ার্ডপ্রেস থিম কাস্টমাইজেশন — WordPress Theme Customization",
  "ওয়েব থিম ডেভেলপমেন্ট — Web Theme Development",
  "ASP.NET",
  "ফুল স্ট্যাক শপ — Full Stack Shop",
  "গেম ডেভেলপমেন্ট — Game Development",
  "গেম ডেভেলপমেন্ট উইদাউট কোডিং — Game Dev Without Coding",
];

const language = [
  "আইইএলটিএস — IELTS",
  "স্পোকেন ইংলিশ — Spoken English",
  "বিসিএস প্রিলিমিনারি — BCS Preliminary",
  "ইংলিশ গ্রামার ক্র্যাশ কোর্স — English Grammar Crash Course",
  "সরকারি চাকরি প্রস্তুতি — Government Job Preparation",
  "প্রাথমিক সহকারী শিক্ষক নিয়োগ — Primary Assistant Teacher",
  "ব্যাংক জবস ফুল কোর্স — Bank Jobs Full Course",
  "স্পোকেন ইংলিশ ফর কিডস — Spoken English For Kids",
  "ইংলিশ ফর পেশাদার — English For Professional",
  "ইংলিশ রাইটিং ফর শিক্ষার্থী — English Writing For Student",
  "ইংলিশ ফর ডেইলি লাইফ — English For Daily Life",
  "ইংলিশ গ্রামার ১০১ — English Grammar 101",
  "ইংলিশ গ্রামার ১০২ — English Grammar 102",
  "আইইএলটিএস জেনারেল — IELTS General Preparation",
  "অ্যাডভান্স ইংলিশ স্পিকিং — Advanced English Speaking",
  "ভোকাবুলারি ফর অল — Vocabulary For All",
  "স্টাডি স্মার্ট — Study Smart",
  "মাইক্রোসফট অফিস ফুল কোর্স — MS Office Full Course",
  "মাইক্রোসফট এক্সেল — Microsoft Excel",
  "মাইক্রোসফট ওয়ার্ড — Microsoft Word",
  "মাইক্রোসফট পাওয়ারপয়েন্ট — Microsoft PowerPoint",
  "কম্পিউটার বেসিক কোর্স — Computer Basic Course",
  "ই-শিখন এক্সেল কোর্স — E-Shikhon Excel Course",
  "অ্যাডভান্স এক্সেল — Advanced Excel",
  "এইচএসসি ইংলিশ কোর্স — HSC English Course",
  "এইচএসসি টেস্ট পেপার সলভ — HSC Test Paper Solve",
  "এইচএসসি শেষ মুহূর্তের প্রস্তুতি — HSC Last Minute",
  "এইচএসসি শর্ট সিলেবাস — HSC Short Syllabus",
  "এসএসসি প্রস্তুতি কোর্স — SSC Preparation",
];

const design = [
  "বেসিক UI/UX ডিজাইন — Basic UI/UX Design",
  "লার্ন UI/UX ফ্রম স্ক্র্যাচ — Learn UI/UX From Scratch",
  "UI/UX ডিজাইন (Interactive Care)",
  "মোশন গ্রাফিক্স ইন আফটার ইফেক্টস — Motion Graphics In AE",
  "ক্রিয়েটিভ আইটি মোশন গ্রাফিক্স — Creative IT Motion Graphics",
  "মোশন গ্রাফিক্স 2D ও 3D — Motion Graphics 2D & 3D",
  "২ডি/৩ডি মোশন — 2D/3D Motion",
  "কার্টুন অ্যানিমেশন — Cartoon Animation",
  "থ্রিডি অ্যানিমেশন বেসিক — 3D Animation Basic",
  "অ্যাডোবি ইলাস্ট্রেটর — Adobe Illustrator",
  "গ্রাফিক ডিজাইনিং উইথ ফটোশপ — Graphic Designing With Photoshop",
  "অ্যাডোবি এক্সডি এসেনশিয়াল — Adobe XD Essential",
  "লোগো ডিজাইন করে ফ্রিল্যান্সিং — Logo Design Freelancing",
  "টি-শার্ট ডিজাইন করে ফ্রিল্যান্সিং — T-Shirt Design Freelancing",
  "টি-শার্ট ডিজাইন মাস্টারক্লাস — T-Shirt Design Masterclass",
  "ফ্লায়ার ডিজাইন মাস্টারক্লাস — Flyer Design Masterclass",
  "বিজনেস কার্ড ও ব্যানার ডিজাইন — Business Card & Banner Design",
  "গ্রাফিক্স ডিজাইন আপডেট টিউটোরিয়াল — Graphics Design Update",
  "জিরো টু হিরো ইন ফটোশপ — Zero To Hero In Photoshop",
  "গ্রাফিক্স ডিজাইন উইথ পাওয়ারপয়েন্ট — Graphics Design With PowerPoint",
  "অটোক্যাড কোর্স — AutoCAD Course",
  "বাংলা টাইপোগ্রাফি অ্যান্ড ক্যালিগ্রাফি — Bangla Typography & Calligraphy",
  "ভিডিও এডিটিং উইথ প্রিমিয়ার প্রো — Video Editing With Premiere Pro",
  "মোবাইল দিয়ে গ্রাফিক ডিজাইন — Graphic Design Using Mobile",
  "ফটো এডিটিং উইথ স্মার্টফোন — Photo Editing With Smartphone",
  "মোবাইল ফটোগ্রাফি — Mobile Photography",
  "ওয়েডিং ফটোগ্রাফি — Wedding Photography",
  "ফুড ফটোগ্রাফি — Food Photography",
];

const tools = [
  "মাইক্রোসফট অফিস — Microsoft Office",
  "মাইক্রোসফট এক্সেল — Microsoft Excel",
  "মাইক্রোসফট ওয়ার্ড — Microsoft Word",
  "ফেসবুক অ্যাডস — Facebook Ads",
  "ইউটিউব — YouTube",
  "ফাইভার — Fiverr",
  "আপওয়ার্ক — Upwork",
  "ওয়ার্ডপ্রেস — WordPress",
  "অ্যাডোবি ফটোশপ — Adobe Photoshop",
  "অ্যাডোবি ইলাস্ট্রেটর — Adobe Illustrator",
  "মাইক্রোসফট পাওয়ারপয়েন্ট — Microsoft PowerPoint",
  "গুগল অ্যাডস — Google Ads",
  "পাইথন — Python",
  "জাভা — Java",
  "পিএইচপি — PHP",
  "মাইএসকিউএল — MySQL",
  "শপিফাই — Shopify",
  "ইনস্টাগ্রাম — Instagram",
  "ফ্রিল্যান্সার ডটকম — Freelancer.com",
  "গুগল অ্যানালিটিক্স — Google Analytics",
  "GA4 — Google Analytics 4",
  "গুগল ট্যাগ ম্যানেজার — Google Tag Manager",
  "ফেসবুক পিক্সেল — Facebook Pixel",
  "কনভার্সন API — Conversion API",
  "নোড.জেএস — Node.js",
  "এক্সপ্রেস.জেএস — Express.js",
  "মঙ্গোডিবি — MongoDB",
  "ফ্লাটার — Flutter",
  "ডার্ট — Dart",
  "কটলিন — Kotlin",
  "ASP.NET",
  "অ্যাডোবি প্রিমিয়ার প্রো — Adobe Premiere Pro",
  "অ্যাডোবি আফটার ইফেক্টস — Adobe After Effects",
  "অ্যাডোবি XD — Adobe XD",
  "গুগল অ্যাডসেন্স — Google AdSense",
  "অ্যামাজন — Amazon",
  "অ্যালিএক্সপ্রেস — AliExpress",
  "গুগল শপিং অ্যাডস — Google Shopping Ads",
  "মার্চেন্ট সেন্টার — Merchant Center",
  "পিপল পার আওয়ার — PeoplePerHour",
  "গুরু — Guru",
  "অটোক্যাড — AutoCAD",
  "অটোডেস্ক — Autodesk",
  "মকআপ টুলস — Mockup Tools",
  "ভিডিওস্ক্রাইব — VideoScribe",
  "টার্মাক্স — Termux",
  "ওয়েবিডো — Webydo",
];

export default function CourseCatalog() {
  const [activeTab, setActiveTab] = useState(0);
  const [showAll, setShowAll] = useState(false);

  const tabContent = (items: string[]) => (
    <div className="grid gap-2">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white border border-[#E2E8F0]">
          <span className="text-[11px] font-bold text-[#1E293B] leading-tight">{item}</span>
        </div>
      ))}
    </div>
  );

  const renderTab = () => {
    switch (activeTab) {
      case 0: return (
        <div>
          <p className="text-sm font-semibold text-[#64748B] mb-3">নিচের প্রতিটি বিষয়ের ওপর ক্লিক করলেই বিস্তারিত দেখতে পাবেন</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { icon: "💼", title: "ফ্রিল্যান্সিং ও অনলাইন আর্নিং", desc: "ঘরে বসেই বিশ্বের যেকোনো প্রান্ত থেকে ফ্রিল্যান্সিং ও ডিজিটাল মার্কেটিং করে আয় করার পূর্ণাঙ্গ গাইড" },
              { icon: "💻", title: "প্রোগ্রামিং ও আইটি ডেভেলপমেন্ট", desc: "ওয়েবসাইট, মোবাইল অ্যাপ ও সফটওয়্যার তৈরির কোর্স — কোডিং শিখে পেশা গড়ুন" },
              { icon: "📢", title: "ডিজিটাল মার্কেটিং ও এসইও", desc: "ফেসবুক, গুগল, ইউটিউব ও লিংকডইনে বিজ্ঞাপন ও মার্কেটিংয়ের আধুনিক কৌশল" },
              { icon: "🌍", title: "ই-কমার্স ও অনলাইন ব্যবসা", desc: "শপিফাই, ড্রপশিপিং, অ্যামাজন ও সোশ্যাল কমার্স — অনলাইনে পণ্য বিক্রির A-Z" },
              { icon: "🎨", title: "UI/UX, মোশন গ্রাফিক্স ও থ্রিডি", desc: "ফিগমা, আফটার ইফেক্টস ও ব্লেন্ডার দিয়ে ডিজাইন ও অ্যানিমেশনের পেশাদার কোর্স" },
              { icon: "🏛️", title: "প্রতিষ্ঠানসমূহ", desc: "টেন মিনিট স্কুল, ঘুড়ি লার্নিং, ক্রিয়েটিভ আইটি সহ ৯টি শীর্ষ প্রতিষ্ঠানের কোর্স" },
              { icon: "📚", title: "ভাষা শিক্ষা ও চাকরি প্রস্তুতি", desc: "IELTS, স্পোকেন ইংলিশ, বিসিএস, ব্যাংক জবস ও সরকারি চাকরির সম্পূর্ণ প্রস্তুতি" },
              { icon: "👑", title: "শীর্ষ প্রশিক্ষকবৃন্দ", desc: "আয়মান সাদিক, ঝংকার মাহবুব, মুনজারিন শহীদ সহ ১২ জন তারকা প্রশিক্ষকের কোর্স" },
              { icon: "🛠️", title: "সফটওয়্যার টুলস", desc: "এমএস অফিস, ফাইভার, আপওয়ার্ক, ওয়ার্ডপ্রেস, ইউটিউব — সব টুলসের প্রিমিয়াম ভার্সন" },
              { icon: "🔐", title: "নোটস ও ডিজিটাল সুরক্ষা", desc: "আরিফ নোটস, কপিরাইট কোর্স ও ডিজিটাল নিরাপত্তা — শেখার পাশাপাশি সুরক্ষিত থাকুন" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col gap-1.5 p-3.5 rounded-[14px] bg-white border border-[#E2E8F0] cursor-pointer transition-all hover:border-[#2563EB] hover:shadow-md" onClick={() => setActiveTab(i + 3 >= 10 ? 9 : i + 3)}>
                <span className="text-2xl leading-none">{item.icon}</span>
                <span className="font-bold text-sm text-[#1E293B] leading-tight">{item.title}</span>
                <span className="text-[12px] text-[#64748B] leading-snug">{item.desc}</span>
              </div>
            ))}
          </div>
        </div>
      );
      case 1: return (
        <div>
          <h4 className="font-black text-base text-[#1E293B] mb-2">🏛️ প্রতিষ্ঠানসমূহ</h4>
          <p className="text-sm font-semibold text-[#64748B] mb-3">প্রধান প্রতিষ্ঠানসমূহের তালিকা</p>
          {tabContent(institutions)}
        </div>
      );
      case 2: return (
        <div>
          <h4 className="font-black text-base text-[#1E293B] mb-2">🏆 যে সকল প্রশিক্ষকবৃন্দের কোর্স আপনি পাবেন</h4>
          <p className="text-sm font-semibold text-[#64748B] mb-3">তালিকায় থাকা সকল জনপ্রিয় প্রশিক্ষকবৃন্দের কোর্স</p>
          {tabContent(trainers)}
        </div>
      );
      case 3: return (
        <div>
          <h4 className="font-black text-base text-[#1E293B] mb-2">💼 ফ্রিল্যান্সিং, ডিজিটাল মার্কেটিং, এসইও ও ডেটা</h4>
          <p className="text-sm font-semibold text-[#64748B] mb-3">তালিকায় থাকা প্রত্যেকটি কোর্স</p>
          {tabContent(freelancing)}
        </div>
      );
      case 4: return (
        <div>
          <h4 className="font-black text-base text-[#1E293B] mb-2">🌍 ই-কমার্স, ব্যবসা উদ্যোগ ও পেশাদার দক্ষতা</h4>
          <p className="text-sm font-semibold text-[#64748B] mb-3">তালিকায় থাকা প্রত্যেকটি কোর্স</p>
          {tabContent(ecommerce)}
        </div>
      );
      case 5: return (
        <div>
          <h4 className="font-black text-base text-[#1E293B] mb-2">👨‍💻 কোডিং, ওয়েব ও সফটওয়্যার ডেভেলপমেন্ট</h4>
          <p className="text-sm font-semibold text-[#64748B] mb-3">তালিকায় থাকা প্রত্যেকটি কোর্স</p>
          {tabContent(development)}
        </div>
      );
      case 6: return (
        <div>
          <h4 className="font-black text-base text-[#1E293B] mb-2">📚 ভাষা শিক্ষা ও চাকরি প্রস্তুতি</h4>
          <p className="text-sm font-semibold text-[#64748B] mb-3">তালিকায় থাকা প্রত্যেকটি কোর্স</p>
          {tabContent(language)}
        </div>
      );
      case 7: return (
        <div>
          <h4 className="font-black text-base text-[#1E293B] mb-2">🎨 UI/UX, ভিজ্যুয়াল মাল্টিমিডিয়া ও থ্রিডি</h4>
          <p className="text-sm font-semibold text-[#64748B] mb-3">তালিকায় থাকা প্রত্যেকটি কোর্স</p>
          {tabContent(design)}
        </div>
      );
      case 8: return (
        <div>
          <h4 className="font-black text-base text-[#1E293B] mb-2">🛠️ সফটওয়্যার টুলস ও ডিজিটাল প্ল্যাটফর্ম</h4>
          <p className="text-sm font-semibold text-[#64748B] mb-3">এই সফটওয়্যার গুলোর প্রিমিয়াম ভার্সন</p>
          {tabContent(tools)}
        </div>
      );
      case 9: return (
        <div>
          <h4 className="font-black text-base text-[#1E293B] mb-2">🔐 নোটস ও সুরক্ষা</h4>
          <p className="text-sm font-semibold text-[#64748B] mb-3">শেখার পাশাপাশি প্রয়োজনীয় নিরাপত্তা বিষয়ক রিসোর্স</p>
          <div className="flex flex-wrap gap-2">
            {["📒 Arif Notes | সকল নোটস", "🔐 Copyright Content Course", "🛡️ ডিজিটাল সুরক্ষা"].map((item) => (
              <span key={item} className="px-3 py-2 rounded-full bg-white border border-[#E2E8F0] font-bold text-xs text-[#1E293B]">{item}</span>
            ))}
          </div>
        </div>
      );
    }
  };

  return (
    <section className="max-w-[1120px] mx-auto mt-6 md:mt-8 px-3.5 md:px-5" id="courses">
      <div className="rounded-[20px] p-[18px_16px_16px] md:p-[20px] bg-[linear-gradient(135deg,rgba(29,78,216,.06),rgba(29,78,216,.02))] border border-[rgba(29,78,216,.14)]">
        <h3 className="font-black text-base md:text-lg text-[#1E293B] mb-1 text-center">🎯 দেখুন — ২৩০+ কোর্সে আপনি কী পাচ্ছেন</h3>
        <p className="text-sm font-semibold text-[#64748B] mb-4 text-center">প্রতিটি বিভাগে ২০-৫০টি কোর্স — নিচে ব্রাউজ করুন!</p>

        <div className="flex gap-1.5 mb-3.5 p-1.5 rounded-[14px] bg-white border border-[#E2E8F0] overflow-x-auto scrollbar-hide">
          {tabs.map((tab, i) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(i)}
              className={`px-3 py-2 rounded-[10px] text-xs font-bold border-none whitespace-nowrap cursor-pointer transition-all font-inherit ${activeTab === i ? "bg-gradient-to-r from-[#1D4ED8] to-[#FF6B35] text-white shadow-md" : "bg-transparent text-[#64748B] hover:bg-[rgba(29,78,216,.08)]"}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="min-h-[100px]">
          {renderTab()}
        </div>

        <div className="mt-4 pt-4 border-t border-[#E2E8F0]">
          <button
            onClick={() => setShowAll(!showAll)}
            className="w-full flex items-center justify-center gap-2 p-3.5 rounded-[14px] border-2 border-dashed border-[#E2E8F0] bg-white text-[#1D4ED8] font-extrabold text-sm cursor-pointer transition-all hover:border-[#1D4ED8] hover:bg-[rgba(29,78,216,.04)]"
          >
            📂 {showAll ? "সংকুচিত করুন" : "সব প্ল্যাটফর্ম ও ট্রেইনার দেখুন (২১টি)"}
            <span className={`transition-transform duration-300 ${showAll ? "rotate-180" : ""}`}>▼</span>
          </button>
          {showAll && (
            <div className="mt-4 grid gap-4">
              <div className="rounded-[16px] p-4 bg-white border border-[#E2E8F0]">
                <h4 className="font-black text-sm text-[#1E293B] mb-3">🏛️ আমাদের প্রতিষ্ঠানসমূহ</h4>
                <p className="text-xs font-semibold text-[#64748B] mb-3">যেসব প্ল্যাটফর্ম ও প্রতিষ্ঠানের কোর্স আপনি পাচ্ছেন</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    ["https://jobayergroup.com/wp-content/uploads/2026/06/10-Minute-School.jpg", "📘 টেন মিনিট স্কুল"],
                    ["https://jobayergroup.com/wp-content/uploads/2026/06/Ghoori-Learning.jpeg", "📗 ঘুড়ি লার্নিং"],
                    ["https://jobayergroup.com/wp-content/uploads/2026/06/Skill-Up.png", "📙 স্কিল আপ"],
                    ["https://jobayergroup.com/wp-content/uploads/2026/06/eShikhon.com_.webp", "📕 ইশিখন"],
                    ["https://jobayergroup.com/wp-content/uploads/2026/06/Mayajal.jpg", "📊 মায়াজাল"],
                    ["https://jobayergroup.com/wp-content/uploads/2026/06/MSB-Academy.png", "🖥️ MSB Academy"],
                    ["https://jobayergroup.com/wp-content/uploads/2026/06/Creative-IT.jpg", "⚙️ ক্রিয়েটিভ আইটি"],
                    ["https://jobayergroup.com/wp-content/uploads/2026/06/Problem-KI.png", "🧩 প্রব্লেম কেআই"],
                    ["https://jobayergroup.com/wp-content/uploads/2026/06/REPTO.jpg", "📖 রেপটো"],
                  ].map(([src, name]) => (
                    <div key={name} className="flex flex-col items-center gap-2 p-3 rounded-[10px] bg-white border border-[#E2E8F0]">
                      <img src={src} alt={name} loading="lazy" className="w-full h-16 object-contain rounded-md" />
                      <span className="text-[11px] font-bold text-[#1E293B] text-center leading-tight">{name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[16px] p-4 bg-white border border-[#E2E8F0]">
                <h4 className="font-black text-sm text-[#1E293B] mb-3">👨‍🏫 শীর্ষ প্রশিক্ষকবৃন্দ</h4>
                <p className="text-xs font-semibold text-[#64748B] mb-3">যেসব তারকা প্রশিক্ষকের কোর্স আপনি পাচ্ছেন</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {[
                    ["https://jobayergroup.com/wp-content/uploads/2026/06/Ayman-Sadiq.jpg", "👑 আয়মান সাদিক"],
                    ["https://jobayergroup.com/wp-content/uploads/2026/06/Munzereen-Shahid.jpg", "🎯 মুনজারিন শহীদ"],
                    ["https://jobayergroup.com/wp-content/uploads/2026/06/Jhankar-Mahbub.jpg", "💻 ঝংকার মাহবুব"],
                    ["https://jobayergroup.com/wp-content/uploads/2026/06/Khalid-Farhan.jpg", "🚀 খালিদ ফারহান"],
                    ["https://jobayergroup.com/wp-content/uploads/2026/06/Sadman-Sadik.jpg", "🎨 সাদমান সাদিক"],
                    ["https://jobayergroup.com/wp-content/uploads/2026/06/Freelancer-Nasim.jpg", "🌍 ফ্রিল্যান্সার নাসিম"],
                    ["https://jobayergroup.com/wp-content/uploads/2026/06/Tahsan-Khan.jpg", "🎤 তাহসান খান"],
                    ["https://jobayergroup.com/wp-content/uploads/2026/06/Jubayer-Hossain.jpg", "📱 জুবায়ের হোসাইন"],
                    ["https://jobayergroup.com/wp-content/uploads/2026/06/Abtahi-Iptesam.jpg", "📊 আবতাহি ইপ্তেসাম"],
                    ["https://jobayergroup.com/wp-content/uploads/2026/06/Mahade-Hasan.jpg", "🕌 মাহাদে হাসান"],
                    ["https://jobayergroup.com/wp-content/uploads/2026/06/Vaibhav-Sisinity.jpg", "💼 ভৈভব সিসিনিটি"],
                    ["https://jobayergroup.com/wp-content/uploads/2026/06/Soban-Tariq.jpg", "🔍 সোবান তারিক"],
                  ].map(([src, name]) => (
                    <div key={name} className="flex flex-col items-center gap-2 p-3 rounded-[12px] bg-white border border-[#E2E8F0]">
                      <div className="w-16 h-16 rounded-full overflow-hidden bg-[#F8F9FA]">
                        <img src={src} alt={name} loading="lazy" className="w-full h-full object-cover" />
                      </div>
                      <span className="text-[11px] font-bold text-[#1E293B] text-center leading-tight">{name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="text-center mt-4">
          <Link href="/register" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-[14px] bg-gradient-to-r from-[#FF6B35] to-[#E85D2C] text-white font-black text-sm no-underline shadow-[0_12px_28px_rgba(234,88,12,.35)] hover:-translate-y-0.5 transition-all cursor-pointer">
            📚 সম্পূর্ণ ক্যাটালগ দেখুন →
          </Link>
        </div>
      </div>
    </section>
  );
}
