import { FAQSection } from "@/components/sections/FAQSection";
import { FinalCallToAction } from "@/components/sections/FinalCallToAction";
import { HeroSection } from "@/components/sections/HeroSection";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { HumanGuidanceSection } from "@/components/sections/HumanGuidanceSection";
import { PaidServiceSection } from "@/components/sections/PaidServiceSection";
import { ProblemCards } from "@/components/sections/ProblemCards";
import { ServiceCategoryCards } from "@/components/sections/ServiceCategoryCards";
import { Testimonials } from "@/components/sections/Testimonials";
import { TrustSection } from "@/components/sections/TrustSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProblemCards />
      <ServiceCategoryCards />
      <HumanGuidanceSection />
      <PaidServiceSection />
      <HowItWorks />
      <TrustSection />
      <Testimonials />
      <FAQSection />
      <FinalCallToAction />
    </>
  );
}
