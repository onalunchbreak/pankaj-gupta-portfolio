"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import {
  HERO_LOCATION,
  HERO_NAME,
  HERO_ROLES,
  HERO_TAGLINE,
} from "@/lib/data";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const reduced = usePrefersReducedMotion();
  const [roleIndex, setRoleIndex] = useState(0);
  const [hour, setHour] = useState(20);

  // Cycling role triptych (2.5s per role)
  useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => {
      setRoleIndex((i) => (i + 1) % HERO_ROLES.length);
    }, 2500);
    return () => clearInterval(t);
  }, [reduced]);

  // Time morph 20:00 -> 00:00 — hour ticks forward through the night
  // (20→21→22→23→00) then loops back to 20, so it always stays in the
  // "creative by night → more creative by midnight" range per spec.
  // When reduced-motion is preferred we render the static final state in JSX,
  // so this effect only sets up the cycling interval.
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
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#0A0A0A] px-5 py-24"
      data-cursor-label="baaz"
    >
      {/* ---- Scattered micro-elements (intentional misalignment) ---- */}
      <motion.span
        className="pointer-events-none absolute left-4 top-24 -rotate-[4deg] select-none font-mono text-[10px] uppercase tracking-[0.25em] text-[#FFD400] sm:left-10 sm:text-[11px]"
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6, ease: EASE }}
        aria-hidden
      >
        {"// CREATIVE DIR."}
      </motion.span>

      <motion.span
        className="pointer-events-none absolute right-4 top-28 rotate-[3deg] select-none font-mono text-[10px] uppercase tracking-[0.18em] text-[#6B6B6B] sm:right-10"
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.6, ease: EASE }}
        aria-hidden
      >
        28.6139° N, 77.2090° E
      </motion.span>

      <motion.span
        className="pointer-events-none absolute bottom-28 left-6 -rotate-[10deg] select-none text-3xl text-[#FFD400] sm:left-16 sm:text-4xl"
        initial={{ opacity: 0, scale: 0.4, rotate: -30 }}
        animate={{ opacity: 0.9, scale: 1, rotate: -10 }}
        transition={{ delay: 1.6, duration: 0.8, ease: EASE }}
        aria-hidden
      >
        ★
      </motion.span>

      <motion.span
        className="pointer-events-none absolute bottom-32 right-6 rotate-[6deg] select-none font-mono text-[10px] uppercase tracking-[0.25em] text-[#6B6B6B] sm:right-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.7, duration: 0.6 }}
        aria-hidden
      >
        {"//* 24/7"}
      </motion.span>

      {/* ---- Hero name: letter-by-letter mask reveal ---- */}
      <h1
        className="font-display text-[28vw] font-bold leading-[0.8] tracking-tighter text-[#F4F1EA] sm:text-[18vw] lg:text-[16rem]"
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
      </h1>

      {/* ---- Tagline ---- */}
      <motion.p
        className="mt-6 max-w-[640px] text-center font-mono text-[11px] uppercase tracking-[0.25em] text-[#F4F1EA]/75 sm:text-xs"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.8, ease: EASE }}
      >
        {HERO_TAGLINE}
      </motion.p>

      {/* ---- Time morph ---- */}
      <motion.div
        className="mt-5 font-mono text-sm text-[#FFD400] sm:text-base"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        aria-label="time morph from 20:00 to 00:00"
      >
        <span className="tabular-nums">
          {reduced ? "00" : pad(hour)}:00
        </span>
        <span className="mx-2 text-[#6B6B6B]" aria-hidden>
          →
        </span>
        <span className="tabular-nums text-[#F4F1EA]/55">00:00</span>
      </motion.div>

      {/* ---- Cycling role triptych ---- */}
      <div
        className="relative mt-8 flex h-12 w-full max-w-[680px] items-center justify-center overflow-hidden sm:h-14"
        aria-live="polite"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={roleIndex}
            className="absolute inset-0 flex items-center justify-center gap-3 font-display text-lg font-semibold tracking-tight text-[#F4F1EA] sm:text-2xl"
            initial={reduced ? { opacity: 1 } : { opacity: 0, filter: "blur(8px)", y: 10 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, filter: "blur(8px)", y: -10 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <span>{HERO_ROLES[roleIndex]}</span>
            <span className="text-[#FFD400]" aria-hidden>
              →
            </span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ---- Location ---- */}
      <motion.p
        className="mt-8 font-mono text-[10px] uppercase tracking-[0.25em] text-[#6B6B6B] sm:text-xs"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.6 }}
      >
        {HERO_LOCATION}
      </motion.p>

      {/* ---- Scroll cue ---- */}
      <motion.div
        className="absolute bottom-8 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
      >
        <span className="pulse-soft font-mono text-[10px] uppercase tracking-[0.3em] text-[#F4F1EA]/70">
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
