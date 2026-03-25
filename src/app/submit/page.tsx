"use client";

import { useState } from "react";
import Link from "next/link";

export default function Submit() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    benchmarkName: "",
    url: "",
    description: "",
    whyInclude: "",
    submitterEmail: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // MVP: store in localStorage and show confirmation
    // Future: send to Formspree or backend
    const submissions = JSON.parse(
      localStorage.getItem("betterbench-submissions") || "[]"
    );
    submissions.push({ ...formData, submittedAt: new Date().toISOString() });
    localStorage.setItem("betterbench-submissions", JSON.stringify(submissions));
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto px-4 sm:px-6 py-24 text-center">
        <div className="text-4xl mb-4">&#10003;</div>
        <h1 className="text-2xl font-bold tracking-tight mb-2">
          Benchmark submitted
        </h1>
        <p className="text-muted text-sm mb-6">
          We&apos;ll review it against our 6 criteria and add it to the rankings if
          it qualifies. Thanks for helping make AI evaluation better.
        </p>
        <Link
          href="/"
          className="text-sm px-4 py-2 rounded border border-accent text-accent hover:bg-accent-dim transition-colors"
        >
          Back to rankings
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 py-12">
      <Link
        href="/"
        className="text-xs text-muted hover:text-foreground transition-colors mb-8 inline-block"
      >
        ← Back to rankings
      </Link>

      <h1 className="text-2xl font-bold tracking-tight mb-2">
        Submit a Benchmark
      </h1>
      <p className="text-muted text-sm mb-8">
        Know a benchmark or leaderboard we&apos;re missing? Submit it for review.
        We&apos;ll evaluate it against our{" "}
        <Link href="/methodology" className="text-accent hover:underline">
          6 criteria
        </Link>{" "}
        and add it to the rankings.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium mb-1.5">
            Benchmark / Leaderboard Name
          </label>
          <input
            type="text"
            required
            value={formData.benchmarkName}
            onChange={(e) =>
              setFormData({ ...formData, benchmarkName: e.target.value })
            }
            placeholder="e.g., SWE-Bench, LMArena, GPQA"
            className="w-full px-3 py-2 rounded border border-border bg-surface text-foreground text-sm placeholder:text-muted/50 focus:outline-none focus:border-accent transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">URL</label>
          <input
            type="url"
            required
            value={formData.url}
            onChange={(e) =>
              setFormData({ ...formData, url: e.target.value })
            }
            placeholder="https://..."
            className="w-full px-3 py-2 rounded border border-border bg-surface text-foreground text-sm placeholder:text-muted/50 focus:outline-none focus:border-accent transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">
            Description
          </label>
          <textarea
            required
            rows={3}
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="What does this benchmark measure? Who runs it? What methodology does it use?"
            className="w-full px-3 py-2 rounded border border-border bg-surface text-foreground text-sm placeholder:text-muted/50 focus:outline-none focus:border-accent transition-colors resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">
            Why should it be included?
          </label>
          <textarea
            required
            rows={3}
            value={formData.whyInclude}
            onChange={(e) =>
              setFormData({ ...formData, whyInclude: e.target.value })
            }
            placeholder="Why is this benchmark noteworthy? What gap does it fill? Any known strengths or weaknesses?"
            className="w-full px-3 py-2 rounded border border-border bg-surface text-foreground text-sm placeholder:text-muted/50 focus:outline-none focus:border-accent transition-colors resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">
            Your email <span className="text-muted">(optional)</span>
          </label>
          <input
            type="email"
            value={formData.submitterEmail}
            onChange={(e) =>
              setFormData({ ...formData, submitterEmail: e.target.value })
            }
            placeholder="In case we have questions"
            className="w-full px-3 py-2 rounded border border-border bg-surface text-foreground text-sm placeholder:text-muted/50 focus:outline-none focus:border-accent transition-colors"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2.5 rounded border border-accent text-accent font-medium text-sm hover:bg-accent-dim transition-colors cursor-pointer"
        >
          Submit for review
        </button>
      </form>
    </div>
  );
}
