export type Language = "hinglish" | "english";

export type BlockType = 
  | "heading" 
  | "paragraph" 
  | "image" 
  | "bullets" 
  | "code" 
  | "table" 
  | "callout" 
  | "terminal"
  | "blockquote";

export interface ContentBlock {
  type: BlockType;
  value?: string | string[] | string[][];
  src?: string;
  alt?: string;
  filename?: string;
  language?: string;
  variant?: "info" | "warning" | "error" | "success";
  author?: string;
}

export interface ArticleSection {
  heading: string;
  blocks: ContentBlock[];
}

export interface ArticleMeta {
  author: string;
  publishedAt: string;
  updatedAt?: string;
  readTime: string;
  views?: number;
  likes?: number;
  category: string;
  tags: string[];
}

export interface Article {
  id: string;
  title: Record<Language, string>;
  excerpt: Record<Language, string>;
  meta: ArticleMeta;
  content: Record<Language, ArticleSection[]>;
  featured?: boolean;
}

export interface TOCItem {
  id: string;
  title: string;
  level: number;
}
