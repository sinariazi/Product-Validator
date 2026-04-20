"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { ResultsGrid, type AnalysisResult } from "@/components/results-grid";
import { AnalyzingLoader } from "@/components/analyzing-loader";
import { GrantCTABanner } from "@/components/grant-cta-banner";

const MAX_CHARS = 1000;

export function ValidatorForm() {
  const [idea, setIdea] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!idea.trim() || loading) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }

      setResult(data);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleRegenerate() {
    handleSubmit(new Event("submit") as unknown as React.FormEvent);
  }

  const charCount = idea.length;
  const isOverLimit = charCount > MAX_CHARS;

  return (
    <div className="flex w-full flex-col gap-8">
      {/* Input Section */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          {/* Example prompt button */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={loading}
              onClick={() =>
                setIdea(
                  "Build an AI-powered study planner for parents to track and optimize their children's learning progress"
                )
              }
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-secondary px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:bg-accent hover:text-foreground disabled:opacity-50"
            >
              <span className="text-primary">&#9654;</span>
              Try example: AI study planner for parents
            </button>
          </div>

          <div className="relative">
            <textarea
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder="Describe your product idea in detail…"
              rows={6}
              maxLength={MAX_CHARS + 100}
              disabled={loading}
              className="w-full resize-none rounded-xl border border-border bg-input px-4 py-3 text-sm text-foreground shadow-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25 disabled:opacity-60 transition-colors"
            />
          </div>
          <div className="flex items-center justify-between px-1">
            <span
              className={`text-xs ${
                isOverLimit ? "text-destructive" : "text-muted-foreground"
              }`}
            >
              {charCount} / {MAX_CHARS} characters
            </span>
            <div className="flex items-center gap-3">
              {isOverLimit && (
                <span className="text-xs text-destructive">
                  Please keep your idea under {MAX_CHARS} characters
                </span>
              )}
              {idea && !loading && (
                <button
                  type="button"
                  onClick={() => setIdea("")}
                  className="text-xs text-muted-foreground underline-offset-2 hover:text-foreground hover:underline transition-colors"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button
            type="submit"
            disabled={loading || !idea.trim() || isOverLimit}
            className="w-full sm:w-auto sm:min-w-36"
            size="lg"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Spinner size="sm" />
                Analyzing...
              </span>
            ) : (
              "Analyze Idea"
            )}
          </Button>

          {result && !loading && (
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={handleRegenerate}
              className="w-full sm:w-auto"
            >
              Regenerate
            </Button>
          )}
        </div>
      </form>

      {/* Loading animation */}
      {loading && (
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <AnalyzingLoader />
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      {/* Results */}
      {result && !loading && (
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Analysis Results
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>
          <ResultsGrid result={result} />

          {/* Grant CTA */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-border" />
              <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Ready to take it further?
              </span>
              <div className="h-px flex-1 bg-border" />
            </div>
            <GrantCTABanner />
          </div>
        </div>
      )}
    </div>
  );
}
