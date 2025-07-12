import React from "react";
import { Check, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const featureRowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
      },
    }),
  };

  const checkMarkVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 500,
        damping: 15,
      },
    },
  };

  const brandCardVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      id="whytriksha"
      className="py-24 relative overflow-hidden bg-white text-gray-800"
    >
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-slate-50 to-transparent"></div>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.3 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="absolute -top-40 -right-40 w-80 h-80 bg-teal-100 rounded-full blur-3xl"
      ></motion.div>

      <div className="relative z-10">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeading
              title="Why Triksha is Different"
              subtitle="See how Triksha compares to other popular health monitoring platforms in the market."
            />
          </motion.div>

          {/* Comparison Table */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={containerVariants}
            className="mt-12 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100"
          >
            <div className="min-w-[640px] lg:min-w-full">
              {/* Table Header */}
              <motion.div className="grid grid-cols-5 gap-0 mb-4 min-w-[600px]">
                <div></div>

                {brands.map((brand, idx) => (
                  <motion.div
                    key={idx}
                    custom={idx}
                    variants={brandCardVariants}
                    className="flex flex-col items-center pt-4"
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-16 h-16 border border-gray-300 bg-slate-100 rounded-full flex items-center justify-center mb-3 shadow-lg"
                    >
                      <img src={brand.logo} alt={brand.name} className="object-contain h-10 w-10" />
                    </motion.div>
                    <div className="font-bold text-center text-xs md:text-sm mb-4">{brand.name}</div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Full Table */}
              <div className="flex flex-col">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    custom={index}
                    variants={featureRowVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className={`grid grid-cols-5 gap-0 items-center text-xs md:text-base ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    }`}
                  >
                    {/* Feature Name */}
                    <motion.div className="flex items-center justify-between px-2 md:px-4 py-3 md:py-4">
                      <span className="flex-1">{feature.name}</span>
                      {[0, 1, 2, 3, 4, 5].includes(index) && (
                        <motion.span
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.2, type: "spring" }}
                          className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-[10px] md:text-xs font-medium bg-blue-100 text-blue-800 whitespace-nowrap"
                        >
                          Unique
                        </motion.span>
                      )}
                    </motion.div>

                    {/* Triksha Column */}
                    <motion.div className="flex justify-center items-center px-2 md:px-4 py-3 md:py-4">
                      {feature.triksha ? (
                        <motion.div
                          variants={checkMarkVariants}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                        >
                          <Check className="h-5 w-5 md:h-6 md:w-6 text-green-600" />
                        </motion.div>
                      ) : (
                        <X className="h-5 w-5 md:h-6 md:w-6 text-red-300" />
                      )}
                    </motion.div>

                    {/* Apple Column */}
                    <motion.div className="flex justify-center items-center px-2 md:px-4 py-3 md:py-4">
                      {feature.apple ? (
                        <motion.div
                          variants={checkMarkVariants}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                        >
                          <Check className="h-5 w-5 md:h-6 md:w-6 text-slate-500" />
                        </motion.div>
                      ) : (
                        <X className="h-5 w-5 md:h-6 md:w-6 text-red-300" />
                      )}
                    </motion.div>

                    {/* WHOOP Column */}
                    <motion.div className="flex justify-center items-center px-2 md:px-4 py-3 md:py-4">
                      {feature.whoop ? (
                        <motion.div
                          variants={checkMarkVariants}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                        >
                          <Check className="h-5 w-5 md:h-6 md:w-6 text-slate-500" />
                        </motion.div>
                      ) : (
                        <X className="h-5 w-5 md:h-6 md:w-6 text-red-300" />
                      )}
                    </motion.div>

                    {/* Ultrahuman Column */}
                    <motion.div className="flex justify-center items-center px-2 md:px-4 py-3 md:py-4">
                      {feature.ultrahuman ? (
                        <motion.div
                          variants={checkMarkVariants}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                        >
                          <Check className="h-5 w-5 md:h-6 md:w-6 text-slate-500" />
                        </motion.div>
                      ) : (
                        <X className="h-5 w-5 md:h-6 md:w-6 text-red-300" />
                      )}
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Triksha Difference Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16 bg-gradient-to-r from-teal-500 to-blue-600 rounded-2xl shadow-lg text-white overflow-hidden"
          >
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="p-6 md:p-12"
            >
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">
                Proactive. Personalized. Predictive.
              </h3>
              <p className="text-white/90 text-sm sm:text-base md:text-lg mb-8 max-w-5xl mx-auto md:mx-0 text-center md:text-left">
                Triksha is an AI-powered health prediction system built to help you stay one step ahead. By analyzing
                your real-time vitals, medical history, and detected abnormalities, Triksha predicts emerging health
                risks before they escalate.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: "Advanced AI Predictions",
                    desc: "Our custom-built Proprietary AI doesn't just analyze what's happening now. It learns your health patterns over time, combining vitals and history to forecast potential issues early—empowering you to act before problems arise.",
                  },
                  {
                    title: "Personalized Risk Insights",
                    desc: "Every person is unique. Triksha uses your medical data , medical history, past conditions, and real-time data to deliver personalized risk scores and health alerts tailored specifically to you.",
                  },
                  {
                    title: "Integrated Health Book",
                    desc: "Forget fragmented records. Triksha's Health Book securely organizes your medical data and history in one place, making it easy to track, share with doctors, and monitor your health journey over time.",
                  },
                ].map((box, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                    whileHover={{ y: -5 }}
                    className="bg-white/20 backdrop-blur-md p-6 rounded-xl text-center lg:text-left"
                  >
                    <div className="font-bold text-lg sm:text-xl mb-2">{box.title}</div>
                    <p className="text-white/90 text-sm sm:text-base">{box.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </div>
    </motion.section>
  );
};

export default Comparison;
