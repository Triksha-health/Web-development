import type { CSSProperties } from "react";
import PhotoSlot from "./PhotoSlot";

const ROWS = [
  {
    title: "Someone in your family just had a heart scare",
    body: "The next twelve months are when families decide what to do about it. Triksha gives you something to do every day, not just at the next appointment.",
  },
  {
    title: "Your last lab report said “watch it”",
    body: "Borderline numbers, and the next test is a year away. Triksha watches the months in between and keeps every report in one place.",
  },
  {
    title: "You care for parents and kids at the same time",
    body: "One family account. Each person gets their own twin, and an alert can reach the family members they choose.",
  },
];

export default function Families() {
  return (
    <section id="families" className="sec theme-light">
      <div className="site-wrap flex flex-col gap-12 lg:gap-16">
        <div className="grid items-end gap-x-16 gap-y-6 lg:grid-cols-[1.25fr_1fr]">
          <div className="flex flex-col gap-[18px]" data-reveal>
            <h2 className="h-display">Who Triksha is for</h2>
          </div>
          <p className="lede" data-reveal style={{ "--i": 1 } as CSSProperties}>
            Most people only start watching their heart after someone they love has a cardiac
            event. Triksha is for that moment, and for anyone who would rather not wait for it.
          </p>
        </div>

        <PhotoSlot
          description="a family at home, three generations together"
          alt="Three generations of a family sitting together at home, relaxed and talking."
          className="aspect-[4/3] sm:aspect-[21/9]"
        />

        <ul className="flex flex-col border-t border-line">
          {ROWS.map((r) => (
            <li
              key={r.title}
              className="grid gap-x-16 gap-y-2 border-b border-line py-7 lg:grid-cols-[1.25fr_1fr] lg:py-9"
            >
              <h3 className="font-display text-[clamp(22px,2vw,28px)] font-medium leading-[1.2]">
                {r.title}
              </h3>
              <p className="text-body">{r.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
