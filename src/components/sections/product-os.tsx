"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { CountUp, Reveal } from "@/components/sections/_shared";
import { PRODUCT_OS } from "@/lib/data";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

// Decorative blue connecting path — distinct from origin.tsx's path.
// Grows across the philosophy column as the section scrolls (scaleX 0→1).
// Used inside the central-metric card as the underlying "progression" line.
const CONNECT_PATH_D =
  "M 2 4 C 40 1, 70 8, 110 4 S 200 1, 240 5 S 320 8, 360 4";

/**
 * Product OS — Section "02 — BUILDING IS THE EASY PART".
 *
 * Warm paper environment. Dark ink body, electric-blue (#1738D5) accents.
 * This is the rebuilt replacement for the old `purpose.tsx` — it consumes
 * the new `PRODUCT_OS` data object (philosophy + central metric + places +
 * 6 stat cards + terminal footer).
 *
 * Layout (top → bottom):
 *   1. Header: "02 — BUILDING IS THE EASY PART" + "// product operating system".
 *   2. Asymmetric editorial grid:
 *        left  → headline "PRODUCTS WITH A REASON." (handwritten, "REASON."
 *                in blue) + paragraph + secondary line + a decorative blue
 *                connecting path that grows on scroll.
 *        right → handwritten annotation + central metric card (CountUp
 *                1200+, "GLOBAL CUSTOMERS", "PRODUCT PLATFORM OWNERSHIP"),
 *                entered with rotation correction (2deg → 0deg) and a blue
 *                offset shadow.
 *   3. "// PLACES I'VE BUILT AT" — 4 companies (SenseHQ / CEGIS /
 *        Cambridge JBS / Bosch) as a mono list with a handwritten note.
 *   4. 6 stat cards (30% MoM, 40% fewer tickets, 70% faster onboarding,
 *        30M+ GST records, 25% accuracy improvement, 10+ Bosch facilities)
 *        in a responsive grid; each card enters with rotation correction.
 *   5. Terminal footer — bottomNote + ps in a styled terminal box with a
 *      blinking blue cursor.
 *
 * Reduced-motion: all reveals static, count-ups render final value, no
 * rotation correction animation, blue path fully drawn.
 */
