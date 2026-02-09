import z from "zod";

export const EpisodeSchema = z.object({
  id: z.number().describe('Unique identifier for the episode'),
  name: z.string().describe('Episode name'),
  overview: z.string().nullable().describe('Episode overview/synopsis'),
  vote_average: z.number().describe('Average vote rating (0-10)'),
  vote_count: z.number().describe('Total number of votes'),
  air_date: z.string().describe('Air date (YYYY-MM-DD format)'),
  episode_number: z.number().describe('Episode number'),
  production_code: z.string().describe('Production code'),
  runtime: z.number().nullable().describe('Runtime in minutes'),
  season_number: z.number().describe('Season number'),
  show_id: z.number().describe('Show ID'),
  still_path: z.string().nullable().describe('Still path (relative URL)'),
});

export type Episode = z.infer<typeof EpisodeSchema>;
