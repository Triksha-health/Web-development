import type { ReactNode } from "react";

const iconProps = {
  "aria-hidden": true,
  width: 32,
  height: 32,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "#1557A8",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const CARDS: { icon: ReactNode; title: string; body: string }[] = [
  {
    icon: (
      <svg {...iconProps}>
        <circle cx="8" cy="7" r="3" />
        <circle cx="17" cy="8" r="2.5" />
        <path d="M2.5 20c0-3.3 2.5-6 5.5-6s5.5 2.7 5.5 6" />
        <path d="M14 20c0-2.6 1.4-4.8 3.5-4.8S21 17.4 21 20" />
      </svg>
    ),
    title: "Someone in your family just had a heart scare",
    body: "The next twelve months are when families decide what to do about it. Triksha gives you something to do every day, not just at the next appointment.",
  },
  {
    icon: (
      <svg {...iconProps}>
        <path d="M7 3h7l4 4v14H7z" />
        <path d="M14 3v4h4" />
        <path d="M10 12h5M10 16h3" />
      </svg>
    ),
    title: "Your last lab report said “watch it”",
    body: "Borderline numbers, and the next test is a year away. Triksha watches the months in between and keeps every report in one place.",
  },
  {
    icon: (
      <svg {...iconProps}>
        <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" />
        <path d="M8.5 11h2l1-2 1.5 4 1-2h1.5" />
      </svg>
    ),
    title: "You care for parents and kids at the same time",
    body: "One family account. Each person gets their own twin, and an alert can reach the family members they choose.",
  },
];

export default function Families() {
  return (
    <section id="families" className="border-y border-line bg-canvas-paper">
      <div className="site-wrap site-section flex flex-col gap-12">
        <div className="grid items-end gap-x-14 gap-y-6 lg:grid-cols-2">
          <div className="flex flex-col gap-[18px]">
            <p className="kicker">Who Triksha is for</p>
            <h2 className="h-display">Heart disease rarely knocks. It usually just arrives.</h2>
          </div>
          <p className="lede">
            Most people only start watching their heart after someone they love has a cardiac
            event. Triksha is for that moment — and for anyone who would rather not wait for it.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {CARDS.map((c) => (
            <article
              key={c.title}
              className="card-hover flex flex-col gap-3.5 rounded-[22px] border border-line bg-canvas p-8"
            >
              {c.icon}
              <h3 className="font-display text-2xl font-semibold leading-[1.2]">{c.title}</h3>
              <p className="text-body">{c.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
