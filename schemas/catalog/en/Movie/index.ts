
import z from "zod";

export const MetaMovieSchema = z.object({
  type: z.literal("[[Sources]]"),
  format: z.literal("[[Movies]]"),
  areas: z.array(z.literal("[[Creativity]]")),
  color: z.literal("#BE9207"),
  icon: z.literal("movie"),
  cover: z.string().optional(),
  url: z.string().describe('URL of the movie in IMDB or similar'),
  watch_url: z.string().describe('URL of the movie in streaming'),
}).describe('Movie: Metadata of Note');


export const CatalogMovieSchema = z.object({
  title: z.string().describe('Title of the movie'),
  description: z.string().describe('Description of the movie'),
  author: z.array(z.string()).describe('Authors. Writers, directors, producers, etc.'),
  actors: z.array(z.string()).describe('Actors'),
  published: z.string().describe('Year of publication'),
  genres: z.array(z.string()).describe('Genres'),
}).describe('Movie: Data obtained from catalogation');

export const DetailedMovieSchema = z.object({
  status: z.enum(["Pending", "In Progress", "Completed"]).describe('Watching status'),
  topics: z.array(z.string()).describe('Topics'),
  rating: z.number().describe('Rating of the movie'),
  online_rating: z.number().describe('Online rating'),
  last_time_watched: z.string().describe('Last time watched'),
  times_watched: z.number().describe('Times watched'),
}).describe('Movie: Additional data');

export const MovieSchema = CatalogMovieSchema.extend(DetailedMovieSchema.shape).extend(MetaMovieSchema.shape).describe('Movie');
