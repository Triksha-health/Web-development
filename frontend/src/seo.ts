import { useEffect } from "react";

/**
 * Per-page titles and descriptions. Used twice:
 *  - at build time by scripts/prerender.mjs, to write real <head> tags
 *    into the static HTML that crawlers and link previews read;
 *  - in the browser by usePageMeta, to keep the tab title right as
 *    the visitor moves between pages.
 */
export const SITE_URL = "https://trikshahealth.com";

export interface PageMeta {
  title: string;
  description: string;
}

export const PAGE_META: Record<string, PageMeta> = {
  "/": {
    title: "Triksha — cardiac risk, read early",
    description:
      "Triksha is a personal digital twin for your heart health. A wristband senses your body every day, your Health Book remembers every report, and the twin warns you when something starts to drift. In development. Join the waitlist.",
  },
  "/privacy": {
    title: "Privacy policy — Triksha",
    description:
      "How Triksha collects, uses and protects personal data. Draft policy, pending legal review.",
  },
  "/terms": {
    title: "Terms of use — Triksha",
    description:
      "The terms that apply to using the Triksha website and waitlist. Draft terms, pending legal review.",
  },
};

/** Routes written out as static HTML at build time. */
export const PRERENDER_ROUTES = Object.keys(PAGE_META);

export function usePageMeta(path: keyof typeof PAGE_META | string): void {
  useEffect(() => {
    const meta = PAGE_META[path];
    if (!meta) return;
    document.title = meta.title;
    document
      .querySelector<HTMLMetaElement>('meta[name="description"]')
      ?.setAttribute("content", meta.description);
    document
      .querySelector<HTMLLinkElement>('link[rel="canonical"]')
      ?.setAttribute("href", SITE_URL + (path === "/" ? "/" : path));
  }, [path]);
}
