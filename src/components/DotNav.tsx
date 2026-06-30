import { useEffect, useState } from "react";

const SCENES = [
  { id: "home", label: "홈" },
  { id: "about", label: "자기소개" },
  { id: "skills", label: "스킬" },
  { id: "portfolio", label: "포트폴리오" },
  { id: "contact", label: "연락처" },
];

export default function DotNav() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const root = document.getElementById("deck");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { root, threshold: 0.55 }
    );
    SCENES.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <nav
      className="fixed top-1/2 right-5 z-50 flex -translate-y-1/2 flex-col items-end gap-3.5"
      aria-label="섹션 이동"
    >
      {SCENES.map((s) => {
        const on = active === s.id;
        return (
          <button
            key={s.id}
            onClick={() => go(s.id)}
            className="group flex items-center gap-2"
            aria-label={s.label}
            aria-current={on}
          >
            <span
              className={`font-sans text-[11px] tracking-wide text-ink transition-all duration-300 ${
                on ? "opacity-100" : "opacity-0 group-hover:opacity-60"
              }`}
            >
              {s.label}
            </span>
            <span
              className={`h-2.5 w-2.5 rounded-full border transition-all duration-300 ${
                on
                  ? "scale-100 border-ocean bg-ocean"
                  : "scale-75 border-ink/40 bg-transparent group-hover:border-ink/70"
              }`}
            />
          </button>
        );
      })}
    </nav>
  );
}
