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
import { HERO, LAB } from "@/lib/data";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Identity lockup sizing — per spec:
 *   Mr.   clamp(2rem, 4vw, 5rem)
 *   On a  clamp(4rem, 8vw, 9rem)
 *   lunch  clamp(7rem, 15vw, 15rem)   <- LARGEST
 *   break  clamp(6rem, 13vw, 13rem)   <- large, overlaps lunch
 */
const IDENTITY_LOCKUP = [
  { text: HERO.identityLines[0], size: "text-[clamp(2rem,4vw,5rem)]" },
  { text: HERO.identityLines[1], size: "text-[clamp(4rem,8vw,9rem)]" },
  { text: HERO.identityLines[2], size: "text-[clamp(7rem,15vw,15rem)]" },
  { text: HERO.identityLines[3], size: "text-[clamp(6rem,13vw,13rem)]" },
] as const;

/**
 * Hero — Section 01.
 *
 * Electric blue (#1738D5) environment. Cleaned-up layout: the tagline
 * and location are now in the document flow (not absolutely positioned)
 * to avoid conflicts with the central identity + right-side nav. The
 * scattered micro-elements are minimal and anchored to corners only.
 *
 * Centerpiece: "Mr. / On a / lunch / break" handwritten lockup revealed
 * line-by-line via clipping masks. Below: time morph, role cycler,
 * secondary line, scroll cue. Top: metadata bar. Bottom: Portfolio strip.
 */
