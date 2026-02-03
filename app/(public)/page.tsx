import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { CTA } from "@/components/landing/cta";
import { TemplateShowcase } from "@/components/landing/template-showcase";
import { FAQSection } from "@/components/landing/faq-section";

export default function LandingPage() {
  return (
    <>
      <Hero />
      <Features />
      <TemplateShowcase />
      <FAQSection />
      <CTA />
    </>
  );
}
