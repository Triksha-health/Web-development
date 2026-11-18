/**
 * Privacy-friendly analytics via Plausible.
 * Set VITE_PLAUSIBLE_DOMAIN (e.g. "trikshahealth.com") in .env to enable.
 * Falls back to a no-op in dev / when unset, so this is safe to import anywhere.
 */

const DOMAIN = import.meta.env.VITE_PLAUSIBLE_DOMAIN as string | undefined;
const SCRIPT_SRC = "https://plausible.io/js/script.js";

let injected = false;

export function initAnalytics(): void {
  if (typeof document === "undefined") return;
  if (!DOMAIN) return;
  if (injected) return;

  const existing = document.querySelector<HTMLScriptElement>(
    'script[data-analytics="plausible"]'
  );
  if (existing) {
    injected = true;
    return;
  }

  const s = document.createElement("script");
  s.defer = true;
  s.dataset.analytics = "plausible";
  s.dataset.domain = DOMAIN;
  s.src = SCRIPT_SRC;
  document.head.appendChild(s);
  injected = true;
}

/** Track a discrete event, e.g. `track("waitlist_submit")`. No-op if disabled. */
export function track(event: string, props?: Record<string, string | number>): void {
  if (typeof window === "undefined") return;
  const w = window as unknown as {
    plausible?: (e: string, opts?: { props?: Record<string, string | number> }) => void;
  };
  if (typeof w.plausible !== "function") return;
  w.plausible(event, props ? { props } : undefined);
}
