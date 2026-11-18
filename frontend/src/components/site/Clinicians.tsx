const POINTS = [
  {
    title: "One-page summary",
    body: "A PDF with the drift, its timeline and the supporting signals — readable in a minute, ready for the file.",
  },
  {
    title: "Evidence, not a black box",
    body: "Every alert shows which signals moved and by how much, so you can judge it for yourself.",
  },
  {
    title: "History in one place",
    body: "The patient’s Health Book brings lab reports and records from every institution together, with their consent.",
  },
  {
    title: "Built with clinicians",
    body: "Validation is led clinically, and we are working towards CDSCO clearance before making any clinical claim.",
  },
];

export default function Clinicians() {
  return (
    <section id="clinicians" className="bg-navy text-cream">
      <div className="site-wrap site-section flex flex-col gap-12">
        <div className="grid items-end gap-x-14 gap-y-6 lg:grid-cols-2">
          <div className="flex flex-col gap-[18px]">
            <p className="kicker !text-accent-300">For cardiologists &amp; clinical partners</p>
            <h2 className="h-display !text-cream">
              Something to prescribe for the months between visits.
            </h2>
          </div>
          <p className="lede !text-navy-100">
            After a cardiac event, your patient’s family is frightened and motivated. Triksha
            gives them a daily, personal signal — and gives you a clean summary instead of a
            pile of screenshots.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {POINTS.map((p) => (
            <div
              key={p.title}
              className="flex flex-col gap-2.5 rounded-[22px] border border-navy-500 bg-navy-600 p-7 transition-colors duration-200 hover:border-accent-300"
            >
              <h3 className="font-display text-[22px] font-semibold !text-cream">{p.title}</h3>
              <p className="text-navy-100">{p.body}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-5 border-t border-navy-500 pt-8">
          <p className="max-w-[30em] font-display text-[clamp(22px,2.2vw,28px)] font-medium">
            We are looking for hospitals and cardiologists to join our first clinical pilot.
          </p>
          <a
            href="mailto:yashwanth@trikshahealth.com?subject=Clinical%20pilot"
            className="cta cta-cream"
          >
            Talk to us about the pilot
          </a>
        </div>
      </div>
    </section>
  );
}
