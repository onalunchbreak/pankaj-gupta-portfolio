"use client";
import { motion } from "framer-motion";
import { BadgeCheck } from "lucide-react";
import { Reveal } from "@/components/sections/_shared";
import { PLACES } from "@/lib/data";
import { useSound } from "@/hooks/use-sound";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Places Hustled — id="places".
 *
 * Warm paper environment, flows directly after the Purpose section. The
 * primary role ("Founding Marketer at RNTL.") is the featured block on the
 * left with a blue accent on "RNTL.". A rotated VERIFIED badge sits on top
 * of the title, and the note ("Learned a lot here!") is a handwritten
 * annotation in blue, rotated. The PLACES.extra paragraph appears below as
 * a Reveal. The right column lists the five internships as a hairline-
 * separated list, each with a "// archived" tag; hover plays a tick SFX.
 * Intentional misalignment throughout — rotated counter, offset primary,
 * badge rotated -8deg, note rotated -1deg, primary title enters with
 * rotation correction (2deg → 0deg). Reduced-motion: static reveals.
 */
export default function PlacesHustled() {
  const { play } = useSound();
  const reduced = usePrefersReducedMotion();
  // primary role + internships list = total places hustled
  const total = PLACES.internships.length + 1;

  return (
    <section
      id="places"
      className="env-paper paper-texture relative w-full overflow-hidden"
      aria-labelledby="places-label"
    >
      <div className="relative mx-auto w-full max-w-[1200px] px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
        {/* ---- Subtle header ---- */}
        <motion.div
          id="places-label"
          className="mb-12 flex items-baseline gap-3 border-b border-[#1a1a1a]/15 pb-3 font-mono text-[11px] uppercase tracking-widest text-[#6B6B6B] sm:mb-16"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <span className="text-[#1738D5]">{"//"}</span>
          <span className="text-[#2a2a2a]/70">
            {PLACES.index.replace(/^\/\/\s*/, "")}
          </span>
          <span className="ml-auto hidden h-px flex-1 bg-[#1a1a1a]/15 sm:block" />
          <span className="hidden sm:inline">{`// 0${total} entries`}</span>
        </motion.div>

        <div className="relative grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Intentional misalignment — rotated counter, top-right */}
          <span
            aria-hidden
            className="pointer-events-none absolute -top-6 right-2 rotate-[5deg] select-none border border-[#1738D5] bg-[#F4F1EA] px-2 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-[#1738D5] sm:right-8"
            data-cursor-label={`// 0${total} places`}
          >
            {`// 0${total} places`}
          </span>

          {/* PRIMARY — large featured block, offset left */}
          <div className="col-span-1 lg:col-span-7 lg:translate-y-4">
            <Reveal>
              <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.25em] text-[#6B6B6B]">
                {"// primary / current"}
              </p>
            </Reveal>

            <div className="relative">
              {/* Title — enters with rotation correction (2deg → 0deg) */}
              <motion.h3
                className="hand-display text-5xl leading-[0.92] tracking-tight text-[#2a2a2a] sm:text-7xl lg:text-8xl"
                initial={reduced ? false : { opacity: 0, y: 24, rotate: 2 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.8, ease: EASE }}
                data-cursor-label={`${PLACES.primary.role} @ ${PLACES.primary.company}`}
              >
                <span className="block">{PLACES.primary.role}</span>
                <span className="mt-1 block text-[#1738D5]">
                  at {PLACES.primary.company}
                </span>
              </motion.h3>

              {/* VERIFIED badge — rotated, blue border, checkmark */}
              <motion.span
                className="absolute -top-4 right-0 flex items-center gap-1.5 -rotate-[8deg] border border-[#1738D5] bg-[#F4F1EA] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[#1738D5] sm:right-2"
                initial={reduced ? false : { opacity: 0, scale: 0.6, rotate: -30 }}
                whileInView={{ opacity: 1, scale: 1, rotate: -8 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ delay: 0.45, duration: 0.6, ease: EASE }}
                aria-label={`${PLACES.badge} badge`}
                data-cursor-label={PLACES.badge}
              >
                <BadgeCheck className="h-3.5 w-3.5" aria-hidden />
                {PLACES.badge}
              </motion.span>
            </div>

            {/* Note — handwritten, rotated, offset */}
            <Reveal delay={0.5}>
              <p className="hand-display mt-6 max-w-md -rotate-[1deg] text-lg text-[#1738D5] sm:translate-x-4 sm:text-xl">
                ↳ {PLACES.note}
              </p>
            </Reveal>

            {/* Extra — Reveal paragraph */}
            <Reveal className="mt-10 max-w-xl" delay={0.6}>
              <p className="font-sans text-base leading-relaxed text-[#2a2a2a]/80 sm:text-lg">
                {PLACES.extra}
              </p>
            </Reveal>
          </div>

          {/* INTERNSHIPS — stacked list, hairline-separated */}
          <div className="col-span-1 lg:col-span-5 lg:pl-2">
            <Reveal>
              <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.25em] text-[#6B6B6B]">
                {"// internships / archived"}
              </p>
            </Reveal>

            <ul className="border-t border-[#1a1a1a]/15" role="list">
              {PLACES.internships.map((name, i) => (
                <motion.li
                  key={name}
                  className="group flex items-baseline justify-between gap-4 border-b border-[#1a1a1a]/15 py-4"
                  initial={reduced ? false : { opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-8% 0px" }}
                  transition={{ delay: i * 0.08, duration: 0.6, ease: EASE }}
                  onMouseEnter={() => play("tick")}
                  data-cursor-label={`interned at ${name}`}
                >
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-[10px] tabular-nums text-[#6B6B6B]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="font-display text-xl font-bold tracking-tight text-[#2a2a2a] transition-colors duration-200 group-hover:text-[#1738D5] sm:text-2xl">
                        {name}
                      </p>
                      <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-[#6B6B6B]">
                        {`Interned at ${name}`}
                      </p>
                    </div>
                  </div>
                  <span className="shrink-0 font-mono text-[9px] uppercase tracking-[0.25em] text-[#6B6B6B] transition-colors duration-200 group-hover:text-[#1738D5]">
                    {"// archived"}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
