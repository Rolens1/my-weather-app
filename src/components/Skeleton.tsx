export function CardSkeleton() {
  return (
    <div className="card animate-pulse">
      <div className="h-5 w-40 rounded bg-zinc-200/70" />
      <div className="mt-3 flex items-end gap-3">
        <div className="h-12 w-20 rounded bg-zinc-200/70" />
        <div className="space-y-2">
          <div className="h-4 w-28 rounded bg-zinc-200/70" />
          <div className="h-3 w-24 rounded bg-zinc-200/70" />
        </div>
      </div>
    </div>
  );
}

export function ForecastSkeleton() {
  return (
    <div className="card animate-pulse">
      <div className="h-5 w-36 rounded bg-zinc-200/70" />
      <div className="mt-3 grid grid-cols-5 gap-2 sm:gap-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="rounded-xl border p-3 text-center space-y-2">
            <div className="mx-auto h-3 w-12 rounded bg-zinc-200/70" />
            <div className="mx-auto h-6 w-10 rounded bg-zinc-200/70" />
            <div className="mx-auto h-3 w-14 rounded bg-zinc-200/70" />
          </div>
        ))}
      </div>
    </div>
  );
}
