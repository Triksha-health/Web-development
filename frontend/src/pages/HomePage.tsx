import { useEffect } from "react";
import Hero from "../components/home/Hero";
import ProblemSection from "../components/home/ProblemSection";
import AboutSection from "../components/home/AboutSection";
import ProductPreviewSection from "../components/home/ProductPreviewSection";
import InteractiveShowcase from "../components/home/InteractiveShowcase";
import UseCaseSection from "../components/home/UseCaseSection";
import Comparison from "../components/home/Comparison";
import LaunchSection from "../components/home/LaunchSection";
import CredibilityBand from "../components/home/CredibilityBand";
import FAQSection from "../components/home/FAQSection";
import StayUpdated from "../components/home/StayUpdated";

function HomePage() {
  useEffect(() => {
    document.title =
      "Triksha — Predict cardiac risk, before symptoms.";
    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (meta) {
      meta.content =
        "A personalized physiological model for the 300 million Indians at silent cardiac risk. Join the waitlist.";
    }
  }, []);

  return (
    <div>
      <Hero />
      <ProblemSection />
      <AboutSection />
      <ProductPreviewSection />
      <InteractiveShowcase />
      <UseCaseSection />
      <Comparison />
      <LaunchSection />
      <CredibilityBand />
      <FAQSection />
      <StayUpdated />
    </div>
  );
}

export default HomePage;
