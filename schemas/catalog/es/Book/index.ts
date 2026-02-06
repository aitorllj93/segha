
import z from "zod";
import { Areas } from "../Areas";

export const MetaBookSchema= z.object({
  type: z.literal("[[Fuentes]]"),
  format: z.literal("[[Libros]]"),
  areas: Areas.default(["[[Conocimiento]]"]),
  color: z.string().optional().default("#3171B2").describe('Color de la nota.'),
  icon: z.string().optional().default('book').describe('Icono de Lucide.'),
  cover: z.string().optional().describe('Portada del libro.'),
  url: z.string().optional().describe('URL del libro en Amazon o similar'),
  read_url: z.string().optional().describe('URL de la lectura del libro'),
}).describe('Libro: Metadatos de Nota');

export const CatalogBookSchema = z.object({
  title: z.string().describe('Título del libro'),
  subtitle: z.string().optional().describe('Subtítulo del libro'),
  description: z.string().optional().describe('Descripción del libro'),
  author: z.array(z.string()).describe('Autores'),
  published: z.union([z.string(), z.number()])
  .transform((val) => String(val))
  .optional().describe('Año de publicación'),
  categories: z.array(z.string()).optional().describe('Géneros'),
}).describe('Libro: Datos obtenibles de catalogación');

export const DetailedBookSchema = z.object({
  status: z.enum(["Pendiente", "En Proceso", "Leído", "Consolidado"]).describe('Estado de lectura'),
  topics: z.array(z.string()).optional().describe('Temas'),
  rating: z.number().optional().describe('Puntuación del libro'),
  online_rating: z.number().optional().describe('Puntuación en línea'),
  last_time_read: z.string().optional().describe('Última vez leído'),
  times_read: z.number().optional().describe('Veces leído'),
}).describe('Libro: Datos adicionales');

export const BookSchema = CatalogBookSchema.extend(DetailedBookSchema.shape).extend(MetaBookSchema.shape).describe('Libro');
