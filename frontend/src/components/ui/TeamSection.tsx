import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";

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
  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  };

  // Individual card animation variants
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut" as const,
      },
    },
  };

  // Social link animation variants
  const socialVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.2,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section id="team" className="-mt-[60px]">
      <div className="container">
        {/* Team grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {team.map((member, index) => (
            <motion.div
              key={index}
              className="card group hover:shadow-xl transition-all duration-300 min-h-[480px] cursor-pointer"
              variants={cardVariants}
              whileHover={{
                y: -2,
                transition: { duration: 0.2 },
              }}
            >
              <div className="relative overflow-hidden">
                <motion.img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-80 object-cover object-top"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Gradient overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Social links */}
                <div className="absolute inset-0 flex items-end">
                  <div className="p-6 w-full">
                    <div className="flex justify-end space-x-3">
                      <motion.a
                        href={member.linkedin}
                        className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm hover:bg-primary-500 transition-colors"
                        variants={socialVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 + 0.3 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Linkedin className="w-4 h-4 text-white" />
                      </motion.a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card content */}
              <motion.div
                className="p-6"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.05 + 0.2,
                  duration: 0.3,
                }}
              >
                <motion.h3
                  className="font-bold text-lg mb-1"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 + 0.25 }}
                >
                  {member.name}
                </motion.h3>

                <motion.p
                  className="text-primary-600 text-sm mb-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 + 0.3 }}
                >
                  {member.role}
                </motion.p>

                <motion.p
                  className="text-gray-600 text-sm"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 + 0.35 }}
                >
                  {member.bio}
                </motion.p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TeamSection;
