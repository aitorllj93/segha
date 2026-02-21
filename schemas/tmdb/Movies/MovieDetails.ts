
import z from "zod";

import { GenreSchema, ProductionCompanySchema, ProductionCountrySchema, LanguageSchema, VideosResponseSchema, VideoSchema, ImagesResponseSchema } from "../DataTypes";
import { MoviesResponseSchema } from './MoviesResponse';
import { MovieSchema } from "./Movie";

export const MovieDetailsSchema = MovieSchema.omit({
  genre_ids: true,
}).extend({
  genres: z.array(GenreSchema).describe('Movie genres'),
  runtime: z.number().nullable().describe('Movie runtime in minutes'),
  budget: z.number().describe('Budget in USD'),
  revenue: z.number().describe('Revenue in USD'),
  homepage: z.string().nullable().describe('Homepage URL'),
  imdb_id: z.string().nullable().describe('IMDB ID'),
  production_companies: z.array(ProductionCompanySchema).describe('Production companies'),
  production_countries: z.array(ProductionCountrySchema).describe('Production countries'),
  spoken_languages: z.array(LanguageSchema).describe('Spoken languages'),
  status: z.string().describe('Current status (Released, Post Production, etc.)'),
  tagline: z.string().nullable().describe('Tagline'),
  images: ImagesResponseSchema.optional(),
  videos: VideosResponseSchema.optional(),
  similar: MoviesResponseSchema.optional()
});

export const MovieDetailsParamsSchema = z.object({
  append_to_response: z.string().optional().describe('Append to response'),
  include_image_language: z.string().optional().describe('Include image language'),
  language: z.string().optional().describe('Language'),
});

export type MovieDetails = z.infer<typeof MovieDetailsSchema>;
export type MovieDetailsParams = z.infer<typeof MovieDetailsParamsSchema>;
