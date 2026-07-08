// ============================================================
// BAAZ PORTFOLIO — CONTENT DATA
// Source-of-truth content from the reference PDF + live site.
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
export const HERO_TOP_META = "Bajkamal Singh AKA Baaz";
export const HERO_TOP_LINKS = "Fastest way to know me → Best Work → Contact";

// Navigation Index (Section 02)
export const NAV_INDEX = {
  index: "02",
  title: "Index",
  items: [
    { label: "About Me", annotation: "Who I am & how I got here", target: "origin" },
    { label: "Projects & Internships", annotation: "The work that started it all", target: "projects" },
    { label: "Best Work", annotation: "Work I'm most proud of", target: "best-work" },
    { label: "Insomniac Work", annotation: "Designs & ideas I made for fun", target: "insomniac" },
    { label: "Contact me", annotation: "Quick note card", target: "contact" },
  ],
  quickNote:
    "Entire portfolio is Worth a look. But If you're short on time, jump straight to Best Work Section.",
};

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

// Purpose / Results (combined section 02 — ONE YES LED TO ANOTHER)
export const PURPOSE = {
  index: "02",
  title: "ONE YES LED TO ANOTHER",
  philosophyTitle: "ART WITH A PURPOSE.",
  philosophyBody:
    "I am an artist at heart. I obsess over aesthetics, but I love it even more when my art actually makes people feel something and take action.",
  tagline: "beautiful design that actually works.",
  centralMetric: { value: 186, suffix: "M+", label: "Views Driven", sub: "In 3 Months" },
  annotation: "crazy what happens when you just make weirdly creative stuff.",
};

// Places hustled
export const PLACES = {
  index: "// PLACES I'VE HUSTLED AT",
  primary: { role: "Founding Marketer", company: "RNTL." },
  internships: ["Grimbyte", "MusicVerse", "Sinskari", "Frost & Sullivan", "Blue Tea"],
  extra:
    "Grew an artist's community from scratch to 200K+ followers, and pulled off a wild campus launch for a Jio Hotstar show.",
  badge: "VERIFIED",
  note: "Learned a lot here!",
};

// Stats trio
export const STATS = [
  { value: 33, suffix: "M+", label: "Campaign Reach" },
  { value: 40, suffix: "+", label: "Live standup Shows" },
  { value: 1, suffix: " / 5", label: "DU Rank 1 / 5 Subjects — gotta keep parents happy." },
];
export const STATS_AFTER = "Still figuring out things.";
export const STATS_PS =
  "PS// The goal is simple: find artists and brands making incredible things, and grow together using our respective arts.";

// Origin
export const ORIGIN = {
  index: "01",
  title: "THE BEGINNING",
  subtitle: "how it all started.",
  hero: "I STARTED MAKING CREATIVE STUFF FOUR YEARS AGO COZ' I WANTED TO BUY SOME SNEAKERS ON MY OWN :))",
  paragraphs: [
    "I had no idea what a 'marketing strategy' was in 9th grade. I was just making YouTube thumbnails and taking whatever freelance gigs I could find through Insta & Discord...",
    "I didn't know what a 'value proposition' was. I kept making things because I liked seeing them work.",
    "It started as making things. Then it became a way of thinking. Strategy came later.",
  ],
  motif: "GOD'S PLAN",
  addictions: "Spotify + Coke Zero addicted",
  meta: "bajkamal / early phase / initial viral spike",
};

// Projects (archived cards) — full content from spec
export type Project = {
  id: string;
  index: string;
  name: string;
  companyDescription: string;
  role: string;
  duration: string;
  achievements: string[];
  metrics: { label: string; value: number; suffix?: string; display?: string }[];
  theme: "blue" | "paper" | "black";
  archived: boolean;
};

