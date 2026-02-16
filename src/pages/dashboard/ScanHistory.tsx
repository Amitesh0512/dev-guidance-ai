import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const MOCK_SCANS = [
  { id: "scan-1", branch: "main", status: "completed" as const, createdAt: "2026-02-17T02:28:09Z" },
  { id: "scan-2", branch: "main", status: "completed" as const, createdAt: "2026-02-17T01:09:07Z" },
  { id: "scan-3", branch: "main", status: "completed" as const, createdAt: "2026-02-17T01:07:59Z" },
  { id: "scan-4", branch: "https:/", status: "completed" as const, createdAt: "2026-02-17T01:06:54Z" },
  { id: "scan-5", branch: "main", status: "failed" as const, createdAt: "2026-02-16T17:27:18Z" },
];

const statusStyles = {
  completed: "bg-primary/15 text-primary border-primary/20",
  failed: "bg-destructive/15 text-destructive border-destructive/20",
  running: "bg-yellow-400/15 text-yellow-400 border-yellow-400/20",
};

function formatDateTime(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "numeric", day: "numeric", year: "numeric" }) +
    ", " + d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", second: "2-digit", hour12: true });
}

export default function ScanHistory() {
  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Scan History</h1>
        <p className="text-sm text-muted-foreground mt-0.5">View past architecture scans</p>
      </div>

      <div className="space-y-3">
        {MOCK_SCANS.map((scan) => {
          const isClickable = scan.status === "completed";
          const content = (
            <Card className={`border-border bg-card ${isClickable ? "hover:border-primary/20 cursor-pointer" : ""} transition-colors`}>
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <span className="text-sm font-mono text-muted-foreground">—</span>
                  <p className="text-sm text-muted-foreground mt-1">
                    {scan.branch} · {formatDateTime(scan.createdAt)}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className={`text-xs px-3 py-1 capitalize ${statusStyles[scan.status]}`}>
                    {scan.status === "completed" ? "Completed" : scan.status === "failed" ? "Failed" : "Running"}
                  </Badge>
                  {isClickable && <ChevronRight className="w-4 h-4 text-muted-foreground" />}
                </div>
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
