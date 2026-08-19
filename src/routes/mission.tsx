import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/mission")({
  head: () => ({
    meta: [
      { title: "Our Mission — 4First Technologies" },
      {
        name: "description",
        content:
          "Our mission is to engineer innovative, accessible, and scalable technology solutions that solve real-world problems and accelerate Africa's transition into a digitally enabled economy.",
      },
      { property: "og:title", content: "Our Mission — 4First Technologies" },
      {
        property: "og:description",
        content:
          "Solving real-world problems, connecting people and businesses, and accelerating Africa's digital transformation.",
      },
      { property: "og:url", content: "/mission" },
    ],
    links: [{ rel: "canonical", href: "/mission" }],
  }),
  component: MissionPage,
});

const MISSION_POINTS = [
  {
    n: "01",
    title: "Solve real-world problems through technology",
    body: "We identify challenges affecting individuals, businesses, industries, and communities and transform them into opportunities for technological innovation. Our focus is not technology for its own sake, but technology that delivers measurable value and addresses genuine needs.",
  },
  {
    n: "02",
    title: "Build innovative products for Africa and emerging markets",
    body: "We aim to design products that are relevant to our environment, affordable, accessible, and capable of solving challenges unique to African markets while maintaining the quality and scalability required for global adoption.",
  },
  {
    n: "03",
    title: "Connect the physical world with the digital world",
    body: "Through technologies such as IoT, cloud computing, mobile applications, automation, embedded systems, artificial intelligence, and data-driven platforms, we seek to create solutions that allow physical assets, businesses, people, and digital systems to communicate and work together seamlessly. Our 4FG Digital Gas Platform and 4FG-Monitor, for example, represent this mission by connecting physical gas cylinders and gas businesses to digital monitoring, ordering, logistics, and consumer services.",
  },
  {
    n: "04",
    title: "Make technology accessible and useful",
    body: "We believe technological innovation should not be limited to large corporations or highly developed markets. Our mission is to develop solutions that can be understood, accessed, and utilized by ordinary individuals, small businesses, institutions, and larger organizations.",
  },
  {
    n: "05",
    title: "Digitize traditional industries and services",
    body: "We seek to modernize sectors that still depend heavily on manual processes by introducing digital platforms, automation, monitoring, analytics, and intelligent systems. We see significant opportunities to transform areas such as energy, logistics, healthcare, education, agriculture, commerce, and public services.",
  },
  {
    n: "06",
    title: "Improve efficiency, transparency, and accountability",
    body: "Our solutions are designed to reduce unnecessary manual processes, improve access to information, create reliable digital records, and enable organizations to make better decisions using accurate and timely data.",
  },
  {
    n: "07",
    title: "Create connected ecosystems rather than isolated products",
    body: "We do not simply build standalone applications. Our long-term mission is to develop interconnected ecosystems in which users, businesses, service providers, logistics companies, institutions, and technology platforms can interact efficiently.",
  },
  {
    n: "08",
    title: "Empower businesses through digital transformation",
    body: "We help businesses adopt technology not merely as an operational tool but as a strategic advantage. Our solutions are intended to help organizations improve customer experience, increase operational efficiency, expand their reach, access better data, and create new revenue opportunities.",
  },
  {
    n: "09",
    title: "Promote safety and reliability through technology",
    body: "Where technology can prevent accidents, reduce risks, provide early warnings, or improve monitoring, we aim to make safety an integral part of our product development philosophy. Our approach to products such as 4FG-Monitor reflects our belief that technology should not only make things easier but also make them safer and more reliable.",
  },
  {
    n: "10",
    title: "Build for scalability and sustainability",
    body: "We develop with the future in mind. Our products are designed to evolve as users, markets, technologies, and business requirements change. We seek to build sustainable technology businesses rather than short-term solutions.",
  },
  {
    n: "11",
    title: "Create opportunities through innovation",
    body: "We believe technology can create jobs, businesses, entrepreneurship opportunities, and new economic value. By building digital ecosystems, we aim to create opportunities for developers, engineers, logistics providers, vendors, entrepreneurs, and other participants in the technology value chain.",
  },
  {
    n: "12",
    title: "Collaborate to achieve greater impact",
    body: "We recognize that meaningful transformation cannot be achieved alone. We seek strategic partnerships with government institutions, private companies, investors, technology organizations, communities, researchers, and other stakeholders whose capabilities and resources can help scale our solutions and increase their impact.",
  },
];

function MissionPage() {
  return (
    <div className="mx-auto max-w-384 px-5 sm:px-10">
      <section className="scene border-b border-border/70 py-20 md:py-28">
        <p className="text-xs uppercase tracking-[0.3em] text-accent">§ Our Mission</p>
        <h1 className="mt-6 max-w-[18ch] text-5xl md:text-7xl">
          Technology that <span className="text-primary">creates</span> the future.
        </h1>
        <div className="mt-10 grid gap-10 md:grid-cols-2">
          <p className="text-lg leading-relaxed text-muted-foreground">
            At 4First Technologies Limited, our mission is to develop and deploy innovative,
            accessible, and impactful technology solutions that solve real-world problems, improve
            everyday experiences, strengthen businesses and institutions, and contribute
            meaningfully to the digital transformation of Africa.
          </p>
          <p className="text-lg leading-relaxed text-muted-foreground">
            We are committed to moving technology beyond ideas and prototypes into practical,
            scalable products and services that people, businesses, governments, and communities
            can rely on.
          </p>
        </div>
      </section>

      <section className="border-b border-border/70 py-12">
        <p className="text-xs uppercase tracking-[0.3em] text-accent">§ Our mission in detail</p>
        <h2 className="mt-4 text-3xl md:text-5xl">Twelve commitments, one direction.</h2>
        <div className="mt-8">
          {MISSION_POINTS.map((m) => (
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

      <section className="border-b border-border/70 bg-card/20 py-20 md:py-28">
        <p className="text-xs uppercase tracking-[0.3em] text-accent">§ Core mission statement</p>
        <blockquote className="mt-8 max-w-4xl border-l-2 border-primary pl-8 text-2xl leading-relaxed md:text-4xl">
          Our mission is to engineer innovative, accessible, and scalable technology solutions
          that solve real-world problems, connect people and businesses, transform traditional
          industries, improve safety and efficiency, and accelerate Africa's transition into a
          digitally enabled economy.
        </blockquote>
        <p className="mt-10 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          At 4First Technologies Limited, we are building with the belief that technology should
          not simply follow the future — it should help create it.
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
