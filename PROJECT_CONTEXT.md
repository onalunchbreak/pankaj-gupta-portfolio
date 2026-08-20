# PROJECT CONTEXT & SYSTEM ARCHITECTURE MANUAL
## Pankaj Gupta Portfolio (Mr. Onalunchbreak)

> **CLOUD / AI AGENT DIRECTIVE:**
> Read this file along with `README.md` before making modifications. This document is the definitive single source of truth for cloud instances, remote developers, and AI agents working on this codebase.

---

## 1. System Overview & Portfolio Architecture

This project is a high-performance, brutalist-editorial personal portfolio and interactive product showcase for **Pankaj Gupta** (*Mr. Onalunchbreak*), built on modern React 19 and Next.js 16 App Router architecture.

```
┌────────────────────────────────────────────────────────────────────────┐
│                          GLOBAL SHELL & HUDS                           │
│   Preloader (Pikachu) │ Nav │ Custom Cursor │ SoundManager │ Lenis     │
└────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        MAIN PAGE SECTION PIPELINE                      │
│  01. Hero & Hero Studio Editor        (Canvas drag-drop / AST Sync)    │
│  02. NavIndex & Table of Contents     (Editorial navigation index)     │
│  03. Brand Marquee                    (Velocity-modulated ticker)      │
│  04. Origin Story                     (GSAP scrub word & SVG draw)     │
│  05. Best Work Delhi Metro            (GSAP pinned rail / Deep-Dive)   │
│  06. Research Archive                 (Archival papers / DOI links)    │
│  07. Product Lab & Insomniac Space    (44-word collage / Side projects)│
│  08. Achievements & Honors            (Snap carousel deck / Education) │
│  09. Contact                          (Split dark/paper / Magnetic CTA)│
└────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        DATA, STORES & ENGINES                          │
│   src/lib/data.ts │ Zustand Stores │ Zero-Asset Web Audio (sfx.ts)     │
│   /api/save-hero-layout (In-place AST Regex & Git Commit Engine)       │
└────────────────────────────────────────────────────────────────────────┘
```

### Core Architecture & Dependencies

| Layer / Subsystem | Technology | Version / Configuration | Role in Architecture |
|---|---|---|---|
| **Core Framework** | Next.js App Router | `16.1.1` (Turbopack support) | Server components, static page generation, dynamic API endpoints |
| **UI Library** | React & React DOM | `19.0.0` | React 19 concurrent rendering, Server Actions, modern hooks |
| **Language** | TypeScript | `^5.0.0` (Strict mode) | Type safety across schemas, stores, and components |
| **Styling Engine** | Tailwind CSS | `v4.0.0` (`@tailwindcss/postcss`) | CSS theme variables, `@theme inline`, brutalist utility tokens |
| **Scroll Animations** | GSAP & ScrollTrigger | `3.15.0` | Pinned horizontal metro track, word-by-word text scrubs, SVG drawing |
| **Component Motion** | Framer Motion | `12.23.2` | Spring physics, layout animations, gestures, velocity tracking |
| **Smooth Scrolling** | Lenis | `1.3.25` | Hardware-accelerated smooth scrolling with central singleton |
| **Audio Engine** | Web Audio API / Howler | `2.2.4` + Custom WAV Synth | Pure-math PCM audio synthesis (Zero external audio assets) |
| **State Management** | Zustand | `5.0.6` | Lightweight client stores (`useBootStore`, `useSessionStats`, `useMuteStore`) |
| **Command Palette** | Custom / Cmdk | `1.1.1` | Global `⌘K` fuzzy search dialog over all portfolio destinations |
| **Iconography** | Lucide React | `0.525.0` | Vector icon system |

---

## 2. Design Token System & 4-Environment Color Palette

The portfolio is structured around four distinct visual environments that alternate across sections to create editorial pacing and spatial rhythm.

