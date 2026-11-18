import type { CSSProperties } from "react";
import TwinDemo from "./TwinDemo";

const step = (i: number) => ({ "--i": i }) as CSSProperties;

export default function AlertSection() {
  return (
    <section id="alert" className="border-y border-line bg-canvas-paper">
      <div className="site-wrap site-section grid items-center gap-14 lg:grid-cols-2">
        <div data-reveal="left">
          <TwinDemo />
        </div>
        <div className="flex flex-col gap-[22px]">
          <h2 className="h-display" data-reveal style={step(0)}>
            What an alert looks like
          </h2>
          <p className="lede" data-reveal style={step(1)}>
            Every alert says what changed, how long it has been changing, and what to do next.
            You decide who else sees it: your family, your cardiologist, or both.
          </p>
          <p className="lede" data-reveal style={step(2)}>
            We tune Triksha to avoid false alarms. An alert you learn to ignore is worse than
            no alert at all.
          </p>
        </div>
      </div>
    </section>
  );
}
