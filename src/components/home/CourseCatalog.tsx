"use client";

import { useState } from "react";

const tabs = [
  { id: 0, icon: "🎓", label: "জ্ঞান" },
  { id: 1, icon: "🏛️", label: "প্রতিষ্ঠান" },
  { id: 2, icon: "👨‍🏫", label: "প্রশিক্ষক" },
  { id: 3, icon: "💼", label: "ফ্রিল্যান্সিং" },
  { id: 4, icon: "🌍", label: "ই-কমার্স" },
  { id: 5, icon: "👨‍💻", label: "ডেভেলপমেন্ট" },
  { id: 6, icon: "📚", label: "ভাষা ও চাকরি" },
  { id: 7, icon: "🎨", label: "UI/UX" },
  { id: 8, icon: "🛠️", label: "সফটওয়্যার" },
  { id: 9, icon: "🔐", label: "নোটস" },
];

const overviewItems = [
  { tab: 3, icon: "💼", title: "ফ্রিল্যান্সিং ও অনলাইন আর্নিং", price: "৳১০,০০০", desc: "ঘরে বসেই বিশ্বের যেকোনো প্রান্ত থেকে ফ্রিল্যান্সিং ও ডিজিটাল মার্কেটিং করে আয় করার পূর্ণাঙ্গ গাইড" },
  { tab: 5, icon: "💻", title: "প্রোগ্রামিং ও আইটি ডেভেলপমেন্ট", price: "৳১৮,০০০", desc: "ওয়েবসাইট, মোবাইল অ্যাপ ও সফটওয়্যার তৈরির কোর্স — কোডিং শিখে পেশা গড়ুন" },
  { tab: 3, icon: "📢", title: "ডিজিটাল মার্কেটিং ও এসইও", price: "৳১২,৫০০", desc: "ফেসবুক, গুগল, ইউটিউব ও লিংকডইনে বিজ্ঞাপন ও মার্কেটিংয়ের আধুনিক কৌশল" },
  { tab: 4, icon: "🌍", title: "ই-কমার্স ও অনলাইন ব্যবসা", price: "৳১৪,০০০", desc: "শপিফাই, ড্রপশিপিং, অ্যামাজন ও সোশ্যাল কমার্স — অনলাইনে পণ্য বিক্রির A-Z" },
  { tab: 7, icon: "🎨", title: "UI/UX, মোশন গ্রাফিক্স ও থ্রিডি", price: "৳১৬,০০০", desc: "ফিগমা, আফটার ইফেক্টস ও ব্লেন্ডার দিয়ে ডিজাইন ও অ্যানিমেশনের পেশাদার কোর্স" },
  { tab: 1, icon: "🏛️", title: "প্রতিষ্ঠানসমূহ", price: "৳২০,০০০", desc: "টেন মিনিট স্কুল, ঘুড়ি লার্নিং, ক্রিয়েটিভ আইটি সহ ৮টি শীর্ষ প্রতিষ্ঠানের কোর্স" },
  { tab: 6, icon: "📚", title: "ভাষা শিক্ষা ও চাকরি প্রস্তুতি", price: "৳৮,৫০০", desc: "IELTS, স্পোকেন ইংলিশ, বিসিএস, ব্যাংক জবস ও সরকারি চাকরির সম্পূর্ণ প্রস্তুতি" },
  { tab: 2, icon: "👑", title: "শীর্ষ প্রশিক্ষকবৃন্দ", price: "৳২৫,০০০", desc: "আয়মান সাদিক, ঝংকার মাহবুব, মুনজারিন শহীদ সহ ১২ জন তারকা প্রশিক্ষকের কোর্স" },
  { tab: 8, icon: "🛠️", title: "সফটওয়্যার টুলস", price: "৳৬,০০০", desc: "এমএস অফিস, ফাইভার, আপওয়ার্ক, ওয়ার্ডপ্রেস, ইউটিউব — প্রিমিয়াম ভার্সন ফ্রিতে" },
  { tab: 9, icon: "🔐", title: "নোটস ও ডিজিটাল সুরক্ষা", price: "৳৩,৫০০", desc: "আরিফ নোটস, কপিরাইট কোর্স ও ডিজিটাল নিরাপত্তা — শেখার পাশাপাশি সুরক্ষিত থাকুন" },
];

