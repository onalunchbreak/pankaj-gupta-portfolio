# Pankaj Gupta | Portfolio (Mr. Onalunchbreak)

> **CLOUD ENVIRONMENT & AI AGENT GUIDE (Codex, Claude, etc.):**
> 1. **System & Architecture:** For deep architectural context, component schemas, state isolation rules, and design tokens, review [PROJECT_CONTEXT.md](./PROJECT_CONTEXT.md).
> 2. **Change History:** For a section-by-section record of the most recent recruiter-readiness overhaul (what changed, why, and what was verified), review [issues.context](./issues.context).

> **Live Production:** [guptapankaj.vercel.app](https://guptapankaj.vercel.app)

---

## Overview

A high-performance personal portfolio, interactive product showcase, and career retrospective built for **Pankaj Gupta** (*Mr. Onalunchbreak*). Designed with a brutalist-editorial aesthetic featuring four alternating visual environments, custom Web Audio synthesis, an auto-advancing GSAP-driven career carousel, a live Hero Studio canvas editor, and responsive storytelling systems.

---

## Key Features & Systems

### 1. Hero Visual Studio Editor (`hero.tsx`)
- **Live Canvas Draggable Editor**: In local development, activate Studio Mode to drag, scale, rotate, and style quote cards, handwritten annotations, and arrows in a canonical 1440×900 canvas.
- **In-Place Source Modification & Auto-Commit**: Hit save to serialize canvas layout nodes directly to `hero.tsx` via regex and trigger an automated git commit via `/api/save-hero-layout`.
- **Dual Silhouette Geometry**: Independent baselines for Desktop (`PORTRAIT_BASELINE` 100%) and Mobile (`MOBILE_PORTRAIT_BASELINE` 130%).

### 2. Career Metro (`best-work-metro.tsx`)
- **Auto-Advancing Carousel**: Desktop experience is a self-playing horizontal rail across 6 stations along the Delhi Metro Yellow Line — advances automatically every ~6s, pauses instantly on hover or any manual interaction (buttons, dots, arrow keys), resumes a few seconds after you stop.
- **Full Manual Control**: Prev/Next buttons, clickable station-route dots, and keyboard arrow/Home/End navigation all drive the same shared state as autoplay.
- **Station Platforms**: Teach For India, Pratham Education, Bosch, Cambridge JBS, CEGIS, and SenseHQ.
- **Deep-Dive Modal Overlays**: "Step Out ↗" opens comprehensive problem/system/impact case studies with animated `CountUp` numbers and focus trapping; autoplay pauses while a modal is open.
- **Photo Marquee Gallery**: High-res verified photo reel from past speaking engagements, hackathons, and team retreats, scrolling left-to-right beneath the rail.
- Mobile / reduced-motion: a clean stacked-card grid, no autoplay.

### 3. Pikachu Preloader (`preloader.tsx`)
- **Running Sprite Animation**: 4-frame sprite animation sequence (90ms cycle, uniform 90px height).
- **Dynamic PM Status Generator**: Real-time IST clock paired with humorous, authentic product management status lines on boot.

### 4. Zero-Asset Web Audio Engine (`sfx.ts`, `use-sound.ts`)
- **Pure Math Audio Waveform Synthesis**: Pure PCM audio generation (`encodeWav`) producing Base64 Data URIs on the fly (`tick`, `confirm`, `whoosh`, `blip`, `door`). No external MP3/WAV files required.
- **Autoplay Handling & Mute Persistence**: Gesture-based audio arming with persistent Zustand state (`useMuteStore`), controlled via a fixed bottom-left mute button (`mute-toggle.tsx`).

### 5. Command Palette (`command-palette.tsx`)
- **Fuzzy Subsequence Search (`⌘K`)**: Instant modal navigation indexing sections, metro stations, research publications, and side projects with keyboard routing (`ArrowUp`, `ArrowDown`, `Enter`, `Esc`).

### 6. Research Archive (`research-archive.tsx`)
- **Archival Document Sheets**: 4 peer-reviewed machine learning papers (EACL 2024, ECIR 2023, AAAI 2023, IEEE 2023) styled as printed document sheets with interactive hover straightening and verified DOI links.

### 7. Product Lab (`product-lab.tsx`)
- **Featured Projects**: Queen's Gambit (AI Chess), Daily Dose of AI, Skill Tracer, and Hitchhiker's Guide to Presenting Modern Data Solutions — 4 cards with name, description, status badge, and a live project link.

### 8. Achievements Deck (`achievements.tsx`)
- **Snap-Scrolling Carousel**: Snap-mandatory slide deck with chevron controls, active indicators, and education summary (DTU, IIIT Delhi, NYU).

### 9. Contact (`contact.tsx`)
- **Dual-Tone Split**: Deep black upper stage with massive Caveat display headline + warm paper footer with handwritten signature.
- **Stacked Action Card**: Email Me (copies address to clipboard, no mail-app redirect) → Reveal Phone Number → View Detailed Resume, stacked vertically in one card, no page-space penalty.
- **Footer Return-to-Top**: on mobile, a standalone arrow sits on the left edge of the footer while the signature and "Return to Top" label sit on the right; the global floating scroll-to-top button hides once the footer is in view to avoid a duplicate control.

---

## Tech Stack Matrix

| Category | Technology | Version | Purpose |
|---|---|---|---|
| **Framework** | Next.js App Router | `16.1.1` (Turbopack) | Modern server components, routing, and API endpoints |
| **UI Runtime** | React | `19.0.0` | Concurrent UI rendering and Server Actions |
| **Language** | TypeScript | `^5.0.0` | Strict type safety across all schemas |
| **Styling** | Tailwind CSS | `v4.0.0` | CSS theme variable engine (`@theme inline`) |
| **Motion Engine** | GSAP | `3.15.0` | Career Metro auto-advance tweening, SVG drawing, scrub effects |
| **Physics & Gestures** | Framer Motion | `12.23.2` | Spring animations, drag gestures, velocity tracking |
| **Smooth Scrolling** | Lenis | `1.3.25` | Hardware-accelerated smooth scrolling singleton |
| **Sound System** | Web Audio API / Howler | `2.2.4` | Zero-asset base64 PCM WAV synthesis |
| **State Stores** | Zustand | `5.0.6` | Client state (`useBootStore`, `useSessionStats`, `useMuteStore`) |
| **Icons** | Lucide React | `0.525.0` | Scalable vector icon set |

---

## Keyboard Shortcuts

| Shortcut | Action | Scope |
|---|---|---|
| <kbd>⌘</kbd> + <kbd>K</kbd> / <kbd>Ctrl</kbd> + <kbd>K</kbd> | Open Command Palette | Global |
| <kbd>→</kbd> / <kbd>←</kbd> | Navigate Next / Previous Station (also pauses autoplay) | Career Metro (when in view) |
| <kbd>Home</kbd> / <kbd>End</kbd> | Jump to First / Last Station | Career Metro (when in view) |
| <kbd>Esc</kbd> | Close Modal / Overlay / Palette | Active Dialog |
| <kbd>Enter</kbd> | Select active item / Trigger CTA | Focus state |

---

## Project Structure

```
├── public/
│   ├── images/
│   │   ├── metro/               # High-res photography (BML, Cambridge, SenseHQ, etc.)
│   │   ├── pikachu-side-frame-*.png # 4-frame running sprite sequence
│   ├── pankaj-hero-cutout.png   # Portrait cutout asset
│   └── logo.svg                 # Brand monogram
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── save-hero-layout/ # AST serialization & git auto-commit endpoint
│   │   ├── globals.css          # Design tokens, @theme inline, grain, scanlines
│   │   ├── layout.tsx           # Google Fonts (Space Grotesk, Mono, Inter, Caveat, Deva)
│   │   └── page.tsx             # Main section assembly pipeline
│   ├── components/
│   │   ├── sections/            # Core portfolio sections
│   │   │   ├── hero.tsx         # Hero & Studio layout canvas
│   │   │   ├── nav-index.tsx    # Table of contents
│   │   │   ├── brand-marquee.tsx# Kinetic velocity marquee
│   │   │   ├── origin.tsx       # Narrative & SVG line drawing
│   │   │   ├── best-work-metro.tsx # Auto-advancing Career Metro rail & modals
│   │   │   ├── research-archive.tsx # Archival research papers
│   │   │   ├── product-lab.tsx  # Side project showcase
│   │   │   ├── achievements.tsx # Snap carousel deck & education
│   │   │   └── contact.tsx      # Split dark/paper contact & action card
│   │   ├── shell/               # Global overlays: preloader, nav, cursor, sound/mute, scroll-to-top
│   │   └── ui/                  # Reusable UI primitives
│   ├── hooks/                   # Custom hooks (sound, session stats, mute, boot)
│   └── lib/
│       ├── data.ts              # Resume-grounded portfolio content & schemas
│       ├── sfx.ts               # Zero-asset PCM WAV binary audio synthesizer
│       ├── search-index.ts      # Fuzzy search index generator
│       └── lenis-instance.ts    # Central smooth-scroll singleton
├── PROJECT_CONTEXT.md           # Deep architectural guide for Cloud / AI agents
├── next.config.ts               # Next.js configuration
├── package.json                 # Dependencies & scripts
└── README.md                    # Project manual
```

---

## Getting Started

### Prerequisites
- **Node.js**: `≥ 18.18.0` (Recommended: `v20` LTS or `v24`)
- **Package Manager**: `npm`, `pnpm`, `yarn`, or `bun`

### Installation
```bash
# Clone repository
git clone https://github.com/onalunchbreak/pankaj-gupta-portfolio.git

# Enter directory
cd "Pankaj Gupta Portfolio"

# Install dependencies
npm install
```

### Running Locally
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Deployment & Production Build

This portfolio is configured for zero-config automatic deployment on **Vercel**.

```bash
# Build optimized production bundle
npm run build

# Test production server locally
npm run start
```

---

## License

Created by **Pankaj Gupta** · All rights reserved.
