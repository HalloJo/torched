"use client";

import Header from "@/components/Header";
import HeroInput from "@/components/HeroInput";
import ResultsPanel from "@/components/ResultsPanel";
import SkeletonResults from "@/components/SkeletonResults";
import ErrorCard from "@/components/ErrorCard";
import { useRoast } from "@/hooks/useRoast";

export default function Home() {
  const { roast, loading, error, fetchRoast, reset } = useRoast();

  return (
    <div className="min-h-screen bg-background text-text">
      <Header />
      <HeroInput onSubmit={fetchRoast} loading={loading} />

      {loading && <SkeletonResults />}

      {error && !loading && (
        <ErrorCard message={error} onRetry={reset} />
      )}

      {roast && !loading && (
        <ResultsPanel roast={roast} onReset={reset} />
      )}
    </div>
  );
}
