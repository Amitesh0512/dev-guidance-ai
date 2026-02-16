import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Download, ChevronRight, ChevronDown, Activity, AlertTriangle, GitBranch, Clock, TrendingUp, TrendingDown, Minus, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import DependencyGraph from "@/components/dashboard/DependencyGraph";

// Score ring
function ScoreRing({ score }: { score: number }) {
  const r = 50;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (score / 100) * circumference;
  const color = score >= 80 ? "hsl(155 100% 50%)" : score >= 60 ? "hsl(45 100% 55%)" : "hsl(0 72% 51%)";
  return (
    <div className="relative w-32 h-32 mx-auto">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r={r} fill="none" stroke="hsl(220 14% 14%)" strokeWidth="7" />
        <circle cx="60" cy="60" r={r} fill="none" stroke={color} strokeWidth="7" strokeLinecap="round"
          strokeDasharray={circumference} strokeDashoffset={offset} className="transition-all duration-1000" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold font-mono" style={{ color }}>{score}</span>
        <span className="text-[10px] text-muted-foreground">/ 100</span>
      </div>
    </div>
  );
}

const MOCK_SCAN = {
  repo: "amitesh/payment-gateway",
  branch: "main",
  commit: "a3f8c91",
  scannedAt: "2026-02-16T09:32:00Z",
  score: 72,
  circularDeps: 3,
  layerViolations: 5,
  couplingIssues: 2,
};

const MOCK_PREVIOUS_SCAN = {
  commit: "b7e2d44",
  scannedAt: "2026-02-10T14:20:00Z",
  score: 65,
  circularDeps: 4,
  layerViolations: 7,
  couplingIssues: 3,
};