export default function ProductOS() {
  const reduced = usePrefersReducedMotion();
  const rootRef = useRef<HTMLElement>(null);

  // Split headline so "REASON." can render in blue.
  // "PRODUCTS WITH A REASON." → before="PRODUCTS WITH A ", after="."
  const [before = "", after = ""] = PRODUCT_OS.headline.split("REASON.");

  // Decorative blue connecting path — scaleX 0 → 1 on scroll.
  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ["start end", "end start"],
  });
  const pathScale = useTransform(scrollYProgress, [0.1, 0.85], [0, 1]);

  return (
    <section
      id="product-os"
      ref={rootRef}
      className="env-paper paper-texture relative w-full overflow-hidden"
      aria-labelledby="product-os-title"
      data-cursor-label="Product OS"
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
          <span className="text-[#1738D5]">{PRODUCT_OS.index}</span>
          <span className="text-[#2a2a2a]/70">{PRODUCT_OS.title}</span>
          <span className="ml-auto hidden h-px flex-1 bg-[#1a1a1a]/15 sm:block" />
          <span className="hidden sm:inline">{"// product operating system"}</span>
        </motion.div>

        {/* ---- Asymmetric editorial grid: philosophy left, metric right offset ---- */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          {/* PHILOSOPHY — left column */}
          <div className="col-span-1 lg:col-span-7">
            <motion.h2
              id="product-os-title"
              className="hand-display text-4xl leading-[0.95] text-[#2a2a2a] sm:text-6xl lg:text-7xl"
              initial={reduced ? false : { opacity: 0, y: 24, rotate: -1 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.9, ease: EASE }}
              data-cursor-label="products with a reason"
            >
              <span>{before}</span>
              <span className="text-[#1738D5]">REASON.</span>
              <span>{after}</span>
            </motion.h2>

            <Reveal className="mt-8 max-w-xl" delay={0.3}>
              <p className="font-sans text-base leading-relaxed text-[#2a2a2a]/80 sm:text-lg">
                {PRODUCT_OS.paragraph}
              </p>
            </Reveal>

            <Reveal className="mt-6 max-w-xl" delay={0.45}>
              <p className="font-sans text-sm leading-relaxed text-[#2a2a2a]/70 sm:text-base">
                {PRODUCT_OS.secondary}
              </p>
            </Reveal>

            {/* Decorative blue connecting path — grows on scroll */}
            <div
              aria-hidden
              className="mt-10 hidden h-[8px] w-full max-w-md overflow-visible lg:block"
            >
              <svg
                viewBox="0 0 360 8"
                preserveAspectRatio="none"
                className="h-full w-full"
                fill="none"
              >
                <motion.path
                  d={CONNECT_PATH_D}
                  stroke="#1738D5"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  style={{ pathLength: reduced ? 1 : pathScale }}
                />
                {/* dots at the path ends */}
                <circle cx="2" cy="4" r="2" fill="#1738D5" />
                <circle cx="360" cy="4" r="2" fill="#1738D5" />
              </svg>
            </div>
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
              ↳ {PRODUCT_OS.annotation}
            </motion.p>

            {/* Paper metric card — enters with rotation correction (2deg → 0deg) */}
            <motion.div
              className="relative border border-[#1a1a1a]/15 bg-[#F4F1EA]/40 p-6 shadow-[6px_6px_0_0_rgba(23,56,213,0.25)]"
              initial={reduced ? false : { opacity: 0, y: 28, rotate: 2 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.8, ease: EASE }}
              data-cursor-label={`${PRODUCT_OS.centralMetric.value}${PRODUCT_OS.centralMetric.suffix} ${PRODUCT_OS.centralMetric.label}`}
            >
              {/* tape piece */}
              <span
                aria-hidden
                className="absolute -top-2 left-1/2 h-5 w-16 -translate-x-1/2 -rotate-3 bg-[#1738D5]/40"
              />

              {/* giant count-up number — dark ink, "+" in blue */}
              <div
                className="font-display text-[18vw] font-bold leading-[0.85] tracking-tighter text-[#2a2a2a] sm:text-[12vw] lg:text-[10rem]"
                aria-label={`${PRODUCT_OS.centralMetric.value}${PRODUCT_OS.centralMetric.suffix} ${PRODUCT_OS.centralMetric.label}`}
              >
                <CountUp target={PRODUCT_OS.centralMetric.value} />
                <span className="text-[#1738D5]">
                  {PRODUCT_OS.centralMetric.suffix}
                </span>
              </div>

              <p className="mt-4 font-display text-2xl font-bold uppercase tracking-tight text-[#2a2a2a] sm:text-3xl">
                {PRODUCT_OS.centralMetric.label}
              </p>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.25em] text-[#6B6B6B]">
                {PRODUCT_OS.centralMetric.sub}
              </p>
            </motion.div>
          </div>
        </div>

        {/* ---- Places I've Built At ---- */}
        <Reveal className="mt-20 sm:mt-24" delay={0.1}>
          <div className="border-t border-[#1a1a1a]/15 pt-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#1738D5]">
              {PRODUCT_OS.places.index}
            </p>
            <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {PRODUCT_OS.places.companies.map((c, i) => (
                <motion.li
                  key={c}
                  className="flex items-baseline gap-3 border-l-2 border-[#1738D5]/40 pl-3"
                  initial={reduced ? false : { opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-10% 0px" }}
                  transition={{ duration: 0.5, delay: i * 0.06, ease: EASE }}
                >
                  <span className="font-mono text-[10px] tracking-[0.2em] text-[#6B6B6B]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-base font-semibold text-[#1a1a1a] sm:text-lg">
                    {c}
                  </span>
                </motion.li>
              ))}
            </ul>
            <motion.p
              className="hand-display mt-6 max-w-md -rotate-[1deg] text-lg text-[#1738D5]/85 sm:text-xl"
              initial={reduced ? false : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
            >
              ↳ {PRODUCT_OS.places.note}
            </motion.p>
          </div>
        </Reveal>

        {/* ---- 6 stat cards (rotation correction 2deg → 0deg) ---- */}
        <div className="mt-20 sm:mt-24">
          <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.3em] text-[#6B6B6B]">
            {"// measured outcomes — 6 cards"}
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCT_OS.stats.map((s, i) => (
              <motion.article
                key={`${s.label}-${i}`}
                className="group relative border border-[#1a1a1a]/15 bg-[#F4F1EA]/60 p-5 transition-colors duration-300 hover:border-[#1738D5]/50"
                initial={reduced ? false : { opacity: 0, y: 24, rotate: 2 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{
                  duration: 0.6,
                  delay: (i % 3) * 0.08,
                  ease: EASE,
                }}
                data-cursor-label={`${s.value}${s.suffix} — ${s.label}`}
              >
                {/* card index */}
                <span className="absolute right-3 top-3 font-mono text-[9px] tracking-[0.25em] text-[#6B6B6B]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {/* blue accent dot */}
                <span className="mb-3 inline-block h-2 w-2 bg-[#1738D5]" aria-hidden />

                {/* value — CountUp + suffix */}
                <p className="font-display text-4xl font-bold leading-none tracking-tight text-[#1a1a1a] sm:text-5xl">
                  <CountUp target={s.value} />
                  <span className="text-[#1738D5]">{s.suffix}</span>
                </p>
                <p className="mt-3 font-display text-sm font-bold uppercase tracking-tight text-[#2a2a2a]">
                  {s.label}
                </p>
                <p className="mt-1 font-mono text-[10px] leading-snug tracking-[0.04em] text-[#6B6B6B]">
                  {s.sub}
                </p>
              </motion.article>
            ))}
          </div>
        </div>

        {/* ---- Terminal footer — bottomNote + ps ---- */}
        <Reveal className="mt-20 sm:mt-24" delay={0.1}>
          <div className="relative border border-[#1a1a1a]/25 bg-[#0A0A0A] p-5 font-mono text-xs text-[#F7F4ED]/85 shadow-[6px_6px_0_0_rgba(23,56,213,0.25)] sm:p-6 sm:text-sm">
            {/* terminal title bar */}
            <div className="mb-3 flex items-center gap-2 border-b border-white/10 pb-2 text-[10px] uppercase tracking-[0.2em] text-[#F7F4ED]/55">
              <span className="h-2 w-2 rounded-full bg-[#FF3B30]" aria-hidden />
              <span className="h-2 w-2 rounded-full bg-[#FFD400]" aria-hidden />
              <span className="h-2 w-2 rounded-full bg-[#1738D5]" aria-hidden />
              <span className="ml-2">~/mr_onalunchbreak/product_os.log</span>
            </div>
            <p className="leading-relaxed">
              <span className="text-[#1738D5]">$</span>
              <span className="mx-1 text-[#FFD400]">note</span>
              {PRODUCT_OS.bottomNote}
            </p>
            <p className="mt-3 leading-relaxed text-[#F7F4ED]/70">
              <span className="text-[#1738D5]">$</span>
              <span className="mx-1 text-[#FFD400]">ps</span>
              {PRODUCT_OS.ps}
              <span
                className="ml-1 inline-block h-3 w-2 translate-y-[1px] bg-[#1738D5] blink"
                aria-hidden
              />
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
