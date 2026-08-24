"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  company: z.string().min(2, "Business name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(7, "Phone / WhatsApp is required").max(40),
  website: z.string().max(200).optional(),
  industry: z.string().min(2, "Industry is required"),
  improve: z.string().min(10, "Tell us what you want to improve"),
  focusArea: z.enum(["foundation", "automation", "visibility", "unsure"], {
    required_error: "Select an area",
  }),
  budget: z.string().min(1, "Select a budget range"),
  context: z.string().max(4000).optional(),
  honeypot: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

const focusOptions = [
  { value: "foundation", label: "Foundation" },
  { value: "automation", label: "Automation" },
  { value: "visibility", label: "Visibility" },
  { value: "unsure", label: "Not sure, assess it" },
] as const;

const budgetOptions = [
  "Under GH₵8,500",
  "GH₵8,500 to 15,000",
  "GH₵15,000 to 30,000",
  "GH₵30,000+",
  "Not sure yet",
];

const stepFields: (keyof FormValues)[][] = [
  ["name", "company", "email", "phone", "website", "industry"],
  ["improve", "focusArea"],
  ["budget", "context"],
];

export function AuditForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [step, setStep] = useState(0);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { focusArea: undefined },
    mode: "onBlur",
  });

  const focusArea = watch("focusArea");

  const goNext = async () => {
    const ok = await trigger(stepFields[step]);
    if (ok) setStep((s) => Math.min(s + 1, 2));
  };

  const onSubmit = async (values: FormValues) => {
    if (values.honeypot) return;
    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      reset();
      setStep(0);
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
      <div className="flex items-center gap-2" aria-label="Form progress">
        {["About you", "Focus", "Details"].map((label, index) => (
          <button
            key={label}
            type="button"
            onClick={() => index < step && setStep(index)}
            className={cn(
              "flex flex-1 flex-col items-start gap-1 rounded-md px-1 py-1 text-left",
              index <= step ? "cursor-pointer" : "cursor-default"
            )}
            disabled={index > step}
          >
            <span
              className={cn(
                "h-1 w-full rounded-full",
                index <= step ? "bg-royal" : "bg-border"
              )}
            />
            <span
              className={cn(
                "text-[11px] font-medium",
                index === step ? "text-navy" : "text-muted-foreground"
              )}
            >
              {label}
            </span>
          </button>
        ))}
      </div>

      {step === 0 ? (
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Name" error={errors.name?.message}>
              <input className={inputClass} autoComplete="name" {...register("name")} />
            </Field>
            <Field label="Business / Organization" error={errors.company?.message}>
              <input className={inputClass} autoComplete="organization" {...register("company")} />
            </Field>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Email" error={errors.email?.message}>
              <input type="email" inputMode="email" className={inputClass} autoComplete="email" {...register("email")} />
            </Field>
            <Field label="Phone / WhatsApp" error={errors.phone?.message}>
              <input type="tel" inputMode="tel" className={inputClass} autoComplete="tel" {...register("phone")} />
            </Field>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Website" error={errors.website?.message} optional>
              <input type="url" inputMode="url" className={inputClass} placeholder="https://" {...register("website")} />
            </Field>
            <Field label="Industry" error={errors.industry?.message}>
              <input className={inputClass} {...register("industry")} />
            </Field>
          </div>
        </div>
      ) : null}

      {step === 1 ? (
        <div className="space-y-4">
          <Field
            label="What are you looking to improve?"
            error={errors.improve?.message}
          >
            <textarea
              rows={4}
              className={`${inputClass} min-h-[110px] resize-y`}
              {...register("improve")}
            />
          </Field>
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
        </div>
      ) : null}

      {step === 2 ? (
        <div className="space-y-4">
          <Field label="Approximate budget range" error={errors.budget?.message}>
            <select className={inputClass} defaultValue="" {...register("budget")}>
              <option value="" disabled>
                Select a range
              </option>
              {budgetOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Additional context" error={errors.context?.message} optional>
            <textarea
              rows={3}
              className={`${inputClass} min-h-[90px] resize-y`}
              placeholder="Timeline, constraints, or anything else we should know."
              {...register("context")}
            />
          </Field>
        </div>
      ) : null}

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

      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-between">
        {step > 0 ? (
          <button
            type="button"
            onClick={() => setStep((s) => s - 1)}
            className="inline-flex h-11 cursor-pointer items-center justify-center gap-1.5 rounded-lg px-4 text-sm font-semibold text-navy ring-1 ring-border hover:bg-surface"
          >
            <ArrowLeft className="size-3.5" />
            Back
          </button>
        ) : (
          <span />
        )}

        {step < 2 ? (
          <button
            type="button"
            onClick={goNext}
            className="inline-flex h-11 cursor-pointer items-center justify-center gap-1.5 rounded-lg bg-royal px-5 text-sm font-semibold text-white hover:bg-royal-deep"
          >
            Continue
            <ArrowRight className="size-3.5" />
          </button>
        ) : (
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex h-11 cursor-pointer items-center justify-center gap-1.5 rounded-lg bg-royal px-5 text-sm font-semibold text-white hover:bg-royal-deep disabled:opacity-60"
          >
            {isSubmitting ? "Sending…" : "Book your Digital Growth Audit"}
            <ArrowRight className="size-3.5" />
          </button>
        )}
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
