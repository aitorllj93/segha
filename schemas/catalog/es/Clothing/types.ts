
import type { z } from 'zod';

import type { ClothingSchema, CatalogClothingSchema } from ".";

export type Clothing = z.infer<typeof ClothingSchema>;
export type CatalogClothing = z.infer<typeof CatalogClothingSchema>;
