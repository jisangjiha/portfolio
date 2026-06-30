export default function Navbar() {
  const goHome = () =>
    document.getElementById("home")?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="fixed top-6 left-6 z-50 md:top-8 md:left-10">
      <button
        onClick={goHome}
        aria-label="홈으로"
        className="font-instrument rounded-full border border-black/10 bg-white/45 px-5 py-1.5 text-[26px] leading-none tracking-tight text-[#1a1a1a] backdrop-blur-md transition-colors hover:bg-white/70"
      >
        Jisang
      </button>
    </div>
  );
}
