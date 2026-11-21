/**
 * Privacy-friendly visitor analytics. No cookies either way.
 *
 * Two providers are supported; set one in the environment to switch it on:
 *   VITE_UMAMI_WEBSITE_ID   Umami Cloud (has a free plan). The ID is shown in
 *                           Umami under Settings, Websites.
 *   VITE_PLAUSIBLE_DOMAIN   Plausible (paid), e.g. "trikshahealth.com".
 * With neither set, everything here does nothing, so it is safe to import anywhere.
 */

const UMAMI_ID = import.meta.env.VITE_UMAMI_WEBSITE_ID as string | undefined;
const PLAUSIBLE_DOMAIN = import.meta.env.VITE_PLAUSIBLE_DOMAIN as string | undefined;

type Props = Record<string, string | number>;

let injected = false;

export function initAnalytics(): void {
  if (typeof document === "undefined") return;
  if (injected) return;
  if (!UMAMI_ID && !PLAUSIBLE_DOMAIN) return;
  injected = true;
  if (document.querySelector("script[data-analytics]")) return;

  const s = document.createElement("script");
  s.defer = true;
  if (UMAMI_ID) {
    s.dataset.analytics = "umami";
    s.dataset.websiteId = UMAMI_ID;
    s.src = "https://cloud.umami.is/script.js";
  } else {
    s.dataset.analytics = "plausible";
    s.dataset.domain = PLAUSIBLE_DOMAIN;
    s.src = "https://plausible.io/js/script.js";
  }
  document.head.appendChild(s);
}

/** Track a discrete event, e.g. `track("waitlist_submit")`. No-op if disabled. */
export function track(event: string, props?: Props): void {
  if (typeof window === "undefined") return;
  const w = window as unknown as {
    umami?: { track: (e: string, data?: Props) => void };
    plausible?: (e: string, opts?: { props?: Props }) => void;
  };
  if (w.umami && typeof w.umami.track === "function") {
    w.umami.track(event, props);
    return;
  }
  if (typeof w.plausible === "function") w.plausible(event, props ? { props } : undefined);
}
