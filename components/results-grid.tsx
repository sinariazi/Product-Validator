import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Search,
  Users,
  Rocket,
  Zap,
  AlertTriangle,
  ThumbsUp,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface AnalysisResult {
  problem: string;
  users: string;
  mvp: string;
  features: string;
  risks: string;
  recommendation: string;
}

const SECTIONS: {
  key: keyof AnalysisResult;
  title: string;
  Icon: LucideIcon;
  iconColor: string;
  accent: string;
}[] = [
  {
    key: "problem",
    title: "Problem & Opportunity",
    Icon: Search,
    iconColor: "text-blue-600",
    accent: "bg-blue-50 border-blue-200",
  },
  {
    key: "users",
    title: "Target Users",
    Icon: Users,
    iconColor: "text-violet-600",
    accent: "bg-violet-50 border-violet-200",
  },
  {
    key: "mvp",
    title: "MVP Scope",
    Icon: Rocket,
    iconColor: "text-emerald-600",
    accent: "bg-emerald-50 border-emerald-200",
  },
  {
    key: "features",
    title: "Key Features",
    Icon: Zap,
    iconColor: "text-amber-600",
    accent: "bg-amber-50 border-amber-200",
  },
  {
    key: "risks",
    title: "Risks & Challenges",
    Icon: AlertTriangle,
    iconColor: "text-rose-600",
    accent: "bg-rose-50 border-rose-200",
  },
  {
    key: "recommendation",
    title: "Recommendation",
    Icon: ThumbsUp,
    iconColor: "text-primary",
    accent: "bg-primary/6 border-primary/20",
  },
];

interface ResultsGridProps {
  result: AnalysisResult;
}

export function ResultsGrid({ result }: ResultsGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {SECTIONS.map(({ key, title, Icon, iconColor, accent }) => (
        <Card
          key={key}
          className={`border shadow-sm transition-shadow hover:shadow-md ${accent}`}
        >
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <Icon className={`h-4 w-4 shrink-0 ${iconColor}`} aria-hidden="true" />
              {title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {result[key]}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
