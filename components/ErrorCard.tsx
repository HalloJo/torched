"use client";

import { XCircle, Flame, Clock } from "lucide-react";

interface ErrorCardProps {
  message: string;
  onRetry: () => void;
}

function isRateLimit(msg: string) {
  return msg.toLowerCase().includes("wait") || msg.toLowerCase().includes("rate");
}

export default function ErrorCard({ message, onRetry }: ErrorCardProps) {
  const rateLimited = isRateLimit(message);

  return (
    <div className="max-w-5xl mx-auto px-6 pb-16">
      <div className="bg-surface border border-danger/50 rounded-xl p-8 text-center">
        <div className="flex justify-center mb-4">
          {rateLimited ? (
            <Clock className="w-10 h-10 text-warning" />
          ) : (
            <XCircle className="w-10 h-10 text-danger" />
          )}
        </div>
        <p className="text-white font-bold text-lg mb-2">
          {rateLimited ? "Easy there! 🔥" : "Roast Failed"}
        </p>
        <p className="text-zinc-400 mb-6 max-w-sm mx-auto">{message}</p>
        <button
          onClick={onRetry}
          className="flex items-center justify-center gap-2 bg-yellow-400 hover:bg-accent-hover text-black font-bold rounded-lg px-6 py-3 transition-colors mx-auto text-sm"
        >
          <Flame className="w-4 h-4" />
          Try Again
        </button>
      </div>
    </div>
  );
}
