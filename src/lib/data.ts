// ============================================================
// PANKAJ GUPTA — MR. ONALUNCHBREAK
// Portfolio content data. All professional claims are
// resume-grounded. No fabricated metrics or URLs.
// ============================================================

export const IDENTITY = {
  realName: "Pankaj Gupta",
  alias: "Mr. Onalunchbreak",
  aliasSystem: "MR_ONALUNCHBREAK",
  user: "PANKAJ_GUPTA",
  session: "PORTFOLIO_2026",
  status: "BUILDING",
  mode: "PRODUCT × AI × SYSTEMS",
  system: "SYS.PRODUCT_LAB_ACTIVE",
};

export const NAV_ITEMS = [
  { label: "Home", id: "hero" },
  { label: "Origin", id: "origin" },
  { label: "Best Work", id: "best-work" },
  { label: "Research", id: "research" },
  { label: "Projects", id: "lab" },
  { label: "Achievements", id: "achievements" },
  { label: "Contact", id: "contact" },
] as const;

// Preloader
export const PRELOADER = {
  bootSequence: [
    "SYSTEM BOOT",
    "LOADING:",
    "PRODUCT INSTINCTS",
    "RESEARCH HABITS",
    "ENGINEERING BAGGAGE",
    "CUSTOMER OBSESSION",
    "SIDE PROJECTS",
    "SACRIFICING YOUR RAM TO CHROME",
    "QUESTIONABLE SLEEP SCHEDULE",
    "MR_ONALUNCHBREAK.EXE",
  ],
  statement: [
    "I started by building systems.",
    "Then I learned to question",
    "whether anyone needed them.",
    "Now I build products.",
  ],
  marginMicrocopy: ["BUILDING SOMETHING...", "PROBABLY DURING LUNCH."],
  readyLabel: "SYSTEM READY",
  userLabel: "USER IDENTIFIED:",
  userValue: "PANKAJ GUPTA",
  aliasLabel: "ALIAS:",
  aliasValue: "MR. ONALUNCHBREAK",
  cta: "ENTER WORKSPACE",
  skip: "SKIP BOOT",
};

// Hero
export const HERO = {
  identityLines: ["Mr.", "On a", "lunch", "break"],
  topMeta: "Pankaj Gupta",
  topMetaSub: "AKA Mr. Onalunchbreak",
  topLinks: "Fastest way to inspect my work → Best Work → Side Projects → Contact",
  location: "Delhi, India",
  locationSub: "",
  tagline: "PRODUCT BY DAY, SIDE PROJECTS BY LUNCH, OVERTHINKING BY MIDNIGHT.",
  secondary: "Product Manager. Applied AI Builder. Researcher. Systems Thinker.",
  roles: [
    "Started As ENGINEER",
    "Then Became AI RESEARCHER",
    "Worked As PUBLIC-SECTOR TECHNOLOGIST",
    "Currently PRODUCT MANAGER",
    "Still BUILDING THINGS",
  ],
  timeMorph: ["09:00", "13:00", "02:00"],
  timeAnnotation: "apparently lunch breaks can get long.",
  scrollCta: "GO ON.",
  scrollCtaSub: "SACRIFICING YOUR RAM TO CHROME.",
  bottomLabel: "Portfolio // Pankaj Gupta",
  bottomSession: "Session // Mr. Onalunchbreak",
};

// Navigation Index
export const NAV_INDEX = {
  index: "02",
  title: "TABLE OF CONTENTS",
  items: [
    { label: "Beginning", annotation: "the starting point & evolution", target: "origin" },
    { label: "Best Work", annotation: "career metro · 6 stations", target: "best-work" },
    { label: "Published Work", annotation: "EACL · ECIR · AAAI · IEEE", target: "research" },
    { label: "Side Projects", annotation: "built out of curiosity", target: "lab" },
    { label: "Honors & Recognition", annotation: "global awards & fellowships", target: "achievements" },
    { label: "Contact Me", annotation: "no forms. no friction.", target: "contact" },
  ],
  quickNote:
    "Entire portfolio is worth a look. But if you're short on time, jump straight to Best Work.",
  bottomMicrocopy: "Directly click on the section name you want to inspect.",
};

// Philosophy quote (transitional)
export const PHILOSOPHY_QUOTE =
  "Building is the easy part. Figuring out what to build — and whether anyone cares — is the actual job.";

// Brand marquee
export const MARQUEE_ITEMS = [
  "PRODUCT",
  "AI",
  "SYSTEMS",
  "RESEARCH",
  "BOSCH",
  "CAMBRIDGE",
  "CEGIS",
  "SENSEHQ",
  "DTU",
  "Mr. Onalunchbreak",
];

