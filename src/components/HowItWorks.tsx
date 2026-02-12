import { GitBranch, Cpu, Brain, FileText } from "lucide-react";

const steps = [
  {
    icon: GitBranch,
    step: "01",
    title: "Connect Repository",
    description: "Link your GitHub repo. We access only the code structure — no secrets, no data.",
  },
  {
    icon: Cpu,
    step: "02",
    title: "Local Analysis",
    description: "Our engine parses .NET projects, builds dependency graphs, and detects violations locally.",
  },
  {
    icon: Brain,
    step: "03",
    title: "AI Mentorship",
    description: "Only summarized metrics go to AI. You get mentor-style feedback, not a code dump.",
  },
  {
    icon: FileText,
    step: "04",
    title: "Actionable Report",
    description: "Receive a scored report with priorities, refactoring steps, and learning insights.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 relative">
      <div className="absolute inset-0 bg-secondary/30" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="text-xs font-mono text-primary tracking-widest uppercase">How It Works</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3">
            From repo to <span className="text-gradient">insight</span> in minutes
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-0">
          {steps.map((s, i) => (
            <div key={s.step} className="flex gap-6 relative">
              {/* Vertical line */}
              {i < steps.length - 1 && (
                <div className="absolute left-5 top-14 w-px h-full bg-border" />
              )}
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 border border-glow flex items-center justify-center relative z-10">
                <s.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="pb-12">
                <span className="text-xs font-mono text-primary">{s.step}</span>
                <h3 className="text-lg font-semibold text-foreground mt-1 mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
