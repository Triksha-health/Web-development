import { useInView } from "react-intersection-observer";
import { Linkedin, Twitter } from "lucide-react";
import { FaGithub } from "react-icons/fa";

interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
  linkedin?: string;
  twitter?: string;
  github?: string;
}

interface teamsectionprops {
  team: TeamMember[];
}

const TeamSection: React.FC<teamsectionprops> = ({ team = [] }) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section id="team" ref={ref} className="">
      <div className="container">
        {/* Team grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
          {team.map((member, index) => (
            <div
              key={index}
              className={`card group hover:shadow-xl transition-all duration-300 min-h-[480px] ${
                inView ? "fade-in" : "opacity-0"
              }`}
            >
              <div className="relative overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-80 object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end"></div>
                <div className="absolute inset-0 flex items-end">
                  <div className="p-6 w-full">
                    <div className="flex justify-end space-x-3">
                      <a
                        href={member.linkedin}
                        className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm hover:bg-primary-500 transition-colors"
                      >
                        <Linkedin className="w-4 h-4 text-white" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg mb-1">{member.name}</h3>
                <p className="text-primary-600 text-sm mb-4">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
