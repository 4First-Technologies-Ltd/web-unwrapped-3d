import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { fetchJob, submitApplication } from "@/lib/careers";
import {
  applicationSchema,
  describeAllowedFiles,
  CV_EXTENSIONS,
  PRIVACY_NOTICE_PATH,
  type ApplyLimits,
  type FieldErrors,
  type PublicJob,
} from "@/lib/careers-shared";

export const Route = createFileRoute("/careers/apply/$slug")({
  loader: async ({ params }) => {
    const res = await fetchJob({ data: { slug: params.slug } });
    if (res.state === "not_found") throw notFound();
    return res;
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData && loaderData.state !== "error"
          ? `Apply: ${loaderData.job.title} — 4First Technologies`
          : "Apply — 4First Technologies",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  notFoundComponent: () => <Message title="Vacancy not found">This vacancy doesn't exist.</Message>,
  component: ApplyPage,
});

function Message({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-xl px-5 py-32 text-center">
      <h1 className="text-3xl">{title}</h1>
      <div className="mt-4 text-sm text-muted-foreground">{children}</div>
      <Link to="/careers" search={{ page: 1 }} className="mt-6 inline-block text-sm text-primary hover:underline">
        ← Back to Careers
      </Link>
    </div>
  );
}

function ApplyPage() {
  const res = Route.useLoaderData();
  if (res.state === "error") {
    return <Message title="We couldn't load this form">Please refresh the page or try again shortly.</Message>;
  }
  if (res.state === "unavailable") {
    return (
      <Message title="This position is no longer accepting applications">
        {res.job.title} has closed. Take a look at our other openings.
      </Message>
    );
  }
  return <ApplyForm job={res.job} limits={res.limits} />;
}

const EMPTY = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  location: "",
  linkedinUrl: "",
  portfolioUrl: "",
  coverLetter: "",
};

