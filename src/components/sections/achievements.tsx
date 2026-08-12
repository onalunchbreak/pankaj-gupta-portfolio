"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ChevronLeft, ChevronRight, Disc, SlidersHorizontal, LayoutGrid } from "lucide-react";
import { Reveal } from "@/components/sections/_shared";
import ShareButton from "@/components/shell/share-button";
import { ACHIEVEMENTS } from "@/lib/data";
import { hasLink } from "@/lib/links";
import { useSound } from "@/hooks/use-sound";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

type AchievementCard = (typeof ACHIEVEMENTS.cards)[number];
type EducationItem = (typeof ACHIEVEMENTS.education)[number];

/* ============================================================
   1. SPOTIFY CAROUSEL DECK COMPONENT
   ============================================================ */
function CarouselDeck({ cards }: { cards: AchievementCard[] }) {
  const { play } = useSound();
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollTo = (index: number) => {
    if (!carouselRef.current) return;
    const clamped = Math.max(0, Math.min(cards.length - 1, index));
    setActiveIndex(clamped);
    const container = carouselRef.current;
    const children = container.children;
    if (children[clamped]) {
      (children[clamped] as HTMLElement).scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  };

  return (
    <div className="relative mt-8 sm:mt-12">
      {/* Navigation Controls */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#1738D5]">
            {String(activeIndex + 1).padStart(2, "0")}
          </span>
          <span className="font-mono text-xs text-[#1a1a1a]/40">/</span>
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#1a1a1a]/60">
            {String(cards.length).padStart(2, "0")}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              play("click");
              scrollTo(activeIndex - 1);
            }}
            disabled={activeIndex === 0}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#1a1a1a]/20 bg-[#F4F1EA] text-[#1a1a1a] transition-all hover:border-[#1738D5] hover:bg-[#1738D5] hover:text-white disabled:opacity-30 disabled:hover:border-[#1a1a1a]/20 disabled:hover:bg-[#F4F1EA] disabled:hover:text-[#1a1a1a]"
            aria-label="Previous card"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => {
              play("click");
              scrollTo(activeIndex + 1);
            }}
            disabled={activeIndex === cards.length - 1}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#1a1a1a]/20 bg-[#F4F1EA] text-[#1a1a1a] transition-all hover:border-[#1738D5] hover:bg-[#1738D5] hover:text-white disabled:opacity-30 disabled:hover:border-[#1a1a1a]/20 disabled:hover:bg-[#F4F1EA] disabled:hover:text-[#1a1a1a]"
            aria-label="Next card"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Horizontal Carousel Track */}
      <div
        ref={carouselRef}
        className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto pb-8 pt-2"
        onScroll={(e) => {
          const target = e.currentTarget;
          const cardWidth = target.scrollWidth / cards.length;
          const idx = Math.round(target.scrollLeft / cardWidth);
          if (idx !== activeIndex && idx >= 0 && idx < cards.length) {
            setActiveIndex(idx);
          }
        }}
      >
        {cards.map((card, index) => {
          const isActive = index === activeIndex;
          const urlAvailable = hasLink(card.url);

          const innerCard = (
            <div
              className={`group relative flex h-full flex-col justify-between border bg-[#F4F1EA] p-7 shadow-lg transition-all duration-500 sm:p-8 ${
                isActive
                  ? "border-[#1738D5] shadow-xl ring-2 ring-[#1738D5]/20"
                  : "border-[#1a1a1a]/15 opacity-85 hover:border-[#1738D5]/40 hover:opacity-100"
              }`}
              onMouseEnter={() => play("tick")}
            >
              {/* Corner marks */}
              <span aria-hidden className="pointer-events-none absolute left-2 top-2 h-3 w-3 border-l-2 border-t-2 border-[#1a1a1a]/30" />
              <span aria-hidden className="pointer-events-none absolute right-2 top-2 h-3 w-3 border-r-2 border-t-2 border-[#1a1a1a]/30" />
              <span aria-hidden className="pointer-events-none absolute bottom-2 left-2 h-3 w-3 border-b-2 border-l-2 border-[#1a1a1a]/30" />
              <span aria-hidden className="pointer-events-none absolute bottom-2 right-2 h-3 w-3 border-b-2 border-r-2 border-[#1a1a1a]/30" />

              {/* Year badge */}
              <div className="mb-6 flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#1738D5]">
                  ✦ TRACK 0{index + 1}
                </span>
                <span className="border border-[#1738D5]/40 bg-[#1738D5]/10 px-3 py-1 font-mono text-xs uppercase tracking-[0.2em] text-[#1738D5]">
                  {card.year}
                </span>
              </div>

              {/* Big Metric Label */}
              <div>
                <p className="font-display text-4xl font-bold leading-tight tracking-tight text-[#1738D5] sm:text-5xl">
                  {card.label}
                </p>
                <h3 className="mt-4 font-display text-xl font-bold text-[#1a1a1a] sm:text-2xl">
                  {card.org}
                </h3>
              </div>

              {/* Sub description */}
              <div className="mt-8 border-t border-[#1a1a1a]/15 pt-4">
                <p className="font-mono text-xs uppercase leading-relaxed tracking-[0.15em] text-[#1a1a1a]/80">
                  {card.sub}
                </p>
                {urlAvailable && (
                  <div className="mt-3 flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.2em] text-[#1738D5]">
                    <span>view credential</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </div>
                )}
              </div>
            </div>
          );

          return (
            <motion.div
              key={`${card.org}-${index}`}
              className="w-[310px] shrink-0 snap-center sm:w-[380px] lg:w-[440px]"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: isActive ? 1 : 0.97 }}
              transition={{ duration: 0.4 }}
            >
              {urlAvailable ? (
                <a
                  href={card.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full focus-ring"
                >
                  {innerCard}
                </a>
              ) : (
                innerCard
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* ============================================================
   2. EXPANDABLE TILES (ACCORDION STRIP) COMPONENT
   ============================================================ */
function ExpandableTiles({ cards }: { cards: AchievementCard[] }) {
  const { play } = useSound();
  const [expandedIndex, setExpandedIndex] = useState(0);

  return (
    <div className="mt-8 sm:mt-12">
      {/* Desktop Accordion Grid */}
      <div className="hidden min-h-[380px] w-full gap-4 lg:flex">
        {cards.map((card, index) => {
          const isExpanded = expandedIndex === index;
          const urlAvailable = hasLink(card.url);

          return (
            <motion.div
              key={`${card.org}-${index}`}
              onClick={() => {
                play("click");
                setExpandedIndex(index);
              }}
              onMouseEnter={() => play("tick")}
              className={`relative flex cursor-pointer flex-col justify-between border bg-[#F4F1EA] p-6 shadow-md transition-all duration-500 ${
                isExpanded
                  ? "flex-[3.5] border-[#1738D5] bg-[#F4F1EA] ring-2 ring-[#1738D5]/20 shadow-xl"
                  : "flex-1 border-[#1a1a1a]/15 opacity-75 hover:border-[#1738D5]/40 hover:opacity-100"
              }`}
            >
              {/* Header / Year */}
              <div className="flex items-center justify-between">
                <span className="border border-[#1738D5]/40 bg-[#1738D5]/10 px-2.5 py-1 font-mono text-xs uppercase tracking-[0.18em] text-[#1738D5]">
                  {card.year}
                </span>
                {isExpanded && (
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#1738D5]">
                    ✦ ACTIVE EXPANSION
                  </span>
                )}
              </div>

              {/* Main Content */}
              <div className="my-auto py-4">
                <p
                  className={`font-display font-bold leading-tight tracking-tight text-[#1738D5] transition-all duration-300 ${
                    isExpanded ? "text-4xl sm:text-5xl" : "text-xl sm:text-2xl"
                  }`}
                >
                  {card.label}
                </p>
                <h3 className="mt-2 font-display text-lg font-bold text-[#1a1a1a]">
                  {card.org}
                </h3>
              </div>

              {/* Expanded details */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-[#1a1a1a]/15 pt-4"
                  >
                    <p className="font-mono text-xs uppercase leading-relaxed tracking-[0.15em] text-[#1a1a1a]/85">
                      {card.sub}
                    </p>
                    {urlAvailable && (
                      <a
                        href={card.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="mt-3 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.2em] text-[#1738D5] hover:underline"
                      >
                        <span>open credential</span>
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Mobile Stacked Accordion */}
      <div className="flex flex-col gap-4 lg:hidden">
        {cards.map((card, index) => {
          const isExpanded = expandedIndex === index;
          const urlAvailable = hasLink(card.url);

          return (
            <div
              key={`${card.org}-${index}`}
              onClick={() => {
                play("click");
                setExpandedIndex(expandedIndex === index ? -1 : index);
              }}
              className={`border bg-[#F4F1EA] p-5 transition-all ${
                isExpanded ? "border-[#1738D5] shadow-lg" : "border-[#1a1a1a]/15"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase text-[#1738D5]">
                  {card.year}
                </span>
                <span className="font-mono text-xs text-[#1a1a1a]/60">
                  {isExpanded ? "−" : "+"}
                </span>
              </div>
              <h3 className="mt-2 font-display text-2xl font-bold text-[#1738D5]">
                {card.label}
              </h3>
              <p className="font-display text-base font-bold text-[#1a1a1a]">
                {card.org}
              </p>
              {isExpanded && (
                <div className="mt-4 border-t border-[#1a1a1a]/15 pt-3">
                  <p className="font-mono text-xs uppercase leading-relaxed text-[#1a1a1a]/80">
                    {card.sub}
                  </p>
                  {urlAvailable && (
                    <a
                      href={card.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-1 font-mono text-xs uppercase text-[#1738D5]"
                    >
                      <span>open credential</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ============================================================
   3. CLASSIC GRID COMPONENT (WITH NO STAMPS & SPACIOUS WIDTH)
   ============================================================ */
function ValidationCard({
  card,
  index,
}: {
  card: AchievementCard;
  index: number;
}) {
  const { play } = useSound();
  const reduced = usePrefersReducedMotion();
  const urlAvailable = hasLink(card.url);

  const inner = (
    <motion.article
      className={`group relative flex h-full flex-col justify-between border border-[#1a1a1a]/15 bg-[#F4F1EA]/95 p-6 shadow-[0_1px_0_rgba(0,0,0,0.04)] transition-all duration-300 sm:p-7 ${
        urlAvailable ? "cursor-pointer hover:border-[#1738D5]/50 hover:shadow-md" : ""
      }`}
      initial={reduced ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: EASE }}
      whileHover={reduced ? undefined : { y: -4 }}
      onMouseEnter={() => play("tick")}
      data-cursor-label={urlAvailable ? "open" : `${card.org} · ${card.year}`}
    >
      {/* Corner registration marks */}
      <span aria-hidden className="pointer-events-none absolute left-2 top-2 h-2.5 w-2.5 border-l border-t border-[#1a1a1a]/30" />
      <span aria-hidden className="pointer-events-none absolute right-2 top-2 h-2.5 w-2.5 border-r border-t border-[#1a1a1a]/30" />
      <span aria-hidden className="pointer-events-none absolute bottom-2 left-2 h-2.5 w-2.5 border-b border-l border-[#1a1a1a]/30" />
      <span aria-hidden className="pointer-events-none absolute bottom-2 right-2 h-2.5 w-2.5 border-b border-r border-[#1a1a1a]/30" />

      {/* Year badge top-right */}
      <div className="mb-4 flex items-center justify-end">
        <span className="border border-[#1738D5]/50 bg-[#1738D5]/5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[#1738D5]">
          {card.year}
        </span>
      </div>

      {/* Focal metric — large & readable */}
      <div>
        <p className={`font-display font-bold leading-[0.95] tracking-tight text-[#1738D5] break-words ${
          card.label.length > 14
            ? "text-2xl sm:text-3xl"
            : card.label.length > 10
            ? "text-3xl sm:text-4xl"
            : "text-4xl sm:text-5xl"
        }`}>
          {card.label}
        </p>

        {/* Org name */}
        <h3 className="mt-3 font-display text-lg font-bold leading-[1.1] tracking-tight text-[#1a1a1a] sm:text-xl">
          {card.org}
        </h3>
      </div>

      {/* Sub — mono, muted */}
      <div className="mt-6 flex items-start gap-2 border-t border-[#1a1a1a]/10 pt-4 transition-colors duration-300 group-hover:border-[#1738D5]/30">
        <span aria-hidden className="mt-1 h-3 w-1 shrink-0 bg-[#1738D5]/40 transition-colors duration-300 group-hover:bg-[#1738D5]" />
        <p className="flex-1 font-mono text-[10px] uppercase leading-relaxed tracking-[0.15em] text-[#1a1a1a]/75 transition-colors duration-300 group-hover:text-[#1a1a1a]/90">
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
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#1a1a1a]/75">
        {item.label}
      </span>
      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#1738D5]">
        {item.sub}
      </span>
    </motion.div>
  );
}

/* ============================================================
   MAIN SECTION COMPONENT WITH VIEW SWITCHER
   ============================================================ */
export default function Achievements() {
  const reduced = usePrefersReducedMotion();
  const [viewMode, setViewMode] = useState<"carousel" | "accordion" | "grid">("carousel");

  return (
    <section
      id="achievements"
      className="env-paper paper-texture relative w-full overflow-hidden"
      aria-labelledby="achievements-heading"
      data-cursor-label="achievements"
    >
      <div className="mx-auto w-full max-w-[1200px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
        {/* ---- Section header ---- */}
        <motion.div
          className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-[#1a1a1a]/15 pb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-[#1a1a1a]/75 sm:mb-14"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <div className="flex items-center gap-3">
            <span className="text-[#1738D5]">{ACHIEVEMENTS.index}</span>
            <span className="text-[#1a1a1a]/70">{ACHIEVEMENTS.title}</span>
          </div>

          {/* Interactive View Switcher Controls */}
          <div className="flex items-center gap-1 rounded-full border border-[#1a1a1a]/20 bg-[#F4F1EA]/80 p-1 backdrop-blur-sm">
            <button
              onClick={() => setViewMode("carousel")}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] transition-all ${
                viewMode === "carousel"
                  ? "bg-[#1738D5] text-white shadow-sm"
                  : "text-[#1a1a1a]/70 hover:text-[#1738D5]"
              }`}
            >
              <Disc className="h-3 w-3" />
              <span>Carousel</span>
            </button>
            <button
              onClick={() => setViewMode("accordion")}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] transition-all ${
                viewMode === "accordion"
                  ? "bg-[#1738D5] text-white shadow-sm"
                  : "text-[#1a1a1a]/70 hover:text-[#1738D5]"
              }`}
            >
              <SlidersHorizontal className="h-3 w-3" />
              <span>Expandable</span>
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] transition-all ${
                viewMode === "grid"
                  ? "bg-[#1738D5] text-white shadow-sm"
                  : "text-[#1a1a1a]/70 hover:text-[#1738D5]"
              }`}
            >
              <LayoutGrid className="h-3 w-3" />
              <span>Grid</span>
            </button>
          </div>

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

        {/* Render View Mode based on Switcher selection */}
        {viewMode === "carousel" && <CarouselDeck cards={ACHIEVEMENTS.cards} />}
        {viewMode === "accordion" && <ExpandableTiles cards={ACHIEVEMENTS.cards} />}
        {viewMode === "grid" && (
          <div className="mt-12 grid grid-cols-1 gap-6 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
            {ACHIEVEMENTS.cards.map((card, i) => (
              <ValidationCard key={`${card.org}-${card.year}`} card={card} index={i} />
            ))}
          </div>
        )}

        {/* Education strip — secondary, horizontal */}
        <div className="mt-16 sm:mt-24">
          <Reveal>
            <div className="mb-6 flex items-baseline gap-3 border-b border-[#1a1a1a]/15 pb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-[#1a1a1a]/75">
              <span className="text-[#1a1a1a]/70">
                EDUCATION
              </span>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {ACHIEVEMENTS.education.map((item, i) => (
              <EducationStripItem key={`${item.org}-${i}`} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
