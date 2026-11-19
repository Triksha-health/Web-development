import Hero from "../components/site/Hero";
import Families from "../components/site/Families";
import HowItWorks from "../components/site/HowItWorks";
import AlertSection from "../components/site/AlertSection";
import Statement from "../components/site/Statement";
import StatusSection from "../components/site/StatusSection";
import Clinicians from "../components/site/Clinicians";
import About from "../components/site/About";
import Faq from "../components/site/Faq";
import Waitlist from "../components/site/Waitlist";
import { usePageMeta } from "../seo";

function HomePage() {
  usePageMeta("/");

  return (
    <>
      <Hero />
      <Families />
      <HowItWorks />
      <AlertSection />
      <Statement />
      <StatusSection />
      <Clinicians />
      <About />
      <Faq />
      <Waitlist />
    </>
  );
}

export default HomePage;
