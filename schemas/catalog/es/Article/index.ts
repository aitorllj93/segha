
import z from "zod";

import { Areas } from '../Areas';

export const MetaArticleSchema = z.object({
  type: z.literal("[[Fuentes]]"),
  format: z.literal("[[Artículos]]"),
  areas: Areas.default(["[[Conocimiento]]"]),
  color: z.string().optional().default("#3171B2").describe('Color de la nota.'),
  icon: z.string().optional().default('newspaper').describe('Icono de Lucide.'),
  banner: z.string().nullable().optional().describe('Banner de la nota.'),
  url: z.string().optional().describe('URL del artículo'),
}).describe('Artículo: Metadatos de Nota');

export const CatalogArticleSchema = z.object({
  title: z.string().describe('Título del artículo'),
  description: z.string().nullable().optional().describe('Descripción'),
  excerpt: z.string().optional().describe('Extracto del artículo'),
  author: z.array(z.string()).optional().describe('Autores'),
  published: z.union([z.string(), z.number()])
    .transform((val) => String(val))
    .optional()
    .describe('Año de publicación'),
}).describe('Artículo: Datos obtenibles de catalogación');

export const DetailedArticleSchema = z.object({
  status: z.enum(["Pendiente", "En Proceso", "Leído", "Consolidado"]).describe('Estado de lectura'),
  projects: z.array(z.string()).optional().describe('Proyectos'),
  topics: z.array(z.string()).optional().describe('Temas'),
  rating: z.number().optional().describe('Puntuación del artículo'),
}).describe('Artículo: Datos adicionales');

export const ArticleSchema = CatalogArticleSchema.extend(DetailedArticleSchema.shape).extend(MetaArticleSchema.shape).describe('Artículo');
