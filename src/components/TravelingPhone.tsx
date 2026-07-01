import { useEffect, useRef, useState } from "react";
import phoneFront from "../assets/phone_front.png";

const LABELS = ["01 ABOUT ME", "02 SKILLS", "03 PORTFOLIO", "04 CONTACT"];
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/**
 * The cut-out phone that travels with scroll: it emerges from the top-centre
 * as you leave the hero, moving left + shrinking + rotating in 3D, then docks
 * on the left while its LCD names the current section. Desktop only.
 */
export default function TravelingPhone() {
  const wrap = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);

  useEffect(() => {
    const deck = document.getElementById("deck");
    if (!deck) return;
    let raf = 0;
    const apply = () => {
      const vh = deck.clientHeight || window.innerHeight;
      const st = deck.scrollTop;
      const p = Math.min(1, Math.max(0, st / vh));
      // stay fully hidden over the hero — only emerge later, once well past it
      const q = Math.min(1, Math.max(0, (p - 0.6) / 0.4));
      const e = q * q * (3 - 2 * q); // smoothstep
      const tx = lerp(0, -30, e); // vw: centre → left
      const ty = lerp(-14, -4, e); // vh: emerge from above, dock a touch high
      const sc = lerp(0.82, 0.92, e);
      const op = Math.min(1, q * 1.8);
      const el = wrap.current;
      if (el) {
        // front-facing (no rotateY tilt)
        el.style.transform = `translate(-50%,-50%) translate(${tx}vw,${ty}vh) scale(${sc})`;
        el.style.opacity = String(op);
      }
      const a = Math.min(4, Math.round(st / vh));
      if (a !== activeRef.current) {
        activeRef.current = a;
        setActive(a);
      }
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(apply);
    };
    deck.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", apply);
    apply();
    return () => {
      deck.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", apply);
      cancelAnimationFrame(raf);
    };
  }, []);

  const label = active >= 1 ? LABELS[active - 1] : LABELS[0];

  return (
    <div
      className="pointer-events-none fixed top-1/2 left-1/2 z-40 hidden md:block"
      style={{ perspective: "1100px" }}
      aria-hidden
    >
      <div
        ref={wrap}
        style={{
          opacity: 0,
          transformStyle: "preserve-3d",
          willChange: "transform, opacity",
        }}
      >
        <div className="relative">
          <img
            src={phoneFront}
            alt=""
            draggable={false}
            className="h-[72vh] max-h-[620px] w-auto drop-shadow-2xl"
          />
          <div
            className="absolute flex items-center justify-center text-center"
            style={{ left: "18%", top: "16%", width: "62%", height: "31%" }}
          >
            <span
              className="font-nokia leading-tight text-[#2A3616]"
              style={{ fontSize: "2vh" }}
            >
              {label}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
