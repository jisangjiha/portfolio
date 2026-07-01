import { useState } from "react";
import { motion } from "motion/react";
import { contact } from "../data/projects";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable — mailto link still works */
    }
  };

  return (
    <section
      id="contact"
      className="scene relative flex h-screen w-full flex-col items-center justify-center overflow-hidden px-6 text-center md:pl-[40vw]"
    >
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: EASE }}
        className="font-nokia mb-4 text-[12px] tracking-widest text-ocean"
      >
        04 — CONTACT
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1, ease: EASE }}
        className="font-instrument text-[44px] leading-[0.95] tracking-tight text-ink md:text-[72px]"
      >
        Let&apos;s talk.
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
        className="mt-5 max-w-md text-[16px] leading-relaxed text-ink/70"
      >
        함께 일하고 싶거나 궁금한 점이 있다면 언제든 연락 주세요.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
        className="mt-10 flex flex-col items-center gap-4"
      >
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href={`mailto:${contact.email}`}
            className="group relative overflow-hidden rounded-full bg-[#0871E7] px-6 py-3 text-[15px] text-white shadow-[inset_0_-4px_4px_rgba(255,255,255,0.39)] outline-1 -outline-offset-1 outline-[#0871E7]"
          >
            <span
              className="absolute top-[1px] left-[10%] h-4 w-[80%] rounded-[12px] bg-gradient-to-b from-[#DEF0FC] to-transparent transition-transform duration-300 group-hover:scale-x-105"
              aria-hidden
            />
            <span className="relative">이메일 보내기</span>
          </a>
          <button
            onClick={copyEmail}
            className="rounded-full border border-ink/15 bg-white/70 px-6 py-3 text-[15px] text-ink backdrop-blur-sm transition-colors hover:bg-white"
          >
            {copied ? "복사됨 ✓" : "이메일 복사"}
          </button>
        </div>

        <ul className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[14px] text-ink/70">
          <li>{contact.email}</li>
          <li aria-hidden className="text-ink/25">
            ·
          </li>
          <li>
            <a
              href={contact.github}
              target="_blank"
              rel="noreferrer"
              className="transition-opacity hover:opacity-60"
            >
              GitHub
            </a>
          </li>
          <li aria-hidden className="text-ink/25">
            ·
          </li>
          <li>
            <a
              href={`tel:${contact.phone.replace(/-/g, "")}`}
              className="transition-opacity hover:opacity-60"
            >
              {contact.phone}
            </a>
          </li>
        </ul>
      </motion.div>

      <p className="font-nokia absolute bottom-8 text-[11px] text-ink/45">
        © 2026 Jisang — Frontend Developer
      </p>
    </section>
  );
}
