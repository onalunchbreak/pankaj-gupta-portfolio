"use client";
import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useVelocity,
  useSpring,
  useTransform,
  useMotionValue,
  useAnimationFrame,
} from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { useSound } from "@/hooks/use-sound";
import { MARQUEE_ITEMS } from "@/lib/data";

/**
 * Wrap a value into a [min, max) range. Used to make the marquee's translateX
 * seamless across the duplicated track.
 */
function wrap(min: number, max: number, v: number): number {
  const range = max - min;
  const mod = (((v - min) % range) + range) % range;
  return mod + min;
}

/**
 * Brand marquee — full-bleed black strip.
 *
 * The track is the MARQUEE_ITEMS list duplicated 4× and joined by " · ".
 * A motion value `baseX` decrements at a baseline rate (≈5%/s) and is wrapped
 * into [-50%, 0] so the duplicated track loops seamlessly. Scroll velocity
 * modulates the speed multiplier between 0.5× and 3× (clamped), giving the
 * marquee a satisfying drag-goes-faster feel. The "baaz" item is highlighted
 * in metro-yellow. Hovering the track pauses the loop; hovering an individual
 * item scales it to 1.05 and plays a one-shot "tick". Reduced motion renders
 * a static horizontally-scrollable row instead.
 */
export default function BrandMarquee() {
  const reduced = usePrefersReducedMotion();
  const { play } = useSound();
  const [paused, setPaused] = useState(false);

  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const rawVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(rawVelocity, {
    damping: 50,
    stiffness: 400,
  });
  // Map absolute scroll velocity (px/s) → speed multiplier in [0.5, 3].
  const speed = useTransform(smoothVelocity, [0, 1500], [1, 3], { clamp: true });

  const direction = useRef(1);

  useAnimationFrame((_, delta) => {
    if (paused || reduced) return;
    let moveBy = direction.current * (delta / 1000) * -5; // base ~5%/s leftward
    // reverse direction briefly when scrolling up so the marquee "drags" with
    // the page.
    if (smoothVelocity.get() < -10) direction.current = -1;
    else if (smoothVelocity.get() > 10) direction.current = 1;
    const mult = speed.get();
    moveBy *= Math.max(0.5, Math.min(mult, 3));
    baseX.set(baseX.get() + moveBy);
  });

  // Wrap into [-50, 0) — the track is duplicated, so half of its width is one
  // full loop.
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  // 4× duplication guarantees the -50% wrap is seamless on any viewport.
  const items = [
    ...MARQUEE_ITEMS,
    ...MARQUEE_ITEMS,
    ...MARQUEE_ITEMS,
    ...MARQUEE_ITEMS,
  ];

  // ---- Reduced motion: static horizontally-scrollable row ----
  if (reduced) {
    return (
      <section
        id="marquee"
        className="env-black relative w-full overflow-hidden border-y border-white/10 py-6 sm:py-8"
        aria-label="Brand marquee"
        data-cursor-label="marquee"
      >
        <div className="no-scrollbar scroll-styled flex w-full overflow-x-auto">
          {items.map((item, i) => {
            const isBaaz = item.toLowerCase() === "baaz";
            return (
              <span
                key={`${item}-${i}`}
                data-cursor-label={item}
                className={`inline-flex items-baseline whitespace-nowrap px-6 font-display text-6xl font-bold tracking-tight sm:px-8 sm:text-8xl ${
                  isBaaz ? "text-[#FFD400]" : "text-[#F4F1EA]"
                }`}
              >
                {item}
                <span className="ml-6 text-[#6B6B6B] sm:ml-8" aria-hidden>
                  ·
                </span>
              </span>
            );
          })}
        </div>
      </section>
    );
  }

  // ---- Animated, velocity-modulated marquee ----
  return (
    <section
      id="marquee"
      className="env-black relative w-full overflow-hidden border-y border-white/10 py-6 sm:py-8"
      aria-label="Brand marquee"
      data-cursor-label="marquee"
    >
      <motion.div
        className="marquee-track select-none will-change-transform"
        style={{ x }}
        onMouseEnter={() => setPaused(true)}
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
              className={`inline-flex items-baseline whitespace-nowrap px-6 font-display text-6xl font-bold tracking-tight transition-transform duration-300 hover:scale-[1.05] sm:px-8 sm:text-8xl ${
                isBaaz ? "text-[#FFD400]" : "text-[#F4F1EA]"
              }`}
            >
              {item}
              <span className="ml-6 text-[#6B6B6B] sm:ml-8" aria-hidden>
                ·
              </span>
            </span>
          );
        })}
      </motion.div>
    </section>
  );
}
