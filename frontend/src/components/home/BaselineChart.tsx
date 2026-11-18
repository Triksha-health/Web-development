import { motion } from "framer-motion";

/**
 * A clean "personal baseline" visual: a shaded normal-range band with the
 * live signal tracing through it and a pulsing current marker. Replaces the
 * 3D ribbon — crisper and more legible than wobbling waves.
 */
export default function BaselineChart({ className }: { className?: string }) {
  // Smooth signal that mostly rides inside the band, with gentle variation.
  const line =
    "M0,128 C60,120 90,108 140,112 C190,116 210,140 260,138 C310,136 330,112 380,116 C430,120 460,132 510,126 C560,121 585,124 600,122";
  const area = `${line} L600,240 L0,240 Z`;

  return (
    <div className={`relative ${className ?? ""}`}>
      <svg
        viewBox="0 0 600 240"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <linearGradient id="baselineFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#1E80DB" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#1E80DB" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* gridlines */}
        {[60, 120, 180].map((y) => (
          <line key={y} x1="0" y1={y} x2="600" y2={y} stroke="rgba(22,25,29,0.06)" strokeWidth="1" />
        ))}

        {/* personal normal-range band + mean line */}
        <rect x="0" y="98" width="600" height="60" fill="rgba(30,128,219,0.08)" />
        <line x1="0" y1="128" x2="600" y2="128" stroke="rgba(30,128,219,0.32)" strokeWidth="1.25" strokeDasharray="4 6" />

        {/* area under the trace */}
        <motion.path
          d={area}
          fill="url(#baselineFill)"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.4 }}
        />

        {/* the live trace, drawn on view */}
        <motion.path
          d={line}
          fill="none"
          stroke="#1E80DB"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>

      {/* labels (non-stretched, so text stays crisp) */}
      <div className="absolute left-5 top-5 text-[11px] font-medium uppercase tracking-wider" style={{ color: "rgba(22,25,29,0.40)" }}>
        Your normal range
      </div>

      {/* pulsing "now" marker pinned to the end of the trace */}
      <div className="absolute right-5 top-1/2 -translate-y-1/2 flex items-center gap-2">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-accent-500 opacity-60 animate-ping" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent-500" />
        </span>
        <span className="text-[11px] font-medium text-ink-900">now</span>
      </div>
    </div>
  );
}
