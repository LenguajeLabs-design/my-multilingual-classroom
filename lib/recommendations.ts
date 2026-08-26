import type { Domain, Plan, Scores } from "./types";
import { levels } from "../data/wida";

export function scoreToBand(score: number) {
  if (score < 1 || score > 6) throw new Error("Score must be between 1.0 and 6.0");
  return levels[Math.min(5, Math.floor(score) - 1)].name;
}
export function isValidScore(score: number) { return Number.isFinite(score) && score >= 1 && score <= 6; }

export function compareDomains(scores: Scores) {
  const sorted = (Object.entries(scores) as [Domain, number][]).sort((a,b) => b[1]-a[1]);
  return { strengths: sorted.slice(0,2).map(([d]) => d), supports: sorted.slice(-2).reverse().map(([d]) => d) };
}

const words = (text: string) => text.toLowerCase();
export function analyzeDemands(plan: Plan) {
  const text = words(`${plan.objective} ${plan.task} ${plan.demands.join(" ")}`);
  const found = new Set<string>();
  if (/because|cause|effect|erosion|changes/.test(text)) found.add("Cause/effect language");
  if (/compare|contrast|similar|different/.test(text)) found.add("Compare/contrast language");
  if (/evidence|text says|support your/.test(text)) found.add("Evidence language");
  if (/explain|paragraph|extended|write/.test(text)) found.add("Extended written output");
  if (/discuss|partner|present|oral/.test(text)) found.add("Oral interaction");
  if (/first|then|finally|sequence/.test(text)) found.add("Sequence language");
  if (plan.subject === "Mathematics") found.add("Language of mathematics");
  if (["Science","Mathematics","Social Studies"].includes(plan.subject)) found.add("Technical vocabulary");
  if (text.length > 350) found.add("Dense text");
  found.add("Academic vocabulary");
  return [...found].slice(0,5);
}

export function recommend(plan: Plan) {
  const demands = analyzeDemands(plan);
  const writing = plan.scores.Writing < 3;
  const reading = plan.scores.Reading < 3;
  const cause = demands.includes("Cause/effect language");
  const before = ["Preview 5–8 essential words with visuals", ...(reading ? ["Conduct a quick picture walk and preview text structure"] : ["Activate relevant background knowledge"]), "Model one example of the response process"];
  const during = [reading ? "Chunk the text and pause for comprehension checks" : "Annotate key information in the text", cause ? "Use a cause → effect graphic organizer" : "Use a simple graphic organizer", writing ? "Allow partner talk and oral rehearsal before writing" : "Use brief partner processing before independent work"];
  const priority = ["Visual word bank", cause ? "Cause → effect organizer" : "Graphic organizer", writing ? "Oral rehearsal before writing" : "Chunking with comprehension checks"];
  return { demands, before: before.slice(0,3), during: during.slice(0,3), priority: priority.slice(0,3) };
}

export function snapshot(scores: Scores) {
  const { strengths, supports } = compareDomains(scores);
  return `This learner’s relative strengths are ${strengths[0]} and ${strengths[1]}. ${supports[1]} and especially ${supports[0]} may benefit from additional language support. The learner may understand more English than they can independently produce in the task.`;
}

export function buildPrompt(plan: Plan) {
  return `I teach Grade ${plan.grade}.\n\nI have a multilingual learner with this WIDA profile:\nListening: ${plan.scores.Listening.toFixed(1)}\nSpeaking: ${plan.scores.Speaking.toFixed(1)}\nReading: ${plan.scores.Reading.toFixed(1)}\nWriting: ${plan.scores.Writing.toFixed(1)}\n\nStudents are learning ${plan.subject}.\n\nThe learning objective is:\n${plan.objective}\n\nStudents need to:\n${plan.demands.join(", ")}\n\nHere is the classroom task:\n${plan.task}\n\nAnalyze the language demands of this specific task in relation to the learner’s WIDA profile. Do not lower the cognitive goal or do the thinking for the student. Recommend the smallest useful set of scaffolds that will allow the learner to participate successfully. Consider vocabulary, visuals, background knowledge, comprehensible input, chunking, modeling, oral rehearsal, partner interaction, home-language resources, graphic organizers, word banks, sentence frames, and response options.\n\nTell me:\n1. What may be linguistically challenging and why\n2. What to do before the task\n3. What support to provide during the task\n4. What language support to provide\n5. What the student should still produce independently\n6. What I should NOT scaffold\n7. One scaffold I can gradually remove as the learner’s English develops\n\nKeep the recommendations practical for a classroom teacher.`;
}
