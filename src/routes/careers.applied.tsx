import { createFileRoute, Link } from "@tanstack/react-router";
import { fetchConfirmation } from "@/lib/careers";
import { formatWat } from "@/lib/careers-shared";

export const Route = createFileRoute("/careers/applied")({
  validateSearch: (s: Record<string, unknown>) => ({ ref: String(s["ref"] ?? "") }),
  loaderDeps: ({ search }) => ({ ref: search.ref }),
  // Read-only lookup: refreshing this page can never create another application.
  loader: ({ deps }) => fetchConfirmation({ data: { ref: deps.ref } }),
  head: () => ({
    meta: [{ title: "Application submitted — 4First Technologies" }, { name: "robots", content: "noindex" }],
  }),
  component: AppliedPage,
});

function AppliedPage() {
  const app = Route.useLoaderData();
  const { ref } = Route.useSearch();

  return (
    <div className="mx-auto max-w-2xl px-5 py-20 sm:px-10 md:py-28">
      <div role="status" className="rounded-sm border border-border/70 bg-card/50 p-8 text-center md:p-12">
        <div aria-hidden className="font-display text-6xl text-primary">✓</div>
        <h1 className="mt-6 text-3xl md:text-4xl">Application Submitted Successfully</h1>
        <div className="mt-6 space-y-4 text-left text-sm leading-relaxed text-muted-foreground">
          <p>Thank you for your interest in joining 4First Technologies Limited.</p>
          <p>
            Your application has been received successfully. Our team will review your submission,
            and if your qualifications and experience match our requirements, we will reach out to
            you regarding the next steps.
          </p>
          <p>
            We appreciate your interest in building smarter technology and a safer world with us.
          </p>
        </div>

        <dl className="mt-8 grid gap-4 border-t border-border/70 pt-6 text-left text-sm sm:grid-cols-3">
          <Detail label="Application reference" value={app?.reference ?? (ref || "—")} mono />
          <Detail label="Position" value={app?.jobTitle ?? "—"} />
          <Detail label="Submitted" value={app ? formatWat(app.submittedAt, true) : "—"} />
        </dl>
        <p className="mt-6 text-xs text-muted-foreground">
          Please keep your application reference number for your records.
        </p>

        <Link
          to="/careers"
          search={{ page: 1 }}
          className="mt-8 inline-flex items-center justify-center rounded-sm border border-primary/50 px-5 py-3 text-xs uppercase tracking-[0.18em] text-primary transition-all hover:bg-primary hover:text-primary-foreground"
        >
          ← Back to Careers
        </Link>
      </div>
    </div>
  );
}

function Detail({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</dt>
      <dd className={`mt-1 break-words ${mono ? "font-mono text-primary" : ""}`}>{value}</dd>
    </div>
  );
}
