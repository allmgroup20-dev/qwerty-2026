import { NextResponse } from "next/server";
import { queryFirst, execute } from "@/lib/db/queries";
import { getDB } from "@/lib/db";
import { invalidateCache } from "@/lib/cache";

const PLATFORMS = [
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

const STATIC_TRAINERS = [
  { name: "Ayman Sadiq", nameBn: "আয়মান সাদিক", specialtyEn: "English & Skill Development", specialtyBn: "ইংরেজি ও দক্ষতা উন্নয়ন", credentialEn: "Founder, 10 Minute School", credentialBn: "প্রতিষ্ঠাতা, টেন মিনিট স্কুল", image: "/images/trainers/ayman-sadiq.jpg", bioEn: "Bangladesh's top English teacher and entrepreneur. Founder of 10 Minute School.", bioBn: "দেশের শীর্ষ ইংরেজি শিক্ষক ও উদ্যোক্তা। টেন মিনিট স্কুলের প্রতিষ্ঠাতা।", coursesEn: ["English Language Course", "Career Development"], coursesBn: ["ইংরেজি ভাষা কোর্স", "ক্যারিয়ার ডেভেলপমেন্ট"], instName: "10 Minute School" },
  { name: "Munzarin Shahid", nameBn: "মুনজারিন শহীদ", specialtyEn: "English Language Teaching", specialtyBn: "ইংরেজি ভাষা শিক্ষা", credentialEn: "Senior Trainer, 10 Minute School", credentialBn: "সিনিয়র ট্রেইনার, টেন মিনিট স্কুল", image: "/images/trainers/munzereen-shahid.jpg", bioEn: "Popular English language trainer in Bangladesh.", bioBn: "ইংরেজি ভাষা শিক্ষায় দেশের জনপ্রিয় প্রশিক্ষক।", coursesEn: ["Spoken English Course", "English Grammar Course"], coursesBn: ["স্পোকেন ইংলিশ কোর্স", "ইংরেজি গ্রামার কোর্স"], instName: "10 Minute School" },
  { name: "Jhankar Mahbub", nameBn: "ঝংকার মাহবুব", specialtyEn: "Programming & Web Development", specialtyBn: "প্রোগ্রামিং ও ওয়েব ডেভেলপমেন্ট", credentialEn: "Author & Programmer", credentialBn: "লেখক ও প্রোগ্রামার", image: "/images/trainers/jhankar-mahbub.jpg", bioEn: "Famous for Bangla programming books.", bioBn: "প্রোগ্রামিং ভাষায় বাংলায় বইয়ের জন্য বিখ্যাত।", coursesEn: ["Web Development Course", "Python Programming"], coursesBn: ["ওয়েব ডেভেলপমেন্ট কোর্স", "পাইথন প্রোগ্রামিং"], instName: null },
  { name: "Khalid Farhan", nameBn: "খালিদ ফারহান", specialtyEn: "Freelancing & Outsourcing", specialtyBn: "ফ্রিল্যান্সিং ও আউটসোর্সিং", credentialEn: "Senior Freelancer", credentialBn: "সিনিয়র ফ্রিল্যান্সার", image: "/images/trainers/khalid-farhan.jpg", bioEn: "Top freelancing and outsourcing trainer.", bioBn: "ফ্রিল্যান্সিং ও আউটসোর্সিং এ দেশের শীর্ষ প্রশিক্ষক।", coursesEn: ["Freelancing Mastery", "Outsourcing Guide"], coursesBn: ["ফ্রিল্যান্সিং মাস্টারি", "আউটসোর্সিং গাইড"], instName: null },
  { name: "Sadman Sadik", nameBn: "সাদমান সাদিক", specialtyEn: "Graphics Design & Multimedia", specialtyBn: "গ্রাফিক্স ডিজাইন ও মাল্টিমিডিয়া", credentialEn: "Creative Director", credentialBn: "ক্রিয়েটিভ ডিরেক্টর", image: "/images/trainers/sadman-sadik.jpg", bioEn: "Graphics design and multimedia expert trainer.", bioBn: "গ্রাফিক্স ডিজাইন ও মাল্টিমিডিয়ায় বিশেষজ্ঞ প্রশিক্ষক।", coursesEn: ["Graphics Design Course", "Multimedia Course"], coursesBn: ["গ্রাফিক্স ডিজাইন কোর্স", "মাল্টিমিডিয়া কোর্স"], instName: null },
  { name: "Freelancer Nasim", nameBn: "ফ্রিল্যান্সার নাসিম", specialtyEn: "Freelancing & Digital Marketing", specialtyBn: "ফ্রিল্যান্সিং ও ডিজিটাল মার্কেটিং", credentialEn: "Expert Freelancer", credentialBn: "এক্সপার্ট ফ্রিল্যান্সার", image: "/images/trainers/freelancer-nasim.jpg", bioEn: "Has trained thousands in freelancing and digital marketing.", bioBn: "ফ্রিল্যান্সিং ও ডিজিটাল মার্কেটিং এ হাজারো শিক্ষার্থী তৈরি করেছেন।", coursesEn: ["Freelancing Beginner to Advanced", "Digital Marketing Course"], coursesBn: ["ফ্রিল্যান্সিং বিগিনার টু অ্যাডভান্সড", "ডিজিটাল মার্কেটিং কোর্স"], instName: null },
  { name: "Tahsan Khan", nameBn: "তাহসান খান", specialtyEn: "Content Creation & YouTube", specialtyBn: "কন্টেন্ট ক্রিয়েশন ও ইউটিউব", credentialEn: "Top Creator", credentialBn: "টপ ক্রিয়েটর", image: "/images/trainers/tahsan-khan.jpg", bioEn: "Top YouTube and content creator in Bangladesh.", bioBn: "ইউটিউব ও কন্টেন্ট ক্রিয়েশনে দেশের শীর্ষ ক্রিয়েটর।", coursesEn: ["YouTube Content Creation", "Social Media Marketing"], coursesBn: ["ইউটিউব কন্টেন্ট ক্রিয়েশন", "সোশ্যাল মিডিয়া মার্কেটিং"], instName: null },
  { name: "Jubayer Hossain", nameBn: "জুবায়ের হোসাইন", specialtyEn: "Digital Marketing & SEO", specialtyBn: "ডিজিটাল মার্কেটিং ও এসইও", credentialEn: "Digital Marketing Expert", credentialBn: "ডিজিটাল মার্কেটিং এক্সপার্ট", image: "/images/trainers/jubayer-hossain.jpg", bioEn: "Digital marketing and SEO expert.", bioBn: "ডিজিটাল মার্কেটিং ও এসইও বিশেষজ্ঞ।", coursesEn: ["Digital Marketing Course", "SEO Mastery"], coursesBn: ["ডিজিটাল মার্কেটিং কোর্স", "SEO মাস্টারি"], instName: null },
  { name: "Abtahi Iptesam", nameBn: "আবতাহি ইপ্তেসাম", specialtyEn: "Web Development & Technology", specialtyBn: "ওয়েব ডেভেলপমেন্ট ও টেকনোলজি", credentialEn: "Web Developer", credentialBn: "ওয়েব ডেভেলপার", image: "/images/trainers/abtahi-iptesam.jpg", bioEn: "Popular trainer in web development and technology.", bioBn: "ওয়েব ডেভেলপমেন্ট ও টেকনোলজি বিষয়ে জনপ্রিয় প্রশিক্ষক।", coursesEn: ["Web Development Course", "Technology Guide"], coursesBn: ["ওয়েব ডেভেলপমেন্ট কোর্স", "টেকনোলজি গাইড"], instName: null },
  { name: "Mahade Hasan", nameBn: "মাহাদে হাসান", specialtyEn: "E-Commerce & Online Business", specialtyBn: "ই-কমার্স ও অনলাইন ব্যবসা", credentialEn: "E-Commerce Expert", credentialBn: "ই-কমার্স এক্সপার্ট", image: "/images/trainers/mahade-hasan.jpg", bioEn: "E-commerce and online business expert trainer.", bioBn: "ই-কমার্স ও অনলাইন ব্যবসায় বিশেষজ্ঞ প্রশিক্ষক।", coursesEn: ["E-Commerce Beginner to Pro", "Shopify Store Setup"], coursesBn: ["ই-কমার্স বিগিনার টু প্রো", "শপিফাই স্টোর সেটআপ"], instName: null },
  { name: "Vaibhav Sisinity", nameBn: "ভৈভব সিসিনিটি", specialtyEn: "English & Professional Development", specialtyBn: "ইংরেজি ও পেশাগত উন্নয়ন", credentialEn: "Communication Expert", credentialBn: "কমিউনিকেশন এক্সপার্ট", image: "/images/trainers/vaibhav-sisinity.jpg", bioEn: "International trainer in English communication and professional development.", bioBn: "ইংরেজি যোগাযোগ ও পেশাগত উন্নয়নে আন্তর্জাতিক প্রশিক্ষক।", coursesEn: ["English for Professionals", "Communication Masterclass"], coursesBn: ["ইংলিশ ফর প্রফেশনালস", "কমিউনিকেশন মাস্টারক্লাস"], instName: null },
  { name: "Soban Tariq", nameBn: "সোবান তারিক", specialtyEn: "Digital Marketing & Branding", specialtyBn: "ডিজিটাল মার্কেটিং ও ব্র্যান্ডিং", credentialEn: "Digital Marketing Specialist", credentialBn: "ডিজিটাল মার্কেটিং বিশেষজ্ঞ", image: "/images/trainers/soban-tariq.jpg", bioEn: "Digital marketing and branding specialist.", bioBn: "ডিজিটাল মার্কেটিং ও ব্র্যান্ডিং বিশেষজ্ঞ।", coursesEn: ["Digital Marketing Strategy", "Branding Mastery"], coursesBn: ["ডিজিটাল মার্কেটিং স্ট্র্যাটেজি", "ব্র্যান্ডিং মাস্টারি"], instName: null },
];

export async function POST() {
  try {
    const db = await getDB();

    await execute(db, "DELETE FROM trainers");
    await execute(db, "DELETE FROM institutions");

    for (const p of PLATFORMS) {
      await execute(db,
        `INSERT INTO institutions (name, name_bn, logo_url, sort_order) VALUES (?, ?, ?, ?)`,
        [p.name, p.nameBn, p.logo, 0]
      );
    }

    for (const t of STATIC_TRAINERS) {
      let instId: number | null = null;
      if (t.instName) {
        const row = await queryFirst<{ id: number }>(db, "SELECT id FROM institutions WHERE name = ?", [t.instName]);
        instId = row?.id || null;
      }
      await execute(db,
        `INSERT INTO trainers (name, name_bn, specialty_en, specialty_bn, credential_en, credential_bn,
          bio_en, bio_bn, image_url, experience_years, institution_id, sort_order, courses_en, courses_bn)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [t.name, t.nameBn, t.specialtyEn, t.specialtyBn, t.credentialEn, t.credentialBn,
          t.bioEn, t.bioBn, t.image, 5, instId, 0,
          JSON.stringify(t.coursesEn), JSON.stringify(t.coursesBn)]
      );
    }

    await invalidateCache("trainers");
    await invalidateCache("institutions");

    return NextResponse.json({
      success: true,
      institutionsSeeded: PLATFORMS.length,
      trainersSeeded: STATIC_TRAINERS.length,
    });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Internal server error" }, { status: 500 });
  }
}
