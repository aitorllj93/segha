import z from "zod";

export const SerieSchema = z.object({
  backdrop_path: z.string().nullable().describe('Backdrop path (relative URL)'),
  first_air_date: z.string().nullable().describe('First air date (YYYY-MM-DD format)'),
  genre_ids: z.array(z.number()).describe('Array of genre IDs'),
  id: z.number().describe('Unique identifier for the serie'),
  name: z.string().describe('Serie name'),
  origin_country: z.array(z.string()).describe('Array of origin countries'),
  original_language: z.string().describe('Original language code (e.g., \'en\', \'es\', \'fr\')'),
  original_name: z.string().describe('Original serie name (in original language)'),
  overview: z.string().nullable().describe('Serie overview/synopsis'),
  popularity: z.number().describe('Popularity score'),
  poster_path: z.string().nullable().describe('Poster path (relative URL)'),
  vote_average: z.number().describe('Average vote rating (0-10)'),
  vote_count: z.number().describe('Total number of votes'),
});

export type Serie = z.infer<typeof SerieSchema>;
