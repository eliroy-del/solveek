"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  sanitize,
  sanitizeEmail,
  sanitizePhone,
} from "@/lib/sanitize";
import {
  AUDIT_INDUSTRIES,
  auditFormSchema,
  type AuditFormData,
} from "@/lib/validation";

type FormValues = AuditFormData;

const focusOptions = [
  { value: "foundation", label: "Foundation" },
  { value: "automation", label: "Automation" },
  { value: "visibility", label: "Visibility" },
  { value: "unsure", label: "Not sure, assess it" },
] as const;

const industryOptions = [...AUDIT_INDUSTRIES];

export function AuditForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(auditFormSchema),
    defaultValues: { focusArea: undefined },
    mode: "onBlur",
  });

  const focusArea = watch("focusArea");

  const onSubmit = async (values: FormValues) => {
    if (values.honeypot) return;
    try {
      const payload = {
        ...values,
        name: sanitize(values.name),
        company: sanitize(values.company),
        email: sanitizeEmail(values.email),
        phone: sanitizePhone(values.phone),
        website: values.website ? sanitize(values.website) : "",
        industry: sanitize(values.industry),
        budget: sanitize(values.budget),
        context: values.context ? sanitize(values.context) : "",
      };
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed");
      const { analytics } = await import("@/lib/analytics");
      analytics.trackAuditRequest();
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-lg border border-royal/20 bg-royal/5 p-6 text-center md:p-8">
        <CheckCircle2 className="mx-auto size-9 text-royal" />
        <h3 className="mt-3 font-heading text-xl text-navy">
          Audit request received
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Thanks. We will review your details and follow up to schedule your
          Digital Growth Audit.
        </p>
        <button
          type="button"
          className="mt-5 cursor-pointer text-sm font-semibold text-royal"
          onClick={() => setStatus("idle")}
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" error={errors.name?.message}>
          <input
            className={inputClass}
            autoComplete="name"
            {...register("name")}
          />
        </Field>
        <Field
          label="Business / Organization"
          error={errors.company?.message}
        >
          <input
            className={inputClass}
            autoComplete="organization"
            {...register("company")}
          />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Email" error={errors.email?.message}>
          <input
            type="email"
            inputMode="email"
            className={inputClass}
            autoComplete="email"
            {...register("email")}
          />
        </Field>
        <Field label="Phone / WhatsApp" error={errors.phone?.message}>
          <input
            type="tel"
            inputMode="tel"
            className={inputClass}
            autoComplete="tel"
            {...register("phone")}
          />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Website" error={errors.website?.message} optional>
          <input
            type="url"
            inputMode="url"
            className={inputClass}
            placeholder="https://"
            {...register("website")}
          />
        </Field>
        <Field label="Industry" error={errors.industry?.message}>
          <select
            className={inputClass}
            defaultValue=""
            {...register("industry")}
          >
            <option value="" disabled>
              Select an industry
            </option>
            {industryOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <fieldset>
        <legend className="mb-3 text-sm font-medium text-navy">
          Which area needs attention?
        </legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {focusOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() =>
                setValue("focusArea", opt.value, { shouldValidate: true })
              }
              className={cn(
                "cursor-pointer rounded-lg border px-3 py-2.5 text-left text-sm font-medium transition-ui",
                focusArea === opt.value
                  ? "border-royal bg-royal/5 text-navy ring-1 ring-royal/30"
                  : "border-border bg-white text-navy/70 hover:border-royal/30"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
        {errors.focusArea ? (
          <p className="mt-2 text-xs text-destructive" role="alert">
            {errors.focusArea.message}
          </p>
        ) : null}
      </fieldset>

      <Field label="Approximate budget" error={errors.budget?.message}>
        <input
          className={inputClass}
          placeholder="e.g. GH₵5,000 or flexible"
          {...register("budget")}
        />
      </Field>

      <Field
        label="Additional context"
        error={errors.context?.message}
        optional
      >
        <textarea
          rows={3}
          className={`${inputClass} min-h-[90px] resize-y`}
          placeholder="Timeline, constraints, or anything else we should know."
          {...register("context")}
        />
      </Field>

      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden
        {...register("honeypot")}
      />

      {status === "error" ? (
        <p className="text-sm text-destructive" role="alert">
          Something went wrong. Please try again or email us directly.
        </p>
      ) : null}

      <div className="flex justify-end pt-1">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex h-11 cursor-pointer items-center justify-center gap-1.5 rounded-lg bg-royal px-5 text-sm font-semibold text-white transition-colors hover:bg-navy disabled:opacity-60"
        >
          {isSubmitting ? "Sending…" : "Let's Talk Growth"}
          <ArrowRight className="size-3.5" />
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  error,
  optional,
  children,
}: {
  label: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-baseline gap-2 text-sm font-medium text-navy">
        {label}
        {optional ? (
          <span className="text-xs font-normal text-muted-foreground">
            optional
          </span>
        ) : null}
      </span>
      {children}
      {error ? (
        <p className="mt-1.5 text-xs text-destructive" role="alert">
          {error}
        </p>
      ) : null}
    </label>
  );
}

const inputClass =
  "w-full rounded-lg border border-border bg-white px-3.5 py-2.5 text-sm text-navy outline-none transition-ui placeholder:text-muted-foreground/60 focus:border-royal focus:ring-2 focus:ring-royal/20";
