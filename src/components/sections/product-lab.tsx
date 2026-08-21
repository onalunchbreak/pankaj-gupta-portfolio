"use client";
import { motion } from "framer-motion";
import { ExternalLink, Wrench } from "lucide-react";
import { Reveal } from "@/components/sections/_shared";
import { LAB } from "@/lib/data";
import { links, hasLink } from "@/lib/links";
import { useSound } from "@/hooks/use-sound";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { useSessionStats } from "@/hooks/use-session-stats";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ============================================================
   PRODUCT LAB
   Black environment. Side projects — 4 cards with name, desc,
   status badge, and conditional OPEN PROJECT / INSPECT BUILD.
   ============================================================ */

/* Map a side-project id → its URL from links.ts (no fabrication). */
const PROJECT_URLS: Record<string, string> = {
  "queens-gambit": links.projects.queensGambit,
  "daily-dose-of-ai": links.projects.dailyDoseOfAI,
  "skill-tracer": links.projects.skillTracer,
  "hitchhikers-guide": links.projects.modernDataSolutions,
};

/* ---- Status badge colours for side projects -------------------- */
const STATUS_STYLES: Record<string, string> = {
  BUILDING: "border-[#FFD400]/50 text-[#FFD400] bg-[#FFD400]/10",
  SHIPPED: "border-[#1738D5]/60 text-[#1738D5] bg-[#1738D5]/10",
};

// Theme-alternating card styles (reused from the Work Log design).
// Each side project gets a distinct theme so the grid reads as a
// colorful archive of builds, not a uniform dark grid.
type ProjectTheme = "blue" | "paper" | "black";
const PROJECT_THEMES: Record<string, ProjectTheme> = {
  "queens-gambit": "blue",
  "daily-dose-of-ai": "paper",
  "skill-tracer": "black",
  "hitchhikers-guide": "blue",
};

const THEME_STYLES: Record<ProjectTheme, {
  card: string;
  cardHover: string;
  ink: string;
  inkMuted: string;
  indexPill: string;
  archived: string;
  metric: string;
  border: string;
  hint: string;
  chip: string;
  statusBadge: Record<string, string>;
}> = {
  blue: {
    card: "bg-[#0F2BB0] border-[#F7F4ED]/30",
    cardHover: "hover:border-[#F7F4ED]",
    ink: "text-[#F7F4ED]",
    inkMuted: "text-[#F7F4ED]/60",
    indexPill: "border-[#F7F4ED]/40 text-[#F7F4ED]",
    archived: "bg-[#F7F4ED] text-[#1738D5]",
    metric: "text-[#FFD400]",
    border: "border-[#F7F4ED]/15",
    hint: "text-[#F7F4ED]/60 group-hover:text-[#FFD400]",
    chip: "border-[#F7F4ED]/25 text-[#F7F4ED]/75",
    statusBadge: {
      DEPLOYED: "border-[#4ADE80]/40 text-[#4ADE80] bg-[#4ADE80]/10",
      BUILDING: "border-[#FFD400]/40 text-[#FFD400] bg-[#FFD400]/10",
    },
  },
  paper: {
    card: "bg-[#F4F1EA] paper-texture border-[#2a2a2a]/20",
    cardHover: "hover:border-[#1738D5]",
    ink: "text-[#1a1a1a]",
    inkMuted: "text-[#2a2a2a]/70",
    indexPill: "border-[#1738D5]/40 text-[#1738D5]",
    archived: "bg-[#1738D5] text-[#F4F1EA]",
    metric: "text-[#1738D5]",
    border: "border-[#2a2a2a]/15",
    hint: "text-[#2a2a2a]/60 group-hover:text-[#1738D5]",
    chip: "border-[#1738D5]/30 text-[#1738D5]",
    statusBadge: {
      DEPLOYED: "border-[#15803D]/40 text-[#15803D] bg-[#15803D]/5",
      BUILDING: "border-[#1a1a1a]/40 text-[#1a1a1a] bg-[#1a1a1a]/5",
    },
  },
  black: {
    card: "bg-[#0A0A0A] border-[#FFD400]/30",
    cardHover: "hover:border-[#FFD400]",
    ink: "text-[#F4F1EA]",
    inkMuted: "text-[#6B6B6B]",
    indexPill: "border-[#FFD400]/40 text-[#FFD400]",
    archived: "bg-[#FFD400] text-[#0A0A0A]",
    metric: "text-[#FFD400]",
    border: "border-white/15",
    hint: "text-[#6B6B6B] group-hover:text-[#FFD400]",
    chip: "border-[#FFD400]/30 text-[#FFD400]/80",
    statusBadge: {
      DEPLOYED: "border-[#4ADE80]/40 text-[#4ADE80] bg-[#4ADE80]/10",
      BUILDING: "border-[#FFD400]/40 text-[#FFD400] bg-[#FFD400]/10",
    },
  },
};

