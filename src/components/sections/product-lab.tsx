"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
   Black environment. Three sub-systems:
     (1) Word cloud — 44-word deterministic collage.
     (2) Skill tags — 10 scattered tags, hover → scale + accent
         glow + whoosh SFX + faded preview shape behind.
     (3) Side projects — 4 cards with name, desc, category chips,
         status badge, and conditional OPEN PROJECT / INSPECT BUILD.
   ============================================================ */

/* Map a side-project id → its URL from links.ts (no fabrication). */
const PROJECT_URLS: Record<string, string> = {
  "queens-gambit": links.projects.queensGambit,
  "daily-dose-of-ai": links.projects.dailyDoseOfAI,
  "skill-tracer": links.projects.skillTracer,
  "hitchhikers-guide": links.projects.modernDataSolutions,
};

/* ---- Word cloud deterministic specs ------------------------------
   44 hand-tuned positions. Each word gets a fixed:
     - position (top/left %)
     - font-size class
     - rotation in degrees
     - colour variant: "cream" | "blue" | "yellow" | "muted"
   The arrangement is deliberately crowded so it reads as a
   collage, not a gallery. */
type WordSpec = {
  top: string;
  left?: string;
  right?: string;
  size: string;
  rotate: number;
  color: "cream" | "blue" | "yellow" | "muted";
  weight?: "bold" | "normal";
  tier?: "focal" | "medium" | "small";
};

