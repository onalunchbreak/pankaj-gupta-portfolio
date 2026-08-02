"use client";
import { Reveal, RevealWords, SectionShell } from "@/components/sections/_shared";
import { PHILOSOPHY_QUOTE } from "@/lib/data";

export default function PhilosophyQuote() {
  return (
    <SectionShell id="philosophy" index="01" label="PHILOSOPHY">
      <div className="relative">
        {/* Oversized decorative quotation glyph, intentionally misaligned */}
        <span
          aria-hidden
          className="pointer-events-none absolute -top-12 -left-2 select-none font-display text-[12rem] leading-[0.6] text-[#FFD400]/15 sm:-top-20 sm:-left-6 sm:text-[20rem] lg:text-[24rem]"
          data-cursor-label="quote"
        >
          &ldquo;
        </span>

        <RevealWords
          as="blockquote"
          text={PHILOSOPHY_QUOTE}
          className="relative max-w-4xl font-display text-3xl font-semibold leading-tight tracking-tight text-[#F4F1EA] sm:text-5xl lg:text-6xl"
          delay={0.1}
          stagger={0.06}
        />
      </div>
    </SectionShell>
  );
}
