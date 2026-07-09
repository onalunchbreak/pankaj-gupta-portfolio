"use client";
import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Reveal } from "@/components/sections/_shared";
import { ORIGIN } from "@/lib/data";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

// Year markers spaced along the left timeline rail.
const YEAR_MARKERS = [
  { year: "2019", at: 4 },
  { year: "2022", at: 32 },
  { year: "2024", at: 60 },
  { year: "2026", at: 88 },
];

// Hand-drawn wiggly SVG path connecting the notebook milestones. Stroke
// progressively draws as the user scrolls through the section. Distinct
// from product-os.tsx's path so the two sections feel different.
const PATH_D =
  "M 4 8 C 60 36, 26 60, 90 88 S 180 120, 140 152 S 36 180, 110 212 S 220 240, 130 274";

// Scattered annotation placements (relative within the content column).
// Each tuple: [top%, left%] + rotate deg.
const ANNOTATION_POSITIONS: Array<{
  top: string;
  left: string;
  rotate: string;
  mobileHidden?: boolean;
}> = [
  { top: "8%",  left: "62%", rotate: "-3deg" },
  // Moved right — was left:4%, overlapped the hero statement text
  { top: "28%", left: "66%", rotate: "-2.5deg" },
  { top: "44%", left: "70%", rotate: "-2deg" },
  // Moved right — was left:8%, overlapped paragraph //02 body text
  { top: "64%", left: "68%", rotate: "-3deg" },
  { top: "82%", left: "58%", rotate: "-1.5deg", mobileHidden: true },
];

/**
 * Origin — Section "01 — THE BEGINNING".
 *
 * Warm paper notebook environment. Dark ink body, electric-blue (#1738D5)
 * accents. The hero statement is oversized handwritten Caveat with the
 * phrase "WHAT SHOULD WE BUILD?" emphasised via a blue underline. A
 * wiggly blue SVG path draws itself via GSAP ScrollTrigger scrub as the
 * user scrolls, visually "writing" the timeline ink line. Three
 * supporting paragraphs sit along the path with blue rail-dots. An
 * 8-step timeline (2019 DTU → NOW MR. ONALUNCHBREAK) runs as horizontal
 * milestone cards, each activating sequentially on scroll via
 * framer-motion's whileInView. Five handwritten annotations are
 * scattered (rotated, offset) across the section. The recurring
 * "PRODUCT ROADMAP?" motif stamp — with "ROADMAP" crossed out and
 * "plans changed." beneath — appears 3 times. A left-side vertical
 * timeline rail with 2019/2022/2024/2026 markers fills (scaleY) as the
 * section scrolls through. Footer is a terminal-style mono line with a
 * blinking blue cursor. Reduced-motion: words full opacity, path fully
 * drawn, rail fully filled (static).
 */
