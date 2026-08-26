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
const stopWords = new Set("about after also answer because before being classroom complete describe directions does earth explain from have into learner learning most need passage question read response should student students support task text their them then they this using what when where which will with write writing your".split(" "));
const subjectTerms: Record<string, string[]> = {
  Mathematics: ["equation", "fraction", "pattern", "quantity", "solution", "strategy"],
  Science: ["observe", "process", "system", "change", "evidence"],
  "Social Studies": ["community", "perspective", "source", "change", "evidence"],
  Reading: ["character", "setting", "theme", "detail", "evidence"],
  Writing: ["claim", "reason", "detail", "organization", "evidence"]
};

export function extractVocabulary(plan: Plan) {
  const candidates = (`${plan.objective} ${plan.task}`.toLowerCase().match(/[a-z][a-z’'-]{3,}/g) ?? [])
    .map(word => word.replace(/[’']s$/, "").replace(/^changes$/, "change"))
    .filter(word => !stopWords.has(word) && !/^student/.test(word));
  const counts = new Map<string, number>();
  candidates.forEach(word => counts.set(word, (counts.get(word) ?? 0) + 1));
  const ranked = [...counts].sort((a,b) => b[1]-a[1] || candidates.indexOf(a[0])-candidates.indexOf(b[0])).map(([word]) => word);
  return [...new Set([...ranked, ...(subjectTerms[plan.subject] ?? ["describe", "explain", "detail", "example", "reason"])])].slice(0,8);
}

export function getTaskFunction(plan: Plan) {
  const text = words(`${plan.objective} ${plan.task} ${plan.demands.join(" ")}`);
  if (/compare|contrast|similar|different/.test(text)) return "compare";
  if (/argue|opinion|claim|persuad|justify/.test(text)) return "argue";
  if (/sequence|first|next|then|finally|recount|retell/.test(text)) return "sequence";
  if (/cause|effect|because|changes|erosion/.test(text)) return "cause";
  if (/evidence|support your|text says|source/.test(text)) return "evidence";
  if (/solve|equation|calculate|strategy|mathemat/.test(text)) return "math";
  return "explain";
}

export function languageFrames(plan: Plan) {
  const frames = {
    compare: ["___ and ___ are similar because ___.", "One important difference is ___.", "Both ___, while only ___ ___."],
    argue: ["I claim ___ because ___.", "One reason is ___.", "The evidence ___ supports my claim because ___."],
    sequence: ["First ___, then ___, and finally ___.", "Before ___, ___.", "This event led to ___."],
    cause: ["___ causes ___ because ___.", "One effect of ___ is ___.", "The text evidence ___ shows that ___."],
    evidence: ["The text states ___.", "This evidence shows ___.", "I chose this evidence because ___."],
    math: ["I solved ___ by ___.", "My strategy works because ___.", "First I ___; then I ___."],
    explain: ["The main idea is ___.", "For example, ___.", "This matters because ___."]
  };
  return frames[getTaskFunction(plan)];
}

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
  const demands = analyzeDemands(plan), vocabulary = extractVocabulary(plan), taskFunction = getTaskFunction(plan);
  const writing = plan.scores.Writing < 3, reading = plan.scores.Reading < 3;
  const oral = plan.demands.some(d => /Discuss|Present|Listen/.test(d));
  const organizer: Record<string,string> = {compare:"comparison organizer",argue:"claim → evidence organizer",sequence:"sequence timeline",cause:"cause → effect organizer",evidence:"evidence → explanation organizer",math:"worked-example organizer",explain:"main idea → details organizer"};
  const responseLabel: Record<string,string> = {compare:"comparison",argue:"claim-and-evidence response",sequence:"sequenced explanation",cause:"cause/effect explanation",evidence:"text-evidence explanation",math:"mathematical explanation",explain:"explanation"};
  const before = [`Preview the task-specific words: ${vocabulary.slice(0,5).join(", ")}`, reading ? "Preview this task’s text structure and chunk the pasted directions" : `Activate background knowledge connected to “${plan.objective}”`, `Model how to begin a ${responseLabel[taskFunction]} without completing the thinking`];
  const during = [reading ? "Chunk the pasted text and pause for a one-sentence gist check" : "Highlight the key action and success criteria in the directions", `Use a ${organizer[taskFunction]} tied to this objective`, writing ? "Rehearse the response orally with a partner before writing" : oral ? "Provide structured partner processing before independent sharing" : "Use a brief check-in before independent work"];
  const priority = [`Visual word bank: ${vocabulary.slice(0,4).join(", ")}`, organizer[taskFunction][0].toUpperCase()+organizer[taskFunction].slice(1), writing ? "Oral rehearsal before writing" : reading ? "Chunked text with gist checks" : "Brief partner processing"];
  const actions = plan.demands.filter(d => /Explain|Write|Use evidence|Answer|Present|Complete/.test(d)).map(d=>d.toLowerCase()).slice(0,2);
  const objective = plan.objective.trim().replace(/[.!?]+$/, "");
  const independence = actions.length ? `The learner should still ${actions.join(" and ")} in relation to “${objective}.” Supports should clarify the language and structure without selecting ideas, evidence, or answers for the learner.` : `The learner should still complete the core thinking in “${objective}.” Supports should clarify the language and structure without selecting ideas or answers for the learner.`;
  return { demands, before, during, priority, vocabulary, frames: languageFrames(plan), independence };
}

export function snapshot(scores: Scores) {
  const { strengths, supports } = compareDomains(scores);
  return `This learner’s relative strengths are ${strengths[0]} and ${strengths[1]}. ${supports[1]} and especially ${supports[0]} may benefit from additional language support. The learner may understand more English than they can independently produce in the task.`;
}
export function buildPrompt(plan: Plan) {
  return `I teach Grade ${plan.grade}.\n\nI have a multilingual learner with this WIDA profile:\nListening: ${plan.scores.Listening.toFixed(1)}\nSpeaking: ${plan.scores.Speaking.toFixed(1)}\nReading: ${plan.scores.Reading.toFixed(1)}\nWriting: ${plan.scores.Writing.toFixed(1)}\n\nStudents are learning ${plan.subject}.\n\nThe learning objective is:\n${plan.objective}\n\nStudents need to:\n${plan.demands.join(", ")}\n\nHere is the classroom task:\n${plan.task}\n\nAnalyze the language demands of this specific task in relation to the learner’s WIDA profile. Do not lower the cognitive goal or do the thinking for the student. Recommend the smallest useful set of scaffolds that will allow the learner to participate successfully. Consider vocabulary, visuals, background knowledge, comprehensible input, chunking, modeling, oral rehearsal, partner interaction, home-language resources, graphic organizers, word banks, sentence frames, and response options.\n\nTell me:\n1. What may be linguistically challenging and why\n2. What to do before the task\n3. What support to provide during the task\n4. What language support to provide\n5. What the student should still produce independently\n6. What I should NOT scaffold\n7. One scaffold I can gradually remove as the learner’s English develops\n\nKeep the recommendations practical for a classroom teacher.`;
}
