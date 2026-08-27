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

const levelTaskPerformance = [
  (action:string)=>`begin to ${action} by pointing, matching, drawing, labeling, or using familiar words`,
  (action:string)=>`use phrases, an illustrated choice, or a sentence pattern to ${action}`,
  (action:string)=>`use connected simple sentences and some expanded sentences to ${action}`,
  (action:string)=>`use organized, detailed language and increasingly precise vocabulary to ${action}`,
  (action:string)=>`use extended, purposeful language adapted to the audience to ${action}`,
  (action:string)=>`use nuanced, specialized language and an individual voice to ${action}`
];

const levelEvidence = [
  "demonstrate content understanding nonverbally and with familiar words; a full English sentence is not yet required",
  "combine visuals, oral language, and patterned sentences to communicate a complete idea",
  "connect ideas across several sentences and clarify meaning with a partner",
  "organize and elaborate ideas with relevant details and clearer transitions",
  "explain subtle relationships, qualify claims, and adjust language for purpose",
  "communicate with precision and flexibility comparable to proficient multilingual peers"
];

const levelSupportMoves = [
  ["one modeled example with gestures or think-aloud", "multiple ways to respond: point, act, draw, say, or write"],
  ["one optional sentence pattern tied to the task", "oral rehearsal with a partner before an independent response"],
  ["a simple organizer for connecting and expanding ideas", "brief feedback that prompts the learner to add detail or clarify"],
  ["targeted support for precise vocabulary, cohesion, or genre", "time to plan and revise rather than additional simplification"],
  ["feedback on nuance, register, audience, and strength of evidence", "access to complex models without reducing the intellectual demand"],
  ["the same strategic tools and authentic choices available to peers", "specialized feedback that strengthens precision and individual voice"]
];

const levelTeacherMoves = [
  ["Model the meaning with visuals and actions, then invite any valid mode of response", "Check understanding through showing or doing—not only through English production", "Name and build from the learner’s home-language and content knowledge"],
  ["Recast the learner’s phrase as a useful sentence pattern without requiring imitation", "Offer two meaningful response choices, then invite the learner to add an idea", "Let the learner rehearse orally before sharing or writing"],
  ["Prompt the learner to connect ideas with because, so, but, or another useful connector", "Ask one follow-up that elicits detail instead of correcting every language feature", "Fade the organizer once the learner can sustain connected sentences"],
  ["Press for precision with prompts such as Which detail? or How are these related?", "Give feedback on organization and cohesion while preserving the learner’s reasoning", "Remove broad supports and keep only the vocabulary or genre cue still needed"],
  ["Invite the learner to qualify, compare, challenge, and adapt ideas for an audience", "Confer about nuance and effectiveness rather than basic completion", "Use complex peer and disciplinary models as resources, not scripts"],
  ["Offer authentic choice in form, register, evidence, and audience", "Respond as an expert reader or listener while noticing multilingual strengths", "Provide specialized feedback only where it advances precision or impact"]
];

const levelIndependence = [
  "The learner chooses the meaning and may show it by pointing, acting, drawing, speaking, or writing.",
  "The learner chooses the idea; patterns and word banks support expression but do not supply the response.",
  "The learner connects and develops the ideas; an organizer may hold the structure but not the reasoning.",
  "The learner organizes, elaborates, and revises the response; feedback should target language rather than decide the content.",
  "The learner shapes the claim, evidence, nuance, and audience impact with only strategic language feedback.",
  "The learner makes the same substantive and rhetorical decisions expected of proficient multilingual peers."
];

