"use server";

import { put } from "@vercel/blob";
import { prisma } from "@/lib/db";
import { contactSchema, productSchema, enquirySchema } from "@/lib/schemas";
import type { ContactFormState, EnquiryFormState } from "@/lib/schemas";
import { verifySession } from "@/lib/auth";

export async function submitContactForm(
  _prev: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const raw = {
    name: formData.get("name") as string,
    company: formData.get("company") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    industry: formData.get("industry") as string,
    application: formData.get("application") as string,
    message: formData.get("message") as string,
  };

  const result = contactSchema.safeParse(raw);
  if (!result.success) {
    return { success: false, errors: result.error.flatten().fieldErrors };
  }

  await prisma.enquiry.create({
    data: {
      source: "contact",
      ...result.data,
      sourcePage: (formData.get("sourcePage") as string) || "/",
    },
  });

  return { success: true, message: "Thank you! We'll be in touch shortly." };
}

export async function submitProductForm(
  _prev: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const raw = {
    name: formData.get("name") as string,
    company: formData.get("company") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    partMaterial: formData.get("partMaterial") as string,
    defectType: formData.get("defectType") as string,
    appDetails: formData.get("appDetails") as string,
  };

  const result = productSchema.safeParse(raw);
  if (!result.success) {
    return { success: false, errors: result.error.flatten().fieldErrors };
  }

  await prisma.enquiry.create({
    data: {
      source: "product",
      ...result.data,
      company: result.data.company,
      sourcePage: (formData.get("sourcePage") as string) || "/products",
    },
  });

  return { success: true, message: "Thank you! We'll be in touch shortly." };
}

/* ── /contact enquiry ──
   The form built from the Contact Us build reference. Kept separate from
   submitContactForm, which the shorter ContactSection on every other page still
   uses, because this one carries five more fields, a required consent and an
   optional attachment.

   Technical requirements from the reference and how each is met here:
   · validate client and server side — zod below, plus required/type attributes
     on the fields themselves
   · preserve entered values if validation fails — returned in state.values
   · cap uploads at 10 MB, PDF/JPG/PNG only — checked below, and next.config
     raises the server-action body limit to 12 MB to leave room for multipart
   · spam protection via honeypot, not a visible puzzle — the "website" field
   · route submissions by requirement type — stored as requirementType so the
     admin view and any future routing rule can read it

   NOT met here, because they need infrastructure this project does not have:
   an automatic acknowledgement email to the sender, and delivery routing to the
   ATE and Services teams. Both are listed in the reference. Submissions do land
   in the Enquiry table and the admin view, so nothing is lost in the meantime,
   but somebody has to be watching that view.

   The attachment goes to private Blob storage rather than public: the reference
   points out that a customer's drawing may itself be commercially sensitive. */

const ATTACH_MAX_BYTES = 10 * 1024 * 1024;
const ATTACH_TYPES: Record<string, string> = {
  "application/pdf": "pdf",
  "image/jpeg": "jpg",
  "image/png": "png",
};

export async function submitEnquiry(
  _prev: EnquiryFormState,
  formData: FormData
): Promise<EnquiryFormState> {
  /* Honeypot: a real person never sees this field, so anything in it is a bot.
     Answer as though it succeeded rather than reporting the trap. */
  if (((formData.get("website") as string) || "").trim() !== "") {
    return { success: true, message: "Thanks, our team will contact you shortly." };
  }

  const raw = {
    name: (formData.get("name") as string) ?? "",
    company: (formData.get("company") as string) ?? "",
    email: (formData.get("email") as string) ?? "",
    phone: (formData.get("phone") as string) ?? "",
    cityCountry: (formData.get("cityCountry") as string) ?? "",
    industry: (formData.get("industry") as string) ?? "",
    requirementType: (formData.get("requirementType") as string) ?? "",
    message: (formData.get("message") as string) ?? "",
    application: (formData.get("application") as string) ?? "",
    partMaterial: (formData.get("partMaterial") as string) ?? "",
    partSize: (formData.get("partSize") as string) ?? "",
  };

  const result = enquirySchema.safeParse(raw);
  const errors: Record<string, string[]> = result.success
    ? {}
    : (result.error.flatten().fieldErrors as Record<string, string[]>);

  /* Consent is not optional. The notice beside it states what the data is used
     for and for how long, so a submission without it must not be stored. */
  if (formData.get("consent") !== "on") {
    errors.consent = ["Please confirm you agree to be contacted"];
  }

  const file = formData.get("attachment");
  const hasFile = file instanceof File && file.size > 0;
  if (hasFile) {
    const f = file as File;
    if (f.size > ATTACH_MAX_BYTES) errors.attachment = ["File must be 10 MB or smaller"];
    else if (!ATTACH_TYPES[f.type]) errors.attachment = ["File must be a PDF, JPG or PNG"];
  }

  if (Object.keys(errors).length > 0 || !result.success) {
    return { success: false, errors, values: raw };
  }

  const data = result.data;
  let attach: { attachPath: string; attachName: string; attachSize: number } | null = null;

  try {
    if (hasFile) {
      const f = file as File;
      const safe = (data.company || "enquiry").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      const blob = await put(`enquiries/${safe}.${ATTACH_TYPES[f.type]}`, f, {
        access: "private",
        addRandomSuffix: true,
        contentType: f.type,
      });
      attach = { attachPath: blob.pathname, attachName: f.name, attachSize: f.size };
    }

    await prisma.enquiry.create({
      data: {
        source: "contact",
        name: data.name,
        company: data.company,
        email: data.email,
        phone: data.phone,
        cityCountry: data.cityCountry,
        industry: data.industry,
        requirementType: data.requirementType,
        message: data.message,
        application: data.application,
        partMaterial: data.partMaterial,
        partSize: data.partSize,
        consentAt: new Date(),
        sourcePage: (formData.get("sourcePage") as string) || "/contact",
        ...(attach ?? {}),
      },
    });
  } catch {
    return {
      success: false,
      values: raw,
      message:
        "Something went wrong sending your enquiry. Please email sales@mqstechnologies.in and we will pick it up from there.",
    };
  }

  return { success: true, message: "Thanks, our team will contact you shortly." };
}

export async function updateEnquiryStatus(id: string, status: string) {
  const authed = await verifySession();
  if (!authed) throw new Error("Unauthorized");

  await prisma.enquiry.update({
    where: { id },
    data: { status },
  });
}
