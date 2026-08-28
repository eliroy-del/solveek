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
import { auditFormSchema, getFieldErrors } from "@/lib/validation";

export async function OPTIONS(request: Request) {
  return optionsResponse(request.headers.get("origin"));
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const blocked = rejectBadOrigin(origin);
  if (blocked) return blocked;

  const ip = request.headers.get("x-forwarded-for") ?? "anonymous";
  const limited = rateLimit(`audit:${ip}`);
  if (!limited.success) {
    return NextResponse.json(
      { success: false, error: "Too many requests" },
      { status: 429, headers: corsHeaders(origin) }
    );
  }

  try {
    const body = await request.json();
    const parsed = auditFormSchema.safeParse(body);
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

    if (parsed.data.honeypot) {
      return NextResponse.json(
        { success: true, ok: true },
        { headers: corsHeaders(origin) }
      );
    }

    const data = {
      name: sanitize(parsed.data.name),
      company: sanitize(parsed.data.company),
      email: sanitizeEmail(parsed.data.email),
      phone: sanitizePhone(parsed.data.phone),
      website: parsed.data.website ? sanitize(parsed.data.website) : "",
      industry: sanitize(parsed.data.industry),
      focusArea: parsed.data.focusArea,
      budget: sanitize(parsed.data.budget),
      context: parsed.data.context ? sanitize(parsed.data.context) : "",
    };

    const focusLabel = {
      foundation: "Foundation",
      automation: "Automation",
      visibility: "Visibility",
      unsure: "Not sure",
    }[data.focusArea];

    const message = [
      `Digital Growth Audit request`,
      ``,
      `Focus area: ${focusLabel}`,
      `Industry: ${data.industry}`,
      `Website: ${data.website || "N/A"}`,
      `Budget: ${data.budget}`,
      data.context ? `\nAdditional context:\n${data.context}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    const supabase = createServerClient();
    const { error } = await supabase.from("contact_submissions").insert({
      name: data.name,
      email: data.email,
      company: data.company,
      phone: data.phone,
      subject: `Digital Growth Audit: ${focusLabel}`,
      message,
    });

    if (error) {
      console.error("audit insert", error.message);
      return NextResponse.json(
        { success: false, error: "Server error" },
        { status: 500, headers: corsHeaders(origin) }
      );
    }

    const subject = `Digital Growth Audit: ${focusLabel}`;
    await sendLeadNotification({
      subject,
      replyTo: data.email,
      text: [
        subject,
        "",
        `Name: ${data.name}`,
        `Company: ${data.company}`,
        `Email: ${data.email}`,
        `Phone: ${data.phone}`,
        `Website: ${data.website || "N/A"}`,
        `Industry: ${data.industry}`,
        `Focus area: ${focusLabel}`,
        `Budget: ${data.budget}`,
        data.context ? `\nAdditional context:\n${data.context}` : "",
      ]
        .filter(Boolean)
        .join("\n"),
    });

    return NextResponse.json(
      { success: true, ok: true },
      { headers: corsHeaders(origin) }
    );
  } catch (error) {
    console.error("audit api", error);
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
