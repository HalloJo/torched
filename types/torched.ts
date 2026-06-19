export interface RoastResult {
  overallScore: number;
  verdict: string;
  categories: {
    design: { score: number; roast: string };
    copy: { score: number; roast: string };
    ux: { score: number; roast: string };
    vibe: { score: number; roast: string };
  };
  fullRoast: string;
  issues: { title: string; description: string }[];
  oneGoodThing: string;
  quickWins: string[];
}

export interface RoastRequest {
  url: string;
}

export interface ApiError {
  error: string;
}
