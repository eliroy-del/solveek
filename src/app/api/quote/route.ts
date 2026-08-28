import { NextResponse } from "next/server";
import { z } from "zod";
import { corsHeaders, optionsResponse, rejectBadOrigin } from "@/lib/api-security";
import { sendLeadNotification } from "@/lib/email";
import { rateLimit } from "@/lib/rate-limit";
import {
  sanitize,
  sanitizeEmail,
  sanitizePhone,
} from "@/lib/sanitize";
import { createServerClient } from "@/lib/supabase/server";
import { getFieldErrors, quoteFormSchema } from "@/lib/validation";

export async function OPTIONS(request: Request) {
  return optionsResponse(request.headers.get("origin"));
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const blocked = rejectBadOrigin(origin);
  if (blocked) return blocked;

  const ip = request.headers.get("x-forwarded-for") ?? "anonymous";
  const limited = rateLimit(`quote:${ip}`);
  if (!limited.success) {
    return NextResponse.json(
      { success: false, error: "Too many requests" },
      { status: 429, headers: corsHeaders(origin) }
    );
  }

  try {
    const body = await request.json();
    const parsed = quoteFormSchema.safeParse(body);
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

    const data = {
      name: sanitize(parsed.data.name),
      email: sanitizeEmail(parsed.data.email),
      company: sanitize(parsed.data.company),
      phone: sanitizePhone(parsed.data.phone),
      service: parsed.data.service,
      budget: parsed.data.budget ? sanitize(parsed.data.budget) : null,
      timeline: parsed.data.timeline ? sanitize(parsed.data.timeline) : null,
      notes: sanitize(parsed.data.notes),
    };

    const supabase = createServerClient();
    const { error } = await supabase.from("quote_requests").insert({
      name: data.name,
      email: data.email,
      company: data.company,
      phone: data.phone,
      service: data.service,
      budget: data.budget,
      timeline: data.timeline,
      notes: data.notes,
    });

    if (error) {
      console.error("quote insert", error.message);
      return NextResponse.json(
        { success: false, error: "Server error" },
        { status: 500, headers: corsHeaders(origin) }
      );
    }

    await sendLeadNotification({
      subject: `Quote request: ${data.service}`,
      replyTo: data.email,
      text: [
        `Quote request`,
        "",
        `Name: ${data.name}`,
        `Company: ${data.company}`,
        `Email: ${data.email}`,
        `Phone: ${data.phone}`,
        `Service: ${data.service}`,
        `Budget: ${data.budget || "N/A"}`,
        `Timeline: ${data.timeline || "N/A"}`,
        "",
        data.notes,
      ].join("\n"),
    });

    return NextResponse.json(
      { success: true, ok: true },
      { headers: corsHeaders(origin) }
    );
  } catch (error) {
    console.error("quote api", error);
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
