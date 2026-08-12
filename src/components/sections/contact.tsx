"use client";
import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Copy, Check, Mail, ArrowRight, Lock } from "lucide-react";
import { Reveal } from "@/components/sections/_shared";
import { CONTACT } from "@/lib/data";
import { hasLink } from "@/lib/links";
import { useSound } from "@/hooks/use-sound";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

/* Magnetic pull tuning:
   - PULL_RADIUS: how far away the cursor starts influencing the button (px)
   - MAX_PULL:    maximum translation the button undergoes (px) */
const PULL_RADIUS = 160;
const MAX_PULL = 12;

/* ============================================================
   CONTACT — split layout: BLACK upper + WARM PAPER footer.
   Upper:  stacked handwritten heading (white + blue overlap),
           body, magnetic mailto CTA, annotation, social row
           (EMAIL enabled · LINKEDIN/GITHUB rendered as disabled
           "LINK_UNAVAILABLE" when their href is empty — never
           fabricated), visible email + copy-to-clipboard button.
   Footer: handwritten signoff, right-aligned blue signature with
           blinking cursor, system status mono label, EOF terminal.
   ============================================================ */
export default function Contact() {
  const { play } = useSound();
  const reduced = usePrefersReducedMotion();
  const mailto = `mailto:${CONTACT.mail}`;
  const [copied, setCopied] = useState(false);

  /* Split "Talk Product With Me" into two stacked lines so the
     blue overlap reads cleanly. */
  const titleWords = CONTACT.title.split(" ");
  const titleFirst = titleWords.slice(0, 2).join(" "); // "Talk Product"
  const titleSecond = titleWords.slice(2).join(" "); // "With Me"

  /* ---- Magnetic CTA: pointer-driven pull on the button ---- */
  const ctaRef = useRef<HTMLAnchorElement | null>(null);
  const ctaX = useMotionValue(0);
  const ctaY = useMotionValue(0);
  // Spring-smoothed translation so the pull feels organic.
  const springX = useSpring(ctaX, { stiffness: 220, damping: 18, mass: 0.5 });
  const springY = useSpring(ctaY, { stiffness: 220, damping: 18, mass: 0.5 });
  // Arrow nudges a touch further than the button for parallax depth.
  const arrowX = useTransform(springX, [-MAX_PULL, MAX_PULL], [-MAX_PULL * 1.8, MAX_PULL * 1.8]);
  const arrowY = useTransform(springY, [-MAX_PULL, MAX_PULL], [-MAX_PULL * 1.8, MAX_PULL * 1.8]);

  const onCtaMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (reduced) return;
    const el = ctaRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.hypot(dx, dy);
    if (dist > PULL_RADIUS) {
      ctaX.set(0);
      ctaY.set(0);
      return;
    }
    const pull = 1 - dist / PULL_RADIUS;
    const tx = (dx / (dist || 1)) * pull * MAX_PULL;
    const ty = (dy / (dist || 1)) * pull * MAX_PULL;
    ctaX.set(tx);
    ctaY.set(ty);
  };

  const onCtaLeave = () => {
    ctaX.set(0);
    ctaY.set(0);
  };

  const copyEmail = async () => {
    let ok = false;
    try {
      await navigator.clipboard.writeText(CONTACT.mail);
      ok = true;
    } catch {
      // Fallback for non-secure contexts / restricted iframes.
      try {
        const ta = document.createElement("textarea");
        ta.value = CONTACT.mail;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        ok = document.execCommand("copy");
        document.body.removeChild(ta);
      } catch {
        ok = false;
      }
    }
    setCopied(true);
    play(ok ? "confirm" : "blip");
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section
      id="contact"
      className="relative w-full overflow-hidden"
      aria-labelledby="contact-heading"
      data-cursor-label="contact"
    >
      {/* ============================================================
          UPPER — BLACK environment
          ============================================================ */}
      <div className="env-black relative w-full">
        <div className="mx-auto w-full max-w-[1200px] px-5 pt-16 pb-12 sm:pt-20 sm:pb-16 lg:px-12">
          {/* ---- Section header ---- */}
          <motion.div
            className="mb-10 flex items-baseline gap-3 border-b border-white/10 pb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-[#A3A3A3] sm:mb-16"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <span className="text-[#1738D5]">06</span>
            <span className="text-[#F4F1EA]/70">CONTACT</span>
          </motion.div>

          {/* Stacked handwritten heading — "Talk Product" (white) +
              "With Me" (blue, overlapping). */}
          <motion.div
            className="relative"
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <h2
              id="contact-heading"
              className="hand-display select-none text-[18vw] leading-[0.82] tracking-tight text-[#F4F1EA] sm:text-[14vw] lg:text-[11rem]"
            >
              {titleFirst}
            </h2>
            {titleSecond && (
              <h2
                aria-hidden
                className="hand-display -mt-[6vw] select-none pl-[20vw] text-[18vw] leading-[0.82] tracking-tight text-[#1738D5] sm:-mt-[5vw] sm:pl-[22vw] sm:text-[14vw] lg:text-[11rem]"
                style={{ textShadow: "0 0 50px rgba(23,56,213,0.45)" }}
              >
                {titleSecond}
              </h2>
            )}
          </motion.div>

          {/* Body — muted ink, max-w-2xl */}
          <Reveal className="mt-8 max-w-2xl sm:mt-12" delay={0.15}>
            <p className="font-display text-lg leading-relaxed text-[#F4F1EA]/70 sm:text-xl">
              {CONTACT.body}
            </p>
          </Reveal>

          {/* MAGNETIC CTA — mailto link. Pointer-driven pull on desktop.
              Underline reveal + arrow translation on hover. */}
          <Reveal className="mt-12 sm:mt-16" delay={0.25}>
            <motion.a
              ref={ctaRef}
              href={mailto}
              onMouseMove={onCtaMove}
              onMouseLeave={onCtaLeave}
              onMouseEnter={() => play("tick")}
              onClick={() => play("confirm")}
              data-cursor-label="say hi"
              aria-label={`Email ${CONTACT.mail}`}
              style={reduced ? undefined : { x: springX, y: springY }}
              className="group relative inline-block origin-left"
            >
              {/* Underline reveal — grows from 0 to full width on hover */}
              <span
                aria-hidden
                className={`absolute -bottom-2 left-0 h-[3px] w-0 bg-[#1738D5] ${
                  reduced ? "" : "transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                } group-hover:w-full`}
              />
              <span className="font-display text-[5.8vw] font-bold leading-[0.95] tracking-tight text-[#F4F1EA] transition-colors duration-300 group-hover:text-[#1738D5] sm:text-4xl lg:text-5xl">
                {CONTACT.cta}
              </span>
              {/* Arrow — pulls slightly further than the button for parallax */}
              <motion.span
                aria-hidden
                style={reduced ? undefined : { x: arrowX, y: arrowY }}
                className="ml-3 inline-block text-[#1738D5] transition-transform duration-300 group-hover:translate-x-2"
              >
                <ArrowRight className="inline h-8 w-8 align-baseline sm:h-12 sm:w-12" />
              </motion.span>
            </motion.a>
          </Reveal>

          {/* Annotation — mono muted */}
          <Reveal className="mt-5 sm:mt-6" delay={0.35}>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#A3A3A3] sm:translate-x-3 sm:text-sm">
              {CONTACT.annotation}
            </p>
          </Reveal>

          {/* EMAIL ADDRESS BLOCK — visible address + copy-to-clipboard button. */}
          <Reveal className="mt-10" delay={0.4}>
            <div className="flex flex-col gap-3 border border-white/10 bg-[#0E0E0E] p-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-5">
              <div className="flex min-w-0 items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-[#FFD400]" aria-hidden />
                <a
                  href={mailto}
                  onMouseEnter={() => play("tick")}
                  data-cursor-label="mail"
                  className="truncate font-mono text-sm text-[#F4F1EA]/85 transition-colors hover:text-[#1738D5] sm:text-base"
                >
                  {CONTACT.mail}
                </a>
              </div>
              <button
                type="button"
                onClick={copyEmail}
                onMouseEnter={() => play("tick")}
                data-cursor-label={copied ? "copied" : "copy"}
                className="group flex shrink-0 items-center gap-2 border border-white/15 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[#F4F1EA]/70 transition-colors hover:border-[#1738D5] hover:text-[#1738D5] focus-ring"
                aria-label="Copy email address to clipboard"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-[#1738D5]" aria-hidden />
                    <span className="text-[#1738D5]">copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" aria-hidden />
                    <span>copy</span>
                  </>
                )}
              </button>
            </div>
          </Reveal>

          {/* LINKS ROW — EMAIL (mailto), LINKEDIN, GITHUB all render as
              clickable external links (target=_blank) via the URLs
              extracted from the resume PDF. */}
          <Reveal className="mt-14 sm:mt-20" delay={0.45}>
            <nav
              aria-label="Social links"
              className="flex flex-wrap items-center gap-x-3 gap-y-3 sm:translate-x-6"
            >
              {CONTACT.links.map((link, i) => {
                const isMail = link.href.startsWith("mailto:");
                const available = hasLink(link.href);
                return (
                  <span key={link.label} className="flex items-center gap-3">
                    {i > 0 && (
                      <span aria-hidden className="font-mono text-xs text-[#A3A3A3]">
                        ·
                      </span>
                    )}
                    {available ? (
                      <a
                        href={link.href}
                        onMouseEnter={() => play("tick")}
                        data-cursor-label={link.label.toLowerCase()}
                        className="group/link flex items-center gap-2 border-b border-transparent font-mono text-xs uppercase tracking-[0.25em] text-[#F4F1EA]/70 transition-colors duration-200 hover:border-[#1738D5] hover:text-[#1738D5] sm:text-sm"
                        {...(!isMail
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                      >
                        <span
                          aria-hidden
                          className="h-1 w-1 rounded-full bg-[#A3A3A3] transition-colors duration-200 group-hover/link:bg-[#1738D5]"
                        />
                        <span className="inline-block transition-transform duration-200 group-hover/link:-translate-y-0.5">
                          {link.label}
                        </span>
                      </a>
                    ) : (
                      <span
                        aria-disabled="true"
                        className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-[#A3A3A3]/60 cursor-not-allowed sm:text-sm"
                        title="Link unavailable — no URL on file"
                      >
                        <Lock className="h-3 w-3" aria-hidden />
                        <span>{link.label.toLowerCase()}_unavailable</span>
                      </span>
                    )}
                  </span>
                );
              })}
            </nav>
          </Reveal>
        </div>
      </div>

      {/* ============================================================
          FOOTER — WARM PAPER environment
          Signoff (italic mono, dark ink) + signature (handwritten,
          blue, right-aligned, blinking cursor) + system status +
          EOF terminal label.
          ============================================================ */}
      {/* Gradient bridge — smooths the harsh black → paper transition */}
      <div
        aria-hidden
        className="h-8 w-full bg-gradient-to-b from-[#0A0A0A] via-[#1a1814] to-[#F4F1EA]"
      />

      <footer className="env-paper paper-texture relative w-full">
        <div className="mx-auto w-full max-w-[1200px] px-5 py-8 sm:px-8 sm:py-10 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
            {/* Left Column: Signoff */}
            <motion.div
              className="max-w-xl md:max-w-md lg:max-w-lg"
              initial={reduced ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <p className="font-mono text-xs italic leading-relaxed text-[#2a2a2a]/80">
                {CONTACT.signoff}
              </p>
            </motion.div>

            {/* Right Column: Signature and System Status stacked vertically */}
            <div className="flex flex-col items-end gap-5">
              {/* Signature — handwritten, blue, right-aligned, blinking cursor */}
              <motion.div
                className="flex flex-col items-end gap-0.5"
                initial={reduced ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
              >
                <p className="hand-display text-2xl text-[#1738D5] sm:text-4xl lg:text-5xl whitespace-nowrap">
                  {CONTACT.signature}
                </p>
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#2a2a2a]/60 whitespace-nowrap">
                  {CONTACT.signatureSub}
                  <span
                    aria-hidden
                    className="blink ml-1 inline-block h-2.5 w-[5px] translate-y-0.5 bg-[#1738D5]"
                  />
                </p>
              </motion.div>

              {/* System status + EOF terminal label */}
              <div className="flex flex-col items-end gap-1.5 sm:flex-row sm:items-center sm:justify-end sm:gap-4">
                <span className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.3em] text-[#1738D5]">
                  <span
                    aria-hidden
                    className="blink inline-block h-1.5 w-1.5 bg-[#1738D5]"
                  />
                  {CONTACT.systemStatus}
                </span>
                <span
                  aria-hidden
                  className="hidden h-3 w-px bg-[#2a2a2a]/25 sm:inline-block"
                />
                <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#2a2a2a]/55">
                  {"// EOF · session complete"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
}