```
       ┌───────────────────────┐         ┌───────────────────────┐
       │     ELECTRIC BLUE     │         │      WARM PAPER       │
       │   #0430BB / #1738D5   │         │        #F4F1EA        │
       │  (Hero, Highlights)   │         │ (Origin, Research, Edu│
       └──────────┬────────────┘         └───────────┬───────────┘
                  │                                  │
                  ▼                                  ▼
       ┌───────────────────────┐         ┌───────────────────────┐
       │      DEEP BLACK       │         │     OFF-WHITE INK     │
       │        #0A0A0A        │         │        #F7F4ED        │
       │  (Metro, Lab, Nav)    │         │  (Text on Blue/Black) │
       └───────────────────────┘         └───────────────────────┘
```

### Color Token Palette

| Token Name | Hex / Value | Semantic Role | Usage Locations |
|---|---|---|---|
| `--blue` | `#0430BB` / `#1738D5` | Electric Blue signature | Hero canvas background, active highlights, primary buttons, accents |
| `--paper` | `#F4F1EA` | Warm Paper surface | Origin story, Research Archive, Achievements deck, Contact footer |
| `--black` | `#0A0A0A` | Deep Black system | Global body base, NavIndex, Metro viewport, Product Lab, Preloader |
| `--white` / `--ink-on-blue` | `#F7F4ED` | Off-White ink | Primary typography on blue and black surfaces, cards, outlines |
| `--metro-yellow` / `--accent`| `#FFD400` | Signature Electric Yellow | Delhi Metro accents, platform numbers, badges, hover underlines |
| `--alert` / `--destructive` | `#FF3B30` | Alert red | Status warnings, error states |
| `--muted` | `#6B6B6B` / `#A3A3A3` | System gray | Metadata timestamps, secondary captions, subtle borders |
| `--hairline` | `rgba(10,10,10,0.22)` | Subtle dark border | Paper surface borders, card divisions |
| `--hairline-light` | `rgba(244,241,234,0.12)`| Subtle light border | Dark surface borders, dividers, HUD boxes |

### Typography Hierarchy

Fonts are loaded in `src/app/layout.tsx` via Next.js Google Font integration:

1. **Display Font (`--font-space-grotesk` / `.font-display`)**: Space Grotesk (`500`, `600`, `700`, `800`). Used for primary headings, section headers, metric figures, and station names.
2. **Monospace Font (`--font-space-mono` / `.font-mono`)**: Space Mono (`400`, `700`). Used for technical tags, timestamps, coordinates, button labels, and system status lines.
3. **Sans-Serif Font (`--font-inter` / `.font-sans`)**: Inter (`400`, `500`, `600`). Used for body text, case study narratives, and paragraph content.
4. **Devanagari Font (`--font-noto-deva` / `.font-deva`)**: Noto Sans Devanagari (`500`, `700`). Used for authentic Delhi Metro bilingual Hindi signage and announcements.
5. **Handwritten Display Font (`--font-hand` / `.hand-display`)**: Caveat (`400`, `500`, `600`, `700`). Used for oversized personal quotes, editorial commentary, sticky notes, and signatures.

### Textures & Post-Processing Filters

- **`.grain-overlay`**: Fixed fullscreen SVG fractal noise overlay (`<feTurbulence type="fractalNoise" baseFrequency="0.9"/>`) at 4.5% opacity with `mix-blend-mode: overlay` to give an analog, tactile print texture.
- **`.vignette-overlay`**: Radial gradient from center to edge (`rgba(0,0,0,0.55)` at 100%) providing cinematic focus.
- **`.paper-texture`**: Applied to all paper sections with subtle warm noise simulation.
- **`.bg-scanlines`**: CRT monitor scanline simulation for dark editorial density.

---

