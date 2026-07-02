import { motion } from "motion/react";
import TypingText from "./TypingText";
import { frontendSkills, collabTools, type Skill } from "../data/skills";
import { typo } from "../typeScale";

const EASE = [0.16, 1, 0.3, 1] as const;

function SkillItem({ s }: { s: Skill }) {
  return (
    <li className="border-l-2 border-ocean/30 pl-3">
      <p className={`${typo.body} font-semibold text-ink`}>{s.name}</p>
      <p className={`${typo.meta} leading-snug text-ink/65`}>{s.desc}</p>
    </li>
  );
}

export default function Skills() {
  return (
    <section
      id="skills"
      className="scene relative flex min-h-screen w-full items-center justify-center px-6 py-24 md:justify-start md:pl-[40vw]"
    >
      <div className="w-full max-w-2xl">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: EASE }}
          className="font-round text-[22px] leading-[1.3] tracking-tight text-ink md:text-[32px]"
        >
          <TypingText text="기술을 이렇게 활용합니다" />
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          className="mt-8"
        >
          <h3 className={`mb-3 ${typo.eyebrow}`}>
            Frontend
          </h3>
          <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {frontendSkills.map((s) => (
              <SkillItem key={s.name} s={s} />
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          className="mt-7"
        >
          <h3 className={`mb-3 ${typo.eyebrow}`}>
            Collab Tool
          </h3>
          <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-3">
            {collabTools.map((s) => (
              <SkillItem key={s.name} s={s} />
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