const institutions = [
  { name: "📘 টেন মিনিট স্কুল (10MS)", price: "৳৮৫,০০০" },
  { name: "📗 ঘুড়ি লার্নিং (Ghoori Learning)", price: "৳৫৫,০০০" },
  { name: "📙 স্কিল আপ (Skill Up)", price: "৳৩৫,০০০" },
  { name: "📕 ইশিখন (eShikhon.com)", price: "৳৬৫,০০০" },
  { name: "📊 মায়াজাল (Mayajal)", price: "৳৪০,০০০" },
  { name: "🖥️ MSB Academy", price: "৳৭৫,০০০" },
  { name: "⚙️ ক্রিয়েটিভ আইটি (Creative IT)", price: "৳৯০,০০০" },
  { name: "🧩 প্রব্লেম কেআই (Problem KI)", price: "৳৩০,০০০" },
  { name: "📖 রেপটো (REPTO)", price: "৳১২,০০০" },
];

const trainers = [
  { name: "👑 আয়মান সাদিক", price: "৳৪৫,০০০" },
  { name: "🎯 মুনজারিন শহীদ", price: "৳২৫,০০০" },
  { name: "💻 ঝংকার মাহবুব", price: "৳৫৫,০০০" },
  { name: "🚀 খালিদ ফারহান", price: "৳৩০,০০০" },
  { name: "🎨 সাদমান সাদিক", price: "৳২০,০০০" },
  { name: "🌍 ফ্রিল্যান্সার নাসিম", price: "৳২৮,০০০" },
  { name: "🎤 তাহসান খান", price: "৳৩৫,০০০" },
  { name: "📱 জুবায়ের হোসাইন", price: "৳২৫,০০০" },
  { name: "📊 আবতাহি ইপ্তেসাম", price: "৳১৮,০০০" },
  { name: "🕌 মাহাদে হাসান", price: "৳১৫,০০০" },
  { name: "💼 ভৈভব সিসিনিটি", price: "৳৩২,০০০" },
  { name: "🔍 সোবান তারিক", price: "৳২২,০০০" },
];

