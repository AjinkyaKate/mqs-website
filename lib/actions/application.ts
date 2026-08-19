"use server";

import { put } from "@vercel/blob";
import { prisma } from "@/lib/db";
import { applicationSchema, type ApplicationFormState } from "@/lib/schemas";
import { verifySession } from "@/lib/auth";

/* Careers form. Mirrors submitContactForm, with a resume upload on top.

   The resume is written to Vercel Blob with access: "private", so it is not
   readable from a URL the way the site images are. It is served back only
   through /api/applications/[id]/resume, which checks the admin session. The DB
   stores the blob pathname rather than a public URL, so nothing in the record
   can be pasted into a browser to reach someone's CV.

   Accepted types and the size cap match what the form tells the applicant:
   PDF or DOCX, up to 5 MB. next.config raises the server-action body limit to
   6 MB to leave room for multipart overhead on a 5 MB file. */

const MAX_BYTES = 5 * 1024 * 1024;
const ACCEPTED: Record<string, string> = {
  "application/pdf": "pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
  "application/msword": "doc",
};

export async function submitApplication(
  _prev: ApplicationFormState,
  formData: FormData
): Promise<ApplicationFormState> {
  const raw = {
    name: formData.get("fullname") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    location: formData.get("location") as string,
    department: formData.get("department") as string,
    experience: formData.get("experience") as string,
    company: formData.get("company") as string,
    linkedin: formData.get("linkedin") as string,
    message: formData.get("message") as string,
  };

  const result = applicationSchema.safeParse(raw);
  const errors: Record<string, string[]> = result.success
    ? {}
    : result.error.flatten().fieldErrors as Record<string, string[]>;

  /* Consent is not optional: the form states what the data is used for and for
     how long, so a submission without it must not be stored. */
  if (formData.get("consent") !== "on") {
    errors.consent = ["Please confirm you agree to be contacted"];
  }

  const file = formData.get("resume");
  if (!(file instanceof File) || file.size === 0) {
    errors.resume = ["A resume is required"];
  } else if (file.size > MAX_BYTES) {
    errors.resume = ["Resume must be 5 MB or smaller"];
  } else if (!ACCEPTED[file.type]) {
    errors.resume = ["Resume must be a PDF or DOCX file"];
  }

  if (Object.keys(errors).length > 0 || !result.success) {
    return { success: false, errors };
  }

  const resume = file as File;
  const ext = ACCEPTED[resume.type];
  const safeName = (result.data.name || "applicant").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  try {
    const blob = await put(`applications/${safeName}.${ext}`, resume, {
      access: "private",
      addRandomSuffix: true,
      contentType: resume.type,
    });

    await prisma.application.create({
      data: {
        ...result.data,
        resumePath: blob.pathname,
        resumeName: resume.name,
        resumeSize: resume.size,
        consentAt: new Date(),
      },
    });
  } catch {
    return {
      success: false,
      message: "Something went wrong saving your application. Please email sales@mqstechnologies.in and we will pick it up.",
    };
  }

  return { success: true, message: "Thank you. Your application is with our team and we will be in touch when something relevant opens." };
}

export async function updateApplicationStatus(id: string, status: string) {
  const authed = await verifySession();
  if (!authed) throw new Error("Unauthorized");

  await prisma.application.update({ where: { id }, data: { status } });
}
