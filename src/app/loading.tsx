export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center pt-28">
      <div className="flex flex-col items-center gap-4">
        <div className="size-12 animate-spin rounded-full border-2 border-royal/20 border-t-royal" />
        <p className="text-sm font-medium text-muted-foreground">Loading SOLVEEK…</p>
      </div>
    </div>
  );
}
