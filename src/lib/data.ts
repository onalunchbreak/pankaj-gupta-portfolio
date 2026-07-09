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
  { label: "Product OS", id: "product-os" },
  { label: "Best Work", id: "best-work" },
  { label: "Research", id: "research" },
  { label: "Projects", id: "lab" },
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
    "SACRIFICING RAM TO CHROME",
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
  scrollCtaSub: "THERE ARE MORE OPEN TABS.",
  bottomLabel: "Portfolio // Pankaj Gupta",
  bottomSession: "Session // Mr. Onalunchbreak",
};

// Navigation Index
export const NAV_INDEX = {
  index: "02",
  title: "Index",
  items: [
    { label: "About Me", annotation: "how I ended up here", target: "origin" },
    { label: "Product OS", annotation: "how I think about products", target: "product-os" },
    { label: "Best Work", annotation: "systems worth inspecting", target: "best-work" },
    { label: "Research Archive", annotation: "papers I somehow finished", target: "research" },
    { label: "Side Projects", annotation: "things built outside working hours", target: "lab" },
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
  subtitle: "how I accidentally became a product person.",
  hero: "I STARTED BY BUILDING TECHNICAL THINGS. THEN I REALISED THE HARDER QUESTION WAS: WHAT SHOULD WE BUILD IN THE FIRST PLACE?",
  emphasis: "WHAT SHOULD WE BUILD IN THE FIRST PLACE?",
  paragraphs: [
    "I studied Engineering Physics at DTU. The obvious path was to keep going deeper into engineering. So naturally, I started working on computer vision, NLP, multimodal AI, AR systems, research papers, public-sector analytics platforms, and whatever else looked technically interesting.",
    "Somewhere between models, data pipelines, deployments, users, and institutions, the question changed. 'Could I build it?' became 'Should we build it? For whom? What changes if it works?'",
    "Engineering taught me how systems work. Research taught me how to ask better questions. Product taught me to connect both to actual users.",
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
  annotations: [
    "engineering was only the beginning.",
    "yes, there were too many research papers.",
    "somehow ended up launching products.",
    "users > models.",
    "still figuring it out.",
  ],
  motif: "PRODUCT ROADMAP?",
  motifCrossed: "ROADMAP",
  motifSub: "plans changed.",
};

// Product OS (philosophy + metrics + places + stats)
export const PRODUCT_OS = {
  index: "02",
  title: "BUILDING IS THE EASY PART",
  headline: "PRODUCTS WITH A REASON.",
  paragraph:
    "I love technology, AI, and building complex systems. But a technically impressive product that nobody uses is still a failure.",
  secondary:
    "The best product work happens at the intersection of user problems, business outcomes, technical feasibility, and relentless iteration.",
  centralMetric: { value: 1200, suffix: "+", label: "GLOBAL CUSTOMERS", sub: "PRODUCT PLATFORM OWNERSHIP" },
  annotation: "turns out every edge case eventually becomes a Jira ticket.",
  places: {
    index: "// PLACES I'VE BUILT AT",
    companies: ["SenseHQ", "Center for Effective Governance of Indian States", "Judge Business School, University of Cambridge", "Bosch Global Software Technologies"],
    note: "different industries. same question. what actually moves the outcome?",
  },
  stats: [
    { value: 30, suffix: "%", label: "MoM INCREASE", sub: "in adoption of key talent engagement use cases" },
    { value: 40, suffix: "%", label: "FEWER SUPPORT TICKETS", sub: "through AI-assisted internal query-resolution systems" },
    { value: 70, suffix: "%", label: "FASTER ONBOARDING", sub: "4–5 weeks → 1.5 weeks" },
    { value: 30, suffix: "M+", label: "GST RECORDS", sub: "processed across public-sector ML deployments" },
    { value: 25, suffix: "%", label: "MODEL ACCURACY IMPROVEMENT", sub: "across pilot deployments" },
    { value: 10, suffix: "+", label: "BOSCH FACILITIES", sub: "using AR training deployments" },
  ],
  bottomNote: "still suspicious of vanity metrics.",
  ps: "The goal is simple: understand the problem deeply enough, build the smallest useful system, measure what changes, then keep iterating.",
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
  extras?: { label: string; items: string[] }[];
  stationType: "professional" | "research" | "side-project";
};

export const METRO_STATIONS: MetroStation[] = [
  {
    id: "edukey-intelligent-systems",
    index: "01",
    name: "EDUKEY INTELLIGENT SYSTEMS",
    role: "Marketing Intern",
    theme: "MARKETING",
    tag: "Growth & Engagement",
    headline: "HOW DO YOU BUILD A COMMUNITY OF 50K+ STUDENTS FROM SCRATCH?",
    problem:
      "Early-stage education platform student acquisition and community engagement were highly limited by ad-hoc marketing efforts.",
    system: ["SEO optimization", "Social media campaigns", "Content distribution pipelines", "Campus representative program"],
    impact: "50K+ student community reached. 40% organic acquisition lift. 2019 launch campaigns delivered.",
    metrics: [
      { label: "Student Community", value: 50, suffix: "K+" },
      { label: "Organic Acquisition", value: 40, suffix: "%" },
      { label: "Launch Campaigns", value: 0, display: "DELIVERED" },
    ],
    caseStudy: [
      { label: "CONTEXT", title: "Early-stage EdTech platform", text: "Joined Edukey Intelligent Systems to design and lead marketing and growth initiatives." },
      { label: "PROBLEM", title: "Friction in student reach", text: "Student acquisition and community engagement were highly limited by ad-hoc marketing efforts." },
      { label: "SYSTEM", title: "SEO + Content pipelines", text: "Built SEO optimization workflows, social media campaigns, content distribution pipelines, and a campus rep program." },
      { label: "IMPACT", title: "50K+ students reached", text: "Grew the student community to 50K+ active learners with a 40% lift in organic user acquisition." },
      { label: "LEARNING", title: "Distribution > product", text: "Even the best educational content requires structured, scalable distribution channels to reach students." },
    ],
    learning: "Even the best educational content requires structured, scalable distribution channels to reach students.",
    stationType: "professional",
  },
  {
    id: "teach-for-india",
    index: "02",
    name: "TEACH FOR INDIA",
    role: "Teaching Volunteer",
    theme: "EDUCATION",
    tag: "Community Teaching",
    headline: "CAN VIRTUAL CLASSROOMS PRESERVE EDUCATION DURING GLOBAL LOCKDOWNS?",
    problem:
      "Sudden lockdowns threatened school closures. Students in low-resource schools lacked digital infrastructure and remote engagement.",
    system: ["Virtual classroom tools", "Low-bandwidth worksheets", "Parent engagement tracking", "Digital literacy sessions"],
    impact: "100% learning continuity. 40+ students trained remotely. 2020 remote teaching model executed.",
    metrics: [
      { label: "Students Reached", value: 40, suffix: "+" },
      { label: "Learning Continuity", value: 100, suffix: "%" },
      { label: "Digital Literacy", value: 0, display: "IMPLEMENTED" },
    ],
    caseStudy: [
      { label: "CONTEXT", title: "Low-resource community school", text: "Volunteered as a teacher for under-resourced schools to ensure education continuity during the pandemic." },
      { label: "PROBLEM", title: "Lockdown learning loss", text: "Sudden lockdowns threatened school closures. Students in low-resource schools lacked digital infrastructure and remote engagement." },
      { label: "SYSTEM", title: "Low-bandwidth remote tools", text: "Designed virtual classroom sessions, low-bandwidth WhatsApp learning worksheets, and parent engagement tracking sheets." },
      { label: "IMPACT", title: "100% remote continuity", text: "Maintained 100% learning continuity for 40+ students throughout the lockdown period." },
      { label: "LEARNING", title: "Access over quality", text: "In low-resource environments, optimizing for access and simplicity is far more critical than high-end visual learning systems." },
    ],
    learning: "In low-resource environments, optimizing for access and simplicity is far more critical than high-end visual learning systems.",
    stationType: "professional",
  },
  {
    id: "pratham-education",
    index: "03",
    name: "PRATHAM EDUCATION",
    role: "Data Science Intern",
    theme: "DATA SCIENCE",
    tag: "Educational Analytics",
    headline: "HOW DO YOU MEASURE THE IMPACT OF LEARNING PROGRAMS ACROSS RURAL INDIA?",
    problem:
      "Measuring rural learning outcomes manually is slow, error-prone, and scales poorly across thousands of villages.",
    system: ["Data aggregation pipelines", "Statistical impact models", "Automated outcome reporting", "Tableau metrics dashboards"],
    impact: "15% assessment speed increase. 100K+ village outcome records processed. 2021 analytics pipelines shipped.",
    metrics: [
      { label: "Records Processed", value: 100, suffix: "K+" },
      { label: "Assessment Speed", value: 15, suffix: "%" },
      { label: "Analytics Pipelines", value: 0, display: "SHIPPED" },
    ],
    caseStudy: [
      { label: "CONTEXT", title: "Rural education metrics", text: "Worked as a Data Science Intern to automate and scale assessment analysis across rural India." },
      { label: "PROBLEM", title: "Manual reporting bottlenecks", text: "Measuring rural learning outcomes manually is slow, error-prone, and scales poorly across thousands of villages." },
      { label: "SYSTEM", title: "Statistical impact pipelines", text: "Built data aggregation pipelines, statistical impact models, and Tableau dashboards to automate outcome reporting." },
      { label: "IMPACT", title: "100K+ records parsed", text: "Processed 100K+ village outcome records and increased assessment analytics speed by 15%." },
      { label: "LEARNING", title: "Data is noise without context", text: "Large datasets of test scores are useless unless aligned with the operational realities of remote teaching volunteers." },
    ],
    learning: "Large datasets of test scores are useless unless aligned with the operational realities of remote teaching volunteers.",
    stationType: "professional",
  },
  {
    id: "bosch",
    index: "04",
    name: "BOSCH",
    role: "Applied AI Intern",
    theme: "APPLIED AI",
    tag: "AR Workforce Training",
    headline: "WHAT IF REMOTE TRAINING COULD FEEL MORE LIKE BEING THERE?",
    problem:
      "Remote workforce training efficiency was approximately 3%. Training complex manufacturing workflows remotely created significant limitations.",
    system: ["AR training platform", "Text-to-Speech", "Meta Oculus Quest headsets", "Deployment across Bosch manufacturing facilities"],
    impact: "3% → 30% remote training efficiency. 10+ Indian manufacturing facilities deployed.",
    metrics: [
      { label: "Training Efficiency", value: 0, display: "3% → 30%" },
      { label: "Manufacturing Facilities", value: 10, suffix: "+" },
      { label: "AR × AI", value: 0, display: "DEPLOYED" },
    ],
    caseStudy: [
      { label: "PROBLEM", title: "Remote training was broken", text: "Remote workforce training efficiency was approximately 3%. Training complex manufacturing workflows remotely created significant limitations." },
      { label: "SYSTEM", title: "AR training platform", text: "AR training platform using Text-to-Speech and Meta Oculus Quest headsets, deployed across Bosch manufacturing facilities." },
      { label: "DEPLOYMENT", title: "10+ facilities", text: "Deployed across 10+ Bosch manufacturing facilities in India." },
      { label: "IMPACT", title: "10× efficiency lift", text: "Improved remote workforce training efficiency from 3% to 30%." },
      { label: "LEARNING", title: "Immersive > manual", text: "Immersive AR training dramatically outperforms traditional remote methods for complex physical workflows." },
    ],
    learning: "Immersive AR training dramatically outperforms traditional remote methods for complex physical workflows.",
    stationType: "professional",
  },
  {
    id: "cambridge-jbs",
    index: "05",
    name: "CAMBRIDGE JBS",
    role: "JBS Research Apprentice",
    theme: "APPLIED RESEARCH",
    tag: "Computer Vision for FMCG",
    headline: "CAN COMPUTER VISION HELP A SMALL RETAILER MAKE BETTER BUSINESS DECISIONS?",
    problem:
      "500K FMCG microentrepreneurs operate with limited access to retail infrastructure intelligence. Can computer vision bridge that gap?",
    system: ["Computer-vision object-detection models", "Retail infrastructure analysis", "Store-layout recommendations"],
    impact: "35% of surveyed business owners had revenue outcomes influenced. 500K FMCG microentrepreneurs in the research scope.",
    metrics: [
      { label: "Microentrepreneurs", value: 500, suffix: "K" },
      { label: "Revenue Influenced", value: 35, suffix: "%" },
      { label: "Computer Vision", value: 0, display: "OBJECT DETECTION" },
    ],
    caseStudy: [
      { label: "CONTEXT", title: "500K microentrepreneurs", text: "Research involving 500K FMCG microentrepreneurs across retail infrastructure." },
      { label: "RESEARCH QUESTION", title: "Can CV help small retailers?", text: "Can computer vision help a small retailer make better business decisions?" },
      { label: "SYSTEM", title: "CV object detection", text: "Computer-vision object-detection models for retail infrastructure and store-layout recommendations." },
      { label: "OUTCOME", title: "35% revenue influence", text: "Influenced revenue outcomes for 35% of surveyed business owners. Translated CV outputs into actionable retail recommendations." },
      { label: "LEARNING", title: "Research → real outcomes", text: "Applied research can directly influence real revenue outcomes when translated into actionable recommendations." },
    ],
    learning: "Applied research can directly influence real revenue outcomes when translated into actionable recommendations.",
    stationType: "professional",
  },
  {
    id: "cegis",
    index: "06",
    name: "CEGIS",
    role: "Program Assistant",
    theme: "GOVTECH",
    tag: "ML Tax-Evasion Detection",
    headline: "WHAT DOES PRODUCT MANAGEMENT LOOK LIKE WHEN THE USERS ARE GOVERNMENT SYSTEMS?",
    problem:
      "Tax-evasion detection across state tax departments requires processing massive GST record volumes and building ML models that government users can actually act on.",
    system: ["ML-powered analytics platform", "Data pipelines processing GST records", "Pilot deployments for Delhi + Tamil Nadu"],
    impact: "30M+ GST records processed. 25% model accuracy improvement. 2 state tax department pilots launched.",
    metrics: [
      { label: "GST Records", value: 30, suffix: "M+" },
      { label: "Accuracy Improvement", value: 25, suffix: "%" },
      { label: "State Pilots", value: 2 },
    ],
    caseStudy: [
      { label: "PROBLEM", title: "Tax evasion at scale", text: "Tax-evasion detection across state tax departments requires processing massive GST record volumes and building ML models that government users can actually act on." },
      { label: "STAKEHOLDERS", title: "Delhi + Tamil Nadu", text: "Delhi state tax department and Tamil Nadu state tax department as pilot deployment partners." },
      { label: "PRODUCT STRATEGY", title: "End-to-end ownership", text: "Led product strategy and delivery end-to-end — from data pipeline architecture to model improvement to government deployment." },
      { label: "DATA SYSTEM", title: "30M+ GST records", text: "Implemented and scaled data pipelines processing 30M+ GST records across pilot deployments." },
      { label: "IMPACT", title: "25% accuracy lift", text: "Improved model accuracy by 25%. Accelerated decision-making across pilot deployments." },
      { label: "LEARNING", title: "GovTech product thinking", text: "Product management for government users requires a different cadence — reliability, interpretability, and institutional trust matter as much as model performance." },
    ],
    learning: "Product management for government users requires a different cadence — reliability, interpretability, and institutional trust matter as much as model performance.",
    stationType: "professional",
  },
  {
    id: "sensehq",
    index: "07",
    name: "SENSEHQ",
    role: "Associate Product Manager",
    theme: "PRODUCT MANAGEMENT",
    tag: "Talent Engagement Platform",
    headline: "BUILDING FEATURES IS EASY. GETTING 1200+ CUSTOMERS TO ACTUALLY USE THEM IS THE PRODUCT PROBLEM.",
    problem:
      "A B2B HR automation platform with 1200+ global customers. Feature adoption, customer journey friction, support load, internal knowledge access, and new-hire onboarding were all product problems waiting to be solved.",
    system: ["Customer journey analysis", "Feature adoption initiatives", "Roadmap ownership", "AI-assisted internal query-resolution tools"],
    impact: "30% MoM adoption increase. 40% fewer support tickets. 70% faster onboarding. 1200+ global customers served.",
    metrics: [
      { label: "MoM Adoption", value: 30, suffix: "%" },
      { label: "Fewer Tickets", value: 40, suffix: "%" },
      { label: "Faster Onboarding", value: 70, suffix: "%" },
      { label: "Global Customers", value: 1200, suffix: "+" },
    ],
    caseStudy: [
      { label: "CONTEXT", title: "B2B HR automation, 1200+ customers", text: "B2B HR automation platform serving 1200+ global customers. Cross-functional work with Sales, Marketing, Implementation, Support, Engineering, and Product." },
      { label: "CUSTOMER PROBLEM", title: "Adoption + friction + support", text: "Feature adoption, customer journey friction, support load, internal knowledge access, and new-hire onboarding were all product problems waiting to be solved." },
      { label: "PRODUCT DECISIONS", title: "Roadmap + journey analysis", text: "Owned end-to-end feature roadmap aligned with retention goals. Led customer journey analysis and feature adoption initiatives." },
      { label: "SYSTEMS SHIPPED", title: "AI query-resolution", text: "Architected AI-assisted internal query-resolution tools that reduced customer-facing Jira / Zendesk support tickets by 40%." },
      { label: "OUTCOME", title: "30% / 40% / 70%", text: "30% MoM increase in key use case adoption. 40% fewer support tickets. 70% faster onboarding (4–5 weeks → 1.5 weeks)." },
      { label: "LEARNING", title: "Adoption > features", text: "Building features is easy. Getting 1200+ customers to actually use them is the product problem." },
    ],
    learning: "Building features is easy. Getting 1200+ customers to actually use them is the product problem.",
    extras: [
      { label: "Cross-Functional Teams", items: ["Sales", "Marketing", "Implementation", "Support", "Engineering", "Product"] },
      { label: "Product Problems", items: ["Feature Adoption", "Customer Journey Friction", "Support Load", "Internal Knowledge Access", "New-Hire Onboarding"] },
    ],
    stationType: "professional",
  },
  // NOTE: The "MR. ONALUNCHBREAK" side-project station was removed per user
  // request — side projects now live in the Product Lab section instead.
];

export const METRO_INTRO = {
  hindi: "करियर मेट्रो में आपका स्वागत है",
  english: "Welcome to the Career Metro",
  bilingualTitle: "Career Metro की लाइन में आपका स्वागत है",
  systemMessage: "",
  currentStatus: "",
  cta: "BOARD TRAIN",
  line: "CAREER METRO",
  subtitle: "SEVEN PLATFORMS TILL DATE. STILL IN TRANSIT FOR THE NEXT STOP.",
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
  venue: string;
  year: number;
  supervisor: string;
  institution: string;
  domain: string[];
  url?: string;
};

export const RESEARCH = {
  index: "04",
  title: "RESEARCH ARCHIVE",
  system: "papers_i_somehow_finished",
  headline: "I SPENT A FEW YEARS TEACHING MODELS TO UNDERSTAND LANGUAGE, EMOTIONS, AND APPARENTLY LIES.",
  papers: [
    {
      id: "sepsis",
      index: "01",
      title: "SEPSIS: I Can Catch Your Lies — A New Paradigm for Deception Detection",
      venue: "EACL",
      year: 2025,
      supervisor: "Dr. Amitava Das",
      institution: "The Artificial Intelligence Institute, University of South Carolina",
      domain: ["Deception Detection", "NLP"],
      url: "https://aclanthology.org/2025.acl-srw.7/",
    },
    {
      id: "french-ner-ecir",
      index: "02",
      title: "Adversarial Adaptation for French Named Entity Recognition",
      venue: "18th ECIR",
      year: 2023,
      supervisor: "Prof. Marie-Jean Meurs",
      institution: "Université du Québec",
      domain: ["NER", "Domain Adaptation"],
      url: "https://link.springer.com/chapter/10.1007/978-3-031-28238-6_28",
    },
    {
      id: "french-ner-aaai",
      index: "03",
      title: "Transformer-based NER for French within Similar Domain Corpora",
      venue: "37th AAAI",
      year: 2023,
      supervisor: "Prof. Marie-Jean Meurs",
      institution: "Université du Québec",
      domain: ["NER", "NLP"],
      url: "https://ojs.aaai.org/index.php/AAAI/article/view/26958",
    },
    {
      id: "multimodal-sentiment",
      index: "04",
      title: "Attention-free: An Aspect-based Multimodal Sentiment Recognition",
      venue: "IEEE",
      year: 2023,
      supervisor: "Prof. Dinesh Kumar Vishwakarma",
      institution: "DTU",
      domain: ["Multimodal Sentiment", "AI"],
      url: "https://ieeexplore.ieee.org/document/10201711",
    },
  ] as ResearchPaper[],
};

// Product Lab / Insomniac Work
export const LAB = {
  header: "## things built on lunch breaks",
  subtitle: "hover around. some of these escaped the backlog.",
  wordCloudTitle: "MY CV, IN ABOUT 40 WORDS",
  wordCloud: [
    "Product", "AI", "Systems", "Research", "Customer Journeys", "Roadmaps",
    "Experimentation", "Adoption", "Automation", "Analytics", "B2B SaaS",
    "GovTech", "Computer Vision", "NLP", "Multimodal AI", "Data Pipelines",
    "Prototyping", "APIs", "Jira", "Figma", "Miro", "Amplitude", "Sigma BI",
    "Python", "SQL", "Git", "Tableau", "n8n", "OKRs", "KPIs", "Sprint Planning",
    "UAT", "Cross-Functional", "Engineering Physics", "DTU", "NextLeap", "NYU",
    "Cambridge", "Bosch", "CEGIS", "SenseHQ", "Still Building", "Too Many Tabs",
    "Mr. Onalunchbreak",
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
    { id: "queens-gambit", name: "Queen's Gambit", desc: "A personalised chess platform where classical tournament aesthetics meet modern AI.", categories: ["PRODUCT", "AI"], status: "DEPLOYED" },
    { id: "daily-dose-of-ai", name: "Daily Dose of AI", desc: "Your go-to place for updates on AI and technology.", categories: ["PRODUCT", "WRITING"], status: "DEPLOYED" },
    { id: "skill-tracer", name: "Skill Tracer", desc: "Build skills.md from workflows by recording interactions and using AI models of your choice.", categories: ["PRODUCT", "WORKFLOWS"], status: "BUILDING" },
    { id: "hitchhikers-guide", name: "A Hitchhiker's Guide to Presenting Modern Data Solutions", desc: "KaggleX BIPOC Program Project.", categories: ["DATA", "WRITING"], status: "DEPLOYED" },
  ],
};

// Achievements / Signals
export const ACHIEVEMENTS = {
  index: "05",
  title: "SOME EXTERNAL VALIDATION",
  headline: "APPARENTLY OTHER PEOPLE ALSO THOUGHT I WAS DOING SOMETHING USEFUL.",
  cards: [
    { org: "NEXTLEAP", label: "TOP 1%", sub: "PRODUCT MANAGEMENT FELLOW", year: "2025", url: "https://www.linkedin.com/in/gupta-pankaj/details/honors/1635554451885/single-media-viewer/?profileId=ACoAACLgHN8BgAC4xBg9Gm1qV9p5Wfo5FGA6X6s" },
    { org: "FATIMA FELLOWSHIP", label: "30 SELECTED", sub: "FROM 4000+ GLOBAL APPLICANTS", year: "2023", url: "https://www.fatima.institute/" },
    { org: "AMAZON ML SUMMER SCHOOL", label: "SELECTED FROM", sub: "17,000+ APPLICANTS", year: "2022", url: "https://www.scaler.com/partnerships/amazon#hero" },
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
  cta: "→ say hi before the lunch break ends",
  annotation: "no forms. no funnels. no friction.",
  mail: "connectwithguptapankaj@gmail.com",
  links: [
    { label: "LINKEDIN", href: "https://www.linkedin.com/in/gupta-pankaj/" },
    { label: "GITHUB", href: "https://github.com/onalunchbreak" },
  ],
  signoff: "Bye. Hope your roadmap survives the next product-market fit conversation. If not, that's probably the most useful feedback you'll get all week.",
  signature: "Pankaj Gupta",
  signatureSub: "(Mr. Onalunchbreak)",
  systemStatus: "STILL BUILDING.",
};

// Case Close / End Session
export const CASE_CLOSE = {
  title: "ACTION REQUIRED",
  subtitle: "SESSION COMPLETE",
  user: "USER: PANKAJ_GUPTA",
  alias: "ALIAS: MR_ONALUNCHBREAK",
  hint: "PRESS ANYWHERE TO CLOSE",
  button: "READ",
  buttonSequence: ["READ", "BUILD", "SHIP"],
  status: "CURRENT STATUS: STILL BUILDING",
  action: "END SESSION",
};