const taskExamples:Record<CanDoTask,string[]> = {
  "Follow directions":["Points to the pictures, puts them in order, and says, “First… then.”","Follows two pictured steps and says, “First cut. Then glue.”","Follows a short sequence and retells it: “First we measured the water, and then we poured it into the cup.”","Follows multi-step oral directions, asks one clarifying question, and explains the sequence accurately.","Carries out detailed directions and explains how changing the order would affect the result.","Interprets complex directions, resolves ambiguity, and adapts the procedure appropriately."],
  "Read informational text":["Matches a labeled picture to the sentence “Water moves soil.”","Points to a key sentence and says, “This is about erosion.”","States the main idea and two details using connected sentences.","Explains how the text structure and details develop the main idea.","Interprets a subtle claim and explains how multiple details support it.","Evaluates the author’s explanation, terminology, and use of evidence across the text."],
  "Discuss an idea":["Points to a diagram and says, “I think water.”","Says, “I agree because the water moves the soil.”","Builds on a partner: “I agree, and I also think wind changes the land because…”","Clarifies and challenges an idea using relevant details from the lesson.","Qualifies a claim, compares perspectives, and responds to counterarguments.","Shapes the discussion by synthesizing ideas and adjusting language for the group."],
  "Answer questions":["Selects the matching picture and labels it “water.”","Answers, “Water moves the soil,” using a provided pattern.","Answers the question in connected sentences and includes one relevant detail.","Constructs a complete response with an explanation and accurately chosen evidence.","Addresses all parts of the question and explains the significance of the evidence.","Crafts a precise, nuanced response and accounts for ambiguity in the question or source."],
  "Explain thinking":["Points to the diagram and says, “Water… soil move.”","Says, “The soil moves because the water pushes it.”","Explains, “Water carries small pieces of soil, so the surface slowly changes.”","Explains the cause-and-effect chain using precise details and clear transitions.","Explains interacting causes, qualifies the claim, and addresses a possible exception.","Constructs a nuanced explanation using specialized language and independently chosen evidence."],
  "Use evidence":["Points to a highlighted sentence and says, “Here—water moves soil.”","Copies or names one relevant detail and says, “This shows the land changes.”","Paraphrases one detail and explains how it supports the idea.","Selects the strongest evidence and connects it to the claim with explicit reasoning.","Integrates multiple pieces of evidence and evaluates their relevance and strength.","Synthesizes evidence across sources, noting limitations or competing interpretations."],
  "Write a paragraph":["Draws the process and adds labels such as “water,” “soil,” and “move.”","Writes patterned sentences: “Water moves soil. This changes the land.”","Writes a topic sentence and connected supporting details with a closing statement.","Develops a cohesive paragraph with precise vocabulary, evidence, and varied transitions.","Adapts an extended paragraph for purpose and audience while maintaining cohesion and voice.","Crafts a nuanced paragraph with deliberate structure, disciplinary precision, and individual style."],
  "Present learning":["Shows a visual, names key parts, and uses gestures to communicate the main idea.","Uses a labeled visual and rehearsed phrases to give a short explanation.","Presents connected ideas and answers a familiar follow-up question.","Gives an organized, detailed presentation and responds to clarifying questions.","Adapts language and emphasis for the audience and responds thoughtfully to challenges.","Presents with disciplinary precision, rhetorical control, and flexible responses to questions."]
};

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

