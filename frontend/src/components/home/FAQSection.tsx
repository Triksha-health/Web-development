

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
        className={`flex justify-between items-center w-full py-5 text-left font-semibold text-lg transition-colors duration-300 ${
          isOpen ? "text-[#3691ff]" : "text-slate-800"
        }`}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span>{question}</span>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-[#3691ff] flex-shrink-0 transition-transform duration-300 rotate-180" />
        ) : (
          <ChevronDown className="h-5 w-5 text-slate-500 flex-shrink-0 transition-transform duration-300" />
        )}
      </button>

      <div
        className={`transition-max-height duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        <div className="pb-5 text-slate-600 space-y-3">{answer}</div>
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
            Unlike typical fitness trackers that simply monitor your current health metrics, Triksha uses advanced AI algorithms to analyze patterns and predict potential health issues before symptoms appear.
          </p>
          <p>
            Our technology is specifically designed to detect early signs of chronic diseases like diabetes, heart conditions, and respiratory problems, giving you valuable time to take preventive action.
          </p>
        </>
      )
    },
    {
      question: "When will I receive my Triksha device?",
      answer: (
        <>
          <p>
            Shipping begins in November 2025, with exact delivery timeframes depending on your pre-order tier:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Early Bird tier: Within 30 days of shipping start (by early December 2025)</li>
            <li>Standard tier: Within 45 days of shipping start (by mid-December 2025)</li>
          </ul>
          <p className="mt-2">
            We'll keep you updated with regular production and shipping updates via email.
          </p>
        </>
      )
    },
    {
      question: "What data does Triksha collect?",
      answer: (
        <>
          <p>Triksha collects a range of physiological data including:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Heart rate and heart rate variability</li>
            <li>Blood oxygen levels</li>
            <li>Respiratory rate</li>
            <li>Skin temperature</li>
            <li>Activity and sleep patterns</li>
            <li>Optional: blood glucose levels (with compatible third-party devices)</li>
          </ul>
          <p className="mt-2">
            This data is analyzed to identify patterns and potential early warning signs of health issues.
          </p>
        </>
      )
    },
    {
      question: "Is my health data secure?",
      answer: (
        <>
          <p>Absolutely. We take data security and privacy extremely seriously:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>All data is encrypted both in transit and at rest using industry-standard encryption</li>
            <li>We comply with HIPAA and GDPR regulations</li>
            <li>You maintain full ownership of your data and can delete it at any time</li>
            <li>We never sell your personal data to third parties</li>
            <li>You control exactly what data is shared with healthcare providers or family members</li>
          </ul>
        </>
      )
    },
    {
      question: "How accurate are Triksha's health predictions?",
      answer: (
        <>
          <p>Triksha's AI models have been trained on extensive medical datasets and validated through clinical studies. Our current accuracy rates:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Cardiac anomaly detection: 92% accuracy compared to clinical tests</li>
            <li>Pre-diabetic state detection: 87% accuracy with 3-week advance warning</li>
            <li>Respiratory issue prediction: 89% accuracy with 5–10 day advance warning</li>
          </ul>
          <p className="mt-2">
            Our technology continues to improve as our AI learns from more data and user feedback.
          </p>
        </>
      )
    },
    {
      question: "Is there a subscription fee?",
      answer: (
        <>
          <p>Your Triksha purchase includes a complimentary subscription period:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Early Bird tier: 12-month premium subscription included</li>
            <li>Standard tier: 6-month premium subscription included</li>
          </ul>
          <p className="mt-2">
            After this period, you can continue with a premium subscription (₹999/month or ₹9,999/year) or downgrade to our basic plan with core functionality at no cost.
          </p>
        </>
      )
    },
    {
      question: "What if I need to return my Triksha device?",
      answer: (
        <>
          <p>
            We offer a 30-day satisfaction guarantee. If you're not completely satisfied with your Triksha device, you can return it within 30 days of receipt for a full refund.
          </p>
          <p className="mt-2">
            Additionally, all Triksha devices come with a 1-year warranty against manufacturing defects.
          </p>
        </>
      )
    },
    {
      question: "Can Triksha replace medical devices or doctor visits?",
      answer: (
        <>
          <p>
            No, Triksha is not intended to replace medical devices prescribed by your doctor or regular check-ups. It complements traditional healthcare with predictive insights.
          </p>
          <p className="mt-2">
            Always consult healthcare professionals for diagnosis and treatment.
          </p>
        </>
      )
    }
  ];

  return (
    <section id="faq" className="bg-white py-24 relative overflow-hidden w-full">
      {/* Decorative blob */}
      <div className="absolute -top-20 -right-20 w-72 h-72 bg-gradient-to-br from-purple-300 via-indigo-200 to-transparent rounded-full opacity-50 blur-3xl"></div>

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
          <div className="font-semibold text-lg mb-2">Still have questions?</div>
          <p className="text-slate-500 max-w-xl mx-auto leading-relaxed mb-6">
            Our team is ready to help you with any questions you might have about Triksha.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:support@triksha.com"
              className="flex items-center px-5 py-2.5 bg-white rounded-[10px] shadow-md text-slate-700 hover:bg-indigo-50 hover:text-[#3691ff] transition"
            >
              📧 support@triksha.com
            </a>
            <a
              href="tel:+918001234567"
              className="flex items-center px-5 py-2.5 bg-white rounded-[10px] shadow-md text-slate-700 hover:bg-indigo-50 hover:text-[#3691ff] transition"
            >
              📞 +91 800 123 4567
            </a>
            <a
              href="https://wa.me/918001234567"
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
