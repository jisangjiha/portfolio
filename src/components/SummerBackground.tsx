import beach from "../assets/beach.png";

/**
 * Continuous, viewport-fixed backdrop shared by the detail scenes.
 * A heavily blurred beach (its baked-in phone dissolves into soft colour)
 * under a simple translucent blue wash. The hero video sits on top of this.
 */
export default function SummerBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div
        className="absolute inset-0 scale-125 bg-cover bg-center blur-3xl"
        style={{ backgroundImage: `url(${beach})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#eaf7fb]/40 via-[#a6d6ef]/45 to-[#6fb4de]/55" />
    </div>
  );
}
