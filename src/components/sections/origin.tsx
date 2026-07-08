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
  { year: "2020", at: 6 },
  { year: "2022", at: 48 },
  { year: "2024", at: 90 },
];

// Hand-drawn wiggly SVG path that connects the notebook milestones.
// Stroke progressively draws as the user scrolls through the section.
const PATH_D =
  "M 4 12 C 80 36, 26 60, 110 84 S 200 112, 138 142 S 36 172, 122 200 S 224 228, 140 262";

/**
 * Origin — Section "01 — THE BEGINNING".
 *
 * Warm paper notebook environment. Dark ink body, blue (#1738D5) accents.
 * Hero statement is oversized handwritten Caveat (`.hand-display`) with the
 * word "SNEAKERS" emphasised via a blue underline. A wiggly blue SVG path
 * draws itself via GSAP ScrollTrigger scrub as the user scrolls, visually
 * "writing" the timeline ink line. Three supporting paragraphs sit along
 * the path with blue rail-dots. "GOD'S PLAN" motif stamps appear 3 times
 * (top-right, on paragraph 2, before the footer), rotated -8deg with a
 * blue border. A left-side vertical timeline rail with 2020/2022/2024
 * markers fills (scaleY) as the section scrolls through. Footer is a
 * terminal-style mono line with a blinking blue cursor. Reduced-motion:
 * words full opacity, path fully drawn, rail fully filled (static).
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
      // static fallback — words full opacity, path fully drawn
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

  // Split hero on the "SNEAKERS" token so we can render that word with a
  // blue underline emphasis. Everything else stays dark ink.
  const parts = ORIGIN.hero.split(/(\bSNEAKERS\b)/);

  return (
    <section
      id="origin"
      ref={rootRef}
      className="env-paper paper-texture relative w-full overflow-hidden"
      aria-labelledby="origin-title"
    >
      <div
        ref={contentRef}
        className="relative mx-auto w-full max-w-[1200px] px-5 py-24 sm:px-8 sm:py-32 lg:px-12"
      >
        {/* ---- Header: 01 — THE BEGINNING + subtitle ---- */}
        <motion.div
          className="mb-12 flex flex-col gap-3 border-b border-[#1a1a1a]/15 pb-4 sm:mb-16"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <div className="flex items-baseline gap-3 font-mono text-[11px] uppercase tracking-widest text-[#6B6B6B]">
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
            <div
              key={m.year}
              className="absolute left-0"
              style={{ top: `${m.at}%` }}
            >
              <span className="absolute left-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 bg-[#1738D5]" />
              <span className="absolute left-2 top-0 -translate-y-1/2 whitespace-nowrap font-mono text-[10px] tracking-[0.25em] text-[#6B6B6B]">
                {m.year}
              </span>
            </div>
          ))}
        </div>

        {/* Content offset right to make room for the rail + markers */}
        <div className="lg:pl-16">
          {/* ---- GOD'S PLAN stamp 1 — top-right of content ---- */}
          <span
            aria-hidden
            className="pointer-events-none absolute right-4 top-32 -rotate-[8deg] select-none border border-[#1738D5] bg-[#F4F1EA] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.3em] text-[#1738D5] sm:right-12 sm:top-36"
          >
            {ORIGIN.motif}
          </span>

          {/* ---- HERO STATEMENT — handwritten display, scrubbed word highlight ---- */}
          <h2
            ref={heroRef}
            id="origin-title"
            className="hand-display max-w-4xl text-3xl text-[#2a2a2a] sm:text-5xl lg:text-7xl"
            data-cursor-label="origin / the beginning"
          >
            {parts.map((part, i) => {
              if (part === "SNEAKERS") {
                return (
                  <span
                    key={`emp-${i}`}
                    className="origin-word relative inline-block text-[#1738D5]"
                  >
                    {part}
                    <span
                      aria-hidden
                      className="absolute -bottom-1 left-0 h-1 w-full bg-[#1738D5]/70"
                    />
                  </span>
                );
              }
              const words = part.split(/(\s+)/);
              return words.map((w, j) => {
                if (/^\s+$/.test(w)) {
                  return (
                    <span key={`sp-${i}-${j}`} aria-hidden>
                      {w}
                    </span>
                  );
                }
                if (w.length === 0) return null;
                return (
                  <span
                    key={`w-${i}-${j}`}
                    className="origin-word inline-block"
                    style={reduced ? undefined : { opacity: 0.18 }}
                  >
                    {w}
                  </span>
                );
              });
            })}
          </h2>

          {/* ---- SVG scroll-drawn timeline path (decorative, blue) ---- */}
          <div
            aria-hidden
            className="pointer-events-none my-12 h-[120px] w-full sm:my-16 sm:h-[160px]"
          >
            <svg
              viewBox="0 0 240 280"
              preserveAspectRatio="none"
              className="h-full w-full"
              fill="none"
            >
              <path
                ref={pathRef}
                d={PATH_D}
                stroke="#1738D5"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* dots at the path inflections — start, mid, end */}
              <circle cx="4" cy="12" r="3" fill="#1738D5" />
              <circle cx="122" cy="200" r="3" fill="#1738D5" />
              <circle cx="140" cy="262" r="3" fill="#1738D5" />
            </svg>
          </div>

          {/* ---- Supporting paragraphs along the path ---- */}
          <div className="relative max-w-2xl space-y-10">
            {ORIGIN.paragraphs.map((para, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="relative border-l border-[#1a1a1a]/15 pl-6">
                  {/* blue dot on the left border */}
                  <span
                    className="absolute left-0 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 bg-[#1738D5]"
                    aria-hidden
                  />
                  {/* editorial index marker */}
                  <span className="mb-2 block font-mono text-[10px] tracking-[0.25em] text-[#6B6B6B]">
                    {`// 0${i + 1}`}
                  </span>

                  {/* GOD'S PLAN motif — stamp 2, on paragraph 2 */}
                  {i === 1 && (
                    <span
                      aria-hidden
                      className="absolute -top-4 right-0 -rotate-[8deg] select-none border border-[#1738D5] bg-[#F4F1EA] px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.3em] text-[#1738D5]"
                    >
                      {ORIGIN.motif}
                    </span>
                  )}

                  <p className="font-sans text-base leading-relaxed text-[#2a2a2a]/85 sm:text-lg">
                    {para}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* ---- GOD'S PLAN motif — stamp 3, before footer ---- */}
          <div className="mt-14">
            <span
              className="inline-block -rotate-[8deg] select-none border border-[#1738D5] bg-[#F4F1EA] px-3 py-1.5 font-mono text-xs uppercase tracking-[0.3em] text-[#1738D5]"
              data-cursor-label={ORIGIN.motif}
            >
              {ORIGIN.motif}
            </span>
          </div>

          {/* ---- Addictions annotation — handwritten, rotated, offset ---- */}
          <motion.p
            className="hand-display mt-12 max-w-md -rotate-[1.2deg] text-xl text-[#1738D5]/85 sm:translate-x-8 sm:text-2xl"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            ↳ {ORIGIN.addictions}
          </motion.p>

          {/* ---- Terminal footer — meta with blinking blue cursor ---- */}
          <div className="mt-12 border-t border-[#1a1a1a]/15 pt-6">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#6B6B6B]">
              <span className="text-[#1738D5]">~/baaz</span>
              <span className="mx-1">$</span>
              {ORIGIN.meta}
              <span
                className="ml-1 inline-block h-3 w-2 translate-y-[1px] bg-[#1738D5] blink"
                aria-hidden
              />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
