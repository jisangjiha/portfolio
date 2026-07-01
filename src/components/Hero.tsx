import { motion } from "motion/react";
import TypingMessages from "./TypingMessages";

const VIDEO_SRC =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260427_054418_a6d194f0-ac86-4df9-abe5-ded73e596d7c.mp4";

export default function Hero() {
  const goAbout = () =>
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="home"
      className="scene relative flex h-screen w-full items-center justify-center overflow-hidden bg-[#cfe9f3]"
    >
      {/* Background video */}
      <video
        className="absolute inset-0 z-0 h-full w-full object-cover"
        src={VIDEO_SRC}
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="absolute inset-0 z-10 bg-white/5" aria-hidden />

      {/* Typing messages on the phone screen inside the video */}
      <div className="absolute bottom-[33%] left-[48.5%] z-30 flex w-[74px] -translate-x-1/2 justify-start text-left sm:w-[90px] md:left-[47.5%] lg:left-[48.5%]">
        <TypingMessages className="text-[7px] sm:text-[9px]" />
      </div>

      {/* Clickable phone hotspot → enter the detail journey */}
      <button
        onClick={goAbout}
        aria-label="입장하기"
        className="group absolute top-1/2 left-1/2 z-40 h-[52%] w-[22%] -translate-x-1/2 -translate-y-1/2"
      >
        <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1.5 text-[12px] font-medium whitespace-nowrap text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
          입장하기 →
        </span>
      </button>

      {/* Scroll hint */}
      <motion.button
        onClick={goAbout}
        aria-label="아래로 스크롤"
        className="absolute bottom-8 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center gap-1"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="font-nokia text-[11px] tracking-widest text-[#2A3616]/80">
          SCROLL
        </span>
        <span className="text-[#2A3616]/80">↓</span>
      </motion.button>
    </section>
  );
}
