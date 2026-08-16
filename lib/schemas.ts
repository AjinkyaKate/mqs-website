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

export type ContactFormState = {
  success: boolean;
  errors?: Record<string, string[]>;
  message?: string;
};

export type ProductFormState = ContactFormState;
