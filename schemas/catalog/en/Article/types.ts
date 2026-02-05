
import type { z } from 'zod';

import type { ArticleSchema, CatalogArticleSchema, DetailedArticleSchema, MetaArticleSchema } from ".";

export type Article = z.infer<typeof ArticleSchema>;
export type CatalogArticle = z.infer<typeof CatalogArticleSchema>;
export type DetailedArticle = z.infer<typeof DetailedArticleSchema>;
export type MetaArticle = z.infer<typeof MetaArticleSchema>;
