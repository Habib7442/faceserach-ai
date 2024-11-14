import AboutUs from "@/components/AboutUs";
import FeaturesSection from "@/components/FeaturesSection";
import Herosection from "@/components/Herosection";
import PricingSection from "@/components/PricingSection";
import TestimonialsSection from "@/components/TestimonialsSection";

export default function Home() {
  return <div>
    <Herosection />
    <AboutUs />
    <FeaturesSection />
    <PricingSection />
    <TestimonialsSection />
  </div>;
}
