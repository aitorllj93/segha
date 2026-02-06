
import type { z } from 'zod';

import type { PaintingSchema, CatalogPaintingSchema, DetailedPaintingSchema, MetaPaintingSchema } from ".";

export type Painting = z.infer<typeof PaintingSchema>;
export type CatalogPainting = z.infer<typeof CatalogPaintingSchema>;
export type DetailedPainting = z.infer<typeof DetailedPaintingSchema>;
export type MetaPainting = z.infer<typeof MetaPaintingSchema>;
