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

type HeroVariant = "classic" | "scattered" | "ambient";

const VARIANT_LABELS: Record<HeroVariant, string> = {
  classic: "CLASSIC",
  scattered: "SCATTERED",
  ambient: "AMBIENT",
};

// Scattered skill tag positions for the "scattered" variant.
// Each tag is a visible bordered box (per PDF pages 2-3 design).
const SCATTER_POSITIONS = [
  { top: "10%", left: "5%" },
  { top: "16%", left: "72%" },
  { top: "78%", left: "8%" },
  { top: "84%", left: "62%" },
  { top: "24%", left: "16%" },
  { top: "70%", left: "36%" },
  { top: "8%", left: "38%" },
  { top: "90%", left: "76%" },
  { top: "34%", left: "70%" },
  { top: "54%", left: "5%" },
];

export default function Hero() {
  const reduced = usePrefersReducedMotion();
  const [roleIndex, setRoleIndex] = useState(0);
  const [timeIndex, setTimeIndex] = useState(0);
  const [variant, setVariant] = useState<HeroVariant>(() => {
    if (typeof window === "undefined") return "scattered";
    const stored = localStorage.getItem("hero-variant") as HeroVariant | null;
    return stored && stored in VARIANT_LABELS ? stored : "scattered";
  });

  // Persist variant preference
  useEffect(() => {
    localStorage.setItem("hero-variant", variant);
  }, [variant]);

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

  useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => {
      setRoleIndex((i) => (i + 1) % HERO.roles.length);
    }, 2500);
    return () => clearInterval(t);
  }, [reduced]);

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

      {/* ---- Variant toggle (top-center, small) ---- */}
      <div className="absolute left-1/2 top-4 z-20 flex -translate-x-1/2 items-center gap-1 rounded-full border border-white/15 bg-[#0A0A0A]/40 px-1.5 py-1 backdrop-blur-sm sm:top-6">
        {(Object.keys(VARIANT_LABELS) as HeroVariant[]).map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => setVariant(v)}
            className={`rounded-full px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.2em] transition-colors sm:text-[10px] ${
              variant === v
                ? "bg-[#FFD400] text-[#0A0A0A]"
                : "text-[#F7F4ED]/55 hover:text-[#F7F4ED]"
            }`}
            aria-label={`Hero design: ${VARIANT_LABELS[v]}`}
            aria-pressed={variant === v}
          >
            {VARIANT_LABELS[v]}
          </button>
        ))}
      </div>

      {/* ---- Background skill tags layer (varies by variant) ---- */}
      <BackgroundLayer variant={variant} reduced={reduced} />

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

      {/* ---- Tagline (below the lockup, centered) ---- */}
      <motion.p
        className="relative z-10 mt-2 text-center hand-display -rotate-[1deg] text-xl text-[#F7F4ED]/85 sm:text-2xl"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.7, ease: EASE }}
      >
        {HERO.tagline}
      </motion.p>

      {/* ---- Delhi, India (centered, below tagline) ---- */}
      <motion.p
        className="relative z-10 mt-2 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-[#F7F4ED]/65 sm:text-[11px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
      >
        {HERO.location}
      </motion.p>

      {/* ---- Time morph + role cycler + secondary line ---- */}
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

      {/* ---- Bottom strip ---- */}
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

/* ============================================================
   Background layer — renders skill tags differently per variant.
   ============================================================ */
function BackgroundLayer({
  variant,
  reduced,
}: {
  variant: HeroVariant;
  reduced: boolean;
}) {
  // CLASSIC: no background tags — clean blue hero.
  if (variant === "classic") return null;

  // AMBIENT: word cloud words as faint, blurred background texture.
  if (variant === "ambient") {
    const ambientWords = LAB.wordCloud.slice(0, 20);
    const ambientPositions = [
      { top: "6%", left: "4%" }, { top: "12%", left: "66%" },
      { top: "76%", left: "8%" }, { top: "82%", left: "60%" },
      { top: "20%", left: "18%" }, { top: "68%", left: "34%" },
      { top: "8%", left: "38%" }, { top: "88%", left: "74%" },
      { top: "30%", left: "68%" }, { top: "50%", left: "4%" },
      { top: "40%", left: "80%" }, { top: "60%", left: "16%" },
      { top: "15%", left: "48%" }, { top: "85%", left: "30%" },
      { top: "45%", left: "50%" }, { top: "25%", left: "84%" },
      { top: "55%", left: "70%" }, { top: "92%", left: "48%" },
      { top: "35%", left: "22%" }, { top: "72%", left: "80%" },
    ];
    return (
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {ambientWords.map((word, i) => {
          const pos = ambientPositions[i % ambientPositions.length];
          return (
            <motion.span
              key={`ambient-${word}-${i}`}
              className="absolute font-display font-bold text-[#F7F4ED]/15"
              style={{
                top: pos.top,
                left: pos.left,
                fontSize: `${0.8 + (i % 4) * 0.4}rem`,
                rotate: `${(i % 5) - 2}deg`,
                filter: "blur(3px)",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 + i * 0.1, duration: 0.8 }}
            >
              {word}
            </motion.span>
          );
        })}
      </div>
    );
  }

  // SCATTERED: skill tags as visible bordered boxes (per PDF pages 2-3).
  // Initially slightly faded; on hover they brighten + the border turns
  // yellow + a subtle glow appears. This is the default variant.
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {LAB.skills.map((skill, i) => {
        const pos = SCATTER_POSITIONS[i % SCATTER_POSITIONS.length];
        const isFocal = i === 5 || i === 8; // two focal tags get yellow accent
        return (
          <motion.span
            key={`scatter-${skill.label}`}
            className="group/skill absolute cursor-default border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.15em] transition-all duration-300 hover:scale-110 pointer-events-auto sm:text-[11px]"
            style={{
              top: pos.top,
              left: pos.left,
              rotate: `${skill.rotate}deg`,
              borderColor: isFocal ? "rgba(255,212,0,0.5)" : "rgba(247,244,237,0.2)",
              backgroundColor: isFocal ? "rgba(255,212,0,0.08)" : "rgba(0,0,0,0.15)",
              color: isFocal ? "#FFD400" : "rgba(247,244,237,0.45)",
              backdropFilter: "blur(2px)",
            }}
            whileHover={{
              borderColor: "#FFD400",
              backgroundColor: "rgba(255,212,0,0.15)",
              color: "#FFD400",
              scale: 1.12,
              boxShadow: "0 0 20px rgba(255,212,0,0.3)",
            }}
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