const WORD_SPECS: WordSpec[] = [
  // 3-tier hierarchy: focal (text-5xl/6xl, bold, blue/yellow), medium (text-3xl/4xl), small (text-xl/2xl).
  // Right-side words use `right` anchoring so long words grow leftward, never overflowing.
  // Focal row (top) — Product, AI, Systems, Research
  { top: "3%",  left: "3%",  size: "text-4xl sm:text-6xl",    rotate: -3, color: "blue",   weight: "bold", tier: "focal" },   // 00 Product
  { top: "7%",  left: "26%", size: "text-xl sm:text-3xl",     rotate: 4,  color: "cream",  tier: "medium" },                  // 01 AI
  { top: "5%",  left: "40%", size: "text-base sm:text-xl",    rotate: -2, color: "muted",  tier: "small" },                   // 02 Systems
  { top: "9%",  left: "54%", size: "text-3xl sm:text-5xl",    rotate: 2,  color: "yellow", weight: "bold", tier: "focal" },   // 03 Research
  { top: "13%", right: "3%", size: "text-sm sm:text-lg",      rotate: -4, color: "cream",  tier: "small" },                   // 04 Customer Journeys
  // Row 2 — Roadmaps, Experimentation, Adoption, Automation, Analytics
  { top: "21%", left: "5%",  size: "text-2xl sm:text-4xl",    rotate: -4, color: "blue",   weight: "bold", tier: "focal" },   // 05 Roadmaps
  { top: "23%", left: "24%", size: "text-lg sm:text-2xl",     rotate: 3,  color: "cream",  tier: "medium" },                  // 06 Experimentation
  { top: "19%", left: "46%", size: "text-sm sm:text-lg",      rotate: -2, color: "muted",  tier: "small" },                   // 07 Adoption
  { top: "21%", left: "60%", size: "text-lg sm:text-2xl",     rotate: 5,  color: "cream",  tier: "medium" },                  // 08 Automation
  { top: "17%", right: "3%", size: "text-sm sm:text-lg",      rotate: -3, color: "muted",  tier: "small" },                   // 09 Analytics
  // Row 3 — B2B SaaS, GovTech, Computer Vision, NLP, Multimodal AI
  { top: "33%", left: "3%",  size: "text-xl sm:text-3xl",     rotate: 3,  color: "yellow", weight: "bold", tier: "focal" },   // 10 B2B SaaS
  { top: "37%", left: "20%", size: "text-sm sm:text-lg",      rotate: -3, color: "cream",  tier: "small" },                   // 11 GovTech
  { top: "35%", left: "34%", size: "text-lg sm:text-2xl",     rotate: 2,  color: "blue",   weight: "bold", tier: "medium" },  // 12 Computer Vision
  { top: "39%", left: "58%", size: "text-xl sm:text-3xl",     rotate: -2, color: "cream",  tier: "medium" },                  // 13 NLP
  { top: "37%", right: "3%", size: "text-sm sm:text-lg",      rotate: 3,  color: "muted",  tier: "small" },                   // 14 Multimodal AI
  // Row 4 — Data Pipelines, Prototyping, APIs, Jira, Figma, Miro
  { top: "49%", left: "5%",  size: "text-base sm:text-xl",    rotate: 4,  color: "cream",  tier: "small" },                   // 15 Data Pipelines
  { top: "51%", left: "22%", size: "text-sm sm:text-lg",      rotate: -2, color: "cream",  tier: "small" },                   // 16 Prototyping
  { top: "47%", left: "38%", size: "text-2xl sm:text-4xl",    rotate: 2,  color: "blue",   weight: "bold", tier: "focal" },   // 17 APIs
  { top: "53%", left: "58%", size: "text-sm sm:text-lg",      rotate: -3, color: "muted",  tier: "small" },                   // 18 Jira
  { top: "49%", right: "8%", size: "text-base sm:text-xl",    rotate: 3,  color: "cream",  tier: "small" },                   // 19 Figma
  { top: "55%", left: "14%", size: "text-sm sm:text-lg",      rotate: -2, color: "cream",  tier: "small" },                   // 20 Miro
  // Row 5 — Amplitude, Sigma BI, Python, SQL, Git, Tableau
  { top: "63%", left: "6%",  size: "text-lg sm:text-2xl",     rotate: 2,  color: "cream",  tier: "medium" },                  // 21 Amplitude
  { top: "65%", left: "22%", size: "text-sm sm:text-lg",      rotate: -3, color: "muted",  tier: "small" },                   // 22 Sigma BI
  { top: "61%", left: "38%", size: "text-4xl sm:text-6xl",    rotate: 1,  color: "yellow", weight: "bold", tier: "focal" },   // 23 Python ← focal
  { top: "67%", left: "62%", size: "text-base sm:text-xl",    rotate: -2, color: "cream",  tier: "small" },                   // 24 SQL
  { top: "63%", right: "5%", size: "text-sm sm:text-lg",      rotate: 4,  color: "muted",  tier: "small" },                   // 25 Git
  { top: "71%", left: "10%", size: "text-sm sm:text-lg",      rotate: -2, color: "cream",  tier: "small" },                   // 26 Tableau
  // Row 6 — n8n, OKRs, KPIs, Sprint Planning, UAT, Cross-Functional
  { top: "75%", left: "24%", size: "text-base sm:text-xl",    rotate: 3,  color: "cream",  tier: "small" },                   // 27 n8n
  { top: "77%", left: "40%", size: "text-xl sm:text-3xl",     rotate: -2, color: "blue",   weight: "bold", tier: "medium" },  // 28 OKRs
  { top: "73%", left: "58%", size: "text-sm sm:text-lg",      rotate: 3,  color: "cream",  tier: "small" },                   // 29 KPIs
  { top: "79%", right: "5%", size: "text-base sm:text-xl",    rotate: -3, color: "cream",  tier: "small" },                   // 30 Sprint Planning
  { top: "83%", left: "8%",  size: "text-sm sm:text-lg",      rotate: 2,  color: "muted",  tier: "small" },                   // 31 UAT
  { top: "85%", left: "24%", size: "text-sm sm:text-lg",      rotate: -2, color: "cream",  tier: "small" },                   // 32 Cross-Functional
  // Row 7 — Education/brand tail + signature
  { top: "87%", left: "42%", size: "text-base sm:text-xl",    rotate: 3,  color: "cream",  tier: "small" },                   // 33 Engineering Physics
  { top: "91%", left: "58%", size: "text-4xl sm:text-6xl",    rotate: -2, color: "yellow", weight: "bold", tier: "focal" },   // 34 DTU ← focal
  { top: "89%", right: "5%", size: "text-base sm:text-xl",    rotate: 2,  color: "cream",  tier: "small" },                   // 35 NextLeap
  { top: "93%", left: "8%",  size: "text-sm sm:text-lg",      rotate: -3, color: "muted",  tier: "small" },                   // 36 NYU
  // Extras — scattered brand words + signature
  { top: "27%", left: "14%", size: "text-sm sm:text-lg",      rotate: 4,  color: "muted",  tier: "small" },                   // 37 Cambridge
  { top: "45%", left: "10%", size: "text-sm sm:text-lg",      rotate: -2, color: "muted",  tier: "small" },                   // 38 Bosch
  { top: "59%", left: "32%", size: "text-sm sm:text-lg",      rotate: -2, color: "cream",  tier: "small" },                   // 39 CEGIS
  { top: "71%", left: "44%", size: "text-2xl sm:text-4xl",    rotate: 3,  color: "blue",   weight: "bold", tier: "focal" },   // 40 SenseHQ ← focal
  { top: "29%", left: "46%", size: "text-2xl sm:text-4xl",    rotate: -1, color: "blue",   weight: "bold", tier: "focal" },   // 41 Still Building ← focal
  { top: "59%", right: "12%", size: "text-sm sm:text-lg",     rotate: 2,  color: "cream",  tier: "small" },                   // 42 Too Many Tabs
  { top: "93%", left: "24%", size: "text-xl sm:text-3xl",     rotate: -3, color: "yellow", weight: "bold", tier: "medium" },  // 43 Mr. Onalunchbreak
];

