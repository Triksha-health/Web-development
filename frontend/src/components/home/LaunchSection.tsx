import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LaunchSection() {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  // Set launch date to 3 months from now
  const launchDate = new Date();
  launchDate.setMonth(launchDate.getMonth() + 3);
  
  // Early bird stock remaining
  const [earlyBirdStock, setEarlyBirdStock] = useState(50);
  const [standardStock, setStandardStock] = useState(150);
  
  // Calculate time remaining
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
    
    // Simulate random stock decreases
    const stockTimer = setInterval(() => {
      const randomDecrease = Math.random() > 0.7 ? 1 : 0;
      if (earlyBirdStock > 0 && randomDecrease === 1) {
        setEarlyBirdStock(prevStock => Math.max(0, prevStock - randomDecrease));
      }
      const standardDecrease = Math.random() > 0.8 ? 1 : 0;
      if (standardStock > 0 && standardDecrease === 1) {
        setStandardStock(prevStock => Math.max(0, prevStock - standardDecrease));
      }
    }, 10000);
    
    return () => {
      clearInterval(timer);
      clearInterval(stockTimer);
    };
  }, []);
  
  // Format date for display
  const formattedLaunchDate = launchDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  return (
    <section className="section bg-white">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="section-title text-[#3691ff]">Launch Timeline</h2>
          <p className="section-subtitle">
            Be among the first to experience Triksha's revolutionary health predictions. Limited devices available for our initial launch.
          </p>
        </div>
        
        {/* Countdown timer */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10 mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2">Shipping Begins: {formattedLaunchDate}</h3>
            <p className="text-gray-600">Secure your device now before we sell out</p>
          </div>
          
          <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-500">{timeLeft.days}</div>
              <div className="text-sm text-gray-500 mt-1">Days</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-500">{timeLeft.hours}</div>
              <div className="text-sm text-gray-500 mt-1">Hours</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-500">{timeLeft.minutes}</div>
              <div className="text-sm text-gray-500 mt-1">Minutes</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-500">{timeLeft.seconds}</div>
              <div className="text-sm text-gray-500 mt-1">Seconds</div>
            </div>
          </div>
        </div>
        
        {/* Pre-order tiers */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Early Bird */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-primary-500">
            <div className="bg-primary-500 text-white text-center py-2">
              <span className="font-medium">Limited Early Access</span>
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-2">Early Bird</h3>
              <div className="flex items-baseline mb-6">
                <span className="text-4xl font-bold">₹14,999</span>
                <span className="text-gray-500 ml-2 line-through">₹17,999</span>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[#3691ff] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Ships within 30 days</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[#3691ff] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Premium health coaching session</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[#3691ff] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>12 months premium subscription</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[#3691ff] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Lifetime priority support</span>
                </li>
              </ul>
              
              {/* Stock indicator */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Limited Stock</span>
                  <span className="text-sm font-medium">{earlyBirdStock}/50 remaining</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary-500 h-2 rounded-full" 
                    style={{ width: `${(earlyBirdStock / 50) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <button 
                onClick={() => navigate('/pre-order')}
                className="w-full bg-primary-500 text-white py-3 rounded-lg font-medium hover:bg-primary-600 transition-colors"
              >
                Pre-Order Now
              </button>
            </div>
          </div>
          
          {/* Standard */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-gray-100 text-gray-800 text-center py-2">
              <span className="font-medium">Standard Pre-Order</span>
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-2">Standard</h3>
              <div className="flex items-baseline mb-6">
                <span className="text-4xl font-bold">₹17,999</span>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[#3691ff] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Ships within 45 days</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[#3691ff] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Digital health guide</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[#3691ff] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>6 months premium subscription</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[#3691ff] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Standard customer support</span>
                </li>
              </ul>
              
              {/* Stock indicator */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Limited Stock</span>
                  <span className="text-sm font-medium">{standardStock}/150 remaining</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gray-500 h-2 rounded-full" 
                    style={{ width: `${(standardStock / 150) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <button 
                onClick={() => navigate('/pre-order')}
                className="w-full bg-gray-800 text-white py-3 rounded-lg font-medium hover:bg-gray-900 transition-colors"
              >
                Pre-Order Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LaunchSection;