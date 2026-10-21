import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { createClient } from "@supabase/supabase-js";
import {
  applicationSchema,
  isJobOpen,
  type ApplyLimits,
  type FieldErrors,
  type JobListItem,
  type PublicJob,
  type SubmitResult,
} from "@/lib/careers-shared";

/**
 * Careers read + apply layer. Vacancies are read with the anon key (RLS exposes only
 * published/closed rows). Applications are written with the service-role key because
 * applicant data has no public policies at all; the key never leaves the server.
 */

const PAGE_SIZE = 10;

// We never use realtime, but supabase-js constructs its client eagerly and throws on runtimes
// without a native WebSocket (Node < 22, e.g. Netlify functions). A stub transport avoids that.
const NO_WEBSOCKET = class {} as never;
const REALTIME_OFF = { realtime: { transport: NO_WEBSOCKET } };

function anonClient() {
  const url = process.env["SUPABASE_URL"] ?? process.env["VITE_SUPABASE_URL"];
  const key = process.env["SUPABASE_ANON_KEY"] ?? process.env["VITE_SUPABASE_ANON_KEY"];
  if (!url || !key) return null;
  try {
    return createClient(url, key, { auth: { persistSession: false }, ...REALTIME_OFF });
  } catch (err) {
    console.error("[careers] could not create Supabase client", err);
    return null;
  }
}

function serviceClient() {
  const url = process.env["SUPABASE_URL"] ?? process.env["VITE_SUPABASE_URL"];
  const key = process.env["SUPABASE_SERVICE_ROLE_KEY"];
  if (!url || !key) return null;
  try {
    return createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
      ...REALTIME_OFF,
    });
  } catch (err) {
    console.error("[careers] could not create Supabase service client", err);
    return null;
  }
}

const LIST_COLUMNS =
  "id, reference, slug, title, department, employment_type, work_arrangement, location, summary, published_at, application_deadline";

// ── Reads ───────────────────────────────────────────────────────────────────

export const fetchJobs = createServerFn({ method: "GET" })
  .inputValidator((input: { page?: number }) => input)
  .handler(
    async ({
      data,
    }): Promise<{ ok: boolean; jobs: JobListItem[]; total: number; page: number; pageSize: number }> => {
      const page = Math.max(1, Math.floor(data.page ?? 1));
      const empty = { ok: true, jobs: [], total: 0, page, pageSize: PAGE_SIZE };
      const supabase = anonClient();
      if (!supabase) return { ...empty, ok: false };
      const from = (page - 1) * PAGE_SIZE;
      const { data: rows, count, error } = await supabase
        .from("jobs")
        .select(LIST_COLUMNS, { count: "exact" })
        .eq("status", "published")
        // deadline null = open-ended; otherwise must still be in the future
        .or(`application_deadline.is.null,application_deadline.gt.${new Date().toISOString()}`)
        .order("published_at", { ascending: false })
        .range(from, from + PAGE_SIZE - 1);
      if (error) {
        console.error("[careers] fetchJobs", error.message);
        return { ...empty, ok: false };
      }
      return { ok: true, jobs: (rows ?? []) as JobListItem[], total: count ?? 0, page, pageSize: PAGE_SIZE };
    },
  );

export type JobDetailResult =
  | { state: "open"; job: PublicJob; limits: ApplyLimits }
  | { state: "unavailable"; job: PublicJob }
  | { state: "not_found" }
  | { state: "error" };

export const fetchJob = createServerFn({ method: "GET" })
  .inputValidator((input: { slug: string }) => input)
  .handler(async ({ data }): Promise<JobDetailResult> => {
    const supabase = anonClient();
    if (!supabase) return { state: "error" };
    const { data: row, error } = await supabase
      .from("jobs")
      .select("*")
      .eq("slug", data.slug)
      .in("status", ["published", "closed"])
      .maybeSingle();
    if (error) {
      console.error("[careers] fetchJob", error.message);
      return { state: "error" };
    }
    if (!row) return { state: "not_found" };
    const job = row as PublicJob;
    if (!isJobOpen(job)) return { state: "unavailable", job };
    return { state: "open", job, limits: await loadLimits() };
  });

