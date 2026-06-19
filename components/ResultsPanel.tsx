"use client";

import { useEffect, useRef } from "react";
import type { RoastResult } from "@/types/torched";
import OverallScoreCard from "./OverallScoreCard";
import CategoryScores from "./CategoryScores";
import FullRoastCard from "./FullRoastCard";
import IssuesList from "./IssuesList";
import OneGoodThing from "./OneGoodThing";
import QuickWins from "./QuickWins";
import ActionRow from "./ActionRow";

interface ResultsPanelProps {
  roast: RoastResult;
  onReset: () => void;
}

export default function ResultsPanel({ roast, onReset }: ResultsPanelProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div ref={ref} className="max-w-5xl mx-auto px-6 pb-16 space-y-6">
      <OverallScoreCard score={roast.overallScore} verdict={roast.verdict} />
      <CategoryScores categories={roast.categories} />
      <FullRoastCard fullRoast={roast.fullRoast} />
      <IssuesList issues={roast.issues} />
      <OneGoodThing oneGoodThing={roast.oneGoodThing} />
      <QuickWins quickWins={roast.quickWins} />
      <ActionRow roast={roast} onReset={onReset} />
    </div>
  );
}
