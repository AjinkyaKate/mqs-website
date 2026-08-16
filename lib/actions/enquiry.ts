"use server";

import { prisma } from "@/lib/db";
import { contactSchema, productSchema } from "@/lib/schemas";
import type { ContactFormState } from "@/lib/schemas";
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

export async function updateEnquiryStatus(id: string, status: string) {
  const authed = await verifySession();
  if (!authed) throw new Error("Unauthorized");

  await prisma.enquiry.update({
    where: { id },
    data: { status },
  });
}
