import Hero from "../components/home/Hero";
import AboutSection from "../components/home/AboutSection";
import UseCaseSection from "../components/home/UseCaseSection";
import Comparison from "../components/home/Comparison";
import LaunchSection from "../components/home/LaunchSection";
import FAQSection from "../components/home/FAQSection";
import StayUpdated from "../components/home/StayUpdated";
import CoFoundersSection from "../components/home/CoFounderSection";
import TrustSection from "../components/home/TrustSection";

function HomePage() {
  return (
    <div>
      <Hero />
      <AboutSection />
      <UseCaseSection />
      <Comparison />
      <CoFoundersSection />
      <LaunchSection />
      <TrustSection />
      <FAQSection />
      <StayUpdated />
    </div>
  );
}

export default HomePage;