// Origin
export const ORIGIN = {
  index: "01",
  title: "THE BEGINNING",
  hero: "I USED TO BUILD WHATEVER CAME TO MIND AND TACKLE THE TECHNICAL CHALLENGES AS THEY CAME. OVER TIME, I REALISED THE REAL HARD QUESTION WAS: SHOULD WE EVEN BE BUILDING THIS IN THE FIRST PLACE?",
  emphasis: "SHOULD WE EVEN BE BUILDING THIS IN THE FIRST PLACE?",
  paragraphs: [
    "I studied Engineering Physics at DTU, but my real focus was exploring everything outside the classroom. I jumped into debating, marketing, sales, raising sponsorships, building websites, and digging into machine learning and AI, eager to try everything at once.",
    "Amidst competing in debates, attending campus fests, reading research blogs, and networking, research was what truly clicked once I saw its real-world impact.",
    "I recognized the power of LinkedIn early in college. Reaching out directly, sharing my work, and connecting with people unlocked opportunities I never imagined getting so early in my career.",
  ],
  timeline: [
    { year: "2019", label: "DTU", sub: "Engineering Physics" },
    { year: "2022", label: "BOSCH", sub: "Applied AI" },
    { year: "2022–23", label: "AI RESEARCH", sub: "NLP × Multimodal AI" },
    { year: "2022–23", label: "CAMBRIDGE JBS", sub: "Computer Vision × Microentrepreneurs" },
    { year: "2023–24", label: "CEGIS", sub: "Public Finance × ML Products" },
    { year: "2024–25", label: "NEXTLEAP", sub: "Product Management" },
    { year: "2025–26", label: "SENSEHQ", sub: "Product × HR Tech × AI" },
    { year: "NOW", label: "MR. ONALUNCHBREAK", sub: "Still Building" },
  ],
  annotations: [],
  motif: "PRODUCT ROADMAP?",
  motifCrossed: "ROADMAP",
  motifSub: "plans changed.",
};



// Work Log / Experience Archive
export type Experience = {
  id: string;
  index: string;
  company: string;
  companyUrl?: string;
  role: string;
  location: string;
  dates: string;
  systemType: string[];
  headline: string;
  achievements: string[];
  metrics: { label: string; value: number; suffix?: string; display?: string }[];
  theme: "blue" | "paper" | "black";
};

export const EXPERIENCES: Experience[] = [
  {
    id: "sensehq",
    index: "01",
    company: "SenseHQ",
    companyUrl: "https://www.sensehq.com/",
    role: "Associate Product Manager",
    location: "HR Automation Tech",
    dates: "Feb 2025 – Apr 2026",
    systemType: ["B2B SaaS", "HR TECH", "WORKFLOW AUTOMATION"],
    headline: "Owned product initiatives for a talent engagement workflow platform serving 1200+ global customers.",
    achievements: [
      "Led customer journey analysis and feature adoption initiatives by partnering with Sales, Marketing, and Implementation teams.",
      "Contributed to a 30% MoM increase in adoption of key talent engagement use cases.",
      "Owned end-to-end feature roadmap aligned with retention goals.",
      "Architected AI-assisted internal query-resolution tools.",
      "Reduced customer-facing Jira / Zendesk support tickets by 40%.",
      "Reduced new-hire onboarding time by 70%, from 4–5 weeks to 1.5 weeks.",
    ],
    metrics: [
      { label: "GLOBAL CUSTOMERS", value: 1200, suffix: "+" },
      { label: "MoM ADOPTION INCREASE", value: 30, suffix: "%" },
      { label: "FEWER SUPPORT TICKETS", value: 40, suffix: "%" },
      { label: "FASTER ONBOARDING", value: 70, suffix: "%" },
    ],
    theme: "blue",
  },
  {
    id: "cegis",
    index: "02",
    company: "Center for Effective Governance of Indian States",
    companyUrl: "https://www.cegis.org/",
    role: "Program Assistant",
    location: "Strategic Public Finance",
    dates: "Nov 2023 – May 2024",
    systemType: ["GOVTECH", "PUBLIC FINANCE", "MACHINE LEARNING"],
    headline: "Launched an ML-powered tax-evasion detection analytics platform across pilot deployments for Delhi and Tamil Nadu state tax departments.",
    achievements: [
      "Led product strategy and delivery end-to-end.",
      "Implemented and scaled data pipelines processing 30M+ GST records.",
      "Improved model accuracy by 25%.",
      "Accelerated decision-making across pilot deployments.",
    ],
    metrics: [
      { label: "STATE TAX DEPARTMENTS", value: 2 },
      { label: "GST RECORDS", value: 30, suffix: "M+" },
      { label: "MODEL ACCURACY IMPROVEMENT", value: 25, suffix: "%" },
    ],
    theme: "paper",
  },
  {
    id: "cambridge-jbs",
    index: "03",
    company: "Judge Business School, University of Cambridge",
    companyUrl: "https://www.jbs.cam.ac.uk/",
    role: "JBS Research Apprentice",
    location: "Applied AI Research",
    dates: "Oct 2022 – Oct 2023",
    systemType: ["APPLIED AI", "COMPUTER VISION", "MICROENTREPRENEURS"],
    headline: "Built computer-vision object-detection models for retail infrastructure and store-layout recommendations.",
    achievements: [
      "Worked with research involving 500K FMCG microentrepreneurs.",
      "Influenced revenue outcomes for 35% of surveyed business owners.",
      "Translated computer-vision outputs into actionable retail recommendations.",
    ],
    metrics: [
      { label: "MICROENTREPRENEURS", value: 500, suffix: "K" },
      { label: "SURVEYED OWNERS INFLUENCED", value: 35, suffix: "%" },
      { label: "COMPUTER VISION", value: 0, display: "OBJECT DETECTION" },
    ],
    theme: "black",
  },
  {
    id: "bosch",
    index: "04",
    company: "Bosch Global Software Technologies",
    companyUrl: "https://www.bosch-india-softtech.com/",
    role: "Applied AI Intern",
    location: "AR Training Systems",
    dates: "May 2022 – Jul 2022",
    systemType: ["APPLIED AI", "AR", "ENTERPRISE TRAINING"],
    headline: "Architected an AR training platform using Text-to-Speech and Meta Oculus Quest headsets.",
    achievements: [
      "Improved remote workforce training efficiency from 3% to 30%.",
      "Deployed across 10+ Bosch manufacturing facilities in India.",
    ],
    metrics: [
      { label: "TRAINING EFFICIENCY", value: 0, display: "3% → 30%" },
      { label: "MANUFACTURING FACILITIES", value: 10, suffix: "+" },
      { label: "AR × AI", value: 0, display: "DEPLOYED SYSTEM" },
    ],
    theme: "blue",
  },
];

