import type { Domain } from "../lib/types";
import type { Language } from "../lib/i18n";

export const gradeBands = ["K–2", "3–5"] as const;
export const canDoTasks = ["Follow directions", "Read informational text", "Discuss an idea", "Answer questions", "Explain thinking", "Use evidence", "Write a paragraph", "Present learning"] as const;
export type CanDoTask = typeof canDoTasks[number];

const levelLanguage = {
  Listening: ["identify familiar words, gestures, and visual cues", "follow short patterned statements with visual support", "follow connected sentences about familiar content", "interpret detailed oral explanations with occasional support", "interpret extended academic talk across settings", "process specialized oral language flexibly"],
  Speaking: ["communicate with gestures, words, and familiar expressions", "share ideas through phrases and patterned sentences", "connect ideas using simple and some expanded sentences", "explain ideas using connected, increasingly precise language", "adapt detailed academic language for purpose and audience", "use specialized spoken language flexibly"],
  Reading: ["connect familiar words and phrases to pictures or objects", "identify key information in short illustrated text", "interpret main ideas and details in connected text", "analyze increasingly detailed grade-level text with strategic support", "interpret nuanced academic text across genres", "use specialized written language flexibly"],
  Writing: ["communicate through drawing, labeling, and familiar words", "express ideas in phrases and patterned sentences", "develop ideas through connected simple and expanded sentences", "produce organized, detailed text with increasingly precise language", "adapt extended academic writing for purpose and audience", "use specialized written language flexibly"]
} satisfies Record<Domain,string[]>;

const supports = {
  Listening: ["gestures and a visual preview", "short chunks with pictures and repetition", "a listening purpose and pause points", "key terms previewed before extended talk", "occasional clarification of specialized phrasing", "the same purposeful supports available to peers"],
  Speaking: ["wait time, visuals, and accepted nonverbal responses", "oral rehearsal and a small word bank", "structured partner talk and optional language frames", "planning time and feedback on precision", "audience-specific feedback", "authentic opportunities for sophisticated discussion"],
  Reading: ["labeled visuals and teacher modeling", "chunked illustrated text and a picture glossary", "a reading purpose, annotations, and partner processing", "text-structure cues and targeted vocabulary", "support with nuance and unfamiliar cultural references", "access to the same strategic reading tools as peers"],
  Writing: ["drawing, labeling, and shared writing", "oral rehearsal, a visual word bank, and optional frames", "an organizer and a brief mentor example", "genre models and feedback on cohesion", "feedback on precision, voice, and audience", "authentic writing choices and expert feedback"]
} satisfies Record<Domain,string[]>;

const zhLevelLanguage = {
  Listening: ["借助熟悉词汇、手势和视觉线索理解信息", "借助视觉支持理解简短且有规律的表达", "理解有关熟悉内容的连贯句子", "在少量支持下理解较详细的口头解释", "在不同情境中理解较长的学术表达", "灵活理解专业口语"],
  Speaking: ["使用手势、单词和熟悉表达进行交流", "使用短语和有规律的句子分享想法", "用简单句和部分扩展句连接想法", "使用连贯且逐渐精确的语言解释想法", "根据目的和听众调整详细的学术语言", "灵活使用专业口语"],
  Reading: ["将熟悉单词和短语与图片或实物联系起来", "在简短图文中找出关键信息", "理解连贯文本中的主旨和细节", "在适当支持下分析更详细的年级文本", "理解不同体裁中较细致的学术文本", "灵活理解专业书面语言"],
  Writing: ["通过绘画、标注和熟悉单词表达意思", "使用短语和有规律的句子表达想法", "用相互连接的简单句和扩展句发展想法", "使用逐渐精确的语言写出有组织的详细文本", "根据目的和读者调整较长的学术写作", "灵活使用专业书面语言"]
} satisfies Record<Domain,string[]>;

const zhSupports = {
  Listening: ["手势和视觉预览", "配图、重复和分段讲解", "明确的听力目的和停顿点", "在较长讲解前预习关键词", "必要时澄清专业表达", "与同伴相同的有目的支持"],
  Speaking: ["等待时间、视觉材料和非语言回应", "口头演练和小型词汇库", "有结构的同伴交流和可选句型", "准备时间和语言精确度反馈", "针对听众的表达反馈", "真实且有深度的讨论机会"],
  Reading: ["带标签的视觉材料和教师示范", "分段图文和图片词汇表", "阅读目的、批注和同伴交流", "文本结构提示和重点词汇", "对细微含义和陌生文化背景的支持", "与同伴相同的策略性阅读工具"],
  Writing: ["绘画、标注和共同写作", "口头演练、图文词汇库和可选句型", "图示组织器和简短范例", "体裁范例和连贯性反馈", "对准确度、语气和读者意识的反馈", "真实的写作选择和专业反馈"]
} satisfies Record<Domain,string[]>;

