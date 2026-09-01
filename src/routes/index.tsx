import { createFileRoute, ClientOnly, Link } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { fetchSiteContent } from "@/lib/cms";
import {
  buildPageHead,
  renderHeading,
  proseOne,
  getPageMeta,
  SITE_SETTINGS,
  HOME_PRINCIPLES,
  HOME_PRINCIPLES_INTRO,
  HOME_CAPABILITIES,
  HOME_CAPABILITIES_INTRO,
  HOME_ENGAGE,
  type Step,
} from "@/content/defaults";

const Scene3D = lazy(() => import("@/components/Scene3D"));

const COLLECTIONS = [
  "home.principlesIntro",
  "home.principles",
  "home.capabilitiesIntro",
  "home.capabilities",
  "home.engage",
];

export const Route = createFileRoute("/")({
  loader: () =>
    fetchSiteContent({ data: { slug: "home", collections: COLLECTIONS } }).catch(() => ({
      meta: getPageMeta("home"),
      collections: {
        "home.principlesIntro": HOME_PRINCIPLES_INTRO,
        "home.principles": HOME_PRINCIPLES,
        "home.capabilitiesIntro": HOME_CAPABILITIES_INTRO,
        "home.capabilities": HOME_CAPABILITIES,
        "home.engage": HOME_ENGAGE,
      },
      settings: SITE_SETTINGS,
    })),
  head: ({ loaderData }) => buildPageHead("home", loaderData?.meta),
  component: Index,
});

function Index() {
  const { collections, settings, meta } = Route.useLoaderData();
  const hero = meta?.hero ?? getPageMeta("home").hero;
  const principlesIntro = proseOne(collections["home.principlesIntro"], HOME_PRINCIPLES_INTRO);
  const capabilitiesIntro = proseOne(
    collections["home.capabilitiesIntro"],
    HOME_CAPABILITIES_INTRO,
  );
  const engage = proseOne(collections["home.engage"], HOME_ENGAGE);
  const principles =
    (collections["home.principles"] as unknown as Step[] | undefined) ?? HOME_PRINCIPLES;
  const capabilities =
    (collections["home.capabilities"] as unknown as Step[] | undefined) ?? HOME_CAPABILITIES;
  const marquee = settings.ticker;

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
        <section className="scene mx-auto flex min-h-[88vh] max-w-384 flex-col justify-center px-5 py-24 sm:px-10">
          <p className="text-xs uppercase tracking-[0.32em] text-muted-foreground">{hero.eyebrow}</p>
          <h1 className="mt-8 max-w-4xl text-5xl leading-[0.95] md:text-7xl">
            {renderHeading(hero.heading, "bg-clip-text edge-gradient text-transparent")}
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
            {(hero.intro ?? []).join(" ")}
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
            {settings.metrics.map((m) => (
              <div key={m.l} className="bg-card/60 px-5 py-6 backdrop-blur-md">
                <dt className="font-display text-2xl text-primary">{m.n}</dt>
                <dd className="mt-1 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  {m.l}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section id="principles" className="scene mx-auto max-w-384 px-5 py-24 sm:px-10">
          <p className="text-xs uppercase tracking-[0.3em] text-accent">{principlesIntro.eyebrow}</p>
          <h2 className="mt-6 max-w-2xl text-3xl md:text-5xl">{principlesIntro.heading}</h2>
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

        <section id="capabilities" className="scene mx-auto max-w-384 px-5 py-24 sm:px-10">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-accent">
                {capabilitiesIntro.eyebrow}
              </p>
              <h2 className="mt-6 max-w-2xl text-3xl md:text-5xl">{capabilitiesIntro.heading}</h2>
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

        <section id="engage" className="scene mx-auto max-w-384 px-5 py-32 sm:px-10">
          <p className="text-xs uppercase tracking-[0.3em] text-accent">{engage.eyebrow}</p>
          <div className="card-3d card-3d-hover floaty mt-8 rounded-sm border border-border/70 bg-card/50 p-10 backdrop-blur-xl md:p-16">
            <h2 className="max-w-2xl text-3xl md:text-5xl">{engage.heading}</h2>
            <Link
              to="/contact"
              className="mt-10 inline-flex rounded-sm bg-primary px-7 py-3 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              Start the conversation →
            </Link>
            <a
              href={`mailto:${settings.contact_email}`}
              className="mt-6 block text-sm text-muted-foreground hover:text-primary transition"
            >
              {settings.contact_email}
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
