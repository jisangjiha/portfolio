import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import TypingText from "./TypingText";
import { projects } from "../data/projects";
import ProjectModal from "./ProjectModal";
import { typo } from "../typeScale";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Portfolio() {
  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const p = projects[selected];

  return (
    <section
      id="portfolio"
      className="scene relative flex min-h-screen w-full items-center justify-center px-6 py-20 md:justify-start md:pl-[40vw]"
    >
      <div className="w-full max-w-2xl">
        <div className="mb-5">
          <h2 className="font-round text-[22px] leading-tight tracking-tight text-ink md:text-[32px]">
            <TypingText text="팀 · 개인 프로젝트" />
          </h2>
        </div>

        {/* project selector */}
        <div className="mb-5 flex flex-wrap gap-2">
          {projects.map((proj, i) => (
            <button
              key={proj.name}
              onClick={() => setSelected(i)}
              className={`rounded-full px-3 py-1.5 ${typo.chip} transition-colors ${
                i === selected
                  ? "bg-ocean text-white"
                  : "border border-ink/15 bg-white/70 text-ink"
              }`}
            >
              {proj.lcd}
            </button>
          ))}
        </div>

        {/* big preview */}
        <AnimatePresence mode="wait">
          <motion.article
            key={selected}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="grid gap-6 lg:grid-cols-2"
          >
            {/* image */}
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
                <h3 className="font-instrument text-[26px] leading-none tracking-tight text-ink md:text-[32px]">
                  {p.name}
                </h3>
                <span className={`shrink-0 ${typo.meta} text-ink/45`}>
                  {p.period}
                </span>
              </div>
              <p className={`mt-2 ${typo.body} text-ink/75`}>{p.tagline}</p>
              {p.team && (
                <p className={`mt-1 ${typo.meta} text-ink/45`}>
                  팀 구성 · {p.team}
                </p>
              )}
              <div className="mt-4">
                <p className={typo.eyebrowPixel}>기획 의도</p>
                <p className={`mt-1.5 ${typo.bodySm} text-ink/75`}>{p.intent}</p>
              </div>
              <div className="mt-auto flex flex-wrap items-center gap-4 pt-5">
                <button
                  onClick={() => setOpen(true)}
                  className={`rounded-full bg-ink px-4 py-2 ${typo.chip} font-medium text-white transition-opacity hover:opacity-85`}
                >
                  Read more
                </button>
                {p.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className={`inline-flex items-center gap-1 ${typo.bodySm} font-medium text-accent transition-opacity hover:opacity-60`}
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

      <ProjectModal project={open ? p : null} onClose={() => setOpen(false)} />
    </section>
  );
}
