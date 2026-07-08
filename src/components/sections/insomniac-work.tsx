"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal, SectionShell } from "@/components/sections/_shared";
import { INSOMNIAC_SKILLS } from "@/lib/data";
import { useSound } from "@/hooks/use-sound";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ------------------------------------------------------------------
   Per-skill preview specs.
   Each hovered skill maps to a faded abstract shape rendered BEHIND the
   tag scatter. Shapes/positions vary for visual rhythm while staying
   inside the Baaz palette (accent yellow + alert red).
   ------------------------------------------------------------------ */
type PreviewSpec = {
  shape: "blob" | "ring" | "bar";
  color: "accent" | "alert";
  pos: string;
  size: string;
};

const PREVIEWS: Record<string, PreviewSpec> = {
  "Brand Design": {
    shape: "blob",
    color: "accent",
    pos: "left-[6%] top-[10%]",
    size: "h-64 w-64",
  },
  "Social Media": {
    shape: "ring",
    color: "alert",
    pos: "right-[8%] top-[6%]",
    size: "h-72 w-72",
  },
  Typography: {
    shape: "bar",
    color: "accent",
    pos: "left-[28%] top-[38%]",
    size: "h-[6px] w-72",
  },
  "Poster Design": {
    shape: "blob",
    color: "alert",
    pos: "right-[12%] top-[40%]",
    size: "h-56 w-56",
  },
  "Colour Grading": {
    shape: "blob",
    color: "accent",
    pos: "left-[12%] bottom-[8%]",
    size: "h-72 w-72",
  },
  "Motion Graphics": {
    shape: "ring",
    color: "alert",
    pos: "left-[42%] bottom-[12%]",
    size: "h-60 w-60",
  },
  "Visual Identity": {
    shape: "bar",
    color: "alert",
    pos: "right-[18%] bottom-[28%]",
    size: "h-[6px] w-64",
  },
  "Content Creation": {
    shape: "blob",
    color: "accent",
    pos: "right-[4%] bottom-[4%]",
    size: "h-64 w-64",
  },
};

/* ------------------------------------------------------------------
   Scattered grid positions for sm+. On mobile, tags flow naturally in
   a 2-col grid with their rotation still applied. Each entry pairs
   col-start/row-start (12-col, 6-row grid) with a translate-y offset
   for the "thrown on a table" misalignment.
   ------------------------------------------------------------------ */
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
  const activePreview = hovered ? PREVIEWS[hovered] : null;

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

      {/* Scatter container — relative for absolutely-stamped labels + preview layer */}
      <div
        className="relative mt-12 min-h-[60vh] sm:mt-16"
        onMouseLeave={() => setHovered(null)}
      >
        {/* 03:14 AM corner stamp — rotated, reinforces the insomniac theme */}
        <span
          aria-hidden
          className="pointer-events-none absolute right-0 top-0 rotate-[6deg] select-none border border-white/10 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-[#6B6B6B]"
        >
          {"03:14 AM"}
        </span>
        {/* // late night — bottom-left mono label */}
        <span
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-0 select-none font-mono text-[10px] uppercase tracking-[0.25em] text-[#6B6B6B]"
        >
          {"// late night"}
        </span>

        {/* PREVIEW LAYER — faded abstract shape behind the tags.
            pointer-events-none so it never blocks hover. AnimatePresence
            keyed on hovered so different previews cross-fade. */}
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          aria-hidden
        >
          <AnimatePresence>
            {activePreview && (
              <motion.div
                key={hovered}
                className={`absolute ${activePreview.pos} ${activePreview.size}`}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 0.22, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                {activePreview.shape === "blob" && (
                  <div
                    className={`h-full w-full rounded-full blur-3xl ${
                      activePreview.color === "accent"
                        ? "bg-[#FFD400]"
                        : "bg-[#FF3B30]"
                    }`}
                  />
                )}
                {activePreview.shape === "ring" && (
                  <div
                    className={`h-full w-full rounded-full border-2 ${
                      activePreview.color === "accent"
                        ? "border-[#FFD400]"
                        : "border-[#FF3B30]"
                    }`}
                  />
                )}
                {activePreview.shape === "bar" && (
                  <div
                    className={`h-full w-full ${
                      activePreview.color === "accent"
                        ? "bg-[#FFD400]"
                        : "bg-[#FF3B30]"
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
            whoosh SFX, and the per-skill preview fades in behind. */}
        <div className="relative grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-12 sm:grid-rows-6 sm:gap-x-6 sm:gap-y-10">
          {INSOMNIAC_SKILLS.map((skill, i) => {
            const pos = POSITIONS[i];
            const isHovered = hovered === skill.label;
            return (
              <motion.div
                key={skill.label}
                className={`col-span-1 sm:col-span-3 ${pos.col} ${pos.row} ${pos.ty}`}
                style={{ rotate: skill.rotate }}
                whileHover={reduced ? undefined : { scale: 1.1 }}
                transition={{ duration: 0.3, ease: EASE }}
                onHoverStart={() => {
                  setHovered(skill.label);
                  play("whoosh");
                }}
                data-cursor-label={skill.label}
              >
                <span
                  className={`block cursor-pointer select-none border px-4 py-3 font-mono text-xs uppercase tracking-[0.2em] transition-colors duration-200 sm:text-sm ${
                    isHovered
                      ? "border-[#FFD400] bg-[#FFD400]/10 text-[#FFD400]"
                      : "border-white/15 bg-[#0E0E0E] text-[#F4F1EA]/80 hover:border-[#FFD400]/60 hover:text-[#F4F1EA]"
                  }`}
                  style={
                    isHovered
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
      </div>
    </SectionShell>
  );
}
