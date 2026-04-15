import { ValidatorForm } from "@/components/validator-form";

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
        {/* Header */}
        <div className="mb-10 flex flex-col items-center gap-3 text-center">
          <span className="inline-block rounded-full border border-primary/20 bg-primary/8 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
            AI-Powered
          </span>
          <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Product Validator
          </h1>
          <p className="max-w-md text-pretty text-base text-muted-foreground sm:text-lg">
            Turn raw ideas into structured MVP plans — in seconds.
          </p>
          <p className="text-xs text-muted-foreground/70">
            Built as a rapid MVP to validate product ideas in minutes
          </p>
          <p className="mt-1 max-w-sm rounded-lg border border-amber-200 bg-amber-50 px-4 py-2.5 text-xs leading-relaxed text-amber-700">
            This app uses a <strong> free-tier AI API </strong> for demonstration
            purposes only. Responses may be slow or occasionally fail &mdash; if
            that happens, please wait a few minutes and try again.
          </p>
        </div>

        {/* Card wrapper */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
          <ValidatorForm />
        </div>

        <footer className="mt-8 text-center text-xs text-muted-foreground">
          Powered by OpenRouter &middot; Built with v0, Next.js and Vercel
        </footer>
      </main>
    </div>
  );
}