function ApplyForm({ job, limits }: { job: PublicJob; limits: ApplyLimits }) {
  const navigate = useNavigate();
  const [values, setValues] = useState(EMPTY);
  const [privacy, setPrivacy] = useState(false);
  const [cv, setCv] = useState<File | null>(null);
  const [extra, setExtra] = useState<File | null>(null);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  // one key per form instance: a retry or double click can never create a second record
  const idempotencyKey = useRef(crypto.randomUUID());
  const statusRef = useRef<HTMLDivElement>(null);

  const set = (k: keyof typeof EMPTY) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setValues((v) => ({ ...v, [k]: e.target.value }));

  function fileProblem(file: File | null, required: boolean): string | undefined {
    if (!file) return required ? "Attach your CV" : undefined;
    if (file.size === 0) return "This file is empty";
    if (file.size > limits.maxMb * 1024 * 1024) return `This file is larger than ${limits.maxMb} MB`;
    const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
    const allowed = limits.allowWordDocs ? CV_EXTENSIONS : (["pdf"] as const);
    if (!(allowed as readonly string[]).includes(ext)) return `Upload ${describeAllowedFiles(limits)}`;
    return undefined;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy) return;
    setFormError(null);

    const parsed = applicationSchema.safeParse({ ...values, privacyAccepted: privacy });
    const next: FieldErrors = {};
    if (!parsed.success) {
      for (const i of parsed.error.issues) next[i.path[0] as keyof FieldErrors] ??= i.message;
    }
    const cvErr = fileProblem(cv, true);
    if (cvErr) next.cv = cvErr;
    const extraErr = job.allow_supporting_doc ? fileProblem(extra, false) : undefined;
    if (extraErr) next.supportingDoc = extraErr;
    setErrors(next);
    if (Object.keys(next).length) {
      requestAnimationFrame(() =>
        (document.querySelector("[aria-invalid='true']") as HTMLElement | null)?.focus(),
      );
      return;
    }

    setBusy(true);
    try {
      const fd = new FormData();
      fd.set("jobId", job.id);
      fd.set("idempotencyKey", idempotencyKey.current);
      for (const [k, v] of Object.entries(values)) fd.set(k, v);
      fd.set("privacyAccepted", "true");
      fd.set("website", ""); // honeypot
      if (cv) fd.set("cv", cv);
      if (extra && job.allow_supporting_doc) fd.set("supportingDoc", extra);

      const result = await submitApplication({ data: fd });
      if (result.ok) {
        await navigate({ to: "/careers/applied", search: { ref: result.reference }, replace: true });
        return;
      }
      if (result.code === "validation") setErrors(result.errors);
      else setFormError(result.message);
    } catch {
      setFormError("We couldn't reach the server. Your details are still here — please try again.");
    } finally {
      setBusy(false);
      requestAnimationFrame(() => statusRef.current?.focus());
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-5 py-16 sm:px-10 md:py-24">
      <Link
        to="/careers/$slug"
        params={{ slug: job.slug }}
        className="text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-primary"
      >
        ← Back to job details
      </Link>
      <p className="mt-8 text-xs uppercase tracking-[0.3em] text-accent">Application</p>
      <h1 className="mt-4 text-4xl md:text-5xl">{job.title}</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Ref {job.reference} · {job.location} · {job.employment_type}
      </p>

      <form onSubmit={onSubmit} noValidate className="mt-10 space-y-8">
        <div ref={statusRef} tabIndex={-1} role="alert" aria-live="assertive" className="outline-none">
          {formError && (
            <p className="rounded-sm border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
              {formError}{" "}
              {formError.includes("no longer accepting") && (
                <Link to="/careers" search={{ page: 1 }} className="underline">
                  See current vacancies
                </Link>
              )}
            </p>
          )}
        </div>

        {/* honeypot — hidden from people and assistive tech */}
        <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label>
            Website <input type="text" name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        <fieldset className="space-y-5" disabled={busy}>
          <legend className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            About you
          </legend>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="First name" name="firstName" required value={values.firstName} onChange={set("firstName")} error={errors.firstName} autoComplete="given-name" />
            <Field label="Last name" name="lastName" required value={values.lastName} onChange={set("lastName")} error={errors.lastName} autoComplete="family-name" />
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Email address" name="email" type="email" required value={values.email} onChange={set("email")} error={errors.email} autoComplete="email" />
            <Field label="Phone number" name="phone" type="tel" required value={values.phone} onChange={set("phone")} error={errors.phone} autoComplete="tel" hint="Include your country code, e.g. +234…" />
          </div>
          <Field label="Current location" name="location" required value={values.location} onChange={set("location")} error={errors.location} autoComplete="address-level2" hint="City and country" />
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="LinkedIn profile" name="linkedinUrl" type="url" value={values.linkedinUrl} onChange={set("linkedinUrl")} error={errors.linkedinUrl} optional placeholder="https://linkedin.com/in/…" />
            <Field label="Portfolio, GitHub or website" name="portfolioUrl" type="url" value={values.portfolioUrl} onChange={set("portfolioUrl")} error={errors.portfolioUrl} optional placeholder="https://…" />
          </div>
        </fieldset>

        <fieldset className="space-y-5" disabled={busy}>
          <legend className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Your application
          </legend>
          <FileField
            label="CV / résumé"
            name="cv"
            required
            file={cv}
            onChange={setCv}
            error={errors.cv}
            hint={describeAllowedFiles(limits)}
            accept={limits.allowWordDocs ? ".pdf,.doc,.docx" : ".pdf"}
          />
          {job.allow_supporting_doc && (
            <FileField
              label="Supporting document"
              name="supportingDoc"
              file={extra}
              onChange={setExtra}
              error={errors.supportingDoc}
              hint={`Optional. ${describeAllowedFiles(limits)}`}
              accept={limits.allowWordDocs ? ".pdf,.doc,.docx" : ".pdf"}
            />
          )}
          <div>
            <label htmlFor="coverLetter" className={labelCls}>
              Cover letter or motivation <Optional />
            </label>
            <textarea
              id="coverLetter"
              name="coverLetter"
              rows={6}
              maxLength={3000}
              value={values.coverLetter}
              onChange={set("coverLetter")}
              aria-invalid={Boolean(errors.coverLetter)}
              aria-describedby="coverLetter-hint"
              className={inputCls}
            />
            <p id="coverLetter-hint" className="mt-1.5 text-xs text-muted-foreground">
              {values.coverLetter.length} / 3,000 characters
            </p>
            <ErrorText id="coverLetter-err" msg={errors.coverLetter} />
          </div>
        </fieldset>

        <div>
          <label className="flex cursor-pointer items-start gap-3 text-sm">
            <input
              type="checkbox"
              checked={privacy}
              onChange={(e) => setPrivacy(e.target.checked)}
              aria-invalid={Boolean(errors.privacyAccepted)}
              aria-describedby={errors.privacyAccepted ? "privacy-err" : undefined}
              className="mt-1 size-4 accent-primary"
            />
            <span>
              I have read the{" "}
              <a href={PRIVACY_NOTICE_PATH} target="_blank" rel="noreferrer" className="text-primary underline">
                recruitment privacy notice
              </a>{" "}
              and understand how 4First Technologies will use my application data.
              <span className="text-primary"> *</span>
            </span>
          </label>
          <ErrorText id="privacy-err" msg={errors.privacyAccepted} />
        </div>

        <button
          type="submit"
          disabled={busy}
          aria-busy={busy}
          className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-primary px-5 py-4 text-sm font-medium text-primary-foreground transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {busy ? "Submitting your application…" : "Submit Application →"}
        </button>
      </form>
    </div>
  );
}

