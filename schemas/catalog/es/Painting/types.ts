
import type { z } from 'zod';

import type { PaintingSchema } from ".";

export type Painting = z.infer<typeof PaintingSchema>;
