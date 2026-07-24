export interface GalleryImage {
  src: string;
  alt: string;
}

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
  { src: "/images/payments/payment-11.jpg", alt: "Student payment proof" },
  { src: "/images/payments/payment-12.jpg", alt: "Student payment proof" },
];

export const paymentGalleryText = {
  badgeBn: "💰 আয়ের প্রমাণ",
  badgeEn: "💰 Proof of Earnings",
  titleBn: "শিক্ষার্থীদের আয়ের বাস্তব চিত্র",
  titleEn: "Real Earnings of Our Students",
  descBn: "নিয়মিত পেমেন্ট পাচ্ছেন আমাদের শিক্ষার্থীরা",
  descEn: "Our students receive payments regularly",
};
