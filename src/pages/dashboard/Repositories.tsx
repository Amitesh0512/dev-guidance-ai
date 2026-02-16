import { FolderGit2, Play, Clock, CheckCircle2, AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const MOCK_REPOS = [
  {
    id: 1,
    name: "payment-gateway",
    org: "amitesh",
    url: "https://github.com/amitesh/payment-gateway",
    lastScan: "2 hours ago",
    score: 72,
    status: "needs_attention" as const,
    branch: "main",
  },
  {
    id: 2,
    name: "user-service",
    org: "amitesh",
    url: "https://github.com/amitesh/user-service",
    lastScan: "3 days ago",
    score: 88,
    status: "healthy" as const,
    branch: "main",
  },
  {
    id: 3,
    name: "notification-api",
    org: "amitesh",
    url: "https://github.com/amitesh/notification-api",
    lastScan: null,
    score: null,
    status: "not_scanned" as const,
    branch: "develop",
  },
];

const statusConfig = {
  healthy: { label: "Healthy", icon: CheckCircle2, className: "text-primary bg-primary/10 border-primary/20" },
  needs_attention: { label: "Needs Attention", icon: AlertTriangle, className: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20" },
  not_scanned: { label: "Not Scanned", icon: Clock, className: "text-muted-foreground bg-muted border-border" },
};

function ScoreBadge({ score }: { score: number | null }) {
  if (score === null) return <span className="text-xs text-muted-foreground">—</span>;
  const color = score >= 80 ? "text-primary" : score >= 60 ? "text-yellow-400" : "text-destructive";
  return <span className={`text-2xl font-bold font-mono ${color}`}>{score}</span>;
}

export default function Repositories() {
  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Repositories</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Manage your connected .NET repositories</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors">
          <FolderGit2 className="w-4 h-4" />
          Connect Repo
        </button>
      </div>

      <div className="space-y-3">
        {MOCK_REPOS.map((repo) => {
          const status = statusConfig[repo.status];
          const StatusIcon = status.icon;
          return (
            <Card key={repo.id} className="border-border bg-card hover:border-primary/20 transition-colors">
              <CardContent className="p-5 flex items-center gap-5">
                {/* Score */}
                <div className="w-16 text-center shrink-0">
                  <ScoreBadge score={repo.score} />
                  {repo.score !== null && <p className="text-[10px] text-muted-foreground">score</p>}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-foreground">
                    {repo.org}/<span className="font-semibold">{repo.name}</span>
                  </h3>
                  <div className="flex items-center gap-3 mt-1">
                    <Badge variant="outline" className={`text-[10px] px-2 py-0 ${status.className}`}>
                      <StatusIcon className="w-3 h-3 mr-1" />
                      {status.label}
                    </Badge>
                    <span className="text-xs text-muted-foreground font-mono">{repo.branch}</span>
                    {repo.lastScan && (
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {repo.lastScan}
                      </span>
                    )}
                  </div>
                </div>

                {/* Action */}
                <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-primary text-primary-foreground text-xs font-semibold hover:scale-[1.02] transition-transform shrink-0">
                  <Play className="w-3.5 h-3.5" />
                  Run Scan
                </button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
