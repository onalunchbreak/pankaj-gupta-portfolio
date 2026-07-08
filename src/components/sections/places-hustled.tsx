"use client";
import { motion } from "framer-motion";
import { BadgeCheck } from "lucide-react";
import { Reveal, SectionShell } from "@/components/sections/_shared";
import { PLACES } from "@/lib/data";
import { useSound } from "@/hooks/use-sound";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function PlacesHustled() {
  const { play } = useSound();
  const reduced = usePrefersReducedMotion();
  // primary role + internships list = total places hustled
  const total = PLACES.internships.length + 1;

  return (
    <SectionShell id="places" index="" label={"// PLACES I'VE HUSTLED AT"}>
      <div className="relative">
        {/* Intentional misalignment — rotated counter, top-right */}
        <span
          aria-hidden
          className="absolute -top-6 right-0 rotate-[5deg] select-none border border-[#FFD400] px-2 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-[#FFD400]"
          data-cursor-label={`// 0${total} places`}
        >
          {`// 0${total} places`}
        </span>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          {/* PRIMARY — large featured block, offset left */}
          <div className="col-span-1 lg:col-span-7 lg:translate-y-4">
            <Reveal>
              <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.25em] text-[#6B6B6B]">
                {"// primary / current"}
              </p>
            </Reveal>

            <div className="relative">
              <motion.h3
                className="font-display text-5xl font-bold leading-[0.92] tracking-tighter text-[#F4F1EA] sm:text-7xl lg:text-8xl"
                initial={reduced ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.8, ease: EASE }}
                data-cursor-label={`${PLACES.primary.role} @ ${PLACES.primary.company}`}
              >
                <span className="block">{PLACES.primary.role}</span>
                <span className="mt-1 block text-[#FFD400]">
                  at {PLACES.primary.company}
                </span>
              </motion.h3>

              {/* VERIFIED badge — rotated, accent border, checkmark */}
              <motion.span
                className="absolute -top-4 right-0 flex items-center gap-1.5 -rotate-[8deg] border border-[#FFD400] bg-[#0A0A0A] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[#FFD400] sm:right-2"
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

            <Reveal delay={0.5}>
              <p className="mt-6 max-w-md font-mono text-sm italic text-[#6B6B6B]">
                {PLACES.note}
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

            <ul className="border-t border-white/10" role="list">
              {PLACES.internships.map((name, i) => (
                <motion.li
                  key={name}
                  className="group flex items-baseline justify-between gap-4 border-b border-white/10 py-4"
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
                      <p className="font-display text-xl font-bold tracking-tight text-[#F4F1EA] transition-colors duration-200 group-hover:text-[#FFD400] sm:text-2xl">
                        {name}
                      </p>
                      <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-[#6B6B6B]">
                        {`Interned at ${name}`}
                      </p>
                    </div>
                  </div>
                  <span className="shrink-0 font-mono text-[9px] uppercase tracking-[0.25em] text-[#6B6B6B] transition-colors duration-200 group-hover:text-[#FFD400]">
                    {"// archived"}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
