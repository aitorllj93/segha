
import type z from 'zod';

import type { DocumentSchema } from './Document';

export type Document = z.infer<typeof DocumentSchema>;