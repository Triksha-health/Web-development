import { useState } from "react";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import ToggleButtons from "../ui/ToggleButtons";
import FeatureCards from "../ui/FeatureCards";
import TestimonialSection from "../ui/TestimonialSection";
import { Heart, AlertTriangle, Shield } from "lucide-react";
import { Activity, Clock, BarChart3 } from "lucide-react";
import doctorImage from "../../public/doctorimage.jpg";
import realtime from "../../public/realtime.jpg";
import headache from "../../public/headache.jpg";
import smartwatch from "../../public/smartwatch.jpg";

const UseCaseSection = () => {
  const [currentSelection, setCurrentSelection] = useState<string>("Health Risk Monitoring");

  const items = [
    {
      id: "cardiac",
      icon: <Heart className="w-7 h-7 text-blue-500" />,
      title: "Cardiac Issue Detection",
      description: "Early identification of irregular heartbeats and potential cardiovascular concerns.",
      image: doctorImage,
    },
    {
      id: "emergency",
      icon: <AlertTriangle className="w-7 h-7 text-blue-500" />,
      title: "Emergency Alerts to Family",
      description: "Automatic notifications to loved ones during critical health events.",
      image: doctorImage,
    },
    {
      id: "insights",
      icon: <Shield className="w-7 h-7 text-blue-500" />,
      title: "Long-term Health Insights",
      description: "Preventive analysis to detect patterns indicating potential chronic disease risk.",
      image: doctorImage,
    },
  ];
  const fitnessitems = [
    {
      id: "real-time-monitoring",
      icon: <Activity className="w-7 h-7 text-blue-500" />,
      title: "Real-time Health Monitoring",
      description: "Track vitals 24/7 with actionable insights to optimize your fitness and recovery.",
      image: realtime, // Black and white heart/pulse monitoring image
    },
    {
      id: "recovery-optimization",
      icon: <Clock className="w-7 h-7 text-blue-500" />,
      title: "Recovery Optimization",
      description: "Personalized recommendations for sleep, nutrition, and rest based on your body's needs.",
      image: headache, // Person lying down/resting image
    },
    {
      id: "performance-tracking",
      icon: <BarChart3 className="w-7 h-7 text-blue-500" />,
      title: "Performance Tracking",
      description: "Measure improvements over time with detailed analytics and trend analysis.",
      image: smartwatch, // Smartwatch on wrist showing data
    },
  ];

  const handleLearnMore = (cardId: string) => {
    console.log(`Learn more clicked for: ${cardId}`);
  };
  const handleReadSuccessStories = () => {
    console.log("Navigate to success stories page");
    // Handle navigation or modal opening
  };
  return (
    <section id="section" className="py-24 relative overflow-hidden bg-white text-black">
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-slate-50 to-transparent"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-100 rounded-full opacity-30 blur-3xl"></div>
      <Container className="relative z-10">
        <SectionHeading
          title="Use Cases"
          subtitle="Triksha adapts to your specific health needs, whether you're focusing on health risk monitoring or fitness optimization."
        />
        <div className="flex justify-center w-full mb-12">
          <ToggleButtons onSelectionChange={setCurrentSelection} />
        </div>
        <FeatureCards
          cards={currentSelection === "Health Risk Monitoring" ? items : fitnessitems}
          onLearnMore={handleLearnMore}
        />
        <TestimonialSection onReadSuccessStories={handleReadSuccessStories} />
      </Container>
    </section>
  );
};

export default UseCaseSection;
