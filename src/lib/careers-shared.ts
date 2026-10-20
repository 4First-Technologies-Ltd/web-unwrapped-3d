import { z } from "zod";

/** Types + validation shared by the careers server functions and the apply form. */

export const PRIVACY_NOTICE_PATH = "/careers/privacy";

export interface PublicJob {
  id: string;
  reference: string;
  slug: string;
  title: string;
  department: string;
  employment_type: string;
  work_arrangement: string;
  location: string;
  summary: string;
  description: string;
  responsibilities: string[];
  qualifications: string[];
  skills: string[];
  preferred: string[];
  benefits: string[];
  salary_range: string | null;
  application_instructions: string | null;
  recruitment_contact: string | null;
  allow_supporting_doc: boolean;
  status: "published" | "closed";
  published_at: string | null;
  application_deadline: string | null;
  updated_at: string;
}

export type JobListItem = Pick<
  PublicJob,
  | "id"
  | "reference"
  | "slug"
  | "title"
  | "department"
  | "employment_type"
  | "work_arrangement"
  | "location"
  | "summary"
  | "published_at"
  | "application_deadline"
>;

export interface ApplyLimits {
  maxMb: number;
  allowWordDocs: boolean;
}

/** A vacancy accepts applications only while published and before its deadline. */
export function isJobOpen(job: Pick<PublicJob, "status" | "application_deadline">, now = Date.now()) {
  if (job.status !== "published") return false;
  return !job.application_deadline || new Date(job.application_deadline).getTime() > now;
}

// ── Application form ────────────────────────────────────────────────────────

const optionalUrl = z
  .string()
  .trim()
  .max(300, "Keep this under 300 characters")
  .refine((v) => v === "" || /^https?:\/\/[^\s.]+\.[^\s]+$/i.test(v), "Enter a full link starting with https://")
  .optional()
  .default("");

export const applicationSchema = z.object({
  firstName: z.string().trim().min(1, "Enter your first name").max(100),
  lastName: z.string().trim().min(1, "Enter your last name").max(100),
  email: z.string().trim().email("Enter a valid email address").max(254),
  // permissive on purpose: international numbers, spaces, dashes, brackets
  phone: z
    .string()
    .trim()
    .min(1, "Enter your phone number")
    .max(30)
    .refine((v) => /^\+?[\d\s().-]{7,30}$/.test(v) && (v.match(/\d/g)?.length ?? 0) >= 7, "Enter a valid phone number"),
  location: z.string().trim().min(2, "Enter your city and country").max(150),
  linkedinUrl: optionalUrl,
  portfolioUrl: optionalUrl,
  coverLetter: z.string().trim().max(3000, "Keep your cover letter under 3,000 characters").optional().default(""),
  privacyAccepted: z.literal(true, { errorMap: () => ({ message: "You must acknowledge the privacy notice" }) }),
});

export type ApplicationFields = z.input<typeof applicationSchema>;
export type FieldErrors = Partial<Record<keyof ApplicationFields | "cv" | "supportingDoc", string>>;

export type SubmitResult =
  | { ok: true; reference: string }
  | { ok: false; code: "validation"; errors: FieldErrors }
  | { ok: false; code: "closed" | "not_found" | "rate_limited" | "server"; message: string };

export const CV_EXTENSIONS = ["pdf", "doc", "docx"] as const;

export function describeAllowedFiles({ allowWordDocs, maxMb }: ApplyLimits) {
  return allowWordDocs ? `PDF, DOC or DOCX, up to ${maxMb} MB` : `PDF only, up to ${maxMb} MB`;
}

export function formatWat(iso: string, withTime = false) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Africa/Lagos",
    day: "numeric",
    month: "long",
    year: "numeric",
    ...(withTime ? { hour: "2-digit", minute: "2-digit" } : {}),
  }).format(new Date(iso)) + (withTime ? " WAT" : "");
}
