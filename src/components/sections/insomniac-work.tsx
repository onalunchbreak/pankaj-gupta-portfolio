"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal, SectionShell } from "@/components/sections/_shared";
import {
  INSOMNIAC_SKILLS,
  WORD_CLOUD,
  WORD_CLOUD_TITLE,
} from "@/lib/data";
import { useSound } from "@/hooks/use-sound";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ============================================================
   Word cloud — deterministic per-index layout.
   34 words positioned in a collage pattern across a relative
   container. Each word gets a fixed:
     - position (top/left %)
     - font-size multiplier
     - rotation in degrees
     - colour variant: "cream" | "blue" | "yellow" | "muted"

   The arrangement is hand-tuned (not random) so it reads as a
   deliberately crowded collage rather than a clean gallery.
   ============================================================ */
type WordSpec = {
  top: string;
  left: string;
  size: string; // tailwind text-size class
  rotate: number;
  color: "cream" | "blue" | "yellow" | "muted";
  weight?: "bold" | "normal";
};

const WORD_SPECS: WordSpec[] = [
  { top: "4%",  left: "2%",  size: "text-3xl sm:text-5xl",     rotate: -4, color: "yellow", weight: "bold" }, // Adaptability
  { top: "2%",  left: "30%", size: "text-2xl sm:text-4xl",     rotate: 2,  color: "cream",  weight: "bold" }, // Growth
  { top: "8%",  left: "55%", size: "text-4xl sm:text-6xl",     rotate: -2, color: "blue",   weight: "bold" }, // Strategy
  { top: "4%",  left: "78%", size: "text-xl sm:text-3xl",      rotate: 5,  color: "cream"  }, // Creative
  { top: "20%", left: "12%", size: "text-lg sm:text-2xl",      rotate: 3,  color: "muted"  }, // Ownership
  { top: "22%", left: "38%", size: "text-3xl sm:text-5xl",     rotate: -3, color: "cream",  weight: "bold" }, // Initiative
  { top: "20%", left: "62%", size: "text-2xl sm:text-4xl",     rotate: 4,  color: "yellow", weight: "bold" }, // Impact
  { top: "26%", left: "82%", size: "text-lg sm:text-2xl",      rotate: -2, color: "muted"  }, // Analytics
  { top: "38%", left: "4%",  size: "text-xl sm:text-3xl",      rotate: 5,  color: "blue",   weight: "bold" }, // Synergy
  { top: "40%", left: "26%", size: "text-2xl sm:text-4xl",     rotate: -4, color: "cream",  weight: "bold" }, // Bandwidth
  { top: "42%", left: "52%", size: "text-4xl sm:text-6xl",     rotate: 1,  color: "yellow", weight: "bold" }, // Design
  { top: "40%", left: "76%", size: "text-2xl sm:text-4xl",     rotate: -3, color: "cream",  weight: "bold" }, // Branding
  { top: "56%", left: "10%", size: "text-lg sm:text-2xl",      rotate: -2, color: "muted"  }, // Scholar
  { top: "54%", left: "30%", size: "text-xl sm:text-3xl",      rotate: 3,  color: "cream"  }, // Digital Marketing
  { top: "58%", left: "58%", size: "text-3xl sm:text-5xl",     rotate: -1, color: "blue",   weight: "bold" }, // Conversion
  { top: "54%", left: "80%", size: "text-lg sm:text-2xl",      rotate: 4,  color: "cream"  }, // Early Starter
  { top: "70%", left: "6%",  size: "text-xl sm:text-3xl",      rotate: -3, color: "yellow", weight: "bold" }, // Contributor
  { top: "72%", left: "28%", size: "text-base sm:text-xl",     rotate: 2,  color: "muted"  }, // Position of responsibility
  { top: "70%", left: "56%", size: "text-2xl sm:text-4xl",     rotate: -2, color: "cream",  weight: "bold" }, // Always Working
  { top: "74%", left: "82%", size: "text-lg sm:text-2xl",      rotate: 4,  color: "cream"  }, // Projects
  { top: "86%", left: "12%", size: "text-3xl sm:text-5xl",     rotate: 3,  color: "blue",   weight: "bold" }, // Networking
  { top: "88%", left: "38%", size: "text-xl sm:text-3xl",      rotate: -4, color: "cream"  }, // Building
  { top: "86%", left: "60%", size: "text-lg sm:text-2xl",      rotate: 2,  color: "muted"  }, // Academics
  { top: "90%", left: "80%", size: "text-2xl sm:text-4xl",     rotate: -2, color: "yellow", weight: "bold" }, // Ads
  { top: "12%", left: "20%", size: "text-base sm:text-xl",     rotate: 4,  color: "muted"  }, // Drama
  { top: "12%", left: "46%", size: "text-lg sm:text-2xl",      rotate: -2, color: "cream"  }, // Strategy Comps
  { top: "32%", left: "70%", size: "text-base sm:text-xl",     rotate: 3,  color: "muted"  }, // Cricketer
  { top: "50%", left: "20%", size: "text-base sm:text-xl",     rotate: -1, color: "blue",   weight: "bold" }, // Frost & Sullivan
  { top: "32%", left: "42%", size: "text-xl sm:text-3xl",      rotate: 4,  color: "cream"  }, // Blue Tea
  { top: "50%", left: "44%", size: "text-lg sm:text-2xl",      rotate: -3, color: "cream"  }, // Grimbyte Technologies
  { top: "64%", left: "42%", size: "text-2xl sm:text-4xl",     rotate: 2,  color: "yellow", weight: "bold" }, // SRCC
  { top: "32%", left: "8%",  size: "text-lg sm:text-2xl",      rotate: -3, color: "cream"  }, // Startups
  { top: "64%", left: "68%", size: "text-base sm:text-xl",     rotate: 4,  color: "muted"  }, // Freelancer
  { top: "82%", left: "30%", size: "text-xl sm:text-3xl",      rotate: -2, color: "blue",   weight: "bold" }, // Creative freedom
  { top: "16%", left: "70%", size: "text-base sm:text-xl",     rotate: 5,  color: "muted"  }, // (extra emphasis word)
];

