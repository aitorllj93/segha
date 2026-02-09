
import z from "zod";

import { PaginationParamsSchema } from "../DataTypes";

export const SearchSeriesParamsSchema = PaginationParamsSchema.extend({
  query: z.string().describe('Search query'),
  include_adult: z.boolean().optional().describe('Include adult movies'),
  year: z.number().optional().describe('Year'),
})

export type SearchSeriesParams = z.infer<typeof SearchSeriesParamsSchema>;
