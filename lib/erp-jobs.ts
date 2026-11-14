import { timingSafeEqual } from "node:crypto";
import { z } from "zod";

export const ERP_SYNC_TOKEN_ENV = "ERPNEXT_SYNC_TOKEN";
export const MAX_SYNC_JOBS = 100;
export const MAX_SYNC_BODY_BYTES = 256 * 1024;

const rawJobSchema = z.object({
  externalId: z.string().trim().min(1).max(180),
  title: z.string().trim().min(1).max(220),
  department: z.string().trim().max(160).nullish(),
  location: z.string().trim().max(220).nullish(),
  employmentType: z.string().trim().max(120).nullish(),
  description: z.string().trim().max(30_000).nullish(),
  responsibilities: z.string().trim().max(30_000).nullish(),
  qualifications: z.string().trim().max(30_000).nullish(),
  experience: z.string().trim().max(160).nullish(),
  openings: z.coerce.number().int().min(0).max(10_000).nullish(),
  openedAt: z.string().trim().max(80).nullish(),
  closesAt: z.string().trim().max(80).nullish(),
  applicationUrl: z.string().trim().url().max(2_000).refine((value) => {
    const protocol = new URL(value).protocol;
    return protocol === "https:" || protocol === "http:";
  }, "Application URL must use HTTP or HTTPS").nullish(),
  status: z.string().trim().min(1).max(80),
  sourceUpdatedAt: z.string().trim().max(80).nullish(),
});

const OPEN_STATUSES = new Set(["open", "active", "published"]);
const CLOSED_STATUSES = new Map([
  ["closed", "closed"],
  ["cancelled", "cancelled"],
  ["canceled", "cancelled"],
  ["filled", "filled"],
  ["inactive", "inactive"],
  ["draft", "draft"],
]);

export type NormalizedJobOpening = {
  externalId: string;
  title: string;
  department: string | null;
  location: string | null;
  employmentType: string | null;
  description: string;
  responsibilities: string;
  qualifications: string;
  experience: string | null;
  openings: number | null;
  openedAt: Date | null;
  closesAt: Date | null;
  applicationUrl: string | null;
  status: string;
  published: boolean;
  sourceUpdatedAt: Date | null;
};

function optionalString(value: unknown): unknown {
  return typeof value === "string" && value.trim() === "" ? null : value;
}

function first(record: Record<string, unknown>, keys: string[]): unknown {
  for (const key of keys) {
    if (record[key] !== undefined && record[key] !== null) return record[key];
  }
  return undefined;
}

function parseDate(value: string | null | undefined, field: string): Date | null {
  if (!value) return null;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    throw new Error(`${field} must be an ISO-8601 date or date-time`);
  }
  return parsed;
}

function normalizeStatus(value: string): { status: string; published: boolean } {
  const input = value.toLowerCase().replace(/[\s_-]+/g, " ").trim();
  if (OPEN_STATUSES.has(input)) return { status: "open", published: true };
  const closed = CLOSED_STATUSES.get(input);
  if (closed) return { status: closed, published: false };
  throw new Error(`Unsupported status: ${value}`);
}

function canonicalInput(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error("Each job opening must be a JSON object");
  }
  const raw = value as Record<string, unknown>;
  return {
    externalId: first(raw, ["externalId", "erpJobId", "jobId", "name", "id"]),
    title: first(raw, ["title", "jobTitle", "job_title"]),
    department: optionalString(first(raw, ["department", "departmentName", "department_name"])),
    location: optionalString(first(raw, ["location", "jobLocation", "job_location"])),
    employmentType: optionalString(first(raw, ["employmentType", "employment_type", "type"])),
    description: optionalString(first(raw, ["description", "jobDescription", "job_description"])),
    responsibilities: optionalString(first(raw, ["responsibilities", "keyResponsibilities", "key_responsibilities"])),
    qualifications: optionalString(first(raw, ["qualifications", "requirements"])),
    experience: optionalString(first(raw, ["experience", "experienceRange", "experience_range"])),
    openings: first(raw, ["openings", "numberOfOpenings", "number_of_openings", "vacancies"]),
    openedAt: optionalString(first(raw, ["openedAt", "openingDate", "opening_date", "postingDate", "posting_date"])),
    closesAt: optionalString(first(raw, ["closesAt", "closingDate", "closing_date"])),
    applicationUrl: optionalString(first(raw, ["applicationUrl", "application_url", "applyUrl", "apply_url"])),
    status: first(raw, ["status", "jobStatus", "job_status"]),
    sourceUpdatedAt: optionalString(first(raw, ["sourceUpdatedAt", "modified", "updatedAt", "updated_at"])),
  };
}

