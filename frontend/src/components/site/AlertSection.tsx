import TwinDemo from "./TwinDemo";

export default function AlertSection() {
  return (
    <section id="alert" className="border-y border-line bg-canvas-paper">
      <div className="site-wrap site-section grid items-center gap-14 lg:grid-cols-2">
        <TwinDemo />
        <div className="flex flex-col gap-[22px]">
          <p className="kicker">A warning that travels</p>
          <h2 className="h-display">Not a number to worry about. A reason to act.</h2>
          <p className="lede">
            Every alert says what changed, how long it has been changing, and what to do next.
            You decide who else sees it: your family, your cardiologist, or both.
          </p>
          <p className="lede">
            We tune Triksha to avoid false alarms. An alert you learn to ignore is worse than
            no alert at all.
          </p>
        </div>
      </div>
    </section>
  );
}
