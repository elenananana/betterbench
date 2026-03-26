import Link from "next/link";

export default function Methodology() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <Link
        href="/"
        className="text-xs text-muted hover:text-foreground transition-colors mb-8 inline-block"
      >
        ← Back to rankings
      </Link>

      <article className="space-y-10">
        <header>
          <h1 className="font-serif italic text-4xl sm:text-5xl tracking-tight mb-3">
            Not All Benchmarks Are Created Equal
          </h1>
          <p className="text-muted text-sm">
            How we score AI benchmarks — and why it matters
          </p>
        </header>

        {/* Intro */}
        <section className="space-y-4 text-sm leading-relaxed text-foreground/90">
          <p>
            There was a lot of noise around the launch of GPT-5 this month, and a
            few voices noted the shift from chasing benchmarks to everyday value
            for individual and corporate users. Maybe a good moment to take a look
            at those rankings.
          </p>
          <p>
            AI benchmarks and leaderboards are powerful. They shape which models get
            funding, which ones show up in your tools, and which ones the press covers.
            For AI labs, benchmark rankings determine how much money they can raise.
            For the rest of us, they&apos;re supposed to help us figure out which model
            is actually best for what we need.
          </p>
          <p>
            The problem: not all benchmarks are created equal. Some are rigorous,
            transparent, and genuinely useful. Others are cherry-picked, gameable,
            or built on fundamentally flawed methodology. And there&apos;s no easy way
            to tell the difference — until now.
          </p>
          <p>
            BetterBench doesn&apos;t propose one benchmark to rule them all. Different
            benchmarks serve different purposes. What we propose is a way to{" "}
            <strong className="text-accent">evaluate the evaluators</strong> — a
            transparent framework for assessing the quality of AI benchmarks
            themselves.
          </p>
        </section>

        {/* The Landscape */}
        <section className="space-y-4">
          <h2 className="font-serif italic text-2xl tracking-tight border-b border-border pb-2">
            How AI Benchmarks Actually Work
          </h2>
          <div className="text-sm leading-relaxed text-foreground/90 space-y-4">
            <p>
              Since computers were invented, people have thought hard about ways to
              test their abilities. Alan Turing&apos;s test in the 1950s measured the
              ability to <em>convince</em> — people had to judge if they were talking to
              a machine or a human. Today, with generative AI models advancing and
              diversifying daily, there is a growing need to compare and classify models
              and tools.
            </p>
            <p>
              Several LLM benchmarks have been created by research groups, universities,
              tech companies, and open-source communities. They vary enormously in
              methodology and have become more sophisticated and specialized over time.
              Here are the main approaches:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
              {[
                {
                  title: "Human Preference / Arena",
                  desc: "Users compare two anonymous models side-by-side, voting on the best response. Creates Elo ratings based on subjective quality. (e.g., LMArena)",
                },
                {
                  title: "Automated Benchmarks",
                  desc: "Models tested on standardized datasets for specific capabilities: reasoning, coding, math, language understanding. (e.g., MMLU, HellaSwag)",
                },
                {
                  title: "Specialized Domain Evaluation",
                  desc: "Focused on high-stakes domains like safety, prediction, or trust. Tests capabilities that general benchmarks miss. (e.g., TrustLLM, ProphetArena)",
                },
                {
                  title: "Agent Testing",
                  desc: "Tests AI agents on multi-step real-world tasks: fixing code, navigating websites, completing workflows. (e.g., SWE-Bench, WebArena)",
                },
              ].map((m) => (
                <div
                  key={m.title}
                  className="border border-border rounded-lg p-4 bg-surface"
                >
                  <h4 className="text-sm font-semibold text-foreground mb-1">
                    {m.title}
                  </h4>
                  <p className="text-xs text-muted leading-relaxed">{m.desc}</p>
                </div>
              ))}
            </div>

            <p>
              Ranking systems also vary: Elo ratings (paired comparisons, like chess),
              Bradley-Terry models (win-loss analysis), confidence intervals (grouping
              by statistical tiers), and raw metric scores. Each produces a different
              perspective on model performance.
            </p>
          </div>
        </section>

        {/* Academic Foundation */}
        <section className="space-y-4">
          <h2 className="font-serif italic text-2xl tracking-tight border-b border-border pb-2">
            The Academic Case for Evaluating Evaluators
          </h2>
          <div className="text-sm leading-relaxed text-foreground/90 space-y-4">
            <p>
              This isn&apos;t just our opinion. A growing body of interdisciplinary
              research has documented systemic problems with AI benchmarks. A{" "}
              <a
                href="https://arxiv.org/html/2502.06559v2"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline underline-offset-2 hover:text-muted"
              >
                2025 meta-review of ~100 studies
              </a>{" "}
              found nine categories of benchmark failures, from data contamination
              to misaligned incentives to construct validity issues. More than half
              the critical papers were published in 2023 or later — the urgency is
              accelerating.
            </p>
            <p>
              Key findings from the research:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted">
              <li>
                Only <strong className="text-foreground">4 of 24</strong> SOTA language model
                benchmarks provided scripts to replicate results (Reuel et al., 2024)
              </li>
              <li>
                Only <strong className="text-foreground">9 of 30</strong> analyzed models
                reported train-test data overlap (Zhang et al., 2024)
              </li>
              <li>
                Many benchmarks suffer from <strong className="text-foreground">construct validity
                issues</strong> — they &ldquo;do not measure what they claim to measure&rdquo;
                (Raji et al., 2021)
              </li>
              <li>
                AI models can be programmed to <strong className="text-foreground">strategically
                underperform</strong> on safety evaluations — a problem called
                &ldquo;sandbagging&rdquo; (Weij et al., 2024)
              </li>
              <li>
                Safety benchmarks <strong className="text-foreground">correlate with upstream
                capabilities</strong>, enabling &ldquo;safetywashing&rdquo; — where capability
                improvements are misrepresented as safety advances (Ren et al., 2024)
              </li>
              <li>
                Benchmarks are deeply embedded in <strong className="text-foreground">corporate
                marketing strategies</strong> and competitive dynamics that &ldquo;prioritise
                SOTA performance at the expense of broader societal concerns&rdquo;
                (Orr &amp; Kang, 2024)
              </li>
            </ul>
            <p>
              As the researchers conclude: &ldquo;AI benchmarks need to be subjected to
              the same demands concerning transparency, fairness, and explainability as
              algorithmic systems and AI models writ large.&rdquo; That&apos;s what
              BetterBench aims to do.
            </p>
          </div>
        </section>

        {/* The Problem */}
        <section className="space-y-4">
          <h2 className="font-serif italic text-2xl tracking-tight border-b border-border pb-2">
            The Problem in Practice
          </h2>
          <div className="text-sm leading-relaxed text-foreground/90 space-y-4">
            <p>
              The most widely cited leaderboard in AI — LMArena (formerly Chatbot
              Arena) — illustrates the problem perfectly.{" "}
              <a
                href="https://surgehq.ai/blog/lmarena-is-a-plague-on-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline underline-offset-2 hover:text-muted"
              >
                Surge AI&apos;s analysis
              </a>{" "}
              found that 52% of voter choices were questionable, with users
              consistently rewarding verbosity, bold formatting, and emojis over
              factual accuracy.
            </p>

            <blockquote className="border-l-2 border-foreground pl-4 py-2 text-muted italic">
              &ldquo;The easiest way to climb the leaderboard isn&apos;t to be smarter;
              it&apos;s to hack human attention span.&rdquo;
              <span className="block text-xs mt-1 not-italic">— Surge AI</span>
            </blockquote>

            <p>
              Meta literally tuned a variant of Maverick specifically to dominate
              LMArena — with bold text, emojis, and sycophancy. When asked
              &ldquo;what time is it?&rdquo;, the tuned model produced paragraphs of
              formatted text to avoid answering the question.
            </p>
            <p>
              Static benchmarks like MMLU face a different problem: data contamination.
              Narayanan &amp; Kapoor (2023) showed GPT-4 could solve coding competition
              problems from before its training cutoff but scored zero on problems
              added after — strong evidence of memorization rather than reasoning.
              Zhang et al. (2024) found that only 9 of 30 models even reported
              train-test overlap. As Goodhart&apos;s law predicts: &ldquo;when a
              measure becomes a target, it ceases to be a good measure&rdquo;
              (Strathern, 1997).
            </p>
            <p>
              As{" "}
              <a
                href="https://www.sandraherz.com/ai-leaderboards/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline underline-offset-2 hover:text-muted"
              >
                Sandra Herz
              </a>{" "}
              puts it: &ldquo;The way we measure AI says as much about us as it does
              about the models.&rdquo;
            </p>
          </div>
        </section>

        {/* Our Framework */}
        <section className="space-y-4">
          <h2 className="font-serif italic text-2xl tracking-tight border-b border-border pb-2">
            Our Framework: 6 Criteria
          </h2>
          <p className="text-sm text-foreground/90 leading-relaxed">
            We score every benchmark on 6 dimensions, each rated 1-5. The average
            converts to a letter grade (A through F). Here&apos;s what we look for:
          </p>

          <div className="space-y-4 mt-4">
            {[
              {
                name: "Transparency",
                score: "1-5",
                what: "Is the methodology fully documented and reproducible? Is data and code open source? Can independent researchers verify the results?",
                good: "Full open-source methodology, public datasets, reproducible results (ARC-AGI, MMLU)",
                bad: "Proprietary methodology, no access to test data, \"trust us\" scoring",
              },
              {
                name: "Methodological Rigor",
                score: "1-5",
                what: "Statistical validity, sample size, confidence intervals, contamination controls. Does the benchmark actually measure what it claims to measure?",
                good: "Large sample sizes, contamination monitoring, confidence intervals, regularly validated (LiveBench)",
                bad: "Small test sets, no contamination checks, single-run scores presented as definitive",
              },
              {
                name: "Resistance to Gaming",
                score: "1-5",
                what: "How hard is it for model makers to artificially inflate scores? Can you optimize for style over substance? Is the test set public and memorizable?",
                good: "Dynamic/rotating questions, anti-contamination controls, resistant to style hacking (ARC-AGI, LiveBench)",
                bad: "Static public dataset widely in training data, rewards formatting over accuracy (MMLU, LMArena)",
              },
              {
                name: "Evaluator Quality",
                score: "1-5",
                what: "Who or what does the evaluation? Expert humans, uncontrolled crowd workers, automated metrics? What quality controls exist?",
                good: "Objective automated evaluation with clear ground truth — code passes tests or doesn't (SWE-Bench, HumanEval)",
                bad: "Uncontrolled internet volunteers with no incentive for accuracy, no quality filtering (LMArena)",
              },
              {
                name: "Real-World Signal",
                score: "1-5",
                what: "Does performance on this benchmark predict actual usefulness? Does it test tasks people actually do, in realistic formats?",
                good: "Tests real multi-step tasks in realistic formats (SWE-Bench tests real GitHub issues, ProphetArena resolves against reality)",
                bad: "Multiple-choice trivia that no one does in real life, abstract tasks with no clear practical application",
              },
              {
                name: "Freshness",
                score: "1-5",
                what: "How often is the benchmark updated? Do questions rotate to prevent contamination? Does it reflect current models?",
                good: "Continuously updated, regular question rotation, tracks current frontier models (LiveBench, Artificial Analysis)",
                bad: "Static dataset from 2021 testing 2026 models, no updates, saturated scores (MMLU, HellaSwag, HumanEval)",
              },
            ].map((c) => (
              <div
                key={c.name}
                className="border border-border rounded-lg p-5 bg-surface"
              >
                <h3 className="font-semibold text-foreground mb-2">{c.name}</h3>
                <p className="text-sm text-muted leading-relaxed mb-3">{c.what}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-emerald-600 font-mono">GOOD →</span>
                    <p className="text-muted mt-1 leading-relaxed">{c.good}</p>
                  </div>
                  <div>
                    <span className="text-red-600 font-mono">BAD →</span>
                    <p className="text-muted mt-1 leading-relaxed">{c.bad}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Popularity */}
        <section className="space-y-4">
          <h2 className="font-serif italic text-2xl tracking-tight border-b border-border pb-2">
            Popularity: The Unscored Metric
          </h2>
          <div className="text-sm leading-relaxed text-foreground/90 space-y-4">
            <p>
              We also track how often each benchmark is cited in frontier model press
              releases and announcements. This is descriptive, not evaluative — it
              tells you what the industry uses, not whether it&apos;s good.
            </p>
            <p>
              A benchmark can be hugely popular and deeply flawed (LMArena), or
              obscure and excellent (ProphetArena). Popularity is useful context, but
              it&apos;s not a quality signal.
            </p>
          </div>
        </section>

        {/* Grading */}
        <section className="space-y-4">
          <h2 className="font-serif italic text-2xl tracking-tight border-b border-border pb-2">
            How We Grade
          </h2>
          <div className="text-sm leading-relaxed text-foreground/90 space-y-4">
            <p>
              Each benchmark is scored 1-5 on all 6 criteria. The scores are averaged
              and converted to a letter grade:
            </p>
            <div className="grid grid-cols-5 gap-2 my-4 text-center">
              {[
                { grade: "A", range: "4.5-5.0", color: "text-emerald-600 border-emerald-200 bg-emerald-50" },
                { grade: "B", range: "3.5-4.4", color: "text-sky-600 border-sky-200 bg-sky-50" },
                { grade: "C", range: "2.5-3.4", color: "text-amber-600 border-amber-200 bg-amber-50" },
                { grade: "D", range: "1.5-2.4", color: "text-orange-600 border-orange-200 bg-orange-50" },
                { grade: "F", range: "1.0-1.4", color: "text-red-600 border-red-200 bg-red-50" },
              ].map((g) => (
                <div
                  key={g.grade}
                  className={`rounded-lg border p-3 font-mono ${g.color}`}
                >
                  <div className="text-2xl font-bold">{g.grade}</div>
                  <div className="text-xs mt-1 opacity-70">{g.range}</div>
                </div>
              ))}
            </div>
            <p>
              Scores are editorial — based on our analysis of each benchmark&apos;s
              methodology, track record, and community reception. We show our reasoning
              for every score. If you disagree, vote on it — that&apos;s what the
              voting feature is for.
            </p>
          </div>
        </section>

        {/* Voting */}
        <section className="space-y-4">
          <h2 className="font-serif italic text-2xl tracking-tight border-b border-border pb-2">
            How to Participate
          </h2>
          <div className="text-sm leading-relaxed text-foreground/90 space-y-4">
            <p>
              <strong>Vote:</strong> On the rankings page, each benchmark has upvote
              and downvote buttons. Upvote if you think our score is fair. Downvote
              if you think we got it wrong. Votes are anonymous and help us calibrate.
            </p>
            <p>
              <strong>Submit:</strong> Know a benchmark we&apos;re missing?{" "}
              <Link href="/submit" className="text-foreground underline underline-offset-2 hover:text-muted">
                Submit it for review
              </Link>
              . We&apos;ll evaluate it against our 6 criteria and add it to the
              rankings.
            </p>
            <p>
              This is v0.1. Scores will evolve as we get community input, benchmarks
              update their methodologies, and new ones emerge. The goal isn&apos;t to be
              the final word — it&apos;s to start the conversation.
            </p>
          </div>
        </section>

        {/* Conclusion */}
        <section className="space-y-4">
          <h2 className="font-serif italic text-2xl tracking-tight border-b border-border pb-2">
            Why This Matters
          </h2>
          <div className="text-sm leading-relaxed text-foreground/90 space-y-4">
            <p>
              Benchmarks aren&apos;t going away — they&apos;re too useful for labs,
              investors, and users. But uncritical acceptance of leaderboard rankings
              is actively making AI worse. When the entire industry optimizes for a
              metric that rewards &ldquo;hallucination-plus-formatting&rdquo; over
              accuracy, we get models optimized for hallucination-plus-formatting.
            </p>
            <p>
              AI literacy means knowing which benchmarks to trust. It means
              understanding the difference between a benchmark that tests genuine
              capability and one that rewards gaming. As Sandra Herz writes:
              &ldquo;Stay informed, stay reflective, and above all, stay naturally
              human.&rdquo;
            </p>
            <p className="text-muted italic">
              What would we benchmark if the goal was not just smarter models, but a
              better future?
            </p>
          </div>
        </section>

        {/* Citations */}
        <section className="border-t border-border pt-6">
          <h3 className="text-sm font-semibold text-muted mb-3">Sources</h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-xs font-semibold text-foreground/70 mb-2 uppercase tracking-wider">Academic Research</h4>
              <ul className="text-xs text-muted space-y-1.5">
                <li>Raji et al. (2021), &ldquo;AI and the Everything in the Whole Wide World Benchmark&rdquo; — NeurIPS Datasets &amp; Benchmarks</li>
                <li>Reuel et al. (2024), &ldquo;Betterbench: Assessing AI Benchmarks, Uncovering Issues, and Establishing Best Practices&rdquo; — NeurIPS Datasets &amp; Benchmarks</li>
                <li>
                  Interdisciplinary meta-review of ~100 studies on benchmark shortcomings (2025) —{" "}
                  <a href="https://arxiv.org/html/2502.06559v2" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2 hover:text-muted">arxiv.org</a>
                </li>
                <li>Ren et al. (2024), &ldquo;Safetywashing: Do AI Safety Benchmarks Actually Measure Safety Progress?&rdquo; — NeurIPS</li>
                <li>Zhang et al. (2024), &ldquo;Language Model Developers Should Report Train-Test Overlap&rdquo;</li>
                <li>Xu et al. (2024), &ldquo;Benchmark Data Contamination of Large Language Models: A Survey&rdquo;</li>
                <li>Weij et al. (2024), &ldquo;AI Sandbagging: Language Models Can Strategically Underperform on Evaluations&rdquo;</li>
                <li>Narayanan &amp; Kapoor (2023), &ldquo;GPT-4 and Professional Benchmarks: The Wrong Answer to the Wrong Question&rdquo; — AI Snake Oil</li>
                <li>Alzahrani et al. (2024), &ldquo;When Benchmarks Are Targets: Revealing the Sensitivity of LLM Leaderboards&rdquo;</li>
                <li>Gema et al. (2024), &ldquo;Are We Done with MMLU?&rdquo;</li>
                <li>Biderman et al. (2024), &ldquo;Lessons from the Trenches on Reproducible Evaluation of Language Models&rdquo;</li>
                <li>Koch et al. (2021), &ldquo;Reduced, Reused and Recycled: The Life of a Dataset in Machine Learning Research&rdquo;</li>
                <li>Ott et al. (2022), &ldquo;Mapping Global Dynamics of Benchmark Creation and Saturation&rdquo; — Nature Communications</li>
                <li>Orr &amp; Kang (2024), &ldquo;AI as a Sport: On the Competitive Epistemologies of Benchmarking&rdquo; — ACM FAccT</li>
                <li>Hutchinson et al. (2022), &ldquo;Evaluation Gaps in Machine Learning Practice&rdquo; — ACM FAccT</li>
                <li>Chollet (2019), &ldquo;On the Measure of Intelligence&rdquo;</li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-foreground/70 mb-2 uppercase tracking-wider">Industry &amp; Commentary</h4>
              <ul className="text-xs text-muted space-y-1.5">
                <li>
                  Sandra Herz, &ldquo;The Leaderboard Race: How We Measure AI and Why It Matters to All of Us&rdquo; —{" "}
                  <a href="https://www.sandraherz.com/ai-leaderboards/" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2 hover:text-muted">sandraherz.com</a>
                </li>
                <li>
                  Surge AI, &ldquo;LMArena is a cancer on AI&rdquo; —{" "}
                  <a href="https://surgehq.ai/blog/lmarena-is-a-plague-on-ai" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2 hover:text-muted">surgehq.ai</a>
                </li>
                <li>
                  Keegan (2024), &ldquo;Everyone Is Judging AI by These Tests. But Experts Say They&apos;re Close to Meaningless&rdquo; —{" "}
                  <a href="https://themarkup.org/artificial-intelligence/2024/07/17/everyone-is-judging-ai-by-these-tests-but-experts-say-theyre-close-to-meaningless" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2 hover:text-muted">The Markup</a>
                </li>
                <li>
                  Roose (2024), &ldquo;A.I. Has a Measurement Problem&rdquo; —{" "}
                  <a href="https://www.nytimes.com/2024/04/15/technology/ai-models-measurement.html" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2 hover:text-muted">New York Times</a>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </article>
    </div>
  );
}
