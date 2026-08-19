import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — 4First Technologies" },
      {
        name: "description",
        content:
          "Four practices: intelligent systems, product engineering, cybersecurity, and advisory. Built by 4First Technologies.",
      },
      { property: "og:title", content: "Services — 4First Technologies" },
      {
        property: "og:description",
        content: "Intelligent systems, product engineering, cybersecurity, advisory.",
      },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesPage,
});

const SERVICES = [
  {
    n: "01",
    title: "Intelligent Systems",
    tag: "AI · Automation · Decision Engines",
    body: "We embed intelligence at the point of decision. LLM-backed workflows, retrieval systems and autonomous processes that turn ambiguous inputs into clear next steps.",
    deliverables: [
      "Custom AI copilots & agents",
      "Retrieval-augmented knowledge systems",
      "Workflow automation & decision engines",
      "Model evaluation & prompt engineering",
    ],
  },
  {
    n: "02",
    title: "Product Engineering",
    tag: "Web · Mobile · Platform",
    body: "End-to-end product build from a napkin sketch to a live, monitored, scalable platform. We own the stack: frontend, backend, infra and the operational cadence that keeps it healthy.",
    deliverables: [
      "Web & mobile applications",
      "APIs, backend platforms & integrations",
      "Cloud infrastructure & DevOps",
      "Design systems & interaction design",
    ],
  },
  {
    n: "03",
    title: "Cybersecurity",
    tag: "Defence · Assurance · Response",
    body: "Security is our co-founder practice. Threat modelling, hardening and incident-ready operations for teams that can't afford to guess whether their systems are safe.",
    deliverables: [
      "Threat modelling & risk assessment",
      "Application & infrastructure hardening",
      "Security operations & monitoring",
      "Incident response readiness",
    ],
  },
  {
    n: "04",
    title: "Advisory",
    tag: "Strategy · Architecture · Diligence",
    body: "For founders and operators making bet-the-company technology decisions. We help you choose what to build, what to buy and what to walk away from.",
    deliverables: [
      "Technology strategy & roadmapping",
      "Architecture review & selection",
      "Technical due diligence",
      "Fractional CTO engagements",
    ],
  },
];

const PROCESS = [
  {
    n: "01",
    t: "Frame",
    d: "We define the problem in plain language the decision, the user, the constraint.",
  },
  { n: "02", t: "Build", d: "Small, senior team. Working software in weeks, not slides in months." },
  {
    n: "03",
    t: "Harden",
    d: "Security, observability, and load-tested behaviour baked in never bolted on.",
  },
  { n: "04", t: "Operate", d: "We stay after launch. Systems get maintained by the people who built them." },
];

function ServicesPage() {
  return (
    <div className="mx-auto max-w-384 px-5 sm:px-10">
      <section className="scene border-b border-border/70 py-20 md:py-28">
        <p className="text-xs uppercase tracking-[0.3em] text-accent">§ Services</p>
        <h1 className="mt-6 max-w-[16ch] text-5xl md:text-7xl">
          Four practices, one <span className="text-primary">operating system</span>.
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          We're organised around the disciplines that most often collide in real products.
          Engineering, AI and cybersecurity aren't handed off between vendors they're
          practised on the same team, at the same table.
        </p>
      </section>

      <section className="border-b border-border/70 py-12">
        {SERVICES.map((s) => (
          <div
            key={s.n}
            className="grid gap-8 border-b border-border/70 py-14 last:border-b-0 md:grid-cols-[160px_1fr_1fr] md:gap-16"
          >
            <div>
              <div className="font-display text-5xl text-primary">{s.n}</div>
              <div className="mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {s.tag}
              </div>
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl">{s.title}</h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">{s.body}</p>
            </div>
            <ul className="space-y-2.5 text-sm">
              {s.deliverables.map((d) => (
                <li key={d} className="flex gap-3">
                  <span className="font-mono text-primary">→</span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="border-b border-border/70 bg-card/20 py-20 md:py-28">
        <p className="text-xs uppercase tracking-[0.3em] text-accent">§ Process</p>
        <h2 className="mt-4 text-3xl md:text-5xl">How the work moves.</h2>
        <div className="mt-14 grid gap-6 md:grid-cols-4">
          {PROCESS.map((p) => (
            <div
              key={p.n}
              className="card-3d card-3d-hover rounded-sm border border-border/70 bg-card/50 p-8 backdrop-blur-xl"
            >
              <div className="font-mono text-sm text-primary">{p.n}</div>
              <div className="mt-3 text-2xl">{p.t}</div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20">
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
        >
          Discuss an engagement →
        </Link>
      </section>
    </div>
  );
}
