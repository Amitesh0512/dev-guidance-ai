import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft, ArrowRight, Play, GitBranch, AlertTriangle, CheckCircle2,
  Activity, Lightbulb, ChevronRight, ChevronDown,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

// Demo data
const DEMO_REPO = "devsense/sample-ecommerce";

const DEMO_STEPS = [
  { label: "Cloning repository...", delay: 0 },
  { label: "Parsing 47 projects, 312 classes...", delay: 1 },
  { label: "Building dependency graph...", delay: 2 },
  { label: "Detecting circular dependencies...", delay: 3 },
  { label: "Checking layer violations...", delay: 3.5 },
  { label: "Computing architecture score...", delay: 4 },
  { label: "Generating AI mentor feedback...", delay: 4.5 },
  { label: "Done! Score: 72/100", delay: 5.5 },
];

const DEMO_ISSUES = [
  { title: "Infrastructure references API layer", severity: "high", detail: "PaymentRepo directly depends on PaymentController. This breaks dependency inversion and makes deployments fragile. Extract an interface in the Application layer." },
  { title: "Circular dependency: OrderService ↔ PaymentService", severity: "critical", detail: "These services reference each other, making unit testing nearly impossible. Break the cycle using domain events or a mediator pattern." },
  { title: "Domain references Infrastructure", severity: "high", detail: "OrderCreated event directly calls MessageBus. Move the abstraction to Domain and keep the implementation in Infrastructure." },
];

const DEMO_STEPS_GUIDANCE = [
  "Extract interfaces for PaymentRepo and EmailService into the Application layer.",
  "Break OrderService ↔ PaymentService cycle using domain events or a mediator.",
  "Move MessageBus abstraction to Domain; keep implementation in Infrastructure.",
];

// Score ring
function ScoreRing({ score, size = 120 }: { score: number; size?: number }) {
  const r = (size / 2) - 14;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  const color = score >= 80 ? "hsl(155 100% 50%)" : score >= 60 ? "hsl(45 100% 55%)" : "hsl(0 72% 51%)";
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="w-full h-full -rotate-90" viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="hsl(220 14% 14%)" strokeWidth="6" />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth="6" strokeLinecap="round"
          strokeDasharray={circ} strokeDashoffset={offset} className="transition-all duration-1000" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold font-mono" style={{ color }}>{score}</span>
        <span className="text-[10px] text-muted-foreground">/ 100</span>
      </div>
    </div>
  );
}

type DemoPhase = "intro" | "scanning" | "results";

