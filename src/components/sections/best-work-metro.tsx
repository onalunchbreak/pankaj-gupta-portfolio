"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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

  const progressRef = useRef(0);
  const activeRef = useRef(0);
  const playRef = useRef(play);

  const triggerRef = useRef<HTMLElement | null>(null);
  const deepDivePanelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    playRef.current = play;
  }, [play]);

  const showPinned = isDesktop && !reduced;

  const openStation =
    METRO_STATIONS.find((s) => s.id === openStationId) ?? null;
  const nextStation =
    METRO_STATIONS[(activeIndex + 1) % METRO_STATIONS.length];

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

  /* ---- section-in-view tracking for keyboard nav ---- */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting) {
          setShowKeyHint(true);
          setTimeout(() => setShowKeyHint(false), 5000);
        }
      },
      { rootMargin: "0px 0px 0px 0px", threshold: 0 }
    );
    io.observe(section);
    return () => io.disconnect();
  }, []);

  /* ---- GSAP pinned horizontal track ---- */
  useEffect(() => {
    if (!showPinned) return;
    const outer = outerRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!outer || !viewport || !track) return;

    gsap.registerPlugin(ScrollTrigger);

    const calcTotalScroll = () =>
      Math.max(0, track.scrollWidth - viewport.clientWidth);

    const st = ScrollTrigger.create({
      trigger: outer,
      pin: viewport,
      start: "top top",
      end: () => `+=${calcTotalScroll()}`,
      scrub: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        progressRef.current = self.progress;
        const total = calcTotalScroll();
        gsap.set(track, { x: -self.progress * total });

        if (trainRef.current) {
          gsap.set(trainRef.current, { scaleX: self.progress });
        }

        const newIndex = Math.min(
          METRO_STATIONS.length - 1,
          Math.floor(self.progress * METRO_STATIONS.length)
        );

        if (newIndex !== activeRef.current) {
          activeRef.current = newIndex;
          setActiveIndex(newIndex);
          playRef.current("door-chime");
        }
      },
    });

    return () => {
      st.kill();
    };
  }, [showPinned]);

  const navigateStation = useCallback(
    (delta: number) => {
      if (!showPinned) {
        const nextIdx = Math.max(
          0,
          Math.min(METRO_STATIONS.length - 1, activeIndex + delta)
        );
        setActiveIndex(nextIdx);
        play("tick");
        return;
      }

      const outer = outerRef.current;
      const track = trackRef.current;
      const viewport = viewportRef.current;
      if (!outer || !track || !viewport) return;

      const idx = Math.max(
        0,
        Math.min(METRO_STATIONS.length - 1, activeRef.current + delta)
      );
      const totalScroll = Math.max(0, track.scrollWidth - viewport.clientWidth);
      const outerTop = outer.offsetTop;

      const stationScroll = totalScroll * (idx / (METRO_STATIONS.length - 1));
      const targetTop = outerTop + stationScroll;

      const lenis = getLenis();
      if (lenis) {
        lenis.scrollTo(targetTop, { duration: 1 });
      } else {
        window.scrollTo({ top: targetTop, behavior: "smooth" });
      }
    },
    [showPinned, activeIndex, play]
  );

  useEffect(() => {
    if (!inView || openStationId !== null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        navigateStation(1);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        navigateStation(-1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [inView, openStationId, navigateStation]);

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      if (!showPinned || openStationId !== null) return;
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 30) {
        const last = METRO_STATIONS.length - 1;
        if (
          (activeRef.current === 0 && e.deltaX < 0) ||
          (activeRef.current === last && e.deltaX > 0)
        ) {
          return;
        }
        e.preventDefault();
        const delta = e.deltaX > 0 ? 1 : -1;
        navigateStation(delta);
      }
    },
    [showPinned, openStationId, navigateStation]
  );

  useEffect(() => {
    const outer = outerRef.current;
    if (!outer || !showPinned) return;
    outer.addEventListener("wheel", handleWheel, { passive: false });
    return () => outer.removeEventListener("wheel", handleWheel);
  }, [showPinned, handleWheel]);

  const openDeepDive = (id: string, e: React.MouseEvent<HTMLElement>) => {
    triggerRef.current = e.currentTarget;
    setOpenStationId(id);
    play("chime");
    openCaseStudy(id);
  };

  const closeDeepDive = () => {
    setOpenStationId(null);
    play("tick");
  };

  return (
    <section
      id="best-work"
      ref={sectionRef}
      className="env-black relative w-full overflow-hidden bg-[#0A0A0A] text-[#F4F1EA]"
      aria-labelledby="best-work-heading"
      data-cursor-label="best work"
    >
      {/* HEADER */}
      <div className="relative mx-auto w-full max-w-[1200px] px-5 pt-10 sm:px-8 sm:pt-12 lg:px-12">
        <motion.div
          className="mb-6 flex flex-col gap-2.5 border-b border-white/10 pb-4 sm:mb-8"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <div className="flex items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-widest text-[#F4F1EA]/70">
            <div className="flex items-center gap-3">
              <span className="text-[#FFD400]">{"02"}</span>
              <span className="text-[#F4F1EA]/80">{"/ CAREER METRO"}</span>
            </div>
            <ShareButton sectionId="best-work" />
          </div>

          <h2
            id="best-work-heading"
            className="font-display text-4xl font-bold tracking-tight text-[#F4F1EA] sm:text-5xl lg:text-6xl"
          >
            {METRO_INTRO.english}
          </h2>
          <p className="font-deva text-2xl text-[#FFD400]/80">
            {METRO_INTRO.hindi}
          </p>

          <button
            type="button"
            onClick={() => navigateStation(1)}
            onMouseEnter={() => play("tick")}
            data-cursor-label="board"
            className="group mt-3 inline-flex w-fit items-center gap-3 border border-[#FFD400]/60 bg-[#FFD400]/10 px-4 py-2 font-mono text-xs uppercase tracking-[0.2em] text-[#FFD400] transition-colors hover:bg-[#FFD400] hover:text-[#0A0A0A] focus-ring"
          >
            <span className="h-2 w-2 rounded-full bg-[#F4F1EA] transition-colors group-hover:bg-[#1738D5]" />
            {METRO_INTRO.cta}
            <span aria-hidden>→</span>
          </button>
        </motion.div>
      </div>

      {/* TRACK (PINNED OR STACKED) */}
      {showPinned ? (
        <div ref={outerRef} className="relative w-full">
          <div
            ref={viewportRef}
            className="relative h-[82vh] min-h-[540px] max-h-[750px] w-full overflow-hidden bg-[#0A0A0A]"
          >
            {/* Top status bar */}
            <div className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between gap-4 border-b border-white/10 bg-[#0A0A0A]/80 px-5 py-3 backdrop-blur-sm sm:px-8">
              <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em]">
                <span className="inline-block h-2 w-2 rounded-full bg-[#FFD400] blink" />
                <span className="text-[#FFD400]">{"● CAREER METRO"}</span>
              </div>
              <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em]">
                <span className="hidden items-center gap-1.5 border border-[#FFD400]/30 bg-[#FFD400]/5 px-2 py-0.5 sm:flex">
                  <span className="text-[#A3A3A3]">{"THEME:"}</span>
                  <span className="font-bold text-[#FFD400]">
                    {METRO_STATIONS[activeIndex]?.theme ?? "—"}
                  </span>
                </span>
                <span className="hidden text-[#A3A3A3] sm:inline">/</span>
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

            {/* Track content */}
            <div className="flex h-full items-center pt-12 pb-10">
              <div
                ref={trackRef}
                className="flex items-center gap-8 pl-8 sm:pl-12 pr-48"
              >
                {METRO_STATIONS.map((station, i) => (
                  <StationPanel
                    key={station.id}
                    station={station}
                    index={i}
                    total={METRO_STATIONS.length}
                    active={i === activeIndex}
                    onStepOut={(e) => openDeepDive(station.id, e)}
                  />
                ))}
              </div>
            </div>

            {/* Bottom status bar */}
            <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-white/10 bg-[#0A0A0A]/90 px-5 py-3 backdrop-blur-sm sm:px-8">
              <div className="mx-auto flex max-w-[1200px] flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative h-1.5 w-32 overflow-hidden rounded-full bg-white/15">
                    <div
                      ref={trainRef}
                      className="absolute inset-y-0 left-0 w-full origin-left bg-[#FFD400]"
                      style={{ transform: "scaleX(0)" }}
                    />
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#FFD400] tabular-nums">
                    {String(activeIndex + 1).padStart(2, "0")}/0{METRO_STATIONS.length}
                  </span>
                </div>

                <div className="overflow-hidden font-mono text-[10px] uppercase tracking-[0.2em] text-[#F4F1EA]/70">
                  <span className="text-[#A3A3A3]">NEXT: </span>
                  <span className="text-[#FFD400]">{nextStation?.name}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* STACKED FALLBACK (MOBILE) */
        <div className="mx-auto max-w-[1200px] px-5 py-12 sm:px-8">
          <div className="space-y-8">
            {METRO_STATIONS.map((station, i) => (
              <StackedStationCard
                key={station.id}
                station={station}
                index={i}
                total={METRO_STATIONS.length}
                onStepOut={(e) => openDeepDive(station.id, e)}
              />
            ))}
          </div>
        </div>
      )}

      {/* DEEP DIVE OVERLAY */}
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
   Station Panel — Pinned Track Card
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
  const previewMetrics = station.metrics.slice(0, 3);

  return (
    <article
      className="relative flex w-[85vw] max-w-[850px] shrink-0 flex-col justify-between gap-6 border border-white/10 bg-[#0E0E0E] p-6 sm:p-8 lg:p-10 shadow-2xl"
      data-cursor-label={station.name}
    >
      <div className="flex flex-col items-start gap-2.5">
        <div className="border border-white/15 bg-[#0A0A0A] px-3 py-1">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#FFD400] font-semibold">
            {`PLATFORM 0${index + 1}`}
          </p>
        </div>

        <h3
          className={`font-display text-4xl font-bold leading-[0.95] tracking-tight transition-colors duration-300 sm:text-5xl lg:text-6xl ${
            active ? "text-[#F4F1EA]" : "text-[#F4F1EA]/60"
          }`}
        >
          {station.name}
        </h3>

        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#FFD400]/80">
          {station.role}
        </p>

        <p
          className={`max-w-xl font-display text-base leading-snug transition-colors duration-300 sm:text-lg ${
            active ? "text-[#F4F1EA]/85" : "text-[#F4F1EA]/50"
          }`}
        >
          {station.headline}
        </p>
      </div>

      <div className="flex flex-col gap-4 pt-2">
        <ul className="grid grid-cols-3 gap-4" role="list">
          {previewMetrics.map((m) => (
            <li key={m.label} className="border-l border-white/15 pl-3">
              <p className={`font-display font-bold leading-none tracking-tight text-[#FFD400] ${getValueFontSize(m.display, false, false)}`}>
                <CountUp
                  target={m.value}
                  suffix={m.suffix ?? ""}
                  display={m.display}
                  duration={1.2}
                />
              </p>
              <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-[#A3A3A3]">
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
          className="group inline-flex w-fit items-center gap-3 border-2 border-[#FFD400] bg-transparent px-5 py-3 font-mono text-xs uppercase tracking-[0.25em] text-[#FFD400] transition-colors hover:bg-[#FFD400] hover:text-[#0A0A0A] focus-ring"
        >
          <span>Step Out ↗</span>
        </button>
      </div>
    </article>
  );
}

/* ============================================================
   Stacked station card — Mobile Fallback
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
      <div className="mb-5 border border-white/15 bg-[#0A0A0A] px-3 py-1.5 w-fit">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#FFD400] font-semibold">
          {`PLATFORM 0${index + 1}`}
        </p>
      </div>

      <h3 className="font-display text-4xl font-bold leading-[0.92] tracking-tight text-[#F4F1EA] sm:text-5xl">
        {station.name}
      </h3>
      <p className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-[#FFD400]/80">
        {station.role}
      </p>

      <p className="mt-4 max-w-md font-display text-base leading-snug text-[#F4F1EA]/80 sm:text-lg">
        {station.headline}
      </p>

      <ul className="mt-6 grid grid-cols-3 gap-3" role="list">
        {previewMetrics.map((m) => (
          <li key={m.label} className="border-l border-white/15 pl-3">
            <p className={`font-display font-bold leading-none tracking-tight text-[#FFD400] ${getValueFontSize(m.display, true, false)}`}>
              <CountUp
                target={m.value}
                suffix={m.suffix ?? ""}
                display={m.display}
                duration={1.2}
              />
            </p>
            <p className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.2em] text-[#A3A3A3]">
              {m.label}
            </p>
          </li>
        ))}
      </ul>

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
   Deep-Dive Overlay — Full Case Study & Step Out Modal
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
      <div
        className="absolute inset-0 bg-[#0A0A0A]/90 backdrop-blur-md"
        aria-hidden
      />

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
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-[#FFD400]/40 bg-[#0E0E0E] px-6 py-3 sm:px-8">
          <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em]">
            <span className="inline-block h-2 w-2 rounded-full bg-[#FFD400] blink" />
            <span className="text-[#FFD400]">{"● CAREER METRO"}</span>
            <span className="text-[#A3A3A3]">{"//"}</span>
            <span className="text-[#F4F1EA]/80">{station.name}</span>
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
          <button
            type="button"
            onClick={onClose}
            onMouseEnter={() => play("tick")}
            className="mb-6 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[#A3A3A3] transition-colors hover:text-[#FFD400] focus-ring"
            aria-label="Return to Product Line"
            data-cursor-label="back"
          >
            <span aria-hidden className="text-[#FFD400]">←</span>
            <span>{"RETURN TO CAREER METRO"}</span>
          </button>

          <h3 className="font-display text-5xl font-bold leading-[0.92] tracking-tight text-[#F4F1EA] sm:text-6xl lg:text-7xl">
            {station.name}
          </h3>
          <p className="mt-3 font-mono text-xs uppercase tracking-[0.2em] text-[#FFD400]/80">
            {station.role}
          </p>

          <blockquote className="mt-6 border-l-2 border-[#FFD400] pl-5">
            <p className="font-display text-lg leading-snug text-[#F4F1EA]/90 sm:text-2xl">
              {station.headline}
            </p>
          </blockquote>

          {/* Case-study blocks */}
          <div className="mt-8 space-y-7 border-t border-white/10 pt-7">
            {station.caseStudy.map((block: CaseStudyBlock, i) => (
              <CaseStudySection
                key={`${block.label}-${i}`}
                block={block}
                index={i + 1}
              />
            ))}
          </div>

          {/* Metrics */}
          <ul
            className="mt-10 grid grid-cols-2 gap-6 border-t border-white/10 pt-7 sm:grid-cols-3"
            role="list"
          >
            {station.metrics.map((m, mi) => (
              <li
                key={m.label}
                className={mi % 3 === 1 ? "sm:translate-y-3" : ""}
              >
                <p className={`font-display font-bold leading-none tracking-tight text-[#FFD400] ${getValueFontSize(m.display, false, true)}`}>
                  <CountUp
                    target={m.value}
                    suffix={m.suffix ?? ""}
                    display={m.display}
                    duration={1.4}
                  />
                </p>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[#A3A3A3]">
                  {m.label}
                </p>
              </li>
            ))}
          </ul>

          {/* Learning Note */}
          {station.learning ? (
            <div className="relative mt-10 border-l-2 border-[#FFD400] bg-[#FFD400]/5 p-5 sm:p-6">
              <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.3em] text-[#FFD400]">
                {"LEARNING"}
              </p>
              <p className="font-display text-base leading-relaxed text-[#F4F1EA] sm:text-lg">
                {station.learning}
              </p>
            </div>
          ) : null}

          <button
            type="button"
            onClick={onClose}
            className="mt-10 inline-flex items-center gap-2 border-t border-white/10 pt-5 font-mono text-[10px] uppercase tracking-[0.3em] text-[#A3A3A3] transition-colors hover:text-[#FFD400] focus-ring"
            data-cursor-label="return to platform"
          >
            <span aria-hidden>←</span>
            Return to Platform
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function CaseStudySection({
  block,
  index,
}: {
  block: CaseStudyBlock;
  index: number;
}) {
  return (
    <div className="group/section relative border-l-2 border-[#FFD400]/60 pl-5">
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
