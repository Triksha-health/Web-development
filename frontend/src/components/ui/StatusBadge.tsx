import React from "react";

type Variant = "mvp" | "inDev" | "pilot" | "joining";

interface StatusBadgeProps {
  variant?: Variant;
  label?: string;
  className?: string;
}

const presets: Record<Variant, { label: string; dot: string }> = {
  mvp:     { label: "Working MVP",         dot: "#0571D3" },
  inDev:   { label: "In development",      dot: "#0B4C99" },
  pilot:   { label: "Pilot starting 2026", dot: "#0571D3" },
  joining: { label: "Joining",             dot: "#6FB6FF" },
};

/**
 * Honest project status pill — used wherever we show product or team
 * info that isn't shipped yet. Builds trust through transparency.
 */
const StatusBadge: React.FC<StatusBadgeProps> = ({
  variant = "inDev",
  label,
  className = "",
}) => {
  const preset = presets[variant];
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium tracking-[0.02em] ${className}`}
      style={{
        background: "rgba(5,113,211,0.10)",
        color: "#0B4C99",
        boxShadow: "inset 0 0 0 1px rgba(5,113,211,0.20)",
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ background: preset.dot }}
      />
      {label ?? preset.label}
    </span>
  );
};

export default StatusBadge;
