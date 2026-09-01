import { createFileRoute, Link } from "@tanstack/react-router";
import { fetchSiteContent } from "@/lib/cms";
import {
  buildPageHead,
  renderHeading,
  proseOne,
  getPageMeta,
  SITE_SETTINGS,
  PRODUCTS_PROBLEM,
  PRODUCTS_HOW_INTRO,
  PRODUCTS_HOW,
  PRODUCTS_AUDIENCES_INTRO,
  PRODUCTS_AUDIENCES,
  PRODUCTS_BEYOND,
  PRODUCTS_PLATFORM,
  PRODUCTS_CTA,
  type Step,
  type Point,
  type Feature,
} from "@/content/defaults";

const COLLECTIONS = [
  "products.problem",
  "products.howIntro",
  "products.how",
  "products.audiencesIntro",
  "products.audiences",
  "products.beyond",
  "products.platform",
  "products.cta",
];

export const Route = createFileRoute("/products")({
  loader: () =>
    fetchSiteContent({ data: { slug: "products", collections: COLLECTIONS } }).catch(() => ({
      meta: getPageMeta("products"),
      collections: {
        "products.problem": PRODUCTS_PROBLEM,
        "products.howIntro": PRODUCTS_HOW_INTRO,
        "products.how": PRODUCTS_HOW,
        "products.audiencesIntro": PRODUCTS_AUDIENCES_INTRO,
        "products.audiences": PRODUCTS_AUDIENCES,
        "products.beyond": PRODUCTS_BEYOND,
        "products.platform": PRODUCTS_PLATFORM,
        "products.cta": PRODUCTS_CTA,
      },
      settings: SITE_SETTINGS,
    })),
  head: ({ loaderData }) => buildPageHead("products", loaderData?.meta),
  component: ProductsPage,
});

function ProductsPage() {
  const { collections, meta } = Route.useLoaderData();
  const hero = meta?.hero ?? getPageMeta("products").hero;
  const problem = proseOne(collections["products.problem"], PRODUCTS_PROBLEM);
  const howIntro = proseOne(collections["products.howIntro"], PRODUCTS_HOW_INTRO);
  const how = (collections["products.how"] as unknown as Step[] | undefined) ?? PRODUCTS_HOW;
  const audiencesIntro = proseOne(
    collections["products.audiencesIntro"],
    PRODUCTS_AUDIENCES_INTRO,
  );
  const audiences =
    (collections["products.audiences"] as unknown as Point[] | undefined) ?? PRODUCTS_AUDIENCES;
  const beyond = proseOne(collections["products.beyond"], PRODUCTS_BEYOND);
  const platform =
    (collections["products.platform"] as unknown as Feature[] | undefined) ?? PRODUCTS_PLATFORM;
  const cta = proseOne(collections["products.cta"], PRODUCTS_CTA);

  return (
    <div className="mx-auto max-w-384 px-5 sm:px-10">
      <section className="scene border-b border-border/70 py-20 md:py-28">
        <p className="text-xs uppercase tracking-[0.3em] text-accent">{hero.eyebrow}</p>
        <h1 className="mt-6 max-w-[18ch] text-5xl md:text-7xl">{renderHeading(hero.heading)}</h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          {(hero.intro ?? []).join(" ")}
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="https://4fgmonitor.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            Request a device →
          </a>
          <Link
            to="/about"
            className="inline-flex items-center gap-2 rounded-sm border border-border/70 px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary/60 hover:text-primary"
          >
            How we build it
          </Link>
        </div>
      </section>

      <section className="border-b border-border/70 py-20 md:py-28">
        <p className="text-xs uppercase tracking-[0.3em] text-accent">{problem.eyebrow}</p>
        <h2 className="mt-4 max-w-3xl text-3xl md:text-5xl">{problem.heading}</h2>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
          {problem.body}
        </p>
      </section>

      <section className="border-b border-border/70 py-12">
        <p className="text-xs uppercase tracking-[0.3em] text-accent">{howIntro.eyebrow}</p>
        <h2 className="mt-4 text-3xl md:text-5xl">{howIntro.heading}</h2>
        <div className="mt-8">
          {how.map((s) => (
            <div
              key={s.n}
              className="grid gap-8 border-b border-border/70 py-14 last:border-b-0 md:grid-cols-[160px_1fr] md:gap-16"
            >
              <div>
                <div className="font-display text-5xl text-primary">{s.n}</div>
                <div className="mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {s.t}
                </div>
              </div>
              <p className="max-w-3xl text-base leading-relaxed text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-b border-border/70 py-20 md:py-28">
        <p className="text-xs uppercase tracking-[0.3em] text-accent">{audiencesIntro.eyebrow}</p>
        <h2 className="mt-4 text-3xl md:text-5xl">{audiencesIntro.heading}</h2>
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {audiences.map((w) => (
            <div
              key={w.n}
              className="card-3d card-3d-hover rounded-sm border border-border/70 bg-card/50 p-8 backdrop-blur-xl"
            >
              <div className="font-display text-sm text-primary">{w.n}</div>
              <h3 className="mt-3 text-2xl">{w.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{w.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-b border-border/70 py-20 md:py-28">
        <div className="grid gap-12 md:grid-cols-[1fr_1fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-accent">{beyond.eyebrow}</p>
            <h2 className="mt-4 text-3xl md:text-5xl">{beyond.heading}</h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
              {beyond.body}
            </p>
          </div>
          <ul className="space-y-2.5 self-start text-sm">
            {platform.map((item) => (
              <li key={item.label} className="flex gap-3">
                <span className="font-mono text-primary">→</span>
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-20">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-accent">{cta.eyebrow}</p>
            <p className="mt-2 max-w-xl text-2xl">{cta.body}</p>
          </div>
          <a
            href="https://4fgmonitor.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            Request a device →
          </a>
        </div>
      </section>
    </div>
  );
}
