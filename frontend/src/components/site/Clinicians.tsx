const POINTS = [
  {
    title: "One-page summary",
    body: "A PDF with the drift, its timeline and the supporting signals. Readable in a minute, ready for the file.",
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
    <section id="clinicians" className="sec bg-navy text-cream">
      <div className="site-wrap grid items-start gap-x-16 gap-y-12 lg:grid-cols-2">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-[18px]" data-reveal>
            <h2 className="h-display !text-cream">For cardiologists and clinical partners</h2>
            <p className="lede !text-navy-100">
              After a cardiac event, your patient’s family is frightened and motivated. Triksha
              gives them a daily, personal signal, and gives you a clean summary instead of a
              pile of screenshots.
            </p>
          </div>

          <dl className="flex flex-col border-t border-navy-500">
            {POINTS.map((p) => (
              <div
                key={p.title}
                className="grid gap-x-8 gap-y-1.5 border-b border-navy-500 py-6 sm:grid-cols-[minmax(0,220px)_1fr]"
              >
                <dt className="font-display text-xl font-medium text-cream">{p.title}</dt>
                <dd className="text-navy-100">{p.body}</dd>
              </div>
            ))}
          </dl>

          <div className="flex flex-col items-start gap-5" data-reveal>
            <p className="lede !text-navy-100">
              We are looking for hospitals and cardiologists to join our first clinical pilot.
            </p>
            <a
              href="mailto:yashwanth@trikshahealth.com?subject=Clinical%20pilot"
              className="cta cta-cream"
              data-magnetic
            >
              Talk to us about the pilot
              <span className="cta-arrow" aria-hidden="true">
                →
              </span>
            </a>
          </div>
        </div>

        <figure className="flex flex-col gap-3 lg:sticky lg:top-28">
          {/* The flat page, not a tilted mock-up: its text stays sharp. */}
          <img
            src="/img/summary-sample-900.webp"
            srcSet="/img/summary-sample-900.webp 900w, /img/summary-sample-1800.webp 1800w"
            sizes="(min-width: 1536px) 656px, (min-width: 1024px) 46vw, 94vw"
            alt="Sample one-page Triksha cardiac drift summary, with three signal charts, a table of signals and a timeline"
            width={1800}
            height={2547}
            loading="lazy"
            className="h-auto w-full rounded-2xl"
          />
          <figcaption className="text-sm text-navy-200">
            Sample summary. Not real patient data and not a diagnosis.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
