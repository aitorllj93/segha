import z from "zod";

export const SeasonSchema = z.object({
  air_date: z.string().describe('Air date (YYYY-MM-DD format)'),
  episode_count: z.number().describe('Episode count'),
  id: z.number().describe('Unique identifier for the season'),
  name: z.string().describe('Season name'),
  overview: z.string().nullable().describe('Season overview/synopsis'),
  poster_path: z.string().nullable().describe('Poster path (relative URL)'),
  season_number: z.number().describe('Season number'),
});
