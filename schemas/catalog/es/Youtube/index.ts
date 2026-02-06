
import z from "zod";
import { MetaArticleSchema, CatalogArticleSchema, DetailedArticleSchema } from "../Article";

export const MetaYoutubeSchema = MetaArticleSchema.extend({
  icon: z.string().optional().default('youtube').describe('Icono de Lucide.'),
  format: z.literal("[[Vídeos]]"),
  platform: z.literal("YouTube"),
}).describe('Vídeo de YouTube: Metadatos de Nota');

export const CatalogYoutubeSchema = CatalogArticleSchema.extend({
  title: z.string().describe('Título del vídeo de YouTube'),
}).describe('Vídeo de YouTube: Datos obtenibles de catalogación');

export const DetailedYoutubeSchema = DetailedArticleSchema.extend({
  status: z.enum(["Pendiente", "En progreso", "Visto"]).describe('Estado de visualización'),
}).describe('Vídeo de YouTube: Datos adicionales');

export const YoutubeSchema = CatalogYoutubeSchema.extend(DetailedYoutubeSchema.shape).extend(MetaYoutubeSchema.shape).describe('Vídeo de YouTube');
