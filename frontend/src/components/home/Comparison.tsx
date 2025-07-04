import React from "react";
import { Check, X } from "lucide-react";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import trikshaLogo from "../../public/Triksha_logo.png";
import appleLogo from "../../public/apple-logo.png";
import whoopLogo from "../../public/whoop_logo.png";
import ouraLogo from "../../public/ultra_human_logo.png";

const Comparison: React.FC = () => {
  const features = [
    { name: "Predictive AI Health Alerts", triksha: true, apple: false, whoop: false, ultrahuman: false },
    { name: "Chronic Disease Early Detection", triksha: true, apple: false, whoop: false, ultrahuman: false },
    { name: "EHR Integration", triksha: true, apple: false, whoop: false, ultrahuman: false },
    { name: "Health Book", triksha: true, apple: false, whoop: false, ultrahuman: false },
    { name: "Monthly health reports", triksha: true, apple: false, whoop: false, ultrahuman: false },
    { name: "family emergency alerts", triksha: true, apple: false, whoop: false, ultrahuman: false },
    { name: "Real-time Health Monitoring", triksha: true, apple: true, whoop: true, ultrahuman: true },
    { name: "AI-Powered Insights", triksha: true, apple: false, whoop: true, ultrahuman: true },
    { name: "User Emergency Alerts", triksha: true, apple: false, whoop: false, ultrahuman: false },
    { name: "Personalized Health Recommendations", triksha: true, apple: false, whoop: true, ultrahuman: true },
   
  ];

  const brands = [
    { name: "Triksha", logo: trikshaLogo },
    { name: "Apple Watch", logo: appleLogo },
    { name: "WHOOP", logo: whoopLogo },
    { name: "Ultrahuman", logo: ouraLogo },
  ];

  return (
    <section id="whytriksha" className="py-24 relative overflow-hidden bg-white text-gray-800">
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-slate-50 to-transparent"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-100 rounded-full opacity-30 blur-3xl"></div>

      <div className="relative z-10">
        <Container>
          <SectionHeading
            title="Why Triksha is Different"
            subtitle="See how Triksha compares to other popular health wearables in the market."
          />

          {/* Comparison Table */}
          <div className="mt-12 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
            <div className="min-w-[640px] lg:min-w-full">
              {/* Table Header */}
              <div className="grid grid-cols-5 gap-0 mb-4 min-w-[600px]">
                <div></div>

                {brands.map((brand, idx) => (
                  <div key={idx} className="flex flex-col items-center pt-4">
                    <div className="w-16 h-16 border border-gray-300 bg-slate-100 rounded-full flex items-center justify-center mb-3 shadow-lg">
                      <img src={brand.logo} alt={brand.name} className="object-contain h-10 w-10" />
                    </div>
                    <div className="font-bold text-center text-xs md:text-sm mb-4">{brand.name}</div>
                  </div>
                ))}
              </div>

              {/* Full Table */}
              <div className="flex flex-col">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className={`grid grid-cols-5 gap-0 items-center text-xs md:text-base ${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      }`}
                  >
                    {/* Feature Name */}
                    <div className="flex items-center justify-between px-2 md:px-4 py-3 md:py-4">
                      <span className="flex-1">{feature.name}</span>
                      {[0, 1, 2, 3, 4,5].includes(index) && (
                        <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-[10px] md:text-xs font-medium bg-blue-100 text-blue-800 whitespace-nowrap">
                          Unique
                        </span>
                      )}
                    </div>

                    {/* Triksha Column */}
                    <div className="flex justify-center items-center px-2 md:px-4 py-3 md:py-4">
                      {feature.triksha ? (
                        <Check className="h-5 w-5 md:h-6 md:w-6 text-green-600" />
                      ) : (
                        <X className="h-5 w-5 md:h-6 md:w-6 text-red-300" />
                      )}
                    </div>

                    {/* Apple Column */}
                    <div className="flex justify-center items-center px-2 md:px-4 py-3 md:py-4">
                      {feature.apple ? (
                        <Check className="h-5 w-5 md:h-6 md:w-6 text-slate-500" />
                      ) : (
                        <X className="h-5 w-5 md:h-6 md:w-6 text-red-300" />
                      )}
                    </div>

                    {/* WHOOP Column */}
                    <div className="flex justify-center items-center px-2 md:px-4 py-3 md:py-4">
                      {feature.whoop ? (
                        <Check className="h-5 w-5 md:h-6 md:w-6 text-slate-500" />
                      ) : (
                        <X className="h-5 w-5 md:h-6 md:w-6 text-red-300" />
                      )}
                    </div>

                    {/* Ultrahuman Column */}
                    <div className="flex justify-center items-center px-2 md:px-4 py-3 md:py-4">
                      {feature.ultrahuman ? (
                        <Check className="h-5 w-5 md:h-6 md:w-6 text-slate-500" />
                      ) : (
                        <X className="h-5 w-5 md:h-6 md:w-6 text-red-300" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Triksha Difference Section */}
          <div className="mt-16 bg-gradient-to-r from-teal-500 to-blue-600 rounded-2xl shadow-lg text-white">
            <div className="p-6 md:p-12">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">Proactive. Personalized. Predictive.</h3>
              <p className="text-white/90 text-sm sm:text-base md:text-lg mb-8 max-w-5xl mx-auto md:mx-0 text-center md:text-left">
                Triksha is an AI-powered health prediction system built to help you stay one step ahead. By analyzing your real-time vitals, medical history, and detected abnormalities, Triksha predicts emerging health risks before they escalate.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: "Advanced AI Predictions",
                    desc: "Our custom-built Proprietary AI doesn't just analyze what’s happening now. It learns your health patterns over time, combining vitals and history to forecast potential issues early—empowering you to act before problems arise.",
                  },
                  {
                    title: "Personalized Risk Insights",
                    desc: "Every person is unique. Triksha uses your medical data , medical history, past conditions, and real-time data to deliver personalized risk scores and health alerts tailored specifically to you.",
                  },
                  {
                    title: "Integrated Health Book",
                    desc: "Forget fragmented records. Triksha’s Health Book securely organizes your medical data and history in one place, making it easy to track, share with doctors, and monitor your health journey over time.",
                  },
                ].map((box, i) => (
                  <div key={i} className="bg-white/20 backdrop-blur-md p-6 rounded-xl text-center lg:text-left">
                    <div className="font-bold text-lg sm:text-xl mb-2">{box.title}</div>
                    <p className="text-white/90 text-sm sm:text-base">{box.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
};

export default Comparison;
