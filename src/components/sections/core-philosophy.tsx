"use client";
import { motion } from "framer-motion";
import { Reveal, SectionShell } from "@/components/sections/_shared";
import {
  CORE_PHILOSOPHY_BODY,
  CORE_PHILOSOPHY_TAGLINE,
  CORE_PHILOSOPHY_TITLE,
} from "@/lib/data";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function CorePhilosophy() {
  // Split title so "PURPOSE." can be rendered in accent yellow.
  // CORE_PHILOSOPHY_TITLE = "ART WITH A PURPOSE." → ["ART WITH A ", ""]
  const [before, after = ""] = CORE_PHILOSOPHY_TITLE.split("PURPOSE.");
  const chunks = [
    { text: before, accent: false },
    { text: "PURPOSE.", accent: true },
    { text: after, accent: false },
  ].filter((c) => c.text.length > 0);

  return (
    <SectionShell id="core-philosophy" index="//" label="CORE PHILOSOPHY">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
        {/* Title — left column, large */}
        <motion.h2
          className="col-span-1 -rotate-[1deg] origin-left font-display text-5xl font-bold leading-[0.95] tracking-tighter text-[#F4F1EA] sm:text-7xl lg:col-span-8 lg:text-8xl"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-12% 0px" }}
          transition={{ staggerChildren: 0.12, delayChildren: 0.1 }}
          data-cursor-label="art with a purpose"
        >
          {chunks.map((c, i) => (
            <span
              key={i}
              className="inline-block overflow-hidden align-bottom"
            >
              <motion.span
                className={`inline-block ${c.accent ? "text-[#FFD400]" : ""}`}
                variants={{
                  hidden: { y: "110%", opacity: 0 },
                  show: {
                    y: "0%",
                    opacity: 1,
                    transition: { duration: 0.8, ease: EASE },
                  },
                }}
              >
                {c.text}
              </motion.span>
            </span>
          ))}
        </motion.h2>

        {/* Body — offset right */}
        <Reveal
          className="col-span-1 lg:col-span-4 lg:col-start-9 lg:mt-6"
          delay={0.35}
        >
          <p className="font-sans text-base leading-relaxed text-[#F4F1EA]/80 sm:text-lg">
            {CORE_PHILOSOPHY_BODY}
          </p>
        </Reveal>

        {/* Tagline — bottom, full width with leading arrow */}
        <Reveal className="col-span-1 mt-6 lg:col-span-12 lg:mt-12" delay={0.55}>
          <div className="flex items-center gap-3 border-t border-white/10 pt-6">
            <span className="text-[#FFD400]" aria-hidden>
              →
            </span>
            <p className="font-mono text-base italic text-[#F4F1EA] sm:text-lg">
              {CORE_PHILOSOPHY_TAGLINE}
            </p>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}
