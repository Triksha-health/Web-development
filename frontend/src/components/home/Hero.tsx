import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowDown, Heart, X, Play } from "lucide-react";
import introvideo from "../../public/introvideo.mp4";

function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative pt-28 sm:pt-28 lg:pt-24 overflow-hidden min-h-screen flex items-center">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-green-50 z-0"></div>
      {showVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="relative bg-white rounded-lg shadow-lg  max-w-4xl w-full">
            <button
              className="absolute -top-6 -right-10 text-gray-600 z-10"
              onClick={() => setShowVideo(false)}
              aria-label="Close"
            >
              <X className="w-8 h-8 text-white" />
            </button>
            <video src={introvideo} controls autoPlay className="w-full rounded-lg" />
          </div>
        </div>
      )}

      {/* Decorative circles */}
      <div className="absolute top-1/3 -right-64 w-96 h-96 bg-primary-100 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute bottom-1/4 -left-64 w-96 h-96 bg-secondary-100 rounded-full opacity-20 blur-3xl"></div>

      <div className="container relative z-10 pt-20 pb-24 lg:pt-10 lg:pb-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <div className="-mt-[120px]">
            <div className={`${isVisible ? "fade-in" : "opacity-0"}`}>
              <span className="inline-block px-4 py-2 rounded-full bg-primary-100 text-primary-600 font-medium text-sm mb-6">
                India’s First Predictive Health Monitoring Platform
              </span>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6">
                Predict{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-500 to-violet-600">
                  Before
                </span>{" "}
                It's Too Late
              </h1>

              <p className="text-xl text-gray-600 mb-8 max-w-lg">
                Advanced AI that doesn’t just track, but predicts potential health issues before they become problems. Giving you time to act early, stay safe, and stay healthy.
              </p>
              <div className="flex lg:flex-col max-sm:flex-col  gap-4">
                <div className="flex lg:gap-4 max-sm:justify-between max-sm:gap-2 md:gap-4">
                  <Link to="/pre-order" className="btn-primary max-sm:w-1/2">
                    Pre-Order Now
                  </Link>
                  <a href="/learn-more" className="btn-outline max-sm:w-1/2">
                    Learn More
                  </a>
                </div>
                <div className="w-[319px] max-sm:w-full">
                  <button
                    onClick={() => setShowVideo(true)}
                    className="group relative w-full overflow-hidden rounded-2xl border border-gray-300 bg-white/80 backdrop-blur-md text-gray-800 py-3 px-6 shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-blue-400 active:scale-95"
                  >
                    {/* Animated gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 via-purple-400/10 to-pink-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                    {/* Icon + Label */}
                    <div className="relative flex items-center justify-center z-10">
                      <div className="relative mr-3">
                        {/* Pulsing background */}
                        <div className="absolute -inset-1 bg-blue-400/20 rounded-full blur-xl animate-ping group-hover:scale-110 transition-transform duration-300"></div>

                        {/* Icon */}
                        <Play className="relative z-10 w-6 h-6 text-blue-600 group-hover:text-blue-700 transition-transform duration-300 group-hover:scale-125 group-hover:rotate-6" />
                      </div>
                      <span className="relative z-10 font-semibold text-base group-hover:text-blue-700 transition-colors duration-300">
                        Watch Video
                      </span>
                    </div>

                    {/* Elegant shimmer */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 pointer-events-none"></div>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className={`relative ${isVisible ? "slide-up" : "opacity-0"} lg:ml-auto`}>
            {/* Main device image */}
            <div className="relative z-10 rounded-lg overflow-hidden shadow-xl">
              <img
                src="https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Triksha Wearable Device"
                className="w-[400px] h-[580px]"
              />

              {/* Animated health data overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent flex flex-col justify-end p-6">
                <div className="flex items-center text-white mb-4">
                  <Heart className="w-6 h-6 text-red-500 mr-2 animate-pulse" />
                  <div className="text-lg font-medium">Heart Rate: 72 BPM</div>
                </div>

                <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 max-w-xs">
                  <div className="text-xs text-primary-600 font-medium uppercase mb-1">AI Prediction</div>
                  <div className="text-gray-800 font-medium">
                    Blood glucose levels indicate pre-diabetic trend. Taking action now can prevent diabetes
                    development.
                  </div>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-10 -right-10 bg-white rounded-lg shadow-lg p-4 z-20 hidden md:block">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-success-500 mr-2"></div>
                <span className="text-sm font-medium">Early Detection Alert</span>
              </div>
            </div>

            <div className="absolute -bottom-8 -left-8 bg-white rounded-lg shadow-lg p-4 z-20 hidden md:block">
              <div className="text-xs text-gray-500 mb-1">Risk Reduction</div>
              <div className="text-2xl font-bold text-primary-500">87%</div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
          <span className="text-sm text-gray-500 mb-2">Scroll to learn more</span>
          <ArrowDown className="w-5 h-5 text-primary-500 animate-bounce rotate-90" />
        </div>
      </div>
    </section>
  );
}

export default Hero;