export default function Demo() {
  const [phase, setPhase] = useState<DemoPhase>("intro");
  const [scanStep, setScanStep] = useState(0);
  const [expandedIssue, setExpandedIssue] = useState<number | null>(null);

  const startDemo = () => {
    setPhase("scanning");
    setScanStep(0);

    // Animate scan steps
    DEMO_STEPS.forEach((step, i) => {
      setTimeout(() => {
        setScanStep(i + 1);
        if (i === DEMO_STEPS.length - 1) {
          setTimeout(() => setPhase("results"), 800);
        }
      }, step.delay * 600);
    });
  };

  return (
    <div className="min-h-screen bg-background relative">
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />

      <div className="relative z-10">
        <header className="h-16 flex items-center px-6 border-b border-border">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back</span>
          </Link>
          <div className="ml-4 flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-gradient-primary flex items-center justify-center">
              <span className="text-[10px] font-bold text-primary-foreground font-mono">DS</span>
            </div>
            <span className="font-bold text-foreground text-sm">DevSense</span>
          </div>
        </header>

        <main className="max-w-3xl mx-auto px-6 pt-12 pb-20">
          {/* Intro */}
          {phase === "intro" && (
            <div className="text-center space-y-8 animate-fade-in">
              <div>
                <Badge variant="secondary" className="mb-4 font-mono text-xs">INTERACTIVE DEMO</Badge>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                  See DevSense in Action
                </h1>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Watch how DevSense analyzes a sample .NET e-commerce repository and delivers mentor-style architecture feedback.
                </p>
              </div>

              {/* Sample repo card */}
              <Card className="border-border bg-card max-w-md mx-auto">
                <CardContent className="p-5 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <GitBranch className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-left flex-1">
                    <p className="text-sm font-medium text-foreground">{DEMO_REPO}</p>
                    <p className="text-xs text-muted-foreground font-mono">47 projects · 312 classes · main</p>
                  </div>
                </CardContent>
              </Card>

              <button
                onClick={startDemo}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-gradient-primary text-primary-foreground font-semibold text-sm hover:scale-105 transition-transform glow-primary"
              >
                <Play className="w-4 h-4" />
                Run Demo Scan
              </button>
            </div>
          )}

          {/* Scanning Phase */}
          {phase === "scanning" && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center mb-8">
                <h2 className="text-xl font-semibold text-foreground mb-1">Analyzing Repository...</h2>
                <p className="text-sm text-muted-foreground font-mono">{DEMO_REPO}</p>
              </div>

              <Card className="border-border bg-card">
                <CardContent className="p-6">
                  <div className="font-mono text-sm space-y-2">
                    {DEMO_STEPS.slice(0, scanStep).map((step, i) => {
                      const isLast = i === DEMO_STEPS.length - 1 && scanStep === DEMO_STEPS.length;
                      const isWarning = step.label.includes("circular") || step.label.includes("violation");
                      return (
                        <p key={i} className={`flex items-start gap-2 ${isLast ? "text-primary font-semibold" : "text-muted-foreground"}`}>
                          <span className={isWarning ? "text-yellow-400" : "text-primary"}>
                            {isLast ? "✓" : isWarning ? "⚠" : "→"}
                          </span>
                          {step.label}
                        </p>
                      );
                    })}
                    {scanStep < DEMO_STEPS.length && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <div className="w-3.5 h-3.5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                        <span>Processing...</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Results Phase */}
          {phase === "results" && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center mb-2">
                <Badge variant="secondary" className="mb-3 font-mono text-xs">DEMO RESULTS</Badge>
                <h2 className="text-xl font-semibold text-foreground">Scan Complete</h2>
                <p className="text-sm text-muted-foreground font-mono">{DEMO_REPO}</p>
              </div>

              {/* Score + Summary */}
              <div className="grid md:grid-cols-3 gap-4">
                <Card className="border-border bg-card flex flex-col items-center justify-center py-6">
                  <ScoreRing score={72} />
                  <p className="text-xs text-muted-foreground mt-2">Architecture Score</p>
                </Card>
                <Card className="md:col-span-2 border-border bg-card">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Activity className="w-4 h-4 text-primary" /> Health Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Your solution follows Clean Architecture patterns but has notable dependency leaks. 
                      The 3 circular dependencies signal tight coupling that will slow iteration. 
                      Addressing these will dramatically improve testability.
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Issues */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3">Key Issues Found</h3>
                <div className="space-y-2">
                  {DEMO_ISSUES.map((issue, i) => (
                    <Collapsible key={i} open={expandedIssue === i} onOpenChange={(open) => setExpandedIssue(open ? i : null)}>
                      <Card className="border-border bg-card">
                        <CollapsibleTrigger asChild>
                          <CardContent className="p-4 flex items-center gap-3 cursor-pointer hover:bg-muted/30 transition-colors">
                            <AlertTriangle className={`w-4 h-4 shrink-0 ${issue.severity === "critical" ? "text-destructive" : "text-yellow-400"}`} />
                            <span className="text-sm text-foreground flex-1">{issue.title}</span>
                            <Badge variant={issue.severity === "critical" ? "destructive" : "secondary"} className="text-[10px] capitalize">
                              {issue.severity}
                            </Badge>
                            {expandedIssue === i ? <ChevronDown className="w-4 h-4 text-muted-foreground" /> : <ChevronRight className="w-4 h-4 text-muted-foreground" />}
                          </CardContent>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <div className="px-4 pb-4 border-t border-border/50">
                            <p className="text-sm text-muted-foreground mt-3">{issue.detail}</p>
                          </div>
                        </CollapsibleContent>
                      </Card>
                    </Collapsible>
                  ))}
                </div>
              </div>

              {/* Guidance */}
              <Card className="border-border bg-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Refactoring Guidance</CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-2.5">
                    {DEMO_STEPS_GUIDANCE.map((step, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm">
                        <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-mono flex items-center justify-center shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <span className="text-muted-foreground">{step}</span>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>

              {/* Insight */}
              <Card className="border-primary/10 bg-primary/[0.03]">
                <CardContent className="p-5">
                  <p className="text-xs font-semibold text-primary mb-1.5">💡 Learning Insight</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    The Dependency Rule states that source code dependencies must point inward. 
                    Your Domain should know nothing about Infrastructure. Think of layers as 
                    concentric circles — inner circles are policies, outer circles are mechanisms.
                  </p>
                </CardContent>
              </Card>

              {/* CTA */}
              <div className="text-center pt-4 space-y-3">
                <p className="text-sm text-muted-foreground">Ready to scan your own repository?</p>
                <div className="flex items-center justify-center gap-3">
                  <Link
                    to="/scan"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-primary text-primary-foreground font-semibold text-sm hover:scale-[1.02] transition-transform"
                  >
                    Start Free Scan <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    to="/signup"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-sm text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
                  >
                    Create Account
                  </Link>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
