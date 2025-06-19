import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Feature: React.FC<{ icon: string; title: string; desc: string }> = ({
  icon,
  title,
  desc,
}) => (
  <div className="bg-white shadow-md p-6 rounded-lg text-center w-full sm:w-1/2 lg:w-1/4">
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{desc}</p>
  </div>
);

const Testimonial: React.FC<{
  stars: number;
  text: string;
  user: string;
  title: string;
}> = ({ stars, text, user, title }) => (
  <div className="bg-white shadow-md p-6 rounded-xl space-y-2">
    <p className="text-yellow-400 text-lg">{"★".repeat(stars)}</p>
    <p className="italic text-gray-700">"{text}"</p>
    <div>
      <p className="text-blue-600 font-semibold">{user}</p>
      <p className="text-sm text-gray-500">{title}</p>
    </div>
  </div>
);

const Home: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-16">
      {/* Features */}
      <div className="flex flex-wrap justify-center gap-6">
        <Feature
          icon="🔒"
          title="Medical-Grade Privacy"
          desc="HIPAA-compliant data protection with end-to-end encryption"
        />
        <Feature
          icon="📊"
          title="Data Ownership"
          desc="You control your health data and who can access it"
        />
        <Feature
          icon="💳"
          title="Secure Checkout"
          desc="PCI DSS compliant payment processing"
        />
        <Feature
          icon="✅"
          title="Quality Assurance"
          desc="ISO 13485 certified medical device manufacturing"
        />
      </div>

      {/* Testimonials */}
      <div>
        <h2 className="text-2xl font-bold mb-6 text-center">
          What Early Users Are Saying
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Testimonial
            stars={5}
            text="After a lifetime of trying to manage my diabetes, Triksha has changed everything. The early warnings have helped me avoid three serious health episodes in just six months."
            user="Rajiv K."
            title="Early Tester, Age 58"
          />
          <Testimonial
            stars={5}
            text="As someone with a family history of heart disease, Triksha gives me peace of mind. The predictive alerts helped me identify a potential issue months before my regular checkup would have caught it."
            user="Anika S."
            title="Beta Participant, Age 42"
          />
          <Testimonial
            stars={5}
            text="We deployed Triksha in our corporate wellness program and saw a 37% reduction in health-related time off. It’s fantastic and a significant boost in employee wellbeing scores."
            user="Vikram M."
            title="HR Director, Fortune 500 Company"
          />
        </div>
      </div>

      {/* Footer */}
      <div className="text-center border-t pt-8">
        <p className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm mb-2">
          Expert Verified
        </p>
        <h3 className="text-lg font-semibold">
          Backed by Medical Professionals
        </h3>
        <p className="text-gray-600 max-w-xl mx-auto mt-2">
          Triksha's technology has been developed in collaboration with leading
          doctors and researchers from prestigious institutions across India.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-4 text-sm text-gray-700">
          <span>AIIMS</span>
          <span>Apollo Hospitals</span>
          <span>Medanta</span>
          <span>Narayana Health</span>
          <span>Fortis</span>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Add more routes here as needed */}
      </Routes>
    </Router>
  );
};

export default App;
