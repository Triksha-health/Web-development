import React, { useState, useRef } from "react";
import { Send } from "lucide-react";
import { motion, useInView } from "framer-motion";

const StayUpdated: React.FC = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handleSubmit = async () => {
    if (!email) {
      alert("Please enter an email address.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://triksha-backend-f5f0cth4f9c0b8g9.southindia-01.azurewebsites.net/api/newsletter/subscribe",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert(data.message || "Subscribed successfully!");
        setEmail("");
      } else {
        alert(data.message || "Subscription failed.");
      }
    } catch (error) {
      console.error("Error subscribing:", error);
      alert("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      ref={ref}
      className="bg-primary-500 py-16 px-4"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Main heading */}
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-white mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Stay Updated
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          className="text-white/90 text-lg md:text-xl mb-8 max-w-4xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Subscribe to our newsletter for the latest updates, health tips, and exclusive early access offers.
        </motion.p>

        {/* Email subscription form */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 px-6 py-3 rounded-lg border-0 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          />
          <motion.button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-white text-primary-500 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center gap-2"
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? (
              "Subscribing..."
            ) : (
              <>
                Subscribe
                <Send className="w-4 h-4" />
              </>
            )}
          </motion.button>
        </motion.div>

        {/* Privacy notice */}
        <motion.p
          className="text-white/80 text-sm mb-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          We respect your privacy and will never share your information.
        </motion.p>
      </div>
    </motion.div>
  );
};

export default StayUpdated;
