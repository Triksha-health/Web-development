import { Linkedin, Mail } from "lucide-react";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import Card from "../ui/Card";
import CoFounder from "../../public/founder.jpg"

const CoFoundersSection = () => {
  const founder = {
    name: "Vemuri Yashwanth",
    role: "Founder & CEO",
    image:CoFounder ,
    quote:
      "Every preventable health crisis is a failure of early detection. We're here to change that.",
    education: " NIT Andhra pradesh",
    experience: "Experience in AI and deep learning",
    expertise: ["AI & Machine Learning", "Healthcare Technology"],
    linkedin: "https://www.linkedin.com/in/vemuri-yashwanth-b39189254",
    mail: "hiyashwanth77@gmail.com",
  };

  return (
    <section id="cofounder" className="py-24 bg-gray-50 relative overflow-hidden text-black">

      <Container className="relative z-10">
        <SectionHeading
          title="Meet Our Founder"
          subtitle="Driven by personal tragedy. Committed to preventive healthcare for all."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-16">
          {/* Origin Story */}
          <div>
            <h3 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
              From Personal Pain to Purpose
            </h3>
            <div className="space-y-6 text-gray-700 text-base">
              <p>
                I’m a CSE student from NIT Andhra Pradesh who dropped out to build Triksha — not for academic
                glory, but from personal pain. My father’s jaundice wasn’t caught early and sadly led to
                pancreatic cancer. That experience changed everything.
              </p>
              <p>
                I realized how many lives could be saved if health problems were caught early. I’ve built a
                strong interns team from IITs, NITs, and IIITs. We’re combining medical insight, AI, and emotion
                to solve a massive real-world problem — and we won’t stop until Triksha becomes the difference
                between timely care and tragedy for millions.
              </p>
              <p>
                I’ve bet my entire career on solving this — so if you’re looking for someone to bet on, you can
                trust I’m all in. I’m not just building a startup, I’m fixing a problem I’ve lived through.
              </p>
              <blockquote className="border-l-4 border-primary-500 pl-4 italic text-gray-600">
                "{founder.quote}"
              </blockquote>
            </div>
          </div>

          {/* Profile Card */}
          <div>
            <Card className="overflow-hidden p-0 group h-full flex flex-col">
              <div className="relative">
                <img
                  src={founder.image}
                  alt={founder.name}
                  className="w-full h-80 object-cover transform group-hover:scale-105 transition duration-500"
                />
                <div className="absolute top-4 right-4 flex space-x-2">
                  <a
                    href={`mailto:${founder.mail}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white p-2 rounded-full shadow text-gray-600 hover:text-primary-600"
                  >
                    <Mail size={18} />
                  </a>
                  <a
                    href={founder.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white p-2 rounded-full shadow text-gray-600 hover:text-primary-600"
                  >
                    <Linkedin size={18} />
                  </a>
                </div>

              </div>

              <div className="p-6 md:p-8 flex flex-col justify-between flex-grow space-y-4">
                <div>
                  <h3 className="text-2xl font-bold">{founder.name}</h3>
                  <p className="text-primary-600 font-medium mb-2">{founder.role}</p>
                </div>

                <div className="space-y-2 text-gray-600 text-sm">
                  <div>
                    <span className="font-semibold">Education:</span> {founder.education}
                  </div>
                  <div>
                    <span className="font-semibold">Experience:</span> {founder.experience}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {founder.expertise.map((skill, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CoFoundersSection;
