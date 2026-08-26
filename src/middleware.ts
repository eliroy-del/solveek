import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * CSP tuned for Next.js + GA4 / GTM wildcards.
 * @see https://developers.google.com/tag-platform/security/guides/csp
 */
function contentSecurityPolicy() {
  return [
    "default-src 'self'",
    [
      "script-src",
      "'self'",
      "'unsafe-inline'",
      "'unsafe-eval'",
      "https://*.googletagmanager.com",
      "https://va.vercel-scripts.com",
    ].join(" "),
    "style-src 'self' 'unsafe-inline'",
    [
      "img-src",
      "'self'",
      "data:",
      "blob:",
      "https:",
      "https://*.google-analytics.com",
      "https://*.googletagmanager.com",
      "https://images.unsplash.com",
      "https://plus.unsplash.com",
      "https://maps.gstatic.com",
      "https://maps.googleapis.com",
    ].join(" "),
    "font-src 'self' data:",
    [
      "connect-src",
      "'self'",
      "https://*.google-analytics.com",
      "https://*.analytics.google.com",
      "https://*.googletagmanager.com",
      "https://vitals.vercel-insights.com",
    ].join(" "),
    "frame-src https://maps.google.com https://www.google.com",
    "base-uri 'self'",
    "form-action 'self'",
    "upgrade-insecure-requests",
  ].join("; ");
}

export function middleware(_request: NextRequest) {
  const response = NextResponse.next();

  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()"
  );
  response.headers.set("Content-Security-Policy", contentSecurityPolicy());

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|xml|webmanifest)$).*)",
  ],
};