const labelCls = "mb-2 block text-xs uppercase tracking-[0.2em] text-muted-foreground";
const inputCls =
  "w-full rounded-sm border border-border/70 bg-background/50 px-3 py-2.5 text-sm text-foreground transition focus:border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 aria-[invalid=true]:border-destructive";

function Optional() {
  return <span className="normal-case tracking-normal text-muted-foreground/70">(optional)</span>;
}

function ErrorText({ id, msg }: { id: string; msg?: string | undefined }) {
  return msg ? (
    <p id={id} className="mt-1.5 text-sm text-destructive">
      {msg}
    </p>
  ) : null;
}

function Field(props: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string | undefined;
  type?: string;
  required?: boolean;
  optional?: boolean;
  hint?: string;
  placeholder?: string;
  autoComplete?: string;
}) {
  const { label, name, error, hint, required, optional, ...rest } = props;
  const describedBy = [hint && `${name}-hint`, error && `${name}-err`].filter(Boolean).join(" ") || undefined;
  return (
    <div>
      <label htmlFor={name} className={labelCls}>
        {label} {required && <span className="text-primary">*</span>} {optional && <Optional />}
      </label>
      <input
        id={name}
        name={name}
        type={rest.type ?? "text"}
        value={rest.value}
        onChange={rest.onChange}
        placeholder={rest.placeholder}
        autoComplete={rest.autoComplete}
        aria-required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        className={inputCls}
      />
      {hint && (
        <p id={`${name}-hint`} className="mt-1.5 text-xs text-muted-foreground">
          {hint}
        </p>
      )}
      <ErrorText id={`${name}-err`} msg={error} />
    </div>
  );
}

function FileField(props: {
  label: string;
  name: string;
  file: File | null;
  onChange: (f: File | null) => void;
  error?: string | undefined;
  hint: string;
  accept: string;
  required?: boolean;
}) {
  const { label, name, file, onChange, error, hint, accept, required } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div>
      <label htmlFor={name} className={labelCls}>
        {label} {required && <span className="text-primary">*</span>}
      </label>
      <input
        ref={inputRef}
        id={name}
        name={name}
        type="file"
        accept={accept}
        onChange={(e) => onChange(e.target.files?.[0] ?? null)}
        aria-required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={`${name}-hint${error ? ` ${name}-err` : ""}`}
        className="block w-full cursor-pointer rounded-sm border border-dashed border-border bg-background/50 px-3 py-3 text-sm file:mr-4 file:cursor-pointer file:rounded-sm file:border-0 file:bg-primary file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-primary-foreground aria-[invalid=true]:border-destructive"
      />
      <p id={`${name}-hint`} className="mt-1.5 text-xs text-muted-foreground">
        {file ? (
          <>
            Selected: <span className="text-foreground">{file.name}</span> ({(file.size / 1024 / 1024).toFixed(2)} MB) ·{" "}
            <button
              type="button"
              className="text-primary underline"
              onClick={() => {
                onChange(null);
                if (inputRef.current) inputRef.current.value = "";
                inputRef.current?.click();
              }}
            >
              Replace
            </button>
          </>
        ) : (
          hint
        )}
      </p>
      <ErrorText id={`${name}-err`} msg={error} />
    </div>
  );
}
