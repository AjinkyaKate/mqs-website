import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  company: z.string().min(1, "Company is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional().default(""),
  industry: z.string().optional().default(""),
  application: z.string().optional().default(""),
  message: z.string().min(1, "Message is required"),
});

export const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  company: z.string().min(1, "Company is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional().default(""),
  partMaterial: z.string().optional().default(""),
  defectType: z.string().min(1, "Defect type is required"),
  appDetails: z.string().optional().default(""),
});

export const applicationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone is required"),
  location: z.string().optional().default(""),
  department: z.string().min(1, "Department is required"),
  experience: z.string().optional().default(""),
  company: z.string().optional().default(""),
  linkedin: z.string().optional().default(""),
  message: z.string().optional().default(""),
});

export type ApplicationFormState = {
  success: boolean;
  errors?: Record<string, string[]>;
  message?: string;
};

export type ContactFormState = {
  success: boolean;
  errors?: Record<string, string[]>;
  message?: string;
};

export type ProductFormState = ContactFormState;

/* ── /contact enquiry form ──
   From "CONTACT US — Webpage Build Reference". The reference is explicit that
   eight fields are required and not eleven: application, part material and part
   size were moved into an optional group because they are useful to engineering
   but not worth the submissions they cost. So the three of them are optional
   here by design, not by omission. */
export const enquirySchema = z.object({
  name: z.string().min(1, "Please enter your name"),
  company: z.string().min(1, "Please enter your company name"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(1, "Please enter a phone number"),
  cityCountry: z.string().min(1, "Please enter your city and country"),
  industry: z.string().min(1, "Please choose an industry"),
  requirementType: z.string().min(1, "Please choose a requirement type"),
  message: z.string().min(1, "Please tell us what you need to inspect or test"),
  application: z.string().optional().default(""),
  partMaterial: z.string().optional().default(""),
  partSize: z.string().optional().default(""),
});

export type EnquiryFormState = {
  success: boolean;
  errors?: Record<string, string[]>;
  message?: string;
  /* The reference requires entered values to survive a failed validation:
     "nobody refills this form twice". */
  values?: Record<string, string>;
};

