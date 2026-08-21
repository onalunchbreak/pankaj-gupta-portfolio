"use client";
import { motion } from "framer-motion";
import { Reveal, renderBold } from "@/components/sections/_shared";
import { ORIGIN } from "@/lib/data";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Origin — Section "01 — THE BEGINNING".
 *
 * Warm paper notebook environment. Dark ink body, electric-blue (#1738D5)
 * accents. Short subtitle followed by three short bolded bullets.
 */
export default function Origin() {
  return (
    <section
      id="origin"
      className="env-paper paper-texture relative w-full overflow-hidden"
      aria-labelledby="origin-title"
    >
      <div className="relative mx-auto w-full max-w-[1200px] px-5 pt-8 pb-10 sm:px-8 sm:pt-10 sm:pb-12 lg:px-12">
        {/* ---- Header: 01 — THE BEGINNING ---- */}
        <motion.div
          className="mb-8 flex flex-col gap-3 border-b border-[#1a1a1a]/15 pb-3 sm:mb-10"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <div className="flex items-baseline gap-3 font-mono text-[11px] uppercase tracking-widest text-[#1a1a1a]/75">
            <span className="text-[#1738D5]">{ORIGIN.index}</span>
            <span className="text-[#2a2a2a]/70">/ {ORIGIN.title}</span>
          </div>
        </motion.div>

        {/* Content container aligned left */}
        <div>

          {/* ---- SUBTITLE ---- */}
          <Reveal>
            <p
              id="origin-title"
              className="font-sans max-w-xl text-base leading-relaxed text-[#2a2a2a]/70 sm:text-lg"
              data-cursor-label="origin / the beginning"
            >
              {ORIGIN.subtitle}
            </p>
          </Reveal>

          {/* ---- Supporting points ---- */}
          <div className="relative max-w-2xl space-y-8 mt-6 sm:mt-8">
            {ORIGIN.points.map((point, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="relative border-l border-[#1a1a1a]/15 pl-6">
                  {/* blue dot on the left border */}
                  <span
                    className="absolute left-0 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 bg-[#1738D5]"
                    aria-hidden
                  />
                  {/* editorial index marker */}
                  <div className="mb-2 flex flex-wrap items-baseline gap-2 font-mono text-[10px] tracking-[0.25em] text-[#1a1a1a]/75">
                    <span>{`0${i + 1}`}</span>
                    <span className="text-[#1738D5]/90 lowercase italic font-mono text-[11px] tracking-normal">
                      · {point.tag.toLowerCase()}
                    </span>
                  </div>

                  <p className="font-sans text-base leading-relaxed text-[#2a2a2a]/85 sm:text-lg">
                    {renderBold(point.text)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
