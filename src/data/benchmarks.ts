export interface Benchmark {
  id: string;
  name: string;
  url: string;
  category: string;
  description: string;
  method: string;
  scores: {
    transparency: number;
    rigor: number;
    gaming_resistance: number;
    evaluator_quality: number;
    real_world_signal: number;
    freshness: number;
  };
  popularity_note: string;
  rationale: string;
}

export const CRITERIA = [
  {
    key: "transparency" as const,
    label: "Transparency",
    short: "TRN",
    description: "Is the methodology fully documented and reproducible? Is data/code open source?",
  },
  {
    key: "rigor" as const,
    label: "Rigor",
    short: "RIG",
    description: "Statistical validity, sample size, confidence intervals, contamination controls.",
  },
  {
    key: "gaming_resistance" as const,
    label: "Gaming Resistance",
    short: "GAM",
    description: "How hard is it for model makers to artificially inflate scores?",
  },
  {
    key: "evaluator_quality" as const,
    label: "Evaluator Quality",
    short: "EVL",
    description: "Who does the evaluation? What quality controls exist?",
  },
  {
    key: "real_world_signal" as const,
    label: "Real-World Signal",
    short: "RWS",
    description: "Does performance predict actual usefulness for real tasks?",
  },
  {
    key: "freshness" as const,
    label: "Freshness",
    short: "FRS",
    description: "How often updated? Do questions rotate to prevent contamination?",
  },
];

export function getGrade(scores: Benchmark["scores"]): string {
  const values = Object.values(scores);
  const avg = values.reduce((a, b) => a + b, 0) / values.length;
  if (avg >= 4.5) return "A";
  if (avg >= 3.5) return "B";
  if (avg >= 2.5) return "C";
  if (avg >= 1.5) return "D";
  return "F";
}

export function getAverage(scores: Benchmark["scores"]): number {
  const values = Object.values(scores);
  return values.reduce((a, b) => a + b, 0) / values.length;
}

export function getGradeColor(grade: string): string {
  switch (grade) {
    case "A": return "text-emerald-400";
    case "B": return "text-sky-400";
    case "C": return "text-amber-400";
    case "D": return "text-orange-400";
    case "F": return "text-red-400";
    default: return "text-neutral-400";
  }
}

export function getGradeBg(grade: string): string {
  switch (grade) {
    case "A": return "bg-emerald-400/10 border-emerald-400/30";
    case "B": return "bg-sky-400/10 border-sky-400/30";
    case "C": return "bg-amber-400/10 border-amber-400/30";
    case "D": return "bg-orange-400/10 border-orange-400/30";
    case "F": return "bg-red-400/10 border-red-400/30";
    default: return "bg-neutral-400/10 border-neutral-400/30";
  }
}

export function getScoreColor(score: number): string {
  if (score >= 5) return "text-emerald-400";
  if (score >= 4) return "text-sky-400";
  if (score >= 3) return "text-amber-400";
  if (score >= 2) return "text-orange-400";
  return "text-red-400";
}

