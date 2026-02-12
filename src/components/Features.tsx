import { GitBranch, Shield, Brain, BarChart3, FileText, Zap } from "lucide-react";

const features = [
  {
    icon: GitBranch,
    title: "Dependency Graph",
    description: "Auto-build project dependency graphs using Neo4j. Visualize how your classes and layers connect.",
  },
  {
    icon: Shield,
    title: "Layer Violation Detection",
    description: "Detect Clean Architecture violations — Infrastructure referencing Domain? We'll catch it locally.",
  },
  {
    icon: Brain,
    title: "AI Mentor Feedback",
    description: "Receive structured, mentor-style guidance from AI. Not linting — actual architecture coaching.",
  },
  {
    icon: BarChart3,
    title: "Architecture Score",
    description: "Get a 0–100 score reflecting your codebase health. Track improvements across commits.",
  },
  {
    icon: Zap,
    title: "Circular Dep Detection",
    description: "Automatically find circular dependencies with concrete examples and fix guidance.",
  },
  {
    icon: FileText,
    title: "Markdown Reports",
    description: "Download detailed reports for your team. Share findings, scores, and action items.",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-xs font-mono text-primary tracking-widest uppercase">Features</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-4">
            Everything your codebase <span className="text-gradient">needs</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Local analysis meets AI mentorship. Heavy lifting on your server, intelligence from the cloud.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="group p-6 rounded-xl border border-border bg-card/50 hover:border-glow hover:glow-primary/50 transition-all duration-300"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <f.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
