"use client";

import { useState, useEffect } from "react";

interface TraceItem {
  id: string;
  name: string;
  themeColor: string;
  business: {
    title: string;
    metric: string;
    description: string;
    badge: string;
    renderVisual: () => React.ReactNode;
  };
  product: {
    title: string;
    status: string;
    rice: { reach: string; impact: string; confidence: string; effort: string; score: number };
    specNotes: string;
  };
  engineering: {
    title: string;
    filePath: string;
    action: string;
    code: string;
  };
}

export default function ProductFlow() {
  const [activeTraceIndex, setActiveTraceIndex] = useState(0);
  const [pulseCount, setPulseCount] = useState(0);

  // Trigger pulse animations on active trace change
  useEffect(() => {
    setPulseCount((prev) => prev + 1);
  }, [activeTraceIndex]);

  const traceData: TraceItem[] = [
    {
      id: "checkout-optimization",
      name: "Checkout Friction Fix",
      themeColor: "terracotta",
      business: {
        title: "Mixpanel Conversion Funnel",
        metric: "-4.2% drop-off at checkout step",
        description: "Telemetry logs flags checkout drop-off rates on mobile browsers. Friction detected around address auto-fill fields.",
        badge: "Revenue Leak",
        renderVisual: () => (
          <div className="w-full flex flex-col space-y-2 mt-2 bg-stone-50 dark:bg-stone-900/30 p-3 rounded-lg border border-border/60">
            <div className="flex justify-between items-center text-2xs font-mono text-muted-foreground">
              <span>Checkout Funnel Retention</span>
              <span className="text-amber-500 font-bold text-[10px]">Alert Traced</span>
            </div>
            <div className="space-y-1.5 pt-1">
              <div>
                <div className="flex justify-between text-[10px] font-mono text-foreground mb-0.5">
                  <span>1. Cart Overview</span>
                  <span>100%</span>
                </div>
                <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: "100%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[10px] font-mono text-foreground mb-0.5">
                  <span>2. Shipping Address</span>
                  <span>65%</span>
                </div>
                <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500/80 h-full rounded-full" style={{ width: "65%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[10px] font-mono text-foreground mb-0.5">
                  <span>3. Payment Forms</span>
                  <span className="text-primary font-bold">12% (Drop-off Zone)</span>
                </div>
                <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full animate-pulse" style={{ width: "12%" }} />
                </div>
              </div>
            </div>
          </div>
        ),
      },
      product: {
        title: "PRD: 1-Click Express Checkout",
        status: "Roadmap: Active Dev",
        rice: { reach: "85%", impact: "High (3)", confidence: "90%", effort: "2 weeks", score: 108 },
        specNotes: "Implement Stripe Link tokenization. Pre-fill address via browser credentials to bypass 4 manual input fields.",
      },
      engineering: {
        title: "Express Checkout Route",
        filePath: "src/app/api/checkout/route.ts",
        action: "POST /api/checkout",
        code: `// Stripe express session initiator
export async function POST(req: Request) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card', 'link'],
    payment_method_options: {
      link: { email_required: true }
    },
    line_items: [{ price: 'price_LTV', quantity: 1 }],
    mode: 'payment',
    success_url: \`\${origin}/success\`,
  });
  return NextResponse.json({ url: session.url });
}`,
      },
    },
    {
      id: "search-discoverability",
      name: "Semantic MDX Search",
      themeColor: "amber",
      business: {
        title: "Search Failure Telemetry",
        metric: "28% search rate leads to '0 results'",
        description: "Algolia index audits show users searching blog posts using synonyms (e.g. 'speed' instead of 'performance') which return empty queries.",
        badge: "UX Friction",
        renderVisual: () => (
          <div className="w-full flex flex-col space-y-2 mt-2 bg-stone-50 dark:bg-stone-900/30 p-3 rounded-lg border border-border/60">
            <div className="flex justify-between items-center text-2xs font-mono text-muted-foreground">
              <span>Query Logs Monitor</span>
              <span className="text-red-500 font-semibold animate-pulse text-[10px]">0 Results Alert</span>
            </div>
            <div className="border border-border rounded p-2 bg-background flex flex-col space-y-1">
              <div className="flex items-center space-x-1 border-b border-border pb-1">
                <span className="text-2xs text-muted-foreground">🔍</span>
                <span className="text-[10px] font-mono text-foreground animate-pulse border-r border-primary/50 pr-0.5">how to optimize page speed</span>
              </div>
              <span className="text-[10px] font-mono text-red-500 bg-red-500/5 p-1 rounded border border-red-500/10">
                &gt; search log: "page speed" matched 0 documents. User bounced.
              </span>
            </div>
          </div>
        ),
      },
      product: {
        title: "Spec: MDX Semantic Search",
        status: "Roadmap: Shipped",
        rice: { reach: "60%", impact: "Medium (2)", confidence: "85%", effort: "1 week", score: 96 },
        specNotes: "Introduce FlexSearch indexing hook for MDX content. Add tags/synonyms array to blog frontmatter mapping metadata.",
      },
      engineering: {
        title: "Fuzzy Search Indexer Hook",
        filePath: "src/lib/search.ts",
        action: "buildIndex() & search()",
        code: `// FlexSearch catalog compiler
import { Document } from "flexsearch";

const searchIndex = new Document({
  document: {
    id: "slug",
    index: ["title", "excerpt", "tags", "content"],
    store: ["title", "excerpt"]
  },
  tokenize: "forward"
});

export function searchBlog(query: string) {
  return searchIndex.search(query, {
    enrich: true,
    suggest: true
  });
}`,
      },
    },
    {
      id: "dashboard-latency",
      name: "Dashboard Latency SLA",
      themeColor: "emerald",
      business: {
        title: "Sentry Core Web Vitals",
        metric: "Dashboard LCP > 3.2s (Threshold < 1s)",
        description: "Analytics page load alerts triggered. Slow queries database fetch halts dashboard initial rendering for enterprise accounts.",
        badge: "SLA Violations",
        renderVisual: () => (
          <div className="w-full flex flex-col space-y-2 mt-2 bg-stone-50 dark:bg-stone-900/30 p-3 rounded-lg border border-border/60">
            <div className="flex justify-between items-center text-2xs font-mono text-muted-foreground">
              <span>Sentry Vitals Alert</span>
              <span className="text-red-500 font-bold text-[10px]">LCP CRITICAL</span>
            </div>
            <div className="flex items-center space-x-3 pt-1">
              <div className="relative w-12 h-12 flex items-center justify-center rounded-full border-4 border-red-500/20">
                <span className="text-2xs font-bold text-red-500 animate-pulse">3.2s</span>
                <div className="absolute inset-0 border-4 border-t-red-500 border-r-red-500 border-b-transparent border-l-transparent rounded-full animate-spin duration-3000" />
              </div>
              <div className="flex-1 text-[9px] font-mono space-y-0.5">
                <div className="text-foreground">SLA Threshold: 1.0s</div>
                <div className="text-red-500 font-semibold">P95 Delay: +2.2s latency</div>
                <div className="text-muted-foreground">Trigger: Database fetch blocking</div>
              </div>
            </div>
          </div>
        ),
      },
      product: {
        title: "PRD: Edge Cache & Static Build",
        status: "Roadmap: Optimized",
        rice: { reach: "100%", impact: "Medium (2)", confidence: "100%", effort: "1 week", score: 200 },
        specNotes: "Re-architect analytical route to fetch telemetry via Edge cached payloads with stale-while-revalidate runtime configurations.",
      },
      engineering: {
        title: "Edge Runtime Caching",
        filePath: "src/app/api/metrics/route.ts",
        action: "runtime = 'edge'",
        code: `// Edge Cached API Handler
export const runtime = "edge";
export const revalidate = 60; // 1 min Cache

export async function GET() {
  const dbResult = await fetchMetricsFromKV();
  return new Response(JSON.stringify(dbResult), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30"
    }
  });
}`,
      },
    },
  ];

  const activeTrace = traceData[activeTraceIndex];

  return (
    <div className="w-full py-16 px-4 border border-border rounded-2xl bg-card shadow-xs overflow-hidden relative transition-colors duration-200">
      {/* Background radial overlays */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-60 pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <header className="text-center mb-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">The PM Translation Engine</span>
          <h3 className="font-serif text-3xl font-light sm:text-4xl text-foreground mt-2">
            Connecting <span className="italic font-normal">Business Telemetry</span> to <span className="italic font-normal text-primary">Shipped Code</span>
          </h3>
          <p className="mt-4 text-sm text-muted-foreground max-w-xl mx-auto">
            Interactive representation of how I analyze data alerts, model feature PRDs, prioritize workloads, and collaborate with engineers to deploy solutions.
          </p>
        </header>

        {/* Tab Selection */}
        <div className="flex justify-center mb-10 border-b border-border pb-px">
          <div className="inline-flex space-x-1 p-1 bg-muted/50 border border-border/80 rounded-full">
            {traceData.map((trace, idx) => {
              const isActive = activeTraceIndex === idx;
              return (
                <button
                  key={trace.id}
                  onClick={() => setActiveTraceIndex(idx)}
                  className={`px-4 py-1.5 text-xs font-medium rounded-full transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-card text-foreground shadow-xs border border-border/40"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {trace.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Pipeline Layout */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_80px_1fr_80px_1fr] items-stretch gap-6 md:gap-0 relative">
          
          {/* STAGE 1: BUSINESS TELEMETRY */}
          <div className="flex flex-col p-6 rounded-xl border border-border/80 bg-background/50 backdrop-blur-xs relative z-10 transition-all duration-300 hover:border-primary/30">
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest bg-amber-500/10 dark:bg-amber-500/20 px-2 py-0.5 rounded-full">
                01. Business Value
              </span>
              <span className="text-3xs font-mono text-muted-foreground">{activeTrace.business.badge}</span>
            </div>
            
            <h4 className="text-base font-semibold text-foreground mb-1">
              {activeTrace.business.title}
            </h4>
            <p className="text-xs font-mono text-primary font-bold mb-3">
              {activeTrace.business.metric}
            </p>
            
            <p className="text-xs text-muted-foreground leading-relaxed mb-4 flex-1">
              {activeTrace.business.description}
            </p>

            {/* Visual Metric Mockup */}
            {activeTrace.business.renderVisual()}
          </div>

          {/* CONNECTOR 1: SVG DASHED PATH */}
          <div className="hidden md:flex flex-col justify-center items-center relative overflow-hidden h-full z-0">
            <svg width="80" height="320" viewBox="0 0 80 320" className="w-full h-full opacity-65 overflow-visible">
              <defs>
                <linearGradient id="gradient-1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="1" />
                </linearGradient>
              </defs>
              {/* Connector lines connecting Row levels */}
              <path
                d="M 0 160 C 40 160, 40 160, 80 160"
                fill="none"
                stroke="var(--color-border)"
                strokeWidth="1.5"
              />
              <path
                key={`line-1-${pulseCount}`}
                d="M 0 160 C 40 160, 40 160, 80 160"
                fill="none"
                stroke="url(#gradient-1)"
                strokeWidth="2.5"
                className="animate-dash"
              />
              {/* Laser dot traveling path */}
              <circle r="3" fill="var(--color-primary)" className="shadow-xs shadow-primary">
                <animateMotion
                  key={`motion-1-${pulseCount}`}
                  dur="1.8s"
                  repeatCount="indefinite"
                  path="M 0 160 C 40 160, 40 160, 80 160"
                />
              </circle>
            </svg>
          </div>

          {/* STAGE 2: PRODUCT PRIORITIZATION */}
          <div className="flex flex-col p-6 rounded-xl border border-primary/30 bg-background/50 backdrop-blur-xs relative z-10 transition-all duration-300 shadow-xs hover:border-primary/50 shadow-primary/2">
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xs font-bold text-primary uppercase tracking-widest bg-primary/10 px-2 py-0.5 rounded-full">
                02. Product Specs
              </span>
              <span className="text-3xs font-mono text-muted-foreground">{activeTrace.product.status}</span>
            </div>

            <h4 className="text-base font-semibold text-foreground mb-3">
              {activeTrace.product.title}
            </h4>

            <div className="space-y-3 flex-1">
              {/* RICE Priority Chart */}
              <div className="bg-stone-50 dark:bg-stone-900/30 p-3 rounded-lg border border-border/60">
                <div className="flex justify-between items-center text-2xs font-mono text-muted-foreground mb-2">
                  <span>RICE Priority Matrix</span>
                  <span className="text-primary font-bold">Score: {activeTrace.product.rice.score}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-3xs font-mono text-foreground">
                  <div className="bg-background p-1.5 rounded border border-border/40">
                    <span className="block text-muted-foreground text-[8px]">Reach</span>
                    <span className="font-semibold text-primary">{activeTrace.product.rice.reach}</span>
                  </div>
                  <div className="bg-background p-1.5 rounded border border-border/40">
                    <span className="block text-muted-foreground text-[8px]">Impact</span>
                    <span className="font-semibold text-primary">{activeTrace.product.rice.impact}</span>
                  </div>
                  <div className="bg-background p-1.5 rounded border border-border/40">
                    <span className="block text-muted-foreground text-[8px]">Confidence</span>
                    <span className="font-semibold text-primary">{activeTrace.product.rice.confidence}</span>
                  </div>
                  <div className="bg-background p-1.5 rounded border border-border/40">
                    <span className="block text-muted-foreground text-[8px]">Effort</span>
                    <span className="font-semibold text-primary">{activeTrace.product.rice.effort}</span>
                  </div>
                </div>
              </div>

              <div className="text-xs text-muted-foreground leading-relaxed pt-1">
                <strong className="text-foreground text-3xs font-mono block uppercase mb-1">Product Blueprint Target:</strong>
                {activeTrace.product.specNotes}
              </div>
            </div>
          </div>

          {/* CONNECTOR 2: SVG DASHED PATH */}
          <div className="hidden md:flex flex-col justify-center items-center relative overflow-hidden h-full z-0">
            <svg width="80" height="320" viewBox="0 0 80 320" className="w-full h-full opacity-65 overflow-visible">
              {/* Connector lines connecting Row levels */}
              <path
                d="M 0 160 C 40 160, 40 160, 80 160"
                fill="none"
                stroke="var(--color-border)"
                strokeWidth="1.5"
              />
              <path
                key={`line-2-${pulseCount}`}
                d="M 0 160 C 40 160, 40 160, 80 160"
                fill="none"
                stroke="url(#gradient-1)"
                strokeWidth="2.5"
                className="animate-dash"
              />
              {/* Laser dot traveling path */}
              <circle r="3" fill="var(--color-primary)" className="shadow-xs shadow-primary">
                <animateMotion
                  key={`motion-2-${pulseCount}`}
                  dur="1.8s"
                  repeatCount="indefinite"
                  path="M 0 160 C 40 160, 40 160, 80 160"
                />
              </circle>
            </svg>
          </div>

          {/* STAGE 3: ENGINEERING ACTIONS */}
          <div className="flex flex-col p-6 rounded-xl border border-border/80 bg-background/50 backdrop-blur-xs relative z-10 transition-all duration-300 hover:border-primary/30">
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest bg-emerald-500/10 dark:bg-emerald-500/20 px-2 py-0.5 rounded-full">
                03. Engineering Action
              </span>
              <span className="text-3xs font-mono text-muted-foreground">{activeTrace.engineering.action}</span>
            </div>

            <h4 className="text-base font-semibold text-foreground mb-1">
              {activeTrace.engineering.title}
            </h4>
            <p className="text-3xs font-mono text-muted-foreground mb-3 truncate">
              {activeTrace.engineering.filePath}
            </p>

            {/* Code Block Mockup */}
            <div className="flex-1 flex flex-col min-h-36 bg-[#0d1117] text-[#c9d1d9] rounded-lg border border-border/40 overflow-hidden font-mono text-[9px] p-3">
              <div className="flex justify-between items-center text-stone-500 border-b border-stone-800 pb-1.5 mb-2 font-sans text-3xs">
                <span>IDE Code Editor View</span>
                <span className="text-3xs text-emerald-500 bg-emerald-500/10 px-1 rounded font-mono">Linked PR</span>
              </div>
              <pre className="overflow-x-auto whitespace-pre leading-relaxed flex-1 pt-1 opacity-90 select-none">
                <code>{activeTrace.engineering.code}</code>
              </pre>
            </div>
          </div>
        </div>

        {/* Small Bottom Status */}
        <div className="mt-12 flex justify-center">
          <div className="relative w-full max-w-md h-8 overflow-hidden rounded-full bg-muted/20 border border-border flex items-center justify-center">
            <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-transparent via-primary to-transparent animate-shimmer" />
            <div className="w-full text-center text-3xs font-mono tracking-widest text-muted-foreground z-10 uppercase px-4 truncate">
              {activeTraceIndex === 0 && "⚡ Optimizing conversion rates by removing checkout friction"}
              {activeTraceIndex === 1 && "🔍 Enhancing content discovery with semantic tag parsing"}
              {activeTraceIndex === 2 && "🚀 Delivering performance SLAs via edge caching protocols"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
