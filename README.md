# Pankaj Gupta — Mr. Onalunchbreak // Portfolio

**🌐 Live:** [guptapankaj.vercel.app](https://guptapankaj.vercel.app)

A highly personal, interactive, editorial portfolio for **Pankaj Gupta** (alias: Mr. Onalunchbreak) — Product Manager, Applied AI builder, researcher, systems thinker.

The portfolio preserves the strongest experiential characteristics of the reference (bajkamalsingh.me) — intentional visual irregularity, editorial storytelling, handwritten interventions, blue/paper/black visual rhythm, playful system interfaces, scroll-based narrative, surprising transitions, interactive project exploration, gamified Best Work experience, dense case-study storytelling, and a memorable terminal-style ending — while communicating Pankaj's actual professional identity.

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Requirements](#requirements)
- [Local Development](#local-development)
- [Deploying to Vercel](#deploying-to-vercel)
- [Design System](#design-system)
- [Sections](#sections-in-order)
- [Features](#features)
- [Dependencies](#dependencies)
- [Hyperlinks](#hyperlinks-extracted-from-resume)
- [Project Structure](#project-structure)
- [Troubleshooting](#troubleshooting)
- [Handover](#handover)
- [License](#license)

---

## Tech Stack

| Category | Technology | Version |
|----------|-----------|---------|
| **Framework** | Next.js (App Router) | ^16.1.1 |
| **Language** | TypeScript | ^5 |
| **Runtime** | Node.js | ≥18.18.0 (tested on v24) |
| **Package Manager** | Bun | ≥1.0 (tested on 1.3.14) |
| **Styling** | Tailwind CSS v4 + shadcn/ui | ^4 |
| **Motion** | Framer Motion + GSAP/ScrollTrigger + Lenis | ^12 / ^3.15 / ^1.3 |
| **Audio** | Howler.js (synthesized SFX — no external assets) | ^2.2.4 |
| **Icons** | lucide-react | ^0.525 |
| **State** | Zustand | ^5.0.6 |
| **Fonts** | Space Grotesk, Space Mono, Inter, Noto Sans Devanagari, Caveat (via next/font) |

---

## Requirements

### System Requirements

- **Node.js** ≥ 18.18.0 (recommended: v20 LTS or v24)
- **Bun** ≥ 1.0 (used as the package manager + dev runner)
- **Operating System**: macOS, Linux, or Windows (WSL2 recommended)
- **Memory**: ≥ 512MB free RAM for dev server (the dev script caps Node's heap at 384MB via `NODE_OPTIONS`)

### Install Bun

```bash
# macOS / Linux
curl -fsSL https://bun.sh/install | bash

# Windows (WSL2 / PowerShell)
powershell -c "irm bun.sh/install.ps1 | iex"

# Verify
bun --version   # should print >= 1.0.x
```

### Install Node.js (if not already installed)

```bash
# Via nvm (recommended)
nvm install --lts
nvm use --lts
node --version   # should print >= 18.18.0
```

---

## Local Development

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/pankaj-gupta-portfolio.git
cd pankaj-gupta-portfolio
```

### 2. Install dependencies

```bash
bun install
```

### 3. Start the dev server

```bash
bun run dev
```

The dev server starts on **http://localhost:3000** with an optimized memory limit (`NODE_OPTIONS='--max-old-space-size=384'`) to prevent OOM kills in constrained environments.

> **Note**: The first compile takes ~7 seconds (Turbopack). Subsequent requests are ~100ms.

### 4. Lint

```bash
bun run lint
```

### 5. Build for production

```bash
bun run build
```

### 6. Start production server (optional — for local prod testing)

```bash
bun run start
```

### Available Scripts

| Script | Description |
|--------|-------------|
| `bun run dev` | Start dev server on :3000 (with memory limit) |
| `bun run build` | Production build |
| `bun run start` | Start production server |
| `bun run lint` | Run ESLint |
| `bun run db:push` | Push Prisma schema to SQLite (if using DB) |
| `bun run db:generate` | Generate Prisma client |
| `bun run db:migrate` | Run Prisma migrations |
| `bun run db:reset` | Reset Prisma database |

---

## Deploying to Vercel

This project is optimized for Vercel deployment.

### Option A: Deploy via Vercel CLI

1. **Install the Vercel CLI**

   ```bash
   bun add -g vercel
   # or: npm i -g vercel
   ```

2. **Login to Vercel**

   ```bash
   vercel login
   ```

3. **Deploy from the project root**

   ```bash
   # Preview deployment
   vercel

   # Production deployment
   vercel --prod
   ```

   Vercel auto-detects Next.js and configures the build automatically.

### Option B: Deploy via Vercel Dashboard (GitHub Integration)

1. Push your code to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new).
3. Import your GitHub repository.
4. Vercel auto-detects Next.js — no additional configuration needed.
5. Click **Deploy**.

### Vercel Configuration

The `next.config.ts` is already configured for Vercel:
- **Framework preset**: Next.js (auto-detected)
- **Build command**: `next build` (auto-detected)
- **Output directory**: `.next` (auto-detected)
- **Install command**: `bun install` (auto-detected when `bun.lockb` is present)

### Environment Variables

No environment variables are required for the portfolio to function. The `.env` file contains a `DATABASE_URL` for Prisma/SQLite (only needed if you use the database features, which the portfolio doesn't).

### Custom Domain

After deployment, you can add a custom domain in the Vercel dashboard:
1. Go to your project → **Settings** → **Domains**.
2. Add your custom domain (e.g., `pankajgupta.dev`).
3. Update your DNS records as instructed by Vercel.

---

## Design System

Four primary visual environments:
- **Electric Blue** `#1738D5` — hero, accents
- **Warm Paper** `#F4F1EA` — editorial sections, case studies, research, achievements
- **Black** `#0A0A0A` — system surfaces, overlays, metro, contact upper
- **White** `#F7F4ED` — ink against blue and black

Accents: Metro Yellow `#FFD400`, Alert `#FF3B30`, Muted `#6B6B6B`.

---

## Sections (in order)

1. **Hero** — electric blue, handwritten "Mr. / On a / lunch / break" lockup, skill tags in background (3 toggle variants: Classic / Scattered / Ambient), role cycler, time morph
2. **Nav Index** — editorial table-of-contents with handwritten links + quick-note card
3. **Philosophy Quote** — transitional word-by-word reveal (no attribution)
4. **Brand Marquee** — slow velocity-modulated infinite scroll of the 44-word CV cloud with per-word color cycling
5. **Origin** — warm paper notebook, "WHAT SHOULD WE BUILD?" hero statement, 3 supporting paragraphs, handwritten annotations, "PRODUCT ROADMAP?" motif
6. **Product OS** — "PRODUCTS WITH A REASON", 1200+ customers, 6 stat cards, "different industries" handwritten note
7. **Career Metro** — signature horizontal-pinned GSAP track, 7 stations in chronological career order (Edukey Intelligent Systems 2019 → Teach for India 2020 → Pratham Education Foundation 2021 → Bosch → Cambridge JBS → CEGIS → SenseHQ), Step Out deep-dives, reliable keyboard nav (one press = one station), bilingual title "Career Metro की लाइन में आपका स्वागत है"
8. **Research Archive** — 4 papers (EACL/ECIR/AAAI/IEEE) as archival document sheets with open-paper links
9. **Product Lab** — 4 themed side-project cards (blue/paper/black alternation) with open-project links
10. **Achievements** — 4 awards with credential links + education strip (DTU, IIIT Delhi, NYU)
11. **Contact** — black upper + paper footer, magnetic CTA, email copy button, social links

---

## Features

- **Preloader** — boot sequence, counter, staggered statement reveal
- **Hero design toggle** — 3 variants (Classic / Scattered / Ambient) with localStorage persistence
- **Custom cursor** — dot + lagging ring, grows + changes color (blue) on interactive hover. No text labels.
- **Smooth scroll** — Lenis synced to GSAP ScrollTrigger
- **Sound system** — Howler.js SFX (default muted, arms on first gesture, localStorage persistence)
- **Keyboard shortcuts** — `?` help, `⌘K` command palette, `1-7` section jump, `←/→` metro nav (direct keydown, one press = one station), `Home/End` first/last station, `M` mute, konami code
- **Command palette** — fuzzy search across all sections/stations/experiences/papers/projects
- **Session stats** — tracks systems inspected, case studies opened, side projects visited
- **Share/copy-section-URL** — hash-based deep-linking
- **Nav hover peek** — floating mini-preview cards
- **Scroll-to-top** + **reading-time estimate**
- **Nav + side rail color adaptation** — dark text on paper sections, light text on dark sections
- **Reduced-motion** — full content access without animation
- **Responsive** — desktop pinned metro ↔ mobile vertical stacked

---

## Dependencies

### Core Portfolio Dependencies

These are the packages directly used by the portfolio:

| Package | Version | Purpose |
|---------|---------|---------|
| `next` | ^16.1.1 | App Router framework |
| `react` / `react-dom` | ^19.0.0 | UI library |
| `typescript` | ^5 | Type safety |
| `tailwindcss` | ^4 | Styling |
| `framer-motion` | ^12.23.2 | Animations (reveals, layout morphs, AnimatePresence) |
| `gsap` | ^3.15.0 | ScrollTrigger pinned horizontal metro track |
| `lenis` | ^1.3.25 | Smooth scroll (lerp 0.1, synced to GSAP ticker) |
| `howler` | ^2.2.4 | SFX playback (synthesized WAV — no external assets) |
| `@types/howler` | ^2.2.13 | TypeScript types for Howler |
| `lucide-react` | ^0.525.0 | Icons |
| `zustand` | ^5.0.6 | Global state (boot, mute, session stats, keyboard shortcuts) |
| `clsx` | ^2.1.1 | Class name composition |
| `tailwind-merge` | ^3.3.1 | Tailwind class dedup |

### shadcn/ui Component Dependencies

Pre-installed Radix UI primitives (only a subset is used by the portfolio):

| Package | Purpose |
|---------|---------|
| `@radix-ui/react-dialog` | Dialog primitives |
| `@radix-ui/react-tooltip` | Tooltips |
| `@radix-ui/react-scroll-area` | Scroll areas |
| `@radix-ui/react-separator` | Dividers |
| `@radix-ui/react-slot` | Component composition |
| `class-variance-authority` | Variant management |
| `cmdk` | Command palette base |
| `sonner` | Toast notifications |
| `vaul` | Drawer component |

### Dev Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `@tailwindcss/postcss` | ^4 | Tailwind PostCSS plugin |
| `@types/react` / `@types/react-dom` | ^19 | React TypeScript types |
| `bun-types` | ^1.3.4 | Bun runtime types |
| `eslint` | ^9 | Linting |
| `eslint-config-next` | ^16.1.1 | Next.js ESLint rules |
| `tw-animate-css` | ^1.3.5 | Tailwind animation utilities |

### Full Dependency List

See [`package.json`](./package.json) for the complete list of all dependencies including unused scaffold packages (Prisma, next-auth, recharts, etc. are available but not used by the portfolio itself).

---

## Hyperlinks (extracted from resume)

All external links are programmatically extracted from `Pankaj Gupta Resume_Latest.pdf` — no URLs are fabricated. Missing links render as disabled labels.

- **Research papers**: ACL Anthology (EACL 2025), Springer (ECIR 2023), AAAI 2023, IEEE Xplore
- **Side projects**: GitHub (Queen's Gambit, Skill Tracer), Vercel (Daily Dose of AI), LinkedIn (Hitchhiker's Guide)
- **Social**: LinkedIn (linkedin.com/in/gupta-pankaj), GitHub (github.com/onalunchbreak), Email
- **Achievements**: NextLeap LinkedIn honor, Fatima Institute, Amazon ML Scaler, Teach For India
- **Companies**: SenseHQ, CEGIS, Cambridge JBS, Bosch

---

## Project Structure

```
src/
  app/
    layout.tsx           # font loading + metadata
    page.tsx             # section composition
    globals.css          # design tokens + utilities
  components/
    shell/               # global overlays (preloader, nav, cursor, etc.)
    sections/            # portfolio sections
  hooks/                 # reusable hooks (sound, count-up, focus-trap, etc.)
  lib/
    data.ts              # all content data (typed)
    links.ts             # resume-extracted hyperlinks
    sfx.ts               # synthesized SFX
    lenis-instance.ts    # Lenis singleton
    search-index.ts      # command palette fuzzy search index
```

---

## Troubleshooting

### Dev server crashes (OOM killed)

**Symptom**: The dev server starts but crashes after 10-15 seconds.

**Cause**: The Linux OOM (Out of Memory) killer terminates the Node.js process when it exceeds available memory. The project has 68 client components with framer-motion + GSAP loaded simultaneously.

**Fix**: The `dev` script in `package.json` already includes `NODE_OPTIONS='--max-old-space-size=384'` to limit the heap. If you still experience crashes:

```bash
# Increase the limit if you have more RAM available
NODE_OPTIONS='--max-old-space-size=512' bun run dev

# Or decrease it further for very constrained environments
NODE_OPTIONS='--max-old-space-size=256' bun run dev
```

### Turbopack config warning

**Symptom**: Warning about `turbopack` config in `next.config.ts`.

**Fix**: The `turbopack: {}` empty config is required by Next.js 16 (Turbopack is the default bundler). This is expected and harmless.

### Fonts not loading

**Symptom**: Text appears in a default sans-serif font instead of Space Grotesk / Caveat.

**Cause**: `next/font/google` requires network access during build to download fonts. In offline environments, fonts fall back to system fonts.

**Fix**: Ensure network access during `bun install` and the first `bun run dev` / `bun run build`.

---

## Handover

See [`worklog.md`](./worklog.md) for the complete development history, current status, and next-phase recommendations.

---

## License

Personal portfolio. All content © Pankaj Gupta.
