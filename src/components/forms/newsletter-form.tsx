"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  website: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (values: FormValues) => {
    if (values.website) return;
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: values.email }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
      <div className="flex gap-2">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          placeholder="Work email"
          className="h-12 flex-1 rounded-2xl border border-white/15 bg-white/5 px-4 text-sm text-white placeholder:text-white/40 outline-none ring-cyan/40 focus:ring-2"
          {...register("email")}
        />
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden
          {...register("website")}
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex h-12 items-center justify-center rounded-2xl bg-[#1358FE] px-4 text-white transition hover:bg-[#0F4AE0] disabled:opacity-60"
          aria-label="Subscribe"
        >
          <ArrowRight className="size-4" />
        </button>
      </div>
      {errors.email ? (
        <p className="text-xs text-red-300">{errors.email.message}</p>
      ) : null}
      {status === "success" ? (
        <p className="text-xs text-cyan">Subscribed. Welcome aboard.</p>
      ) : null}
      {status === "error" ? (
        <p className="text-xs text-red-300">Something went wrong. Try again.</p>
      ) : null}
    </form>
  );
}
