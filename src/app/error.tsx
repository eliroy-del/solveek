"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="container-premium flex min-h-[50vh] flex-col items-center justify-center gap-4 pt-28 text-center">
      <h1 className="font-heading text-2xl text-navy">Something went wrong</h1>
      <p className="max-w-md text-sm text-muted-foreground">
        Please try again. If it keeps happening, email hello@solveek.com.
      </p>
      <button
        type="button"
        onClick={reset}
        className="cursor-pointer rounded-lg bg-royal px-4 py-2 text-sm font-semibold text-white hover:bg-royal-deep"
      >
        Try again
      </button>
    </div>
  );
}