## 3. Section-by-Section Engineering Blueprint

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ 1. Hero & Hero Studio Editor (hero.tsx)                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│ 2. NavIndex & Table of Contents (nav-index.tsx)                             │
├─────────────────────────────────────────────────────────────────────────────┤
│ 3. Brand Marquee (brand-marquee.tsx)                                        │
├─────────────────────────────────────────────────────────────────────────────┤
│ 4. Origin Story (origin.tsx)                                                │
├─────────────────────────────────────────────────────────────────────────────┤
│ 5. Best Work Delhi Metro (best-work-metro.tsx)                              │
├─────────────────────────────────────────────────────────────────────────────┤
│ 6. Research Archive (research-archive.tsx)                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│ 7. Product Lab & Insomniac Space (product-lab.tsx)                          │
├─────────────────────────────────────────────────────────────────────────────┤
│ 8. Achievements & Honors (achievements.tsx)                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│ 9. Contact & Signoff (contact.tsx)                                          │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 3.1. Hero & Hero Studio Editor (`src/components/sections/hero.tsx`)

The Hero section functions both as the primary landing presentation and as an interactive in-browser layout editor (active in development).

#### StudioNode Schema
```typescript
export type NodeType = "quote" | "tag" | "arrow";
export type FontFamilyOption = "handwritten" | "mono" | "sans" | "serif";

export interface StudioNode {
  id: string;
  type: NodeType;
  text: string;
  x: number;
  y: number;
  scale: number;
  rotation: number;
  fontSize: number; // in px
  fontFamily: FontFamilyOption;
  color: string;
  highlight: boolean;
  // Arrow-specific properties
  curvature?: number; // 0 = straight, >0 = curved
  flipX?: boolean;
  arrowLength?: number;
}
```

#### Portrait Geometry Baselines
- **Desktop Baseline (`PORTRAIT_BASELINE`)**: `{ scale: 100, x: -8, y: 0 }` (Natural 100% scale silhouette aligned with central coordinates).
- **Mobile Baseline (`MOBILE_PORTRAIT_BASELINE`)**: `{ scale: 130, x: 0, y: 0 }` (Enlarged 130% scale for mobile viewport impact).

#### Canvas Separation & AST Persistence
- **Desktop Canvas (`UNIFIED_CANVAS_BASELINE`)**: 17 interactive quote, arrow, and tag nodes positioned in a 1440×900 coordinate space around Pankaj's cutout silhouette.
- **Mobile Canvas (`MOBILE_CANVAS_BASELINE`)**: Dedicated 6-tag mobile layout designed for narrow portrait orientation without text overlapping.
- **Save Engine**: When modified in Studio Mode, changes are transmitted to `/api/save-hero-layout`, which modifies `hero.tsx` on disk via regular expressions and creates an automated git commit.

---

### 3.2. NavIndex & Table of Contents (`src/components/sections/nav-index.tsx`)

- **Role**: High-contrast table of contents connecting the user to all 6 major sections.
- **Layout**: CSS Grid on desktop (links left, sticky quick note right), stacked on mobile.
- **Interactivity**: Oversized Caveat titles (`.hand-display`) with yellow serial badges (`01`–`06`). Hovering triggers a yellow animated underline and `tick` audio chime.
- **Scrolling**: Dispatches calls to `lenis.scrollTo()` with custom offsets.

---

### 3.3. Brand Marquee (`src/components/sections/brand-marquee.tsx`)

- **Role**: Velocity-reactive kinetic text strip.
- **Content**: Product management and systems keywords ("Rapid Prototyping", "Product Discovery", "Market Research", "User Interviews", "A/B Testing", "Roadmapping", "Stakeholder Alignment", "Go-To-Market").
- **Kinetic Physics**: Uses `useScroll` + `useVelocity` + `useSpring` to dynamically adjust marquee scroll speed between 0.5× and 1.5× based on how fast the user scrolls.
- **Color Cycling**: Alternates text colors through Yellow (`#FFD400`), Off-White (`#F4F1EA`), Electric Blue (`#1738D5`), and Gray (`#999999`).
- **Accessibility**: Replaces animated loop with a static, scrollable row when `prefers-reduced-motion` is detected.

