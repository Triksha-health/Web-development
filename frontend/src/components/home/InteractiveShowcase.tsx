import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { HashLink } from "react-router-hash-link";
import { ArrowRight } from "lucide-react";
import { SplineScene } from "@/components/ui/splite";
import { Spotlight } from "@/components/ui/spotlight";
import Container from "../ui/Container";
import MagneticButton from "../ui/MagneticButton";
import { fadeUp, stagger, viewportOnce } from "../../lib/motion";

// NOTE: placeholder Spline scene from the 21st.dev demo. Swap for a
// brand-appropriate scene from spline.design when ready (see handoff notes).
const SCENE = "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode";

export default function InteractiveShowcase() {
  // Defer the heavy Spline runtime (~585KB gzip) + external scene until the
  // section is near the viewport, so it never weighs down initial page load.
  const sceneRef = useRef<HTMLDivElement>(null);
  const sceneInView = useInView(sceneRef, { once: true, margin: "200px" });

  return (
    <section className="bg-canvas py-24 md:py-32">
      <Container>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="relative overflow-hidden rounded-4xl bg-navy ring-1 ring-navy shadow-soft-xl"
        >
          <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="#6FB6FF" />

          <div className="relative z-10 flex flex-col md:flex-row min-h-[460px] md:min-h-[520px]">
            {/* Left — copy */}
            <motion.div
              variants={fadeUp}
              className="flex-1 p-8 md:p-12 flex flex-col justify-center"
            >
              <div className="flex flex-wrap items-center gap-2.5 mb-4">
                <span
                  className="text-eyebrow uppercase tracking-wider font-medium"
                  style={{ color: "#6FB6FF" }}
                >
                  Interactive preview
                </span>
                <span
                  className="inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full"
                  style={{ background: "rgba(111,182,255,0.14)", color: "#9fd0ff" }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#6FB6FF]" />
                  In development
                </span>
              </div>

              <h2 className="text-3xl md:text-5xl font-semibold tracking-tighter leading-[1.05] bg-clip-text text-transparent bg-gradient-to-b from-white to-[#9db8de]">
                Your health,
                <br />
                brought to life.
              </h2>

              <p className="mt-5 max-w-md leading-relaxed text-canvas/75">
                Triksha turns continuous cardiac signals into something you can explore —
                an immersive, three-dimensional view of the model quietly working in the
                background to catch what matters early.
              </p>

              <div className="mt-8">
                <MagneticButton strength={0.4}>
                  <HashLink
                    smooth
                    to="/#waitlist"
                    className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-accent-500 text-white text-[15px] font-medium hover:bg-accent-600 transition shadow-soft"
                  >
                    Join the waitlist
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </HashLink>
                </MagneticButton>
              </div>
            </motion.div>

            {/* Right — interactive 3D scene (mounts only when near viewport) */}
            <motion.div
              ref={sceneRef}
              variants={fadeUp}
              className="flex-1 relative min-h-[300px] md:min-h-0"
            >
              {sceneInView ? (
                <SplineScene scene={SCENE} className="w-full h-full" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="loader" />
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
