# Pankaj Gupta Portfolio — Session Context & Transfer Notes

> **Purpose**: Transfer this file into a new chat to give the AI full context without re-explaining everything. Documents every major change, error, decision, and gotcha across all sessions.

---

## Project Identity

- **Project Name**: Pankaj Gupta Portfolio (Mr. Onalunchbreak)
- **Alias/Identity**: `Mr. On a lunch break` — PM, Applied AI builder, researcher
- **Path**: `/Users/mrnobody/Desktop/builders-gita/projects/project-07/Pankaj Gupta Portfolio/`
- **Framework**: Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 + shadcn/ui
- **Package Manager**: Bun (`bun.lockb` present — always use `bun install` / `bun run dev`)
- **Dev port**: `3000`
- **Dev command**: `bun run dev` (includes `NODE_OPTIONS='--max-old-space-size=384'` to prevent OOM)
- **GitHub repo**: `pankaj-gupta-portfolio` (under the user's account)
- **Vercel**: Deploy via GitHub integration — auto-deploys on push to `main`

---

## Architecture Overview

```
src/
  app/
    layout.tsx           # font loading + metadata
    page.tsx             # section composition + Lenis init
    globals.css          # design tokens, utilities, animations
  components/
    shell/               # global overlays (preloader, nav, cursor, command palette, keyboard nav)
    sections/            # portfolio sections (hero, metro, lab, etc.)
  hooks/                 # use-prefers-reduced-motion, use-sound, use-count-up
  lib/
    data.ts              # ALL content data (single source of truth)
    links.ts             # resume-extracted external hyperlinks
    sfx.ts               # synthesized SFX via Howler.js
    lenis-instance.ts    # Lenis singleton shared across scroll consumers
    search-index.ts      # command palette fuzzy search index
```

**Key principle**: All user-visible content lives in `src/lib/data.ts`. Change content there first.

---

## Design System

| Token | Value | Usage |
|-------|-------|-------|
| Electric Blue | `#1738D5` | Hero background, accents |
| Warm Paper | `#F4F1EA` | Editorial sections |
| Black | `#0A0A0A` | Metro, terminal surfaces |
| Metro Yellow | `#FFD400` | Accents, CTA, clock |
| White Ink | `#F7F4ED` | Text on dark backgrounds |

**Fonts** (loaded via `next/font/google`):
- `Space Grotesk` — body/UI
- `Space Mono` — monospace/meta
- `Caveat` — handwriting (identity lockup, annotations) — CSS class: `hand-display`
- `Noto Sans Devanagari` — Hindi text in metro

---

## Sections in Order

1. **Hero** — Electric blue, "Mr. / On a / lunch / break" lockup, scattered skill tags
2. **Nav Index** — Editorial TOC with handwritten nav links
3. **Philosophy Quote** — Word-by-word scroll reveal
4. **Brand Marquee** — Infinite scroll CV cloud
5. **Origin** — Warm paper notebook, "WHAT SHOULD WE BUILD?"
6. **Product OS** — Stats, 1200+ customers, 6 stat cards
7. **Career Metro** — Horizontal pinned GSAP track (formerly "Delhi Metro")
8. **Research Archive** — 4 academic papers
9. **Product Lab** — Side projects
10. **Achievements** — Awards + education strip
11. **Contact** — Black + paper footer

---

## Career Metro — Full Technical Details

### Station Order (current)

| # | Station Name | Role | Year |
|---|--------------|------|------|
| 1 | Edukey Intelligent Systems | Marketing Role | 2019 |
| 2 | Teach for India | Teaching Volunteer | 2020 |
| 3 | Pratham Education Foundation | Data Science Intern | 2021 |
| 4 | Bosch | existing data | — |
| 5 | Cambridge JBS | existing data | — |
| 6 | CEGIS | existing data | — |
| 7 | SenseHQ | existing data | — |

Research Lab station was **removed**. Numbering is consistent.

### Keyboard Navigation

- `←` / `→` = one station at a time
- `Home` = first station, `End` = last station
- **Bug fixed (commit 6112b46)**: SenseHQ was half-visible on keyboard nav — scroll target offset calculation corrected in keyboard shortcuts handler.

### Naming Changes Applied

- Section title: "Delhi Metro" → **"Career Metro"**
- Removed: `DESTINATION: BETTER PRODUCTS / CURRENT STATUS: STILL FIGURING IT OUT`
- Removed: `DELHI METRO / MR. ONALUNCHBREAK` header
- Removed: Scrolling marquee below train ("driven by curiosity · DELHI METRO // CAREER LINE · built between...")
- Section vertical height reduced after removing marquee

---

## Hero Section — Technical Details

**File**: `src/components/sections/hero.tsx`

### Identity Lockup

```tsx
const IDENTITY_LOCKUP = [
  { text: "Mr.",   size: "text-[clamp(2rem,4vw,5rem)]"   },
  { text: "On a",  size: "text-[clamp(4rem,8vw,9rem)]"   },
  { text: "lunch", size: "text-[clamp(7rem,15vw,15rem)]" },
  { text: "break", size: "text-[clamp(6rem,13vw,13rem)]" },
];
```

**"Mr." alignment fix (commit 0ca9c5d)**:
- Problem: "Mr." appeared shifted left — not symmetrically centered over the rest
- Root cause: inner `motion.span` was `display: block` — it collapsed to text width
- Fix: outer `span` → `block w-full overflow-hidden px-6 text-center`; inner `motion.span` → `inline-block px-8 {size}`

### Clock

- Live clock top-center of hero (absolute, `left-1/2 -translate-x-1/2`)
- Size: `text-[13px] sm:text-[15px]` (increased from `10px/11px`)
- Color: Metro Yellow `#FFD400`

### Skill Tags Scatter Positions

Index 0–9 maps to `LAB.skills` array order:

```
[0] Product Strategy       → top:28%, left:25%
[1] Storytelling           → top:32%, left:78%   (was "AI Products")
[2] Customer Journey Map   → top:12%, left:20%
[3] Workflow Automation    → top:64%, left:74%
[4] Product Analytics      → top:42%, left:12%
[5] Rapid Prototyping      → top:86%, left:12%
[6] Applied AI             → top:24%, left:65%
[7] Marketing Research     → top:83%, left:76%
[8] Data Systems           → top:46%, left:74%
[9] Iteration              → top:60%, left:10%   (was "Experimentation", shifted right)
```

---

## Known Issues & Gotchas

### 1. OOM in AI Agent Sandbox
`bun run dev` crashes inside the agent's sandbox (limited RAM). Does NOT affect local machine or Vercel. Locally the `NODE_OPTIONS='--max-old-space-size=384'` in `package.json` is sufficient.

### 2. Playwright / Headless Browser
Playwright cannot run in agent sandbox (macOS mach port restriction). Visual QA must happen on the user's local machine.

### 3. Vercel Cold Start
Heavy client bundle: framer-motion, GSAP, Lenis, Howler.js. Cold start ~2-4s. Subsequent loads fast (edge cache). Fonts are preloaded via `next/font`. No `<Image>` usage so no image optimization config needed.

### 4. `typescript.ignoreBuildErrors: true` in next.config
TS errors won't fail Vercel builds. Address locally before shipping.

### 5. Prisma scripts in package.json
Leftover from scaffold. Portfolio does NOT use Prisma or database. `db:*` scripts safe to ignore.

### 6. Turbopack warning
`turbopack: { root: __dirname }` in next.config.ts causes a harmless warning. Turbopack = dev only; production uses webpack.

---

## Git Commit History

```
0ca9c5d fix(hero): center Mr. symmetrically via w-full text-center; clock font 13px/15px
6d166af feat(metro): rename first station to Edukey Intelligent Systems  
748dfa9 feat(metro): replace Research Lab with Edukey, Teach for India, Pratham
6112b46 fix(metro): correct keyboard navigation scroll target for final station
5607fc6 refactor: rename AI Products→Storytelling, Experimentation→Iteration
5caa551 refactor: rename Research tag to Marketing Research
c375b05 refactor: Delhi, India positioned vertically beside lockup
17cd44b refactor: organic rotation on skill tags, Rapid Prototyping to bottom-left
ac04550 style: increase contrast of top metadata and coordinates
007e204 refactor: shift Delhi, India to middle-right
008087e refactor: reposition skill tags, style top-left branding, center tagline
ab9430f refactor: unify sections, adapt nav/side-rail theme colors
9d5e10a refactor: tagline left, location right, remove bottom strip, center clock
```

---

## Deployment

### GitHub
- Repo: `pankaj-gupta-portfolio`
- Branch: `main`
- Push: `git push origin main`

### Vercel
- Connected via GitHub integration (auto-deploys on push to `main`)
- No environment variables required
- Build command: `next build` (auto-detected)
- Install command: `bun install` (auto-detected from `bun.lockb`)
- Custom domain: add via Vercel dashboard → Project → Settings → Domains

---

## How to Resume Work

```bash
cd "/Users/mrnobody/Desktop/builders-gita/projects/project-07/Pankaj Gupta Portfolio"
git status        # should be clean
bun run dev       # starts at http://localhost:3000
```

- **Content changes**: edit `src/lib/data.ts`
- **Visual/layout changes**: edit section in `src/components/sections/`
- **Deploy**: `git push origin main` → Vercel auto-deploys