const courseData: Record<number, string[]> = {
  1: institutions.map((i) => i.name),
  2: trainers.map((t) => t.name),
  3: [
    "🏠 ঘরে বসে ফ্রিল্যান্সিং", "📝 ডাটা এন্ট্রি ফ্রিল্যান্সিং", "📘 ফেসবুক মার্কেটিং", "🎨 গ্রাফিক্স ডিজাইন",
    "📢 ডিজিটাল মার্কেটিং", "🔍 এসইও ফর বিগিনার্স", "📈 এসইও বেসিক", "🏡 আইটি বাড়ি SEO পার্ট ১ ও ২",
    "🎯 গুগল অ্যাডস মাস্টারি", "📱 ফেসবুক অ্যাডস মাস্টারি", "🔧 ফেসবুক পিক্সেল ও কনভার্সন API",
    "📊 গুগল অ্যানালিটিক্স ৪", "🏷️ গুগল ট্যাগ ম্যানেজার ফর শপিফাই", "🌐 ওয়েব অ্যানালিটিক্স মাস্টারি",
    "⚙️ অ্যাডভান্সড গুগল ট্যাগ ম্যানেজার", "🖥️ GA4 সার্ভার-সাইড ট্র্যাকিং", "📋 গুগল অ্যাডস ম্যানেজমেন্ট",
    "🛒 গুগল অ্যানালিটিক্স ফর ই-কমার্স", "🛍️ গুগল শপিং অ্যাডস", "🔁 ফেসবুক অ্যাডস ফানেল",
    "📹 অ্যাডভান্স ইউটিউব বুস্টিং", "💼 লিঙ্কডইন মার্কেটিং", "📸 ইনস্টাগ্রাম মার্কেটিং",
    "🌟 ইনস্টাগ্রাম মার্কেটিং মাস্টারক্লাস", "💰 সিপিএ মার্কেটিং", "📦 ডিজিটাল মার্কেটিং অল-ইন-ওয়ান",
    "🔰 বেসিক ডিজিটাল মার্কেটিং", "🖼️ ফেসবুক কনটেন্ট ডিজাইন", "▶️ ইউটিউব মার্কেটিং",
    "🎯 রয় ডিজিটাল মার্কেটিং", "🌐 ওয়েবকোডার আইটি ডিজিটাল মার্কেটিং",
  ],
  4: [
    "🛒 ই-কমার্স স্টার্টআপ", "📦 ই-কমার্স স্টার্টআপ ২", "🚢 শপিফাই ড্রপশিপিং", "🎨 শপিফাই থিম ডেভেলপমেন্ট",
    "🔗 অ্যাফিলিয়েট মার্কেটিং ফর বিগিনার্স", "📊 কমপ্লিট অ্যাফিলিয়েট মার্কেটিং", "🔍 সোর্সিং এজেন্ট বিজনেস",
    "🌏 এক্সপোর্ট ফ্রম বাংলাদেশ", "👕 মার্চ বাই অ্যামাজন", "🎥 অ্যামাজন অ্যাফিলিয়েট উইথ ইউটিউব",
    "🏷️ অ্যালিএক্সপ্রেস অ্যাফিলিয়েট", "⭐ ফাইভার মাস্টারক্লাস", "📋 ফাইভার মার্কেটপ্লেস A-Z",
    "✅ ফাইভার অ্যাকাউন্ট সাকসেস", "👩‍💼 ভার্চুয়াল অ্যাসিস্ট্যান্ট", "📢 কমপ্লিট গুগল অ্যাডসেন্স",
    "✍️ কনটেন্ট রাইটিং", "📝 আর্টিকেল রাইটিং", "🏷️ প্রোডাক্ট ডিসক্রিপশন রাইটিং", "🌐 ওয়েব কনটেন্ট ক্রিয়েশন",
    "📄 সিভি রাইটিং", "🎯 চাকরি জীবনের প্রস্তুতি", "📅 প্রথম ৯০ দিনের প্ল্যান", "🎤 কমুনিকেশন মাস্টারক্লাস",
    "🧭 পেশা গাইডেন্স", "🗣️ ইংলিশ ফর ফ্রিল্যান্সিং", "🎬 ক্রিয়েটিভ কনটেন্ট ডিজাইন টেকনিকস",
    "💡 ই-বিজনেস আইডিয়া", "📖 ২৪ ঘণ্টায় কোরআন শিক্ষা", "🕌 কোরআন লার্নিং", "🗺️ সহজে স্পোকেন আরবি",
    "✒️ সুন্দর ও দ্রুত বাংলা হাতের লেখা", "✏️ দ্রুত ইংরেজি হাতের লেখা", "🤖 রোবোটিক্স ফর বিগিনার্স",
    "💪 পার্সোনাল ফিটনেস", "🛡️ সেলফ ডিফেন্স", "🚗 বেসিক কার মেইনটেন্যান্স", "👗 পেশাদার ব্লক প্রিন্ট ডিজাইন",
    "💰 ম্যাজিক অফ মিউচুয়াল ফান্ডস", "🥗 Nutrition And Good Health", "🔐 ইথিক্যাল হ্যাকিং",
    "🛡️ সার্টিফাইড এথিক্যাল হ্যাকিং", "🌐 সাইবার ৭১", "📱 রুট ফোন", "💾 গুগল ড্রাইভ আনলিমিটেড স্টোরেজ",
    "⚫ ব্ল্যাকহ্যাট মানি মেকিং", "🎬 ভিডিওস্ক্রাইব সফটওয়্যার", "🏫 গ্রাফিক স্কুল", "💻 আইটি ফার্ম বিডি ক্লাস",
  ],
  5: [
    "🎨 ওয়েব ডিজাইন", "🔧 ওয়ার্ডপ্রেস", "⚡ ফুল স্ট্যাক ওয়েব ডেভেলপমেন্ট", "🔄 MERN স্ট্যাক ওয়েব ডেভেলপমেন্ট",
    "📱 অ্যাপ ডেভেলপমেন্ট", "🤖 অ্যান্ড্রয়েড অ্যাপ ডেভেলপমেন্ট", "☕ জাভা", "🐍 পাইথন বেসিক",
    "💻 সি প্রোগ্রাম", "🐘 পিএইচপি ও মাইএসকিউএল", "📱 ডার্ট অ্যান্ড ফ্লাটার", "📚 কমপ্লিট জাভা কোর্স",
    "🟣 অ্যান্ড্রয়েড বাই কটলিন", "🚀 জিরো টু হিরো ইন অ্যান্ড্রয়েড", "🌐 ডেভেলপ পেশাদার ওয়েবসাইট",
    "🔰 বেসিক ওয়ার্ডপ্রেস", "🎨 ওয়ার্ডপ্রেস থিম ডেভেলপমেন্ট", "🖌️ ওয়ার্ডপ্রেস থিম কাস্টমাইজেশন",
    "🖥️ ওয়েব থিম ডেভেলপমেন্ট", "🏢 ASP.NET", "🛒 ফুল স্ট্যাক শপ", "🎮 গেম ডেভেলপমেন্ট",
    "🧩 গেম ডেভেলপমেন্ট উইদাউট কোডিং",
  ],
  6: [
    "🌍 IELTS", "🗣️ স্পোকেন ইংলিশ", "📋 বিসিএস প্রিলিমিনারি", "✍️ ইংলিশ গ্রামার ক্র্যাশ কোর্স",
    "📝 ইংলিশ গ্রামার ক্র্যাশ কোর্স", "🏛️ সরকারি চাকরি প্রস্তুতি", "👩‍🏫 প্রাথমিক সহকারী শিক্ষক নিয়োগ",
    "🏦 ব্যাংক জবস ফুল কোর্স", "🧒 স্পোকেন ইংলিশ ফর কিডস", "💼 ইংলিশ ফর পেশাদার",
    "✏️ ইংলিশ রাইটিং ফর শিক্ষার্থী", "🏠 ইংলিশ ফর ডেইলি লাইফ", "🔤 ইংলিশ গ্রামার ১০১",
    "🔠 ইংলিশ গ্রামার ১০২", "🌏 IELTS জেনারেল", "🎙️ অ্যাডভান্স ইংলিশ স্পিকিং",
    "📕 ভোকাবুলারি ফর অল", "🧠 স্টাডি স্মার্ট", "💻 মাইক্রোসফট অফিস ফুল কোর্স",
    "📊 মাইক্রোসফট এক্সেল", "📄 মাইক্রোসফট ওয়ার্ড", "📽️ মাইক্রোসফট পাওয়ারপয়েন্ট",
    "🖥️ কম্পিউটার বেসিক কোর্স", "📈 ই-শিখন এক্সেল কোর্স", "📊 অ্যাডভান্স এক্সেল",
    "📚 এইচএসসি ইংলিশ কোর্স", "📖 এইচএসসি টেস্ট পেপার সলভ", "⏳ এইচএসসি শেষ মুহূর্তের প্রস্তুতি",
    "📉 এইচএসসি শর্ট সিলেবাস", "🎯 এসএসসি প্রস্তুতি কোর্স",
  ],
  7: [
    "🎨 বেসিক UI/UX ডিজাইন", "📐 লার্ন UI/UX ফ্রম স্ক্র্যাচ", "🖌️ UI/UX ডিজাইন (Interactive Care)",
    "🎬 মোশন গ্রাফিক্স ইন আফটার ইফেক্টস", "🏫 ক্রিয়েটিভ আইটি মোশন গ্রাফিক্স",
    "🎞️ মোশন গ্রাফিক্স 2D ও 3D", "📽️ ২ডি/৩ডি মোশন", "🧸 কার্টুন অ্যানিমেশন",
    "🧊 থ্রিডি অ্যানিমেশন বেসিক", "✏️ অ্যাডোবি ইলাস্ট্রেটর", "🖼️ গ্রাফিক ডিজাইনিং উইথ ফটোশপ",
    "📱 অ্যাডোবি এক্সডি এসেনশিয়াল", "🔤 লোগো ডিজাইন করে ফ্রিল্যান্সিং", "👕 টি-শার্ট ডিজাইন করে ফ্রিল্যান্সিং",
    "🎽 টি-শার্ট ডিজাইন মাস্টারক্লাস", "📄 ফ্লায়ার ডিজাইন মাস্টারক্লাস", "💳 বিজনেস কার্ড ও ব্যানার ডিজাইন",
    "🔄 গ্রাফিক্স ডিজাইন আপডেট টিউটোরিয়াল", "🌟 জিরো টু হিরো ইন ফটোশপ",
    "📊 গ্রাফিক্স ডিজাইন উইথ পাওয়ারপয়েন্ট", "🏗️ অটোক্যাড কোর্স", "✒️ বাংলা টাইপোগ্রাফি অ্যান্ড ক্যালিগ্রাফি",
    "🎥 ভিডিও এডিটিং উইথ প্রিমিয়ার প্রো", "📱 মোবাইল দিয়ে গ্রাফিক ডিজাইন", "📸 ফটো এডিটিং উইথ স্মার্টফোন",
    "📷 মোবাইল ফটোগ্রাফি", "💒 ওয়েডিং ফটোগ্রাফি", "🍔 ফুড ফটোগ্রাফি",
  ],
  8: [
    "📁 মাইক্রোসফট অফিস", "📊 মাইক্রোসফট এক্সেল", "📄 মাইক্রোসফট ওয়ার্ড", "📘 ফেসবুক অ্যাডস",
    "▶️ ইউটিউব", "⭐ ফাইভার", "💼 আপওয়ার্ক", "🔧 ওয়ার্ডপ্রেস", "🎨 অ্যাডোবি ফটোশপ",
    "✏️ অ্যাডোবি ইলাস্ট্রেটর", "📽️ মাইক্রোসফট পাওয়ারপয়েন্ট", "🎯 গুগল অ্যাডস", "🐍 পাইথন",
    "☕ জাভা", "🐘 পিএইচপি", "🗄️ মাইএসকিউএল", "🛍️ শপিফাই", "📸 ইনস্টাগ্রাম",
    "🌐 ফ্রিল্যান্সার ডটকম", "📈 গুগল অ্যানালিটিক্স", "📊 GA4", "🏷️ গুগল ট্যাগ ম্যানেজার",
    "🔵 ফেসবুক পিক্সেল", "🔗 কনভার্সন API", "🟢 নোড.জেএস", "⚡ এক্সপ্রেস.জেএস", "🍃 মঙ্গোডিবি",
    "📱 ফ্লাটার", "🎯 ডার্ট", "🟣 কটলিন", "🏢 ASP.NET", "🎬 অ্যাডোবি প্রিমিয়ার প্রো",
    "✨ অ্যাডোবি আফটার ইফেক্টস", "📐 অ্যাডোবি XD", "📢 গুগল অ্যাডসেন্স", "📦 অ্যামাজন",
    "🏷️ অ্যালিএক্সপ্রেস", "🛒 গুগল শপিং অ্যাডস", "📋 মার্চেন্ট সেন্টার", "👥 পিপল পার আওয়ার",
    "🎓 গুরু", "🏗️ অটোক্যাড", "🏛️ অটোডেস্ক", "🖼️ মকআপ টুলস", "🎬 ভিডিওস্ক্রাইব", "📱 টার্মাক্স", "🌐 ওয়েবিডো",
  ],
  9: ["📒 আরিফ নোটস", "🔐 কপিরাইট কোর্স", "🛡️ ডিজিটাল সুরক্ষা"],
};

