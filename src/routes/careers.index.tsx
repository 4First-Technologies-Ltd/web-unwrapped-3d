import { createFileRoute, Link } from "@tanstack/react-router";
import { fetchJobs } from "@/lib/careers";
import { formatWat, type JobListItem } from "@/lib/careers-shared";

export const Route = createFileRoute("/careers/")({
  validateSearch: (s: Record<string, unknown>): { page?: number } => {
    const n = Math.floor(Number(s["page"]));
    return n > 1 ? { page: n } : {};
  },
  loaderDeps: ({ search }) => ({ page: search.page ?? 1 }),
  loader: ({ deps }) => fetchJobs({ data: { page: deps.page } }),
  head: () => ({
    meta: [
      { title: "Careers — 4First Technologies" },
      {
        name: "description",
        content:
          "Explore open roles at 4First Technologies and apply online. Help us build smarter technology and a safer world.",
      },
      { property: "og:title", content: "Careers — 4First Technologies" },
    ],
    links: [{ rel: "canonical", href: "https://4firsttechnologies.com/careers" }],
  }),
  component: CareersPage,
});

function CareersPage() {
  const { ok, jobs, total, page, pageSize } = Route.useLoaderData();
  const pages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <div className="mx-auto max-w-384 px-5 sm:px-10">
      <section className="scene border-b border-border/70 py-20 md:py-28">
        <p className="text-xs uppercase tracking-[0.3em] text-accent">Careers</p>
        <h1 className="mt-6 max-w-[18ch] text-5xl md:text-7xl">
          Build smarter tech. Make the world safer.
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Browse our current openings and apply online — no account needed. Pick a role, read what
          it involves, and send us your details and CV.
        </p>
      </section>

      <section className="py-14" aria-live="polite">
        {!ok ? (
          <Notice title="We couldn't load vacancies right now.">
            Please refresh the page or try again in a few minutes.
          </Notice>
        ) : jobs.length === 0 ? (
          <Notice title="No current vacancies">
            No current vacancies at the moment. We're always looking for people who share our vision
            for building smarter technology and a safer world. Please check back for future
            opportunities.
            <div className="mt-6">
              <Link to="/" className="text-sm text-primary hover:underline">
                ← Back to the main website
              </Link>
            </div>
          </Notice>
        ) : (
          <>
            <p className="mb-6 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {total} open {total === 1 ? "role" : "roles"}
            </p>
            <ul className="grid gap-4">
              {jobs.map((j) => (
                <JobCard key={j.id} job={j} />
              ))}
            </ul>
            {pages > 1 && (
              <nav className="mt-10 flex items-center justify-between text-sm" aria-label="Pagination">
                {page > 1 ? (
                  <Link to="/careers" search={{ page: page - 1 }} className="text-primary hover:underline">
                    ← Newer
                  </Link>
                ) : (
                  <span />
                )}
                <span className="text-muted-foreground">
                  Page {page} of {pages}
                </span>
                {page < pages ? (
                  <Link to="/careers" search={{ page: page + 1 }} className="text-primary hover:underline">
                    Older →
                  </Link>
                ) : (
                  <span />
                )}
              </nav>
            )}
          </>
        )}
      </section>
    </div>
  );
}

function JobCard({ job }: { job: JobListItem }) {
  return (
    <li className="card-3d card-3d-hover rounded-sm border border-border/70 bg-card/50 p-6 backdrop-blur-xl md:p-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0">
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {job.department}
          </div>
          <h2 className="mt-2 text-2xl md:text-3xl">{job.title}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {job.summary}
          </p>
          <dl className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <Meta label="Type" value={job.employment_type} />
            <Meta label="Arrangement" value={job.work_arrangement} />
            <Meta label="Location" value={job.location} />
            {job.published_at && <Meta label="Posted" value={formatWat(job.published_at)} />}
            {job.application_deadline && (
              <Meta label="Apply by" value={formatWat(job.application_deadline)} />
            )}
          </dl>
        </div>
        <Link
          to="/careers/$slug"
          params={{ slug: job.slug }}
          aria-label={`View job: ${job.title}`}
          className="inline-flex shrink-0 items-center justify-center rounded-sm border border-primary/50 px-5 py-3 text-xs uppercase tracking-[0.18em] text-primary transition-all hover:bg-primary hover:text-primary-foreground"
        >
          View job →
        </Link>
      </div>
    </li>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-2">
      <dt className="text-muted-foreground">{label}:</dt>
      <dd>{value}</dd>
    </div>
  );
}

function Notice({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-2xl rounded-sm border border-border/70 bg-card/50 p-8 text-center">
      <h2 className="text-2xl">{title}</h2>
      <div className="mt-3 text-sm leading-relaxed text-muted-foreground">{children}</div>
    </div>
  );
}
