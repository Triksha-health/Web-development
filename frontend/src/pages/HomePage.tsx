import Hero from "../components/home/Hero";
import AboutSection from "../components/home/AboutSection";
import UseCaseSection from "../components/home/UseCaseSection";
import Comparison from "../components/home/Comparison";
import LaunchSection from "../components/home/LaunchSection";
import FAQSection from "../components/home/FAQSection";
import CoFoundersSection from "../components/home/CoFounderSection";

function HomePage() {
  return (
    <div>
      <Hero />
      <AboutSection />
      <UseCaseSection />
      <Comparison/>
      <CoFoundersSection/>
      <LaunchSection/>
      <FAQSection/>
    </div>
  );
}

export default HomePage;
