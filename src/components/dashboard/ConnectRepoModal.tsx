import { useState } from "react";
import { Github, Search, CheckCircle2, Loader2, ExternalLink } from "lucide-react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface ConnectRepoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type Step = "connect" | "loading" | "select";

const MOCK_GITHUB_REPOS = [
  { id: 1, name: "order-management", fullName: "amitesh/order-management", language: "C#", updatedAt: "2 days ago", isPrivate: false },
  { id: 2, name: "inventory-api", fullName: "amitesh/inventory-api", language: "C#", updatedAt: "1 week ago", isPrivate: true },
  { id: 3, name: "auth-service", fullName: "amitesh/auth-service", language: "C#", updatedAt: "3 days ago", isPrivate: false },
  { id: 4, name: "reporting-dashboard", fullName: "amitesh/reporting-dashboard", language: "TypeScript", updatedAt: "5 days ago", isPrivate: false },
  { id: 5, name: "shipping-module", fullName: "amitesh/shipping-module", language: "C#", updatedAt: "1 day ago", isPrivate: true },
  { id: 6, name: "customer-portal", fullName: "amitesh/customer-portal", language: "C#", updatedAt: "2 weeks ago", isPrivate: false },
];

export default function ConnectRepoModal({ open, onOpenChange }: ConnectRepoModalProps) {
  const [step, setStep] = useState<Step>("connect");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<number | null>(null);
  const [connecting, setConnecting] = useState(false);
  const { toast } = useToast();

  const filteredRepos = MOCK_GITHUB_REPOS.filter((r) =>
    r.fullName.toLowerCase().includes(search.toLowerCase())
  );

  const handleGitHubAuth = () => {
    setStep("loading");
    // TODO: Redirect to GitHub OAuth endpoint
    setTimeout(() => setStep("select"), 1500);
  };

  const handleConnect = () => {
    if (!selected) return;
    setConnecting(true);
    const repo = MOCK_GITHUB_REPOS.find((r) => r.id === selected);
    // TODO: POST to /api/repositories with selected repo
    setTimeout(() => {
      setConnecting(false);
      onOpenChange(false);
      setStep("connect");
      setSelected(null);
      setSearch("");
      toast({
        title: "Repository connected!",
        description: `${repo?.fullName} has been added to DevSense.`,
      });
    }, 1200);
  };

  const handleClose = (value: boolean) => {
    if (!value) {
      setStep("connect");
      setSelected(null);
      setSearch("");
    }
    onOpenChange(value);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        {/* Step 1: Connect GitHub */}
        {step === "connect" && (
          <>
            <DialogHeader>
              <DialogTitle className="text-lg">Connect Repository</DialogTitle>
              <DialogDescription>
                Authorize DevSense to access your GitHub repositories.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-5 pt-2">
              <div className="p-4 rounded-lg bg-muted/50 border border-border space-y-3">
                <div className="flex items-start gap-3">
                  <Github className="w-5 h-5 text-foreground mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground">GitHub Authorization</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      We'll request read-only access to your repositories. Your code is never stored — only metadata is used for analysis.
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                  <span>Read-only repository access</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                  <span>No code is stored on our servers</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                  <span>Revoke access anytime from GitHub settings</span>
                </div>
              </div>
              <button
                onClick={handleGitHubAuth}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-foreground text-background font-semibold text-sm hover:opacity-90 transition-opacity"
              >
                <Github className="w-4 h-4" />
                Continue with GitHub
              </button>
            </div>
          </>
        )}

        {/* Step 2: Loading */}
        {step === "loading" && (
          <div className="py-12 flex flex-col items-center gap-4">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
            <p className="text-sm text-muted-foreground">Connecting to GitHub...</p>
          </div>
        )}

        {/* Step 3: Select repo */}
        {step === "select" && (
          <>
            <DialogHeader>
              <DialogTitle className="text-lg">Select Repository</DialogTitle>
              <DialogDescription>
                Choose a .NET repository to connect to DevSense.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-1">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search repositories..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-muted border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-colors"
                />
              </div>

              {/* Repo list */}
              <div className="max-h-64 overflow-y-auto space-y-1 -mx-1 px-1">
                {filteredRepos.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-6">No repositories found</p>
                ) : (
                  filteredRepos.map((repo) => (
                    <button
                      key={repo.id}
                      onClick={() => setSelected(repo.id)}
                      className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition-colors ${
                        selected === repo.id
                          ? "bg-primary/10 border border-primary/30"
                          : "hover:bg-muted/50 border border-transparent"
                      }`}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-foreground truncate">{repo.fullName}</span>
                          {repo.isPrivate && (
                            <Badge variant="outline" className="text-[10px] px-1.5 py-0 shrink-0">Private</Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[10px] text-muted-foreground font-mono">{repo.language}</span>
                          <span className="text-[10px] text-muted-foreground">· {repo.updatedAt}</span>
                        </div>
                      </div>
                      {selected === repo.id && (
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                      )}
                    </button>
                  ))
                )}
              </div>

              {/* Connect button */}
              <button
                onClick={handleConnect}
                disabled={!selected || connecting}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-primary text-primary-foreground font-semibold text-sm hover:scale-[1.01] transition-transform disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
              >
                {connecting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  "Connect Repository"
                )}
              </button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
