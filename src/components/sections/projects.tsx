"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { X } from "lucide-react";
import { CountUp, SectionShell } from "@/components/sections/_shared";
import { PROJECTS } from "@/lib/data";
import { useSound } from "@/hooks/use-sound";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const EASE = [0.16, 1, 0.3, 1] as const;
// Morph transition — drives both the layout animation and any spring fallback.
const MORPH_TRANSITION = {
  duration: 0.6,
  ease: EASE,
  layout: { duration: 0.6, ease: EASE },
} as const;

export default function Projects() {
  const { play } = useSound();
  const reduced = usePrefersReducedMotion();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selected = PROJECTS.find((p) => p.id === selectedId) ?? null;

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

  const openProject = (id: string) => {
    setSelectedId(id);
    play("confirm");
  };

  const closeProject = () => {
    setSelectedId(null);
    play("confirm");
  };

  return (
    <SectionShell id="projects" index="03" label="PROJECTS">
      {/* Terminal-style sub-header — accent mono, blinking status dot */}
      <motion.div
        className="mb-8 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-[#FFD400] sm:mb-12"
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
        <span className="ml-auto hidden font-mono text-[10px] uppercase tracking-[0.25em] text-[#6B6B6B] sm:inline">
          {"// 04 archived"}
        </span>
      </motion.div>

      <LayoutGroup>
        {/* 2x2 archived project grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
          {PROJECTS.map((project, i) => {
            // Intentional misalignment: alternating rotation + staggered vertical offset
            const rotate = i % 2 === 0 ? -0.6 : 0.8;
            const yOffset = i === 1 || i === 3 ? "sm:translate-y-8" : "";
            return (
              <motion.article
                key={project.id}
                layoutId={reduced ? undefined : `project-${project.id}`}
                layout={!reduced}
                className={`group relative cursor-pointer border border-white/10 bg-[#0E0E0E] p-6 transition-colors duration-200 hover:border-[#FFD400] sm:p-7 ${yOffset}`}
                onClick={() => openProject(project.id)}
                onMouseEnter={() => play("tick")}
                data-cursor-label="open"
                initial={reduced ? false : { opacity: 0, y: 28, rotate }}
                whileInView={{ opacity: 1, y: 0, rotate }}
                viewport={{ once: true, margin: "-8% 0px" }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
                whileHover={reduced ? undefined : { scale: 1.012, rotate: 0 }}
              >
                {/* Top row: index + rotated Archived tag */}
                <div className="mb-6 flex items-start justify-between">
                  <span className="font-mono text-[11px] tabular-nums uppercase tracking-[0.25em] text-[#6B6B6B]">
                    {project.index}
                  </span>
                  <span
                    aria-hidden
                    className="-rotate-[6deg] border border-[#FFD400] px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.3em] text-[#FFD400]"
                    data-cursor-label="archived"
                  >
                    Archived
                  </span>
                </div>

                {/* Project name — big display */}
                <h3 className="font-display text-4xl font-bold leading-[0.95] tracking-tight text-[#F4F1EA] sm:text-5xl">
                  {project.name}
                </h3>

                {/* Role + duration */}
                <p className="mt-3 font-mono text-xs uppercase tracking-[0.2em] text-[#F4F1EA]/70">
                  {project.role}
                </p>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.25em] text-[#6B6B6B]">
                  {project.duration}
                </p>

                {/* Tool chips */}
                <ul className="mt-5 flex flex-wrap gap-2" role="list">
                  {project.tools.map((tool) => (
                    <li
                      key={tool}
                      className="border border-white/10 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[#F4F1EA]/60"
                    >
                      {tool}
                    </li>
                  ))}
                </ul>

                {/* Expand hint */}
                <div className="mt-6 flex items-center gap-2 border-t border-white/10 pt-3 font-mono text-[10px] uppercase tracking-[0.25em] text-[#6B6B6B] transition-colors duration-200 group-hover:text-[#FFD400]">
                  <span className="text-[#FFD400]" aria-hidden>
                    ▸
                  </span>
                  <span>expand</span>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* EXPANDED OVERLAY — shared-layout morph via layoutId */}
        <AnimatePresence>
          {selected && (
            <motion.div
              className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
              onClick={closeProject}
              data-cursor-label="close"
              role="dialog"
              aria-modal="true"
              aria-label={`${selected.name} — project detail`}
            >
              {/* Backdrop: semi-opaque black + blur */}
              <div
                className="absolute inset-0 bg-[#0A0A0A]/85 backdrop-blur-md"
                aria-hidden
              />

              {/* Panel — morphs from the clicked card via shared layoutId */}
              <motion.div
                layoutId={reduced ? undefined : `project-${selected.id}`}
                layout={!reduced}
                className="relative z-10 max-h-[88vh] w-full max-w-3xl overflow-y-auto border border-[#FFD400]/40 bg-[#0E0E0E] p-6 sm:p-10"
                onClick={(e) => e.stopPropagation()}
                transition={MORPH_TRANSITION}
                data-cursor-label="close"
              >
                {/* Close button */}
                <button
                  type="button"
                  onClick={closeProject}
                  className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center border border-white/15 bg-[#0A0A0A]/80 text-[#F4F1EA] transition-colors duration-200 hover:border-[#FF3B30] hover:text-[#FF3B30]"
                  aria-label="Close project"
                  data-cursor-label="close"
                >
                  <X className="h-4 w-4" aria-hidden />
                </button>

                {/* Top row: index + Archived tag */}
                <div className="mb-6 flex items-start justify-between pr-12">
                  <span className="font-mono text-[11px] tabular-nums uppercase tracking-[0.25em] text-[#6B6B6B]">
                    {selected.index} / 04
                  </span>
                  <span
                    aria-hidden
                    className="-rotate-[6deg] border border-[#FFD400] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.3em] text-[#FFD400]"
                  >
                    Archived
                  </span>
                </div>

                {/* Project name — huge */}
                <h3 className="font-display text-6xl font-bold leading-[0.92] tracking-tight text-[#F4F1EA] sm:text-7xl lg:text-8xl">
                  {selected.name}
                </h3>

                {/* Role + duration */}
                <div className="mt-5 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <p className="font-mono text-sm uppercase tracking-[0.2em] text-[#F4F1EA]/80">
                    {selected.role}
                  </p>
                  <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#6B6B6B]">
                    {selected.duration}
                  </p>
                </div>

                {/* Full summary */}
                <p className="mt-7 max-w-2xl font-display text-lg leading-relaxed text-[#F4F1EA]/90 sm:text-xl">
                  {selected.summary}
                </p>

                {/* Metrics — 3 big CountUp numbers, middle offset for misalignment */}
                <div className="mt-9 grid grid-cols-1 gap-6 border-t border-white/10 pt-7 sm:grid-cols-3">
                  {selected.metrics.map((m, mi) => (
                    <div
                      key={m.label}
                      className={mi === 1 ? "sm:translate-y-4" : ""}
                    >
                      <p className="font-display text-5xl font-bold leading-none tracking-tight text-[#FFD400] sm:text-6xl">
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
                    </div>
                  ))}
                </div>

                {/* Tools list */}
                <div className="mt-8 border-t border-white/10 pt-6">
                  <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.25em] text-[#6B6B6B]">
                    {"// tools"}
                  </p>
                  <ul className="flex flex-wrap gap-2" role="list">
                    {selected.tools.map((tool) => (
                      <li
                        key={tool}
                        className="border border-white/15 px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-[#F4F1EA]/70"
                      >
                        {tool}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Close hint */}
                <p className="mt-9 border-t border-white/10 pt-4 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-[#6B6B6B]">
                  {"CLICK ANYWHERE TO CLOSE"}
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </LayoutGroup>
    </SectionShell>
  );
}
