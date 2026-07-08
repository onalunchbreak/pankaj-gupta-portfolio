"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { X } from "lucide-react";
import { CountUp } from "@/components/sections/_shared";
import { PROJECTS, type Project } from "@/lib/data";
import { useSound } from "@/hooks/use-sound";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { useBodyScrollLock } from "@/hooks/use-body-scroll-lock";
import { useFocusTrap } from "@/hooks/use-focus-trap";

const EASE = [0.16, 1, 0.3, 1] as const;
// Morph transition — drives both the layout animation and any spring fallback.
const MORPH_TRANSITION = {
  duration: 0.6,
  ease: EASE,
  layout: { duration: 0.6, ease: EASE },
} as const;

/* ============================================================
   Per-theme card + overlay styling.
   The Projects section lives on the ELECTRIC BLUE environment, so
   each card's theme creates intentional visual contrast:

   - "blue"  → deeper-blue card with cream ink + white hairline border
   - "paper" → warm paper card with dark ink (standout against blue)
   - "black" → near-black card with cream ink + yellow accent

   The overlay panel reuses the same theme mapping so the morph
   keeps the colour identity of the clicked card.
   ============================================================ */
type ThemeClasses = {
  card: string;
  cardHover: string;
  ink: string;
  inkMuted: string;
  indexPill: string;
  archived: string;
  metric: string;
  bullet: string;
  border: string;
  overlay: string;
  hint: string;
};

const THEME_STYLES: Record<Project["theme"], ThemeClasses> = {
  blue: {
    card: "bg-[#0F2BB0] border-[#F7F4ED]/30",
    cardHover: "hover:border-[#F7F4ED]",
    ink: "text-[#F7F4ED]",
    inkMuted: "text-[#F7F4ED]/60",
    indexPill: "border-[#F7F4ED]/40 text-[#F7F4ED]",
    archived: "bg-[#FFD400] text-[#0A0A0A]",
    metric: "text-[#FFD400]",
    bullet: "text-[#FFD400]",
    border: "border-[#F7F4ED]/15",
    overlay: "bg-[#0F2BB0] border-[#F7F4ED]/40",
    hint: "text-[#F7F4ED]/60 group-hover:text-[#FFD400]",
  },
  paper: {
    card: "bg-[#F4F1EA] paper-texture border-[#2a2a2a]/20",
    cardHover: "hover:border-[#1738D5]",
    ink: "text-[#1a1a1a]",
    inkMuted: "text-[#2a2a2a]/70",
    indexPill: "border-[#1738D5]/40 text-[#1738D5]",
    archived: "bg-[#1738D5] text-[#F4F1EA]",
    metric: "text-[#1738D5]",
    bullet: "text-[#1738D5]",
    border: "border-[#2a2a2a]/15",
    overlay: "bg-[#F4F1EA] paper-texture border-[#1738D5]/40",
    hint: "text-[#2a2a2a]/60 group-hover:text-[#1738D5]",
  },
  black: {
    card: "bg-[#0A0A0A] border-[#FFD400]/30",
    cardHover: "hover:border-[#FFD400]",
    ink: "text-[#F4F1EA]",
    inkMuted: "text-[#6B6B6B]",
    indexPill: "border-[#FFD400]/40 text-[#FFD400]",
    archived: "bg-[#FFD400] text-[#0A0A0A]",
    metric: "text-[#FFD400]",
    bullet: "text-[#FFD400]",
    border: "border-white/15",
    overlay: "bg-[#0A0A0A] border-[#FFD400]/40",
    hint: "text-[#6B6B6B] group-hover:text-[#FFD400]",
  },
};

