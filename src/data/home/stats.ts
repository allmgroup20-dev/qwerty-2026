export interface StatItem {
  num?: string;
  labelBn?: string;
  labelEn?: string;
  chipBn?: string;
  chipEn?: string;
  separator?: boolean;
}

export const stats: StatItem[] = [
  { num: "৮৬৬+", labelBn: "সক্রিয় শিক্ষার্থী", labelEn: "Active Students" },
  { separator: true },
  { num: "২৩০+", labelBn: "প্রিমিয়াম কোর্স", labelEn: "Premium Courses" },
  { separator: true },
  { num: "১২", labelBn: "এক্সপার্ট ট্রেইনার", labelEn: "Expert Trainers" },
  { separator: true },
  { num: "৳৯৯", labelBn: "শুধু আজ", labelEn: "Only Today" },
];

export const statsSectionText = {
  badgeBn: "📊 আমাদের পরিসংখ্যান",
  badgeEn: "📊 Our Statistics",
};
