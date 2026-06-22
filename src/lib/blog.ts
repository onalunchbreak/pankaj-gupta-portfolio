import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import hljs from "highlight.js";

// Setup marked to use highlight.js for syntax highlighting of code blocks
marked.use({
  renderer: {
    code(token) {
      const lang = token.lang || "plaintext";
      const codeText = token.text;
      let highlighted = codeText;
      try {
        if (hljs.getLanguage(lang)) {
          highlighted = hljs.highlight(codeText, { language: lang }).value;
        } else {
          highlighted = hljs.highlightAuto(codeText).value;
        }
      } catch (err) {
        // Fallback to unhighlighted code text if highlight fails
      }
      return `<pre class="hljs"><code class="language-${lang}">${highlighted}</code></pre>`;
    }
  }
});

const postsDirectory = path.join(process.cwd(), "src/content/blog");

export interface PostMetadata {
  title: string;
  date: string;
  excerpt: string;
  readTime: string;
  slug: string;
}

export interface Post extends PostMetadata {
  contentHtml: string;
}

// Reads all blog posts files and returns their sorted metadata list
export function getAllPosts(): PostMetadata[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const filePath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(filePath, "utf8");

      // Parse metadata section using gray-matter
      const { data } = matter(fileContents);

      return {
        title: data.title,
        date: data.date,
        excerpt: data.excerpt,
        readTime: data.readTime,
        slug: data.slug || fileName.replace(/\.md$/, ""),
      } as PostMetadata;
    });

  // Sort posts by date (newest first)
  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

// Reads a single post by slug, parses it, and renders its markdown content to HTML
export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const filePath = path.join(postsDirectory, `${slug}.md`);
    if (!fs.existsSync(filePath)) {
      return null;
    }

    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);

    // Render markdown content to HTML (marked now uses highlight.js syntax highlighting)
    const contentHtml = await marked.parse(content);

    return {
      title: data.title,
      date: data.date,
      excerpt: data.excerpt,
      readTime: data.readTime,
      slug: data.slug || slug,
      contentHtml,
    };
  } catch (error) {
    console.error(`Error loading blog post file with slug "${slug}":`, error);
    return null;
  }
}