---

### 3.4. Origin Story (`src/components/sections/origin.tsx`)

- **Role**: Narrative overview of Pankaj's journey from Engineering Physics at DTU to Applied AI research and Product Management.
- **GSAP Scrubbed Text Reveal**: Word-by-word opacity transition (`0.18` → `1.0`) linked to the scroll position using `ScrollTrigger.scrub`.
- **Dynamic SVG Drawing**: A hand-drawn SVG ink line (`PATH_D`) draws itself via `strokeDashoffset` as the user navigates the section.
- **Motif Stamp**: The iconic `"PRODUCT ROADMAP?"` stamp with `"ROADMAP"` struck through and `"plans changed."` handwritten underneath appears at key narrative beats.

---

### 3.5. Best Work Delhi Metro (`src/components/sections/best-work-metro.tsx`)

A gamified career journey modeled as the iconic **Delhi Metro Yellow Line**.

```
    ┌─────────────────────────────────────────────────────────────┐
    │  [PLATFORM 01]  TEACH FOR INDIA                             │
    │  [PLATFORM 02]  PRATHAM EDUCATION                           │
    │  [PLATFORM 03]  BOSCH (AR Workforce Training)               │
    │  [PLATFORM 04]  CAMBRIDGE JBS (Computer Vision for FMCG)    │
    │  [PLATFORM 05]  CEGIS (ML Tax-Evasion Detection)            │
    │  [PLATFORM 06]  SENSEHQ (Talent Engagement SaaS)            │
    └─────────────────────────────────────────────────────────────┘
```

#### Dual-Mode Architecture
1. **Desktop (>1024px, Standard Motion)**: Horizontal pinned track powered by GSAP `ScrollTrigger.pin`. As the user scrolls vertically, the track slides horizontally through all 6 station platforms.
2. **Mobile / Reduced Motion**: Responsive stacked 2-column card grid with direct modal access.

#### Station Details
1. **Teach For India**: Community teaching volunteer; 50+ students reached, 100% remote learning continuity during pandemic lockdowns.
2. **Pratham Education**: Data science intern; 100K+ rural village outcome records processed, regional bird sound classifier model.
3. **Bosch**: Applied AI intern; AR training platform with Meta Oculus Quest & Unity 3D; training efficiency lifted from 3% to 30% across 10+ facilities.
4. **Cambridge JBS**: Research apprentice; Grounded-SAM object detection & LiDAR room mesh for 5,000+ FMCG mini-marts; influenced revenue for 35% of owners.
5. **CEGIS**: Program assistant (Strategic Public Finance); privacy-preserving federated learning (FedAvg) + graph analytics across 30M+ GST tax records for Delhi & Tamil Nadu.
6. **SenseHQ**: Associate Product Manager; talent engagement platform for 1,200+ global clients; RAG in-app assistant (Sense IQ) cut support tickets by 40% and accelerated onboarding by 70%.

#### Deep-Dive Overlay System
- Clicking **"Step Out ↗"** triggers a full-screen archival modal overlay with scroll lock (`useBodyScrollLock`) and focus trap (`useFocusTrap`).
- Features structured case study sections (01 Context, 02 Problem, 03 System, 04 Impact) and animated `CountUp` metric counters.
- Bottom gallery features a continuous scrolling photo marquee of 7 verified photo assets from Pankaj's career.

---

### 3.6. Research Archive (`src/components/sections/research-archive.tsx`)

