import { timingSafeEqual } from "node:crypto";

/**
 * Shared secret for future internal service-to-service routes.
 * Fails CLOSED if INTERNAL_API_SECRET is unset or mismatched.
 */
export function verifyInternalSecret(request: Request): boolean {
  const expected = process.env.INTERNAL_API_SECRET;
  const provided = request.headers.get("x-internal-secret");

  if (!expected) return false;
  if (typeof provided !== "string" || provided.length !== expected.length) {
    return false;
  }

  try {
    return timingSafeEqual(
      Buffer.from(provided, "utf8"),
      Buffer.from(expected, "utf8")
    );
  } catch {
    return false;
  }
}
