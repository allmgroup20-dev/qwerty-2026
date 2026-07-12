"use client";

import HeroSection from "@/components/home/HeroSection";
import ProblemSolutionCards from "@/components/home/ProblemSolutionCards";
import StatsCounter from "@/components/home/StatsCounter";
import HowItWorks from "@/components/home/HowItWorks";
import PriceAnchor from "@/components/home/PriceAnchor";
import CourseCatalog from "@/components/home/CourseCatalog";
import GoogleDrivePreview from "@/components/home/GoogleDrivePreview";
import SalaryTable from "@/components/home/SalaryTable";
import PaymentGallery from "@/components/home/PaymentGallery";
import Testimonials from "@/components/home/Testimonials";
import FAQSection from "@/components/home/FAQSection";
import TrustSecuritySection from "@/components/home/TrustSecuritySection";
import FinalCtaSection from "@/components/home/FinalCtaSection";
import LiveNotificationBar from "@/components/home/LiveNotificationBar";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProblemSolutionCards />
      <StatsCounter />
      <HowItWorks />
      <PriceAnchor />
      <CourseCatalog />
      <GoogleDrivePreview />
      <SalaryTable />
      <PaymentGallery />
      <Testimonials />
      <FAQSection />
      <TrustSecuritySection />
      <FinalCtaSection />
      <LiveNotificationBar />
    </>
  );
}
