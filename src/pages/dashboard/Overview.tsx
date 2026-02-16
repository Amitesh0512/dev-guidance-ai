import { Link } from "react-router-dom";
import { Play, TrendingUp, AlertTriangle, Lightbulb, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

// Score ring component
function ScoreRing({ score, size = 140 }: { score: number; size?: number }) {
  const r = (size / 2) - 16;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (score / 100) * circumference;
  const color =
    score >= 80 ? "hsl(155 100% 50%)" : score >= 60 ? "hsl(45 100% 55%)" : "hsl(0 72% 51%)";

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="w-full h-full -rotate-90" viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="hsl(220 14% 14%)" strokeWidth="8" />
        <circle
          cx={size/2} cy={size/2} r={r} fill="none"
          stroke={color} strokeWidth="8" strokeLinecap="round"
          strokeDasharray={circumference} strokeDashoffset={offset}
          className="transition-all duration-1000"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold font-mono" style={{ color }}>{score}</span>
        <span className="text-[10px] text-muted-foreground">/ 100</span>
      </div>
    </div>
  );
}

const MOCK = {
  score: 72,
  repo: "amitesh/payment-gateway",
  lastScan: "2 hours ago",
  scansUsed: 2,
  scansLimit: 4,
  topIssue: "3 circular dependencies detected in service layer",
  topSuggestion: "Extract interfaces for PaymentRepo and EmailService into Application layer",
  previousScore: 65,
};

export default function Overview() {
  const scoreDelta = MOCK.score - MOCK.previousScore;

  return (
    <div className="max-w-5xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Your architecture health at a glance</p>
        </div>
        <Link
          to="/dashboard/repositories"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-primary text-primary-foreground text-sm font-semibold hover:scale-[1.02] transition-transform"
        >
          <Play className="w-4 h-4" />
          Start New Scan
        </Link>
      </div>

      {/* Top row: Score + Usage */}
      <div className="grid md:grid-cols-3 gap-4">
        {/* Architecture Score */}
        <Card className="border-border bg-card md:col-span-2">
          <CardContent className="p-6 flex items-center gap-8">
            <ScoreRing score={MOCK.score} />
            <div className="space-y-3 flex-1">
              <div>
                <h3 className="text-sm font-medium text-foreground">Architecture Score</h3>
                <p className="text-xs text-muted-foreground mt-0.5 font-mono">{MOCK.repo}</p>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-3.5 h-3.5 text-primary" />
                <span className="text-sm text-primary font-medium">+{scoreDelta} pts</span>
                <span className="text-xs text-muted-foreground">since last scan</span>
              </div>
              <p className="text-xs text-muted-foreground">Last scanned {MOCK.lastScan}</p>
              <Link
                to="/dashboard/scans/scan-1"
                className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
              >
                View full results <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Monthly Usage */}
        <Card className="border-border bg-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground font-medium">Monthly Usage</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <span className="text-4xl font-bold font-mono text-foreground">{MOCK.scansUsed}</span>
              <span className="text-lg text-muted-foreground font-mono"> / {MOCK.scansLimit}</span>
              <p className="text-xs text-muted-foreground mt-1">scans this month</p>
            </div>
            <Progress value={(MOCK.scansUsed / MOCK.scansLimit) * 100} className="h-2" />
            <div className="text-center">
              <p className="text-[10px] text-muted-foreground">Resets Mar 1, 2026</p>
              <Link to="/dashboard/usage" className="text-xs text-primary hover:underline mt-1 inline-block">
                Upgrade plan →
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Insights */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="border-border bg-card">
          <CardContent className="p-5 flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-destructive/10 flex items-center justify-center shrink-0 mt-0.5">
              <AlertTriangle className="w-4 h-4 text-destructive" />
            </div>
            <div>
              <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Top Issue</h4>
              <p className="text-sm text-foreground">{MOCK.topIssue}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="p-5 flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
              <Lightbulb className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Top Suggestion</h4>
              <p className="text-sm text-foreground">{MOCK.topSuggestion}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mentor Note */}
      <Card className="border-primary/10 bg-primary/[0.03]">
        <CardContent className="p-5">
          <p className="text-xs font-semibold text-primary mb-1.5">💡 Mentor Insight</p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            The Dependency Rule states that source code dependencies must point inward. Your Domain should know nothing about Infrastructure. 
            Think of layers as concentric circles — inner circles are policies, outer circles are mechanisms.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
