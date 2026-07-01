import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { projects } from "../data/projects";
import ProjectModal from "./ProjectModal";

const EASE = [0.16, 1, 0.3, 1] as const;
const N = projects.length;

/** Standalone retro LCD menu — no phone object, just the green screen. */
function RetroMenu({
  selected,
  setSelected,
}: {
  selected: number;
  setSelected: (n: number) => void;
}) {
  const up = () => setSelected((selected - 1 + N) % N);
  const down = () => setSelected((selected + 1) % N);

  return (
    <div className="w-[240px] shrink-0 select-none">
      {/* device frame */}
      <div className="rounded-2xl bg-[#2c3a1c] p-3 shadow-[0_20px_45px_-18px_rgba(20,50,58,0.5)]">
        {/* green screen */}
        <div className="relative overflow-hidden rounded-md bg-[#c7d99a] px-3 py-2.5 ring-1 ring-[#2A3616]/30 ring-inset">
          {/* scanlines */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg,#000 0 1px,transparent 1px 3px)",
            }}
            aria-hidden
          />
          <div className="font-nokia mb-2 flex items-center justify-between border-b border-[#2A3616]/30 pb-1.5 text-[11px] text-[#2A3616]">
            <span>PORTFOLIO</span>
            <span>
              {selected + 1}/{N}
            </span>
          </div>
          <ul className="space-y-1">
            {projects.map((p, i) => (
              <li key={p.name}>
                <button
                  onClick={() => setSelected(i)}
                  className={`font-nokia flex w-full items-center gap-1.5 px-1.5 py-1 text-left text-[15px] leading-none ${
                    i === selected
                      ? "bg-[#2A3616] text-[#c7d99a]"
                      : "text-[#2A3616]"
                  }`}
                >
                  <span className="w-2">{i === selected ? "▸" : ""}</span>
                  {p.lcd}
                </button>
              </li>
            ))}
          </ul>
          <div className="font-nokia mt-2 border-t border-[#2A3616]/30 pt-1.5 text-[9px] tracking-wide text-[#2A3616]/80">
            ▲▼ SELECT
          </div>
        </div>
      </div>

      {/* controls */}
      <div className="mt-4 flex items-center justify-center gap-3">
        <button
          onClick={up}
          aria-label="이전 프로젝트"
          className="h-8 w-12 rounded-lg border border-ink/15 bg-white/80 text-ink/70 shadow-sm transition-colors hover:bg-white"
        >
          ▲
        </button>
        <button
          onClick={down}
          aria-label="다음 프로젝트"
          className="h-8 w-12 rounded-lg border border-ink/15 bg-white/80 text-ink/70 shadow-sm transition-colors hover:bg-white"
        >
          ▼
        </button>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const p = projects[selected];

  return (
    <section
      id="portfolio"
      className="scene relative flex h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-b from-white via-[#eaf6fb] to-[#dbeef6] px-6 py-20"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-6">
          <p className="font-nokia mb-2 text-[12px] tracking-widest text-ocean">
            03 — PORTFOLIO
          </p>
          <h2 className="font-instrument text-[30px] leading-none tracking-tight text-ink md:text-[44px]">
            팀 · 개인 프로젝트
          </h2>
        </div>

        {/* mobile selector */}
        <div className="mb-5 flex flex-wrap gap-2 md:hidden">
          {projects.map((proj, i) => (
            <button
              key={proj.name}
              onClick={() => setSelected(i)}
              className={`rounded-full px-3 py-1.5 text-[12px] transition-colors ${
                i === selected
                  ? "bg-ocean text-white"
                  : "border border-ink/15 bg-white/70 text-ink"
              }`}
            >
              {proj.lcd}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-10">
          <div className="hidden md:block">
            <RetroMenu selected={selected} setSelected={setSelected} />
          </div>

          {/* big preview */}
          <div className="min-w-0 flex-1">
            <AnimatePresence mode="wait">
              <motion.article
                key={selected}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="grid gap-7 lg:grid-cols-2"
              >
                {/* image — fully shown, centered inside the frame */}
                <div className="relative overflow-hidden rounded-2xl border border-white/70 bg-[#eef4f7] shadow-[0_20px_45px_-22px_rgba(20,50,58,0.5)]">
                  <div className="flex aspect-[16/11] w-full items-center justify-center p-2.5">
                    {p.image ? (
                      <img
                        src={p.image}
                        alt={`${p.name} 미리보기`}
                        className="max-h-full max-w-full rounded-lg object-contain"
                      />
                    ) : (
                      <div className="font-nokia flex h-full w-full items-center justify-center text-[#2A3616]/50">
                        no preview
                      </div>
                    )}
                  </div>
                  <span className="font-nokia absolute top-3 left-3 rounded-full bg-ink/75 px-2.5 py-1 text-[10px] tracking-wide text-white">
                    {p.group}
                  </span>
                </div>

                {/* details */}
                <div className="flex flex-col">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-instrument text-[30px] leading-none tracking-tight text-ink md:text-[38px]">
                      {p.name}
                    </h3>
                    <span className="shrink-0 text-[12px] text-ink/45">
                      {p.period}
                    </span>
                  </div>

                  <p className="mt-2 text-[15px] leading-relaxed text-ink/75">
                    {p.tagline}
                  </p>
                  {p.team && (
                    <p className="mt-1 text-[12px] text-ink/45">
                      팀 구성 · {p.team}
                    </p>
                  )}

                  <div className="mt-5">
                    <p className="font-nokia text-[11px] tracking-wide text-ocean">
                      기획 의도
                    </p>
                    <p className="mt-1.5 text-[14px] leading-relaxed text-ink/75">
                      {p.intent}
                    </p>
                  </div>

                  <div className="mt-auto flex flex-wrap items-center gap-4 pt-6">
                    <button
                      onClick={() => setOpen(true)}
                      className="rounded-full bg-ink px-4 py-2 text-[13px] font-medium text-white transition-opacity hover:opacity-85"
                    >
                      Read more
                    </button>
                    {p.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-[14px] font-medium text-accent transition-opacity hover:opacity-60"
                      >
                        {link.label}
                        <span aria-hidden>↗</span>
                      </a>
                    ))}
                  </div>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <ProjectModal project={open ? p : null} onClose={() => setOpen(false)} />
    </section>
  );
}
