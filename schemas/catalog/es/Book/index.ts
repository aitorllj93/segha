
import z from "zod";

import { Areas, SourceSchema, Knowledge, Books } from '../Core';
import { Color, Icon, Image, Blue, Pending, InProgress, Read, Consolidated, Date } from "../DataTypes";

const BookStatus = z
  .union([Pending, InProgress, Read, Consolidated])
  .describe('Estado de procesamiento del libro');

const BookIcon = z.literal("book");

export const BookSchema = SourceSchema.extend({
  format: Books.default(Books.value),
  status: BookStatus.default(Pending.value),
  areas: Areas.default([Knowledge.value]),
  color: Color.optional().default(Blue.value).describe('Color de la nota.'),
  icon: Icon.optional().default(BookIcon.value).describe('Icono de Lucide.'),
  cover: Image.nullable().optional().describe('Portada del libro.'),
  url: z.url().optional().describe('URL del libro en Amazon o similar'),
  read_url: z.url().optional().describe('URL de la lectura del libro'),
  title: z.string().describe('Título del libro'),
  subtitle: z.string().optional().describe('Subtítulo del libro'),
  description: z.string().nullable().optional().describe('Descripción'),
  categories: z.array(z.string()).optional().describe('Géneros'),
  online_rating: z.number().optional().describe('Puntuación en línea'),
  last_time_read: Date.optional().describe('Última vez leído'),
  times_read: z.number().default(0).optional().describe('Veces leído'),
}).describe('Libro');
