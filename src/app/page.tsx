"use client";

import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import HowItWorks from "@/components/home/HowItWorks";
import CourseCatalog from "@/components/home/CourseCatalog";
import Testimonials from "@/components/home/Testimonials";
import FAQSection from "@/components/home/FAQSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <HowItWorks />
      <CourseCatalog />
      <Testimonials />
      <FAQSection />
    </>
  );
}