// ============================================================
// BEST WORK — PRODUCT LINE METRO (6 stations)
// ============================================================

export type StrategyItem = { step: string; title: string; desc: string };
export type CaseStudyBlock = { label: string; title: string; text: string };

export type MetroStation = {
  id: string;
  index: string;
  name: string;
  role: string;
  theme: string;
  tag: string;
  headline: string;
  problem: string;
  system: string[];
  impact: string;
  metrics: { label: string; value: number; suffix?: string; display?: string }[];
  caseStudy: CaseStudyBlock[];
  learning?: string;
  stationType: "professional" | "research" | "side-project";
};

export const METRO_STATIONS: MetroStation[] = [
  {
    "id": "teach-for-india",
    "index": "01",
    "name": "TEACH FOR INDIA",
    "role": "Teaching Volunteer",
    "theme": "EDUCATION",
    "tag": "Community Teaching",
    "headline": "CAN CLASSROOMS PRESERVE PROGRAMMING EDUCATION DURING GLOBAL LOCKDOWNS?",
    "problem": "Sudden lockdowns threatened school closures. Students in low-resource schools lacked digital infrastructure and remote engagement.",
    "system": [
      "Virtual classroom tools",
      "Low-bandwidth worksheets",
      "Parent engagement tracking",
      "Digital literacy sessions"
    ],
    "impact": "100% learning continuity. 40+ students trained remotely. 2020 remote teaching model executed.",
    "metrics": [
      {
        "label": "Students Reached",
        "value": 40,
        "suffix": "+"
      },
      {
        "label": "Learning Continuity",
        "value": 100,
        "suffix": "%"
      },
      {
        "label": "Digital Literacy",
        "value": 0,
        "display": "IMPLEMENTED"
      }
    ],
    "caseStudy": [
      {
        "label": "01 / CONTEXT",
        "title": "Low-resource community school",
        "text": "Volunteered as an Instructor for under-resourced boys school to ensure programming education continuity during the pandemic."
      },
      {
        "label": "02 / PROBLEM",
        "title": "Lockdown learning loss",
        "text": "Sudden lockdowns threatened school closures. Students in low-resource schools lacked remote engagement and access to computers."
      },
      {
        "label": "03 / SYSTEM",
        "title": "Low-bandwidth remote tools",
        "text": "Designed hybrid classroom sessions, low-bandwidth WhatsApp learning worksheets for Python Programming, and parent engagement tracking sheets."
      },
      {
        "label": "04 / IMPACT",
        "title": "50% remote continuity",
        "text": "Maintained 50% remote learning continuity for 50+ students throughout the lockdown period for one year."
      }
    ],
    "learning": "",
    "stationType": "professional"
  },
  {
    "id": "pratham-education",
    "index": "02",
    "name": "PRATHAM EDUCATION",
    "role": "Data Science Intern",
    "theme": "DATA SCIENCE",
    "tag": "Educational Analytics",
    "headline": "HOW DO YOU MEASURE THE IMPACT OF LEARNING PROGRAMS ACROSS RURAL INDIA?",
    "problem": "Measuring rural learning outcomes manually is slow, error-prone, and scales poorly across thousands of villages.",
    "system": [
      "Data aggregation pipelines",
      "Statistical impact models",
      "Automated outcome reporting",
      "Tableau metrics dashboards"
    ],
    "impact": "15% assessment speed increase. 100K+ village outcome records processed. 2021 analytics pipelines shipped.",
    "metrics": [
      {
        "label": "Records Processed",
        "value": 100,
        "suffix": "K+"
      },
      {
        "label": "Assessment Speed",
        "value": 15,
        "suffix": "%"
      },
      {
        "label": "Analytics Pipelines",
        "value": 0,
        "display": "SHIPPED"
      }
    ],
    "caseStudy": [
      {
        "label": "01 / CONTEXT",
        "title": "Rural education metrics",
        "text": "Worked as a Data Science Intern to automate and scale assessment analysis across rural India."
      },
      {
        "label": "02 / PROBLEM",
        "title": "Manual reporting bottlenecks",
        "text": "Measuring rural learning outcomes manually is slow, error-prone, and scales poorly across thousands of villages."
      },
      {
        "label": "03 / SYSTEM",
        "title": "Statistical impact pipelines",
        "text": "Built data aggregation pipelines, statistical impact models, and Tableau dashboards to automate outcome reporting."
      },
      {
        "label": "04 / IMPACT",
        "title": "100K+ records parsed",
        "text": "Processed 100K+ village outcome records and increased assessment analytics speed by 15%."
      },
      {
        "label": "05 / LEARNING",
        "title": "Data is noise without context",
        "text": "Large datasets of test scores are useless unless aligned with the operational realities of remote teaching volunteers."
      }
    ],
    "learning": "Large datasets of test scores are useless unless aligned with the operational realities of remote teaching volunteers.",
    "stationType": "professional"
  },
  {
    "id": "bosch",
    "index": "03",
    "name": "BOSCH",
    "role": "APPLIED AI INTERN",
    "theme": "APPLIED AI",
    "tag": "AR Workforce Training",
    "headline": "WHAT IF REMOTE TRAINING COULD FEEL MORE LIKE BEING THERE?",
    "problem": "Flying senior instructors out to remote factories to train technicians on multi-million dollar machinery was slow, expensive, and risky — mistakes on live equipment wasn't cheap. Remote training efficiency sat around 3%.",
    "system": [
      "Mixed Reality training platform",
      "Unity 3D and C#",
      "Meta Oculus headsets",
      "6DoF hand-tracking & Text-to-Speech"
    ],
    "impact": "Remote self-guided training coverage went from 3% to 30%. Live across 10+ Bosch manufacturing facilities in India.",
    "metrics": [
      {
        "label": "TRAINING EFFICIENCY",
        "value": 0,
        "display": "3% → 30%"
      },
      {
        "label": "MANUFACTURING FACILITIES",
        "value": 10,
        "suffix": "+"
      },
      {
        "label": "AR × AI",
        "value": 0,
        "display": "DEPLOYED"
      }
    ],
    "caseStudy": [
      {
        "label": "01 / PROBLEM",
        "title": "REMOTE TRAINING WAS BROKEN",
        "text": "Flying senior instructors out to remote factories to train technicians on multi-million dollar machinery was slow, expensive, and risky — mistakes on live equipment weren't cheap. Remote training efficiency sat around 3%."
      },
      {
        "label": "02 / SYSTEM",
        "title": "MIXED-REALITY DIGITAL TWIN",
        "text": "Built a Mixed Reality training platform in Unity 3D and C# for Meta Oculus headsets — 3D digital twins of plant equipment that workers could practice on with 6DoF hand-tracking. A text-to-speech layer read out step-by-step instructions in the worker's own language."
      },
      {
        "label": "03 / DEPLOYMENT",
        "title": "10+ FACILITIES",
        "text": "The MVP went live across 10+ Bosch manufacturing facilities in India."
      },
      {
        "label": "04 / IMPACT",
        "title": "10× EFFICIENCY LIFT",
        "text": "Remote self-guided training coverage went from 3% to 30%. Bosch featured the project in its \"Digital Twin / Digital Mirror\" innovation showcase that year."
      },
      {
        "label": "05 / LEARNING",
        "title": "IMMERSIVE > MANUAL",
        "text": "Manual, screen-based remote training couldn't replicate hands-on machinery work. Immersive AR could, because it let people's hands do the learning instead of only their eyes."
      }
    ],
    "learning": "Manual, screen-based remote training couldn't replicate hands-on machinery work. Immersive AR could, because it let people's hands do the learning instead of only their eyes.",
    "stationType": "professional"
  },
  {
    "id": "cambridge-jbs",
    "index": "04",
    "name": "CAMBRIDGE JBS",
    "role": "JBS RESEARCH APPRENTICE",
    "theme": "APPLIED RESEARCH",
    "tag": "Computer Vision for FMCG",
    "headline": "CAN COMPUTER VISION HELP 5,000+ LOCAL MINI-MARTS OPTIMIZE STORE LAYOUTS AND REVENUE?",
    "problem": "Tier-2 and tier-3 FMCG micro-entrepreneurs don't have access to the data-backed planogram design that big chains use to boost dwell time and basket size. The research set out to close that gap.",
    "system": [
      "Grounded-SAM object detection",
      "Grounding DINO + SAM 1",
      "LiDAR + ARKit RoomPlan 3D mesh",
      "AR recommendation engine"
    ],
    "impact": "About 1,800 of 5,000 surveyed entrepreneurs implemented the layout; ~35% saw a measurable lift in revenue.",
    "metrics": [
      {
        "label": "ENTREPRENEURS SURVEYED",
        "value": 5,
        "suffix": "K"
      },
      {
        "label": "REVENUE INFLUENCED",
        "value": 35,
        "suffix": "%"
      },
      {
        "label": "COMPUTER VISION",
        "value": 0,
        "display": "OBJECT DETECTION"
      }
    ],
    "caseStudy": [
      {
        "label": "01 / CONTEXT",
        "title": "5K MICROENTREPRENEURS SURVEYED",
        "text": "Tier-2 and tier-3 FMCG micro-entrepreneurs don't have access to the data-backed planogram design that big chains use to boost dwell time and basket size. The research set out to close that gap."
      },
      {
        "label": "02 / SYSTEM: VISION PIPELINE",
        "title": "GROUNDED-SAM OBJECT DETECTION",
        "text": "A Grounding DINO + SAM 1 pipeline detected store fixtures from natural-language prompts across 15,000+ supermarket images, zero-shot, with no manual annotation needed. It sorted shelf imagery into roughly 8–10 categories — produce, dairy, personal care, home goods, and so on."
      },
      {
        "label": "03 / SYSTEM: SPATIAL CAPTURE",
        "title": "LIDAR + AR RECOMMENDATION ENGINE",
        "text": "A shop owner walked their empty store with an iPad for 30 seconds; LiDAR and ARKit's RoomPlan turned that into a 3D mesh of walls, floor area, and doors. The layout engine combined that mesh with the vision model's spatial rules and projected the recommended shelf placement back onto the owner's iPad in AR, so they could walk through it before buying a single fixture."
      },
      {
        "label": "04 / OUTCOME",
        "title": "35% REVENUE INFLUENCE",
        "text": "About 1,800 of the 5,000 entrepreneurs surveyed actually implemented the layout — roughly 35% saw a measurable lift in revenue."
      },
      {
        "label": "05 / LEARNING",
        "title": "RESEARCH → REAL OUTCOMES",
        "text": "A research finding only moves revenue once someone can act on it. Turning the CV output into a layout a shop owner could physically walk through is what got 1,800 of them to actually change their stores."
      }
    ],
    "learning": "A research finding only moves revenue once someone can act on it. Turning the CV output into a layout a shop owner could physically walk through is what got 1,800 of them to actually change their stores.",
    "stationType": "professional"
  },
  {
    "id": "cegis",
    "index": "05",
    "name": "CEGIS",
    "role": "PROGRAM ASSISTANT, STRATEGIC PUBLIC FINANCE",
    "theme": "GOVTECH",
    "tag": "ML Tax-Evasion Detection",
    "headline": "HOW DO YOU DETECT GST TAX EVASION ACROSS MILLIONS OF RECORDS WITHOUT LEAVING STATE BOUNDARIES?",
    "problem": "State tax authorities wouldn't send live taxpayer records to a third-party platform, even for a project they'd commissioned. That left the initial training set stuck on historical data from 2017 to 2020.",
    "system": [
      "Federated learning (FedAvg)",
      "Prophet & SARIMAX time-series",
      "XGBoost & Isolation Forests",
      "Buyer-seller GSTIN graph analytics"
    ],
    "impact": "Scaled to 30M+ GST records in-perimeter. 25% improvement in flagging precision for high-risk evaders.",
    "metrics": [
      {
        "label": "GST RECORDS PROCESSED",
        "value": 30,
        "suffix": "M+"
      },
      {
        "label": "SHARPER FRAUD DETECTION",
        "value": 25,
        "suffix": "%"
      },
      {
        "label": "PRIVACY-PRESERVING ML",
        "value": 0,
        "display": "FEDERATED LEARNING"
      }
    ],
    "caseStudy": [
      {
        "label": "01 / CONTEXT",
        "title": "ML-POWERED TAX-EVASION DETECTION",
        "text": "Led product strategy for an ML-based tax-evasion detection platform, piloted with the Delhi and Tamil Nadu state tax departments to catch fake Input Tax Credit claims, circular trading, and mismatched HSN code reporting."
      },
      {
        "label": "02 / PROBLEM",
        "title": "SENSITIVE DATA COULDN'T LEAVE THE STATE",
        "text": "State tax authorities wouldn't send live taxpayer records to a third-party platform, even for a project they'd commissioned. That left the initial training set stuck on historical data from 2017 to 2020."
      },
      {
        "label": "03 / SYSTEM",
        "title": "FEDERATED LEARNING + GRAPH ANALYTICS",
        "text": "The fix was a federated learning setup (FedAvg), where model scripts ran inside each state's own secure environment instead of pulling their data out. A hybrid model paired time-series forecasting (Prophet, SARIMAX) with gradient-boosted anomaly detection (XGBoost, Isolation Forests), while graph analytics traced buyer-seller GSTIN chains to catch shell-company fraud."
      },
      {
        "label": "04 / IMPACT",
        "title": "25% SHARPER FRAUD DETECTION",
        "text": "The pipeline scaled to 30M+ GST records while each state's data stayed inside its own perimeter. Flagging precision for high-risk evaders improved 25%, and audit selection got noticeably faster for the tax officers using it."
      },
      {
        "label": "05 / LEARNING",
        "title": "PRIVACY DIDN'T COST US FRESH DATA",
        "text": "Federated learning kept each state's data inside its own perimeter, and the model still improved from fresh, aggregated learning across states. Privacy-by-design didn't mean settling for stale data."
      }
    ],
    "learning": "Federated learning kept each state's data inside its own perimeter, and the model still improved from fresh, aggregated learning across states. Privacy-by-design didn't mean settling for stale data.",
    "stationType": "professional"
  },
  {
    "id": "sensehq",
    "index": "06",
    "name": "SENSEHQ",
    "role": "ASSOCIATE PRODUCT MANAGER, HR-AUTOMATION-TECH",
    "theme": "PRODUCT MANAGEMENT",
    "tag": "Talent Engagement Platform",
    "headline": "HOW DO YOU LOOK AT RECRUITMENT FROM AN HR'S PERSPECTIVE TO BUILD BETTER B2B SAAS PRODUCTS?",
    "problem": "Most Jira and Zendesk tickets traced back to customers and implementation managers who didn't fully understand what the system could and couldn't do. Release blogs sat unread, and new hires needed 4–5 weeks just to get oriented.",
    "system": [
      "NotebookLM knowledge base",
      "Python RAG prototype with Ollama",
      "Sense IQ embedded in-app assistant",
      "Pre-built Field Guide templates"
    ],
    "impact": "40% drop in support tickets. Ramp-up time cut 70% (4–5 weeks → 1.5 weeks). 30% MoM workflow adoption increase.",
    "metrics": [
      {
        "label": "SUPPORT TICKETS CUT",
        "value": 40,
        "suffix": "%"
      },
      {
        "label": "FASTER RAMP-UP",
        "value": 70,
        "suffix": "%"
      },
      {
        "label": "SENSE IQ AI ASSISTANT",
        "value": 0,
        "display": "SHIPPED"
      }
    ],
    "caseStudy": [
      {
        "label": "01 / CONTEXT",
        "title": "1,200+ CLIENT WORKFLOW PLATFORM",
        "text": "Owned the roadmap for Sense's talent engagement platform, used by 1,200+ clients including L&T, Staffmark, and Aditi Consulting. Also led the migration off a legacy rules engine called Journeys onto the newer node-based Workflows Automation Tool."
      },
      {
        "label": "02 / PROBLEM",
        "title": "SUPPORT TICKETS TRACED TO A KNOWLEDGE GAP",
        "text": "Most Jira and Zendesk tickets traced back to customers and implementation managers who didn't fully understand what the system could and couldn't do. Release blogs sat unread, and new hires needed 4–5 weeks just to get oriented."
      },
      {
        "label": "03 / SYSTEM",
        "title": "RAG-BASED IN-APP ASSISTANT (SENSE IQ)",
        "text": "Piloted an internal NotebookLM knowledge base across Sales, Support, and Engineering, then built a RAG prototype in Python — screenshot-context prompts feeding a local LLM through Ollama — to prove the assistant could answer questions about whatever screen a user was on. That became Sense IQ, an embedded in-app assistant, tested first in a staging environment."
      },
      {
        "label": "04 / IMPACT",
        "title": "40% FEWER SUPPORT TICKETS",
        "text": "Support tickets dropped 40% once Sense IQ launched. New-hire ramp-up time fell too, from 4–5 weeks to about 1.5 weeks. A separate effort — pre-built Field Guide templates for onboarding, data hygiene, and retention workflows — pushed workflow adoption up 30% month over month."
      },
      {
        "label": "05 / LEARNING",
        "title": "NOBODY READS RELEASE NOTES",
        "text": "Static release notes get ignored no matter how well they're written. Wiring a context-aware assistant into the product, so it can see what a user is looking at and answer directly, gets used instead."
      }
    ],
    "learning": "Static release notes get ignored no matter how well they're written. Wiring a context-aware assistant into the product, so it can see what a user is looking at and answer directly, gets used instead.",
    "stationType": "professional"
  }
];