export default function Projects() {
  const { play } = useSound();
  const reduced = usePrefersReducedMotion();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Tracks the card element that triggered the open — used to restore focus.
  const triggerRef = useRef<HTMLElement | null>(null);
  const overlayPanelRef = useRef<HTMLDivElement | null>(null);

  const selected = PROJECTS.find((p) => p.id === selectedId) ?? null;

  // Lock scroll + trap focus while the overlay is open.
  useBodyScrollLock(selectedId !== null);
  useFocusTrap(overlayPanelRef, selectedId !== null, triggerRef);

  // Esc closes the open panel.
  useEffect(() => {
    if (!selectedId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedId(null);
        play("confirm");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedId, play]);

  const openProject = (e: React.MouseEvent<HTMLElement>, id: string) => {
    triggerRef.current = e.currentTarget;
    setSelectedId(id);
    play("confirm");
  };

  const closeProject = () => {
    setSelectedId(null);
    play("confirm");
  };

  return (
    <section
      id="projects"
      className="env-blue relative w-full overflow-hidden"
      aria-labelledby="projects-header"
      data-cursor-label="projects"
    >
      <div className="relative mx-auto w-full max-w-[1200px] px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
        {/* ---- Section header (mirrors SectionShell layout, blue-env colors) ---- */}
        <motion.div
          className="mb-10 flex items-baseline gap-3 border-b border-white/15 pb-3 font-mono text-[11px] uppercase tracking-widest text-[#F7F4ED]/70 sm:mb-14"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <span className="text-[#FFD400]">03</span>
          <span>Projects</span>
          <span className="ml-auto hidden h-px flex-1 bg-white/15 sm:block" />
          <span className="hidden sm:inline">{"// baaz.sys"}</span>
        </motion.div>

        {/* Terminal sub-header */}
        <motion.div
          className="mb-10 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-[#FFD400] sm:mb-12"
          initial={reduced ? false : { opacity: 0, y: -8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <span
            className="inline-block h-2 w-2 animate-pulse bg-[#FFD400]"
            aria-hidden
          />
          <span>{"Sector 03 / Alpha · System_Active"}</span>
          <span className="ml-auto hidden font-mono text-[10px] uppercase tracking-[0.25em] text-[#F7F4ED]/55 sm:inline">
            {`// ${PROJECTS.length} archived`}
          </span>
        </motion.div>

        <LayoutGroup>
          {/* 2x2 archived project grid */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
            {PROJECTS.map((project, i) => {
              const theme = THEME_STYLES[project.theme];
              // Intentional misalignment: alternating rotation + staggered vertical offset
              const rotate = i % 2 === 0 ? -0.6 : 0.8;
              const yOffset = i === 1 || i === 3 ? "sm:translate-y-8" : "";
              return (
                <motion.article
                  key={project.id}
                  layoutId={reduced ? undefined : `project-${project.id}`}
                  layout={!reduced}
                  className={`group relative cursor-pointer border p-6 transition-colors duration-200 sm:p-7 ${theme.card} ${theme.cardHover} ${yOffset}`}
                  onClick={(e) => openProject(e, project.id)}
                  onMouseEnter={() => play("tick")}
                  data-cursor-label="open"
                  initial={reduced ? false : { opacity: 0, y: 28, rotate }}
                  whileInView={{ opacity: 1, y: 0, rotate }}
                  viewport={{ once: true, margin: "-8% 0px" }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
                  whileHover={reduced ? undefined : { scale: 1.012, rotate: 0 }}
                  aria-labelledby={`proj-${project.id}-title`}
                >
                  {/* Brutalist corner registration marks */}
                  <span aria-hidden className="pointer-events-none absolute left-2 top-2 h-2 w-2 border-l border-t border-current opacity-25" />
                  <span aria-hidden className="pointer-events-none absolute right-2 top-2 h-2 w-2 border-r border-t border-current opacity-25" />
                  <span aria-hidden className="pointer-events-none absolute bottom-2 left-2 h-2 w-2 border-b border-l border-current opacity-25" />
                  <span aria-hidden className="pointer-events-none absolute bottom-2 right-2 h-2 w-2 border-b border-r border-current opacity-25" />

                  {/* Top row: numbered circular marker + filled Archived stamp */}
                  <div className="mb-6 flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      {/* Numbered circular marker */}
                      <span
                        aria-hidden
                        className={`flex h-9 w-9 items-center justify-center rounded-full border-2 font-mono text-[11px] tabular-nums ${theme.indexPill}`}
                      >
                        {project.index}
                      </span>
                      <span className={`font-mono text-[9px] uppercase tracking-[0.3em] ${theme.inkMuted}`}>
                        {"// case file"}
                      </span>
                    </div>
                    <span
                      aria-hidden
                      className={`-rotate-[6deg] px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.3em] shadow-[3px_3px_0_0_rgba(255,59,48,0.6)] transition-transform duration-300 group-hover:rotate-0 ${theme.archived}`}
                      data-cursor-label="archived"
                    >
                      ▣ Archived
                    </span>
                  </div>

                  {/* Project name — big display */}
                  <h3
                    id={`proj-${project.id}-title`}
                    className={`font-display text-4xl font-bold leading-[0.95] tracking-tight ${theme.ink} sm:text-5xl`}
                  >
                    {project.name}
                  </h3>

                  {/* Company description */}
                  <p className={`mt-3 font-sans text-sm leading-relaxed ${theme.inkMuted}`}>
                    {project.companyDescription}
                  </p>

                  {/* Role + duration */}
                  <p className={`mt-4 font-mono text-xs uppercase tracking-[0.2em] ${theme.ink}`}>
                    {project.role}
                  </p>
                  <p className={`mt-1 font-mono text-[11px] uppercase tracking-[0.25em] ${theme.inkMuted}`}>
                    {project.duration}
                  </p>

                  {/* Achievements — 2 bullets (full text), only first card-expanded view shows all.
                      Card view truncates with line-clamp for visual rhythm. */}
                  <ul className="mt-5 space-y-2" role="list">
                    {project.achievements.map((a, ai) => (
                      <li
                        key={ai}
                        className={`flex gap-2 font-sans text-[13px] leading-snug ${theme.inkMuted}`}
                      >
                        <span aria-hidden className={`mt-1.5 inline-block h-1 w-1 shrink-0 ${theme.bullet}`}>
                          ●
                        </span>
                        <span className="line-clamp-2">{a}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Metrics — small CountUp stats */}
                  <ul className="mt-6 grid grid-cols-3 gap-3 border-t border-current/15 pt-4" role="list">
                    {project.metrics.map((m) => (
                      <li key={m.label}>
                        <p className={`font-display text-2xl font-bold leading-none tracking-tight ${theme.metric}`}>
                          {reduced ? (
                            m.display ?? `${m.value}${m.suffix ?? ""}`
                          ) : (
                            <CountUp
                              target={m.value}
                              suffix={m.suffix ?? ""}
                              display={m.display}
                              duration={1.2}
                            />
                          )}
                        </p>
                        <p className={`mt-1.5 font-mono text-[9px] uppercase tracking-[0.18em] ${theme.inkMuted}`}>
                          {m.label}
                        </p>
                      </li>
                    ))}
                  </ul>

                  {/* Expand hint — full-width with arrow nudge + progress bar */}
                  <div className={`mt-6 flex items-center gap-2 border-t border-current/15 pt-3 font-mono text-[10px] uppercase tracking-[0.25em] transition-colors duration-200 ${theme.hint}`}>
                    <span className="text-current transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
                      ▸
                    </span>
                    <span>open case file</span>
                    <span className="ml-auto flex-1 overflow-hidden">
                      <span className="block h-px w-0 bg-current transition-all duration-500 ease-out group-hover:w-full" />
                    </span>
                    <span className="text-current" aria-hidden>
                      ↗
                    </span>
                  </div>
                </motion.article>
              );
            })}
          </div>

          {/* EXPANDED OVERLAY — shared-layout morph via layoutId */}
          <AnimatePresence>
            {selected && (
              <ExpandedOverlay
                key={selected.id}
                project={selected}
                onClose={closeProject}
                reduced={reduced}
                panelRef={overlayPanelRef}
              />
            )}
          </AnimatePresence>
        </LayoutGroup>
      </div>
    </section>
  );
}

/* ============================================================
   Expanded overlay — morphs from clicked card via layoutId.
   Paper or black themed (per project.theme) so it pops against
   the blue section backdrop. Backdrop click, close button, and
   Escape all close. Focus is trapped by the parent's
   useFocusTrap hook.
   ============================================================ */
function ExpandedOverlay({
  project,
  onClose,
  reduced,
  panelRef,
}: {
  project: Project;
  onClose: () => void;
  reduced: boolean;
  panelRef: React.RefObject<HTMLDivElement | null>;
}) {
  const theme = THEME_STYLES[project.theme];
  const { play } = useSound();

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: EASE }}
      onClick={onClose}
      data-cursor-label="close"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.name} — project detail`}
    >
      {/* Backdrop: semi-opaque blue + blur */}
      <div
        className="absolute inset-0 bg-[#1738D5]/85 backdrop-blur-md"
        aria-hidden
      />

      {/* Panel — morphs from the clicked card via shared layoutId */}
      <motion.div
        ref={panelRef}
        layoutId={reduced ? undefined : `project-${project.id}`}
        layout={!reduced}
        className={`relative z-10 max-h-[88vh] w-full max-w-3xl overflow-y-auto border p-6 scroll-styled sm:p-10 ${theme.overlay}`}
        onClick={(e) => e.stopPropagation()}
        transition={MORPH_TRANSITION}
        data-cursor-label="close"
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          onMouseEnter={() => play("tick")}
          className={`absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center border ${theme.border} ${theme.ink} transition-colors duration-200 hover:border-[#FF3B30] hover:text-[#FF3B30] focus-ring`}
          aria-label="Close project"
          data-cursor-label="close"
        >
          <X className="h-4 w-4" aria-hidden />
        </button>

        {/* Top row: index + Archived tag */}
        <div className="mb-6 flex items-start justify-between pr-12">
          <div className="flex items-center gap-3">
            <span
              aria-hidden
              className={`flex h-9 w-9 items-center justify-center rounded-full border-2 font-mono text-[11px] tabular-nums ${theme.indexPill}`}
            >
              {project.index}
            </span>
            <span className={`font-mono text-[9px] uppercase tracking-[0.3em] ${theme.inkMuted}`}>
              {`${project.index} / 04 · case file`}
            </span>
          </div>
          <span
            aria-hidden
            className={`-rotate-[6deg] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.3em] ${theme.archived}`}
          >
            Archived
          </span>
        </div>

        {/* Project name — huge */}
        <h3 className={`font-display text-5xl font-bold leading-[0.92] tracking-tight ${theme.ink} sm:text-6xl lg:text-7xl`}>
          {project.name}
        </h3>

        {/* Company description */}
        <p className={`mt-4 max-w-2xl font-sans text-base leading-relaxed ${theme.inkMuted} sm:text-lg`}>
          {project.companyDescription}
        </p>

        {/* Role + duration */}
        <div className="mt-5 flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <p className={`font-mono text-sm uppercase tracking-[0.2em] ${theme.ink}`}>
            {project.role}
          </p>
          <p className={`font-mono text-[11px] uppercase tracking-[0.25em] ${theme.inkMuted}`}>
            {project.duration}
          </p>
        </div>

        {/* Achievements — full bullets */}
        <div className="mt-8 border-t border-current/15 pt-6">
          <p className={`mb-4 font-mono text-[10px] uppercase tracking-[0.25em] ${theme.inkMuted}`}>
            {"// achievements"}
          </p>
          <ul className="space-y-4" role="list">
            {project.achievements.map((a, ai) => (
              <li
                key={ai}
                className={`flex gap-3 font-sans text-base leading-relaxed ${theme.ink}`}
              >
                <span aria-hidden className={`mt-2 inline-block h-1.5 w-1.5 shrink-0 ${theme.bullet}`}>
                  ●
                </span>
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Metrics — 3 big CountUp numbers, middle offset for misalignment */}
        <div className="mt-9 grid grid-cols-1 gap-6 border-t border-current/15 pt-7 sm:grid-cols-3">
          {project.metrics.map((m, mi) => (
            <div
              key={m.label}
              className={mi === 1 ? "sm:translate-y-4" : ""}
            >
              <p className={`font-display text-4xl font-bold leading-none tracking-tight ${theme.metric} sm:text-5xl`}>
                {reduced ? (
                  m.display ?? `${m.value}${m.suffix ?? ""}`
                ) : (
                  <CountUp
                    target={m.value}
                    suffix={m.suffix ?? ""}
                    display={m.display}
                    duration={1.4}
                  />
                )}
              </p>
              <p className={`mt-2 font-mono text-[10px] uppercase tracking-[0.25em] ${theme.inkMuted}`}>
                {m.label}
              </p>
            </div>
          ))}
        </div>

        {/* Close hint */}
        <p className={`mt-9 border-t border-current/15 pt-4 text-center font-mono text-[10px] uppercase tracking-[0.3em] ${theme.inkMuted}`}>
          {"CLICK ANYWHERE TO CLOSE"}
        </p>
      </motion.div>
    </motion.div>
  );
}
