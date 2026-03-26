"use client";

import { useState, useEffect } from "react";
import {
  benchmarks,
  CRITERIA,
  getGrade,
  getAverage,
  getGradeColor,
  getGradeBg,
  getScoreColor,
  type Benchmark,
} from "@/data/benchmarks";

type SortKey = "grade" | "transparency" | "rigor" | "gaming_resistance" | "evaluator_quality" | "real_world_signal" | "freshness";

const VOTER_KEY = "betterbench-voter";

interface VoterProfile {
  email: string;
  background: string;
  registeredAt: string;
}

function getVoterProfile(): VoterProfile | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(VOTER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function VoterRegistrationModal({ onComplete, onClose }: { onComplete: () => void; onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [background, setBackground] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !background.trim()) {
      setError("Both fields are required.");
      return;
    }
    const profile: VoterProfile = {
      email: email.trim(),
      background: background.trim(),
      registeredAt: new Date().toISOString(),
    };
    localStorage.setItem(VOTER_KEY, JSON.stringify(profile));
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-md mx-4 border border-border rounded-lg bg-surface p-6 shadow-xl">
        <h3 className="font-serif italic text-xl mb-1">Register to vote</h3>
        <p className="text-sm text-muted mb-5">
          To keep votes meaningful, we ask for a bit of context. Your info is stored locally and never shared.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(""); }}
              placeholder="you@example.com"
              className="w-full px-3 py-2 rounded border border-border bg-surface text-foreground text-sm placeholder:text-muted/50 focus:outline-none focus:border-accent transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Background</label>
            <select
              required
              value={background}
              onChange={(e) => { setBackground(e.target.value); setError(""); }}
              className="w-full px-3 py-2 rounded border border-border bg-surface text-foreground text-sm focus:outline-none focus:border-accent transition-colors"
            >
              <option value="">Select your background</option>
              <option value="ML/AI Researcher">ML/AI Researcher</option>
              <option value="ML/AI Engineer">ML/AI Engineer</option>
              <option value="Software Engineer">Software Engineer</option>
              <option value="Product Manager">Product Manager</option>
              <option value="Data Scientist">Data Scientist</option>
              <option value="Student">Student</option>
              <option value="Journalist / Analyst">Journalist / Analyst</option>
              <option value="Executive / Decision Maker">Executive / Decision Maker</option>
              <option value="Other">Other</option>
            </select>
          </div>
          {error && <p className="text-xs text-red-600">{error}</p>}
          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 py-2 rounded-md bg-foreground text-background font-medium text-sm hover:bg-foreground/85 transition-colors cursor-pointer"
            >
              Register & vote
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded border border-border text-muted text-sm hover:text-foreground hover:border-foreground/30 transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function VoteButtons({ id, onRequireRegistration }: { id: string; onRequireRegistration: () => void }) {
  const storageKey = `betterbench-vote-${id}`;

  const getStored = () => {
    if (typeof window === "undefined") return { up: 0, down: 0, voted: null };
    try {
      const raw = localStorage.getItem(storageKey);
      return raw ? JSON.parse(raw) : { up: 0, down: 0, voted: null };
    } catch {
      return { up: 0, down: 0, voted: null };
    }
  };

  const [state, setState] = useState(getStored);

  const vote = (dir: "up" | "down") => {
    if (!getVoterProfile()) {
      onRequireRegistration();
      return;
    }
    const next = { ...state };
    if (state.voted === dir) {
      next[dir]--;
      next.voted = null;
    } else {
      if (state.voted) next[state.voted]--;
      next[dir]++;
      next.voted = dir;
    }
    setState(next);
    localStorage.setItem(storageKey, JSON.stringify(next));
  };

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() => vote("up")}
        className={`px-1.5 py-0.5 rounded text-xs transition-colors cursor-pointer ${
          state.voted === "up"
            ? "bg-emerald-100 text-emerald-700"
            : "text-muted hover:text-emerald-700 hover:bg-emerald-50"
        }`}
        title="Score is fair"
      >
        ▲ {state.up > 0 ? state.up : ""}
      </button>
      <button
        onClick={() => vote("down")}
        className={`px-1.5 py-0.5 rounded text-xs transition-colors cursor-pointer ${
          state.voted === "down"
            ? "bg-red-100 text-red-700"
            : "text-muted hover:text-red-700 hover:bg-red-50"
        }`}
        title="Score is unfair"
      >
        ▼ {state.down > 0 ? state.down : ""}
      </button>
    </div>
  );
}

function ScoreCell({ score }: { score: number }) {
  return (
    <td className="px-3 py-3 text-center">
      <span className={`font-mono text-sm ${getScoreColor(score)}`}>
        {score}
      </span>
      <div className="mt-1 h-1 w-full bg-border rounded-full overflow-hidden">
        <div
          className={`score-bar h-full rounded-full ${
            score >= 4 ? "bg-emerald-500" : score >= 3 ? "bg-amber-400" : "bg-red-400"
          }`}
          style={{ width: `${(score / 5) * 100}%` }}
        />
      </div>
    </td>
  );
}

