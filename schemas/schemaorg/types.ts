
import type z from 'zod';

import type { TextSchema, URLSchema } from './DataTypes';
import type { ThingSchema } from './Thing';

export type Text = z.infer<typeof TextSchema>;
export type URL = z.infer<typeof URLSchema>;

export type Thing = z.infer<typeof ThingSchema>;