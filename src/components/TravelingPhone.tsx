import { useEffect, useRef, useState } from "react";
import phoneFront from "../assets/phone_front.png";

const SECTIONS = ["ABOUT", "SKILLS", "PORTFOLIO", "CONTACT"];
const SECTION_IDS = ["about", "skills", "portfolio", "contact"];
const GAP = 2.2; // em per LCD line (larger = more spacing between items)
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/**
 * The cut-out phone that travels with scroll (emerges top-centre → docks left).
 * Its LCD shows the full section list with the current one highlighted and
 * centred — so the screen doubles as the menu AND the "you are here" indicator.
 * Desktop only.
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
      const q = Math.min(1, Math.max(0, (p - 0.6) / 0.4));
      const e = q * q * (3 - 2 * q);
      const tx = lerp(0, -30, e);
      const ty = lerp(-14, -4, e);
      const sc = lerp(0.82, 0.92, e);
      const op = Math.min(1, q * 1.8);
      const el = wrap.current;
      if (el) {
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

  const activeDetail = Math.max(0, Math.min(SECTIONS.length - 1, active - 1));
  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

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
          {/* LCD: clickable section list + current-position highlight (centred) */}
          <div
            className="absolute overflow-hidden"
            style={{ left: "18%", top: "16%", width: "62%", height: "31%" }}
          >
            <ul
              className="font-nokia absolute right-0 left-0"
              style={{
                top: "50%",
                transform: `translateY(-${(activeDetail + 0.5) * GAP}em)`,
                transition: "transform .45s cubic-bezier(.16,1,.3,1)",
                fontSize: "1.7vh",
                pointerEvents: active >= 1 ? "auto" : "none",
              }}
            >
              {SECTIONS.map((s, i) => {
                const on = i === activeDetail;
                return (
                  <li
                    key={s}
                    data-cursor="link"
                    onClick={() => go(SECTION_IDS[i])}
                    className={`flex items-center gap-1 px-1.5 whitespace-nowrap transition-opacity ${
                      on
                        ? "bg-[#2A3616] text-[#c7d99a] opacity-100"
                        : "text-[#2A3616] opacity-40 hover:opacity-80"
                    }`}
                    style={{ height: `${GAP}em` }}
                  >
                    <span style={{ width: "1.1em" }}>{i + 1}</span>
                    {s}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