function ExpandedRow({ benchmark }: { benchmark: Benchmark }) {
  const grade = getGrade(benchmark.scores);
  return (
    <tr className="bg-surface/50">
      <td colSpan={9} className="px-4 py-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-1">
              About
            </h4>
            <p className="text-sm text-muted leading-relaxed">
              {benchmark.description}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="text-xs px-2 py-0.5 rounded-full bg-border text-muted">
                {benchmark.method}
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-border text-muted">
                {benchmark.category}
              </span>
            </div>
            <a
              href={benchmark.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-3 text-xs text-accent hover:underline"
            >
              Visit benchmark →
            </a>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-1">
              Why grade {grade}?
            </h4>
            <p className="text-sm text-muted leading-relaxed">
              {benchmark.rationale}
            </p>
            <h4 className="text-sm font-semibold text-foreground mt-3 mb-1">
              Popularity
            </h4>
            <p className="text-sm text-muted leading-relaxed">
              {benchmark.popularity_note}
            </p>
          </div>
        </div>
      </td>
    </tr>
  );
}

export default function BenchmarkTable() {
  const [sortKey, setSortKey] = useState<SortKey>("grade");
  const [sortAsc, setSortAsc] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [showRegistration, setShowRegistration] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    setIsRegistered(!!getVoterProfile());
  }, []);

  const categories = ["all", ...Array.from(new Set(benchmarks.map((b) => b.category)))];

  const filtered = categoryFilter === "all"
    ? benchmarks
    : benchmarks.filter((b) => b.category === categoryFilter);

  const sorted = [...filtered].sort((a, b) => {
    let aVal: number, bVal: number;
    if (sortKey === "grade") {
      aVal = getAverage(a.scores);
      bVal = getAverage(b.scores);
    } else {
      aVal = a.scores[sortKey];
      bVal = b.scores[sortKey];
    }
    return sortAsc ? aVal - bVal : bVal - aVal;
  });

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(false);
    }
  };

  const SortHeader = ({ k, label, title }: { k: SortKey; label: string; title: string }) => (
    <th
      className="px-3 py-3 text-xs font-mono text-muted cursor-pointer hover:text-foreground transition-colors select-none"
      onClick={() => handleSort(k)}
      title={title}
    >
      <span className="inline-flex items-center gap-1">
        {label}
        {sortKey === k && (
          <span className="text-accent">{sortAsc ? "↑" : "↓"}</span>
        )}
      </span>
    </th>
  );

  return (
    <div>
      {showRegistration && (
        <VoterRegistrationModal
          onComplete={() => {
            setShowRegistration(false);
            setIsRegistered(true);
          }}
          onClose={() => setShowRegistration(false)}
        />
      )}

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`px-3 py-1 text-xs rounded-full border transition-colors cursor-pointer ${
              categoryFilter === cat
                ? "border-accent text-accent bg-accent-dim"
                : "border-border text-muted hover:text-foreground hover:border-foreground/30"
            }`}
          >
            {cat === "all" ? "All" : cat}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-border rounded-lg">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-border bg-surface">
              <th className="px-4 py-3 text-xs font-mono text-muted w-8">#</th>
              <SortHeader k="grade" label="BENCHMARK" title="Sort by overall grade" />
              {CRITERIA.map((c) => (
                <SortHeader key={c.key} k={c.key} label={c.short} title={`${c.label}: ${c.description}`} />
              ))}
              <th className="px-3 py-3 text-xs font-mono text-muted text-center">
                GRADE
              </th>
              <th className="px-3 py-3 text-xs font-mono text-muted text-center">
                VOTE
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((b, i) => {
              const grade = getGrade(b.scores);
              const isExpanded = expanded === b.id;
              return (
                <>
                  <tr
                    key={b.id}
                    className={`border-b border-border/50 cursor-pointer transition-colors ${
                      isExpanded ? "bg-surface" : "hover:bg-surface-hover"
                    }`}
                    onClick={() => setExpanded(isExpanded ? null : b.id)}
                  >
                    <td className="px-4 py-3 text-xs text-muted font-mono">
                      {i + 1}
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-foreground">
                          {b.name}
                        </span>
                        <span className="text-xs text-muted mt-0.5">
                          {b.category}
                        </span>
                      </div>
                    </td>
                    <ScoreCell score={b.scores.transparency} />
                    <ScoreCell score={b.scores.rigor} />
                    <ScoreCell score={b.scores.gaming_resistance} />
                    <ScoreCell score={b.scores.evaluator_quality} />
                    <ScoreCell score={b.scores.real_world_signal} />
                    <ScoreCell score={b.scores.freshness} />
                    <td className="px-3 py-3 text-center">
                      <span
                        className={`inline-flex items-center justify-center w-8 h-8 rounded border font-mono font-bold text-sm ${getGradeColor(grade)} ${getGradeBg(grade)}`}
                      >
                        {grade}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-center" onClick={(e) => e.stopPropagation()}>
                      <VoteButtons id={b.id} onRequireRegistration={() => setShowRegistration(true)} />
                    </td>
                  </tr>
                  {isExpanded && <ExpandedRow key={`${b.id}-exp`} benchmark={b} />}
                </>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-muted mt-3">
        Click any row to see scoring rationale. Hover column headers for criteria descriptions. Scores are editorial — vote if you agree or disagree.
      </p>
    </div>
  );
}