export const METRO_INTRO = {
  hindi: "करियर मेट्रो में आपका स्वागत है",
  english: "Welcome to the Career Metro",
  bilingualTitle: "Career Metro की लाइन में आपका स्वागत है",
  systemMessage: "",
  currentStatus: "",
  cta: "BOARD TRAIN",
  line: "CAREER METRO",
  subtitle: "",
  announcements: [
    "अगला स्टेशन सेंस एचक्यू है।",
    "Next station is SenseHQ.",
    "Please mind the gap between shipping and adoption.",
    "कृपया vanity metrics से सावधान रहें।",
    "Please keep your assumptions with you at all times.",
    "Unattended side projects may be moved to the backlog.",
    "Doors will open on the product side.",
  ],
  footer: "Return to Platform",
};

// Research Archive
export type ResearchPaper = {
  id: string;
  index: string;
  title: string;
  sub?: string;
  venue: string;
  year: number;
  supervisor: string;
  institution: string;
  tags: string[];
  link: string;
  url?: string;
  dataset?: string;
};

export const RESEARCH = {
  index: "03",
  title: "PUBLISHED WORK",
  system: "",
  headline: "I SPENT A FEW YEARS EXPLORING HOW MODELS PROCESS DECEPTION, ADAPT ACROSS LANGUAGES, AND READ MULTIMODAL INTENT.",
  papers: [
    {
      id: "sepsis",
      index: "01",
      title: "SEPSIS: I Can Catch Your Lies - A New Paradigm for Deception Detection",
      sub: "Supervisor: Dr. Amitava Das",
      venue: "EACL 2024",
      year: 2024,
      supervisor: "Dr. Amitava Das",
      institution: "The Artificial Intelligence Institute, University of South Carolina, SC",
      tags: ["DECEPTION DETECTION", "MULTIMODAL AI", "EACL 2024"],
      link: "https://aclanthology.org/2025.acl-srw.7/",
      url: "https://aclanthology.org/2025.acl-srw.7/",
    },
    {
      id: "french-ner-ecir",
      index: "02",
      title: "Adversarial Adaptation for French Named Entity Recognition",
      sub: "Supervisor: Prof. Marie-Jean Meurs",
      venue: "18th ECIR 2023",
      year: 2023,
      supervisor: "Prof. Marie-Jean Meurs",
      institution: "Dept. of CS, Université du Québec, Canada",
      tags: ["NAMED ENTITY RECOGNITION", "DOMAIN ADAPTATION", "ECIR 2023"],
      link: "https://link.springer.com/chapter/10.1007/978-3-031-28238-6_28",
      url: "https://link.springer.com/chapter/10.1007/978-3-031-28238-6_28",
    },
    {
      id: "french-ner-aaai",
      index: "03",
      title: "Transformer-based NER for French within similar domain corpora",
      sub: "Supervisor: Prof. Marie-Jean Meurs",
      venue: "37th AAAI 2023",
      year: 2023,
      supervisor: "Prof. Marie-Jean Meurs",
      institution: "Dept. of CS, Université du Québec, Canada",
      tags: ["TRANSFORMERS", "FRENCH NER", "AAAI 2023"],
      link: "https://ojs.aaai.org/index.php/AAAI/article/view/26958",
      url: "https://ojs.aaai.org/index.php/AAAI/article/view/26958",
    },
    {
      id: "aspect-sentiment-ieee",
      index: "04",
      title: "Attention-free: An Aspect-based Multimodal Sentiment Recognition",
      sub: "Supervisor: Prof. Dinesh Kumar Vishwakarma",
      venue: "IEEE 2023",
      year: 2023,
      supervisor: "Prof. Dinesh Kumar Vishwakarma",
      institution: "HoD, Dept. of Info. Tech, DTU, India",
      tags: ["ATTENTION-FREE", "MULTIMODAL SENTIMENT", "IEEE 2023"],
      link: "https://ieeexplore.ieee.org/document/10201711",
      url: "https://ieeexplore.ieee.org/document/10201711",
    },
  ] as ResearchPaper[],
};