- **Role**: Archival sheet presentation of 4 peer-reviewed machine learning publications.
- **Sheet Styling**: Printed document cards with corner crop marks, venue stamps, and deterministic entry tilts (1.4°, -1.8°, 1.1°, -1.3°) that straighten on hover.
- **Publications Catalog**:
  1. **SEPSIS** (*EACL 2024*): "I Can Catch Your Lies - A New Paradigm for Deception Detection" (Supervisor: Dr. Amitava Das, Univ. of South Carolina).
  2. **French NER** (*18th ECIR 2023*): "Adversarial Adaptation for French Named Entity Recognition" (Supervisor: Prof. Marie-Jean Meurs, Univ. du Québec).
  3. **Transformer-based French NER** (*37th AAAI 2023*): "Transformer-based NER for French within similar domain corpora" (Supervisor: Prof. Marie-Jean Meurs, Univ. du Québec).
  4. **Attention-free Sentiment** (*IEEE 2023*): "Attention-free: An Aspect-based Multimodal Sentiment Recognition" (Supervisor: Prof. Dinesh Kumar Vishwakarma, DTU).

---

### 3.7. Product Lab & Insomniac Space (`src/components/sections/product-lab.tsx`)

- **Role**: Showcase of side projects, experiments, and technical versatility.
- **44-Word Collage Geometry**: A hand-tuned spatial word cloud categorized into 3 visual hierarchy tiers (focal, medium, small) with zero overflow.
- **10 Interactive Skill Tags**: Floating tags with `tagPulse` animation that trigger abstract preview backdrops (blobs, rings, bars) and `whoosh` sound effects on hover.
- **Side Projects**:
  1. **Queen's Gambit**: Personalized chess platform blending classical tournament aesthetics with modern AI.
  2. **Daily Dose of AI**: Curated updates on applied artificial intelligence and technology.
  3. **Skill Tracer**: Developer workflow recorder generating structured `skills.md` via AI models.
  4. **A Hitchhiker's Guide to Presenting Modern Data Solutions**: KaggleX BIPOC Program project.

---

### 3.8. Achievements & Honors (`src/components/sections/achievements.tsx`)

- **Role**: Verified recognitions, fellowships, and academic degrees.
- **Carousel Deck**: Snap-scrolling card track with keyboard and chevron navigation, active slide counter, and hover chimes.
- **Featured Honors**:
  - **Toastmasters**: District Speech Competition Runner-Up (2024–26).
  - **Fatima Fellowship**: Selected among 30 fellows from 4,000+ global applicants (2023).
  - **Amazon ML Summer School**: Selected among 400 students from 17,000+ applicants (2022).
  - **Teach For India**: Teaching volunteer for Python programming (2020).
- **Education Section**:
  - **DTU**: B.Tech in Engineering Physics (GPA: 8.69 / 10.00).
  - **IIIT Delhi**: PG Data Science in Health & Climate Change (GPA: 9.23 / 10.00).
  - **NYU**: MS Computer Science Bridge Program (Grade A).

---

### 3.9. Contact & Signoff (`src/components/sections/contact.tsx`)

- **Role**: Frictionless direct communication portal.
- **Split Environment**:
  - **Upper Half (Deep Black)**: Massive Caveat display headline ("Talk Product" in off-white + "With Me" in electric blue with drop shadow), email card, and one-click copy button with clipboard fallback.
  - **Lower Half (Warm Paper)**: Handwritten signoff, right-aligned signature with blinking terminal cursor, and smooth scroll-to-top button.
- **Magnetic CTA**: Pointer-reactive button translation using Framer Motion springs (`stiffness: 220`, `damping: 18`) with parallax arrow movement.

---

## 4. Shell & Global Systems

### 4.1. Pikachu Preloader (`src/components/shell/preloader.tsx`)

- **Animation**: 4-frame side-profile sprite run cycle (`/images/pikachu-side-frame-1.png` to `4.png`) cycling every 90ms at a uniform 90px height on all viewports.
- **Dynamic PM Status Lines**: Randomly selects an authentic product management quip on boot:
  - *"SHIPPING SOMETHING... · PROBABLY OVER-SCOPED"*
  - *"WRITING A PRD... · WILL PIVOT BY FRIDAY"*
  - *"TALKING TO USERS... · ALLEGEDLY"*
  - *"ALIGNING STAKEHOLDERS... · STILL NOT ALIGNED"*
  - *"ESTIMATING TIMELINE... · ADD BUFFER, THEN DOUBLE IT"*
  - *"RUNNING A SPRINT... · LOTS OF BACKLOG TO SCOPE OUT"*
  - *"DEFINING SUCCESS METRICS... · AFTER LAUNCH, IDEALLY BEFORE"*