export const benchmarks: Benchmark[] = [
  {
    id: "arc-agi",
    name: "ARC-AGI",
    url: "https://arcprize.org/leaderboard",
    category: "Reasoning & Intelligence",
    description: "Tests AI system generalization through novel, unseen pattern-matching tasks. Founded by François Chollet to measure genuine intelligence rather than memorization.",
    method: "Automated benchmark with novel tasks",
    scores: { transparency: 5, rigor: 5, gaming_resistance: 5, evaluator_quality: 5, real_world_signal: 3, freshness: 5 },
    popularity_note: "Frequently cited in frontier model announcements. High-profile prize attached.",
    rationale: "Gold standard for measuring genuine reasoning. Tasks are novel by design, making contamination nearly impossible (Chollet, 2019). Fully open methodology. Lower real-world signal because abstract pattern tasks don't map directly to job tasks — but that's intentional: ARC-AGI tests skill-acquisition efficiency, not memorization. OpenAI reportedly spent hundreds of thousands on compute for a high ARC-AGI score (Pfister & Jud, 2025).",
  },
  {
    id: "lmarena",
    name: "LMArena (Chatbot Arena)",
    url: "https://lmarena.ai",
    category: "General Purpose",
    description: "Crowdsourced leaderboard where users chat with two anonymous models and vote for the better response. Uses Elo rating system. Run by Berkeley researchers.",
    method: "Human preference / Arena (Elo rating)",
    scores: { transparency: 4, rigor: 3, gaming_resistance: 2, evaluator_quality: 1, real_world_signal: 3, freshness: 5 },
    popularity_note: "The most cited leaderboard in AI. Almost every model launch references LMArena ranking.",
    rationale: "Highly popular and continuously updated, but fundamentally flawed evaluator quality. Surge AI found 52% disagreement with voter choices. Models can game it with verbosity, formatting, and emojis — Meta tuned Maverick specifically for this. Exemplifies Goodhart's law: 'when a measure becomes a target, it ceases to be a good measure' (Strathern, 1997). Alzahrani et al. (2024) showed LLM leaderboards are highly sensitive to trivial prompt variations. Ren et al. (2024) found LMArena-style preference benchmarks correlate with upstream capabilities, raising 'safetywashing' concerns.",
  },
  {
    id: "mmlu",
    name: "MMLU",
    url: "https://github.com/hendrycks/test",
    category: "Knowledge & Reasoning",
    description: "Massive Multitask Language Understanding. Tests LLMs across 57 subjects using multiple-choice questions in zero/few-shot settings.",
    method: "Automated benchmark (multiple choice)",
    scores: { transparency: 5, rigor: 3, gaming_resistance: 1, evaluator_quality: 4, real_world_signal: 2, freshness: 1 },
    popularity_note: "One of the most widely cited benchmarks in model release papers.",
    rationale: "Historically important and fully open, but the static test set is now widely in training data — a textbook case of data contamination (Xu et al., 2024; Zhang et al., 2024). Multiple-choice format doesn't reflect real-world usage: 'it's not like a lawyer's job is to answer bar exam questions all day' (Narayanan & Kapoor, 2023). Gema et al. (2024) asked 'Are We Done with MMLU?' — finding significant issues with question quality and annotation errors. Koch et al. (2021) document how such datasets get 'reduced, reused, and recycled' well past their useful life.",
  },
  {
    id: "swe-bench",
    name: "SWE-Bench",
    url: "https://www.swebench.com",
    category: "Coding & Agents",
    description: "Tests AI agents on real-world software engineering by requiring them to resolve actual GitHub issues. Developed at Princeton.",
    method: "Agent task completion (real GitHub issues)",
    scores: { transparency: 5, rigor: 4, gaming_resistance: 4, evaluator_quality: 5, real_world_signal: 5, freshness: 4 },
    popularity_note: "The standard benchmark for coding agents. Cited in virtually every coding-focused model release.",
    rationale: "Excellent real-world signal — tests what developers actually do, addressing the sociotechnical gap identified by Liao & Xiao (2023). Uses real GitHub issues with real test suites as ground truth — the kind of application-centric evaluation Hutchinson et al. (2022) call for. Multi-step agentic reasoning makes pure memorization insufficient, though some contamination risk exists from public repos.",
  },
  {
    id: "livebench",
    name: "LiveBench",
    url: "https://livebench.ai",
    category: "General Purpose",
    description: "Real-time leaderboard with regularly rotating questions across reasoning, coding, data analysis, and language. ~21 tasks in 7 categories.",
    method: "Automated benchmark (rotating questions)",
    scores: { transparency: 5, rigor: 5, gaming_resistance: 5, evaluator_quality: 4, real_world_signal: 3, freshness: 5 },
    popularity_note: "Growing in citations. Increasingly referenced as a trustworthy alternative to static benchmarks.",
    rationale: "Best-in-class contamination controls through regular question rotation — directly addressing the data contamination crisis documented by Xu et al. (2024) and Zhang et al. (2024). This is the 'dynamic benchmark' approach recommended by Besen (2024) and others as a counter to gaming. Strong methodology and full transparency. Real-world signal is moderate — tasks are academic — but anti-gaming design is exemplary.",
  },
  {
    id: "artificial-analysis",
    name: "Artificial Analysis",
    url: "https://artificialanalysis.ai",
    category: "General Purpose",
    description: "Compares 100+ AI models on intelligence, performance, speed, and cost. Tracks frontier model development over time.",
    method: "Multi-metric automated evaluation",
    scores: { transparency: 5, rigor: 4, gaming_resistance: 3, evaluator_quality: 4, real_world_signal: 4, freshness: 5 },
    popularity_note: "Widely used for model comparison shopping. Popular with practitioners and decision-makers.",
    rationale: "Excellent holistic view — covers quality, speed, and cost together, which is how real users make decisions. Well-documented methodology.",
  },
  {
    id: "humaneval",
    name: "HumanEval",
    url: "https://github.com/openai/human-eval",
    category: "Coding",
    description: "Evaluates code generation using Python programming problems. Models must produce functionally correct code passing unit tests. Created by OpenAI researchers.",
    method: "Automated benchmark (code generation + unit tests)",
    scores: { transparency: 5, rigor: 3, gaming_resistance: 2, evaluator_quality: 5, real_world_signal: 3, freshness: 1 },
    popularity_note: "One of the original coding benchmarks. Still cited but increasingly supplemented by SWE-Bench.",
    rationale: "Clean evaluation (code passes or doesn't), but small static dataset now widely contaminated — Narayanan & Kapoor (2023) showed GPT-4 could solve Codeforces problems before its training cutoff but zero after, a pattern likely affecting HumanEval similarly. Python-only limits scope. Created by OpenAI researchers, raising the independence concerns flagged by Orr & Kang (2024). Being superseded by more comprehensive coding benchmarks.",
  },
  {
    id: "hellaswag",
    name: "HellaSwag",
    url: "https://rowanzellers.com/hellaswag/",
    category: "Reasoning",
    description: "Tests commonsense reasoning through sentence completion. Designed to resist pattern memorization.",
    method: "Automated benchmark (sentence completion)",
    scores: { transparency: 5, rigor: 4, gaming_resistance: 2, evaluator_quality: 4, real_world_signal: 2, freshness: 1 },
    popularity_note: "Standard inclusion in benchmark suites. Less prominent in recent frontier model launches.",
    rationale: "Well-designed when created, but static dataset now saturated — most frontier models score 95%+. A textbook case of benchmark saturation (Ott et al., 2022). Biderman et al. (2024) note it was 'designed prior to shifts such as in-context learning.' Uses Reddit 'Am I the Asshole' posts as proxies for commonsense — Keegan (2024) questions whether crowd-sourced content is a reasonable substitute for real-world reasoning.",
  },
  {
    id: "vellum",
    name: "Vellum AI Leaderboard",
    url: "https://www.vellum.ai/llm-leaderboard",
    category: "General Purpose",
    description: "Comprehensive real-time LLM ranking with benchmarks for reasoning, coding (SWE-Bench), and tool use (BFCL). Both provider-reported and independent evaluations.",
    method: "Multi-benchmark aggregation",
    scores: { transparency: 4, rigor: 4, gaming_resistance: 3, evaluator_quality: 4, real_world_signal: 4, freshness: 5 },
    popularity_note: "Popular with developers and product teams evaluating models for production use.",
    rationale: "Strong practical value — includes both provider-reported and independent evals, which is unusually transparent. Gaming resistance limited by reliance on underlying benchmarks.",
  },
  {
    id: "aider",
    name: "Aider LLM Leaderboards",
    url: "https://aider.chat/docs/leaderboards/",
    category: "Coding",
    description: "Specialized for evaluating LLMs as code-editing assistants. Polyglot test suite across multiple programming languages.",
    method: "Automated benchmark (multi-language code editing)",
    scores: { transparency: 5, rigor: 4, gaming_resistance: 3, evaluator_quality: 5, real_world_signal: 5, freshness: 4 },
    popularity_note: "Highly influential in the coding agent community. Frequently cited by developers choosing models.",
    rationale: "Excellent real-world signal — tests exactly what developers use these models for. Objective evaluation. Polyglot approach prevents single-language overfitting.",
  },
  {
    id: "trustllm",
    name: "TrustLLM",
    url: "https://trustllmbenchmark.github.io/TrustLLM-Website/",
    category: "Safety & Trust",
    description: "Measures LLM trustworthiness across safety, sycophancy, privacy, and adversarial resistance.",
    method: "Automated benchmark (safety-focused)",
    scores: { transparency: 4, rigor: 4, gaming_resistance: 3, evaluator_quality: 4, real_world_signal: 4, freshness: 3 },
    popularity_note: "Niche but growing. Increasingly relevant as safety becomes a key differentiator.",
    rationale: "Fills a critical gap — most benchmarks measure capability, not trustworthiness. Guldimann et al. (2024) found benchmarks for privacy, copyright, and interpretability are 'often simplistic and brittle.' However, Ren et al. (2024) warn that safety benchmarks often correlate with upstream capabilities, raising 'safetywashing' concerns — the risk that capability improvements are misrepresented as safety advancements.",
  },
  {
    id: "prophet-arena",
    name: "ProphetArena",
    url: "https://www.prophetarena.co/",
    category: "Specialized",
    description: "University of Chicago project. Models place probabilistic bets on real events using news and market data. Reality is the evaluator.",
    method: "Prediction market evaluation",
    scores: { transparency: 4, rigor: 4, gaming_resistance: 4, evaluator_quality: 5, real_world_signal: 5, freshness: 5 },
    popularity_note: "New and niche. Not yet widely cited in model releases.",
    rationale: "Brilliant methodology — real-world outcomes are the ultimate evaluator. Very hard to game because you can't predict the future by memorizing training data.",
  },
  {
    id: "galileo",
    name: "Galileo Agent Leaderboard",
    url: "https://huggingface.co/spaces/galileo-ai/agent-leaderboard",
    category: "Coding & Agents",
    description: "Hosted on Hugging Face. Ranks agents on Action Completion, Tool Selection Quality, and cost-effectiveness.",
    method: "Automated agent evaluation",
    scores: { transparency: 4, rigor: 3, gaming_resistance: 3, evaluator_quality: 4, real_world_signal: 4, freshness: 4 },
    popularity_note: "Growing in the agent-building community. Less mainstream visibility.",
    rationale: "Practical focus on what matters for agent deployment (cost + quality). Hosted on neutral platform. Relatively new with evolving methodology.",
  },
  {
    id: "openrouter",
    name: "OpenRouter Rankings",
    url: "https://openrouter.ai/rankings",
    category: "General Purpose",
    description: "Shows actual token usage distribution across models. Reflects what real users choose to use and pay for.",
    method: "Usage-based (real token distribution)",
    scores: { transparency: 5, rigor: 2, gaming_resistance: 4, evaluator_quality: 3, real_world_signal: 5, freshness: 5 },
    popularity_note: "Referenced as a real-world popularity signal. Not a traditional benchmark.",
    rationale: "The ultimate revealed-preference metric — people vote with their wallets. Not rigorous as a benchmark (popularity ≠ quality), but extremely hard to game and honest about what it measures.",
  },
  {
    id: "hemingway-bench",
    name: "Hemingway-bench",
    url: "https://surgehq.ai/leaderboards/hemingway-bench",
    category: "Specialized",
    description: "Evaluates AI writing quality across creative, business, and everyday tasks. Expert human writers ('master wordsmiths') judge outputs on nuance, originality, and emotional authenticity. Uses Elo ratings with 95% confidence intervals.",
    method: "Human expert evaluation (Elo rating)",
    scores: { transparency: 3, rigor: 3, gaming_resistance: 3, evaluator_quality: 4, real_world_signal: 4, freshness: 4 },
    popularity_note: "Growing visibility through Surge AI's platform. Not yet widely cited in model releases.",
    rationale: "Strong concept — expert writers evaluating real writing tasks is far more meaningful than automated fluency metrics. Elo with confidence intervals adds statistical rigor. However, no published rubric, evaluator credentials unverified, inter-rater reliability unreported, and evaluator count undisclosed. Gaming resistance is moderate: human expert judgment is harder to game than automated metrics, but without published criteria, models could be tuned to impress rather than perform. Built by Surge AI, who also published the influential LMArena critique.",
  },
  {
    id: "enterprisebench-corecraft",
    name: "EnterpriseBench: CoreCraft",
    url: "https://surgehq.ai/leaderboards/enterprisebench-corecraft",
    category: "Coding & Agents",
    description: "Tests AI agents on realistic enterprise tasks in a simulated startup environment. Evaluates tool use, planning, adaptability, groundedness, and common sense across multi-step business workflows.",
    method: "Agent task completion (simulated enterprise)",
    scores: { transparency: 4, rigor: 4, gaming_resistance: 4, evaluator_quality: 4, real_world_signal: 5, freshness: 4 },
    popularity_note: "New but gaining traction in the agent-building community. Backed by arXiv paper.",
    rationale: "Excellent real-world signal — tests exactly what enterprise AI agents need to do: process returns, research products across databases, handle pagination limits, apply business rules. Rubric-based scoring against specific success criteria. arXiv paper (2602.16179) provides methodological transparency. Current top score is only 42.6% (GPT-5.2), indicating genuine difficulty. Common failure modes documented: hallucination, ineffective search, inability to adapt strategies.",
  },
  {
    id: "riemann-bench",
    name: "Riemann-bench",
    url: "https://surgehq.ai/leaderboards/riemann-bench",
    category: "Reasoning",
    description: "Tests AI on frontier-level mathematics requiring deep reasoning, topological insight, and rigorous proof construction. Problems curated by leading mathematicians from cutting-edge research.",
    method: "Automated benchmark (expert-curated math proofs)",
    scores: { transparency: 3, rigor: 4, gaming_resistance: 5, evaluator_quality: 5, real_world_signal: 3, freshness: 4 },
    popularity_note: "Niche but respected. Highlights the gap between benchmark saturation and genuine mathematical reasoning.",
    rationale: "Near-impossible to game — all frontier models score between 2-6%, proving these aren't memorizable problems. Problems from cutting-edge mathematics (graph theory, abstract algebra, topological recursion) require genuine proof construction, not pattern matching. Mathematical proofs are objectively verifiable. Real-world signal is narrower (relevant to math research, not general use), but as a measure of genuine reasoning it's exceptional. A stark contrast to saturated benchmarks where models score 95%+.",
  },
];
