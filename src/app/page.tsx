import BenchmarkTable from "@/components/BenchmarkTable";
import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      {/* Hero */}
      <div className="mb-14">
        <h1 className="font-serif italic text-4xl sm:text-5xl tracking-tight mb-4">
          Not all benchmarks are{" "}
          <span className="underline decoration-1 underline-offset-4">created equal.</span>
        </h1>
        <p className="text-muted text-base sm:text-lg max-w-2xl leading-relaxed">
          AI benchmarks and leaderboards shape which models get funding, adoption, and
          your attention. But who evaluates the evaluators? We score them across 6 quality
          criteria so you know which rankings to trust.
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
      </div>

      {/* Table */}
      <BenchmarkTable />
    </div>
  );
}
