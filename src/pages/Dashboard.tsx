import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  GitBranch,
  AlertTriangle,
  ShieldCheck,
  Activity,
  Clock,
  FileCode,
  Layers,
  RefreshCw,
  Download,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import DependencyGraph from "@/components/dashboard/DependencyGraph";

// --- Mock Data ---
const MOCK_SCAN = {
  repo: "amitesh/payment-gateway",
  branch: "main",
  commit: "a3f8c91",
  scannedAt: "2026-02-16T09:32:00Z",
  score: 72,
  totalClasses: 148,
  totalProjects: 12,
  layersDetected: ["API", "Application", "Domain", "Infrastructure"],
  circularDeps: 3,
  layerViolations: 5,
  avgCoupling: 4.2,
  scansUsed: 2,
  scansLimit: 4,
};

const MOCK_VIOLATIONS = [
  { id: 1, type: "layer", severity: "high", source: "Infrastructure.PaymentRepo", target: "API.Controllers.PaymentController", rule: "Infrastructure → API" },
  { id: 2, type: "layer", severity: "high", source: "Infrastructure.EmailService", target: "Application.DTOs.UserDTO", rule: "Infrastructure → Application DTOs" },
  { id: 3, type: "circular", severity: "critical", source: "Application.OrderService", target: "Application.PaymentService", rule: "Circular Reference" },
  { id: 4, type: "circular", severity: "critical", source: "Domain.Invoice", target: "Domain.Payment", rule: "Circular Reference" },
  { id: 5, type: "layer", severity: "medium", source: "Application.UserService", target: "Infrastructure.DbContext", rule: "Application → Infrastructure" },
  { id: 6, type: "coupling", severity: "medium", source: "Application.OrderService", target: "—", rule: "Fan-out: 14 dependencies" },
  { id: 7, type: "circular", severity: "critical", source: "Infrastructure.CacheService", target: "Application.CacheManager", rule: "Circular Reference" },
  { id: 8, type: "layer", severity: "high", source: "Domain.Events.OrderCreated", target: "Infrastructure.MessageBus", rule: "Domain → Infrastructure" },
];

const MOCK_AI_FEEDBACK = {
  architecture_health_summary:
    "Your solution follows Clean Architecture patterns but has notable dependency leaks between Infrastructure and upper layers. The 3 circular dependencies in your service and domain layer signal tight coupling that will slow iteration. Addressing these will dramatically improve testability and deploy independence.",
  key_issues: [
    { issue: "Infrastructure references API layer directly", why_it_matters: "Breaks dependency inversion. Deployments become fragile." },
    { issue: "Circular dependencies between services", why_it_matters: "Makes unit testing nearly impossible and increases cognitive load." },
    { issue: "Domain layer references Infrastructure", why_it_matters: "Core business logic becomes coupled to implementation details." },
  ],
  refactoring_guidance: [
    { step: "Extract interfaces for PaymentRepo and EmailService into Application layer." },
    { step: "Break OrderService ↔ PaymentService cycle using domain events or a mediator." },
    { step: "Move MessageBus abstraction to Domain; keep implementation in Infrastructure." },
  ],
  learning_insight:
    "The Dependency Rule states that source code dependencies must point inward. Your Domain should know nothing about Infrastructure. Think of layers as concentric circles — inner circles are policies, outer circles are mechanisms.",
};

const severityColor: Record<string, string> = {
  critical: "text-destructive",
  high: "text-orange-400",
  medium: "text-yellow-400",
};

const severityBadge: Record<string, "destructive" | "secondary" | "outline"> = {
  critical: "destructive",
  high: "secondary",
  medium: "outline",
};

