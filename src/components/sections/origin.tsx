"use client";
import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Reveal, SectionShell } from "@/components/sections/_shared";
import { ORIGIN } from "@/lib/data";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

// Year markers spaced along the timeline rail.
const YEAR_MARKERS = [
  { year: "2020", at: 6 },
  { year: "2022", at: 48 },
  { year: "2024", at: 90 },
];

export default function Origin() {
  const reduced = usePrefersReducedMotion();
  const contentRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLHeadingElement>(null);

  // Fill the left timeline rail as the section scrolls through.
  const { scrollYProgress } = useScroll({
    target: contentRef,
    offset: ["start end", "end start"],
  });
  const railScale = useTransform(scrollYProgress, [0.05, 0.95], [0, 1]);

  // GSAP scroll-scrubbed word highlight on the hero line.
  // Words start at opacity 0.18 and scrub to 1 staggered as you scroll.
  useEffect(() => {
    if (reduced) return;
    if (!heroRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const words = heroRef.current?.querySelectorAll<HTMLElement>(".origin-word");
      if (!words || words.length === 0) return;
      gsap.fromTo(
        words,
        { opacity: 0.18 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.4,
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top 70%",
            end: "bottom 70%",
            scrub: 1,
          },
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, [reduced]);

  const heroWords = ORIGIN.hero.split(" ");

  return (
    <SectionShell id="origin" index={ORIGIN.index} label={ORIGIN.title}>
      <div ref={contentRef} className="relative">
        {/* Left vertical timeline rail (lg+) — hairline + accent fill */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 hidden h-full w-px bg-white/10 lg:block"
        >
          <motion.div
            className="absolute inset-0 origin-top bg-[#FFD400]"
            style={{ scaleY: reduced ? 1 : railScale }}
          />
        </div>

        {/* Year markers along the rail */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 hidden h-full lg:block"
        >
          {YEAR_MARKERS.map((m) => (
            <div key={m.year} className="absolute left-0" style={{ top: `${m.at}%` }}>
              {/* dot on rail */}
              <span className="absolute left-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 bg-[#FFD400]" />
              {/* year label to the left of rail */}
              <span className="absolute right-2 top-0 -translate-y-1/2 whitespace-nowrap font-mono text-[10px] tracking-[0.25em] text-[#6B6B6B]">
                {m.year}
              </span>
            </div>
          ))}
        </div>

        {/* GOD'S PLAN motif — stamp 1, top-right of content */}
        <span
          aria-hidden
          className="pointer-events-none absolute -top-4 right-0 -rotate-[8deg] select-none border border-[#FFD400] bg-[#0A0A0A] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.3em] text-[#FFD400]"
        >
          {ORIGIN.motif}
        </span>

        {/* Content offset right to make room for the rail + markers */}
        <div className="lg:pl-16">
          {/* HERO LINE — scroll-scrubbed word-by-word highlight */}
          <h2
            ref={heroRef}
            className="max-w-4xl font-display text-3xl font-bold leading-[1.05] tracking-tight text-[#F4F1EA] sm:text-5xl lg:text-6xl"
            data-cursor-label="origin / the beginning"
          >
            {heroWords.map((word, i) => (
              <span
                key={i}
                className="origin-word inline-block"
                style={reduced ? undefined : { opacity: 0.18 }}
              >
                {word}
                {i < heroWords.length - 1 ? "\u00A0" : ""}
              </span>
            ))}
          </h2>

          {/* Supporting paragraphs — staggered Reveal blocks */}
          <div className="mt-16 max-w-2xl space-y-10">
            {ORIGIN.paragraphs.map((para, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="relative border-l border-white/10 pl-6">
                  {/* dot on the left border */}
                  <span
                    className="absolute left-0 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 bg-[#FFD400]"
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
                      className="absolute -top-4 right-0 -rotate-[8deg] select-none border border-[#FFD400] bg-[#0A0A0A] px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.3em] text-[#FFD400]"
                    >
                      {ORIGIN.motif}
                    </span>
                  )}

                  <p className="font-sans text-base leading-relaxed text-[#F4F1EA]/70 sm:text-lg">
                    {para}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* GOD'S PLAN motif — stamp 3, before footer */}
          <div className="mt-14">
            <span
              className="inline-block -rotate-[8deg] select-none border border-[#FFD400] bg-[#0A0A0A] px-3 py-1.5 font-mono text-xs uppercase tracking-[0.3em] text-[#FFD400]"
              data-cursor-label={ORIGIN.motif}
            >
              {ORIGIN.motif}
            </span>
          </div>

          {/* Terminal footer — meta with blinking cursor */}
          <div className="mt-12 border-t border-white/10 pt-6">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#6B6B6B]">
              {ORIGIN.meta}
              <span
                className="ml-1 inline-block h-3 w-2 translate-y-[1px] bg-[#FFD400] blink"
                aria-hidden
              />
            </p>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
