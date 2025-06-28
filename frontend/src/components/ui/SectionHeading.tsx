// import React from "react";

// interface SectionHeadingProps {
//   title: string;
//   subtitle?: string;
//   centered?: boolean;
//   className?: string;
// }

// const SectionHeading: React.FC<SectionHeadingProps> = ({ title, subtitle, centered = true, className = "" }) => {
//   return (
//     <div className={`mb-12 ${centered ? "text-center" : ""} ${className}`}>
//       <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text bg-gradient-to-r text-[#3691ff] ">{title}</h2>
//       {subtitle && <p className="text-lg text-slate-600 max-w-3xl mx-auto">{subtitle}</p>}
//     </div>
//   );
// };

// export default SectionHeading;
import React from "react";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subtitle,
  centered = true,
  className = "",
}) => {
  const [firstWord, ...rest] = title.trim().split(" ");

  return (
    <div
      className={`mb-20 ${centered ? "text-center" : ""} ${className} animate-fade-in-up`}
    >
      <h2 className="relative inline-block text-4xl md:text-5xl font-extrabold pb-2 drop-shadow-sm leading-tight tracking-tight">
        <span className="text-[#2563eb]">{firstWord}</span>{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-500 to-violet-600">
          {rest.join(" ")}
        </span>
        <span className="absolute left-1/2 -bottom-1 w-24 h-1 bg-gradient-to-r from-sky-400 via-cyan-500 to-violet-500 transform -translate-x-1/2 rounded-full"></span>
      </h2>

      {subtitle && (
        <p className="mt-6 text-base md:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
