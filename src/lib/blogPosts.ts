export type BlogSection = {
  heading?: string;
  paragraphs: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  readTime: string;
  excerpt: string;
  sections: BlogSection[];
};

export const blogPosts: BlogPost[] = [];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
