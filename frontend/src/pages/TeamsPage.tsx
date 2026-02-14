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
      name: "Vemuri Toshan Yashwanth",
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
    <div className="min-h-screen py-12 sm:px-6 lg:px-8 bg-[#f9fafc]">
      <div className={`mb-12 text-center mt-14`}>
        <div className="flex gap-2 justify-center">
          <SectionHeading
            title="Meet our team"
            subtitle=" We're a team of doctors, engineers, and health enthusiasts united by a single mission: using technology to
          prevent chronic disease before it happens."
          />
        </div>
      </div>
      <TeamSection team={team} />
      <Container className="relative z-10 mt-16">
        <div className={` px-8 py-10 sm:px-6 lg:px-8 bg-primary-50  rounded-2xl`}>
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Left Content */}
              <div className="space-y-8">
                <div>
                  <div className="flex">
                    <p className="text-primary-500 font-medium mb-2 bg-primary-100 px-2 rounded-full">Our Culture</p>
                  </div>
                  <h2 className="text-4xl font-bold text-gray-900 mb-6">Driven by Purpose</h2>
                  <p className="text-gray-600 text-lg leading-relaxed mb-8">
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
                      <h3 className="font-semibold text-gray-900 mb-1">Innovation-Focused</h3>
                      <p className="text-gray-600">We embrace cutting-edge technologies and approaches</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center mt-1">
                      <Check className="w-4 h-4 text-primary-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">User-Centered</h3>
                      <p className="text-gray-600">Every decision is made with our users' wellbeing in mind</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center mt-1">
                      <Check className="w-4 h-4 text-primary-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Ethical AI Development</h3>
                      <p className="text-gray-600">Committed to responsible, transparent AI practices</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Content */}
              <div className="bg-white rounded-2xl shadow-lg">
                {/* Team Image Placeholder */}
                <div className=" rounded-t-xl overflow-hidden h-[300px]">
                  <img src={familylaptop} alt="family" className=" object-contain" />
                </div>

                <div className="space-y-4 p-8">
                  <h3 className="text-2xl font-bold text-gray-900">Join Our Mission</h3>
                  <p className="text-gray-600 leading-relaxed">
                    We're always looking for passionate individuals who share our vision of revolutionizing preventive
                    healthcare through technology.
                  </p>
                  <Link
                    to="/applyjob"
                    className="inline-flex items-center text-primary-500 font-medium hover:text-primary-700 transition-colors"
                  >
                    Join our team →
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
