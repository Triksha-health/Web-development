import React, { useState } from "react";
import { Send } from "lucide-react";

const StayUpdated: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    // Handle subscription logic here
    console.log("Subscribing email:", email);
  };

  return (
    <div className="bg-primary-500 py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Main heading */}
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Stay Updated</h2>

        {/* Subtitle */}
        <p className="text-white/90 text-lg md:text-xl mb-8 max-w-4xl mx-auto leading-relaxed">
          Subscribe to our newsletter for the latest updates, health tips, and exclusive early access offers.
        </p>

        {/* Email subscription form */}
        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 px-6 py-3 rounded-lg border-0 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <button
            onClick={handleSubmit}
            className="bg-white text-primary-500 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center gap-2"
          >
            Subscribe
            <Send className="w-4 h-4" />
          </button>
        </div>

        {/* Privacy notice */}
        <p className="text-white/80 text-sm mb-12">We respect your privacy and will never share your information.</p>

        {/* Stats section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">50K+</div>
            <div className="text-white/80 text-sm">Newsletter Subscribers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">10K+</div>
            <div className="text-white/80 text-sm">Beta Testers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">200+</div>
            <div className="text-white/80 text-sm">Pre-orders</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">30+</div>
            <div className="text-white/80 text-sm">Team Members</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StayUpdated;
