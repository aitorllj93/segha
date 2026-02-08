

import type { z } from 'zod';

import type { EncyclopediaEntrySchema, WikipediaEntrySchema } from ".";

export type EncyclopediaEntry = z.infer<typeof EncyclopediaEntrySchema>;
export type WikipediaEntry = z.infer<typeof WikipediaEntrySchema>;
