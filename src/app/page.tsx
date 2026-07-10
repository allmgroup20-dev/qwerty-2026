"use client";

import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import HowItWorks from "@/components/home/HowItWorks";
import StatsCounter from "@/components/home/StatsCounter";
import Testimonials from "@/components/home/Testimonials";
import AppInstallSection from "@/components/home/AppInstallSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <StatsCounter />
      <HowItWorks />
      <Testimonials />
      <AppInstallSection />
    </>
  );
}
