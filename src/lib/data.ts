// ============================================================
// BAAZ PORTFOLIO — CONTENT DATA (all real copy from source)
// ============================================================

export const NAV_ITEMS = [
  { label: "Home", id: "hero" },
  { label: "Origin", id: "origin" },
  { label: "Projects", id: "projects" },
  { label: "Best Work", id: "best-work" },
  { label: "Visuals", id: "insomniac" },
  { label: "Contact", id: "contact" },
] as const;

export const PRELOADER_WORDS = [
  "I",
  "Intentionally",
  "make",
  "Misalignment",
  "look",
  "Intentional",
];

// Hero
export const HERO_NAME = "baaz";
export const HERO_TAGLINE = "Creative by night, more creative by midnight";
export const HERO_ROLES = [
  "Started As Designer",
  "Became Artist Manager",
  "Currently Creative Director",
];
export const HERO_LOCATION = "SRCC '27 · Delhi, India";

// Philosophy quote
export const PHILOSOPHY_QUOTE =
  "If I ever write a book on how I see creativity, it will have infinite pages. And I'll still be figuring it out.";

// Brand marquee
export const MARQUEE_ITEMS = [
  "FIGMA",
  "COLD",
  "POP",
  "PEPSI",
  "ORIGINAL COLA",
  "baaz",
  "Design Lab",
];

// Views count
export const VIEWS_COUNT = "186M+";
export const VIEWS_HEADLINE = "one yes led to the next";
export const VIEWS_INDEX = "02";
export const VIEWS_SUB = "crazy what happens when you just make weirdly creative stuff.";

// Core philosophy
export const CORE_PHILOSOPHY_TITLE = "ART WITH A PURPOSE.";
export const CORE_PHILOSOPHY_BODY =
  "I'm an artist at heart. Everything I do lives where aesthetics meet action — the meeting point of looking beautiful and actually working. No decoration for decoration's sake. Every visual, every word, every move has a job.";
export const CORE_PHILOSOPHY_TAGLINE = "beautiful design that actually works.";

// Places hustled
export const PLACES = {
  index: "// PLACES I'VE HUSTLED AT",
  primary: { role: "Founding Marketer", company: "RNTL" },
  internships: ["Grimbyte", "MusicVerse", "Sinskari", "Frost & Sullivan", "Blue Tea"],
  badge: "VERIFIED",
  note: "learned a lot here",
};

// Stats trio
export const STATS = [
  { value: 33, suffix: "M+", label: "Campaign Reach" },
  { value: 40, suffix: "+", label: "Live standup Shows" },
  { value: 1, suffix: " / 5", label: "DU Rank 1 / 5 Subjects — gotta keep parents happy." },
];
export const STATS_AFTER = "still figuring things out.";
export const STATS_PS =
  "PS// The goal is simple: find artists and brands making incredible things, and help them grow using our respective arts.";

// Origin
export const ORIGIN = {
  index: "01",
  title: "ORIGIN / THE BEGINNING",
  hero: "I STARTED MAKING CREATIVE STUFF FOUR YEARS AGO BECAUSE I WANTED TO BUY SOME SNEAKERS ON MY OWN.",
  paragraphs: [
    "It was 9th grade. Everyone around me was drawing inside the lines; I wanted to redraw the lines. I started with YouTube thumbnails — loud, ugly-in-a-good-way, built to get the click. That was the first time I understood that design wasn't decoration. It was a lever.",
    "From thumbnails it spread. Instagram creatives, Discord banners, gig posters for college fests, decks for people who couldn't afford an agency. I took every weird little job I could find because each one taught me a different way people see things.",
    "Somewhere in there I found the phrase 'value proposition' and it broke my brain in the best way. I stopped making things that looked cool and started making things that did something. The art stayed — but now it had a reason to exist.",
    "It started as making things. Then it became a way of thinking. Strategy came later.",
  ],
  motif: "GOD'S PLAN",
  meta: "bajkamal / early phase / initial viral spike",
};

// Projects (archived cards)
export type Project = {
  id: string;
  index: string;
  name: string;
  role: string;
  duration: string;
  tools: string[];
  summary: string;
  metrics: { label: string; value: number; suffix?: string; display?: string }[];
  archived: boolean;
};

