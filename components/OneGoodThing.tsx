"use client";

import { ThumbsUp } from "lucide-react";

interface OneGoodThingProps {
  oneGoodThing: string;
}

export default function OneGoodThing({ oneGoodThing }: OneGoodThingProps) {
  return (
    <div className="animate-[fade-in_0.3s_ease-out_0.3s_forwards] opacity-0">
      <p className="text-xs uppercase tracking-widest text-success font-semibold mb-3">
        One Thing We Liked
      </p>
      <div className="bg-surface border border-success/40 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <ThumbsUp className="w-6 h-6 text-success" />
          <span className="text-white font-bold text-lg">The Silver Lining</span>
        </div>
        <p className="text-zinc-300 leading-relaxed text-base">{oneGoodThing}</p>
      </div>
    </div>
  );
}
