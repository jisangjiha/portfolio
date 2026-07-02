import { useState } from "react";
import { motion } from "motion/react";
import TypingText from "./TypingText";
import { contact } from "../data/projects";
import { typo } from "../typeScale";

const EASE = [0.16, 1, 0.3, 1] as const;

// Shared glossy-blue pill (the original "이메일 보내기" button design), reused
// by both the copy-email and open-GitHub actions.
const ACTION_BTN =
  "group relative shrink-0 overflow-hidden rounded-full bg-[#0871E7] px-4 py-3 text-[13px] text-white shadow-[inset_0_-3px_3px_rgba(255,255,255,0.39)] outline-1 -outline-offset-1 outline-[#0871E7]"; // text-[13px] = typo.chip

function ButtonShine() {
  return (
    <span
      className="absolute top-[1px] left-[10%] h-4 w-[80%] rounded-[12px] bg-gradient-to-b from-[#DEF0FC] to-transparent transition-transform duration-300 group-hover:scale-x-105"
      aria-hidden
    />
  );
}

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };

  const githubDisplay = contact.github.replace(/^https?:\/\//, "");

  return (
    <section
      id="contact"
      className="scene relative flex min-h-screen w-full flex-col items-center justify-center px-6 py-24 text-center md:pl-[40vw]"
    >
      <motion.h2
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1, ease: EASE }}
        className="font-round text-[32px] leading-tight tracking-tight text-ink md:text-[52px]"
      >
        <TypingText text="Get in touch!" />
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
        className={`mt-5 max-w-md ${typo.body} text-ink/70`}
      >
        더 궁금한 점이 있다면 언제든 연락 주세요.
        <br />
        새로운 기회를 기다리고 있습니다.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
        className="mt-10 flex w-full max-w-md flex-col gap-6"
      >
        {/* EMAIL: 라벨 + 주소 | 복사하기 */}
        <div className="flex items-center justify-between gap-4 border-b border-ink/15 pb-3">
          <div className="min-w-0 flex-1 text-left">
            <p className={typo.eyebrow}>Email</p>
            <p className={`mt-0.5 truncate ${typo.lead} text-ink/80`}>
              {contact.email}
            </p>
          </div>
          <button onClick={copyEmail} data-cursor="link" className={ACTION_BTN}>
            <ButtonShine />
            <span className="relative">{copied ? "복사됨 ✓" : "복사하기"}</span>
          </button>
        </div>

        {/* GITHUB: 라벨 + 주소 | 바로가기 */}
        <div className="flex items-center justify-between gap-4  pb-3">
          <div className="min-w-0 flex-1 text-left">
            <p className={typo.eyebrow}>GitHub</p>
            <p className={`mt-0.5 truncate ${typo.lead} text-ink/80`}>
              {githubDisplay}
            </p>
          </div>
          <a
            href={contact.github}
            target="_blank"
            rel="noreferrer"
            data-cursor="link"
            className={ACTION_BTN}
          >
            <ButtonShine />
            <span className="relative">바로가기</span>
          </a>
        </div>
      </motion.div>

      <p className="font-nokia absolute bottom-8 text-[11px] text-ink/45">
        © 2026 Jisang — Frontend Developer
      </p>
    </section>
  );
}
