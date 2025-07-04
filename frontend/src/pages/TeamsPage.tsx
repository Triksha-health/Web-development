import Container from "../components/ui/Container";
import { useEffect } from "react";
// import SectionHeading from "../components/ui/SectionHeading";
import { Check } from "lucide-react";
import familylaptop from "../public/familylaptop.jpg";
import TeamSection from "../components/ui/TeamSection";
import rohan from "../public/rohan.jpg";
import rajat from "../public/rajat.jpg";
import ankur from "../public/ankur.jpg";
import shubranvi from "../public/shubranvi.jpg";
import sudhamayye from "../public/sudhamayye.jpg";
import swaraj from "../public/swarajzore.jpg";
import ayush from "../public/hecker.jpg";
import vaish from "../public/vaishnavireddy.jpg";
import vrinda from "../public/vrinda.jpg";
import sachin from "../public/sachin.jpg";
import saurabh from "../public/saurabh.jpg";
import yash from "../public/yash.jpg";
import ujjwal from "../public/ujjwal.jpg";
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
      name: "Ujjwal Rathore",
      role: "AI Engineer",
      bio: "IIIT Guwahati student who specialises in AI and machine learning. Passionate about using technology to improve healthcare outcomes.",
      image: ujjwal,
      github: "https://github.com/ujjwal19rathore218",
      linkedin: "https://www.linkedin.com/in/ujjwal-rathore-40004a25b",
      twitter: "",
    },
    {
      name: "Swaraj Zore",
      role: "AI Engineer",
      bio: "Fueling innovation with ML brilliance—Athatva College of Engineering's data-driven trailblazer shaping smarter solutions.",
      image: swaraj,
      github: "https://github.com/SwarajZore",
      twitter: "",
      linkedin: "https://www.linkedin.com/in/swaraj-zore-48957a2ba",
    },
    {
      name: "Sachin Kumar",
      role: "AI Engineer",
      bio: "Shaping tomorrow with creativity and code—IIT Varanasi’s GenAI enthusiast driving the frontier of intelligent innovation.",
      image: sachin,
      github: "https://github.com/KumarSachin-DS",
      linkedin: "https://www.linkedin.com/in/sachin-kumar-22188b1ba",
      twitter: "",
    },
    {
      name: "Shubhranvi Kapare",
      role: "AI Engineer",
      bio: "Driving intelligent breakthroughs—AI Engineer from Pimpri Chinchwad College of Engineering, crafting the future with smart tech.",
      image: shubranvi,
      github: "https://www.linkedin.com/in/shubhranvi-kapare-7463b2291",
      linkedin: "https://www.linkedin.com/in/shubhranvi-kapare-7463b2291",
      twitter: "",
    },
    {
      name: "Rajat Sharma",
      role: "Computer Vision Engineer",
      bio: "Innovating at every layer—MBM Jodhpur’s multifaceted techie blending AI, code, and creative design into future-ready solutions.",
      image: rajat,
      github: "https://github.com/Rajat-Shrma",
      linkedin: "https://www.linkedin.com/in/rajat-749384290",
      twitter: "",
    },
    {
      name: "Ayush",
      role: "Computer Vision Engineer",
      bio: "Merging vision with intelligence—IIIT Guwahati's ML & CV engineer crafting next-gen tech that sees and understands the world.",
      image: ayush,
      github: "https://github.com/Ayush21CSR",
      linkedin: "https://www.linkedin.com/in/ayush-singh-89b620261/",
      twitter: "",
    },
    {
      name: "Rohan Lohiya",
      role: "Fullstack Developer",
      bio: "IIIT Guwahati student who specializes in fullstack development. Passionate about building user-friendly real-time applications.",
      image: rohan,
      github: "https://github.com/Rohan-Lohiya",
      linkedin: "https://www.linkedin.com/in/rohan-lohiya-b16518172/",
      twitter: "",
    },
    {
      name: "Sourabh Dharra",
      role: "Fullstack Developer",
      bio: "RGIPT student specializing in full-stack development, passionate about building efficient, scalable solutions for real-time applications.",
      image: saurabh,
      github: "https://github.com/SOURABH-05",
      linkedin: "https://www.linkedin.com/in/sourabh-dharra-707294288/",
      twitter: "",
    },
    {
      name: "Ankur Gupta",
      role: "Fullstack Developer | Cloud Engineer",
      bio: "Architecting seamless systems—Backend Node.js & Express.js developer and Cloud Engineer from IIIT Guwahati, scaling apps with AWS and Azure.",
      image: ankur,
      github: "https://github.com/7007259Ankur",
      linkedin: "https://www.linkedin.com/in/ankur-gupta-15221a24b",
      twitter: "",
    },
    {
      name: "Sudhamayee",
      role: "Fullstack Developer",
      bio: "Crafting seamless digital experiences—CBIT’s full stack & backend developer building robust, scalable solutions from front to core.",
      image: sudhamayye,
      github: "https://github.com/sudhaamayee",
      linkedin: "https://www.linkedin.com/in/sudhamayee-j-456974361",
      twitter: "",
    },
    {
      name: "Vaishnavi",
      role: "Data Engineer",
      bio: "Transforming raw data into powerful insights—CBIT's data engineer turning numbers into knowledge for smarter decisions.",
      image: vaish,
      github: "https://github.com/vaishnavi-100106/",
      linkedin: "https://www.linkedin.com/in/vaishnavi-r-a840a1301",
      twitter: "",
    },
    {
      name: "Vrinda singh",
      role: "Data Engineer",
      bio: "Empowering insights through data—CBIT's data engineer building pipelines and systems that turn complexity into clarity.",
      image: vrinda,
      github: "https://github.com/vrinda07-ui",
      linkedin: "https://www.linkedin.com/in/vrinda-singh-aa135b29a",
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
