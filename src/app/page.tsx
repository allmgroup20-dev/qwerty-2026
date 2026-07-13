"use client";

import LiveNotificationBar from "@/components/home/LiveNotificationBar";
import HeroSection from "@/components/home/HeroSection";
import StatsCounter from "@/components/home/StatsCounter";
import ProblemSection from "@/components/home/ProblemSection";
import PriceAnchorSection from "@/components/home/PriceAnchorSection";
import HowItWorks from "@/components/home/HowItWorks";
import PlatformShowcase from "@/components/home/PlatformShowcase";
import CourseCatalog from "@/components/home/CourseCatalog";
import GoogleDrivePreview from "@/components/home/GoogleDrivePreview";
import SalaryTable from "@/components/home/SalaryTable";
import PaymentGallery from "@/components/home/PaymentGallery";
import Testimonials from "@/components/home/Testimonials";
import FAQSection from "@/components/home/FAQSection";
import CheckoutCta from "@/components/home/CheckoutCta";
import TrustSection from "@/components/home/TrustSection";

export default function HomePage() {
  return (
    <div className="bg-bg">
      <LiveNotificationBar />
      <HeroSection />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6 pb-8 md:pb-12 -mt-8 relative z-20">
        <StatsCounter />
        <PriceAnchorSection />
        <ProblemSection />
        <HowItWorks />
        <PlatformShowcase />
        <CourseCatalog />
        <GoogleDrivePreview />
        <SalaryTable />
        <PaymentGallery />
        <Testimonials />
        <FAQSection />
        <CheckoutCta />
        <TrustSection />
      </div>
    </div>
  );
}
