import React, { useState } from "react";
import { Plus, Minus, Mail, Phone, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Container from "../ui/Container";

interface FAQItemProps {
  question: string;
  answer: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onToggle }) => {
  return (
    <div className="border-b border-[rgba(22,25,29,0.10)] last:border-0">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-start justify-between gap-6 py-6 text-left"
      >
        <span
          className={`text-lg md:text-xl font-medium tracking-tight leading-snug transition-colors ${
            isOpen ? "text-ink-900" : "text-ink-800"
          }`}
        >
          {question}
        </span>
        <span
          className={`mt-1 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            isOpen
              ? "bg-accent-500 text-white rotate-180"
              : "bg-canvas-soft text-ink-700 ring-1 ring-[rgba(22,25,29,0.10)]"
          }`}
        >
          {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-6 pr-12 leading-relaxed text-[15px]" style={{ color: "rgba(22,25,29,0.62)" }}>
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How is Triksha different from other health wearables?",
      answer: (
        <p>
          Triksha is an AI-powered predictive health monitoring system, not just a tracker. The
          wearable captures 24/7 vitals; the heavy lifting happens securely in our app and cloud,
          where models analyze your data, history and trends to predict potential issues before
          they become serious.
        </p>
      ),
    },
    {
      question: "When will I receive my Triksha device?",
      answer: (
        <p>
          Pre-order shipping begins January 1. You'll receive tracking via email once dispatched.
          Delivery times vary by location.
        </p>
      ),
    },
    {
      question: "What data does Triksha collect?",
      answer: (
        <p>
          Heart rate, stress, sleep quality, and other vital signs. Data is used to deliver
          personalized insights and predictions to help you stay proactive about your wellbeing.
        </p>
      ),
    },
    {
      question: "Is my health data secure?",
      answer: (
        <p>
          Absolutely. Your data is encrypted at rest and in transit, and we follow best practices
          to keep it private. We will never sell your data.
        </p>
      ),
    },
    {
      question: "How accurate are Triksha's predictions?",
      answer: (
        <p>
          Triksha uses a proprietary model trained on large datasets to deliver high-accuracy
          predictions. It is not a replacement for medical diagnosis — it helps you catch potential
          issues early so you can consult a doctor in time.
        </p>
      ),
    },
    {
      question: "Is there a subscription fee?",
      answer: (
        <>
          <p>Yes. Triksha is a subscription combining the wearable and the app:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>6-month plan — ₹10,999</li>
            <li>12-month plan — ₹17,999</li>
          </ul>
          <p className="mt-3">
            Subscriptions include the wearable and unlimited access to the predictive monitoring
            app. No hidden charges.
          </p>
        </>
      ),
    },
    {
      question: "What if I need to return my device?",
      answer: (
        <p>
          We offer hassle-free returns within 30 days of delivery. Contact our support team to
          start the process.
        </p>
      ),
    },
    {
      question: "Can Triksha replace doctor visits?",
      answer: (
        <p>
          No. Triksha is not a medical device and does not diagnose or treat. It surfaces early
          warning signs so you can consult a qualified provider when needed.
        </p>
      ),
    },
  ];

  return (
    <section id="faq" className="relative py-32 bg-canvas overflow-hidden">
      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <h2 className="text-display text-ink-900 tracking-tighter">Questions, answered.</h2>
          <p className="mt-5 text-lg md:text-xl leading-relaxed" style={{ color: "rgba(22,25,29,0.62)" }}>
            Everything you need to know about Triksha and the upcoming pilot.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-10 mt-14">
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="rounded-4xl bg-canvas-paper ring-1 ring-[rgba(22,25,29,0.10)] shadow-soft px-8 md:px-10 py-4"
            >
              {faqs.map((faq, i) => (
                <FAQItem
                  key={i}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openIndex === i}
                  onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                />
              ))}
            </motion.div>
          </div>

          <aside className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="rounded-4xl bg-canvas-soft ring-1 ring-[rgba(22,25,29,0.10)] p-8 sticky top-28"
            >
              <div className="text-eyebrow uppercase mb-3" style={{ color: "rgba(22,25,29,0.40)" }}>
                Still have questions
              </div>
              <h3 className="text-xl font-semibold text-ink-900 tracking-tight">
                Talk to a human.
              </h3>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: "rgba(22,25,29,0.62)" }}>
                Our team is ready to help you with anything Triksha-related.
              </p>

              <div className="mt-6 space-y-3">
                <a
                  href="mailto:support@trikshahealth.com"
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-canvas-paper ring-1 ring-[rgba(22,25,29,0.10)] hover:ring-accent-500/60 transition"
                >
                  <Mail className="w-4 h-4 text-ink-700" />
                  <span className="text-sm text-ink-800">support@trikshahealth.com</span>
                </a>
                <a
                  href="tel:+917899940382"
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-canvas-paper ring-1 ring-[rgba(22,25,29,0.10)] hover:ring-accent-500/60 transition"
                >
                  <Phone className="w-4 h-4 text-ink-700" />
                  <span className="text-sm text-ink-800">+91 (789) 994-0382</span>
                </a>
                <a
                  href="https://wa.me/917899940382"
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-canvas-paper ring-1 ring-[rgba(22,25,29,0.10)] hover:ring-accent-500/60 transition"
                >
                  <MessageCircle className="w-4 h-4 text-ink-700" />
                  <span className="text-sm text-ink-800">WhatsApp support</span>
                </a>
              </div>
            </motion.div>
          </aside>
        </div>
      </Container>
    </section>
  );
};

export default FAQ;
