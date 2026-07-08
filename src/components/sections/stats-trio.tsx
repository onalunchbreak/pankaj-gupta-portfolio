"use client";
import { motion } from "framer-motion";
import { CountUp, Reveal } from "@/components/sections/_shared";
import { STATS, STATS_AFTER, STATS_PS } from "@/lib/data";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Stats Trio — id="stats".
 *
 * Warm paper environment, flows directly after Places Hustled. Three stat
 * blocks: 33M+ Campaign Reach, 40+ Live standup Shows, DU Rank 1/5
 * Subjects. Big CountUp numbers in dark ink with the suffix in electric
 * blue. Hairline dividers between columns (dark/15). Middle stat offset
 * down for intentional misalignment. Each card enters with rotation
 * correction (initial rotate 2deg → final rotate 0deg). The DU Rank stat
 * renders "1/5" as a literal display (count-up doesn't suit a fraction).
 * Below the trio: "Still figuring out things." as a handwritten italic
 * blue offset annotation. Then STATS_PS in a terminal-style bordered box
 * with a "PS//" label, mono body, dark border on paper, slightly rotated.
 * Reduced-motion: static, fully revealed.
 */
export default function StatsTrio() {
  const reduced = usePrefersReducedMotion();

  return (
    <section
      id="stats"
      className="env-paper paper-texture relative w-full overflow-hidden"
      aria-labelledby="stats-label"
    >
      <div className="relative mx-auto w-full max-w-[1200px] px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
        {/* ---- Subtle header ---- */}
        <motion.div
          id="stats-label"
          className="mb-12 flex items-baseline gap-3 border-b border-[#1a1a1a]/15 pb-3 font-mono text-[11px] uppercase tracking-widest text-[#6B6B6B] sm:mb-16"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <span className="text-[#1738D5]">{"// stats"}</span>
          <span className="text-[#2a2a2a]/70">by the numbers</span>
          <span className="ml-auto hidden h-px flex-1 bg-[#1a1a1a]/15 sm:block" />
          <span className="hidden sm:inline">{`// 0${STATS.length} entries`}</span>
        </motion.div>

        {/* ---- Three stat blocks ---- */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-0">
          {STATS.map((stat, i) => {
            // Long-label stat (DU rank) — render smaller number, wrap label.
            const isLong = stat.label.length > 24;
            // Intentional misalignment — middle block offset down.
            const isMiddle = i === 1;
            const columnClasses = [
              "relative px-0 md:px-8",
              i > 0 ? "md:border-l md:border-[#1a1a1a]/15" : "",
              isMiddle ? "md:translate-y-12" : "",
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <motion.div
                key={stat.label}
                className={columnClasses}
                initial={reduced ? false : { opacity: 0, y: 28, rotate: 2 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ delay: i * 0.12, duration: 0.7, ease: EASE }}
                data-cursor-label={stat.label}
              >
                {/* Editorial index micro-label */}
                <span className="mb-3 block font-mono text-[10px] uppercase tracking-[0.3em] text-[#6B6B6B]">
                  {`// 0${i + 1}`}
                </span>

                {/* Big count-up number — dark ink, suffix blue */}
                <div
                  className={[
                    "font-display font-bold leading-[0.85] tracking-tighter",
                    isLong ? "text-5xl sm:text-6xl" : "text-7xl sm:text-8xl",
                  ].join(" ")}
                >
                  {isLong ? (
                    // Fraction renders as literal "1/5" — count-up doesn't suit it.
                    <CountUp
                      target={stat.value}
                      suffix={stat.suffix}
                      display="1/5"
                      className="text-[#2a2a2a]"
                    />
                  ) : (
                    <span className="text-[#2a2a2a]">
                      <CountUp target={stat.value} />
                      <span className="text-[#1738D5]">{stat.suffix}</span>
                    </span>
                  )}
                </div>

                {/* Label */}
                <p
                  className={[
                    "mt-4 font-mono uppercase tracking-[0.2em] text-[#6B6B6B]",
                    isLong
                      ? "text-[11px] leading-relaxed normal-case tracking-wide"
                      : "text-xs",
                  ].join(" ")}
                >
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* ---- AFTER line — handwritten italic, blue, offset ---- */}
        <Reveal className="mt-20 md:mt-36" delay={0.2}>
          <p className="hand-display -rotate-[1deg] text-2xl italic text-[#1738D5] sm:translate-x-8 sm:text-3xl">
            ↳ {STATS_AFTER}
          </p>
        </Reveal>

        {/* ---- PS box — terminal note, dark border on paper, rotated ---- */}
        <Reveal className="mt-12" delay={0.35}>
          <div
            className="relative max-w-2xl -rotate-[0.6deg] border border-[#1a1a1a]/30 bg-[#F4F1EA]/40 p-5 sm:p-6"
            data-cursor-label="PS note"
          >
            <span className="absolute -top-2.5 left-4 bg-[#F4F1EA] px-2 font-mono text-[10px] uppercase tracking-[0.3em] text-[#1738D5]">
              {"// PS"}
            </span>
            <p className="font-mono text-sm leading-relaxed text-[#2a2a2a]/85 sm:text-[15px]">
              {STATS_PS.replace(/^PS\/\/\s*/, "")}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