const COLOR_CLASSES: Record<WordSpec["color"], string> = {
  cream: "text-[#F4F1EA]",
  blue: "text-[#1738D5]",
  yellow: "text-[#FFD400]",
  muted: "text-[#6B6B6B]",
};

/* ---- Skill-tag preview specs ------------------------------------
   On hover (or mobile tap), the active tag fades a faded abstract
   shape behind the scatter. */
type PreviewSpec = {
  shape: "blob" | "ring" | "bar";
  color: "blue" | "yellow";
  pos: string;
  size: string;
};

const PREVIEWS: Record<string, PreviewSpec> = {
  "Product Strategy":         { shape: "blob", color: "blue",   pos: "left-[8%] top-[12%]",   size: "h-64 w-64" },
  "AI Products":              { shape: "ring", color: "yellow", pos: "right-[6%] top-[8%]",   size: "h-72 w-72" },
  "Customer Journey Mapping": { shape: "bar",  color: "blue",   pos: "left-[26%] top-[42%]",  size: "h-[6px] w-72" },
  "Workflow Automation":      { shape: "blob", color: "yellow", pos: "right-[14%] top-[40%]", size: "h-56 w-56" },
  "Product Analytics":        { shape: "blob", color: "blue",   pos: "left-[14%] bottom-[10%]", size: "h-72 w-72" },
  "Rapid Prototyping":        { shape: "ring", color: "yellow", pos: "left-[44%] bottom-[14%]", size: "h-60 w-60" },
  "Applied AI":               { shape: "bar",  color: "yellow", pos: "right-[20%] bottom-[28%]", size: "h-[6px] w-64" },
  "Research":                 { shape: "blob", color: "blue",   pos: "right-[6%] bottom-[6%]", size: "h-64 w-64" },
  "Data Systems":             { shape: "ring", color: "blue",   pos: "left-[10%] top-[36%]",  size: "h-56 w-56" },
  "Experimentation":          { shape: "blob", color: "yellow", pos: "right-[34%] top-[16%]", size: "h-56 w-56" },
};

/* ---- Scattered grid positions for the 10 skill tags on sm+ ----- */
type ScatterPos = { col: string; row: string; ty: string };

