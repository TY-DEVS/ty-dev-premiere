import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "../../keystatic.config";
import fs from "node:fs";
import path from "node:path";
import type { BlogPost } from "@/data/blogPosts";

export const reader = createReader(process.cwd(), keystaticConfig);

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  try {
    const posts = await reader.collections.posts.all();
    return posts.map((p) => {
      const slug = p.slug;
      let content_fr = "";
      let content_en = "";
      try {
        content_fr = fs.readFileSync(
          path.join(process.cwd(), "content", "posts", slug, "content_fr.mdoc"),
          "utf-8"
        );
        content_en = fs.readFileSync(
          path.join(process.cwd(), "content", "posts", slug, "content_en.mdoc"),
          "utf-8"
        );
      } catch (err) {
        console.warn(`Could not read markdown files for post ${slug}:`, err);
      }

      return {
        id: slug,
        slug: slug,
        title: { fr: p.entry.title_fr, en: p.entry.title_en },
        summary: { fr: p.entry.summary_fr, en: p.entry.summary_en },
        content: { fr: content_fr, en: content_en },
        category: p.entry.category,
        date: { fr: p.entry.date_fr, en: p.entry.date_en, iso: p.entry.date_iso },
        author: {
          name: p.entry.author_name,
          role: p.entry.author_role,
          avatar: p.entry.author_avatar,
          slug: p.entry.author_slug,
        },
        image: p.entry.image,
        tags: [...p.entry.tags],
      };
    });
  } catch (err) {
    console.error("Error reading blog posts from Keystatic:", err);
    return [];
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const entry = await reader.collections.posts.read(slug);
    if (!entry) return null;

    let content_fr = "";
    let content_en = "";
    try {
      content_fr = fs.readFileSync(
        path.join(process.cwd(), "content", "posts", slug, "content_fr.mdoc"),
        "utf-8"
      );
      content_en = fs.readFileSync(
        path.join(process.cwd(), "content", "posts", slug, "content_en.mdoc"),
        "utf-8"
      );
    } catch (err) {
      console.warn(`Could not read markdown files for post ${slug}:`, err);
    }

    return {
      id: slug,
      slug: slug,
      title: { fr: entry.title_fr, en: entry.title_en },
      summary: { fr: entry.summary_fr, en: entry.summary_en },
      content: { fr: content_fr, en: content_en },
      category: entry.category,
      date: { fr: entry.date_fr, en: entry.date_en, iso: entry.date_iso },
      author: {
        name: entry.author_name,
        role: entry.author_role,
        avatar: entry.author_avatar,
        slug: entry.author_slug,
      },
      image: entry.image,
      tags: [...entry.tags],
    };
  } catch (err) {
    console.error(`Error reading blog post ${slug} from Keystatic:`, err);
    return null;
  }
}
