import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, ArrowRight, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      toast({ title: "Missing fields", description: "Please fill in all fields.", variant: "destructive" });
      return;
    }
    setLoading(true);
    // TODO: POST to /api/auth/login with { email, password }
    // Store JWT in httpOnly cookie or secure storage
    setTimeout(() => {
      toast({ title: "Login simulated", description: "Backend integration pending." });
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
            Your AI-powered<br />
            <span className="text-gradient">Architecture Mentor</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Scan your .NET repositories, detect architectural violations, and receive mentor-style guidance to level up your codebase.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-4">
            {[
              { val: "4", label: "Scans / mo" },
              { val: "<2s", label: "Analysis" },
              { val: "AI", label: "Mentorship" },
            ].map((s) => (
              <div key={s.label} className="p-3 rounded-lg bg-card/50 border border-border text-center">
                <p className="text-lg font-bold font-mono text-primary">{s.val}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right: Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <Link to="/" className="lg:hidden flex items-center gap-2 mb-10">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <span className="text-xs font-bold text-primary-foreground font-mono">DS</span>
            </div>
            <span className="text-xl font-bold text-foreground">DevSense</span>
          </Link>

          <h1 className="text-2xl font-bold text-foreground mb-1">Welcome back</h1>
          <p className="text-sm text-muted-foreground mb-8">Sign in to your account to continue</p>

          <form onSubmit={handleSubmit} className="space-y-5">
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
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <button type="button" className="text-xs text-primary hover:underline">
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-card border-border h-11 pr-10"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" disabled={loading} className="w-full h-11 bg-gradient-primary text-primary-foreground font-semibold hover:scale-[1.02] transition-transform">
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Signing in…
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Sign In <ArrowRight className="w-4 h-4" />
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
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
