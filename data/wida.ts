import type { Domain } from "../lib/types";

export const domains: { name: Domain; icon: string; color: string }[] = [
  { name: "Listening", icon: "◖", color: "teal" },
  { name: "Speaking", icon: "●", color: "purple" },
  { name: "Reading", icon: "▮", color: "green" },
  { name: "Writing", icon: "✎", color: "orange" }
];

export const levels = [
  { level: 1, name: "Entering", ready: "notice familiar words, visuals, and gestures", benefit: "modeled language and visual context" },
  { level: 2, name: "Emerging", ready: "use phrases and patterned language", benefit: "word banks, rehearsal, and short chunks" },
  { level: 3, name: "Developing", ready: "connect ideas in simple sentences", benefit: "language models and structured interaction" },
  { level: 4, name: "Expanding", ready: "use connected language for familiar purposes", benefit: "support with nuanced academic language" },
  { level: 5, name: "Bridging", ready: "use detailed language across contexts", benefit: "precision, genre, and audience feedback" },
  { level: 6, name: "Reaching", ready: "use specialized language flexibly", benefit: "the same purposeful supports offered to peers" }
];

export const subjects = ["Reading", "Writing", "Mathematics", "Science", "Social Studies", "PYP / Unit of Inquiry", "Art", "Music", "PE", "Other"];
export const taskDemands = ["Listen to instruction", "Follow oral directions", "Read a text", "Interpret images / diagrams", "Discuss with classmates", "Answer questions", "Explain their thinking", "Write words or phrases", "Write sentences", "Write a paragraph / extended response", "Use evidence", "Present orally", "Complete a project"];