const POSITIONS: ScatterPos[] = [
  { col: "sm:col-start-2",  row: "sm:row-start-1", ty: "sm:translate-y-2"   }, // Product Strategy
  { col: "sm:col-start-8",  row: "sm:row-start-1", ty: "sm:translate-y-10"  }, // AI Products
  { col: "sm:col-start-4",  row: "sm:row-start-2", ty: "sm:-translate-y-1"  }, // Customer Journey Mapping
  { col: "sm:col-start-10", row: "sm:row-start-2", ty: "sm:-translate-y-5"  }, // Workflow Automation
  { col: "sm:col-start-2",  row: "sm:row-start-4", ty: "sm:translate-y-6"   }, // Product Analytics
  { col: "sm:col-start-7",  row: "sm:row-start-4", ty: "sm:-translate-y-3"  }, // Rapid Prototyping
  { col: "sm:col-start-10", row: "sm:row-start-5", ty: "sm:translate-y-2"   }, // Applied AI
  { col: "sm:col-start-4",  row: "sm:row-start-6", ty: "sm:translate-y-1"   }, // Research
  { col: "sm:col-start-8",  row: "sm:row-start-6", ty: "sm:-translate-y-2"  }, // Data Systems
  { col: "sm:col-start-2",  row: "sm:row-start-7", ty: "sm:translate-y-4"   }, // Experimentation
];

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
  },
};

