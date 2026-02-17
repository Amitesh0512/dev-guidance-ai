import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";

export default function DeltaBadge({ current, previous, invert = false }: { current: number; previous: number; invert?: boolean }) {
  const delta = current - previous;
  if (delta === 0) return <span className="text-xs text-muted-foreground flex items-center gap-0.5"><Minus className="w-3 h-3" /> 0</span>;
  const isPositive = invert ? delta < 0 : delta > 0;
  return (
    <span className={`text-xs font-medium flex items-center gap-0.5 ${isPositive ? "text-primary" : "text-destructive"}`}>
      {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
      {delta > 0 ? "+" : ""}{delta}
    </span>
  );
}
