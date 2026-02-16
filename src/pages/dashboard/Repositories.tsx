import { useState } from "react";
import { Plus, Play, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import ConnectRepoModal from "@/components/dashboard/ConnectRepoModal";

const MOCK_REPOS = [
  { id: 1, name: "payment-gateway", org: "amitesh", branch: "main" },
  { id: 2, name: "user-service", org: "amitesh", branch: "main" },
  { id: 3, name: "notification-api", org: "amitesh", branch: "main" },
];

export default function Repositories() {
  const [connectOpen, setConnectOpen] = useState(false);

  return (
    <div className="max-w-4xl space-y-6">
      <ConnectRepoModal open={connectOpen} onOpenChange={setConnectOpen} />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Repositories</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Manage connected .NET repositories</p>
        </div>
        <button
          onClick={() => setConnectOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Repository
        </button>
      </div>

      <div className="space-y-3">
        {MOCK_REPOS.map((repo) => (
          <Card key={repo.id} className="border-border bg-card">
            <CardContent className="p-5 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Branch: {repo.branch}</span>
              <div className="flex items-center gap-2">
                <button className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors">
                  <Play className="w-3.5 h-3.5" />
                  Scan
                </button>
                <button className="p-2 rounded-lg text-destructive hover:bg-destructive/10 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