function ScoreRing({ score }: { score: number }) {
  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (score / 100) * circumference;
  const color =
    score >= 80 ? "hsl(155 100% 50%)" : score >= 60 ? "hsl(45 100% 55%)" : "hsl(0 72% 51%)";

  return (
    <div className="relative w-36 h-36 mx-auto">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r="54" fill="none" stroke="hsl(220 14% 14%)" strokeWidth="8" />
        <circle
          cx="60"
          cy="60"
          r="54"
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-1000"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold font-mono" style={{ color }}>
          {score}
        </span>
        <span className="text-xs text-muted-foreground">/ 100</span>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-background">
      {/* Top Bar */}
      <header className="fixed top-0 inset-x-0 z-50 glass border-b border-border h-14 flex items-center px-6">
        <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mr-4">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back</span>
        </Link>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-gradient-primary flex items-center justify-center">
            <span className="text-[10px] font-bold text-primary-foreground font-mono">DS</span>
          </div>
          <span className="font-semibold text-foreground text-sm">DevSense</span>
        </div>
        <div className="ml-auto flex items-center gap-3">
          <span className="text-xs text-muted-foreground font-mono">
            {MOCK_SCAN.scansUsed}/{MOCK_SCAN.scansLimit} scans
          </span>
          <Progress value={(MOCK_SCAN.scansUsed / MOCK_SCAN.scansLimit) * 100} className="w-20 h-1.5" />
        </div>
      </header>

      <main className="pt-20 pb-12 px-4 md:px-8 max-w-7xl mx-auto">
        {/* Repo Info */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
              <GitBranch className="w-5 h-5 text-primary" />
              {MOCK_SCAN.repo}
            </h1>
            <p className="text-sm text-muted-foreground mt-1 flex items-center gap-3 font-mono">
              <span>{MOCK_SCAN.branch}</span>
              <span className="text-border">•</span>
              <span>{MOCK_SCAN.commit}</span>
              <span className="text-border">•</span>
              <Clock className="w-3 h-3" />
              <span>{new Date(MOCK_SCAN.scannedAt).toLocaleString()}</span>
            </p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors">
              <RefreshCw className="w-4 h-4" /> Re-scan
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-primary text-primary-foreground text-sm font-semibold hover:scale-105 transition-transform">
              <Download className="w-4 h-4" /> Export Report
            </button>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Projects", value: MOCK_SCAN.totalProjects, icon: Layers, accent: false },
            { label: "Classes", value: MOCK_SCAN.totalClasses, icon: FileCode, accent: false },
            { label: "Circular Deps", value: MOCK_SCAN.circularDeps, icon: AlertTriangle, accent: true },
            { label: "Layer Violations", value: MOCK_SCAN.layerViolations, icon: ShieldCheck, accent: true },
          ].map((s) => (
            <Card key={s.label} className="border-border bg-card">
              <CardContent className="p-4 flex items-center gap-3">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${s.accent ? "bg-destructive/10" : "bg-primary/10"}`}>
                  <s.icon className={`w-4 h-4 ${s.accent ? "text-destructive" : "text-primary"}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold font-mono text-foreground">{s.value}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-muted border border-border mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="violations">Violations ({MOCK_VIOLATIONS.length})</TabsTrigger>
            <TabsTrigger value="graph">Dependency Graph</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid md:grid-cols-3 gap-6">
              {/* Score */}
              <Card className="border-border bg-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-muted-foreground">Architecture Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScoreRing score={MOCK_SCAN.score} />
                  <div className="mt-4 flex flex-wrap gap-2 justify-center">
                    {MOCK_SCAN.layersDetected.map((l) => (
                      <Badge key={l} variant="secondary" className="font-mono text-xs">{l}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* AI Feedback */}
              <Card className="md:col-span-2 border-border bg-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Activity className="w-4 h-4 text-primary" />
                    AI Mentor Feedback
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {MOCK_AI_FEEDBACK.architecture_health_summary}
                  </p>

                  <div>
                    <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2">Key Issues</h4>
                    <div className="space-y-2">
                      {MOCK_AI_FEEDBACK.key_issues.map((ki, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm">
                          <ChevronRight className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                          <div>
                            <span className="text-foreground font-medium">{ki.issue}</span>
                            <span className="text-muted-foreground"> — {ki.why_it_matters}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2">Refactoring Steps</h4>
                    <ol className="space-y-1.5">
                      {MOCK_AI_FEEDBACK.refactoring_guidance.map((r, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <span className="font-mono text-primary text-xs mt-0.5">{i + 1}.</span>
                          <span className="text-muted-foreground">{r.step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div className="p-3 rounded-lg bg-primary/5 border border-primary/10">
                    <h4 className="text-xs font-semibold text-primary mb-1">💡 Learning Insight</h4>
                    <p className="text-sm text-muted-foreground">{MOCK_AI_FEEDBACK.learning_insight}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Violations Tab */}
          <TabsContent value="violations">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">All Violations</CardTitle>
                <CardDescription>Detected issues in your architecture</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border text-muted-foreground text-left">
                        <th className="py-2 pr-4 font-medium">Severity</th>
                        <th className="py-2 pr-4 font-medium">Type</th>
                        <th className="py-2 pr-4 font-medium">Source</th>
                        <th className="py-2 pr-4 font-medium">Target</th>
                        <th className="py-2 font-medium">Rule</th>
                      </tr>
                    </thead>
                    <tbody>
                      {MOCK_VIOLATIONS.map((v) => (
                        <tr key={v.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                          <td className="py-2.5 pr-4">
                            <Badge variant={severityBadge[v.severity]} className="text-xs capitalize">
                              {v.severity}
                            </Badge>
                          </td>
                          <td className="py-2.5 pr-4 capitalize text-muted-foreground">{v.type}</td>
                          <td className="py-2.5 pr-4 font-mono text-xs text-foreground">{v.source}</td>
                          <td className="py-2.5 pr-4 font-mono text-xs text-foreground">{v.target}</td>
                          <td className={`py-2.5 text-xs ${severityColor[v.severity]}`}>{v.rule}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Graph Tab */}
          <TabsContent value="graph">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Dependency Graph</CardTitle>
                <CardDescription>Visual representation of project dependencies and violations</CardDescription>
              </CardHeader>
              <CardContent>
                <DependencyGraph />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
