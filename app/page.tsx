import { ValidatorForm } from "@/components/validator-form";
import { Lightbulb, BarChart2, ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans">
      {/* Top announcement bar */}
      <div className="border-b border-border/60 bg-primary/10 py-2 text-center text-xs font-medium text-primary">
        Free-tier AI &mdash; for demonstration purposes only. Responses may occasionally be slow.
      </div>

      <main className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:py-20">

        {/* Hero */}
        <div className="mb-12 flex flex-col items-center gap-4 text-center">
          <span className="inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
            AI-Powered Validation
          </span>

          <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Product Validator
          </h1>

          <p className="max-w-lg text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            Describe your idea in plain language and our AI performs a structured,
            multi-dimensional analysis — problem fit, target users, MVP scope,
            core features, risks, and a clear recommendation.
          </p>

          {/* Three value pills */}
          <div className="mt-2 flex flex-wrap justify-center gap-3">
            {[
              { icon: Lightbulb, label: "Idea Clarity" },
              { icon: BarChart2, label: "Market Fit Assessment" },
              { icon: ShieldCheck, label: "Risk Analysis" },
            ].map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary px-3 py-1.5 text-xs font-medium text-muted-foreground"
              >
                <Icon className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                {label}
              </span>
            ))}
          </div>

          {/* Disclaimer */}
          <p className="mt-2 max-w-md rounded-xl border border-border bg-secondary/60 px-4 py-3 text-xs leading-relaxed text-muted-foreground">
            Please provide a high-level description of your business concept.
            Avoid sharing sensitive, proprietary, or personal information — a general
            overview is sufficient for an accurate assessment. If a response fails,
            wait a moment and try again.
          </p>
        </div>

        {/* Main card */}
        <div className="rounded-2xl border border-border bg-card shadow-lg shadow-primary/5 p-6 sm:p-8">
          <ValidatorForm />
        </div>

        {/* Footer */}
        <footer className="mt-10 flex flex-col items-center gap-1 text-center text-xs text-muted-foreground">
          <span>
            Powered by{" "}
            <a
              href="https://openrouter.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline-offset-2 hover:underline"
            >
              OpenRouter
            </a>
            {" "}&middot; Built by{" "}
            <a
              href="https://mehrkraftdigital.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline-offset-2 hover:underline"
            >
              Mehr Kraft Digital
            </a>
          </span>
          <span className="text-muted-foreground/50">
            &copy; {new Date().getFullYear()} Mehr Kraft Digital Riazi e.U. All rights reserved.
          </span>
        </footer>
      </main>
    </div>
  );
}
