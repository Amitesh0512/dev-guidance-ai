import { useEffect, useRef } from "react";

interface Node {
  id: string;
  layer: string;
  x: number;
  y: number;
}

interface Edge {
  from: string;
  to: string;
  violation: boolean;
}

const LAYERS = ["API", "Application", "Domain", "Infrastructure"];

const LAYER_COLORS: Record<string, string> = {
  API: "hsl(155, 100%, 50%)",
  Application: "hsl(175, 80%, 45%)",
  Domain: "hsl(45, 100%, 55%)",
  Infrastructure: "hsl(270, 60%, 55%)",
};

const NODES: Node[] = [
  { id: "PaymentController", layer: "API", x: 120, y: 60 },
  { id: "OrderController", layer: "API", x: 320, y: 60 },
  { id: "UserController", layer: "API", x: 520, y: 60 },

  { id: "OrderService", layer: "Application", x: 100, y: 180 },
  { id: "PaymentService", layer: "Application", x: 300, y: 180 },
  { id: "UserService", layer: "Application", x: 500, y: 180 },
  { id: "CacheManager", layer: "Application", x: 680, y: 180 },

  { id: "Order", layer: "Domain", x: 150, y: 300 },
  { id: "Payment", layer: "Domain", x: 340, y: 300 },
  { id: "Invoice", layer: "Domain", x: 530, y: 300 },

  { id: "PaymentRepo", layer: "Infrastructure", x: 100, y: 420 },
  { id: "EmailService", layer: "Infrastructure", x: 300, y: 420 },
  { id: "DbContext", layer: "Infrastructure", x: 500, y: 420 },
  { id: "CacheService", layer: "Infrastructure", x: 680, y: 420 },
];

const EDGES: Edge[] = [
  { from: "PaymentController", to: "PaymentService", violation: false },
  { from: "OrderController", to: "OrderService", violation: false },
  { from: "UserController", to: "UserService", violation: false },
  { from: "OrderService", to: "Order", violation: false },
  { from: "PaymentService", to: "Payment", violation: false },
  { from: "UserService", to: "DbContext", violation: true },
  { from: "OrderService", to: "PaymentService", violation: true },
  { from: "PaymentService", to: "OrderService", violation: true },
  { from: "PaymentRepo", to: "PaymentController", violation: true },
  { from: "Invoice", to: "Payment", violation: true },
  { from: "Payment", to: "Invoice", violation: true },
  { from: "EmailService", to: "UserService", violation: false },
  { from: "CacheService", to: "CacheManager", violation: true },
  { from: "DbContext", to: "Order", violation: false },
];

function getNode(id: string) {
  return NODES.find((n) => n.id === id)!;
}

export default function DependencyGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const W = 800;
    const H = 500;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = `${W}px`;
    canvas.style.height = `${H}px`;
    ctx.scale(dpr, dpr);

    // BG
    ctx.fillStyle = "hsl(220, 18%, 5%)";
    ctx.fillRect(0, 0, W, H);

    // Layer bands
    const layerY = [30, 150, 270, 390];
    LAYERS.forEach((l, i) => {
      ctx.fillStyle = `hsla(220, 14%, 14%, 0.4)`;
      ctx.fillRect(10, layerY[i], W - 20, 100);
      ctx.fillStyle = "hsla(210, 20%, 50%, 0.5)";
      ctx.font = "11px Inter, sans-serif";
      ctx.fillText(l, 18, layerY[i] + 16);
    });

    // Edges
    EDGES.forEach((e) => {
      const from = getNode(e.from);
      const to = getNode(e.to);
      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(to.x, to.y);
      if (e.violation) {
        ctx.strokeStyle = "hsla(0, 72%, 51%, 0.7)";
        ctx.setLineDash([5, 4]);
        ctx.lineWidth = 1.5;
      } else {
        ctx.strokeStyle = "hsla(155, 100%, 50%, 0.2)";
        ctx.setLineDash([]);
        ctx.lineWidth = 1;
      }
      ctx.stroke();
      ctx.setLineDash([]);

      // Arrow
      const angle = Math.atan2(to.y - from.y, to.x - from.x);
      const arrLen = 6;
      const mx = to.x - Math.cos(angle) * 18;
      const my = to.y - Math.sin(angle) * 18;
      ctx.beginPath();
      ctx.moveTo(mx, my);
      ctx.lineTo(mx - arrLen * Math.cos(angle - 0.4), my - arrLen * Math.sin(angle - 0.4));
      ctx.lineTo(mx - arrLen * Math.cos(angle + 0.4), my - arrLen * Math.sin(angle + 0.4));
      ctx.closePath();
      ctx.fillStyle = e.violation ? "hsla(0, 72%, 51%, 0.7)" : "hsla(155, 100%, 50%, 0.3)";
      ctx.fill();
    });

    // Nodes
    NODES.forEach((n) => {
      const color = LAYER_COLORS[n.layer];
      ctx.beginPath();
      ctx.arc(n.x, n.y, 14, 0, Math.PI * 2);
      ctx.fillStyle = "hsl(220, 18%, 7%)";
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = color;
      ctx.stroke();

      ctx.fillStyle = "hsl(210, 20%, 85%)";
      ctx.font = "10px 'JetBrains Mono', monospace";
      ctx.textAlign = "center";
      ctx.fillText(n.id, n.x, n.y + 28);
    });
  }, []);

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[800px]">
        <canvas ref={canvasRef} className="w-full rounded-lg" />
        <div className="flex items-center gap-6 mt-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-8 h-px bg-primary/40" />
            <span>Valid dependency</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-px border-t-2 border-dashed border-destructive/70" />
            <span>Violation</span>
          </div>
          {LAYERS.map((l) => (
            <div key={l} className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: LAYER_COLORS[l] }} />
              <span>{l}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
