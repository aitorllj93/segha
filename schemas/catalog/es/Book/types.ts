
import type { z } from 'zod';

import type { BookSchema, CatalogBookSchema, DetailedBookSchema, MetaBookSchema } from ".";

export type Book = z.infer<typeof BookSchema>;
export type CatalogBook = z.infer<typeof CatalogBookSchema>;
export type DetailedBook = z.infer<typeof DetailedBookSchema>;
export type MetaBook = z.infer<typeof MetaBookSchema>;