const COLOR_CLASSES: Record<WordSpec["color"], string> = {
  cream: "text-[#F4F1EA]",
  blue: "text-[#1738D5]",
  yellow: "text-[#FFD400]",
  muted: "text-[#6B6B6B]",
};

/* ============================================================
   Skill preview specs — same idea as before but updated to
   the blue/yellow palette. Each hovered skill maps to a faded
   abstract shape rendered BEHIND the tag scatter + word cloud.
   ============================================================ */
type PreviewSpec = {
  shape: "blob" | "ring" | "bar";
  color: "blue" | "yellow";
  pos: string;
  size: string;
};

const PREVIEWS: Record<string, PreviewSpec> = {
  "Brand Design": { shape: "blob", color: "blue",   pos: "left-[6%] top-[10%]",  size: "h-64 w-64" },
  "Social Media": { shape: "ring", color: "yellow", pos: "right-[8%] top-[6%]",  size: "h-72 w-72" },
  "Typography":   { shape: "bar",  color: "blue",   pos: "left-[28%] top-[38%]", size: "h-[6px] w-72" },
  "Poster Design":{ shape: "blob", color: "yellow", pos: "right-[12%] top-[40%]",size: "h-56 w-56" },
  "Colour Grading":{ shape: "blob", color: "blue",   pos: "left-[12%] bottom-[8%]", size: "h-72 w-72" },
  "Motion Graphics":{ shape: "ring",color: "yellow", pos: "left-[42%] bottom-[12%]",size: "h-60 w-60" },
  "Visual Identity":{ shape: "bar", color: "yellow", pos: "right-[18%] bottom-[28%]",size: "h-[6px] w-64" },
  "Content Creation":{ shape: "blob",color: "blue",  pos: "right-[4%] bottom-[4%]",size: "h-64 w-64" },
};

/* ---- Scattered grid positions for the skill tags on sm+. ---- */
type ScatterPos = { col: string; row: string; ty: string };

const POSITIONS: ScatterPos[] = [
  { col: "sm:col-start-2",  row: "sm:row-start-1", ty: "sm:translate-y-3"  }, // Brand Design
  { col: "sm:col-start-8",  row: "sm:row-start-1", ty: "sm:translate-y-10" }, // Social Media
  { col: "sm:col-start-4",  row: "sm:row-start-2", ty: "sm:-translate-y-1" }, // Typography
  { col: "sm:col-start-10", row: "sm:row-start-2", ty: "sm:-translate-y-5" }, // Poster Design
  { col: "sm:col-start-2",  row: "sm:row-start-4", ty: "sm:translate-y-6"  }, // Colour Grading
  { col: "sm:col-start-7",  row: "sm:row-start-4", ty: "sm:-translate-y-3" }, // Motion Graphics
  { col: "sm:col-start-10", row: "sm:row-start-5", ty: "sm:translate-y-2"  }, // Visual Identity
  { col: "sm:col-start-4",  row: "sm:row-start-6", ty: "sm:translate-y-1"  }, // Content Creation
];