- **Clock & Progress**: Real-time IST clock and 0% → 100% easing progress bar.

---

### 4.2. Zero-Asset Web Audio Engine (`src/lib/sfx.ts`, `src/hooks/use-sound.ts`, `src/components/shell/sound-manager.tsx`)

The portfolio implements a zero-asset sound system. Rather than requesting `.mp3` or `.wav` files over the network, raw audio waveforms are synthesized dynamically in JavaScript and converted into base64 Data URIs via a custom RIFF WAV header encoder (`encodeWav`).

```typescript
// Tone Synthesis Specifications
export function getSfx(): Record<string, string> {
  return {
    tick:    synth({ freq: 2200, dur: 0.03, type: "square",   gain: 0.08, decay: 6 }),
    confirm: synth({ freq: 660,  dur: 0.09, type: "triangle", gain: 0.18, sweepTo: 990, decay: 4 }),
    whoosh:  synth({ freq: 180,  dur: 0.32, type: "sawtooth", gain: 0.12, sweepTo: 720, decay: 3 }),
    blip:    synth({ freq: 1200, dur: 0.04, type: "square",   gain: 0.1,  decay: 5 }),
    door:    synth({ freq: 440,  dur: 0.45, type: "sine",     gain: 0.2,  sweepTo: 880, decay: 2.2 }),
  };
}
```

- **Autoplay Compliance**: The `SoundManager` component arms the audio context on the first user interaction gesture (`pointerdown`, `keydown`, `touchstart`).
- **Mute Persistence**: Sound state is saved to `localStorage` via `useMuteStore`.

---

### 4.3. Custom Cursor & Modal Restoration (`src/components/shell/cursor.tsx`)

- **Dual-Element Tracking**: A center dot tracks the mouse position immediately (`x`, `y`), while an outer ring follows with smooth spring damping (`ringX`, `ringY`).
- **Interactive Expansion**: The outer ring expands from 32px to 48px and changes color to electric blue when hovering interactive elements (`a`, `button`, `input`, `[data-cursor]`).
- **Modal Cursor Restoration (`.modal-cursor-restore`)**: The custom cursor hides native cursors using `.cursor-none-fine`. When modals, editors, or dialogs open, the `.modal-cursor-restore` utility class restores default OS pointer behavior to prevent trapped or invisible pointers.

---

### 4.4. Command Palette (`src/components/shell/command-palette.tsx`, `src/lib/search-index.ts`)

- **Shortcut**: Triggered via `⌘K` or `Ctrl+K`.
- **Search Index**: Dynamic flat index generated across all 7 main sections, 6 metro stations, 4 work experiences, 4 research papers, and 4 side projects.
- **Fuzzy Matching**: Subsequence scoring with word-boundary priority.

---

### 4.5. State Stores Reference (Zustand)

| Store | File Location | State & Methods | Purpose |
|---|---|---|---|
| `useBootStore` | `src/hooks/use-boot.ts` | `booted: boolean`, `skip()`, `setBooted(v)` | Manages preloader completion and page entry lock |
| `useSessionStats`| `src/hooks/use-session-stats.ts` | `systemsInspected`, `caseStudiesOpened`, `sideProjectsVisited`, `sectionsReached`, `reachedSections`, `reachSection()` | Tracks user engagement metrics across the visit |
| `useMuteStore` | `src/hooks/use-mute.ts` | `muted: boolean`, `armed: boolean`, `toggle()`, `arm()`, `setMuted(v)` | Controls Web Audio playback and user sound preferences |

---

