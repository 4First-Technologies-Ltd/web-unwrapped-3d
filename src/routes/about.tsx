import { createFileRoute, Link } from "@tanstack/react-router";
import { fetchSiteContent } from "@/lib/cms";
import {
  buildPageHead,
  renderHeading,
  proseOne,
  getPageMeta,
  SITE_SETTINGS,
  ABOUT_BUILD_INTRO,
  ABOUT_DISCIPLINES,
  ABOUT_ENGINEERING,
  ABOUT_CONVICTIONS,
  ABOUT_TIMELINE_INTRO,
  ABOUT_TIMELINE,
  type Discipline,
  type Point,
  type TimelineRow,
} from "@/content/defaults";

const COLLECTIONS = [
  "about.buildIntro",
  "about.disciplines",
  "about.engineering",
  "about.convictions",
  "about.timelineIntro",
  "about.timeline",
];

export const Route = createFileRoute("/about")({
  loader: () =>
    fetchSiteContent({ data: { slug: "about", collections: COLLECTIONS } }).catch(() => ({
      meta: getPageMeta("about"),
      collections: {
        "about.buildIntro": ABOUT_BUILD_INTRO,
        "about.disciplines": ABOUT_DISCIPLINES,
        "about.engineering": ABOUT_ENGINEERING,
        "about.convictions": ABOUT_CONVICTIONS,
        "about.timelineIntro": ABOUT_TIMELINE_INTRO,
        "about.timeline": ABOUT_TIMELINE,
      },
      settings: SITE_SETTINGS,
    })),
  head: ({ loaderData }) => buildPageHead("about", loaderData?.meta),
  component: AboutPage,
});

function AboutPage() {
  const { collections, meta } = Route.useLoaderData();
  const hero = meta?.hero ?? getPageMeta("about").hero;
  const buildIntro = proseOne(collections["about.buildIntro"], ABOUT_BUILD_INTRO);
  const engineering = proseOne(collections["about.engineering"], ABOUT_ENGINEERING);
  const timelineIntro = proseOne(collections["about.timelineIntro"], ABOUT_TIMELINE_INTRO);
  const disciplines =
    (collections["about.disciplines"] as unknown as Discipline[] | undefined) ?? ABOUT_DISCIPLINES;
  const convictions =
    (collections["about.convictions"] as unknown as Point[] | undefined) ?? ABOUT_CONVICTIONS;
  const timeline =
    (collections["about.timeline"] as unknown as TimelineRow[] | undefined) ?? ABOUT_TIMELINE;

  return (
    <div className="mx-auto max-w-384 px-5 sm:px-10">
      <section className="scene border-b border-border/70 py-20 md:py-28">
        <p className="text-xs uppercase tracking-[0.3em] text-accent">{hero.eyebrow}</p>
        <h1 className="mt-6 max-w-[14ch] text-5xl md:text-7xl">{renderHeading(hero.heading)}</h1>
        <div className="mt-10 grid gap-10 md:grid-cols-2">
          {(hero.intro ?? []).map((p, i) => (
            <p
              key={i}
              className={`text-lg leading-relaxed text-muted-foreground${
                i === 2 ? " md:col-span-2" : ""
              }`}
            >
              {p}
            </p>
          ))}
        </div>
      </section>

      <section className="border-b border-border/70 py-12">
        <p className="text-xs uppercase tracking-[0.3em] text-accent">{buildIntro.eyebrow}</p>
        <h2 className="mt-4 text-3xl md:text-5xl">{buildIntro.heading}</h2>
        <div className="mt-8">
          {disciplines.map((d) => (
            <div
              key={d.n}
              className="grid gap-8 border-b border-border/70 py-14 last:border-b-0 md:grid-cols-[160px_1fr] md:gap-16"
            >
              <div>
                <div className="font-display text-5xl text-primary">{d.n}</div>
                <div className="mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {d.tag}
                </div>
              </div>
              <div>
                <h3 className="text-3xl md:text-4xl">{d.title}</h3>
                <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
                  {d.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-b border-border/70 bg-card/20 py-20 md:py-28">
        <div className="grid gap-12 md:grid-cols-[1fr_2fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-accent">{engineering.eyebrow}</p>
            <h2 className="mt-4 text-3xl md:text-5xl">{engineering.heading}</h2>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {engineering.body}
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {convictions.map((c) => (
              <div
                key={c.n}
                className="card-3d card-3d-hover rounded-sm border border-border/70 bg-card/50 p-8 backdrop-blur-xl"
              >
                <div className="font-display text-sm text-primary">{c.n}</div>
                <h3 className="mt-3 text-2xl">{c.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border/70 py-20 md:py-28">
        <p className="text-xs uppercase tracking-[0.3em] text-accent">{timelineIntro.eyebrow}</p>
        <h2 className="mt-4 text-3xl md:text-5xl">{timelineIntro.heading}</h2>
        <div className="mt-12 divide-y divide-border/70 border-y border-border/70">
          {timeline.map((row) => (
            <div
              key={row.y}
              className="grid grid-cols-[100px_1fr] items-baseline gap-6 py-8 md:grid-cols-[160px_240px_1fr]"
            >
              <div className="font-display text-4xl text-primary md:text-5xl">{row.y}</div>
              <div className="text-2xl">{row.t}</div>
              <p className="col-span-2 text-sm leading-relaxed text-muted-foreground md:col-span-1">
                {row.d}
              </p>
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
