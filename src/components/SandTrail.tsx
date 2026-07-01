import { useEffect, useRef } from "react";

type Grain = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  max: number;
  size: number;
  color: string;
};

const COLORS = ["#e9dab4", "#dcc79a", "#f0e4c6", "#cbb98c", "#e2cfa0"];

/**
 * Sand-grain cursor trail: as the pointer moves it kicks up tiny sand grains
 * that scatter, fall with a little gravity, and fade. Canvas-based for perf.
 * Hidden on touch devices.
 */
export default function SandTrail() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const grains: Grain[] = [];
    let lastX = 0;
    let lastY = 0;
    let raf = 0;

    const spawn = (x: number, y: number, count: number) => {
      for (let i = 0; i < count && grains.length < 400; i++) {
        const a = Math.random() * Math.PI * 2;
        const sp = Math.random() * 1.7 + 0.2;
        grains.push({
          x,
          y,
          vx: Math.cos(a) * sp,
          vy: Math.sin(a) * sp - 0.4,
          life: 0,
          max: 42 + Math.random() * 34,
          size: Math.random() * 1.6 + 0.7,
          color: COLORS[(Math.random() * COLORS.length) | 0],
        });
      }
    };

    const onMove = (e: PointerEvent) => {
      const d = Math.hypot(e.clientX - lastX, e.clientY - lastY);
      if (d > 5) {
        spawn(e.clientX, e.clientY, Math.min(5, 1 + ((d / 12) | 0)));
        lastX = e.clientX;
        lastY = e.clientY;
      }
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const loop = () => {
      ctx.clearRect(0, 0, w, h);
      for (let i = grains.length - 1; i >= 0; i--) {
        const g = grains[i];
        g.life++;
        g.vy += 0.05;
        g.vx *= 0.98;
        g.x += g.vx;
        g.y += g.vy;
        const t = g.life / g.max;
        if (t >= 1) {
          grains.splice(i, 1);
          continue;
        }
        ctx.globalAlpha = 1 - t;
        ctx.fillStyle = g.color;
        ctx.fillRect(g.x, g.y, g.size, g.size);
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="pointer-events-none fixed inset-0 z-[9998]"
      aria-hidden
    />
  );
}
