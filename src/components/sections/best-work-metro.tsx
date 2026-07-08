"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CountUp } from "@/components/sections/_shared";
import { METRO_STATIONS, METRO_INTRO, type MetroStation } from "@/lib/data";
import { useSound } from "@/hooks/use-sound";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { getLenis } from "@/lib/lenis-instance";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ============================================================
   SECTION 04 — BEST WORK / DELHI METRO
   Gamified horizontal metro track with pinned GSAP scroll,
   step-out deep-dive overlays, keyboard nav, Hindi announcement
   ticker, door-chime SFX. Degrades to a vertical stacked grid
   below 1024px or when prefers-reduced-motion is set.
   ============================================================ */
export default function BestWorkMetro() {
  const { play } = useSound();
  const reduced = usePrefersReducedMotion();

  const [isDesktop, setIsDesktop] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [openStationId, setOpenStationId] = useState<string | null>(null);
  const [inView, setInView] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const outerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const trainRef = useRef<HTMLDivElement>(null);

  // Latest active index + play ref so the GSAP onUpdate closure can read
  // fresh values without re-subscribing on every render.
  const progressRef = useRef(0);
  const activeRef = useRef(0);
  const playRef = useRef(play);

  // Keep playRef in sync with the latest play closure without touching refs
  // during render (which would trip react-hooks/refs).
  useEffect(() => {
    playRef.current = play;
  }, [play]);

  const showPinned = isDesktop && !reduced;

  const openStation =
    METRO_STATIONS.find((s) => s.id === openStationId) ?? null;
  const nextStation =
    METRO_STATIONS[(activeIndex + 1) % METRO_STATIONS.length];

  /* ---- desktop breakpoint detection ---- */
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  /* ---- section-in-view tracking for keyboard nav ---- */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.15 }
    );
    io.observe(section);
    return () => io.disconnect();
  }, []);

  /* ---- GSAP pinned horizontal track (desktop + not reduced) ---- */
  useEffect(() => {
    if (!showPinned) return;
    const outer = outerRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!outer || !viewport || !track) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const getDistance = () =>
        Math.max(0, track.scrollWidth - window.innerWidth);

      gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: outer,
          start: "top top",
          end: () => "+=" + (getDistance() + window.innerHeight),
          scrub: 1,
          pin: viewport,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            progressRef.current = self.progress;
            const idx = Math.min(
              METRO_STATIONS.length - 1,
              Math.floor(self.progress * METRO_STATIONS.length)
            );
            if (idx !== activeRef.current) {
              activeRef.current = idx;
              setActiveIndex(idx);
              playRef.current("door");
            }
            // Train marker ● travels along the blue line with progress.
            if (trainRef.current) {
              const tx = self.progress * (window.innerWidth - 40);
              trainRef.current.style.transform = `translate3d(${tx}px, -50%, 0)`;
            }
          },
          onLeaveBack: () => {
            // Reset to the first station when scrolling back above the section.
            if (activeRef.current !== 0) {
              activeRef.current = 0;
              setActiveIndex(0);
            }
            if (trainRef.current) {
              trainRef.current.style.transform = "translate3d(0, -50%, 0)";
            }
          },
        },
      });

      ScrollTrigger.refresh();
    }, outer);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      ctx.revert();
    };
  }, [showPinned]);

  /* ---- keyboard nav (←/→) active only when section in view + pinned ---- */
  const scrollToStation = useCallback((idx: number) => {
    const outer = outerRef.current;
    const track = trackRef.current;
    if (!outer || !track) return;
    const outerTop = outer.getBoundingClientRect().top + window.scrollY;
    const distance = Math.max(0, track.scrollWidth - window.innerWidth);
    const totalScroll = distance + window.innerHeight;
    const stationScroll = totalScroll * (idx / METRO_STATIONS.length);
    const targetTop = outerTop + stationScroll;
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(targetTop, { duration: 1.2 });
    } else {
      window.scrollTo({ top: targetTop, behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    if (!inView || !showPinned || openStationId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      e.preventDefault();
      const dir = e.key === "ArrowRight" ? 1 : -1;
      const target = Math.max(
        0,
        Math.min(METRO_STATIONS.length - 1, activeRef.current + dir)
      );
      if (target === activeRef.current) return;
      playRef.current("blip");
      scrollToStation(target);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [inView, showPinned, openStationId, scrollToStation]);

  /* ---- Esc closes the deep-dive overlay ---- */
  useEffect(() => {
    if (!openStationId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenStationId(null);
        playRef.current("confirm");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openStationId]);

  /* ---- handlers ---- */
  const enterMetro = () => {
    playRef.current("door");
    const outer = outerRef.current;
    if (!outer) return;
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(outer, { duration: 1.2 });
    } else {
      outer.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const openDeepDive = (station: MetroStation) => {
    setOpenStationId(station.id);
    play("door");
  };

  const closeDeepDive = () => {
    setOpenStationId(null);
    play("confirm");
  };

  const returnToTop = () => {
    const sec = sectionRef.current;
    if (!sec) return;
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(sec, { duration: 1.2 });
    } else {
      sec.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Footer parts split on "·" so we can render the "Return to Platform"
  // segment as a button.
  const footerParts = METRO_INTRO.footer
    .split("·")
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <section
      ref={sectionRef}
      id="best-work"
      className="relative w-full bg-[#0A0A0A]"
    >
      {/* CSS keyframes for the Hindi ticker marquee */}
      <style>{`
        @keyframes baazMetroTicker {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(-50%, 0, 0); }
        }
      `}</style>

      {/* ====================================================
          A. INTRO PANEL
          ==================================================== */}
      <div className="mx-auto w-full max-w-[1200px] px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
        {/* Index header — mirrors SectionShell */}
        <motion.div
          className="mb-10 flex items-baseline gap-3 border-b border-white/10 pb-3 font-mono text-[11px] uppercase tracking-widest text-[#6B6B6B] sm:mb-14"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <span className="text-[#FFD400]">04</span>
          <span className="text-[#F4F1EA]/70">BEST WORK / DELHI METRO</span>
          <span className="ml-auto hidden h-px flex-1 bg-white/10 sm:block" />
          <span className="hidden sm:inline">{"// baaz.sys"}</span>
        </motion.div>

        {/* Metro logo mark + blinking "Next train: NOW" */}
        <div className="mb-10 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-3" data-cursor-label={METRO_INTRO.line}>
            <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#FFD400] bg-[#FFD400] text-[#0A0A0A]">
              <span className="font-mono text-sm font-bold">M</span>
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#FFD400]">
              {METRO_INTRO.line}
            </span>
          </div>
          <span className="ml-auto flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-[#F4F1EA]/70">
            <span className="inline-block h-2 w-2 rounded-full bg-[#FFD400] blink" />
            Next train: NOW
          </span>
        </div>

        {/* Hindi heading */}
        <motion.h2
          className="font-deva text-4xl font-bold leading-tight text-[#F4F1EA] sm:text-6xl"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.8, ease: EASE }}
          data-cursor-label={METRO_INTRO.english}
        >
          {METRO_INTRO.hindi}
        </motion.h2>

        {/* English subtitle */}
        <motion.p
          className="mt-4 font-display text-2xl font-bold tracking-tight text-[#F4F1EA]/60 sm:text-3xl"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
        >
          {METRO_INTRO.english}
        </motion.p>

        {/* CTA + sub copy */}
        <motion.div
          className="mt-12 flex flex-wrap items-center gap-6"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
        >
          <button
            type="button"
            onClick={enterMetro}
            onMouseEnter={() => play("tick")}
            data-cursor-label="enter metro"
            className="group inline-flex items-center gap-3 border-2 border-[#FFD400] bg-[#FFD400] px-6 py-3.5 font-mono text-xs uppercase tracking-[0.3em] text-[#0A0A0A] transition-colors hover:bg-transparent hover:text-[#FFD400] focus-ring"
          >
            <span className="h-2 w-2 rounded-full bg-[#0A0A0A] transition-colors group-hover:bg-[#FFD400]" />
            {METRO_INTRO.cta}
            <span aria-hidden>→</span>
          </button>

          <p className="max-w-md font-mono text-xs uppercase tracking-[0.18em] text-[#6B6B6B]">
            {`// ${METRO_STATIONS.length} stations · ${METRO_STATIONS.length} case studies · scroll to ride`}
          </p>
        </motion.div>
      </div>

      {/* ====================================================
          B. PINNED HORIZONTAL TRACK (desktop) — OR STACKED (mobile/reduced)
          ==================================================== */}
      {showPinned ? (
        <div ref={outerRef} className="relative w-full">
          <div
            ref={viewportRef}
            className="relative h-screen w-full overflow-hidden bg-[#0A0A0A]"
          >
            {/* Yellow horizontal BLUE LINE through the middle */}
            <div
              aria-hidden
              className="pointer-events-none absolute left-0 right-0 top-1/2 z-0 h-px -translate-y-1/2 bg-[#FFD400]/70"
            />
            {/* Line endcaps */}
            <span
              aria-hidden
              className="pointer-events-none absolute left-0 top-1/2 z-0 h-3 w-1 -translate-y-1/2 bg-[#FFD400]"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute right-0 top-1/2 z-0 h-3 w-1 -translate-y-1/2 bg-[#FFD400]"
            />

            {/* Train marker ● — travels along the blue line with scroll progress */}
            <div
              ref={trainRef}
              aria-hidden
              className="pointer-events-none absolute left-4 top-1/2 z-30 h-5 w-5 -translate-y-1/2 rounded-full bg-[#FFD400]"
              style={{
                transform: "translate3d(0, -50%, 0)",
                boxShadow: "0 0 18px rgba(255,212,0,0.55)",
              }}
            />

            {/* Top status bar */}
            <div className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between gap-4 border-b border-white/10 bg-[#0A0A0A]/80 px-5 py-3 backdrop-blur-sm sm:px-8">
              <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em]">
                <span className="inline-block h-2 w-2 rounded-full bg-[#FFD400] blink" />
                <span className="text-[#FFD400]">{"● BLUE LINE"}</span>
                <span className="text-[#6B6B6B]">/</span>
                <span className="text-[#F4F1EA]/80">DELHI METRO</span>
              </div>
              <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em]">
                <span className="hidden text-[#6B6B6B] sm:inline">
                  ← → to navigate
                </span>
                <span className="hidden text-[#6B6B6B] sm:inline">/</span>
                <span className="text-[#F4F1EA]/70 tabular-nums">
                  {String(activeIndex + 1).padStart(2, "0")} / 0
                  {METRO_STATIONS.length}
                </span>
              </div>
            </div>

            {/* Horizontal track of station panels */}
            <div
              ref={trackRef}
              className="absolute inset-0 z-10 flex will-change-transform"
            >
              {METRO_STATIONS.map((station, i) => (
                <StationPanel
                  key={station.id}
                  station={station}
                  index={i}
                  total={METRO_STATIONS.length}
                  active={i === activeIndex}
                  onStepOut={() => openDeepDive(station)}
                />
              ))}
            </div>

            {/* Bottom Hindi announcement ticker */}
            <div className="absolute bottom-0 left-0 right-0 z-20 overflow-hidden border-t border-white/10 bg-[#0A0A0A]/80 py-2 backdrop-blur-sm">
              <div
                className="marquee-track whitespace-nowrap will-change-transform"
                style={{
                  animation: reduced
                    ? "none"
                    : "baazMetroTicker 32s linear infinite",
                }}
              >
                {Array.from({ length: 6 }).map((_, i) => (
                  <span
                    key={i}
                    className="font-deva text-sm text-[#F4F1EA]/80"
                  >
                    <span className="px-6">
                      अगला स्टेशन:{" "}
                      <span className="text-[#FFD400]">
                        {nextStation.name}
                      </span>
                      <span className="px-3 text-[#6B6B6B]">·</span>
                      Next station: {nextStation.name}
                      <span className="px-3 text-[#6B6B6B]">·</span>
                      <span className="text-[#FFD400]">{"● BLUE LINE"}</span>
                      <span className="px-3 text-[#6B6B6B]">·</span>
                      दिल्ली मेट्रो
                    </span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ---- Mobile / reduced-motion: stacked station cards ---- */
        <div className="mx-auto w-full max-w-[1200px] px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
          <div className="mb-8 flex items-baseline gap-3 border-b border-white/10 pb-3 font-mono text-[11px] uppercase tracking-widest text-[#6B6B6B]">
            <span className="text-[#FFD400]">{"● BLUE LINE"}</span>
            <span className="text-[#F4F1EA]/70">/ DELHI METRO</span>
            <span className="ml-auto hidden h-px flex-1 bg-white/10 sm:block" />
            <span className="hidden sm:inline">{"// stacked"}</span>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {METRO_STATIONS.map((station, i) => (
              <StackedStationCard
                key={station.id}
                station={station}
                index={i}
                total={METRO_STATIONS.length}
                onStepOut={() => openDeepDive(station)}
              />
            ))}
          </div>
        </div>
      )}

      {/* ====================================================
          F. FOOTER — mono, muted, wrapping, · separators
          ==================================================== */}
      <div className="mx-auto w-full max-w-[1200px] px-5 py-12 sm:px-8 sm:py-16 lg:px-12">
        <div className="border-t border-white/10 pt-6">
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[#6B6B6B]">
            {footerParts.map((part, i) => {
              const isReturn = part
                .toLowerCase()
                .includes("return to platform");
              return (
                <span
                  key={i}
                  className="inline-flex items-center gap-2"
                >
                  {i > 0 && <span className="text-[#FFD400]/50">·</span>}
                  {isReturn ? (
                    <button
                      type="button"
                      onClick={returnToTop}
                      data-cursor-label="return to platform"
                      className="text-[#FFD400] underline-offset-2 transition-colors hover:text-[#F4F1EA] hover:underline"
                    >
                      {part}
                    </button>
                  ) : (
                    <span>{part}</span>
                  )}
                </span>
              );
            })}
          </p>
        </div>
      </div>

      {/* ====================================================
          D. STEP-OUT DEEP-DIVE OVERLAY
          ==================================================== */}
      <AnimatePresence>
        {openStation && (
          <DeepDiveOverlay
            key={openStation.id}
            station={openStation}
            onClose={closeDeepDive}
            index={METRO_STATIONS.findIndex((s) => s.id === openStation.id)}
            total={METRO_STATIONS.length}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

/* ============================================================
   Station panel — lives inside the pinned horizontal track
   ============================================================ */
function StationPanel({
  station,
  index,
  total,
  active,
  onStepOut,
}: {
  station: MetroStation;
  index: number;
  total: number;
  active: boolean;
  onStepOut: () => void;
}) {
  const { play } = useSound();

  return (
    <article
      className="relative flex h-full w-[85vw] shrink-0 flex-col justify-between px-10 py-24 sm:px-16"
      data-cursor-label={station.name}
    >
      {/* Station marker dot on the blue line (vertical middle) */}
      <span
        aria-hidden
        className={`absolute left-1/2 top-1/2 z-20 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 transition-all duration-300 ${
          active
            ? "scale-[1.6] border-[#FFD400] bg-[#FFD400]"
            : "border-[#FFD400] bg-[#0A0A0A]"
        }`}
        style={{
          boxShadow: active ? "0 0 16px rgba(255,212,0,0.7)" : "none",
        }}
      />

      {/* TOP HALF — index, type pill, signboard, station name */}
      <div className="flex flex-col items-start gap-5">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-mono text-[11px] tabular-nums uppercase tracking-[0.25em] text-[#6B6B6B]">
            {String(index + 1).padStart(2, "0")} / 0{total}
          </span>
          <span className="border border-[#FFD400]/60 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.25em] text-[#FFD400]">
            {station.type}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#F4F1EA]/50">
            {`// ${station.tag}`}
          </span>
        </div>

        {/* Platform signboard — BLUE LINE label, hindi name, platform no. */}
        <div className="border border-white/15 bg-[#0E0E0E] px-4 py-3">
          <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#FFD400]">
            {"● BLUE LINE"}
          </p>
          <p className="mt-1 font-deva text-lg font-bold text-[#F4F1EA]">
            {station.name}
          </p>
          <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-[#6B6B6B]">
            {`Platform ${index + 1}`}
          </p>
        </div>

        {/* Big station name */}
        <h3
          className={`font-display text-6xl font-bold leading-[0.92] tracking-tight transition-colors duration-300 lg:text-8xl ${
            active ? "text-[#F4F1EA]" : "text-[#F4F1EA]/60"
          }`}
        >
          {station.name}
        </h3>
      </div>

      {/* BOTTOM HALF — metrics + Step Out button */}
      <div className="flex flex-col gap-7">
        <ul className="grid grid-cols-3 gap-4" role="list">
          {station.metrics.map((m) => (
            <li key={m.label} className="border-l border-white/15 pl-3">
              <p className="font-display text-3xl font-bold leading-none tracking-tight text-[#FFD400] lg:text-5xl">
                {m.display ? (
                  <CountUp
                    target={m.value}
                    display={m.display}
                    duration={1.2}
                  />
                ) : (
                  <CountUp
                    target={m.value}
                    suffix={m.suffix ?? ""}
                    duration={1.2}
                  />
                )}
              </p>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#6B6B6B]">
                {m.label}
              </p>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={onStepOut}
          onMouseEnter={() => play("tick")}
          data-cursor-label="step out"
          className="group inline-flex w-fit items-center gap-3 border-2 border-[#FFD400] bg-transparent px-5 py-3 font-mono text-xs uppercase tracking-[0.3em] text-[#FFD400] transition-colors hover:bg-[#FFD400] hover:text-[#0A0A0A] focus-ring"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#FFD400] transition-colors group-hover:bg-[#0A0A0A]" />
          Step Out
          <span aria-hidden>↗</span>
        </button>
      </div>
    </article>
  );
}

/* ============================================================
   Stacked station card — mobile / reduced-motion fallback
   ============================================================ */
function StackedStationCard({
  station,
  index,
  total,
  onStepOut,
}: {
  station: MetroStation;
  index: number;
  total: number;
  onStepOut: () => void;
}) {
  const reduced = usePrefersReducedMotion();
  const { play } = useSound();

  return (
    <motion.article
      className="relative border border-white/10 bg-[#0E0E0E] p-6 sm:p-8"
      initial={reduced ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.6, delay: index * 0.06, ease: EASE }}
      onMouseEnter={() => play("tick")}
      data-cursor-label="station"
    >
      {/* Top: yellow line + marker */}
      <div className="mb-5 flex items-center gap-3">
        <span className="inline-block h-3 w-3 rounded-full border-2 border-[#FFD400] bg-[#FFD400]" />
        <span className="h-px flex-1 bg-[#FFD400]/60" />
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#FFD400]">
          {"● BLUE LINE"}
        </span>
      </div>

      {/* Index + type pill + tag */}
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <span className="font-mono text-[11px] tabular-nums uppercase tracking-[0.25em] text-[#6B6B6B]">
          {String(index + 1).padStart(2, "0")} / 0{total}
        </span>
        <span className="border border-[#FFD400]/60 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.25em] text-[#FFD400]">
          {station.type}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#F4F1EA]/50">
          {`// ${station.tag}`}
        </span>
      </div>

      {/* Platform signboard */}
      <div className="mb-5 border border-white/15 bg-[#0A0A0A] px-4 py-3">
        <p className="font-deva text-xl font-bold text-[#F4F1EA]">
          {station.name}
        </p>
        <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[#6B6B6B]">
          {`Platform ${index + 1} · BLUE LINE`}
        </p>
      </div>

      {/* Big station name */}
      <h3 className="font-display text-4xl font-bold leading-[0.92] tracking-tight text-[#F4F1EA] sm:text-5xl">
        {station.name}
      </h3>

      {/* Metrics */}
      <ul className="mt-6 grid grid-cols-3 gap-3" role="list">
        {station.metrics.map((m) => (
          <li key={m.label} className="border-l border-white/15 pl-3">
            <p className="font-display text-2xl font-bold leading-none tracking-tight text-[#FFD400] sm:text-3xl">
              {m.display ? (
                <CountUp
                  target={m.value}
                  display={m.display}
                  duration={1.2}
                />
              ) : (
                <CountUp
                  target={m.value}
                  suffix={m.suffix ?? ""}
                  duration={1.2}
                />
              )}
            </p>
            <p className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.2em] text-[#6B6B6B]">
              {m.label}
            </p>
          </li>
        ))}
      </ul>

      {/* Step Out button */}
      <button
        type="button"
        onClick={onStepOut}
        data-cursor-label="step out"
        className="mt-6 inline-flex w-fit items-center gap-3 border-2 border-[#FFD400] bg-transparent px-5 py-3 font-mono text-xs uppercase tracking-[0.3em] text-[#FFD400] transition-colors hover:bg-[#FFD400] hover:text-[#0A0A0A] focus-ring"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-[#FFD400]" />
        Step Out
        <span aria-hidden>↗</span>
      </button>
    </motion.article>
  );
}

/* ============================================================
   Deep-dive overlay — Problem / Strategy / Impact
   ============================================================ */
function DeepDiveOverlay({
  station,
  onClose,
  index,
  total,
}: {
  station: MetroStation;
  onClose: () => void;
  index: number;
  total: number;
}) {
  const blocks: { label: string; text: string }[] = [
    { label: "Problem", text: station.problem },
    { label: "Strategy", text: station.strategy },
    { label: "Impact", text: station.impact },
  ];

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: EASE }}
      onClick={onClose}
      data-cursor-label="close"
      role="dialog"
      aria-modal="true"
      aria-label={`${station.name} — case study deep dive`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#0A0A0A]/90 backdrop-blur-md"
        aria-hidden
      />

      {/* Panel — yellow border, scrollable */}
      <motion.div
        className="relative z-10 max-h-[90vh] w-full max-w-4xl overflow-y-auto border-2 border-[#FFD400] bg-[#0E0E0E] scroll-styled"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.4, ease: EASE }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky header — "● BLUE LINE // {station}" */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#FFD400]/40 bg-[#0E0E0E] px-6 py-3 sm:px-8">
          <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em]">
            <span className="inline-block h-2 w-2 rounded-full bg-[#FFD400] blink" />
            <span className="text-[#FFD400]">{"● BLUE LINE"}</span>
            <span className="text-[#6B6B6B]">{"//"}</span>
            <span className="text-[#F4F1EA]/80">{station.name}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center border border-white/15 text-[#F4F1EA] transition-colors hover:border-[#FF3B30] hover:text-[#FF3B30]"
            aria-label="Close deep dive"
            data-cursor-label="close"
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        </div>

        <div className="px-6 py-8 sm:px-8 sm:py-10">
          {/* Index + type pill + tag */}
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span className="font-mono text-[11px] tabular-nums uppercase tracking-[0.25em] text-[#6B6B6B]">
              {String(index + 1).padStart(2, "0")} / 0{total}
            </span>
            <span className="border border-[#FFD400]/60 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.25em] text-[#FFD400]">
              {station.type}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#F4F1EA]/50">
              {`// ${station.tag}`}
            </span>
          </div>

          {/* Station name + Hindi subtitle */}
          <h3 className="font-display text-5xl font-bold leading-[0.92] tracking-tight text-[#F4F1EA] sm:text-6xl lg:text-7xl">
            {station.name}
          </h3>
          <p className="mt-3 font-deva text-xl text-[#F4F1EA]/70">
            {station.name}
          </p>

          {/* Metrics — big count-up at top */}
          <ul
            className="mt-8 grid grid-cols-3 gap-6 border-t border-white/10 pt-7"
            role="list"
          >
            {station.metrics.map((m, mi) => (
              <li
                key={m.label}
                className={mi === 1 ? "sm:translate-y-3" : ""}
              >
                <p className="font-display text-4xl font-bold leading-none tracking-tight text-[#FFD400] sm:text-6xl">
                  {m.display ? (
                    <CountUp
                      target={m.value}
                      display={m.display}
                      duration={1.4}
                    />
                  ) : (
                    <CountUp
                      target={m.value}
                      suffix={m.suffix ?? ""}
                      duration={1.4}
                    />
                  )}
                </p>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[#6B6B6B]">
                  {m.label}
                </p>
              </li>
            ))}
          </ul>

          {/* Problem → Strategy → Impact */}
          <div className="mt-10 space-y-8">
            {blocks.map((block) => (
              <div
                key={block.label}
                className="border-l-2 border-[#FFD400] pl-5"
              >
                <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.3em] text-[#FFD400]">
                  {block.label}
                </p>
                <p className="font-display text-base leading-relaxed text-[#F4F1EA]/90 sm:text-lg">
                  {block.text}
                </p>
              </div>
            ))}
          </div>

          {/* Return to Platform link */}
          <button
            type="button"
            onClick={onClose}
            className="mt-10 inline-flex items-center gap-2 border-t border-white/10 pt-5 font-mono text-[10px] uppercase tracking-[0.3em] text-[#6B6B6B] transition-colors hover:text-[#FFD400]"
            data-cursor-label="return to platform"
          >
            <span aria-hidden>←</span>
            Return to Platform
          </button>

          {/* Close hint */}
          <p className="mt-6 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-[#6B6B6B]">
            CLICK ANYWHERE TO CLOSE
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
