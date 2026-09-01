import { createFileRoute, Link } from "@tanstack/react-router";
import { fetchSiteContent } from "@/lib/cms";
import {
  buildPageHead,
  renderHeading,
  proseOne,
  getPageMeta,
  SITE_SETTINGS,
  WORK_CASES,
  WORK_NDA,
  type WorkCase,
} from "@/content/defaults";

const COLLECTIONS = ["work.cases", "work.nda"];

export const Route = createFileRoute("/work")({
  loader: () =>
    fetchSiteContent({ data: { slug: "work", collections: COLLECTIONS } }).catch(() => ({
      meta: getPageMeta("work"),
      collections: { "work.cases": WORK_CASES, "work.nda": WORK_NDA },
      settings: SITE_SETTINGS,
    })),
  head: ({ loaderData }) => buildPageHead("work", loaderData?.meta),
  component: WorkPage,
});

function WorkPage() {
  const { collections, meta } = Route.useLoaderData();
  const hero = meta?.hero ?? getPageMeta("work").hero;
  const cases = (collections["work.cases"] as unknown as WorkCase[] | undefined) ?? WORK_CASES;
  const nda = proseOne(collections["work.nda"], WORK_NDA);

  return (
    <div className="mx-auto max-w-384 px-5 sm:px-10">
      <section className="scene border-b border-border/70 py-20 md:py-28">
        <p className="text-xs uppercase tracking-[0.3em] text-accent">{hero.eyebrow}</p>
        <h1 className="mt-6 max-w-[16ch] text-5xl md:text-7xl">{renderHeading(hero.heading)}</h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          {(hero.intro ?? []).join(" ")}
        </p>
      </section>

      <section className="border-b border-border/70">
        {cases.map((c, i) => (
          <article
            key={i}
            className="card-3d card-3d-hover -mx-5 grid gap-6 border-b border-border/70 px-5 py-14 last:border-b-0 sm:-mx-10 sm:px-10 md:grid-cols-[120px_1fr_1fr] md:gap-12"
          >
            <div>
              <div className="font-display text-3xl text-primary">{c.year}</div>
              <div className="mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {c.kind}
              </div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{c.tag}</div>
              <h2 className="mt-2 text-2xl md:text-3xl">{c.title}</h2>
            </div>
            <p className="self-center text-base leading-relaxed text-muted-foreground">{c.body}</p>
          </article>
        ))}
      </section>

      <section className="py-20">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-accent">{nda.eyebrow}</p>
            <p className="mt-2 max-w-xl text-2xl">{nda.body}</p>
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
