import { NextResponse } from "next/server";
import { z } from "zod";
import { rateLimit } from "@/lib/rate-limit";
import { createServerClient } from "@/lib/supabase/server";

const schema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(200),
  company: z.string().min(2).max(120),
  phone: z.string().min(6).max(40),
  service: z.enum([
    "Website Design",
    "Social Media",
    "E-commerce",
    "Branding",
    "SEO & Content",
    "Maintenance & Support",
    "Other",
  ]),
  budget: z.string().max(120).optional(),
  timeline: z.string().max(120).optional(),
  notes: z.string().min(10).max(4000),
  website: z.string().optional(),
});

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") ?? "anonymous";
  const limited = rateLimit(`quote:${ip}`);
  if (!limited.success) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }
    if (parsed.data.website) {
      return NextResponse.json({ ok: true });
    }

    const supabase = createServerClient();
    const { error } = await supabase.from("quote_requests").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      company: parsed.data.company,
      phone: parsed.data.phone,
      service: parsed.data.service,
      budget: parsed.data.budget ?? null,
      timeline: parsed.data.timeline ?? null,
      notes: parsed.data.notes,
    });

    if (error) {
      console.error("quote insert", error.message);
      return NextResponse.json({ error: "Server error" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
