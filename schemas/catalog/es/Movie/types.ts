
import type { z } from 'zod';

import type { MovieSchema } from ".";

export type Movie = z.infer<typeof MovieSchema>;
