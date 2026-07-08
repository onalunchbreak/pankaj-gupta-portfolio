"use client";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Reveal } from "@/components/sections/_shared";
import ShareButton from "@/components/shell/share-button";
import { ACHIEVEMENTS } from "@/lib/data";
import { hasLink } from "@/lib/links";
import { useSound } from "@/hooks/use-sound";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ============================================================
   ACHIEVEMENTS / EXTERNAL VALIDATION
   Warm-paper environment. 4 validation cards (paper sheets with
   rotation correction) + a secondary education strip below.
   ============================================================ */

/* Deterministic per-card rotation + entry-offset for the
   intentional misalignment the spec calls for. Cards enter at a
   1–2° tilt and animate to 0°. */
const CARD_TILTS = [1.6, -1.2, 1.3, -1.6] as const;
const CARD_OFFSETS = [
  "sm:translate-y-0",
  "sm:translate-y-8",
  "sm:translate-y-2",
  "sm:translate-y-12",
] as const;

type AchievementCard = (typeof ACHIEVEMENTS.cards)[number];
type EducationItem = (typeof ACHIEVEMENTS.education)[number];

function ValidationCard({
  card,
  index,
}: {
  card: AchievementCard;
  index: number;
}) {
  const { play } = useSound();
  const reduced = usePrefersReducedMotion();
  const tilt = CARD_TILTS[index % CARD_TILTS.length];
  const offset = CARD_OFFSETS[index % CARD_OFFSETS.length];
  const urlAvailable = hasLink(card.url);

  const inner = (
    <motion.article
      className={`group relative flex h-full flex-col border border-[#1a1a1a]/15 bg-[#F4F1EA]/95 p-5 shadow-[0_1px_0_rgba(0,0,0,0.04)] transition-colors duration-300 sm:p-6 ${urlAvailable ? "cursor-pointer hover:border-[#1738D5]/50" : ""} ${offset}`}
      style={{ rotate: reduced ? 0 : tilt }}
      initial={reduced ? false : { opacity: 0, y: 24, rotate: tilt }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: EASE }}
      whileHover={reduced ? undefined : { y: -4, rotate: 0 }}
      onMouseEnter={() => play("tick")}
      data-cursor-label={urlAvailable ? "open" : `${card.org} · ${card.year}`}
    >
      {/* Corner registration marks */}
      <span aria-hidden className="pointer-events-none absolute left-1.5 top-1.5 h-2.5 w-2.5 border-l border-t border-[#1a1a1a]/30" />
      <span aria-hidden className="pointer-events-none absolute right-1.5 top-1.5 h-2.5 w-2.5 border-r border-t border-[#1a1a1a]/30" />
      <span aria-hidden className="pointer-events-none absolute bottom-1.5 left-1.5 h-2.5 w-2.5 border-b border-l border-[#1a1a1a]/30" />
      <span aria-hidden className="pointer-events-none absolute bottom-1.5 right-1.5 h-2.5 w-2.5 border-b border-r border-[#1a1a1a]/30" />

      {/* Stamp: index + year badge */}
      <div className="mb-4 flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#6B6B6B]">
          {String(index + 1).padStart(2, "0")} / 04
        </span>
        <span className="border border-[#1738D5]/50 bg-[#1738D5]/5 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[#1738D5]">
          {card.year}
        </span>
      </div>

      {/* Focal metric — the big number/label is the hero of the card */}
      <p className="font-display text-4xl font-bold leading-[0.9] tracking-tighter text-[#1738D5] sm:text-5xl">
        {card.label}
      </p>

      {/* Org name — medium, dark ink */}
      <h3 className="mt-3 font-display text-lg font-bold leading-[1.1] tracking-tight text-[#1a1a1a] sm:text-xl">
        {card.org}
      </h3>

      {/* Spacer pushes sub to bottom */}
      <div className="flex-1" />

      {/* Sub — mono, muted, with a hover accent rule on the left */}
      <div className="mt-4 flex items-start gap-2 border-t border-[#1a1a1a]/10 pt-3 transition-colors duration-300 group-hover:border-[#1738D5]/30">
        <span aria-hidden className="mt-1 h-3 w-1 shrink-0 bg-[#1738D5]/40 transition-colors duration-300 group-hover:bg-[#1738D5]" />
        <p className="flex-1 font-mono text-[10px] uppercase leading-relaxed tracking-[0.15em] text-[#6B6B6B] transition-colors duration-300 group-hover:text-[#1a1a1a]/70">
          {card.sub}
        </p>
        {urlAvailable && (
          <span className="flex shrink-0 items-center gap-1 font-mono text-[9px] uppercase tracking-[0.2em] text-[#1738D5] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            open
            <ExternalLink className="h-2.5 w-2.5" aria-hidden />
          </span>
        )}
      </div>
    </motion.article>
  );

  if (urlAvailable) {
    return (
      <a
        href={card.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${card.org} — open credential (opens in new tab)`}
        className="block h-full focus-ring"
      >
        {inner}
      </a>
    );
  }
  return inner;
}

function EducationStripItem({
  item,
  index,
}: {
  item: EducationItem;
  index: number;
}) {
  const reduced = usePrefersReducedMotion();
  return (
    <motion.div
      className="flex flex-col gap-1 border-l-2 border-[#1738D5]/30 pl-3 transition-colors duration-300 hover:border-[#1738D5]"
      initial={reduced ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.6, delay: index * 0.07, ease: EASE }}
    >
      <span className="font-display text-base font-bold tracking-tight text-[#1a1a1a]">
        {item.org}
      </span>
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#6B6B6B]">
        {item.label}
      </span>
      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#1738D5]">
        {item.sub}
      </span>
    </motion.div>
  );
}

export default function Achievements() {
  const reduced = usePrefersReducedMotion();

  return (
    <section
      id="achievements"
      className="env-paper paper-texture relative w-full overflow-hidden"
      aria-labelledby="achievements-heading"
      data-cursor-label="achievements"
    >
      <div className="mx-auto w-full max-w-[1200px] px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
        {/* ---- Section header ---- */}
        <motion.div
          className="mb-10 flex items-baseline gap-3 border-b border-[#1a1a1a]/15 pb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-[#6B6B6B] sm:mb-14"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <span className="text-[#1738D5]">{ACHIEVEMENTS.index}</span>
          <span className="text-[#1a1a1a]/70">{ACHIEVEMENTS.title}</span>
          <span className="ml-auto hidden h-px flex-1 bg-[#1a1a1a]/10 sm:block" />
          <span className="hidden sm:inline text-[#1738D5]/70">
            {"// signals.log"}
          </span>
          <ShareButton sectionId="achievements" />
        </motion.div>

        {/* Headline — handwritten, large, dark ink */}
        <motion.h2
          id="achievements-heading"
          className="hand-display max-w-5xl text-[9vw] leading-[0.85] tracking-tight text-[#1a1a1a] sm:text-[6vw] lg:text-6xl"
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          {ACHIEVEMENTS.headline}
        </motion.h2>

        {/* Validation cards grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:mt-16 sm:grid-cols-2 sm:gap-7 lg:grid-cols-4 lg:gap-5">
          {ACHIEVEMENTS.cards.map((card, i) => (
            <ValidationCard key={`${card.org}-${card.year}`} card={card} index={i} />
          ))}
        </div>

        {/* Education strip — secondary, horizontal */}
        <div className="mt-16 sm:mt-24">
          <Reveal>
            <div className="mb-6 flex items-baseline gap-3 border-b border-[#1a1a1a]/15 pb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-[#6B6B6B]">
              <span className="text-[#1738D5]">{"// "}</span>
              <span className="text-[#1a1a1a]/70">
                education · secondary signal
              </span>
              <span className="ml-auto hidden h-px flex-1 bg-[#1a1a1a]/10 sm:block" />
              <span className="hidden sm:inline text-[#6B6B6B]">
                {`// ${ACHIEVEMENTS.education.length} institutions`}
              </span>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {ACHIEVEMENTS.education.map((item, i) => (
              <EducationStripItem key={`${item.org}-${i}`} item={item} index={i} />
            ))}
          </div>
        </div>

        {/* Footer microcopy */}
        <Reveal className="mt-14 sm:mt-20" delay={0.1}>
          <p className="font-hand text-lg italic text-[#1a1a1a]/60 sm:translate-x-2 sm:text-xl">
            ↳ external validation, not the goal. the work is.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
