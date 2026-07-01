import { useEffect, useRef, useState } from "react";

/**
 * Types `text` out one character at a time (LCD-style) whenever its section
 * scrolls into view — and re-types every time you return to it. A solid block
 * caret trails the text while typing.
 */
export default function TypingText({
  text,
  speed = 90,
  className = "",
}: {
  text: string;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState("");
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const root = document.getElementById("deck");
    let t = 0;

    const start = () => {
      window.clearTimeout(t);
      let i = 0;
      setShown("");
      setTyping(true);
      const step = () => {
        i += 1;
        setShown(text.slice(0, i));
        if (i < text.length) t = window.setTimeout(step, speed);
        else setTyping(false);
      };
      t = window.setTimeout(step, speed);
    };

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          start();
        } else {
          window.clearTimeout(t);
          setShown("");
          setTyping(false);
        }
      },
      { root, threshold: 0.55 },
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      window.clearTimeout(t);
    };
  }, [text, speed]);

  return (
    <span ref={ref} className={className}>
      {shown}
      <span
        aria-hidden
        className="ml-1 inline-block"
        style={{
          width: "0.12em",
          height: "0.78em",
          background: "currentColor",
          verticalAlign: "-0.16em",
          animation: typing ? "none" : "blink 1s step-end infinite",
        }}
      />
    </span>
  );
}
