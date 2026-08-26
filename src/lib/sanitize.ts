import xss, { type IFilterXSSOptions } from "xss";

const xssOptions: IFilterXSSOptions = {
  whiteList: {},
  stripIgnoreTag: true,
  stripIgnoreTagBody: ["script", "style"],
};

export function sanitize(input: string): string {
  if (!input || typeof input !== "string") return "";
  return xss(input.trim(), xssOptions);
}

export function sanitizeObject<T extends Record<string, unknown>>(obj: T): T {
  const sanitized: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "string") {
      sanitized[key] = sanitize(value);
    } else if (Array.isArray(value)) {
      sanitized[key] = value.map((item) =>
        typeof item === "string" ? sanitize(item) : item
      );
    } else if (value !== null && typeof value === "object") {
      sanitized[key] = sanitizeObject(value as Record<string, unknown>);
    } else {
      sanitized[key] = value;
    }
  }

  return sanitized as T;
}

export function sanitizeEmail(email: string): string {
  if (!email || typeof email !== "string") return "";
  return email.trim().toLowerCase().replace(/[\r\n]/g, "");
}

/** Keep digits and common phone punctuation only. */
export function sanitizePhone(phone: string): string {
  if (!phone || typeof phone !== "string") return "";
  return phone.replace(/[^\d\s+\-()]/g, "").replace(/[\r\n]/g, "").trim();
}

/**
 * Strip CR/LF so values can never be used for email header injection
 * if a future mailer interpolates them into From/Subject/Reply-To.
 */
export function sanitizeHeaderValue(value: string): string {
  if (!value || typeof value !== "string") return "";
  return value.replace(/[\r\n]/g, "").trim();
}
