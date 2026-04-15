"use client";

import { useEffect, useState } from "react";
import { Search, Users, Rocket, Zap, AlertTriangle, ThumbsUp } from "lucide-react";

const STEPS = [
  {
    icon: Search,
    label: "Reading your idea",
    detail: "Parsing the problem space and context...",
    color: "text-blue-500",
    bg: "bg-blue-50 border-blue-200",
    bar: "bg-blue-400",
  },
  {
    icon: Users,
    label: "Identifying target users",
    detail: "Mapping potential customers and personas...",
    color: "text-indigo-500",
    bg: "bg-indigo-50 border-indigo-200",
    bar: "bg-indigo-400",
  },
  {
    icon: Rocket,
    label: "Scoping the MVP",
    detail: "Defining the leanest viable product...",
    color: "text-emerald-500",
    bg: "bg-emerald-50 border-emerald-200",
    bar: "bg-emerald-400",
  },
  {
    icon: Zap,
    label: "Generating key features",
    detail: "Prioritising what to build first...",
    color: "text-amber-500",
    bg: "bg-amber-50 border-amber-200",
    bar: "bg-amber-400",
  },
  {
    icon: AlertTriangle,
    label: "Assessing risks",
    detail: "Spotting market and technical challenges...",
    color: "text-rose-500",
    bg: "bg-rose-50 border-rose-200",
    bar: "bg-rose-400",
  },
  {
    icon: ThumbsUp,
    label: "Forming a recommendation",
    detail: "Putting it all together...",
    color: "text-primary",
    bg: "bg-primary/5 border-primary/20",
    bar: "bg-primary",
  },
];

const STEP_DURATION = 2600; // ms per step

export function AnalyzingLoader() {
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);

  // Advance through steps
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev < STEPS.length - 1 ? prev + 1 : prev));
    }, STEP_DURATION);
    return () => clearInterval(interval);
  }, []);

  // Smooth progress bar (0-95 %, never completes until real data arrives)
  useEffect(() => {
    const target = Math.min(((activeStep + 1) / STEPS.length) * 95, 95);
    const tick = setInterval(() => {
      setProgress((p) => {
        if (p >= target) {
          clearInterval(tick);
          return p;
        }
        return Math.min(p + 0.8, target);
      });
    }, 20);
    return () => clearInterval(tick);
  }, [activeStep]);

  const step = STEPS[activeStep];
  const Icon = step.icon;

  return (
    <div className="flex flex-col items-center gap-6 py-4">
      {/* Pulsing icon */}
      <div className={`relative flex h-20 w-20 items-center justify-center rounded-2xl border-2 ${step.bg} transition-all duration-700`}>
        {/* Outer ring pulse */}
        <span
          className={`absolute inset-0 rounded-2xl border-2 ${step.bg.replace("bg-", "border-").split(" ")[0]} animate-ping opacity-30`}
        />
        <Icon className={`h-9 w-9 ${step.color} transition-all duration-500`} aria-hidden="true" />
      </div>

      {/* Step label + detail */}
      <div className="flex flex-col items-center gap-1 text-center">
        <p className="text-base font-semibold text-foreground transition-all duration-500">
          {step.label}
        </p>
        <p className="text-sm text-muted-foreground transition-all duration-500">
          {step.detail}
        </p>
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-sm">
        <div className="mb-1.5 flex justify-between text-xs text-muted-foreground">
          <span>Analysing…</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
          <div
            className={`h-full rounded-full transition-all duration-300 ease-out ${step.bar}`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Step dots */}
      <div className="flex items-center gap-2">
        {STEPS.map((s, i) => {
          const DotIcon = s.icon;
          const isDone = i < activeStep;
          const isActive = i === activeStep;
          return (
            <div
              key={i}
              className={`flex h-7 w-7 items-center justify-center rounded-full border transition-all duration-500 ${
                isDone
                  ? "border-primary/30 bg-primary/10"
                  : isActive
                  ? `${s.bg} scale-110 shadow-sm`
                  : "border-border bg-muted opacity-40"
              }`}
              title={s.label}
            >
              <DotIcon
                className={`h-3.5 w-3.5 transition-all duration-500 ${
                  isDone ? "text-primary" : isActive ? s.color : "text-muted-foreground"
                }`}
                aria-hidden="true"
              />
            </div>
          );
        })}
      </div>

      <p className="text-center text-xs text-muted-foreground/70">
        Using a free-tier AI — this may take up to 30 seconds.
      </p>
    </div>
  );
}