function DeltaBadge({ current, previous, invert = false }: { current: number; previous: number; invert?: boolean }) {
  const delta = current - previous;
  if (delta === 0) return <span className="text-xs text-muted-foreground flex items-center gap-0.5"><Minus className="w-3 h-3" /> 0</span>;
  // For issues, fewer is better (invert), for score, higher is better
  const isPositive = invert ? delta < 0 : delta > 0;
  return (
    <span className={`text-xs font-medium flex items-center gap-0.5 ${isPositive ? "text-primary" : "text-destructive"}`}>
      {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
      {delta > 0 ? "+" : ""}{delta}
    </span>
  );
}

const MOCK_AI = {
  summary: "Your solution follows Clean Architecture patterns but has notable dependency leaks between Infrastructure and upper layers. The 3 circular dependencies in your service and domain layer signal tight coupling that will slow iteration. Addressing these will dramatically improve testability and deploy independence.",
  issues: [
    { issue: "Infrastructure references API layer directly", why: "Breaks dependency inversion. Deployments become fragile.", severity: "high" },
    { issue: "Circular dependencies between services", why: "Makes unit testing nearly impossible and increases cognitive load.", severity: "critical" },
    { issue: "Domain layer references Infrastructure", why: "Core business logic becomes coupled to implementation details.", severity: "high" },
  ],
  steps: [
    "Extract interfaces for PaymentRepo and EmailService into Application layer.",
    "Break OrderService ↔ PaymentService cycle using domain events or a mediator.",
    "Move MessageBus abstraction to Domain; keep implementation in Infrastructure.",
  ],
  insight: "The Dependency Rule states that source code dependencies must point inward. Your Domain should know nothing about Infrastructure. Think of layers as concentric circles — inner circles are policies, outer circles are mechanisms.",
};

const severityColor: Record<string, string> = { critical: "destructive", high: "secondary", medium: "outline" };

export default function ScanResults() {
  const [expandedIssue, setExpandedIssue] = useState<number | null>(null);

  return (
    <div className="max-w-4xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-primary" />
            Scan Results
          </h1>
          <p className="text-xs text-muted-foreground mt-1 flex items-center gap-2 font-mono">
            <span>{MOCK_SCAN.repo}</span>
            <span className="text-border">•</span>
            <span>{MOCK_SCAN.branch}</span>
            <span className="text-border">•</span>
            <span>{MOCK_SCAN.commit}</span>
            <span className="text-border">•</span>
            <Clock className="w-3 h-3" />
            <span>{new Date(MOCK_SCAN.scannedAt).toLocaleString()}</span>
          </p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors">
          <Download className="w-4 h-4" /> Export Markdown
        </button>
      </div>

      {/* Score + Summary */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="border-border bg-card">
          <CardContent className="p-6 flex flex-col items-center">
            <ScoreRing score={MOCK_SCAN.score} />
            <p className="text-xs text-muted-foreground mt-3">Architecture Score</p>
            {/* Score delta */}
            <div className="mt-2 flex items-center gap-1.5">
              <DeltaBadge current={MOCK_SCAN.score} previous={MOCK_PREVIOUS_SCAN.score} />
              <span className="text-[10px] text-muted-foreground">vs previous</span>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 border-border bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary" />
              Health Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground leading-relaxed">{MOCK_AI.summary}</p>

            {/* Metric comparison */}
            <div className="grid grid-cols-3 gap-3 pt-2 border-t border-border/50">
              {[
                { label: "Circular Deps", current: MOCK_SCAN.circularDeps, previous: MOCK_PREVIOUS_SCAN.circularDeps },
                { label: "Layer Violations", current: MOCK_SCAN.layerViolations, previous: MOCK_PREVIOUS_SCAN.layerViolations },
                { label: "Coupling Issues", current: MOCK_SCAN.couplingIssues, previous: MOCK_PREVIOUS_SCAN.couplingIssues },
              ].map((m) => (
                <div key={m.label} className="text-center">
                  <div className="flex items-center justify-center gap-1.5">
                    <span className="text-lg font-bold font-mono text-foreground">{m.current}</span>
                    <DeltaBadge current={m.current} previous={m.previous} invert />
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{m.label}</p>
                </div>
              ))}
            </div>

            <p className="text-[10px] text-muted-foreground">
              Compared to scan <span className="font-mono">{MOCK_PREVIOUS_SCAN.commit}</span> on {new Date(MOCK_PREVIOUS_SCAN.scannedAt).toLocaleDateString()}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Key Issues - Expandable Cards */}
      <div>
        <h2 className="text-sm font-semibold text-foreground mb-3">Key Issues</h2>
        <div className="space-y-2">
          {MOCK_AI.issues.map((issue, i) => (
            <Collapsible key={i} open={expandedIssue === i} onOpenChange={(open) => setExpandedIssue(open ? i : null)}>
              <Card className="border-border bg-card">
                <CollapsibleTrigger asChild>
                  <CardContent className="p-4 flex items-center gap-3 cursor-pointer hover:bg-muted/30 transition-colors">
                    <AlertTriangle className={`w-4 h-4 shrink-0 ${issue.severity === "critical" ? "text-destructive" : "text-yellow-400"}`} />
                    <span className="text-sm text-foreground flex-1">{issue.issue}</span>
                    <Badge variant={severityColor[issue.severity] as "destructive" | "secondary" | "outline"} className="text-[10px] capitalize">
                      {issue.severity}
                    </Badge>
                    {expandedIssue === i ? <ChevronDown className="w-4 h-4 text-muted-foreground" /> : <ChevronRight className="w-4 h-4 text-muted-foreground" />}
                  </CardContent>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="px-4 pb-4 pt-0 border-t border-border/50">
                    <p className="text-sm text-muted-foreground mt-3">{issue.why}</p>
                  </div>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          ))}
        </div>
      </div>

      {/* Refactoring Guidance */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Refactoring Guidance</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-2.5">
            {MOCK_AI.steps.map((step, i) => (
              <li key={i} className="flex items-start gap-3 text-sm">
                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-mono flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span className="text-muted-foreground leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>

      {/* Learning Insight */}
      <Card className="border-primary/10 bg-primary/[0.03]">
        <CardContent className="p-5">
          <p className="text-xs font-semibold text-primary mb-1.5">💡 Learning Insight</p>
          <p className="text-sm text-muted-foreground leading-relaxed">{MOCK_AI.insight}</p>
        </CardContent>
      </Card>

      {/* Dependency Graph */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Dependency Graph</CardTitle>
        </CardHeader>
        <CardContent>
          <DependencyGraph />
        </CardContent>
      </Card>
    </div>
  );
}