export const PROJECTS: Project[] = [
  {
    id: "grimbyte",
    index: "01",
    name: "Grimbyte Technologies",
    companyDescription:
      "Consulting firm specialising in marketing transformation & GTM strategies.",
    role: "Brand Strategy Intern",
    duration: "4 Weeks",
    achievements: [
      "Configured GA4, Meta & SEMrush dashboards for 6+ clients. Replaced vanity metrics with performance KPIs to validate marketing spend and optimize budget allocation.",
      "Mapped CX journeys for 4 clients to identify friction points and optimize user flows, reducing drop-off rates and manual touchpoints while improving lead capture.",
    ],
    metrics: [
      { label: "Clients", value: 6, suffix: "+" },
      { label: "CX journeys mapped", value: 4 },
      { label: "tools deployed", value: 3 },
    ],
    theme: "blue",
    archived: true,
  },
  {
    id: "blue-tea",
    index: "02",
    name: "Blue Tea",
    companyDescription:
      "India's leading herbal tea brand, featured on Shark Tank India, with 1M+ global customers.",
    role: "Live Project Associate",
    duration: "4 Weeks",
    achievements: [
      "Executed a targeted offline activation strategy, securing 5+ strategic B2B partnerships to distribute 2,000+ units.",
      "Architected an influencer campaign model, managing outreach to 90+ creators, achieving ₹0.10 CPV.",
    ],
    metrics: [
      { label: "Creators outreached", value: 90 },
      { label: "CPV achieved", value: 0, display: "₹0.10" },
      { label: "units distributed", value: 2, suffix: "K+" },
    ],
    theme: "paper",
    archived: true,
  },
  {
    id: "dr-water",
    index: "03",
    name: "Dr. Water",
    companyDescription:
      "Global US-based brand delivering premium hydrogen hydration solutions.",
    role: "Project Head",
    duration: "8 Weeks",
    achievements: [
      "Identified 6 key customer personas through primary and secondary research, analyzing 200+ responses and behavioural patterns.",
      "Benchmarked 18+ hydration brands and synthesized over 2,000 data points.",
    ],
    metrics: [
      { label: "personas mapped", value: 6 },
      { label: "data points", value: 2, suffix: "K+" },
      { label: "brands benchmarked", value: 18, suffix: "+" },
    ],
    theme: "black",
    archived: true,
  },
  {
    id: "frost-sullivan",
    index: "04",
    name: "Frost & Sullivan",
    companyDescription:
      "International consulting firm specialising in market research & strategic advisory.",
    role: "Live Project Associate",
    duration: "4 Weeks",
    achievements: [
      "Benchmarked advancements in six mobility domains, identifying synergies projected to unlock ₹42,000 crore+ in combined market opportunities.",
      "Evaluated and ranked 200+ technologies using the Mobility Innovation Scoring Model.",
    ],
    metrics: [
      { label: "tech ranked", value: 200, suffix: "+" },
      { label: "market opportunity", value: 0, display: "₹42K Cr+" },
      { label: "mobility domains", value: 6 },
    ],
    theme: "blue",
    archived: true,
  },
];

// ============================================================
// BEST WORK — DELHI METRO (5 stations, full case-study content)
// ============================================================

export type StrategyItem = {
  step: string;
  title: string;
  desc: string;
};

export type MetroStation = {
  id: string;
  name: string;
  role: string;
  theme: string; // Growth / Acquisition / Retention / Scale / Launch
  tag: string;
  headline: string;
  problem: string;
  strategy: StrategyItem[];
  impact: string;
  metrics: { label: string; value: number; suffix?: string; display?: string }[];
  extras?: { label: string; items: string[] }[];
};

