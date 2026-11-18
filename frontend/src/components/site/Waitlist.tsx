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
  "w-full rounded-[14px] border-0 bg-white px-[18px] py-4 text-[17px] text-ink-900 placeholder:text-ink-300 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

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
    <section id="waitlist" className="px-[clamp(20px,5vw,48px)] pb-[clamp(64px,8vw,112px)]">
      <div className="mx-auto grid max-w-[1104px] items-center gap-10 rounded-[32px] bg-accent-500 p-[clamp(28px,5vw,72px)] text-white lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <h2 className="font-display text-[clamp(34px,4vw,50px)] font-semibold leading-[1.05] tracking-[-0.015em] !text-white">
            Let’s hear the whisper.
          </h2>
          <p className="text-lg text-accent-50">
            Join the waitlist for family plans. No spam — one email when Triksha is ready for
            you.
          </p>
        </div>

        <form onSubmit={onSubmit} noValidate className="flex flex-col gap-3.5">
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
            className="cta cta-navy mt-1 !py-4 !text-[17px] disabled:cursor-wait disabled:opacity-70"
          >
            {loading ? "Joining…" : "Join the waitlist"}
          </button>
          <p id="wl-status" role="status" aria-live="polite" className="min-h-[1.5em] text-[15px] font-semibold">
            {status.kind !== "idle" && (
              <span
                className={
                  status.kind === "ok"
                    ? "text-white"
                    : "rounded-md bg-white px-2 py-1 text-[#9B1C1C]"
                }
              >
                {status.msg}
              </span>
            )}
          </p>
          <p className="text-[13px] text-accent-50">
            We use your email only for this waitlist. See our{" "}
            <Link to="/privacy" className="font-semibold text-white underline underline-offset-2">
              privacy policy
            </Link>
            .
          </p>
        </form>
      </div>
    </section>
  );
}
