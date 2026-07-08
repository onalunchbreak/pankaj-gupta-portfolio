"use client";
import { CountUp, Reveal, SectionShell } from "@/components/sections/_shared";
import { VIEWS_HEADLINE, VIEWS_INDEX, VIEWS_SUB } from "@/lib/data";

export default function ViewsCount() {
  return (
    <SectionShell id="views" index={VIEWS_INDEX} label={VIEWS_HEADLINE}>
      <div className="relative">
        {/* rotated "// viral" tag — intentional misalignment */}
        <span
          aria-hidden
          className="absolute -top-6 right-0 rotate-[6deg] select-none border border-[#FFD400] px-2 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-[#FFD400] sm:right-6"
          data-cursor-label="// viral"
        >
          {"// viral"}
        </span>

        {/* Giant count-up — number offset slightly, "+" in accent yellow */}
        <div className="relative -ml-1 sm:-ml-2">
          <span
            className="font-display text-[18vw] font-bold leading-[0.85] tracking-tighter text-[#F4F1EA] sm:text-[12vw] lg:text-[10rem]"
            data-cursor-label="186M+ views"
          >
            <CountUp target={186} suffix="M" />
            <span className="text-[#FFD400]">+</span>
          </span>
        </div>

        {/* "VIEWS DRIVEN" — baseline shift on DRIVEN */}
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-[#F4F1EA] sm:text-5xl lg:text-6xl">
          VIEWS{" "}
          <span className="inline-block translate-y-1 text-[#FFD400]">DRIVEN</span>
        </h2>

        {/* Sub copy */}
        <Reveal className="mt-10 max-w-xl" delay={0.2}>
          <p className="font-mono text-sm leading-relaxed text-[#6B6B6B] sm:text-base">
            {VIEWS_SUB}
          </p>
        </Reveal>
      </div>
    </SectionShell>
  );
}
