"use client";

import HeroSection from "@/components/home/HeroSection";
import StatsCounter from "@/components/home/StatsCounter";
import HowItWorks from "@/components/home/HowItWorks";
import PriceAnchor from "@/components/home/PriceAnchor";
import CourseCatalog from "@/components/home/CourseCatalog";
import SalaryTable from "@/components/home/SalaryTable";
import Testimonials from "@/components/home/Testimonials";
import FAQSection from "@/components/home/FAQSection";
import FinalCtaSection from "@/components/home/FinalCtaSection";
import LiveNotificationBar from "@/components/home/LiveNotificationBar";

export default function HomePage() {
  return (
    <>
      <HeroSection />

      <div className="section-container">
        <div className="section-spacing">
          <StatsCounter />
        </div>

        <div className="section-spacing">
          <HowItWorks />
        </div>

        <div className="section-spacing">
          <PriceAnchor />
        </div>

        <div className="section-spacing">
          <CourseCatalog />
        </div>

        <div className="section-spacing">
          <SalaryTable />
        </div>

        <div className="section-spacing">
          <Testimonials />
        </div>

        <div className="section-spacing">
          <FAQSection />
        </div>

        <div className="section-spacing">
          <FinalCtaSection />
        </div>
      </div>

      <LiveNotificationBar />
    </>
  );
}
