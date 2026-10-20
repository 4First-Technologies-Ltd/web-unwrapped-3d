import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { fetchJob } from "@/lib/careers";
import { formatWat, type PublicJob } from "@/lib/careers-shared";

const SITE = "https://4firsttechnologies.com";

export const Route = createFileRoute("/careers/$slug")({
  loader: async ({ params }) => {
    const res = await fetchJob({ data: { slug: params.slug } });
    if (res.state === "not_found") throw notFound();
    return res;
  },
  head: ({ loaderData, params }) => {
    if (!loaderData || loaderData.state === "error") {
      return { meta: [{ title: "Careers — 4First Technologies" }] };
    }
    const j = loaderData.job;
    const open = loaderData.state === "open";
    return {
      meta: [
        { title: `${j.title} — Careers at 4First Technologies` },
        { name: "description", content: j.summary },
        { property: "og:title", content: `${j.title} — Careers at 4First Technologies` },
        { property: "og:description", content: j.summary },
        // closed/expired vacancies should drop out of search results
        ...(open ? [] : [{ name: "robots", content: "noindex" }]),
      ],
      links: [{ rel: "canonical", href: `${SITE}/careers/${params.slug}` }],
      scripts: open
        ? [{ type: "application/ld+json", children: JSON.stringify(jobPostingLd(j)) }]
        : [],
    };
  },
  notFoundComponent: () => (
    <Centered title="Vacancy not found">
      This vacancy doesn't exist or is no longer listed.
      <BackLink />
    </Centered>
  ),
  component: JobPage,
});

function jobPostingLd(j: PublicJob) {
  const typeMap: Record<string, string> = {
    "full-time": "FULL_TIME",
    "part-time": "PART_TIME",
    contract: "CONTRACTOR",
    internship: "INTERN",
    temporary: "TEMPORARY",
  };
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: j.title,
    description: `<p>${j.description.replace(/\n+/g, "</p><p>")}</p>`,
    identifier: { "@type": "PropertyValue", name: "4First Technologies", value: j.reference },
    datePosted: j.published_at,
    ...(j.application_deadline ? { validThrough: j.application_deadline } : {}),
    employmentType: typeMap[j.employment_type.toLowerCase()] ?? "OTHER",
    hiringOrganization: { "@type": "Organization", name: "4First Technologies Limited", sameAs: SITE },
    jobLocation: {
      "@type": "Place",
      address: { "@type": "PostalAddress", addressLocality: j.location },
    },
    ...(j.work_arrangement.toLowerCase() === "remote" ? { jobLocationType: "TELECOMMUTE" } : {}),
  };
}

function JobPage() {
  const res = Route.useLoaderData();

  if (res.state === "error") {
    return (
      <Centered title="We couldn't load this vacancy">
        Please refresh the page or try again shortly.
        <BackLink />
      </Centered>
    );
  }
  const job = res.job;
  const open = res.state === "open";

  return (
    <div className="mx-auto max-w-5xl px-5 sm:px-10">
      <section className="scene border-b border-border/70 py-16 md:py-24">
        <Link
          to="/careers"
          search={{ page: 1 }}
          className="text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-primary"
        >
          ← All vacancies
        </Link>
        <p className="mt-8 text-xs uppercase tracking-[0.3em] text-accent">{job.department}</p>
        <h1 className="mt-4 text-4xl md:text-6xl">{job.title}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          {job.summary}
        </p>

        <dl className="mt-8 grid gap-x-8 gap-y-4 text-sm sm:grid-cols-2 md:grid-cols-3">
          <Fact label="Location" value={job.location} />
          <Fact label="Employment type" value={job.employment_type} />
          <Fact label="Work arrangement" value={job.work_arrangement} />
          {job.published_at && <Fact label="Posted" value={formatWat(job.published_at)} />}
          {job.application_deadline && (
            <Fact label="Apply by" value={formatWat(job.application_deadline, true)} />
          )}
          <Fact label="Reference" value={job.reference} />
        </dl>

        {!open && (
          <div
            role="status"
            className="mt-8 rounded-sm border border-border/70 bg-card/50 p-5 text-sm"
          >
            <strong>This position is no longer accepting applications.</strong>{" "}
            <Link to="/careers" search={{ page: 1 }} className="text-primary hover:underline">
              See current vacancies
            </Link>
          </div>
        )}
        {open && <ApplyButton slug={job.slug} className="mt-8" />}
      </section>

      <div className="space-y-12 py-14">
        <Block title="About the role">
          {job.description.split(/\n{2,}/).map((p, i) => (
            <p key={i} className="leading-relaxed text-muted-foreground">
              {p}
            </p>
          ))}
        </Block>
        <List title="Key responsibilities" items={job.responsibilities} />
        <List
          title="Required qualifications and experience"
          items={[...job.qualifications, ...job.skills]}
        />
        <List title="Preferred qualifications" items={job.preferred} />
        {(job.salary_range || job.benefits.length > 0) && (
          <Block title="Compensation and benefits">
            {job.salary_range && <p className="text-muted-foreground">Salary: {job.salary_range}</p>}
            {job.benefits.length > 0 && <Bullets items={job.benefits} />}
          </Block>
        )}
        {(job.application_instructions || job.recruitment_contact) && (
          <Block title="How to apply">
            {job.application_instructions && (
              <p className="leading-relaxed text-muted-foreground">
                {job.application_instructions}
              </p>
            )}
            {job.recruitment_contact && (
              <p className="text-muted-foreground">Questions? {job.recruitment_contact}</p>
            )}
          </Block>
        )}
        {open && <ApplyButton slug={job.slug} />}
      </div>
    </div>
  );
}

function ApplyButton({ slug, className = "" }: { slug: string; className?: string }) {
  return (
    <Link
      to="/careers/apply/$slug"
      params={{ slug }}
      className={`inline-flex items-center justify-center rounded-sm bg-primary px-6 py-4 text-sm font-medium text-primary-foreground transition hover:brightness-110 ${className}`}
    >
      Apply for This Job →
    </Link>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</dt>
      <dd className="mt-1">{value}</dd>
    </div>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-2xl md:text-3xl">{title}</h2>
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-2 pl-5 text-muted-foreground marker:text-primary">
      {items.map((it, i) => (
        <li key={i}>{it}</li>
      ))}
    </ul>
  );
}

function List({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) return null;
  return (
    <Block title={title}>
      <Bullets items={items} />
    </Block>
  );
}

function BackLink() {
  return (
    <div className="mt-6">
      <Link to="/careers" search={{ page: 1 }} className="text-sm text-primary hover:underline">
        ← Back to Careers
      </Link>
    </div>
  );
}

function Centered({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-xl px-5 py-32 text-center">
      <h1 className="text-3xl">{title}</h1>
      <div className="mt-4 text-sm text-muted-foreground">{children}</div>
    </div>
  );
}
