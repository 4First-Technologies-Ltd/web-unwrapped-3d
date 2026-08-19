import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/vision")({
  head: () => ({
    meta: [
      { title: "Our Vision — 4First Technologies" },
      {
        name: "description",
        content:
          "To become a leading African technology innovation company, building intelligent, accessible, and scalable solutions that connect people, businesses, devices, and institutions.",
      },
      { property: "og:title", content: "Our Vision — 4First Technologies" },
      {
        property: "og:description",
        content:
          "A future where innovative technology makes everyday life smarter, industries more efficient, and communities safer.",
      },
      { property: "og:url", content: "/vision" },
    ],
    links: [{ rel: "canonical", href: "/vision" }],
  }),
  component: VisionPage,
});

const VISION_POINTS = [
  {
    n: "01",
    title: "To become a leading technology innovation company in Africa",
    body: "We envision 4First Technologies Limited becoming a respected technology company originating from Africa and competing confidently on a global stage. Our ambition is to build products that demonstrate that world-class technology and innovation can be conceived, engineered, tested, deployed, and scaled from Africa. We want 4First to be recognized not only as a technology service provider, but as a product-driven technology company that owns, develops, and scales its own intellectual property and digital platforms.",
  },
  {
    n: "02",
    title: "To build technology that solves meaningful problems",
    body: "Our vision is centered around impact. We want to identify problems that affect individuals, businesses, communities, and industries and build technology capable of solving those problems efficiently. Whether the challenge involves energy, logistics, healthcare, education, commerce, agriculture, security, business operations, or public services, we envision 4First as a company that continuously asks the question below — a mindset that will remain at the heart of our innovation.",
    quote: "What problem exists, and how can technology solve it better?",
  },
  {
    n: "03",
    title: "To create intelligent and connected ecosystems",
    body: "We envision a future where physical infrastructure and digital platforms are deeply connected. Through IoT, artificial intelligence, cloud computing, mobile technologies, embedded systems, automation, data analytics, and other emerging technologies, we want to create ecosystems where devices, people, businesses, and institutions can communicate seamlessly. Our 4FG Digital Gas Platform is an example of this vision — rather than simply creating a device that measures the contents of an LPG cylinder, we envision a full ecosystem, an approach that can be applied to other industries too.",
    chain:
      "Gas Cylinder → 4FG-Monitor → Consumer → Mobile App → Gas Supplier → Logistics Provider → Delivery → Digital Records",
  },
  {
    n: "04",
    title: "To digitally transform traditional industries",
    body: "We envision 4First playing a significant role in transforming industries that have historically depended on manual processes and fragmented systems. We believe some of Africa's greatest technological opportunities lie in digitizing existing industries rather than simply creating entirely new ones. Our goal is to introduce technology that makes these industries:",
    list: [
      "More efficient",
      "More transparent",
      "More accessible",
      "More data-driven",
      "More connected",
      "More customer-focused",
      "More sustainable",
    ],
  },
  {
    n: "05",
    title: "To make technology accessible to everyone",
    body: "Our vision is not to build technology exclusively for large corporations. We want our technology to be practical, affordable, easy to use and adaptable to different environments, serving:",
    list: [
      "Individuals",
      "Families",
      "Small and medium-sized businesses",
      "Enterprises",
      "Government institutions",
      "Schools",
      "Hospitals",
      "Communities",
      "Service providers",
      "Other organizations",
    ],
  },
  {
    n: "06",
    title: "To create a safer and smarter world",
    body: "Our long-term vision is closely connected to our belief that technology should improve the quality and safety of people's lives. We envision products that can help people monitor, predict, detect, automate and respond to potential problems before they become serious. This is particularly relevant to our IoT products, where real-time monitoring can provide information that would otherwise be unavailable to users. Our philosophy is captured by our brand direction:",
    quote: "Smarter Tech, Safer World.",
  },
  {
    n: "07",
    title: "To become a trusted technology partner for government and institutions",
    body: "We envision 4First becoming a trusted partner for governments, institutions and organizations seeking to modernize their operations and services. Our goal is to participate meaningfully in the development of digitally enabled communities and institutions across Africa, contributing technology and expertise to initiatives involving:",
    list: [
      "Digital transformation",
      "Smart infrastructure",
      "Public service delivery",
      "Data management",
      "Automation",
      "IoT deployments",
      "Digital platforms",
      "Monitoring systems",
      "Technology-enabled economic development",
    ],
  },
  {
    n: "08",
    title: "To build scalable African products for global markets",
    body: "We do not want our products to be limited by geographical boundaries. Our vision is to identify challenges that exist in Africa and other emerging markets, develop solutions around them and eventually take those solutions to international markets, designing our technology from the beginning with scalability, interoperability, security, reliability and international standards in mind.",
    chain: "Local Problem → African Solution → Global Product",
  },
  {
    n: "09",
    title: "To build a strong culture of research and innovation",
    body: "We envision 4First as an organization where innovation is continuous. We want our teams to constantly research emerging technologies, experiment with new ideas, test assumptions, develop prototypes, learn from failures and improve existing products. We believe the ability to continuously learn and innovate will determine our long-term competitiveness.",
    chain:
      "Research → Ideation → Prototyping → Testing → Validation → Deployment → Improvement → Scale",
  },
  {
    n: "10",
    title: "To create economic opportunities",
    body: "Our vision extends beyond building technology. We envision 4First contributing to economic development by creating opportunities for the people and businesses within our ecosystems. As our platforms grow, we want thousands of people and businesses to be able to participate in the value created by our technology:",
    list: [
      "Engineers",
      "Developers",
      "Designers",
      "Researchers",
      "Entrepreneurs",
      "Logistics providers",
      "Technology partners",
      "Vendors",
      "Businesses",
      "Other ecosystem participants",
    ],
  },
  {
    n: "11",
    title: "To build sustainable technology businesses",
    body: "We envision 4First becoming a financially sustainable and commercially successful technology company. Innovation must ultimately create sustainable value so our vision is to develop products with viable business models that allow us to continuously build long-term technology businesses, not short-term projects:",
    list: [
      "Invest in research",
      "Improve our products",
      "Expand our infrastructure",
      "Attract talented people",
      "Enter new markets",
      "Support our customers",
      "Develop new technologies",
    ],
  },
  {
    n: "12",
    title: "To establish a portfolio of transformative products",
    body: "Our vision is for 4First to eventually operate a portfolio of technology products addressing different sectors. Rather than being dependent on one product or one industry, we envision a company with multiple technology platforms and solutions that collectively contribute to our larger mission. The 4FG ecosystem can represent our work in energy and IoT, while future products can address other sectors such as healthcare, logistics, agriculture, education, security, commerce and enterprise technology.",
  },
];

