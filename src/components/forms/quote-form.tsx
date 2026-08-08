"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  company: z.string().min(2, "Company is required"),
  phone: z.string().min(6, "Phone is required"),
  service: z.enum([
    "Website Design",
    "Social Media",
    "E-commerce",
    "SaaS Product",
    "Branding",
    "Other",
  ]),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  notes: z.string().min(10, "Please share a bit more detail"),
  website: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export function QuoteForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { service: "Website Design" },
  });

  const onSubmit = async (values: FormValues) => {
    if (values.website) return;
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      reset({ service: "Website Design" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full name" error={errors.name?.message}>
          <input className={inputClass} {...register("name")} />
        </Field>
        <Field label="Work email" error={errors.email?.message}>
          <input type="email" className={inputClass} {...register("email")} />
        </Field>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Company" error={errors.company?.message}>
          <input className={inputClass} {...register("company")} />
        </Field>
        <Field label="Phone" error={errors.phone?.message}>
          <input className={inputClass} {...register("phone")} />
        </Field>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Primary service" error={errors.service?.message}>
          <select className={inputClass} {...register("service")}>
            {[
              "Website Design",
              "Social Media",
              "E-commerce",
              "SaaS Product",
              "Branding",
              "Other",
            ].map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Budget range" error={errors.budget?.message}>
          <input
            className={inputClass}
            placeholder="e.g. $10k–$25k"
            {...register("budget")}
          />
        </Field>
      </div>
      <Field label="Ideal timeline" error={errors.timeline?.message}>
        <input
          className={inputClass}
          placeholder="e.g. Launch in 8 weeks"
          {...register("timeline")}
        />
      </Field>
      <Field label="Project details" error={errors.notes?.message}>
        <textarea
          rows={4}
          className={inputClass}
          placeholder="Tell us about your goals, audience, and what success looks like."
          {...register("notes")}
        />
      </Field>
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
        className="btn-shine inline-flex h-12 w-full items-center justify-center rounded-2xl gradient-royal font-semibold text-white shadow-[0_12px_30px_rgba(0,87,217,0.3)] transition hover:-translate-y-0.5 disabled:opacity-60"
      >
        {isSubmitting ? "Submitting..." : "Request quote"}
      </button>
      {status === "success" ? (
        <p className="text-sm text-success">
          Quote request received. A SOLVEEK specialist will respond within one business day.
        </p>
      ) : null}
      {status === "error" ? (
        <p className="text-sm text-destructive">Unable to submit. Please try again.</p>
      ) : null}
    </form>
  );
}

const inputClass =
  "w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm outline-none ring-royal/30 transition focus:ring-2";

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-sm font-medium text-navy">{label}</span>
      {children}
      {error ? <span className="block text-xs text-destructive">{error}</span> : null}
    </label>
  );
}
