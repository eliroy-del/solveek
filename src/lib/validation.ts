import { z } from "zod";
import { SITE } from "@/constants/site";

/**
 * Ghana (+233) and common local formats used for WhatsApp / mobile.
 * Accepts: 024…, +23324…, 23324…, and reasonable international lengths.
 */
export function validateGHPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, "");
  if (!digits) return false;

  if (digits.startsWith("233")) {
    return digits.length === 12;
  }
  if (digits.startsWith("0")) {
    return digits.length === 10;
  }
  // Local mobile without leading 0 (9 digits)
  if (digits.length === 9) return true;
  // Other international numbers (e.g. diaspora clients)
  return digits.length >= 10 && digits.length <= 15;
}

export const nameField = z
  .string()
  .min(2, "Name must be at least 2 characters")
  .max(100, "Name must be less than 100 characters")
  .regex(/^[^\r\n]*$/, "Name cannot contain line breaks")
  .regex(
    /^[\p{L}\s\-'.]+$/u,
    "Name can only contain letters, spaces, hyphens, apostrophes and dots"
  );

export const emailField = z
  .string()
  .email("Please enter a valid email address")
  .max(254, "Email must be less than 254 characters")
  .regex(/^[^\r\n]*$/, "Email cannot contain line breaks")
  .transform((v) => v.toLowerCase());

export const phoneRequiredField = z
  .string()
  .min(9, "Phone / WhatsApp is required")
  .max(20, "Phone number must be less than 20 characters")
  .regex(/^[^\r\n]*$/, "Phone cannot contain line breaks")
  .refine(
    validateGHPhone,
    "Enter a valid phone (e.g. 024 XXX XXXX or +233 24 XXX XXXX)"
  );

export const phoneOptionalField = z
  .string()
  .max(20, "Phone number must be less than 20 characters")
  .regex(/^[^\r\n]*$/, "Phone cannot contain line breaks")
  .refine(
    (val) => !val || validateGHPhone(val),
    "Enter a valid phone (e.g. 024 XXX XXXX or +233 24 XXX XXXX)"
  )
  .optional()
  .or(z.literal(""));

const honeypotField = z.string().max(200).optional();

export const FOCUS_AREAS = [
  "foundation",
  "automation",
  "visibility",
  "unsure",
] as const;

export const AUDIT_BUDGETS = [
  "Under GH₵4,000",
  "GH₵4,000 to 6,500",
  "GH₵6,500 to 10,000",
] as const;

export const AUDIT_INDUSTRIES = [
  "Retail & E-commerce",
  "Hospitality & Tourism",
  "Professional services",
  "Education & Training",
  "Healthcare & Wellness",
  "Real estate & Construction",
  "Finance & Insurance",
  "Technology & Software",
  "Manufacturing",
  "Media & Creative",
  "Non-profit & NGO",
  "Other",
] as const;

export const QUOTE_SERVICES = [
  "Website Design",
  "Social Media",
  "E-commerce",
  "Branding",
  "SEO & Content",
  "Maintenance & Support",
  "Other",
] as const;

export const auditFormSchema = z.object({
  name: nameField,
  company: z
    .string()
    .min(2, "Business name is required")
    .max(120, "Business name is too long"),
  email: emailField,
  phone: phoneRequiredField,
  website: z.string().max(200).optional().or(z.literal("")),
  industry: z.enum(AUDIT_INDUSTRIES, {
    required_error: "Select an industry",
  }),
  focusArea: z.enum(FOCUS_AREAS, {
    required_error: "Select an area",
  }),
  budget: z.enum(AUDIT_BUDGETS, {
    required_error: "Select a budget range",
  }),
  context: z.string().max(4000).optional().or(z.literal("")),
  honeypot: honeypotField,
});

export type AuditFormData = z.infer<typeof auditFormSchema>;

export const contactFormSchema = z.object({
  name: nameField,
  email: emailField,
  company: z
    .string()
    .min(2, "Company is required")
    .max(120, "Company name is too long"),
  phone: phoneOptionalField,
  subject: z
    .string()
    .min(2, "Subject is required")
    .max(160, "Subject is too long")
    .regex(/^[^\r\n]*$/, "Subject cannot contain line breaks"),
  message: z
    .string()
    .min(10, "Please provide more detail")
    .max(4000, "Message must be less than 4000 characters"),
  website: honeypotField,
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export const newsletterSchema = z.object({
  email: emailField,
  website: honeypotField,
});

export type NewsletterData = z.infer<typeof newsletterSchema>;

export const quoteFormSchema = z.object({
  name: nameField,
  email: emailField,
  company: z
    .string()
    .min(2, "Company is required")
    .max(120, "Company name is too long"),
  phone: phoneRequiredField,
  service: z.enum(QUOTE_SERVICES),
  budget: z.string().max(120).optional().or(z.literal("")),
  timeline: z.string().max(120).optional().or(z.literal("")),
  notes: z
    .string()
    .min(10, "Please share a bit more detail")
    .max(4000, "Notes must be less than 4000 characters"),
  website: honeypotField,
});

export type QuoteFormData = z.infer<typeof quoteFormSchema>;

export function getFirstError(error: z.ZodError): string {
  return error.issues[0]?.message || "Validation failed";
}

export function getFieldErrors(error: z.ZodError): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const issue of error.issues) {
    const path = issue.path.join(".");
    if (path && !errors[path]) errors[path] = issue.message;
  }
  return errors;
}

export function getAllowedOrigins(): string[] {
  const origins = new Set<string>([
    SITE.url,
    "https://www.solveek.com",
    "https://solveek.com",
    "http://localhost:3000",
  ]);

  const publicUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (publicUrl) origins.add(publicUrl);

  if (process.env.VERCEL_URL) {
    origins.add(`https://${process.env.VERCEL_URL}`);
  }

  return [...origins];
}

export function isAllowedOrigin(origin: string | null): boolean {
  if (!origin) return true;
  return getAllowedOrigins().includes(origin);
}
