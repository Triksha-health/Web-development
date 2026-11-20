import { useState } from "react";
import { API_BASE } from "../../lib/api";
import { track } from "../../lib/analytics";

type Status = { kind: "idle" } | { kind: "ok" } | { kind: "err"; msg: string };

const fieldClass =
  "w-full rounded-lg border border-navy-400 bg-white px-4 py-3 text-[16px] text-[#14202E] placeholder:text-[#6B7480] focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream";
const labelClass = "text-sm font-semibold text-cream";

const CONTACT_EMAIL = "yashwanth@trikshahealth.com";

/**
 * "Talk to us about the pilot": a short form for hospitals and cardiologists.
 * It replaces a plain email link, which only works for visitors who have an
 * email program set up on the device they are using.
 */
export default function PilotForm() {
  const [form, setForm] = useState({ name: "", email: "", organisation: "", message: "", website: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const name = form.name.trim();
    const email = form.email.trim();
    const message = form.message.trim();
    if (!name) return setStatus({ kind: "err", msg: "Please enter your name." });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return setStatus({ kind: "err", msg: "Please enter a valid email address." });
    }
    if (!message) return setStatus({ kind: "err", msg: "Please add a short message." });

    setLoading(true);
    setStatus({ kind: "idle" });
    try {
      const res = await fetch(`${API_BASE}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          organisation: form.organisation.trim(),
          message,
          topic: "pilot",
          website: form.website,
        }),
      });
      if (res.ok) {
        setStatus({ kind: "ok" });
        setForm({ name: "", email: "", organisation: "", message: "", website: "" });
        track("pilot_enquiry");
      } else if (res.status === 429) {
        setStatus({ kind: "err", msg: "Too many messages just now. Please try again later." });
      } else {
        setStatus({ kind: "err", msg: "We couldn’t send that just now. Please try again, or email us." });
      }
    } catch {
      setStatus({ kind: "err", msg: "Something went wrong. Please check your connection, or email us." });
    } finally {
      setLoading(false);
    }
  };

  if (status.kind === "ok") {
    return (
      <div role="status" className="flex w-full max-w-[520px] flex-col gap-2 border-t border-navy-500 pt-6">
        <p className="font-display text-xl font-medium text-cream">Thank you. Your message is with us.</p>
        <p className="text-navy-100">We will reply to the email address you gave, usually within a few working days.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex w-full max-w-[520px] flex-col gap-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="pf-name" className={labelClass}>
            Your name
          </label>
          <input id="pf-name" name="name" autoComplete="name" value={form.name} onChange={set("name")} className={fieldClass} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="pf-email" className={labelClass}>
            Work email
          </label>
          <input
            id="pf-email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            value={form.email}
            onChange={set("email")}
            className={fieldClass}
          />
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="pf-org" className={labelClass}>
          Hospital or clinic <span className="font-normal text-navy-200">(optional)</span>
        </label>
        <input
          id="pf-org"
          name="organisation"
          autoComplete="organization"
          value={form.organisation}
          onChange={set("organisation")}
          className={fieldClass}
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="pf-message" className={labelClass}>
          Message
        </label>
        <textarea
          id="pf-message"
          name="message"
          rows={3}
          value={form.message}
          onChange={set("message")}
          aria-describedby="pf-status"
          className={`${fieldClass} resize-y`}
        />
      </div>
      {/* Not for people: hidden from sight and from screen readers. Automated
          form-fillers complete it, which is how the server spots them. */}
      <div
        aria-hidden="true"
        // Styled here, not with utility classes, so it stays hidden even if the
        // stylesheet is out of date or fails to load.
        style={{ position: "absolute", left: "-9999px", top: "auto", width: 1, height: 1, overflow: "hidden", opacity: 0 }}
      >
        <label htmlFor="pf-website">Website</label>
        <input id="pf-website" name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={set("website")} />
      </div>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-3 pt-1">
        <button type="submit" disabled={loading} className="cta cta-cream disabled:cursor-wait disabled:opacity-70">
          {loading ? "Sending…" : "Talk to us about the pilot"}
        </button>
        <a href={`mailto:${CONTACT_EMAIL}?subject=Clinical%20pilot`} className="text-sm text-navy-100 underline underline-offset-4 hover:text-cream">
          Or email us directly
        </a>
      </div>
      <p id="pf-status" role="status" aria-live="polite" className="min-h-[1.5em] text-[15px] font-semibold text-[#ffb4a8]">
        {status.kind === "err" ? status.msg : ""}
      </p>
    </form>
  );
}
