
import type { z } from 'zod';

import type { MovieSchema, CatalogMovieSchema, DetailedMovieSchema, MetaMovieSchema } from ".";

export type Movie = z.infer<typeof MovieSchema>;
export type CatalogMovie = z.infer<typeof CatalogMovieSchema>;
export type DetailedMovie = z.infer<typeof DetailedMovieSchema>;
export type MetaMovie = z.infer<typeof MetaMovieSchema>;
