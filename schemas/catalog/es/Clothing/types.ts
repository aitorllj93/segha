
import type { z } from 'zod';

import type { ClothingSchema, CatalogClothingSchema, DetailedClothingSchema, MetaClothingSchema } from ".";

export type Clothing = z.infer<typeof ClothingSchema>;
export type CatalogClothing = z.infer<typeof CatalogClothingSchema>;
export type DetailedClothing = z.infer<typeof DetailedClothingSchema>;
export type MetaClothing = z.infer<typeof MetaClothingSchema>;
