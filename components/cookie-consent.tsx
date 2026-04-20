"use client";

import { useState, useEffect } from "react";
import { X, Cookie, ChevronDown, ChevronUp, ShieldCheck, BarChart2, Megaphone } from "lucide-react";
import { Button } from "@/components/ui/button";

type ConsentChoices = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
};

const STORAGE_KEY = "mkd_cookie_consent";
const EXPIRY_DAYS = 30;

function loadConsent(): (ConsentChoices & { savedAt: number }) | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    const age = (Date.now() - parsed.savedAt) / (1000 * 60 * 60 * 24);
    if (age > EXPIRY_DAYS) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function saveConsent(choices: ConsentChoices) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ ...choices, savedAt: Date.now() })
  );
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const stored = loadConsent();
    if (!stored) {
      // Small delay so banner doesn't flash immediately on load
      const t = setTimeout(() => setVisible(true), 600);
      return () => clearTimeout(t);
    }
  }, []);

  const handleAcceptAll = () => {
    saveConsent({ necessary: true, analytics: true, marketing: true });
    setVisible(false);
  };

  const handleRejectAll = () => {
    saveConsent({ necessary: true, analytics: false, marketing: false });
    setVisible(false);
  };

  const handleSavePreferences = () => {
    saveConsent({ necessary: true, analytics, marketing });
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Cookie consent"
      className="fixed bottom-0 left-0 right-0 z-50 p-3 sm:p-4 md:bottom-4 md:left-4 md:right-auto md:max-w-md"
    >
      <div className="rounded-2xl border border-border bg-card shadow-2xl shadow-foreground/10 overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 px-5 pt-5 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <Cookie className="h-5 w-5 text-primary" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">We value your privacy</p>
              <p className="text-xs text-muted-foreground">EU / GDPR compliant</p>
            </div>
          </div>
          <button
            onClick={handleRejectAll}
            aria-label="Reject all and close"
            className="mt-0.5 rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body text */}
        <div className="px-5 pb-3">
          <p className="text-xs leading-relaxed text-muted-foreground">
            We use cookies to ensure the basic functionality of our website and to improve your experience. You may choose which categories to allow below. Your preference is stored locally for{" "}
            <span className="font-medium text-foreground">30 days</span>.{" "}
            <a
              href="https://mehrkraftdigital.com/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary underline-offset-2 hover:underline"
            >
              Privacy Policy
            </a>
          </p>
        </div>

        {/* Expandable preferences */}
        <div className="px-5 pb-3">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="flex w-full items-center justify-between rounded-lg border border-border bg-muted/50 px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-muted"
          >
            <span>Manage preferences</span>
            {expanded ? (
              <ChevronUp className="h-3.5 w-3.5 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
            )}
          </button>

          {expanded && (
            <div className="mt-2 flex flex-col gap-2 rounded-lg border border-border bg-muted/30 p-3">
              {/* Necessary — always on */}
              <label className="flex items-start gap-3 cursor-not-allowed">
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-foreground">Strictly Necessary</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Required for the site to function. Cannot be disabled.
                  </p>
                </div>
                <div className="mt-0.5">
                  <div className="h-5 w-9 rounded-full bg-emerald-500 flex items-center justify-end px-0.5">
                    <div className="h-4 w-4 rounded-full bg-white shadow" />
                  </div>
                </div>
              </label>

              {/* Analytics */}
              <label className="flex items-start gap-3 cursor-pointer">
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50">
                  <BarChart2 className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-foreground">Analytics</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Helps us understand how visitors interact with our site (e.g. Vercel Analytics).
                  </p>
                </div>
                <button
                  role="switch"
                  aria-checked={analytics}
                  onClick={() => setAnalytics((v) => !v)}
                  className={`mt-0.5 h-5 w-9 rounded-full transition-colors flex items-center px-0.5 ${
                    analytics ? "bg-primary justify-end" : "bg-border justify-start"
                  }`}
                >
                  <div className="h-4 w-4 rounded-full bg-white shadow" />
                </button>
              </label>

              {/* Marketing */}
              <label className="flex items-start gap-3 cursor-pointer">
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-50">
                  <Megaphone className="h-4 w-4 text-amber-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-foreground">Marketing</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Allows us to show relevant content and measure campaign effectiveness.
                  </p>
                </div>
                <button
                  role="switch"
                  aria-checked={marketing}
                  onClick={() => setMarketing((v) => !v)}
                  className={`mt-0.5 h-5 w-9 rounded-full transition-colors flex items-center px-0.5 ${
                    marketing ? "bg-primary justify-end" : "bg-border justify-start"
                  }`}
                >
                  <div className="h-4 w-4 rounded-full bg-white shadow" />
                </button>
              </label>

              <Button
                size="sm"
                variant="outline"
                onClick={handleSavePreferences}
                className="mt-1 w-full text-xs"
              >
                Save my preferences
              </Button>
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex flex-col gap-2 px-5 pb-5 sm:flex-row">
          <Button
            onClick={handleRejectAll}
            variant="outline"
            size="sm"
            className="flex-1 text-xs"
          >
            Reject all
          </Button>
          <Button
            onClick={handleAcceptAll}
            size="sm"
            className="flex-1 text-xs"
          >
            Accept all
          </Button>
        </div>
      </div>
    </div>
  );
}
