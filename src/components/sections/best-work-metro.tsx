"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import gsap from "gsap";
import { CountUp } from "@/components/sections/_shared";
import ShareButton from "@/components/shell/share-button";
import {
  METRO_STATIONS,
  METRO_INTRO,
  type MetroStation,
  type CaseStudyBlock,
} from "@/lib/data";
import { useSound } from "@/hooks/use-sound";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { useBodyScrollLock } from "@/hooks/use-body-scroll-lock";
import { useFocusTrap } from "@/hooks/use-focus-trap";
import { useSessionStats } from "@/hooks/use-session-stats";
import { getLenis } from "@/lib/lenis-instance";

const EASE = [0.16, 1, 0.3, 1] as const;

const METRO_PHOTOS = [
  {
    src: "/images/metro/bml-speech.jpg",
    title: "KEYNOTE SPEAKER",
    caption: "HackBMU 6.0 · BML Munjal University",
  },
  {
    src: "/images/metro/teaching-tfi.jpg",
    title: "TEACHING VOLUNTEER",
    caption: "Python Programming · Teach For India",
  },
  {
    src: "/images/metro/cambridge-formal.jpg",
    title: "CAMBRIDGE RESEARCH APPRENTICE",
    caption: "University of Cambridge · Gonville & Caius College",
  },
  {
    src: "/images/metro/area83-team.jpg",
    title: "SENSEHQ PRODUCT OFFSITE",
    caption: "Product & Engineering Team Retreat · Area83",
  },
  {
    src: "/images/metro/paintball-team.jpg",
    title: "CEGIS OFFSITE",
    caption: "CEGIS Outdoor Tactical Challenge & Offsite",
  },
  {
    src: "/images/metro/teaching-ml.jpg",
    title: "APPLIED AI WORKSHOP",
    caption: "Teaching Machine Learning Foundations",
  },
  {
    src: "/images/metro/techtionary-event.jpg",
    title: "TECHTIONARY INITIATIVE",
    caption: "NeuralAI Open Innovation Event",
  },
];

const getValueFontSize = (display?: string, isMobileList = false, isModal = false) => {
  if (!display) {
    if (isMobileList) return "text-2xl sm:text-3xl";
    if (isModal) return "text-3xl sm:text-5xl";
    return "text-3xl lg:text-5xl";
  }

  const len = display.length;
  if (len > 12) {
    if (isMobileList) return "text-xs uppercase tracking-wider";
    if (isModal) return "text-base sm:text-2xl uppercase tracking-wider";
    return "text-sm lg:text-2xl uppercase tracking-wider";
  } else if (len > 7) {
    if (isMobileList) return "text-[11px] sm:text-xs uppercase tracking-wider";
    if (isModal) return "text-lg sm:text-3xl uppercase tracking-wider";
    return "text-base lg:text-3xl uppercase tracking-wider";
  } else {
    if (isMobileList) return "text-sm sm:text-base uppercase tracking-wider";
    if (isModal) return "text-xl sm:text-4xl uppercase tracking-wider";
    return "text-lg lg:text-4xl uppercase tracking-wider";
  }
};

/* ============================================================
   SECTION 04 — BEST WORK / DELHI METRO METRO
   Gamified horizontal metro track with pinned GSAP scroll,
   step-out deep-dive overlays, keyboard nav, Hindi announcement
   ticker, door-chime SFX. Degrades to a vertical stacked grid
   below 1024px or when prefers-reduced-motion is set.

   Station content (per spec Section 06, Pankaj re-personalisation):
   - Each station carries headline + caseStudy: CaseStudyBlock[]
     (each block has label / title / text) + extras + learning.
   - The deep-dive overlay exposes the full case study:
     headline (blockquote), caseStudy blocks as labelled sections,
     ALL metrics as CountUp grid, extras as labelled lists,
     learning as a highlighted note.
   - 6 stations: Bosch · Research Lab · Cambridge JBS · CEGIS ·
     SenseHQ · Mr. Onalunchbreak.
   - DELHI METRO branding (yellow line identity kept).
   ============================================================ */
