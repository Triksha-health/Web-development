import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../lib/api";

interface Signup {
  email: string;
  joiningFor?: "self" | "family" | "clinician";
  subscribedAt?: string;
}
interface Message {
  name: string;
  email: string;
  organisation?: string;
  topic?: string;
  message: string;
  createdAt?: string;
}
interface WaitlistData {
  total: number;
  byAudience: { self: number; family: number; clinician: number; unknown: number };
  items: Signup[];
}

const AUDIENCE: Record<string, string> = { self: "Myself", family: "A family member", clinician: "A clinician" };
const TOKEN_KEY = "triksha_admin_token";

const when = (iso?: string) =>
  iso ? new Date(iso).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }) : "Not recorded";

/**
 * Private page for the team: who has joined the waitlist, and messages sent
 * through the pilot contact form. Needs the admin sign-in.
 */
export default function AdminWaitlist() {
  const navigate = useNavigate();
  const [waitlist, setWaitlist] = useState<WaitlistData | null>(null);
  const [messages, setMessages] = useState<Message[] | null>(null);
  const [error, setError] = useState("");
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    const headers = { Authorization: `Bearer ${token}` };
    let cancelled = false;
    (async () => {
      try {
        const [w, c] = await Promise.all([
          fetch(`${API_BASE}/api/admin/waitlist`, { headers }),
          fetch(`${API_BASE}/api/admin/contacts`, { headers }),
        ]);
        if (w.status === 401 || w.status === 403) {
          // signed out, or the sign-in has expired
          localStorage.removeItem(TOKEN_KEY);
          navigate("/admin/login", { replace: true });
          return;
        }
        if (!w.ok || !c.ok) throw new Error("bad response");
        const wj = (await w.json()) as WaitlistData;
        const cj = (await c.json()) as { items: Message[] };
        if (!cancelled) {
          setWaitlist(wj);
          setMessages(cj.items);
        }
      } catch {
        if (!cancelled) setError("Could not load the list. The server may be down. Please try again shortly.");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [navigate]);

  // The file needs the sign-in too, so it is fetched here and handed to the
  // browser as a download, instead of being a plain link.
  const downloadCsv = async () => {
    setDownloading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/api/admin/waitlist.csv`, {
        headers: { Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}` },
      });
      if (!res.ok) throw new Error("bad response");
      const url = URL.createObjectURL(await res.blob());
      const a = document.createElement("a");
      a.href = url;
      a.download = "triksha-waitlist.csv";
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      setError("Could not download the file. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  const stat = "flex flex-col gap-1 border-t border-line pt-4";

  return (
    <div className="theme-light min-h-screen">
      <div className="site-wrap flex flex-col gap-12 py-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-2">
            <p className="section-label">Team only</p>
            <h1 className="h-display">Waitlist and messages</h1>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <button type="button" onClick={downloadCsv} disabled={downloading || !waitlist} className="cta cta-blue !px-5 !py-3 !text-[15px] disabled:opacity-60">
              {downloading ? "Preparing…" : "Download spreadsheet"}
            </button>
          </div>
        </div>

        {error && (
          <p role="alert" className="rounded-lg border border-line bg-canvas-paper px-4 py-3 font-semibold text-[#9B1C1C]">
            {error}
          </p>
        )}
        {!waitlist && !error && <p className="text-body">Loading…</p>}

        {waitlist && (
          <>
            <dl className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className={stat}>
                <dt className="section-label">On the waitlist</dt>
                <dd className="font-display text-5xl font-medium">{waitlist.total}</dd>
              </div>
              <div className={stat}>
                <dt className="section-label">For themselves</dt>
                <dd className="font-display text-5xl font-medium">{waitlist.byAudience.self}</dd>
              </div>
              <div className={stat}>
                <dt className="section-label">For a family member</dt>
                <dd className="font-display text-5xl font-medium">{waitlist.byAudience.family}</dd>
              </div>
              <div className={stat}>
                <dt className="section-label">Clinicians</dt>
                <dd className="font-display text-5xl font-medium">{waitlist.byAudience.clinician}</dd>
              </div>
            </dl>
            {waitlist.byAudience.unknown > 0 && (
              <p className="-mt-6 text-sm text-muted">
                {waitlist.byAudience.unknown} joined before we asked who they were joining for.
              </p>
            )}

            <section className="flex flex-col gap-4">
              <h2 className="font-display text-2xl font-medium">Sign-ups, newest first</h2>
              <div className="overflow-x-auto rounded-2xl border border-line bg-canvas-paper">
                <table className="w-full min-w-[560px] text-left text-[15px]">
                  <thead>
                    <tr className="border-b border-line text-sm text-muted">
                      <th className="px-5 py-3 font-medium">Email</th>
                      <th className="px-5 py-3 font-medium">Joining for</th>
                      <th className="px-5 py-3 font-medium">Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {waitlist.items.map((s) => (
                      <tr key={s.email} className="border-b border-line last:border-0">
                        <td className="px-5 py-3 font-semibold">{s.email}</td>
                        <td className="px-5 py-3 text-body">{(s.joiningFor && AUDIENCE[s.joiningFor]) || "Not recorded"}</td>
                        <td className="px-5 py-3 text-body">{when(s.subscribedAt)}</td>
                      </tr>
                    ))}
                    {waitlist.items.length === 0 && (
                      <tr>
                        <td colSpan={3} className="px-5 py-6 text-body">
                          Nobody has joined yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}

        {messages && (
          <section className="flex flex-col gap-4">
            <h2 className="font-display text-2xl font-medium">Messages, newest first</h2>
            {messages.length === 0 && <p className="text-body">No messages yet.</p>}
            <ul className="flex flex-col border-t border-line">
              {messages.map((m, i) => (
                <li key={`${m.email}-${m.createdAt}-${i}`} className="flex flex-col gap-2 border-b border-line py-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                    <p className="font-semibold">
                      {m.name}
                      {m.organisation ? <span className="font-normal text-body">, {m.organisation}</span> : null}
                    </p>
                    <p className="text-sm text-muted">
                      {m.topic === "pilot" ? "Clinical pilot" : "General"}. {when(m.createdAt)}
                    </p>
                  </div>
                  <a href={`mailto:${m.email}`} className="text-link self-start text-[15px]">
                    {m.email}
                  </a>
                  <p className="whitespace-pre-wrap text-body">{m.message}</p>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}
