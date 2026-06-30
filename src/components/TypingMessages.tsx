import { useEffect, useState } from "react";
import { motion } from "motion/react";

const MESSAGES = ["Nice to meet u", "I'm Jisang", "This is me!"];
const TYPING_SPEED = 100;
const DELETING_SPEED = 50;
const PAUSE_BEFORE_DELETE = 2000;

/**
 * Cycles through MESSAGES with a typewriter effect, sitting on the phone
 * screen inside the hero video. Nokia dot-font, blinking pixel cursor.
 */
export default function TypingMessages() {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = MESSAGES[index];

    if (!deleting && text === current) {
      const t = setTimeout(() => setDeleting(true), PAUSE_BEFORE_DELETE);
      return () => clearTimeout(t);
    }

    if (deleting && text === "") {
      setDeleting(false);
      setIndex((i) => (i + 1) % MESSAGES.length);
      return;
    }

    const t = setTimeout(
      () => {
        setText((prev) =>
          deleting
            ? current.slice(0, prev.length - 1)
            : current.slice(0, prev.length + 1)
        );
      },
      deleting ? DELETING_SPEED : TYPING_SPEED
    );
    return () => clearTimeout(t);
  }, [text, deleting, index]);

  return (
    <div className="absolute left-[48.5%] bottom-[33%] z-30 flex w-[74px] -translate-x-1/2 justify-start text-left sm:w-[90px] md:left-[47.5%] lg:left-[48.5%]">
      <span className="font-nokia min-h-[1.5em] text-[7px] leading-tight break-words text-[#2A3616] sm:text-[9px]">
        {text}
        <motion.span
          className="ml-0.5 inline-block h-2 w-1 bg-[#2A3616] align-middle"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        />
      </span>
    </div>
  );
}