// Product Lab / Insomniac Work
export const LAB = {
  header: "## things built out of curiosity",
  subtitle: "hover around. prototypes that somehow survived the production deploy.",
  wordCloudTitle: "MY CV, IN ABOUT 40 WORDS",
  wordCloud: [
    "Product", "AI", "Systems", "Research", "Customer Journeys", "Roadmaps",
    "Experimentation", "Adoption", "Automation", "Analytics", "B2B SaaS",
    "GovTech", "Computer Vision", "NLP", "Multimodal AI", "Data Pipelines",
    "Prototyping", "APIs", "Jira", "Figma", "Miro", "Amplitude", "Sigma BI",
    "Python", "SQL", "Git", "Tableau", "n8n", "OKRs", "KPIs", "Sprint Planning",
    "UAT", "Cross-Functional", "Engineering Physics", "DTU", "NextLeap", "NYU",
    "Cambridge", "Bosch", "CEGIS", "SenseHQ", "Product Lead", "Too Many Tabs",
  ],
  skills: [
    { label: "Product Strategy", rotate: -3 },
    { label: "Storytelling", rotate: 2 },
    { label: "Customer Journey Mapping", rotate: -1.5 },
    { label: "Workflow Automation", rotate: 3 },
    { label: "Product Analytics", rotate: -2 },
    { label: "Rapid Prototyping", rotate: 1.5 },
    { label: "Applied AI", rotate: -3 },
    { label: "Marketing Research", rotate: 2.5 },
    { label: "Data Systems", rotate: -1 },
    { label: "Iteration", rotate: 2 },
  ],
  sideProjects: [
    { id: "queens-gambit", name: "Queen's Gambit", desc: "A personalised chess platform where classical tournament aesthetics meet modern AI.", categories: ["PERSONALIZED CHESS", "GAME AI"], status: "DEPLOYED" },
    { id: "daily-dose-of-ai", name: "Daily Dose of AI", desc: "Your go-to place for updates on AI and technology.", categories: ["DAILY DOSE OF AI", "NEWS"], status: "DEPLOYED" },
    { id: "skill-tracer", name: "Skill Tracer", desc: "Build skills.md from workflows by recording interactions and using AI models of your choice.", categories: ["SKILL TRACER", "RECORDING"], status: "BUILDING" },
    { id: "hitchhikers-guide", name: "A Hitchhiker's Guide to Presenting Modern Data Solutions", desc: "KaggleX BIPOC Program Project.", categories: ["DATA SOLUTIONS", "GUIDE"], status: "DEPLOYED" },
  ],
};