export default function InsomniacWork() {
  const { play } = useSound();
  const reduced = usePrefersReducedMotion();
  const [hovered, setHovered] = useState<string | null>(null);
  // Mobile: tap-selects a category, second tap of the same one resets.
  const [tapped, setTapped] = useState<string | null>(null);
  const activeLabel = hovered ?? tapped;
  const activePreview = activeLabel ? PREVIEWS[activeLabel] : null;

  const onTagActivate = (label: string) => {
    if (hovered === label) return;
    setHovered(label);
    play("whoosh");
  };

  const onTagTap = (label: string) => {
    // Mobile: second tap of the same tag resets.
    if (tapped === label) {
      setTapped(null);
      play("tick");
      return;
    }
    setTapped(label);
    play("whoosh");
  };

  return (
    <SectionShell id="insomniac" index="05" label="VISUALS // LATE NIGHT">
      {/* Header — big display, literal "## " prefix in muted ink */}
      <motion.h2
        className="font-display text-5xl font-bold leading-[0.92] tracking-tight text-[#F4F1EA] sm:text-7xl lg:text-8xl"
        initial={reduced ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        <span className="text-[#6B6B6B]">{"## "}</span>
        <span>insomniac Work</span>
      </motion.h2>

      <Reveal delay={0.15}>
        <p className="mt-3 font-mono text-xs uppercase tracking-[0.25em] text-[#6B6B6B] sm:text-sm">
          {"hover around to see the magic"}
        </p>
      </Reveal>

      {/* ====================================================
          WORD CLOUD — "My CV, IN ABOUT 40 WORDS"
          Deterministic collage of 34 words scattered across a
          relative container with varied sizes, rotations, and
          colour accents (cream / blue / yellow / muted).
          ==================================================== */}
      <div className="mt-14 sm:mt-20">
        <Reveal>
          <div className="mb-6 flex items-baseline gap-3 border-b border-white/10 pb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-[#6B6B6B]">
            <span className="text-[#FFD400]">{"// "}</span>
            <span className="text-[#F4F1EA]/80">{WORD_CLOUD_TITLE}</span>
            <span className="ml-auto hidden h-px flex-1 bg-white/10 sm:block" />
            <span className="hidden sm:inline">{`// ${WORD_CLOUD.length} words`}</span>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            className="relative h-[640px] w-full overflow-hidden border border-white/5 bg-[#0E0E0E]/40 sm:h-[720px]"
            onMouseLeave={() => setHovered(null)}
            data-cursor-label="word cloud"
          >
            {/* corner registration marks */}
            <span aria-hidden className="pointer-events-none absolute left-2 top-2 h-3 w-3 border-l border-t border-white/15" />
            <span aria-hidden className="pointer-events-none absolute right-2 top-2 h-3 w-3 border-r border-t border-white/15" />
            <span aria-hidden className="pointer-events-none absolute bottom-2 left-2 h-3 w-3 border-b border-l border-white/15" />
            <span aria-hidden className="pointer-events-none absolute bottom-2 right-2 h-3 w-3 border-b border-r border-white/15" />

            {/* 03:14 AM corner stamp — rotated, reinforces the insomniac theme */}
            <span
              aria-hidden
              className="pointer-events-none absolute right-3 top-3 rotate-[6deg] select-none border border-white/10 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-[#6B6B6B]"
            >
              {"03:14 AM"}
            </span>

            {/* The 34 words — absolute positioning, deterministic per index */}
            {WORD_CLOUD.map((word, i) => {
              const spec = WORD_SPECS[i] ?? WORD_SPECS[0];
              return (
                <motion.span
                  key={`${word}-${i}`}
                  className={`pointer-events-none absolute select-none font-display ${spec.size} ${COLOR_CLASSES[spec.color]} ${spec.weight === "bold" ? "font-bold" : "font-normal"}`}
                  style={{
                    top: spec.top,
                    left: spec.left,
                    rotate: spec.rotate,
                    textShadow:
                      spec.color === "yellow" || spec.color === "blue"
                        ? "0 0 24px rgba(255,212,0,0.18)"
                        : undefined,
                  }}
                  initial={reduced ? false : { opacity: 0, scale: 0.6 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-10% 0px" }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.025,
                    ease: EASE,
                  }}
                >
                  {word}
                </motion.span>
              );
            })}

            {/* // late night — bottom-left mono label */}
            <span
              aria-hidden
              className="pointer-events-none absolute bottom-3 left-3 select-none font-mono text-[10px] uppercase tracking-[0.25em] text-[#6B6B6B]"
            >
              {"// late night · powered by caffeine"}
            </span>
          </div>
        </Reveal>
      </div>

      {/* ====================================================
          SKILL TAGS — scattered, slightly-rotated. Hover (or
          tap on mobile) activates a tag, playing a whoosh SFX
          and fading a related visual preview behind.
          ==================================================== */}
      <div className="mt-14 sm:mt-20">
        <Reveal>
          <div className="mb-6 flex items-baseline gap-3 border-b border-white/10 pb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-[#6B6B6B]">
            <span className="text-[#FFD400]">{"// "}</span>
            <span className="text-[#F4F1EA]/80">SKILL TAGS · hover to preview</span>
            <span className="ml-auto hidden h-px flex-1 bg-white/10 sm:block" />
            <span className="hidden sm:inline">{`// ${INSOMNIAC_SKILLS.length} tags`}</span>
          </div>
        </Reveal>

        <div
          className="relative mt-8 min-h-[60vh] sm:min-h-[80vh]"
          onMouseLeave={() => setHovered(null)}
        >
          {/* PREVIEW LAYER — faded abstract shape behind the tags.
              pointer-events-none so it never blocks hover. AnimatePresence
              keyed on the active label so different previews cross-fade. */}
          <div
            className="pointer-events-none absolute inset-0 overflow-hidden"
            aria-hidden
          >
            <AnimatePresence>
              {activePreview && (
                <motion.div
                  key={activeLabel}
                  className={`absolute ${activePreview.pos} ${activePreview.size}`}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 0.28, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.45, ease: EASE }}
                >
                  {activePreview.shape === "blob" && (
                    <div
                      className={`h-full w-full rounded-full blur-3xl ${
                        activePreview.color === "blue"
                          ? "bg-[#1738D5]"
                          : "bg-[#FFD400]"
                      }`}
                    />
                  )}
                  {activePreview.shape === "ring" && (
                    <div
                      className={`h-full w-full rounded-full border-2 ${
                        activePreview.color === "blue"
                          ? "border-[#1738D5]"
                          : "border-[#FFD400]"
                      }`}
                    />
                  )}
                  {activePreview.shape === "bar" && (
                    <div
                      className={`h-full w-full ${
                        activePreview.color === "blue"
                          ? "bg-[#1738D5]"
                          : "bg-[#FFD400]"
                      }`}
                    />
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* TAGS GRID — scattered on sm+ (12-col × 6-row), flowing on mobile.
              Each tag uses its data-driven `rotate` value as a static transform
              (set via style so it combines cleanly with the whileHover scale).
              Hover: scale 1.1 (skipped on reduced-motion), accent glow border,
              whoosh SFX, and the per-skill preview fades in behind.
              Mobile: tap selects, second tap of the same resets. */}
          <div className="relative grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-12 sm:grid-rows-6 sm:gap-x-6 sm:gap-y-10">
            {INSOMNIAC_SKILLS.map((skill, i) => {
              const pos = POSITIONS[i];
              const isActive = activeLabel === skill.label;
              return (
                <motion.div
                  key={skill.label}
                  className={`col-span-1 sm:col-span-3 ${pos.col} ${pos.row} ${pos.ty}`}
                  style={{ rotate: skill.rotate }}
                  whileHover={reduced ? undefined : { scale: 1.1 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  onHoverStart={() => onTagActivate(skill.label)}
                  onClick={() => onTagTap(skill.label)}
                  data-cursor-label={skill.label}
                >
                  <span
                    className={`block cursor-pointer select-none border px-4 py-3 font-mono text-xs uppercase tracking-[0.2em] transition-colors duration-200 sm:text-sm ${
                      isActive
                        ? "border-[#FFD400] bg-[#FFD400]/10 text-[#FFD400]"
                        : "border-white/15 bg-[#0E0E0E] text-[#F4F1EA]/80 hover:border-[#1738D5]/60 hover:text-[#F4F1EA]"
                    }`}
                    style={
                      isActive
                        ? { boxShadow: "0 0 30px rgba(255,212,0,0.25)" }
                        : undefined
                    }
                  >
                    {skill.label}
                  </span>
                </motion.div>
              );
            })}
          </div>

          {/* Mobile hint */}
          <p className="mt-8 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-[#6B6B6B] sm:hidden">
            tap a tag to preview · tap again to reset
          </p>
        </div>
      </div>
    </SectionShell>
  );
}
