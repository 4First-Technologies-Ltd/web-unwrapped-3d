import { createFileRoute, ClientOnly, Link } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

const Scene3D = lazy(() => import("@/components/Scene3D"));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "4First Technologies — Smarter Tech, Safer World" },
      {
        name: "description",
        content:
          "Nigerian technology company building intelligent systems, secure infrastructure and AI-backed products that remove guesswork from everyday decisions.",
      },
      { property: "og:title", content: "4First Technologies — Smarter Tech, Safer World" },
      {
        property: "og:description",
        content:
          "Intelligent systems, product engineering, cybersecurity and advisory — built in Owerri, shipped everywhere.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const principles = [
  {
    n: "01",
    t: "Certainty over cleverness",
    d: "Systems that give a straight answer beat systems that impress. We optimise for the moment the user stops guessing.",
  },
  {
    n: "02",
    t: "Intelligence as infrastructure",
    d: "AI isn't a feature — it's the wiring. We embed it where decisions happen, not where demos look good.",
  },
  {
    n: "03",
    t: "Built for African context",
    d: "Bandwidth-aware, resilient, secure. Products that hold up between Owerri and Lagos, not just on staging.",
  },
  {
    n: "04",
    t: "Cybersecurity as a first move",
    d: "Every system we ship is threat-modelled before it's beautified. Trust compounds; regret is expensive.",
  },
];

const capabilities = [
  {
    n: "01",
    t: "Intelligent Systems",
    d: "LLM-backed workflows, decision engines, autonomous processes.",
  },
  {
    n: "02",
    t: "Product Engineering",
    d: "Web, mobile, and backend platforms — shipped and maintained.",
  },
  {
    n: "03",
    t: "Cybersecurity",
    d: "Threat modelling, hardening, and incident-ready operations.",
  },
  {
    n: "04",
    t: "Advisory",
    d: "Technology strategy for founders and mid-market operators.",
  },
];

const marquee = [
  "Signal, not noise.",
  "Certainty at the point of use.",
  "Built in Owerri.",
  "Shipped everywhere.",
];

function Index() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <ClientOnly fallback={null}>
          <Suspense fallback={null}>
            <Scene3D />
          </Suspense>
        </ClientOnly>
      </div>
      <div className="pointer-events-none fixed inset-0 -z-10 depth-veil" />

      <main id="top">
        <section className="scene mx-auto flex min-h-[88vh] max-w-384 flex-col justify-center px-10 py-24">
          <p className="text-xs uppercase tracking-[0.32em] text-muted-foreground">
            4First Technologies Limited · Owerri, NG
          </p>
          <h1 className="mt-8 max-w-4xl text-5xl leading-[0.95] md:text-7xl">
            Intelligent systems that eliminate{" "}
            <span className="bg-clip-text edge-gradient text-transparent">uncertainty</span> in
            everyday use.
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
            We're a Nigerian technology company building the invisible layer between people and
            their decisions — software, AI, and secure infrastructure that removes the guesswork
            from work, mobility, and daily life.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/contact"
              className="rounded-sm bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:-translate-y-0.5"
            >
              Start a project →
            </Link>
            <Link
              to="/services"
              className="rounded-sm border border-border px-6 py-3 text-sm text-foreground transition-colors hover:border-primary/60 hover:text-primary"
            >
              What we do
            </Link>
          </div>

          <dl className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-border/70 bg-border/70 md:grid-cols-4">
            {[
              ["04", "Practice areas"],
              ["100%", "In-house engineering"],
              ["NG", "Rooted, global-ready"],
              ["2026", "Building since"],
            ].map(([v, l]) => (
              <div key={l} className="bg-card/60 px-5 py-6 backdrop-blur-md">
                <dt className="font-display text-2xl text-primary">{v}</dt>
                <dd className="mt-1 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  {l}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section id="principles" className="scene mx-auto max-w-384 px-10 py-24">
          <p className="text-xs uppercase tracking-[0.3em] text-accent">
            § 01 — Operating principles
          </p>
          <h2 className="mt-6 max-w-2xl text-3xl md:text-5xl">
            We build for the moment after the decision.
          </h2>
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {principles.map((p) => (
              <article
                key={p.n}
                className="card-3d card-3d-hover rounded-sm border border-border/70 bg-card/50 p-8 backdrop-blur-xl"
              >
                <span className="font-display text-sm text-primary">{p.n}</span>
                <h3 className="mt-4 text-xl">{p.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.d}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="capabilities" className="scene mx-auto max-w-384 px-10 py-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-accent">§ 02 — Capabilities</p>
              <h2 className="mt-6 max-w-2xl text-3xl md:text-5xl">
                Four disciplines. One system of thought.
              </h2>
            </div>
            <Link to="/services" className="text-sm text-primary transition hover:brightness-110">
              Full services index →
            </Link>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {capabilities.map((c, i) => (
              <article
                key={c.n}
                className="card-3d card-3d-hover group rounded-sm border border-border/70 bg-card/50 p-8 backdrop-blur-xl"
                style={{ transform: `rotateX(6deg) rotateY(${i % 2 ? 8 : -8}deg)` }}
              >
                <div className="flex items-baseline justify-between">
                  <span className="font-display text-4xl text-muted-foreground/40">{c.n}</span>
                  <span className="text-xs uppercase tracking-[0.2em] text-primary opacity-0 transition-opacity group-hover:opacity-100">
                    Read →
                  </span>
                </div>
                <h3 className="mt-6 text-2xl">{c.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.d}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="relative overflow-hidden border-y border-border/60 bg-card/30 py-8 backdrop-blur-md">
          <div className="marquee-track flex w-max gap-10 whitespace-nowrap font-display text-2xl md:text-4xl">
            {[...marquee, ...marquee, ...marquee, ...marquee].map((m, i) => (
              <span key={i} className="flex items-center gap-10 text-muted-foreground">
                {m} <span className="text-primary">✦</span>
              </span>
            ))}
          </div>
        </section>

        <section id="engage" className="scene mx-auto max-w-384 px-10 py-32">
          <p className="text-xs uppercase tracking-[0.3em] text-accent">§ 03 — Engage</p>
          <div className="card-3d card-3d-hover floaty mt-8 rounded-sm border border-border/70 bg-card/50 p-10 backdrop-blur-xl md:p-16">
            <h2 className="max-w-2xl text-3xl md:text-5xl">
              Have a system worth removing the doubt from?
            </h2>
            <Link
              to="/contact"
              className="mt-10 inline-flex rounded-sm bg-primary px-7 py-3 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              Start the conversation →
            </Link>
            <a
              href="mailto:4firsttechnologieslimited@gmail.com"
              className="mt-6 block text-sm text-muted-foreground hover:text-primary transition"
            >
              4firsttechnologieslimited@gmail.com
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
