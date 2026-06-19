"use client";

import { useState } from "react";
import type { RoastResult, ApiError } from "@/types/torched";

interface UseRoastReturn {
  roast: RoastResult | null;
  loading: boolean;
  error: string | null;
  fetchRoast: (url: string) => Promise<void>;
  reset: () => void;
}

export function useRoast(): UseRoastReturn {
  const [roast, setRoast] = useState<RoastResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRoast = async (url: string) => {
    setLoading(true);
    setError(null);
    setRoast(null);

    try {
      const response = await fetch("/api/roast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data: RoastResult | ApiError = await response.json();

      if (!response.ok || "error" in data) {
        setError((data as ApiError).error ?? "Something went wrong.");
        return;
      }

      setRoast(data as RoastResult);
    } catch {
      setError("Network error. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setRoast(null);
    setError(null);
    setLoading(false);
  };

  return { roast, loading, error, fetchRoast, reset };
}
