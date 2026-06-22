import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import ProductFlow from "@/components/ProductFlow";
import { getAllPosts } from "@/lib/blog";

export default function Home() {
  const projects = [
    {
      title: "Nova Dashboard",
      description: "A real-time metrics visualizer for high-throughput cloud environments.",
      tech: ["Next.js", "Tailwind CSS v4", "TypeScript"],
      link: "#"
    },
    {
      title: "Solstice Commerce",
      description: "An ultra-fast headless e-commerce storefront with localized pricing.",
      tech: ["React", "GraphQL", "Tailwind CSS"],
      link: "#"
    },
    {
      title: "Aether Analytics",
      description: "Privacy-centric analytics engine providing sub-second page views.",
      tech: ["Node.js", "ClickHouse", "React"],
      link: "#"
    }
  ];

  const blogPosts = getAllPosts().slice(0, 2);

  return (
    <div className="flex-1 w-full bg-background text-foreground font-sans transition-colors duration-200">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden py-24 sm:py-32 bg-radial from-indigo-bg-radial to-background">
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-grid-pattern mask-radial-fade opacity-70 pointer-events-none" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20">
              Introducing Pankaj Gupta
            </span>
            <h1 className="mt-6 font-serif text-5xl font-light tracking-tight sm:text-7xl text-foreground leading-[1.15]">
              We design and build <span className="italic font-normal text-primary">premium</span> web applications
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              A high-performance digital workspace built with the latest technologies. Sleek aesthetics, mobile-first responsiveness, and accessibility-centered interactions.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="#projects"
                className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-xs hover:opacity-90 transition-opacity"
              >
                View Our Work
              </Link>
              <Link
                href="#contact"
                className="text-sm font-semibold leading-6 text-foreground hover:text-primary transition-colors"
              >
                Let's Talk <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ABOUT SECTION */}
      <section id="about" className="py-20 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
            <div className="lg:col-span-5">
              <h2 className="font-serif text-3xl font-light sm:text-4xl leading-tight">
                Crafting <span className="italic font-normal text-primary">exceptional</span> experiences for modern platforms
              </h2>
              <p className="mt-4 text-base text-muted-foreground leading-relaxed">
                Pankaj Gupta is a design-first developer and software architect. We build web applications that are not only blazing fast and accessible, but also delight users visually at first glance.
              </p>
              <p className="mt-3 text-base text-muted-foreground leading-relaxed">
                Our approach emphasizes performance-tuning, responsive structural layouts, and clean typographic grids, ensuring that the digital solutions we deploy scale effortlessly with your needs.
              </p>
            </div>
            <div className="mt-12 lg:mt-0 lg:col-span-7">
              <div className="relative rounded-2xl bg-gradient-to-tr from-primary to-indigo-700 p-8 shadow-xl">
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg bg-white/10 p-6 backdrop-blur-md">
                    <span className="block text-3xl font-bold text-white">99.9%</span>
                    <span className="mt-2 block text-sm text-indigo-100">Core Uptime SLA</span>
                  </div>
                  <div className="rounded-lg bg-white/10 p-6 backdrop-blur-md">
                    <span className="block text-3xl font-bold text-white">&lt; 100ms</span>
                    <span className="mt-2 block text-sm text-indigo-100">Global TTFB Latency</span>
                  </div>
                  <div className="rounded-lg bg-white/10 p-6 backdrop-blur-md">
                    <span className="block text-3xl font-bold text-white">100/100</span>
                    <span className="mt-2 block text-sm text-indigo-100">LightHouse Audit Score</span>
                  </div>
                  <div className="rounded-lg bg-white/10 p-6 backdrop-blur-md">
                    <span className="block text-3xl font-bold text-white">10+</span>
                    <span className="mt-2 block text-sm text-indigo-100">Active Deployments</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PM PIPELINE SECTION */}
      <section className="py-20 border-t border-border relative overflow-hidden">
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-grid-pattern mask-radial-fade opacity-50 pointer-events-none" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <ProductFlow />
        </div>
      </section>

      {/* 3. PROJECTS SECTION */}
      <section id="projects" className="py-20 bg-muted/30 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-serif text-3xl font-light sm:text-4xl">
              Selected <span className="italic font-normal text-primary">Projects</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Explore our latest case studies and digital properties designed for premium platforms.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <article
                key={index}
                className="flex flex-col overflow-hidden rounded-xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 duration-200"
              >
                <h3 className="text-xl font-semibold text-foreground">
                  {project.title}
                </h3>
                <p className="mt-3 flex-1 text-sm text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tech.map((t, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground ring-1 ring-inset ring-border"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4. BLOG SECTION */}
      <section id="blog" className="py-20 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-end md:justify-between mb-16">
            <div className="max-w-2xl">
              <h2 className="font-serif text-3xl font-light sm:text-4xl">
                Latest from the <span className="italic font-normal text-primary">Blog</span>
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Insights, updates, and tutorials on modern web development.
              </p>
            </div>
            <div className="mt-6 md:mt-0">
              <Link href="/blog" className="text-sm font-semibold text-primary hover:opacity-90">
                View all posts <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
          <div className="grid gap-12 lg:grid-cols-2">
            {blogPosts.map((post) => (
              <article key={post.slug} className="flex flex-col items-start">
                <div className="flex items-center gap-x-4 text-xs">
                  <time dateTime={post.date} className="text-muted-foreground font-medium">
                    {post.date}
                  </time>
                  <span className="text-muted-foreground">&bull;</span>
                  <span className="text-muted-foreground font-medium">
                    {post.readTime}
                  </span>
                </div>
                <h3 className="mt-3 text-2xl font-bold leading-8 tracking-tight text-foreground hover:text-primary transition-colors">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                <p className="mt-4 text-base text-muted-foreground leading-relaxed">
                  {post.excerpt}
                </p>
              </article>
            ))}
          </div>

        </div>
      </section>

      {/* 5. CONTACT SECTION */}
      <section id="contact" className="py-20 bg-muted/30 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-3xl font-light sm:text-4xl">
              Let's <span className="italic font-normal text-primary">Collaborate</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Have a project or want to learn more about our process? Send us a message and we'll get right back to you.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
