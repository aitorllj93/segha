import z from "zod";

import { GenreSchema, ProductionCompanySchema, ProductionCountrySchema, LanguageSchema } from "../DataTypes";

import { SerieSchema } from "./Serie";
import { SeasonSchema } from "./Season";
import { NetworkSchema } from "./Network";
import { CreatorSchema } from "./Creator";
import { EpisodeSchema } from "./Episode";

export const SerieDetailsSchema = SerieSchema.omit({
  genre_ids: true,
}).extend({
  adult: z.boolean().describe('Adult content flag'),
  created_by: z.array(CreatorSchema).describe('Creators of the serie'),
  episode_run_time: z.array(z.number()).describe('Episode runtime in minutes'),
  genres: z.array(GenreSchema).describe('Genres of the serie'),
  homepage: z.string().nullable().describe('Homepage URL'),
  in_production: z.boolean().describe('In production flag'),
  languages: z.array(z.string()).describe('Languages of the serie'),
  last_air_date: z.string().describe('Last air date (YYYY-MM-DD format)'),
  last_episode_to_air: EpisodeSchema.describe('Last episode to air'),
  next_episode_to_air: z.string().describe('Next episode to air'),
  networks: z.array(NetworkSchema).describe('Networks of the serie'),
  number_of_episodes: z.number().describe('Number of episodes'),
  number_of_seasons: z.number().describe('Number of seasons'),
  production_companies: z.array(ProductionCompanySchema).describe('Production companies of the serie'),
  production_countries: z.array(ProductionCountrySchema).describe('Production countries of the serie'),
  seasons: z.array(SeasonSchema).describe('Seasons of the serie'),
  spoken_languages: z.array(LanguageSchema).describe('Spoken languages of the serie'),
  status: z.string().describe('Status of the serie'),
  tagline: z.string().nullable().describe('Tagline of the serie'),
  type: z.string().describe('Type of the serie'),
});

export const SerieDetailsParamsSchema = z.object({
  append_to_response: z.string().optional().describe('Append to response'),
  include_image_language: z.string().optional().describe('Include image language'),
  language: z.string().optional().describe('Language'),
});

export type SerieDetails = z.infer<typeof SerieDetailsSchema>;
export type SerieDetailsParams = z.infer<typeof SerieDetailsParamsSchema>;