async function loadLimits(): Promise<ApplyLimits> {
  const fallback = { maxMb: 5, allowWordDocs: true };
  const svc = serviceClient();
  if (!svc) return fallback;
  const { data } = await svc
    .from("recruitment_settings")
    .select("max_cv_mb, allow_word_docs")
    .maybeSingle();
  return data ? { maxMb: data.max_cv_mb, allowWordDocs: data.allow_word_docs } : fallback;
}

/** Minimal, non-sensitive details for the confirmation screen. */
export const fetchConfirmation = createServerFn({ method: "GET" })
  .inputValidator((input: { ref: string }) => input)
  .handler(async ({ data }) => {
    const svc = serviceClient();
    if (!svc || !/^[A-Z0-9-]{8,32}$/.test(data.ref)) return null;
    const { data: row } = await svc
      .from("job_applications")
      .select("application_reference, job_title, submitted_at")
      .eq("application_reference", data.ref)
      .maybeSingle();
    return row
      ? { reference: row.application_reference, jobTitle: row.job_title, submittedAt: row.submitted_at }
      : null;
  });

// ── Upload validation ───────────────────────────────────────────────────────

type DocType = { ext: "pdf" | "doc" | "docx"; mime: string };

const MIME: Record<DocType["ext"], string> = {
  pdf: "application/pdf",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
};

const startsWith = (b: Uint8Array, sig: number[]) => sig.every((v, i) => b[i] === v);

/** Identify the document from its bytes — the filename and browser MIME are never trusted. */
function sniff(bytes: Uint8Array, allowWordDocs: boolean): DocType | null {
  if (startsWith(bytes, [0x25, 0x50, 0x44, 0x46, 0x2d])) return { ext: "pdf", mime: MIME.pdf };
  if (!allowWordDocs) return null;
  if (startsWith(bytes, [0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1]))
    return { ext: "doc", mime: MIME.doc };
  if (startsWith(bytes, [0x50, 0x4b, 0x03, 0x04])) {
    // a .docx is a zip whose entries include word/…; other zips (xlsx, jar, …) are rejected
    const head = new TextDecoder("latin1").decode(bytes.subarray(0, Math.min(bytes.length, 8192)));
    if (head.includes("[Content_Types].xml") || head.includes("word/")) {
      return { ext: "docx", mime: MIME.docx };
    }
  }
  return null;
}

async function checkFile(
  file: FormDataEntryValue | null,
  limits: ApplyLimits,
  required: boolean,
): Promise<{ error?: string; bytes?: Uint8Array; type?: DocType; name?: string }> {
  if (!(file instanceof File) || file.size === 0) {
    return required ? { error: "Attach your CV" } : {};
  }
  const maxBytes = limits.maxMb * 1024 * 1024;
  if (file.size > maxBytes) return { error: `This file is larger than ${limits.maxMb} MB` };
  const bytes = new Uint8Array(await file.arrayBuffer());
  const type = sniff(bytes, limits.allowWordDocs);
  if (!type) {
    return {
      error: limits.allowWordDocs
        ? "We couldn't read this file. Upload a PDF, DOC or DOCX"
        : "We couldn't read this file. Upload a PDF",
    };
  }
  const name = file.name.replace(/[^\w.\- ()]/g, "_").slice(-150) || `document.${type.ext}`;
  return { bytes, type, name };
}

// ── Submit ──────────────────────────────────────────────────────────────────

// Best-effort per-instance limiter; the idempotency key + DB constraints are the real guards.
const hits = new Map<string, number[]>();
function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > 6;
}

const REF_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
function newReference() {
  const rnd = crypto.getRandomValues(new Uint8Array(8));
  const body = Array.from(rnd, (b) => REF_ALPHABET[b % REF_ALPHABET.length]).join("");
  return `APP-${body.slice(0, 4)}-${body.slice(4)}`;
}

