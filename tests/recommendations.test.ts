import { describe, expect, it } from "vitest";
import { analyzeDemands, buildPrompt, compareDomains, extractVocabulary, getTaskFunction, isValidScore, languageFrames, recommend, scoreToBand } from "../lib/recommendations";
import type { Plan } from "../lib/types";

const plan: Plan = { grade:"4", scores:{Listening:4.2,Speaking:2.3,Reading:2.8,Writing:1.9}, subject:"Science", objective:"Explain how erosion changes Earth’s surface using evidence from a text.", demands:["Read a text","Write a paragraph / extended response","Use evidence"], task:"Read about erosion and explain its effects with evidence." };
describe("WIDA interpretation",()=>{
  it("maps scores to broad bands",()=>{expect(scoreToBand(1)).toBe("Entering");expect(scoreToBand(2.8)).toBe("Emerging");expect(scoreToBand(6)).toBe("Reaching")});
  it("validates the score range",()=>{expect(isValidScore(1)).toBe(true);expect(isValidScore(6)).toBe(true);expect(isValidScore(.9)).toBe(false);expect(isValidScore(6.1)).toBe(false)});
  it("finds relative domains",()=>{expect(compareDomains(plan.scores).strengths).toEqual(["Listening","Reading"]);expect(compareDomains(plan.scores).supports[0]).toBe("Writing")});
});
describe("recommendations",()=>{
  it("detects task language demands",()=>{expect(analyzeDemands(plan)).toContain("Cause/effect language");expect(analyzeDemands(plan)).toContain("Evidence language")});
  it("returns a small prioritized set",()=>{expect(recommend(plan).priority).toHaveLength(3);expect(recommend(plan).priority).toContain("Oral rehearsal before writing")});
  it("draws vocabulary from the described task",()=>{expect(extractVocabulary(plan)).toContain("erosion");expect(recommend(plan).priority[0]).toContain("erosion")});
  it("matches language frames to the task function",()=>{expect(getTaskFunction(plan)).toBe("cause");expect(languageFrames(plan)[0]).toContain("causes")});
  it("changes recommendations for a comparison task",()=>{const comparison={...plan,subject:"Social Studies",objective:"Compare two community perspectives",task:"Describe how the perspectives are similar and different."};expect(getTaskFunction(comparison)).toBe("compare");expect(recommend(comparison).during.join(" ")).toContain("comparison organizer");expect(languageFrames(comparison)[0]).toContain("similar")});
  it("keeps independence connected to the objective",()=>{expect(recommend(plan).independence).toContain(plan.objective)});
  it("builds a complete prompt with teacher input",()=>{const prompt=buildPrompt(plan);expect(prompt).toContain(plan.objective);expect(prompt).toContain(plan.task);expect(prompt).toContain("Grade 4")});
});
