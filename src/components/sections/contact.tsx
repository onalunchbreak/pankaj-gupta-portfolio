"use client";
import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Copy, Check, Mail, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/sections/_shared";
import { CONTACT } from "@/lib/data";
import { useSound } from "@/hooks/use-sound";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

/* Magnetic pull tuning:
   - PULL_RADIUS: how far away the cursor starts influencing the button (px)
   - MAX_PULL:    maximum translation the button undergoes (px) */
const PULL_RADIUS = 160;
const MAX_PULL = 12;

export default function Contact() {
  const { play } = useSound();
  const reduced = usePrefersReducedMotion();
  const mailto = `mailto:${CONTACT.mail}`;
  const [copied, setCopied] = useState(false);

  /* ---- Magnetic CTA: pointer-driven pull on the button ---- */
  const ctaRef = useRef<HTMLAnchorElement | null>(null);
  const ctaX = useMotionValue(0);
  const ctaY = useMotionValue(0);
  // Spring-smoothed translation so the pull feels organic, not jittery.
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
    // Center of the CTA in viewport coords.
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
    // Linear falloff inside the pull radius, clamped to MAX_PULL.
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
      // Fallback for non-secure contexts / restricted iframes:
      // temporary textarea + execCommand.
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

  // Split CONTACT.title ("Contact Me") into stacked handwritten "Contact" / "Me"
  // per spec — white "Contact" + blue "Me", slightly overlapping/offset.
  const [titleFirst, ...titleRest] = CONTACT.title.split(" ");
  const titleSecond = titleRest.join(" ") || "";

  return (
    <section
      id="contact"
      className="relative w-full overflow-hidden"
      aria-labelledby="contact-heading"
      data-cursor-label="contact"
    >
      {/* ============================================================
          UPPER — BLACK environment
          Big stacked handwritten heading, body, magnetic CTA,
          annotation, social row, visible email + copy button.
          ============================================================ */}
      <div className="env-black relative w-full">
        <div className="mx-auto w-full max-w-[1200px] px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
          {/* ---- Section header (mirrors SectionShell) ---- */}
          <motion.div
            className="mb-10 flex items-baseline gap-3 border-b border-white/10 pb-3 font-mono text-[11px] uppercase tracking-widest text-[#6B6B6B] sm:mb-16"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <span className="text-[#FFD400]">06</span>
            <span className="text-[#F4F1EA]/70">{"// END / CONTACT"}</span>
            <span className="ml-auto hidden h-px flex-1 bg-white/10 sm:block" />
            <span className="hidden sm:inline">{"// baaz.sys"}</span>
          </motion.div>

          {/* Stacked handwritten heading — "Contact" / "Me"
              oversized Caveat via .hand-display, white + blue overlap. */}
          <motion.div
            className="relative"
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <h2
              id="contact-heading"
              className="hand-display select-none text-[26vw] leading-[0.82] tracking-tight text-[#F4F1EA] sm:text-[22vw] lg:text-[16rem]"
            >
              {titleFirst}
            </h2>
            {titleSecond && (
              <h2
                aria-hidden
                className="hand-display -mt-[8vw] select-none pl-[18vw] text-[26vw] leading-[0.82] tracking-tight text-[#1738D5] sm:-mt-[6vw] sm:pl-[16vw] sm:text-[22vw] lg:text-[16rem]"
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
              <span className="font-display text-4xl font-bold leading-[0.95] tracking-tight text-[#F4F1EA] transition-colors duration-300 group-hover:text-[#1738D5] sm:text-6xl lg:text-7xl">
                {CONTACT.cta}
              </span>
              {/* Arrow — pulls slightly further than the button for parallax depth */}
              <motion.span
                aria-hidden
                style={reduced ? undefined : { x: arrowX, y: arrowY }}
                className="ml-3 inline-block text-[#1738D5] transition-transform duration-300 group-hover:translate-x-2"
              >
                <ArrowRight className="inline h-8 w-8 align-baseline sm:h-12 sm:w-12" />
              </motion.span>
            </motion.a>
          </Reveal>

          {/* Subtitle below CTA — mono muted */}
          <Reveal className="mt-5 sm:mt-6" delay={0.35}>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#6B6B6B] sm:translate-x-3 sm:text-sm">
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

          {/* LINKS ROW — hairline-separated (·), mono uppercase, hover → accent + tick SFX. */}
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
                      className="group/link flex items-center gap-2 border-b border-transparent font-mono text-xs uppercase tracking-[0.25em] text-[#F4F1EA]/70 transition-colors duration-200 hover:border-[#1738D5] hover:text-[#1738D5] sm:text-sm"
                      {...(!isMail
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      <span
                        aria-hidden
                        className="h-1 w-1 rounded-full bg-[#6B6B6B] transition-colors duration-200 group-hover/link:bg-[#1738D5]"
                      />
                      <span className="inline-block transition-transform duration-200 group-hover/link:-translate-y-0.5">
                        {link.label}
                      </span>
                    </a>
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
          blue, right-aligned, blinking cursor) + EOF terminal label.
          ============================================================ */}
      <footer className="env-paper paper-texture relative w-full">
        <div className="mx-auto w-full max-w-[1200px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
          {/* Signoff — italic mono in dark ink */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <p className="max-w-2xl font-mono text-sm italic leading-relaxed text-[#2a2a2a]/80 sm:translate-x-3">
              {CONTACT.signoff}
            </p>
          </motion.div>

          {/* Signature — handwritten, blue, right-aligned, blinking cursor */}
          <motion.div
            className="mt-10 flex flex-col items-end gap-1 sm:mt-12"
            initial={reduced ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
          >
            <p className="hand-display text-4xl text-[#1738D5] sm:text-6xl lg:text-7xl">
              {CONTACT.signature}
            </p>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#2a2a2a]/60">
              {CONTACT.signatureSub}
              <span
                aria-hidden
                className="blink ml-1 inline-block h-3 w-[6px] translate-y-0.5 bg-[#1738D5]"
              />
            </p>
          </motion.div>

          {/* EOF terminal label */}
          <div className="mt-12 flex items-center justify-end font-mono text-[10px] uppercase tracking-[0.3em] text-[#2a2a2a]/55 sm:mt-16">
            {"// EOF · baaz.sys"}
          </div>
        </div>
      </footer>
    </section>
  );
}