export function parseSyncBody(body: unknown): NormalizedJobOpening[] {
  let inputs: unknown[];
  if (Array.isArray(body)) inputs = body;
  else if (body && typeof body === "object" && Array.isArray((body as { jobs?: unknown }).jobs)) {
    inputs = (body as { jobs: unknown[] }).jobs;
  } else if (body && typeof body === "object" && (body as { job?: unknown }).job !== undefined) {
    inputs = [(body as { job: unknown }).job];
  } else inputs = [body];

  if (inputs.length === 0) throw new Error("At least one job opening is required");
  if (inputs.length > MAX_SYNC_JOBS) throw new Error(`A maximum of ${MAX_SYNC_JOBS} job openings can be synchronized at once`);

  return inputs.map((input, index) => {
    const parsed = rawJobSchema.safeParse(canonicalInput(input));
    if (!parsed.success) {
      const issue = parsed.error.issues[0];
      const field = issue.path.join(".") || "job";
      throw new Error(`jobs[${index}].${field}: ${issue.message}`);
    }
    const status = normalizeStatus(parsed.data.status);
    return {
      externalId: parsed.data.externalId,
      title: parsed.data.title,
      department: parsed.data.department || null,
      location: parsed.data.location || null,
      employmentType: parsed.data.employmentType || null,
      description: parsed.data.description || "",
      responsibilities: parsed.data.responsibilities || "",
      qualifications: parsed.data.qualifications || "",
      experience: parsed.data.experience || null,
      openings: parsed.data.openings ?? null,
      openedAt: parseDate(parsed.data.openedAt, `jobs[${index}].openedAt`),
      closesAt: parseDate(parsed.data.closesAt, `jobs[${index}].closesAt`),
      applicationUrl: parsed.data.applicationUrl || null,
      ...status,
      sourceUpdatedAt: parseDate(parsed.data.sourceUpdatedAt, `jobs[${index}].sourceUpdatedAt`),
    };
  });
}

export function isAuthorizedSyncRequest(request: Request, configuredToken = process.env[ERP_SYNC_TOKEN_ENV]): boolean {
  if (!configuredToken) return false;
  const authorization = request.headers.get("authorization") || "";
  const match = authorization.match(/^Bearer\s+(.+)$/i);
  if (!match) return false;
  const supplied = Buffer.from(match[1], "utf8");
  const expected = Buffer.from(configuredToken, "utf8");
  return supplied.length === expected.length && timingSafeEqual(supplied, expected);
}

export function publicJob<T extends {
  id: string;
  externalId: string;
  title: string;
  department: string | null;
  location: string | null;
  employmentType: string | null;
  description: string;
  responsibilities: string;
  qualifications: string;
  experience: string | null;
  openings: number | null;
  openedAt: Date | null;
  closesAt: Date | null;
  applicationUrl: string | null;
  updatedAt: Date;
}>(job: T) {
  return {
    id: job.id,
    externalId: job.externalId,
    title: job.title,
    department: job.department,
    location: job.location,
    employmentType: job.employmentType,
    description: job.description,
    responsibilities: job.responsibilities,
    qualifications: job.qualifications,
    experience: job.experience,
    openings: job.openings,
    openedAt: job.openedAt?.toISOString() ?? null,
    closesAt: job.closesAt?.toISOString() ?? null,
    applicationUrl: job.applicationUrl,
    updatedAt: job.updatedAt.toISOString(),
  };
}
