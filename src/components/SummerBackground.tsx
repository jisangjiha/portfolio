import { useEffect, useRef } from "react";
import beach from "../assets/beach.png";
import TypingMessages from "./TypingMessages";

const VIDEO_SRC =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260427_054418_a6d194f0-ac86-4df9-abe5-ded73e596d7c.mp4";

/**
 * Single continuous, viewport-fixed backdrop for the whole site.
 * The sharp beach video (with its typing LCD) stays fixed; as you scroll into
 * the detail sections a blurred blue wash fades in over it while the typing
 * fades out — so nothing "cuts" and the hero text no longer drifts on scroll.
 */
export default function SummerBackground() {
  const blurRef = useRef<HTMLDivElement>(null);
  const typingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const deck = document.getElementById("deck");
    if (!deck) return;
    let raf = 0;
    const apply = () => {
      const vh = deck.clientHeight || window.innerHeight;
      const p = Math.min(1, Math.max(0, deck.scrollTop / vh));
      const e = p * p * (3 - 2 * p);
      if (blurRef.current) blurRef.current.style.opacity = String(e);
      if (typingRef.current)
        typingRef.current.style.opacity = String(Math.max(0, 1 - e * 1.6));
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(apply);
    };
    deck.addEventListener("scroll", onScroll, { passive: true });
    apply();
    return () => {
      deck.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div className="fixed inset-0 -z-10 overflow-hidden" aria-hidden>
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={VIDEO_SRC}
          autoPlay
          loop
          muted
          playsInline
        />
        <div ref={blurRef} className="absolute inset-0" style={{ opacity: 0 }}>
          <div
            className="absolute inset-0 scale-125 bg-cover bg-center blur-3xl"
            style={{ backgroundImage: `url(${beach})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#eaf7fb]/45 via-[#a6d6ef]/50 to-[#6fb4de]/60" />
        </div>
      </div>

      {/* Fixed typing LCD — stays on the phone screen, fades out on scroll */}
      <div
        ref={typingRef}
        className="pointer-events-none fixed bottom-[32%] left-[48.5%] z-20 flex w-[86px] -translate-x-1/2 justify-start text-left sm:w-[108px] md:left-[47.5%] lg:left-[48.5%]"
      >
        <TypingMessages className="text-[9px] sm:text-[11px]" />
      </div>
    </>
  );
}
