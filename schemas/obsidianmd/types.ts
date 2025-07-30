
import type z from 'zod/v3';

import type { DocumentSchema } from './Document';

export type Document = z.infer<typeof DocumentSchema>;