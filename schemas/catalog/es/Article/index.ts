
import z from "zod";

export const MetaArticleSchema = z.object({
  type: z.literal("[[Fuentes]]"),
  format: z.literal("[[Artículos]]"),
  areas: z.array(z.literal("[[Conocimiento]]")),
  color: z.literal("#3171B2"),
  icon: z.literal("newspaper"),
  banner: z.string().optional(),
  url: z.string().describe('URL del artículo'),
}).describe('Artículo: Metadatos de Nota');

export const CatalogArticleSchema = z.object({
  title: z.string().describe('Título del artículo'),
  description: z.string().optional().describe('Descripción'),
  excerpt: z.string().optional().describe('Extracto del artículo'),
  author: z.array(z.string()).describe('Autores'),
  published: z.string().optional().describe('Año de publicación'),
}).describe('Artículo: Datos obtenibles de catalogación');

export const DetailedArticleSchema = z.object({
  status: z.enum(["Pendiente", "En Proceso", "Leído", "Consolidado"]).describe('Estado de lectura'),
  projects: z.array(z.string()).describe('Proyectos'),
  topics: z.array(z.string()).describe('Temas'),
  rating: z.number().describe('Puntuación del artículo'),
}).describe('Artículo: Datos adicionales');

export const ArticleSchema = CatalogArticleSchema.extend(DetailedArticleSchema.shape).extend(MetaArticleSchema.shape).describe('Artículo');
