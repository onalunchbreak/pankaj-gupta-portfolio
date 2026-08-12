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

/**
 * Wrap a value into a [min, max) range. Used to make the marquee's translateX
 * seamless across the duplicated track.
 */
function wrap(min: number, max: number, v: number): number {
  const range = max - min;
  const mod = (((v - min) % range) + range) % range;
  return mod + min;
}

const PRODUCT_KEYWORDS = [
  "Rapid Prototyping",
  "Product Discovery",
  "Market Research",
  "User Interviews",
  "A/B Testing",
  "Roadmapping",
  "Stakeholder Alignment",
  "Go-To-Market",
];

/**
 * Brand marquee — full-bleed black strip.
 *
 * The track is the product keyword list duplicated 4× and joined by " · ".
 * Color cycling alternates between signature yellow, blue, white, and gray.
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
  // Map absolute scroll velocity (px/s) → speed multiplier in [0.5, 1.5].
  const speed = useTransform(smoothVelocity, [0, 1500], [1, 1.5], { clamp: true });

  const direction = useRef(1);

  useAnimationFrame((_, delta) => {
    if (paused || reduced) return;
    let moveBy = direction.current * (delta / 1000) * -1.2; // base ~1.2%/s
    if (smoothVelocity.get() < -10) direction.current = -1;
    else if (smoothVelocity.get() > 10) direction.current = 1;
    const mult = speed.get();
    moveBy *= Math.max(0.5, Math.min(mult, 1.5));
    baseX.set(baseX.get() + moveBy);
  });

  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  // 4× duplication guarantees the -50% wrap is seamless on any viewport.
  const items = [
    ...PRODUCT_KEYWORDS,
    ...PRODUCT_KEYWORDS,
    ...PRODUCT_KEYWORDS,
    ...PRODUCT_KEYWORDS,
  ];

  // Alternating color cycle: yellow, white, blue, gray
  const COLORS = [
    "text-[#FFD400]",   // yellow
    "text-[#F4F1EA]",   // white/cream
    "text-[#1738D5]",   // blue
    "text-[#999999]",   // light gray for high visibility
  ];

  const getWordColor = (_word: string, index: number) => {
    return COLORS[index % COLORS.length];
  };

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
            return (
              <span
                key={`${item}-${i}`}
                className={`inline-flex items-baseline whitespace-nowrap px-4 font-display text-3xl font-bold tracking-tight sm:px-6 sm:text-5xl ${getWordColor(item, i)}`}
              >
                {item}
                <span className="ml-4 text-[#FFD400] sm:ml-6" aria-hidden>
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
        className="marquee-track select-none will-change-transform flex"
        style={{ x }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        data-cursor-label="marquee"
      >
        {items.map((item, i) => {
          return (
            <span
              key={`${item}-${i}`}
              onMouseEnter={(e) => {
                e.stopPropagation();
                play("tick");
              }}
              className={`inline-flex items-baseline whitespace-nowrap px-4 font-display text-3xl font-bold tracking-tight transition-transform duration-300 hover:scale-[1.05] sm:px-6 sm:text-5xl ${getWordColor(item, i)}`}
            >
              {item}
              <span className="ml-4 text-[#FFD400] sm:ml-6 opacity-80" aria-hidden>
                ·
              </span>
            </span>
          );
        })}
      </motion.div>
    </section>
  );
}