type Activity = { title:string; titleZh:string; setup:string; setupZh:string; student:string; studentZh:string; independent:string; independentZh:string; fade:string; fadeZh:string; time:string };
export const activities: Record<CanDoTask,Activity> = {
  "Follow directions": {title:"Listen, point, do",titleZh:"听一听、指一指、做一做",setup:"Show three illustrated steps and give one direction at a time.",setupZh:"展示三个图示步骤，每次给出一条指令。",student:"Sequence the pictures, carry out the steps, and explain the order to a partner.",studentZh:"排列图片、完成步骤，并向同伴说明顺序。",independent:"Decide the correct sequence and complete the task.",independentZh:"独立判断正确顺序并完成任务。",fade:"Remove the pictures, then combine two directions.",fadeZh:"先撤除图片，再把两条指令合并。",time:"5–8 min"},
  "Read informational text": {title:"Picture–paragraph match",titleZh:"图片与段落配对",setup:"Place three text chunks beside related photographs or diagrams.",setupZh:"将三段短文与相关照片或图表放在一起。",student:"Match each chunk to a visual and mark one key detail.",studentZh:"将每段文字与视觉材料配对，并标出一个关键细节。",independent:"Identify the main idea and justify each match.",independentZh:"独立判断主旨并说明配对理由。",fade:"Remove labels before removing the visuals.",fadeZh:"先撤除标签，再逐步撤除视觉材料。",time:"10 min"},
  "Discuss an idea": {title:"Think–sketch–pair–share",titleZh:"思考—速画—同伴交流—分享",setup:"Pose one open question and provide two optional discussion stems.",setupZh:"提出一个开放问题，并提供两个可选讨论句型。",student:"Sketch an idea, rehearse it with a partner, then add or challenge one point.",studentZh:"先画出想法，与同伴演练，再补充或质疑一个观点。",independent:"Choose the idea, reason, and response to the partner.",independentZh:"独立选择观点、理由以及如何回应同伴。",fade:"Remove the stems while keeping partner rehearsal.",fadeZh:"保留同伴演练，逐步撤除句型。",time:"8–12 min"},
  "Answer questions": {title:"Find it, mark it, answer it",titleZh:"找到、标记、回答",setup:"Display the question, highlight its action word, and provide a response checklist.",setupZh:"展示问题，突出动作词，并提供回答检查表。",student:"Locate relevant information, mark it, and answer in the expected format.",studentZh:"找到相关信息、做好标记，并按要求作答。",independent:"Select the information and construct the answer.",independentZh:"独立选择信息并组织答案。",fade:"Remove the highlighted action word first.",fadeZh:"首先撤除动作词高亮。",time:"8–10 min"},
  "Explain thinking": {title:"Build–rehearse–explain",titleZh:"操作—演练—解释",setup:"Provide a diagram or organizer and one optional explanation frame.",setupZh:"提供图表或组织器，以及一个可选解释句型。",student:"Represent the idea, rehearse the explanation, and explain how or why.",studentZh:"呈现想法、口头演练，并解释过程或原因。",independent:"Choose the reasoning and explain the relationship.",independentZh:"独立选择推理过程并解释关系。",fade:"Remove the frame before removing the organizer.",fadeZh:"先撤除句型，再撤除组织器。",time:"10–15 min"},
  "Use evidence": {title:"Evidence detective",titleZh:"证据侦探",setup:"Chunk the text and provide an evidence → meaning organizer.",setupZh:"将文本分段，并提供“证据 → 含义”组织器。",student:"Select one relevant detail, copy or paraphrase it, and explain what it shows.",studentZh:"选择一个相关细节，摘录或转述，并解释它说明了什么。",independent:"Decide which evidence is relevant and how it supports the idea.",independentZh:"独立判断哪些证据相关，以及它如何支持观点。",fade:"Move from a labeled organizer to two blank columns.",fadeZh:"从带标签的组织器逐步过渡到两个空白栏。",time:"12–15 min"},
  "Write a paragraph": {title:"Oral paragraph rehearsal",titleZh:"段落口头演练",setup:"Provide a main-idea organizer, a visual word bank, and a brief mentor paragraph.",setupZh:"提供主旨组织器、图文词汇库和简短范例段落。",student:"Plan the idea and details, say the paragraph to a partner, then write it.",studentZh:"规划主旨和细节，先向同伴口述段落，再完成写作。",independent:"Choose and organize the ideas and compose the paragraph.",independentZh:"独立选择、组织想法并写出段落。",fade:"Remove the mentor paragraph, then reduce the word bank.",fadeZh:"先撤除范例段落，再缩减词汇库。",time:"15–20 min"},
  "Present learning": {title:"Rehearsal stations",titleZh:"展示演练站",setup:"Create stations for vocabulary, visuals, partner rehearsal, and self-checking.",setupZh:"设置词汇、视觉材料、同伴演练和自我检查四个站点。",student:"Prepare one visual, rehearse with a partner, then present to a small group.",studentZh:"准备一份视觉材料，与同伴演练，再向小组展示。",independent:"Select the content, organize the presentation, and respond to questions.",independentZh:"独立选择内容、组织展示并回应问题。",fade:"Reduce rehearsal prompts while keeping the authentic audience.",fadeZh:"逐步减少演练提示，但保留真实听众。",time:"15–25 min"}
};