const platformLogos = [
  { name: "📘 টেন মিনিট স্কুল (10MS)", img: "https://jobayergroup.com/wp-content/uploads/2026/06/10-Minute-School.jpg" },
  { name: "📗 ঘুড়ি লার্নিং", img: "https://jobayergroup.com/wp-content/uploads/2026/06/Ghoori-Learning.jpeg" },
  { name: "📙 স্কিল আপ (Skill Up)", img: "https://jobayergroup.com/wp-content/uploads/2026/06/Skill-Up.png" },
  { name: "📕 ইশিখন (eShikhon.com)", img: "https://jobayergroup.com/wp-content/uploads/2026/06/eShikhon.com_.webp" },
  { name: "📊 মায়াজাল (Mayajal)", img: "https://jobayergroup.com/wp-content/uploads/2026/06/Mayajal.jpg" },
  { name: "🖥️ MSB Academy", img: "https://jobayergroup.com/wp-content/uploads/2026/06/MSB-Academy.png" },
  { name: "⚙️ ক্রিয়েটিভ আইটি (Creative IT)", img: "https://jobayergroup.com/wp-content/uploads/2026/06/Creative-IT.jpg" },
  { name: "🧩 প্রব্লেম কেআই (Problem KI)", img: "https://jobayergroup.com/wp-content/uploads/2026/06/Problem-KI.png" },
  { name: "📖 রেপটো (REPTO)", img: "https://jobayergroup.com/wp-content/uploads/2026/06/REPTO.jpg" },
];