export default function Hero() {
  const reduced = usePrefersReducedMotion();
  const [roleIndex, setRoleIndex] = useState(0);
  const [timeIndex, setTimeIndex] = useState(0);

  // ---- Cursor parallax (spring-smoothed, ±8px) ----
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 120, damping: 18, mass: 0.4 });
  const py = useSpring(my, { stiffness: 120, damping: 18, mass: 0.4 });
  const lockupX = useTransform(px, [-0.5, 0.5], [-8, 8]);
  const lockupY = useTransform(py, [-0.5, 0.5], [-8, 8]);

  useEffect(() => {
    if (reduced) return;
    const onMove = (e: MouseEvent) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      mx.set(e.clientX / w - 0.5);
      my.set(e.clientY / h - 0.5);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduced, mx, my]);

  // ---- Cycling role cycler (2.5s per role) ----
  useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => {
      setRoleIndex((i) => (i + 1) % HERO.roles.length);
    }, 2500);
    return () => clearInterval(t);
  }, [reduced]);

  // ---- Time morph: cycle through ["09:00","13:00","02:00"] ----
  useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => {
      setTimeIndex((i) => (i + 1) % HERO.timeMorph.length);
    }, 1800);
    return () => clearInterval(t);
  }, [reduced]);

  return (
    <section
      id="hero"
      className="env-blue relative flex min-h-screen w-full flex-col overflow-hidden px-5 py-10 sm:px-8 sm:py-14"
    >
      {/* ---- L-shaped corner framing marks ---- */}
      <span aria-hidden className="pointer-events-none absolute left-4 top-4 h-5 w-5 border-l border-t border-white/40 sm:left-6 sm:top-6 sm:h-6 sm:w-6" />
      <span aria-hidden className="pointer-events-none absolute right-4 top-4 h-5 w-5 border-r border-t border-white/40 sm:right-6 sm:top-6 sm:h-6 sm:w-6" />
      <span aria-hidden className="pointer-events-none absolute bottom-4 left-4 h-5 w-5 border-b border-l border-white/40 sm:bottom-6 sm:left-6 sm:h-6 sm:w-6" />
      <span aria-hidden className="pointer-events-none absolute bottom-4 right-4 h-5 w-5 border-b border-r border-white/40 sm:bottom-6 sm:right-6 sm:h-6 sm:w-6" />

      {/* ---- Blurred skill tags background layer ----
           The skill tags from the Product Lab are scattered across the
           hero background, heavily blurred + low-opacity so they read
           as ambient texture. On hover they un-blur + brighten, giving
           the hero a reactive, alive feel without competing with the
           central identity lockup. */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {LAB.skills.map((skill, i) => {
          // Deterministic scattered positions across the hero background
          const positions = [
            { top: "8%", left: "8%" },
            { top: "15%", left: "70%" },
            { top: "75%", left: "12%" },
            { top: "82%", left: "65%" },
            { top: "25%", left: "20%" },
            { top: "68%", left: "40%" },
            { top: "12%", left: "40%" },
            { top: "88%", left: "80%" },
            { top: "35%", left: "75%" },
            { top: "55%", left: "8%" },
          ];
          const pos = positions[i % positions.length];
          return (
            <motion.span
              key={skill.label}
              className="group/skill absolute cursor-default font-mono text-xs uppercase tracking-[0.2em] text-[#F7F4ED]/25 transition-all duration-500 hover:text-[#FFD400] hover:!opacity-100 sm:text-sm pointer-events-auto"
              style={{
                top: pos.top,
                left: pos.left,
                rotate: skill.rotate,
                filter: "blur(4px)",
                opacity: 0.5,
              }}
              whileHover={{
                filter: "blur(0px)",
                opacity: 1,
                scale: 1.15,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 1.5 + i * 0.15, duration: 0.8 }}
            >
              {skill.label}
            </motion.span>
          );
        })}
      </div>

      {/* ---- Top metadata bar ---- */}
      <div className="relative z-10 flex w-full items-start justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[#F7F4ED]/75 sm:text-[11px]">
        <motion.span
          className="max-w-[55%] leading-relaxed"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: EASE }}
        >
          <span className="block">{HERO.topMeta}</span>
          <span className="block text-[#F7F4ED]/55">{HERO.topMetaSub}</span>
        </motion.span>
        <motion.span
          className="hidden max-w-[42%] text-right leading-relaxed sm:block"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6, ease: EASE }}
        >
          {HERO.topLinks}
        </motion.span>
      </div>

      {/* ---- Single corner accent: coordinates (top-right, subtle) ---- */}
      <motion.span
        className="pointer-events-none absolute right-6 top-16 rotate-[3deg] select-none font-mono text-[9px] uppercase tracking-[0.18em] text-[#F7F4ED]/45 sm:right-16 sm:top-20 sm:text-[10px]"
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.6, ease: EASE }}
        aria-hidden
      >
        28.6139° N, 77.2090° E
      </motion.span>

      {/* ---- IDENTITY LOCKUP — stacked handwritten, line-by-line mask reveal ---- */}
      <div className="relative z-0 flex flex-1 items-center justify-center">
        <motion.h1
          className="hand-display select-none text-center text-[#F7F4ED]"
          style={reduced ? undefined : { x: lockupX, y: lockupY }}
          aria-label={HERO.identityLines.join(" ")}
        >
          <div className="flex flex-col items-center justify-center">
            {IDENTITY_LOCKUP.map((line, i) => (
              <span
                key={i}
                className="block overflow-hidden"
                style={{
                  lineHeight: 0.82,
                  marginTop: i === 3 ? "calc(-1 * (0.12 * min(13rem, 13vw)))" : undefined,
                }}
              >
                <motion.span
                  className={`hand-display block ${line.size}`}
                  initial={reduced ? { y: "0%" } : { y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{
                    delay: reduced ? 0 : 0.3 + i * 0.12,
                    duration: reduced ? 0 : 0.9,
                    ease: EASE,
                  }}
                >
                  {line.text}
                </motion.span>
              </span>
            ))}
          </div>
        </motion.h1>
      </div>

      {/* ---- Tagline + location row (in-flow, below the lockup) ----
           Tagline is right-shifted so there's equal padding between the
           left edge and the central identity. Delhi, India sits on the
           right side. DTU '23 has been removed per user request. */}
      <motion.div
        className="relative z-10 flex flex-col items-center gap-3 text-center sm:flex-row sm:items-baseline sm:justify-center sm:gap-12 sm:text-left"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.7, ease: EASE }}
      >
        <p className="hand-display -rotate-[1deg] text-xl text-[#F7F4ED]/85 sm:ml-auto sm:max-w-[280px] sm:text-2xl">
          {HERO.tagline}
        </p>
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#F7F4ED]/65 sm:mr-auto sm:text-[11px]">
          {HERO.location}
        </div>
      </motion.div>

      {/* ---- Time morph + role cycler + secondary line (centered cluster) ---- */}
      <motion.div
        className="relative z-10 mt-5 flex flex-col items-center gap-2 text-center sm:mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        aria-label="time morph through the day"
      >
        <div className="font-mono text-sm sm:text-base">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={timeIndex}
              className="inline-block tabular-nums text-[#FFD400]"
              initial={reduced ? { opacity: 1 } : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, y: -6 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              {HERO.timeMorph[timeIndex]}
            </motion.span>
          </AnimatePresence>
          <span className="mx-2 text-[#F7F4ED]/45" aria-hidden>→</span>
          <span className="tabular-nums text-[#F7F4ED]/55">{HERO.timeMorph[(timeIndex + 1) % HERO.timeMorph.length]}</span>
          <span className="mx-2 text-[#F7F4ED]/45" aria-hidden>→</span>
          <span className="tabular-nums text-[#F7F4ED]/55">{HERO.timeMorph[(timeIndex + 2) % HERO.timeMorph.length]}</span>
        </div>
        <p className="hand-display -rotate-[1deg] text-sm text-[#F7F4ED]/65 sm:text-base">
          {HERO.timeAnnotation}
        </p>
      </motion.div>

      {/* ---- Cycling role triptych ---- */}
      <div
        className="relative z-10 mt-3 flex h-10 w-full max-w-[680px] items-center justify-center overflow-hidden self-center sm:mt-4 sm:h-12"
        aria-live="polite"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={roleIndex}
            className="absolute inset-0 flex items-center justify-center gap-3 font-display text-base font-semibold tracking-tight text-[#F7F4ED] sm:text-xl"
            initial={reduced ? { opacity: 1 } : { opacity: 0, filter: "blur(8px)", y: 12 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, filter: "blur(8px)", y: -12 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <span>{HERO.roles[roleIndex]}</span>
            <span className="text-[#FFD400]" aria-hidden>→</span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ---- Secondary line ---- */}
      <motion.p
        className="relative z-10 mt-2 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-[#F7F4ED]/70 sm:text-[11px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        {HERO.secondary}
      </motion.p>

      {/* ---- Scroll cue ---- */}
      <motion.div
        className="relative z-10 mt-auto flex flex-col items-center gap-2 pt-6 sm:pt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
      >
        <span className="hand-display text-2xl text-[#F7F4ED] sm:text-3xl">
          {HERO.scrollCta}
        </span>
        <span className="pulse-soft font-mono text-[10px] uppercase tracking-[0.3em] text-[#F7F4ED]/75">
          {HERO.scrollCtaSub}
        </span>
        <motion.div
          animate={reduced ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden
        >
          <ChevronDown className="h-4 w-4 text-[#FFD400]" />
        </motion.div>
      </motion.div>

      {/* ---- Bottom Portfolio // Session strip ---- */}
      <motion.div
        className="relative z-10 mt-5 flex w-full items-center justify-between border-t border-white/10 pt-3 font-mono text-[9px] uppercase tracking-[0.22em] text-[#F7F4ED]/55 sm:text-[10px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
      >
        <span>{HERO.bottomLabel}</span>
        <span className="text-[#FFD400]">{HERO.bottomSession}</span>
      </motion.div>
    </section>
  );
}
