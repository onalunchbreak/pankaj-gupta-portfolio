import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export const metadata = {
  title: "Blog - Pankaj Gupta",
  description: "Insights, tutorials, and engineering notes on modern web application architecture and AI agents.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="flex-1 w-full bg-background text-foreground font-sans py-16 transition-colors duration-200">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <nav className="mb-8">
          <Link href="/" className="text-sm font-semibold text-primary hover:opacity-90 transition-opacity">
            &larr; Back to Home
          </Link>
        </nav>

        <header className="border-b border-border pb-8 mb-12">
          <h1 className="font-serif text-4xl font-light tracking-tight text-foreground sm:text-5xl">
            <span className="italic font-normal text-primary">Pankaj Gupta</span> Blog
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Insights, tutorials, and engineering notes on modern web application architecture and autonomous AI agents.
          </p>
        </header>

        {posts.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            No articles found. Check back later!
          </div>
        ) : (
          <div className="space-y-16">
            {posts.map((post) => (
              <article key={post.slug} className="flex flex-col items-start border-b border-border pb-12 last:border-b-0">
                <div className="flex items-center gap-x-4 text-xs">
                  <time dateTime={post.date} className="text-muted-foreground font-medium">
                    {post.date}
                  </time>
                  <span className="text-muted-foreground">&bull;</span>
                  <span className="text-muted-foreground font-medium">
                    {post.readTime}
                  </span>
                </div>
                <h2 className="mt-3 text-3xl font-bold leading-9 tracking-tight text-foreground hover:text-primary transition-colors">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                <p className="mt-4 text-base text-muted-foreground leading-relaxed font-medium">
                  {post.excerpt}
                </p>
                <div className="mt-6">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-sm font-semibold text-primary hover:opacity-90"
                  >
                    Read full article &rarr;
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