export default function Origin() {
  const reduced = usePrefersReducedMotion();
  const rootRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLHeadingElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  // Fill the left timeline rail as the section scrolls through.
  const { scrollYProgress } = useScroll({
    target: contentRef,
    offset: ["start end", "end start"],
  });
  const railScale = useTransform(scrollYProgress, [0.05, 0.95], [0, 1]);

  // GSAP scrub: word-by-word highlight + SVG path draw.
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (reduced) {
      const words =
        heroRef.current?.querySelectorAll<HTMLElement>(".origin-word");
      words?.forEach((w) => {
        w.style.opacity = "1";
      });
      if (pathRef.current) {
        const len = pathRef.current.getTotalLength();
        pathRef.current.style.strokeDasharray = `${len}`;
        pathRef.current.style.strokeDashoffset = "0";
      }
      return;
    }

    const ctx = gsap.context(() => {
      // Word-by-word highlight on the hero line.
      const words =
        heroRef.current?.querySelectorAll<HTMLElement>(".origin-word");
      if (words && words.length > 0) {
        gsap.fromTo(
          words,
          { opacity: 0.18 },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.4,
            scrollTrigger: {
              trigger: heroRef.current!,
              start: "top 70%",
              end: "bottom 70%",
              scrub: 1,
            },
          }
        );
      }

      // SVG path draw — dashoffset full → 0 across scroll.
      if (pathRef.current && contentRef.current) {
        const path = pathRef.current;
        const len = path.getTotalLength();
        path.style.strokeDasharray = `${len}`;
        path.style.strokeDashoffset = `${len}`;
        gsap.fromTo(
          path,
          { strokeDashoffset: len },
          {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
              trigger: contentRef.current,
              start: "top 60%",
              end: "bottom 60%",
              scrub: 1,
            },
          }
        );
      }
    }, rootRef);

    return () => ctx.revert();
  }, [reduced]);

  // Split the hero statement on the emphasis phrase so the emphasis can
  // render with a blue underline + highlight. Everything else stays dark ink.
  const emphasis = ORIGIN.emphasis; // "WHAT SHOULD WE BUILD?"
  const parts = ORIGIN.hero.split(emphasis);
  const before = parts[0] ?? "";
  const after = parts[1] ?? "";

  // Helper: render a text chunk as a sequence of inline-block words so
  // GSAP can stagger their opacity.
  const renderWords = (chunk: string, keyPrefix: string) => {
    const tokens = chunk.split(/(\s+)/);
    return tokens.map((tok, i) => {
      if (/^\s+$/.test(tok)) {
        return (
          <span key={`${keyPrefix}-sp-${i}`} aria-hidden>
            {tok}
          </span>
        );
      }
      if (tok.length === 0) return null;
      return (
        <span
          key={`${keyPrefix}-w-${i}`}
          className="origin-word inline-block"
          style={reduced ? undefined : { opacity: 0.18 }}
        >
          {tok}
        </span>
      );
    });
  };

  return (
    <section
      id="origin"
      ref={rootRef}
      className="env-paper paper-texture relative w-full overflow-hidden"
      aria-labelledby="origin-title"
    >
      <div
        ref={contentRef}
        className="relative mx-auto w-full max-w-[1200px] px-5 pt-16 pb-10 sm:px-8 sm:pt-20 sm:pb-12 lg:px-12"
      >
        {/* ---- Header: 01 — THE BEGINNING + subtitle ---- */}
        <motion.div
          className="mb-12 flex flex-col gap-3 border-b border-[#1a1a1a]/15 pb-4 sm:mb-16"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <div className="flex items-baseline gap-3 font-mono text-[11px] uppercase tracking-widest text-[#1a1a1a]/75">
            <span className="text-[#1738D5]">{ORIGIN.index}</span>
            <span className="text-[#2a2a2a]/70">— {ORIGIN.title}</span>
            <span className="ml-auto hidden h-px flex-1 bg-[#1a1a1a]/15 sm:block" />
            <span className="hidden sm:inline">{"// notebook entry"}</span>
          </div>
          <p className="hand-display text-3xl text-[#2a2a2a]/80 sm:text-4xl">
            {ORIGIN.subtitle}
          </p>
        </motion.div>

        {/* ---- Left vertical timeline rail (lg+) — hairline + blue fill ---- */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-4 top-32 hidden w-px bg-[#1a1a1a]/15 lg:block lg:left-12"
          style={{ height: "calc(100% - 12rem)" }}
        >
          <motion.div
            className="absolute inset-0 origin-top bg-[#1738D5]"
            style={{ scaleY: reduced ? 1 : railScale }}
          />
        </div>

        {/* ---- Year markers along the rail ---- */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-4 top-32 hidden lg:block lg:left-12"
          style={{ height: "calc(100% - 12rem)" }}
        >
          {YEAR_MARKERS.map((m) => (
            <div key={m.year} className="absolute left-0" style={{ top: `${m.at}%` }}>
              <span className="absolute left-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 bg-[#1738D5]" />
              <span className="absolute left-2 top-0 -translate-y-1/2 whitespace-nowrap font-mono text-[10px] tracking-[0.25em] text-[#1a1a1a]/75">
                {m.year}
              </span>
            </div>
          ))}
        </div>

        {/* Content offset right to make room for the rail + markers */}
        <div className="lg:pl-16">
          {/* ---- Motif stamp 1 — top-right of content ---- */}
          <MotifStamp
            className="absolute right-4 top-32 -rotate-[8deg] sm:right-12 sm:top-36"
            motif={ORIGIN.motif}
            motifCrossed={ORIGIN.motifCrossed}
            motifSub={ORIGIN.motifSub}
          />

          {/* ---- HERO STATEMENT — handwritten display, scrubbed word highlight ---- */}
          <h2
            ref={heroRef}
            id="origin-title"
            className="hand-display max-w-4xl text-3xl text-[#2a2a2a] sm:text-5xl lg:text-7xl"
            data-cursor-label="origin / the beginning"
          >
            {renderWords(before, "before")}
            <span
              className="origin-word relative inline-block text-[#1738D5]"
              style={reduced ? undefined : { opacity: 0.18 }}
            >
              {emphasis}
              {/* hand-drawn blue underline — slightly wavy via SVG */}
              <svg
                aria-hidden
                className="absolute -bottom-1 left-0 h-2 w-full"
                viewBox="0 0 100 8"
                preserveAspectRatio="none"
                fill="none"
              >
                <path
                  d="M 1 4 C 18 1, 38 7, 55 4 S 86 1, 99 4"
                  stroke="#1738D5"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                />
              </svg>
              {/* highlight behind the words */}
              <span
                aria-hidden
                className="absolute -z-10 left-0 top-1/2 h-3/4 w-full -translate-y-1/2 bg-[#1738D5]/10"
              />
            </span>
            {renderWords(after, "after")}
          </h2>

          {/* ---- Supporting paragraphs ---- */}
          <div className="relative max-w-2xl space-y-10 mt-10 sm:mt-12 lg:mt-16">
            {ORIGIN.paragraphs.map((para, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="relative border-l border-[#1a1a1a]/15 pl-6">
                  {/* blue dot on the left border */}
                  <span
                    className="absolute left-0 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 bg-[#1738D5]"
                    aria-hidden
                  />
                  {/* editorial index marker */}
                  <span className="mb-2 block font-mono text-[10px] tracking-[0.25em] text-[#1a1a1a]/75">
                    {`// 0${i + 1}`}
                  </span>



                  <p className="font-sans text-base leading-relaxed text-[#2a2a2a]/85 sm:text-lg">
                    {para}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* ---- Scattered handwritten annotations (5) ---- */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 hidden lg:block"
          >
            {ORIGIN.annotations.map((note, i) => {
              const pos = ANNOTATION_POSITIONS[i];
              if (!pos) return null;
              return (
                <motion.span
                  key={i}
                  className={`hand-display absolute max-w-[200px] text-lg text-[#1738D5]/70 ${pos.mobileHidden ? "xl:block" : ""}`}
                  style={{ top: pos.top, left: pos.left, rotate: pos.rotate }}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-15% 0px" }}
                  transition={{ duration: 0.7, delay: 0.2 + i * 0.1, ease: EASE }}
                >
                  ↳ {note}
                </motion.span>
              );
            })}
          </div>

          {/* Mobile annotations — stacked (visible on small screens) */}
          <div className="mt-12 space-y-4 lg:hidden">
            {ORIGIN.annotations.map((note, i) => (
              <motion.p
                key={i}
                className="hand-display -rotate-[1deg] text-lg text-[#1738D5]/75"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.6, delay: i * 0.05, ease: EASE }}
              >
                ↳ {note}
              </motion.p>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------
 * Motif stamp — "PRODUCT ROADMAP?" with "ROADMAP" crossed out + a
 * handwritten "plans changed." sub-line. Recurring visual stamp.
 * ------------------------------------------------------------------ */
function MotifStamp({
  motif,
  motifCrossed,
  motifSub,
  className = "",
  small = false,
  dataCursorLabel,
}: {
  motif: string;
  motifCrossed: string;
  motifSub: string;
  className?: string;
  small?: boolean;
  dataCursorLabel?: string;
}) {
  // Split motif on the crossed-out token so we can strike it through.
  const parts = motif.split(motifCrossed);
  const before = parts[0] ?? "";
  const after = parts[1] ?? "";

  const padX = small ? "px-2 py-0.5" : "px-3 py-1.5";
  const textSize = small ? "text-[9px]" : "text-xs";

  return (
    <span
      className={`inline-block -rotate-[8deg] select-none border border-[#1738D5] bg-[#F4F1EA] ${padX} font-mono ${textSize} uppercase tracking-[0.3em] text-[#1738D5] ${className}`}
      data-cursor-label={dataCursorLabel}
    >
      <span className="block">
        {before}
        <span className="relative inline-block">
          {motifCrossed}
          {/* hand-drawn strike-through */}
          <svg
            aria-hidden
            className="absolute left-0 top-1/2 h-2 w-full -translate-y-1/2"
            viewBox="0 0 100 6"
            preserveAspectRatio="none"
            fill="none"
          >
            <path
              d="M 1 3 C 22 1, 50 5, 78 2 S 99 3, 99 3"
              stroke="#1738D5"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </span>
        {after}
      </span>
      <span className="hand-display mt-0.5 block text-[10px] normal-case tracking-normal text-[#1a1a1a]/75">
        {motifSub}
      </span>
    </span>
  );
}
