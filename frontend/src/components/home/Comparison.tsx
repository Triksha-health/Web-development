import React from 'react';
import { Check, X } from 'lucide-react';
import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';

const Comparison: React.FC = () => {
  const features = [
    { name: "Predictive AI Health Alerts", triksha: true, apple: false, whoop: false, oura: false },
    { name: "Chronic Disease Early Detection", triksha: true, apple: false, whoop: false, oura: false },
    { name: "EHR Integration", triksha: true, apple: false, whoop: false, oura: false },
    { name: "Real-time Health Monitoring", triksha: true, apple: true, whoop: true, oura: true },
    { name: "AI-Powered Insights", triksha: true, apple: false, whoop: true, oura: true },
    { name: "Family Emergency Alerts", triksha: true, apple: true, whoop: false, oura: false },
    { name: "Personalized Health Recommendations", triksha: true, apple: false, whoop: true, oura: true },
    { name: "Dedicated Health Community", triksha: true, apple: false, whoop: true, oura: false },
    { name: "Health Book", triksha: true, apple: false, whoop: false, oura: false },
  ];

  return (
    <section id="comparison" className="py-24 relative overflow-hidden bg-white text-gray-800">
      {/* Background decoration */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-slate-50 to-transparent"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-100 rounded-full opacity-30 blur-3xl"></div>

      <div className="relative z-10">
        <Container>
          <SectionHeading
            title="Why Triksha is Different"
            subtitle="See how Triksha compares to other popular health wearables in the market."
          />

          <div className="mt-12 overflow-x-auto">
            <div className="min-w-[768px]">
              <div className="grid grid-cols-5 gap-4 mb-8">
                <div></div>
                {['T', 'A', 'W', 'O'].map((label, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 ${
                        label === 'T' ? 'bg-[#3691ff] text-black' : 'bg-slate-100 text-slate-600'
                      } font-bold`}
                    >
                      {label}
                    </div>
                    <div className="font-bold text-center">
                      {label === 'T'
                        ? 'Triksha'
                        : label === 'A'
                        ? 'Apple Watch'
                        : label === 'W'
                        ? 'WHOOP'
                        : 'Oura Ring'}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className={`grid grid-cols-5 gap-4 p-4 rounded-lg ${
                      index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                    }`}
                  >
                    <div className="col-span-1 font-medium flex items-center">
                      {feature.name}
                      {[0, 1, 2, 8].includes(index) && (
                        <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Unique
                        </span>
                      )}
                    </div>

                    {[feature.triksha, feature.apple, feature.whoop, feature.oura].map((value, idx) => (
                      <div key={idx} className="flex justify-center">
                        {value ? (
                          <Check className={`h-6 w-6 ${idx === 0 ? 'text-[#3691ff]' : 'text-slate-600'}`} />
                        ) : (
                          <X className="h-6 w-6 text-slate-300" />
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-16 bg-gradient-to-r from-teal-500 to-blue-600 rounded-2xl shadow-lg text-white">
            <div className="p-8 md:p-12">
              <h3 className="text-2xl md:text-3xl font-bold mb-6">The Triksha Difference</h3>
              <p className="text-white/90 text-lg mb-8 max-w-3xl">
                While other wearables track what's happening now, only Triksha uses advanced AI to predict what might
                happen in the future—giving you precious time to take preventive action.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    title: 'Proprietary AI',
                    desc: "Developed by top AI researchers from India's premier technical institutions.",
                  },
                  {
                    title: 'Early Warning System',
                    desc: 'Alerts you to potential health issues days or weeks before symptoms appear.',
                  },
                  {
                    title: 'Holistic Analysis',
                    desc: 'Considers all vital signs together, not in isolation, for comprehensive insights.',
                  },
                ].map((box, i) => (
                  <div key={i} className="bg-white/20 backdrop-blur-md p-6 rounded-xl">
                    <div className="font-bold text-xl mb-2">{box.title}</div>
                    <p className="text-white/90">{box.desc}</p>
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