// Achievements / Signals
export const ACHIEVEMENTS = {
  index: "05",
  title: "HONORS & RECOGNITION",
  headline: "MILESTONES AND RECOGNITIONS EARNED ALONG THE WAY.",
  cards: [
    { org: "NEXTLEAP", label: "TOP 1%", sub: "PRODUCT MANAGEMENT FELLOW", year: "2025", url: "https://www.linkedin.com/in/gupta-pankaj/details/honors/1635554451885/single-media-viewer/?profileId=ACoAACLgHN8BgAC4xBg9Gm1qV9p5Wfo5FGA6X6s" },
    { org: "TOASTMASTERS", label: "DISTRICT RUNNER-UP", sub: "SPEECH COMPETITION RUNNER-UP · TOASTMASTER OF THE MONTH · MOST IMPROVED SPEAKER", year: "2024–26", url: "https://www.toastmasters.org/" },
    { org: "FATIMA FELLOWSHIP", label: "AMONG 30 SELECTED", sub: "FROM 4000+ GLOBAL APPLICANTS", year: "2023", url: "https://www.fatima.institute/" },
    { org: "AMAZON ML SUMMER SCHOOL", label: "AMONG 400 SELECTED", sub: "FROM 17,000+ INDIAN APPLICANTS", year: "2022", url: "https://www.scaler.com/partnerships/amazon#hero" },
    { org: "TEACH FOR INDIA", label: "TEACHING VOLUNTEER", sub: "PYTHON PROGRAMMING · GRADE 11–12 STUDENTS", year: "2020", url: "https://www.teachforindia.org/" },
  ],
  education: [
    { org: "DTU", label: "B.Tech Engineering Physics", sub: "8.69 / 10.00", url: "" },
    { org: "IIIT DELHI", label: "PG Data Science in Health & Climate Change for Social Impact", sub: "9.23 / 10.00", url: "https://drive.google.com/file/d/1SZl9j56rvZ4qW8EcCy_5i6muG25X9Uyu/view?usp=sharing" },
    { org: "NYU", label: "MS Computer Science Bridge Program", sub: "Grade A", url: "https://credentials.engineering.nyu.edu/322c5bd5-2f43-480a-a700-51455fd23aab#acc.bgn0POcz" },
  ],
};

// Contact
export const CONTACT = {
  title: "Talk Product With Me",
  body: "Building something interesting? Hiring for a product role? Working on AI, automation, data products, or a problem that refuses to fit neatly into a Jira ticket? Send me a message.",
  cta: "connectwithguptapankaj@gmail.com",
  annotation: "no forms. no funnels. no friction.",
  mail: "connectwithguptapankaj@gmail.com",
  links: [
    { label: "LINKEDIN", href: "https://www.linkedin.com/in/gupta-pankaj/" },
    { label: "GITHUB", href: "https://github.com/onalunchbreak" },
  ],
  signoff: "Bye. Hope your roadmap survives the next product-market fit conversation. If not, that's probably the most useful feedback you'll get all week.",
  signature: "Pankaj Gupta",
  signatureSub: "",
  systemStatus: "",
};

// Case Close / End Session
export const CASE_CLOSE = {
  title: "ACTION REQUIRED",
  subtitle: "SESSION COMPLETE",
  user: "USER: PANKAJ_GUPTA",
  alias: "",
  hint: "PRESS ANYWHERE TO CLOSE",
  button: "READ",
  buttonSequence: ["READ", "BUILD", "SHIP"],
  status: "",
  action: "END SESSION",
};