export default function ProductLab() {
  const { play } = useSound();
  const reduced = usePrefersReducedMotion();
  const visitSideProject = useSessionStats((s) => s.visitSideProject);
  const [hovered, setHovered] = useState<string | null>(null);
  const [tapped, setTapped] = useState<string | null>(null);
  const activeLabel = hovered ?? tapped;
  const activePreview = activeLabel ? PREVIEWS[activeLabel] : null;

  const onTagActivate = (label: string) => {
    if (hovered === label) return;
    setHovered(label);
    play("whoosh");
  };

  const onTagTap = (label: string) => {
    if (tapped === label) {
      setTapped(null);
      play("tick");
      return;
    }
    setTapped(label);
    play("whoosh");
  };

  return (
    <section
      id="lab"
      className="env-black relative w-full overflow-hidden"
      aria-labelledby="lab-heading"
      data-cursor-label="product lab"
    >
      <div className="mx-auto w-full max-w-[1200px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
        {/* ---- Section header (custom — no stale branding) ---- */}
        <motion.div
          className="mb-10 flex items-baseline gap-3 border-b border-white/10 pb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-[#6B6B6B] sm:mb-14"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <span className="text-[#1738D5]">{"// "}</span>
          <span className="text-[#F4F1EA]/70">PRODUCT LAB</span>
          <span className="ml-auto hidden h-px flex-1 bg-white/10 sm:block" />
          <span className="hidden sm:inline text-[#1738D5]/70">
            {"// mr_onalunchbreak.sys"}
          </span>
        </motion.div>

        {/* Header — large hand-display with muted "## " prefix */}
        <motion.h2
          id="lab-heading"
          className="hand-display text-[12vw] leading-[0.85] tracking-tight text-[#F4F1EA] sm:text-[9vw] lg:text-8xl"
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <span className="text-[#6B6B6B]">{"## "}</span>
          <span>things built on lunch breaks</span>
        </motion.h2>

        <Reveal delay={0.15}>
          <p className="mt-4 font-mono text-xs uppercase tracking-[0.25em] text-[#6B6B6B] sm:translate-x-2 sm:text-sm">
            {LAB.subtitle}
          </p>
        </Reveal>

        {/* ====================================================
            (1) WORD CLOUD — "MY CV, IN ABOUT 40 WORDS"
            ==================================================== */}
        <div className="mt-14 sm:mt-20">
          <Reveal>
            <div className="mb-6 flex items-baseline gap-3 border-b border-white/10 pb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-[#6B6B6B]">
              <span className="text-[#FFD400]">{"// "}</span>
              <span className="text-[#F4F1EA]/80">{LAB.wordCloudTitle}</span>
              <span className="ml-auto hidden h-px flex-1 bg-white/10 sm:block" />
              <span className="hidden sm:inline">
                {`// ${LAB.wordCloud.length} words`}
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div
              className="relative h-[680px] w-full overflow-hidden border border-white/5 bg-[#0E0E0E]/40 sm:h-[760px]"
              data-cursor-label="word cloud"
            >
              {/* corner registration marks */}
              <span aria-hidden className="pointer-events-none absolute left-2 top-2 h-3 w-3 border-l border-t border-white/15" />
              <span aria-hidden className="pointer-events-none absolute right-2 top-2 h-3 w-3 border-r border-t border-white/15" />
              <span aria-hidden className="pointer-events-none absolute bottom-2 left-2 h-3 w-3 border-b border-l border-white/15" />
              <span aria-hidden className="pointer-events-none absolute bottom-2 right-2 h-3 w-3 border-b border-r border-white/15" />

              {/* lunch-break stamp */}
              <span
                aria-hidden
                className="pointer-events-none absolute right-3 top-3 rotate-[6deg] select-none border border-white/10 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-[#6B6B6B]"
              >
                13:00 · lunch
              </span>

              {LAB.wordCloud.map((word, i) => {
                const spec = WORD_SPECS[i] ?? WORD_SPECS[0];
                return (
                  <motion.span
                    key={`${word}-${i}`}
                    className={`pointer-events-none absolute select-none font-display ${spec.size} ${COLOR_CLASSES[spec.color]} ${spec.weight === "bold" ? "font-bold" : "font-normal"}`}
                    style={{
                      top: spec.top,
                      left: spec.left,
                      right: spec.right,
                      rotate: spec.rotate,
                      textShadow:
                        spec.color === "yellow" || spec.color === "blue"
                          ? "0 0 24px rgba(255,212,0,0.18)"
                          : undefined,
                    }}
                    initial={reduced ? false : { opacity: 0, scale: 0.6 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-10% 0px" }}
                    transition={{
                      duration: 0.5,
                      delay: i * 0.025,
                      ease: EASE,
                    }}
                  >
                    {word}
                  </motion.span>
                );
              })}

              <span
                aria-hidden
                className="pointer-events-none absolute bottom-3 left-3 select-none font-mono text-[10px] uppercase tracking-[0.25em] text-[#6B6B6B]"
              >
                {"// a cv in collage form · powered by lunch"}
              </span>
            </div>
          </Reveal>
        </div>

        {/* ====================================================
            (2) SKILL TAGS — scattered, slightly-rotated
            ==================================================== */}
        <div className="mt-14 sm:mt-20">
          <Reveal>
            <div className="mb-6 flex items-baseline gap-3 border-b border-white/10 pb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-[#6B6B6B]">
              <span className="text-[#FFD400]">{"// "}</span>
              <span className="text-[#F4F1EA]/80">
                SKILL TAGS · hover to preview
              </span>
              <span className="ml-auto hidden h-px flex-1 bg-white/10 sm:block" />
              <span className="hidden sm:inline">
                {`// ${LAB.skills.length} tags`}
              </span>
            </div>
          </Reveal>

          <div
            className="relative mt-8 min-h-[60vh] sm:min-h-[80vh]"
            onMouseLeave={() => setHovered(null)}
          >
            {/* PREVIEW LAYER — faded abstract shape behind the tags */}
            <div
              className="pointer-events-none absolute inset-0 overflow-hidden"
              aria-hidden
            >
              <AnimatePresence>
                {activePreview && (
                  <motion.div
                    key={activeLabel}
                    className={`absolute ${activePreview.pos} ${activePreview.size}`}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 0.28, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.45, ease: EASE }}
                  >
                    {activePreview.shape === "blob" && (
                      <div
                        className={`h-full w-full rounded-full blur-3xl ${
                          activePreview.color === "blue"
                            ? "bg-[#1738D5]"
                            : "bg-[#FFD400]"
                        }`}
                      />
                    )}
                    {activePreview.shape === "ring" && (
                      <div
                        className={`h-full w-full rounded-full border-2 ${
                          activePreview.color === "blue"
                            ? "border-[#1738D5]"
                            : "border-[#FFD400]"
                        }`}
                      />
                    )}
                    {activePreview.shape === "bar" && (
                      <div
                        className={`h-full w-full ${
                          activePreview.color === "blue"
                            ? "bg-[#1738D5]"
                            : "bg-[#FFD400]"
                        }`}
                      />
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* TAGS GRID — 12-col × 7-row on sm+ */}
            <div className="relative grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-12 sm:grid-rows-7 sm:gap-x-6 sm:gap-y-10">
              {LAB.skills.map((skill, i) => {
                const pos = POSITIONS[i];
                const isActive = activeLabel === skill.label;
                const glowColor =
                  skill.rotate < 0
                    ? "border-[#1738D5] bg-[#1738D5]/10 text-[#1738D5]"
                    : "border-[#FFD400] bg-[#FFD400]/10 text-[#FFD400]";
                const glowShadow =
                  skill.rotate < 0
                    ? "0 0 30px rgba(23,56,213,0.25)"
                    : "0 0 30px rgba(255,212,0,0.25)";
                return (
                  <motion.div
                    key={skill.label}
                    className={`col-span-1 sm:col-span-3 ${pos?.col ?? ""} ${pos?.row ?? ""} ${pos?.ty ?? ""}`}
                    style={{ rotate: skill.rotate }}
                    whileHover={reduced ? undefined : { scale: 1.1 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    onHoverStart={() => onTagActivate(skill.label)}
                    onClick={() => onTagTap(skill.label)}
                    data-cursor-label={skill.label}
                  >
                    <span
                      className={`block cursor-pointer select-none border px-4 py-3 font-mono text-xs uppercase tracking-[0.2em] transition-colors duration-200 sm:text-sm ${
                        isActive
                          ? glowColor
                          : "border-white/15 bg-[#0E0E0E] text-[#F4F1EA]/80 hover:border-[#1738D5]/60 hover:text-[#F4F1EA]"
                      }`}
                      style={isActive ? { boxShadow: glowShadow } : undefined}
                    >
                      {skill.label}
                    </span>
                  </motion.div>
                );
              })}
            </div>

            <p className="mt-8 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-[#6B6B6B] sm:hidden">
              tap a tag to preview · tap again to reset
            </p>
          </div>
        </div>

        {/* ====================================================
            (3) SIDE PROJECTS — 4 cards
            ==================================================== */}
        <div className="mt-14 sm:mt-20">
          <Reveal>
            <div className="mb-6 flex items-baseline gap-3 border-b border-white/10 pb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-[#6B6B6B]">
              <span className="text-[#FFD400]">{"// "}</span>
              <span className="text-[#F4F1EA]/80">
                SIDE PROJECTS · the lab
              </span>
              <span className="ml-auto hidden h-px flex-1 bg-white/10 sm:block" />
              <span className="hidden sm:inline">
                {`// ${LAB.sideProjects.length} builds`}
              </span>
            </div>
          </Reveal>

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {LAB.sideProjects.map((project, i) => {
              const url = PROJECT_URLS[project.id] ?? "";
              const available = hasLink(url);
              const theme = THEME_STYLES[PROJECT_THEMES[project.id] ?? "black"];
              const rotate = i % 2 === 0 ? -0.6 : 0.8;
              const yOffset = i === 1 || i === 3 ? "sm:translate-y-8" : "";
              return (
                <motion.article
                  key={project.id}
                  className={`group relative flex h-full flex-col border p-5 transition-colors duration-300 sm:p-6 ${theme.card} ${theme.cardHover} ${yOffset}`}
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
                        STATUS_STYLES[project.status] ?? "border-white/15 text-[#F4F1EA]/70"
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

                  {/* Category chips */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.categories.map((cat) => (
                      <span
                        key={cat}
                        className={`border px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.2em] ${theme.chip}`}
                      >
                        {cat}
                      </span>
                    ))}
                  </div>

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

        {/* Footer microcopy */}
        <Reveal className="mt-14 sm:mt-20" delay={0.1}>
          <p className="font-hand text-lg italic text-[#F4F1EA]/55 sm:translate-x-2 sm:text-xl">
            ↳ still shipping between meetings, mistakes, and midnight energy.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
