import { ValidatorForm } from "@/components/validator-form";
import { Lightbulb, BarChart2, ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans">

      {/* Top accent bar */}
      <div className="h-1 w-full bg-primary" />

      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:py-16">

        {/* Hero */}
        <div className="mb-10 flex flex-col items-center gap-5 text-center">

          {/* Label pill */}
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            AI-Powered Validation
          </span>

          {/* Headline */}
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Validate Your
              <span className="relative ml-3 text-primary">
                Business Idea
              </span>
            </h1>
            <p className="max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              Describe your concept in plain language. Our AI delivers a structured,
              multi-dimensional analysis — problem fit, target market, MVP scope,
              core features, risks, and a clear go/no-go recommendation.
            </p>
          </div>

          {/* Value pills */}
          <div className="flex flex-wrap justify-center gap-2.5">
            {[
              { icon: Lightbulb, label: "Idea Clarity" },
              { icon: BarChart2, label: "Market Fit" },
              { icon: ShieldCheck, label: "Risk Analysis" },
            ].map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground shadow-sm"
              >
                <Icon className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                {label}
              </span>
            ))}
          </div>

          {/* Free-tier notice */}
          <div className="flex items-start gap-2.5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-left max-w-md">
            <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-amber-400 mt-1" aria-hidden="true" />
            <p className="text-xs leading-relaxed text-amber-800">
              This tool uses a <strong>free-tier AI API</strong> for demonstration purposes.
              Responses may occasionally be slow or fail — if so, wait a moment and try again.
            </p>
          </div>
        </div>

        {/* Form card */}
        <div className="rounded-2xl border border-border bg-card shadow-md shadow-primary/5 p-6 sm:p-8">
          <ValidatorForm />
        </div>

        {/* Footer */}
        <footer className="mt-10 flex flex-col items-center gap-1 text-center text-xs text-muted-foreground">
          <span>
            Powered by{" "}
            <a
              href="https://mehrkraftdigital.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary underline-offset-2 hover:underline"
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