export default function BestWorkMetro() {
  const { play } = useSound();
  const reduced = usePrefersReducedMotion();
  const openCaseStudy = useSessionStats((s) => s.openCaseStudy);

  const [isDesktop, setIsDesktop] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [openStationId, setOpenStationId] = useState<string | null>(null);
  const [inView, setInView] = useState(false);
  const [showKeyHint, setShowKeyHint] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const outerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const trainRef = useRef<HTMLDivElement>(null);

  // Latest active index + play ref so effects/closures can read fresh
  // values without re-subscribing on every render.
  const activeRef = useRef(0);
  const playRef = useRef(play);

  // Autoplay pause/resume bookkeeping.
  const isPausedRef = useRef(false);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Track the trigger button so focus can be restored when the deep-dive
  // overlay closes.
  const triggerRef = useRef<HTMLElement | null>(null);
  const deepDivePanelRef = useRef<HTMLDivElement | null>(null);

  // Keep playRef in sync with the latest play closure without touching refs
  // during render (which would trip react-hooks/refs).
  useEffect(() => {
    playRef.current = play;
  }, [play]);

  const showPinned = isDesktop && !reduced;

  const openStation =
    METRO_STATIONS.find((s) => s.id === openStationId) ?? null;

  // Lock scroll + trap focus while the deep-dive overlay is open.
  useBodyScrollLock(openStationId !== null);
  useFocusTrap(deepDivePanelRef, openStationId !== null, triggerRef);

  /* ---- desktop breakpoint detection ---- */
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  /* ---- section-in-view tracking — arms autoplay + keyboard nav ---- */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting) {
          // Show a brief nav hint the first time the user enters the
          // metro section, then auto-dismiss after 5s.
          setShowKeyHint(true);
          setTimeout(() => setShowKeyHint(false), 5000);
        }
      },
      { rootMargin: "0px 0px 0px 0px", threshold: 0 }
    );
    io.observe(section);
    return () => io.disconnect();
  }, []);

  /* ---- autoplay pause / resume ----
     Any manual interaction (hover, dot/button click, keyboard) pauses
     the auto-advance and reschedules its resume 4s after the last
     interaction. The deep-dive overlay also pauses it while open. */
  const pauseAutoplay = useCallback(() => {
    isPausedRef.current = true;
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
  }, []);

  const scheduleResume = useCallback(() => {
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      isPausedRef.current = false;
    }, 4000);
  }, []);

  useEffect(() => {
    if (openStationId) {
      pauseAutoplay();
    } else {
      scheduleResume();
    }
  }, [openStationId, pauseAutoplay, scheduleResume]);

  /* ---- single source of truth for the current station ----
     Dots, Prev/Next buttons, keyboard nav, and autoplay all funnel
     through this instead of touching activeIndex directly. */
  const goToStation = useCallback((idx: number, opts?: { userInitiated?: boolean }) => {
    const clamped = ((idx % METRO_STATIONS.length) + METRO_STATIONS.length) % METRO_STATIONS.length;
    if (clamped === activeRef.current) return;
    activeRef.current = clamped;
    setActiveIndex(clamped);
    playRef.current(opts?.userInitiated ? "blip" : "door");
    if (opts?.userInitiated) {
      pauseAutoplay();
      scheduleResume();
    }
  }, [pauseAutoplay, scheduleResume]);

  /* ---- Auto-advancing carousel (desktop + not reduced) ----
     Advances every 6s, wraps around, pauses on hover/interaction/open
     modal. Gated on showPinned, so reduced-motion and mobile users
     never get autoplay. */
  useEffect(() => {
    if (!showPinned || !inView) return;
    const id = setInterval(() => {
      if (isPausedRef.current) return;
      const next = (activeRef.current + 1) % METRO_STATIONS.length;
      activeRef.current = next;
      setActiveIndex(next);
      playRef.current("door");
    }, 6000);
    return () => clearInterval(id);
  }, [showPinned, inView]);

  /* ---- Track tween: moves the horizontal rail + train marker to the
     current station whenever activeIndex changes. This is the only
     place that actually animates the DOM — dots/buttons/keyboard/
     autoplay all just set activeIndex via goToStation. ---- */
  useEffect(() => {
    if (!showPinned) return;
    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (!track || !viewport) return;
    // Pixel-based, not xPercent: xPercent is relative to the track's OWN
    // width (which is N panels wide), not the viewport, so xPercent math
    // would overshoot by a factor of N. Each panel is exactly one
    // viewport-width, so translate by activeIndex * viewportWidth.
    const panelWidth = viewport.clientWidth;
    gsap.to(track, {
      x: -activeIndex * panelWidth,
      duration: 1.1,
      ease: "power2.inOut",
    });
    if (trainRef.current) {
      const progress = activeIndex / (METRO_STATIONS.length - 1);
      gsap.to(trainRef.current, {
        x: progress * (window.innerWidth - 40),
        duration: 1.1,
        ease: "power2.inOut",
      });
    }
  }, [activeIndex, showPinned]);

  /* ---- keyboard nav (←/→, Home/End) — active only when the section is
     in view and the rail is showing. Everything funnels through
     goToStation. ---- */
  useEffect(() => {
    if (!inView || !showPinned || openStationId) return;

    const navigate = (dir: "left" | "right") => {
      setShowKeyHint(false);
      goToStation(activeRef.current + (dir === "right" ? 1 : -1), { userInitiated: true });
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        e.preventDefault();
        navigate(e.key === "ArrowRight" ? "right" : "left");
      }
    };
    const onHome = () => goToStation(0, { userInitiated: true });
    const onEnd = () => goToStation(METRO_STATIONS.length - 1, { userInitiated: true });

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("portfolio:metro-home", onHome);
    window.addEventListener("portfolio:metro-end", onEnd);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("portfolio:metro-home", onHome);
      window.removeEventListener("portfolio:metro-end", onEnd);
    };
  }, [inView, showPinned, openStationId, goToStation]);

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

  const openDeepDive = (e: React.MouseEvent<HTMLElement>, station: MetroStation) => {
    triggerRef.current = e.currentTarget;
    setOpenStationId(station.id);
    play("door");
    openCaseStudy();
  };

  const closeDeepDive = () => {
    setOpenStationId(null);
    play("confirm");
  };



  return (
    <section
      ref={sectionRef}
      id="best-work"
      className="env-black relative w-full"
      aria-labelledby="best-work-header"
      data-cursor-label="best work"
    >
      {/* CSS keyframes for the Hindi ticker marquee */}
      <style>{`
        @keyframes pankajMetroTicker {
          from { transform: translate3d(-50%, 0, 0); }
          to   { transform: translate3d(0, 0, 0); }
        }
      `}</style>

      {/* ====================================================
          A. INTRO PANEL
          ==================================================== */}
      <div className="mx-auto w-full max-w-[1200px] px-5 py-8 sm:px-8 sm:py-10 lg:px-12">
        {/* Index header — mirrors SectionShell */}
        <motion.div
          className="mb-6 flex items-baseline gap-3 border-b border-white/10 pb-3 font-mono text-[11px] uppercase tracking-widest text-[#F4F1EA] sm:mb-8"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <span className="text-[#F4F1EA]">02</span>
          <span id="best-work-header" className="text-[#F4F1EA]">
            BEST WORK
          </span>
          <span className="ml-auto" />
          <ShareButton sectionId="best-work" />
        </motion.div>

        {/* Bilingual title — semi-English + semi-Hindi blend */}
        <motion.h2
          className="text-4xl font-bold leading-tight tracking-tight text-[#F4F1EA] sm:text-6xl"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <span className="font-display">Career Metro</span>{" "}
          <span className="font-deva text-[#FFD400]">की लाइन में आपका स्वागत है</span>
        </motion.h2>

        {/* Subtitle — hand-display style */}
        {METRO_INTRO.subtitle ? (
          <motion.p
            className="mt-6 max-w-3xl font-mono text-xs uppercase tracking-[0.3em] text-[#A3A3A3] sm:text-sm"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.8, delay: 0.35, ease: EASE }}
          >
            {METRO_INTRO.subtitle}
          </motion.p>
        ) : null}

        {/* CTA + sub copy */}
        <motion.div
          className="mt-6 hidden lg:flex flex-wrap items-center gap-6"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.8, delay: 0.45, ease: EASE }}
        >
          {/* BOARD TRAIN button — electric blue per spec */}
          <button
            type="button"
            onClick={enterMetro}
            onMouseEnter={() => play("tick")}
            data-cursor-label="board train"
            className="group inline-flex items-center gap-3 border-2 border-[#1738D5] bg-[#1738D5] px-6 py-3.5 font-mono text-xs uppercase tracking-[0.3em] text-[#F4F1EA] transition-colors hover:bg-transparent hover:text-[#1738D5] focus-ring"
          >
            <span className="h-2 w-2 rounded-full bg-[#F4F1EA] transition-colors group-hover:bg-[#1738D5]" />
            {METRO_INTRO.cta}
            <span aria-hidden>→</span>
          </button>

        </motion.div>
      </div>

      {/* ====================================================
          B. PINNED HORIZONTAL TRACK (desktop) — OR STACKED (mobile/reduced)
          ==================================================== */}
      {showPinned ? (
        <div ref={outerRef} className="relative w-full">
          <div
            ref={viewportRef}
            className="relative h-screen min-h-[640px] max-h-[780px] w-full overflow-hidden bg-[#0A0A0A]"
            onMouseEnter={pauseAutoplay}
            onMouseLeave={scheduleResume}
          >


            {/* Top status bar */}
            <div className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between gap-4 border-b border-white/10 bg-[#0A0A0A]/80 px-5 py-3 backdrop-blur-sm sm:px-8">
              <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em]">
                <span className="inline-block h-2 w-2 rounded-full bg-[#FFD400] blink" />
                <span className="text-[#FFD400]">{"CAREER METRO"}</span>
              </div>
              <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em]">
                {/* Now-playing theme indicator — shows the active station's theme */}
                <span className="hidden items-center gap-1.5 border border-[#FFD400]/30 bg-[#FFD400]/5 px-2 py-0.5 sm:flex">
                  <span className="text-[#A3A3A3]">{"THEME:"}</span>
                  <span className="font-bold text-[#FFD400]">
                    {METRO_STATIONS[activeIndex]?.theme ?? "—"}
                  </span>
                </span>
                <span className="hidden text-[#A3A3A3] sm:inline">/</span>
                {/* Persistent keyboard hint — animated key icons */}
                <span className="flex items-center gap-1.5">
                  <kbd className="inline-flex h-5 w-5 items-center justify-center border border-[#FFD400]/50 bg-[#FFD400]/10 font-mono text-[10px] text-[#FFD400] animate-pulse">←</kbd>
                  <kbd className="inline-flex h-5 w-5 items-center justify-center border border-[#FFD400]/50 bg-[#FFD400]/10 font-mono text-[10px] text-[#FFD400] animate-pulse">→</kbd>
                  <span className="hidden text-[#F4F1EA]/70 md:inline">navigate</span>
                </span>
                <span className="hidden text-[#A3A3A3] md:inline">/</span>
                <span className="text-[#F4F1EA]/70 tabular-nums">
                  {String(activeIndex + 1).padStart(2, "0")} / 0
                  {METRO_STATIONS.length}
                </span>
              </div>
            </div>

            {/* BRIEF NAV HINT — appears the first time the user enters the
                metro section, then auto-dismisses. The rail plays itself;
                this just points out you can also steer it. */}
            <AnimatePresence>
              {showKeyHint && inView && showPinned && !openStationId && (
                <motion.div
                  className="pointer-events-none absolute inset-0 z-40 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  aria-hidden
                >
                  <div className="flex flex-col items-center gap-3 rounded-lg border border-[#FFD400]/40 bg-[#0A0A0A]/90 px-8 py-5 backdrop-blur-md">
                    <p className="text-center font-display text-lg font-bold tracking-tight text-[#F4F1EA]">
                      SIT BACK, OR TAKE THE WHEEL
                    </p>
                    <p className="text-center font-mono text-[10px] uppercase tracking-[0.2em] text-[#A3A3A3]">
                      arrow keys, the buttons, or the dots below all steer
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Route-map mini-indicator — all 6 stations as dots with
                active highlighted + progress fill. Click a dot to jump. */}
            <div className="absolute left-0 right-0 top-[46px] z-20 hidden items-center gap-2 border-b border-white/5 bg-[#0A0A0A]/60 px-5 py-2 backdrop-blur-sm sm:flex sm:px-8">
              <span className="mr-1 font-mono text-[9px] uppercase tracking-[0.3em] text-[#A3A3A3]">
                {"route"}
              </span>
              <div className="relative flex flex-1 items-center">
                {/* base line */}
                <span className="pointer-events-none absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-white/10" />
                {/* progress fill — grows to the active station */}
                <span
                  className="pointer-events-none absolute left-0 top-1/2 h-px -translate-y-1/2 bg-[#FFD400] transition-[width] duration-500 ease-out"
                  style={{
                    width: `${(activeIndex / (METRO_STATIONS.length - 1)) * 100}%`,
                  }}
                />
                {METRO_STATIONS.map((s, i) => {
                  const isActive = i === activeIndex;
                  const isVisited = i < activeIndex;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => goToStation(i, { userInitiated: true })}
                      onMouseEnter={() => playRef.current("tick")}
                      data-cursor-label={s.name}
                      className="group relative z-10 flex flex-1 flex-col items-center gap-1 focus-ring"
                      aria-label={`Jump to station ${i + 1}: ${s.name}`}
                      aria-current={isActive ? "true" : undefined}
                    >
                      <span
                        className={`h-2.5 w-2.5 rounded-full border transition-all duration-300 ${
                          isActive
                            ? "scale-150 border-[#FFD400] bg-[#FFD400]"
                            : isVisited
                              ? "border-[#FFD400] bg-[#FFD400]/40"
                              : "border-white/30 bg-[#0A0A0A] group-hover:border-[#FFD400]"
                        }`}
                        style={
                          isActive
                            ? { boxShadow: "0 0 10px rgba(255,212,0,0.7)" }
                            : undefined
                        }
                      />
                      <span
                        className={`font-mono text-[8px] uppercase tracking-[0.18em] transition-colors duration-300 ${
                          isActive
                            ? "text-[#FFD400]"
                            : isVisited
                              ? "text-[#F4F1EA]/55"
                              : "text-[#A3A3A3] group-hover:text-[#F4F1EA]/80"
                        }`}
                      >
                        {s.name.slice(0, 3).toUpperCase()}
                      </span>
                    </button>
                  );
                })}
              </div>
              <span className="ml-2 font-mono text-[9px] uppercase tracking-[0.3em] tabular-nums text-[#FFD400]">
                {String(activeIndex + 1).padStart(2, "0")}/0{METRO_STATIONS.length}
              </span>
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
                  onStepOut={(e) => openDeepDive(e, station)}
                />
              ))}
            </div>

            {/* Prev / Next station buttons */}
            <button
              type="button"
              onClick={() => goToStation(activeIndex - 1, { userInitiated: true })}
              onMouseEnter={() => playRef.current("tick")}
              data-cursor-label="prev station"
              aria-label="Previous station"
              className="group absolute bottom-48 left-4 z-20 flex h-10 w-10 items-center justify-center border border-white/20 bg-[#0A0A0A]/80 text-[#F4F1EA] backdrop-blur-sm transition-colors hover:border-[#FFD400] hover:text-[#FFD400] focus-ring sm:bottom-56 sm:left-6"
            >
              <span aria-hidden>←</span>
            </button>
            <button
              type="button"
              onClick={() => goToStation(activeIndex + 1, { userInitiated: true })}
              onMouseEnter={() => playRef.current("tick")}
              data-cursor-label="next station"
              aria-label="Next station"
              className="group absolute bottom-48 right-4 z-20 flex h-10 w-10 items-center justify-center border border-white/20 bg-[#0A0A0A]/80 text-[#F4F1EA] backdrop-blur-sm transition-colors hover:border-[#FFD400] hover:text-[#FFD400] focus-ring sm:bottom-56 sm:right-6"
            >
              <span aria-hidden>→</span>
            </button>

            {/* Bottom Scrolling Photo Marquee Gallery */}
            <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-white/10 bg-[#0A0A0A]/95 py-4 backdrop-blur-md">
              <div className="overflow-hidden w-full">
                <div
                  className="marquee-track flex items-center gap-5 whitespace-nowrap will-change-transform"
                  style={{
                    animation: reduced
                      ? "none"
                      : "pankajMetroTicker 40s linear infinite",
                  }}
                >
                  {Array.from({ length: 4 }).map((_, loopIdx) => (
                    <div key={loopIdx} className="flex items-center gap-5 shrink-0">
                      {METRO_PHOTOS.map((photo, i) => (
                        <div
                          key={`${loopIdx}-${i}`}
                          className="group relative h-36 w-56 sm:h-40 sm:w-64 shrink-0 overflow-hidden rounded-md border border-white/20 bg-[#121212] transition-all duration-300 hover:scale-105 hover:border-[#FFD400] shadow-xl"
                        >
                          <img
                            src={photo.src}
                            alt={photo.caption}
                            className="h-full w-full object-cover object-center contrast-[1.08] brightness-[1.02] saturate-[1.06] transition-all duration-500 group-hover:scale-105 group-hover:contrast-100"
                            loading="eager"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-85" />
                          <div className="absolute bottom-2 left-2.5 right-2.5">
                            <p className="font-mono text-[9px] font-bold uppercase tracking-wider text-[#FFD400]">
                              {photo.title}
                            </p>
                            <p className="truncate font-mono text-[9px] text-[#F4F1EA]/80">
                              {photo.caption}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ---- Mobile / reduced-motion: stacked station cards ---- */
        <div className="mx-auto w-full max-w-[1200px] px-5 py-4 sm:px-8 sm:py-6 lg:px-12">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {METRO_STATIONS.map((station, i) => (
              <StackedStationCard
                key={station.id}
                station={station}
                index={i}
                total={METRO_STATIONS.length}
                onStepOut={(e) => openDeepDive(e, station)}
              />
            ))}
          </div>
        </div>
      )}



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
            panelRef={deepDivePanelRef}
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
  onStepOut: (e: React.MouseEvent<HTMLElement>) => void;
}) {
  const { play } = useSound();

  // The pinned track shows the headline metric set only (first 3 metrics).
  const previewMetrics = station.metrics.slice(0, 3);

  return (
    <article
      className="relative flex h-full w-full shrink-0 items-start justify-center pt-28 pb-44 px-8 sm:px-12"
      data-cursor-label={station.name}
    >
      <div className="flex w-full max-w-2xl flex-col items-start gap-8 sm:gap-10">
        {/* TOP HALF — platform signboard & station name */}
        <div className="flex flex-col items-start gap-5 sm:gap-6">
          {/* Platform signboard — only PLATFORM 01 */}
          <div className="border border-white/15 bg-[#0E0E0E] px-3.5 py-1.5">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#FFD400] font-semibold">
              {`PLATFORM 0${index + 1}`}
            </p>
          </div>

          {/* Big station name */}
          <h3
            className={`font-display text-6xl font-bold leading-[0.92] tracking-tight transition-colors duration-300 lg:text-7xl ${
              active ? "text-[#F4F1EA]" : "text-[#F4F1EA]/60"
            }`}
          >
            {station.name}
          </h3>

          {/* Role line */}
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#FFD400]/80">
            {station.role}
          </p>

          {/* Headline — the case study thesis */}
          <p
            className={`max-w-xl font-display text-base leading-relaxed transition-colors duration-300 sm:text-lg mt-1 ${
              active ? "text-[#F4F1EA]/85" : "text-[#F4F1EA]/50"
            }`}
          >
            {station.headline}
          </p>
        </div>

        {/* BOTTOM HALF — Step Out button */}
        <div className="pt-2 sm:pt-4">
          <button
            type="button"
            onClick={onStepOut}
            onMouseEnter={() => play("tick")}
            data-cursor-label="step out"
            className="group inline-flex w-fit items-center gap-3 border-2 border-[#FFD400] bg-transparent px-5 py-3 font-mono text-xs uppercase tracking-[0.25em] text-[#FFD400] transition-colors hover:bg-[#FFD400] hover:text-[#0A0A0A] focus-ring"
          >
            <span>Step Out ↗</span>
          </button>
        </div>
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
  onStepOut: (e: React.MouseEvent<HTMLElement>) => void;
}) {
  const reduced = usePrefersReducedMotion();
  const { play } = useSound();
  const previewMetrics = station.metrics.slice(0, 3);

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


      {/* Platform signboard — only PLATFORM 01 */}
      <div className="mb-5 border border-white/15 bg-[#0A0A0A] px-3 py-1.5 w-fit">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#FFD400] font-semibold">
          {`PLATFORM 0${index + 1}`}
        </p>
      </div>

      {/* Big station name + role */}
      <h3 className="font-display text-4xl font-bold leading-[0.92] tracking-tight text-[#F4F1EA] sm:text-5xl">
        {station.name}
      </h3>
      <p className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-[#FFD400]/80">
        {station.role}
      </p>

      {/* Headline */}
      <p className="mt-4 max-w-md font-display text-base leading-snug text-[#F4F1EA]/80 sm:text-lg">
        {station.headline}
      </p>



      {/* Step Out button */}
      <button
        type="button"
        onClick={onStepOut}
        data-cursor-label="step out"
        className="group mt-5 inline-flex w-fit items-center gap-3 border-2 border-[#FFD400] bg-transparent px-5 py-3 font-mono text-xs uppercase tracking-[0.25em] text-[#FFD400] transition-colors hover:bg-[#FFD400] hover:text-[#0A0A0A] focus-ring"
      >
        <span>Step Out ↗</span>
      </button>
    </motion.article>
  );
}

/* ============================================================
   Deep-dive overlay — full case study
   Renders (per spec): headline (blockquote), caseStudy blocks
   as labelled sections, ALL metrics as CountUp grid, extras as
   labelled lists, learning as a highlighted note.
   ============================================================ */
function DeepDiveOverlay({
  station,
  onClose,
  index,
  total,
  panelRef,
}: {
  station: MetroStation;
  onClose: () => void;
  index: number;
  total: number;
  panelRef: React.RefObject<HTMLDivElement | null>;
}) {
  const { play } = useSound();

  // Keyboard up/down scrolls the panel content (in addition to the
  // native mouse/trackpad/touch scrolling). Ensures the modal is
  // fully accessible via keyboard.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const panel = panelRef.current;
      if (!panel) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        panel.scrollBy({ top: 120, behavior: "smooth" });
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        panel.scrollBy({ top: -120, behavior: "smooth" });
      } else if (e.key === "PageDown") {
        e.preventDefault();
        panel.scrollBy({ top: panel.clientHeight * 0.8, behavior: "smooth" });
      } else if (e.key === "PageUp") {
        e.preventDefault();
        panel.scrollBy({ top: -panel.clientHeight * 0.8, behavior: "smooth" });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [panelRef]);

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

      {/* Panel — yellow border, fully scrollable (mouse, trackpad, keyboard, touch) */}
      <motion.div
        ref={panelRef}
        data-lenis-prevent
        className="relative z-10 max-h-[90vh] w-full max-w-4xl overflow-y-auto overscroll-contain border-2 border-[#FFD400] bg-[#0E0E0E] scroll-styled"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.4, ease: EASE }}
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
      >
        {/* Sticky header — "● DELHI METRO // {station}" */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#FFD400]/40 bg-[#0E0E0E] px-6 py-3 sm:px-8">
          <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em]">
            <span className="inline-block h-2 w-2 rounded-full bg-[#FFD400] blink" />
            <span className="text-[#FFD400]">{"CAREER METRO"}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            onMouseEnter={() => play("tick")}
            className="flex h-8 w-8 items-center justify-center border border-white/15 text-[#F4F1EA] transition-colors hover:border-[#FF3B30] hover:text-[#FF3B30] focus-ring"
            aria-label="Close deep dive"
            data-cursor-label="close"
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        </div>

        <div className="px-6 py-8 sm:px-8 sm:py-10">

          {/* Station name + role + Hindi subtitle */}
          <h3 className="font-display text-5xl font-bold leading-[0.92] tracking-tight text-[#F4F1EA] sm:text-6xl lg:text-7xl">
            {station.name}
          </h3>
          <p className="mt-3 font-mono text-xs uppercase tracking-[0.2em] text-[#FFD400]/80">
            {station.role}
          </p>

          {/* Headline — case study thesis (blockquote) */}
          <blockquote className="mt-6 border-l-2 border-[#FFD400] pl-5">
            <p className="font-display text-lg leading-snug text-[#F4F1EA]/90 sm:text-2xl">
              {station.headline}
            </p>
          </blockquote>

          {/* Case-study blocks — labelled sections.
              Each CaseStudyBlock has { label, title, text }. The labels
              differ per stationType (PROBLEM/SYSTEM/IMPACT/LEARNING for
              professional, QUESTION/METHOD/PAPERS/RESULT/LEARNING for
              research, IDEA/WHY I BUILT IT/SYSTEM/STATUS/WHAT'S NEXT for
              side-project). Render as-is per spec. */}
          <div className="mt-8 space-y-7 border-t border-white/10 pt-7">
            {station.caseStudy.map((block: CaseStudyBlock, i) => (
              <CaseStudySection key={`${block.label}-${i}`} block={block} index={i + 1} />
            ))}
          </div>



          {/* Learning — highlighted note */}
          {station.learning && (
            <div className="mt-10 border-l-2 border-[#FFD400] bg-[#FFD400]/5 p-5 sm:p-6">
              <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.3em] text-[#FFD400]">
                {"LEARNING"}
              </p>
              <p className="font-display text-base leading-relaxed text-[#F4F1EA] sm:text-lg">
                {station.learning}
              </p>
            </div>
          )}



          {/* Close hint */}
          <p className="mt-6 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-[#A3A3A3]">
            CLICK ANYWHERE TO CLOSE
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ---- CaseStudy section block — renders a labelled case-study block.
   Each block has a small mono label (PROBLEM / SYSTEM / IMPACT etc.),
   a bold display title, and the body text. ---- */
function CaseStudySection({
  block,
  index,
}: {
  block: CaseStudyBlock;
  index: number;
}) {
  return (
    <div className="border-l-2 border-[#FFD400]/60 pl-5">
      <div className="mb-2 flex items-center gap-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#FFD400]">
          {block.label}
        </span>
        <span className="font-mono text-[10px] tabular-nums text-[#6B6B6B]">
          {`0${index}`}
        </span>
      </div>
      <p className="font-display text-lg font-bold uppercase tracking-tight text-[#F4F1EA] sm:text-xl">
        {block.title}
      </p>
      <p className="mt-2 font-sans text-sm leading-relaxed text-[#F4F1EA]/75 sm:text-base">
        {block.text}
      </p>
    </div>
  );
}
