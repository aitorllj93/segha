import z from "zod";

import { PaginationParamsSchema } from "../DataTypes";


export const SearchMoviesParamsSchema = PaginationParamsSchema.extend({
  query: z.string().describe('Search query'),
  include_adult: z.boolean().optional().describe('Include adult movies'),
  year: z.number().optional().describe('Year'),
})

export type SearchMoviesParams = z.infer<typeof SearchMoviesParamsSchema>;
