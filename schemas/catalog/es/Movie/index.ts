
import z from "zod";

import { Areas, Creativity, Movies, SourceSchema } from '../Core';
import { Color, Date, Icon, Image, InProgress, Pending, StreamUrlsSchema, Watched, Yellow } from "../DataTypes";
import { TVExternalId } from "../DataTypes";

const MovieStatus = z
  .union([Pending, InProgress, Watched])
  .describe('Estado de visualización de la película');

const MovieIcon = z.literal("film");

export const MovieSchema = SourceSchema
  .extend({
    format: Movies.default(Movies.value),
    status: MovieStatus.default(Pending.value),
    areas: Areas.default([Creativity.value]),
    color: Color.optional().default(Yellow.value).describe('Color de la nota.'),
    icon: Icon.optional().default(MovieIcon.value).describe('Icono de Lucide.'),
    cover: Image.nullable().optional().describe('Portada de la película.'),
    url: z.url().describe('URL de la película en IMDB o similar'),
    trailer: z.url().describe('URL del trailer en YouTube u otras plataformas').optional(),
    watch_url: z.url().optional().describe('URL de la película en streaming').meta({
      deprecated: true,
      replacement: 'hbo_max_url|netflix_url|apple_tv_url|amazon_prime_url|disney_plus_url|hulu_url|pluto_tv_url|youtube_url',
    }),
    external_ids: z.array(TVExternalId).optional().describe('IDs externos de la película'),
    title: z.string().describe('Título de la película'),
    subtitle: z.string().optional().describe('Tagline'),
    actors: z.array(z.string()).optional().describe('Actores'),
    published: Date.optional().describe('Año de publicación'),
    genres: z.array(z.string()).optional().describe('Géneros'),
    online_rating: z.number().optional().describe('Puntuación en línea'),
    last_time_watched: Date.optional().describe('Última vez vista'),
    times_watched: z.number().default(0).optional().describe('Veces vista'),
    videos: z.string().array().optional().describe('Vídeos promocionales'),
    images: z.string().array().optional().describe('Imágenes promocionales'),
  })
  .and(StreamUrlsSchema).describe('Película');
