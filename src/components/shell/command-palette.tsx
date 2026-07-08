"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, CornerDownLeft, ArrowUp, ArrowDown } from "lucide-react";
import { buildSearchIndex, filterEntries, type SearchEntry } from "@/lib/search-index";
import { getLenis } from "@/lib/lenis-instance";
import { useSound } from "@/hooks/use-sound";
import { useBodyScrollLock } from "@/hooks/use-body-scroll-lock";
import { useFocusTrap } from "@/hooks/use-focus-trap";

const EASE = [0.16, 1, 0.3, 1] as const;

const TYPE_LABELS: Record<SearchEntry["type"], string> = {
  section: "SECTION",
  station: "STATION",
  experience: "EXPERIENCE",
  paper: "PAPER",
  project: "PROJECT",
};

const TYPE_COLORS: Record<SearchEntry["type"], string> = {
  section: "text-[#1738D5]",
  station: "text-[#FFD400]",
  experience: "text-[#1738D5]",
  paper: "text-[#FFD400]",
  project: "text-[#1738D5]",
};

export default function CommandPalette({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { play } = useSound();
  const [query, setQuery] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const index = useMemo(() => buildSearchIndex(), []);

  useBodyScrollLock(open);
  useFocusTrap(listRef, open, inputRef);

  const results = useMemo(() => filterEntries(index, query), [index, query]);

  // Focus the input when the palette opens
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 50);
    return () => clearTimeout(t);
  }, [open]);

  // Clamp active index when results change — derive directly to avoid
  // setState-in-effect cascading renders.
  const safeIdx = activeIdx >= results.length ? 0 : activeIdx;

  const go = (entry: SearchEntry) => {
    play("confirm");
    onClose();
    const el = document.getElementById(entry.target);
    if (!el) return;
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(el, { offset: -20, duration: 1.1 });
    else el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => Math.min(results.length - 1, i + 1));
      play("tick");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => Math.max(0, i - 1));
      play("tick");
    } else if (e.key === "Enter") {
      e.preventDefault();
      const entry = results[safeIdx];
      if (entry) go(entry);
    } else if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[175] flex items-start justify-center p-4 pt-[12vh] sm:pt-[15vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
        >
          <div className="absolute inset-0 bg-[#0A0A0A]/85 backdrop-blur-md" aria-hidden />

          <motion.div
            className="relative z-10 w-full max-w-xl overflow-hidden border border-[#1738D5]/40 bg-[#0E0E0E] shadow-2xl"
            initial={{ y: -16, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -12, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search input */}
            <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3 sm:px-5">
              <Search className="h-4 w-4 shrink-0 text-[#1738D5]" aria-hidden />
              <input
                key={open ? "open" : "closed"}
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActiveIdx(0);
                }}
                onKeyDown={onKeyDown}
                placeholder="Search sections, stations, experiences, papers, projects…"
                className="flex-1 bg-transparent font-mono text-sm text-[#F4F1EA] placeholder:text-[#6B6B6B] focus:outline-none sm:text-base"
                aria-label="Search portfolio content"
                autoComplete="off"
                spellCheck={false}
              />
              <kbd className="hidden shrink-0 border border-white/15 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-[#6B6B6B] sm:inline">
                esc
              </kbd>
            </div>

            {/* Results */}
            <div ref={listRef} className="max-h-[50vh] overflow-y-auto scroll-styled">
              {results.length === 0 ? (
                <div className="px-5 py-8 text-center font-mono text-xs uppercase tracking-[0.2em] text-[#6B6B6B]">
                  No matches for &ldquo;{query}&rdquo;
                </div>
              ) : (
                <ul role="listbox" aria-label="Search results">
                  {results.map((entry, i) => {
                    const isActive = i === safeIdx;
                    return (
                      <li key={entry.id} role="option" aria-selected={isActive}>
                        <button
                          type="button"
                          onMouseEnter={() => {
                            setActiveIdx(i);
                            play("tick");
                          }}
                          onClick={() => go(entry)}
                          className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-colors sm:px-5 ${
                            isActive
                              ? "bg-[#1738D5]/15 border-l-2 border-[#1738D5]"
                              : "border-l-2 border-transparent hover:bg-white/5"
                          }`}
                        >
                          <span
                            className={`w-20 shrink-0 font-mono text-[9px] font-bold uppercase tracking-[0.15em] ${TYPE_COLORS[entry.type]}`}
                          >
                            {TYPE_LABELS[entry.type]}
                          </span>
                          <span className="flex min-w-0 flex-1 flex-col">
                            <span className="truncate font-display text-sm font-bold text-[#F4F1EA] sm:text-base">
                              {entry.label}
                            </span>
                            <span className="truncate font-mono text-[10px] uppercase tracking-wider text-[#6B6B6B]">
                              {entry.sub}
                            </span>
                          </span>
                          {isActive && (
                            <CornerDownLeft
                              className="h-3.5 w-3.5 shrink-0 text-[#1738D5]"
                              aria-hidden
                            />
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-white/10 px-4 py-2 font-mono text-[9px] uppercase tracking-[0.2em] text-[#6B6B6B] sm:px-5">
              <span className="flex items-center gap-2">
                <span className="flex items-center gap-1">
                  <ArrowUp className="h-2.5 w-2.5" aria-hidden />
                  <ArrowDown className="h-2.5 w-2.5" aria-hidden />
                  navigate
                </span>
                <span className="text-[#6B6B6B]/40">·</span>
                <span className="flex items-center gap-1">
                  <CornerDownLeft className="h-2.5 w-2.5" aria-hidden />
                  open
                </span>
              </span>
              <span className="text-[#1738D5]">{"// cmd+k"}</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
