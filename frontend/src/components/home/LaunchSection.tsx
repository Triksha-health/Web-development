// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import SectionHeading from "../ui/SectionHeading";

// function LaunchSection() {
//   const navigate = useNavigate();
//   const [timeLeft, setTimeLeft] = useState({
//     days: 0,
//     hours: 0,
//     minutes: 0,
//     seconds: 0,
//   });

// const launchDate = new Date("2026-01-01T00:00:00");
//   // Early bird stock remaining
//   const [earlyBirdStock, setEarlyBirdStock] = useState(50);
//   const [standardStock, setStandardStock] = useState(150);

//   // Calculate time remaining
//   useEffect(() => {
//     const timer = setInterval(() => {
//       const now = new Date();
//       const difference = launchDate.getTime() - now.getTime();

//       if (difference <= 0) {
//         clearInterval(timer);
//         return;
//       }

//       const days = Math.floor(difference / (1000 * 60 * 60 * 24));
//       const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//       const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
//       const seconds = Math.floor((difference % (1000 * 60)) / 1000);

//       setTimeLeft({ days, hours, minutes, seconds });
//     }, 1000);

//     // Simulate random stock decreases
//     const stockTimer = setInterval(() => {
//       const randomDecrease = Math.random() > 0.7 ? 1 : 0;
//       if (earlyBirdStock > 0 && randomDecrease === 1) {
//         setEarlyBirdStock((prevStock) => Math.max(0, prevStock - randomDecrease));
//       }
//       const standardDecrease = Math.random() > 0.8 ? 1 : 0;
//       if (standardStock > 0 && standardDecrease === 1) {
//         setStandardStock((prevStock) => Math.max(0, prevStock - standardDecrease));
//       }
//     }, 10000);

//     return () => {
//       clearInterval(timer);
//       clearInterval(stockTimer);
//     };
//   }, []);

//   // Format date for display
//   const formattedLaunchDate = launchDate.toLocaleDateString("en-US", {
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   });

//   return (
//     <section className="section bg-white">
//       <div className="container">
//         <div className="text-center max-w-3xl mx-auto mb-16">
//           {/* <h2 className="section-title text-[#3691ff]">Launch Timeline</h2> */}
//            <SectionHeading
//           title="Launch Timeline"
//           subtitle=" Be among the first to experience Triksha's revolutionary health predictions. Limited devices available for
//             our initial launch."
//         />

//         </div>

//         {/* Countdown timer */}
//         <div className="bg-neutral-50 rounded-2xl shadow-lg p-8 md:p-10 mb-16">
//           <div className="text-center mb-8">
//             <h3 className="text-2xl font-bold mb-2">Shipping Begins: {formattedLaunchDate}</h3>
//             <p className="text-gray-600">Secure your device now before we sell out</p>
//           </div>

//           <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
//             <div className="bg-white rounded-lg p-4 text-center">
//               <div className="text-3xl md:text-4xl font-bold text-primary-500">{timeLeft.days}</div>
//               <div className="text-sm text-gray-500 mt-1">Days</div>
//             </div>
//             <div className="bg-white rounded-lg p-4 text-center">
//               <div className="text-3xl md:text-4xl font-bold text-primary-500">{timeLeft.hours}</div>
//               <div className="text-sm text-gray-500 mt-1">Hours</div>
//             </div>
//             <div className="bg-white rounded-lg p-4 text-center">
//               <div className="text-3xl md:text-4xl font-bold text-primary-500">{timeLeft.minutes}</div>
//               <div className="text-sm text-gray-500 mt-1">Minutes</div>
//             </div>
//             <div className="bg-white rounded-lg p-4 text-center">
//               <div className="text-3xl md:text-4xl font-bold text-primary-500">{timeLeft.seconds}</div>
//               <div className="text-sm text-gray-500 mt-1">Seconds</div>
//             </div>
//           </div>
//         </div>

//         {/* Pre-order tiers */}
//         <div className="grid md:grid-cols-2 gap-8">
//           {/* Early Bird */}
//           <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-primary-500">
//             <div className="bg-primary-500 text-white text-center py-2">
//               <span className="font-medium">Limited Early Access</span>
//             </div>
//             <div className="p-8">
//               <h3 className="text-2xl font-bold mb-2">Early Bird</h3>
//               <div className="flex items-baseline mb-6">
//                 <span className="text-4xl font-bold">₹14,999</span>
//                 <span className="text-gray-500 ml-2 line-through">₹17,999</span>
//               </div>