const trainerPhotos = [
  { name: "👑 আয়মান সাদিক", img: "https://jobayergroup.com/wp-content/uploads/2026/06/Ayman-Sadiq.jpg" },
  { name: "🎯 মুনজারিন শহীদ", img: "https://jobayergroup.com/wp-content/uploads/2026/06/Munzereen-Shahid.jpg" },
  { name: "💻 ঝংকার মাহবুব", img: "https://jobayergroup.com/wp-content/uploads/2026/06/Jhankar-Mahbub.jpg" },
  { name: "🚀 খালিদ ফারহান", img: "https://jobayergroup.com/wp-content/uploads/2026/06/Khalid-Farhan.jpg" },
  { name: "🎨 সাদমান সাদিক", img: "https://jobayergroup.com/wp-content/uploads/2026/06/Sadman-Sadik.jpg" },
  { name: "🌍 ফ্রিল্যান্সার নাসিম", img: "https://jobayergroup.com/wp-content/uploads/2026/06/Freelancer-Nasim.jpg" },
  { name: "🎤 তাহসান খান", img: "https://jobayergroup.com/wp-content/uploads/2026/06/Tahsan-Khan.jpg" },
  { name: "📱 জুবায়ের হোসাইন", img: "https://jobayergroup.com/wp-content/uploads/2026/06/Jubayer-Hossain.jpg" },
  { name: "📊 আবতাহি ইপ্তেসাম", img: "https://jobayergroup.com/wp-content/uploads/2026/06/Abtahi-Iptesam.jpg" },
  { name: "🕌 মাহাদে হাসান", img: "https://jobayergroup.com/wp-content/uploads/2026/06/Mahade-Hasan.jpg" },
  { name: "💼 ভৈভব সিসিনিটি", img: "https://jobayergroup.com/wp-content/uploads/2026/06/Vaibhav-Sisinity.jpg" },
  { name: "🔍 সোবান তারিক", img: "https://jobayergroup.com/wp-content/uploads/2026/06/Soban-Tariq.jpg" },
];

