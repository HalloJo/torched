"use client";

import { Palette, MessageSquare, MousePointer, Zap } from "lucide-react";
import type { RoastResult } from "@/types/torched";

interface CategoryScoresProps {
  categories: RoastResult["categories"];
}

type CategoryKey = "design" | "copy" | "ux" | "vibe";

const CATEGORY_META: Record<CategoryKey, { label: string; icon: React.ReactNode }> = {
  design: { label: "Design", icon: <Palette className="w-5 h-5" /> },
  copy: { label: "Copy & Messaging", icon: <MessageSquare className="w-5 h-5" /> },
  ux: { label: "UX & Navigation", icon: <MousePointer className="w-5 h-5" /> },
  vibe: { label: "Overall Vibe", icon: <Zap className="w-5 h-5" /> },
};

function scoreColor(score: number): string {
  if (score > 70) return "bg-success";
  if (score >= 40) return "bg-yellow-400";
  return "bg-danger";
}

export default function CategoryScores({ categories }: CategoryScoresProps) {
  const keys: CategoryKey[] = ["design", "copy", "ux", "vibe"];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {keys.map((key, index) => {
        const { label, icon } = CATEGORY_META[key];
        const { score, roast } = categories[key];

        return (
          <div
            key={key}
            className="animate-[slide-up_0.4s_ease-out_forwards] opacity-0 bg-surface border border-border rounded-xl p-5"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center gap-2 text-yellow-400 mb-3">
              {icon}
              <span className="font-semibold text-white text-sm uppercase tracking-wide">
                {label}
              </span>
            </div>
            <p className="text-3xl font-extrabold text-yellow-400 mb-2">
              {score}
              <span className="text-lg text-zinc-500">/100</span>
            </p>
            <div className="w-full bg-zinc-800 rounded-full h-2 mb-3">
              <div
                className={`h-2 rounded-full ${scoreColor(score)} transition-all`}
                style={{ width: `${score}%` }}
              />
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed">{roast}</p>
          </div>
        );
      })}
    </div>
  );
}
