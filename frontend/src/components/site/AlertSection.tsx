import type { CSSProperties } from "react";
import TwinDemo from "./TwinDemo";

const step = (i: number) => ({ "--i": i }) as CSSProperties;

export default function AlertSection() {
  return (
    <section id="alert" className="sec theme-light">
      <div className="site-wrap grid items-start gap-x-16 gap-y-12 lg:grid-cols-2">
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
            We tune Triksha to avoid false alarms.
          </p>
        </div>
      </div>
    </section>
  );
}
