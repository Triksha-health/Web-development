
// import React from 'react';
// import { Check, X } from 'lucide-react';
// import Container from '../ui/Container';
// import SectionHeading from '../ui/SectionHeading';
// import trikshaLogo from '../../public/Triksha_logo.png';
// import appleLogo from '../../public/apple-logo.png';
// import whoopLogo from '../../public/whoop_logo.png';
// import ouraLogo from '../../public/ultra_human_logo.png';

// const Comparison: React.FC = () => {
//   const features = [
//     { name: "Predictive AI Health Alerts", triksha: true, apple: false, whoop: false, ultrahuman: false },
//     { name: "Chronic Disease Early Detection", triksha: true, apple: false, whoop: false, ultrahuman: false },
//     { name: "EHR Integration", triksha: true, apple: false, whoop: false, ultrahuman: false },
//     { name: "Health Book", triksha: true, apple: false, whoop: false, ultrahuman: false },
//     { name: "Real-time Health Monitoring", triksha: true, apple: true, whoop: true, ultrahuman: true },
//     { name: "AI-Powered Insights", triksha: true, apple: false, whoop: true, ultrahuman: true },
//     { name: "Family Emergency Alerts", triksha: true, apple: true, whoop: false, ultrahuman: false },
//     { name: "Personalized Health Recommendations", triksha: true, apple: false, whoop: true, ultrahuman: true },
//     { name: "Dedicated Health Community", triksha: true, apple: false, whoop: true, ultrahuman: false },
//   ];

//   const brands = [
//     { name: 'Triksha', logo: trikshaLogo },
//     { name: 'Apple Watch', logo: appleLogo },
//     { name: 'WHOOP', logo: whoopLogo },
//     { name: 'Ultrahuman', logo: ouraLogo },
//   ];

//   return (
//     <section id="whytriksha" className="py-24 relative overflow-hidden bg-white text-gray-800">
//       <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-slate-50 to-transparent"></div>
//       <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-100 rounded-full opacity-30 blur-3xl"></div>

//       <div className="relative z-10">
//         <Container>
//           <SectionHeading
//             title="Why Triksha is Different"
//             subtitle="See how Triksha compares to other popular health wearables in the market."
//           />

//           {/* Comparison Table */}
//           <div className="mt-12 overflow-x-auto">
//             <div className="min-w-[768px]">
//               {/* Table Header */}
//               <div className="grid grid-cols-5 gap-4 mb-4 min-w-[600px]">
//                 <div></div>

//                 {/* Triksha Header */}
//                 <div className="flex flex-col items-center">
//                   <div className="w-16 h-16 shadow-xl scale-110 border-2  bg-slate-100 rounded-full flex items-center justify-center mb-3 transition-transform duration-300 mt-4">
//                     <img src={trikshaLogo} alt="Triksha" className="object-contain h-14 w-14" />
//                   </div>
//                   <div className="font-bold text-center text-sm mb-4">Triksha</div>
//                 </div>

//                 {/* Other Brands */}
//                 {brands.slice(1).map((brand, idx) => (
//                   <div key={idx} className="flex flex-col items-center pt-4">
//                     <div className="w-16 h-16 border border-gray-300 bg-slate-100 rounded-full flex items-center justify-center mb-3">
//                       <img src={brand.logo} alt={brand.name} className="object-contain h-10 w-10" />
//                     </div>
//                     <div className="font-bold text-center text-sm mb-4">{brand.name}</div>
//                   </div>
//                 ))}
//               </div>

//               {/* Full Table with Aligned Triksha Column */}
//               <div className="grid grid-cols-5 gap-4">
//                 {/* Feature Names */}
//                 <div className="flex flex-col space-y-0">
//                   {features.map((feature, index) => (
//                     <div key={index} className={`font-medium flex items-center text-sm md:text-base px-4 min-h-[60px] ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
//                       {feature.name}
//                       {[0, 1, 2, 3].includes(index) && (
//                         <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
//                           Unique
//                         </span>
//                       )}
//                     </div>
//                   ))}
//                 </div>