export const submitApplication = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => {
    if (!(data instanceof FormData)) throw new Error("Invalid submission");
    return data;
  })
  .handler(async ({ data: form }): Promise<SubmitResult> => {
    const svc = serviceClient();
    if (!svc) {
      console.error("[careers] SUPABASE_SERVICE_ROLE_KEY is not configured");
      return { ok: false, code: "server", message: "Applications are temporarily unavailable. Please try again later." };
    }

    // honeypot: bots fill hidden fields; pretend success without storing anything
    if (String(form.get("website") ?? "") !== "") return { ok: true, reference: newReference() };

    const ip = (getRequestHeader("x-forwarded-for") ?? "").split(",")[0]?.trim() || "unknown";
    if (rateLimited(ip)) {
      return { ok: false, code: "rate_limited", message: "Too many attempts. Please wait a few minutes and try again." };
    }

    const jobId = String(form.get("jobId") ?? "");
    const idempotencyKey = String(form.get("idempotencyKey") ?? "");
    if (!/^[0-9a-f-]{36}$/i.test(jobId) || !/^[0-9a-f-]{36}$/i.test(idempotencyKey)) {
      return { ok: false, code: "not_found", message: "This vacancy could not be found." };
    }

    const parsed = applicationSchema.safeParse({
      firstName: form.get("firstName") ?? "",
      lastName: form.get("lastName") ?? "",
      email: form.get("email") ?? "",
      phone: form.get("phone") ?? "",
      location: form.get("location") ?? "",
      linkedinUrl: form.get("linkedinUrl") ?? "",
      portfolioUrl: form.get("portfolioUrl") ?? "",
      coverLetter: form.get("coverLetter") ?? "",
      privacyAccepted: form.get("privacyAccepted") === "true",
    });
    const errors: FieldErrors = {};
    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof FieldErrors;
        errors[key] ??= issue.message;
      }
    }

    // Vacancy first (cheap) so a closed job is reported before file complaints.
    const { data: job } = await svc
      .from("jobs")
      .select("id, status, application_deadline, allow_supporting_doc")
      .eq("id", jobId)
      .maybeSingle();
    if (!job) return { ok: false, code: "not_found", message: "This vacancy could not be found." };
    if (!isJobOpen(job)) {
      return { ok: false, code: "closed", message: "This position is no longer accepting applications." };
    }

    const limits = await loadLimits();
    const cv = await checkFile(form.get("cv"), limits, true);
    if (cv.error) errors.cv = cv.error;
    const extra = job.allow_supporting_doc
      ? await checkFile(form.get("supportingDoc"), limits, false)
      : {};
    if (extra.error) errors.supportingDoc = extra.error;

    if (!parsed.success || Object.keys(errors).length) {
      return { ok: false, code: "validation", errors };
    }
    const f = parsed.data;

    // 1) store files (private bucket), 2) record everything atomically, 3) clean up on failure
    const folder = `applications/${idempotencyKey}`;
    const stored: { kind: "cv" | "supporting"; key: string; name: string; type: DocType; size: number }[] = [];
    const uploaded: string[] = [];
    const cleanup = async () => {
      if (uploaded.length) await svc.storage.from("recruitment-docs").remove(uploaded).catch(() => {});
    };

    try {
      for (const [kind, file] of [["cv", cv], ["supporting", extra]] as const) {
        if (!file.bytes || !file.type || !file.name) continue;
        const key = `${folder}/${kind}-${crypto.randomUUID()}.${file.type.ext}`;
        const { error } = await svc.storage
          .from("recruitment-docs")
          .upload(key, file.bytes, { contentType: file.type.mime, upsert: false });
        if (error) throw new Error(`upload failed: ${error.message}`);
        uploaded.push(key);
        stored.push({ kind, key, name: file.name, type: file.type, size: file.bytes.length });
      }

      let reference = newReference();
      let result: Record<string, unknown> | null = null;
      for (let attempt = 0; attempt < 3; attempt++) {
        const { data: res, error } = await svc.rpc("submit_application", {
          p: {
            job_id: jobId,
            idempotency_key: idempotencyKey,
            reference,
            first_name: f.firstName,
            last_name: f.lastName,
            email: f.email,
            phone: f.phone,
            location: f.location,
            linkedin_url: f.linkedinUrl,
            portfolio_url: f.portfolioUrl,
            cover_letter: f.coverLetter,
            privacy_notice_version: await privacyVersion(svc),
            documents: stored.map((s) => ({
              kind: s.kind,
              storage_key: s.key,
              original_filename: s.name,
              verified_file_type: s.type.ext,
              file_size: s.size,
            })),
          },
        });
        if (!error) {
          result = res as Record<string, unknown>;
          break;
        }
        if (error.code === "23505" && /application_reference/.test(error.message)) {
          reference = newReference(); // astronomically rare reference collision
          continue;
        }
        throw new Error(`record failed: ${error.message}`);
      }
      if (!result) throw new Error("record failed: no result");

      if (result["status"] === "closed" || result["status"] === "not_found") {
        await cleanup();
        return { ok: false, code: "closed", message: "This position is no longer accepting applications." };
      }
      if (result["status"] === "duplicate") {
        // same submit attempt already stored (double click / retry): its files are the stored ones
        await cleanup();
        return { ok: true, reference: String(result["reference"]) };
      }

      await notifyRecruiters(svc, String(result["application_id"]), {
        reference: String(result["reference"]),
        jobTitle: String(result["job_title"]),
        name: `${f.firstName} ${f.lastName}`,
        email: f.email,
        phone: f.phone,
        submittedAt: String(result["submitted_at"]),
      });
      return { ok: true, reference: String(result["reference"]) };
    } catch (err) {
      console.error("[careers] submitApplication", err);
      await cleanup();
      return {
        ok: false,
        code: "server",
        message: "We couldn't save your application. Nothing was submitted — please try again.",
      };
    }
  });

