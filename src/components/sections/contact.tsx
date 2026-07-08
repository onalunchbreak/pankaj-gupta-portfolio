"use client";
import { motion } from "framer-motion";
import { Reveal, SectionShell } from "@/components/sections/_shared";
import { CONTACT } from "@/lib/data";
import { useSound } from "@/hooks/use-sound";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Contact() {
  const { play } = useSound();
  const reduced = usePrefersReducedMotion();
  const mailto = `mailto:${CONTACT.mail}`;

  return (
    <SectionShell id="contact" index="06" label="// END / CONTACT">
      {/* Header — big display, literal "## " prefix in muted ink */}
      <motion.h2
        className="font-display text-5xl font-bold leading-[0.92] tracking-tight text-[#F4F1EA] sm:text-7xl lg:text-8xl"
        initial={reduced ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        <span className="text-[#6B6B6B]">{"## "}</span>
        <span>contact Me</span>
      </motion.h2>

      {/* Body — muted ink, max-w-2xl */}
      <Reveal className="mt-8 max-w-2xl" delay={0.15}>
        <p className="font-display text-lg leading-relaxed text-[#F4F1EA]/70 sm:text-xl">
          {CONTACT.body}
        </p>
      </Reveal>

      {/* BIG CTA — mailto link, slightly rotated, underline reveal + accent fill.
          Plays "confirm" SFX on hover AND click. Whole element is an <a>. */}
      <Reveal className="mt-12 sm:mt-16" delay={0.25}>
        <a
          href={mailto}
          onMouseEnter={() => play("confirm")}
          onClick={() => play("confirm")}
          data-cursor-label="say hi"
          aria-label={`Email ${CONTACT.mail}`}
          className="group relative inline-block -rotate-[1deg] origin-left"
        >
          {/* Underline reveal — grows from 0 to full width on hover */}
          <span
            aria-hidden
            className="absolute -bottom-2 left-0 h-[3px] w-0 bg-[#FFD400] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full"
          />
          <span className="font-display text-4xl font-bold leading-[0.95] tracking-tight text-[#F4F1EA] transition-colors duration-300 group-hover:text-[#FFD400] sm:text-6xl lg:text-7xl">
            {CONTACT.cta}
          </span>
        </a>
      </Reveal>

      {/* Subtitle below CTA — mono muted, offset slightly for misalignment */}
      <Reveal className="mt-5 sm:mt-6" delay={0.35}>
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#6B6B6B] sm:translate-x-3 sm:text-sm">
          {"no forms, no friction"}
        </p>
      </Reveal>

      {/* LINKS ROW — hairline-separated (·), mono uppercase, hover → accent + tick SFX.
          External links open in a new tab; MAIL stays a mailto. */}
      <Reveal className="mt-14 sm:mt-20" delay={0.45}>
        <nav
          aria-label="Social links"
          className="flex flex-wrap items-center gap-x-3 gap-y-3 sm:translate-x-6"
        >
          {CONTACT.links.map((link, i) => {
            const isMail = link.href.startsWith("mailto:");
            return (
              <span key={link.label} className="flex items-center gap-3">
                {i > 0 && (
                  <span aria-hidden className="font-mono text-xs text-[#6B6B6B]">
                    ·
                  </span>
                )}
                <a
                  href={link.href}
                  onMouseEnter={() => play("tick")}
                  data-cursor-label={link.label.toLowerCase()}
                  className="group/link font-mono text-xs uppercase tracking-[0.25em] text-[#F4F1EA]/70 transition-colors duration-200 hover:text-[#FFD400] sm:text-sm"
                  {...(!isMail
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  <span className="inline-block transition-transform duration-200 group-hover/link:-translate-y-0.5">
                    {link.label}
                  </span>
                </a>
              </span>
            );
          })}
        </nav>
      </Reveal>

      {/* SIGN-OFF + SIGNATURE — quiet, signed end note.
          Signoff is mono italic muted; signature is right-aligned display
          accent, with a blinking terminal cursor after the name. */}
      <div className="mt-16 border-t border-white/10 pt-8 sm:mt-24">
        <Reveal>
          <p className="max-w-2xl font-mono text-sm italic leading-relaxed text-[#6B6B6B] sm:translate-x-3">
            {CONTACT.signoff}
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-6 text-right font-display text-2xl font-bold tracking-tight text-[#FFD400] sm:text-3xl">
            {CONTACT.signature}
            <span
              aria-hidden
              className="blink ml-1 inline-block h-5 w-[10px] translate-y-0.5 bg-[#FFD400]"
            />
          </p>
        </Reveal>
      </div>

      {/* // EOF terminal label — quiet end-of-file marker, right-aligned */}
      <div className="mt-12 flex items-center justify-end font-mono text-[10px] uppercase tracking-[0.3em] text-[#6B6B6B]">
        {"// EOF · baaz.sys"}
      </div>
    </SectionShell>
  );
}
