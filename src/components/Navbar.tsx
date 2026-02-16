import { Link } from "react-router-dom";
import { Github } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-gradient-primary flex items-center justify-center">
            <span className="text-xs font-bold text-primary-foreground font-mono">DS</span>
          </div>
          <span className="font-bold text-foreground tracking-tight">DevSense</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
          <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">How It Works</a>
          <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
        </div>

        <div className="flex items-center gap-3">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
            <Github className="w-5 h-5" />
          </a>
          <Link to="/login" className="px-4 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground transition-colors">
            Log In
          </Link>
          <Link to="/signup" className="px-5 py-2 rounded-lg bg-gradient-primary text-primary-foreground text-sm font-semibold hover:scale-105 transition-transform">
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
