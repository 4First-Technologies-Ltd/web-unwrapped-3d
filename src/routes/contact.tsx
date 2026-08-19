import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(320),
  company: z.string().trim().max(200).optional().default(""),
  interests: z.array(z.string().max(100)).max(10).default([]),
  brief: z.string().trim().min(1).max(5000),
});

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const sendContactEmail = createServerFn({ method: "POST" })
  .inputValidator(contactSchema)
  .handler(async ({ data }) => {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error("RESEND_API_KEY is not configured");
    }
    const to = process.env.CONTACT_TO_EMAIL || "4firsttechnologieslimited@gmail.com";
    const from = process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";

    const rows = [
      ["Name", data.name],
      ["Email", data.email],
      ["Company", data.company || "—"],
      ["Interest", data.interests.length ? data.interests.join(", ") : "—"],
    ]
      .map(
        ([label, value]) =>
          `<tr><td style="padding:4px 16px 4px 0;color:#666;font-size:13px;">${label}</td><td style="padding:4px 0;font-size:14px;">${escapeHtml(value)}</td></tr>`,
      )
      .join("");

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `4First Website <${from}>`,
        to: [to],
        reply_to: data.email,
        subject: `New project intake from ${data.name}`,
        html: `<table style="border-collapse:collapse;">${rows}</table><p style="font-size:13px;color:#666;margin:16px 0 4px;">What are they trying to solve?</p><p style="font-size:14px;white-space:pre-wrap;">${escapeHtml(data.brief)}</p>`,
        text: `Name: ${data.name}\nEmail: ${data.email}\nCompany: ${data.company || "—"}\nInterest: ${data.interests.join(", ") || "—"}\n\n${data.brief}`,
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error(`Resend API error (${res.status}): ${body}`);
      throw new Error("Failed to send message");
    }

    return { ok: true };
  });

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — 4First Technologies" },
      {
        name: "description",
        content:
          "Get in touch with 4First Technologies. Based in Owerri, Nigeria. We reply within two working days.",
      },
      { property: "og:title", content: "Contact — 4First Technologies" },
      { property: "og:description", content: "Start a project or send a note." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    setError(null);

    const form = e.currentTarget;
    const fd = new FormData(form);
    try {
      await sendContactEmail({
        data: {
          name: String(fd.get("name") ?? ""),
          email: String(fd.get("email") ?? ""),
          company: String(fd.get("company") ?? ""),
          interests: fd.getAll("interest").map(String),
          brief: String(fd.get("brief") ?? ""),
        },
      });
      setSent(true);
    } catch {
      setError(
        "Something went wrong sending your message. Please try again, or email 4firsttechnologieslimited@gmail.com directly.",
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <section className="scene mx-auto min-h-[80vh] max-w-384 border-b border-border/70 px-5 py-20 sm:px-10 md:py-28">
      <div className="grid gap-16 md:grid-cols-[1fr_1.2fr]">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-accent">§ Contact</p>
          <h1 className="mt-6 text-5xl md:text-6xl">
            Say the <span className="text-primary">quiet</span> part loud.
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
            Tell us the problem in plain language. If it's the kind of thing we can help with,
            you'll hear from a founder within two working days.
          </p>

          <div className="mt-12 space-y-6 border-t border-border/70 pt-8">
            <Detail
              label="Email"
              value="4firsttechnologieslimited@gmail.com"
              href="mailto:4firsttechnologieslimited@gmail.com"
            />
            <Detail label="Phone" value="+234 906 476 8335" href="tel:+2349064768335" />
            <Detail
              label="LinkedIn"
              value="4First Technologies Ltd"
              href="https://www.linkedin.com/company/4firsttechnologieslimited/"
            />
            <Detail label="Studio" value="Owerri · Imo State · Nigeria" />
            <Detail label="Hours" value="Mon – Fri · 09:00 – 18:00 WAT" />

            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Socials
              </div>
              <a
                href="https://linktr.ee/4firsttechnologieslimited"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="4First Technologies Linktree"
                className="mt-2 inline-flex h-10 w-10 items-center justify-center rounded-sm border border-border/70 bg-background/50 text-muted-foreground transition hover:border-primary hover:text-primary"
              >
                <ShareIcon />
              </a>
            </div>
          </div>
        </div>

        <div className="card-3d card-3d-hover rounded-sm border border-border/70 bg-card/50 p-8 backdrop-blur-xl md:p-10">
          {sent ? (
            <div className="flex h-full min-h-[400px] flex-col items-center justify-center text-center">
              <div className="font-display text-6xl text-primary">✓</div>
              <h2 className="mt-6 text-3xl">Message received.</h2>
              <p className="mt-3 max-w-sm text-sm text-muted-foreground">
                We'll reply within two working days. In the meantime, feel free to email
                4firsttechnologieslimited@gmail.com directly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Project intake / v1
              </div>
              <Field label="Your name" name="name" required />
              <Field label="Email" name="email" type="email" required />
              <Field label="Company" name="company" />
              <div>
                <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Interest
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {["Intelligent systems", "Product engineering", "Cybersecurity", "Advisory"].map(
                    (o) => (
                      <label
                        key={o}
                        className="flex cursor-pointer items-center gap-2 rounded-sm border border-border/70 bg-background/50 px-3 py-2.5 text-sm transition hover:border-primary"
                      >
                        <input type="checkbox" name="interest" value={o} className="accent-primary" />
                        {o}
                      </label>
                    ),
                  )}
                </div>
              </div>
              <div>
                <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  What are you trying to solve?
                </label>
                <textarea
                  name="brief"
                  required
                  rows={5}
                  className="w-full rounded-sm border border-border/70 bg-background/50 px-3 py-2.5 text-sm text-foreground transition focus:border-primary focus:outline-none"
                  placeholder="A paragraph is fine."
                />
              </div>
              {error && <p className="text-sm text-destructive">{error}</p>}
              <button
                type="submit"
                disabled={sending}
                className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-primary px-5 py-4 text-sm font-medium text-primary-foreground transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {sending ? "Sending…" : "Send message →"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-muted-foreground">
        {label} {required && <span className="text-primary">*</span>}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        className="w-full rounded-sm border border-border/70 bg-background/50 px-3 py-2.5 text-sm text-foreground transition focus:border-primary focus:outline-none"
      />
    </div>
  );
}

function ShareIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  );
}

function Detail({ label, value, href }: { label: string; value: string; href?: string }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</div>
      {href ? (
        <a href={href} className="mt-1 block text-lg transition hover:text-primary">
          {value}
        </a>
      ) : (
        <div className="mt-1 text-lg">{value}</div>
      )}
    </div>
  );
}
