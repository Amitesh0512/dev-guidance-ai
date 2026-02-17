import { Link } from "react-router-dom";
import { ChevronRight, GitBranch, Clock, CheckCircle2, XCircle, Loader2, History } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const MOCK_SCANS = [
  { id: "scan-1", repo: "amitesh/payment-gateway", branch: "main", score: 72, status: "completed" as const, createdAt: "2026-02-17T02:28:09Z", duration: "1m 12s" },
  { id: "scan-2", repo: "amitesh/payment-gateway", branch: "main", score: 65, status: "completed" as const, createdAt: "2026-02-17T01:09:07Z", duration: "58s" },
  { id: "scan-3", repo: "amitesh/auth-service", branch: "main", score: 88, status: "completed" as const, createdAt: "2026-02-17T01:07:59Z", duration: "45s" },
  { id: "scan-4", repo: "amitesh/frontend-app", branch: "develop", score: null, status: "failed" as const, createdAt: "2026-02-16T17:27:18Z", duration: "32s" },
  { id: "scan-5", repo: "amitesh/payment-gateway", branch: "feat/webhooks", score: null, status: "running" as const, createdAt: "2026-02-16T16:10:00Z", duration: "—" },
];

const statusConfig = {
  completed: { icon: CheckCircle2, label: "Completed", class: "bg-primary/10 text-primary border-primary/20" },
  failed: { icon: XCircle, label: "Failed", class: "bg-destructive/10 text-destructive border-destructive/20" },
  running: { icon: Loader2, label: "Running", class: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" },
};

function scoreColor(score: number) {
  if (score >= 80) return "text-primary";
  if (score >= 60) return "text-yellow-400";
  return "text-destructive";
}

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

export default function ScanHistory() {
  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
          <History className="w-4 h-4 text-primary" />
        </div>
        <div>
          <h1 className="text-xl font-semibold text-foreground">Scan History</h1>
          <p className="text-sm text-muted-foreground">All architecture scans across your repositories</p>
        </div>
      </div>

      <div className="space-y-2">
        {MOCK_SCANS.map((scan) => {
          const isClickable = scan.status === "completed";
          const cfg = statusConfig[scan.status];
          const StatusIcon = cfg.icon;

          const content = (
            <Card className={`border-border bg-card transition-all ${isClickable ? "hover:border-primary/30 hover:shadow-md hover:shadow-primary/5 cursor-pointer" : "opacity-80"}`}>
              <CardContent className="p-4 flex items-center gap-4">
                {/* Score */}
                <div className="w-12 h-12 rounded-lg bg-muted/50 flex items-center justify-center shrink-0">
                  {scan.score !== null ? (
                    <span className={`text-lg font-bold font-mono ${scoreColor(scan.score)}`}>{scan.score}</span>
                  ) : (
                    <span className="text-sm text-muted-foreground">—</span>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{scan.repo}</p>
                  <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <GitBranch className="w-3 h-3" />
                      {scan.branch}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {timeAgo(scan.createdAt)}
                    </span>
                    <span className="hidden sm:inline">{scan.duration}</span>
                  </div>
                </div>

                {/* Status */}
                <Badge variant="outline" className={`text-[10px] px-2.5 py-1 gap-1 ${cfg.class}`}>
                  <StatusIcon className={`w-3 h-3 ${scan.status === "running" ? "animate-spin" : ""}`} />
                  {cfg.label}
                </Badge>

                {isClickable && <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />}
              </CardContent>
            </Card>
          );

          return isClickable ? (
            <Link key={scan.id} to={`/dashboard/scans/${scan.id}`}>{content}</Link>
          ) : (
            <div key={scan.id}>{content}</div>
          );
        })}
      </div>
    </div>
  );
}
