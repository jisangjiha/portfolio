import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import TypingText from "./TypingText";
import { projects, orderLinks } from "../data/projects";
import ProjectModal from "./ProjectModal";
import ActionButton from "./ActionButton";
import { typo } from "../typeScale";

const EASE = [0.16, 1, 0.3, 1] as const;

// 팀/개인을 한 섹션 안에서 그룹 탭으로 분리 (왼쪽 phone nav의 PROJECT는 그대로 하나)
const GROUPS = [
  {
    key: "team",
    label: "팀 프로젝트",
    list: projects.filter((p) => p.group === "팀 프로젝트"),
  },
  {
    key: "solo",
    label: "개인 프로젝트",
    list: projects.filter((p) => p.group === "개인 프로젝트"),
  },
] as const;

export default function Portfolio() {
  const [groupIdx, setGroupIdx] = useState(0);
  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const group = GROUPS[groupIdx];
  const p = group.list[selected];

  return (
    <section
      id="portfolio"
      className="scene relative flex min-h-screen w-full items-center justify-center px-6 py-20 md:justify-start md:pl-[40vw]"
    >
      <div className="w-full max-w-2xl">
        <div className="mb-5">
          <h2 className="font-round text-[22px] leading-tight tracking-tight text-ink md:text-[32px]">
            <TypingText text="프로젝트" />
          </h2>
        </div>

        {/* 팀 / 개인 그룹 탭 — 밑줄이 활성 탭으로 슬라이드 */}
        <div className="mb-5 flex gap-7">
          {GROUPS.map((g, i) => {
            const on = i === groupIdx;
            return (
              <button
                key={g.key}
                onClick={() => {
                  setGroupIdx(i);
                  setSelected(0);
                }}
                className="relative pb-2.5"
              >
                <span
                  className={`text-[17px] font-bold transition-colors ${
                    on ? "text-ink" : "text-ink/40"
                  }`}
                >
                  {g.label}
                </span>
                <span
                  className={`ml-1.5 text-[12px] ${on ? "text-ocean" : "text-ink/30"}`}
                >
                  {g.list.length}
                </span>
                {on && (
                  <motion.span
                    layoutId="projGroupLine"
                    className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-ocean"
                    transition={{ duration: 0.35, ease: EASE }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* 프로젝트 선택 — 활성 항목에 ocean 캐럿 마커 (LCD 메뉴 느낌) */}
        <div className="mb-6 flex flex-wrap gap-x-6 gap-y-2">
          {group.list.map((proj, i) => {
            const on = i === selected;
            return (
              <button
                key={proj.name}
                onClick={() => setSelected(i)}
                className={`flex items-center gap-1.5 text-[15px] transition-colors ${
                  on ? "font-bold text-ink" : "text-ink/40 hover:text-ink/70"
                }`}
              >
                <span
                  aria-hidden
                  className={`text-ocean transition-opacity ${
                    on ? "opacity-100" : "opacity-0"
                  }`}
                >
                  ▸
                </span>
                {proj.name}
              </button>
            );
          })}
        </div>

        {/* 선택 프로젝트 프리뷰 */}
        <AnimatePresence mode="wait">
          <motion.article
            key={group.key + p.name}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: EASE }}
            // 프로젝트마다 내용 길이가 달라도 데스크톱(2단)에서 높이를 고정해
            // 마커/탭이 위아래로 흔들리지 않게 함 (가장 긴 항목 기준 min-height)
            className="grid items-start gap-6 lg:min-h-[288px] lg:grid-cols-2"
          >
            {/* image — 뒤 박스 제거, 이미지만 (은은한 그림자) */}
            <div className="flex aspect-[16/11] w-full items-start justify-center">
              {p.image ? (
                <img
                  src={p.image}
                  alt={`${p.name} 미리보기`}
                  className="max-h-full max-w-full rounded-xl object-contain shadow-[0_18px_44px_-24px_rgba(20,50,58,0.55)]"
                />
              ) : (
                <div className="font-nokia flex h-full w-full items-center justify-center text-[#2A3616]/50">
                  no preview
                </div>
              )}
            </div>

            {/* details */}
            <div className="flex flex-col">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-instrument text-[26px] leading-none tracking-tight text-ink md:text-[32px] font-semibold">
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
                <p className="text-[12px] font-semibold tracking-wide text-ocean">
                  기획 의도
                </p>
                <p className={`mt-1.5 ${typo.bodySm} text-ink/75`}>
                  {p.intent}
                </p>
              </div>
              {/* 자세히 보기 → GitHub ↗ → Live ↗ · 글로시 버튼(hover 애니메이션) */}
              <div className="mt-auto flex flex-wrap items-center gap-2 pt-4">
                <ActionButton size="sm" onClick={() => setOpen(true)}>
                  자세히 보기
                </ActionButton>
                {orderLinks(p.links).map((link) => (
                  <ActionButton key={link.href} size="sm" href={link.href}>
                    {link.label} ↗
                  </ActionButton>
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
