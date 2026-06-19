"use client";

import { Zap } from "lucide-react";

interface QuickWinsProps {
  quickWins: string[];
}

export default function QuickWins({ quickWins }: QuickWinsProps) {
  return (
    <div>
      <p className="text-xs uppercase tracking-widest text-yellow-400 font-semibold mb-3">
        Quick Wins
      </p>
      <div className="bg-surface border border-border rounded-xl p-6">
        <div className="flex items-center gap-2 mb-5">
          <Zap className="w-6 h-6 text-yellow-400" />
          <span className="text-white font-bold text-lg">Fix These First</span>
        </div>
        <div className="space-y-3">
          {quickWins.map((win, index) => (
            <div
              key={index}
              className="animate-[slide-up_0.4s_ease-out_forwards] opacity-0 flex items-start gap-4"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="shrink-0 w-7 h-7 rounded-full bg-yellow-400 text-black flex items-center justify-center text-xs font-extrabold">
                {index + 1}
              </div>
              <p className="text-zinc-300 text-sm leading-relaxed pt-0.5">{win}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
