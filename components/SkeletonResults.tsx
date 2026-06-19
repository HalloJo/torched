"use client";

export default function SkeletonResults() {
  return (
    <div className="max-w-5xl mx-auto px-6 pb-16 space-y-6">
      {/* Overall score skeleton */}
      <div className="border border-yellow-400/30 bg-surface rounded-xl p-8 text-center">
        <div className="w-8 h-8 bg-zinc-800 rounded-full mx-auto mb-3 animate-[pulse-soft_2s_ease-in-out_infinite]" />
        <div className="w-32 h-3 bg-zinc-800 rounded mx-auto mb-4 animate-[pulse-soft_2s_ease-in-out_infinite]" />
        <div className="w-40 h-20 bg-yellow-400/20 rounded-lg mx-auto mb-4 animate-[pulse-soft_2s_ease-in-out_infinite]" />
        <div className="w-64 h-4 bg-zinc-800 rounded mx-auto animate-[pulse-soft_2s_ease-in-out_infinite]" />
      </div>

      {/* Category skeletons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="bg-surface border border-border rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-zinc-800 rounded animate-[pulse-soft_2s_ease-in-out_infinite]" />
              <div className="w-28 h-3 bg-zinc-800 rounded animate-[pulse-soft_2s_ease-in-out_infinite]" />
            </div>
            <div className="w-16 h-8 bg-yellow-400/20 rounded animate-[pulse-soft_2s_ease-in-out_infinite]" />
            <div className="w-full h-2 bg-zinc-800 rounded-full animate-[pulse-soft_2s_ease-in-out_infinite]" />
            <div className="w-full h-3 bg-zinc-800 rounded animate-[pulse-soft_2s_ease-in-out_infinite]" />
            <div className="w-3/4 h-3 bg-zinc-800 rounded animate-[pulse-soft_2s_ease-in-out_infinite]" />
          </div>
        ))}
      </div>

      {/* Full roast skeleton */}
      <div className="bg-surface border border-border rounded-xl p-6 space-y-3">
        <div className="flex items-center gap-2 mb-5">
          <div className="w-6 h-6 bg-zinc-800 rounded animate-[pulse-soft_2s_ease-in-out_infinite]" />
          <div className="w-32 h-4 bg-zinc-800 rounded animate-[pulse-soft_2s_ease-in-out_infinite]" />
        </div>
        {[0, 1, 2].map((i) => (
          <div key={i} className="space-y-2">
            <div className="w-full h-3 bg-zinc-800 rounded animate-[pulse-soft_2s_ease-in-out_infinite]" />
            <div className="w-full h-3 bg-zinc-800 rounded animate-[pulse-soft_2s_ease-in-out_infinite]" />
            <div className="w-4/5 h-3 bg-zinc-800 rounded animate-[pulse-soft_2s_ease-in-out_infinite]" />
          </div>
        ))}
      </div>

      {/* Issues skeleton */}
      <div className="bg-surface border border-border rounded-xl p-6 space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 bg-zinc-800 rounded animate-[pulse-soft_2s_ease-in-out_infinite]" />
          <div className="w-36 h-4 bg-zinc-800 rounded animate-[pulse-soft_2s_ease-in-out_infinite]" />
        </div>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-danger/40 mt-1 shrink-0 animate-[pulse-soft_2s_ease-in-out_infinite]" />
            <div className="flex-1 space-y-1.5">
              <div className="w-40 h-3 bg-zinc-800 rounded animate-[pulse-soft_2s_ease-in-out_infinite]" />
              <div className="w-full h-3 bg-zinc-800 rounded animate-[pulse-soft_2s_ease-in-out_infinite]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
