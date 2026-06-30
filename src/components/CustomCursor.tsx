import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

/**
 * Beach starfish cursor.
 * Position is driven by a requestAnimationFrame lerp loop writing transform
 * directly to a ref — fully decoupled from React state, so it never stops
 * following (even right after a click). Hover/press only affect the wiggle.
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [down, setDown] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    setEnabled(true);

    const targetPos = { x: -100, y: -100 };
    const pos = { x: -100, y: -100 };
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      targetPos.x = e.clientX;
      targetPos.y = e.clientY;
      const el = e.target as HTMLElement | null;
      const interactive = el?.closest?.(
        "a, button, [data-cursor='link'], input, textarea, select, [role='button']"
      );
      setHovering(Boolean(interactive));
    };
    const onDown = () => setDown(true);
    const onUp = () => setDown(false);

    const loop = () => {
      pos.x += (targetPos.x - pos.x) * 0.25;
      pos.y += (targetPos.y - pos.y) * 0.25;
      const el = ref.current;
      if (el) el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]" aria-hidden>
      <div ref={ref} className="absolute top-0 left-0 will-change-transform">
        <motion.div
          style={{ translateX: "-50%", translateY: "-50%" }}
          animate={{
            rotate: hovering ? [-12, 12, -12] : -8,
            scale: down ? 0.8 : hovering ? 1.2 : 1,
          }}
          transition={{
            rotate: hovering
              ? { duration: 0.45, repeat: Infinity, ease: "easeInOut" }
              : { type: "spring", stiffness: 200, damping: 15 },
            scale: { type: "spring", stiffness: 400, damping: 22 },
          }}
        >
          <svg width="30" height="30" viewBox="0 0 100 100" style={{ display: "block" }}>
            <path
              d="M 50 4 L 65.3 29 L 93.7 35.8 L 74.7 58 L 77 87.2 L 50 76 L 23 87.2 L 25.3 58 L 6.3 35.8 L 34.7 29 Z"
              fill="#E68A5B"
              stroke="#C76A40"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            <circle cx="50" cy="40" r="3.4" fill="#F6CBA6" />
            <circle cx="50" cy="52" r="3" fill="#F6CBA6" />
            <circle cx="42" cy="46" r="2.6" fill="#F6CBA6" />
            <circle cx="58" cy="46" r="2.6" fill="#F6CBA6" />
          </svg>
        </motion.div>
      </div>
    </div>
  );
}
