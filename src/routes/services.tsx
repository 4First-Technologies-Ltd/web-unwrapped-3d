import { createFileRoute, Link } from "@tanstack/react-router";
import { fetchSiteContent } from "@/lib/cms";
import {
  buildPageHead,
  renderHeading,
  proseOne,
  getPageMeta,
  SITE_SETTINGS,
  SERVICES_LIST,
  SERVICES_PROCESS,
  SERVICES_PROCESS_INTRO,
  type Service,
  type Step,
} from "@/content/defaults";

const COLLECTIONS = ["services.list", "services.processIntro", "services.process"];

export const Route = createFileRoute("/services")({
  loader: () =>
    fetchSiteContent({ data: { slug: "services", collections: COLLECTIONS } }).catch(() => ({
      meta: getPageMeta("services"),
      collections: {
        "services.list": SERVICES_LIST,
        "services.processIntro": SERVICES_PROCESS_INTRO,
        "services.process": SERVICES_PROCESS,
      },
      settings: SITE_SETTINGS,
    })),
  head: ({ loaderData }) => buildPageHead("services", loaderData?.meta),
  component: ServicesPage,
});

function ServicesPage() {
  const { collections, meta } = Route.useLoaderData();
  const hero = meta?.hero ?? getPageMeta("services").hero;
  const processIntro = proseOne(collections["services.processIntro"], SERVICES_PROCESS_INTRO);
  const services =
    (collections["services.list"] as unknown as Service[] | undefined) ?? SERVICES_LIST;
  const process =
    (collections["services.process"] as unknown as Step[] | undefined) ?? SERVICES_PROCESS;

  return (
    <div className="mx-auto max-w-384 px-5 sm:px-10">
      <section className="scene border-b border-border/70 py-20 md:py-28">
        <p className="text-xs uppercase tracking-[0.3em] text-accent">{hero.eyebrow}</p>
        <h1 className="mt-6 max-w-[16ch] text-5xl md:text-7xl">{renderHeading(hero.heading)}</h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          {(hero.intro ?? []).join(" ")}
        </p>
      </section>

      <section className="border-b border-border/70 py-12">
        {services.map((s) => (
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
              {(s.deliverables ?? []).map((d) => (
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
        <p className="text-xs uppercase tracking-[0.3em] text-accent">{processIntro.eyebrow}</p>
        <h2 className="mt-4 text-3xl md:text-5xl">{processIntro.heading}</h2>
        <div className="mt-14 grid gap-6 md:grid-cols-4">
          {process.map((p) => (
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
