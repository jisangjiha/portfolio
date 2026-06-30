import { motion } from "motion/react";
import { frontendSkills, collabTools, type Skill } from "../data/skills";

const EASE = [0.16, 1, 0.3, 1] as const;

function SkillItem({ s }: { s: Skill }) {
  return (
    <li className="border-l-2 border-ocean/30 pl-3">
      <p className="text-[14px] font-semibold text-ink">{s.name}</p>
      <p className="text-[12.5px] leading-snug text-ink/65">{s.desc}</p>
    </li>
  );
}

export default function Skills() {
  return (
    <section
      id="skills"
      className="scene relative flex h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-b from-white via-[#eaf6fb] to-[#f2fafc] px-6"
    >
      <div className="mx-auto w-full max-w-5xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="font-nokia mb-4 text-[12px] tracking-widest text-ocean"
        >
          02 — SKILLS
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: EASE }}
          className="font-instrument text-[30px] leading-[1.1] tracking-tight text-ink md:text-[46px]"
        >
          기술을 이렇게 활용합니다
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          className="mt-8"
        >
          <h3 className="mb-3 text-[12px] font-semibold tracking-wide text-ocean uppercase">
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
          <h3 className="mb-3 text-[12px] font-semibold tracking-wide text-ocean uppercase">
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
