/**
 * A change of pace halfway down the page: one sentence, set large, with
 * nothing else around it.
 */
export default function Statement() {
  return (
    <section className="sec" aria-label="Why we avoid false alarms">
      <div className="site-wrap">
        <p
          data-reveal
          className="max-w-[18em] font-display text-[clamp(36px,5.4vw,88px)] font-medium leading-[1.05] tracking-[-0.02em] text-ink-900 [text-wrap:balance]"
        >
          An alert you learn to ignore is worse than no alert at all.
        </p>
      </div>
    </section>
  );
}
