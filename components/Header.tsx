"use client";

import { Flame } from "lucide-react";

export default function Header() {
  return (
    <header className="border-b border-yellow-400 px-6 py-4">
      <div className="max-w-5xl justify-between mx-auto flex items-center gap-3">
        <div className="flex gap-1">
          <Flame className="text-yellow-400 w-7 h-7" />
          <span className="text-white font-extrabold text-2xl tracking-tight">
            Torched
          </span>
        </div>
        <div className="flex gap-2">
          <span className=" text-yellow-200 text-sm font-medium hidden sm:block">
            Your website, brutally honest feedback.
          </span>
        </div>
      </div>
    </header>
  );
}
