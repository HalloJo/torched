"use client";

import { Gauge } from "lucide-react";

interface OverallScoreCardProps {
  score: number;
  verdict: string;
}

export default function OverallScoreCard({ score, verdict }: OverallScoreCardProps) {
  return (
    <div className="animate-[fade-in_0.3s_ease-out_forwards] border border-yellow-400 bg-surface rounded-xl p-8 text-center">
      <Gauge className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
      <p className="text-xs uppercase tracking-widest text-zinc-500 font-semibold mb-2">
        Overall Roast Score
      </p>
      <p className="text-8xl font-extrabold text-yellow-400 leading-none mb-3">
        {score}
        <span className="text-4xl text-zinc-500">/100</span>
      </p>
      <p className="text-zinc-300 italic text-lg">&ldquo;{verdict}&rdquo;</p>
    </div>
  );
}
