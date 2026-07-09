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

const IDENTITY_LOCKUP = [
  { text: HERO.identityLines[0], size: "text-[clamp(2rem,4vw,5rem)]" },
  { text: HERO.identityLines[1], size: "text-[clamp(4rem,8vw,9rem)]" },
  { text: HERO.identityLines[2], size: "text-[clamp(7rem,15vw,15rem)]" },
  { text: HERO.identityLines[3], size: "text-[clamp(6rem,13vw,13rem)]" },
] as const;

// Scattered skill tag positions — adjusted to avoid overlaps and blockages
const SCATTER_POSITIONS = [
  { top: "28%", left: "25%" }, // Product Strategy
  { top: "32%", left: "78%" }, // AI Products
  { top: "88%", left: "28%" }, // Customer Journey Mapping
  { top: "82%", left: "64%" }, // Workflow Automation
  { top: "42%", left: "12%" }, // Product Analytics
  { top: "82%", left: "15%" }, // Rapid Prototyping
  { top: "24%", left: "65%" }, // Applied AI
  { top: "88%", left: "78%" }, // Research
  { top: "46%", left: "74%" }, // Data Systems
  { top: "60%", left: "4%"  }, // Experimentation
];

function useLiveClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      let hours = d.getHours();
      const minutes = String(d.getMinutes()).padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      const hoursStr = String(hours).padStart(2, "0");
      setTime(`${hoursStr}:${minutes} ${ampm}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function Hero() {
  const reduced = usePrefersReducedMotion();
  const clock = useLiveClock();

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

      {/* ---- Background skill tags layer (high z-index to unblock hovers) ---- */}
      <BackgroundLayer reduced={reduced} />

      {/* ---- Top metadata bar ---- */}
      <div className="relative z-10 flex w-full items-start justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[#F7F4ED]/75 sm:text-[11px] pointer-events-none">
        <motion.span
          className="max-w-[55%] leading-relaxed pointer-events-none"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: EASE }}
        >
          <span className="block">{HERO.topMeta}</span>
          <span className="block text-[#F7F4ED]/55">{HERO.topMetaSub}</span>
        </motion.span>

        <motion.span
          className="text-center font-mono text-[10px] uppercase tracking-[0.2em] text-[#FFD400] sm:text-[11px] font-bold pointer-events-none"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28, duration: 0.6, ease: EASE }}
        >
          {clock}
        </motion.span>

        <motion.span
          className="hidden max-w-[42%] text-right leading-relaxed sm:block pointer-events-none"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6, ease: EASE }}
        >
          {(() => {
            const parts = HERO.topLinks.split(" → ");
            return (
              <>
                <span className="block text-[#F7F4ED]/55">{parts[0]}:</span>
                {parts.slice(1).map((part) => (
                  <span key={part} className="block text-[#F7F4ED]/75">
                    ↓ {part}
                  </span>
                ))}
              </>
            );
          })()}
        </motion.span>
      </div>

      {/* ---- Single corner accent: coordinates ---- */}
      <motion.span
        className="pointer-events-none absolute right-6 top-16 rotate-[3deg] select-none font-mono text-[9px] uppercase tracking-[0.18em] text-[#F7F4ED]/45 sm:right-16 sm:top-20 sm:text-[10px]"
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.6, ease: EASE }}
        aria-hidden
      >
        28.6139° N, 77.2090° E
      </motion.span>

      {/* ---- IDENTITY LOCKUP ---- */}
      <div className="pointer-events-none relative z-20 flex flex-1 items-center justify-center">
        <motion.h1
          className="pointer-events-auto hand-display select-none text-center text-[#F7F4ED]"
          style={reduced ? undefined : { x: lockupX, y: lockupY }}
          aria-label={HERO.identityLines.join(" ")}
        >
          <div className="flex flex-col items-center justify-center">
            {IDENTITY_LOCKUP.map((line, i) => (
              <span
                key={i}
                className="block overflow-hidden px-6"
                style={{
                  lineHeight: 0.82,
                  marginTop: i === 3 ? "calc(-1 * (0.12 * min(13rem, 13vw)))" : undefined,
                }}
              >
                <motion.span
                  className={`hand-display block px-8 ${line.size}`}
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

      {/* ---- Tagline (right side, beside the lockup, rotated) ---- */}
      <motion.p
        className="hand-display absolute right-12 top-1/2 z-10 hidden -translate-y-1/2 rotate-[3deg] text-right text-xl text-[#F7F4ED]/85 sm:block sm:text-2xl xl:right-16 pointer-events-none"
        initial={{ opacity: 0, x: 14 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.25, duration: 0.7, ease: EASE }}
      >
        {HERO.tagline}
      </motion.p>

      {/* ---- Delhi, India (left side, beside the lockup, vertical/rotated) ---- */}
      <motion.div
        className="absolute left-5 top-1/2 z-10 hidden -translate-y-1/2 sm:left-8 sm:block pointer-events-none"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.1, duration: 0.7, ease: EASE }}
        aria-hidden
      >
        <span className="block -rotate-90 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.3em] text-[#F7F4ED]/65 sm:text-[11px]">
          {HERO.location}
        </span>
      </motion.div>

      {/* ---- Scroll cue ---- */}
      <motion.div
        className="pointer-events-none relative z-10 mt-auto flex flex-col items-center gap-2 pt-6 sm:pt-8"
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

      {/* ---- Bottom strip ---- */}
      <motion.div
        className="pointer-events-none relative z-10 mt-5 flex w-full items-center justify-between border-t border-white/10 pt-3 font-mono text-[9px] uppercase tracking-[0.22em] text-[#F7F4ED]/55 sm:text-[10px]"
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

/* ============================================================
   Background layer — renders skill tags with a high z-index.
   ============================================================ */
function BackgroundLayer({
  reduced,
}: {
  reduced: boolean;
}) {
  return (
    <div className="pointer-events-none absolute inset-0 z-30 overflow-hidden">
      {LAB.skills.map((skill, i) => {
        const pos = SCATTER_POSITIONS[i % SCATTER_POSITIONS.length];
        return (
          <motion.span
            key={`scatter-${skill.label}`}
            className="pulse-tag absolute cursor-default border px-4 py-2 font-mono text-[12px] uppercase tracking-[0.18em] pointer-events-auto sm:text-[13px] lg:text-[14px]"
            style={{
              top: pos.top,
              left: pos.left,
              transform: `rotate(${skill.rotate}deg)`,
              "--rotate": `${skill.rotate}deg`,
              animationDelay: `${(i % 5) * 0.7}s`,
              animationDuration: `${4 + (i % 3) * 1.2}s`,
            } as any}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2 + i * 0.12, duration: 0.5, ease: EASE }}
          >
            {skill.label}
          </motion.span>
        );
      })}
    </div>
  );
}
