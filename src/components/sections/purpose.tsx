"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { CountUp, Reveal } from "@/components/sections/_shared";
import { PURPOSE } from "@/lib/data";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Purpose — Section "02 — ONE YES LED TO ANOTHER".
 *
 * Warm paper environment. This MERGES the old views-count + core-philosophy
 * sections into a single editorial spread. Asymmetric grid: philosophy title
 * + body + tagline on the left, the giant 186M+ central metric card on the
 * right (offset down). The philosophy title "ART WITH A PURPOSE." is huge
 * handwritten Caveat with "PURPOSE." rendered in electric blue. The metric
 * card is a bordered paper card with a tape strip and a blue offset shadow;
 * it enters with rotation correction (initial rotate 2deg → final 0deg).
 * A decorative blue path progression element grows across the philosophy
 * column as the section scrolls. The annotation ("crazy what happens...")
 * sits in handwritten Caveat above the metric, rotated and muted. The
 * tagline ("beautiful design that actually works.") is italic handwritten
 * blue with a leading → arrow. Reduced-motion: static, fully revealed.
 */
export default function Purpose() {
  const reduced = usePrefersReducedMotion();
  const rootRef = useRef<HTMLElement>(null);

  // Split philosophy title so "PURPOSE." can render in blue.
  // "ART WITH A PURPOSE." → ["ART WITH A ", ""]
  const [before = "", after = ""] = PURPOSE.philosophyTitle.split("PURPOSE.");

  // Decorative blue path progression — scaleX 0 → 1 on scroll.
  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ["start end", "end start"],
  });
  const pathScale = useTransform(scrollYProgress, [0.1, 0.85], [0, 1]);

  return (
    <section
      id="purpose"
      ref={rootRef}
      className="env-paper paper-texture relative w-full overflow-hidden"
      aria-labelledby="purpose-title"
    >
      <div className="relative mx-auto w-full max-w-[1200px] px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
        {/* ---- Header ---- */}
        <motion.div
          className="mb-14 flex items-baseline gap-3 border-b border-[#1a1a1a]/15 pb-3 font-mono text-[11px] uppercase tracking-widest text-[#6B6B6B] sm:mb-20"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <span className="text-[#1738D5]">{PURPOSE.index}</span>
          <span className="text-[#2a2a2a]/70">{PURPOSE.title}</span>
          <span className="ml-auto hidden h-px flex-1 bg-[#1a1a1a]/15 sm:block" />
          <span className="hidden sm:inline">{"// results"}</span>
        </motion.div>

        {/* ---- Asymmetric editorial grid: philosophy left, metric right offset ---- */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          {/* PHILOSOPHY — left column */}
          <div className="col-span-1 lg:col-span-7">
            <motion.h2
              id="purpose-title"
              className="hand-display text-4xl leading-[0.95] text-[#2a2a2a] sm:text-6xl lg:text-7xl"
              initial={reduced ? false : { opacity: 0, y: 24, rotate: -1 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.9, ease: EASE }}
              data-cursor-label="art with a purpose"
            >
              <span>{before}</span>
              <span className="text-[#1738D5]">PURPOSE.</span>
              <span>{after}</span>
            </motion.h2>

            <Reveal className="mt-8 max-w-xl" delay={0.3}>
              <p className="font-sans text-base leading-relaxed text-[#2a2a2a]/80 sm:text-lg">
                {PURPOSE.philosophyBody}
              </p>
            </Reveal>

            {/* Decorative blue path progression element (grows on scroll) */}
            <div
              aria-hidden
              className="mt-12 hidden h-[3px] w-full max-w-md overflow-hidden bg-[#1a1a1a]/10 lg:block"
            >
              <motion.div
                className="h-full origin-left bg-[#1738D5]"
                style={{ scaleX: reduced ? 1 : pathScale }}
              />
            </div>

            {/* Tagline — handwritten italic, blue, with → marker */}
            <Reveal className="mt-10" delay={0.5}>
              <div className="flex items-baseline gap-3">
                <span className="font-display text-2xl text-[#1738D5]" aria-hidden>
                  →
                </span>
                <p className="hand-display -rotate-[1deg] text-2xl italic text-[#1738D5] sm:text-3xl">
                  {PURPOSE.tagline}
                </p>
              </div>
            </Reveal>
          </div>

          {/* METRIC — right column, offset down for misalignment */}
          <div className="col-span-1 lg:col-span-5 lg:translate-y-12">
            {/* annotation — handwritten, offset, muted-dark */}
            <motion.p
              className="hand-display mb-6 max-w-xs -rotate-[1.5deg] text-base text-[#6B6B6B] sm:text-lg"
              initial={reduced ? false : { opacity: 0, y: 14, rotate: 2 }}
              whileInView={{ opacity: 1, y: 0, rotate: -1.5 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              ↳ {PURPOSE.annotation}
            </motion.p>

            {/* Paper metric card — enters with rotation correction (2deg → 0deg) */}
            <motion.div
              className="relative border border-[#1a1a1a]/15 bg-[#F4F1EA]/40 p-6 shadow-[6px_6px_0_0_rgba(23,56,213,0.25)]"
              initial={reduced ? false : { opacity: 0, y: 28, rotate: 2 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.8, ease: EASE }}
              data-cursor-label={`${PURPOSE.centralMetric.value}${PURPOSE.centralMetric.suffix} ${PURPOSE.centralMetric.label}`}
            >
              {/* tape piece */}
              <span
                aria-hidden
                className="absolute -top-2 left-1/2 h-5 w-16 -translate-x-1/2 -rotate-3 bg-[#1738D5]/40"
              />

              {/* giant count-up number — dark ink, "M" blue, "+" yellow */}
              <div
                className="font-display text-[18vw] font-bold leading-[0.85] tracking-tighter text-[#2a2a2a] sm:text-[12vw] lg:text-[10rem]"
                aria-label={`${PURPOSE.centralMetric.value}${PURPOSE.centralMetric.suffix} ${PURPOSE.centralMetric.label}`}
              >
                <CountUp target={PURPOSE.centralMetric.value} />
                <span className="text-[#1738D5]">
                  {PURPOSE.centralMetric.suffix.replace(/\+/g, "")}
                </span>
                <span className="text-[#FFD400]">+</span>
              </div>

              <p className="mt-4 font-display text-2xl font-bold uppercase tracking-tight text-[#2a2a2a] sm:text-3xl">
                {PURPOSE.centralMetric.label}
              </p>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.25em] text-[#6B6B6B]">
                {PURPOSE.centralMetric.sub}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
