import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, Heart } from 'lucide-react';

function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative pt-20 lg:pt-24 overflow-hidden bg-white dark:bg-gray-900 transition-colors duration-500">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-950 z-0"></div>

      {/* Decorative circles */}
      <div className="absolute top-1/3 -right-64 w-96 h-96 bg-primary-100 dark:bg-primary-900 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute bottom-1/4 -left-64 w-96 h-96 bg-secondary-100 dark:bg-secondary-900 rounded-full opacity-20 blur-3xl"></div>

      <div className="container relative z-10 pt-20 pb-24 lg:pt-10 lg:pb-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <div className="-mt-[120px]">
            <div className={`${isVisible ? 'fade-in' : 'opacity-0'}`}>
              <span className="inline-block px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300 font-medium text-sm mb-6">
                Launching Soon - Limited Pre-orders Available
              </span>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6 text-gray-900 dark:text-white">
                Predict <span className="text-primary-500">Before</span> It's Too Late
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-lg">
                The AI-driven wearable that detects chronic health risks early, giving you time to prevent serious conditions before they develop.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/pre-order" className="btn-primary">
                  Pre-Order Now
                </Link>
                <a href="#join" className="btn-outline">
                  Join Waitlist
                </a>
              </div>
            </div>
          </div>

          <div className={`relative ${isVisible ? 'slide-up' : 'opacity-0'} lg:ml-auto`}>
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

                <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 max-w-xs">
                  <div className="text-xs text-primary-600 dark:text-primary-300 font-medium uppercase mb-1">AI Prediction</div>
                  <div className="text-gray-800 dark:text-gray-200 font-medium">
                    Blood glucose levels indicate pre-diabetic trend. Taking action now can prevent diabetes development.
                  </div>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-10 -right-10 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 z-20 hidden md:block">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-success-500 mr-2"></div>
                <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Early Detection Alert</span>
              </div>
            </div>

            <div className="absolute -bottom-8 -left-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 z-20 hidden md:block">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Risk Reduction</div>
              <div className="text-2xl font-bold text-primary-500">87%</div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
          <span className="text-sm text-gray-500 dark:text-gray-400 mb-2">Scroll to learn more</span>
          <ArrowDown className="w-5 h-5 text-primary-500 animate-bounce rotate-90" />
        </div>
      </div>
    </section>
  );
}

export default Hero;
