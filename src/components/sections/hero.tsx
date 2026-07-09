"use client";
import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ChevronDown } from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { HERO, LAB } from "@/lib/data";
import { getLenis } from "@/lib/lenis-instance";

const EASE = [0.16, 1, 0.3, 1] as const;

const IDENTITY_LOCKUP = [
  { text: HERO.identityLines[0], size: "text-[clamp(2rem,4vw,5rem)]" },
  { text: HERO.identityLines[1], size: "text-[clamp(4rem,8vw,9rem)]" },
  { text: HERO.identityLines[2], size: "text-[clamp(7rem,15vw,15rem)]" },
  { text: HERO.identityLines[3], size: "text-[clamp(6rem,13vw,13rem)]" },
] as const;

// Scattered skill tag positions — optimized per Screenshot 2026-07-09 at 17.49.01.png
const SCATTER_POSITIONS = [
  { top: "28%", left: "25%", mobileHidden: true }, // index 0: Product Strategy
  { top: "32%", left: "78%" }, // index 1: Storytelling
  { top: "12%", left: "20%" }, // index 2: Customer Journey Mapping (moved from bottom to top-left empty space)
  { top: "64%", left: "74%", mobileHidden: true }, // index 3: Workflow Automation (moved from bottom to middle-right empty space below Data Systems)
  { top: "42%", left: "12%", mobileHidden: true }, // index 4: Product Analytics
  { top: "86%", left: "12%", mobileHidden: true }, // index 5: Rapid Prototyping (moved to desired position per Screenshot 2026-07-09 at 18.00.59.png)
  { top: "24%", left: "65%" }, // index 6: Applied AI
  { top: "83%", left: "76%", mobileHidden: true }, // index 7: Marketing Research (shifted slightly upwards to fit larger text width)
  { top: "46%", left: "74%", mobileHidden: true }, // index 8: Data Systems
  { top: "60%", left: "10%" }, // index 9: Iteration (shifted slightly right)
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

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(el, { offset: -20, duration: 1.2 });
    } else {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

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
          className="max-w-[55%] leading-relaxed pointer-events-none pl-6 sm:pl-10"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: EASE }}
        >
          <span className="block text-[12px] sm:text-[14px] font-bold tracking-[0.22em] text-[#F7F4ED]">{HERO.topMeta}</span>
          <span className="block text-[9px] sm:text-[10px] tracking-[0.22em] text-[#F7F4ED]/80 mt-0.5">{HERO.topMetaSub}</span>
        </motion.span>

        <motion.div
          className="hidden max-w-[42%] text-right leading-relaxed sm:block pointer-events-auto z-20"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6, ease: EASE }}
        >
          {(() => {
            const parts = HERO.topLinks.split(" → ");
            const targets = ["best-work", "lab", "contact"];
            return (
              <>
                <span className="block text-[#F7F4ED]/80 select-none">{parts[0]}:</span>
                {parts.slice(1).map((part, index) => {
                  const targetId = targets[index];
                  return (
                    <button
                      key={part}
                      onClick={() => scrollTo(targetId)}
                      className="block w-full text-right text-white hover:text-[#FFD400] transition-colors focus:outline-none focus-ring select-none"
                    >
                      ↓ {part}
                    </button>
                  );
                })}
              </>
            );
          })()}
        </motion.div>
      </div>

      {/* ---- Symmetrically Centered System Time (Absolute positioned per device screen center) ---- */}
      <motion.span
        className="absolute left-1/2 top-3 -translate-x-1/2 z-20 text-center font-mono text-[13px] uppercase tracking-[0.2em] text-[#FFD400] sm:top-6 sm:text-[15px] font-bold pointer-events-none"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.28, duration: 0.6, ease: EASE }}
      >
        {clock}
      </motion.span>

      {/* ---- Single corner accent: coordinates ---- */}
      <motion.span
        className="pointer-events-none absolute right-6 top-28 rotate-[3deg] select-none font-mono text-[9px] uppercase tracking-[0.18em] text-[#F7F4ED]/75 sm:right-16 sm:top-36 sm:text-[10px] hidden md:block"
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
                className="block w-full overflow-hidden px-6 text-center"
                style={{
                  lineHeight: 0.82,
                  marginTop: i === 3 ? "calc(-1 * (0.12 * min(13rem, 13vw)))" : undefined,
                  // Nudge "Mr." rightward so it optically aligns with the visual weight of the lines below
                  transform: i === 0 ? "translateX(2rem)" : undefined,
                }}
              >
                <motion.span
                  className={`hand-display inline-block px-8 ${line.size}`}
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

      {/* ---- Tagline (below the lockup, centered, single line, slightly rotated) ---- */}
      <motion.p
        className="pointer-events-none relative z-10 mt-6 text-center hand-display -rotate-[1deg] text-xl text-[#F7F4ED]/85 sm:text-2xl"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.25, duration: 0.7, ease: EASE }}
      >
        {HERO.tagline}
      </motion.p>

      {/* ---- Location: Delhi, India (positioned vertically beside lunch break) ---- */}
      <motion.div
        className="absolute z-10 font-mono text-[10px] uppercase tracking-[0.3em] text-[#F7F4ED]/65 sm:text-[11px] pointer-events-none hidden md:block"
        style={{ top: "54%", left: "63%", rotate: -90 }}
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.1, duration: 0.7, ease: EASE }}
      >
        <span className="whitespace-nowrap">{HERO.location}</span>
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
        const rotVal = skill.rotate * 3.5;
        return (
          <motion.span
            key={`scatter-${skill.label}`}
            className={`pulse-tag absolute cursor-default border px-4 py-2 font-mono text-[12px] uppercase tracking-[0.18em] pointer-events-auto sm:text-[13px] lg:text-[14px] ${
              pos.mobileHidden ? "hidden lg:inline-block" : ""
            }`}
            style={{
              top: pos.top,
              left: pos.left,
              rotate: rotVal,
              "--rotate": `${rotVal}deg`,
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
