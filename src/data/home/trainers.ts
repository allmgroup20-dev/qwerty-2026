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

export const trainers: Trainer[] = [
  {
    name: "Ayman Sadiq", nameBn: "আয়মান সাদিক",
    specialtyBn: "ইংরেজি ও দক্ষতা উন্নয়ন", specialtyEn: "English & Skill Development",
    credentialBn: "প্রতিষ্ঠাতা, টেন মিনিট স্কুল", credentialEn: "Founder, 10 Minute School",
    coursesBn: ["ইংরেজি ভাষা কোর্স", "ক্যারিয়ার ডেভেলপমেন্ট"],
    coursesEn: ["English Language Course", "Career Development"],
    image: "/images/trainers/ayman-sadiq.jpg",
    bioBn: "দেশের শীর্ষ ইংরেজি শিক্ষক ও উদ্যোক্তা। টেন মিনিট স্কুলের প্রতিষ্ঠাতা।",
    bioEn: "Bangladesh's top English teacher and entrepreneur. Founder of 10 Minute School."
  },
  {
    name: "Munzarin Shahid", nameBn: "মুনজারিন শহীদ",
    specialtyBn: "ইংরেজি ভাষা শিক্ষা", specialtyEn: "English Language Teaching",
    credentialBn: "সিনিয়র ট্রেইনার, টেন মিনিট স্কুল", credentialEn: "Senior Trainer, 10 Minute School",
    coursesBn: ["স্পোকেন ইংলিশ কোর্স", "ইংরেজি গ্রামার কোর্স"],
    coursesEn: ["Spoken English Course", "English Grammar Course"],
    image: "/images/trainers/munzereen-shahid.jpg",
    bioBn: "ইংরেজি ভাষা শিক্ষায় দেশের জনপ্রিয় প্রশিক্ষক।",
    bioEn: "Popular English language trainer in Bangladesh."
  },
  {
    name: "Jhankar Mahbub", nameBn: "ঝংকার মাহবুব",
    specialtyBn: "প্রোগ্রামিং ও ওয়েব ডেভেলপমেন্ট", specialtyEn: "Programming & Web Development",
    credentialBn: "লেখক ও প্রোগ্রামার", credentialEn: "Author & Programmer",
    coursesBn: ["ওয়েব ডেভেলপমেন্ট কোর্স", "পাইথন প্রোগ্রামিং"],
    coursesEn: ["Web Development Course", "Python Programming"],
    image: "/images/trainers/jhankar-mahbub.jpg",
    bioBn: "প্রোগ্রামিং ভাষায় বাংলায় বইয়ের জন্য বিখ্যাত।",
    bioEn: "Famous for Bangla programming books."
  },
  {
    name: "Khalid Farhan", nameBn: "খালিদ ফারহান",
    specialtyBn: "ফ্রিল্যান্সিং ও আউটসোর্সিং", specialtyEn: "Freelancing & Outsourcing",
    credentialBn: "সিনিয়র ফ্রিল্যান্সার", credentialEn: "Senior Freelancer",
    coursesBn: ["ফ্রিল্যান্সিং মাস্টারি", "আউটসোর্সিং গাইড"],
    coursesEn: ["Freelancing Mastery", "Outsourcing Guide"],
    image: "/images/trainers/khalid-farhan.jpg",
    bioBn: "ফ্রিল্যান্সিং ও আউটসোর্সিং এ দেশের শীর্ষ প্রশিক্ষক।",
    bioEn: "Top freelancing and outsourcing trainer."
  },
  {
    name: "Sadman Sadik", nameBn: "সাদমান সাদিক",
    specialtyBn: "গ্রাফিক্স ডিজাইন ও মাল্টিমিডিয়া", specialtyEn: "Graphics Design & Multimedia",
    credentialBn: "ক্রিয়েটিভ ডিরেক্টর", credentialEn: "Creative Director",
    coursesBn: ["গ্রাফিক্স ডিজাইন কোর্স", "মাল্টিমিডিয়া কোর্স"],
    coursesEn: ["Graphics Design Course", "Multimedia Course"],
    image: "/images/trainers/sadman-sadik.jpg",
    bioBn: "গ্রাফিক্স ডিজাইন ও মাল্টিমিডিয়ায় বিশেষজ্ঞ প্রশিক্ষক।",
    bioEn: "Graphics design and multimedia expert trainer."
  },
  {
    name: "Freelancer Nasim", nameBn: "ফ্রিল্যান্সার নাসিম",
    specialtyBn: "ফ্রিল্যান্সিং ও ডিজিটাল মার্কেটিং", specialtyEn: "Freelancing & Digital Marketing",
    credentialBn: "এক্সপার্ট ফ্রিল্যান্সার", credentialEn: "Expert Freelancer",
    coursesBn: ["ফ্রিল্যান্সিং বিগিনার টু অ্যাডভান্সড", "ডিজিটাল মার্কেটিং কোর্স"],
    coursesEn: ["Freelancing Beginner to Advanced", "Digital Marketing Course"],
    image: "/images/trainers/freelancer-nasim.jpg",
    bioBn: "ফ্রিল্যান্সিং ও ডিজিটাল মার্কেটিং এ হাজারো শিক্ষার্থী তৈরি করেছেন।",
    bioEn: "Has trained thousands in freelancing and digital marketing."
  },
  {
    name: "Tahsan Khan", nameBn: "তাহসান খান",
    specialtyBn: "কন্টেন্ট ক্রিয়েশন ও ইউটিউব", specialtyEn: "Content Creation & YouTube",
    credentialBn: "টপ ক্রিয়েটর", credentialEn: "Top Creator",
    coursesBn: ["ইউটিউব কন্টেন্ট ক্রিয়েশন", "সোশ্যাল মিডিয়া মার্কেটিং"],
    coursesEn: ["YouTube Content Creation", "Social Media Marketing"],
    image: "/images/trainers/tahsan-khan.jpg",
    bioBn: "ইউটিউব ও কন্টেন্ট ক্রিয়েশনে দেশের শীর্ষ ক্রিয়েটর।",
    bioEn: "Top YouTube and content creator in Bangladesh."
  },
  {
    name: "Jubayer Hossain", nameBn: "জুবায়ের হোসাইন",
    specialtyBn: "ডিজিটাল মার্কেটিং ও এসইও", specialtyEn: "Digital Marketing & SEO",
    credentialBn: "ডিজিটাল মার্কেটিং এক্সপার্ট", credentialEn: "Digital Marketing Expert",
    coursesBn: ["ডিজিটাল মার্কেটিং কোর্স", "SEO মাস্টারি"],
    coursesEn: ["Digital Marketing Course", "SEO Mastery"],
    image: "/images/trainers/jubayer-hossain.jpg",
    bioBn: "ডিজিটাল মার্কেটিং ও এসইও বিশেষজ্ঞ।",
    bioEn: "Digital marketing and SEO expert."
  },
  {
    name: "Abtahi Iptesam", nameBn: "আবতাহি ইপ্তেসাম",
    specialtyBn: "ওয়েব ডেভেলপমেন্ট ও টেকনোলজি", specialtyEn: "Web Development & Technology",
    credentialBn: "ওয়েব ডেভেলপার", credentialEn: "Web Developer",
    coursesBn: ["ওয়েব ডেভেলপমেন্ট কোর্স", "টেকনোলজি গাইড"],
    coursesEn: ["Web Development Course", "Technology Guide"],
    image: "/images/trainers/abtahi-iptesam.jpg",
    bioBn: "ওয়েব ডেভেলপমেন্ট ও টেকনোলজি বিষয়ে জনপ্রিয় প্রশিক্ষক।",
    bioEn: "Popular trainer in web development and technology."
  },
  {
    name: "Mahade Hasan", nameBn: "মাহাদে হাসান",
    specialtyBn: "ই-কমার্স ও অনলাইন ব্যবসা", specialtyEn: "E-Commerce & Online Business",
    credentialBn: "ই-কমার্স এক্সপার্ট", credentialEn: "E-Commerce Expert",
    coursesBn: ["ই-কমার্স বিগিনার টু প্রো", "শপিফাই স্টোর সেটআপ"],
    coursesEn: ["E-Commerce Beginner to Pro", "Shopify Store Setup"],
    image: "/images/trainers/mahade-hasan.jpg",
    bioBn: "ই-কমার্স ও অনলাইন ব্যবসায় বিশেষজ্ঞ প্রশিক্ষক।",
    bioEn: "E-commerce and online business expert trainer."
  },
  {
    name: "Vaibhav Sisinity", nameBn: "ভৈভব সিসিনিটি",
    specialtyBn: "ইংরেজি ও পেশাগত উন্নয়ন", specialtyEn: "English & Professional Development",
    credentialBn: "কমিউনিকেশন এক্সপার্ট", credentialEn: "Communication Expert",
    coursesBn: ["ইংলিশ ফর প্রফেশনালস", "কমিউনিকেশন মাস্টারক্লাস"],
    coursesEn: ["English for Professionals", "Communication Masterclass"],
    image: "/images/trainers/vaibhav-sisinity.jpg",
    bioBn: "ইংরেজি যোগাযোগ ও পেশাগত উন্নয়নে আন্তর্জাতিক প্রশিক্ষক।",
    bioEn: "International trainer in English communication and professional development."
  },
  {
    name: "Soban Tariq", nameBn: "সোবান তারিক",
    specialtyBn: "ডিজিটাল মার্কেটিং ও ব্র্যান্ডিং", specialtyEn: "Digital Marketing & Branding",
    credentialBn: "ডিজিটাল মার্কেটিং বিশেষজ্ঞ", credentialEn: "Digital Marketing Specialist",
    coursesBn: ["ডিজিটাল মার্কেটিং স্ট্র্যাটেজি", "ব্র্যান্ডিং মাস্টারি"],
    coursesEn: ["Digital Marketing Strategy", "Branding Mastery"],
    image: "/images/trainers/soban-tariq.jpg",
    bioBn: "ডিজিটাল মার্কেটিং ও ব্র্যান্ডিং বিশেষজ্ঞ।",
    bioEn: "Digital marketing and branding specialist."
  },
];

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