//                 {/* Triksha Column - Continuous Wrapper */}
//                 <div className="flex flex-col w-full bg-white shadow-lg border border-gray-300 rounded-2xl overflow-hidden">
//                   {features.map((feature, index) => (
//                     <div
//                       key={index}
//                       className={`flex justify-center items-center px-4 min-h-[60px] w-full ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
//                     >
//                       {feature.triksha ? (
//                         <Check className="h-6 w-6 text-[#3691ff]" />
//                       ) : (
//                         <X className="h-6 w-6 text-slate-300" />
//                       )}
//                     </div>
//                   ))}
//                 </div>

//                 {/* Other Brands Columns */}
//                 {[1, 2, 3].map((brandIdx) => (
//                   <div key={brandIdx} className="flex flex-col space-y-0 w-full">
//                     {features.map((feature, index) => (
//                       <div
//                         key={index}
//                         className={`flex justify-center items-center px-4 min-h-[60px] w-full ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
//                       >
//                         {feature[brandIdx === 1 ? 'apple' : brandIdx === 2 ? 'whoop' : 'ultrahuman'] ? (
//                           <Check className="h-6 w-6 text-slate-600" />
//                         ) : (
//                           <X className="h-6 w-6 text-slate-300" />
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Triksha Difference Section */}
//           <div className="mt-16 bg-gradient-to-r from-teal-500 to-blue-600 rounded-2xl shadow-lg text-white">
//             <div className="p-6 md:p-12">
//               <h3 className="text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">The Triksha Difference</h3>
//               <p className="text-white/90 text-base md:text-lg mb-8 max-w-3xl mx-auto md:mx-0 text-center md:text-left">
//                 While other wearables track what's happening now, only Triksha uses advanced AI to predict what might happen in the future—giving you precious time to take preventive action.
//               </p>

//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {[
//                   { title: 'Proprietary AI', desc: "Developed by top AI researchers from India's premier technical institutions." },
//                   { title: 'Early Warning System', desc: 'Alerts you to potential health issues days or weeks before symptoms appear.' },
//                   { title: 'Holistic Analysis', desc: 'Considers all vital signs together, not in isolation, for comprehensive insights.' },
//                 ].map((box, i) => (
//                   <div key={i} className="bg-white/20 backdrop-blur-md p-6 rounded-xl text-center lg:text-left">
//                     <div className="font-bold text-xl mb-2">{box.title}</div>
//                     <p className="text-white/90 text-sm">{box.desc}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </Container>
//       </div>
//     </section>
//   );
// };

// export default Comparison;
import React from 'react';
import { Check, X } from 'lucide-react';
import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';
import trikshaLogo from '../../public/Triksha_logo.png';
import appleLogo from '../../public/apple-logo.png';
import whoopLogo from '../../public/whoop_logo.png';
import ouraLogo from '../../public/ultra_human_logo.png';