//               <ul className="space-y-3 mb-8">
//                 <li className="flex items-start">
//                   <svg
//                     className="w-5 h-5 text-[#3691ff] mr-2 mt-0.5"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
//                   </svg>
//                   <span>Ships within 30 days</span>
//                 </li>
//                 <li className="flex items-start">
//                   <svg
//                     className="w-5 h-5 text-[#3691ff] mr-2 mt-0.5"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
//                   </svg>
//                   <span>Premium health coaching session</span>
//                 </li>
//                 <li className="flex items-start">
//                   <svg
//                     className="w-5 h-5 text-[#3691ff] mr-2 mt-0.5"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
//                   </svg>
//                   <span>12 months premium subscription</span>
//                 </li>
//                 <li className="flex items-start">
//                   <svg
//                     className="w-5 h-5 text-[#3691ff] mr-2 mt-0.5"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
//                   </svg>
//                   <span>Lifetime priority support</span>
//                 </li>
//               </ul>

//               {/* Stock indicator */}
//               <div className="mb-6">
//                 <div className="flex justify-between items-center mb-2">
//                   <span className="text-sm text-gray-600">Limited Stock</span>
//                   <span className="text-sm font-medium">{earlyBirdStock}/50 remaining</span>
//                 </div>
//                 <div className="w-full bg-gray-200 rounded-full h-2">
//                   <div
//                     className="bg-primary-500 h-2 rounded-full"
//                     style={{ width: `${(earlyBirdStock / 50) * 100}%` }}
//                   ></div>
//                 </div>
//               </div>

//               <button
//                 onClick={() => navigate("/pre-order?triksha=early-bird")}
//                 className="w-full bg-primary-500 text-white py-3 rounded-lg font-medium hover:bg-primary-600 transition-colors"
//               >
//                 Pre-Order Now
//               </button>
//             </div>
//           </div>

//           {/* Standard */}
//           <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
//             <div className="bg-gray-100 text-gray-800 text-center py-2">
//               <span className="font-medium">Standard Pre-Order</span>
//             </div>
//             <div className="p-8">
//               <h3 className="text-2xl font-bold mb-2">Standard</h3>
//               <div className="flex items-baseline mb-6">
//                 <span className="text-4xl font-bold">₹17,999</span>
//               </div>

//               <ul className="space-y-3 mb-8">
//                 <li className="flex items-start">
//                   <svg
//                     className="w-5 h-5 text-[#3691ff] mr-2 mt-0.5"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
//                   </svg>
//                   <span>Ships within 45 days</span>
//                 </li>
//                 <li className="flex items-start">
//                   <svg
//                     className="w-5 h-5 text-[#3691ff] mr-2 mt-0.5"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
//                   </svg>
//                   <span>Digital health guide</span>
//                 </li>
//                 <li className="flex items-start">
//                   <svg
//                     className="w-5 h-5 text-[#3691ff] mr-2 mt-0.5"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
//                   </svg>
//                   <span>6 months premium subscription</span>
//                 </li>
//                 <li className="flex items-start">
//                   <svg
//                     className="w-5 h-5 text-[#3691ff] mr-2 mt-0.5"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
//                   </svg>
//                   <span>Standard customer support</span>
//                 </li>
//               </ul>

//               {/* Stock indicator */}
//               <div className="mb-6">
//                 <div className="flex justify-between items-center mb-2">
//                   <span className="text-sm text-gray-600">Limited Stock</span>
//                   <span className="text-sm font-medium">{standardStock}/150 remaining</span>
//                 </div>
//                 <div className="w-full bg-gray-200 rounded-full h-2">
//                   <div
//                     className="bg-gray-500 h-2 rounded-full"
//                     style={{ width: `${(standardStock / 150) * 100}%` }}
//                   ></div>
//                 </div>
//               </div>

//               <button
//                 onClick={() => navigate("/pre-order?triksha=standard")}
//                 className="w-full bg-gray-800 text-white py-3 rounded-lg font-medium hover:bg-gray-900 transition-colors"
//               >
//                 Pre-Order Now
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default LaunchSection;
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import SectionHeading from "../ui/SectionHeading";

