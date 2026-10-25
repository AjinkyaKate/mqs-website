import { prisma } from "@/lib/db";
import { TIMEZONE } from "@/lib/umami";

/* Lead numbers for the Analytics tab, counted straight from the Enquiry and
   Application tables. These are exact and instant: every form submission is
   saved here before the visitor sees the thank-you message, whether or not an
   ad blocker stopped the analytics script. */

export type Leads = {
  enquiries: number;
  enquiriesPrev: number;
  applications: number;
  applicationsPrev: number;
  awaitingReply: number;
  perDay: { day: string; value: number }[];
  byIndustry: { name: string; value: number }[];
  byRequirement: { name: string; value: number }[];
  byPage: { name: string; value: number }[];
  byDepartment: { name: string; value: number }[];
};

const dayKey = (d: Date) => d.toLocaleDateString("en-CA", { timeZone: TIMEZONE });

function tally(values: (string | null)[], limit = 8) {
  const counts = new Map<string, number>();
  for (const v of values) {
    const key = v?.trim() || "Not specified";
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, limit);
}

export async function getLeads(startAt: number, endAt: number, unit: "hour" | "day"): Promise<Leads> {
  const start = new Date(startAt);
  const end = new Date(endAt);
  const prevStart = new Date(startAt - (endAt - startAt));

  const [enquiries, enquiriesPrev, applications, applicationsPrev, awaitingReply] = await Promise.all([
    prisma.enquiry.findMany({
      where: { createdAt: { gte: start, lte: end } },
      select: { createdAt: true, industry: true, requirementType: true, sourcePage: true, source: true },
    }),
    prisma.enquiry.count({ where: { createdAt: { gte: prevStart, lt: start } } }),
    prisma.application.findMany({ where: { createdAt: { gte: start, lte: end } }, select: { createdAt: true, department: true } }),
    prisma.application.count({ where: { createdAt: { gte: prevStart, lt: start } } }),
    prisma.enquiry.count({ where: { status: "new" } }),
  ]);

  // One slot per hour (today) or per day, so quiet periods show as zero.
  const slots = new Map<string, number>();
  const step = unit === "hour" ? 3_600_000 : 86_400_000;
  const slotKey = (d: Date) =>
    unit === "hour" ? `${dayKey(d)} ${d.toLocaleString("en-GB", { hour: "2-digit", hour12: false, timeZone: TIMEZONE })}` : dayKey(d);
  for (let t = startAt; t <= endAt; t += step) slots.set(slotKey(new Date(t)), 0);
  for (const e of enquiries) {
    const k = slotKey(e.createdAt);
    slots.set(k, (slots.get(k) ?? 0) + 1);
  }

  return {
    enquiries: enquiries.length,
    enquiriesPrev,
    applications: applications.length,
    applicationsPrev,
    awaitingReply,
    perDay: [...slots.entries()].map(([day, value]) => ({ day, value })),
    byIndustry: tally(enquiries.map((e) => e.industry)),
    byRequirement: tally(enquiries.map((e) => e.requirementType)),
    // Product enquiries have no sourcePage; their source says where they came from.
    byPage: tally(enquiries.map((e) => e.sourcePage || (e.source === "product" ? "Product page form" : "Contact form"))),
    byDepartment: tally(applications.map((a) => a.department)),
  };
}
