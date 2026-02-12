import { ArrowRight, Zap } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />
      
      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-1/3 right-1/4 w-72 h-72 rounded-full bg-accent/5 blur-[100px] animate-pulse-glow" style={{ animationDelay: '1.5s' }} />

      <div className="relative z-10 container mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-glow glass mb-8 animate-fade-in">
          <Zap className="w-3.5 h-3.5 text-primary" />
          <span className="text-xs font-mono text-primary tracking-wide">AI-POWERED ARCHITECTURE MENTOR</span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.9] mb-6 animate-slide-up">
          <span className="text-foreground">Ship Better</span>
          <br />
          <span className="text-gradient">.NET Architecture</span>
        </h1>

        <p className="max-w-xl mx-auto text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 animate-slide-up" style={{ animationDelay: '0.15s' }}>
          DevSense scans your repository, detects architectural flaws, and delivers 
          mentor-style guidance — like having a senior architect on call.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <button className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-gradient-primary text-primary-foreground font-semibold text-sm tracking-wide transition-all hover:scale-105 glow-primary">
            Start Free Scan
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg border border-glow text-foreground font-medium text-sm hover:bg-secondary transition-colors">
            View Demo
          </button>
        </div>

        {/* Terminal preview */}
        <div className="mt-16 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.45s' }}>
          <div className="rounded-xl border border-glow glass overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
              <div className="w-3 h-3 rounded-full bg-destructive/60" />
              <div className="w-3 h-3 rounded-full bg-primary/30" />
              <div className="w-3 h-3 rounded-full bg-primary/60" />
              <span className="ml-3 text-xs font-mono text-muted-foreground">devsense scan --repo my-app</span>
            </div>
            <div className="p-5 text-left font-mono text-sm space-y-1.5">
              <p className="text-muted-foreground">
                <span className="text-primary">→</span> Scanning 47 projects, 312 classes...
              </p>
              <p className="text-muted-foreground">
                <span className="text-primary">→</span> Dependency graph built <span className="text-primary">(Neo4j)</span>
              </p>
              <p className="text-muted-foreground">
                <span className="text-primary">⚠</span> Found <span className="text-accent">3 circular dependencies</span>
              </p>
              <p className="text-muted-foreground">
                <span className="text-primary">⚠</span> Found <span className="text-accent">5 layer violations</span>
              </p>
              <p className="text-primary font-semibold">
                ✓ Architecture Score: 72/100
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
