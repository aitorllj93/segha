
import type { z } from 'zod';

import type { BookSchema } from ".";

export type Book = z.infer<typeof BookSchema>;