function VisionPage() {
  return (
    <div className="mx-auto max-w-384 px-5 sm:px-10">
      <section className="scene border-b border-border/70 py-20 md:py-28">
        <p className="text-xs uppercase tracking-[0.3em] text-accent">§ Our Vision</p>
        <h1 className="mt-6 max-w-[18ch] text-5xl md:text-7xl">
          A <span className="text-primary">smarter</span>, safer world, built from Africa.
        </h1>
        <div className="mt-10 grid gap-10 md:grid-cols-2">
          <p className="text-lg leading-relaxed text-muted-foreground">
            At 4First Technologies Limited, our vision is to become a leading African technology
            company that builds innovative, intelligent and scalable solutions capable of
            transforming how people, businesses, industries and institutions operate and interact
            with technology.
          </p>
          <p className="text-lg leading-relaxed text-muted-foreground">
            We envision a future where technology is not merely a tool used by a few, but an
            accessible infrastructure for solving everyday problems, creating economic
            opportunities, improving safety and enabling smarter decision-making across Africa and
            beyond.
          </p>
        </div>
      </section>

      <section className="border-b border-border/70 py-20 md:py-28">
        <p className="text-xs uppercase tracking-[0.3em] text-accent">§ Vision statement</p>
        <blockquote className="mt-8 max-w-4xl border-l-2 border-primary pl-8 text-2xl leading-relaxed md:text-4xl">
          "To become a leading African technology innovation company, building intelligent,
          accessible, and scalable solutions that connect people, businesses, devices, and
          institutions; transform industries; create economic opportunities; improve safety and
          efficiency; and shape a smarter, more digitally enabled world."
        </blockquote>
      </section>

      <section className="border-b border-border/70 py-12">
        <p className="text-xs uppercase tracking-[0.3em] text-accent">§ Our vision in detail</p>
        <h2 className="mt-4 text-3xl md:text-5xl">Twelve horizons, one direction.</h2>
        <div className="mt-8">
          {VISION_POINTS.map((v) => (
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
                {v.list && (
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
        <p className="text-xs uppercase tracking-[0.3em] text-accent">§ Our long-term vision</p>
        <h2 className="mt-4 max-w-3xl text-3xl md:text-5xl">
          More than a technology company,{" "}
          <span className="font-bold text-primary">an innovation ecosystem</span>.
        </h2>
        <div className="mt-10 grid gap-10 md:grid-cols-2">
          <p className="text-lg leading-relaxed text-muted-foreground">
            Ultimately, we envision 4First Technologies Limited becoming more than a technology
            company. We envision it becoming an innovation ecosystem — a company that identifies
            problems, develops technology, creates products, connects stakeholders, creates economic
            opportunities, and contributes to the digital transformation of Africa.
          </p>
          <p className="text-lg leading-relaxed text-muted-foreground">
            We want to build a company whose products are used in people's homes, businesses,
            hospitals, schools, industries, communities, and institutions. We want to build
            technology that people can trust, afford, understand, and benefit from.
          </p>
        </div>
      </section>

      <section className="border-b border-border/70 py-20 md:py-28">
        <p className="text-xs uppercase tracking-[0.3em] text-accent">§ In one line</p>
        <blockquote className="mt-8 max-w-4xl text-2xl leading-relaxed text-muted-foreground md:text-3xl">
          "We envision a future where innovative technology makes everyday life smarter, industries
          more efficient, businesses more connected, and communities safer."
        </blockquote>
        <p className="mt-8 font-display text-3xl text-primary md:text-4xl">
          Smarter Tech, Safer World.
        </p>
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
