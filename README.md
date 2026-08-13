# Pankaj Gupta | Portfolio

> **Live Production:** [guptapankaj.vercel.app](https://guptapankaj.vercel.app)

## Tech Stack (Built with Next.js 16 (App Router), TypeScript, Tailwind CSS, Framer Motion, and GSAP)

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