export default function CourseCatalog() {
  const [tab, setTab] = useState(0);

  return (
    <section id="courses" className="scroll-mt-4">
      <div className="max-w-[1120px] mx-auto mt-6 md:mt-8 px-3.5 md:px-5">
        <div className="rounded-[20px] p-[18px_16px_16px] md:p-[20px] bg-[linear-gradient(135deg,rgba(29,78,216,.06),rgba(29,78,216,.02))] border border-[rgba(29,78,216,.14)]">
          <div className="flex w-fit gap-2 px-4 py-2.5 mx-auto mb-3.5 rounded-full bg-[rgba(29,78,216,.08)] border border-[rgba(29,78,216,.15)] font-extrabold text-sm text-[#1E3A8A]">
            🚀 ৯৯ টাকায় — ৩০ দিনে শিখে মাসে ৫০,০০০+ টাকা আয় করুন!
          </div>

          <h3 className="text-lg md:text-xl font-black text-[#1E293B] mb-2 leading-[1.4]">🎯 দেখুন — ২৩০+ কোর্সে আপনি কত টাকা বাঁচাচ্ছেন</h3>
          <p className="text-sm md:text-base font-semibold text-[#64748B] mb-3.5 leading-[1.75]">
            প্রতিটি বিভাগে ২০-৫০টি কোর্স — নিচে দেখুন আপনি কত টাকা বাঁচাচ্ছেন!
          </p>

          <div className="flex gap-1.5 mb-3.5 p-1.5 rounded-[16px] bg-white/88 border border-[#E2E8F0] shadow-[0_8px_24px_rgba(0,0,0,.06)] overflow-x-auto scrollbar-none">
            {tabs.map((t) => (
              <button key={t.id} onClick={() => setTab(t.id)} className={`border-none rounded-[12px] px-3 py-2.5 md:px-3.5 md:py-2.5 font-extrabold cursor-pointer text-xs md:text-[13px] whitespace-nowrap transition-all flex-shrink-0 font-['Hind_Siliguri'] ${tab === t.id ? "bg-gradient-to-r from-[#1D4ED8] to-[#FF6B35] text-white shadow-[0_6px_20px_rgba(29,78,216,.15)]" : "bg-transparent text-[#64748b] hover:bg-[rgba(29,78,216,.1)]"}`}>
                {t.icon} {t.label}
              </button>
            ))}
          </div>

          {tab === 0 && (
            <div className="rounded-[20px] p-[18px_16px_16px] md:p-[20px] bg-white border border-[#E2E8F0]">
              <h3 className="text-lg md:text-xl font-black text-[#1E293B] mb-2.5">🎓 এই প্যাকেজে যা যা থাকছে — এক নজরে সম্পূর্ণ সূচিপত্র</h3>
              <p className="text-sm font-semibold text-[#64748B] mb-3">নিচের প্রতিটি বিষয়ের ওপর ক্লিক করলেই বিস্তারিত দেখতে পাবেন</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 md:gap-3">
                {overviewItems.map((item) => (
                  <div key={item.title} onClick={() => setTab(item.tab)} className="rounded-[14px] p-[16px_15px] bg-white border border-[#E2E8F0] cursor-pointer touch-manipulation transition-all hover:border-[#1D4ED8] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(29,78,216,.15)] flex flex-col gap-1">
                    <span className="text-[26px] leading-none">{item.icon}</span>
                    <span className="font-bold text-sm text-[#1E293B] leading-[1.3]">{item.title} <span className="inline-block px-[3px_8px] rounded-md bg-[rgba(29,78,216,.12)] text-[#1D4ED8] text-[10.5px] font-extrabold ml-1.5 whitespace-nowrap"><s className="text-[#64748B] mr-0.5">{item.price}</s><span className="px-[1px_6px] rounded-[4px] bg-gradient-to-r from-[#1D4ED8] to-[#FF6B35] text-white text-[9px] font-extrabold ml-0.5 whitespace-nowrap">ফ্রি</span></span></span>
                    <span className="text-[12.5px] text-[#64748B] leading-[1.5]">{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 1 && (
            <div className="rounded-[20px] p-[18px_16px_16px] md:p-[20px] bg-white border border-[#E2E8F0]">
              <h3 className="text-lg md:text-xl font-black text-[#1E293B] mb-2.5">🏛️ প্রতিষ্ঠানসমূহ</h3>
              <p className="text-sm font-semibold text-[#64748B] mb-3">প্রধান প্রতিষ্ঠানসমূহের তালিকা।</p>
              <div className="grid gap-2">
                {institutions.map((inst) => (
                  <div key={inst.name} className="flex flex-col gap-0.5 p-3 rounded-[12px] bg-white border border-[#E2E8F0] shadow-[0_6px_14px_rgba(0,0,0,.2)]">
                    <span className="font-black text-sm text-[#1E293B]">{inst.name} <span className="inline-block px-[3px_8px] rounded-md bg-[rgba(29,78,216,.12)] text-[#1D4ED8] text-[10.5px] font-extrabold ml-1.5 whitespace-nowrap"><s className="text-[#64748B] mr-0.5">{inst.price}</s><span className="px-[1px_6px] rounded-[4px] bg-gradient-to-r from-[#1D4ED8] to-[#FF6B35] text-white text-[9px] font-extrabold ml-0.5 whitespace-nowrap">ফ্রি</span></span></span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 2 && (
            <div className="rounded-[20px] p-[18px_16px_16px] md:p-[20px] bg-white border border-[#E2E8F0]">
              <h3 className="text-lg md:text-xl font-black text-[#1E293B] mb-2.5">🏆 যে সকল প্রশিক্ষকবৃন্দের কোর্স আপনি ফ্রিতে পাবেন</h3>
              <p className="text-sm font-semibold text-[#64748B] mb-3">তালিকায় থাকা সকল জনপ্রিয় প্রশিক্ষকবৃন্দের কোর্স একেবারে ফ্রিতেই পাবেন</p>
              <div className="grid gap-2">
                {trainers.map((t) => (
                  <div key={t.name} className="flex flex-col gap-0.5 p-3 rounded-[12px] bg-white border border-[#E2E8F0] shadow-[0_6px_14px_rgba(0,0,0,.2)]">
                    <span className="font-black text-sm text-[#1E293B]">{t.name} <span className="inline-block px-[3px_8px] rounded-md bg-[rgba(29,78,216,.12)] text-[#1D4ED8] text-[10.5px] font-extrabold ml-1.5 whitespace-nowrap"><s className="text-[#64748B] mr-0.5">{t.price}</s><span className="px-[1px_6px] rounded-[4px] bg-gradient-to-r from-[#1D4ED8] to-[#FF6B35] text-white text-[9px] font-extrabold ml-0.5 whitespace-nowrap">ফ্রি</span></span></span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {[3, 4, 5, 6, 7, 8, 9].includes(tab) && (
            <div className="rounded-[20px] p-[18px_16px_16px] md:p-[20px] bg-white border border-[#E2E8F0]">
              <h3 className="text-lg md:text-xl font-black text-[#1E293B] mb-2.5">
                {tab === 3 && "💼 ফ্রিল্যান্সিং ও অনলাইন আর্নিং"}
                {tab === 4 && "🌍 ই-কমার্স ও ব্যবসা"}
                {tab === 5 && "👨‍💻 কোডিং ও ডেভেলপমেন্ট"}
                {tab === 6 && "📚 ভাষা শিক্ষা ও চাকরি প্রস্তুতি"}
                {tab === 7 && "🎨 UI/UX, মাল্টিমিডিয়া ও থ্রিডি"}
                {tab === 8 && "🛠️ সফটওয়্যার টুলস"}
                {tab === 9 && "🔐 নোটস ও সুরক্ষা"}
              </h3>
              <p className="text-sm font-semibold text-[#64748B] mb-3">তালিকায় থাকা প্রত্যেকটি কোর্স পাবেন একেবারে ফ্রিতে</p>
              <div className="grid gap-2">
                {(courseData[tab] || []).map((course) => (
                  <div key={course} className="p-3 rounded-[12px] bg-white border border-[#E2E8F0] shadow-[0_6px_14px_rgba(0,0,0,.2)]">
                    <span className="font-black text-sm text-[#1E293B]">{course}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6">
            <button onClick={() => setTab(0)} className="w-full flex items-center justify-center gap-2.5 p-4 rounded-[14px] border-2 border-dashed border-[#E2E8F0] bg-white text-[#1D4ED8] text-sm font-extrabold cursor-pointer transition-all hover:border-[#1D4ED8] hover:bg-[rgba(29,78,216,.04)] hover:-translate-y-0.5">
              📂 <span>সব প্ল্যাটফর্ম ও ট্রেইনার দেখুন (২১টি)</span>
              <span className="transition-transform">▼</span>
            </button>
          </div>

          <div className="pt-5">
            <div className="rounded-[20px] p-[18px_16px_16px] md:p-[20px] bg-white border border-[#E2E8F0]">
              <h3 className="text-lg md:text-xl font-black text-[#1E293B] mb-2.5">🏛️ আমাদের প্রতিষ্ঠানসমূহ</h3>
              <p className="text-sm font-semibold text-[#64748B] mb-3">যেসব প্ল্যাটফর্ম ও প্রতিষ্ঠানের কোর্স আপনি ফ্রিতে পাচ্ছেন</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {platformLogos.map((p) => (
                  <div key={p.name} className="p-3.5 rounded-[10px] bg-white border border-[#E2E8F0] flex flex-col items-center gap-2">
                    <img src={p.img} alt={p.name} loading="lazy" className="w-full h-[72px] object-contain rounded-md" />
                    <span className="text-[11px] font-bold text-[#1E293B] text-center leading-[1.2]">{p.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[20px] p-[18px_16px_16px] md:p-[20px] bg-white border border-[#E2E8F0] mt-4">
              <h3 className="text-lg md:text-xl font-black text-[#1E293B] mb-2.5">👨‍🏫 শীর্ষ প্রশিক্ষকবৃন্দ</h3>
              <p className="text-sm font-semibold text-[#64748B] mb-3">যেসব তারকা প্রশিক্ষকের কোর্স আপনি ফ্রিতে পাচ্ছেন</p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {trainerPhotos.map((t) => (
                  <div key={t.name} className="p-4 px-2.5 py-3 rounded-[12px] bg-white border border-[#E2E8F0] flex flex-col items-center text-center gap-2">
                    <div className="w-[90px] h-[90px] rounded-full overflow-hidden">
                      <img src={t.img} alt={t.name} loading="lazy" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-xs font-bold text-[#1E293B] leading-[1.2]">{t.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <a href="#" onClick={(e) => { e.preventDefault(); document.getElementById("checkout")?.scrollIntoView({ behavior: "smooth" }); }} className="inline-flex items-center gap-2 px-6 py-3.5 rounded-[14px] bg-gradient-to-r from-[#FF6B35] to-[#E85D2C] text-white font-black text-sm md:text-base no-underline shadow-[0_12px_28px_rgba(234,88,12,.35)] hover:-translate-y-0.5 transition-all cursor-pointer">
              🔥 হ্যাঁ, আমি ৯৯ টাকায় পুরো বান্ডেল নিচ্ছি ➔
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
