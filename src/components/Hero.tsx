export default function Hero() {
  const goAbout = () =>
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="home"
      className="scene relative h-screen w-full overflow-hidden"
    >
      {/* Video + typing live in the fixed background (SummerBackground). */}
      {/* Clickable phone hotspot → enter the detail journey */}
      <button
        onClick={goAbout}
        aria-label="입장하기"
        className="absolute top-1/2 left-1/2 z-40 h-[52%] w-[22%] -translate-x-1/2 -translate-y-1/2"
      />
    </section>
  );
}
