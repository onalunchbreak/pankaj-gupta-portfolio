"use client";
import { useState, type KeyboardEvent } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { useSound } from "@/hooks/use-sound";
import { getLenis } from "@/lib/lenis-instance";
import { NAV_INDEX } from "@/lib/data";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Nav Index — Section "02 — Index".
 *
 * Editorial table-of-contents. Black environment after the blue hero.
 * Six oversized handwritten Caveat links (`.hand-display` text-5xl→7xl)
 * with mono annotations to their right.
 */
export default function NavIndex() {
  const reduced = usePrefersReducedMotion();
  const { play } = useSound();
  const [hovered, setHovered] = useState<number | null>(null);

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

      <div className="relative mx-auto w-full max-w-[1200px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
        {/* We use a flex-col layout on mobile, and CSS Grid on desktop. */}
        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[1fr_auto] lg:items-start lg:gap-x-16 lg:gap-y-8">
          
          {/* ---- Section header (order-1) ---- */}
          <motion.div
            className="order-1 col-span-full border-b border-white/10 pb-3 font-mono text-[11px] uppercase tracking-widest text-white lg:mb-4"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <div className="flex items-baseline gap-3">
              <span className="text-[#FFD400] font-bold">{NAV_INDEX.index}</span>
              <span className="text-white font-bold">{NAV_INDEX.title}</span>
              <span className="ml-auto hidden h-px flex-1 bg-white/10 sm:block" />
              <span className="hidden sm:inline text-white/90">{"// table of contents"}</span>
            </div>
          </motion.div>

          {/* ---- Quick note card (Vertically Centered in right column) ---- */}
          <motion.aside
            className="order-2 relative mx-auto w-full max-w-[280px] sm:max-w-[300px] lg:order-none lg:col-start-2 lg:row-start-3 lg:self-center lg:my-auto lg:sticky lg:top-36"
            initial={{ opacity: 0, y: 20, rotate: 0 }}
            whileInView={{ opacity: 1, y: 0, rotate: -3 }}
            viewport={{ once: true, margin: "-12% 0px" }}
            transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
            aria-label="Quick note"
          >
            {/* "tape" pieces */}
            <span
              aria-hidden
              className="absolute -top-2 left-6 z-10 h-5 w-16 -rotate-6 bg-[#1738D5]/70 mix-blend-normal"
            />
            <span
              aria-hidden
              className="absolute -top-2 right-6 z-10 h-5 w-14 rotate-6 bg-[#1738D5]/70 mix-blend-normal"
            />
            <div className="env-paper paper-texture relative w-full rounded-[2px] border border-[#1a1a1a]/30 p-5 shadow-[6px_6px_0_0_rgba(10,10,10,0.6)]">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#1a1a1a]/70">
                {"// quick note"}
              </p>
              <blockquote className="hand-display mt-3 text-xl leading-tight text-[#1a1a1a] sm:text-2xl">
                {NAV_INDEX.quickNote}
              </blockquote>
            </div>
          </motion.aside>

          {/* ---- Top Table of Contents Hint / Instruction ---- */}
          <motion.div
            className="order-3 lg:order-none lg:col-span-full lg:row-start-2 text-center font-mono text-[11px] uppercase tracking-[0.25em] text-white/80 sm:text-[12px]"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            {NAV_INDEX.bottomMicrocopy}
          </motion.div>

          {/* ---- The link list ---- */}
          <nav
            className="order-4 lg:order-none lg:col-start-1 lg:row-start-3 group/list relative"
            aria-label={NAV_INDEX.title}
            onMouseLeave={() => setHovered(null)}
          >
            <ul className="flex flex-col gap-3 sm:gap-4">
              {NAV_INDEX.items.map((item, i) => {
                const isHot = hovered === i;
                const dim = hovered !== null && !isHot;
                const shift =
                  i % 2 === 0 ? "-translate-x-1 sm:-translate-x-2" : "translate-x-1 sm:translate-x-2";
                const rot = i % 2 === 0 ? "-rotate-[0.6deg]" : "rotate-[0.6deg]";
                return (
                  <li key={item.target} className={`relative ${shift} ${rot}`}>
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
                        dim ? "opacity-65" : "opacity-100"
                      }`}
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-12% 0px" }}
                      transition={{ duration: 0.6, delay: i * 0.07, ease: EASE }}
                    >
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-5">
                        {/* label — oversized handwritten, brighter default for contrast */}
                        <span className="hand-display flex items-baseline gap-2 text-4xl text-white transition-all duration-300 group-hover/link:text-[#FFD400] group-hover/link:translate-x-1 sm:text-5xl lg:text-6xl sm:whitespace-nowrap">
                          {/* Serial numbers recolored to high-visibility yellow (#FFD400) */}
                          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#FFD400] font-bold transition-colors duration-300 group-hover/link:text-[#FFD400]">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span>{item.label}</span>
                          <ArrowUpRight
                            className="hidden h-7 w-7 -translate-y-1 text-[#FFD400] opacity-0 transition-all duration-300 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 sm:inline-block lg:h-9 lg:w-9"
                            aria-hidden
                          />
                        </span>
                        {/* annotation — mono */}
                        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-white transition-colors duration-300 group-hover/link:text-[#FFD400] sm:translate-y-1">
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
        </div>
      </div>
    </section>
  );
}