const Comparison: React.FC = () => {
  const features = [
    { name: "Predictive AI Health Alerts", triksha: true, apple: false, whoop: false, ultrahuman: false },
    { name: "Chronic Disease Early Detection", triksha: true, apple: false, whoop: false, ultrahuman: false },
    { name: "EHR Integration", triksha: true, apple: false, whoop: false, ultrahuman: false },
    { name: "Health Book", triksha: true, apple: false, whoop: false, ultrahuman: false },
    { name: "Real-time Health Monitoring", triksha: true, apple: true, whoop: true, ultrahuman: true },
    { name: "AI-Powered Insights", triksha: true, apple: false, whoop: true, ultrahuman: true },
    { name: "Family Emergency Alerts", triksha: true, apple: true, whoop: false, ultrahuman: false },
    { name: "Personalized Health Recommendations", triksha: true, apple: false, whoop: true, ultrahuman: true },
    { name: "Dedicated Health Community", triksha: true, apple: false, whoop: true, ultrahuman: false },
  ];

  const brands = [
    { name: 'Triksha', logo: trikshaLogo },
    { name: 'Apple Watch', logo: appleLogo },
    { name: 'WHOOP', logo: whoopLogo },
    { name: 'Ultrahuman', logo: ouraLogo },
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
          <div className="mt-12 overflow-x-auto">
            <div className="min-w-[768px]">

              {/* Table Header */}
              <div className="grid grid-cols-5 gap-0 mb-4 min-w-[600px]">
                <div></div>

                {/* Triksha Header */}
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 shadow-xl scale-110 border-2 bg-slate-100 rounded-full flex items-center justify-center mb-3 transition-transform duration-300 mt-4">
                    <img src={trikshaLogo} alt="Triksha" className="object-contain h-14 w-14" />
                  </div>
                  <div className="font-bold text-center text-sm mb-4">Triksha</div>
                </div>

                {/* Other Brands */}
                {brands.slice(1).map((brand, idx) => (
                  <div key={idx} className="flex flex-col items-center pt-4">
                    <div className="w-16 h-16 border border-gray-300 bg-slate-100 rounded-full flex items-center justify-center mb-3">
                      <img src={brand.logo} alt={brand.name} className="object-contain h-10 w-10" />
                    </div>
                    <div className="font-bold text-center text-sm mb-4">{brand.name}</div>
                  </div>
                ))}
              </div>

              {/* Full Table with Aligned Triksha Column */}
              <div className="grid grid-cols-5 gap-0">
                {/* Feature Names */}
                <div className="flex flex-col space-y-0">
                  {features.map((feature, index) => (
                    <div key={index} className={`font-medium flex items-center text-sm md:text-base px-4 min-h-[60px] ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                      {feature.name}
                      {[0, 1, 2, 3].includes(index) && (
                        <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Unique
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                {/* Triksha Column - Continuous Wrapper */}
                <div className="flex flex-col w-full bg-white shadow-lg border border-gray-300 rounded-2xl overflow-hidden">
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className={`flex justify-center items-center px-4 min-h-[60px] w-full ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                    >
                      {feature.triksha ? (
                        <Check className="h-6 w-6 text-[#3691ff]" />
                      ) : (
                        <X className="h-6 w-6 text-slate-300" />
                      )}
                    </div>
                  ))}
                </div>

                {/* Other Brands Columns */}
                {[1, 2, 3].map((brandIdx) => (
                  <div key={brandIdx} className="flex flex-col space-y-0 w-full">
                    {features.map((feature, index) => (
                      <div
                        key={index}
                        className={`flex justify-center items-center px-4 min-h-[60px] w-full ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                      >
                        {feature[brandIdx === 1 ? 'apple' : brandIdx === 2 ? 'whoop' : 'ultrahuman'] ? (
                          <Check className="h-6 w-6 text-slate-600" />
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

          {/* Triksha Difference Section */}
          <div className="mt-16 bg-gradient-to-r from-teal-500 to-blue-600 rounded-2xl shadow-lg text-white">
            <div className="p-6 md:p-12">
              <h3 className="text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">The Triksha Difference</h3>
              <p className="text-white/90 text-base md:text-lg mb-8 max-w-3xl mx-auto md:mx-0 text-center md:text-left">
                While other wearables track what's happening now, only Triksha uses advanced AI to predict what might happen in the future—giving you precious time to take preventive action.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { title: 'Proprietary AI', desc: "Developed by top AI researchers from India's premier technical institutions." },
                  { title: 'Early Warning System', desc: 'Alerts you to potential health issues days or weeks before symptoms appear.' },
                  { title: 'Holistic Analysis', desc: 'Considers all vital signs together, not in isolation, for comprehensive insights.' },
                ].map((box, i) => (
                  <div key={i} className="bg-white/20 backdrop-blur-md p-6 rounded-xl text-center lg:text-left">
                    <div className="font-bold text-xl mb-2">{box.title}</div>
                    <p className="text-white/90 text-sm">{box.desc}</p>
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
