import { motion } from "framer-motion";
import { Linkedin, Mail, Building2, GraduationCap, Microscope, Cloud } from "lucide-react";
import Container from "../ui/Container";
import StatusBadge from "../ui/StatusBadge";
import CoFounder from "../../public/founder.jpg";
import AdvisorPhoto from "../../public/puli kishore1.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

const SOFT = { color: "rgba(22,25,29,0.62)" };
const MUTE = { color: "rgba(22,25,29,0.40)" };

const TeamSection = () => {
  const founder = {
    name: "Vemuri Yashwanth",
    role: "Founder & CEO",
    image: CoFounder,
    quote:
      "Every preventable health crisis is a failure of early detection. We're here to change that.",
    education: "NIT Andhra Pradesh",
    linkedin: "https://www.linkedin.com/in/vemuri-yashwanth-b39189254",
    mail: "yashwanth@trikshahealth.com",
  };

  return (
    <section id="team" className="relative bg-canvas-soft py-32 overflow-hidden">
      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <div className="eyebrow mb-4">Team + company</div>
          <h2 className="text-display text-ink-900 tracking-tighter">
            Built by people who lived the problem.
          </h2>
          <p className="mt-5 text-lg md:text-xl leading-relaxed" style={SOFT}>
            A small, honest team in Hyderabad. A founder driven by personal loss, an
            advisor, and a clinical co-founder joining.
          </p>
        </motion.div>

        {/* Team grid */}
        <div className="grid lg:grid-cols-12 gap-6 mt-14">
          {/* Founder card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5"
          >
            <div className="rounded-4xl overflow-hidden bg-canvas-paper ring-1 ring-[rgba(22,25,29,0.10)] shadow-soft-lg group h-full">
              <div className="relative">
                <img
                  src={founder.image}
                  alt={founder.name}
                  className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  <a
                    href={`mailto:${founder.mail}`}
                    className="w-9 h-9 rounded-full bg-canvas-paper/90 backdrop-blur flex items-center justify-center text-ink-700 hover:text-accent-600 transition"
                    aria-label="Email"
                  >
                    <Mail size={16} />
                  </a>
                  <a
                    href={founder.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-canvas-paper/90 backdrop-blur flex items-center justify-center text-ink-700 hover:text-accent-600 transition"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={16} />
                  </a>
                </div>
              </div>

              <div className="p-7">
                <h3 className="text-xl font-semibold text-ink-900 tracking-tight">
                  {founder.name}
                </h3>
                <p className="text-sm mt-0.5" style={SOFT}>
                  {founder.role} · {founder.education}
                </p>

                <blockquote className="mt-5 pl-4 border-l-2 border-accent-500 text-[15px] font-medium text-ink-900 leading-snug tracking-tight">
                  "{founder.quote}"
                </blockquote>
              </div>
            </div>
          </motion.div>

          {/* Right: advisor + clinical co-founder + founder story */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="lg:col-span-7 space-y-5"
          >
            {/* Founder origin story */}
            <div className="rounded-3xl bg-canvas-paper ring-1 ring-[rgba(22,25,29,0.10)] shadow-soft p-7">
              <div className="text-eyebrow uppercase mb-3" style={MUTE}>
                Origin
              </div>
              <p className="text-[15.5px] leading-relaxed" style={{ color: "rgba(22,25,29,0.72)" }}>
                I'm a CSE student from NIT Andhra Pradesh, building Triksha — not for
                academic glory, but from personal pain. My father's illness wasn't caught
                early; the cost of late detection is what changed everything. I've built
                a team from IITs, NITs and IIITs, and we're combining medical insight,
                AI and emotion to fix a problem I've lived through.
              </p>
            </div>

            {/* Advisor + Clinical co-founder slot */}
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="rounded-3xl bg-canvas-paper ring-1 ring-[rgba(22,25,29,0.10)] shadow-soft p-6">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={AdvisorPhoto}
                    alt="Dr. Puli Kishore Kumar"
                    className="w-16 h-16 rounded-2xl object-cover ring-1 ring-[rgba(22,25,29,0.10)]"
                  />
                  <div className="min-w-0">
                    <div className="font-semibold text-ink-900 leading-tight">
                      Dr. Puli Kishore Kumar
                    </div>
                    <div className="text-xs mt-0.5" style={SOFT}>
                      Advisor · NIT Andhra Pradesh
                    </div>
                  </div>
                </div>
                <p className="text-sm leading-relaxed" style={SOFT}>
                  Assistant Professor at NIT Andhra Pradesh; PhD from NIT Warangal.
                  Signal-processing researcher (ultra-wideband radar imaging, compressive
                  sensing) guiding our model and validation strategy.
                </p>
                <a
                  href="https://www.linkedin.com/in/dr-puli-kishore-kumar-70948a48"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-accent-700 hover:text-accent-600"
                >
                  <Linkedin className="w-3.5 h-3.5" /> LinkedIn
                </a>
              </div>

              <div className="rounded-3xl bg-canvas-paper ring-1 ring-[rgba(22,25,29,0.10)] shadow-soft p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-2xl bg-accent-50 ring-1 ring-accent-100 flex items-center justify-center">
                    <Microscope className="w-5 h-5 text-accent-700" />
                  </div>
                  <StatusBadge variant="joining" label="Joining" />
                </div>
                <div className="font-semibold text-ink-900">Clinical co-founder</div>
                <p className="mt-1.5 text-sm leading-relaxed" style={SOFT}>
                  We're closing on a senior cardiologist co-founder to own the clinical
                  side end-to-end. Honest about it — they're not in seat yet.
                </p>
                <a
                  href="/careers"
                  className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-accent-700 hover:text-accent-600"
                >
                  See open roles →
                </a>
              </div>
            </div>

            {/* Company facts */}
            <div className="rounded-3xl bg-canvas-paper ring-1 ring-[rgba(22,25,29,0.10)] shadow-soft p-6">
              <div className="text-eyebrow uppercase mb-4" style={MUTE}>
                Company
              </div>
              <ul className="space-y-3 text-[14.5px]">
                <li className="flex items-start gap-3">
                  <Building2 className="w-4 h-4 mt-0.5 text-accent-700 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-ink-900">
                      VTY TRIKSHA HEALTH TECH PRIVATE LIMITED
                    </span>
                    <span style={SOFT}> — incorporated in India</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Cloud className="w-4 h-4 mt-0.5 text-accent-700 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-ink-900">Microsoft for Startups</span>
                    <span style={SOFT}> — cloud + infrastructure partner</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <GraduationCap className="w-4 h-4 mt-0.5 text-accent-700 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-ink-900">NIT Andhra Pradesh</span>
                    <span style={SOFT}> — institutional backing and research partner</span>
                  </div>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default TeamSection;
