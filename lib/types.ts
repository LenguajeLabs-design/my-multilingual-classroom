export type Domain = "Listening" | "Speaking" | "Reading" | "Writing";
export type Scores = Record<Domain, number>;
export type Plan = {
  grade: string;
  scores: Scores;
  subject: string;
  objective: string;
  demands: string[];
  task: string;
};
