
import z from "zod";

export const MetaBookSchema= z.object({
  type: z.literal("[[Fuentes]]"),
  format: z.literal("[[Libros]]"),
  areas: z.array(z.literal("[[Knowledge]]")),
  color: z.literal("#3171B2"),
  icon: z.literal("book"),
  cover: z.string().optional(),
  url: z.string().describe('URL del libro en Amazon o similar'),
  read_url: z.string().describe('URL de la lectura del libro'),
}).describe('Libro: Metadatos de Nota');

export const CatalogBookSchema = z.object({
  title: z.string().describe('Título del libro'),
  subtitle: z.string().optional().describe('Subtítulo del libro'),
  description: z.string().optional().describe('Descripción del libro'),
  author: z.array(z.string()).describe('Autores'),
  published: z.string().describe('Año de publicación'),
  categories: z.array(z.string()).describe('Géneros'),
}).describe('Libro: Datos obtenibles de catalogación');

export const DetailedBookSchema = z.object({
  status: z.enum(["Pendiente", "En Proceso", "Leído", "Consolidado"]).describe('Estado de lectura'),
  topics: z.array(z.string()).describe('Temas'),
  rating: z.number().describe('Puntuación del libro'),
  online_rating: z.number().describe('Puntuación en línea'),
  last_time_read: z.string().describe('Última vez leído'),
  times_read: z.number().describe('Veces leído'),
}).describe('Libro: Datos adicionales');

export const BookSchema = CatalogBookSchema.extend(DetailedBookSchema.shape).extend(MetaBookSchema.shape).describe('Libro');
