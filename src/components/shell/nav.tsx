"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useActiveSection } from "@/hooks/use-active-section";
import { useSound } from "@/hooks/use-sound";
import { useBootStore } from "@/hooks/use-boot";
import { NAV_ITEMS } from "@/lib/data";
import { getLenis } from "@/lib/lenis-instance";

// Mini-preview metadata for each nav item — shown on hover as a floating card.
const PEEK_INFO: Record<string, { env: string; desc: string }> = {
  hero: { env: "BLUE", desc: "Mr. Onalunchbreak — product × AI × systems" },
  origin: { env: "PAPER", desc: "How I accidentally became a product person" },
  "product-os": { env: "PAPER", desc: "Products with a reason — 1200+ customers" },
  "work-log": { env: "BLUE", desc: "4 experiences: SenseHQ · CEGIS · Cambridge · Bosch" },
  "best-work": { env: "BLACK", desc: "Product Line metro — 6 stations" },
  research: { env: "PAPER", desc: "4 papers — EACL · ECIR · AAAI · IEEE" },
  lab: { env: "BLACK", desc: "Side projects + 44-word CV cloud" },
  contact: { env: "BLACK+PAPER", desc: "Talk product with me" },
};

// Sections with light (paper) backgrounds need dark nav text.
// Sections with dark (blue/black) backgrounds need light nav text.
const LIGHT_BG_SECTIONS = new Set([
  "origin",
  "product-os",
  "research",
  "achievements",
]);

export default function Nav() {
  const ids = NAV_ITEMS.map((n) => n.id);
  const active = useActiveSection(ids);
  const { play } = useSound();
  const booted = useBootStore((s) => s.booted);
  const [hovered, setHovered] = useState<string | null>(null);

  // Adapt nav colors to the active section's background.
  const onLightBg = LIGHT_BG_SECTIONS.has(active);

  const go = (id: string) => {
    play("confirm");
    const el = document.getElementById(id);
    if (!el) return;
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(el, { offset: -20, duration: 1.2 });
    } else {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <AnimatePresence>
      {booted && (
        <motion.nav
          className="fixed right-0 top-1/2 z-[75] hidden -translate-y-1/2 flex-col items-end gap-1 pr-4 xl:flex"
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 24 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          aria-label="Section navigation"
          onMouseLeave={() => setHovered(null)}
        >
          {NAV_ITEMS.map((item) => {
            const isActive = active === item.id;
            const isHovered = hovered === item.id;
            const peek = PEEK_INFO[item.id];
            // Color tokens that flip based on the active section's background.
            // On paper (light) sections: dark text + dark accent.
            // On dark/blue/black sections: light text + blue accent.
            const inactiveText = onLightBg
              ? "text-[#1a1a1a]/45 group-hover:text-[#1a1a1a]"
              : "text-[#F4F1EA]/55 group-hover:text-[#F4F1EA]";
            const inactiveRule = onLightBg
              ? "bg-[#1a1a1a]/25 group-hover:bg-[#1738D5]"
              : "bg-white/25 group-hover:bg-[#1738D5]";
            const activeText = "text-[#1738D5]";
            const activeRule = "bg-[#1738D5]";
            return (
              <div key={item.id} className="relative flex items-center justify-end">
                {/* Floating peek card — appears on hover to the LEFT of the nav item */}
                <AnimatePresence>
                  {isHovered && peek && (
                    <motion.div
                      className="pointer-events-none absolute right-full mr-3 top-1/2 -translate-y-1/2 w-56 border border-[#1738D5]/40 bg-[#0A0A0A]/95 p-3 backdrop-blur-md"
                      initial={{ opacity: 0, x: 8, scale: 0.96 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: 8, scale: 0.96 }}
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      aria-hidden
                    >
                      <div className="mb-1 flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.25em]">
                        <span className="text-[#1738D5]">{"//"}</span>
                        <span className="text-[#6B6B6B]">env: {peek.env}</span>
                      </div>
                      <p className="font-display text-xs font-bold leading-tight tracking-tight text-[#F4F1EA]">
                        {item.label}
                      </p>
                      <p className="mt-1 font-mono text-[10px] leading-relaxed text-[#F4F1EA]/65">
                        {peek.desc}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  onClick={() => go(item.id)}
                  onMouseEnter={() => {
                    play("tick");
                    setHovered(item.id);
                  }}
                  data-cursor-label={isActive ? "here" : "go"}
                  className="group flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest transition-colors focus-ring"
                  aria-current={isActive ? "true" : undefined}
                >
                  <span
                    className={`h-px transition-all duration-300 ${
                      isActive ? `w-8 ${activeRule}` : `w-4 ${inactiveRule} group-hover:w-7`
                    }`}
                  />
                  <span
                    className={`transition-colors ${
                      isActive ? activeText : inactiveText
                    }`}
                  >
                    {item.label}
                  </span>
                </button>
              </div>
            );
          })}
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
