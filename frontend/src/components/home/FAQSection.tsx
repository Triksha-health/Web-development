import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';

interface FAQItemProps {
  question: string;
  answer: React.ReactNode;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="border-b border-slate-200 last:border-0 transition-all duration-300">
      <button
        className={`flex justify-between items-center w-full py-5 text-left font-semibold text-xl tracking-wide transition-colors duration-300 ${
          isOpen ? '' : 'text-slate-600'
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
          isOpen ? 'max-h-screen' : 'max-h-0'
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
  const faqs: FAQItemProps[] = [
    {
      question: "How is Triksha different from other health wearables?",
      answer: (
        <p>
          Triksha is not an ordinary tracking wearable device—it’s an AI-powered predictive health monitoring system. The wearable itself is designed to collect your 24/7 real-time health data accurately and comfortably. All the heavy AI analysis happens securely in our app and cloud, where advanced models analyze your data, medical history, and trends to predict potential health issues before they become serious. This ensures you get personalized, actionable health insights wherever you are.
        </p>
      ),
    },
    {
      question: "When will I receive my Triksha device?",
      answer: (
        <p>
          Shipping for pre-orders begins on January 1st. Once shipped, you will receive tracking information via email. Delivery times may vary depending on your location.
        </p>
      ),
    },
    {
      question: "What data does Triksha collect?",
      answer: (
        <p>
          Triksha collects real-time health metrics like heart rate, stress levels, sleep quality, and other vital signs. This data is used to provide personalized health insights and predictions to help you stay proactive about your well-being.
        </p>
      ),
    },
    {
      question: "Is my health data secure?",
      answer: (
        <p>
          Absolutely. Your data is encrypted and stored securely. We follow best practices to ensure your personal health information remains private and confidential. We will never sell your data to third parties.
        </p>
      ),
    },
    {
      question: "How accurate are Triksha's health predictions?",
      answer: (
        <p>
          Triksha uses a proprietary AI model trained on large datasets to deliver highly accurate predictions. While no wearable can replace a medical diagnosis, Triksha is designed to help you catch potential issues early so you can consult a healthcare professional in time.
        </p>
      ),
    },
    {
      question: "Is there a subscription fee?",
      answer: (
        <>
          <p>Yes. Triksha is offered as a subscription service that combines both the wearable device and the app experience. We have two simple plans:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>6-month plan at ₹10,999</li>
            <li>12-month plan at ₹17,999</li>
          </ul>
          <p className="mt-2">
            Your subscription covers the Triksha wearable (delivered to you) and unlimited access to our AI-powered predictive health monitoring app. There are no hidden charges—just choose your plan and get everything you need for proactive, personalized health insights.
          </p>
        </>
      ),
    },
    {
      question: "What if I need to return my Triksha device?",
      answer: (
        <p>
          We offer a hassle-free return policy within 30 days of delivery. If you're not satisfied with your purchase, please contact our support team to initiate the return process.
        </p>
      ),
    },
    {
      question: "Can Triksha replace medical devices or doctor visits?",
      answer: (
        <p>
          No, Triksha is not a medical device and is not intended to diagnose or treat conditions. It is designed to help you track your health and spot early warning signs to find unnoticed existing health issues or upcoming future health risks, so you can consult a qualified healthcare provider if needed.
        </p>
      ),
    },
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
