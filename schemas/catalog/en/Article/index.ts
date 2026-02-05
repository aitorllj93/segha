
import z from "zod";

export const MetaArticleSchema = z.object({
  type: z.literal("[[Sources]]"),
  format: z.literal("[[Articles]]"),
  areas: z.array(z.literal("[[Knowledge]]")),
  color: z.literal("#3171B2"),
  icon: z.literal("newspaper"),
  banner: z.string().optional(),
  url: z.string().describe('URL of the article'),
}).describe('Article: Metadata of Note');

export const CatalogArticleSchema = z.object({
  title: z.string().describe('Title of the article'),
  description: z.string().optional().describe('Description'),
  excerpt: z.string().optional().describe('Extract of the article'),
  author: z.array(z.string()).describe('Authors'),
  published: z.string().optional().describe('Year of publication'),
}).describe('Article: Data obtained from catalogation');

export const DetailedArticleSchema = z.object({
  status: z.enum(["Pending", "In Progress", "Read", "Consolidated"]).describe('Reading status'),
  projects: z.array(z.string()).describe('Projects'),
  topics: z.array(z.string()).describe('Topics'),
  rating: z.number().describe('Rating of the article'),
}).describe('Article: Additional data');

export const ArticleSchema = CatalogArticleSchema.extend(DetailedArticleSchema.shape).extend(MetaArticleSchema.shape).describe('Article');
