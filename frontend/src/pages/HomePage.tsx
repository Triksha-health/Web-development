import Hero from "../components/home/Hero";
import AboutSection from "../components/home/AboutSection";
import UseCaseSection from "../components/home/UseCaseSection";
import Comparison from "../components/home/Comparison";
import LaunchSection from "../components/home/LaunchSection";

function HomePage() {
  return (
    <div>
      <Hero />
      <AboutSection />
      <UseCaseSection />
      <Comparison/>
      <LaunchSection/>
    </div>
  );
}

export default HomePage;
