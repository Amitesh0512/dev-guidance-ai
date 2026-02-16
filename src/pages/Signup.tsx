import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, ArrowRight, Github, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const PASSWORD_RULES = [
  { label: "At least 8 characters", test: (p: string) => p.length >= 8 },
  { label: "One uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
  { label: "One number", test: (p: string) => /\d/.test(p) },
];

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const allPassed = PASSWORD_RULES.every((r) => r.test(password));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password.trim()) {
      toast({ title: "Missing fields", description: "Please fill in all fields.", variant: "destructive" });
      return;
    }
    if (!allPassed) {
      toast({ title: "Weak password", description: "Please meet all password requirements.", variant: "destructive" });
      return;
    }
    setLoading(true);
    // TODO: POST to /api/auth/register with { name, email, password }
    setTimeout(() => {
      toast({ title: "Signup simulated", description: "Backend integration pending." });
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left: Branding panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden items-center justify-center"
        style={{ background: "var(--gradient-hero)" }}>
        <div className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "radial-gradient(circle at 30% 40%, hsl(155 100% 50% / 0.15) 0%, transparent 60%), radial-gradient(circle at 70% 70%, hsl(175 80% 45% / 0.1) 0%, transparent 50%)",
          }}
        />
        <div className="relative z-10 px-16 max-w-lg">
          <Link to="/" className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
              <span className="text-sm font-bold text-primary-foreground font-mono">DS</span>
            </div>
            <span className="text-2xl font-bold text-foreground tracking-tight">DevSense</span>
          </Link>
          <h2 className="text-3xl font-bold text-foreground leading-tight mb-4">
            Start building<br />
            <span className="text-gradient">better architecture</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Join developers who use AI-powered analysis to catch circular dependencies, layer violations, and high coupling before they become tech debt.
          </p>
          <div className="mt-10 space-y-3">
            {["Detect violations before code review", "AI mentor explains why it matters", "Downloadable Markdown reports"].map((f) => (
              <div key={f} className="flex items-center gap-3 text-sm text-muted-foreground">
                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-primary" />
                </div>
                {f}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right: Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <Link to="/" className="lg:hidden flex items-center gap-2 mb-10">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <span className="text-xs font-bold text-primary-foreground font-mono">DS</span>
            </div>
            <span className="text-xl font-bold text-foreground">DevSense</span>
          </Link>

          <h1 className="text-2xl font-bold text-foreground mb-1">Create your account</h1>
          <p className="text-sm text-muted-foreground mb-8">Start with 4 free scans every month</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Jane Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-card border-border h-11"
                autoComplete="name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-card border-border h-11"
                autoComplete="email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-card border-border h-11 pr-10"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {password && (
                <div className="space-y-1 pt-1">
                  {PASSWORD_RULES.map((r) => {
                    const passed = r.test(password);
                    return (
                      <div key={r.label} className="flex items-center gap-2 text-xs">
                        <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center ${passed ? "bg-primary/20" : "bg-muted"}`}>
                          {passed && <Check className="w-2.5 h-2.5 text-primary" />}
                        </div>
                        <span className={passed ? "text-primary" : "text-muted-foreground"}>{r.label}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <Button type="submit" disabled={loading} className="w-full h-11 bg-gradient-primary text-primary-foreground font-semibold hover:scale-[1.02] transition-transform">
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Creating account…
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Create Account <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </Button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-background px-3 text-xs text-muted-foreground">or continue with</span>
            </div>
          </div>

          <Button variant="outline" className="w-full h-11 border-border hover:border-primary/40 gap-2">
            <Github className="w-4 h-4" /> GitHub
          </Button>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
