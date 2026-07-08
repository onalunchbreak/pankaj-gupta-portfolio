"use client";
import { useState } from "react";
import { useSound } from "@/hooks/use-sound";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { MARQUEE_ITEMS } from "@/lib/data";

/**
 * Full-bleed brand marquee.
 * Infinite horizontal scroll via CSS keyframes (translateX 0 -> -50%),
 * pauses on hover, plays a tick SFX on hover, scales individual items on hover.
 * The list is duplicated 4x so that the -50% wrap is seamless on wide screens.
 * Respects prefers-reduced-motion (renders static, no animation).
 */
export default function BrandMarquee() {
  const reduced = usePrefersReducedMotion();
  const { play } = useSound();
  const [paused, setPaused] = useState(false);

  // 4x the items so the -50% translateX loop is seamless on any viewport.
  const items = [
    ...MARQUEE_ITEMS,
    ...MARQUEE_ITEMS,
    ...MARQUEE_ITEMS,
    ...MARQUEE_ITEMS,
  ];

  return (
    <section
      id="marquee"
      className="relative w-full overflow-hidden border-y border-white/10 bg-[#0A0A0A] py-6 sm:py-8"
      data-cursor-label="marquee"
      aria-label="Brand marquee"
    >
      <style>{`
        @keyframes baazMarquee {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(-50%, 0, 0); }
        }
      `}</style>

      <div
        className="marquee-track select-none will-change-transform"
        style={{
          animation: reduced ? "none" : "baazMarquee 30s linear infinite",
          animationPlayState: paused ? "paused" : "running",
        }}
        onMouseEnter={() => {
          setPaused(true);
          play("tick");
        }}
        onMouseLeave={() => setPaused(false)}
        data-cursor-label="marquee"
      >
        {items.map((item, i) => {
          const isBaaz = item.toLowerCase() === "baaz";
          return (
            <span
              key={`${item}-${i}`}
              data-cursor-label={item}
              onMouseEnter={(e) => {
                e.stopPropagation();
                play("tick");
              }}
              className={`inline-flex items-baseline font-display text-6xl font-bold tracking-tight transition-transform duration-300 hover:scale-[1.12] sm:text-8xl ${
                isBaaz ? "text-[#FFD400]" : "text-[#F4F1EA]"
              }`}
            >
              <span className="mx-6 inline-block sm:mx-8">{item}</span>
              <span className="mr-6 inline-block text-[#6B6B6B] sm:mr-8" aria-hidden>
                ·
              </span>
            </span>
          );
        })}
      </div>
    </section>
  );
}
