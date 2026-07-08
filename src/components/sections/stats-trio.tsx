"use client";
import { motion } from "framer-motion";
import { CountUp, Reveal, SectionShell } from "@/components/sections/_shared";
import { STATS, STATS_AFTER, STATS_PS } from "@/lib/data";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function StatsTrio() {
  const reduced = usePrefersReducedMotion();

  return (
    <SectionShell id="stats" index="//" label="BY THE NUMBERS">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-0">
        {STATS.map((stat, i) => {
          // Long-label stat (DU rank) — render smaller number, wrap label.
          const isLong = stat.label.length > 24;
          // Intentional misalignment — middle block offset down.
          const isMiddle = i === 1;
          const columnClasses = [
            "relative px-0 md:px-8",
            i > 0 ? "md:border-l md:border-white/10" : "",
            isMiddle ? "md:translate-y-12" : "",
          ]
            .filter(Boolean)
            .join(" ");

          return (
            <motion.div
              key={stat.label}
              className={columnClasses}
              initial={reduced ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ delay: i * 0.12, duration: 0.7, ease: EASE }}
              data-cursor-label={stat.label}
            >
              {/* Editorial index micro-label */}
              <span className="mb-3 block font-mono text-[10px] uppercase tracking-[0.3em] text-[#6B6B6B]">
                {`// 0${i + 1}`}
              </span>

              {/* Big count-up number */}
              <div
                className={[
                  "font-display font-bold leading-[0.85] tracking-tighter text-[#F4F1EA]",
                  isLong ? "text-5xl sm:text-6xl" : "text-7xl sm:text-8xl",
                ].join(" ")}
              >
                {isLong ? (
                  // Fraction renders as literal — count-up doesn't suit "1/5".
                  <CountUp target={stat.value} suffix={stat.suffix} display="1/5" />
                ) : (
                  <CountUp target={stat.value} suffix={stat.suffix} />
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

      {/* AFTER line — italic display, accent, offset right */}
      <Reveal className="mt-20 md:mt-36" delay={0.2}>
        <p className="font-display text-2xl italic tracking-tight text-[#FFD400] sm:text-3xl md:translate-x-10">
          {STATS_AFTER}
        </p>
      </Reveal>

      {/* PS box — terminal note, rotated slightly */}
      <Reveal className="mt-12" delay={0.35}>
        <div
          className="relative max-w-2xl -rotate-[0.6deg] border border-white/15 bg-[#111111] p-5 sm:p-6"
          data-cursor-label="PS note"
        >
          <span className="absolute -top-2.5 left-4 bg-[#0A0A0A] px-2 font-mono text-[10px] uppercase tracking-[0.3em] text-[#FFD400]">
            {"// PS"}
          </span>
          <p className="font-mono text-sm leading-relaxed text-[#F4F1EA]/80 sm:text-[15px]">
            {STATS_PS.replace(/^PS\/\/\s*/, "")}
          </p>
        </div>
      </Reveal>
    </SectionShell>
  );
}
