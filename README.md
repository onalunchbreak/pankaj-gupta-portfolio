# Pankaj Gupta — Mr. Onalunchbreak // Portfolio

A highly personal, interactive, editorial portfolio for **Pankaj Gupta** (alias: Mr. Onalunchbreak) — Product Manager, Applied AI builder, researcher, systems thinker.

The portfolio preserves the strongest experiential characteristics of the reference (bajkamalsingh.me) — intentional visual irregularity, editorial storytelling, handwritten interventions, blue/paper/black visual rhythm, playful system interfaces, scroll-based narrative, surprising transitions, interactive project exploration, gamified Best Work experience, dense case-study storytelling, and a memorable terminal-style ending — while communicating Pankaj's actual professional identity.

## Tech Stack

- **Framework**: Next.js 16 (App Router) + TypeScript 5
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **Motion**: Framer Motion + GSAP/ScrollTrigger + Lenis (smooth scroll)
- **Audio**: Howler.js (synthesized SFX — no external assets)
- **Icons**: lucide-react
- **Fonts**: Space Grotesk (display), Space Mono (terminal), Inter (body), Noto Sans Devanagari (metro signage), Caveat (handwritten)

## Design System

Four primary visual environments:
- **Electric Blue** `#1738D5` — hero, accents
- **Warm Paper** `#F4F1EA` — editorial sections, case studies, research, achievements
- **Black** `#0A0A0A` — system surfaces, overlays, metro, contact upper
- **White** `#F7F4ED` — ink against blue and black

Accents: Metro Yellow `#FFD400`, Alert `#FF3B30`, Muted `#6B6B6B`.

## Sections (in order)

1. **Hero** — electric blue, handwritten "Mr. / On a / lunch / break" lockup, blurred skill tags in background, role cycler, time morph, tagline beside the lockup
2. **Nav Index** — editorial table-of-contents with handwritten links + quick-note card
3. **Philosophy Quote** — transitional word-by-word reveal (no attribution)
4. **Brand Marquee** — slow/medium velocity-modulated infinite scroll of the 44-word CV cloud
5. **Origin** — warm paper notebook, "WHAT SHOULD WE BUILD?" hero statement, 3 supporting paragraphs, handwritten annotations, "PRODUCT ROADMAP?" motif
6. **Product OS** — "PRODUCTS WITH A REASON", 1200+ customers, 6 stat cards, "different industries" handwritten note
7. **Best Work Metro** — signature Delhi Metro horizontal-pinned track, 5 stations (Bosch, Research Lab, Cambridge JBS, CEGIS, SenseHQ), Step Out deep-dives, reliable keyboard nav (one press = one station), bilingual title "Career Metro की लाइन में आपका स्वागत है"
8. **Research Archive** — 4 papers (EACL/ECIR/AAAI/IEEE) as archival document sheets with open-paper links
9. **Product Lab** — 4 themed side-project cards (blue/paper/black alternation) with open-project links
10. **Achievements** — 4 awards with credential links + education strip (DTU, IIIT Delhi, NYU)
11. **Contact** — black upper + paper footer, magnetic CTA, email copy button, social links

## Features

- **Preloader** — boot sequence, counter, staggered statement reveal
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

## Hyperlinks (extracted from resume)

All external links are programmatically extracted from `Pankaj Gupta Resume_Latest.pdf` — no URLs are fabricated. Missing links render as disabled labels.

- **Research papers**: ACL Anthology (EACL 2025), Springer (ECIR 2023), AAAI 2023, IEEE Xplore
- **Side projects**: GitHub (Queen's Gambit, Skill Tracer), Vercel (Daily Dose of AI), LinkedIn (Hitchhiker's Guide)
- **Social**: LinkedIn (linkedin.com/in/gupta-pankaj), GitHub (github.com/onalunchbreak), Email
- **Achievements**: NextLeap LinkedIn honor, Fatima Institute, Amazon ML Scaler, Teach For India
- **Companies**: SenseHQ, CEGIS, Cambridge JBS, Bosch

## Development

```bash
bun install          # install dependencies
bun run dev          # start dev server on :3000
bun run lint         # run ESLint
bun run db:push      # push Prisma schema (if using DB)
```

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
```

## Handover

See `worklog.md` for the complete development history, current status, and next-phase recommendations.

## License

Personal portfolio. All content © Pankaj Gupta.
