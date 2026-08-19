import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Work — 4First Technologies" },
      {
        name: "description",
        content:
          "A selection of ongoing and shipped work from 4First Technologies — intelligent systems built in Nigeria.",
      },
      { property: "og:title", content: "Work — 4First Technologies" },
      { property: "og:description", content: "Selected engagements and in-house products." },
      { property: "og:url", content: "/work" },
    ],
    links: [{ rel: "canonical", href: "/work" }],
  }),
  component: WorkPage,
});

const CASES = [
  {
    year: "2026",
    title: "In-house intelligent workflow engine",
    kind: "Internal product",
    tag: "Intelligent Systems",
    body: "A decision engine that turns fragmented operational inputs into a single, actionable next step for field teams. Currently in private pilot.",
  },
  {
    year: "2025",
    title: "Cybersecurity hardening program",
    kind: "Partner engagement",
    tag: "Cybersecurity",
    body: "Threat modelling and infrastructure hardening for a regional mobility platform. Reduced exposed surface area by an order of magnitude within one quarter.",
  },
  {
    year: "2025",
    title: "Product platform for a media venture",
    kind: "Partner engagement",
    tag: "Product Engineering",
    body: "Full-stack platform build — web, backend, and deployment pipeline — for a sister-brand transtech venture serving urban commuters.",
  },
  {
    year: "2024",
    title: "Technology advisory · early-stage founder",
    kind: "Advisory",
    tag: "Advisory",
    body: "Architecture selection, vendor triage, and hiring plan for a founder preparing to move from prototype to first paying customers.",
  },
];

function WorkPage() {
  return (
    <div className="mx-auto max-w-384 px-10">
      <section className="scene border-b border-border/70 py-20 md:py-28">
        <p className="text-xs uppercase tracking-[0.3em] text-accent">§ Selected work</p>
        <h1 className="mt-6 max-w-[16ch] text-5xl md:text-7xl">
          Systems in <span className="text-primary">production</span>.
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          A running index of what we've built, what we're building, and where we've been useful.
          Some engagements are under NDA — reach out for a deeper conversation.
        </p>
      </section>

      <section className="border-b border-border/70">
        {CASES.map((c, i) => (
          <article
            key={i}
            className="card-3d card-3d-hover -mx-10 grid gap-6 border-b border-border/70 px-10 py-14 last:border-b-0 md:grid-cols-[120px_1fr_1fr] md:gap-12"
          >
            <div>
              <div className="font-display text-3xl text-primary">{c.year}</div>
              <div className="mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {c.kind}
              </div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {c.tag}
              </div>
              <h2 className="mt-2 text-2xl md:text-3xl">{c.title}</h2>
            </div>
            <p className="self-center text-base leading-relaxed text-muted-foreground">{c.body}</p>
          </article>
        ))}
      </section>

      <section className="py-20">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-accent">§ Under NDA</p>
            <p className="mt-2 max-w-xl text-2xl">
              We can talk about most of it in a room. Not all of it on a page.
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            Request a briefing →
          </Link>
        </div>
      </section>
    </div>
  );
}
