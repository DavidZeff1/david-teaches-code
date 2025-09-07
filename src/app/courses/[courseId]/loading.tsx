export default function Loading() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      {/* Sidebar skeleton */}
      <aside className="w-72 bg-slate-100 dark:bg-slate-800 animate-pulse" />

      {/* Main skeleton */}
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="aspect-video rounded-xl bg-slate-200 dark:bg-slate-700 animate-pulse" />
          <div className="h-8 w-1/2 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
          <div className="space-y-3">
            <div className="h-4 w-full bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
            <div className="h-4 w-5/6 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
            <div className="h-4 w-4/6 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
          </div>
        </div>
      </main>
    </div>
  );
}
