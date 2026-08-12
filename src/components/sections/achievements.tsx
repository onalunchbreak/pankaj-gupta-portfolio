"use client";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
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
   CAROUSEL DECK COMPONENT (SOLE & DEFAULT VIEW)
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
    <div className="relative mt-6 sm:mt-8">
      {/* Navigation Controls */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-1.5 font-mono text-xs text-[#1a1a1a]/60">
          <span className="font-semibold text-[#1738D5]">
            {String(activeIndex + 1).padStart(2, "0")}
          </span>
          <span>/</span>
          <span>{String(cards.length).padStart(2, "0")}</span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => {
              play("click");
              scrollTo(activeIndex - 1);
            }}
            disabled={activeIndex === 0}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[#1a1a1a]/20 bg-[#F4F1EA] text-[#1a1a1a] transition-all hover:border-[#1738D5] hover:bg-[#1738D5] hover:text-white disabled:opacity-30 disabled:hover:border-[#1a1a1a]/20 disabled:hover:bg-[#F4F1EA] disabled:hover:text-[#1a1a1a]"
            aria-label="Previous card"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => {
              play("click");
              scrollTo(activeIndex + 1);
            }}
            disabled={activeIndex === cards.length - 1}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[#1a1a1a]/20 bg-[#F4F1EA] text-[#1a1a1a] transition-all hover:border-[#1738D5] hover:bg-[#1738D5] hover:text-white disabled:opacity-30 disabled:hover:border-[#1a1a1a]/20 disabled:hover:bg-[#F4F1EA] disabled:hover:text-[#1a1a1a]"
            aria-label="Next card"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Carousel Track */}
      <div
        ref={carouselRef}
        className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto pb-6 pt-1"
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
              className={`group relative flex h-full flex-col justify-between border bg-[#F4F1EA] p-5 shadow-sm transition-all duration-300 sm:p-6 ${
                isActive
                  ? "border-[#1738D5] shadow-md ring-1 ring-[#1738D5]/20"
                  : "border-[#1a1a1a]/15 opacity-85 hover:border-[#1738D5]/40 hover:opacity-100"
              }`}
              onMouseEnter={() => play("tick")}
            >
              {/* Corner marks */}
              <span aria-hidden className="pointer-events-none absolute left-1.5 top-1.5 h-2 w-2 border-l border-t border-[#1a1a1a]/30" />
              <span aria-hidden className="pointer-events-none absolute right-1.5 top-1.5 h-2 w-2 border-r border-t border-[#1a1a1a]/30" />
              <span aria-hidden className="pointer-events-none absolute bottom-1.5 left-1.5 h-2 w-2 border-b border-l border-[#1a1a1a]/30" />
              <span aria-hidden className="pointer-events-none absolute bottom-1.5 right-1.5 h-2 w-2 border-b border-r border-[#1a1a1a]/30" />

              {/* Year badge top-right */}
              <div className="mb-4 flex items-center justify-end">
                <span className="border border-[#1738D5]/40 bg-[#1738D5]/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[#1738D5]">
                  {card.year}
                </span>
              </div>

              {/* Big Metric Label — consistent large size across all cards */}
              <div>
                <p className="font-display text-2xl font-bold leading-tight tracking-tight text-[#1738D5] sm:text-3xl whitespace-nowrap">
                  {card.label}
                </p>
                <h3 className="mt-2.5 font-display text-lg font-bold text-[#1a1a1a] sm:text-xl whitespace-nowrap">
                  {card.org}
                </h3>
              </div>

              {/* Sub description */}
              <div className="mt-5 border-t border-[#1a1a1a]/15 pt-3">
                <p className="font-mono text-[11px] uppercase leading-relaxed tracking-[0.12em] text-[#1a1a1a]/80">
                  {card.sub}
                </p>
                {urlAvailable && (
                  <div className="mt-2.5 flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[#1738D5]">
                    <span>open credential</span>
                    <ExternalLink className="h-3 w-3" />
                  </div>
                )}
              </div>
            </div>
          );

          return (
            <motion.div
              key={`${card.org}-${index}`}
              className="w-[320px] shrink-0 snap-center sm:w-[380px] lg:w-[410px]"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: isActive ? 1 : 0.98 }}
              transition={{ duration: 0.3 }}
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
   MAIN SECTION COMPONENT (CAROUSEL DECK DEFAULT)
   ============================================================ */
export default function Achievements() {
  const reduced = usePrefersReducedMotion();

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
          className="mb-10 flex items-baseline gap-3 border-b border-[#1a1a1a]/15 pb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-[#1a1a1a]/75 sm:mb-14"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <span className="text-[#1738D5]">{ACHIEVEMENTS.index}</span>
          <span className="text-[#1a1a1a]/70">{ACHIEVEMENTS.title}</span>
          <span className="ml-auto" />
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

        {/* Sole & Default View: Carousel Deck */}
        <CarouselDeck cards={ACHIEVEMENTS.cards} />

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