const taskAction: Record<CanDoTask,string> = {
  "Follow directions":"complete and explain a sequence of classroom directions","Read informational text":"identify the main idea and relevant details in informational text","Discuss an idea":"share an idea, respond to a partner, and build the discussion","Answer questions":"interpret the question and construct a relevant response","Explain thinking":"explain how or why ideas are connected","Use evidence":"select relevant evidence and explain what it shows","Write a paragraph":"organize a main idea and supporting details into a paragraph","Present learning":"organize ideas and communicate them to an audience"
};

export function getCanDoProfile(domain:Domain,level:number,task:CanDoTask,gradeBand:string,lang:Language) {
  const i=Math.max(0,Math.min(5,level-1));
  const younger=gradeBand==="K–2";
  if(lang==="zh") return {
    canDos:[zhLevelLanguage[domain][i],`在${taskZh[task]}中完成与该阶段相符的语言任务`,younger?"借助实物、图画和互动展示理解":"通过视觉、口头或书面方式展示年级内容理解"],
    supports:[zhSupports[domain][i],"清晰示范任务要求和成功标准","在独立完成前提供简短演练机会"],
    teacherMoves:["先示范过程，而不是提供答案","观察学习者如何回应，再决定是否增加支持","允许使用家庭语言进行思考和意义建构"],
    independence:`学习者仍应独立${taskActionZh[task]}。语言支架不应替学生选择想法、证据或答案。`
  };
  return {
    canDos:[levelLanguage[domain][i],`${taskAction[task]} using language characteristic of this phase`,younger?"show understanding through objects, pictures, movement, and interaction":"show grade-level content understanding through visual, oral, or written responses"],
    supports:[supports[domain][i],"a clear model of the task and success criteria","a brief opportunity to rehearse before working independently"],
    teacherMoves:["Model the process without supplying the answer","Observe the learner’s response before adding more support","Welcome home-language sense-making and brainstorming"],
    independence:`The learner should still ${taskAction[task]}. Language support should not select the ideas, evidence, or answer for the learner.`
  };
}

export const taskZh:Record<CanDoTask,string>={"Follow directions":"遵循指令","Read informational text":"阅读说明文","Discuss an idea":"讨论想法","Answer questions":"回答问题","Explain thinking":"解释思考过程","Use evidence":"使用证据","Write a paragraph":"写一段话","Present learning":"展示学习成果"};
const taskActionZh:Record<CanDoTask,string>={"Follow directions":"判断顺序、完成并说明课堂指令","Read informational text":"找出说明文的主旨和相关细节","Discuss an idea":"分享观点、回应同伴并推动讨论","Answer questions":"理解问题并组织相关回答","Explain thinking":"解释想法之间如何或为何相关","Use evidence":"选择相关证据并解释其含义","Write a paragraph":"将主旨和支持细节组织成段落","Present learning":"组织想法并向听众清楚表达"};
