

import type { z } from 'zod';

import type { YoutubeSchema, CatalogYoutubeSchema, DetailedYoutubeSchema, MetaYoutubeSchema } from ".";

export type Youtube = z.infer<typeof YoutubeSchema>;
export type CatalogYoutube = z.infer<typeof CatalogYoutubeSchema>;
export type DetailedYoutube = z.infer<typeof DetailedYoutubeSchema>;
export type MetaYoutube = z.infer<typeof MetaYoutubeSchema>;
