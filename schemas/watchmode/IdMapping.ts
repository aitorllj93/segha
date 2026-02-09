import z from "zod"

export const IdMappingEntrySchema = z.object({
  'Watchmode ID': z.string().describe('Watchmode ID'),
  'IMDB ID': z.string().describe('IMDB ID'),
  'TMDB ID': z.string().describe('TMDB ID'),
  'TMDB Type': z.string().describe('TMDB Type'),
  'Title': z.string().describe('Title'),
  'Year': z.string().describe('Year'),
});

export const IdMappingSchema = z.array(IdMappingEntrySchema);

export type IdMappingEntry = z.infer<typeof IdMappingEntrySchema>;
export type IdMapping = z.infer<typeof IdMappingSchema>;
