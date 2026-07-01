import { useEffect, useState } from "react";
import { motion } from "motion/react";

const MESSAGES = ["Nice to meet u", "I'm Jisang", "This is me!"];
const TYPING_SPEED = 100;
const DELETING_SPEED = 50;
const PAUSE_BEFORE_DELETE = 2000;

/**
 * Typewriter text for the phone LCD. Position-agnostic — the parent decides
 * where it sits; this just renders the cycling text + blinking pixel cursor.
 */
export default function TypingMessages({ className = "" }: { className?: string }) {
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
    <span
      className={`font-nokia leading-tight break-words text-[#2A3616] ${className}`}
    >
      {text}
      <motion.span
        className="ml-[0.15em] inline-block h-[0.95em] w-[0.14em] bg-[#2A3616] align-middle"
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
      />
    </span>
  );
}
