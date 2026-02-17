import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Download, ChevronRight, ChevronDown, Activity, AlertTriangle, GitBranch, Clock, ArrowUpRight, ArrowDownRight, Minus, Lightbulb, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import DependencyGraph from "@/components/dashboard/DependencyGraph";
import ScoreRing from "@/components/dashboard/ScoreRing";
import DeltaBadge from "@/components/dashboard/DeltaBadge";

const MOCK_SCAN = {
  repo: "amitesh/payment-gateway",
  branch: "main",
  commit: "a3f8c91",
  scanId: "68e268e2-f589-4a85-a758-f7e87dc01875",
  scannedAt: "2026-02-16T09:32:00Z",
  score: 72,
  status: "completed" as const,
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

function scoreLabel(score: number) {
  if (score >= 80) return "Good architecture";
  if (score >= 60) return "Needs improvement";
  return "Critical issues";
}

export default function ScanResults() {
  const [expandedIssue, setExpandedIssue] = useState<number | null>(null);

  return (
    <div className="max-w-4xl space-y-6">
      {/* Back link */}
      <Link to="/dashboard/scans" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back to Scan History
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Scan Results</h1>
          <p className="text-sm text-muted-foreground mt-1 font-mono">
            Scan ID: {MOCK_SCAN.scanId}
          </p>
        </div>
        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 px-3 py-1 text-xs gap-1.5">
          <CheckCircle2 className="w-3 h-3" />
          Completed
        </Badge>
      </div>

      {/* Score Card - Horizontal layout */}
      <Card className="border-border bg-card">
        <CardContent className="p-6 flex items-center gap-8">
          <ScoreRing score={MOCK_SCAN.score} />
          <div>
            <h2 className="text-lg font-semibold text-foreground">Architecture Score</h2>
            <p className="text-sm text-muted-foreground mt-0.5">{scoreLabel(MOCK_SCAN.score)}</p>
            <div className="mt-2 flex items-center gap-1.5">
              <DeltaBadge current={MOCK_SCAN.score} previous={MOCK_PREVIOUS_SCAN.score} />
              <span className="text-[10px] text-muted-foreground">vs previous scan</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Feedback */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Activity className="w-4 h-4 text-primary" />
            AI Feedback
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg bg-muted/30 border border-border/50 p-5 space-y-5 font-mono text-sm text-muted-foreground leading-relaxed">
            <div>
              <h3 className="text-foreground font-semibold mb-2 text-base font-sans">Architecture Mentor Report</h3>
              <p>{MOCK_AI.summary}</p>
            </div>

            <div>
              <h4 className="text-foreground font-semibold mb-2 font-sans">Key Issues</h4>
              <ul className="space-y-1.5">
                {MOCK_AI.issues.map((issue, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-destructive mt-0.5">•</span>
                    <span>
                      <strong className="text-foreground font-medium">{issue.issue}</strong>
                      {" — "}{issue.why}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-foreground font-semibold mb-2 font-sans">Refactoring Guidance</h4>
              <ul className="space-y-1.5">
                {MOCK_AI.steps.map((step, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">{i + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-foreground font-semibold mb-2 font-sans">Learning Insight</h4>
              <p>{MOCK_AI.insight}</p>
            </div>

            <div className="pt-2 border-t border-border/50">
              <p className="text-foreground font-semibold">Architecture score: {MOCK_SCAN.score}/100</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Metrics Comparison */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Metric Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Circular Deps", current: MOCK_SCAN.circularDeps, previous: MOCK_PREVIOUS_SCAN.circularDeps },
              { label: "Layer Violations", current: MOCK_SCAN.layerViolations, previous: MOCK_PREVIOUS_SCAN.layerViolations },
              { label: "Coupling Issues", current: MOCK_SCAN.couplingIssues, previous: MOCK_PREVIOUS_SCAN.couplingIssues },
            ].map((m) => (
              <div key={m.label} className="text-center p-4 rounded-lg bg-muted/30 border border-border/50">
                <div className="flex items-center justify-center gap-1.5">
                  <span className="text-2xl font-bold font-mono text-foreground">{m.current}</span>
                  <DeltaBadge current={m.current} previous={m.previous} invert />
                </div>
                <p className="text-xs text-muted-foreground mt-1">{m.label}</p>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-muted-foreground mt-3">
            Compared to scan <span className="font-mono">{MOCK_PREVIOUS_SCAN.commit}</span> on {new Date(MOCK_PREVIOUS_SCAN.scannedAt).toLocaleDateString()}
          </p>
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

      {/* Export */}
      <div className="flex justify-end">
        <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors">
          <Download className="w-4 h-4" /> Export Markdown
        </button>
      </div>
    </div>
  );
}