export const METRO_STATIONS: MetroStation[] = [
  {
    id: "krishna-shukla",
    name: "Krishna Shukla",
    role: "Talent Manager",
    theme: "Growth",
    tag: "Creator Economy",
    headline:
      "Engineered a content-to-commerce pipeline that commercialised 193M viral views into a touring stand-up shows business.",
    problem:
      "193M views. Zero revenue infrastructure. The attention existed. The business didn't. Trapped in a local echo chamber, passive viewers who rarely shared, limited to unscalable ad-hoc college gigs.",
    strategy: [
      {
        step: "01",
        title: "IDENTITY BASED CONTENT",
        desc: "Shifted to highly relatable, POV-driven identity content to acquire cold audiences aggressively.",
      },
      {
        step: "02",
        title: "VIRALITY ENGINE",
        desc: "Achieved 3x Loop Rate and strong Share-to-Like performance, turning viewers into distributors.",
      },
      {
        step: "03",
        title: "TOURING IP",
        desc: "Operationalised 40+ shows across multiple Indian cities with repeatable logistics.",
      },
    ],
    impact:
      "193M+ views commercialised into a touring stand-up business with ₹4L+ revenue and ₹60K+ brand partnerships.",
    metrics: [
      { label: "Views", value: 193, suffix: "M+" },
      { label: "Accounts Reached", value: 50, suffix: "M+" },
      { label: "Followers", value: 200, suffix: "K+" },
      { label: "Followers Growth", value: 115, suffix: "%" },
      { label: "Engagement Rate", value: 57, suffix: "%" },
      { label: "Loop Rate", value: 3, suffix: ".8x" },
      { label: "Shows", value: 40, suffix: "+" },
      { label: "Stand-up Revenue", value: 0, display: "₹4L+" },
      { label: "Brand Partnerships", value: 0, display: "₹60K+" },
    ],
  },
  {
    id: "rntl",
    name: "RNTL.",
    role: "Founding Marketer, Core Team",
    theme: "Acquisition / Trust Engineering",
    tag: "D2C Rental",
    headline: "“Why rent when I can own?” — borrowed equity as the answer.",
    problem:
      "Renting felt like a sunk cost. No social proof, no category trust, zero brand history. The 'is this brand real?' question came before purchase intent.",
    strategy: [
      {
        step: "01",
        title: "BORROWED EQUITY",
        desc: "Sell the lifestyle, not the product. Built the RNTL Spotlight creator network.",
      },
      {
        step: "02",
        title: "META PILOT RUN",
        desc: "Catalog + personality-led brand launch ad campaign.",
      },
    ],
    impact:
      "5 industry voices with 2M+ combined network. Meta pilot hit 35%+ hook rate at ₹7 CPM and <₹0.9 CPC — a 4.6x efficiency lift.",
    metrics: [
      { label: "Hook Rate", value: 35, suffix: "%+" },
      { label: "Cost / Msg Conv.", value: 0, display: "₹18.45" },
      { label: "CPM", value: 0, display: "₹7" },
      { label: "CPC", value: 0, display: "<₹0.9" },
      { label: "Efficiency Lift", value: 4, suffix: ".6x" },
    ],
    extras: [
      {
        label: "RNTL Spotlight Creator Network",
        items: ["Ranjit Bajaj", "Nikita Luther", "Harpriya Bains", "Anya Singh", "Rajat Barmecha"],
      },
      { label: "Network Scale", items: ["5 Industry Voices", "2M+ Combined Network"] },
    ],
  },
  {
    id: "dramsoc",
    name: "Dramatics Society, SRCC",
    role: "Vice President",
    theme: "Creative Direction / Scale",
    tag: "College Society",
    headline:
      "Took a college theatre society to most-followed club status in Delhi University — 10K+ followers in 6 months.",
    problem:
      "A society with pedigree but no digital presence. Productions were great; the audience didn't know they existed until opening night.",
    strategy: [
      {
        step: "01",
        title: "GROWTH STRATEGY",
        desc: "Treated the society like a brand — consistent content cadence, platform-native formats.",
      },
      {
        step: "02",
        title: "CREATIVE DIRECTION",
        desc: "Built campaign types for every moment of the society lifecycle.",
      },
    ],
    impact:
      "10K+ followers in 6 months. Most-followed college club status in Delhi University. Six distinct campaign formats deployed.",
    metrics: [
      { label: "Followers", value: 10, suffix: "K+" },
      { label: "Timeframe", value: 6, suffix: " mo" },
      { label: "Campaign Types", value: 6 },
    ],
    extras: [
      {
        label: "Campaign Types",
        items: [
          "Event Pre-Buzz Film",
          "Freshers' Welcome Film",
          "30-Year Legacy Campaign",
          "Celebrity Event Recap",
          "Orientation Announcement Video",
          "Community Trust Restore Video",
        ],
      },
    ],
  },
  {
    id: "sinskari",
    name: "Sinskari",
    role: "Strategy Intern",
    theme: "Retention",
    tag: "Email Lifecycle",
    headline:
      "Designed a high-conversion automated email funnel to recover abandoned carts and maximize Customer Lifetime Value.",
    problem:
      "Abandoned carts with no recovery. No lifecycle. No nurture. Customers came, looked, left — and were never seen again.",
    strategy: [
      {
        step: "01",
        title: "LIFECYCLE MAPPING",
        desc: "Reconstructed the entire customer journey from sign-up to cross-sell.",
      },
      {
        step: "02",
        title: "AUTOMATED RECOVERY",
        desc: "Built triggered sequences for every drop-off state.",
      },
    ],
    impact:
      "10%+ drop-off rate improvement, 15% weekly traffic lift, 25+ abandoned carts converted.",
    metrics: [
      { label: "Drop-off Improvement", value: 10, suffix: "%+" },
      { label: "Weekly Traffic", value: 15, suffix: "%" },
      { label: "Carts Converted", value: 25, suffix: "+" },
    ],
    extras: [
      {
        label: "Lifecycle States",
        items: [
          "New Customer",
          "Registration / Sign-up",
          "Explored Pages / Products",
          "Added to Cart",
          "Checked Out",
          "Didn't Check Out",
          "Delivery",
          "Feedback",
          "Cross-sell",
          "Old Customer Sequence",
        ],
      },
    ],
  },
  {
    id: "jio-hotstar",
    name: "Jio Hotstar",
    role: "Marketing & GTM Strategy Lead",
    theme: "Launch",
    tag: "Streaming / Tribeverse",
    headline:
      "360° marketing strategy for the Tribeverse trailer launch across 6 college campuses, 30,000+ Gen-Z target.",
    problem:
      "A streaming launch that needed scale without burning intent. Big audience, small attention spans, one shot.",
    strategy: [
      {
        step: "01",
        title: "AUDIENCE ARCHITECTURE",
        desc: "Mapped the Gen-Z attention graph across 6 campuses.",
      },
      {
        step: "02",
        title: "MICRO-INFLUENCER NETWORK",
        desc: "Activated campus-level voices for authentic reach.",
      },
      {
        step: "03",
        title: "UGC CONVERSION ENGINE",
        desc: "Built an A/B-tested funnel from impression to signup.",
      },
    ],
    impact:
      "7L+ impressions in 72 hours, 15% conversion rate at peak, 45K+ organic reach, 8K+ P2P shares.",
    metrics: [
      { label: "Impressions / 72H", value: 7, suffix: "L+" },
      { label: "Conversion Rate", value: 15, suffix: "%" },
      { label: "Organic Reach", value: 45, suffix: "K+" },
      { label: "P2P Shares", value: 8, suffix: "K+" },
    ],
    extras: [
      {
        label: "Strategy Pillars",
        items: [
          "Audience Architecture",
          "Micro-Influencer Network",
          "Celebrity Amplification",
          "UGC Conversion Engine",
          "A/B Testing",
        ],
      },
    ],
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

// Insomniac work — skill tags + word cloud
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

export const WORD_CLOUD_TITLE = "My CV, IN ABOUT 40 WORDS";
export const WORD_CLOUD = [
  "Adaptability", "Growth", "Strategy", "Creative", "Ownership", "Initiative",
  "Impact", "Analytics", "Synergy", "Bandwidth", "Design", "Branding",
  "Scholar", "Digital Marketing", "Conversion", "Early Starter", "Contributor",
  "Position of responsibility", "Always Working", "Projects", "Networking",
  "Building", "Academics", "Ads", "Drama", "Strategy Comps", "Cricketer",
  "Frost & Sullivan", "Blue Tea", "Grimbyte Technologies", "SRCC", "Startups",
  "Freelancer", "Creative freedom",
];

// Contact
export const CONTACT = {
  title: "Contact Me",
  body: "Ready to work together? Drop an email to discuss internships, collaborations, or just to say hi.",
  cta: "→ say hi before overthinking it",
  annotation: "no forms, no friction",
  mail: "baaz.creates@gmail.com",
  links: [
    { label: "INSTAGRAM", href: "https://instagram.com/bajkamalsingh" },
    { label: "LINKEDIN", href: "https://linkedin.com/in/bajkamalsingh" },
    { label: "MAIL", href: "mailto:baaz.creates@gmail.com" },
  ],
  signoff:
    "Bye, have a great day at your job. Hoping you get more creative portfolios to look at.",
  signature: "Bajkamal Singh",
  signatureSub: "(Baaz)",
};

export const CASE_CLOSE = {
  title: "Action Req.",
  subtitle: "Close Case",
  hint: "Press anywhere to close",
  button: "READ",
};