const zhTaskPerformance = ["可通过指认、配对、绘画、标注或熟悉词汇逐步完成任务","可借助短语、句型和图示选择完成任务","可使用相互连接的简单句和部分扩展句完成任务","可使用有组织、较详细且逐渐精确的语言完成任务","可根据目的和听众使用较长且有针对性的语言完成任务","可灵活使用细致、专业的语言和个人表达方式完成任务"];
const zhEvidence = ["可通过非语言方式和熟悉词汇展示学科理解，暂不要求完整英语句子","可结合视觉、口语和句型表达完整想法","可用多个句子连接想法，并与同伴澄清意思","可用相关细节和清晰衔接组织并扩展想法","可解释细微关系、限定观点，并根据目的调整语言","可以与熟练多语学习者相当的准确度和灵活性进行表达"];
const zhSupportMoves = [["教师用手势、视觉材料或思维示范完成一个例子","允许指认、动作、绘画、口语或书写等多种回应方式"],["提供一个与任务相关的可选句型","独立回应前先与同伴进行口头演练"],["使用简单组织器帮助连接和扩展想法","用简短反馈提示补充细节或澄清意思"],["只针对准确词汇、连贯性或体裁提供支持","给予规划和修改时间，而不是继续简化任务"],["针对细微含义、语域、听众和证据力度反馈","保留复杂范例和原有思维要求"],["提供与同伴相同的策略工具和真实选择","只在有助于准确度和表达效果时提供专业反馈"]];
const zhTeacherMoves = [["用视觉材料和动作示范含义，再邀请学生用任何有效方式回应","通过展示或操作检查理解，而不只依赖英语表达","明确肯定并利用学生的家庭语言和学科知识"],["将学生短语自然扩展成实用句型，但不要求机械模仿","提供两个有意义的回应选择，再邀请学生补充想法","分享或写作前给予口头演练时间"],["提示学生使用“因为、所以、但是”等连接词连接想法","用一个追问引出细节，而不是纠正所有语言问题","学生能持续使用连贯句子后逐步撤除组织器"],["用“哪个细节？”或“它们如何相关？”等问题促进准确表达","针对组织和连贯性反馈，同时保留学生自己的推理","撤除广泛支架，只保留仍需要的词汇或体裁提示"],["邀请学生限定、比较、质疑观点并根据听众调整表达","重点讨论细微含义和表达效果，而非基本完成情况","把复杂的同伴或学科范例作为资源，而不是脚本"],["在形式、语域、证据和听众方面提供真实选择","以专业读者或听众身份回应，并关注多语优势","只在能提升准确度或影响力时提供专业反馈"]];
const zhIndependence = ["学生独立决定要表达的意思，可通过指认、动作、绘画、口语或书写展示。","学生独立选择观点；句型和词汇库帮助表达，但不提供答案。","学生独立连接并发展想法；组织器只支撑结构，不代替推理。","学生独立组织、扩展和修改回应；反馈关注语言，不替学生决定内容。","学生独立形成观点、选择证据、处理细微含义并考虑听众，只接受策略性语言反馈。","学生作出与熟练多语同伴相同的内容和表达决策。"];
const zhTaskExamples:Record<CanDoTask,string[]> = {
  "Follow directions":["指着图片排序，并说：“先……然后……”","按照两个图示步骤操作，并说：“先剪，再粘。”","完成简短步骤并复述：“我们先量水，然后倒进杯子。”","完成多步骤口头指令，提出一个澄清问题，并准确说明顺序。","完成详细指令，并解释改变顺序会如何影响结果。","理解复杂指令，解决歧义并适当调整步骤。"],
  "Read informational text":["把带标签的图片与“水移动土壤”配对。","指着关键句说：“这篇讲侵蚀。”","用连贯句子说出主旨和两个细节。","解释文本结构和细节如何发展主旨。","理解较含蓄的观点，并说明多个细节如何支持它。","评价作者的解释、术语和全文证据使用。"],
  "Discuss an idea":["指着图说：“我觉得是水。”","说：“我同意，因为水移动土壤。”","回应同伴：“我同意，而且我觉得风也会改变土地，因为……”","用课程细节澄清或质疑一个观点。","限定观点、比较不同看法并回应反方意见。","综合小组观点并根据讨论需要调整表达。"],
  "Answer questions":["选择匹配图片并标注“水”。","借助句型回答：“水移动土壤。”","用连贯句子回答，并加入一个相关细节。","用解释和准确证据组织完整回答。","回答问题的所有部分，并解释证据的重要性。","准确而细致地回应，并处理问题或材料中的歧义。"],
  "Explain thinking":["指着图说：“水……土移动。”","说：“土移动，因为水推它。”","解释：“水带走小块土壤，所以地表慢慢改变。”","用准确细节和清晰衔接解释完整因果链。","解释相互作用的原因、限定观点，并回应一种例外情况。","使用专业语言和自主选择的证据作出细致解释。"],
  "Use evidence":["指着高亮句说：“这里——水移动土壤。”","摘录一个相关细节并说：“这说明土地改变了。”","转述一个细节，并解释它如何支持观点。","选择最有力的证据，并明确说明它与观点的联系。","整合多条证据并评价其相关性和力度。","综合不同来源的证据，并指出局限或其他解释。"],
  "Write a paragraph":["画出过程，并标注“水、土、移动”等词。","写出句型化句子：“水移动土壤。这改变土地。”","写出主题句、相互连接的支持细节和结束句。","使用准确词汇、证据和多样衔接写出连贯段落。","根据目的和读者调整较长段落，同时保持连贯和个人表达。","以清晰结构、学科准确度和个人风格写出细致段落。"],
  "Present learning":["展示视觉材料、说出关键部分，并用手势表达主旨。","借助带标签的视觉材料和演练短语进行简短说明。","展示连贯想法，并回答一个熟悉的追问。","进行有组织、详细的展示，并回应澄清问题。","根据听众调整语言和重点，并认真回应质疑。","以学科准确度和表达控制进行展示，并灵活回应问题。"]
};

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
    canDos:[zhLevelLanguage[domain][i],`${zhTaskPerformance[i]}：${taskActionZh[task]}`,`${younger?"在实物、图画和互动中":"在年级学科任务中"}${zhEvidence[i]}`],
    supports:[zhSupports[domain][i],...zhSupportMoves[i]],
    teacherMoves:zhTeacherMoves[i],
    independence:`${zhIndependence[i]} 核心目标仍是：${taskActionZh[task]}。语言支架不应替学生选择想法、证据或答案。`,
    example:zhTaskExamples[task][i]
  };
  return {
    canDos:[levelLanguage[domain][i],levelTaskPerformance[i](taskAction[task]),`${younger?"in hands-on, visual, and interactive work, ":"in grade-level content work, "}${levelEvidence[i]}`],
    supports:[supports[domain][i],...levelSupportMoves[i]],
    teacherMoves:levelTeacherMoves[i],
    independence:`${levelIndependence[i]} The core goal remains to ${taskAction[task]}. Language support should not select the ideas, evidence, or answer for the learner.`,
    example:taskExamples[task][i]
  };
}

export const taskZh:Record<CanDoTask,string>={"Follow directions":"遵循指令","Read informational text":"阅读说明文","Discuss an idea":"讨论想法","Answer questions":"回答问题","Explain thinking":"解释思考过程","Use evidence":"使用证据","Write a paragraph":"写一段话","Present learning":"展示学习成果"};
const taskActionZh:Record<CanDoTask,string>={"Follow directions":"判断顺序、完成并说明课堂指令","Read informational text":"找出说明文的主旨和相关细节","Discuss an idea":"分享观点、回应同伴并推动讨论","Answer questions":"理解问题并组织相关回答","Explain thinking":"解释想法之间如何或为何相关","Use evidence":"选择相关证据并解释其含义","Write a paragraph":"将主旨和支持细节组织成段落","Present learning":"组织想法并向听众清楚表达"};
