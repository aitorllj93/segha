
import z from "zod";
import { Areas } from "../Areas";

export const MetaMovieSchema = z.object({
  type: z.literal("[[Fuentes]]"),
  format: z.literal("[[Películas]]"),
  areas: Areas.default(["[[Creatividad]]"]),
  color: z.string().optional().default("#BE9207").describe('Color de la nota.'),
  icon: z.string().optional().default('movie').describe('Icono de Lucide.'),
  cover: z.string().optional().describe('Portada de la película.'),
  url: z.string().describe('URL de la película en IMDB o similar'),
  watch_url: z.string().optional().describe('URL de la película en streaming'),
}).describe('Película: Metadatos de Nota');


export const CatalogMovieSchema = z.object({
  title: z.string().describe('Título de la película'),
  description: z.string().optional().describe('Descripción de la película'),
  author: z.array(z.string()).optional().describe('Autores. Guionistas, directores, productores, etc.'),
  actors: z.array(z.string()).optional().describe('Actores'),
  published: z.union([z.string(), z.number()])
    .transform((val) => String(val)).optional().describe('Año de publicación'),
  genres: z.array(z.string()).optional().describe('Géneros'),
}).describe('Película: Datos obtenibles de catalogación');

export const DetailedMovieSchema = z.object({
  status: z.enum(["Pendiente", "En progreso", "Visto"]).describe('Estado de visualización'),
  topics: z.array(z.string()).nullable().optional().describe('Temas'),
  rating: z.number().optional().describe('Puntuación de la película'),
  online_rating: z.number().optional().describe('Puntuación en línea'),
  last_time_watched: z.string().optional().describe('Última vez vista'),
  times_watched: z.number().optional().describe('Veces vista'),
}).describe('Película: Datos adicionales');

export const MovieSchema = CatalogMovieSchema.extend(DetailedMovieSchema.shape).extend(MetaMovieSchema.shape).describe('Película');
