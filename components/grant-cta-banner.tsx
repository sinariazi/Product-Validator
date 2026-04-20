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
      <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/15 via-primary/8 to-blue-600/10 p-px shadow-lg shadow-primary/10 transition-all duration-300 hover:border-primary/60 hover:shadow-xl hover:shadow-primary/20">
        {/* Inner card */}
        <div className="relative rounded-2xl bg-card/80 px-6 py-7 backdrop-blur-sm sm:px-8 sm:py-8">

          {/* Top label */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              Your Next Step
            </span>
          </div>

          {/* Headline + CTA row */}
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-2">
              <h3 className="text-balance text-xl font-bold text-foreground sm:text-2xl">
                Your idea may qualify for Austrian &amp; EU funding.
              </h3>
              <p className="max-w-lg text-pretty text-sm leading-relaxed text-muted-foreground">
                Our grant acquisition specialists personally review your case and
                identify every relevant funding programme — so you don&apos;t miss
                money that&apos;s already waiting for you.
              </p>
            </div>

            {/* CTA button */}
            <div className="shrink-0">
              <span className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/30 transition-all duration-200 group-hover:bg-primary/90 group-hover:shadow-lg group-hover:shadow-primary/40 group-hover:translate-x-0.5">
                Get My Grant Assessment
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </span>
            </div>
          </div>

          {/* Trust signals */}
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-border/50 pt-5">
            <div className="flex items-center gap-2">
              <Clock className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden="true" />
              <span className="text-xs text-muted-foreground">
                Results delivered within <strong className="text-foreground">48 hours</strong>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden="true" />
              <span className="text-xs text-muted-foreground">
                Reviewed <strong className="text-foreground">individually</strong> by our experts
              </span>
            </div>
            <div className="flex items-center gap-2">
              <BadgeCheck className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden="true" />
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
