
import z from "zod";

import { Areas, Creativity, Movies, SourceSchema } from '../Core';
import { Color, Date, Icon, Image, InProgress, Pending, Watched, Yellow } from "../DataTypes";
import { MovieExternalId } from "./MovieExternalId";

const MovieStatus = z
  .union([Pending, InProgress, Watched])
  .describe('Estado de visualización de la película');

const MovieIcon = z.literal("movie");

export const MovieSchema = SourceSchema.extend({
  format: Movies,
  status: MovieStatus,
  areas: Areas.default([Creativity.value]),
  color: Color.optional().default(Yellow.value).describe('Color de la nota.'),
  icon: Icon.optional().default(MovieIcon.value).describe('Icono de Lucide.'),
  cover: Image.nullable().optional().describe('Portada de la película.'),
  url: z.url().describe('URL de la película en IMDB o similar'),
  watch_url: z.url().optional().describe('URL de la película en streaming'),
  external_ids: z.array(MovieExternalId).optional().describe('IDs externos de la película'),
  title: z.string().describe('Título de la película'),
  actors: z.array(z.string()).optional().describe('Actores'),
  published: Date.optional().describe('Año de publicación'),
  genres: z.array(z.string()).optional().describe('Géneros'),
  online_rating: z.number().optional().describe('Puntuación en línea'),
  last_time_watched: Date.optional().describe('Última vez vista'),
  times_watched: z.number().optional().describe('Veces vista'),
}).describe('Película');
