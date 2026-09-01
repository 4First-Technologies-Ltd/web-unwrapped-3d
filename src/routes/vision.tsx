import { createFileRoute, Link } from "@tanstack/react-router";
import { fetchSiteContent } from "@/lib/cms";
import {
  buildPageHead,
  renderHeading,
  proseOne,
  paragraphs,
  getPageMeta,
  SITE_SETTINGS,
  VISION_STATEMENT,
  VISION_POINTS_INTRO,
  VISION_POINTS,
  VISION_LONGTERM,
  VISION_ONELINE,
  type VisionPoint,
} from "@/content/defaults";

const COLLECTIONS = [
  "vision.statement",
  "vision.pointsIntro",
  "vision.points",
  "vision.longterm",
  "vision.oneline",
];

export const Route = createFileRoute("/vision")({
  loader: () =>
    fetchSiteContent({ data: { slug: "vision", collections: COLLECTIONS } }).catch(() => ({
      meta: getPageMeta("vision"),
      collections: {
        "vision.statement": VISION_STATEMENT,
        "vision.pointsIntro": VISION_POINTS_INTRO,
        "vision.points": VISION_POINTS,
        "vision.longterm": VISION_LONGTERM,
        "vision.oneline": VISION_ONELINE,
      },
      settings: SITE_SETTINGS,
    })),
  head: ({ loaderData }) => buildPageHead("vision", loaderData?.meta),
  component: VisionPage,
});

function VisionPage() {
  const { collections, meta } = Route.useLoaderData();
  const hero = meta?.hero ?? getPageMeta("vision").hero;
  const statement = proseOne(collections["vision.statement"], VISION_STATEMENT);
  const pointsIntro = proseOne(collections["vision.pointsIntro"], VISION_POINTS_INTRO);
  const points =
    (collections["vision.points"] as unknown as VisionPoint[] | undefined) ?? VISION_POINTS;
  const longterm = proseOne(collections["vision.longterm"], VISION_LONGTERM);
  const oneline = proseOne(collections["vision.oneline"], VISION_ONELINE);

  return (
    <div className="mx-auto max-w-384 px-5 sm:px-10">
      <section className="scene border-b border-border/70 py-20 md:py-28">
        <p className="text-xs uppercase tracking-[0.3em] text-accent">{hero.eyebrow}</p>
        <h1 className="mt-6 max-w-[18ch] text-5xl md:text-7xl">{renderHeading(hero.heading)}</h1>
        <div className="mt-10 grid gap-10 md:grid-cols-2">
          {(hero.intro ?? []).map((p, i) => (
            <p key={i} className="text-lg leading-relaxed text-muted-foreground">
              {p}
            </p>
          ))}
        </div>
      </section>

      <section className="border-b border-border/70 py-20 md:py-28">
        <p className="text-xs uppercase tracking-[0.3em] text-accent">{statement.eyebrow}</p>
        <blockquote className="mt-8 max-w-4xl border-l-2 border-primary pl-8 text-2xl leading-relaxed md:text-4xl">
          {statement.quote}
        </blockquote>
      </section>

      <section className="border-b border-border/70 py-12">
        <p className="text-xs uppercase tracking-[0.3em] text-accent">{pointsIntro.eyebrow}</p>
        <h2 className="mt-4 text-3xl md:text-5xl">{pointsIntro.heading}</h2>
        <div className="mt-8">
          {points.map((v) => (
            <div
              key={v.n}
              className="grid gap-8 border-b border-border/70 py-14 last:border-b-0 md:grid-cols-[160px_1fr] md:gap-16"
            >
              <div>
                <div className="font-display text-5xl text-primary">{v.n}</div>
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl">{v.title}</h3>
                <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
                  {v.body}
                </p>
                {v.quote && (
                  <blockquote className="mt-6 max-w-2xl border-l-2 border-primary pl-6 text-lg italic text-foreground">
                    {v.quote}
                  </blockquote>
                )}
                {v.chain && (
                  <p className="mt-6 max-w-3xl font-mono text-sm leading-relaxed text-primary">
                    {v.chain}
                  </p>
                )}
                {v.list && v.list.length > 0 && (
                  <ul className="mt-6 grid max-w-3xl gap-2.5 text-sm sm:grid-cols-2">
                    {v.list.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="font-mono text-primary">→</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-b border-border/70 bg-card/20 py-20 md:py-28">
        <p className="text-xs uppercase tracking-[0.3em] text-accent">{longterm.eyebrow}</p>
        <h2 className="mt-4 max-w-3xl text-3xl md:text-5xl">
          {renderHeading(longterm.heading, "font-bold text-primary")}
        </h2>
        <div className="mt-10 grid gap-10 md:grid-cols-2">
          {paragraphs(longterm.body).map((p, i) => (
            <p key={i} className="text-lg leading-relaxed text-muted-foreground">
              {p}
            </p>
          ))}
        </div>
      </section>

      <section className="border-b border-border/70 py-20 md:py-28">
        <p className="text-xs uppercase tracking-[0.3em] text-accent">{oneline.eyebrow}</p>
        <blockquote className="mt-8 max-w-4xl text-2xl leading-relaxed text-muted-foreground md:text-3xl">
          {oneline.quote}
        </blockquote>
        {oneline.footnote && (
          <p className="mt-8 font-display text-3xl text-primary md:text-4xl">{oneline.footnote}</p>
        )}
      </section>

      <section className="py-20">
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
        >
          Work with us →
        </Link>
      </section>
    </div>
  );
}
