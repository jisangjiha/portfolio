import { motion } from "motion/react";
import { skills } from "../data/projects";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function About() {
  return (
    <section
      id="about"
      className="scene relative flex h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-b from-[#f2fafc] via-[#eaf6fb] to-white px-6"
    >
      <div className="mx-auto w-full max-w-5xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="font-nokia mb-4 text-[12px] tracking-widest text-ocean"
        >
          01 — ABOUT
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: EASE }}
          className="font-instrument max-w-3xl text-[30px] leading-[1.15] tracking-tight text-ink md:text-[46px]"
        >
          사용자 경험과 문제 해결에 집중하는 프론트엔드 개발자
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
          className="mt-5 max-w-2xl text-[15px] leading-relaxed text-ink/70 md:text-[17px]"
        >
          생성형 AI에 의존하지 않고 스스로 규칙을 분석·구현하며 문제 해결 능력을
          키워왔습니다. 백엔드 API 연동, 상태 관리 최적화, 반응형 UI 구현 경험을
          바탕으로 안정적이고 사용하기 좋은 화면을 만듭니다.
        </motion.p>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {Object.entries(skills).map(([group, items], gi) => (
            <motion.div
              key={group}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: 0.15 + gi * 0.1, ease: EASE }}
            >
              <h3 className="mb-3 text-[12px] font-semibold tracking-wide text-ocean uppercase">
                {group}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-full border border-ocean/20 bg-white/70 px-3.5 py-1.5 text-[13px] text-ink backdrop-blur-sm"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
