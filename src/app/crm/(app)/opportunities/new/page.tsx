import { createOpportunity } from "@/app/crm/(app)/opportunities/actions";

export const metadata = { title: "Add opportunity" };

export default async function NewOpportunityPage({
  searchParams,
}: {
  searchParams: Promise<{ leadId?: string; error?: string }>;
}) {
  const params = await searchParams;

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <div>
        <h1 className="font-heading text-2xl text-navy">Add opportunity</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Turn a qualified lead into a commercial opportunity.
        </p>
      </div>
      {params.error ? (
        <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          Could not save this opportunity. Check the details and try again.
        </p>
      ) : null}
      <form
        action={createOpportunity}
        className="space-y-4 rounded-xl border border-border bg-white p-5"
      >
        {params.leadId ? (
          <input type="hidden" name="leadId" value={params.leadId} />
        ) : null}
        <label className="block text-sm">
          <span className="mb-1.5 block font-medium">Opportunity name *</span>
          <input
            name="name"
            required
            placeholder="ABC Ltd website redesign"
            className="h-10 w-full rounded-lg border border-border px-3"
          />
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm">
            <span className="mb-1.5 block font-medium">Estimated value (GHS)</span>
            <input
              name="estimatedValue"
              type="number"
              min="0"
              step="100"
              defaultValue={0}
              className="h-10 w-full rounded-lg border border-border px-3"
            />
          </label>
          <label className="block text-sm">
            <span className="mb-1.5 block font-medium">Probability (%)</span>
            <input
              name="probability"
              type="number"
              min="0"
              max="100"
              defaultValue={20}
              className="h-10 w-full rounded-lg border border-border px-3"
            />
          </label>
        </div>
        <label className="block text-sm">
          <span className="mb-1.5 block font-medium">Next action</span>
          <input
            name="nextAction"
            placeholder="Schedule discovery call"
            className="h-10 w-full rounded-lg border border-border px-3"
          />
        </label>
        <button
          type="submit"
          className="inline-flex h-11 items-center rounded-lg bg-royal px-5 text-sm font-semibold text-white transition-colors hover:bg-navy"
        >
          Create opportunity
        </button>
      </form>
    </div>
  );
}
