import React, { useState, useEffect } from 'react';
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
  const [faqs, setFaqs] = useState<FAQItemProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await fetch('/api/faq'); // your backend API
        const data = await response.json();

        const formattedFaqs = data.map((faq: { question: string; answer: string }) => ({
          question: faq.question,
          answer: <p>{faq.answer}</p>, // wrap plain text answer in <p>
        }));

        setFaqs(formattedFaqs);
      } catch (error) {
        console.error('Error fetching FAQs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFaqs();
  }, []);

  if (loading) {
    return (
      <section id="faq" className="bg-gray-50 py-24 relative overflow-hidden w-full">
        <Container className="relative z-10 text-center">
          <SectionHeading title="Frequently Asked Questions" subtitle="" />
          <p className="text-slate-500 mt-8">Loading FAQs...</p>
        </Container>
      </section>
    );
  }

  if (faqs.length === 0) {
    return (
      <section id="faq" className="bg-gray-50 py-24 relative overflow-hidden w-full">
        <Container className="relative z-10 text-center">
          <SectionHeading title="Frequently Asked Questions" subtitle="" />
          <p className="text-slate-500 mt-8">No FAQs available right now. Please check back later.</p>
        </Container>
      </section>
    );
  }

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
