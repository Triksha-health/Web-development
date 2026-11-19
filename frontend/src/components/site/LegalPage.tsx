import type { ReactNode } from "react";

export interface LegalSection {
  id: string;
  title: string;
  body: ReactNode;
}

interface LegalPageProps {
  kicker: string;
  title: string;
  intro: string;
  updated: string;
  sections: LegalSection[];
}

/** Shared layout for the Privacy policy and Terms of use pages. */
export default function LegalPage({ kicker, title, intro, updated, sections }: LegalPageProps) {
  return (
    <div className="theme-light sec">
    <div className="site-wrap">
      <div className="flex max-w-[760px] flex-col gap-[18px]">
        <p className="section-label">{kicker}</p>
        <h1 className="h-display">{title}</h1>
        <p className="lede">{intro}</p>
        <p className="section-label">Last updated: {updated}</p>
      </div>

      <div
        role="note"
        className="mt-8 max-w-[760px] rounded-2xl border border-status-dot/50 bg-canvas-paper px-5 py-4 text-[15px] text-body"
      >
        <strong className="font-semibold text-status-wip">Draft, pending legal review.</strong>{" "}
        This page is placeholder text while Triksha is in development. It will be replaced by
        a version reviewed by legal counsel before launch.
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-[260px_1fr] lg:gap-16">
        <nav aria-label="On this page" className="lg:sticky lg:top-24 lg:self-start">
          <p className="section-label mb-3">On this page</p>
          <ol className="flex flex-col gap-2 text-[15px]">
            {sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="text-ink-900 no-underline hover:underline">
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <article className="flex max-w-[720px] flex-col gap-10">
          {sections.map((s) => (
            <section key={s.id} id={s.id}>
              <h2 className="mb-3 font-display text-[clamp(22px,2vw,28px)] font-medium leading-[1.2]">
                {s.title}
              </h2>
              <div className="flex flex-col gap-3 text-[17px] text-body [&_a]:text-accent-600 [&_a]:underline [&_a]:underline-offset-2 [&_strong]:font-semibold [&_strong]:text-ink-900 [&_ul]:flex [&_ul]:list-disc [&_ul]:flex-col [&_ul]:gap-1.5 [&_ul]:pl-5">
                {s.body}
              </div>
            </section>
          ))}
        </article>
      </div>
    </div>
    </div>
  );
}