export const PROJECTS: Project[] = [
  {
    id: "grimbyte",
    index: "01",
    name: "Grimbyte",
    role: "Brand Strategy Intern",
    duration: "//4 Weeks",
    tools: ["GA4", "Meta", "SEMrush"],
    summary:
      "Built and shipped brand strategy for performance clients across GA4, Meta and SEMrush. Owned CX journeys end-to-end.",
    metrics: [
      { label: "clients handled", value: 6, suffix: "+" },
      { label: "CX journeys", value: 4 },
      { label: "tools mastered", value: 3 },
    ],
    archived: true,
  },
  {
    id: "blue-tea",
    index: "02",
    name: "Blue Tea",
    role: "Live Project Associate",
    duration: "//4 Weeks",
    tools: ["Creator Ops", "Performance"],
    summary:
      "Scaled a creator-led performance engine. Drove CPV to ₹0.10 and pushed real units for a D2C tea brand.",
    metrics: [
      { label: "creators onboarded", value: 90, suffix: "+" },
      { label: "cost per view", value: 0, display: "₹0.10" },
      { label: "units moved", value: 2, suffix: "K+" },
    ],
    archived: true,
  },
  {
    id: "dr-water",
    index: "03",
    name: "Dr. Water",
    role: "Project Head",
    duration: "//8 Weeks",
    tools: ["Research", "Personas", "BD"],
    summary:
      "Led end-to-end project: built 6 customer personas from 2K+ data points and opened conversations with 18+ brands.",
    metrics: [
      { label: "customer personas", value: 6 },
      { label: "data points", value: 2, suffix: "K+" },
      { label: "brands approached", value: 18, suffix: "+" },
    ],
    archived: true,
  },
  {
    id: "frost-sullivan",
    index: "04",
    name: "Frost & Sullivan",
    role: "Live Project Associate",
    duration: "//4 Weeks",
    tools: ["Market Research", "Forecasting"],
    summary:
      "Mapped 6 mobility domains and 200+ emerging tech across an auto-market worth ₹42K Cr+.",
    metrics: [
      { label: "mobility domains", value: 6 },
      { label: "tech mapped", value: 200, suffix: "+" },
      { label: "market size", value: 0, display: "₹42K Cr+" },
    ],
    archived: true,
  },
];

// Best Work — Delhi Metro stations (Blue Line)
export type MetroStation = {
  id: string;
  name: string;
  type: string; // Growth / Acquisition / Retention / Scale / Launch
  tag: string;
  metrics: { label: string; value: number; suffix?: string; display?: string }[];
  problem: string;
  strategy: string;
  impact: string;
};

