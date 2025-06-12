
import React from 'react';
import { BarChart3, Brain, Smartphone, Zap } from 'lucide-react';
import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';
import Card from '../ui/Card';

const AboutSection: React.FC = () => {
  const steps = [
    {
      icon: <Smartphone className="h-8 w-8 text-teal-600" />,
      title: 'Wear Device',
      description: 'Comfortable, 24/7 wearable with medical-grade sensors tracks vital health metrics.',
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-blue-600" />,
      title: 'Stream Data',
      description: 'Seamlessly transmits real-time health data to our secure cloud platform.',
    },
    {
      icon: <Brain className="h-8 w-8 text-purple-600" />,
      title: 'AI Analysis',
      description: 'Our proprietary AI analyzes patterns and detects anomalies before symptoms appear.',
    },
    {
      icon: <Zap className="h-8 w-8 text-amber-600" />,
      title: 'Get Alerts',
      description: 'Receive timely notifications about potential health issues and preventive recommendations.',
    },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-white text-black">
      {/* Background decoration */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-slate-50 to-transparent"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-100 rounded-full opacity-30 blur-3xl"></div>

      <Container className="relative z-10">
        <SectionHeading 
          title="What is Triksha?"
          subtitle="Triksha is an AI-powered predictive health system for early detection of chronic diseases like diabetes, heart issues, and respiratory problems."
        />

        <div className="relative mt-16">
          <div className="absolute hidden md:block top-24 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500 z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <Card hoverable className="h-full p-6 flex flex-col items-center text-center">
                  <div className="relative mb-6">
                    <div className="absolute -top-3 -right-3 w-6 h-6 bg-[#3691ff] text-white rounded-full flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </div>

                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                      {step.icon}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-slate-600">{step.description}</p>
                </Card>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20">
          <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-2xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
              <div className="md:w-1/2">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">Pioneering Preventive Healthcare</h3>
                <p className="text-slate-600 mb-6">
                  Traditional healthcare is reactive—it treats problems after they arise. Triksha revolutionizes this approach by predicting potential health issues days, weeks, or even months before symptoms appear.
                </p>
                <p className="text-slate-600">
                  By combining cutting-edge wearable technology with our proprietary AI algorithms, we enable you to take preventive action early, potentially avoiding serious health complications altogether.
                </p>
              </div>

              <div className="md:w-1/2">
                <div className="relative rounded-xl overflow-hidden">
                  <img 
                    src="https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                    alt="Doctor analyzing health data" 
                    className="w-full h-auto rounded-xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <div className="p-6 text-white">
                      <div className="text-sm font-medium mb-1">AI-Driven Insights</div>
                      <div className="text-xs opacity-80">Transforming healthcare through predictive analytics</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default AboutSection;
