"use client";
import { useRef, useState, type KeyboardEvent } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { useSound } from "@/hooks/use-sound";
import { getLenis } from "@/lib/lenis-instance";
import { NAV_INDEX } from "@/lib/data";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Nav Index — Section 02.
 *
 * Editorial table-of-contents. Black environment after the blue hero — cream
 * handwritten links, mono annotations. Each link is oversized Caveat, with a
 * staggered intentional misalignment (alternating translate-x). The group-
 * hover trick dims every sibling when the list is hovered; the focused link
 * brightens back to full cream and a yellow underline grows from the left.
 * Clicking dispatches a Lenis smooth-scroll to the target section. Hovering
 * plays "tick", clicking plays "confirm". A rotated paper-card with the
 * quickNote is offset to the side.
 */
export default function NavIndex() {
  const reduced = usePrefersReducedMotion();
  const { play } = useSound();
  const [hovered, setHovered] = useState<number | null>(null);

  const headerRef = useRef<HTMLDivElement>(null);

  const onNavigate = (target: string) => {
    play("confirm");
    const lenis = getLenis();
    const el = document.getElementById(target);
    if (lenis && el) {
      lenis.scrollTo(el, { offset: -10 });
    } else if (el) {
      el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    }
  };

  const onKey = (e: KeyboardEvent<HTMLAnchorElement>, target: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onNavigate(target);
    }
  };

  return (
    <section
      id="nav-index"
      className="env-black relative w-full overflow-hidden"
      aria-labelledby="nav-index-title"
      data-cursor-label="Index"
    >
      {/* subtle scanline texture for editorial density */}
      <div className="bg-scanlines pointer-events-none absolute inset-0 opacity-40" aria-hidden />

      <div className="relative mx-auto w-full max-w-[1200px] px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
        {/* ---- Section header (mirrors SectionShell) ---- */}
        <motion.div
          ref={headerRef}
          className="mb-10 flex items-baseline gap-3 border-b border-white/10 pb-3 font-mono text-[11px] uppercase tracking-widest text-[#6B6B6B] sm:mb-16"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <span className="text-[#FFD400]">{NAV_INDEX.index}</span>
          <span className="text-[#F4F1EA]/70">{NAV_INDEX.title}</span>
          <span className="ml-auto hidden h-px flex-1 bg-white/10 sm:block" />
          <span className="hidden sm:inline">{"// table of contents"}</span>
        </motion.div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_auto] lg:items-start lg:gap-16">
          {/* ---- The link list ---- */}
        <nav
          className="group/list relative"
          aria-label={NAV_INDEX.title}
          onMouseLeave={() => setHovered(null)}
        >
          <ul className="flex flex-col gap-3 sm:gap-4">
            {NAV_INDEX.items.map((item, i) => {
              const isHot = hovered === i;
              const dim = hovered !== null && !isHot;
              // intentional misalignment — alternate slight translate-x + rotate,
              // kept small so the column still reads as a grid.
              const shift = i % 2 === 0 ? "-translate-x-1 sm:-translate-x-2" : "translate-x-1 sm:translate-x-2";
              const rot = i % 2 === 0 ? "-rotate-[0.6deg]" : "rotate-[0.6deg]";
              return (
                <li
                  key={item.target}
                  className={`relative ${shift} ${rot}`}
                >
                  <motion.a
                    href={`#${item.target}`}
                    tabIndex={0}
                    data-cursor-label={`${item.label} →`}
                    onMouseEnter={() => {
                      setHovered(i);
                      play("tick");
                    }}
                    onFocus={() => setHovered(i)}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(item.target);
                    }}
                    onKeyDown={(e) => onKey(e, item.target)}
                    className={`group/link relative block w-full cursor-pointer rounded-none px-1 py-2 outline-none transition-opacity duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFD400] ${
                      dim ? "opacity-35" : "opacity-100"
                    }`}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-12% 0px" }}
                    transition={{ duration: 0.6, delay: i * 0.07, ease: EASE }}
                  >
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-5">
                      {/* label — oversized handwritten */}
                      <span className="hand-display flex items-baseline gap-2 text-5xl text-[#F7F4ED] transition-colors duration-300 group-hover/link:text-[#FFD400] sm:text-6xl lg:text-7xl">
                        <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#6B6B6B]">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span>{item.label}</span>
                        <ArrowUpRight
                          className="hidden h-7 w-7 -translate-y-1 text-[#FFD400] opacity-0 transition-opacity duration-300 group-hover/link:opacity-100 sm:inline-block lg:h-9 lg:w-9"
                          aria-hidden
                        />
                      </span>
                      {/* annotation — mono, muted, small */}
                      <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#6B6B6B] transition-colors duration-300 group-hover/link:text-[#F4F1EA]/70 sm:translate-y-1">
                        {item.annotation}
                      </span>
                    </div>

                    {/* yellow underline that grows from left on hover/focus */}
                    <span
                      aria-hidden
                      className="absolute -bottom-0.5 left-1 h-[2px] w-0 bg-[#FFD400] transition-[width] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/link:w-[calc(100%-0.5rem)]"
                    />
                  </motion.a>
                </li>
              );
            })}
          </ul>
        </nav>

          {/* ---- Quick note card (rotated paper, offset to the side) ---- */}
          <motion.aside
            className="relative mx-auto w-full max-w-[280px] sm:max-w-[300px] lg:sticky lg:top-24"
            initial={{ opacity: 0, y: 20, rotate: 0 }}
            whileInView={{ opacity: 1, y: 0, rotate: -3 }}
            viewport={{ once: true, margin: "-12% 0px" }}
            transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
            aria-label="Quick note"
          >
            {/* "tape" pieces */}
            <span
              aria-hidden
              className="absolute -top-2 left-6 z-10 h-5 w-16 -rotate-6 bg-[#FFD400]/70 mix-blend-normal"
            />
            <span
              aria-hidden
              className="absolute -top-2 right-6 z-10 h-5 w-14 rotate-6 bg-[#FFD400]/70 mix-blend-normal"
            />
            <div className="env-paper paper-texture relative w-full rounded-[2px] border border-[#1a1a1a]/30 p-5 shadow-[6px_6px_0_0_rgba(10,10,10,0.6)]">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#6B6B6B]">
                {"// quick note"}
              </p>
              <blockquote className="hand-display mt-3 text-xl leading-tight text-[#1a1a1a] sm:text-2xl">
                {NAV_INDEX.quickNote}
              </blockquote>
              <p className="mt-4 text-right font-mono text-[10px] uppercase tracking-[0.25em] text-[#6B6B6B]">
                — baaz
              </p>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
