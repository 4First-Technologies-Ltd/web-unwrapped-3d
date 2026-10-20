import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/careers/privacy")({
  head: () => ({
    meta: [
      { title: "Recruitment Privacy Notice — 4First Technologies" },
      {
        name: "description",
        content: "How 4First Technologies Limited collects and uses job applicant data.",
      },
    ],
    links: [{ rel: "canonical", href: "https://4firsttechnologies.com/careers/privacy" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16 sm:px-10 md:py-24">
      <p className="text-xs uppercase tracking-[0.3em] text-accent">Careers</p>
      <h1 className="mt-4 text-4xl md:text-5xl">Recruitment Privacy Notice</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Version 2026-10 · Prepared in line with the Nigeria Data Protection Act 2023
      </p>

      <div className="mt-10 space-y-8 text-sm leading-relaxed text-muted-foreground">
        <Section title="Who we are">
          4First Technologies Limited, Owerri, Imo State, Nigeria, is the controller of the personal
          data you submit when you apply for a role through this website.
        </Section>
        <Section title="What we collect">
          Your name, email address, phone number, current location, optional LinkedIn and portfolio
          links, your cover letter, and the CV (and any supporting document) you upload. We do not
          ask for passwords, bank details or government ID numbers at the application stage.
        </Section>
        <Section title="Why we collect it">
          To assess your suitability for the role you applied for, to contact you about your
          application, and to keep a record of our recruitment process. Acknowledging this notice
          is not consent to marketing messages — we will not use your details for unrelated
          marketing.
        </Section>
        <Section title="Who can see it">
          Only authorised members of the 4First recruitment team. Your documents are stored in
          private storage and are never published or exposed through public links. We use trusted
          service providers to host the website, store data and send email notifications; they
          process data only on our instructions and may do so outside Nigeria, with appropriate
          safeguards.
        </Section>
        <Section title="How long we keep it">
          Applications that do not lead to an offer are deleted within 12 months of the vacancy
          closing. If you are hired, relevant records move into your employment file. Withdrawn
          applications are deleted on request, subject to any legal obligations.
        </Section>
        <Section title="Your rights">
          You may ask to access, correct, restrict or delete your data, withdraw your application,
          or object to our processing. Contact us at the email address listed on our{" "}
          <Link to="/contact" className="text-primary underline">
            contact page
          </Link>
          , quoting your application reference. You also have the right to complain to the Nigeria
          Data Protection Commission.
        </Section>
      </div>

      <Link
        to="/careers"
        search={{ page: 1 }}
        className="mt-12 inline-block text-sm text-primary hover:underline"
      >
        ← Back to Careers
      </Link>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-xl text-foreground">{title}</h2>
      <p className="mt-2">{children}</p>
    </section>
  );
}
