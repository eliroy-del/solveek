"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import {
  sanitize,
  sanitizeEmail,
  sanitizePhone,
} from "@/lib/sanitize";
import {
  contactFormSchema,
  type ContactFormData,
} from "@/lib/validation";

type FormValues = ContactFormData;

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(contactFormSchema),
    mode: "onBlur",
  });

  const onSubmit = async (values: FormValues) => {
    if (values.website) return;
    try {
      const payload = {
        ...values,
        name: sanitize(values.name),
        email: sanitizeEmail(values.email),
        company: sanitize(values.company),
        phone: values.phone ? sanitizePhone(values.phone) : "",
        subject: sanitize(values.subject),
        message: sanitize(values.message),
      };
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" error={errors.name?.message}>
          <input
            className={inputClass}
            placeholder="Ada Mensah"
            {...register("name")}
          />
        </Field>
        <Field label="Work email" error={errors.email?.message}>
          <input
            type="email"
            className={inputClass}
            placeholder="ada@company.com"
            {...register("email")}
          />
        </Field>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Company" error={errors.company?.message}>
          <input
            className={inputClass}
            placeholder="Company name"
            {...register("company")}
          />
        </Field>
        <Field label="Phone" error={errors.phone?.message}>
          <input
            className={inputClass}
            placeholder="+233 ..."
            {...register("phone")}
          />
        </Field>
      </div>
      <Field label="Subject" error={errors.subject?.message}>
        <input
          className={inputClass}
          placeholder="Website redesign, social management…"
          {...register("subject")}
        />
      </Field>
      <Field label="Message" error={errors.message?.message}>
        <textarea
          rows={5}
          className={`${inputClass} min-h-[140px] resize-y`}
          placeholder="Share goals, timeline, and anything we should know."
          {...register("message")}
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
        className="btn-shine group inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-navy font-semibold text-white shadow-[0_12px_30px_rgba(7,11,20,0.28)] transition hover:-translate-y-0.5 hover:bg-[#0C1428] disabled:opacity-60"
      >
        {isSubmitting ? "Sending..." : "Send message"}
        {!isSubmitting ? (
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        ) : null}
      </button>
      {status === "success" ? (
        <p className="text-sm text-success">
          Message received. Our team will respond shortly.
        </p>
      ) : null}
      {status === "error" ? (
        <p className="text-sm text-destructive">
          Unable to send. Please try again.
        </p>
      ) : null}
    </form>
  );
}

const inputClass =
  "w-full rounded-2xl border border-border bg-surface/60 px-4 py-3 text-sm text-navy outline-none transition placeholder:text-muted-foreground/70 focus:border-royal/40 focus:bg-white focus:ring-2 focus:ring-royal/20";

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
