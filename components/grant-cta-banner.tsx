"use client";

import { ArrowRight, BadgeCheck, Clock, Users } from "lucide-react";

export function GrantCTABanner() {
  return (
    <a
      href="https://mehrkraftdigital.com/grant-assessment"
      target="_blank"
      rel="noopener noreferrer"
      className="group block w-full"
      aria-label="Find out which Austrian and EU grants you qualify for"
    >
      {/* Outer glow ring on hover */}
      <div className="relative overflow-hidden rounded-2xl border-2 border-accent/30 bg-card shadow-lg transition-all duration-300 hover:border-accent/60 hover:shadow-xl hover:shadow-accent/15">

        {/* Coloured top stripe */}
        <div className="h-1.5 w-full bg-accent" />

        <div className="px-6 py-7 sm:px-8 sm:py-8">

          {/* Label */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
            <span className="text-xs font-semibold uppercase tracking-widest text-accent-foreground" style={{ color: "oklch(0.5 0.2 45)" }}>
              Your Next Step
            </span>
          </div>

          {/* Headline + CTA button row */}
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex flex-col gap-2">
              <h3 className="text-balance text-xl font-bold text-foreground sm:text-2xl">
                Your idea may qualify for Austrian &amp; EU funding.
              </h3>
              <p className="max-w-lg text-pretty text-sm leading-relaxed text-muted-foreground">
                Our grant acquisition specialists personally review every case and
                identify every relevant funding programme — so you don&apos;t leave
                money on the table that&apos;s already earmarked for businesses like yours.
              </p>
            </div>

            {/* CTA button */}
            <div className="shrink-0 pt-1">
              <span
                className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white shadow-md transition-all duration-200 group-hover:shadow-lg group-hover:translate-x-0.5"
                style={{ backgroundColor: "oklch(0.5 0.24 264)" }}
              >
                Get My Grant Assessment
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </span>
            </div>
          </div>

          {/* Trust signals */}
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2.5 border-t border-border pt-5">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              <span className="text-xs text-muted-foreground">
                Results within <strong className="text-foreground">48 hours</strong>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              <span className="text-xs text-muted-foreground">
                Reviewed <strong className="text-foreground">individually</strong> by our experts
              </span>
            </div>
            <div className="flex items-center gap-2">
              <BadgeCheck className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              <span className="text-xs text-muted-foreground">
                Austrian &amp; EU grant specialists
              </span>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}
