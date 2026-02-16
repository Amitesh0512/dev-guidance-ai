import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, GitBranch, Search, ArrowRight, ShieldCheck, Zap, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const STEPS = [
  { icon: Search, label: "Paste your GitHub URL" },
  { icon: GitBranch, label: "Select branch" },
  { icon: Zap, label: "Get AI mentor feedback" },
];

export default function StartScan() {
  const [repoUrl, setRepoUrl] = useState("");
  const [branch, setBranch] = useState("main");
  const [isScanning, setIsScanning] = useState(false);
  const { toast } = useToast();

  const isValidUrl = repoUrl.includes("github.com/") && repoUrl.trim().length > 15;

  const handleScan = () => {
    if (!isValidUrl) return;
    setIsScanning(true);
    // TODO: POST to /api/scans with { repoUrl, branch }
    setTimeout(() => {
      setIsScanning(false);
      toast({
        title: "Scan queued!",
        description: "We'll analyze your repository and notify you when results are ready.",
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background relative">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />

      <div className="relative z-10">
        {/* Nav */}
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

        <main className="max-w-2xl mx-auto px-6 pt-16 pb-20">
          {/* Heading */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Scan Your Architecture
            </h1>
            <p className="text-muted-foreground max-w-md mx-auto">
              Paste your .NET repository URL and get AI-powered architecture feedback in minutes.
            </p>
          </div>

          {/* How it works mini */}
          <div className="flex items-center justify-center gap-6 mb-12">
            {STEPS.map((step, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <step.icon className="w-3.5 h-3.5 text-primary" />
                </div>
                <span className="text-xs text-muted-foreground hidden sm:inline">{step.label}</span>
                {i < STEPS.length - 1 && <ArrowRight className="w-3 h-3 text-border ml-2" />}
              </div>
            ))}
          </div>

          {/* Scan Form */}
          <Card className="border-border bg-card">
            <CardContent className="p-6 md:p-8 space-y-6">
              {/* Repo URL */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  GitHub Repository URL
                </label>
                <div className="relative">
                  <GitBranch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="url"
                    placeholder="https://github.com/your-org/your-repo"
                    value={repoUrl}
                    onChange={(e) => setRepoUrl(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-muted border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-colors font-mono"
                  />
                </div>
                {repoUrl && !isValidUrl && (
                  <p className="text-xs text-destructive mt-1.5">Please enter a valid GitHub URL</p>
                )}
              </div>

              {/* Branch */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Branch
                </label>
                <select
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-colors font-mono appearance-none"
                >
                  <option value="main">main</option>
                  <option value="master">master</option>
                  <option value="develop">develop</option>
                </select>
              </div>

              {/* Submit */}
              <button
                onClick={handleScan}
                disabled={!isValidUrl || isScanning}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-gradient-primary text-primary-foreground font-semibold text-sm hover:scale-[1.01] transition-transform disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
              >
                {isScanning ? (
                  <>
                    <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4" />
                    Start Architecture Scan
                  </>
                )}
              </button>
            </CardContent>
          </Card>

          {/* Trust signals */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-primary" />
              <span>Code never stored</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-primary" />
              <span>Results in ~2 minutes</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-primary" />
              <span>4 free scans/month</span>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
