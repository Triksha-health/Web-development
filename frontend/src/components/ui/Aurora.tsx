interface Props {
  className?: string;
  /** "light" for cream sections, "navy" for dark statement blocks. */
  tone?: "light" | "navy";
}

/**
 * Ambient animated aurora — soft drifting blue blobs that give sections a
 * living, "2026" depth without heavy 3D. Purely decorative (aria-hidden),
 * GPU-cheap (transform/opacity only), and frozen under prefers-reduced-motion
 * via the global guard in index.css.
 */
export default function Aurora({ className, tone = "light" }: Props) {
  const blobs =
    tone === "navy"
      ? [
          { s: "40rem", top: "-18%", right: "-10%", c: "rgba(5,113,211,0.35)", d: "0s" },
          { s: "34rem", bottom: "-20%", left: "-12%", c: "rgba(111,182,255,0.22)", d: "-7s" },
          { s: "26rem", top: "20%", left: "45%", c: "rgba(71,159,230,0.18)", d: "-13s" },
        ]
      : [
          { s: "44rem", top: "-16%", right: "-10%", c: "rgba(5,113,211,0.34)", d: "0s" },
          { s: "38rem", bottom: "-18%", left: "-12%", c: "rgba(111,182,255,0.30)", d: "-7s" },
          { s: "30rem", top: "26%", left: "40%", c: "rgba(71,159,230,0.20)", d: "-13s" },
        ];

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}
    >
      {blobs.map((b, i) => (
        <div
          key={i}
          className="aurora-blob"
          style={{
            width: b.s,
            height: b.s,
            top: b.top,
            bottom: b.bottom,
            left: b.left,
            right: b.right,
            background: `radial-gradient(circle, ${b.c}, transparent 70%)`,
            animationDelay: b.d,
          }}
        />
      ))}
    </div>
  );
}
