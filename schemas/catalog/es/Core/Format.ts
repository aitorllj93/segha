import z from "zod";

export const Articles = z.literal("[[Artículos]]")
  .describe('Artículos');

export const Books = z.literal("[[Libros]]")
  .describe('Libros');

export const EncyclopediaEntries = z.literal("[[Entradas de Enciclopedia]]")
  .describe('Entradas de Enciclopedia');

export const Movies = z.literal("[[Películas]]")
  .describe('Películas');

export const Paintings = z.literal("[[Pinturas]]")
  .describe('Pinturas');

export const TVSeries = z.literal("[[Series]]")
  .describe('Series');

export const Videos = z.literal("[[Vídeos]]")
  .describe('Vídeos');

export const Format = z.enum([
  Articles.value,
  Books.value,
  EncyclopediaEntries.value,
  Movies.value,
  Paintings.value,
  TVSeries.value,
  Videos.value,
]).describe('Formato de nota.');
