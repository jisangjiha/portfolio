import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Project, DetailBlock } from "../data/projects";
import { typo } from "../typeScale";

const EASE = [0.16, 1, 0.3, 1] as const;

function Block({ block }: { block: DetailBlock }) {
  if (block.type === "text") {
    return (
      <section>
        <h4 className={`mb-2 ${typo.eyebrow}`}>{block.title}</h4>
        <p className={`${typo.body} text-ink/75`}>{block.body}</p>
      </section>
    );
  }
  if (block.type === "bullets") {
    return (
      <section>
        <h4 className="mb-2.5 text-[12px] font-semibold tracking-wide text-ocean uppercase">
          {block.title}
        </h4>
        <ul className="space-y-2.5">
          {block.items.map((it) => (
            <li key={it.head} className="flex gap-2">
              <span className="mt-[3px] text-ocean">▸</span>
              <div>
                <p className={`${typo.body} font-medium text-ink`}>{it.head}</p>
                {it.body && (
                  <p className={`${typo.meta} leading-relaxed text-ink/65`}>
                    {it.body}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </section>
    );
  }
  // trouble
  return (
    <section>
      <h4 className={`mb-2.5 ${typo.eyebrow}`}>{block.title}</h4>
      <div className="space-y-4">
        {block.items.map((it, i) => (
          <div
            key={it.title ?? i}
            className="rounded-xl border border-ink/10 bg-[#f6fafc] p-4"
          >
            {it.title && (
              <p className={`mb-2 ${typo.bodySm} font-semibold text-ink`}>
                {it.title}
              </p>
            )}
            <p className={`${typo.meta} leading-relaxed text-ink/75`}>
              <span className="mr-1">🚨</span>
              <span className="font-medium text-ink/90">문제</span> {it.problem}
            </p>
            <p className={`mt-1.5 ${typo.meta} leading-relaxed text-ink/75`}>
              <span className="mr-1">💡</span>
              <span className="font-medium text-ink/90">해결</span>{" "}
              {it.solution}
            </p>
            {it.learned && (
              <p className={`mt-1.5 ${typo.meta} leading-relaxed text-ink/75`}>
                <span className="mr-1">🤓</span>
                <span className="font-medium text-ink/90">배운 점</span>{" "}
                {it.learned}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    // lock background (deck) scroll
    const deck = document.getElementById("deck");
    const prev = deck?.style.overflow ?? "";
    if (deck) deck.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      if (deck) deck.style.overflow = prev;
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${project.name} 상세`}
            className="relative z-10 flex max-h-[86vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-[0_30px_80px_-20px_rgba(20,50,58,0.55)]"
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            {/* header */}
            <div className="flex items-start justify-between gap-4 border-b border-ink/10 px-6 py-5">
              <div className="min-w-0">
                <span className={typo.eyebrowPixel}>
                  {project.group} · {project.period}
                </span>
                <h3 className="font-instrument text-[30px] leading-none tracking-tight text-ink">
                  {project.name}
                </h3>
                <p className={`mt-1 ${typo.bodySm} text-ink/60`}>
                  {project.tagline}
                </p>
              </div>
              <button
                ref={closeRef}
                onClick={onClose}
                aria-label="닫기"
                className="shrink-0 rounded-full border border-ink/15 px-3 py-1.5 text-[14px] text-ink/60 transition-colors hover:bg-ink/5"
              >
                ✕
              </button>
            </div>

            {/* body — vertical scroll */}
            <div className="flex-1 space-y-6 overflow-y-auto px-6 py-5">
              <div className="flex flex-wrap gap-1.5">
                {project.stack.map((s) => (
                  <span
                    key={s}
                    className={`rounded-md bg-ocean/10 px-2 py-1 ${typo.chip} text-ocean`}
                  >
                    {s}
                  </span>
                ))}
              </div>

              {project.detail?.map((block) => (
                <Block key={block.title} block={block} />
              ))}

              <div className="flex gap-4 border-t border-ink/10 pt-4">
                {project.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className={`inline-flex items-center gap-1 ${typo.bodySm} font-medium text-accent transition-opacity hover:opacity-60`}
                  >
                    {l.label}
                    <span aria-hidden>↗</span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
