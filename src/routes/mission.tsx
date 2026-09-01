import { createFileRoute, Link } from "@tanstack/react-router";
import { fetchSiteContent } from "@/lib/cms";
import {
  buildPageHead,
  renderHeading,
  proseOne,
  getPageMeta,
  SITE_SETTINGS,
  MISSION_STATEMENT,
  MISSION_POINTS_INTRO,
  MISSION_POINTS,
  type Point,
} from "@/content/defaults";

const COLLECTIONS = ["mission.statement", "mission.pointsIntro", "mission.points"];

export const Route = createFileRoute("/mission")({
  loader: () =>
    fetchSiteContent({ data: { slug: "mission", collections: COLLECTIONS } }).catch(() => ({
      meta: getPageMeta("mission"),
      collections: {
        "mission.statement": MISSION_STATEMENT,
        "mission.pointsIntro": MISSION_POINTS_INTRO,
        "mission.points": MISSION_POINTS,
      },
      settings: SITE_SETTINGS,
    })),
  head: ({ loaderData }) => buildPageHead("mission", loaderData?.meta),
  component: MissionPage,
});

function MissionPage() {
  const { collections, meta } = Route.useLoaderData();
  const hero = meta?.hero ?? getPageMeta("mission").hero;
  const statement = proseOne(collections["mission.statement"], MISSION_STATEMENT);
  const pointsIntro = proseOne(collections["mission.pointsIntro"], MISSION_POINTS_INTRO);
  const points = (collections["mission.points"] as unknown as Point[] | undefined) ?? MISSION_POINTS;

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

      <section className="border-b border-border/70 bg-card/20 py-20 md:py-28">
        <p className="text-xs uppercase tracking-[0.3em] text-accent">{statement.eyebrow}</p>
        <blockquote className="mt-8 max-w-4xl border-l-2 border-primary pl-8 text-2xl leading-relaxed md:text-4xl">
          {statement.quote}
        </blockquote>
        {statement.footnote && (
          <p className="mt-10 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {statement.footnote}
          </p>
        )}
      </section>

      <section className="border-b border-border/70 py-12">
        <p className="text-xs uppercase tracking-[0.3em] text-accent">{pointsIntro.eyebrow}</p>
        <h2 className="mt-4 text-3xl md:text-5xl">{pointsIntro.heading}</h2>
        <div className="mt-8">
          {points.map((m) => (
            <div
              key={m.n}
              className="grid gap-8 border-b border-border/70 py-14 last:border-b-0 md:grid-cols-[160px_1fr] md:gap-16"
            >
              <div>
                <div className="font-display text-5xl text-primary">{m.n}</div>
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl">{m.title}</h3>
                <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
                  {m.body}
                </p>
              </div>
            </div>
          ))}
        </div>
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
