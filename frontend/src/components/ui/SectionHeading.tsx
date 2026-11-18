import React from "react";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  centered?: boolean;
  className?: string;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subtitle,
  eyebrow,
  centered = false,
  className = "",
}) => {
  return (
    <div className={`${centered ? "text-center mx-auto" : ""} ${className} max-w-2xl`}>
      {eyebrow && <div className="eyebrow mb-4">{eyebrow}</div>}
      <h2 className="text-display text-ink-900 tracking-tighter leading-[1.05]">{title}</h2>
      {subtitle && (
        <p className="mt-5 text-lg md:text-xl text-ink-500 leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
};

export default SectionHeading;