async function privacyVersion(svc: NonNullable<ReturnType<typeof serviceClient>>) {
  const { data } = await svc.from("recruitment_settings").select("privacy_notice_version").maybeSingle();
  return data?.privacy_notice_version ?? "2026-10";
}

// ── Notification (failures never affect the stored application) ─────────────

function esc(v: string) {
  return v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

async function notifyRecruiters(
  svc: NonNullable<ReturnType<typeof serviceClient>>,
  applicationId: string,
  a: { reference: string; jobTitle: string; name: string; email: string; phone: string; submittedAt: string },
) {
  try {
    const { data: n } = await svc
      .from("application_notifications")
      .select("id, recipient, attempts, delivery_status")
      .eq("application_id", applicationId)
      .eq("notification_type", "new_application")
      .maybeSingle();
    if (!n || n.delivery_status === "sent") return;

    const recipient = n.recipient || process.env["CAREERS_TO_EMAIL"] || "careers@4firsttechnologies.com";
    const apiKey = process.env["RESEND_API_KEY"];
    let error: string | null = null;
    if (!recipient) error = "No recruitment notification email is configured";
    else if (!apiKey) error = "RESEND_API_KEY is not configured";
    else {
      const adminUrl = process.env["ADMIN_URL"];
      const link = adminUrl ? `${adminUrl.replace(/\/$/, "")}/careers/applications/${applicationId}` : null;
      const when = new Date(a.submittedAt).toLocaleString("en-GB", { timeZone: "Africa/Lagos" }) + " WAT";
      const rows: [string, string][] = [
        ["Applicant", a.name],
        ["Email", a.email],
        ["Phone", a.phone],
        ["Position", a.jobTitle],
        ["Application ref", a.reference],
        ["Submitted", when],
      ];
      try {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          signal: AbortSignal.timeout(8000),
          headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            from: `4First Careers <${process.env["CONTACT_FROM_EMAIL"] || "onboarding@resend.dev"}>`,
            to: [recipient],
            reply_to: a.email,
            subject: `New Job Application – ${a.jobTitle} – ${a.reference}`,
            html:
              `<table style="border-collapse:collapse;">` +
              rows
                .map(([l, v]) => `<tr><td style="padding:4px 16px 4px 0;color:#666;font-size:13px;">${l}</td><td style="padding:4px 0;font-size:14px;">${esc(v)}</td></tr>`)
                .join("") +
              `</table>` +
              (link ? `<p style="margin-top:16px;"><a href="${esc(link)}">Open the application in the admin</a></p>` : ""),
            text: rows.map(([l, v]) => `${l}: ${v}`).join("\n") + (link ? `\n\n${link}` : ""),
          }),
        });
        if (!res.ok) error = `Resend ${res.status}: ${(await res.text()).slice(0, 300)}`;
      } catch (e) {
        error = e instanceof Error ? e.message : "send failed";
      }
    }

    await svc
      .from("application_notifications")
      .update({
        recipient,
        attempts: n.attempts + 1,
        last_attempt_at: new Date().toISOString(),
        delivery_status: error ? "failed" : "sent",
        sent_at: error ? null : new Date().toISOString(),
        last_error: error,
      })
      .eq("id", n.id);
    if (error) console.error("[careers] notification failed", error);
  } catch (err) {
    console.error("[careers] notifyRecruiters", err);
  }
}
