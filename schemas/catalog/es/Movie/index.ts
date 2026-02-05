
import z from "zod";

export const MetaMovieSchema = z.object({
  type: z.literal("[[Fuentes]]"),
  format: z.literal("[[Películas]]"),
  areas: z.array(z.literal("[[Creatividad]]")),
  color: z.literal("#BE9207"),
  icon: z.literal("movie"),
  cover: z.string().optional(),
  url: z.string().describe('URL de la película en IMDB o similar'),
  watch_url: z.string().describe('URL de la película en streaming'),
}).describe('Película: Metadatos de Nota');


export const CatalogMovieSchema = z.object({
  title: z.string().describe('Título de la película'),
  description: z.string().describe('Descripción de la película'),
  author: z.array(z.string()).describe('Autores. Guionistas, directores, productores, etc.'),
  actors: z.array(z.string()).describe('Actores'),
  published: z.string().describe('Año de publicación'),
  genres: z.array(z.string()).describe('Géneros'),
}).describe('Película: Datos obtenibles de catalogación');

export const DetailedMovieSchema = z.object({
  status: z.enum(["Pendiente", "En progreso", "Completado"]).describe('Estado de visualización'),
  topics: z.array(z.string()).describe('Temas'),
  rating: z.number().describe('Puntuación de la película'),
  online_rating: z.number().describe('Puntuación en línea'),
  last_time_watched: z.string().describe('Última vez vista'),
  times_watched: z.number().describe('Veces vista'),
}).describe('Película: Datos adicionales');

export const MovieSchema = CatalogMovieSchema.extend(DetailedMovieSchema.shape).extend(MetaMovieSchema.shape).describe('Película');
