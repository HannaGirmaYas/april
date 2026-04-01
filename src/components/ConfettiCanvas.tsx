import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  vr: number;
  color: string;
  size: number;
};

const COLORS = [
  "#ff6b35",
  "#ff8c42",
  "#ffb347",
  "#ff1493",
  "#ffd93d",
  "#fff5f0",
  "#c44569",
];

type Props = {
  active: boolean;
  className?: string;
};

export function ConfettiCanvas({ active, className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles: Particle[] = [];
    const spawn = () => {
      for (let i = 0; i < 3; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: -20 - Math.random() * 100,
          vx: (Math.random() - 0.5) * 3,
          vy: 2 + Math.random() * 4,
          rot: Math.random() * Math.PI * 2,
          vr: (Math.random() - 0.5) * 0.2,
          color: COLORS[Math.floor(Math.random() * COLORS.length)]!,
          size: 6 + Math.random() * 8,
        });
      }
    };

    let last = performance.now();
    const loop = (now: number) => {
      const dt = Math.min(32, now - last);
      last = now;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (particles.length < 220 && Math.random() > 0.65) spawn();

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]!;
        p.x += p.vx * (dt / 16);
        p.y += p.vy * (dt / 16);
        p.rot += p.vr * (dt / 16);
        p.vy += 0.04 * (dt / 16);

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        ctx.restore();

        if (p.y > canvas.height + 40) particles.splice(i, 1);
      }

      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [active]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={
        className
          ? undefined
          : {
              position: "fixed",
              inset: 0,
              pointerEvents: "none",
              zIndex: 5,
            }
      }
      aria-hidden
    />
  );
}
