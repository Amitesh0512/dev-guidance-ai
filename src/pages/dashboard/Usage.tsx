import { BarChart3, Calendar, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const MOCK_USAGE = {
  scansUsed: 2,
  scansLimit: 4,
  resetDate: "March 1, 2026",
  history: [
    { month: "February 2026", used: 2, limit: 4 },
    { month: "January 2026", used: 4, limit: 4 },
    { month: "December 2025", used: 3, limit: 4 },
  ],
};

export default function Usage() {
  const pct = (MOCK_USAGE.scansUsed / MOCK_USAGE.scansLimit) * 100;

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Usage</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Track your monthly scan quota</p>
      </div>

      {/* Current Usage */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2 text-muted-foreground font-medium">
            <BarChart3 className="w-4 h-4" /> Current Period
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-end gap-3">
            <span className="text-5xl font-bold font-mono text-foreground">{MOCK_USAGE.scansUsed}</span>
            <span className="text-xl text-muted-foreground font-mono mb-1">/ {MOCK_USAGE.scansLimit}</span>
            <span className="text-sm text-muted-foreground mb-1.5 ml-1">scans used</span>
          </div>
          <Progress value={pct} className="h-3 rounded-full" />
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="w-3.5 h-3.5" />
            <span>Resets on {MOCK_USAGE.resetDate}</span>
          </div>
        </CardContent>
      </Card>

      {/* History */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm text-muted-foreground font-medium">History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {MOCK_USAGE.history.map((h) => (
              <div key={h.month} className="flex items-center justify-between">
                <span className="text-sm text-foreground">{h.month}</span>
                <div className="flex items-center gap-3">
                  <Progress value={(h.used / h.limit) * 100} className="w-24 h-1.5" />
                  <span className="text-xs text-muted-foreground font-mono w-12 text-right">{h.used}/{h.limit}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upgrade CTA */}
      <Card className="border-primary/20 bg-primary/[0.03]">
        <CardContent className="p-6 text-center space-y-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
            <Zap className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-sm font-semibold text-foreground">Need more scans?</h3>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto">
            Upgrade to Pro for unlimited scans, priority processing, and advanced analytics.
          </p>
          <button className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-primary text-primary-foreground text-sm font-semibold hover:scale-[1.02] transition-transform">
            Upgrade to Pro
          </button>
        </CardContent>
      </Card>
    </div>
  );
}
