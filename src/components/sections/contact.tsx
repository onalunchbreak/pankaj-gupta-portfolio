"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check, Mail, Lock, Phone, FileText, Volume2, VolumeX } from "lucide-react";
import { Reveal } from "@/components/sections/_shared";
import { CONTACT } from "@/lib/data";
import { hasLink } from "@/lib/links";
import { useSound } from "@/hooks/use-sound";
import { useMuteStore } from "@/hooks/use-mute";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ============================================================
   CONTACT — split layout: BLACK upper + WARM PAPER footer.
   Upper:  stacked handwritten heading (white + blue overlap),
           body, annotation, social row (EMAIL enabled ·
           LINKEDIN/GITHUB rendered as disabled "LINK_UNAVAILABLE"
           when their href is empty — never fabricated), and a
           stacked action card: Email Me (copies to clipboard),
           click-to-reveal phone, résumé link.
   Footer: handwritten signoff, right-aligned blue signature with
           blinking cursor, system status mono label, EOF terminal.
   ============================================================ */
export default function Contact() {
  const { play } = useSound();
  const reduced = usePrefersReducedMotion();
  const telHref = `tel:${CONTACT.phone.replace(/\s+/g, "")}`;
  const [copied, setCopied] = useState(false);
  const [phoneRevealed, setPhoneRevealed] = useState(false);

  const storeMuted = useMuteStore((s) => s.muted);
  const armed = useMuteStore((s) => s.armed);
  const toggleMuted = useMuteStore((s) => s.toggle);
  const armSound = useMuteStore((s) => s.arm);

  // useMuteStore's initial value depends on localStorage, which isn't
  // available during SSR — read it as its server-side default (muted)
  // until after mount to avoid a hydration mismatch.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const muted = mounted ? storeMuted : true;

  const revealPhone = () => {
    setPhoneRevealed(true);
    play("confirm");
  };

  const handleMuteClick = () => {
    if (!armed) {
      armSound();
      play("confirm");
      return;
    }
    toggleMuted();
    play("tick");
  };

  /* Split "Talk Product With Me" into two stacked lines so the
     blue overlap reads cleanly. */
  const titleWords = CONTACT.title.split(" ");
  const titleFirst = titleWords.slice(0, 2).join(" "); // "Talk Product"
  const titleSecond = titleWords.slice(2).join(" "); // "With Me"

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

          {/* ---- Split 2-Column Content (utilizes both left and right space) ----
               Mobile stacking order: body -> action card -> social links.
               Desktop: unchanged 2-column layout (body+links left, card right). */}
          <div className="mt-6 sm:mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-x-12 lg:gap-y-8">
            {/* Body copy */}
            <div className="order-1 lg:order-none lg:col-start-1 lg:col-span-7 lg:row-start-1">
              <Reveal delay={0.15}>
                <p className="font-display text-lg leading-relaxed text-[#F4F1EA]/80 sm:text-xl max-w-xl">
                  {CONTACT.body}
                </p>
              </Reveal>
            </div>

            {/* Action card: Email Me / Reveal Phone / Resume */}
            <div className="order-2 lg:order-none lg:col-start-8 lg:col-span-5 lg:row-start-1 lg:row-span-2 flex flex-col justify-end">
              <Reveal delay={0.25}>
                <div className="flex flex-col gap-3 rounded-sm border border-white/15 bg-[#0E0E0E] p-4 sm:p-5 shadow-xl transition-all duration-300 hover:border-[#FFD400]/40">
                  <button
                    type="button"
                    onClick={copyEmail}
                    onMouseEnter={() => play("tick")}
                    data-cursor-label={copied ? "copied" : "email me"}
                    className="group flex w-full items-center justify-center gap-2 border border-white/20 bg-[#141414] px-4 py-2 font-mono text-xs uppercase tracking-[0.2em] text-[#F4F1EA] transition-colors hover:border-[#FFD400] hover:text-[#FFD400] focus-ring"
                    aria-label="Copy email address to clipboard"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-[#FFD400]" aria-hidden />
                        <span className="text-[#FFD400]">COPIED</span>
                      </>
                    ) : (
                      <>
                        <Mail className="h-3.5 w-3.5" aria-hidden />
                        <span>Email Me</span>
                      </>
                    )}
                  </button>

                  {phoneRevealed ? (
                    <a
                      href={telHref}
                      onMouseEnter={() => play("tick")}
                      data-cursor-label="call"
                      className="group flex w-full items-center justify-center gap-2 border border-[#FFD400]/50 bg-[#141414] px-4 py-2 font-mono text-xs uppercase tracking-[0.2em] text-[#FFD400] transition-colors hover:border-[#FFD400] focus-ring"
                    >
                      <Phone className="h-3.5 w-3.5" aria-hidden />
                      <span>{CONTACT.phone}</span>
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={revealPhone}
                      onMouseEnter={() => play("tick")}
                      data-cursor-label="reveal phone"
                      className="group flex w-full items-center justify-center gap-2 border border-white/20 bg-[#141414] px-4 py-2 font-mono text-xs uppercase tracking-[0.2em] text-[#F4F1EA] transition-colors hover:border-[#FFD400] hover:text-[#FFD400] focus-ring"
                    >
                      <Phone className="h-3.5 w-3.5" aria-hidden />
                      <span>Reveal Phone Number</span>
                    </button>
                  )}

                  <a
                    href={CONTACT.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => play("tick")}
                    data-cursor-label="resume"
                    className="group flex w-full items-center justify-center gap-2 border border-white/20 bg-[#141414] px-4 py-2 font-mono text-xs uppercase tracking-[0.2em] text-[#F4F1EA] transition-colors hover:border-[#FFD400] hover:text-[#FFD400] focus-ring"
                  >
                    <FileText className="h-3.5 w-3.5" aria-hidden />
                    <span>View Detailed Resume</span>
                  </a>
                </div>
              </Reveal>
            </div>

            {/* Social links */}
            <div className="order-3 lg:order-none lg:col-start-1 lg:col-span-7 lg:row-start-2 lg:self-end">
              <Reveal delay={0.35}>
                <nav aria-label="Social links" className="flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-[#A3A3A3]">
                  {CONTACT.links.map((link, i) => {
                    const isMail = link.href.startsWith("mailto:");
                    const available = hasLink(link.href);
                    return (
                      <span key={link.label} className="flex items-center gap-3">
                        {i > 0 && (
                          <span aria-hidden className="text-[#A3A3A3]">
                            ·
                          </span>
                        )}
                        {available ? (
                          <a
                            href={link.href}
                            onMouseEnter={() => play("tick")}
                            data-cursor-label={link.label.toLowerCase()}
                            className="group/link flex items-center gap-2 border-b border-transparent font-mono text-xs uppercase tracking-[0.25em] text-[#F4F1EA]/70 transition-colors duration-200 hover:border-[#FFD400] hover:text-[#FFD400] sm:text-sm"
                            {...(!isMail
                              ? { target: "_blank", rel: "noopener noreferrer" }
                              : {})}
                          >
                            <span
                              aria-hidden
                              className="h-1 w-1 rounded-full bg-[#A3A3A3] transition-colors duration-200 group-hover/link:bg-[#FFD400]"
                            />
                            <span className="inline-block transition-transform duration-200 group-hover/link:-translate-y-0.5">
                              {link.label}
                            </span>
                          </a>
                        ) : (
                          <span
                            aria-disabled="true"
                            className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#A3A3A3]/60 cursor-not-allowed"
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

      <footer className="env-paper paper-texture relative w-full border-t border-black/10 py-10 sm:py-14">
        <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            {/* Left Column: Signoff + Sound toggle */}
            <div className="max-w-xl">
              <p className="font-mono text-xs italic leading-relaxed text-[#2a2a2a]/85 sm:text-sm">
                {CONTACT.signoff}
              </p>
              <button
                type="button"
                onClick={handleMuteClick}
                aria-label={muted ? "Unmute sound" : "Mute sound"}
                data-cursor-label={muted ? "unmute" : "mute"}
                className="group mt-5 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.2em] text-[#2a2a2a]/70 hover:text-[#1738D5] transition-colors cursor-pointer"
              >
                {muted ? (
                  <VolumeX className="h-3.5 w-3.5" />
                ) : (
                  <Volume2 className="h-3.5 w-3.5" />
                )}
                <span>{muted ? "Sound Off" : "Sound On"}</span>
              </button>
            </div>

            {/* Right block: on mobile the arrow lives on the LEFT edge as its own
                button, with "Pankaj Gupta" / "Return to Top" text on the right.
                On desktop it collapses back into one inline button. */}
            <div className="flex w-full flex-row items-center justify-between gap-3 md:w-auto md:flex-col md:items-end">
              {/* Standalone arrow — mobile only, left side of this row */}
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                aria-label="Return to top"
                className="group flex items-center justify-center text-[#2a2a2a]/70 hover:text-[#1738D5] transition-colors cursor-pointer md:hidden"
              >
                <span className="text-xl transition-transform group-hover:-translate-y-0.5">↑</span>
              </button>

              <div className="flex flex-col items-end gap-3">
                <p className="hand-display text-3xl text-[#1738D5] sm:text-5xl whitespace-nowrap">
                  {CONTACT.signature}
                </p>

                {/* Desktop: single inline button, arrow + label together */}
                <button
                  type="button"
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="group hidden items-center gap-1.5 font-mono text-xs uppercase tracking-[0.2em] text-[#2a2a2a]/70 hover:text-[#1738D5] transition-colors cursor-pointer md:flex"
                >
                  <span className="transition-transform group-hover:-translate-y-0.5">↑</span>
                  <span>Return to Top</span>
                </button>

                {/* Mobile: text-only label (arrow already stands alone on the left) */}
                <button
                  type="button"
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="font-mono text-xs uppercase tracking-[0.2em] text-[#2a2a2a]/70 hover:text-[#1738D5] transition-colors cursor-pointer md:hidden"
                >
                  Return to Top
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>

    </section>
  );
}