function LaunchSection() {
  const navigate = useNavigate();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const launchDate = new Date("2026-01-01T00:00:00");

  const [earlyBirdStock, setEarlyBirdStock] = useState(50);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = launchDate.getTime() - now.getTime();

      if (difference <= 0) {
        clearInterval(timer);
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    const stockTimer = setInterval(() => {
      const randomDecrease = Math.random() > 0.7 ? 1 : 0;
      if (earlyBirdStock > 0 && randomDecrease === 1) {
        setEarlyBirdStock((prevStock) => Math.max(0, prevStock - randomDecrease));
      }
    }, 10000);

    return () => {
      clearInterval(timer);
      clearInterval(stockTimer);
    };
  }, []);

  const formattedLaunchDate = launchDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <motion.section
      ref={ref}
      className="section bg-white"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <SectionHeading
            title="Launch Timeline"
            subtitle="Be among the first to experience Triksha's revolutionary health predictions. Limited devices available for our initial launch."
          />
        </motion.div>

        <motion.div
          className="bg-neutral-50 rounded-2xl shadow-lg p-8 md:p-10 mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-2">Shipping Begins: {formattedLaunchDate}</h3>
            <p className="text-gray-600">Secure your device now before we sell out</p>
          </motion.div>

          {/* Responsive Countdown Timer */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto px-4">
            {[
              { value: timeLeft.days, label: "Days" },
              { value: timeLeft.hours, label: "Hours" },
              { value: timeLeft.minutes, label: "Minutes" },
              { value: timeLeft.seconds, label: "Seconds" },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                className="bg-white rounded-lg p-4 text-center shadow hover:scale-105 transition-transform duration-300"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{
                  duration: 0.5,
                  delay: isInView ? 0.8 + index * 0.1 : 0,
                  type: "spring",
                  stiffness: 100,
                }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="text-3xl md:text-4xl font-bold text-primary-500"
                  key={item.value}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {item.value}
                </motion.div>
                <div className="text-sm text-gray-500 mt-1">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Early Bird Offer Box */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 80 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <motion.div
            className="w-full md:w-4/5 lg:w-3/5 bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-gray-200"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="bg-primary-500 text-white text-center py-3"
              initial={{ opacity: 0, y: -20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
              transition={{ duration: 0.6, delay: 1.4 }}
            >
              <span className="font-medium text-lg">Limited Early Access</span>
            </motion.div>
            <div className="p-10">
              <motion.h3
                className="text-3xl font-bold mb-4 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 1.6 }}
              >
                Early Bird Offer
              </motion.h3>

              <motion.div
                className="flex justify-center items-baseline mb-6"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.6, delay: 1.8, type: "spring" }}
              >
                <span className="text-5xl font-bold text-primary-500">₹14,999</span>
                <span className="text-gray-500 ml-3 line-through text-lg">₹17,999</span>
              </motion.div>

              <motion.p
                className="text-center text-lg text-green-600 font-semibold mb-6"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.6, delay: 2.0 }}
              >
                ⭐ Save over 15% with this special pre-order price!
              </motion.p>

              <motion.ul
                className="space-y-4 mb-8 text-lg"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.6, delay: 2.2 }}
              >
                {[
                  "12-month premium subscription (App + Wearable)",
                  "Free personalized AI Coach",
                  "Lifetime priority support",
                  "Priority shipping from Jan 1",
                  "Limited to 200 units only",
                ].map((feature, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, delay: isInView ? 2.4 + index * 0.1 : 0 }}
                  >
                    <svg
                      className="w-6 h-6 text-[#3691ff] mr-3 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </motion.ul>

              <motion.div
                className="mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 2.8 }}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Limited Stock</span>
                  <span className="text-sm font-medium">{earlyBirdStock}/200 remaining</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <motion.div
                    className="bg-primary-500 h-3 rounded-full"
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${(earlyBirdStock / 200) * 100}%` } : { width: 0 }}
                    transition={{ duration: 1.5, delay: isInView ? 3.0 : 0, ease: "easeOut" }}
                  ></motion.div>
                </div>
              </motion.div>

              <motion.button
                onClick={() => navigate("/pre-order?triksha=early-bird")}
                className="w-full bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-400 text-white py-4 rounded-lg font-semibold text-lg hover:from-primary-600 hover:to-cyan-500 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 3.2 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Pre-Order Now
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default LaunchSection;
