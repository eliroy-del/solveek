import { NextResponse } from "next/server";
import { isAllowedOrigin } from "@/lib/validation";

export function corsHeaders(origin: string | null): HeadersInit {
  if (!origin || !isAllowedOrigin(origin)) return {};
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    Vary: "Origin",
  };
}

export function rejectBadOrigin(origin: string | null) {
  if (origin && !isAllowedOrigin(origin)) {
    return NextResponse.json(
      { success: false, error: "Origin not allowed" },
      { status: 403 }
    );
  }
  return null;
}

export function optionsResponse(origin: string | null) {
  return new NextResponse(null, {
    status: 204,
    headers: {
      ...corsHeaders(origin),
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Max-Age": "86400",
    },
  });
}
