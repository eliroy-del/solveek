import { NextResponse } from "next/server";
import { z } from "zod";
import { rateLimit } from "@/lib/rate-limit";
import { createServerClient } from "@/lib/supabase/server";

const schema = z.object({
  name: z.string().min(2).max(100),
  company: z.string().min(2).max(120),
  email: z.string().email().max(200),
  phone: z.string().min(7).max(40),
  website: z.string().max(200).optional(),
  industry: z.string().min(2).max(120),
  improve: z.string().min(10).max(4000),
  focusArea: z.enum(["foundation", "automation", "visibility", "unsure"]),
  budget: z.string().min(1).max(80),
  context: z.string().max(4000).optional(),
  honeypot: z.string().optional(),
});

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") ?? "anonymous";
  const limited = rateLimit(`audit:${ip}`);
  if (!limited.success) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }
    if (parsed.data.honeypot) {
      return NextResponse.json({ ok: true });
    }

    const focusLabel = {
      foundation: "Foundation",
      automation: "Automation",
      visibility: "Visibility",
      unsure: "Not sure",
    }[parsed.data.focusArea];

    const message = [
      `Digital Growth Audit request`,
      ``,
      `Focus area: ${focusLabel}`,
      `Industry: ${parsed.data.industry}`,
      `Website: ${parsed.data.website || "—"}`,
      `Budget: ${parsed.data.budget}`,
      ``,
      `Looking to improve:`,
      parsed.data.improve,
      parsed.data.context ? `\nAdditional context:\n${parsed.data.context}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    const supabase = createServerClient();
    const { error } = await supabase.from("contact_submissions").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      company: parsed.data.company,
      phone: parsed.data.phone,
      subject: `Digital Growth Audit — ${focusLabel}`,
      message,
    });

    if (error) {
      console.error("audit insert", error.message);
      return NextResponse.json({ error: "Server error" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
