import React from "react";
import "./App.css";

function App() {
  return (
    <div className="container">
      {/* Feature Cards */}
      <div className="features">
        <Feature icon="🔒" title="Medical-Grade Privacy" desc="HIPAA-compliant data protection with end-to-end encryption" />
        <Feature icon="📊" title="Data Ownership" desc="You control your health data and who can access it" />
        <Feature icon="💳" title="Secure Checkout" desc="PCI DSS compliant payment processing" />
        <Feature icon="✅" title="Quality Assurance" desc="ISO 13485 certified medical device manufacturing" />
      </div>

      {/* Testimonials */}
      <h2 className="section-title">What Early Users Are Saying</h2>
      <div className="testimonials">
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

      {/* Footer */}
      <div className="footer">
        <p className="badge">Expert Verified</p>
        <h3>Backed by Medical Professionals</h3>
        <p className="collab">
          Triksha's technology has been developed in collaboration with leading doctors and researchers from prestigious institutions across India.
        </p>
        <div className="logos">
          <span>AIIMS</span>
          <span>Apollo Hospitals</span>
          <span>Medanta</span>
          <span>Narayana Health</span>
          <span>Fortis</span>
        </div>
      </div>
    </div>
  );
}

function Feature({ icon, title, desc }) {
  return (
    <div className="feature-card">
      <div className="icon">{icon}</div>
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  );
}

function Testimonial({ stars, text, user, title }) {
  return (
    <div className="testimonial-card">
      <p className="stars">{"★".repeat(stars)}</p>
      <p className="text">"{text}"</p>
      <div className="user">
        <p><strong>{user}</strong></p>
        <p className="title">{title}</p>
      </div>
    </div>
  );
}

export default App;
