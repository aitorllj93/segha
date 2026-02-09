import z from "zod";

import { SerieSchema } from "./Serie"

export const SeriesResponseSchema = z.object({
  page: z.number().describe('Page number'),
  results: z.array(SerieSchema).describe('Series'),
  total_pages: z.number().describe('Total pages'),
  total_results: z.number().describe('Total results'),
})

export type SeriesResponse = z.infer<typeof SeriesResponseSchema>;
