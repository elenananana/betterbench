import BenchmarkTable from "@/components/BenchmarkTable";
import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      {/* Hero */}
      <div className="mb-14">
        <h1 className="text-4xl sm:text-5xl tracking-tight mb-4 font-semibold">
          <span className="text-foreground">Leaderboard</span>{" "}
          <span className="text-muted">Leaderboard</span>
        </h1>
        <p className="text-muted text-base sm:text-lg max-w-2xl leading-relaxed">
          AI benchmarks and leaderboards shape which models get funding, adoption, and
          your attention. We score them across 6 quality criteria so you know which
          rankings to trust.
        </p>
        <div className="flex gap-3 mt-6">
          <Link
            href="/methodology"
            className="text-sm px-5 py-2.5 rounded-md bg-foreground text-background font-medium hover:bg-foreground/85 transition-colors"
          >
            Read our methodology
          </Link>
          <Link
            href="/submit"
            className="text-sm px-5 py-2.5 rounded-md border border-border text-muted hover:text-foreground hover:border-foreground/30 transition-colors"
          >
            Submit a benchmark
          </Link>
        </div>
        <p className="text-xs text-muted mt-3">
          Note: evaluations are AI generated, may include errors.
        </p>
      </div>

      {/* Table */}
      <BenchmarkTable />
    </div>
  );
}
