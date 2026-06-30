import { motion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

const career = [
  {
    period: "2025.05 – 2025.10",
    org: "쓰리알이노베이션",
    role: "프론트엔드 개발 인턴",
  },
  {
    period: "2020.03 – 2022.10",
    org: "더네이쳐홀딩스",
    role: "영업 MD",
  },
];

const cardBase =
  "rounded-2xl border border-ocean/15 bg-white/60 p-5 backdrop-blur-sm";
const cardLabel =
  "font-nokia text-[10px] font-semibold tracking-wide text-ocean uppercase";

export default function About() {
  return (
    <section
      id="about"
      className="scene relative flex h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-b from-[#f2fafc] via-[#eaf6fb] to-white px-6"
    >
      <div className="mx-auto w-full max-w-2xl">
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
          className="font-instrument mb-8 text-[30px] leading-[1.15] tracking-tight text-ink md:text-[46px]"
        >
          프론트엔드 개발자 홍지상입니다.
        </motion.h2>

        {/* 경력 / 소개글 */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          className={cardBase}
        >
          <p className={cardLabel}>Career</p>
          <ul className="mt-3 space-y-2">
            {career.map((c) => (
              <li
                key={c.period}
                className="flex flex-wrap items-baseline gap-x-3 gap-y-1"
              >
                <span className="w-[120px] shrink-0 text-[12px] text-ocean">
                  {c.period}
                </span>
                <span className="text-[15px] font-medium text-ink">
                  {c.org}
                </span>
                <span className="text-[14px] text-ink/55">{c.role}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[14px] leading-relaxed text-ink/75">
            시장과 고객의 니즈를 읽으며 재고와 프로모션을 기획했던 영업MD에서,
            사용자의 불편을 화면으로 풀어내는 프론트엔드 개발자가 되었습니다.
            코드보다 사람을 먼저 보는 개발자가 되고자 합니다.
          </p>
        </motion.div>

        {/* 기록하는 개발자 / 관련 소개글 */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          className={`mt-5 ${cardBase}`}
        >
          <p className={cardLabel}>Long Gamer</p>
          <p className="mt-3 text-[14px] leading-relaxed text-ink/75">
            꾸준함이 제 가장 큰 강점입니다. 여러 환경에서 꾸준히 일하며 새로운
            곳에서도 빠르게 적응하는 힘을 길렀고, 취미로 블로그와 유튜브를 몇
            년째 운영하며 수익화까지 만들어냈습니다.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
