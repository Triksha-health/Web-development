import Hero from "../components/home/Hero";
import AboutSection from "../components/home/AboutSection";
import UseCaseSection from "../components/home/UseCaseSection";
import Comparison from "../components/home/Comparison";

function HomePage() {
  return (
    <div>
      <Hero />
      <AboutSection />
      <UseCaseSection />
      <Comparison/>
    </div>
  );
}

export default HomePage;