## 5. API Routes Reference

### `POST /api/save-hero-layout`

- **File**: `src/app/api/save-hero-layout/route.ts`
- **Security Guard**: Only active in local development (`process.env.NODE_ENV !== "production"`). Returns `403 Forbidden` in production builds.
- **Functionality**:
  1. Accepts JSON payload containing `{ nodes, portrait, mobileNodes, mobilePortrait }`.
  2. Reads `src/components/sections/hero.tsx`.
  3. Uses strict regular expressions to replace `UNIFIED_CANVAS_BASELINE`, `PORTRAIT_BASELINE`, `MOBILE_CANVAS_BASELINE`, and `MOBILE_PORTRAIT_BASELINE`.
  4. Writes updated TypeScript source code back to `hero.tsx`.
  5. Asynchronously stages and commits changes via `git commit -m "feat(hero): auto-save canvas layout..."`.

---

## 6. Complete Asset Map (`/public`)

| File Path | Dimensions / Type | Description / Usage |
|---|---|---|
| `/public/pankaj-hero-cutout.png` | PNG (Transparent) | High-resolution portrait cutout of Pankaj Gupta for Hero canvas |
| `/public/images/pikachu-side-frame-1.png` | PNG | Frame 1 of Pikachu running sprite cycle (Preloader) |
| `/public/images/pikachu-side-frame-2.png` | PNG | Frame 2 of Pikachu running sprite cycle (Preloader) |
| `/public/images/pikachu-side-frame-3.png` | PNG | Frame 3 of Pikachu running sprite cycle (Preloader) |
| `/public/images/pikachu-side-frame-4.png` | PNG | Frame 4 of Pikachu running sprite cycle (Preloader) |
| `/public/images/metro/bml-speech.jpg` | JPG | Keynote speaker at HackBMU 6.0 (BML Munjal University) |
| `/public/images/metro/teaching-tfi.jpg` | JPG | Teaching Python programming at Teach For India |
| `/public/images/metro/cambridge-formal.jpg`| JPG | Cambridge JBS Research Apprentice formal hall |
| `/public/images/metro/area83-team.jpg` | JPG | SenseHQ Product & Engineering Team retreat at Area83 |
| `/public/images/metro/paintball-team.jpg` | JPG | CEGIS Team outdoor tactical offsite |
| `/public/images/metro/teaching-ml.jpg` | JPG | Applied AI and Machine Learning workshop instruction |
| `/public/images/metro/techtionary-event.jpg`| JPG | Techtionary Initiative / NeuralAI innovation event |
| `/public/logo.svg` | SVG | Brand vector monogram |
| `/public/robots.txt` | TXT | Search engine crawler configuration |

---

## 7. Pending Roadmap & Restoration Protocols

### 7.1. NextLeap "Top 1%" Honor Tile Restoration

When restoring or updating the NextLeap honor card in the Achievements section, insert the following verified schema entry into `ACHIEVEMENTS.cards` inside `src/lib/data.ts`:

```typescript
{
  org: "NEXTLEAP",
  label: "TOP 1%",
  sub: "PRODUCT MANAGEMENT FELLOW",
  year: "2025",
  url: "https://www.linkedin.com/in/gupta-pankaj/details/honors/1635554451885/single-media-viewer/?profileId=ACoAACLgHN8BgAC4xBg9Gm1qV9p5Wfo5FGA6X6s"
}
```

### 7.2. Company Logos on Platform Tiles
- **Target**: Add minimal monochrome SVG brand icons (Teach For India, Pratham, Bosch, Cambridge, CEGIS, SenseHQ) to the platform signboards in `best-work-metro.tsx`.

### 7.3. Real-Time Visitor Analytics
- **Target**: Connect `useSessionStats` to an edge analytics database or privacy-friendly event pipeline to observe live session depth and case study open rates.

---

> **END OF MANUAL · PANKAJ GUPTA PORTFOLIO ENGINE**
