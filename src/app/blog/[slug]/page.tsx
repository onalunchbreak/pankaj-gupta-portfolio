import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/blog";

interface Props {
  params: Promise<{ slug: string }>;
}

// Statically pre-generate all possible paths for blog slugs at build time
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Dynamically generate metadata for each blog post
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) {
    return {
      title: "Post Not Found",
    };
  }
  return {
    title: `${post.title} - Pankaj Gupta`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: `https://project-01-kappa-sandy.vercel.app/blog/${slug}`,
      publishedTime: post.date,
      images: [
        {
          url: "https://project-01-kappa-sandy.vercel.app/og-image.jpg",
          width: 1200,
          height: 800,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: ["https://project-01-kappa-sandy.vercel.app/og-image.jpg"],
    },
  };
}


export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="flex-1 w-full bg-background text-foreground font-sans py-16 transition-colors duration-200">
      <article className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumbs */}
        <nav className="mb-8">
          <Link
            href="/blog"
            className="text-sm font-semibold text-primary hover:opacity-90 transition-opacity"
          >
            &larr; Back to Blog Index
          </Link>
        </nav>

        {/* Post Header */}
        <header className="border-b border-border pb-8 mb-12">
          <div className="flex items-center gap-x-4 text-xs text-muted-foreground font-medium mb-4">
            <time dateTime={post.date}>{post.date}</time>
            <span>&bull;</span>
            <span>{post.readTime}</span>
          </div>
          <h1 className="font-serif text-4xl font-light tracking-tight text-foreground sm:text-5xl leading-tight">
            {post.title}
          </h1>
        </header>

        {/* Rendered HTML Post Content */}
        <div
          className="blog-content leading-relaxed text-foreground/90 text-base space-y-6"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </article>
    </div>
  );
}
