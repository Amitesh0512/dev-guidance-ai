import { Check, ArrowRight } from "lucide-react";

const included = [
  "4 architecture scans / month",
  "GitHub repo integration",
  ".NET project parsing",
  "Dependency graph (Neo4j)",
  "AI mentor feedback",
  "Downloadable Markdown report",
  "Architecture score tracking",
  "Commit-based caching",
];

const Pricing = () => {
  return (
    <section id="pricing" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-xs font-mono text-primary tracking-widest uppercase">Pricing</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-4">
            Start for <span className="text-gradient">free</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            No credit card required. Get your first architecture scan in under 5 minutes.
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <div className="rounded-2xl border border-glow glass p-8 glow-primary relative overflow-hidden">
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
            
            <div className="relative z-10">
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-mono mb-4">MVP EARLY ACCESS</span>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-5xl font-black text-foreground">Free</span>
              </div>
              <p className="text-muted-foreground text-sm mb-8">4 scans per month • Individual developers</p>

              <ul className="space-y-3 mb-8">
                {included.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-secondary-foreground">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <button className="w-full group inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg bg-gradient-primary text-primary-foreground font-semibold text-sm tracking-wide transition-all hover:scale-[1.02] glow-primary">
                Get Started
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
