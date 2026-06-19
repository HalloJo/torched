"use client";

import { useState } from "react";

interface UseClipboardReturn {
  copied: boolean;
  copy: (text: string) => Promise<void>;
}

export function useClipboard(): UseClipboardReturn {
  const [copied, setCopied] = useState(false);

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return { copied, copy };
}
