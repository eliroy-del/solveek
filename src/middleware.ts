import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { updateCrmSession } from "@/lib/supabase/crm-middleware";

/**
 * CSP tuned for Next.js + GA4 / GTM + Supabase Auth.
 * @see https://developers.google.com/tag-platform/security/guides/csp
 */
function contentSecurityPolicy() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  let supabaseHost = "";
  try {
    supabaseHost = supabaseUrl ? new URL(supabaseUrl).origin : "";
  } catch {
    supabaseHost = "";
  }

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
      supabaseHost,
      "https://*.supabase.co",
      "wss://*.supabase.co",
    ]
      .filter(Boolean)
      .join(" "),
    "frame-src https://maps.google.com https://www.google.com",
    "base-uri 'self'",
    "form-action 'self'",
    "upgrade-insecure-requests",
  ].join("; ");
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isCrm = pathname.startsWith("/crm");
  const isCrmLogin = pathname === "/crm/login";

  const { response, user } = await updateCrmSession(request);

  if (isCrm && !isCrmLogin && !user) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/crm/login";
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isCrmLogin && user) {
    const appUrl = request.nextUrl.clone();
    appUrl.pathname = "/crm";
    appUrl.search = "";
    return NextResponse.redirect(appUrl);
  }

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