export const METRO_STATIONS: MetroStation[] = [
  {
    id: "krishna-shukla",
    name: "Krishna Shukla",
    type: "Growth",
    tag: "Creator Economy",
    metrics: [
      { label: "reach", value: 186, suffix: "M+" },
      { label: "revenue", value: 0, display: "₹4.4L" },
      { label: "ROI", value: 32, suffix: "X" },
    ],
    problem:
      "A founder-creator with deep knowledge but near-zero distribution. Good content, no engine. Reach was flat, revenue was an afterthought.",
    strategy:
      "Rebuilt the funnel around the founder's voice. Edited for the algorithm without gutting the substance. Turned every post into a lead magnet and every comment into a conversation.",
    impact:
      "186M+ reach in under a year. ₹4.4L in revenue from a previously-monetized-as-an-afterthought channel. 32X ROI on every rupee we put in.",
  },
  {
    id: "rntl",
    name: "Rntl.",
    type: "Acquisition",
    tag: "D2C Rental",
    metrics: [
      { label: "beta users", value: 500, suffix: "+" },
      { label: "growth", value: 4, suffix: "X" },
      { label: "CAC drop", value: 0, display: "—" },
    ],
    problem:
      "A rental marketplace with a product nobody understood in 5 seconds. Acquisition was slow, expensive, and sticky in all the wrong places.",
    strategy:
      "Killed the feature-talk. Made the value prop a single sentence. Rebuilt onboarding around the first rental, not the catalog. Performance creative did the rest.",
    impact:
      "500+ beta users in weeks. 4X growth on the base. The funnel finally made sense — and people stopped bouncing at the homepage.",
  },
  {
    id: "sinkari",
    name: "Sinkari",
    type: "Retention",
    tag: "Subscription",
    metrics: [
      { label: "rev lift", value: 10, suffix: "%" },
      { label: "retention", value: 90, suffix: "%" },
      { label: "window", value: 30, suffix: "D" },
    ],
    problem:
      "A subscription product bleeding users in the first 30 days. Acquisition was fine; the leak was in the room.",
    strategy:
      "Re-cut the first 30 days into a designed experience. Onboarding, nudges, the right amount of friction. Made the value obvious before the bill hit.",
    impact:
      "10% revenue lift from retention alone. 90% 30-day retention. The product finally felt like something worth keeping.",
  },
  {
    id: "dramsoc",
    name: "Dramsoc",
    type: "Scale",
    tag: "College Society",
    metrics: [
      { label: "sponsorship", value: 55, suffix: "L+" },
      { label: "footfall", value: 40, suffix: "K" },
      { label: "run-time", value: 72, suffix: "H" },
    ],
    problem:
      "A college theatre society with pedigree and no money. Productions were great; the business side was a fax machine.",
    strategy:
      "Treated the society like a brand. Built a sponsorship deck that didn't look like a student made it. Ran the festival like a launch, not a fest.",
    impact:
      "₹55L+ sponsorship raised. 40K footfall across the run. 72 hours of programming that didn't collapse once.",
  },
  {
    id: "jio-hotstar",
    name: "Jio Hotstar",
    type: "Launch",
    tag: "Streaming",
    metrics: [
      { label: "impressions", value: 7, suffix: "L+" },
      { label: "conversion", value: 15, suffix: "%" },
      { label: "signups", value: 40, suffix: "K+" },
    ],
    problem:
      "A streaming launch campaign that needed scale without burning intent. Big audience, small attention spans, one shot.",
    strategy:
      "Built the creative around a single hook, then fragmented it across platforms so it felt native everywhere. Performance and brand in the same breath.",
    impact:
      "7L+ impressions in the launch window. 15% conversion. 40K+ signups attributed to the campaign.",
  },
];

export const METRO_INTRO = {
  hindi: "दिल्ली मेट्रो में आपका स्वागत है",
  english: "Welcome to Delhi Metro",
  cta: "ENTER METRO",
  line: "BLUE LINE",
  footer:
    "driven by a self proclaimed artist · BLUE LINE // DELHI METRO · built in new delhi /// powered by caffeine · caution: can run even after 11pm due to late night designing hobby · Return to Platform",
};

// Insomniac work — skill tags
export const INSOMNIAC_SKILLS = [
  { label: "Brand Design", rotate: -3 },
  { label: "Social Media", rotate: 2 },
  { label: "Typography", rotate: -1.5 },
  { label: "Poster Design", rotate: 3 },
  { label: "Colour Grading", rotate: -2 },
  { label: "Motion Graphics", rotate: 1.5 },
  { label: "Visual Identity", rotate: -3 },
  { label: "Content Creation", rotate: 2.5 },
];

// Contact
export const CONTACT = {
  title: "## contact Me",
  body: "Ready to make a move? Drop an email to discuss internships, collaborations, or just to say hi.",
  cta: "→ say hi before overthinking it",
  mail: "baaz.creates@gmail.com",
  links: [
    { label: "INSTAGRAM", href: "https://instagram.com/bajkamalsingh" },
    { label: "LINKEDIN", href: "https://linkedin.com/in/bajkamalsingh" },
    { label: "MAIL", href: "mailto:baaz.creates@gmail.com" },
  ],
  signoff:
    "Bye, have a great day at your job. Hoping you get more creative portfolios to look at.",
  signature: "— Bajkamal Singh (Baaz)",
};

export const CASE_CLOSE = {
  title: "Action Req.",
  subtitle: "Close Case",
  hint: "Press anywhere to close",
  button: "READ",
};
