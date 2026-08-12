"use client";
import { motion } from "framer-motion";
import { ExternalLink, FileText, Lock } from "lucide-react";
import { Reveal } from "@/components/sections/_shared";
import ShareButton from "@/components/shell/share-button";
import { RESEARCH, type ResearchPaper } from "@/lib/data";
import { hasLink } from "@/lib/links";
import { useSound } from "@/hooks/use-sound";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ============================================================
   RESEARCH ARCHIVE
   Warm-paper environment. 4 papers rendered as archival
   document sheets — titled, stamped with venue/year, tagged
   with domain chips, slight per-card rotation that straightens
   on hover. Hover lifts the sheet and brightens its metadata.
   ============================================================ */

/* Deterministic per-card rotation + entry-offset. Each card
   enters at a slight 1–2° tilt and animates to 0°. */
const CARD_TILTS = [1.4, -1.8, 1.1, -1.3] as const;
const CARD_OFFSETS = [
  "sm:translate-y-0",
  "sm:translate-y-10",
  "sm:translate-y-4",
  "sm:translate-y-14",
] as const;

function PaperSheet({
  paper,
  index,
}: {
  paper: ResearchPaper;
  index: number;
}) {
  const { play } = useSound();
  const reduced = usePrefersReducedMotion();
  const tilt = CARD_TILTS[index % CARD_TILTS.length];
  const offset = CARD_OFFSETS[index % CARD_OFFSETS.length];
  const paperUrl = (paper as any).url || (paper as any).link || "";
  const urlAvailable = hasLink(paperUrl);

  const initialRotate = reduced ? 0 : tilt;

  return (
    <motion.article
      className={`group relative flex h-full flex-col border border-[#1a1a1a]/15 bg-[#F4F1EA]/95 p-5 shadow-[0_1px_0_rgba(0,0,0,0.04)] sm:p-6 ${offset}`}
      style={{ rotate: initialRotate }}
      initial={reduced ? false : { opacity: 0, y: 28, rotate: tilt }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: EASE }}
      whileHover={reduced ? undefined : { y: -4, rotate: 0 }}
      data-cursor-label={`paper ${paper.index}`}
    >
      {/* Corner registration marks */}
      <span aria-hidden className="pointer-events-none absolute left-1.5 top-1.5 h-2.5 w-2.5 border-l border-t border-[#1a1a1a]/30" />
      <span aria-hidden className="pointer-events-none absolute right-1.5 top-1.5 h-2.5 w-2.5 border-r border-t border-[#1a1a1a]/30" />
      <span aria-hidden className="pointer-events-none absolute bottom-1.5 left-1.5 h-2.5 w-2.5 border-b border-l border-[#1a1a1a]/30" />
      <span aria-hidden className="pointer-events-none absolute bottom-1.5 right-1.5 h-2.5 w-2.5 border-b border-r border-[#1a1a1a]/30" />

      {/* Stamp: index */}
      <div className="mb-3 flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#1a1a1a]/75">
          {paper.index.padStart(2, "0")} / 04
        </span>
      </div>

      {/* Title — display, dark ink */}
      <h3 className="font-display text-xl font-bold leading-[1.1] tracking-tight text-[#1a1a1a] sm:text-2xl">
        {paper.title}
      </h3>

      {/* Venue + year badge */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="border border-[#1738D5]/40 bg-[#1738D5]/5 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[#1738D5]">
          {paper.venue}
        </span>
        <span className="border border-[#1a1a1a]/20 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[#1a1a1a]/70">
          {paper.year}
        </span>
      </div>

      {/* Metadata — supervisor & institution */}
      {(paper.supervisor || paper.institution) && (
        <div className="mt-5 border-l-2 border-[#1738D5]/30 pl-3 transition-colors duration-300 group-hover:border-[#1738D5]">
          {paper.supervisor && (
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#1a1a1a]/85 transition-colors duration-300 group-hover:text-[#1a1a1a] sm:text-xs">
              Supervisor: {paper.supervisor}
            </p>
          )}
          {paper.institution && (
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-[#1a1a1a]/65 transition-colors duration-300 group-hover:text-[#1a1a1a]/80 sm:text-[11px]">
              {paper.institution}
            </p>
          )}
        </div>
      )}

      {/* Domain / Tags */}
      <div className="mt-5 flex flex-wrap gap-1.5">
        {(paper.tags || []).map((d: string) => (
          <span
            key={d}
            className="border border-[#1a1a1a]/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[#1a1a1a]/65"
          >
            {d}
          </span>
        ))}
      </div>

      {/* Spacer so the action sits at the bottom */}
      <div className="flex-1" />

      {/* OPEN PAPER / LINK_UNAVAILABLE */}
      <div className="mt-6 border-t border-[#1a1a1a]/10 pt-4">
        {urlAvailable ? (
          <a
            href={paperUrl}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => play("tick")}
            data-cursor-label="open paper"
            aria-label={`Open paper ${paper.title}`}
            className="group/btn flex items-center justify-between gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-[#1738D5] transition-colors hover:text-[#0F2BB0]"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="h-3.5 w-3.5" aria-hidden />
              <span>open paper</span>
            </span>
            <span
              aria-hidden
              className="h-px w-6 bg-[#1738D5] transition-all duration-300 group-hover/btn:w-10"
            />
          </a>
        ) : (
          <div
            aria-disabled="true"
            className="flex items-center justify-between gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-[#1a1a1a]/65 cursor-not-allowed"
          >
            <span className="flex items-center gap-2">
              <Lock className="h-3.5 w-3.5" aria-hidden />
              <span>link_unavailable</span>
            </span>
            <span aria-hidden className="h-px w-6 bg-[#1a1a1a]/45" />
          </div>
        )}
      </div>
    </motion.article>
  );
}

export default function ResearchArchive() {
  const reduced = usePrefersReducedMotion();

  return (
    <section
      id="research"
      className="env-paper paper-texture relative w-full overflow-hidden"
      aria-labelledby="research-heading"
      data-cursor-label="research archive"
    >
      <div className="mx-auto w-full max-w-[1200px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
        {/* ---- Section header (mirrors SectionShell without stale branding) ---- */}
        <motion.div
          className="mb-10 flex items-baseline gap-3 border-b border-[#1a1a1a]/15 pb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-[#1a1a1a]/75 sm:mb-14"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <span className="text-[#1738D5]">{RESEARCH.index}</span>
          <span className="text-[#1a1a1a]/70">{RESEARCH.title}</span>
          <span className="ml-auto" />
          <ShareButton sectionId="research" />
        </motion.div>

        {/* Headline — handwritten/display, large, dark ink */}
        <motion.h2
          id="research-heading"
          className="hand-display max-w-5xl text-[10vw] leading-[0.85] tracking-tight text-[#1a1a1a] sm:text-[7vw] lg:text-7xl"
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          {RESEARCH.headline}
        </motion.h2>


        {/* Papers grid — 4 sheets with rotation correction + staggered offset */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:mt-16 sm:grid-cols-2 sm:gap-7 lg:grid-cols-4 lg:gap-5">
          {RESEARCH.papers.map((paper, i) => (
            <PaperSheet key={paper.id} paper={paper} index={i} />
          ))}
        </div>


      </div>
    </section>
  );
}
