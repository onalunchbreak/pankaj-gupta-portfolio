"use client";
import { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ChevronDown } from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import {
  HERO_NAME,
  HERO_ROLES,
  HERO_TAGLINE,
  HERO_TOP_LINKS,
  HERO_TOP_META,
} from "@/lib/data";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Hero — Section 01.
 *
 * Electric blue environment. The centerpiece is a giant handwritten "baaz"
 * (Caveat via .font-hand / .hand-display) revealed letter-by-letter through
 * clipping masks. Surrounding it: top metadata bar, left-side vertical
 * "SRCC '27 / Delhi, India" stack, right-side handwritten tagline, role
 * progression triptych with AnimatePresence blur transitions, a 20:00 → 00:00
 * time morph, a pulsing scroll cue, L-shaped corner framing marks, and
 * scattered micro-elements (★, // CREATIVE DIR., Delhi coords, // 24/7).
 * A subtle cursor parallax shifts the "baaz" word ±8px via spring-smoothed
 * motion values. Reduced motion renders static final states.
 */
export default function Hero() {
  const reduced = usePrefersReducedMotion();
  const [roleIndex, setRoleIndex] = useState(0);
  const [hour, setHour] = useState(20);

  // ---- Cursor parallax (spring-smoothed, ±8px) ----
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 120, damping: 18, mass: 0.4 });
  const py = useSpring(my, { stiffness: 120, damping: 18, mass: 0.4 });
  const baazX = useTransform(px, [-0.5, 0.5], [-8, 8]);
  const baazY = useTransform(py, [-0.5, 0.5], [-8, 8]);

  useEffect(() => {
    if (reduced) return;
    const onMove = (e: MouseEvent) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      mx.set((e.clientX / w) - 0.5);
      my.set((e.clientY / h) - 0.5);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduced, mx, my]);

  // ---- Cycling role triptych (2.5s per role) ----
  useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => {
      setRoleIndex((i) => (i + 1) % HERO_ROLES.length);
    }, 2500);
    return () => clearInterval(t);
  }, [reduced]);

  // ---- Time morph 20:00 → 00:00 ----
  // Hour ticks forward through the night (20→21→22→23→00) then loops back to
  // 20, so it always stays in the "creative by night → more creative by
  // midnight" range per spec.
  useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => {
      setHour((h) => (h === 0 ? 20 : h + 1));
    }, 1400);
    return () => clearInterval(t);
  }, [reduced]);

  const letters = HERO_NAME.split("");
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section
      id="hero"
      className="env-blue relative flex min-h-screen w-full flex-col overflow-hidden px-5 py-16 sm:px-8 sm:py-20"
      data-cursor-label="baaz"
    >
      {/* ---- L-shaped corner framing marks ---- */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-4 top-4 h-5 w-5 border-l border-t border-white/40 sm:left-6 sm:top-6 sm:h-6 sm:w-6"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute right-4 top-4 h-5 w-5 border-r border-t border-white/40 sm:right-6 sm:top-6 sm:h-6 sm:w-6"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-4 left-4 h-5 w-5 border-b border-l border-white/40 sm:bottom-6 sm:left-6 sm:h-6 sm:w-6"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-4 right-4 h-5 w-5 border-b border-r border-white/40 sm:bottom-6 sm:right-6 sm:h-6 sm:w-6"
      />

      {/* ---- Top metadata bar ---- */}
      <div className="relative z-10 flex w-full items-start justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-[#F7F4ED]/70 sm:text-[11px]">
        <motion.span
          className="max-w-[55%] leading-relaxed"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: EASE }}
        >
          {HERO_TOP_META}
        </motion.span>
        <motion.span
          className="hidden max-w-[40%] text-right leading-relaxed sm:block"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6, ease: EASE }}
        >
          {HERO_TOP_LINKS}
        </motion.span>
      </div>

      {/* ---- Left vertical stack: SRCC '27 / Delhi, India ---- */}
      <motion.div
        className="absolute left-5 top-1/2 z-10 hidden -translate-y-1/2 flex-col gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-[#F7F4ED]/65 sm:left-8 sm:flex sm:text-[11px]"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.1, duration: 0.7, ease: EASE }}
        aria-hidden
      >
        <span className="-rotate-90 whitespace-nowrap pb-6 pl-1">SRCC &apos;27</span>
        <span className="-rotate-90 whitespace-nowrap pb-6 pl-1">Delhi, India</span>
      </motion.div>

      {/* ---- Right side tagline (handwritten) ---- */}
      <motion.p
        className="hand-display absolute right-5 top-1/2 z-10 hidden max-w-[220px] -translate-y-1/2 rotate-[3deg] text-right text-2xl text-[#F7F4ED]/85 sm:right-8 sm:block sm:text-3xl"
        initial={{ opacity: 0, x: 14 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.25, duration: 0.7, ease: EASE }}
      >
        {HERO_TAGLINE}
      </motion.p>

      {/* ---- Scattered micro-elements (intentional misalignment) ---- */}
      <motion.span
        className="pointer-events-none absolute left-6 top-24 -rotate-[4deg] select-none font-mono text-[10px] uppercase tracking-[0.25em] text-[#FFD400] sm:left-16 sm:top-28 sm:text-[11px]"
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6, ease: EASE }}
        aria-hidden
      >
        {"// CREATIVE DIR."}
      </motion.span>

      <motion.span
        className="pointer-events-none absolute right-6 top-28 rotate-[3deg] select-none font-mono text-[10px] uppercase tracking-[0.18em] text-[#F7F4ED]/55 sm:right-16 sm:text-[11px]"
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.6, ease: EASE }}
        aria-hidden
      >
        28.6139° N, 77.2090° E
      </motion.span>

      <motion.span
        className="pointer-events-none absolute bottom-32 left-6 -rotate-[10deg] select-none text-3xl text-[#FFD400] sm:bottom-40 sm:left-16 sm:text-4xl"
        initial={{ opacity: 0, scale: 0.4, rotate: -30 }}
        animate={{ opacity: 0.95, scale: 1, rotate: -10 }}
        transition={{ delay: 1.6, duration: 0.8, ease: EASE }}
        aria-hidden
      >
        ★
      </motion.span>

      <motion.span
        className="pointer-events-none absolute bottom-36 right-6 rotate-[6deg] select-none font-mono text-[10px] uppercase tracking-[0.25em] text-[#F7F4ED]/55 sm:bottom-44 sm:right-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.7, duration: 0.6 }}
        aria-hidden
      >
        {"// 24/7"}
      </motion.span>

      {/* ---- GIANT handwritten "baaz" — letter-by-letter mask reveal + parallax ---- */}
      <div className="relative z-0 flex flex-1 items-center justify-center">
        <motion.h1
          className="hand-display select-none text-[30vw] text-[#F7F4ED] sm:text-[22vw] lg:text-[20rem]"
          style={reduced ? undefined : { x: baazX, y: baazY }}
          aria-label={HERO_NAME}
          data-cursor-label="baaz"
        >
          <span className="inline-flex">
            {letters.map((letter, i) => (
              <span
                key={i}
                className="inline-block overflow-hidden align-bottom"
                aria-hidden
              >
                <motion.span
                  className="inline-block"
                  initial={reduced ? { y: "0%" } : { y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{
                    delay: reduced ? 0 : 0.3 + i * 0.08,
                    duration: reduced ? 0 : 0.9,
                    ease: EASE,
                  }}
                >
                  {letter}
                </motion.span>
              </span>
            ))}
          </span>
        </motion.h1>
      </div>

      {/* ---- Time morph ---- */}
      <motion.div
        className="relative z-10 mt-2 text-center font-mono text-sm text-[#FFD400] sm:mt-3 sm:text-base"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        aria-label="time morph from 20:00 to 00:00"
      >
        <span className="tabular-nums">{reduced ? "00" : pad(hour)}:00</span>
        <span className="mx-2 text-[#F7F4ED]/55" aria-hidden>
          →
        </span>
        <span className="tabular-nums text-[#F7F4ED]/55">00:00</span>
      </motion.div>

      {/* ---- Cycling role triptych ---- */}
      <div
        className="relative z-10 mt-5 flex h-12 w-full max-w-[680px] items-center justify-center overflow-hidden self-center sm:mt-6 sm:h-14"
        aria-live="polite"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={roleIndex}
            className="absolute inset-0 flex items-center justify-center gap-3 font-display text-lg font-semibold tracking-tight text-[#F7F4ED] sm:text-2xl"
            initial={
              reduced ? { opacity: 1 } : { opacity: 0, filter: "blur(8px)", y: 12 }
            }
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            exit={
              reduced ? { opacity: 0 } : { opacity: 0, filter: "blur(8px)", y: -12 }
            }
            transition={{ duration: 0.5, ease: EASE }}
          >
            <span>{HERO_ROLES[roleIndex]}</span>
            <span className="text-[#FFD400]" aria-hidden>
              →
            </span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ---- Scroll cue ---- */}
      <motion.div
        className="relative z-10 mt-auto flex flex-col items-center gap-2 pt-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
      >
        <span className="pulse-soft font-mono text-[10px] uppercase tracking-[0.3em] text-[#F7F4ED]/75">
          GO ON, SCROLL DOWN
        </span>
        <motion.div
          animate={reduced ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden
        >
          <ChevronDown className="h-4 w-4 text-[#FFD400]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