export const trainerPhotoGrid = [
  { nameBn: "আয়মান সাদিক", nameEn: "Ayman Sadiq", specialtyBn: "ইংরেজি ও দক্ষতা উন্নয়ন", specialtyEn: "English & Skill Dev", image: "/images/trainers/ayman-sadiq.jpg" },
  { nameBn: "মুনজারিন শহীদ", nameEn: "Munzarin Shahid", specialtyBn: "ইংরেজি ভাষা শিক্ষা", specialtyEn: "English Language", image: "/images/trainers/munzereen-shahid.jpg" },
  { nameBn: "ঝংকার মাহবুব", nameEn: "Jhankar Mahbub", specialtyBn: "প্রোগ্রামিং", specialtyEn: "Programming", image: "/images/trainers/jhankar-mahbub.jpg" },
  { nameBn: "খালিদ ফারহান", nameEn: "Khalid Farhan", specialtyBn: "ফ্রিল্যান্সিং", specialtyEn: "Freelancing", image: "/images/trainers/khalid-farhan.jpg" },
  { nameBn: "সাদমান সাদিক", nameEn: "Sadman Sadik", specialtyBn: "গ্রাফিক্স ডিজাইন", specialtyEn: "Graphics Design", image: "/images/trainers/sadman-sadik.jpg" },
  { nameBn: "ফ্রিল্যান্সার নাসিম", nameEn: "Freelancer Nasim", specialtyBn: "ফ্রিল্যান্সিং", specialtyEn: "Freelancing", image: "/images/trainers/freelancer-nasim.jpg" },
  { nameBn: "তাহসান খান", nameEn: "Tahsan Khan", specialtyBn: "কন্টেন্ট ক্রিয়েশন", specialtyEn: "Content Creation", image: "/images/trainers/tahsan-khan.jpg" },
  { nameBn: "জুবায়ের হোসাইন", nameEn: "Jubayer Hossain", specialtyBn: "ডিজিটাল মার্কেটিং", specialtyEn: "Digital Marketing", image: "/images/trainers/jubayer-hossain.jpg" },
  { nameBn: "আবতাহি ইপ্তেসাম", nameEn: "Abtahi Iptesam", specialtyBn: "ওয়েব ডেভেলপমেন্ট", specialtyEn: "Web Development", image: "/images/trainers/abtahi-iptesam.jpg" },
  { nameBn: "মাহাদে হাসান", nameEn: "Mahade Hasan", specialtyBn: "ই-কমার্স", specialtyEn: "E-Commerce", image: "/images/trainers/mahade-hasan.jpg" },
  { nameBn: "ভৈভব সিসিনিটি", nameEn: "Vaibhav Sisinity", specialtyBn: "ইংরেজি ও পেশাগত", specialtyEn: "English & Professional", image: "/images/trainers/vaibhav-sisinity.jpg" },
  { nameBn: "সোবান তারিক", nameEn: "Soban Tariq", specialtyBn: "ডিজিটাল মার্কেটিং", specialtyEn: "Digital Marketing", image: "/images/trainers/soban-tariq.jpg" },
];
