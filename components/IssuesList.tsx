"use client";

import { AlertTriangle } from "lucide-react";

interface Issue {
  title: string;
  description: string;
}

interface IssuesListProps {
  issues: Issue[];
}

export default function IssuesList({ issues }: IssuesListProps) {
  return (
    <div>
      <p className="text-xs uppercase tracking-widest text-yellow-400 font-semibold mb-3">
        What&apos;s Broken
      </p>
      <div className="bg-surface border border-border rounded-xl p-6">
        <div className="flex items-center gap-2 mb-5">
          <AlertTriangle className="w-6 h-6 text-yellow-400" />
          <span className="text-white font-bold text-lg">Critical Issues</span>
        </div>
        <div className="space-y-4">
          {issues.map((issue, index) => (
            <div
              key={index}
              className="animate-[slide-in-left_0.3s_ease-out_forwards] opacity-0 flex gap-3"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mt-1 w-2.5 h-2.5 rounded-full bg-danger shrink-0" />
              <div>
                <p className="text-white font-semibold text-sm mb-1">{issue.title}</p>
                <p className="text-zinc-400 text-sm leading-relaxed">{issue.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
