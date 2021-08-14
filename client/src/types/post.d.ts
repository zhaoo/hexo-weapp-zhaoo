export interface IPostItem {
  title: string;
  excerpt: string;
  path: string;
  slug: string;
  cover: string;
  date: string;
  comments: boolean;
  content?: string;
  raw?: string;
  tags?: string;
  updated?: string;
  categories?: { name: string; path: string }[];
  top?: number;
}
