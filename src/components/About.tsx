import { motion } from "motion/react";
import TypingText from "./TypingText";
import { typo } from "../typeScale";

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

// 흰 박스 대신 얇은 ocean 좌측 선 (Skills 섹션과 통일된 언어)
const cardBase = "border-l-[3px] border-ocean/55 pl-5";
const cardLabel = typo.eyebrow;

export default function About() {
  return (
    <section
      id="about"
      className="scene relative flex min-h-screen w-full items-center justify-center px-6 py-24 md:justify-start md:pl-[40vw]"
    >
      <div className="w-full max-w-2xl">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: EASE }}
          className="font-round mb-8 text-[22px] leading-[1.4] tracking-tight text-ink md:text-[32px]"
        >
          <TypingText text="프론트엔드 개발자 홍지상입니다." />
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
          <ul className="mt-4 space-y-3">
            {career.map((c) => (
              <li
                key={c.period}
                className="flex flex-wrap items-baseline gap-x-4 gap-y-1"
              >
                <span className={`w-[160px] shrink-0 ${typo.meta} text-ink`}>
                  {c.period}
                </span>
                <span className={`${typo.lead} font-medium text-ink`}>
                  {c.org}
                </span>
                <span className={`${typo.bodySm} text-ink/60`}>{c.role}</span>
              </li>
            ))}
          </ul>
          <p className={`mt-5 ${typo.body} text-ink/80`}>
            매출 데이터와 고객 니즈를 분석해 프로모션을 기획하던 영업 MD에서
            이제는 <b>사용자의 불편을 정의하고 화면으로 풀어내는 개발자</b>가
            되었습니다.
            <br />
            <b>
              화면 뒤의 비즈니스 논리를 이해하고, 데이터 분석으로 사용자 불편을
              해결하는 역량
            </b>
            으로 비즈니스와 사용자 모두를 만족시키는 솔루션을 제시하겠습니다.
          </p>
        </motion.div>

        {/* 기록하는 개발자 / 관련 소개글 */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          className={`mt-8 ${cardBase}`}
        >
          <p className={cardLabel}>Long Runner</p>
          <p className={`mt-4 ${typo.body} text-ink/80`}>
            어떤 환경에서도 빠르게 적응하는 <b>유연함</b>과, 시작한 일은
            포기하지 않는 <b>끈기</b>가 가장 큰 무기입니다. 취미로 블로그와
            유튜브를 수년간 운영하며 <b>수익화까지 달성</b>해냈습니다. 이처럼
            목표를 향해 지치지 않고 실행하는 끈기로 팀의 성장에 기여하겠습니다.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
