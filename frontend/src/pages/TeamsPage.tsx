import Container from "../components/ui/Container";
import { useEffect } from "react";
// import SectionHeading from "../components/ui/SectionHeading";
import { Check } from "lucide-react";
import familylaptop from "../public/familylaptop.jpg";
import TeamSection from "../components/ui/TeamSection";
import yash from "../public/yash.jpg";
import pulkishore from "../public/puli kishore1.jpg";
import SectionHeading from "../components/ui/SectionHeading";
import { Link } from "react-router-dom";

const TeamsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const team = [
    {
      name: "Vemuri Yashwanth",
      role: "Founder & CEO",
      image: yash,
      bio: "NIT AP student passionate about building AI-powered predictive health systems. Leading Triksha to enable early detection of chronic diseases and empower proactive healthcare.",
      linkedin: "http://www.linkedin.com/in/vemuri-yashwanth-b39189254",
      twitter: "#",
      github: "https://github.com/janedoe",
    },
    {
      name: "Dr.Puli Kishore Kumar",
      role: "Advisor",
      bio: "Assistant Professor at NIT Andhra Pradesh and signal processing researcher with a PhD from NIT Warangal, focused on ultra-wideband radar imaging, compressive sensing.",
      image: pulkishore ,
      github: "",
      linkedin: "https://www.linkedin.com/in/dr-puli-kishore-kumar-70948a48",
      twitter: "",
    },
  ];
  return (
    <div className="min-h-screen py-12 sm:px-6 lg:px-8 bg-canvas">
      <div className="mb-12 mt-14 flex justify-center">
        <SectionHeading
          centered
          title="Meet our team"
          subtitle="We're a team of doctors, engineers, and health enthusiasts united by a single mission: using technology to prevent chronic disease before it happens."
        />
      </div>
      <TeamSection team={team} />
      <Container className="relative z-10 mt-16">
        <div className={` px-8 py-10 sm:px-6 lg:px-8 bg-canvas-soft ring-1 ring-[rgba(22,25,29,0.10)] rounded-4xl`}>
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Left Content */}
              <div className="space-y-8">
                <div>
                  <div className="flex">
                    <p className="text-accent-700 font-medium mb-2 bg-accent-50 px-2.5 py-0.5 rounded-full">Our Culture</p>
                  </div>
                  <h2 className="text-4xl font-bold text-ink-900 tracking-tighter mb-6">Driven by Purpose</h2>
                  <p className="text-lg leading-relaxed mb-8" style={{ color: "rgba(22,25,29,0.62)" }}>
                    Our team combines technical brilliance with deep empathy. Many of us have personal experiences with
                    the consequences of delayed medical diagnoses, fueling our passion to create technology that
                    prevents suffering.
                  </p>
                </div>

                {/* Values List */}
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center mt-1">
                      <Check className="w-4 h-4 text-primary-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-ink-900 mb-1">Innovation-Focused</h3>
                      <p style={{ color: "rgba(22,25,29,0.62)" }}>We embrace cutting-edge technologies and approaches</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center mt-1">
                      <Check className="w-4 h-4 text-primary-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-ink-900 mb-1">User-Centered</h3>
                      <p style={{ color: "rgba(22,25,29,0.62)" }}>Every decision is made with our users' wellbeing in mind</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center mt-1">
                      <Check className="w-4 h-4 text-primary-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-ink-900 mb-1">Ethical AI Development</h3>
                      <p style={{ color: "rgba(22,25,29,0.62)" }}>Committed to responsible, transparent AI practices</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Content */}
              <div className="bg-canvas-paper rounded-4xl ring-1 ring-[rgba(22,25,29,0.10)] shadow-soft overflow-hidden">
                {/* Team Image Placeholder */}
                <div className="overflow-hidden h-[300px]">
                  <img src={familylaptop} alt="family" className="w-full h-full object-cover" />
                </div>

                <div className="space-y-4 p-8">
                  <h3 className="text-2xl font-bold text-ink-900 tracking-tight">Join Our Mission</h3>
                  <p className="leading-relaxed" style={{ color: "rgba(22,25,29,0.62)" }}>
                    We're always looking for passionate individuals who share our vision of revolutionizing preventive
                    healthcare through technology.
                  </p>
                  <Link
                    to="/careers"
                    className="inline-flex items-center text-accent-700 font-medium hover:text-accent-600 transition-colors"
                  >
                    See open roles →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default TeamsPage;
