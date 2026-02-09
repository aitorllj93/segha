import z from "zod";

import { MovieSchema } from "./Movie"

export const MoviesResponseSchema = z.object({
  page: z.number().describe('Page number'),
  results: z.array(MovieSchema).describe('Movies'),
  total_pages: z.number().describe('Total pages'),
  total_results: z.number().describe('Total results'),
})

export type MoviesResponse = z.infer<typeof MoviesResponseSchema>;
