

import type { z } from 'zod';

import type { WikipediaSchema, CatalogWikipediaSchema, DetailedWikipediaSchema, MetaWikipediaSchema } from ".";

export type Wikipedia = z.infer<typeof WikipediaSchema>;
export type CatalogWikipedia = z.infer<typeof CatalogWikipediaSchema>;
export type DetailedWikipedia = z.infer<typeof DetailedWikipediaSchema>;
export type MetaWikipedia = z.infer<typeof MetaWikipediaSchema>;
