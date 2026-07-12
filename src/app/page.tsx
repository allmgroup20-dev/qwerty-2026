"use client";

import HeroSection from "@/components/home/HeroSection";
import PriceAnchor from "@/components/home/PriceAnchor";
import FeaturesSection from "@/components/home/FeaturesSection";
import HowItWorks from "@/components/home/HowItWorks";
import CourseCatalog from "@/components/home/CourseCatalog";
import TrainersSection from "@/components/home/TrainersSection";
import Testimonials from "@/components/home/Testimonials";
import FAQSection from "@/components/home/FAQSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PriceAnchor />
      <FeaturesSection />
      <HowItWorks />
      <CourseCatalog />
      <TrainersSection />
      <Testimonials />
      <FAQSection />
    </>
  );
}
