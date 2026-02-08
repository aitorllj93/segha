
import type { z } from 'zod';

import type { ArticleSchema } from ".";

export type Article = z.infer<typeof ArticleSchema>;
