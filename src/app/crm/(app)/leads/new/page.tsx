import { createLead } from "@/app/crm/(app)/leads/actions";

export const metadata = { title: "Add lead" };

export default async function NewLeadPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <div>
        <h1 className="font-heading text-2xl text-navy">Add lead</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Capture the essentials now. Add detail later.
        </p>
      </div>

      {params.error ? (
        <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          Could not save this lead. Check required fields and try again.
        </p>
      ) : null}

      <form
        action={createLead}
        className="space-y-4 rounded-xl border border-border bg-white p-5"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm">
            <span className="mb-1.5 block font-medium">First name *</span>
            <input
              name="firstName"
              required
              className="h-10 w-full rounded-lg border border-border px-3"
            />
          </label>
          <label className="block text-sm">
            <span className="mb-1.5 block font-medium">Last name</span>
            <input
              name="lastName"
              className="h-10 w-full rounded-lg border border-border px-3"
            />
          </label>
        </div>
        <label className="block text-sm">
          <span className="mb-1.5 block font-medium">Email *</span>
          <input
            type="email"
            name="email"
            required
            className="h-10 w-full rounded-lg border border-border px-3"
          />
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm">
            <span className="mb-1.5 block font-medium">Phone</span>
            <input
              name="phone"
              className="h-10 w-full rounded-lg border border-border px-3"
            />
          </label>
          <label className="block text-sm">
            <span className="mb-1.5 block font-medium">Company</span>
            <input
              name="companyName"
              className="h-10 w-full rounded-lg border border-border px-3"
            />
          </label>
        </div>
        <label className="block text-sm">
          <span className="mb-1.5 block font-medium">Website</span>
          <input
            name="website"
            className="h-10 w-full rounded-lg border border-border px-3"
          />
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm">
            <span className="mb-1.5 block font-medium">Industry</span>
            <input
              name="industry"
              className="h-10 w-full rounded-lg border border-border px-3"
            />
          </label>
          <label className="block text-sm">
            <span className="mb-1.5 block font-medium">Budget</span>
            <input
              name="budget"
              className="h-10 w-full rounded-lg border border-border px-3"
            />
          </label>
        </div>
        <label className="block text-sm">
          <span className="mb-1.5 block font-medium">Primary need</span>
          <textarea
            name="primaryNeed"
            rows={3}
            className="w-full rounded-lg border border-border px-3 py-2"
          />
        </label>
        <button
          type="submit"
          className="inline-flex h-11 items-center rounded-lg bg-royal px-5 text-sm font-semibold text-white transition-colors hover:bg-navy"
        >
          Create lead
        </button>
      </form>
    </div>
  );
}
