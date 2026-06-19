"use client";

import { Flame } from "lucide-react";

interface FullRoastCardProps {
  fullRoast: string;
}

export default function FullRoastCard({ fullRoast }: FullRoastCardProps) {
  const paragraphs = fullRoast.split(/\n+/).filter(Boolean);

  return (
    <div className="animate-[slide-up_0.4s_ease-out_0.2s_forwards] opacity-0">
      <p className="text-xs uppercase tracking-widest text-yellow-400 font-semibold mb-3">
        The Roast
      </p>
      <div className="bg-surface border border-border rounded-xl p-6">
        <div className="flex items-center gap-2 mb-5">
          <Flame className="w-6 h-6 text-yellow-400" />
          <span className="text-white font-bold text-lg">Full Breakdown</span>
        </div>
        <div className="space-y-4">
          {paragraphs.map((para, i) => (
            <p key={i} className="text-zinc-300 leading-relaxed text-base">
              {para}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
