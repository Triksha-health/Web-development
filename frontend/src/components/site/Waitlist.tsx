import { useState } from "react";
import { Link } from "react-router-dom";
import { API_BASE } from "../../lib/api";
import { track } from "../../lib/analytics";

const AUDIENCES = [
  { value: "self", label: "Myself" },
  { value: "family", label: "A family member" },
  { value: "clinician", label: "My patients (I’m a clinician)" },
];

type Status = { kind: "idle" } | { kind: "ok"; msg: string } | { kind: "err"; msg: string };

const fieldClass =
  "w-full rounded-lg border border-[rgb(var(--field-border))] bg-white px-[18px] py-4 text-[17px] text-[#14202E] placeholder:text-[#6B7480] focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-600";

export default function Waitlist() {
  const [email, setEmail] = useState("");
  const [joiningFor, setJoiningFor] = useState("self");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const value = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setStatus({ kind: "err", msg: "Please enter a valid email address." });
      return;
    }
    setLoading(true);
    setStatus({ kind: "idle" });
    try {
      // The doubled "newsletter" is deliberate: it is the path the deployed
      // backend actually serves (see backend/routes/newsletterRoutes.js).
      const res = await fetch(`${API_BASE}/api/newsletter/newsletter/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: value, joiningFor }),
      });
      if (res.ok) {
        setStatus({
          kind: "ok",
          msg: "You’re on the list. We’ll email you once, when Triksha is ready for you.",
        });
        setEmail("");
        track("waitlist_submit", { joiningFor });
      } else if (res.status === 409) {
        setStatus({ kind: "ok", msg: "You’re already on the list. We’ll be in touch." });
      } else {
        setStatus({ kind: "err", msg: "We couldn’t add you just now. Please try again." });
      }
    } catch {
      setStatus({
        kind: "err",
        msg: "Something went wrong. Please check your connection and try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="waitlist" className="sec theme-light">
      <div className="site-wrap grid items-start gap-x-16 gap-y-10 lg:grid-cols-2">
        <div className="flex flex-col gap-[18px]" data-reveal>
          <h2 className="h-display">Join the waitlist</h2>
          <p className="lede">
            Join the waitlist for family plans. No spam, just one email when Triksha is ready for
            you.
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          noValidate
          className="flex w-full max-w-[560px] flex-col gap-3.5"
          data-reveal
        >
          <label htmlFor="wl-email" className="text-sm font-semibold">
            Email address
          </label>
          <input
            id="wl-email"
            type="email"
            name="email"
            autoComplete="email"
            inputMode="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={status.kind === "err"}
            aria-describedby="wl-status"
            className={fieldClass}
          />
          <label htmlFor="wl-for" className="text-sm font-semibold">
            I’m joining for
          </label>
          <select
            id="wl-for"
            name="joiningFor"
            value={joiningFor}
            onChange={(e) => setJoiningFor(e.target.value)}
            className={fieldClass}
          >
            {AUDIENCES.map((a) => (
              <option key={a.value} value={a.value}>
                {a.label}
              </option>
            ))}
          </select>
          <button
            type="submit"
            disabled={loading}
            className="cta cta-blue mt-1 !py-4 !text-[17px] disabled:cursor-wait disabled:opacity-70"
          >
            {loading ? "Joining…" : "Join the waitlist"}
          </button>
          <p id="wl-status" role="status" aria-live="polite" className="min-h-[1.5em] text-[15px] font-semibold">
            {status.kind !== "idle" && (
              <span
                className={
                  status.kind === "ok"
                    ? "inline-flex items-start gap-2 text-status-done"
                    : "text-[#9B1C1C]"
                }
              >
                {status.kind === "ok" && (
                  <svg
                    aria-hidden="true"
                    className="check-draw mt-0.5 flex-none"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path pathLength={1} d="M5 12.5l4.5 4.5L19 7.5" />
                  </svg>
                )}
                {status.msg}
              </span>
            )}
          </p>
          <p className="text-[13px] text-muted">
            We use your email only for this waitlist. See our{" "}
            <Link to="/privacy" className="text-link font-semibold">
              privacy policy
            </Link>
            .
          </p>
        </form>
      </div>
    </section>
  );
}
