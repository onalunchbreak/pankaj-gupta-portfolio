# Pankaj Gupta | Product x AI Portfolio

> **Live Production:** [guptapankaj.vercel.app](https://guptapankaj.vercel.app)

Official portfolio for **Pankaj Gupta** — Product Manager, Applied AI Builder, and Researcher. Built with Next.js 16 (App Router), TypeScript, Tailwind CSS, Framer Motion, and GSAP.

---

## Highlights & Interactive Features

- **Interactive Hero Canvas & Studio Mode:** Free-form node layout with interactive sticky notes, connections, and responsive typography.
- **Career Metro Line (`Best Work`):** Interactive metro map experience representing career milestones (SenseHQ, CEGIS, Bosch, Cambridge, etc.) with real-time station panels and metric counters.
- **High-Res Photo Marquee Ticker:** Infinite scrolling photo gallery showcasing high-resolution AI-enhanced images from key offsites, workshops, and speaking engagements.
- **Research Archive:** Archival document card layout displaying published research papers with venue tags and direct ACL/Springer/IEEE links.
- **Product Lab (`Side Projects`):** Interactive product grid featuring personal builds (*Queen's Gambit*, *Daily Dose of AI*, *Skill Tracer*, *A Hitchhiker's Guide to Presenting Modern Data Solutions*).
- **Honors & Recognition Carousel:** Interactive card deck highlighting achievements (*NextLeap Top 1% PM Fellow*, *Toastmasters District Runner-Up*, *Fatima Fellowship*, *Amazon ML Summer School*).
- **Split 2-Column Contact & Instant Copy:** High-contrast contact module with direct mail link, copy-to-clipboard action, and custom social link highlights.
- **Web Audio Feedback:** Synthesized UI sound effects (ticks, whooshes, clicks) powered by Web Audio API / Howler.
- **Command Palette & Keyboard Shortcuts:** Press `Cmd+K` or `/` for global search & section navigation, plus `M` for audio mute.

---

## Tech Stack

| Category | Technology | Description |
|---|---|---|
| **Framework** | Next.js 16 (App Router + Turbopack) | Fast, server-rendered React 19 architecture |
| **Language** | TypeScript | Type-safe code throughout |
| **Styling** | Tailwind CSS v4 | Custom design tokens & brutalist editorial typography |
| **Animations** | Framer Motion & GSAP | Smooth scroll-triggered transitions & layout animations |
| **Smooth Scroll** | Lenis | Hardware-accelerated smooth scrolling |
| **Audio** | Web Audio API / Howler.js | Synthesized sound effects without external audio files |
| **Icons** | Lucide React | Clean, scalable vector icons |
| **State** | Zustand | Lightweight client state management |

---

## Getting Started

### Prerequisites

- **Node.js**: `≥ 18.18.0` (Recommended: `v20` LTS or `v24`)
- **Package Manager**: `npm`, `pnpm`, `yarn`, or `bun`

### Installation

```bash
# Clone the repository
git clone https://github.com/onalunchbreak/pankaj-gupta-portfolio.git

# Navigate into the project directory
cd pankaj-gupta-portfolio

# Install dependencies
npm install
```

### Running Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## Project Structure

```
├── public/
│   └── images/
│       └── metro/              # High-resolution photo assets for the gallery
├── src/
│   ├── app/                    # Next.js App Router (layout, page, API routes)
│   ├── components/
│   │   ├── sections/           # Key portfolio sections (hero, origin, best-work-metro, research, lab, achievements, contact)
│   │   ├── shell/              # Navigation, preloader, audio manager, command palette
│   │   └── ui/                 # Reusable UI primitives (dialogs, buttons, tooltips)
│   ├── hooks/                  # Custom React hooks (sound, stats, motion preferences)
│   └── lib/                    # Data sources, links mapping, helper utilities
├── next.config.ts              # Next.js configuration
├── tailwind.config.ts          # Styling theme & font definitions
└── README.md
```

---

## Deployment

This portfolio is configured for zero-config automatic deployment on **Vercel**.

```bash
# Production Build
npm run build

# Start Production Server
npm run start
```

---

## License

Created by **Pankaj Gupta** · All rights reserved.
