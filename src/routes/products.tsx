import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Products — 4First Technologies" },
      {
        name: "description",
        content:
          "4FG-Monitor — a smart, weight-based LPG and oxygen cylinder monitoring device from 4First Technologies. Real-time levels, low-gas alerts, and GSM connectivity for homes, hospitals, and gas retailers.",
      },
      { property: "og:title", content: "Products — 4First Technologies" },
      {
        property: "og:description",
        content: "4FG-Monitor: real-time cylinder monitoring for LPG and oxygen, built for Africa.",
      },
      { property: "og:url", content: "/products" },
    ],
    links: [{ rel: "canonical", href: "/products" }],
  }),
  component: ProductsPage,
});

const HOW_IT_WORKS = [
  {
    n: "01",
    t: "Weigh",
    d: "The cylinder sits on a load-cell base plate. The device continuously measures total weight and derives net gas or oxygen remaining from the known tare weight.",
  },
  {
    n: "02",
    t: "Transmit",
    d: "Readings are pushed over GSM to the cloud platform — no home Wi-Fi, router, or app pairing required. It works the same in a rural clinic as it does in a city apartment.",
  },
  {
    n: "03",
    t: "Alert",
    d: "As levels approach empty, the platform triggers alerts to the user and, where connected, to the retailer or distributor — so a refill can be arranged before the cylinder actually runs dry.",
  },
  {
    n: "04",
    t: "Manage",
    d: "Usage history, consumption rate, and refill patterns are logged over time, turning a single sensor reading into a picture of how gas is actually being used.",
  },
];

const WHO_ITS_FOR = [
  {
    n: "01",
    title: "Households",
    body: "Know exactly how much cooking gas is left without lifting the cylinder or guessing by flame strength. Get a warning before you're mid-meal with an empty tank.",
  },
  {
    n: "02",
    title: "Hospitals & clinics",
    body: "Medical oxygen cannot run out unnoticed. 4FG-Monitor gives facilities staff a live view of oxygen reserves across wards, with alerts that reach the right person before a cylinder is critical.",
  },
  {
    n: "03",
    title: "Gas retailers & distributors",
    body: "See real-time consumption across customer sites instead of waiting for a phone call. Plan delivery routes around actual need, reduce emergency runs, and catch churn before a customer switches supplier.",
  },
  {
    n: "04",
    title: "Businesses & institutions",
    body: "Restaurants, bakeries, and any operation running on bulk LPG get accountable, auditable consumption data instead of relying on staff estimates or manual checks.",
  },
];

const PLATFORM = [
  "Consumer and retailer web dashboards",
  "Live cylinder-level view per device",
  "Low-level and critical-level alerting",
  "Historical consumption & refill analytics",
  "Multi-site fleet view for distributors",
  "API-ready telemetry for integration",
];

function ProductsPage() {
  return (
    <div className="mx-auto max-w-384 px-5 sm:px-10">
      <section className="scene border-b border-border/70 py-20 md:py-28">
        <p className="text-xs uppercase tracking-[0.3em] text-accent">§ Products</p>
        <h1 className="mt-6 max-w-[18ch] text-5xl md:text-7xl">
          4FG-Monitor: Gas you can <span className="text-primary">see</span>.
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Our flagship IoT device turns a sealed, opaque LPG or oxygen cylinder into something you
          can actually monitor like real-time levels, low-gas alerts, and usage history, delivered
          over cellular connectivity to a device that can't be hot-fixed from a laptop once it's on the wall.
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
        <p className="text-xs uppercase tracking-[0.3em] text-accent">§ The problem</p>
        <h2 className="mt-4 max-w-3xl text-3xl md:text-5xl">
          Cylinders don't tell you when they're about to run out.
        </h2>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
          LPG and oxygen cylinders are sealed and opaque — the only signal most people get that
          gas is running low is the flame sputtering out mid-meal, or a ward running short on
          oxygen with no warning. That's a safety problem for hospitals, a planning problem for
          retailers, and a daily inconvenience for households. 4FG-Monitor replaces that
          uncertainty with a live number.
        </p>
      </section>

      <section className="border-b border-border/70 py-12">
        <p className="text-xs uppercase tracking-[0.3em] text-accent">§ How it works</p>
        <h2 className="mt-4 text-3xl md:text-5xl">Sensor to dashboard, one signal path.</h2>
        <div className="mt-8">
          {HOW_IT_WORKS.map((s) => (
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
        <p className="text-xs uppercase tracking-[0.3em] text-accent">§ Who it's for</p>
        <h2 className="mt-4 text-3xl md:text-5xl">One device, four kinds of urgency.</h2>
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {WHO_ITS_FOR.map((w) => (
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
            <p className="text-xs uppercase tracking-[0.3em] text-accent">§ Beyond the device</p>
            <h2 className="mt-4 text-3xl md:text-5xl">The digital gas platform.</h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
              4FG-Monitor is the sensor layer of a wider platform connecting consumers, retailers,
              distributors, and service providers — turning individual cylinder readings into
              smarter refill planning and a more accountable LPG ecosystem across Africa.
            </p>
          </div>
          <ul className="space-y-2.5 self-start text-sm">
            {PLATFORM.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="font-mono text-primary">→</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-20">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-accent">§ Get 4FG-Monitor</p>
            <p className="mt-2 max-w-xl text-2xl">
              For households, hospitals, retailers, and distributors — talk to us about
              deployment.
            </p>
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
