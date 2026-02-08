import z from "zod";

import { Areas, Creativity, Paintings, SourceSchema } from '../Core';
import { Color, Date, Icon, Image, InProgress, Pending, Seen, Yellow } from "../DataTypes";

const PaintingStatus = z
  .union([Pending, InProgress, Seen])
  .describe('Estado de procesamiento de la pintura');

const PaintingIcon = z.literal("frame");

export const PaintingSchema = SourceSchema.extend({
  format: Paintings,
  status: PaintingStatus,
  areas: Areas.default([Creativity.value]),
  color: Color.optional().default(Yellow.value).describe('Color de la nota.'),
  icon: Icon.optional().default(PaintingIcon.value).describe('Icono de Lucide.'),
  cover: Image.nullable().optional().describe('Portada de la pintura.'),
  title: z.string().describe('Título de la película'),
  published: Date.optional().describe('Año de publicación'),
  collection: z.string().optional().describe('Colección'),
  position: z.string().optional().describe('Posición en la colección'),
}).describe('Pintura');
