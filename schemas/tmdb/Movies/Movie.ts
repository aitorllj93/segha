import z from "zod";

export const MovieSchema = z.object({
  id: z.number().describe('Unique identifier for the movie'),
  title: z.string().describe('Movie title'),
  original_title: z.string().describe('Original movie title (in original language)'),
  original_language: z.string().describe('Original language code (e.g., \'en\', \'es\', \'fr\')'),
  overview: z.string().describe('Movie overview/synopsis'),
  poster_path: z.string().describe('Poster path (relative URL)'),
  backdrop_path: z.string().describe('Backdrop path (relative URL)'),
  release_date: z.string().describe('Release date (YYYY-MM-DD format)'),
  vote_average: z.number().describe('Average vote rating (0-10)'),
  vote_count: z.number().describe('Total number of votes'),
  popularity: z.number().describe('Popularity score'),
  adult: z.boolean().describe('Adult content flag'),
  genre_ids: z.array(z.number()).describe('Array of genre IDs'),
  video: z.boolean().describe('Video flag'),
});

export type Movie = z.infer<typeof MovieSchema>;
