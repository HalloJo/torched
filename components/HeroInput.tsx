"use client";

import { useState } from "react";
import { Flame, Link, Loader2, AlertCircle } from "lucide-react";

interface HeroInputProps {
  onSubmit: (url: string) => void;
  loading: boolean;
}

function isValidUrl(value: string): boolean {
  try {
    const parsed = new URL(value.trim());
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

export default function HeroInput({ onSubmit, loading }: HeroInputProps) {
  const [url, setUrl] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = url.trim();

    if (!trimmed) {
      setValidationError("Please enter a URL.");
      return;
    }
    if (!isValidUrl(trimmed)) {
      setValidationError("Enter a valid URL starting with http:// or https://");
      return;
    }

    setValidationError(null);
    onSubmit(trimmed);
  };

  return (
    <section className="px-6 py-16 max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-5xl sm:text-7xl font-extrabold text-white leading-none tracking-tight mb-4">
          Get your site torched.
        </h1>
        <p className="text-zinc-400 text-lg max-w-xl mx-auto leading-relaxed">
          Paste a URL. We fetch it, read it, and roast it. No mercy. No fluff.
          Just what&apos;s actually wrong.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto"
      >
        <div className="relative flex-1">
          <Link className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 w-5 h-5 pointer-events-none" />
          <input
            type="text"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              if (validationError) setValidationError(null);
            }}
            placeholder="https://yourwebsite.com"
            disabled={loading}
            className="w-full bg-surface border border-yellow-400 rounded-lg pl-12 pr-4 py-4 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-0 disabled:opacity-50 text-base"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center gap-2 bg-yellow-400 hover:bg-accent-hover text-black font-bold rounded-lg px-8 py-4 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap text-base"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Fetching &amp; roasting...
            </>
          ) : (
            <>
              <Flame className="w-5 h-5" />
              Torch It
            </>
          )}
        </button>
      </form>

      {validationError && (
        <div className="flex items-center gap-2 mt-3 max-w-2xl mx-auto text-danger text-sm">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{validationError}</span>
        </div>
      )}

      <p className="text-center text-zinc-400 text-sm mt-4">
        Works on any public website. No login needed.
      </p>

      <div className="mt-8 text-center">
        <span className="inline-block bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-sm px-4 py-2 rounded-full">
          🔥 AI-generated feedback. Brutally honest, constructively useful.
        </span>
      </div>
    </section>
  );
}
