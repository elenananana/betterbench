import BenchmarkTable from "@/components/BenchmarkTable";
import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      {/* Hero */}
      <div className="mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
          Not all benchmarks are{" "}
          <span className="text-accent">created equal.</span>
        </h1>
        <p className="text-muted text-base sm:text-lg max-w-2xl leading-relaxed">
          AI benchmarks and leaderboards shape which models get funding, adoption, and
          your attention. But who evaluates the evaluators? We score them across 6 quality
          criteria so you know which rankings to trust.
        </p>
        <div className="flex gap-3 mt-5">
          <Link
            href="/methodology"
            className="text-sm px-4 py-2 rounded border border-accent text-accent hover:bg-accent-dim transition-colors"
          >
            Read our methodology
          </Link>
          <Link
            href="/submit"
            className="text-sm px-4 py-2 rounded border border-border text-muted hover:text-foreground hover:border-foreground/30 transition-colors"
          >
            Submit a benchmark
          </Link>
        </div>
      </div>

      {/* Table */}
      <BenchmarkTable />
    </div>
  );
}
