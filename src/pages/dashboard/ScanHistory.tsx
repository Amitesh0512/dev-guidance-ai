import { Link } from "react-router-dom";
import { Clock, CheckCircle2, XCircle, Loader2, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const MOCK_SCANS = [
  {
    id: "scan-1",
    repo: "amitesh/payment-gateway",
    branch: "main",
    commit: "a3f8c91",
    score: 72,
    status: "completed" as const,
    createdAt: "2026-02-16T09:32:00Z",
    issueCount: 8,
  },
  {
    id: "scan-2",
    repo: "amitesh/payment-gateway",
    branch: "main",
    commit: "b7e2d44",
    score: 65,
    status: "completed" as const,
    createdAt: "2026-02-10T14:20:00Z",
    issueCount: 11,
  },
  {
    id: "scan-3",
    repo: "amitesh/user-service",
    branch: "main",
    commit: "c1f9a08",
    score: 88,
    status: "completed" as const,
    createdAt: "2026-02-08T11:05:00Z",
    issueCount: 2,
  },
  {
    id: "scan-4",
    repo: "amitesh/payment-gateway",
    branch: "develop",
    commit: "d4c3b22",
    score: null,
    status: "failed" as const,
    createdAt: "2026-02-05T16:45:00Z",
    issueCount: 0,
  },
  {
    id: "scan-5",
    repo: "amitesh/notification-api",
    branch: "main",
    commit: "e8a1f77",
    score: null,
    status: "running" as const,
    createdAt: "2026-02-16T10:15:00Z",
    issueCount: 0,
  },
];

const statusConfig = {
  completed: { label: "Completed", icon: CheckCircle2, className: "text-primary bg-primary/10" },
  failed: { label: "Failed", icon: XCircle, className: "text-destructive bg-destructive/10" },
  running: { label: "Running", icon: Loader2, className: "text-yellow-400 bg-yellow-400/10" },
  pending: { label: "Pending", icon: Clock, className: "text-muted-foreground bg-muted" },
};

function ScoreChip({ score }: { score: number | null }) {
  if (score === null) return <span className="text-xs text-muted-foreground font-mono">—</span>;
  const color = score >= 80 ? "text-primary" : score >= 60 ? "text-yellow-400" : "text-destructive";
  return <span className={`text-xl font-bold font-mono ${color}`}>{score}</span>;
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function formatTime(iso: string) {
  const d = new Date(iso);
  return d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
}

export default function ScanHistory() {
  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Scan History</h1>
        <p className="text-sm text-muted-foreground mt-0.5">View all past architecture scans</p>
      </div>

      <div className="space-y-2">
        {MOCK_SCANS.map((scan) => {
          const status = statusConfig[scan.status];
          const StatusIcon = status.icon;
          const isClickable = scan.status === "completed";

          const content = (
            <Card
              className={`border-border bg-card transition-colors ${
                isClickable ? "hover:border-primary/20 cursor-pointer" : ""
              }`}
            >
              <CardContent className="p-4 flex items-center gap-4">
                {/* Score */}
                <div className="w-14 text-center shrink-0">
                  <ScoreChip score={scan.score} />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-foreground truncate">{scan.repo}</span>
                    <Badge
                      variant="outline"
                      className={`text-[10px] px-1.5 py-0 shrink-0 ${status.className}`}
                    >
                      <StatusIcon className={`w-3 h-3 mr-1 ${scan.status === "running" ? "animate-spin" : ""}`} />
                      {status.label}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                    <span className="font-mono">{scan.branch}</span>
                    <span className="text-border">·</span>
                    <span className="font-mono">{scan.commit}</span>
                    <span className="text-border">·</span>
                    <span>{formatDate(scan.createdAt)}</span>
                    <span className="text-border">·</span>
                    <span>{formatTime(scan.createdAt)}</span>
                    {scan.issueCount > 0 && (
                      <>
                        <span className="text-border">·</span>
                        <span>{scan.issueCount} issues</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Arrow */}
                {isClickable && (
                  <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                )}
              </CardContent>
            </Card>
          );

          return isClickable ? (
            <Link key={scan.id} to={`/dashboard/scans/${scan.id}`}>
              {content}
            </Link>
          ) : (
            <div key={scan.id}>{content}</div>
          );
        })}
      </div>
    </div>
  );
}
