import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — 4First Technologies" },
      {
        name: "description",
        content:
          "4First Technologies is a Nigerian engineering company based in Owerri, building software and embedded systems from cloud platforms to the firmware on the device.",
      },
      { property: "og:title", content: "About — 4First Technologies" },
      {
        property: "og:description",
        content:
          "An engineering company that builds across the full stack: software platforms, embedded systems, and the secure infrastructure between them.",
      },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

const DISCIPLINES = [
  {
    n: "01",
    title: "Software Platforms",
    tag: "Web · Mobile · Cloud",
    body: "The systems people actually touch, web and mobile applications, APIs, and the backend platforms behind them. We design for the network conditions our users really have: bandwidth-aware frontends, resilient sync, and infrastructure that degrades gracefully instead of failing loudly.",
  },
  {
    n: "02",
    title: "Embedded Systems",
    tag: "Firmware · Sensors · Edge",
    body: "Software that lives on hardware. Microcontroller firmware, sensor integration, power-conscious design, and the discipline of shipping code that can't be hot-fixed from a laptop. When a device is on a wall in Owerri, it has to work — offline, on battery, in heat.",
  },
  {
    n: "03",
    title: "Connected Devices & IoT",
    tag: "Telemetry · OTA · Fleets",
    body: "The layer that joins the two: device provisioning, telemetry pipelines, over-the-air updates, and fleet monitoring. We treat every deployed device as a production system, observable, updatable, and accounted for from first boot to end of life.",
  },
  {
    n: "04",
    title: "Intelligent & Secure Systems",
    tag: "AI · Decision Engines · Security",
    body: "Intelligence embedded where decisions happen, anomaly detection on sensor streams, LLM-backed workflows, automated alerting. All of it threat-modelled first, because a connected device that isn't secured is a liability with an antenna.",
  },
];

const CONVICTIONS = [
  {
    n: "01",
    title: "Hardware honesty",
    body: "Embedded software doesn't get the luxury of 'refresh and try again.' We design for constrained memory, unreliable power, and field conditions. And we let that discipline sharpen our cloud software too.",
  },
  {
    n: "02",
    title: "The whole signal path",
    body: "One team owns the journey from sensor reading to dashboard pixel. No hand-offs between a firmware vendor, a backend shop, and an app agency — the seams are where systems fail.",
  },
  {
    n: "03",
    title: "Built for African context",
    body: "Intermittent connectivity, hard power cycles, dust and heat. Our systems are designed to hold state locally, sync when they can, and never leave the user guessing about what's real.",
  },
  {
    n: "04",
    title: "Security before shine",
    body: "Secure boot, signed updates, least-privilege APIs, threat-modelled architectures. Every layer is hardened before it's beautified — trust compounds; regret is expensive.",
  },
];

const STACK = [
  {
    k: "Device & Firmware",
    items: [
      "C / C++ on ARM microcontrollers",
      "ESP32 & STM32 platforms",
      "Sensor buses — I²C, SPI, UART",
      "Low-power & battery-first design",
    ],
  },
  {
    k: "Connectivity",
    items: [
      "MQTT & lightweight telemetry",
      "GSM / LTE and Wi-Fi fallback",
      "Over-the-air firmware updates",
      "Offline-first sync strategies",
    ],
  },
  {
    k: "Platform & Cloud",
    items: [
      "TypeScript, Node.js & React",
      "Time-series ingestion & alerting",
      "Cloud infrastructure & DevOps",
      "Observability & fleet dashboards",
    ],
  },
  {
    k: "Intelligence & Security",
    items: [
      "Anomaly detection on live streams",
      "LLM-backed workflows & agents",
      "Threat modelling & hardening",
      "Incident-ready operations",
    ],
  },
];

const TIMELINE = [
  {
    y: "2026",
    t: "Founded",
    d: "Established in Owerri with a mandate to build intelligent, resilient systems — software platforms and the embedded devices they speak to, engineered by one team.",
  },
];

function AboutPage() {
  return (
    <div className="mx-auto max-w-384 px-5 sm:px-10">
      <section className="scene border-b border-border/70 py-20 md:py-28">
        <p className="text-xs uppercase tracking-[0.3em] text-accent">§ About — 01</p>
        <h1 className="mt-6 max-w-[14ch] text-5xl md:text-7xl">
          Software, down to the <span className="text-primary">silicon</span>.
        </h1>
        <div className="mt-10 grid gap-10 md:grid-cols-2">
          <p className="text-lg leading-relaxed text-muted-foreground">
            4First Technologies Limited is a Nigerian technology company developing innovative IoT
            solutions for the energy and healthcare sectors. Our flagship product, 4FG-Monitor, is
            a smart cylinder monitoring device that provides real-time visibility into the
            quantity of LPG or oxygen remaining in a cylinder. It uses weight-based sensing and
            GSM connectivity to deliver accurate readings and alerts, helping households,
            businesses, hospitals, and gas retailers improve safety, efficiency, and resource
            management.
          </p>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Beyond the device, we are building a digital gas platform that connects consumers, gas
            retailers, distributors, and service providers. The platform enables smarter refill
            planning, gas transactions, and data-driven management of the LPG ecosystem.
          </p>
          <p className="text-lg leading-relaxed text-muted-foreground md:col-span-2">
            Our vision is to build intelligent infrastructure that makes critical gas resources
            more visible, predictable, accessible, and easier to manage across Africa.
          </p>
        </div>
      </section>

      <section className="border-b border-border/70 py-12">
        <p className="text-xs uppercase tracking-[0.3em] text-accent">§ 02 — What we build</p>
        <h2 className="mt-4 text-3xl md:text-5xl">Four disciplines, one signal path.</h2>
        <div className="mt-8">
          {DISCIPLINES.map((d) => (
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
            <p className="text-xs uppercase tracking-[0.3em] text-accent">§ 03 — How we engineer</p>
            <h2 className="mt-4 text-3xl md:text-5xl">Constraints are the curriculum.</h2>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Building for devices in the field teaches habits that make every system better —
              including the ones that only ever live in the cloud.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {CONVICTIONS.map((c) => (
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
        <p className="text-xs uppercase tracking-[0.3em] text-accent">§ 04 — The stack</p>
        <h2 className="mt-4 text-3xl md:text-5xl">What the work is made of.</h2>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
          Tools change; the standard doesn't. This is the working set we reach for today, chosen
          for reliability under real-world conditions rather than novelty.
        </p>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STACK.map((col) => (
            <div
              key={col.k}
              className="card-3d card-3d-hover rounded-sm border border-border/70 bg-card/50 p-8 backdrop-blur-xl"
            >
              <div className="text-xs uppercase tracking-[0.2em] text-primary">{col.k}</div>
              <ul className="mt-5 space-y-2.5 text-sm">
                {col.items.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="font-mono text-primary">→</span>
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="border-b border-border/70 py-20 md:py-28">
        <p className="text-xs uppercase tracking-[0.3em] text-accent">§ 05 — Timeline</p>
        <h2 className="mt-4 text-3xl md:text-5xl">Short history, long horizon.</h2>
        <div className="mt-12 divide-y divide-border/70 border-y border-border/70">
          {TIMELINE.map((row) => (
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
