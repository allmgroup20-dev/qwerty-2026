"use client";

import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import HowItWorks from "@/components/home/HowItWorks";
import StatsCounter from "@/components/home/StatsCounter";
import PriceAnchor from "@/components/home/PriceAnchor";
import CourseCatalog from "@/components/home/CourseCatalog";
import SalaryTable from "@/components/home/SalaryTable";
import PaymentGallery from "@/components/home/PaymentGallery";
import GoogleDrivePreview from "@/components/home/GoogleDrivePreview";
import FAQSection from "@/components/home/FAQSection";
import Testimonials from "@/components/home/Testimonials";
import AppInstallSection from "@/components/home/AppInstallSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PriceAnchor />
      <FeaturesSection />
      <StatsCounter />
      <HowItWorks />
      <CourseCatalog />
      <SalaryTable />
      <PaymentGallery />
      <GoogleDrivePreview />
      <Testimonials />
      <FAQSection />
      <AppInstallSection />
    </>
  );
}
