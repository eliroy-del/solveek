import { NextResponse } from "next/server";
import { z } from "zod";
import { corsHeaders, optionsResponse, rejectBadOrigin } from "@/lib/api-security";
import { rateLimit } from "@/lib/rate-limit";
import { sanitizeEmail } from "@/lib/sanitize";
import { createServerClient } from "@/lib/supabase/server";
import { getFieldErrors, newsletterSchema } from "@/lib/validation";

export async function OPTIONS(request: Request) {
  return optionsResponse(request.headers.get("origin"));
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const blocked = rejectBadOrigin(origin);
  if (blocked) return blocked;

  const ip = request.headers.get("x-forwarded-for") ?? "anonymous";
  const limited = rateLimit(`newsletter:${ip}`, 12);
  if (!limited.success) {
    return NextResponse.json(
      { success: false, error: "Too many requests" },
      { status: 429, headers: corsHeaders(origin) }
    );
  }

  try {
    const body = await request.json();
    const parsed = newsletterSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          errors: getFieldErrors(parsed.error),
        },
        { status: 400, headers: corsHeaders(origin) }
      );
    }

    if (parsed.data.website) {
      return NextResponse.json(
        { success: true, ok: true },
        { headers: corsHeaders(origin) }
      );
    }

    const email = sanitizeEmail(parsed.data.email);
    const supabase = createServerClient();
    const { error } = await supabase.from("newsletter_subscribers").upsert(
      { email },
      { onConflict: "email" }
    );

    if (error) {
      console.error("newsletter insert", error.message);
      return NextResponse.json(
        { success: false, error: "Server error" },
        { status: 500, headers: corsHeaders(origin) }
      );
    }

    return NextResponse.json(
      { success: true, ok: true },
      { headers: corsHeaders(origin) }
    );
  } catch (error) {
    console.error("newsletter api", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          errors: getFieldErrors(error),
        },
        { status: 400, headers: corsHeaders(origin) }
      );
    }
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500, headers: corsHeaders(origin) }
    );
  }
}
