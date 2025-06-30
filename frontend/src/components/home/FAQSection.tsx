import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';

interface FAQItemProps {
  question: string;
  answer: React.ReactNode;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-200 last:border-0 transition-all duration-300">
      <button
        className={`flex justify-between items-center w-full py-5 text-left font-semibold text-xl tracking-wide transition-colors duration-300 ${
          isOpen ? "" : "text-slate-600"
        }`}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span>{question}</span>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 flex-shrink-0 transition-transform duration-300 rotate-180" />
        ) : (
          <ChevronDown className="h-5 w-5 text-slate-500 flex-shrink-0 transition-transform duration-300" />
        )}
      </button>

      <div
        className={`transition-max-height duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        <div className="pb-5 text-slate-600 space-y-3 leading-relaxed text-base">
          {answer}
        </div>
      </div>
    </div>
  );
};

const FAQ: React.FC = () => {
  const faqs = [
    {
      question: "How is Triksha different from other health wearables?",
      answer: (
        <>
          <p>
            <strong>Triksha</strong> is not an ordinary tracking wearable device—it’s an <strong>AI-powered predictive health monitoring system</strong>. The wearable collects your real-time health data 24/7, while the AI in our app and cloud analyzes your metrics, history, and trends to <strong>predict potential health issues before they become serious</strong>.
          </p>
          <p>
            This ensures <strong>personalized, actionable health insights</strong>—anytime, anywhere.
          </p>
        </>
      )
    },
    {
      question: "When will I receive my Triksha device?",
      answer: (
        <>
          <p>
            <strong>Shipping for pre-orders begins on January 1st.</strong> Once your order is shipped, tracking details will be sent to your email.
          </p>
          <p>
            Delivery time may vary based on your location.
          </p>
        </>
      )
    },
    {
      question: "What data does Triksha collect?",
      answer: (
        <>
          <p><strong>Triksha collects:</strong> heart rate, stress levels, sleep quality, and other vital signs in real time.</p>
          <p>This data is used to generate <strong>personalized insights and predictions</strong> that help you stay proactive about your well-being.</p>
        </>
      )
    },
    {
      question: "Is my health data secure?",
      answer: (
        <>
          <p><strong>Yes, your data is fully secure.</strong></p>
          <p>We use <strong>encryption</strong> and follow strict privacy practices. Your health data will <strong>never be sold</strong> to third parties.</p>
        </>
      )
    },
    {
      question: "How accurate are Triksha's health predictions?",
      answer: (
        <>
          <p>Triksha uses a <strong>proprietary AI model</strong> trained on large medical datasets for high prediction accuracy.</p>
          <p>While it doesn't replace medical diagnosis, it helps you catch issues early and consult doctors in time.</p>
        </>
      )
    },
    {
      question: "Is there a subscription fee?",
      answer: (
        <>
          <p><strong>Yes.</strong> Triksha is a subscription service that combines the wearable device and our AI-powered health monitoring app.</p>
          <p>Pricing is ₹2000/month. We offer discounted plans:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>6-month plan:</strong> ₹10,999 (≈₹1830/month)</li>
            <li><strong>12-month plan:</strong> ₹17,999 (≈₹1500/month)</li>
          </ul>
          <p className="mt-2"><strong>Early Bird Offer:</strong> Get 12 months for just ₹14,999!</p>
        </>
      )
    },
    {
      question: "What if I need to return my Triksha device?",
      answer: (
        <>
          <p>We offer a <strong>30-day hassle-free return policy</strong>. If you're not satisfied, contact our support team to initiate the return.</p>
        </>
      )
    },
    {
      question: "Can Triksha replace medical devices or doctor visits?",
      answer: (
        <>
          <p><strong>No.</strong> Triksha is not a medical device and is not intended to diagnose or treat medical conditions.</p>
          <p>It is designed to <strong>detect early signs of health risks</strong> and complement regular healthcare.</p>
        </>
      )
    }
  ];

  return (
    <section id="faq" className="bg-gray-50 py-24 relative overflow-hidden w-full">
      <Container className="relative z-10">
        <SectionHeading
          title="Frequently Asked Questions"
          subtitle="Find answers to common questions about Triksha and our pre-order process."
        />

        <div className="max-w-3xl mx-auto mt-12 bg-white rounded-3xl shadow-xl ring-1 ring-slate-100 overflow-hidden">
          <div className="p-8">
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="font-semibold text-xl mb-2">Still have questions?</div>
          <p className="text-slate-500 max-w-xl mx-auto leading-relaxed mb-6">
            Our team is ready to help you with any questions you might have about Triksha.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:support@trikshahealth.com"
              className="flex items-center px-5 py-2.5 bg-white rounded-[10px] shadow-md text-slate-700 hover:bg-indigo-50 hover:text-[#3691ff] transition"
            >
              📧 support@trikshahealth.com
            </a>
            <a
              href="tel:+917899940382"
              className="flex items-center px-5 py-2.5 bg-white rounded-[10px] shadow-md text-slate-700 hover:bg-indigo-50 hover:text-[#3691ff] transition"
            >
              📞 +91 (789) 994-0382 
            </a>
            <a
              href="https://wa.me/917899940382"
              className="flex items-center px-5 py-2.5 bg-white rounded-[10px] shadow-md text-slate-700 hover:bg-indigo-50 hover:text-[#3691ff] transition"
            >
              💬 WhatsApp Support
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default FAQ;