export default function ProductLab() {
  const { play } = useSound();
  const reduced = usePrefersReducedMotion();
  const visitSideProject = useSessionStats((s) => s.visitSideProject);

  return (
    <section
      id="lab"
      className="env-black relative w-full overflow-hidden"
      aria-labelledby="lab-heading"
      data-cursor-label="side projects"
    >
      <div className="mx-auto w-full max-w-[1200px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
        {/* ---- Section header (custom — no stale branding) ---- */}
        <motion.div
          className="mb-10 flex items-baseline gap-3 border-b border-white/10 pb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-[#A3A3A3] sm:mb-14"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <span className="text-[#1738D5]">04</span>
          <span className="text-[#F4F1EA]/70">SIDE PROJECTS</span>
        </motion.div>

        {/* Header — large hand-display */}
        <motion.h2
          id="lab-heading"
          className="hand-display text-[12vw] leading-[0.85] tracking-tight text-[#F4F1EA] sm:text-[9vw] lg:text-8xl"
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <span>Things built out of curiosity</span>
        </motion.h2>

        {/* ====================================================
            (3) SIDE PROJECTS — 4 cards
            ==================================================== */}
        <div className="mt-8 sm:mt-10">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {LAB.sideProjects.map((project, i) => {
              const url = PROJECT_URLS[project.id] ?? "";
              const available = hasLink(url);
              const theme = THEME_STYLES[PROJECT_THEMES[project.id] ?? "black"];
              const rotate = i % 2 === 0 ? -0.6 : 0.8;
              return (
                <motion.article
                  key={project.id}
                  className={`group relative flex h-full flex-col border p-5 transition-colors duration-300 sm:p-6 ${theme.card} ${theme.cardHover}`}
                  initial={reduced ? false : { opacity: 0, y: 24, rotate }}
                  whileInView={{ opacity: 1, y: 0, rotate }}
                  viewport={{ once: true, margin: "-8% 0px" }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
                  whileHover={reduced ? undefined : { scale: 1.012, rotate: 0 }}
                  data-cursor-label={project.name}
                >
                  {/* Brutalist corner registration marks */}
                  <span aria-hidden className="pointer-events-none absolute left-1.5 top-1.5 h-2 w-2 border-l border-t border-current/30" />
                  <span aria-hidden className="pointer-events-none absolute right-1.5 top-1.5 h-2 w-2 border-r border-t border-current/30" />
                  <span aria-hidden className="pointer-events-none absolute bottom-1.5 left-1.5 h-2 w-2 border-b border-l border-current/30" />
                  <span aria-hidden className="pointer-events-none absolute bottom-1.5 right-1.5 h-2 w-2 border-b border-r border-current/30" />

                  {/* Header row: numbered marker + status badge */}
                  <div className="mb-4 flex items-center justify-between">
                    <span className={`flex h-7 w-7 items-center justify-center rounded-full border font-mono text-[10px] tabular-nums ${theme.indexPill}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`border px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.2em] ${
                        theme.statusBadge[project.status] ?? "border-white/15 text-[#F4F1EA]/70"
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>

                  {/* Project name */}
                  <h3 className={`font-display text-lg font-bold leading-[1.15] tracking-tight ${theme.ink}`}>
                    {project.name}
                  </h3>

                  {/* Description */}
                  <p className={`mt-3 text-[13px] leading-relaxed ${theme.inkMuted}`}>
                    {project.desc}
                  </p>

                  {/* Spacer */}
                  <div className="flex-1" />

                  {/* Action: OPEN PROJECT or INSPECT BUILD */}
                  <div className={`mt-5 border-t pt-3 ${theme.border}`}>
                    {available ? (
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onMouseEnter={() => play("tick")}
                        onClick={() => visitSideProject()}
                        aria-label={`Open project ${project.name}`}
                        className={`group/btn flex items-center justify-between gap-2 font-mono text-[10px] uppercase tracking-[0.25em] transition-colors hover:text-[#FFD400] ${theme.ink}`}
                      >
                        <span className="flex items-center gap-2">
                          <ExternalLink className="h-3 w-3" aria-hidden />
                          <span>open project</span>
                        </span>
                        <span
                          aria-hidden
                          className="h-px w-5 bg-current transition-all duration-300 group-hover/btn:w-9"
                        />
                      </a>
                    ) : (
                      <button
                        type="button"
                        onClick={() => { visitSideProject(); play("tick"); }}
                        aria-label={`Inspect ${project.name} build`}
                        className={`group/btn flex w-full items-center justify-between gap-2 font-mono text-[10px] uppercase tracking-[0.25em] transition-colors ${theme.hint}`}
                      >
                        <span className="flex items-center gap-2">
                          <Wrench className="h-3 w-3" aria-hidden />
                          <span>inspect build</span>
                        </span>
                        <span aria-hidden className="h-px w-5 bg-current/40 transition-all duration-300 group-hover/btn:w-9" />
                      </button>
                    )}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
